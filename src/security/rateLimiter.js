/**
 * 🛡️ Adaptive Sliding-Window Rate Limiter & Honeypot Defense Engine
 * Protects against Brute-Force, DDoS, Credential Stuffing & Vulnerability Scanners
 */

// کش سریع در حافظه ورکر / رانر
const memoryIpStore = new Map();
const memoryBlacklist = new Set();

// مسیرهای تله جهت به دام انداختن فوری ربات‌ها و اسکنرهای مخرب (Honeypot paths)
export const HONEYPOT_PATHS = [
  '/.env',
  '/.git/config',
  '/wp-login.php',
  '/wp-admin',
  '/admin.php',
  '/xmlrpc.php',
  '/cgi-bin/',
  '/actuator/health',
  '/phpmyadmin',
  '/.aws/credentials',
  '/config.json',
  '/api/v1/debug'
];

export const RATE_LIMIT_CONFIG = {
  maxRequestsPerMinute: 60,       // سقف عادی درخواست در دقیقه برای هر IP
  authMaxAttemptsPerMinute: 8,    // سقف آزمون پسورد و لاگین
  banDurationSeconds: 900,        // مسدودسازی ۱۵ دقیقه‌ای در صورت تخطی
  honeypotBanSeconds: 86400       // مسدودسازی ۲۴ ساعته در صورت لمس تله
};

/**
 * بررسی اینکه آیا مسیر جاری یک تله هانی‌پات است یا خیر
 * @param {string} path 
 * @returns {boolean}
 */
export function isHoneypot(path = '') {
  const lower = path.toLowerCase();
  return HONEYPOT_PATHS.some(hp => lower.includes(hp));
}

/**
 * بررسی نرخ درخواست با پنجره لغزان (Sliding Window Rate Limit)
 * @param {string} ip - آدرس کلاینت
 * @param {string} path - مسیر فراخوانی
 * @param {Object} [options]
 * @returns {{ allowed: boolean, remaining: number, resetIn: number, reason?: string }}
 */
export function checkRateLimit(ip = '127.0.0.1', path = '/', options = {}) {
  const now = Date.now();

  // ۱. بررسی لیست سیاه
  if (memoryBlacklist.has(ip)) {
    const banInfo = memoryIpStore.get('ban:' + ip);
    if (banInfo && now < banInfo.expiresAt) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: Math.ceil((banInfo.expiresAt - now) / 1000),
        reason: 'IP temporarily blacklisted due to security policy violations'
      };
    } else {
      memoryBlacklist.delete(ip);
      memoryIpStore.delete('ban:' + ip);
    }
  }

  // ۲. بررسی برخورد با تله هانی‌پات
  if (isHoneypot(path)) {
    const banDuration = (RATE_LIMIT_CONFIG.honeypotBanSeconds * 1000);
    memoryBlacklist.add(ip);
    memoryIpStore.set('ban:' + ip, { expiresAt: now + banDuration, reason: 'honeypot' });
    return {
      allowed: false,
      remaining: 0,
      resetIn: RATE_LIMIT_CONFIG.honeypotBanSeconds,
      reason: 'Malicious path scanner trapped by Honeypot defense'
    };
  }

  // ۳. ارزیابی حد آستانه بر اساس نوع مسیر
  const isAuthRoute = path.includes('/login') || path.includes('/auth') || path.includes('/totp');
  const maxLimit = isAuthRoute
    ? (options.authMax || RATE_LIMIT_CONFIG.authMaxAttemptsPerMinute)
    : (options.max || RATE_LIMIT_CONFIG.maxRequestsPerMinute);

  const windowMs = 60 * 1000;
  const recordKey = `ip:${ip}:${isAuthRoute ? 'auth' : 'api'}`;
  let record = memoryIpStore.get(recordKey);

  if (!record || (now - record.startTime) > windowMs) {
    if (memoryIpStore.size > 1500) {
      let pruned = 0;
      for (const [k, v] of memoryIpStore.entries()) {
        if (pruned++ > 300) break;
        const isBanExpired = v.expiresAt && now > v.expiresAt;
        const isWindowExpired = v.startTime && (now - v.startTime) > windowMs;
        if (isBanExpired || isWindowExpired) {
          memoryIpStore.delete(k);
        }
      }
    }
    record = { startTime: now, count: 1 };
    memoryIpStore.set(recordKey, record);
    return { allowed: true, remaining: maxLimit - 1, resetIn: 60 };
  }

  record.count++;
  const remaining = Math.max(0, maxLimit - record.count);
  const resetIn = Math.ceil((record.startTime + windowMs - now) / 1000);

  if (record.count > maxLimit) {
    // اعمال جریمه موقت
    memoryBlacklist.add(ip);
    memoryIpStore.set('ban:' + ip, {
      expiresAt: now + (RATE_LIMIT_CONFIG.banDurationSeconds * 1000),
      reason: 'rate_limit_exceeded'
    });
    return {
      allowed: false,
      remaining: 0,
      resetIn: RATE_LIMIT_CONFIG.banDurationSeconds,
      reason: 'Rate limit threshold exceeded'
    };
  }

  return { allowed: true, remaining, resetIn };
}

/**
 * پاکسازی دستی یا آزادسازی یک IP از لیست سیاه
 * @param {string} ip 
 */
export function unbanIp(ip) {
  memoryBlacklist.delete(ip);
  memoryIpStore.delete('ban:' + ip);
}
