import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { computeCheck } from 'telegram/Password.js';
import { FONT_PRESETS, getStylizedTime, renderDynamicBio, isSleepTime } from './clock.js';
import { panelHTML } from './panel.js';
import { setupWizardHTML } from './setupWizard.js';
import {
  hashPassword,
  verifyPassword,
  timingSafeStringCompare,
  generateRandomHex,
  generateRedeemCode,
  encryptSession,
  decryptSession,
  validatePasswordStrength
} from './crypto.js';
import { isHoneypot } from './security/rateLimiter.js';
import { logSecurityEvent, getRecentSecurityEvents, AUDIT_EVENT_TYPES, AUDIT_SEVERITY } from './security/auditLogger.js';
import { generateTotpSecret, generateTotpCode, verifyTotpToken, generateBackupCodes, getTotpAuthUri } from './security/totp.js';
import { BackupManager } from './modules/backupManager.js';
import QRCode from 'qrcode';

// هدرهای امنیتی درجه سازمانی (Enterprise Security & CSP)
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https:; frame-ancestors 'self' https://web.telegram.org https://*.telegram.org;",
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...SECURITY_HEADERS,
      ...extraHeaders
    },
  });
}

function etagMatches(reqEtag, targetEtag) {
  if (!reqEtag || !targetEtag) return false;
  return reqEtag.replace(/^W\//i, '').replace(/["']/g, '').trim() === targetEtag.replace(/^W\//i, '').replace(/["']/g, '').trim();
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1';
}

const storageMemCache = new Map(); // key -> { valStr, expiresAt }
const authTokensCache = new Map(); // token -> { auth, expiresAt }
const verifiedWebhooks = new Map(); // botTok -> timestamp
const STORAGE_MEM_TTL = 30000; // 30 seconds RAM TTL

function setStorageMemCache(key, valStr, expiresAt) {
  if (storageMemCache.size > 1000) {
    const oldestKey = storageMemCache.keys().next().value;
    storageMemCache.delete(oldestKey);
  }
  storageMemCache.set(key, { valStr, expiresAt });
}

function setAuthTokensCache(token, auth, expiresAt) {
  if (authTokensCache.size > 500) {
    const oldestKey = authTokensCache.keys().next().value;
    authTokensCache.delete(oldestKey);
  }
  authTokensCache.set(token, { auth, expiresAt });
}

function getUnifiedStorage(env) {
  if (env._unifiedStorage) return env._unifiedStorage;

  const storage = {
    async get(key, type) {
      const now = Date.now();
      const cached = storageMemCache.get(key);
      if (cached && now < cached.expiresAt) {
        return type === 'json' ? JSON.parse(cached.valStr) : cached.valStr;
      }

      // 1. اولویت خواندن از دیتابیس D1 (سقف ۵ میلیون درخواست در روز)
      if (env.DB) {
        try {
          const row = await env.DB.prepare('SELECT value, expires_at FROM kv_store WHERE key = ?').bind(key).first();
          if (row) {
            if (row.expires_at && Math.floor(now / 1000) > row.expires_at) {
              env.DB.prepare('DELETE FROM kv_store WHERE key = ?').bind(key).run().catch(() => {});
              storageMemCache.delete(key);
            } else {
              setStorageMemCache(key, row.value, now + STORAGE_MEM_TTL);
              return type === 'json' ? JSON.parse(row.value) : row.value;
            }
          }
        } catch (dbErr) {
          console.warn(`[Storage] D1 get error for ${key}:`, dbErr.message);
        }
      }

      // 2. در صورت عدم وجود در D1، خواندن از KV
      const rawKv = env.KV_RAW || env.KV;
      if (rawKv && typeof rawKv.get === 'function') {
        try {
          const val = await rawKv.get(key, type);
          if (val !== null && val !== undefined) {
            const valStr = typeof val === 'string' ? val : JSON.stringify(val);
            setStorageMemCache(key, valStr, now + STORAGE_MEM_TTL);
            if (env.DB) {
              env.DB.prepare('INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES (?, ?, ?)')
                .bind(key, valStr, now).run().catch(() => {});
            }
            return val;
          }
        } catch (_) {}
      }
      return null;
    },

    async put(key, value, options = {}) {
      const valStr = typeof value === 'string' ? value : JSON.stringify(value);
      const now = Date.now();

      // حذف رایت تکراری در صورت یکسان بودن داده (Zero-Duplicate-Write)
      const existing = storageMemCache.get(key);
      if (existing && existing.valStr === valStr && !options.expirationTtl && !options.expiration) {
        existing.expiresAt = now + STORAGE_MEM_TTL;
        return; // داده تغییر نکرده است؛ بدون نیاز به مصرف سهمیه رایت دیتابیس
      }

      setStorageMemCache(key, valStr, now + STORAGE_MEM_TTL);

      // اگر تنظیمات کاربری تغییر کرد، کش‌ها را باطل کن
      if (key.startsWith('user:')) {
        activeUsersCache = null;
        activeUsersCacheTime = 0;
        authTokensCache.clear();
      }

      let exp = null;
      if (options && options.expirationTtl) {
        exp = Math.floor(now / 1000) + options.expirationTtl;
      } else if (options && options.expiration) {
        exp = Math.floor(options.expiration);
      }

      let d1Success = false;
      // 1. ذخیره قطعی در پایگاه داده D1 (۱۰۰,۰۰۰ رایت در روز رایگان!)
      if (env.DB) {
        try {
          await env.DB.prepare(
            'INSERT OR REPLACE INTO kv_store (key, value, expires_at, updated_at) VALUES (?, ?, ?, ?)'
          ).bind(key, valStr, exp, now).run();
        } catch (dbErr) {
          if (dbErr.message && dbErr.message.includes('no such table')) {
            try {
              await env.DB.exec(`
                CREATE TABLE IF NOT EXISTS kv_store (
                  key TEXT PRIMARY KEY,
                  value TEXT,
                  expires_at INTEGER,
                  updated_at INTEGER
                );
                CREATE INDEX IF NOT EXISTS idx_kv_expires ON kv_store(expires_at);
              `);
              await env.DB.prepare(
                'INSERT OR REPLACE INTO kv_store (key, value, expires_at, updated_at) VALUES (?, ?, ?, ?)'
              ).bind(key, valStr, exp, now).run();
              d1Success = true;
            } catch (_) {}
          }
          if (!d1Success) {
            console.error(`[Storage] D1 put error for ${key}:`, dbErr);
          }
        }
      }

      // 2. آینه‌سازی هوشمند در KV (حفاظت سخت‌گیرانه از سهمیه ۱۰۰۰ رایت روزانه KV)
      // داده‌های موقت/پراستفاده (مانند هانی‌پات، استیت بات، کش دیالوگ‌ها، سشن‌های موقت و پینگ رانر) فقط در D1 و RAM نگهداری می‌شوند
      const isTransientKey = key.startsWith('bot_') || key.startsWith('temp_') || key.startsWith('audit_') || key.startsWith('security_') || key.startsWith('rate_') || key === 'security_audit_log' || key.startsWith('user_dialogs:') || key.startsWith('runner:');
      const rawKv = env.KV_RAW || env.KV;
      if (!isTransientKey && rawKv && typeof rawKv.put === 'function') {
        try {
          await rawKv.put(key, valStr, options);
        } catch (kvErr) {
          if (d1Success) {
            console.warn(`[Storage] KV quota reached for ${key} (successfully persisted in D1):`, kvErr.message);
          } else {
            throw kvErr;
          }
        }
      }
    },

    async delete(key) {
      storageMemCache.delete(key);
      if (key.startsWith('token:')) {
        authTokensCache.delete(key.replace('token:', ''));
      }
      if (key.startsWith('user:')) {
        activeUsersCache = null;
        activeUsersCacheTime = 0;
        authTokensCache.clear();
      }
      if (env.DB) {
        try {
          await env.DB.prepare('DELETE FROM kv_store WHERE key = ?').bind(key).run();
        } catch (_) {}
      }
      const rawKv = env.KV_RAW || env.KV;
      if (rawKv && typeof rawKv.delete === 'function') {
        try {
          await rawKv.delete(key);
        } catch (_) {}
      }
    },

    async list(options = {}) {
      if (env.DB) {
        try {
          const prefix = options.prefix || '';
          const rows = await env.DB.prepare('SELECT key FROM kv_store WHERE key LIKE ?').bind(prefix + '%').all();
          if (rows && rows.results) {
            return { keys: rows.results.map(r => ({ name: r.key })) };
          }
        } catch (_) {}
      }
      const rawKv = env.KV_RAW || env.KV;
      if (rawKv && typeof rawKv.list === 'function') {
        return await rawKv.list(options);
      }
      return { keys: [] };
    }
  };

  env._unifiedStorage = storage;
  return storage;
}

function initEnvStorage(env) {
  if (!env) return;
  if (!env.KV_RAW) {
    env.KV_RAW = env.KV;
    env.KV = getUnifiedStorage(env);
  }
}

const memoryRateLimits = new Map();
globalThis.pendingBotActions = globalThis.pendingBotActions || [];
globalThis.hasPendingBotActions = false;
globalThis.cachedUserDialogs = globalThis.cachedUserDialogs || {};
globalThis.botUserReplyStates = globalThis.botUserReplyStates || new Map();

async function enqueueBotAction(env, action) {
  initEnvStorage(env);
  globalThis.pendingBotActions = globalThis.pendingBotActions || [];
  globalThis.hasPendingBotActions = true;
  if (!action.id) {
    action.id = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  }
  globalThis.pendingBotActions.push(action);
  try {
    let existing = [];
    try {
      existing = await env.KV.get('bot_pending_actions', 'json') || [];
    } catch (_) {}
    if (!Array.isArray(existing)) existing = [];
    existing.push(action);
    if (existing.length > 30) existing = existing.slice(-30);
    await env.KV.put('bot_pending_actions', JSON.stringify(existing), { expirationTtl: 180 });
  } catch (_) {}
}

function checkRateLimit(env, key, maxHits, windowSec) {
  const now = Math.floor(Date.now() / 1000);
  if (memoryRateLimits.size > 500) {
    for (const [k, v] of memoryRateLimits.entries()) {
      if (now > v.reset) memoryRateLimits.delete(k);
    }
  }
  const entry = memoryRateLimits.get(key);
  if (!entry || now > entry.reset) {
    const reset = now + windowSec;
    memoryRateLimits.set(key, { hits: 1, reset });
    return { allowed: true, remaining: maxHits - 1, reset };
  }
  if (entry.hits >= maxHits) {
    return { allowed: false, remaining: 0, reset: entry.reset };
  }
  entry.hits += 1;
  return { allowed: true, remaining: maxHits - entry.hits, reset: entry.reset };
}

async function getAuthUser(request, env) {
  initEnvStorage(env);
  const authHeader = request.headers.get('Authorization') || '';
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }
  if (!token) return null;

  const now = Date.now();
  const cached = authTokensCache.get(token);
  if (cached && now < cached.expiresAt) {
    return cached.auth;
  }

  const sessionData = await env.KV.get('token:' + token, 'json');
  if (!sessionData || !sessionData.username) return null;

  const userData = await env.KV.get('user:' + sessionData.username, 'json');
  if (!userData) return null;

  if (userData.passwordChangedAt && sessionData.createdAt && sessionData.createdAt < userData.passwordChangedAt) {
    return null;
  }

  const auth = { username: sessionData.username, user: userData, token };
  setAuthTokensCache(token, auth, now + 30000);
  return auth;
}

/**
 * احراز هویت اختصاصی مدیر ارشد (Admin Master Authentication)
 */
async function getAdminAuth(request, env) {
  initEnvStorage(env);
  const authHeader = request.headers.get('Authorization') || '';
  let token = '';
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }
  if (!token) return false;

  // ۱. بررسی سشن مستقیم ادمین مستر
  const adminSession = await env.KV.get('admin_token:' + token);
  if (adminSession) return true;

  // ۲. بررسی توکن کاربری کاربرانی که سطح دسترسی ادمین دارند
  const sessionData = await env.KV.get('token:' + token, 'json');
  if (sessionData && sessionData.username) {
    const userData = await env.KV.get('user:' + sessionData.username, 'json');
    if (userData) {
      if (userData.role === 'admin' || sessionData.username === 'amirmaster' || sessionData.username === 'admin') {
        return true;
      }
    }
  }

  return false;
}

/**
 * بررسی هوشمند و خودکار وضعیت اعتبار اشتراک کاربر
 */
export function checkUserSubscription(user) {
  if (!user) return { active: false, reason: 'کاربر نامعتبر است' };
  if (user.role === 'admin' || user.username === 'amirmaster' || user.username === 'admin') {
    return { active: true, isLifetime: true, plan: 'lifetime', planName: user.planName || 'دائمی و نامحدود (مدیر ارشد)', remainingDays: 9999, remainingMs: Infinity };
  }
  const plan = user.plan || '1_month';
  if (plan === 'lifetime' || user.subscriptionUntil === null || user.subscriptionUntil === 0) {
    return { active: true, isLifetime: true, plan: 'lifetime', planName: user.planName || 'دائمی و نامحدود', remainingDays: 9999, remainingMs: Infinity };
  }

  const expiresAt = user.subscriptionUntil;
  if (!expiresAt) {
    const created = user.createdAt || Date.now();
    const fallbackExpiry = created + (user.durationDays || 30) * 86400 * 1000;
    const remainingMs = fallbackExpiry - Date.now();
    if (remainingMs <= 0) {
      return { active: false, expired: true, plan, planName: user.planName || 'منقضی‌شده', remainingDays: 0, remainingMs: 0, expiresAt: fallbackExpiry };
    }
    const remainingDays = Math.ceil(remainingMs / (86400 * 1000));
    return { active: true, plan, planName: user.planName || `${remainingDays} روزه`, remainingDays, remainingMs, expiresAt: fallbackExpiry };
  }

  const remainingMs = expiresAt - Date.now();
  if (remainingMs <= 0) {
    return { active: false, expired: true, plan, planName: user.planName || 'منقضی‌شده', remainingDays: 0, remainingMs: 0, expiresAt };
  }

  const remainingDays = Math.ceil(remainingMs / (86400 * 1000));
  return {
    active: true,
    plan,
    planName: user.planName || (user.durationDays ? `${user.durationDays} روزه` : `${remainingDays} روزه`),
    remainingDays,
    remainingMs,
    expiresAt
  };
}

let activeUsersCache = null;
let activeUsersCacheTime = 0;
let activeUsersETag = null;

// ⚡ کش پایدار رابط‌های گرافیکی در حافظه ایزولیت ورکر (Zero Redundant HTML String Interpolation)
let cachedPanelHtml = null;
let cachedAdminHtml = null;
let cachedWizardHtml = null;
const STATIC_ASSET_ETAG = '"arizo-v4.5.5-admin-renew-button-fonts"';
let cachedFaviconResponse = null;

export default {
  async fetch(request, env) {
    try {
      initEnvStorage(env);
      const url = new URL(request.url);
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: { ...CORS_HEADERS, ...SECURITY_HEADERS } });
      }

    const clientIP = getClientIP(request);

    // پایش امنیتی و مهار دسترسی‌های غیرمجاز و اسکنرهای ناخواسته
    if (isHoneypot(url.pathname)) {
      await logSecurityEvent(env, AUDIT_EVENT_TYPES.HONEYPOT_TRIGGERED, {
        ip: clientIP,
        user: 'scanner',
        details: { path: url.pathname, method: request.method },
        userAgent: request.headers.get('user-agent') || ''
      }, AUDIT_SEVERITY.CRITICAL);
      return new Response('Access Denied (Security Protection Active)', {
        status: 403,
        headers: {
          ...SECURITY_HEADERS,
          'X-Security-Policy': 'Security-Protection-Active',
          'Retry-After': '86400'
        }
      });
    }

    // ⚡ فاوا آیکون با کیفیت برداری اختصاصی Arizo (Favicon Handler با کش نامتغیر ۷ روزه)
    if (url.pathname === '/favicon.ico' || url.pathname === '/favicon.svg') {
      if (!cachedFaviconResponse) {
        const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#090d16"/>
    </linearGradient>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#c084fc"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="url(#bg)"/>
  <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="url(#neon)" stroke-width="2" opacity="0.6"/>
  <path d="M35 8 L18 34 L31 34 L27 56 L46 28 L33 28 Z" fill="url(#neon)"/>
</svg>`;
        cachedFaviconResponse = new Response(faviconSvg, {
          headers: {
            'Content-Type': 'image/svg+xml;charset=utf-8',
            'Cache-Control': 'public, max-age=604800, immutable',
            'ETag': '"arizo-favicon-v3"',
            ...SECURITY_HEADERS
          }
        });
      }
      if (etagMatches(request.headers.get('if-none-match'), '"arizo-favicon-v3"')) {
        return new Response(null, { status: 304, headers: cachedFaviconResponse.headers });
      }
      return cachedFaviconResponse.clone();
    }

    // ۱. سرو رابط کاربری پنل با اعتبارسنجی شرطی ETag و کش هوشمند RAM
    if (url.pathname === '/') {
      const etag = STATIC_ASSET_ETAG;
      if (etagMatches(request.headers.get('if-none-match'), etag)) {
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': etag,
            'Cache-Control': 'public, max-age=0, must-revalidate',
            ...SECURITY_HEADERS
          }
        });
      }
      if (!cachedPanelHtml) {
        cachedPanelHtml = panelHTML(env);
      }
      return new Response(cachedPanelHtml, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'ETag': etag,
          'Cache-Control': 'public, max-age=0, must-revalidate',
          ...SECURITY_HEADERS
        },
      });
    }

    // 👑 ۲. ورود مستقیم و اختصاصی به پنل ارشد مانیتورینگ (/admin)
    if (url.pathname === '/admin' || url.pathname === '/admin/') {
      const etag = '"arizo-adm-v4.0.0-aurora"';
      if (etagMatches(request.headers.get('if-none-match'), etag)) {
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': etag,
            'Cache-Control': 'public, max-age=0, must-revalidate',
            ...SECURITY_HEADERS
          }
        });
      }
      if (!cachedAdminHtml) {
        cachedAdminHtml = panelHTML(env, { autoOpenAdmin: true });
      }
      return new Response(cachedAdminHtml, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'ETag': etag,
          'Cache-Control': 'public, max-age=0, must-revalidate',
          ...SECURITY_HEADERS
        },
      });
    }

    // 🚀 ویزارد تعاملی و گرافیکی ستاپ و راه‌اندازی شخصی (Self-Hosting Setup Wizard)
    if (url.pathname === '/setup' || url.pathname === '/wizard') {
      const etag = '"arizo-wiz-v3.6.0-opt"';
      if (etagMatches(request.headers.get('if-none-match'), etag)) {
        return new Response(null, {
          status: 304,
          headers: {
            'ETag': etag,
            'Cache-Control': 'public, max-age=0, must-revalidate',
            ...SECURITY_HEADERS
          }
        });
      }
      if (!cachedWizardHtml) {
        cachedWizardHtml = setupWizardHTML(env, url);
      }
      return new Response(cachedWizardHtml, {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'ETag': etag,
          'Cache-Control': 'public, max-age=0, must-revalidate',
          ...SECURITY_HEADERS
        },
      });
    }

    // بررسی زنده وضعیت و سلامت پیکربندی سیستم (System Health & Configuration Status)
    if (url.pathname === '/api/setup/status' && request.method === 'GET') {
      const isKvReady = !!(env.KV_RAW || env.KV);
      const isD1Ready = !!env.DB;
      let d1TableExists = false;
      let d1RowCount = 0;
      if (env.DB) {
        try {
          const check = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='kv_store'").first();
          d1TableExists = !!check;
          if (d1TableExists) {
            const countRow = await env.DB.prepare("SELECT count(*) as cnt FROM kv_store").first();
            d1RowCount = countRow ? Number(countRow.cnt || 0) : 0;
          }
        } catch (_) {}
      }

      return json({
        success: true,
        workerUrl: url.origin,
        timestamp: Date.now(),
        status: {
          kvBound: isKvReady,
          d1Bound: isD1Ready,
          d1TableExists: d1TableExists,
          d1RowCount: d1RowCount,
          apiIdSet: !!env.API_ID,
          apiHashSet: !!env.API_HASH,
          adminPasswordSet: !!env.ADMIN_PASSWORD,
          runnerSecretSet: !!env.RUNNER_SECRET,
          cronsConfigured: true,
          nodeCompat: true,
          envName: env.ENVIRONMENT || 'production'
        }
      });
    }

    // مقداردهی و ساخت خودکار جداول دیتابیس D1 با یک کلیک (Initialize D1 Database)
    if (url.pathname === '/api/setup/init-db' && request.method === 'POST') {
      if (!env.DB) {
        return json({
          success: false,
          error: 'پایگاه داده Cloudflare D1 به این ورکر متصل نیست (DB binding تعریف نشده). لطفاً ابتدا wrangler.toml را پیکربندی و دیپلوی کنید.'
        }, 400);
      }
      try {
        await env.DB.exec(`
          CREATE TABLE IF NOT EXISTS kv_store (
            key TEXT PRIMARY KEY,
            value TEXT,
            expires_at INTEGER,
            updated_at INTEGER
          );
          CREATE INDEX IF NOT EXISTS idx_kv_expires ON kv_store(expires_at);
        `);
        return json({
          success: true,
          message: 'جداول پایگاه داده D1 (kv_store و اندیس‌ها) با موفقیت ساخته و آماده استفاده شدند.'
        });
      } catch (err) {
        return json({ success: false, error: 'خطا در ساخت جداول D1: ' + err.message }, 500);
      }
    }

    // تست و اعتبارسنجی آنلاین توکن ربات تلگرام (Telegram Bot Token Live Validator)
    if (url.pathname === '/api/setup/test-bot' && request.method === 'POST') {
      try {
        const { token } = await request.json();
        if (!token || typeof token !== 'string') {
          return json({ success: false, error: 'توکن ربات ارسال نشده است.' }, 400);
        }
        const cleanToken = token.trim();
        const tgRes = await fetch(`https://api.telegram.org/bot${encodeURIComponent(cleanToken)}/getMe`);
        const tgData = await tgRes.json();
        if (tgData && tgData.ok && tgData.result) {
          return json({
            success: true,
            bot: {
              id: tgData.result.id,
              firstName: tgData.result.first_name,
              username: tgData.result.username,
              canJoinGroups: tgData.result.can_join_groups,
              supportsInlineQueries: tgData.result.supports_inline_queries
            }
          });
        } else {
          return json({
            success: false,
            error: tgData.description || 'توکن وارد شده توسط سرورهای تلگرام تایید نشد.'
          }, 400);
        }
      } catch (err) {
        return json({ success: false, error: 'خطا در ارتباط با سرور تلگرام: ' + err.message }, 500);
      }
    }

    // تست ارسال پیام توسط ربات تلگرام (Telegram Bot Test Message Ping)
    if (url.pathname === '/api/setup/test-bot-message' && request.method === 'POST') {
      try {
        const { token, chatId } = await request.json();
        if (!token || !chatId) {
          return json({ success: false, error: 'توکن ربات و شناسه چت (عددی) الزامی هستند.' }, 400);
        }
        const cleanToken = String(token).trim();
        const cleanChat = String(chatId).trim();
        const msgText = '⚡ *Arizo Self Setup Wizard*\n\nربات کمکی شما با موفقیت به استودیوی ابری سلف‌بات متصل شد! 🎉\nاکنون می‌توانید از تمامی امکانات ضدحذف، لاگین و اعلانات امنیتی استفاده کنید.';
        const tgRes = await fetch(`https://api.telegram.org/bot${encodeURIComponent(cleanToken)}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: cleanChat,
            text: msgText,
            parse_mode: 'Markdown'
          })
        });
        const tgData = await tgRes.json();
        if (tgData && tgData.ok) {
          return json({ success: true, message: 'پیام تست با موفقیت به چت تلگرام ارسال شد.' });
        } else {
          return json({ success: false, error: tgData.description || 'خطا در ارسال پیام تلگرام.' }, 400);
        }
      } catch (err) {
        return json({ success: false, error: 'خطا در ارتباط با تلگرام: ' + err.message }, 500);
      }
    }

    // ==========================================
    // 👑 بخش پنل مدیریت ادمین (Admin Management)
    // ==========================================

    // ورود به پنل ادمین با مستر پسورد
    if (url.pathname === '/api/admin/login' && request.method === 'POST') {
      const rl = await checkRateLimit(env, `rl:admin:${clientIP}`, 5, 300);
      if (!rl.allowed) {
        return json({ error: 'تلاش بیش از حد برای ورود به پنل مدیریت. لطفاً ۵ دقیقه دیگر تلاش کنید.' }, 429);
      }

      try {
        const { password } = await request.json();
        const expectedPassword = env.ADMIN_PASSWORD;

        if (!expectedPassword) {
          return json({ error: 'رمز عبور مدیریت در سرور تنظیم نشده است.' }, 500);
        }

        const isMatch = await timingSafeStringCompare(String(password || ''), expectedPassword);
        if (!isMatch) {
          return json({ error: 'رمز عبور مدیریت نادرست است.' }, 401);
        }

        const adminToken = generateRandomHex(32);
        await env.KV.put('admin_token:' + adminToken, JSON.stringify({
          role: 'superadmin',
          createdAt: Date.now(),
          ip: clientIP
        }), {
          expirationTtl: 14 * 86400 // انقضای ۱۴ روزه
        });

        return json({ ok: true, token: adminToken });
      } catch (err) {
        return json({ error: 'خطا در احراز هویت مدیریت' }, 500);
      }
    }

    // خروج از حساب مدیریت و باطل‌سازی سشن
    if (url.pathname === '/api/admin/logout' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization') || '';
      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7).trim();
        await env.KV.delete('admin_token:' + token);
      }
      return json({ ok: true });
    }

    // دریافت آمار سیستم برای ادمین
    if (url.pathname === '/api/admin/stats' && request.method === 'GET') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const usersList = await env.KV.get('users_list', 'json') || [];
        const codesList = await env.KV.get('codes_list', 'json') || [];

        // خواندن وضعیت تفصیلی کاربران
        let activeBotsCount = 0;
        let activeHelperBotsCount = 0;
        let active2FACount = 0;
        let suspendedUsersCount = 0;

        await Promise.all(
          usersList.map(async (uname) => {
            const cleanUname = String(uname || '').trim().toLowerCase();
            const u = await env.KV.get('user:' + cleanUname, 'json') || await env.KV.get('user:' + uname, 'json');
            if (!u) return;
            if (u.telegram?.enabled && u.telegram?.sessionEncrypted) {
              activeBotsCount++;
            }
            if (u.telegram?.bot?.token) {
              activeHelperBotsCount++;
            }
            if (u.totp?.enabled) {
              active2FACount++;
            }
            const sub = checkUserSubscription(u);
            if (!sub.active || u.isSuspended) {
              suspendedUsersCount++;
            }
          })
        );

        // خواندن وضعیت کدهای ردیم
        let usedCodesCount = 0;
        await Promise.all(
          codesList.map(async (code) => {
            const c = await env.KV.get('code:' + code, 'json');
            if (c && c.isUsed) usedCodesCount++;
          })
        );

        return json({
          ok: true,
          totalUsers: usersList.length,
          activeBots: activeBotsCount,
          activeHelperBots: activeHelperBotsCount,
          active2FA: active2FACount,
          suspendedUsers: suspendedUsersCount,
          totalCodes: codesList.length,
          usedCodes: usedCodesCount,
          availableCodes: codesList.length - usedCodesCount
        });
      } catch (err) {
        return json({ error: 'خطا در دریافت آمار' }, 500);
      }
    }

    // دریافت تاریخچه رویدادها و لاگ‌های امنیتی سیستم (Audit Logs)
    if (url.pathname === '/api/admin/audit-logs' && request.method === 'GET') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const events = await getRecentSecurityEvents(env);
        return json({ ok: true, events });
      } catch (err) {
        return json({ error: 'خطا در دریافت لاگ‌های امنیتی' }, 500);
      }
    }

    // دریافت لیست کدهای لایسنس
    if (url.pathname === '/api/admin/codes' && request.method === 'GET') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const codesList = await env.KV.get('codes_list', 'json') || [];
        const codes = await Promise.all(
          codesList.map(async (code) => {
            const data = await env.KV.get('code:' + code, 'json');
            return data || { code, isUsed: false };
          })
        );
        return json({ ok: true, codes: codes.reverse() });
      } catch (err) {
        return json({ error: 'خطا در دریافت کدها' }, 500);
      }
    }

    // ساخت دسته‌ای کدهای ردیم/لایسنس برای فروش با قابلیت تعیین روز سفارشی توسط ادمین
    if (url.pathname === '/api/admin/codes/create' && request.method === 'POST') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const { count = 1, plan = '1_month', durationDays, customDays } = await request.json();
        const num = Math.min(Math.max(1, parseInt(count, 10) || 1), 20); // حداکثر ۲۰ کد در هر بار

        let calculatedDays = 30;
        let planLabel = '۱ ماهه (۳۰ روز)';

        if (plan === 'lifetime') {
          calculatedDays = 0;
          planLabel = 'دائمی و نامحدود';
        } else if (plan === '3_months') {
          calculatedDays = 90;
          planLabel = '۳ ماهه (۹۰ روز)';
        } else if (plan === '6_months') {
          calculatedDays = 180;
          planLabel = '۶ ماهه (۱۸۰ روز)';
        } else if (plan === 'custom') {
          calculatedDays = Math.max(1, parseInt(customDays || durationDays || 15, 10));
          planLabel = `${calculatedDays} روزه (سفارشی)`;
        } else {
          calculatedDays = 30;
          planLabel = '۱ ماهه (۳۰ روز)';
        }

        let codesList = await env.KV.get('codes_list', 'json') || [];
        const createdCodes = [];

        for (let i = 0; i < num; i++) {
          const code = generateRedeemCode();
          const codeObj = {
            code,
            plan: plan || '1_month',
            planName: planLabel,
            durationDays: calculatedDays,
            createdAt: Date.now(),
            isUsed: false,
            usedBy: null,
            usedAt: null
          };

          await env.KV.put('code:' + code, JSON.stringify(codeObj));
          codesList.push(code);
          createdCodes.push(codeObj);
        }

        await env.KV.put('codes_list', JSON.stringify(codesList));
        return json({ ok: true, createdCodes });
      } catch (err) {
        return json({ error: 'خطا در تولید کدهای ردیم' }, 500);
      }
    }

    // حذف یک کد لایسنس توسط ادمین
    if (url.pathname === '/api/admin/codes/delete' && request.method === 'POST') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const { code } = await request.json();
        if (!code) return json({ error: 'کد الزامی است' }, 400);

        await env.KV.delete('code:' + code);
        let codesList = await env.KV.get('codes_list', 'json') || [];
        codesList = codesList.filter(c => c !== code);
        await env.KV.put('codes_list', JSON.stringify(codesList));

        return json({ ok: true });
      } catch (err) {
        return json({ error: 'خطا در حذف کد' }, 500);
      }
    }

    // دریافت لیست تمام کاربران برای ادمین با نمایش اعتبار، وضعیت تعلیق و سطح دسترسی
    if (url.pathname === '/api/admin/users' && request.method === 'GET') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        let usersList = await env.KV.get('users_list', 'json') || [];
        const validUsersList = [];
        let listChanged = false;

        const users = (await Promise.all(
          usersList.map(async (uname) => {
            if (!uname) return null;
            const cleanUname = String(uname).trim().toLowerCase();
            const u = await env.KV.get('user:' + cleanUname, 'json') || await env.KV.get('user:' + uname, 'json');
            if (!u) {
              listChanged = true;
              return null;
            }
            validUsersList.push(uname);
            const sub = checkUserSubscription(u);
            const isSuspended = !sub.active || u.isSuspended;
            const isOwner = cleanUname === 'amirmaster' || cleanUname === 'admin' || (usersList.length > 0 && cleanUname === usersList[0].toLowerCase());
            const isUserAdmin = isOwner || u.role === 'admin';
            return {
              username: uname,
              role: isUserAdmin ? 'admin' : 'user',
              isAdmin: isUserAdmin,
              isOwner,
              createdAt: u.createdAt,
              hasTelegram: !!u.telegram?.sessionEncrypted,
              enabled: u.telegram?.enabled ?? false,
              isSuspended,
              isExpired: !sub.active,
              remainingText: sub.isLifetime ? 'دائمی ♾️' : (sub.active ? `${sub.remainingDays} روز` : 'منقضی‌شده 🔴'),
              plan: u.plan || 'استاندارد',
              planName: u.planName || sub.planName,
              durationDays: u.durationDays,
              subscriptionUntil: u.subscriptionUntil,
              licenseCode: u.licenseCode || 'بدون کد',
              lastUpdate: u.status?.lastUpdate,
              lastTime: u.status?.lastTime,
              error: u.status?.error,
              // 🔐 وضعیت امنیت و ۲FA
              has2FA: Boolean(u.totp?.enabled),
              backupCodesCount: (u.totp?.enabled && Array.isArray(u.totp?.backupCodes)) ? u.totp.backupCodes.length : 0,
              // 🤖 وضعیت ربات کمکی و ماژول‌ها
              hasBot: Boolean(u.telegram?.bot?.token),
              botUsername: u.telegram?.bot?.username || null,
              botName: u.telegram?.bot?.name || null,
              botId: u.telegram?.bot?.id || null,
              botOwnerId: u.telegram?.bot?.ownerId || null,
              botAntiDelete: u.telegram?.bot?.antiDeleteEnabled !== false,
              botAntiEdit: u.telegram?.bot?.antiEditEnabled !== false,
              botForwardTtl: u.telegram?.bot?.forwardTtlToBot !== false,
              // 📱 تله‌متری سلف‌بات تلگرام
              telegramUserId: u.telegram?.userId || null,
              ghostMode: Boolean(u.telegram?.ghostMode),
              aiReplyEnabled: Boolean(u.telegram?.aiReplyEnabled),
              bioEnabled: Boolean(u.telegram?.bioEnabled),
              afkEnabled: Boolean(u.telegram?.afkEnabled),
              afkReason: u.telegram?.afkReason || null,
              mutedCount: Array.isArray(u.telegram?.mutedUsers) ? u.telegram.mutedUsers.length : 0
            };
          })
        )).filter(Boolean);

        if (listChanged) {
          await env.KV.put('users_list', JSON.stringify(validUsersList));
        }

        return json({ ok: true, users: users.reverse() });
      } catch (err) {
        return json({ error: 'خطا در دریافت کاربران' }, 500);
      }
    }

    // اقدامات مدیریتی روی یک کاربر
    if (url.pathname === '/api/admin/users/action' && request.method === 'POST') {
      const isAdmin = await getAdminAuth(request, env);
      if (!isAdmin) return json({ error: 'دسترسی غیرمجاز' }, 401);

      try {
        const body = await request.json();
        const { username, action } = body;
        const cleanUser = String(username || '').trim().toLowerCase();

        let usersList = await env.KV.get('users_list', 'json') || [];
        const isRootOwner = cleanUser === 'amirmaster' || cleanUser === 'admin' || (usersList.length > 0 && cleanUser === usersList[0].toLowerCase());

        // 🛡️ گارد امنیتی غیرقابل نفوذ: جلوگیری از حذف، تعلیق یا تنزل ادمین اولیه / مالک اصلی
        if (isRootOwner && (action === 'delete' || action === 'toggle_role' || action === 'demote_admin' || action === 'toggle_suspend')) {
          return json({ error: 'خطای امنیتی: حذف، تعلیق یا تغییر سطح دسترسی مدیر ارشد و مالک اصلی سامانه امکان‌پذیر نیست.' }, 403);
        }

        // اقدام حذف کاربر (حتی اگر دیتای کاربر قبلاً ناقص پاک شده باشد، پاک‌سازی کامل از تمام لیست‌ها و دیتابیس)
        if (action === 'delete') {
          await env.KV.delete('user:' + cleanUser);
          if (username && cleanUser !== username) {
            await env.KV.delete('user:' + username);
          }
          usersList = usersList.filter(u => u && u.toLowerCase() !== cleanUser && u.toLowerCase() !== String(username || '').toLowerCase());
          await env.KV.put('users_list', JSON.stringify(usersList));
          if (env.DB) {
            await env.DB.prepare('DELETE FROM users WHERE lower(username) = ?').bind(cleanUser).run().catch(() => {});
          }
          await env.KV.delete('user_dialogs:' + cleanUser);
          await env.KV.delete('miniapp_token:' + cleanUser);
          return json({ ok: true, deleted: true });
        }

        const userData = await env.KV.get('user:' + cleanUser, 'json') || await env.KV.get('user:' + username, 'json');
        if (!userData) return json({ error: 'کاربر یافت نشد' }, 404);

        if (action === 'toggle') {
          if (userData.telegram) {
            userData.telegram.enabled = !userData.telegram.enabled;
            await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          }
          return json({ ok: true, enabled: userData.telegram?.enabled });
        }

        if (action === 'toggle_suspend') {
          userData.isSuspended = !userData.isSuspended;
          if (userData.isSuspended && userData.telegram) {
            userData.telegram.enabled = false;
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, isSuspended: userData.isSuspended });
        }

        if (action === 'toggle_role' || action === 'promote_admin' || action === 'demote_admin') {
          const currentRole = userData.role || (cleanUser === 'amirmaster' || cleanUser === 'admin' ? 'admin' : 'user');
          if (action === 'promote_admin') {
            userData.role = 'admin';
          } else if (action === 'demote_admin') {
            userData.role = 'user';
          } else {
            userData.role = currentRole === 'admin' ? 'user' : 'admin';
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          if (username && cleanUser !== username) {
            await env.KV.put('user:' + username, JSON.stringify(userData));
          }
          await logSecurityEvent(env, AUDIT_EVENT_TYPES.CONFIG_MUTATED, {
            ip: clientIP,
            user: cleanUser,
            details: { roleChange: userData.role, action }
          }, AUDIT_SEVERITY.INFO);
          return json({ ok: true, role: userData.role, isAdmin: userData.role === 'admin' });
        }

        if (action === 'disconnect') {
          userData.telegram = null;
          userData.status = null;
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true });
        }

        if (action === 'disable_2fa') {
          if (userData.totp) {
            userData.totp = { enabled: false };
          }
          await env.KV.delete('temp_totp_setup:' + cleanUser);
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          await logSecurityEvent(env, AUDIT_EVENT_TYPES.TOTP_DISABLED, {
            ip: clientIP,
            user: cleanUser,
            details: { disabledByAdmin: true }
          }, AUDIT_SEVERITY.WARNING);
          return json({ ok: true, message: `تایید دو مرحله‌ای کاربر ${cleanUser} با موفقیت غیرفعال و ریست گردید.` });
        }

        if (action === 'disconnect_bot') {
          const botToken = userData.telegram?.bot?.token;
          if (botToken) {
            await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook?drop_pending_updates=true`).catch(() => {});
            await fetch(`https://api.telegram.org/bot${botToken}/setChatMenuButton`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ menu_button: { type: 'default' } })
            }).catch(() => {});
          }
          const existingAppToken = await env.KV.get('miniapp_token:' + cleanUser);
          if (existingAppToken) {
            await env.KV.delete('token:' + existingAppToken);
            await env.KV.delete('miniapp_token:' + cleanUser);
          }
          if (userData.telegram) {
            delete userData.telegram.bot;
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, message: `اتصال ربات کمکی کاربر ${cleanUser} با موفقیت قطع گردید و وب‌هوک تلگرام حذف شد.` });
        }

        if (action === 'toggle_bot_feature') {
          const { feature } = body;
          if (!userData.telegram?.bot) {
            return json({ error: 'کاربر ربات کمکی متصل ندارد' }, 400);
          }
          if (feature === 'antiDelete') {
            userData.telegram.bot.antiDeleteEnabled = userData.telegram.bot.antiDeleteEnabled === false;
          } else if (feature === 'antiEdit') {
            userData.telegram.bot.antiEditEnabled = userData.telegram.bot.antiEditEnabled === false;
          } else if (feature === 'forwardTtl') {
            userData.telegram.bot.forwardTtlToBot = userData.telegram.bot.forwardTtlToBot === false;
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, bot: userData.telegram.bot });
        }

        if (action === 'clear_error') {
          if (userData.status) {
            userData.status.error = null;
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, message: `خطاهای وضعیت کاربر ${cleanUser} پاکسازی شد.` });
        }

        if (action === 'toggle_feature') {
          const { feature } = body;
          if (!userData.telegram) {
            return json({ error: 'حساب تلگرام کاربر متصل نیست' }, 400);
          }
          if (feature === 'ghostMode') userData.telegram.ghostMode = !userData.telegram.ghostMode;
          else if (feature === 'aiReplyEnabled') userData.telegram.aiReplyEnabled = !userData.telegram.aiReplyEnabled;
          else if (feature === 'bioEnabled') userData.telegram.bioEnabled = !userData.telegram.bioEnabled;
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, telegram: userData.telegram });
        }

        if (action === 'reset_password') {
          const { newPassword } = body;
          if (!newPassword || newPassword.length < 6) {
            return json({ error: 'کلمه عبور جدید باید حداقل ۶ کاراکتر باشد' }, 400);
          }
          const salt = generateRandomHex(16);
          const passwordHash = await hashPassword(newPassword, salt);
          userData.salt = salt;
          userData.passwordHash = passwordHash;
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          await logSecurityEvent(env, AUDIT_EVENT_TYPES.AUTH_SUCCESS, {
            ip: clientIP,
            user: cleanUser,
            details: { passwordResetByAdmin: true }
          }, AUDIT_SEVERITY.INFO);
          return json({ ok: true, message: `کلمه عبور کاربر ${cleanUser} با موفقیت به‌روزرسانی شد.` });
        }

        if (action === 'set_plan') {
          const targetPlan = body.plan || '1_month';
          if (targetPlan === 'lifetime') {
            userData.plan = 'lifetime';
            userData.planName = 'دائمی و نامحدود';
            userData.durationDays = 0;
            userData.subscriptionUntil = null;
          } else {
            let days = 30;
            let label = '۱ ماهه (۳۰ روز)';
            if (targetPlan === '3_months') { days = 90; label = '۳ ماهه (۹۰ روز)'; }
            else if (targetPlan === '6_months') { days = 180; label = '۶ ماهه (۱۸۰ روز)'; }
            else if (targetPlan === 'custom') {
              days = Math.max(1, parseInt(body.customDays || body.durationDays || 15, 10));
              label = `${days} روزه (سفارشی)`;
            }
            userData.plan = targetPlan;
            userData.planName = label;
            userData.durationDays = days;
            userData.subscriptionUntil = Date.now() + days * 86400 * 1000;
          }
          userData.isSuspended = false;
          if (userData.telegram) userData.telegram.enabled = true;
          if (userData.status?.error && userData.status.error.includes('اشتراک')) {
            userData.status.error = null;
          }
          await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          return json({ ok: true, plan: userData.plan, planName: userData.planName, durationDays: userData.durationDays });
        }

        return json({ error: 'عملیات نامعتبر' }, 400);
      } catch (err) {
        return json({ error: 'خطا در اعمال عملیات' }, 500);
      }
    }

    // ==========================================
    // 👤 بخش مدیریت کاربران (ثبت‌نام، ورود، تمدید)
    // ==========================================

    // ثبت‌نام کاربر جدید با الزامی بودن کد لایسنس/ردیم
    if (url.pathname === '/api/user/register' && request.method === 'POST') {
      const rl = await checkRateLimit(env, `rl:reg:${clientIP}`, 5, 900);
      if (!rl.allowed) {
        return json({ error: 'تلاش بیش از حد برای ثبت‌نام. لطفاً دقایقی دیگر امتحان کنید.' }, 429);
      }

      try {
        const { username, password, licenseCode } = await request.json();
        const cleanUser = String(username || '').trim().toLowerCase();
        const rawPass = String(password || '');
        let cleanCode = String(licenseCode || '').trim().toUpperCase();

        if (!cleanUser || !/^[a-zA-Z0-9_]{3,24}$/.test(cleanUser)) {
          return json({ error: 'نام کاربری باید بین ۳ تا ۲۴ کاراکتر و فقط شامل حروف انگلیسی، عدد و _ باشد.' }, 400);
        }

        const passValidation = validatePasswordStrength(rawPass);
        if (!passValidation.valid) {
          return json({ error: passValidation.error }, 400);
        }

        // 🛡️ بررسی پیشگیرانه عدم وجود نام کاربری تکراری (پیش از مصرف یا باطل شدن کد لایسنس)
        const existing = await env.KV.get('user:' + cleanUser);
        if (existing) {
          return json({ error: 'این نام کاربری قبلاً ثبت شده است. لطفاً نام دیگری برگزینید.' }, 400);
        }

        // 🎟️ بررسی و اعتبارسنجی کد لایسنس
        let usersList = await env.KV.get('users_list', 'json') || [];
        const isFirstUser = usersList.length === 0;

        let codeData = null;
        let plan = '1_month';
        let planName = '۱ ماهه (۳۰ روز)';
        let durationDays = 30;
        let subscriptionUntil = Date.now() + 30 * 86400 * 1000;
        let userRole = isFirstUser ? 'admin' : 'user';

        if (isFirstUser && (!cleanCode || cleanCode === 'ADMIN' || cleanCode === 'FIRST')) {
          // کاربر نخست به عنوان مدیر ارشد با پلن دائمی نامحدود ثبت می‌شود
          plan = 'lifetime';
          planName = 'دائمی و نامحدود (مدیر ارشد)';
          durationDays = 0;
          subscriptionUntil = null;
          cleanCode = 'ROOT-ADMIN-INIT';
        } else {
          // 🎟️ بررسی و اعتبارسنجی کد لایسنس
          if (!cleanCode) {
            return json({ error: 'ورود کد لایسنس / ردیم‌کد جهت ثبت‌نام الزامی است. لطفاً کد خریداری‌شده را وارد کنید.' }, 400);
          }

          codeData = await env.KV.get('code:' + cleanCode, 'json');
          if (!codeData) {
            return json({ error: 'کد لایسنس وارد شده نامعتبر است یا در سیستم وجود ندارد.' }, 400);
          }
          if (codeData.isUsed) {
            return json({ error: 'این کد لایسنس قبلاً توسط کاربر دیگری مصرف شده است.' }, 400);
          }

          // علامت‌گذاری کد به عنوان مصرف‌شده
          codeData.isUsed = true;
          codeData.usedBy = cleanUser;
          codeData.usedAt = Date.now();
          await env.KV.put('code:' + cleanCode, JSON.stringify(codeData));

          plan = codeData.plan || '1_month';
          durationDays = codeData.durationDays !== undefined ? codeData.durationDays : 30;
          planName = codeData.planName || (codeData.plan === 'lifetime' ? 'دائمی و نامحدود' : `${durationDays} روزه`);
          subscriptionUntil = codeData.plan === 'lifetime'
            ? null
            : (Date.now() + durationDays * 86400 * 1000);
        }

        const salt = generateRandomHex(16);
        const passwordHash = await hashPassword(rawPass, salt);

        const newUser = {
          username: cleanUser,
          role: userRole,
          passwordHash,
          salt,
          createdAt: Date.now(),
          licenseCode: cleanCode,
          plan,
          planName,
          durationDays,
          subscriptionUntil,
          isSuspended: false,
          telegram: null,
          status: { lastUpdate: null, lastTime: null, error: null }
        };

        await env.KV.put('user:' + cleanUser, JSON.stringify(newUser));

        if (!usersList.includes(cleanUser)) {
          usersList.push(cleanUser);
          await env.KV.put('users_list', JSON.stringify(usersList));
        }

        const token = generateRandomHex(32);
        await env.KV.put('token:' + token, JSON.stringify({
          username: cleanUser,
          createdAt: Date.now(),
          ip: clientIP
        }), {
          expirationTtl: 30 * 86400
        });

        return json({ ok: true, token, username: cleanUser, role: userRole, isAdmin: userRole === 'admin', plan: newUser.plan, planName: newUser.planName });
      } catch (err) {
        return json({ error: err.message || 'خطا در ثبت‌نام کاربر' }, 500);
      }
    }

    // تمدید اشتراک با ردیم‌کد جدید
    if (url.pathname === '/api/user/redeem' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { licenseCode } = await request.json();
        const cleanCode = String(licenseCode || '').trim().toUpperCase();

        if (!cleanCode) return json({ error: 'کد لایسنس الزامی است' }, 400);

        const codeData = await env.KV.get('code:' + cleanCode, 'json');
        if (!codeData || codeData.isUsed) {
          return json({ error: 'کد لایسنس نامعتبر است یا قبلاً مصرف شده است.' }, 400);
        }

        codeData.isUsed = true;
        codeData.usedBy = auth.username;
        codeData.usedAt = Date.now();
        await env.KV.put('code:' + cleanCode, JSON.stringify(codeData));

        if (codeData.plan === 'lifetime') {
          auth.user.subscriptionUntil = null;
          auth.user.plan = 'lifetime';
          auth.user.planName = 'دائمی و نامحدود';
          auth.user.durationDays = 0;
        } else {
          const addDays = codeData.durationDays !== undefined ? codeData.durationDays : 30;
          const extraMs = addDays * 86400 * 1000;
          const currentSub = auth.user.subscriptionUntil && auth.user.subscriptionUntil > Date.now()
            ? auth.user.subscriptionUntil
            : Date.now();
          auth.user.subscriptionUntil = currentSub + extraMs;
          auth.user.plan = codeData.plan || auth.user.plan;
          auth.user.planName = codeData.planName || `${addDays} روزه`;
          auth.user.durationDays = addDays;
        }

        // خروج آنی حساب از تعلیق و فعال‌سازی مجدد سلف‌بات
        auth.user.isSuspended = false;
        if (auth.user.telegram) {
          auth.user.telegram.enabled = true;
        }
        if (auth.user.status?.error && auth.user.status.error.includes('اشتراک')) {
          auth.user.status.error = null;
        }

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        const subInfo = checkUserSubscription(auth.user);
        return json({
          ok: true,
          plan: auth.user.plan,
          planName: auth.user.planName,
          subscriptionUntil: auth.user.subscriptionUntil,
          remainingDays: subInfo.remainingDays,
          isSuspended: false
        });
      } catch (err) {
        return json({ error: 'خطا در فعال‌سازی کد لایسنس' }, 500);
      }
    }

    // ورود به حساب با سیستم ضد بروت‌فورس
    if (url.pathname === '/api/user/login' && request.method === 'POST') {
      const rl = await checkRateLimit(env, `rl:login:${clientIP}`, 5, 300);
      if (!rl.allowed) {
        return json({ error: 'حساب موقتاً قفل شد. لطفاً ۵ دقیقه دیگر مجدداً تلاش کنید.' }, 429);
      }

      try {
        const { username, password, totpCode } = await request.json();
        const cleanUser = String(username || '').trim().toLowerCase();
        const rawPass = String(password || '');

        const userData = await env.KV.get('user:' + cleanUser, 'json');
        if (!userData || !userData.passwordHash || !userData.salt) {
          await logSecurityEvent(env, AUDIT_EVENT_TYPES.AUTH_FAILURE, { ip: clientIP, user: cleanUser, details: { reason: 'user_not_found' } }, AUDIT_SEVERITY.WARNING);
          return json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, 400);
        }

        const isValid = await verifyPassword(rawPass, userData.salt, userData.passwordHash);
        if (!isValid) {
          await logSecurityEvent(env, AUDIT_EVENT_TYPES.AUTH_FAILURE, { ip: clientIP, user: cleanUser, details: { reason: 'invalid_password' } }, AUDIT_SEVERITY.WARNING);
          return json({ error: 'نام کاربری یا رمز عبور اشتباه است.' }, 400);
        }

        // بررسی احراز هویت دو مرحله‌ای (2FA) در صورت فعال بودن
        if (userData.totp && userData.totp.enabled) {
          if (!totpCode) {
            return json({ ok: false, requires2FA: true, message: 'کد تایید دو مرحله‌ای (2FA) الزامی است.' });
          }
          const cleanCode = String(totpCode).trim();
          const isTotpValid = await verifyTotpToken(cleanCode, userData.totp.secret);
          const isBackupValid = Array.isArray(userData.totp.backupCodes) && userData.totp.backupCodes.includes(cleanCode);

          if (!isTotpValid && !isBackupValid) {
            await logSecurityEvent(env, AUDIT_EVENT_TYPES.AUTH_FAILURE, { ip: clientIP, user: cleanUser, details: { reason: 'invalid_totp' } }, AUDIT_SEVERITY.WARNING);
            return json({ error: 'کد تایید دو مرحله‌ای (2FA) یا کد بازیابی نادرست است.' }, 401);
          }

          if (isBackupValid) {
            // سوزاندن کد بازیابی اضطراری مصرف‌شده
            userData.totp.backupCodes = userData.totp.backupCodes.filter(c => c !== cleanCode);
            await env.KV.put('user:' + cleanUser, JSON.stringify(userData));
          }
        }

        await logSecurityEvent(env, AUDIT_EVENT_TYPES.AUTH_SUCCESS, { ip: clientIP, user: cleanUser, details: { method: userData.totp?.enabled ? 'password+2fa' : 'password' } }, AUDIT_SEVERITY.INFO);

        const token = generateRandomHex(32);
        await env.KV.put('token:' + token, JSON.stringify({
          username: cleanUser,
          createdAt: Date.now(),
          ip: clientIP
        }), {
          expirationTtl: 30 * 86400
        });

        const isUserAdmin = userData.role === 'admin' || cleanUser === 'amirmaster' || cleanUser === 'admin';
        return json({ ok: true, token, username: cleanUser, role: isUserAdmin ? 'admin' : 'user', isAdmin: isUserAdmin });
      } catch (err) {
        return json({ error: err.message || 'خطا در ورود به حساب' }, 500);
      }
    }

    // تغییر رمز عبور کاربر
    if (url.pathname === '/api/user/change-password' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { oldPassword, newPassword } = await request.json();
        const isValidOld = await verifyPassword(String(oldPassword || ''), auth.user.salt, auth.user.passwordHash);
        if (!isValidOld) {
          return json({ error: 'رمز عبور فعلی نادرست است.' }, 400);
        }

        const passValidation = validatePasswordStrength(String(newPassword || ''));
        if (!passValidation.valid) {
          return json({ error: passValidation.error }, 400);
        }

        const newSalt = generateRandomHex(16);
        auth.user.salt = newSalt;
        auth.user.passwordHash = await hashPassword(newPassword, newSalt);
        auth.user.passwordChangedAt = Date.now();

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        return json({ ok: true, message: 'رمز عبور با موفقیت به‌روزرسانی شد.' });
      } catch (err) {
        return json({ error: 'خطا در تغییر رمز عبور' }, 500);
      }
    }

    // تغییر وضعیت فعال/غیرفعال سلف‌بات بدون حذف اتصال
    if (url.pathname === '/api/user/toggle-bot' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      const sub = checkUserSubscription(auth.user);
      if (!sub.active || auth.user.isSuspended) {
        return json({ error: 'اشتراک شما به پایان رسیده و پنل در حالت تعلیق است. لطفاً اشتراک خود را تمدید فرمایید.', isSuspended: true }, 403);
      }

      if (!auth.user.telegram) return json({ error: 'اکانت تلگرام متصل نیست' }, 400);

      auth.user.telegram.enabled = !auth.user.telegram.enabled;
      if (auth.user.telegram.enabled) {
        if (auth.user.status) auth.user.status.error = null;
        await updateSingleUserProfile(auth.user, env, true);
      }
      await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
      const freshUser = await env.KV.get('user:' + auth.username, 'json');
      return json({ ok: true, enabled: auth.user.telegram.enabled, status: freshUser?.status });
    }

    // خروج از حساب
    if (url.pathname === '/api/user/logout' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization') || '';
      if (authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7).trim();
        await env.KV.delete('token:' + token);
      }
      return json({ ok: true });
    }

    // حذف کامل حساب کاربری
    if (url.pathname === '/api/user/delete-account' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { password } = await request.json();
        const isValid = await verifyPassword(String(password || ''), auth.user.salt, auth.user.passwordHash);
        if (!isValid) {
          return json({ error: 'رمز عبور وارد شده نادرست است.' }, 400);
        }

        await env.KV.delete('token:' + auth.token);
        await env.KV.delete('miniapp_token:' + auth.username);
        await env.KV.delete('user:' + auth.username);
        await env.KV.delete('temp_auth_' + auth.username);

        let usersList = await env.KV.get('users_list', 'json') || [];
        usersList = usersList.filter(u => u !== auth.username);
        await env.KV.put('users_list', JSON.stringify(usersList));

        return json({ ok: true, deleted: true });
      } catch (err) {
        return json({ error: 'خطا در حذف حساب کاربری' }, 500);
      }
    }

    // استعلام مشخصات کاربر جاری همراه با هوشمندسازی تعلیق در صورت انقضای اشتراک
    if (url.pathname === '/api/user/me' && request.method === 'GET') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      const sub = checkUserSubscription(auth.user);
      let stateChanged = false;

      // بررسی هوشمند خودکار: تعلیق خودکار در صورت پایان مدت زمان اشتراک
      if (!sub.active) {
        if (!auth.user.isSuspended || auth.user.telegram?.enabled) {
          auth.user.isSuspended = true;
          if (auth.user.telegram) auth.user.telegram.enabled = false;
          auth.user.status = auth.user.status || {};
          auth.user.status.error = 'اشتراک شما به پایان رسیده و پنل به حالت تعلیق درآمده است. لطفاً برای فعال‌سازی مجدد، اشتراک خود را تمدید فرمایید.';
          stateChanged = true;
        }
      }

      if (stateChanged) {
        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
      }

      // خوددرمانگری هوشمند وب‌هوک با کش ۶ ساعته (جلوگیری از ارسال ریکوئست به تلگرام در هر رفرش داشبورد)
      if (auth.user.telegram?.bot?.token) {
        const botTok = auth.user.telegram.bot.token;
        const lastChecked = verifiedWebhooks.get(botTok) || 0;
        if (Date.now() - lastChecked > 6 * 3600 * 1000) {
          verifiedWebhooks.set(botTok, Date.now());
          const hostUrl = new URL(request.url).origin;
          const expectedWebhook = `${hostUrl}/api/bot-webhook/${encodeURIComponent(auth.username)}`;
          fetch(`https://api.telegram.org/bot${botTok}/getWebhookInfo`)
            .then(r => r.json())
            .then(info => {
              if (info?.ok && info.result?.url !== expectedWebhook) {
                fetch(`https://api.telegram.org/bot${botTok}/setWebhook`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    url: expectedWebhook,
                    allowed_updates: ['message', 'edited_message', 'callback_query']
                  })
                }).catch(() => {});
              }
            })
            .catch(() => {});
        }
      }

      const isUserAdmin = auth.user.role === 'admin' || auth.username === 'amirmaster' || auth.username === 'admin';

      const liveStatus = {
        lastTime: (auth.user.telegram?.enabled && !auth.user.status?.error)
          ? getStylizedTime(auth.user.telegram?.digits, auth.user.telegram?.colon, new Date(), {
              prefix: auth.user.telegram?.prefix,
              suffix: auth.user.telegram?.suffix,
              is12h: auth.user.telegram?.is12h
            })
          : (auth.user.status?.lastTime || null),
        lastUpdate: auth.user.status?.lastUpdate || Date.now(),
        error: auth.user.status?.error || null
      };

      return json({
        ok: true,
        username: auth.username,
        role: isUserAdmin ? 'admin' : 'user',
        isAdmin: isUserAdmin,
        plan: auth.user.plan || 'استاندارد',
        planName: sub.planName || auth.user.planName || 'استاندارد',
        subscriptionUntil: auth.user.subscriptionUntil,
        isSuspended: !sub.active || !!auth.user.isSuspended,
        isExpired: !sub.active,
        remainingDays: sub.isLifetime ? 'نامحدود' : (sub.remainingDays ?? 0),
        remainingMs: sub.remainingMs ?? 0,
        isLifetime: !!sub.isLifetime,
        hasTelegram: !!auth.user.telegram?.sessionEncrypted,
        enabled: auth.user.telegram?.enabled ?? false,
        digits: auth.user.telegram?.digits,
        colon: auth.user.telegram?.colon || ':',
        prefix: auth.user.telegram?.prefix || '',
        suffix: auth.user.telegram?.suffix || '',
        is12h: !!auth.user.telegram?.is12h,
        bioEnabled: !!auth.user.telegram?.bioEnabled,
        bioTemplate: auth.user.telegram?.bioTemplate || '',
        sleepEnabled: !!auth.user.telegram?.sleepEnabled,
        sleepStart: auth.user.telegram?.sleepStart ?? 23,
        sleepEnd: auth.user.telegram?.sleepEnd ?? 7,
        sleepText: auth.user.telegram?.sleepText || '😴 Sleep',
        afkEnabled: !!auth.user.telegram?.afkEnabled,
        afkMessage: auth.user.telegram?.afkMessage || '',
        afkCooldown: auth.user.telegram?.afkCooldown ?? 10,
        muteEnabled: !!auth.user.telegram?.muteEnabled || (Array.isArray(auth.user.telegram?.mutedUsers) && auth.user.telegram.mutedUsers.length > 0),
        mutedUsers: auth.user.telegram?.mutedUsers || [],
        antiTtlEnabled: !!(auth.user.telegram?.antiTtlEnabled ?? auth.user.antiTtlEnabled),
        // 👻 Ghost Mode
        ghostMode: !!auth.user.telegram?.ghostMode,
        ghostExcludeList: auth.user.telegram?.ghostExcludeList || [],
        // 🤖 AI Smart Reply
        aiReplyEnabled: !!auth.user.telegram?.aiReplyEnabled,
        aiProvider: auth.user.telegram?.aiProvider || 'gemini',
        aiModel: auth.user.telegram?.aiModel || 'gemini-2.5-flash',
        aiApiKey: auth.user.telegram?.aiApiKey || '',
        aiSystemPrompt: auth.user.telegram?.aiSystemPrompt || '',
        aiContext: auth.user.telegram?.aiContext || '',
        aiMaxReplies: auth.user.telegram?.aiMaxReplies ?? 3,
        aiCooldown: auth.user.telegram?.aiCooldown ?? 5,
        aiIgnoredUsers: auth.user.telegram?.aiIgnoredUsers || [],
        userId: auth.user.telegram?.userId || null,
        bot: auth.user.telegram?.bot || null,
        totpEnabled: !!auth.user.totp?.enabled,
        totpBackupCodes: (auth.user.totp?.enabled && Array.isArray(auth.user.totp?.backupCodes)) ? auth.user.totp.backupCodes : [],
        status: liveStatus
      });
    }

    // ==========================================
    // 🛡️ تایید دو مرحله‌ای (2FA / TOTP)
    // ==========================================

    // راه‌اندازی و تولید کلید محرمانه 2FA
    if (url.pathname === '/api/user/2fa/setup' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const secret = generateTotpSecret(20);
        const backupCodes = generateBackupCodes(8);
        const otpauthUri = getTotpAuthUri(auth.username, secret, 'Arizo Studio');

        let qrSvg = '';
        try {
          qrSvg = await QRCode.toString(otpauthUri, { type: 'svg', width: 200, margin: 1 });
        } catch (qrErr) {
          console.error('QR generation error:', qrErr);
        }

        await env.KV.put('temp_totp_setup:' + auth.username, JSON.stringify({
          secret,
          backupCodes,
          createdAt: Date.now()
        }), { expirationTtl: 600 });

        return json({
          ok: true,
          secret,
          backupCodes,
          otpauthUri,
          qrSvg
        });
      } catch (err) {
        return json({ error: 'خطا در ایجاد تنظیمات 2FA' }, 500);
      }
    }

    // تایید و فعال‌سازی نهایی 2FA
    if (url.pathname === '/api/user/2fa/enable' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { code } = await request.json();
        const pending = await env.KV.get('temp_totp_setup:' + auth.username, 'json');
        if (!pending || !pending.secret) {
          return json({ error: 'مهلت فعال‌سازی به پایان رسیده است. مجدداً اقدام کنید.' }, 400);
        }

        const isValid = await verifyTotpToken(code, pending.secret);
        if (!isValid) {
          return json({ error: 'کد ۶ رقمی وارد شده نامعتبر است.' }, 400);
        }

        auth.user.totp = {
          enabled: true,
          secret: pending.secret,
          backupCodes: pending.backupCodes,
          enabledAt: Date.now()
        };

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        await env.KV.delete('temp_totp_setup:' + auth.username);

        await logSecurityEvent(env, AUDIT_EVENT_TYPES.TOTP_ENABLED, {
          ip: clientIP,
          user: auth.username,
          details: { method: 'totp_setup' }
        }, AUDIT_SEVERITY.INFO);

        return json({ ok: true, enabled: true, backupCodes: pending.backupCodes });
      } catch (err) {
        return json({ error: 'خطا در فعال‌سازی 2FA' }, 500);
      }
    }

    // غیرفعال‌سازی 2FA
    if (url.pathname === '/api/user/2fa/disable' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { password, code } = await request.json();
        const isPassValid = await verifyPassword(String(password || ''), auth.user.salt, auth.user.passwordHash);
        let isCodeValid = false;
        if (code && auth.user.totp?.secret) {
          isCodeValid = await verifyTotpToken(code, auth.user.totp.secret);
        }

        if (!isPassValid && !isCodeValid) {
          return json({ error: 'جهت غیرفعال‌سازی، ورود رمز عبور حساب یا کد معتبر الزامی است.' }, 400);
        }

        auth.user.totp = { enabled: false };
        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));

        await logSecurityEvent(env, AUDIT_EVENT_TYPES.TOTP_DISABLED, {
          ip: clientIP,
          user: auth.username,
          details: { method: 'user_action' }
        }, AUDIT_SEVERITY.WARNING);

        return json({ ok: true, disabled: true });
      } catch (err) {
        return json({ error: 'خطا در غیرفعال‌سازی 2FA' }, 500);
      }
    }

    // ==========================================
    // 💾 پشتیبان‌گیری رمزنگاری‌شده و بازیابی (Backup Manager)
    // ==========================================

    // استخراج نسخه پشتیبان امن رمزنگاری‌شده
    if (url.pathname === '/api/user/backup/export' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { password } = await request.json();
        if (!password || password.length < 8) {
          return json({ error: 'رمز عبور پشتیبان باید حداقل ۸ کاراکتر باشد.' }, 400);
        }

        const safeData = {
          username: auth.username,
          plan: auth.user.plan,
          planName: auth.user.planName,
          telegram: {
            enabled: auth.user.telegram?.enabled,
            digits: auth.user.telegram?.digits,
            colon: auth.user.telegram?.colon,
            prefix: auth.user.telegram?.prefix,
            suffix: auth.user.telegram?.suffix,
            is12h: auth.user.telegram?.is12h,
            bioEnabled: auth.user.telegram?.bioEnabled,
            bioTemplate: auth.user.telegram?.bioTemplate,
            sleepEnabled: auth.user.telegram?.sleepEnabled,
            sleepStart: auth.user.telegram?.sleepStart,
            sleepEnd: auth.user.telegram?.sleepEnd,
            sleepText: auth.user.telegram?.sleepText,
            afkEnabled: auth.user.telegram?.afkEnabled,
            afkMessage: auth.user.telegram?.afkMessage,
            afkCooldown: auth.user.telegram?.afkCooldown,
            mutedUsers: auth.user.telegram?.mutedUsers,
            ghostMode: auth.user.telegram?.ghostMode,
            antiTtlEnabled: auth.user.telegram?.antiTtlEnabled
          }
        };

        const encryptedBackup = await BackupManager.exportEncryptedBackup(safeData, password);

        await logSecurityEvent(env, AUDIT_EVENT_TYPES.CONFIG_MUTATED, {
          ip: clientIP,
          user: auth.username,
          details: { action: 'backup_export' }
        }, AUDIT_SEVERITY.INFO);

        return json({
          ok: true,
          backup: encryptedBackup,
          fileName: `arizo-backup-${auth.username}-${new Date().toISOString().slice(0, 10)}.json`
        });
      } catch (err) {
        return json({ error: err.message || 'خطا در خروجی پشتیبان' }, 500);
      }
    }

    // بازگردانی نسخه پشتیبان امن
    if (url.pathname === '/api/user/backup/import' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      try {
        const { backupData, password } = await request.json();
        if (!backupData || !password) {
          return json({ error: 'محتوای فایل پشتیبان و رمز عبور الزامی است.' }, 400);
        }

        const restored = await BackupManager.importEncryptedBackup(String(backupData), String(password));
        if (!restored || !restored.telegram) {
          return json({ error: 'فایل پشتیبان فاقد تنظیمات معتبر است.' }, 400);
        }

        // ادغام تنظیمات بازیابی‌شده با کاربر جاری با حفظ سشن اتصال
        auth.user.telegram = {
          ...auth.user.telegram,
          ...restored.telegram,
          sessionEncrypted: auth.user.telegram?.sessionEncrypted,
          userId: auth.user.telegram?.userId,
          bot: auth.user.telegram?.bot
        };

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));

        await logSecurityEvent(env, AUDIT_EVENT_TYPES.CONFIG_MUTATED, {
          ip: clientIP,
          user: auth.username,
          details: { action: 'backup_import' }
        }, AUDIT_SEVERITY.INFO);

        return json({ ok: true, restored: true });
      } catch (err) {
        return json({ error: err.message || 'خطا در بازگردانی پشتیبان' }, 400);
      }
    }

    // ==========================================
    // 📱 بخش تلگرام کاربر (تحت کنترل کاربر جاری)
    // ==========================================

    // ارسال کد تأیید تلگرام با ضد اسپم
    if (url.pathname === '/api/auth/send-code' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      const rl = await checkRateLimit(env, `rl:tg:${auth.username}`, 3, 600);
      if (!rl.allowed) {
        return json({ error: 'جهت جلوگیری از بلاک شدن شماره در تلگرام، لطفاً ۱۰ دقیقه صبر کنید.' }, 429);
      }

      try {
        const { phone } = await request.json();
        if (!phone) return json({ error: 'شماره تلفن الزامی است' }, 400);

        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        const client = new TelegramClient(
          new StringSession(''),
          parseInt(env.API_ID),
          env.API_HASH,
          { connectionRetries: 2, timeout: 20000 }
        );
        await client.connect();

        const res = await client.sendCode(
          { apiId: parseInt(env.API_ID), apiHash: env.API_HASH },
          cleanPhone
        );

        const tempSession = client.session.save();
        await client.disconnect();

        await env.KV.put('temp_auth_' + auth.username, JSON.stringify({
          session: tempSession,
          phoneCodeHash: res.phoneCodeHash,
          phone: cleanPhone
        }), { expirationTtl: 600 });

        return json({ ok: true, phoneCodeHash: res.phoneCodeHash });
      } catch (err) {
        console.error('send-code error:', err);
        return json({ error: err.message || 'خطا در ارسال کد تأیید تلگرام' }, 500);
      }
    }

    // بررسی و تایید کد پیامک تلگرام
    if (url.pathname === '/api/auth/verify-code' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      try {
        const { code, digits, colon } = await request.json();
        const rawAuth = await env.KV.get('temp_auth_' + auth.username, 'json');
        if (!rawAuth || !rawAuth.session || !rawAuth.phoneCodeHash) {
          return json({ error: 'نشست منقضی شده است. لطفاً مجدداً شماره را وارد کنید.' }, 400);
        }

        const client = new TelegramClient(
          new StringSession(rawAuth.session),
          parseInt(env.API_ID),
          env.API_HASH,
          { connectionRetries: 2, timeout: 20000 }
        );
        await client.connect();

        try {
          await client.invoke(new Api.auth.SignIn({
            phoneNumber: rawAuth.phone,
            phoneCodeHash: rawAuth.phoneCodeHash,
            phoneCode: String(code).trim(),
          }));

          const plainSession = client.session.save();
          await client.disconnect();

          const sessionEncrypted = await encryptSession(plainSession, env.API_HASH);

          auth.user.telegram = {
            ...(auth.user.telegram || {}),
            sessionEncrypted,
            digits: digits || auth.user.telegram?.digits || null,
            colon: colon || auth.user.telegram?.colon || ':',
            enabled: true,
            connectedAt: Date.now(),
          };
          auth.user.status = { lastUpdate: null, lastTime: null, error: null };

          await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
          await env.KV.delete('temp_auth_' + auth.username);

          await updateSingleUserProfile(auth.user, env, true);

          return json({ ok: true, connected: true });
        } catch (signInErr) {
          if (signInErr.errorMessage === 'SESSION_PASSWORD_NEEDED') {
            rawAuth.session = client.session.save();
            await env.KV.put('temp_auth_' + auth.username, JSON.stringify(rawAuth), { expirationTtl: 600 });
            await client.disconnect();
            return json({ ok: true, needs2FA: true });
          }
          await client.disconnect();
          throw signInErr;
        }
      } catch (err) {
        console.error('verify-code error:', err);
        return json({ error: err.message || 'کد وارد شده اشتباه یا منقضی است' }, 500);
      }
    }

    // تایید رمز دو مرحله‌ای (2FA)
    if (url.pathname === '/api/auth/verify-password' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      try {
        const { password, digits, colon } = await request.json();
        const rawAuth = await env.KV.get('temp_auth_' + auth.username, 'json');
        if (!rawAuth || !rawAuth.session) {
          return json({ error: 'نشست منقضی شده است. لطفاً مجدداً تلاش کنید.' }, 400);
        }

        const client = new TelegramClient(
          new StringSession(rawAuth.session),
          parseInt(env.API_ID),
          env.API_HASH,
          { connectionRetries: 2, timeout: 20000 }
        );
        await client.connect();

        const passwordSrpResult = await client.invoke(new Api.account.GetPassword());
        const passwordSrpCheck = await computeCheck(passwordSrpResult, password);
        await client.invoke(new Api.auth.CheckPassword({ password: passwordSrpCheck }));

        const plainSession = client.session.save();
        await client.disconnect();

        const sessionEncrypted = await encryptSession(plainSession, env.API_HASH);

        auth.user.telegram = {
          ...(auth.user.telegram || {}),
          sessionEncrypted,
          digits: digits || auth.user.telegram?.digits || null,
          colon: colon || auth.user.telegram?.colon || ':',
          enabled: true,
          connectedAt: Date.now(),
        };
        auth.user.status = { lastUpdate: null, lastTime: null, error: null };

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        await env.KV.delete('temp_auth_' + auth.username);

        await updateSingleUserProfile(auth.user, env, true);

        return json({ ok: true, connected: true });
      } catch (err) {
        console.error('verify-password error:', err);
        return json({ error: err.message || 'رمز دوعاملی وارد شده اشتباه است' }, 500);
      }
    }

    // اتصال مستقیم با سشن (StringSession)
    if (url.pathname === '/api/connect' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      const sub = checkUserSubscription(auth.user);
      if (!sub.active || auth.user.isSuspended) {
        return json({ error: 'اشتراک شما به پایان رسیده و پنل در حالت تعلیق است. لطفاً اشتراک خود را تمدید فرمایید.', isSuspended: true }, 403);
      }

      try {
        const b = await request.json();
        if (!b.session) return json({ error: 'سشن تلگرام الزامی است' }, 400);

        const sessionEncrypted = await encryptSession(b.session.trim(), env.API_HASH);

        auth.user.telegram = {
          ...(auth.user.telegram || {}),
          sessionEncrypted,
          digits: b.digits || auth.user.telegram?.digits || null,
          colon: b.colon || auth.user.telegram?.colon || ':',
          enabled: true,
          connectedAt: Date.now(),
        };
        auth.user.status = { lastUpdate: null, lastTime: null, error: null };

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        await updateSingleUserProfile(auth.user, env, true);

        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message || 'خطا در ثبت سشن' }, 500);
      }
    }

    // 🧪 تست سلامت و بررسی ۱۰۰٪ صحت کلید API هوش مصنوعی (AI API Health & Verification Check)
    if (url.pathname === '/api/user/test-ai' && request.method === 'POST') {
      try {
        const auth = await getAuthUser(request, env);
        const isAdmin = !auth ? await getAdminAuth(request, env) : false;
        if (!auth && !isAdmin) return json({ ok: false, error: 'احراز هویت ناموفق بود', errorEn: 'Unauthorized session' }, 401);

        if (auth && !isAdmin) {
          const sub = checkUserSubscription(auth.user);
          if (!sub.active || auth.user.isSuspended) {
            return json({
              ok: false,
              error: 'اشتراک شما به پایان رسیده و پنل در حالت تعلیق است.',
              errorEn: 'Your subscription has expired.'
            }, 403);
          }
        }

        const b = await request.json().catch(() => ({}));
        let apiKey = (b.apiKey || (auth && auth.user && auth.user.telegram && auth.user.telegram.aiApiKey) || '').trim();
        const provider = (b.provider || (auth && auth.user && auth.user.telegram && auth.user.telegram.aiProvider) || 'gemini').toLowerCase().trim();
        const model = (b.model || (auth && auth.user && auth.user.telegram && auth.user.telegram.aiModel) || '').trim();

        if (!apiKey) {
          apiKey = (auth.user.telegram?.aiApiKey || '').trim();
        }

        if (!apiKey) {
          return json({
            ok: false,
            error: 'کلید API هوش مصنوعی وارد نشده است. لطفاً ابتدا کلید خود را در کادر مربوطه وارد نمایید.',
            errorEn: 'AI API Key is empty. Please enter your API key first.'
          }, 400);
        }

        const tStart = Date.now();
        const testUserMsg = 'Ping test: Reply with exactly: "OK - API Connected"';
        const testSysPrompt = 'You are an API diagnostic tester. Reply strictly and only with: "OK - API Connected"';

        const reply = await callAIApiWorker(provider, apiKey, testSysPrompt, '', testUserMsg, model);
        const latency = Date.now() - tStart;

        if (reply && reply.trim()) {
          const effectiveModel = model || (provider === 'gemini' ? 'gemini-2.5-flash' : (provider === 'custom' ? 'deepseek-chat' : 'gpt-4o-mini'));
          return json({
            ok: true,
            latency,
            provider,
            model: effectiveModel,
            sample: reply.trim(),
            message: 'اتصال به API هوش مصنوعی ۱۰۰٪ سالم و بدون اختلال است.',
            messageEn: 'AI API connection is 100% healthy and verified successfully.'
          });
        } else {
          return json({
            ok: false,
            latency,
            provider,
            error: 'پاسخی از سرور هوش مصنوعی دریافت نشد. ممکن است مدل انتخاب‌شده در دسترس نباشد یا کلید فاقد اعتبار باشد.',
            errorEn: 'No response received from AI server. The selected model may be unavailable or the API key lacks permissions.'
          }, 400);
        }
      } catch (err) {
        const errMsg = String(err.message || 'خطای اتصال به هوش مصنوعی');
        let friendlyFa = errMsg;
        let friendlyEn = 'Failed to verify AI API key.';

        if (errMsg.includes('401') || errMsg.includes('API_KEY_INVALID') || errMsg.includes('Incorrect API key') || errMsg.includes('unauthorized') || errMsg.includes('Invalid API key')) {
          friendlyFa = 'کلید API وارد شده نامعتبر یا غیرمجاز است (401 Unauthorized). لطفاً کلید صحیح را از کنسول هوش مصنوعی کپی و وارد کنید.';
          friendlyEn = 'Invalid or unauthorized API Key (401 Unauthorized). Please check your key in the provider console.';
        } else if (errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('insufficient_quota') || errMsg.includes('Rate limit')) {
          friendlyFa = 'محدودیت یا سهمیه اعتبار کلید شما به پایان رسیده است (429 Quota Exceeded).';
          friendlyEn = 'API Key quota exceeded or rate limit reached (429 Quota Exceeded).';
        } else if (errMsg.includes('404') || errMsg.includes('not found') || errMsg.includes('models/')) {
          friendlyFa = 'مدل انتخابی در سرویس‌دهنده یافت نشد یا در منطقه سرور مجاز نیست (404 Model Not Found).';
          friendlyEn = 'Selected model not found or unsupported by your provider (404 Model Not Found).';
        }

        return json({
          ok: false,
          error: friendlyFa,
          errorEn: friendlyEn,
          rawError: errMsg.slice(0, 180)
        }, 400);
      }
    }

    // ذخیره فونت و تنظیمات پیشرفته استودیو
    if ((url.pathname === '/api/fonts' || url.pathname === '/api/user/settings') && request.method === 'POST') {
      try {
        const auth = await getAuthUser(request, env);
        if (!auth) return json({ error: 'unauthorized' }, 401);

        const sub = checkUserSubscription(auth.user);
        if (!sub.active || auth.user.isSuspended) {
          return json({ error: 'اشتراک شما به پایان رسیده و پنل در حالت تعلیق است. لطفاً اشتراک خود را تمدید فرمایید.', isSuspended: true }, 403);
        }

        if (!auth.user.telegram) {
          auth.user.telegram = { enabled: false };
        }

        const b = await request.json().catch(() => ({}));
        if (Array.isArray(b.digits) && b.digits.length === 10) {
          auth.user.telegram.digits = b.digits.map(d => String(d).slice(0, 5));
        }
        if (typeof b.colon === 'string') {
          auth.user.telegram.colon = b.colon.slice(0, 5) || ':';
        }
        if (b.prefix !== undefined) {
          auth.user.telegram.prefix = String(b.prefix).slice(0, 15);
        }
        if (b.suffix !== undefined) {
          auth.user.telegram.suffix = String(b.suffix).slice(0, 15);
        }
        if (b.is12h !== undefined) {
          auth.user.telegram.is12h = !!b.is12h;
        }
        if (b.bioEnabled !== undefined) {
          auth.user.telegram.bioEnabled = !!b.bioEnabled;
        }
        if (b.bioTemplate !== undefined) {
          auth.user.telegram.bioTemplate = String(b.bioTemplate).slice(0, 70);
        }
        if (b.sleepEnabled !== undefined) {
          auth.user.telegram.sleepEnabled = !!b.sleepEnabled;
        }
        if (b.sleepStart !== undefined) {
          auth.user.telegram.sleepStart = parseInt(b.sleepStart, 10) || 0;
        }
        if (b.sleepEnd !== undefined) {
          auth.user.telegram.sleepEnd = parseInt(b.sleepEnd, 10) || 0;
        }
        if (b.sleepText !== undefined) {
          auth.user.telegram.sleepText = String(b.sleepText).slice(0, 30);
        }
        if (b.afkEnabled !== undefined) {
          auth.user.telegram.afkEnabled = !!b.afkEnabled;
        }
        if (b.afkMessage !== undefined) {
          auth.user.telegram.afkMessage = String(b.afkMessage).slice(0, 300);
        }
        if (b.afkCooldown !== undefined) {
          auth.user.telegram.afkCooldown = Math.max(1, parseInt(b.afkCooldown, 10) || 10);
        }
        if (b.mutedUsers !== undefined) {
          let rawList = [];
          if (Array.isArray(b.mutedUsers)) {
            rawList = b.mutedUsers;
          } else if (typeof b.mutedUsers === 'string') {
            rawList = b.mutedUsers.split(/[,،;\s]+/);
          }
          auth.user.telegram.mutedUsers = rawList.map(x => {
            let s = String(x).trim();
            s = s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
            s = s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
            return s;
          }).filter(Boolean);
        }
        if (b.muteEnabled !== undefined) {
          auth.user.telegram.muteEnabled = !!b.muteEnabled;
        }
        if (Array.isArray(auth.user.telegram.mutedUsers) && auth.user.telegram.mutedUsers.length > 0) {
          if (b.muteEnabled !== false) {
            auth.user.telegram.muteEnabled = true;
          }
        }
        if (b.antiTtlEnabled !== undefined) {
          auth.user.telegram.antiTtlEnabled = !!b.antiTtlEnabled;
          auth.user.antiTtlEnabled = !!b.antiTtlEnabled;
        }
        // 👻 تنظیمات حالت شبح (Ghost Mode / Anti-Read-Receipt)
        if (b.ghostMode !== undefined) {
          auth.user.telegram.ghostMode = !!b.ghostMode;
        }
        if (b.ghostExcludeList !== undefined) {
          let rawExclude = [];
          if (Array.isArray(b.ghostExcludeList)) {
            rawExclude = b.ghostExcludeList;
          } else if (typeof b.ghostExcludeList === 'string') {
            rawExclude = b.ghostExcludeList.split(/[,،;\s]+/);
          }
          auth.user.telegram.ghostExcludeList = rawExclude.map(x => String(x).trim()).filter(Boolean).slice(0, 50);
        }
        // 🤖 تنظیمات پاسخ هوشمند مبتنی بر AI (Smart AI Auto-Reply)
        if (b.aiReplyEnabled !== undefined) {
          auth.user.telegram.aiReplyEnabled = !!b.aiReplyEnabled;
        }
        if (b.aiProvider !== undefined) {
          const allowed = ['gemini', 'openai', 'custom'];
          auth.user.telegram.aiProvider = allowed.includes(b.aiProvider) ? b.aiProvider : 'gemini';
        }
        if (b.aiModel !== undefined) {
          auth.user.telegram.aiModel = String(b.aiModel).trim().slice(0, 100) || 'gemini-2.5-flash';
        }
        if (b.aiApiKey !== undefined) {
          auth.user.telegram.aiApiKey = String(b.aiApiKey).trim().slice(0, 200);
          if (auth.user.telegram.aiApiKey === '') {
            auth.user.telegram.aiReplyEnabled = false;
          }
        }
        if (b.aiSystemPrompt !== undefined) {
          auth.user.telegram.aiSystemPrompt = String(b.aiSystemPrompt).slice(0, 500);
        }
        if (b.aiContext !== undefined) {
          auth.user.telegram.aiContext = String(b.aiContext).slice(0, 500);
        }
        if (b.aiMaxReplies !== undefined) {
          auth.user.telegram.aiMaxReplies = Math.max(1, Math.min(20, parseInt(b.aiMaxReplies, 10) || 3));
        }
        if (b.aiCooldown !== undefined) {
          const pCd = parseInt(b.aiCooldown, 10);
          auth.user.telegram.aiCooldown = isNaN(pCd) ? 5 : Math.max(0, pCd);
        }
        if (b.aiIgnoredUsers !== undefined) {
          let rawIgnore = [];
          if (Array.isArray(b.aiIgnoredUsers)) {
            rawIgnore = b.aiIgnoredUsers;
          } else if (typeof b.aiIgnoredUsers === 'string') {
            rawIgnore = b.aiIgnoredUsers.split(/[,،;\s\n]+/);
          }
          auth.user.telegram.aiIgnoredUsers = rawIgnore.map(x => String(x).trim()).filter(Boolean).slice(0, 100);
        }
        if (b.bot !== undefined && typeof b.bot === 'object' && b.bot !== null) {
          if (!auth.user.telegram.bot) auth.user.telegram.bot = {};
          const rawToken = b.bot.token !== undefined ? String(b.bot.token).trim() : null;
          if (rawToken && /^\d+:[A-Za-z0-9_-]{20,}$/.test(rawToken)) {
            auth.user.telegram.bot.token = rawToken;
          }
          if (b.bot.antiDeleteEnabled !== undefined) {
            auth.user.telegram.bot.antiDeleteEnabled = !!b.bot.antiDeleteEnabled;
          }
          if (b.bot.antiEditEnabled !== undefined) {
            auth.user.telegram.bot.antiEditEnabled = !!b.bot.antiEditEnabled;
          }
          if (b.bot.forwardTtlToBot !== undefined) {
            auth.user.telegram.bot.forwardTtlToBot = !!b.bot.forwardTtlToBot;
            auth.user.telegram.antiTtlEnabled = !!b.bot.forwardTtlToBot;
            auth.user.antiTtlEnabled = !!b.bot.forwardTtlToBot;
          }
        }

        // ذخیره آنی و قطعی در KV
        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        activeUsersCache = null;
        activeUsersCacheTime = 0;
        return json({ ok: true, status: auth.user.status || { error: null } });
      } catch (err) {
        console.error('Error saving settings in /api/fonts:', err);
        return json({ error: err.message || 'خطا در ذخیره‌سازی' }, 500);
      }
    }

    // قطع اتصال تلگرام
    if (url.pathname === '/api/disconnect' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      if (auth.user.telegram) {
        auth.user.telegram.enabled = false;
        auth.user.telegram.sessionEncrypted = null;
      }
      auth.user.status = null;
      await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
      return json({ ok: true });
    }

    // تست همگام‌سازی آنی برای کاربر جاری
    if (url.pathname === '/api/sync' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'unauthorized' }, 401);

      const sub = checkUserSubscription(auth.user);
      if (!sub.active || auth.user.isSuspended) {
        return json({ error: 'اشتراک شما به پایان رسیده و پنل در حالت تعلیق است. لطفاً اشتراک خود را تمدید فرمایید.', isSuspended: true }, 403);
      }

      if (!auth.user.telegram) return json({ error: 'تلگرام متصل نیست' }, 400);

      auth.user.telegram.enabled = true;
      if (auth.user.status) auth.user.status.error = null;
      await updateSingleUserProfile(auth.user, env, true);
      const updatedUser = await env.KV.get('user:' + auth.username, 'json');
      return json({ ok: true, status: updatedUser?.status });
    }

    // ==========================================
    // ⚙️ APIهای اختصاصی رانر خارجی (GitHub Actions / External Runner)
    // ==========================================

    async function isRunnerAuthorized(req, workerEnv) {
      const authHeader = req.headers.get('Authorization') || '';
      let token = '';
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7).trim();
      }
      const secret = workerEnv.RUNNER_SECRET || workerEnv.ADMIN_PASSWORD;
      if (!secret || !token) return false;
      return await timingSafeStringCompare(token, secret);
    }

    // ۱. دریافت لیست کاربران فعال برای رانر خارجی با کش هوشمند و کاهش رایت D1
    if (url.pathname === '/api/internal/active-users' && request.method === 'GET') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }

      const now = Date.now();
      globalThis.lastRunnerSyncTime = now;

      // بهینه‌سازی دیتابیس D1: ذخیره پینگ رانر هر ۳ دقیقه یک‌بار به جای هر دقیقه (کاهش ۶۶٪ عملیات رایت)
      if (env.DB && (!globalThis.lastD1PingWrite || (now - globalThis.lastD1PingWrite > 180000))) {
        globalThis.lastD1PingWrite = now;
        env.DB.prepare("INSERT OR REPLACE INTO kv_store (key, value, updated_at) VALUES ('runner:last_ping', ?, ?)").bind(String(now), now).run().catch(() => {});
      }

      // بهینه‌سازی مصرف سهمیه کلادفلر: کش ۶۰ ثانیه‌ای درون حافظه ایزولیت همراه با پشتیبانی از ۳۰۴ ETag
      if (activeUsersCache && (now - activeUsersCacheTime < 60000)) {
        const clientEtag = request.headers.get('if-none-match');
        if (clientEtag && etagMatches(clientEtag, activeUsersETag)) {
          return new Response(null, { status: 304, headers: { 'ETag': activeUsersETag } });
        }
        return json({ ok: true, users: activeUsersCache, serverTime: now, cached: true }, 200, { 'ETag': activeUsersETag });
      }

      const usersList = await env.KV.get('users_list', 'json') || [];
      if (!usersList.length) {
        activeUsersCache = [];
        activeUsersCacheTime = now;
        activeUsersETag = '"au-0-' + now + '"';
        return json({ ok: true, users: [], serverTime: now }, 200, { 'ETag': activeUsersETag });
      }

      const userObjects = await Promise.all(
        usersList.map(uname => env.KV.get('user:' + uname, 'json'))
      );

      const activeUsers = [];
      for (const u of userObjects) {
        if (!u) continue;
        const sub = checkUserSubscription(u);
        if (!sub.active) {
          if (!u.isSuspended || u.telegram?.enabled) {
            u.isSuspended = true;
            if (u.telegram) u.telegram.enabled = false;
            u.status = u.status || {};
            u.status.error = 'اشتراک شما به پایان رسیده و سلف‌بات به حالت تعلیق درآمده است.';
            await env.KV.put('user:' + u.username, JSON.stringify(u));
          }
          continue;
        }

        if (!u.isSuspended && u.telegram?.enabled && u.telegram?.sessionEncrypted) {
          activeUsers.push({
            username: u.username,
            sessionEncrypted: u.telegram.sessionEncrypted,
            digits: u.telegram.digits,
            colon: u.telegram.colon || ':',
            prefix: u.telegram.prefix || '',
            suffix: u.telegram.suffix || '',
            is12h: !!u.telegram.is12h,
            bioEnabled: !!u.telegram.bioEnabled,
            bioTemplate: u.telegram.bioTemplate || '',
            sleepEnabled: !!u.telegram.sleepEnabled,
            sleepStart: u.telegram.sleepStart ?? 23,
            sleepEnd: u.telegram.sleepEnd ?? 7,
            sleepText: u.telegram.sleepText || '😴 Sleep',
            afkEnabled: !!u.telegram.afkEnabled,
            afkMessage: u.telegram.afkMessage || '',
            afkCooldown: u.telegram.afkCooldown ?? 10,
            muteEnabled: !!u.telegram.muteEnabled || (Array.isArray(u.telegram.mutedUsers) && u.telegram.mutedUsers.length > 0),
            mutedUsers: u.telegram.mutedUsers || [],
            antiTtlEnabled: !!(u.telegram.antiTtlEnabled ?? u.antiTtlEnabled),
            ghostMode: !!u.telegram.ghostMode,
            ghostExcludeList: u.telegram.ghostExcludeList || [],
            aiReplyEnabled: !!u.telegram.aiReplyEnabled,
            aiProvider: u.telegram.aiProvider || 'gemini',
            aiModel: u.telegram.aiModel || 'gemini-2.5-flash',
            aiApiKey: u.telegram.aiApiKey || '',
            aiSystemPrompt: u.telegram.aiSystemPrompt || '',
            aiContext: u.telegram.aiContext || '',
            aiMaxReplies: u.telegram.aiMaxReplies ?? 3,
            aiCooldown: u.telegram.aiCooldown ?? 5,
            aiIgnoredUsers: u.telegram.aiIgnoredUsers || [],
            bot: u.telegram.bot || null
          });
        }
      }

      activeUsersCache = activeUsers;
      activeUsersCacheTime = now;
      activeUsersETag = '"au-' + activeUsers.length + '-' + now + '"';
      return json({ ok: true, users: activeUsersCache, serverTime: now }, 200, { 'ETag': activeUsersETag });
    }

    if (url.pathname === '/api/internal/update-status' && request.method === 'POST') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }

      try {
        const { updates } = await request.json();
        if (Array.isArray(updates)) {
          for (const item of updates) {
            if (!item.username) continue;
            // فقط در صورتی در KV ذخیره می‌کنیم که خطایی رخ داده باشد یا سشن باطل شده باشد
            // در حالت کارکرد عادی و موفق، نیازی به مصرف سهمیه KV Write نیست!
            if (item.error || item.isFatal) {
              const u = await env.KV.get('user:' + item.username, 'json');
              if (u) {
                u.status = u.status || {};
                u.status.lastUpdate = item.lastUpdate || Date.now();
                u.status.error = item.error;
                if (item.isFatal && u.telegram) {
                  u.telegram.enabled = false;
                }
                await env.KV.put('user:' + item.username, JSON.stringify(u));
              }
            } else if (!item.error) {
              const u = await env.KV.get('user:' + item.username, 'json');
              if (u && u.status?.error) {
                u.status.error = null;
                u.status.lastUpdate = item.lastUpdate || Date.now();
                await env.KV.put('user:' + item.username, JSON.stringify(u));
              }
            }
          }
        }
        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۳. به‌روزرسانی آنی لیست کاربران مسدود/سکوت از رانر گیت‌هاب (.mute و .unmute تلگرام)
    if (url.pathname === '/api/internal/update-user-mute' && request.method === 'POST') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }
      try {
        const { username, mutedUsers } = await request.json();
        if (username && Array.isArray(mutedUsers)) {
          const u = await env.KV.get('user:' + username, 'json');
          if (u && u.telegram) {
            u.telegram.mutedUsers = mutedUsers.map(x => String(x).trim()).filter(Boolean);
            if (u.telegram.mutedUsers.length > 0) {
              u.telegram.muteEnabled = true;
            }
            await env.KV.put('user:' + username, JSON.stringify(u));
          }
        }
        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۳.۱ به‌روزرسانی و ثبت شناسه عددی تلگرام کاربر از طریق رانر (جهت قفل امنیتی انحصاری ربات به مالک)
    if (url.pathname === '/api/internal/set-user-tg-id' && request.method === 'POST') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }
      try {
        const { username, tgUserId } = await request.json();
        if (username && tgUserId) {
          const u = await env.KV.get('user:' + username, 'json');
          if (u && u.telegram) {
            const cleanId = String(tgUserId).trim();
            const needsUpdate = u.telegram.userId !== cleanId ||
              (u.telegram.bot && (!u.telegram.bot.ownerId || !u.telegram.bot.chatId));
            if (needsUpdate) {
              u.telegram.userId = cleanId;
              if (u.telegram.bot) {
                u.telegram.bot.ownerId = cleanId;
                u.telegram.bot.chatId = cleanId;
              }
              await env.KV.put('user:' + username, JSON.stringify(u));
            }
          }
        }
        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۳.۲ به‌روزرسانی آنی وضعیت قابلیت‌ها از رانر گیت‌هاب (.ghost و .ai تلگرام)
    if (url.pathname === '/api/internal/update-user-feature' && request.method === 'POST') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }
      try {
        const { username, ghostMode, aiReplyEnabled, aiIgnoredUsers, aiModel } = await request.json();
        if (username) {
          const u = await env.KV.get('user:' + username, 'json');
          if (u && u.telegram) {
            if (ghostMode !== undefined) u.telegram.ghostMode = !!ghostMode;
            if (aiReplyEnabled !== undefined) u.telegram.aiReplyEnabled = !!aiReplyEnabled;
            if (aiIgnoredUsers !== undefined) u.telegram.aiIgnoredUsers = Array.isArray(aiIgnoredUsers) ? aiIgnoredUsers : [];
            if (aiModel !== undefined) u.telegram.aiModel = String(aiModel).trim().slice(0, 100);
            await env.KV.put('user:' + username, JSON.stringify(u));
          }
        }
        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۳.۳ دریافت دستورات و عملیات‌های ربات برای رانر (ارسال پیام، استخراج چت‌ها، ثبت تیک آبی)
    if (url.pathname === '/api/internal/bot-actions' && request.method === 'GET') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }
      globalThis.pendingBotActions = globalThis.pendingBotActions || [];
      const memActions = [...globalThis.pendingBotActions];
      globalThis.pendingBotActions = [];

      let kvActions = [];
      const hasRecentAction = globalThis.hasPendingBotActions || false;
      const timeSinceLastKvCheck = Date.now() - (globalThis.lastBotActionKvCheck || 0);
      if (hasRecentAction || timeSinceLastKvCheck > 25000) {
        globalThis.lastBotActionKvCheck = Date.now();
        globalThis.hasPendingBotActions = false;
        try {
          kvActions = await env.KV.get('bot_pending_actions', 'json') || [];
          if (Array.isArray(kvActions) && kvActions.length > 0) {
            await env.KV.delete('bot_pending_actions');
          }
        } catch (_) {}
      }

      // ادغام بدون تکرار بر اساس id یا ترکیب action+peerId
      const actionMap = new Map();
      for (const a of memActions) {
        if (a) {
          const key = a.id || `${a.action}:${a.username}:${a.peerId || ''}:${a.messageId || ''}`;
          actionMap.set(key, a);
        }
      }
      if (Array.isArray(kvActions)) {
        for (const a of kvActions) {
          if (a) {
            const key = a.id || `${a.action}:${a.username}:${a.peerId || ''}:${a.messageId || ''}`;
            if (!actionMap.has(key)) {
              actionMap.set(key, a);
            }
          }
        }
      }

      const actions = Array.from(actionMap.values());
      return json({ ok: true, actions });
    }

    // ۳.۴ ذخیره و سینک چت‌های خصوصی کاربر از رانر در ورکر
    if (url.pathname === '/api/internal/sync-dialogs' && request.method === 'POST') {
      if (!await isRunnerAuthorized(request, env)) {
        return json({ error: 'unauthorized runner' }, 401);
      }
      try {
        const { username, dialogs } = await request.json();
        if (username && Array.isArray(dialogs)) {
          const lowerName = username.toLowerCase();
          globalThis.cachedUserDialogs = globalThis.cachedUserDialogs || {};
          globalThis.cachedUserDialogs[username] = dialogs;
          globalThis.cachedUserDialogs[lowerName] = dialogs;
          // ذخیره در دیتابیس با انقضای ۲ ساعته جهت دسترسی پایدار
          await env.KV.put('user_dialogs:' + lowerName, JSON.stringify(dialogs), { expirationTtl: 7200 });
        }
        return json({ ok: true });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۴. اعتبارسنجی و ثبت وب‌هوک ربات تلگرام اختصاصی کاربر (Telegram BotFather API)
    if (url.pathname === '/api/telegram/verify-bot-token' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      try {
        const { token } = await request.json();
        const cleanToken = String(token || '').trim();
        if (!cleanToken || !/^\d+:[A-Za-z0-9_-]{20,}$/.test(cleanToken)) {
          return json({ error: 'فرمت توکن ربات نامعتبر است. توکن دریافت شده از BotFather@ باید شامل اعداد و حروف باشد.' }, 400);
        }

        // استعلام مشخصات ربات از سرور تلگرام
        const meRes = await fetch(`https://api.telegram.org/bot${cleanToken}/getMe`);
        if (!meRes.ok) {
          const errData = await meRes.json().catch(() => ({}));
          return json({ error: `توکن توسط تلگرام پذیرفته نشد: ${errData.description || 'توکن نامعتبر یا منقضی است'}` }, 400);
        }

        const meData = await meRes.json();
        const botUser = meData.result;
        if (!botUser || !botUser.is_bot) {
          return json({ error: 'اطلاعات دریافت شده متعلق به یک ربات معتبر نیست.' }, 400);
        }

        // 🔒 بررسی انحصاری بودن ربات: هر کاربر باید ربات مستقل خود را در BotFather بسازد
        const usersList = await env.KV.get('users_list', 'json') || [];
        for (const un of usersList) {
          if (un.toLowerCase() === auth.username.toLowerCase()) continue;
          const otherU = await env.KV.get('user:' + un, 'json');
          if (otherU?.telegram?.bot?.token === cleanToken || (otherU?.telegram?.bot?.id && String(otherU.telegram.bot.id) === String(botUser.id))) {
            return json({
              error: `این ربات (@${botUser.username}) قبلاً توسط حساب کاربری دیگری ثبت شده است! هر کاربر باید ربات اختصاصی خود را در BotFather@ بسازد و توکن اختصاصی خود را وارد کند.`
            }, 400);
          }
        }

        // تنظیم خودکار وب‌هوک روی سرور Cloudflare جهت دریافت رویدادها و دستورات ربات
        const hostUrl = new URL(request.url).origin;
        const webhookUrl = `${hostUrl}/api/bot-webhook/${encodeURIComponent(auth.username)}`;
        await fetch(`https://api.telegram.org/bot${cleanToken}/setWebhook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: webhookUrl,
            drop_pending_updates: true,
            allowed_updates: ['message', 'edited_message', 'callback_query']
          })
        }).catch(() => {});

        // تنظیم دکمه Menu Button به عنوان Web App تلگرام
        await fetch(`https://api.telegram.org/bot${cleanToken}/setChatMenuButton`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            menu_button: {
              type: 'web_app',
              text: '⚡ استودیوی سلف‌بات',
              web_app: { url: hostUrl }
            }
          })
        }).catch(() => {});

        // ثبت دستورات رسمی ربات در تلگرام
        await fetch(`https://api.telegram.org/bot${cleanToken}/setMyCommands`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            commands: [
              { command: 'start', description: 'نمایش پنل اصلی و راهنما' },
              { command: 'chats', description: '👻 مشاهده چت‌های خصوصی و پیام‌های خوانده‌نشده (شبح)' },
              { command: 'unread', description: '📩 پیام‌های خوانده‌نشده در حالت شبح' },
              { command: 'ghost', description: 'روشن / خاموش کردن حالت شبح' },
              { command: 'ai', description: 'روشن / خاموش کردن پاسخ هوشمند AI' },
              { command: 'status', description: 'استعلام وضعیت زنده سلف‌بات' },
              { command: 'test', description: 'تست ارسال گزارش ضد حذف و ویرایش' },
              { command: 'help', description: 'راهنمای کامل استفاده از ربات' }
            ]
          })
        }).catch(() => {});

        if (!auth.user.telegram) auth.user.telegram = {};
        if (!auth.user.telegram.bot) auth.user.telegram.bot = {};
        auth.user.telegram.bot.token = cleanToken;
        auth.user.telegram.bot.username = botUser.username;
        auth.user.telegram.bot.name = botUser.first_name || botUser.username;
        auth.user.telegram.bot.id = botUser.id.toString();
        // قفل انحصاری فوری مالکیت ربات به شناسه تلگرام کاربر (در صورت وجود)
        if (auth.user.telegram.userId) {
          auth.user.telegram.bot.ownerId = String(auth.user.telegram.userId);
          auth.user.telegram.bot.chatId = String(auth.user.telegram.userId);
        }
        if (auth.user.telegram.bot.antiDeleteEnabled === undefined) auth.user.telegram.bot.antiDeleteEnabled = true;
        if (auth.user.telegram.bot.antiEditEnabled === undefined) auth.user.telegram.bot.antiEditEnabled = true;
        if (auth.user.telegram.bot.forwardTtlToBot === undefined) auth.user.telegram.bot.forwardTtlToBot = true;

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));

        return json({
          ok: true,
          bot: auth.user.telegram.bot,
          message: `ربات @${botUser.username} با موفقیت متصل گردید!`
        });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    // ۴.۱ قطع اتصال ربات تلگرام اختصاصی و پاکسازی منابع و حافظه KV
    if (url.pathname === '/api/telegram/disconnect-bot' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      try {
        const botToken = auth.user.telegram?.bot?.token;
        if (botToken) {
          // ۱. حذف وب‌هوک در سرورهای تلگرام جهت توقف ارسال ترافیک
          await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook?drop_pending_updates=true`).catch(() => {});
          // ۲. بازگردانی دکمه منو به پیش‌فرض
          await fetch(`https://api.telegram.org/bot${botToken}/setChatMenuButton`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ menu_button: { type: 'default' } })
          }).catch(() => {});
        }

        // ۳. آزادسازی حافظه KV و حذف توکن‌های متصل به Mini App
        const existingAppToken = await env.KV.get('miniapp_token:' + auth.username);
        if (existingAppToken) {
          await env.KV.delete('token:' + existingAppToken);
          await env.KV.delete('miniapp_token:' + auth.username);
        }

        // ۴. پاکسازی آبجکت bot از اطلاعات کاربر در دیتابیس
        if (auth.user.telegram) {
          delete auth.user.telegram.bot;
        }

        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));

        return json({
          ok: true,
          message: 'اتصال ربات تلگرام با موفقیت قطع گردید و منابع و حافظه کلادفلر آزاد شد.'
        });
      } catch (err) {
        return json({ error: err.message || 'خطا در قطع اتصال ربات' }, 500);
      }
    }

    // ۴.۲ قفل دستی یا تنظیم شناسه عددی تلگرام مالک ربات (امنیت انحصاری)
    if (url.pathname === '/api/telegram/lock-owner-id' && request.method === 'POST') {
      const auth = await getAuthUser(request, env);
      if (!auth) return json({ error: 'ابتدا وارد حساب کاربری خود شوید' }, 401);

      try {
        const { ownerId } = await request.json();
        if (!auth.user.telegram?.bot) {
          return json({ error: 'ابتدا ربات تلگرام خود را متصل کنید' }, 400);
        }
        const cleanId = String(ownerId || '').trim();
        if (cleanId && !/^\d{5,15}$/.test(cleanId)) {
          return json({ error: 'شناسه عددی تلگرام باید عددی بین ۵ تا ۱۵ رقم باشد' }, 400);
        }
        auth.user.telegram.bot.ownerId = cleanId || null;
        if (cleanId) {
          auth.user.telegram.bot.chatId = cleanId;
        }
        await env.KV.put('user:' + auth.username, JSON.stringify(auth.user));
        return json({ ok: true, ownerId: auth.user.telegram.bot.ownerId });
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

/**
 * پاکسازی، اعتبارسنجی و تکمیل پاسخ هوش مصنوعی در سرور جهت تضمین ارسال جملات سالم و کامل
 */
function sanitizeAiReply(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let text = raw.trim();
  if (!text) return null;

  if (text.startsWith('```') && text.endsWith('```')) {
    text = text.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
  }

  if (text.length > 700) {
    const slice = text.slice(0, 700);
    const lastPunct = Math.max(
      slice.lastIndexOf('. '),
      slice.lastIndexOf('! '),
      slice.lastIndexOf('؟ '),
      slice.lastIndexOf('? '),
      slice.lastIndexOf('.\n'),
      slice.lastIndexOf('!\n'),
      slice.lastIndexOf('؟\n'),
      slice.lastIndexOf('?\n')
    );
    if (lastPunct > 120) {
      text = slice.slice(0, lastPunct + 1).trim();
    } else {
      text = slice.trim();
    }
  }

  const terminalPunctuation = ['.', '!', '؟', '?', '…', '؛', ';', ')', '»', '"', '\''];
  const lastChar = text[text.length - 1];

  if (!terminalPunctuation.includes(lastChar)) {
    const lastSentenceBreak = Math.max(
      text.lastIndexOf('. '),
      text.lastIndexOf('! '),
      text.lastIndexOf('؟ '),
      text.lastIndexOf('? '),
      text.lastIndexOf('.\n'),
      text.lastIndexOf('!\n'),
      text.lastIndexOf('؟\n'),
      text.lastIndexOf('?\n'),
      text.lastIndexOf('\n\n')
    );

    if (lastSentenceBreak > 20 && (text.length - lastSentenceBreak) > 4) {
      text = text.slice(0, lastSentenceBreak + 1).trim();
    } else {
      text = text + '.';
    }
  }

  return text;
}

/**
 * فراخوانی مستقیم API هوش مصنوعی در محیط کلادفلر جهت تست زنده و پاسخگویی ربات تلگرام
 */
async function callAIApiWorker(provider, apiKey, systemPrompt, context, userMessage, selectedModel) {
  if (!apiKey || !userMessage) return null;

  const defaultSystemPrompt = `You are a smart AI personal assistant replying on behalf of the account owner who is currently offline.
قوانین و دستورالعمل‌های حیاتی:
۱. اتمام قطعی کلمات و جملات: به هیچ وجه هیچ کلمه یا جمله‌ای را نیمه‌کاره رها نکن. تمام جملات باید با معنی کامل و نقطه/علامت پایان به پایان برسند.
۲. تشخیص و تطبیق خودکار زبان: زبان پاسخ باید دقیقاً هماهنگ با زبان پیام مخاطب باشد. اگر مخاطب به زبان انگلیسی (English) پیام داده است، پاسخ را کاملاً به زبان روان انگلیسی بنویس. اگر به زبان فارسی پیام داده به فارسی پاسخ بده. برای هر زبان دیگر به همان زبان پیام بده.
۳. لحن و ساختار: پاسخ کوتاه (حداکثر ۲ تا ۳ جمله کامل)، مودبانه، طبیعی و صمیمی باشد.
۴. وضعیت مالک: حتماً قید کن که مالک حساب در حال حاضر آفلاین است و به محض آنلاین شدن پیام را بررسی و پاسخ خواهد داد.
۵. محرمانگی: از اطلاعات خصوصی یا محرمانه صحبت نکن و وعده نامعتبر نده.`;

  const fullSystemPrompt = [
    systemPrompt || defaultSystemPrompt,
    context ? `\nاطلاعات پایه درباره مالک حساب (User Context):\n${context}` : '',
    '\nدستور اکید: تمام کلمات و جملات را با معنی کامل تمام کن و هرگز کلمه‌ای را ناتمام نگذار. زبان پاسخ هماهنگ با پیام مخاطب باشد. پاسخ کوتاه حداکثر ۲ الی ۳ جمله کامل باشد و اشاره کن مالک آفلاین است.'
  ].filter(Boolean).join('\n');

  try {
    if (provider === 'gemini') {
      const defaultGeminiModels = [
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-flash-lite-latest',
        'gemini-flash-latest',
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-3.8-flash'
      ];
      const modelToUse = (selectedModel && selectedModel.trim()) || 'gemini-2.5-flash';
      // مدل انتخابی کاربر دارای اولویت نخست است؛ در صورت بروز خطا به ترتیب به سایر مدل‌ها فال‌بک می‌شود
      const geminiModels = [modelToUse, ...defaultGeminiModels.filter(m => m !== modelToUse)];

      let lastError = null;
      for (const model of geminiModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(10000),
            body: JSON.stringify({
              system_instruction: { parts: [{ text: fullSystemPrompt }] },
              contents: [{ parts: [{ text: userMessage }] }],
              generationConfig: { maxOutputTokens: 800, temperature: 0.7, topP: 0.9 }
            })
          });

          if (res.ok) {
            const data = await res.json();
            const candidate = data?.candidates?.[0];
            const reply = candidate?.content?.parts?.[0]?.text;
            if (reply && reply.trim()) {
              const sanitized = sanitizeAiReply(reply);
              if (sanitized) return sanitized;
            }
          } else {
            const errText = await res.text().catch(() => '');
            lastError = `${model} (${res.status}): ${errText.slice(0, 120)}`;
          }
        } catch (err) {
          lastError = `${model}: ${err.message}`;
        }
      }

      const safeErr = String(lastError || 'اتصال برقرار نشد').replaceAll(apiKey, '[REDACTED_KEY]');
      throw new Error(`خطای Gemini: ${safeErr}`);

    } else if (provider === 'openai') {
      const modelToUse = (selectedModel && selectedModel.trim()) || 'gpt-4o-mini';
      const url = 'https://api.openai.com/v1/chat/completions';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          model: modelToUse,
          messages: [
            { role: 'system', content: fullSystemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      }).catch(() => null);

      if (!res || !res.ok) {
        const errText = res ? await res.text().catch(() => '') : 'اتصال برقرار نشد';
        const safeErr = String(errText || '').replaceAll(apiKey, '[REDACTED_KEY]');
        throw new Error(`خطای OpenAI (${modelToUse}): ${safeErr.slice(0, 150)}`);
      }
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      return reply ? sanitizeAiReply(reply) : null;

    } else if (provider === 'custom') {
      const modelToUse = (selectedModel && selectedModel.trim()) || 'deepseek-chat';
      const isDeepSeek = modelToUse.toLowerCase().includes('deepseek');
      const endpoint = isDeepSeek
        ? 'https://api.deepseek.com/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model: modelToUse,
          messages: [
            { role: 'system', content: fullSystemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      }).catch(() => null);

      if (!res || !res.ok) {
        const errText = res ? await res.text().catch(() => '') : 'اتصال برقرار نشد';
        const safeErr = String(errText || '').replaceAll(apiKey, '[REDACTED_KEY]');
        throw new Error(`خطای Custom API (${modelToUse}): ${safeErr.slice(0, 150)}`);
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      return reply ? sanitizeAiReply(reply) : null;

    } else {
      throw new Error(`سرویس‌دهنده ${provider} پشتیبانی نمی‌شود.`);
    }
  } catch (err) {
    throw err;
  }
}

    // ۵. وب‌هوک اختصاصی ربات تلگرام کاربر جهت ارسال دکمه‌های ورود به مینی‌اپ و کنترل پنل
    if (url.pathname.startsWith('/api/bot-webhook/')) {
      let targetUsername = decodeURIComponent(url.pathname.replace('/api/bot-webhook/', ''));
      if (!targetUsername) return new Response('OK');

      try {
        const update = await request.json().catch(() => null);
        if (!update) return new Response('OK');

        let u = await env.KV.get('user:' + targetUsername, 'json');
        if (!u) {
          u = await env.KV.get('user:' + targetUsername.toLowerCase(), 'json');
        }
        if (!u || !u.telegram?.bot?.token) return new Response('OK');

        const actualBotToken = u.telegram?.bot?.token;
        const hostUrl = new URL(request.url).origin;

        // تعیین دقیق و انحصاری شناسه عددی مالک ربات
        let allowedOwnerId = u.telegram?.userId ? String(u.telegram.userId) : (u.telegram?.bot?.ownerId ? String(u.telegram.bot.ownerId) : null);
        // خوددرمانگری هوشمند: تطابق دائمی شناسه ربات با شناسه ثبت‌شده تلگرام کاربر
        if (u.telegram?.userId && u.telegram?.bot && u.telegram.bot.ownerId !== String(u.telegram.userId)) {
          u.telegram.bot.ownerId = String(u.telegram.userId);
          u.telegram.bot.chatId = String(u.telegram.userId);
          await env.KV.put('user:' + targetUsername, JSON.stringify(u));
          allowedOwnerId = String(u.telegram.userId);
        }

        // تولید توکن ورود آنی و مستقیم بدون پسورد (Single-Sign-On) برای Mini App با بهینه‌سازی حافظه KV
        let appToken = await env.KV.get('miniapp_token:' + targetUsername);
        if (!appToken) {
          appToken = generateRandomHex(32);
          await env.KV.put('token:' + appToken, JSON.stringify({ username: targetUsername, createdAt: Date.now() }), { expirationTtl: 7 * 86400 });
          await env.KV.put('miniapp_token:' + targetUsername, appToken, { expirationTtl: 7 * 86400 });
        }
        const directAppUrl = `${hostUrl}/?token=${appToken}`;

        const escapeHtml = (str) => {
          if (!str) return '';
          return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        };

        // تولید کیبورد شیشه‌ای رسمی و هوشمند با رنگ‌بندی داینامیک
        const renderMainKeyboard = (targetU) => {
          const isAct = !!targetU.telegram?.enabled && !targetU.isSuspended;
          const ghostAct = !!targetU.telegram?.ghostMode;
          const aiAct = !!targetU.telegram?.aiReplyEnabled;
          return {
            inline_keyboard: [
              [
                { text: '⚡ ورود به استودیوی سلف‌بات (Mini App)', web_app: { url: directAppUrl }, style: 'primary' }
              ],
              [
                { text: '👻 چت‌های خصوصی (حالت شبح)', callback_data: 'ghost_chats', style: 'primary' },
                { text: '📊 استعلام وضعیت زنده', callback_data: 'bot_status', style: 'primary' }
              ],
              [
                { text: `🔄 سلف‌بات: ${isAct ? 'روشن 🟢' : 'خاموش ⚪'}`, callback_data: 'bot_toggle', style: isAct ? 'success' : 'danger' },
                { text: `👻 حالت شبح: ${ghostAct ? 'روشن 🟢' : 'خاموش ⚪'}`, callback_data: 'bot_toggle_ghost', style: ghostAct ? 'success' : 'danger' }
              ],
              [
                { text: `🤖 هوش مصنوعی: ${aiAct ? 'روشن 🟢' : 'خاموش ⚪'}`, callback_data: 'bot_toggle_ai', style: aiAct ? 'success' : 'danger' },
                { text: '⚙️ مدیریت هوش مصنوعی (AI)', callback_data: 'bot_ai_info', style: 'primary' }
              ],
              [
                { text: '🎨 تغییر فونت ساعت', callback_data: 'bot_font_menu', style: 'primary' },
                { text: '🧪 تست ارسال گزارش', callback_data: 'bot_test', style: 'primary' }
              ],
              [
                { text: '🌐 باز کردن پنل در مرورگر', url: directAppUrl, style: 'primary' }
              ]
            ]
          };
        };

        // تولید کیبورد شیشه‌ای انتخاب فونت و استایل ساعت با پیش‌نمایش زنده
        const renderFontKeyboard = (targetU) => {
          const userDigitsStr = Array.isArray(targetU.telegram?.digits) ? targetU.telegram.digits.join('') : '';
          const rows = [];
          const entries = Object.entries(FONT_PRESETS);
          for (let i = 0; i < entries.length; i += 2) {
            const row = [];
            const [k1, v1] = entries[i];
            const isSel1 = v1.digits.join('') === userDigitsStr;
            const p1 = `${v1.digits[1]}${v1.digits[2]}:${v1.digits[4]}${v1.digits[5]}`;
            row.push({
              text: `${isSel1 ? '✅ ' : ''}${v1.name} [${p1}]`,
              callback_data: `set_font:${k1}`
            });
            if (i + 1 < entries.length) {
              const [k2, v2] = entries[i + 1];
              const isSel2 = v2.digits.join('') === userDigitsStr;
              const p2 = `${v2.digits[1]}${v2.digits[2]}:${v2.digits[4]}${v2.digits[5]}`;
              row.push({
                text: `${isSel2 ? '✅ ' : ''}${v2.name} [${p2}]`,
                callback_data: `set_font:${k2}`
              });
            }
            rows.push(row);
          }
          rows.push([
            { text: '🔙 بازگشت به منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
          ]);
          return { inline_keyboard: rows };
        };

        // تولید کیبورد اختصاصی مدیریت مدل‌های هوش مصنوعی
        const renderAiModelsKeyboard = (targetU) => {
          const currentModel = (targetU.telegram?.aiModel || (targetU.telegram?.aiProvider === 'gemini' ? 'gemini-2.5-flash' : (targetU.telegram?.aiProvider === 'custom' ? 'deepseek-chat' : 'gpt-4o-mini'))).trim().toLowerCase();

          const models = [
            { id: 'gemini-2.5-flash', name: '⚡ Gemini 2.5 Flash (پیشنهادی)' },
            { id: 'gemini-2.0-flash', name: '🚀 Gemini 2.0 Flash' },
            { id: 'gemini-1.5-flash', name: '🌟 Gemini 1.5 Flash' },
            { id: 'gemini-1.5-pro', name: '🧠 Gemini 1.5 Pro' },
            { id: 'gemini-flash-lite-latest', name: '💨 Gemini Flash Lite' },
            { id: 'gpt-4o-mini', name: '⚡ GPT-4o Mini' },
            { id: 'gpt-4o', name: '🧠 GPT-4o' },
            { id: 'deepseek-chat', name: '🐳 DeepSeek V3 (Chat)' },
            { id: 'deepseek-reasoner', name: '🧠 DeepSeek R1 (Reasoner)' }
          ];

          const rows = [];
          for (let i = 0; i < models.length; i += 2) {
            const row = [];
            const m1 = models[i];
            const isSel1 = currentModel === m1.id.toLowerCase();
            row.push({
              text: `${isSel1 ? '✅ ' : ''}${m1.name}`,
              callback_data: `ai_set_model:${m1.id}`
            });
            if (i + 1 < models.length) {
              const m2 = models[i + 1];
              const isSel2 = currentModel === m2.id.toLowerCase();
              row.push({
                text: `${isSel2 ? '✅ ' : ''}${m2.name}`,
                callback_data: `ai_set_model:${m2.id}`
              });
            }
            rows.push(row);
          }
          rows.push([
            { text: '🔙 بازگشت به منوی هوش مصنوعی', callback_data: 'ai_menu', style: 'danger' }
          ]);
          return { inline_keyboard: rows };
        };

        // تولید کیبورد اختصاصی مدیریت لیست نادیده‌گیری هوش مصنوعی
        const renderAiIgnoreKeyboard = (targetU) => {
          const ignored = Array.isArray(targetU.telegram?.aiIgnoredUsers) ? targetU.telegram.aiIgnoredUsers : [];
          const rows = [
            [
              { text: '➕ افزودن کاربر به لیست نادیده‌گیری', callback_data: 'ai_add_ignore_prompt', style: 'primary' }
            ]
          ];
          if (ignored.length > 0) {
            rows.push([
              { text: '🗑️ پاکسازی کامل لیست نادیده‌گیری', callback_data: 'ai_clear_ignore', style: 'danger' }
            ]);
          }
          rows.push([
            { text: '🔙 بازگشت به منوی هوش مصنوعی', callback_data: 'ai_menu', style: 'danger' }
          ]);
          return { inline_keyboard: rows };
        };

        // تولید متن پیام مدیریت لیست نادیده‌گیری هوش مصنوعی
        const renderAiIgnoreMessage = (targetU) => {
          const ignored = Array.isArray(targetU.telegram?.aiIgnoredUsers) ? targetU.telegram.aiIgnoredUsers : [];
          const listText = ignored.length > 0
            ? ignored.map((id, idx) => `${idx + 1}. <code>${escapeHtml(id)}</code>`).join('\n')
            : '<i>هنوز هیچ کاربری در لیست نادیده‌گیری قرار ندارد (هوش مصنوعی به تمام پیام‌های خصوصی مجاز پاسخ خواهد داد).</i>';

          return `🚫 <b>[مدیریت لیست نادیده‌گیری هوش مصنوعی — AI Ignore List]</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `هوش مصنوعی به پیام‌های کاربران موجود در این لیست هرگز پاسخ نخواهد داد.\n\n` +
            `📋 <b>کاربران مسدودشده فعلی (${ignored.length} کاربر):</b>\n${listText}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `💡 <b>افزودن و حذف سریع:</b>\n` +
            `• روی دکمه <b>➕ افزودن کاربر به لیست</b> کلیک کنید یا در چت بنویسید:\n` +
            `<code>/ai_ignore 12345678</code> یا <code>/ai_ignore @username</code>\n` +
            `• برای حذف کاربر خاص: <code>/ai_unignore [id]</code>`;
        };

        // تولید کیبورد اختصاصی مدیریت هوش مصنوعی با دکمه‌های تعاملی مدل و نادیده‌گیری
        const renderAiKeyboard = (targetU) => {
          const aiAct = !!targetU.telegram?.aiReplyEnabled;
          const provider = targetU.telegram?.aiProvider || 'gemini';
          const modelName = targetU.telegram?.aiModel || (provider === 'gemini' ? 'gemini-2.5-flash' : (provider === 'custom' ? 'deepseek-chat' : 'gpt-4o-mini'));
          const ignoredCount = Array.isArray(targetU.telegram?.aiIgnoredUsers) ? targetU.telegram.aiIgnoredUsers.length : 0;

          return {
            inline_keyboard: [
              [
                { text: `🔄 وضعیت پاسخگویی هوشمند: ${aiAct ? 'غیرفعال‌سازی ⚪' : 'فعال‌سازی 🟢'}`, callback_data: 'bot_toggle_ai', style: aiAct ? 'danger' : 'success' }
              ],
              [
                { text: `🤖 مدل هوش مصنوعی: ${modelName}`, callback_data: 'ai_models_menu', style: 'primary' }
              ],
              [
                { text: `🚫 نادیده‌گیری: ${ignoredCount > 0 ? `${ignoredCount} کاربر` : 'همه مجاز'}`, callback_data: 'ai_ignore_menu', style: 'primary' },
                { text: `⏱️ فاصله: ${targetU.telegram?.aiCooldown === 0 ? 'بدون محدودیت ⚡' : `هر ${targetU.telegram?.aiCooldown || 5} دقیقه`}`, callback_data: 'ai_toggle_cooldown', style: 'primary' }
              ],
              [
                { text: '🔑 ثبت / ویرایش کلید API', callback_data: 'ai_set_key_prompt', style: 'primary' },
                { text: '🗑️ حذف کامل کلید API', callback_data: 'ai_delete_key', style: 'danger' }
              ],
              [
                { text: '🧪 تست زنده پاسخ هوش مصنوعی', callback_data: 'ai_test_modal', style: 'primary' },
                { text: '🔙 بازگشت به منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
              ]
            ]
          };
        };

        // تولید متن پیام مدیریت هوش مصنوعی با پرستیژ بالا و رسمی
        const renderAiMessage = (targetU) => {
          const aiAct = !!targetU.telegram?.aiReplyEnabled;
          const hasKey = !!targetU.telegram?.aiApiKey;
          const provider = targetU.telegram?.aiProvider || 'gemini';
          const modelName = targetU.telegram?.aiModel || (provider === 'gemini' ? 'gemini-2.5-flash' : (provider === 'custom' ? 'deepseek-chat' : 'gpt-4o-mini'));
          const cdText = targetU.telegram?.aiCooldown === 0
            ? 'بدون محدودیت زمانی (فوری و بدون کول‌داون ⚡)'
            : `هر ${targetU.telegram?.aiCooldown || 5} دقیقه`;
          const keyDisplay = hasKey
            ? `<code>${targetU.telegram.aiApiKey.slice(0, 6)}••••••••${targetU.telegram.aiApiKey.slice(-4)}</code> (فعال و ذخیره‌شده ✅)`
            : '<i>تنظیم نشده ❌ (کلید ثبت نشده است)</i>';
          const ignoredCount = Array.isArray(targetU.telegram?.aiIgnoredUsers) ? targetU.telegram.aiIgnoredUsers.length : 0;

          return `🤖 <b>[مرکز مدیریت پاسخ هوشمند هوش مصنوعی — AI Reply]</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `📡 <b>وضعیت پاسخگویی:</b> ${aiAct ? 'فعال و خودکار 🟢' : 'غیرفعال ⚪'}\n` +
            `🌐 <b>موتور و مدل هوش مصنوعی:</b> <code>${provider.toUpperCase()} (${modelName})</code>\n` +
            `🔑 <b>کلید API ذخیره‌شده:</b>\n<blockquote>${keyDisplay}</blockquote>\n` +
            `🔢 <b>سقف پاسخ به هر شخص:</b> ${targetU.telegram?.aiMaxReplies || 3} پاسخ در هر گفتگو\n` +
            `⏱️ <b>فاصله بین پاسخ‌ها (کول‌داون):</b> ${cdText}\n` +
            `🚫 <b>کاربران مستثنی از پاسخ:</b> ${ignoredCount > 0 ? `<code>${ignoredCount} نفر</code> (عدم ارسال پاسخ)` : '<i>خالی (پاسخ به همه مجاز است)</i>'}\n` +
            `🛡️ <b>سپر هوشمند ۴ لایه:</b> فعال ✅\n` +
            `<blockquote>هنگامی که آنلاین هستید، صفحه چت باز است، یا در ۵ دقیقه اخیر پیامی ارسال کرده‌اید، هوش مصنوعی خودکار پاسخ نمی‌دهد تا آرامش گفتگوی شما حفظ شود.</blockquote>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `💡 <b>راهنمای سریع دکمه‌ها:</b>\n` +
            `• برای انتخاب مدل مورد نظر، روی دکمه <b>🤖 مدل هوش مصنوعی</b> کلیک کنید.\n` +
            `• برای مسدودسازی کاربران از پاسخ هوش مصنوعی، روی دکمه <b>🚫 نادیده‌گیری</b> کلیک کنید.\n` +
            `• برای تغییر فاصله زمانی، روی دکمه <b>⏱️ فاصله</b> کلیک فرمایید.\n` +
            `• با انتخاب <b>🔑 ثبت / ویرایش کلید API</b> کلید جدید را مستقیماً ارسال فرمایید.`;
        };

        // تولید متن پیام وضعیت زنده با دیزاین رسمی و چشم‌نواز
        const renderStatusMessage = (targetU) => {
          const isAct = !!targetU.telegram?.enabled && !targetU.isSuspended;
          const ghostAct = !!targetU.telegram?.ghostMode;
          const aiAct = !!targetU.telegram?.aiReplyEnabled;
          const lastT = targetU.status?.lastTime || 'در انتظار اجرا...';
          const aDel = targetU.telegram?.bot?.antiDeleteEnabled !== false;
          const aEd = targetU.telegram?.bot?.antiEditEnabled !== false;
          const fTtl = targetU.telegram?.bot?.forwardTtlToBot !== false;

          return `💎 <b>[گزارش وضعیت زنده سلف‌بات Arizo]</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `🟢 <b>اتصال به سرور تلگرام:</b> ${isAct ? 'فعال و آنلاین (Sub-100ms) ✅' : 'متوقف شده ⏸️'}\n` +
            `🕒 <b>ساعت فعال سلف:</b> <code>${lastT}</code>\n\n` +
            `🛡️ <b>سپر امنیتی و نظارتی:</b>\n` +
            `<blockquote>` +
            `• 🗑️ ضد حذف (Anti-Delete): ${aDel ? 'فعال 🟢' : 'غیرفعال ⚪'}\n` +
            `• ✏️ ضد ویرایش (Anti-Edit): ${aEd ? 'فعال 🟢' : 'غیرفعال ⚪'}\n` +
            `• 📸 رسانه زمان‌دار (View-Once): ${fTtl ? 'فعال 🟢' : 'غیرفعال ⚪'}\n` +
            `• 👻 حالت شبح (Ghost Mode): ${ghostAct ? 'فعال 🟢' : 'غیرفعال ⚪'}\n` +
            `• 🤖 هوش مصنوعی (AI Reply): ${aiAct ? `فعال 🟢 (${targetU.telegram?.aiProvider || 'gemini'})` : 'غیرفعال ⚪'}\n` +
            `</blockquote>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `⚡ کلیه سرویس‌ها به صورت اختصاصی برای حساب شما فعال هستند.`;
        };

        // پاسخ به پیام‌های متنی
        if (update.message) {
          const msg = update.message;
          const senderId = String(msg.from?.id || msg.chat.id);
          const chatId = msg.chat.id;
          const text = (msg.text || '').trim();

          // 🔒 قفل انحصاری امنیتی: بررسی احراز هویت مالک ربات
          if (allowedOwnerId && senderId !== String(allowedOwnerId)) {
            console.warn(`[Bot Security Alert] Unauthorized access to bot @${u.telegram?.bot?.username} (${targetUsername}) by stranger ID ${senderId}`);
            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⛔ <b>دسترسی غیرمجاز!</b>\n\nاین ربات دستیار شخصی و اختصاصی حساب کاربری <b>${targetUsername}</b> در سامانه Arizo Self است.\n\n🔒 شما مالک این ربات نیستید و هیچ‌گونه دسترسی یا مجوزی برای ارسال پیام یا دستور به این ربات ندارید.\n\n💡 هر کاربر موظف است ربات اختصاصی خودش را در @BotFather بسازد و توکن آن را به حساب کاربری خود در سایت متصل کند.`,
                parse_mode: 'HTML'
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // اگر هنوز شناسه مالک قفل نشده باشد، اولین استارت توسط مالک با ذخیره شناسه او قفل می‌شود
          if (!u.telegram) u.telegram = {};
          if (!u.telegram.bot) u.telegram.bot = {};
          if (!u.telegram.bot.ownerId || !allowedOwnerId) {
            u.telegram.bot.ownerId = senderId;
            allowedOwnerId = senderId;
          }

          // ذخیره قطعی شناسه عددی چت مالک جهت دریافت اعلان‌ها و رسانه‌های Anti-TTL و ضد حذف/ویرایش
          if (String(u.telegram.bot.chatId) !== String(chatId) || !u.telegram.bot.ownerId) {
            u.telegram.bot.chatId = String(chatId);
            u.telegram.bot.ownerId = senderId;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
          }

          // بررسی انصراف از پاسخ
          if (text === '/cancel') {
            globalThis.botUserReplyStates = globalThis.botUserReplyStates || new Map();
            globalThis.botUserReplyStates.delete(String(chatId));
            await env.KV.delete('bot_state:' + chatId);

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: '❌ عملیات ارسال پاسخ به مخاطب لغو گردید.',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // بررسی آیا کاربر در حال پاسخ به یک چت شبح است
          globalThis.botUserReplyStates = globalThis.botUserReplyStates || new Map();
          let pendingReply = globalThis.botUserReplyStates.get(String(chatId));
          if (!pendingReply) {
            pendingReply = await env.KV.get('bot_state:' + chatId, 'json');
          }

          // بررسی آیا کاربر در حال ثبت کلید API هوش مصنوعی است
          if (pendingReply && pendingReply.waitingFor === 'ai_api_key' && text) {
            globalThis.botUserReplyStates.delete(String(chatId));
            await env.KV.delete('bot_state:' + chatId);

            if (text === '/cancel') {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: '❌ عملیات ثبت کلید API لغو گردید.',
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
              return new Response('OK');
            }

            const cleanKey = text.trim();
            if (cleanKey.length < 8) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: '⚠️ <b>طول کلید وارد شده بسیار کوتاه یا نامعتبر است!</b>\n\nلطفاً کلید معتبر خود را از AI Studio گوگل یا OpenAI کپی کرده و ارسال فرمایید.\nبرای انصراف دستور /cancel را بفرستید.',
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }

            u.telegram.aiApiKey = cleanKey;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            const masked = cleanKey.slice(0, 6) + '••••••••' + cleanKey.slice(-4);

            const okText = `✅ <b>کلید API جدید با موفقیت ثبت و ذخیره شد!</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `🔑 <b>کلید فعال:</b> <code>${masked}</code>\n` +
              `🌐 <b>موتور:</b> <code>${(u.telegram?.aiProvider || 'gemini').toUpperCase()}</code>\n\n` +
              `💡 <i>کلید قبلی به صورت کامل پاکسازی شد و هیچ‌گونه تداخلی با تنظیمات پیشین وجود ندارد.</i>\n\n` +
              `اکنون می‌توانید پاسخ هوشمند را فعال کرده یا با دکمه زیر عملکرد آن را تست کنید:`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: okText,
                parse_mode: 'HTML',
                reply_markup: renderAiKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // بررسی آیا کاربر در حال افزودن فردی به لیست نادیده‌گیری AI است
          if (pendingReply && pendingReply.waitingFor === 'ai_ignore_user' && text) {
            globalThis.botUserReplyStates.delete(String(chatId));
            await env.KV.delete('bot_state:' + chatId);

            if (text === '/cancel') {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: '❌ عملیات افزودن کاربر به لیست نادیده‌گیری لغو شد.',
                  parse_mode: 'HTML',
                  reply_markup: renderAiIgnoreKeyboard(u)
                })
              }).catch(() => {});
              return new Response('OK');
            }

            const cleanTarget = text.trim();
            u.telegram.aiIgnoredUsers = Array.isArray(u.telegram.aiIgnoredUsers) ? u.telegram.aiIgnoredUsers : [];
            const cleanCheck = cleanTarget.toLowerCase().replace(/^@/, '');
            if (!u.telegram.aiIgnoredUsers.some(x => x.toLowerCase().replace(/^@/, '') === cleanCheck)) {
              u.telegram.aiIgnoredUsers.push(cleanTarget);
              await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            }

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `🚫 کاربر <code>${escapeHtml(cleanTarget)}</code> به لیست نادیده‌گیری هوش مصنوعی اضافه شد.\nاز این پس هوش مصنوعی به پیام‌های این کاربر پاسخی نخواهد داد.`,
                parse_mode: 'HTML',
                reply_markup: renderAiIgnoreKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          if (pendingReply && pendingReply.targetPeerId && text && !text.startsWith('/')) {
            const targetPeerId = pendingReply.targetPeerId;
            const targetAccessHash = pendingReply.targetAccessHash || null;
            const targetName = pendingReply.targetName || 'مخاطب';

            // پاکسازی وضعیت
            globalThis.botUserReplyStates.delete(String(chatId));
            await env.KV.delete('bot_state:' + chatId);

            // ایجاد اکشن ارسال پیام برای رانر
            await enqueueBotAction(env, {
              action: 'send_reply',
              username: targetUsername,
              peerId: targetPeerId,
              accessHash: targetAccessHash,
              targetName: targetName,
              text: text,
              chatId: String(chatId),
              botToken: actualBotToken
            });

            const cleanText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⏳ <b>در حال ارسال پاسخ به ${targetName}...</b>\n\n💬 <b>متن پیام شما:</b>\n<blockquote>${cleanText}</blockquote>\n\n<i>رانر سلف‌بات در حال ارسال پیام از اکانت تلگرام شما است...</i>`,
                parse_mode: 'HTML'
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // پاسخ مستقیم به پیام‌های فوروارد شده شبح با قابلیت ریپلای تلگرام (Swipe to Reply)
          const replyToMsg = msg.reply_to_message;
          if (replyToMsg && text && !text.startsWith('/')) {
            const repText = replyToMsg.text || replyToMsg.caption || '';
            const idMatch = repText.match(/<code>(\d{5,15})<\/code>/) || repText.match(/\((\d{5,15})\)/);
            if (idMatch && idMatch[1]) {
              const targetPeerId = idMatch[1];
              let extractedHash = null;
              if (replyToMsg.reply_markup?.inline_keyboard) {
                for (const row of replyToMsg.reply_markup.inline_keyboard) {
                  for (const btn of row) {
                    if (btn.callback_data && btn.callback_data.includes(targetPeerId)) {
                      const cbParts = btn.callback_data.split(':');
                      if (cbParts[2] && cbParts[2] !== '0') {
                        extractedHash = cbParts[2];
                        break;
                      }
                    }
                  }
                  if (extractedHash) break;
                }
              }

              if (!extractedHash) {
                const lowerTarget = targetUsername.toLowerCase();
                const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
                const found = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(targetPeerId)) : null;
                extractedHash = found?.accessHash || null;
              }

              await enqueueBotAction(env, {
                action: 'send_reply',
                username: targetUsername,
                peerId: targetPeerId,
                accessHash: extractedHash,
                targetName: targetPeerId,
                text: text,
                chatId: String(chatId),
                botToken: actualBotToken
              });

              const cleanText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⏳ <b>در حال ارسال پاسخ به مخاطب (<code>${targetPeerId}</code>)...</b>\n\n💬 <b>متن پاسخ:</b>\n<blockquote>${cleanText}</blockquote>\n\n<i>رانر سلف‌بات در حال ارسال پیام از اکانت تلگرام شما است...</i>`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }
          }

          // دستور ۰: مشاهده چت‌های خصوصی در حالت شبح (/chats یا /unread)
          if (text === '/chats' || text === '/unread') {
            const lowerTarget = targetUsername.toLowerCase();
            let dialogs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget];
            if (!dialogs) {
              dialogs = await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            }
            if (!dialogs && lowerTarget !== targetUsername) {
              dialogs = await env.KV.get('user_dialogs:' + targetUsername, 'json');
            }

            if (Array.isArray(dialogs) && dialogs.length > 0) {
              const sorted = [...dialogs].sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0));
              const topChats = sorted.slice(0, 10);
              const buttons = topChats.map(d => {
                const badge = d.unreadCount > 0 ? ` (${d.unreadCount} 📩)` : '';
                const safeName = (d.name || 'کاربر').slice(0, 18);
                const safeHash = d.accessHash && d.accessHash !== '0' ? d.accessHash : '0';
                return [{
                  text: `👤 ${safeName}${badge}`,
                  callback_data: `ghost_view:${d.id}:${safeHash}`,
                  style: d.unreadCount > 0 ? 'success' : 'primary'
                }];
              });

              buttons.push([
                { text: '🔄 بروزرسانی لیست چت‌ها', callback_data: 'ghost_chats_refresh', style: 'primary' },
                { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
              ]);

              const unreadTotal = dialogs.reduce((sum, d) => sum + (d.unreadCount || 0), 0);
              const listMsg = `👻 <b>[لیست چت‌های خصوصی — حالت شبح]</b>\n\n` +
                `📊 <b>کل پیام‌های خوانده‌نشده:</b> <b>${unreadTotal} پیام</b>\n\n` +
                `💡 روی نام هر مخاطب کلیک کنید تا آخرین پیام‌های او را <b>بدون ارسال تیک آبی (شبح)</b> بخوانید یا به او پاسخ دهید:`;

              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: listMsg,
                  parse_mode: 'HTML',
                  reply_markup: { inline_keyboard: buttons }
                })
              }).catch(() => {});
              return new Response('OK');
            } else {
              await enqueueBotAction(env, {
                action: 'get_dialogs',
                username: targetUsername,
                chatId: String(chatId),
                messageId: null,
                botToken: actualBotToken
              });

              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `🔄 <b>در حال استخراج لیست پیوی‌های خصوصی شما از تلگرام...</b>\n\nلطفاً چند ثانیه صبر کنید تا لیست استخراج و ارسال شود.`,
                  parse_mode: 'HTML',
                  reply_markup: {
                    inline_keyboard: [
                      [
                        { text: '🔄 بررسی مجدد', callback_data: 'ghost_chats_refresh', style: 'primary' },
                        { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
                      ]
                    ]
                  }
                })
              }).catch(() => {});
              return new Response('OK');
            }
          }

          // دستور ۰.۰۵: انتخاب و تغییر فونت ساعت (/font یا /fonts)
          if (text === '/font' || text === '/fonts') {
            const fontMsg = `🎨 <b>[انتخاب فونت و استایل ساعت تهران]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `یکی از فونت‌های زیر را انتخاب فرمایید تا استایل ساعت تلگرام شما فوراً تغییر کند:\n\n` +
              `💡 <i>تغییرات بلافاصله ذخیره و روی ساعت سلف‌بات شما اعمال خواهند شد.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: fontMsg,
                parse_mode: 'HTML',
                reply_markup: renderFontKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور ۰.۱: ارسال مستقیم پاسخ متنی: /reply <آیدی/یوزرنیم> <متن>
          if (text.startsWith('/reply ')) {
            const rawParts = text.replace(/^\/reply\s+/i, '').trim();
            const spaceIdx = rawParts.indexOf(' ');
            if (spaceIdx === -1) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `💡 <b>نحوه استفاده از دستور ارسال پاسخ:</b>\n<code>/reply شناسه_مخاطب متن_پیام</code>\n\nمثال:\n<code>/reply 12345678 سلام، پیام شما دریافت شد</code>`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }

            const rawTarget = rawParts.slice(0, spaceIdx).trim();
            const replyMsg = rawParts.slice(spaceIdx + 1).trim();

            const lowerTarget = targetUsername.toLowerCase();
            const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            const foundChat = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(rawTarget) || (d.username && d.username.toLowerCase() === rawTarget.toLowerCase().replace(/^@/, ''))) : null;
            const targetPeerId = foundChat ? String(foundChat.id) : rawTarget;
            const targetAccessHash = foundChat?.accessHash || null;
            const targetDisplayName = foundChat?.name || rawTarget;

            await enqueueBotAction(env, {
              action: 'send_reply',
              username: targetUsername,
              peerId: targetPeerId,
              accessHash: targetAccessHash,
              targetName: targetDisplayName,
              text: replyMsg,
              chatId: String(chatId),
              botToken: actualBotToken
            });

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⏳ <b>در حال ارسال پاسخ به ${escapeHtml(targetDisplayName)} (<code>${targetPeerId}</code>)...</b>\n\n💬 متن: <blockquote>${replyMsg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</blockquote>`,
                parse_mode: 'HTML'
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور ۰.۲: ثبت تیک آبی برای چت مشخص: /read <آیدی>
          if (text.startsWith('/read ')) {
            const rawTarget = text.replace(/^\/read\s+/i, '').trim();
            if (rawTarget) {
              const lowerTarget = targetUsername.toLowerCase();
              const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
              const foundChat = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(rawTarget) || (d.username && d.username.toLowerCase() === rawTarget.toLowerCase().replace(/^@/, ''))) : null;
              const targetPeerId = foundChat ? String(foundChat.id) : rawTarget;
              const targetAccessHash = foundChat?.accessHash || null;
              const targetDisplayName = foundChat?.name || rawTarget;

              await enqueueBotAction(env, {
                action: 'mark_read',
                username: targetUsername,
                peerId: targetPeerId,
                accessHash: targetAccessHash,
                targetName: targetDisplayName,
                chatId: String(chatId),
                botToken: actualBotToken
              });

              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⏳ در حال ارسال دستور ثبت تیک آبی برای ${escapeHtml(targetDisplayName)} (<code>${targetPeerId}</code>)...`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }
          }

          // دستور ۱: تست ارسال پیام‌ها و رسانه‌ها
          if (text === '/test') {
            const testActionKb = {
              inline_keyboard: [
                [
                  { text: '✍️ ارسال پاسخ', callback_data: 'ghost_reply:12345678:0', style: 'primary' },
                  { text: '👻 چت در حالت شبح', callback_data: 'ghost_view:12345678:0', style: 'success' }
                ]
              ]
            };

            const testDeleteMsg = `🗑️ <b>[تست سامانه ضد حذف — Anti-Delete]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>فرستنده:</b> کاربر آزمایشی (@TelegramUser) (<code>12345678</code>)\n` +
              `🕒 <b>زمان ارسال پیام:</b> همین حالا\n\n` +
              `📝 <b>متن پیام حذف شده:</b>\n` +
              `<blockquote>این یک پیام آزمایشی برای بررسی دریافت پیام‌های پاک‌شده پیوی است. اتصال به ربات شما کاملاً فعال و پایدار است! ✅</blockquote>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💡 <i>جهت پاسخ به این پیام روی دکمه‌های زیر کلیک کنید.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: testDeleteMsg, parse_mode: 'HTML', reply_markup: testActionKb })
            }).catch(() => {});

            const testEditMsg = `✏️ <b>[تست سامانه ضد ویرایش — Anti-Edit]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>فرستنده:</b> کاربر آزمایشی (@TelegramUser) (<code>12345678</code>)\n` +
              `🕒 <b>زمان ویرایش:</b> همین حالا\n\n` +
              `⏮️ <b>متن قبل از ویرایش:</b>\n` +
              `<blockquote>سلام داداش، ساعت ۵ عصر می‌بینمت.</blockquote>\n\n` +
              `⏭️ <b>متن جدید و ویرایش‌شده:</b>\n` +
              `<blockquote>سلام، برنامه تغییر کرد، فردا ساعت ۸ صبح تماس می‌گیرم!</blockquote>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💡 <i>جهت پاسخ به این پیام روی دکمه‌های زیر کلیک کنید.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: testEditMsg, parse_mode: 'HTML', reply_markup: testActionKb })
            }).catch(() => {});

            const testTtlMsg = `📸 <b>[تست سامانه نجات رسانه — Anti-TTL]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>فرستنده:</b> کاربر آزمایشی (@TelegramUser) (<code>12345678</code>)\n` +
              `⏳ <b>مدت زمان تایمر:</b> <code>یک‌بار مصرف (View-Once)</code>\n` +
              `💾 <b>حجم فایل:</b> <code>28.4 KB</code>\n\n` +
              `<blockquote>این یک تصویر آزمایشی از رسانه زمان‌دار نجات‌یافته در سلف‌بات شما است. تمامی رسانه‌های تایمردار بلافاصله پس از دریافت در پیوی به اینجا فوروارد خواهند شد! ✅</blockquote>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💡 <i>جهت پاسخ به این پیام روی دکمه‌های زیر کلیک کنید.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendPhoto`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                photo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
                caption: testTtlMsg,
                parse_mode: 'HTML',
                reply_markup: testActionKb
              })
            }).catch(() => {});

            return new Response('OK');
          }

          // دستور ۲: استعلام وضعیت زنده
          if (text === '/status') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: renderStatusMessage(u),
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور ۳: تغییر وضعیت حالت شبح (Ghost Mode)
          if (text.startsWith('/ghost')) {
            const parts = text.split(/\s+/);
            const sub = (parts[1] || '').toLowerCase();
            let newGhost;
            if (sub === 'on') newGhost = true;
            else if (sub === 'off') newGhost = false;
            else newGhost = !u.telegram?.ghostMode;

            u.telegram.ghostMode = newGhost;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            const stateTxt = newGhost
              ? `👻 <b>حالت شبح (Ghost Mode) فعال شد! 🟢</b>\n\n` +
                `از این پس پیام‌های جدید پیوی بدون ارسال تیک آبی (خوانده‌شدن) به این ربات ارسال می‌شوند تا در آرامش مطالعه فرمایید.\n\n` +
                `💡 <i>نکته: هر زمان در محیط اصلی تلگرام خواستید تیک آبی را ثبت کنید، کافیست دستور</i> <code>.read</code> <i>را در چت ارسال کنید.</i>`
              : `👁️ <b>حالت شبح (Ghost Mode) غیرفعال شد! ⚪</b>\n\nتیک آبی خوانده‌شدن به صورت عادی توسط تلگرام ارسال خواهد شد.`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: stateTxt,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور حذف کامل کلید API هوش مصنوعی: /ai_del_key یا /ai_delete_key
          if (text === '/ai_del_key' || text === '/ai_delete_key' || text.startsWith('/ai_del_key') || text.startsWith('/ai_delete_key')) {
            u.telegram.aiApiKey = '';
            u.telegram.aiReplyEnabled = false;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            const delMsg = `🗑️ <b>کلید API هوش مصنوعی به طور کامل حذف و پاکسازی شد!</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `✅ فیلد کلید API اکنون کاملاً خالی شد.\n` +
              `✅ وضعیت پاسخگویی خودکار AI متوقف شد تا تداخلی رخ ندهد.\n\n` +
              `💡 اکنون می‌توانید کلید جدید را بدون هرگونه تداخل با کلید قبلی ثبت فرمایید.`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: delMsg,
                parse_mode: 'HTML',
                reply_markup: renderAiKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور ثبت کلید API: /ai_set_key [key]
          if (text === '/ai_set_key' || text.startsWith('/ai_set_key')) {
            const rawKey = text.replace(/^\/ai_set_key\s*/i, '').trim();
            if (!rawKey) {
              await env.KV.put('bot_state:' + chatId, JSON.stringify({ waitingFor: 'ai_api_key' }), { expirationTtl: 600 });
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `🔑 <b>ثبت کلید API جدید هوش مصنوعی:</b>\n\nلطفاً کلید API خود را در قالب پیام ارسال فرمایید.\n💡 برای لغو، دستور /cancel را بفرستید.`,
                  parse_mode: 'HTML',
                  reply_markup: { force_reply: true, selective: true }
                })
              }).catch(() => {});
              return new Response('OK');
            }

            u.telegram.aiApiKey = rawKey;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            const masked = rawKey.slice(0, 6) + '••••••••' + rawKey.slice(-4);

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `✅ <b>کلید API جدید با موفقیت ذخیره شد:</b> <code>${masked}</code>\n\nتداخل قبلی کاملاً برطرف گردید.`,
                parse_mode: 'HTML',
                reply_markup: renderAiKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور مدیریت لیست کاربران مستثنی از پاسخ هوش مصنوعی: /ai_ignore و /ai_unignore
          if (text === '/ai_ignore' || text.startsWith('/ai_ignore') || text === '/ai_unignore' || text.startsWith('/ai_unignore')) {
            const isRemove = text.startsWith('/ai_unignore');
            const targetRaw = text.replace(/^\/(?:ai_ignore|ai_unignore)\s*/i, '').trim();
            u.telegram.aiIgnoredUsers = Array.isArray(u.telegram.aiIgnoredUsers) ? u.telegram.aiIgnoredUsers : [];

            if (!targetRaw) {
              const currentList = u.telegram.aiIgnoredUsers.length > 0
                ? u.telegram.aiIgnoredUsers.map((x, idx) => `${idx + 1}. <code>${x}</code>`).join('\n')
                : '<i>هنوز هیچ کاربری به لیست نادیده‌گیری اضافه نشده است.</i>';
              const helpMsg = `🚫 <b>[کاربران مستثنی از پاسخ هوش مصنوعی — AI Ignore List]</b>\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `هوش مصنوعی به پیام‌های خصوصی این افراد هرگز پاسخ نخواهد داد.\n\n` +
                `📋 <b>لیست فعلی:</b>\n${currentList}\n\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `💡 <b>دستورات سریع:</b>\n` +
                `• افزودن: <code>/ai_ignore 12345678</code> یا <code>/ai_ignore @username</code>\n` +
                `• حذف: <code>/ai_unignore 12345678</code>\n` +
                `همچنین می‌توانید از بخش هوش مصنوعی در استودیوی پنل وب استفاده فرمایید.`;
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: helpMsg, parse_mode: 'HTML' })
              }).catch(() => {});
              return new Response('OK');
            }

            const cleanTarget = targetRaw.toLowerCase().replace(/^@/, '');
            if (isRemove) {
              u.telegram.aiIgnoredUsers = u.telegram.aiIgnoredUsers.filter(x => x.toLowerCase().replace(/^@/, '') !== cleanTarget);
              await env.KV.put('user:' + targetUsername, JSON.stringify(u));
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: `✅ کاربر <code>${targetRaw}</code> از لیست نادیده‌گیری AI حذف شد (پاسخ مجاز است).`, parse_mode: 'HTML' })
              }).catch(() => {});
            } else {
              if (!u.telegram.aiIgnoredUsers.some(x => x.toLowerCase().replace(/^@/, '') === cleanTarget)) {
                u.telegram.aiIgnoredUsers.push(targetRaw);
              }
              await env.KV.put('user:' + targetUsername, JSON.stringify(u));
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: `🚫 کاربر <code>${targetRaw}</code> به لیست نادیده‌گیری AI اضافه شد.\nاز این پس هوش مصنوعی به پیام‌های این کاربر هیچ پاسخی نمی‌دهد.`, parse_mode: 'HTML' })
              }).catch(() => {});
            }
            return new Response('OK');
          }

          // دستور ۴: منو یا تغییر وضعیت پاسخ هوشمند هوش مصنوعی (AI Smart Reply)
          if (text === '/ai' || (text.startsWith('/ai') && !text.startsWith('/ai_test') && !text.startsWith('/ai_del') && !text.startsWith('/ai_set') && !text.startsWith('/ai_ignore') && !text.startsWith('/ai_unignore'))) {
            const parts = text.split(/\s+/);
            const sub = (parts[1] || '').toLowerCase();

            if (!sub || sub === 'menu' || sub === 'info') {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
              return new Response('OK');
            }

            let newAi;
            if (sub === 'on') newAi = true;
            else if (sub === 'off') newAi = false;
            else newAi = !u.telegram?.aiReplyEnabled;

            if (newAi && !u.telegram?.aiApiKey) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚠️ <b>کلید API هوش مصنوعی تنظیم نشده است!</b>\n\nجهت فعال‌سازی پاسخ هوشمند، ابتدا با دکمه <b>🔑 ثبت / ویرایش کلید API</b> کلید خود را ارسال فرمایید:\n\n• کلید رایگان Gemini از:\nhttps://aistudio.google.com/apikey`,
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
              return new Response('OK');
            }

            u.telegram.aiReplyEnabled = newAi;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            const stateTxt = newAi
              ? `🤖 <b>پاسخ هوشمند هوش مصنوعی فعال شد! 🟢</b>\n\nسرویس انتخابی: <code>${u.telegram?.aiProvider || 'gemini'}</code>\nهوش مصنوعی تنها در زمان <b>آفلاین بودن شما</b>، به صورت هوشمندانه متناسب با پیام‌های مخاطبان در پیوی پاسخ می‌دهد.\n\n💡 جهت آزمایش زنده پاسخ هوش مصنوعی، دستور زیر را ارسال کنید:\n<code>/ai_test سلام وقت بخیر</code>`
              : `🤖 <b>پاسخ هوشمند AI غیرفعال شد! ⚪</b>\n\nمنشی ثابت (AFK) در صورت فعال بودن جایگزین خواهد شد.`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: stateTxt,
                parse_mode: 'HTML',
                reply_markup: renderAiKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور انتخاب مدل هوش مصنوعی: /ai_model [model_name]
          if (text === '/ai_model' || text.startsWith('/ai_model')) {
            const rawModel = text.replace(/^\/ai_model\s*/i, '').trim();
            const currentProvider = u.telegram?.aiProvider || 'gemini';
            const currentModel = u.telegram?.aiModel || (currentProvider === 'gemini' ? 'gemini-2.5-flash' : (currentProvider === 'custom' ? 'deepseek-chat' : 'gpt-4o-mini'));

            if (!rawModel) {
              const modelHelp = `🤖 <b>[مدیریت مدل هوش مصنوعی — AI Model Selection]</b>\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `🌐 <b>سرویس فعلی:</b> <code>${currentProvider.toUpperCase()}</code>\n` +
                `⚡ <b>مدل فعال فعلی:</b> <code>${currentModel}</code>\n\n` +
                `💡 <b>مدل‌های پیشنهادی گوگل (رایگان):</b>\n` +
                `• <code>/ai_model gemini-2.5-flash</code> (پیشنهادی و پرسرعت)\n` +
                `• <code>/ai_model gemini-2.0-flash</code> (پایدار)\n` +
                `• <code>/ai_model gemini-1.5-flash</code>\n` +
                `• <code>/ai_model gemini-1.5-pro</code> (قدرتمند)\n\n` +
                `💡 <b>مدل‌های پیشنهادی OpenAI / DeepSeek:</b>\n` +
                `• <code>/ai_model gpt-4o-mini</code> (سریع و اقتصادی)\n` +
                `• <code>/ai_model gpt-4o</code> (پرچمدار)\n` +
                `• <code>/ai_model deepseek-chat</code>\n\n` +
                `✏️ جهت تغییر فوری، دستور را همراه با شناسه مدل ارسال فرمایید:\n` +
                `<code>/ai_model gemini-2.5-flash</code>`;

              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: modelHelp, parse_mode: 'HTML' })
              }).catch(() => {});
              return new Response('OK');
            }

            u.telegram.aiModel = rawModel.slice(0, 100);
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `✅ <b>مدل هوش مصنوعی با موفقیت تغییر کرد!</b>\n\nمدل جدید: <code>${rawModel}</code>\nسرویس‌دهنده: <code>${currentProvider.toUpperCase()}</code>\n\n💡 جهت آزمایش زنده عملکرد، دستور زیر را ارسال کنید:\n<code>/ai_test سلام وقت بخیر</code>`,
                parse_mode: 'HTML',
                reply_markup: renderAiKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // دستور ۵: تست زنده هوش مصنوعی و پرامپت شخصی
          if (text.startsWith('/ai_test')) {
            const testPrompt = text.replace(/^\/ai_test\s*/i, '').trim();
            if (!testPrompt) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `💡 <b>نحوه استفاده از دستور تست هوش مصنوعی:</b>\n\n<code>/ai_test سلام شما کی هستید؟</code>\n\nبا ارسال این دستور، پیام شما مستقیماً با پرامپت شخصیت و اطلاعات زمینه‌ای که در پنل تنظیم کرده‌اید پردازش شده و پاسخ واقعی را در اینجا مشاهده می‌کنید.`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }

            if (!u.telegram?.aiApiKey) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `⚠️ <b>کلید API هوش مصنوعی تنظیم نشده است!</b>\n\nجهت تست هوش مصنوعی، ابتدا کلید API خود را در پنل استودیو وارد و ذخیره فرمایید.`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
              return new Response('OK');
            }

            const activeModel = u.telegram?.aiModel || (u.telegram?.aiProvider === 'gemini' ? 'gemini-2.5-flash' : 'gpt-4o-mini');
            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `⏳ <i>در حال ارسال پیام به مدل هوش مصنوعی (${activeModel})...</i>`,
                parse_mode: 'HTML'
              })
            }).catch(() => {});

            try {
              const aiReply = await callAIApiWorker(
                u.telegram.aiProvider || 'gemini',
                u.telegram.aiApiKey,
                u.telegram.aiSystemPrompt,
                u.telegram.aiContext,
                testPrompt,
                u.telegram.aiModel
              );

              const cleanPrompt = testPrompt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
              const cleanReply = (aiReply || '(پاسخی دریافت نشد)').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

              const resultMsg = `🧪 <b>[نتیجه تست زنده پاسخ هوش مصنوعی]</b>\n\n` +
                `🌐 <b>موتور و سرویس‌دهنده:</b> <code>${(u.telegram.aiProvider || 'gemini').toUpperCase()}</code>\n` +
                `🤖 <b>مدل هوش مصنوعی فعال:</b> <code>${activeModel}</code>\n` +
                `📩 <b>پیام تستی شما:</b>\n<blockquote>${cleanPrompt}</blockquote>\n\n` +
                `🤖 <b>پاسخ تولید شده هوش مصنوعی:</b>\n<blockquote>${cleanReply}</blockquote>\n\n` +
                `✅ این همان پاسخی است که مخاطبان شما در چت خصوصی دریافت خواهند کرد!`;

              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: resultMsg,
                  parse_mode: 'HTML',
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});

            } catch (testErr) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: `❌ <b>خطا در فراخوانی API هوش مصنوعی:</b>\n<code>${testErr.message}</code>\n\n💡 لطفاً کلید API و دسترسی اینترنت را در پنل استودیو بررسی فرمایید.`,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
            }
            return new Response('OK');
          }

          // دستور ۶: راهنمای کامل
          if (text === '/help') {
            const helpText = `📚 <b>راهنمای جامع ربات دستیار Arizo Self</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `🤖 <b>دستورات داخل این ربات:</b>\n` +
              `• <code>/start</code> — باز کردن منوی اصلی و استودیو\n` +
              `• <code>/chats</code> یا <code>/unread</code> — 👻 مشاهده چت‌های خصوصی و پیام‌های خوانده‌نشده در حالت شبح\n` +
              `• <code>/font</code> — 🎨 تغییر فونت و استایل ساعت تهران\n` +
              `• <code>/reply آیدی متن</code> — ✍️ ارسال پاسخ مستقیم از اکانت شما به مخاطب\n` +
              `• <code>/read آیدی</code> — 👁️ ثبت تیک آبی برای چت مشخص\n` +
              `• <code>/cancel</code> — لغو عملیات پاسخ جاری\n` +
              `• <code>/status</code> — استعلام زنده وضعیت کلیه سرویس‌ها\n` +
              `• <code>/ghost [on|off]</code> — روشن/خاموش کردن فوری حالت شبح\n` +
              `• <code>/ai [on|off]</code> — مشاهده منو یا روشن/خاموش کردن پاسخ هوشمند AI\n` +
              `• <code>/ai_model [مدل]</code> — 🤖 انتخاب مدل هوش مصنوعی (Gemini/OpenAI/DeepSeek)\n` +
              `• <code>/ai_set_key [کلید]</code> — 🔑 ثبت مستقیم یا تغییر کلید API هوش مصنوعی\n` +
              `• <code>/ai_del_key</code> — 🗑️ حذف کامل کلید API هوش مصنوعی (رفع هرگونه تداخل)\n` +
              `• <code>/ai_test متن</code> — تست زنده پرامپت و پاسخ هوش مصنوعی\n` +
              `• <code>/test</code> — ارسال گزارش‌های آزمایشی ضد حذف و ضد ویرایش\n\n` +
              `⚡ <b>دستورات سریع در اپلیکیشن تلگرام (سلف‌بات):</b>\n` +
              `• <code>.read</code> — ثبت تیک آبی در چت فعلی بدون خروج از حالت شبح\n` +
              `• <code>.read all</code> — ثبت تیک آبی برای تمام چت‌های خوانده‌نشده\n` +
              `• <code>.ghost on / off</code> — فعال/غیرفعال‌سازی حالت شبح در تلگرام\n` +
              `• <code>.ai on / off</code> — فعال/غیرفعال‌سازی پاسخ هوش مصنوعی\n` +
              `• <code>.ai model [مدل]</code> — تغییر مدل هوش مصنوعی در چت\n` +
              `• <code>.ai ignore [کاربر]</code> — افزودن کاربر به لیست نادیده‌گیری AI\n` +
              `• <code>.mute</code> (ریپلای) — بی‌صدا و حذف خودکار پیام‌های فرد\n` +
              `• <code>.unmute</code> — رفع سکوت فرد مشخص‌شده`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: helpText,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // پیام استارت اصلی با جزئیات کامل و جامع — فقط و فقط در صورت ارسال صریح دستور /start
          if (text === '/start' || text.startsWith('/start')) {
            const isOnline = u.telegram?.enabled && !u.isSuspended;
            const lastTime = u.status?.lastTime || 'در انتظار اجرا...';
            const antiDelete = u.telegram?.bot?.antiDeleteEnabled !== false;
            const antiEdit = u.telegram?.bot?.antiEditEnabled !== false;
            const forwardTtl = u.telegram?.bot?.forwardTtlToBot !== false;
            const ghostModeActive = !!u.telegram?.ghostMode;
            const aiReplyActive = !!u.telegram?.aiReplyEnabled;

            const welcomeText = `💎 <b>سامانه مدیریت اختصاصی سلف‌بات Arizo Self</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>مالک حساب:</b> <code>@${targetUsername}</code>\n` +
              `📡 <b>وضعیت اتصال:</b> ${isOnline ? '🟢 آنلاین و متصل (Sub-100ms)' : '⏸️ متوقف شده'}\n` +
              `🕒 <b>ساعت فعال سلف:</b> <code>${lastTime}</code>\n\n` +
              `🛡️ <b>سپر امنیتی و مانیتورینگ زنده:</b>\n` +
              `<blockquote>` +
              `• 🗑️ <b>سیستم ضد حذف:</b> ${antiDelete ? 'فعال 🟢 (ارسال مستقیم به این چت)' : 'غیرفعال ⚪'}\n` +
              `• ✏️ <b>سیستم ضد ویرایش:</b> ${antiEdit ? 'فعال 🟢 (نمایش قبل و بعد)' : 'غیرفعال ⚪'}\n` +
              `• 📸 <b>رسانه‌های زمان‌دار:</b> ${forwardTtl ? 'فعال 🟢 (ارسال مستقیم به ربات)' : 'ارسال به سیومسیج ⚪'}\n` +
              `• 👻 <b>حالت شبح (Ghost Mode):</b> ${ghostModeActive ? 'فعال 🟢 (تیک آبی مسدود)' : 'غیرفعال ⚪'}\n` +
              `• 🤖 <b>پاسخ هوشمند AI:</b> ${aiReplyActive ? `فعال 🟢 (${u.telegram?.aiProvider || 'gemini'})` : 'غیرفعال ⚪'}\n` +
              `</blockquote>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💡 <i>جهت مدیریت تنظیمات، مشاهده چت‌های شبح، یا ورود به استودیو، از دکمه‌های زیر استفاده فرمایید:</i>`;

            const sendRes = await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: welcomeText,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => null);

            if (!sendRes || !sendRes.ok) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: welcomeText.replace(/<[^>]*>/g, ''),
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            }
            return new Response('OK');
          }

          // پاسخ کوتاه و بهینه به پیام‌های متفرقه غیردستوری (جلوگیری از ارسال مکرر پیام طولانی خوشامدگویی)
          await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `💡 <b>پیام شما دریافت شد.</b>\n\nبرای مشاهده امکانات سلف‌بات از دکمه‌های زیر استفاده فرمایید یا دستور /start را ارسال کنید:`,
              parse_mode: 'HTML',
              reply_markup: renderMainKeyboard(u)
            })
          }).catch(() => {});
          return new Response('OK');
        }

        // پاسخ به کلیک دکمه‌های اینلاین شیشه‌ای
        if (update.callback_query) {
          const cb = update.callback_query;
          const cbSenderId = String(cb.from?.id);
          const chatId = cb.message?.chat?.id || cb.from.id;
          const messageId = cb.message?.message_id;
          const data = cb.data;

          // 🔒 قفل انحصاری امنیتی دکمه‌های اینلاین شیشه‌ای برای غیرمالک
          if (allowedOwnerId && cbSenderId !== String(allowedOwnerId)) {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: `⛔ دسترسی غیرمجاز! این ربات اختصاصی است و فقط به مالک حساب (${targetUsername}) پاسخ می‌دهد.`,
                show_alert: true
              })
            }).catch(() => {});
            return new Response('OK');
          }

          // ۱. دکمه مشاهده لیست چت‌های خصوصی در حالت شبح
          if (data === 'ghost_chats' || data === 'ghost_chats_refresh') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: 'در حال بارگذاری لیست چت‌ها...' })
            }).catch(() => {});

            const lowerTarget = targetUsername.toLowerCase();
            let dialogs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget];
            if (!dialogs || data === 'ghost_chats_refresh') {
              dialogs = await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            }
            if (!dialogs && data !== 'ghost_chats_refresh' && lowerTarget !== targetUsername) {
              dialogs = await env.KV.get('user_dialogs:' + targetUsername, 'json');
            }

            if (Array.isArray(dialogs) && dialogs.length > 0 && data !== 'ghost_chats_refresh') {
              const sorted = [...dialogs].sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0));
              const topChats = sorted.slice(0, 10);
              const buttons = topChats.map(d => {
                const badge = d.unreadCount > 0 ? ` (${d.unreadCount} 📩)` : '';
                const safeName = (d.name || 'کاربر').slice(0, 18);
                const safeHash = d.accessHash && d.accessHash !== '0' ? d.accessHash : '0';
                return [{
                  text: `👤 ${safeName}${badge}`,
                  callback_data: `ghost_view:${d.id}:${safeHash}`,
                  style: d.unreadCount > 0 ? 'success' : 'primary'
                }];
              });

              buttons.push([
                { text: '🔄 بروزرسانی لیست چت‌ها', callback_data: 'ghost_chats_refresh', style: 'primary' },
                { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
              ]);

              const unreadTotal = dialogs.reduce((sum, d) => sum + (d.unreadCount || 0), 0);
              const listMsg = `👻 <b>[لیست چت‌های خصوصی — حالت شبح]</b>\n\n` +
                `📊 <b>کل پیام‌های خوانده‌نشده:</b> <b>${unreadTotal} پیام</b>\n\n` +
                `💡 روی نام هر مخاطب کلیک کنید تا آخرین پیام‌های او را <b>بدون ارسال تیک آبی (شبح)</b> بخوانید یا به او پاسخ دهید:`;

              let edited = false;
              if (messageId) {
                const editRes = await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: listMsg,
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: buttons }
                  })
                }).catch(() => null);
                edited = editRes && editRes.ok;
              }
              if (!edited) {
                await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: listMsg,
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: buttons }
                  })
                }).catch(() => {});
              }
            } else {
              await enqueueBotAction(env, {
                action: 'get_dialogs',
                username: targetUsername,
                chatId: String(chatId),
                messageId: messageId || null,
                botToken: actualBotToken
              });

              const waitMsg = `🔄 <b>در حال دریافت لیست پیوی‌های خصوصی شما از تلگرام...</b>\n\nلطفاً چند ثانیه صبر کنید تا لیست استخراج و در همین پیام نمایش داده شود.`;
              const waitKeyboard = {
                inline_keyboard: [
                  [
                    { text: '🔄 تلاش مجدد', callback_data: 'ghost_chats_refresh', style: 'primary' },
                    { text: '🔙 بازگشت به منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
                  ]
                ]
              };

              let waitEdited = false;
              if (messageId) {
                const editRes = await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: waitMsg,
                    parse_mode: 'HTML',
                    reply_markup: waitKeyboard
                  })
                }).catch(() => null);
                waitEdited = editRes && editRes.ok;
              }
              if (!waitEdited) {
                await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: waitMsg,
                    parse_mode: 'HTML',
                    reply_markup: waitKeyboard
                  })
                }).catch(() => {});
              }
            }

          } else if (data.startsWith('ghost_view:')) {
            const parts = data.split(':');
            const targetPeerId = parts[1];
            const targetAccessHash = parts[2] || null;
            const lowerTarget = targetUsername.toLowerCase();
            const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            const foundChat = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(targetPeerId)) : null;
            const targetName = foundChat?.name || (parts[3] ? decodeURIComponent(parts[3]) : 'مخاطب');
            const finalAccessHash = (targetAccessHash && targetAccessHash !== '0') ? targetAccessHash : (foundChat?.accessHash || null);
            const unreadCount = Number(foundChat?.unreadCount) || 0;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: `در حال خواندن چت با ${targetName} در حالت شبح...` })
            }).catch(() => {});

            await enqueueBotAction(env, {
              action: 'get_messages',
              username: targetUsername,
              peerId: targetPeerId,
              accessHash: finalAccessHash,
              targetName: targetName,
              unreadCount: unreadCount,
              chatId: String(chatId),
              messageId: messageId || null,
              botToken: actualBotToken
            });

            const loadingMsg = `⏳ <b>در حال دریافت پیام‌های چت ${escapeHtml(targetName)} در حالت شبح...</b>\n\n🔒 <i>تیک آبی برای مخاطب ارسال نخواهد شد.</i>`;
            let viewEdited = false;
            if (messageId) {
              const editRes = await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: loadingMsg,
                  parse_mode: 'HTML'
                })
              }).catch(() => null);
              viewEdited = editRes && editRes.ok;
            }
            if (!viewEdited) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: loadingMsg,
                  parse_mode: 'HTML'
                })
              }).catch(() => {});
            }

          } else if (data.startsWith('ghost_reply:')) {
            const parts = data.split(':');
            const targetPeerId = parts[1];
            const targetAccessHash = parts[2] || null;
            const lowerTarget = targetUsername.toLowerCase();
            const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            const foundChat = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(targetPeerId)) : null;
            const targetName = foundChat?.name || (parts[3] ? decodeURIComponent(parts[3]) : 'مخاطب');
            const finalAccessHash = (targetAccessHash && targetAccessHash !== '0') ? targetAccessHash : (foundChat?.accessHash || null);

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id })
            }).catch(() => {});

            globalThis.botUserReplyStates = globalThis.botUserReplyStates || new Map();
            globalThis.botUserReplyStates.set(String(chatId), {
              targetPeerId,
              targetAccessHash: finalAccessHash,
              targetName,
              timestamp: Date.now()
            });
            await env.KV.put('bot_state:' + chatId, JSON.stringify({
              targetPeerId,
              targetAccessHash: finalAccessHash,
              targetName,
              timestamp: Date.now()
            }), { expirationTtl: 600 });

            const replyPrompt = `✍️ <b>ارسال پاسخ مستقیم به ${escapeHtml(targetName)}:</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>مخاطب:</b> ${escapeHtml(targetName)} (<code>${targetPeerId}</code>)\n\n` +
              `لطفاً متن پیامی که می‌خواهید از اکانت شخصی تلگرام شما برای <b>${escapeHtml(targetName)}</b> ارسال شود را تایپ کرده و بفرستید:\n\n` +
              `💡 <i>نکته: پیام مستقیماً از اکانت اصلی شما ارسال خواهد شد و تیک آبی در حالت شبح مدیریت می‌شود.\n` +
              `❌ برای انصراف در هر زمان می‌توانید دستور <code>/cancel</code> را ارسال کنید.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: replyPrompt,
                parse_mode: 'HTML',
                reply_markup: {
                  force_reply: true,
                  selective: true
                }
              })
            }).catch(() => {});

          } else if (data.startsWith('ghost_read:')) {
            const parts = data.split(':');
            const targetPeerId = parts[1];
            const targetAccessHash = parts[2] || null;
            const lowerTarget = targetUsername.toLowerCase();
            const dlgs = globalThis.cachedUserDialogs?.[targetUsername] || globalThis.cachedUserDialogs?.[lowerTarget] || await env.KV.get('user_dialogs:' + lowerTarget, 'json');
            const foundChat = Array.isArray(dlgs) ? dlgs.find(d => String(d.id) === String(targetPeerId)) : null;
            const targetName = foundChat?.name || (parts[3] ? decodeURIComponent(parts[3]) : 'مخاطب');
            const finalAccessHash = (targetAccessHash && targetAccessHash !== '0') ? targetAccessHash : (foundChat?.accessHash || null);

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: `در حال ثبت تیک آبی برای چت با ${targetName}...` })
            }).catch(() => {});

            await enqueueBotAction(env, {
              action: 'mark_read',
              username: targetUsername,
              peerId: targetPeerId,
              accessHash: finalAccessHash,
              targetName: targetName,
              chatId: String(chatId),
              messageId: messageId || null,
              botToken: actualBotToken
            });

          } else if (data === 'bot_menu') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderStatusMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            } else {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: renderStatusMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'bot_status') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id })
            }).catch(() => {});

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: renderStatusMessage(u),
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});

          } else if (data === 'bot_toggle') {
            u.telegram.enabled = !u.telegram.enabled;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            const newState = u.telegram.enabled ? 'روشن و فعال شد 🟢' : 'متوقف شد ⏸️';

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: `سلف‌بات ${newState}` })
            }).catch(() => {});

            // به‌روزرسانی کیبورد پیام
            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageReplyMarkup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            }

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `🔄 <b>وضعیت سلف‌بات تغییر کرد:</b>\nسلف‌بات حساب شما اکنون <b>${newState}</b> است.`,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});

          } else if (data === 'bot_toggle_ghost') {
            u.telegram.ghostMode = !u.telegram.ghostMode;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            const ghostState = u.telegram.ghostMode ? 'فعال شد 🟢 (تیک آبی مسدود)' : 'غیرفعال شد ⚪ (تیک آبی عادی)';

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: `👻 حالت شبح ${ghostState}` })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageReplyMarkup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            }

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `👻 <b>حالت شبح (Ghost Mode) تغییر کرد:</b>\nوضعیت فعلی: <b>${ghostState}</b>\n\n💡 برای ثبت تیک آبی دستی در تلگرام از دستور <code>.read</code> استفاده فرمایید.`,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});

          } else if (data === 'bot_toggle_ai') {
            if (!u.telegram.aiReplyEnabled && !u.telegram.aiApiKey) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  callback_query_id: cb.id,
                  text: '⚠️ لطفاً ابتدا کلید API هوش مصنوعی خود را در پنل استودیو وارد و ذخیره کنید!',
                  show_alert: true
                })
              }).catch(() => {});
              return new Response('OK');
            }

            u.telegram.aiReplyEnabled = !u.telegram.aiReplyEnabled;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));
            const aiState = u.telegram.aiReplyEnabled ? 'فعال شد 🟢' : 'غیرفعال شد ⚪';

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: `🤖 پاسخ هوشمند AI ${aiState}` })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageReplyMarkup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  reply_markup: renderMainKeyboard(u)
                })
              }).catch(() => {});
            }

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `🤖 <b>پاسخ هوشمند هوش مصنوعی تغییر کرد:</b>\nوضعیت فعلی: <b>${aiState}</b>\nسرویس‌دهنده: <code>${u.telegram.aiProvider || 'gemini'}</code>\n\n💡 برای تست عملکرد، از دستور <code>/ai_test متن پیام</code> استفاده کنید.`,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});

          } else if (data === 'bot_ai_info' || data === 'ai_menu') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            } else {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_delete_key') {
            // حذف کامل و ریشه‌ای کلید API هوش مصنوعی برای جلوگیری از هرگونه تداخل
            u.telegram.aiApiKey = '';
            u.telegram.aiReplyEnabled = false;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: '✅ کلید API هوش مصنوعی به طور کامل و ریشه‌ای حذف شد!\nتداخل قبلی پاکسازی گردید و فیلد کلید خالی شد.',
                show_alert: true
              })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_set_key_prompt') {
            await env.KV.put('bot_state:' + chatId, JSON.stringify({ waitingFor: 'ai_api_key' }), { expirationTtl: 600 });
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: 'لطفاً کلید جدید API خود را در قالب پیام ارسال فرمایید.'
              })
            }).catch(() => {});

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `🔑 <b>ثبت کلید API جدید هوش مصنوعی:</b>\n` +
                  `━━━━━━━━━━━━━━━━━━━━\n` +
                  `لطفاً کلید جدید خود را در پاسخ به این پیام ارسال فرمایید.\n\n` +
                  `💡 <i>کلید قبلی به صورت خودکار حذف شده و با کلید جدید جایگزین خواهد شد تا کوچک‌ترین تداخلی رخ ندهد.</i>\n\n` +
                  `❌ برای انصراف، دستور <code>/cancel</code> را ارسال کنید.`,
                parse_mode: 'HTML',
                reply_markup: {
                  force_reply: true,
                  selective: true
                }
              })
            }).catch(() => {});

          } else if (data === 'ai_toggle_provider') {
            u.telegram.aiProvider = (u.telegram.aiProvider === 'openai' ? 'gemini' : 'openai');
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: `🌐 مدل هوش مصنوعی به ${u.telegram.aiProvider === 'gemini' ? 'Google Gemini ♊' : 'OpenAI GPT 🧠'} تغییر یافت.`
              })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_toggle_cooldown') {
            const cooldownOptions = [0, 1, 3, 5, 10, 30];
            const currentCooldown = u.telegram?.aiCooldown ?? 5;
            let currentIdx = cooldownOptions.indexOf(currentCooldown);
            if (currentIdx === -1) currentIdx = 3;
            const nextCooldown = cooldownOptions[(currentIdx + 1) % cooldownOptions.length];
            u.telegram.aiCooldown = nextCooldown;
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            const cdLabel = nextCooldown === 0 ? 'بدون محدودیت زمانی (فوری ⚡)' : `هر ${nextCooldown} دقیقه`;
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: `⏱️ فاصله پاسخگویی هوش مصنوعی: ${cdLabel}`
              })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_test_modal') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id })
            }).catch(() => {});

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `🧪 <b>تست سریع پاسخ هوش مصنوعی:</b>\n\n` +
                  `برای تست عملکرد مدل و کلید خود، دستور زیر را به همین ربات ارسال فرمایید:\n\n` +
                  `<code>/ai_test سلام وقت بخیر، امروز چه برنامه‌ای داری؟</code>\n\n` +
                  `پاسخ بلافاصله توسط مدل هوش مصنوعی تولید و در اینجا به شما نشان داده خواهد شد.`,
                parse_mode: 'HTML'
              })
            }).catch(() => {});

          } else if (data === 'ai_models_menu') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: '🤖 منوی انتخاب مدل هوش مصنوعی باز شد' })
            }).catch(() => {});

            const modelsMsg = `🤖 <b>[انتخاب مدل هوش مصنوعی — AI Models Menu]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `مدل مورد نظر خود را برای پاسخگویی خودکار به مخاطبین انتخاب فرمایید:\n\n` +
              `💡 <i>مدل‌های Gemini برای اکثر کاربران پرسرعت و رایگان هستند. برای استفاده از DeepSeek یا GPT به کلید API مربوطه نیاز دارید.</i>`;

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: modelsMsg,
                  parse_mode: 'HTML',
                  reply_markup: renderAiModelsKeyboard(u)
                })
              }).catch(() => {});
            } else {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: modelsMsg,
                  parse_mode: 'HTML',
                  reply_markup: renderAiModelsKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data.startsWith('ai_set_model:')) {
            const chosenModel = data.replace('ai_set_model:', '').trim();
            u.telegram.aiModel = chosenModel;

            if (chosenModel.toLowerCase().startsWith('gemini')) {
              u.telegram.aiProvider = 'gemini';
            } else if (chosenModel.toLowerCase().startsWith('gpt')) {
              u.telegram.aiProvider = 'openai';
            } else if (chosenModel.toLowerCase().includes('deepseek') || chosenModel.toLowerCase().includes('claude')) {
              u.telegram.aiProvider = 'custom';
            }

            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: `✅ مدل هوش مصنوعی به ${chosenModel} تغییر یافت.`
              })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_ignore_menu') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: '🚫 منوی لیست نادیده‌گیری هوش مصنوعی باز شد' })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiIgnoreMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiIgnoreKeyboard(u)
                })
              }).catch(() => {});
            } else {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: renderAiIgnoreMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiIgnoreKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_clear_ignore') {
            u.telegram.aiIgnoredUsers = [];
            await env.KV.put('user:' + targetUsername, JSON.stringify(u));

            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: '✅ لیست نادیده‌گیری هوش مصنوعی کاملاً پاکسازی شد.',
                show_alert: true
              })
            }).catch(() => {});

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: renderAiIgnoreMessage(u),
                  parse_mode: 'HTML',
                  reply_markup: renderAiIgnoreKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data === 'ai_add_ignore_prompt') {
            await env.KV.put('bot_state:' + chatId, JSON.stringify({ waitingFor: 'ai_ignore_user' }), { expirationTtl: 600 });
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                callback_query_id: cb.id,
                text: 'لطفاً شناسه یا یوزرنیم کاربر را ارسال فرمایید.'
              })
            }).catch(() => {});

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: `➕ <b>افزودن کاربر به لیست نادیده‌گیری هوش مصنوعی:</b>\n` +
                  `━━━━━━━━━━━━━━━━━━━━\n` +
                  `لطفاً <b>شناسه عددی (Numeric ID)</b> یا <b>نام کاربری (@username)</b> فردی که مایلید هوش مصنوعی به پیام‌های او پاسخ ندهد را در پاسخ به این پیام ارسال فرمایید:\n\n` +
                  `❌ برای انصراف، دستور <code>/cancel</code> را ارسال کنید.`,
                parse_mode: 'HTML',
                reply_markup: {
                  force_reply: true,
                  selective: true
                }
              })
            }).catch(() => {});

          } else if (data === 'bot_font_menu') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: '🎨 منوی انتخاب فونت ساعت باز شد' })
            }).catch(() => {});

            const fontMsg = `🎨 <b>[انتخاب فونت و استایل ساعت تهران]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `یکی از فونت‌های زیر را انتخاب کنید تا ساعت اکانت شما با آن استایل نمایش داده شود:\n\n` +
              `💡 <i>تغییرات بلافاصله ذخیره و روی ساعت سلف‌بات شما اعمال خواهند شد.</i>`;

            if (messageId) {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_id: messageId,
                  text: fontMsg,
                  parse_mode: 'HTML',
                  reply_markup: renderFontKeyboard(u)
                })
              }).catch(() => {});
            } else {
              await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  chat_id: chatId,
                  text: fontMsg,
                  parse_mode: 'HTML',
                  reply_markup: renderFontKeyboard(u)
                })
              }).catch(() => {});
            }

          } else if (data.startsWith('set_font:')) {
            const fontKey = data.replace('set_font:', '');
            const selectedPreset = FONT_PRESETS[fontKey];
            if (selectedPreset) {
              u.telegram = u.telegram || {};
              u.telegram.digits = selectedPreset.digits;
              await env.KV.put('user:' + targetUsername, JSON.stringify(u));
              if (targetUsername.toLowerCase() !== targetUsername) {
                await env.KV.put('user:' + targetUsername.toLowerCase(), JSON.stringify(u));
              }
              if (env.DB) {
                await env.DB.prepare('UPDATE users SET data = ? WHERE username = ?')
                  .bind(JSON.stringify(u), targetUsername.toLowerCase()).run().catch(() => {});
              }
              activeUsersCache = null;
              activeUsersCacheTime = 0;

              await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  callback_query_id: cb.id,
                  text: `✅ فونت ساعت به "${selectedPreset.name}" تغییر یافت!`
                })
              }).catch(() => {});

              const nowTimeStr = getStylizedTime(selectedPreset.digits, u.telegram?.colon || ':', new Date(), {
                is12h: u.telegram?.is12h
              });

              const updatedFontMsg = `🎨 <b>[فونت ساعت با موفقیت تغییر کرد]</b>\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `✨ <b>فونت انتخابی:</b> <b>${selectedPreset.name}</b>\n` +
                `🕒 <b>پیش‌نمایش زمان فعلی:</b> <code>${nowTimeStr}</code>\n\n` +
                `✅ تغییرات در سرور ذخیره شد و در به‌روزرسانی بعدی تلگرام درج خواهد شد.\n` +
                `جهت انتخاب فونت دیگر روی گزینه‌های زیر کلیک فرمایید:`;

              if (messageId) {
                await fetch(`https://api.telegram.org/bot${actualBotToken}/editMessageText`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    message_id: messageId,
                    text: updatedFontMsg,
                    parse_mode: 'HTML',
                    reply_markup: renderFontKeyboard(u)
                  })
                }).catch(() => {});
              }
            }

          } else if (data === 'bot_test') {
            await fetch(`https://api.telegram.org/bot${actualBotToken}/answerCallbackQuery`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ callback_query_id: cb.id, text: '✅ گزارش تست با موفقیت ارسال شد!' })
            }).catch(() => {});

            const nowTimeStr = getStylizedTime(u.telegram?.digits, u.telegram?.colon || ':', new Date(), {
              is12h: u.telegram?.is12h
            });

            const testReportMsg = `🧪 <b>[گزارش تست جامع وضعیت سلف‌بات]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `✅ <b>ارتباط با ربات دستیار:</b> فعال و پایدار 🟢\n` +
              `🛡️ <b>سامانه ضد حذف (Anti-Delete):</b> آماده رهگیری پیام‌ها\n` +
              `✏️ <b>سامانه ضد ویرایش (Anti-Edit):</b> آماده ثبت تغییرات متن\n` +
              `📸 <b>سامانه نجات مدیا (Anti-TTL):</b> فعال و آماده دریافت\n` +
              `👻 <b>حالت شبح (Ghost Mode):</b> ${(u.telegram?.ghostMode ? 'فعال 🟢' : 'غیرفعال ⚪')}\n` +
              `🤖 <b>پاسخ هوشمند هوش مصنوعی:</b> ${(u.telegram?.aiReplyEnabled ? 'فعال 🟢' : 'غیرفعال ⚪')}\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `🕒 <b>زمان تست:</b> <code>${nowTimeStr}</code>\n` +
              `💡 <i>تمام قابلیت‌ها و ارتباطات ورکر کلادفلر بدون نقص در حال کار هستند.</i>`;

            await fetch(`https://api.telegram.org/bot${actualBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: testReportMsg,
                parse_mode: 'HTML',
                reply_markup: renderMainKeyboard(u)
              })
            }).catch(() => {});
          }
        }

        return new Response('OK');
      } catch (err) {
        console.error('Webhook processing error:', err.message);
        return new Response('OK');
      }
    }

      return new Response('Not Found', { status: 404, headers: SECURITY_HEADERS });
    } catch (unhandledErr) {
      console.error('Unhandled Worker Error:', unhandledErr);
      return json({ error: 'خطای سیستمی رخ داد. لطفاً چند لحظه بعد مجدداً تلاش فرمایید.' }, 500);
    }
  },

  // ==========================================
  // ⏱️ چرخه کرون خودکار (پشتیبان هوشمند در صورت قطعی رانر خارجی)
  // ==========================================
  async scheduled(event, env, ctx) {
    initEnvStorage(env);
    ctx.waitUntil((async () => {
      try {
        // ۱. بررسی زنده بودن رانر در حافظه ایزولیت (اگر در ۵ دقیقه اخیر فعال بوده، پردازش کرون فوراً متوقف می‌شود)
        const lastSync = globalThis.lastRunnerSyncTime || 0;
        if (Date.now() - lastSync < 300000) {
          return;
        }

        // ۲. بررسی پینگ رانر از دیتابیس در صورت آغاز ایزولیت جدید (Zero Redundant Cron Runs)
        if (env.DB) {
          try {
            const row = await env.DB.prepare("SELECT value FROM kv_store WHERE key = 'runner:last_ping'").first();
            if (row && (Date.now() - Number(row.value) < 300000)) {
              globalThis.lastRunnerSyncTime = Number(row.value);
              return; // رانر زنده و فعال است
            }
          } catch (_) {}
        }

        await updateAllUsersOptimized(env);
      } catch (_) {
        // سکوت امن در ورکر
      }
    })().catch(() => {}));
  },
};

function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * به‌روزرسانی موازی و سریع تمام کاربران با کنترل میلی‌ثانیه‌ای رأس دقیقه
 */
async function updateAllUsersOptimized(env) {
  const usersList = await env.KV.get('users_list', 'json') || [];
  if (!usersList.length) return;

  const userObjects = await Promise.all(
    usersList.map(uname => env.KV.get('user:' + uname, 'json'))
  );

  const activeUsers = [];
  for (const u of userObjects) {
    if (!u) continue;
    const sub = checkUserSubscription(u);
    if (!sub.active) {
      if (!u.isSuspended || u.telegram?.enabled) {
        u.isSuspended = true;
        if (u.telegram) u.telegram.enabled = false;
        u.status = u.status || {};
        u.status.error = 'اشتراک شما به پایان رسیده و سلف‌بات به حالت تعلیق درآمده است.';
        await env.KV.put('user:' + u.username, JSON.stringify(u));
      }
      continue;
    }
    if (!u.isSuspended && u.telegram?.enabled && u.telegram?.sessionEncrypted) {
      activeUsers.push(u);
    }
  }

  if (!activeUsers.length) return;

  // اجرای ترتیبی کاربران (جهت رعایت سقف CPU کلودفلر)
  for (const user of activeUsers) {
    await updateSingleUserProfile(user, env, false);
  }
}


/**
 * به‌روزرسانی وضعیت پروفایل و استایل ساعت در پایگاه داده (همگام با رانر گیت‌هاب)
 */
async function updateSingleUserProfile(user, env, forcePersist = false) {
  initEnvStorage(env);
  const now = new Date();
  let exactTimeStr = getStylizedTime(user.telegram?.digits, user.telegram?.colon, now, {
    prefix: user.telegram?.prefix,
    suffix: user.telegram?.suffix,
    is12h: user.telegram?.is12h
  });

  if (user.telegram?.sleepEnabled && isSleepTime(user.telegram.sleepStart, user.telegram.sleepEnd, now)) {
    exactTimeStr = user.telegram.sleepText || '😴 Sleep';
  }

  let exactBioStr = null;
  if (user.telegram?.bioEnabled && user.telegram?.bioTemplate) {
    exactBioStr = renderDynamicBio(user.telegram.bioTemplate, {
      digits: user.telegram.digits,
      colon: user.telegram.colon,
      date: now,
      is12h: user.telegram.is12h
    });
  }

  user.status = user.status || {};
  user.status.lastUpdate = Date.now();
  user.status.lastTime = exactTimeStr;
  user.status.lastBio = exactBioStr;
  user.status.error = null;

  if (forcePersist) {
    await env.KV.put('user:' + user.username, JSON.stringify(user));
  }
}
