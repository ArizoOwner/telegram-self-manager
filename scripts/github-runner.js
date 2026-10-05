/**
 * ⚡ Arizo Self — Ultra-Fast Sub-100ms Telegram Clock Engine (GitHub Actions)
 * 
 * ویژگی‌های کلیدی این نسخه:
 * ۱. استخر اتصالات زنده (Persistent Warm Connection Pool):
 *    سوکت‌های TCP و سشن‌های کلاینت در حافظه باز می‌مانند و هر دقیقه قطع نمی‌شوند.
 *    در نتیجه زمان آپدیت از ۵۰۰ میلی‌ثانیه به ۲۰ تا ۴۰ میلی‌ثانیه کاهش می‌یابد!
 * 
 * ۲. استراتژی پیش‌بارگذاری (Pre-fetch در ثانیه ۵۸):
 *    لیست کاربران و فرمت ساعت دقیقه بعد، ۲ ثانیه زودتر آماده می‌شود تا رأس ثانیه ۰۰.۰۰۰
 *    کوچک‌ترین تأخیر شبکه‌ای وجود نداشته باشد.
 * 
 * ۳. ارسال موازی (Parallel Execution):
 *    تمامی کاربران به صورت همزمان با Promise.allSettled آپدیت می‌شوند.
 * 
 * ۴. استمرار ۲۴ ساعته:
 *    قبل از اتمام سقف مجاز، به صورت خودکار رانر بعدی را در گیت‌هاب احضار می‌کند.
 */

import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { NewMessage, Raw } from 'telegram/events/index.js';
import { CustomFile } from 'telegram/client/uploads.js';
import { strippedPhotoToJpg } from 'telegram/Utils.js';
import { getStylizedTime, renderDynamicBio, isSleepTime } from '../src/clock.js';
import { decryptSession } from '../src/crypto.js';

const CLOUDFLARE_URL = (process.env.CLOUDFLARE_URL || 'https://arizo-self.arizosupport.workers.dev').replace(/\/+$/, '');
const RUNNER_SECRET = process.env.RUNNER_SECRET || process.env.ADMIN_PASSWORD || 'admin_liquid_secret_2026';
const API_ID = parseInt(process.env.API_ID || '2040');
const API_HASH = process.env.API_HASH || 'b18441a1ff607e10a989891a5462e627';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;

const MAX_RUN_MINUTES = parseInt(process.env.RUNNER_DURATION_MINUTES || '320');

if (!CLOUDFLARE_URL) {
  console.error('❌ Error: CLOUDFLARE_URL environment variable is required.');
  process.exit(1);
}

if (!RUNNER_SECRET) {
  console.error('❌ Error: RUNNER_SECRET or ADMIN_PASSWORD environment variable is required.');
  process.exit(1);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('⚡ Arizo Self — Ultra-Fast Sub-100ms Engine Started');
console.log(`🌐 Worker URL: ${CLOUDFLARE_URL}`);
console.log(`⏱️ Duration: ${MAX_RUN_MINUTES} minutes (~${(MAX_RUN_MINUTES / 60).toFixed(1)} hours)`);
console.log(`📱 Client App ID: ${API_ID} (Official Telegram Desktop)`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// مدیریت خطاهای سراسری جهت پایداری ۱۰۰٪ دیمن بدون کرش در افت موقت سوکت
process.on('unhandledRejection', (reason) => {
  console.warn('⚠️ [Process] Unhandled Rejection intercepted (non-fatal):', reason?.message || reason);
});

process.on('uncaughtException', (err) => {
  console.error('⚠️ [Process] Uncaught Exception intercepted (non-fatal):', err?.message || err);
});

/**
 * مدیریت حافظه رم در پردازش‌های مداوم ۲۴ ساعته (FIFO Bounding)
 */
function setBoundedMap(map, key, val, maxSize = 1000) {
  if (!map) return;
  map.set(key, val);
  if (map.size > maxSize) {
    const oldest = map.keys().next().value;
    if (oldest !== undefined) map.delete(oldest);
  }
}

function addToBoundedSet(set, item, maxSize = 1000) {
  if (!set) return;
  set.add(item);
  if (set.size > maxSize) {
    const oldest = set.values().next().value;
    if (oldest !== undefined) set.delete(oldest);
  }
}

/**
 * نرمال‌سازی و پاکسازی ورودی‌های لیست سکوت (حذف @، لینک‌های t.me، فاصله‌ها و تبدیل اعداد فارسی/عربی)
 */
function cleanMuteTarget(raw) {
  if (!raw) return '';
  let str = String(raw).trim().toLowerCase();
  str = str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  str = str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  str = str.replace(/^https?:\/\/(www\.)?t\.me\//i, '');
  str = str.replace(/^t\.me\//i, '');
  str = str.replace(/^tg:\/\/resolve\?domain=/i, '');
  str = str.replace(/^@+/, '');
  str = str.replace(/^id[:\s=]+/, '');
  return str.trim();
}

/**
 * بررسی دقیق وضعیت اتصال کلاینت در سوکت‌های GramJS
 */
function isClientConnected(entry) {
  if (!entry || !entry.client) return false;
  try {
    return Boolean(entry.connected || entry.client.connected || entry.client._sender?.connected);
  } catch (_) {
    return Boolean(entry.connected);
  }
}

/**
 * تبدیل خودکار یوزرنیم‌های اضافه شده در لیست سکوت به آیدی عددی تلگرام در پس‌زمینه
 */
function resolveMutedUsernames(entry) {
  if (!entry || !entry.client || !isClientConnected(entry)) return;
  const list = entry.settings?.mutedUsers;
  if (!Array.isArray(list) || list.length === 0) return;

  for (const raw of list) {
    const clean = cleanMuteTarget(raw);
    if (!clean) continue;
    // اگر آیدی عددی باشد، به لیست محلی اضافه می‌کنیم
    if (/^-?\d+$/.test(clean)) {
      if (entry.localMutedUsers) entry.localMutedUsers.add(clean);
      continue;
    }
    // اگر یوزرنیم باشد، هویت و AccessHash آن را فعالانه استعلام و در کش کلاینت ذخیره می‌کنیم
    entry.client.getEntity(clean).then(ent => {
      if (ent && ent.id) {
        const idStr = ent.id.toString();
        if (!entry.settings.mutedUsers.includes(idStr)) {
          entry.settings.mutedUsers.push(idStr);
          console.log(`🔇 [${clean}] Resolved muted username to Telegram ID: ${idStr}`);
        }
        if (entry.localMutedUsers) entry.localMutedUsers.add(idStr);
        // ذخیره قطعی در کش انتیتی و نشست حافظه جهت دسترسی فوری در پیام‌های دریافتی
        try {
          entry.client._entityCache.add(ent);
          entry.client.session.processEntities(ent);
        } catch (_) {}
      }
    }).catch(() => {});
  }
}

/**
 * حذف چندمرحله‌ای و تضمینی پیام از فرد بی‌صدا شده در تمام انواع چت‌ها (پیوی، سوپرگروه، کانال)
 */
async function deleteTelegramMessage(client, message, username = '') {
  const msgId = message.id;
  let deleted = false;
  const targetPeer = message.peerId || message.chatId || message.senderId;
  const isChannel = Boolean(message.isChannel || (message.peerId && (message.peerId.className === 'PeerChannel' || message.peerId instanceof Api.PeerChannel)));
  const isPrivate = Boolean(message.isPrivate || (message.peerId && (message.peerId.className === 'PeerUser' || message.peerId instanceof Api.PeerUser)) || (!isChannel && !message.isGroup));

  // ۱. حذف در کانال یا سوپرگروه (Supergroup / Channel) با channels.DeleteMessages
  if (isChannel && message.peerId) {
    try {
      const channelPeer = await client.getInputEntity(message.peerId).catch(() => message.peerId);
      await client.invoke(new Api.channels.DeleteMessages({
        channel: channelPeer,
        id: [msgId]
      }));
      deleted = true;
      console.log(`✅ [${username}] Muted message #${msgId} deleted via channels.DeleteMessages`);
    } catch (err1) {
      console.warn(`⚠️ [${username}] channels.DeleteMessages warning: ${err1.message}`);
    }
  }

  // ۲. روش مستقیم و قطعی RPC پیام‌ها (Api.messages.DeleteMessages با revoke: true)
  // این متد برای پیام‌های پیوی و گروه‌های عادی نیازی به InputPeer ندارد و مستقیماً دوطرفه حذف می‌شود
  try {
    await client.invoke(new Api.messages.DeleteMessages({
      id: [msgId],
      revoke: true
    }));
    deleted = true;
    console.log(`✅ [${username}] Muted message #${msgId} deleted via messages.DeleteMessages (revoke: true)`);
  } catch (err2) {
    console.warn(`⚠️ [${username}] messages.DeleteMessages warning: ${err2.message}`);
  }

  // ۳. در چت‌های خصوصی، اجرای همزمان DeleteHistory دوطرفه جهت تضمین ۱۰۰٪ محو شدن کامل پیام برای هر دو طرف
  if (isPrivate && targetPeer) {
    try {
      const inputPeer = await client.getInputEntity(targetPeer).catch(() => null);
      if (inputPeer) {
        await client.invoke(new Api.messages.DeleteHistory({
          peer: inputPeer,
          maxId: msgId,
          revoke: true,
          justClear: false
        }));
        deleted = true;
        console.log(`✅ [${username}] Muted message #${msgId} history revoked via messages.DeleteHistory`);
      }
    } catch (err3) {
      console.warn(`⚠️ [${username}] messages.DeleteHistory warning: ${err3.message}`);
    }
  }

  // ۴. روش رسمی GramJS deleteMessages (پشتیبان)
  if (!deleted && targetPeer) {
    try {
      await client.deleteMessages(targetPeer, [msgId], { revoke: true });
      deleted = true;
      console.log(`✅ [${username}] Muted message #${msgId} deleted via client.deleteMessages`);
    } catch (err4) {
      console.warn(`⚠️ [${username}] client.deleteMessages warning: ${err4.message}`);
    }
  }

  // ۵. روش شیء پیام (message.delete)
  if (!deleted) {
    try {
      await message.delete({ revoke: true });
      deleted = true;
      console.log(`✅ [${username}] Muted message #${msgId} deleted via message.delete`);
    } catch (err5) {
      console.warn(`⚠️ [${username}] message.delete warning: ${err5.message}`);
    }
  }

  return deleted;
}

/**
 * ارسال پیام متنی با فرمت HTML به ربات تلگرام اختصاصی کاربر (با پشتیبانی از کیبورد شیشه‌ای)
 */
async function sendBotTelegramMessage(token, chatId, text, replyMarkup = null) {
  if (!token || !chatId || !text) return false;
  try {
    const payload = {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    let res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.text();
      // در صورت خطای پارس تگ‌های HTML، ارسال مجدد به صورت متن ساده
      if (err.includes('entity') || err.includes('parse') || err.includes('can\'t parse')) {
        delete payload.parse_mode;
        payload.text = text.replace(/<[^>]*>/g, '');
        res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      if (!res.ok) {
        console.warn(`⚠️ [sendBotTelegramMessage] Telegram API non-200: ${err}`);
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error('❌ [sendBotTelegramMessage] Error:', err.message);
    return false;
  }
}

/**
 * ویرایش پیام متنی با فرمت HTML در ربات تلگرام اختصاصی کاربر (با کیبورد شیشه‌ای)
 */
async function editBotTelegramMessage(token, chatId, messageId, text, replyMarkup = null) {
  if (!token || !chatId || !messageId || !text) return false;
  try {
    const payload = {
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };
    if (replyMarkup) payload.reply_markup = replyMarkup;

    let res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.text();
      // در صورت عدم تغییر متن، موفق در نظر گرفته می‌شود
      if (err.includes('message is not modified')) return true;
      // در صورت خطای پارس تگ‌های HTML، ویرایش مجدد به صورت متن ساده
      if (err.includes('entity') || err.includes('parse') || err.includes('can\'t parse')) {
        delete payload.parse_mode;
        payload.text = text.replace(/<[^>]*>/g, '');
        res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) return true;
      }
      console.warn(`⚠️ [editBotTelegramMessage] Telegram API non-200: ${err}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('❌ [editBotTelegramMessage] Error:', err.message);
    return false;
  }
}

/**
 * ارسال چندلایه و تضمینی انواع رسانه (عکس، فیلم، صوت یا فایل) به ربات تلگرام اختصاصی کاربر
 */
async function sendBotTelegramMedia(token, chatId, buffer, fileName, caption, isPhoto, isVideo, isVoice, replyMarkup = null) {
  if (!token || !chatId || !buffer || buffer.length === 0) {
    return { ok: false, error: 'پارامترهای ارسالی یا بافر رسانه خالی است' };
  }

  let endpoint = 'sendDocument';
  let field = 'document';
  let mimeType = 'application/octet-stream';

  if (isPhoto) {
    endpoint = 'sendPhoto';
    field = 'photo';
    mimeType = 'image/jpeg';
  } else if (isVoice) {
    endpoint = 'sendVoice';
    field = 'voice';
    mimeType = 'audio/ogg';
  } else if (isVideo) {
    endpoint = 'sendVideo';
    field = 'video';
    mimeType = 'video/mp4';
  }

  try {
    // تلاش لایه ۱: ارسال بومی رسانه با فرمت‌بندی HTML
    const fd = new FormData();
    fd.append('chat_id', String(chatId));
    fd.append('caption', caption || '');
    fd.append('parse_mode', 'HTML');
    if (replyMarkup) fd.append('reply_markup', JSON.stringify(replyMarkup));
    fd.append(field, new Blob([buffer], { type: mimeType }), fileName || 'file.bin');

    const res = await fetch(`https://api.telegram.org/bot${token}/${endpoint}`, {
      method: 'POST',
      body: fd
    });

    if (res.ok) return { ok: true };

    const errTxt = await res.text().catch(() => '');
    console.warn(`⚠️ [sendBotTelegramMedia] Layer 1 ${endpoint} failed (${res.status}): ${errTxt}`);

    if (res.status === 403) {
      console.error(`🚫 [sendBotTelegramMedia] Bot was blocked/stopped by user ${chatId}!`);
      return { ok: false, isBlocked: true, error: errTxt };
    }

    // تلاش لایه ۲: اگر خطا به خاطر کدهای نامعتبر HTML در نام فرستنده بود، بدون parse_mode ارسال می‌کنیم
    if (res.status === 400 && (errTxt.includes('can\'t parse entities') || errTxt.includes('entity'))) {
      const plainCaption = String(caption || '').replace(/<[^>]*>/g, '');
      const fdPlain = new FormData();
      fdPlain.append('chat_id', String(chatId));
      fdPlain.append('caption', plainCaption);
      fdPlain.append(field, new Blob([buffer], { type: mimeType }), fileName || 'file.bin');

      const resPlain = await fetch(`https://api.telegram.org/bot${token}/${endpoint}`, {
        method: 'POST',
        body: fdPlain
      });
      if (resPlain.ok) return { ok: true };
    }

    // تلاش لایه ۳: در صورت عدم پذیرش ابعاد/کدک/فرمت تصویر، ارسال امن به صورت فایل سندی (sendDocument)
    if (endpoint !== 'sendDocument') {
      const fdDoc = new FormData();
      fdDoc.append('chat_id', String(chatId));
      fdDoc.append('caption', caption || '');
      fdDoc.append('parse_mode', 'HTML');
      fdDoc.append('document', new Blob([buffer], { type: 'application/octet-stream' }), fileName || 'file.bin');

      const resDoc = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
        method: 'POST',
        body: fdDoc
      });
      if (resDoc.ok) return { ok: true };

      // تلاش لایه ۴: سند با متن ساده بدون HTML
      const plainCaption = String(caption || '').replace(/<[^>]*>/g, '');
      const fdDocPlain = new FormData();
      fdDocPlain.append('chat_id', String(chatId));
      fdDocPlain.append('caption', plainCaption);
      fdDocPlain.append('document', new Blob([buffer], { type: 'application/octet-stream' }), fileName || 'file.bin');

      const resDocPlain = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
        method: 'POST',
        body: fdDocPlain
      });
      if (resDocPlain.ok) return { ok: true };
    }

    return { ok: false, error: errTxt };
  } catch (err) {
    console.error('❌ [sendBotTelegramMedia] Fatal error:', err.message);
    return { ok: false, error: err.message };
  }
}

/**
 * دانلود فوق‌پایدار و ۵ لایه انواع رسانه‌های تلگرام با استراتژی‌های جبران خطا و بازیابی
 */
async function downloadMediaSafely(client, message, username) {
  let buffer = null;

  // مرحله ۱: دانلود مستقیم از شیء پیام
  try {
    buffer = await client.downloadMedia(message);
    if (buffer && buffer.length > 0) return buffer;
  } catch (err1) {
    console.warn(`⚠️ [${username}] Layer 1 downloadMedia(message) failed: ${err1.message}`);
  }

  // مرحله ۲: دانلود مستقیم از آبجکت media
  if (message.media) {
    try {
      buffer = await client.downloadMedia(message.media);
      if (buffer && buffer.length > 0) return buffer;
    } catch (err2) {
      console.warn(`⚠️ [${username}] Layer 2 downloadMedia(message.media) failed: ${err2.message}`);
    }
  }

  // مرحله ۳: استعلام پیام تازه از سرور تلگرام با getMessages (جهت دریافت AccessHash و FileReference معتبر و تازه)
  try {
    const peer = message.peerId || message.chatId || message.senderId;
    if (peer && message.id) {
      const inputPeer = await client.getInputEntity(peer).catch(() => peer);
      const fullMsgs = await client.getMessages(inputPeer, { ids: [message.id] }).catch(() => []);
      if (fullMsgs && fullMsgs.length > 0 && fullMsgs[0]?.media) {
        buffer = await client.downloadMedia(fullMsgs[0]);
        if (buffer && buffer.length > 0) return buffer;
        buffer = await client.downloadMedia(fullMsgs[0].media);
        if (buffer && buffer.length > 0) return buffer;
      }
    }
  } catch (err3) {
    console.warn(`⚠️ [${username}] Layer 3 getMessages downloadMedia failed: ${err3.message}`);
  }

  // مرحله ۴: دانلود از اشیاء درونی photo یا document
  try {
    const innerTarget = message.media?.photo || message.media?.document || message.photo || message.document;
    if (innerTarget) {
      buffer = await client.downloadMedia(innerTarget);
      if (buffer && buffer.length > 0) return buffer;
    }
  } catch (err4) {
    console.warn(`⚠️ [${username}] Layer 4 innerTarget downloadMedia failed: ${err4.message}`);
  }

  // مرحله ۵: اگر تصویر بود و دانلود اندازه کامل شکست خورد، استخراج تصویر بندانگشتی (PhotoStrippedSize)
  try {
    const photo = message.media?.photo || message.photo;
    if (photo && Array.isArray(photo.sizes)) {
      const stripped = photo.sizes.find(s => s instanceof Api.PhotoStrippedSize || s.className === 'PhotoStrippedSize');
      if (stripped && stripped.bytes && stripped.bytes.length > 0) {
        const jpgBuf = strippedPhotoToJpg(stripped.bytes);
        if (jpgBuf && jpgBuf.length > 0) {
          console.log(`ℹ️ [${username}] Anti-TTL recovered photo from stripped thumbnail buffer (${jpgBuf.length} bytes).`);
          return jpgBuf;
        }
      }
    }
  } catch (err5) {
    console.warn(`⚠️ [${username}] Layer 5 stripped photo recovery failed: ${err5.message}`);
  }

  return null;
}

/**
 * ارسال تضمینی و چندلایه پیام منشی خودکار در پیوی
 */
async function sendAfkReply(entry, message, afkText, username, senderIdStr) {
  let sent = false;

  // ثبت پیش‌دستانه مشخصات پیام ربات در حافظه برای جلوگیری قطعی از خودسرکوب‌گری (Self-Suppression)
  entry.botSentTexts = entry.botSentTexts || new Set();
  addToBoundedSet(entry.botSentTexts, afkText.trim(), 500);
  entry.lastBotReplyMap = entry.lastBotReplyMap || new Map();
  const nowStamp = Date.now();
  if (senderIdStr) setBoundedMap(entry.lastBotReplyMap, senderIdStr, nowStamp, 500);
  const partnerId = getChatPartnerId(message, entry.myId);
  if (partnerId) setBoundedMap(entry.lastBotReplyMap, partnerId, nowStamp, 500);

  // دریافت تارگت معتبر با استفاده از sender یا getInputEntity
  let targetPeer = null;
  try {
    const sender = await message.getSender().catch(() => null);
    if (sender) targetPeer = sender;
  } catch (_) {}

  if (!targetPeer && message.peerId) {
    try {
      targetPeer = await entry.client.getInputEntity(message.peerId).catch(() => message.peerId);
    } catch (_) {
      targetPeer = message.peerId;
    }
  }

  // تلاش ۱: ارسال با replyTo به پیام فرستنده
  if (targetPeer) {
    try {
      const res = await entry.client.sendMessage(targetPeer, {
        message: afkText,
        replyTo: message.id
      });
      if (res?.id && entry.botSentMessageIds) {
        addToBoundedSet(entry.botSentMessageIds, res.id, 1000);
      }
      sent = true;
      console.log(`✅ [${username}] AFK reply sent to ${senderIdStr} (with replyTo)`);
    } catch (err1) {
      console.warn(`⚠️ [${username}] AFK reply with replyTo failed: ${err1.message}`);
    }
  }

  // تلاش ۲: ارسال مستقیم به چت فرستنده بدون replyTo
  if (!sent && targetPeer) {
    try {
      const res = await entry.client.sendMessage(targetPeer, {
        message: afkText
      });
      if (res?.id && entry.botSentMessageIds) {
        addToBoundedSet(entry.botSentMessageIds, res.id, 1000);
      }
      sent = true;
      console.log(`✅ [${username}] AFK reply sent to ${senderIdStr} (direct)`);
    } catch (err2) {
      console.warn(`⚠️ [${username}] AFK direct sendMessage failed: ${err2.message}`);
    }
  }

  // تلاش ۳: متد مستقیم پیام (message.reply)
  if (!sent) {
    try {
      const res = await message.reply({ message: afkText });
      if (res?.id && entry.botSentMessageIds) {
        addToBoundedSet(entry.botSentMessageIds, res.id, 1000);
      }
      sent = true;
      console.log(`✅ [${username}] AFK reply sent via message.reply`);
    } catch (err3) {
      console.warn(`⚠️ [${username}] AFK message.reply failed: ${err3.message}`);
    }
  }

  // تلاش ۴: متد خام MTProto Api.messages.SendMessage
  if (!sent) {
    try {
      const inputPeer = await entry.client.getInputEntity(message.peerId || message.chatId);
      await entry.client.invoke(new Api.messages.SendMessage({
        peer: inputPeer,
        message: afkText,
        randomId: BigInt(Math.floor(Math.random() * 1e16))
      }));
      sent = true;
      console.log(`✅ [${username}] AFK reply sent via Api.messages.SendMessage (raw RPC)`);
    } catch (err4) {
      console.error(`❌ [${username}] All AFK reply methods failed for ${senderIdStr}: ${err4.message}`);
    }
  }

  return sent;
}

/**
 * فراخوانی API هوش مصنوعی برای تولید پاسخ هوشمند (Gemini / OpenAI)
 * @param {string} provider - 'gemini' یا 'openai' یا 'custom'
 * @param {string} apiKey - کلید API کاربر
 * @param {string} systemPrompt - دستورالعمل شخصیت AI
 * @param {string} context - اطلاعات پایه درباره کاربر
 * @param {string} userMessage - پیام دریافتی مخاطب
 * @returns {Promise<string|null>}
 */
async function callAIApi(provider, apiKey, systemPrompt, context, userMessage) {
  if (!apiKey || !userMessage) return null;

  const defaultSystemPrompt = `You are a smart AI personal assistant replying on behalf of the account owner who is currently offline.
قوانین و دستورالعمل‌ها:
۱. تشخیص و تطبیق خودکار زبان: زبان پاسخ باید دقیقاً هماهنگ با زبان پیام مخاطب باشد. اگر مخاطب به زبان انگلیسی (English) پیام داده است، پاسخ را کاملاً به زبان روان انگلیسی بنویس. اگر به زبان فارسی پیام داده به فارسی پاسخ بده. برای هر زبان دیگر به همان زبان پیام بده.
۲. لحن و ساختار: پاسخ کوتاه (حداکثر ۲ تا ۳ جمله)، مودبانه، طبیعی و صمیمی باشد.
۳. وضعیت مالک: حتماً قید کن که مالک حساب در حال حاضر آفلاین است و به محض آنلاین شدن پیام را بررسی و پاسخ خواهد داد.
۴. محرمانگی: از اطلاعات خصوصی یا محرمانه صحبت نکن و وعده نامعتبر نده.`;

  const fullSystemPrompt = [
    systemPrompt || defaultSystemPrompt,
    context ? `\nاطلاعات پایه درباره مالک حساب (User Context):\n${context}` : '',
    '\nدستور قطعی زبان: زبان پاسخ باید دقیقاً بر اساس زبان پیام دریافتی باشد (اگر انگلیسی است حتماً به انگلیسی، اگر فارسی است به فارسی). پاسخ کوتاه حداکثر ۳ جمله باشد و اشاره کن مالک حساب آفلاین است.'
  ].filter(Boolean).join('\n');

  try {
    if (provider === 'gemini') {
      const geminiModels = [
        'gemini-3.5-flash-lite',
        'gemini-3.5-flash',
        'gemini-3.8-flash',
        'gemini-3.7-flash',
        'gemini-3.1-flash-lite',
        'gemini-flash-lite-latest',
        'gemini-flash-latest'
      ];

      for (const model of geminiModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(9000),
            body: JSON.stringify({
              system_instruction: { parts: [{ text: fullSystemPrompt }] },
              contents: [{ parts: [{ text: userMessage }] }],
              generationConfig: {
                maxOutputTokens: 250,
                temperature: 0.7,
                topP: 0.9
              }
            })
          });

          if (res.ok) {
            const data = await res.json();
            const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply && reply.trim()) {
              return reply.trim().slice(0, 500);
            }
          } else {
            const errTxt = await res.text().catch(() => '');
            console.warn(`⚠️ [AI-Gemini] Model ${model} returned ${res.status}: ${errTxt.slice(0, 100)}`);
          }
        } catch (mErr) {
          console.warn(`⚠️ [AI-Gemini] Model ${model} error: ${mErr.message}`);
        }
      }

      console.warn('⚠️ [AI-Gemini] All Gemini fallback models failed or timed out');
      return null;

    } else if (provider === 'openai') {
      const url = 'https://api.openai.com/v1/chat/completions';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: fullSystemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 250,
          temperature: 0.7
        })
      }).catch(() => null);

      if (!res || !res.ok) {
        const errText = res ? await res.text().catch(() => '') : 'اتصال ناموفق';
        const safeErr = String(errText || '').replaceAll(apiKey, '[REDACTED_KEY]');
        console.warn(`⚠️ [AI-OpenAI] API error: ${safeErr.slice(0, 150)}`);
        return null;
      }
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      return reply ? reply.trim().slice(0, 500) : null;

    } else {
      console.warn('⚠️ [AI] Provider not supported:', provider);
      return null;
    }
  } catch (err) {
    console.error(`❌ [AI-${provider}] API call failed:`, err.message);
    return null;
  }
}

const ONLINE_GRACE_PERIOD_MS = 5 * 60 * 1000; // ۵ دقیقه فرجه هوشمند برای جلوگیری از پاسخ ناخواسته هنگام آنلاین بودن

/**
 * بررسی دقیق، هوشمند و چندلایه‌ای آنلاین بودن اکانت در تلگرام
 * شامل سنجش اتصال بلادرنگ گوشی، تلگرام دسکتاپ و نشست‌های فعال (Authorizations)
 */
async function checkIsSelfOnline(entry, username) {
  const now = Date.now();

  // ۱. بررسی فلگ فعال آنلاین بودن
  if (entry.isSelfOnline && entry.selfOnlineExpires > now) {
    return true;
  }

  // ۲. بررسی فرجه زمانی از آخرین آنلاین بودن یا آخرین فعالیت ثبت شده (پیام، خواندن چت، پیش‌نویس)
  const lastActivity = Math.max(
    entry.lastSelfOnlineTime || 0,
    entry.lastGlobalOutTime || 0,
    entry.lastGlobalReadTime || 0,
    entry.lastDraftTime || 0
  );
  if (lastActivity > 0 && (now - lastActivity < ONLINE_GRACE_PERIOD_MS)) {
    return true;
  }

  // ۳. کش هوشمند استعلام RPC برای جلوگیری از فلود استعلام به سرور تلگرام (حداکثر ۱ بار در هر ۲۵ ثانیه)
  if (now - (entry.lastSelfStatusCheck || 0) < 25000) {
    return Boolean(
      (entry.isSelfOnline && entry.selfOnlineExpires > now) ||
      (lastActivity > 0 && (now - lastActivity < ONLINE_GRACE_PERIOD_MS))
    );
  }
  entry.lastSelfStatusCheck = now;

  try {
    if (!isClientConnected(entry)) return false;

    // الف) 📱 بررسی نشست‌های فعال اکانت (Api.account.GetAuthorizations)
    // این روش مستقیم سرور تلگرام است و حتی اگر وضعیت آنلاین در تنظیمات حریم خصوصی (Privacy)
    // روی Nobody یا Contacts باشد، فعالیت زنده گوشی و دسکتاپ را دقیقاً نشان می‌دهد.
    try {
      const auths = await entry.client.invoke(new Api.account.GetAuthorizations());
      const nowSec = Math.floor(now / 1000);
      if (auths?.authorizations && Array.isArray(auths.authorizations)) {
        for (const a of auths.authorizations) {
          if (a.current) continue; // رانر خودکار فعلی را فیلتر می‌کنیم تا فقط دستگاه‌های واقعی سنجیده شوند
          const dateActive = a.dateActive || 0;
          // اگر در ۴ دقیقه گذشته (۲۴۰ ثانیه) ارتباطی از گوشی یا دسکتاپ کاربر ثبت شده باشد، کاربر قطعاً آنلاین است
          if (dateActive > 0 && (nowSec - dateActive < 240)) {
            entry.isSelfOnline = true;
            entry.selfOnlineExpires = now + 180000;
            entry.lastSelfOnlineTime = now;
            console.log(`📱 [${username}] Active Telegram device detected (${nowSec - dateActive}s ago: ${a.deviceModel || a.platform || 'Device'}). User is ONLINE.`);
            return true;
          }
        }
      }
    } catch (authErr) {
      // در صورت بروز خطا به روش بعدی مراجعه می‌شود
    }

    // ب) 🌐 استعلام وضعیت کاربر از سرور تلگرام (Api.users.GetUsers)
    const users = await entry.client.invoke(new Api.users.GetUsers({
      id: [new Api.InputUserSelf()]
    }));
    const selfUser = users?.[0];
    if (selfUser?.status) {
      const st = selfUser.status;
      const isOnline = st instanceof Api.UserStatusOnline || st?.className === 'UserStatusOnline';
      if (isOnline) {
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = st.expires ? (st.expires * 1000) : (now + 180000);
        entry.lastSelfOnlineTime = now;
        return true;
      } else if (st instanceof Api.UserStatusOffline || st?.className === 'UserStatusOffline') {
        const wasSec = st.wasOnline || 0;
        const wasMs = wasSec ? (wasSec * 1000) : 0;
        if (wasMs > 0) {
          entry.lastSelfOnlineTime = Math.max(entry.lastSelfOnlineTime || 0, wasMs);
          if (now - wasMs < ONLINE_GRACE_PERIOD_MS) {
            entry.isSelfOnline = true;
            entry.selfOnlineExpires = wasMs + ONLINE_GRACE_PERIOD_MS;
            return true;
          }
        }
      }
      // نکته بسیار مهم: اگر وضعیت UserStatusRecently یا UserStatusLastWeek باشد،
      // نباید isSelfOnline را اجباراً false کنیم، چون تنظیمات حریم خصوصی (Privacy) آن را مخفی کرده است.
    }
  } catch (err) {
    // در صورت بروز خطا به کش متکی می‌مانیم
  }

  const latestAct = Math.max(
    entry.lastSelfOnlineTime || 0,
    entry.lastGlobalOutTime || 0,
    entry.lastGlobalReadTime || 0,
    entry.lastDraftTime || 0
  );
  return Boolean(
    (entry.isSelfOnline && entry.selfOnlineExpires > now) ||
    (latestAct > 0 && (now - latestAct < ONLINE_GRACE_PERIOD_MS))
  );
}

/**
 * تشخیص هوشمند چندلایه‌ای برای جلوگیری قطعی از ارسال منشی خودکار یا هوش مصنوعی در حین آنلاین بودن یا چت فعال کاربر
 */
async function isUserActiveOrOnline(entry, username, senderIdStr, message) {
  const now = Date.now();
  const aiCooldown = entry.settings?.aiCooldown ?? 5;
  const isZeroCooldown = aiCooldown === 0;

  // ۱. بررسی چت دوطرفه فعال کاربر با این مخاطب خاص
  // فرجه گفتگوی فعال: ۱۰ دقیقه کامل (یا حداقل ۳ دقیقه در حالت تست بدون کول‌داون)
  // تا اگر کاربر در حال گفتگو با فرد است و چند دقیقه پیام نداده، منشی هرگز نپرد وسط مکالمه!
  const activeChatWindow = isZeroCooldown ? 3 * 60 * 1000 : 10 * 60 * 1000;
  const lastChatOut = entry.lastChatOutMap?.get(senderIdStr) || 0;
  const diffChat = now - lastChatOut;
  if (lastChatOut > 0 && diffChat < activeChatWindow) {
    const passedMin = Math.round(diffChat / 60000);
    const remainMin = Math.round((activeChatWindow - diffChat) / 60000);
    return {
      isBusyOrOnline: true,
      reason: `شما در حال گفتگو با این مخاطب هستید (${passedMin} دقیقه پیش پیام دستی فرستاده‌اید — فرجه گفتگوی فعال: ${remainMin} دقیقه)`
    };
  }

  // ۲. بررسی پیش‌نویس (Draft) یا در حال تایپ بودن کاربر در چت با این مخاطب
  const lastDraft = entry.lastChatDraftMap?.get(senderIdStr) || 0;
  if (lastDraft > 0 && (now - lastDraft < 5 * 60 * 1000)) {
    return {
      isBusyOrOnline: true,
      reason: 'شما در حال نوشتن پیام یا ذخیره پیش‌نویس (Draft) برای این مخاطب هستید'
    };
  }

  // ۳. بررسی خواندن پیام‌های این چت در تلگرام (باز بودن صفحه چت توسط کاربر در هر دستگاه)
  const readWindow = isZeroCooldown ? 60 * 1000 : 5 * 60 * 1000;
  const lastChatRead = entry.lastChatReadTimeMap?.get(senderIdStr) || 0;
  const diffRead = now - lastChatRead;
  if (lastChatRead > 0 && diffRead < readWindow) {
    const passedSec = Math.round(diffRead / 1000);
    return {
      isBusyOrOnline: true,
      reason: `صفحه چت با این مخاطب در تلگرام شما باز شده و ${passedSec} ثانیه پیش پیام‌ها خوانده شده‌اند`
    };
  }

  // ۴. بررسی فعالیت عمومی اخیر در تلگرام (ارسال پیام دستی در سایر چت‌ها، گروه‌ها، کانال‌ها)
  const globalWindow = isZeroCooldown ? 60 * 1000 : 5 * 60 * 1000;
  const lastGlobalOut = entry.lastGlobalOutTime || 0;
  const diffGlobal = now - lastGlobalOut;
  if (lastGlobalOut > 0 && diffGlobal < globalWindow) {
    const passedSec = Math.round(diffGlobal / 1000);
    const remainSec = Math.round((globalWindow - diffGlobal) / 1000);
    return {
      isBusyOrOnline: true,
      reason: `شما در تلگرام به دیگران پیام ارسال کرده‌اید و آنلاین هستید (${passedSec} ثانیه پیش — فرجه: ${remainSec} ثانیه)`
    };
  }

  // ۵. بررسی خواندن پیام‌ها یا کانال‌ها به صورت عمومی در تلگرام
  const lastGlobalRead = entry.lastGlobalReadTime || 0;
  if (lastGlobalRead > 0 && (now - lastGlobalRead < 3 * 60 * 1000)) {
    return {
      isBusyOrOnline: true,
      reason: 'شما اخیراً در تلگرام در حال مشاهده پیام‌ها یا کانال‌ها بوده‌اید'
    };
  }

  // ۶. بررسی دقیق و قطعی وضعیت آنلاین بودن اکانت در سرورهای تلگرام و نشست‌های فعال گوشی/دسکتاپ
  if (entry.settings?.aiReplyEnabled || entry.settings?.afkEnabled) {
    const isOnline = await checkIsSelfOnline(entry, username);
    if (isOnline) {
      return {
        isBusyOrOnline: true,
        reason: 'اکانت تلگرام شما آنلاین (Online) است یا نشست فعال روی گوشی/سیستم دارید'
      };
    }
  }

  return { isBusyOrOnline: false, reason: null };
}

/**
 * فوروارد پیام ورودی پیوی به ربات اختصاصی کاربر در حالت شبح (Ghost Mode)
 */
async function forwardGhostMessage(botToken, chatId, senderName, senderUsername, senderIdStr, messageText, hasMedia, mediaType, accessHash = null) {
  if (!botToken || !chatId) return false;
  const senderUserStr = senderUsername ? ` (@${senderUsername})` : '';
  const cleanSender = String(senderName).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cleanText = String(messageText || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeHash = accessHash && accessHash !== '0' ? accessHash : '0';

  const mediaLabel = hasMedia ? `\n📎 <b>نوع رسانه:</b> <code>${mediaType || 'فایل'}</code>` : '';
  const text = `👻 <b>[پیام جدید در حالت شبح — Ghost Mode]</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 <b>فرستنده:</b> ${cleanSender}${senderUserStr} (<code>${senderIdStr}</code>)\n` +
    `🕒 <b>زمان:</b> <code>${new Date().toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran' })}</code>\n` +
    `${mediaLabel}\n` +
    `📝 <b>متن پیام:</b>\n<blockquote>${cleanText || '<i>(پیام فاقد متن)</i>'}</blockquote>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `💡 <i>برای ارسال پاسخ مستقیم از اکانت خود یا ثبت تیک آبی، دکمه‌های زیر را انتخاب کنید:</i>`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${senderIdStr}:${safeHash}`, style: 'primary' },
        { text: '👁️ ثبت تیک آبی', callback_data: `ghost_read:${senderIdStr}:${safeHash}`, style: 'success' }
      ],
      [
        { text: '👻 مشاهده کامل چت (شبح)', callback_data: `ghost_view:${senderIdStr}:${safeHash}`, style: 'primary' },
        { text: '📋 لیست چت‌ها', callback_data: 'ghost_chats', style: 'danger' }
      ]
    ]
  };

  return sendBotTelegramMessage(botToken, chatId, text, keyboard);
}

/**
 * تشخیص دقیق شناسه عددی مخاطب گفتگو (تفکیک دقیق فرستنده و گیرنده بر اساس جهت پیام)
 */
function getChatPartnerId(message, myId) {
  if (!message) return null;
  const myIdStr = myId ? myId.toString() : null;

  if (message.out) {
    // پیام خروجی است: مخاطب در peerId یا chatId قرار دارد (نه senderId که خودمان هستیم)
    const pUserId = message.peerId?.userId ? message.peerId.userId.toString() : null;
    if (pUserId && pUserId !== myIdStr) return pUserId;
    if (message.chatId) {
      const c = message.chatId.toString();
      if (c !== myIdStr) return c;
    }
    const pId = message.peerId ? (message.peerId.chatId || message.peerId.channelId)?.toString() : null;
    if (pId && pId !== myIdStr) return pId;
  } else {
    // پیام ورودی است: فرستنده در senderId یا fromId قرار دارد
    if (message.senderId) {
      const s = message.senderId.toString();
      if (s !== myIdStr) return s;
    }
    if (message.fromId?.userId) {
      const f = message.fromId.userId.toString();
      if (f !== myIdStr) return f;
    }
    if (message.peerId?.userId) {
      const p = message.peerId.userId.toString();
      if (p !== myIdStr) return p;
    }
    if (message.chatId) {
      const c = message.chatId.toString();
      if (c !== myIdStr) return c;
    }
  }
  return null;
}

/**
 * مدیریت استخر کلاینت‌های زنده تلگرام (Persistent Connection Pool)
 */
class TelegramConnectionPool {
  constructor() {
    this.clients = new Map(); // username -> { client, sessionEncrypted, lastTime, connected }
  }

  async getOrCreateClient(username, sessionEncrypted, userSettings = null) {
    let entry = this.clients.get(username);

    // اگر کاربر قبلاً بوده اما سشن تغییر کرده است، اتصال قبلی را می‌بندیم
    if (entry && entry.sessionEncrypted !== sessionEncrypted) {
      console.log(`🔄 Session changed for [${username}]. Recreating client...`);
      try { await entry.client.disconnect(); } catch (_) {}
      this.clients.delete(username);
      entry = null;
    }

    if (!entry) {
      const sessionStr = await decryptSession(sessionEncrypted, API_HASH);
      if (!sessionStr) throw new Error('رمزگشایی نشست تلگرام ناموفق بود.');

      const client = new TelegramClient(
        new StringSession(sessionStr),
        API_ID,
        API_HASH,
        {
          connectionRetries: 3,
          timeout: 10000,
          useWSS: false,
          autoReconnect: true,
          floodSleepThreshold: 0,
          deviceModel: 'Telegram Desktop',
          systemVersion: 'Windows 11',
          appVersion: '5.4.1'
        }
      );

      console.log(`🔌 Connecting warm socket for [${username}]...`);
      await client.connect();
      console.log(`✅ Warm socket connected for [${username}]!`);

      // ۱. ثبت رسمی نشست در تلگرام جهت اشتراک دائمی در دریافت بلادرنگ Push Updates
      try {
        await client.invoke(new Api.updates.GetState());
        console.log(`📡 [${username}] Updates.GetState subscribed successfully.`);
      } catch (stateErr) {
        console.warn(`⚠️ [${username}] Updates.GetState warning:`, stateErr.message);
      }

      entry = {
        client,
        sessionEncrypted,
        lastTime: null,
        connected: true,
        peerCache: new Map(),
        lastGlobalOutTime: 0,
        lastGlobalReadTime: 0,
        lastDraftTime: 0,
        lastChatOutMap: new Map(),
        lastChatReadTimeMap: new Map(),
        lastChatDraftMap: new Map(),
        pendingAiReplies: new Map(),
        isSelfOnline: false,
        selfOnlineExpires: 0,
        lastSelfOnlineTime: 0,
        lastSelfStatusCheck: 0,
        settings: {
          afkEnabled: !!userSettings?.afkEnabled,
          afkMessage: userSettings?.afkMessage || '',
          afkCooldown: userSettings?.afkCooldown ?? 10,
          muteEnabled: !!userSettings?.muteEnabled,
          mutedUsers: Array.isArray(userSettings?.mutedUsers) ? userSettings.mutedUsers : [],
          antiTtlEnabled: !!userSettings?.antiTtlEnabled,
          bot: userSettings?.bot || null,
          ghostMode: !!userSettings?.ghostMode,
          ghostExcludeList: Array.isArray(userSettings?.ghostExcludeList) ? userSettings.ghostExcludeList : [],
          aiReplyEnabled: !!userSettings?.aiReplyEnabled,
          aiProvider: userSettings?.aiProvider || 'gemini',
          aiApiKey: userSettings?.aiApiKey || '',
          aiSystemPrompt: userSettings?.aiSystemPrompt || '',
          aiContext: userSettings?.aiContext || '',
          aiMaxReplies: userSettings?.aiMaxReplies ?? 3,
          aiCooldown: userSettings?.aiCooldown ?? 5
        },
        afkCooldownMap: new Map(),
        aiReplyCountMap: new Map(),
        aiCooldownMap: new Map(),
        localMutedUsers: new Set(),
        recentMessagesCache: new Map(),
        selfbotDeletedIds: new Set(),
        botSentMessageIds: new Set(),
        myId: null,
        hasListeners: false
      };
      this.clients.set(username, entry);

      // ۲. بارگذاری اولیه دیالوگ‌ها با RPC خالص جهت پر کردن قطعی EntityCache و همگام‌سازی چت‌های خصوصی
      fetchUserPrivateDialogs(client, entry).then(privateDlgs => {
        if (privateDlgs.length > 0) {
          syncDialogsToCloudflare(username, privateDlgs);
          console.log(`💬 [${username}] Initial sync: ${privateDlgs.length} private dialogs pushed to Cloudflare.`);
        }
      }).catch(dlgErr => {
        console.warn(`⚠️ [${username}] Initial dialogs priming warning:`, dlgErr.message);
      });

      // دریافت فوری شناسه کاربری و وضعیت آنلاین اولیه
      try {
        const me = await client.getMe();
        if (me && me.id) {
          entry.myId = me.id.toString();
          syncOwnerTgIdToCloudflare(username, entry.myId);
          const now = Date.now();
          if (me.status instanceof Api.UserStatusOnline || me.status?.className === 'UserStatusOnline') {
            entry.isSelfOnline = true;
            entry.selfOnlineExpires = me.status.expires ? (me.status.expires * 1000) : (now + 180000);
            entry.lastSelfOnlineTime = now;
          } else if (me.status instanceof Api.UserStatusOffline || me.status?.className === 'UserStatusOffline') {
            const wasSec = me.status.wasOnline;
            if (wasSec) {
              const wasMs = wasSec * 1000;
              entry.lastSelfOnlineTime = wasMs;
              if (now - wasMs < 120000) {
                entry.isSelfOnline = true;
                entry.selfOnlineExpires = wasMs + 120000;
              }
            }
          }
        }
      } catch (_) {}

      // اتصال رویدادهای زنده سلف‌بات (AFK, Mute, Anti-TTL, Anti-Delete, Anti-Edit)
      this.attachEventListeners(entry, username);
    } else if (!isClientConnected(entry)) {
      console.log(`🔌 Reconnecting dropped socket for [${username}]...`);
      await entry.client.connect();
      entry.connected = true;
      try {
        await entry.client.invoke(new Api.updates.GetState());
        if (!entry.myId) {
          const me = await entry.client.getMe();
          if (me && me.id) {
            entry.myId = me.id.toString();
            syncOwnerTgIdToCloudflare(username, entry.myId);
          }
        }
      } catch (_) {}
      this.attachEventListeners(entry, username);
    }

    // به‌روزرسانی تنظیمات هوشمند در حافظه و ادغام لیست سکوت
    if (userSettings && entry) {
      const serverMuted = Array.isArray(userSettings.mutedUsers) ? userSettings.mutedUsers : [];
      entry.localMutedUsers = new Set(serverMuted.map(cleanMuteTarget).filter(Boolean));

      entry.settings = {
        afkEnabled: !!userSettings.afkEnabled,
        afkMessage: userSettings.afkMessage || '',
        afkCooldown: userSettings.afkCooldown ?? 10,
        muteEnabled: !!userSettings.muteEnabled || serverMuted.length > 0,
        mutedUsers: serverMuted,
        antiTtlEnabled: !!userSettings.antiTtlEnabled,
        bot: userSettings.bot || null,
        // 👻 Ghost Mode
        ghostMode: !!userSettings.ghostMode,
        ghostExcludeList: Array.isArray(userSettings.ghostExcludeList) ? userSettings.ghostExcludeList : [],
        // 🤖 AI Smart Reply
        aiReplyEnabled: !!userSettings.aiReplyEnabled,
        aiProvider: userSettings.aiProvider || 'gemini',
        aiApiKey: userSettings.aiApiKey || '',
        aiSystemPrompt: userSettings.aiSystemPrompt || '',
        aiContext: userSettings.aiContext || '',
        aiMaxReplies: userSettings.aiMaxReplies ?? 3,
        aiCooldown: userSettings.aiCooldown ?? 5
      };
      resolveMutedUsernames(entry);
    }

    return entry.client;
  }

  attachEventListeners(entry, username) {
    if (entry.hasListeners) return;
    entry.hasListeners = true;

    // ۱. رویداد پیام‌های جدید (AFK, Mute, Anti-TTL)
    entry.client.addEventHandler(async (event) => {
      try {
        await this.handleIncomingMessage(entry, username, event);
      } catch (err) {
        console.error(`⚠️ [${username}] Message event handler error:`, err.message);
      }
    }, new NewMessage({}));

    // ۲. رویدادهای خام MTProto برای ضد حذف و ضد ویرایش پیام (Anti-Delete & Anti-Edit)
    entry.client.addEventHandler(async (update) => {
      try {
        await this.handleRawUpdate(entry, username, update);
      } catch (err) {
        console.error(`⚠️ [${username}] Raw update handler error:`, err.message);
      }
    }, new Raw({}));

    console.log(`🛡️ [${username}] Event listeners attached (AFK, Mute, Anti-TTL, Anti-Delete, Anti-Edit active)!`);
    resolveMutedUsernames(entry);
  }

  async handleIncomingMessage(entry, username, event) {
    const message = event.message;
    if (!message) return;

    // ۱. تزریق بلادرنگ کلیه انتیتی‌های پیوست‌شده در آپدیت دریافتی به کش حافظه
    if (event.originalUpdate?.users?.length) {
      try {
        entry.client._entityCache.add(event.originalUpdate);
        entry.client.session.processEntities(event.originalUpdate);
      } catch (_) {}
    }
    if (event.originalUpdate?._entities?.size) {
      for (const ent of event.originalUpdate._entities.values()) {
        try {
          entry.client._entityCache.add(ent);
          entry.client.session.processEntities(ent);
        } catch (_) {}
      }
    }
    if (event._entities?.size) {
      for (const ent of event._entities.values()) {
        try {
          entry.client._entityCache.add(ent);
          entry.client.session.processEntities(ent);
        } catch (_) {}
      }
    }

    if (!entry.myId && isClientConnected(entry)) {
      try {
        const me = await entry.client.getMe();
        if (me && me.id) entry.myId = me.id.toString();
      } catch (_) {}
    }

    const myId = entry.myId;
    const isOut = Boolean(message.out || (myId && message.senderId && message.senderId.toString() === myId));
    const isStrictGroupOrChannel = Boolean(
      message.isGroup || 
      message.isChannel || 
      (message.peerId instanceof Api.PeerChannel) || 
      (message.peerId instanceof Api.PeerChat) ||
      (message.chatId && !message.isPrivate && !(message.peerId instanceof Api.PeerUser))
    );
    const isPrivateChat = Boolean(
      (message.isPrivate || (message.peerId instanceof Api.PeerUser)) && 
      !isStrictGroupOrChannel
    );

    // ۲. شناسایی دقیق مخاطب چت و ثبت زنده فعالیت کاربر در صورت ارسال پیام دستی
    const partnerIdStr = getChatPartnerId(message, myId);
    const peerIdStr = partnerIdStr || (message.senderId ? message.senderId.toString() : null) || (message.chatId ? message.chatId.toString() : null);

    // ثبت زنده فعالیت کاربر در تلگرام و در این چت در صورت ارسال پیام خروجی دستی توسط کاربر
    if (isOut) {
      const msgText = (message.text || message.message || '').trim();
      const now = Date.now();
      const isBotMsg = (entry.botSentMessageIds && entry.botSentMessageIds.has(message.id)) ||
                       (entry.botSentTexts && entry.botSentTexts.has(msgText)) ||
                       msgText.startsWith('🤖 ') ||
                       (now - (entry.lastBotReplyMap?.get(partnerIdStr || '') || 0) < 6000) ||
                       (now - (entry.lastBotReplyMap?.get(peerIdStr || '') || 0) < 6000);

      if (isBotMsg) {
        if (entry.botSentMessageIds) entry.botSentMessageIds.delete(message.id);
        if (entry.botSentTexts) entry.botSentTexts.delete(msgText);
      } else {
        entry.lastGlobalOutTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
        if (partnerIdStr) {
          entry.lastChatOutMap = entry.lastChatOutMap || new Map();
          setBoundedMap(entry.lastChatOutMap, partnerIdStr, now, 500);
          // ریست شدن سقف پاسخ‌های هوش مصنوعی وقتی کاربر خودش به مخاطب پیام دستی می‌دهد
          if (entry.aiReplyCountMap) entry.aiReplyCountMap.delete(partnerIdStr);
          if (entry.afkCooldownMap) entry.afkCooldownMap.delete(partnerIdStr);
          // لغو هرگونه پاسخ معلق در صف هوش مصنوعی برای این مخاطب
          if (entry.pendingAiReplies?.has(partnerIdStr)) {
            clearTimeout(entry.pendingAiReplies.get(partnerIdStr).timeoutId);
            entry.pendingAiReplies.delete(partnerIdStr);
            console.log(`🚫 [${username}] Cancelled pending AI reply for ${partnerIdStr}: user manually sent message`);
          }
          console.log(`💬 [${username}] Active chat: user manually sent message to partner ${partnerIdStr} (AI count reset)`);
        }
      }
    }

    let isPeerCached = false;
    if (peerIdStr) {
      try {
        if (entry.client._entityCache.get(peerIdStr)) isPeerCached = true;
      } catch (_) {}
    }

    // اگر مخاطب در کش موجود نیست و چت جدید است، بلافاصله دیالوگ‌ها و پیام را از سرور تلگرام واکشی می‌کنیم
    if (!isPeerCached && peerIdStr && isPrivateChat && !isOut) {
      console.log(`🔍 [${username}] New/unknown peer detected (${peerIdStr}). Ingesting dialogs & message entity...`);
      try {
        const dialogs = await entry.client.getDialogs({ limit: 10 });
        for (const d of dialogs) {
          if (d.entity) {
            try {
              entry.client._entityCache.add(d.entity);
              entry.client.session.processEntities(d.entity);
            } catch (_) {}
          }
        }
      } catch (dlgErr) {
        console.warn(`⚠️ [${username}] Auto-resolving new dialog failed:`, dlgErr.message);
      }

      // واکشی مستقیم انتیتی فرستنده پیام با messages.GetMessages جهت ثبت قطعی AccessHash
      try {
        const fullMsgRes = await entry.client.invoke(new Api.messages.GetMessages({
          id: [new Api.InputMessageID({ id: message.id })]
        }));
        if (fullMsgRes?.users) {
          for (const u of fullMsgRes.users) {
            try {
              entry.client._entityCache.add(u);
              entry.client.session.processEntities(u);
            } catch (_) {}
          }
        }
      } catch (_) {}

      if (typeof message._finishInit === 'function') {
        try {
          message._finishInit(entry.client, event.originalUpdate?._entities || new Map());
        } catch (_) {}
      }
    }

    // ثبت لاگ ورودی پیام‌ها جهت شفافیت عملکرد سلف‌بات
    if (isPrivateChat || !isOut) {
      console.log(`📩 [${username}] Message received: #${message.id} | from: ${message.senderId || 'unknown'} | isOut: ${isOut} | isPrivate: ${isPrivateChat}`);
    }

    // ذخیره پیام‌های ورودی چت خصوصی در کش جهت نظارت بر ضد حذف و ضد ویرایش (Anti-Delete & Anti-Edit)
    if (isPrivateChat && !isOut && message.id && entry.recentMessagesCache) {
      let sender = null;
      try { sender = await message.getSender(); } catch (_) {}

      // 🛡️ استثنای قطعی: هرگز پیام‌های ربات‌ها (به ویژه ربات دستیار سلف‌بات) و حساب‌های سرویس در سطل زباله یا ضد ویرایش قرار نمی‌گیرند
      const botTokenId = entry.settings?.bot?.token ? entry.settings.bot.token.split(':')[0] : null;
      const botUsername = (entry.settings?.bot?.username || '').replace(/^@/, '').toLowerCase();
      const senderId = peerIdStr || (sender?.id ? sender.id.toString() : '');
      const senderUser = (sender?.username || '').toLowerCase();

      const isHelperBot = (botTokenId && senderId === botTokenId) || 
                          (botUsername && senderUser && senderUser === botUsername);
      const isTelegramBot = Boolean(sender?.bot || sender?.isBot);
      const isOfficialService = (senderId === '777000' || senderId === '42777');

      if (!isHelperBot && !isTelegramBot && !isOfficialService) {
        const senderFullName = sender ? (
          [sender.firstName, sender.lastName].filter(Boolean).join(' ') || 
          sender.title || 
          (sender.username ? `@${sender.username}` : (peerIdStr || 'کاربر'))
        ) : (peerIdStr || 'کاربر');

        const isPhoto = message.media instanceof Api.MessageMediaPhoto || Boolean(message.photo);
        const isVoice = Boolean(message.voice) || Boolean(message.media?.voice);
        const isVideo = Boolean(message.video) || Boolean(message.media?.video);

        let fileName = 'media.bin';
        if (isPhoto) fileName = `photo_${Date.now()}.jpg`;
        else if (isVoice) fileName = `voice_${Date.now()}.ogg`;
        else if (isVideo) fileName = `video_${Date.now()}.mp4`;

        const senderAccessHash = sender?.accessHash ? sender.accessHash.toString() : null;
        if (peerIdStr && senderAccessHash) {
          entry.peerCache = entry.peerCache || new Map();
          setBoundedMap(entry.peerCache, peerIdStr, {
            userId: peerIdStr,
            accessHash: senderAccessHash,
            firstName: sender?.firstName,
            lastName: sender?.lastName,
            username: sender?.username
          }, 2000);
        }

        const cacheObj = {
          id: message.id,
          senderId: peerIdStr || 'unknown',
          senderName: senderFullName,
          senderUsername: sender?.username || '',
          accessHash: senderAccessHash,
          text: message.text || message.message || '',
          date: message.date || Math.floor(Date.now() / 1000),
          hasMedia: Boolean(message.media),
          isPhoto,
          isVideo,
          isVoice,
          fileName
        };

        entry.recentMessagesCache.set(Number(message.id), cacheObj);
        if (entry.recentMessagesCache.size > 1200) {
          const oldestKey = entry.recentMessagesCache.keys().next().value;
          entry.recentMessagesCache.delete(oldestKey);
        }

        // دانلود پیش‌دستانه امن برای تصاویر و ویس‌های عادی زیر ۴ مگابایت جهت ارسال به ربات در صورت حذف
        if ((isPhoto || isVoice) && !message.media?.ttlSeconds && !message.media?.ttl_seconds) {
          downloadMediaSafely(entry.client, message, username).then(buf => {
            if (buf && buf.length > 0 && buf.length < 4 * 1024 * 1024) {
              cacheObj.mediaBuffer = buf;
              cacheObj.mediaBufferTime = Date.now();
              // بهینه‌سازی حافظه RAM: پاکسازی خودکار بافرهای قدیمی‌تر از ۱۵ دقیقه و سقف ۳۰ بافر همزمان
              let mediaCount = 0;
              const now = Date.now();
              for (const [, c] of entry.recentMessagesCache.entries()) {
                if (c.mediaBuffer) {
                  mediaCount++;
                  if (now - (c.mediaBufferTime || 0) > 900000 || mediaCount > 30) {
                    delete c.mediaBuffer;
                  }
                }
              }
            }
          }).catch(() => {});
        }
      }
    }

    // ۱. دستورات سریع تلگرامی خود کاربر (.mute و .unmute)
    if (isOut && message.text) {
      const text = message.text.trim();
      const muteMatch = text.match(/^\.mute(?:\s+(.+))?$/i);
      const unmuteMatch = text.match(/^\.unmute(?:\s+(.+))?$/i);

      if (muteMatch) {
        let targetId = null;
        let targetUsername = null;
        let targetLabel = '';

        if (message.replyTo) {
          const repliedMsg = await message.getReplyMessage().catch(() => null);
          if (repliedMsg) {
            targetId = (repliedMsg.senderId || repliedMsg.fromId?.userId || repliedMsg.peerId?.userId)?.toString();
            const repSender = await repliedMsg.getSender().catch(() => null);
            if (repSender?.username) targetUsername = repSender.username.toLowerCase();
            targetLabel = targetUsername ? `@${targetUsername} (${targetId || 'ID'})` : (targetId || 'کاربر');
          }
        } else if (muteMatch[1]) {
          const arg = muteMatch[1].trim();
          targetLabel = arg;
          if (/^-?\d+$/.test(arg)) {
            targetId = arg;
          } else {
            targetUsername = cleanMuteTarget(arg);
          }
        }

        if (targetId || targetUsername) {
          entry.settings.muteEnabled = true;
          if (!entry.localMutedUsers) entry.localMutedUsers = new Set();
          
          if (targetId) {
            if (!entry.settings.mutedUsers.includes(targetId)) entry.settings.mutedUsers.push(targetId);
            entry.localMutedUsers.add(targetId);
          }
          if (targetUsername) {
            const atUsername = `@${targetUsername}`;
            if (!entry.settings.mutedUsers.includes(atUsername) && !entry.settings.mutedUsers.includes(targetUsername)) {
              entry.settings.mutedUsers.push(atUsername);
            }
            entry.localMutedUsers.add(atUsername);
          }

          syncUserMuteToCloudflare(username, entry.settings.mutedUsers).catch(() => {});
          resolveMutedUsernames(entry);

          await message.edit({ text: `🔇 کاربر [${targetLabel}] به لیست سکوت سلف‌بات اضافه شد.` }).catch(() => {});
          setTimeout(() => message.delete({ revoke: true }).catch(() => {}), 3500);
          return;
        }
      } else if (unmuteMatch) {
        let targetId = null;
        let targetUsername = null;
        let targetLabel = '';

        if (message.replyTo) {
          const repliedMsg = await message.getReplyMessage().catch(() => null);
          if (repliedMsg) {
            targetId = (repliedMsg.senderId || repliedMsg.fromId?.userId || repliedMsg.peerId?.userId)?.toString();
            const repSender = await repliedMsg.getSender().catch(() => null);
            if (repSender?.username) targetUsername = repSender.username.toLowerCase();
            targetLabel = targetUsername ? `@${targetUsername} (${targetId || 'ID'})` : (targetId || 'کاربر');
          }
        } else if (unmuteMatch[1]) {
          const arg = unmuteMatch[1].trim();
          targetLabel = arg;
          if (/^-?\d+$/.test(arg)) {
            targetId = arg;
          } else {
            targetUsername = cleanMuteTarget(arg);
          }
        }

        if (targetId || targetUsername) {
          const targetsToRemove = new Set();
          if (targetId) targetsToRemove.add(targetId);
          if (targetUsername) {
            targetsToRemove.add(targetUsername);
            targetsToRemove.add(`@${targetUsername}`);
          }

          entry.settings.mutedUsers = entry.settings.mutedUsers.filter(id => {
            const clean = cleanMuteTarget(id);
            return !targetsToRemove.has(id) && !targetsToRemove.has(clean);
          });
          if (entry.localMutedUsers) {
            for (const t of targetsToRemove) entry.localMutedUsers.delete(t);
          }

          syncUserMuteToCloudflare(username, entry.settings.mutedUsers).catch(() => {});

          await message.edit({ text: `🔊 کاربر [${targetLabel}] از لیست سکوت خارج شد.` }).catch(() => {});
          setTimeout(() => message.delete({ revoke: true }).catch(() => {}), 3500);
          return;
        }
      }
    }

    // ۱.۱ دستورات سریع حالت شبح (.read و .ghost)
    if (isOut && message.text) {
      const text = message.text.trim();

      // دستور .read — زدن تیک آبی دستی
      const readMatch = text.match(/^\.read(?:\s+(.+))?$/i);
      if (readMatch) {
        const arg = (readMatch[1] || '').trim().toLowerCase();
        try {
          if (arg === 'all') {
            // خواندن تمام چت‌ها
            const dialogs = await entry.client.getDialogs({ limit: 50 });
            let readCount = 0;
            for (const d of dialogs) {
              if (d.unreadCount > 0 && d.entity) {
                try {
                  await entry.client.markAsRead(d.entity);
                  readCount++;
                } catch (_) {}
              }
            }
            await message.edit({ text: `📖 تیک آبی برای ${readCount} چت زده شد ✅` }).catch(() => {});
          } else {
            // خواندن چت فعلی
            const peer = message.peerId || message.chatId;
            if (peer) {
              await entry.client.markAsRead(peer);
              await message.edit({ text: '📖 تیک آبی برای این چت زده شد ✅' }).catch(() => {});
            }
          }
        } catch (readErr) {
          await message.edit({ text: `❌ خطا: ${readErr.message}` }).catch(() => {});
        }
        setTimeout(() => message.delete({ revoke: true }).catch(() => {}), 3000);
        return;
      }

      // دستور .ghost on/off — فعال/غیرفعال حالت شبح
      const ghostMatch = text.match(/^\.ghost\s+(on|off)$/i);
      if (ghostMatch) {
        const newState = ghostMatch[1].toLowerCase() === 'on';
        entry.settings.ghostMode = newState;
        syncUserFeatureToCloudflare(username, { ghostMode: newState });
        await message.edit({ text: newState ? '👻 حالت شبح فعال شد — تیک آبی مسدود است 🟢' : '👁️ حالت شبح غیرفعال شد — تیک آبی عادی ⚪' }).catch(() => {});
        setTimeout(() => message.delete({ revoke: true }).catch(() => {}), 3500);
        return;
      }

      // دستور .ai on/off — فعال/غیرفعال پاسخ هوشمند هوش مصنوعی
      const aiMatch = text.match(/^\.ai\s+(on|off)$/i);
      if (aiMatch) {
        const newState = aiMatch[1].toLowerCase() === 'on';
        entry.settings.aiReplyEnabled = newState;
        syncUserFeatureToCloudflare(username, { aiReplyEnabled: newState });
        await message.edit({ text: newState ? '🤖 پاسخ هوشمند AI فعال شد 🟢' : '🤖 پاسخ هوشمند AI غیرفعال شد ⚪' }).catch(() => {});
        setTimeout(() => message.delete({ revoke: true }).catch(() => {}), 3500);
        return;
      }
    }

    // ۲. 📸 ضد خودتخریبی مدیا (Anti-TTL Saver) — اکیداً فقط در گفتگوی خصوصی (پیوی)
    if (entry.settings.antiTtlEnabled && !isOut && isPrivateChat && !isStrictGroupOrChannel && message.media) {
      entry.processedTtlIds = entry.processedTtlIds || new Set();
      const msgIdNum = Number(message.id);

      // تشخیص دقیق و هوشمند رسانه‌های یک‌بار مصرف View-Once و تایمردار در گفتگوی خصوصی
      const directTtl = message.media?.ttlSeconds ?? 
                        message.media?.ttl_seconds ?? 
                        message.media?.photo?.ttlSeconds ?? 
                        message.media?.document?.ttlSeconds ??
                        message.ttlSeconds ?? 
                        message.ttl_seconds;

      const isViewOnceFlag = Boolean(
        (message.media?.flags && (message.media.flags & 4)) ||
        (message.media?.photo?.flags && (message.media.photo.flags & 4)) ||
        (message.media?.document?.flags && (message.media.document.flags & 4)) ||
        message.media?.viewOnce ||
        message.viewOnce
      );

      let ttl = 0;
      if (isViewOnceFlag) {
        ttl = 2147483647;
      } else if (directTtl && Number(directTtl) > 0) {
        ttl = Number(directTtl);
      } else if ((message.ttlPeriod || message.ttl_period) && Number(message.ttlPeriod || message.ttl_period) <= 300) {
        // تایمرهای کوتاه خودتخریبی پیوی (حداکثر تا ۵ دقیقه، به غیر از حذف خودکار ۲۴ ساعته یا چند روزه چت)
        ttl = Number(message.ttlPeriod || message.ttl_period);
      }

      // ممانعت قطعی از ارسال تکراری و متوالی (Deduplication)
      if (ttl && ttl > 0 && !entry.processedTtlIds.has(msgIdNum)) {
        entry.processedTtlIds.add(msgIdNum);
        if (entry.processedTtlIds.size > 1000) {
          const oldest = entry.processedTtlIds.keys().next().value;
          entry.processedTtlIds.delete(oldest);
        }
        message._antiTtlHandled = true;

        const rawSenderId = message.senderId || 
                            message.fromId?.userId || 
                            (message.peerId instanceof Api.PeerUser ? message.peerId.userId : null) || 
                            message.chatId;
        const senderIdStr = rawSenderId ? rawSenderId.toString() : 'ناشناس';

        console.log(`📸 [${username}] Anti-TTL detected self-destruct media #${msgIdNum} (TTL: ${ttl}s) from sender ${senderIdStr}. Downloading safely...`);
        try {
          const buffer = await downloadMediaSafely(entry.client, message, username);
          if (buffer && buffer.length > 0) {
            let sender = null;
            try {
              sender = await message.getSender();
            } catch (_) {}

            if (!sender && rawSenderId) {
              try {
                sender = await entry.client.getEntity(rawSenderId);
              } catch (_) {}
            }

            const senderAccessHash = sender?.accessHash ? sender.accessHash.toString() : null;
            const safeHash = (senderAccessHash && senderAccessHash !== '0') ? senderAccessHash : '0';

            if (rawSenderId && senderAccessHash) {
              entry.peerCache = entry.peerCache || new Map();
              setBoundedMap(entry.peerCache, rawSenderId.toString(), {
                userId: rawSenderId,
                accessHash: senderAccessHash,
                firstName: sender?.firstName,
                lastName: sender?.lastName,
                username: sender?.username
              }, 2000);
            }

            const senderFullName = sender ? (
              [sender.firstName, sender.lastName].filter(Boolean).join(' ') || 
              sender.title || 
              (sender.username ? `@${sender.username}` : senderIdStr)
            ) : senderIdStr;

            const cleanSenderName = String(senderFullName)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');

            const senderUsernameStr = sender?.username ? ` (@${sender.username})` : '';

            const timerLabel = (ttl >= 2147483647) 
              ? 'یک‌بار مصرف (View-Once)' 
              : (ttl > 86400 ? (Math.round(ttl / 86400) + ' روز') : (ttl + ' ثانیه'));

            const isPhoto = message.media instanceof Api.MessageMediaPhoto || 
                            Boolean(message.photo) || 
                            Boolean(message.media?.photo);

            const isVoice = Boolean(message.voice) || 
                            Boolean(message.media?.voice) || 
                            Boolean(message.media?.document?.attributes?.some(a => a instanceof Api.DocumentAttributeAudio && a.voice));

            const isVideoNote = Boolean(message.videoNote) || 
                                Boolean(message.media?.round) || 
                                Boolean(message.media?.document?.attributes?.some(a => a instanceof Api.DocumentAttributeVideo && a.roundMessage));

            const isVideo = Boolean(message.video) || 
                            Boolean(message.media?.video) || 
                            isVideoNote || 
                            Boolean(message.media?.document?.mimeType?.startsWith('video/')) || 
                            Boolean(message.media?.document?.attributes?.some(a => a instanceof Api.DocumentAttributeVideo));

            const typeLabel = isPhoto ? 'تصویر' : (isVoice ? 'پیام صوتی (ویس)' : (isVideoNote ? 'ویدیو گرد' : (isVideo ? 'ویدیو' : 'رسانه')));

            let fileName = 'saved_media.bin';
            if (isPhoto) fileName = `photo_${Date.now()}.jpg`;
            else if (isVoice) fileName = `voice_${Date.now()}.ogg`;
            else if (isVideoNote) fileName = `round_video_${Date.now()}.mp4`;
            else if (isVideo) fileName = `video_${Date.now()}.mp4`;
            else if (message.media?.document?.mimeType) {
              const ext = message.media.document.mimeType.split('/')[1] || 'bin';
              fileName = `file_${Date.now()}.${ext}`;
            }

            const caption = `📸 <b>[سیستم نجات رسانه — Anti-TTL]</b>\n` +
                            `━━━━━━━━━━━━━━━━━━━━\n` +
                            `👤 <b>فرستنده:</b> ${cleanSenderName}${senderUsernameStr} (<code>${senderIdStr}</code>)\n` +
                            `⏳ <b>مدت زمان تایمر:</b> <code>${timerLabel}</code>\n` +
                            `💾 <b>حجم فایل:</b> <code>${(buffer.length / 1024).toFixed(1)} KB</code>\n` +
                            `━━━━━━━━━━━━━━━━━━━━\n` +
                            `💡 <i>این رسانه زمان‌دار قبل از انقضا به صورت خودکار نجات یافت.</i>`;

            const customFile = new CustomFile(fileName, buffer.length, '', buffer);

            let sendSuccess = false;
            let botSendResult = null;

            // مرحله ۰: ارسال مستقیم به ربات تلگرام اختصاصی کاربر (در صورت فعال بودن)
            const bot = entry.settings?.bot;
            const targetChatId = bot?.chatId || bot?.ownerId || entry.myId;
            if (bot?.token && targetChatId && bot?.forwardTtlToBot !== false) {
              try {
                const ttlKeyboard = {
                  inline_keyboard: [
                    [
                      { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${senderIdStr}:${safeHash}`, style: 'primary' },
                      { text: '👻 چت در حالت شبح', callback_data: `ghost_view:${senderIdStr}:${safeHash}`, style: 'success' }
                    ]
                  ]
                };
                botSendResult = await sendBotTelegramMedia(
                  bot.token,
                  targetChatId,
                  buffer,
                  fileName,
                  caption,
                  isPhoto,
                  isVideo,
                  isVoice,
                  ttlKeyboard
                );
                if (botSendResult.ok) {
                  sendSuccess = true;
                  console.log(`✅ [${username}] Anti-TTL media (${fileName}, ${buffer.length} bytes) successfully delivered directly to Telegram Helper Bot!`);
                } else if (botSendResult.isBlocked) {
                  console.warn(`🚫 [${username}] Helper bot is blocked by user ${targetChatId}. Falling back to Saved Messages.`);
                }
              } catch (botErr) {
                console.warn(`⚠️ [${username}] Forwarding Anti-TTL to helper bot failed:`, botErr.message);
              }
            }

            // در صورتی که به دلیل بلاک بودن ربات پیام ارسال نشد، اخطار راهنما در سیومسیج درج می‌گردد
            let backupCaption = caption;
            if (botSendResult && botSendResult.isBlocked) {
              backupCaption += `\n\n⚠️ <b>هشدار:</b> ربات @${bot?.username || 'اختصاصی شما'} توسط شما متوقف (Stop/Block) شده است و تلگرام اجازه تحویل مستقیم به ربات را نداد. این رسانه موقتاً در Saved Messages ذخیره شد. لطفاً ربات را استارت (Restart) فرمایید.`;
            }

            // مرحله ۱: در صورت عدم وجود ربات یا عدم موفقیت، ارسال پشتیبان به Saved Messages اکانت
            if (!sendSuccess) {
              try {
                await entry.client.sendFile('me', {
                  file: customFile,
                  caption: backupCaption,
                  parseMode: 'html',
                  forceDocument: false,
                  voiceNote: isVoice,
                  videoNote: isVideoNote
                });
                sendSuccess = true;
                console.log(`✅ [${username}] Anti-TTL media (${fileName}, ${buffer.length} bytes) successfully saved to Saved Messages as native media!`);
              } catch (nativeErr) {
                console.warn(`⚠️ [${username}] Native media send failed (${nativeErr.message}). Retrying as document...`);
              }
            }

            // مرحله ۲: در صورت عدم پذیرش ابعاد/فرمت توسط تلگرام، ارسال امن به صورت Document
            if (!sendSuccess) {
              try {
                await entry.client.sendFile('me', {
                  file: customFile,
                  caption,
                  parseMode: 'html',
                  forceDocument: true
                });
                sendSuccess = true;
                console.log(`✅ [${username}] Anti-TTL media (${fileName}) successfully saved as document fallback!`);
              } catch (docErr) {
                console.warn(`⚠️ [${username}] Document HTML send failed (${docErr.message}). Retrying with plain text caption...`);
              }
            }

            // مرحله ۳: اگر به خاطر کاراکترهای نامتعارف در نام فرستنده خطا داد، با کپشن متنی ساده ارسال می‌کنیم
            if (!sendSuccess) {
              try {
                const plainCaption = `📸 [Arizo Anti-TTL] ${typeLabel} زمان‌دار نجات یافت!\n` +
                                     `👤 فرستنده: ${cleanSenderName}${senderUsernameStr} (${senderIdStr})\n` +
                                     `⏳ مدت تایمر: ${timerLabel}\n` +
                                     `💾 حجم: ${(buffer.length / 1024).toFixed(1)} KB`;
                await entry.client.sendFile('me', {
                  file: customFile,
                  caption: plainCaption,
                  forceDocument: true
                });
                sendSuccess = true;
                console.log(`✅ [${username}] Anti-TTL media (${fileName}) successfully saved with plain text caption fallback!`);
              } catch (finalErr) {
                console.error(`❌ [${username}] All send tiers failed for Anti-TTL:`, finalErr.message);
              }
            }
          } else {
            console.warn(`⚠️ [${username}] Anti-TTL all download layers returned 0 bytes.`);
          }
        } catch (ttlErr) {
          console.error(`❌ [${username}] Anti-TTL processing error:`, ttlErr.message);
        }
      }
    }

    // ۳. 🔇 سکوت و حذف خودکار پیام (Mute)
    const hasMutedUsers = Array.isArray(entry.settings.mutedUsers) && entry.settings.mutedUsers.length > 0;
    const hasLocalMuted = entry.localMutedUsers && entry.localMutedUsers.size > 0;
    if ((entry.settings.muteEnabled || hasMutedUsers || hasLocalMuted) && !isOut) {
      // جمع‌آوری کلیه شناسه‌های عددی فرستنده
      const senderIds = new Set();
      if (message.senderId) senderIds.add(cleanMuteTarget(message.senderId));
      if (message.fromId?.userId) senderIds.add(cleanMuteTarget(message.fromId.userId));
      if (message.fromId?.chatId) senderIds.add(cleanMuteTarget(message.fromId.chatId));
      if (message.fromId?.channelId) senderIds.add(cleanMuteTarget(message.fromId.channelId));
      if (message.peerId?.userId) senderIds.add(cleanMuteTarget(message.peerId.userId));
      if (message.peerId?.chatId) senderIds.add(cleanMuteTarget(message.peerId.chatId));
      if (message.peerId?.channelId) senderIds.add(cleanMuteTarget(message.peerId.channelId));
      if (message.chatId) senderIds.add(cleanMuteTarget(message.chatId));

      // دریافت انتیتی فرستنده جهت بررسی یوزرنیم
      let sender = null;
      try {
        sender = await message.getSender();
      } catch (_) {}

      if (!sender && (message.senderId || message.fromId || message.peerId)) {
        try {
          const peer = message.fromId || message.senderId || message.peerId;
          sender = await entry.client.getEntity(peer);
        } catch (_) {}
      }

      if (sender && sender.id) {
        senderIds.add(cleanMuteTarget(sender.id));
      }

      // جمع‌آوری کلیه یوزرنیم‌های فرستنده
      const senderUsernames = new Set();
      if (sender?.username) {
        senderUsernames.add(cleanMuteTarget(sender.username));
      }
      if (Array.isArray(sender?.usernames)) {
        for (const u of sender.usernames) {
          if (u && u.username) senderUsernames.add(cleanMuteTarget(u.username));
        }
      }

      // بررسی کش انتیتی کلاینت برای کلیه شناسه‌های فرستنده (در صورتی که getSender یوزرنیم نداده باشد)
      for (const id of senderIds) {
        try {
          const cached = entry.client._entityCache.get(id);
          if (cached?.username) senderUsernames.add(cleanMuteTarget(cached.username));
          if (Array.isArray(cached?.usernames)) {
            for (const u of cached.usernames) {
              if (u && u.username) senderUsernames.add(cleanMuteTarget(u.username));
            }
          }
        } catch (_) {}
      }

      // ساخت لیست یکپارچه از اهداف سکوت (ترکیب تنظیمات سرور و محلی)
      const allMutedTargets = new Set();
      if (Array.isArray(entry.settings.mutedUsers)) {
        for (const raw of entry.settings.mutedUsers) {
          const c = cleanMuteTarget(raw);
          if (c) allMutedTargets.add(c);
        }
      }
      if (entry.localMutedUsers) {
        for (const raw of entry.localMutedUsers) {
          const c = cleanMuteTarget(raw);
          if (c) allMutedTargets.add(c);
        }
      }

      let isMuted = false;
      let matchedTarget = null;

      for (const target of allMutedTargets) {
        if (senderIds.has(target)) {
          isMuted = true;
          matchedTarget = target;
          break;
        }

        if (senderUsernames.has(target)) {
          isMuted = true;
          matchedTarget = target;
          break;
        }
      }

      if (isMuted) {
        const senderDisplay = sender?.username ? `@${sender.username}` : (Array.from(senderIds)[0] || 'ناشناس');
        console.log(`🔇 [${username}] Mute triggered for ${senderDisplay} (target: "${matchedTarget}"). Deleting message #${message.id}...`);

        if (entry.selfbotDeletedIds) addToBoundedSet(entry.selfbotDeletedIds, message.id, 1000);
        await deleteTelegramMessage(entry.client, message, username);
        return; // از ادامه اجرای سایر بخش‌ها (از جمله منشی خودکار) جلوگیری می‌شود
      }
    }

    // ۴. 🤖 منشی خودکار پیوی + 👻 حالت شبح + 🤖 پاسخ هوشمند AI
    if (!isOut && isPrivateChat) {
      const rawSenderId = message.senderId || message.fromId?.userId || (message.peerId instanceof Api.PeerUser ? message.peerId.userId : null) || message.chatId;
      const senderIdStr = rawSenderId ? rawSenderId.toString() : null;

      if (senderIdStr && senderIdStr !== myId) {
        // نادیده گرفتن اکانت‌های رسمی تلگرام (پیامک ورود و پشتیبانی)
        if (senderIdStr === '777000' || senderIdStr === '42777') return;

        // نادیده گرفتن ربات‌ها
        const sender = await message.getSender().catch(() => null);
        if (sender && (sender.bot || sender.isBot)) return;

        const senderFullName = sender ? (
          [sender.firstName, sender.lastName].filter(Boolean).join(' ') || 
          sender.title || 
          (sender.username ? `@${sender.username}` : senderIdStr)
        ) : senderIdStr;

        const senderAccessHash = sender?.accessHash ? sender.accessHash.toString() : null;
        const safeHash = (senderAccessHash && senderAccessHash !== '0') ? senderAccessHash : '0';

        if (senderIdStr && senderAccessHash) {
          entry.peerCache = entry.peerCache || new Map();
          setBoundedMap(entry.peerCache, senderIdStr, {
            userId: senderIdStr,
            accessHash: senderAccessHash,
            firstName: sender?.firstName,
            lastName: sender?.lastName,
            username: sender?.username
          }, 2000);
        }

        // ——— ۴.A 👻 Ghost Mode: فوروارد پیام به ربات بدون زدن تیک آبی ———
        if (entry.settings.ghostMode) {
          const bot = entry.settings?.bot;
          const targetChatId = bot?.chatId || bot?.ownerId || entry.myId;

          // بررسی لیست استثنا
          const excludeList = entry.settings.ghostExcludeList || [];
          const isExcluded = excludeList.some(ex => {
            const clean = cleanMuteTarget(ex);
            return clean === senderIdStr || clean === (sender?.username || '').toLowerCase();
          });

          if (!isExcluded && bot?.token && targetChatId) {
            const isPhoto = message.media instanceof Api.MessageMediaPhoto || Boolean(message.photo);
            const isVoice = Boolean(message.voice) || Boolean(message.media?.voice);
            const isVideo = Boolean(message.video) || Boolean(message.media?.video);
            const mediaType = isPhoto ? 'تصویر' : (isVoice ? 'ویس' : (isVideo ? 'ویدیو' : 'فایل'));

            // فوروارد متن پیام به ربات
            forwardGhostMessage(
              bot.token,
              targetChatId,
              senderFullName,
              sender?.username || '',
              senderIdStr,
              message.text || message.message || '',
              Boolean(message.media),
              mediaType,
              safeHash
            ).catch(e => console.warn(`⚠️ [${username}] Ghost forward error:`, e.message));

            // فوروارد مدیا به ربات (اگر وجود داشت و توسط Anti-TTL نجات نیافته باشد)
            if (message.media && !message._antiTtlHandled && !message.media?.ttlSeconds && !message.media?.ttl_seconds) {
              downloadMediaSafely(entry.client, message, username).then(buf => {
                if (buf && buf.length > 0 && buf.length < 4 * 1024 * 1024) {
                  const ghostMediaCaption = `👻 <b>[رسانه دریافتی در حالت شبح]</b>\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n` +
                    `👤 <b>فرستنده:</b> ${escapeHtml(senderFullName)} (<code>${senderIdStr}</code>)\n` +
                    `📎 <b>نوع رسانه:</b> <code>${mediaType}</code>\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n` +
                    `💡 <i>جهت پاسخ مستقیم یا مشاهده گفتگو از دکمه‌های زیر استفاده فرمایید.</i>`;

                  const ghostMediaKeyboard = {
                    inline_keyboard: [
                      [
                        { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${senderIdStr}:${safeHash}`, style: 'primary' },
                        { text: '👻 چت در حالت شبح', callback_data: `ghost_view:${senderIdStr}:${safeHash}`, style: 'success' }
                      ]
                    ]
                  };

                  sendBotTelegramMedia(
                    bot.token, targetChatId, buf,
                    `ghost_${Date.now()}.${isPhoto ? 'jpg' : (isVoice ? 'ogg' : 'mp4')}`,
                    ghostMediaCaption,
                    isPhoto, isVideo, isVoice,
                    ghostMediaKeyboard
                  ).catch(() => {});
                }
              }).catch(() => {});
            }

            console.log(`👻 [${username}] Ghost Mode: forwarded message from ${senderIdStr} to bot (no read receipt)`);
          } else if (isExcluded) {
            // برای افراد استثنا، تیک آبی عادی زده شود
            try {
              await entry.client.markAsRead(message.peerId || message.chatId);
              console.log(`👁️ [${username}] Ghost exclude: marked as read for ${senderIdStr}`);
            } catch (_) {}
          }
        }

        // 🛑 محافظت هوشمند چندلایه‌ای: جلوگیری قطعی از ارسال منشی خودکار یا هوش مصنوعی در حین آنلاین بودن یا چت فعال کاربر
        if (entry.settings.aiReplyEnabled || entry.settings.afkEnabled) {
          const activeCheck = await isUserActiveOrOnline(entry, username, senderIdStr, message);
          if (activeCheck.isBusyOrOnline) {
            console.log(`🛑 [${username}] Suppressing AFK/AI auto-reply for ${senderIdStr}: ${activeCheck.reason}`);
            if (entry.pendingAiReplies?.has(senderIdStr)) {
              clearTimeout(entry.pendingAiReplies.get(senderIdStr).timeoutId);
              entry.pendingAiReplies.delete(senderIdStr);
            }
            return;
          }
        }

        // ——— ۴.B 🤖 پاسخ هوشمند AI (اولویت بالاتر از AFK ثابت) با فرجه هوشمند ۱۲ ثانیه ———
        if (entry.settings.aiReplyEnabled && entry.settings.aiApiKey) {
          const aiCooldownMin = entry.settings.aiCooldown ?? 5;
          const aiCooldownMs = aiCooldownMin > 0 ? (aiCooldownMin * 60 * 1000) : 0;
          const lastAiReply = entry.aiCooldownMap?.get(senderIdStr) || 0;
          const now = Date.now();

          // ریست خودکار سقف پاسخ در صورتی که بیش از ۳۰ دقیقه از آخرین پاسخ گذشته باشد (جلسه جدید گفتگو)
          if (lastAiReply > 0 && (now - lastAiReply > 30 * 60 * 1000)) {
            entry.aiReplyCountMap?.delete(senderIdStr);
          }

          // بررسی سقف تعداد پاسخ و کول‌داون زمانی
          const maxReplies = entry.settings.aiMaxReplies ?? 3;
          const currentCount = entry.aiReplyCountMap?.get(senderIdStr) || 0;
          const isRepliesAllowed = maxReplies === 0 || maxReplies >= 20 || currentCount < maxReplies;
          const isCooldownPassed = aiCooldownMs === 0 || (now - lastAiReply >= aiCooldownMs);

          if (isRepliesAllowed && isCooldownPassed) {
            const messageText = (message.text || message.message || '').trim();
            if (messageText.length > 0) {
              entry.pendingAiReplies = entry.pendingAiReplies || new Map();

              if (entry.pendingAiReplies.has(senderIdStr)) {
                // تجمیع پیام‌های رگباری مخاطب در صف فرجه هوشمند
                const pending = entry.pendingAiReplies.get(senderIdStr);
                pending.messages.push(messageText);
                pending.lastMessage = message;
                console.log(`📥 [${username}] Appended additional message from ${senderIdStr} to AI queue (total: ${pending.messages.length})`);
                return;
              }

              console.log(`⏳ [${username}] Scheduling AI Smart Reply for ${senderIdStr} with 12s grace period...`);

              const pendingItem = {
                messages: [messageText],
                lastMessage: message,
                timeoutId: null
              };

              pendingItem.timeoutId = setTimeout(async () => {
                entry.pendingAiReplies?.delete(senderIdStr);

                // بازبینی نهایی وضعیت آنلاین بودن کاربر پس از پایان فرجه ۱۲ ثانیه‌ای
                const finalActiveCheck = await isUserActiveOrOnline(entry, username, senderIdStr, pendingItem.lastMessage);
                if (finalActiveCheck.isBusyOrOnline) {
                  console.log(`🛑 [${username}] AI reply cancelled after grace period for ${senderIdStr}: ${finalActiveCheck.reason}`);
                  return;
                }

                const combinedText = pendingItem.messages.join('\n');
                console.log(`🤖 [${username}] AI Smart Reply: processing message from ${senderIdStr} after grace period...`);

                const aiResponse = await callAIApi(
                  entry.settings.aiProvider,
                  entry.settings.aiApiKey,
                  entry.settings.aiSystemPrompt,
                  entry.settings.aiContext,
                  combinedText
                );

                if (aiResponse) {
                  const aiText = `🤖 ${aiResponse}`;
                  const sent = await sendAfkReply(entry, pendingItem.lastMessage, aiText, username, senderIdStr);
                  if (sent) {
                    const sendNow = Date.now();
                    setBoundedMap(entry.aiCooldownMap, senderIdStr, sendNow, 500);
                    setBoundedMap(entry.aiReplyCountMap, senderIdStr, currentCount + 1, 500);
                    console.log(`✅ [${username}] AI replied to ${senderIdStr} (${currentCount + 1}/${maxReplies})`);

                    // ارسال گزارش پاسخ هوش مصنوعی به ربات اختصاصی کاربر
                    const bot = entry.settings?.bot;
                    const targetChatId = bot?.chatId || bot?.ownerId || entry.myId;
                    if (bot?.token && targetChatId) {
                      const cleanSender = String(senderFullName).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                      const senderUserStr = sender?.username ? ` (@${sender.username})` : '';
                      const cleanUserMsg = String(combinedText).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 300);
                      const cleanReply = String(aiResponse).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').slice(0, 500);
                      const logText = `🤖 <b>[پاسخ خودکار هوش مصنوعی — AI Reply]</b>\n` +
                        `━━━━━━━━━━━━━━━━━━━━\n` +
                        `👤 <b>مخاطب:</b> ${cleanSender}${senderUserStr} (<code>${senderIdStr}</code>)\n` +
                        `🕒 <b>زمان ارسال:</b> <code>${new Date().toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran' })}</code>\n` +
                        `📊 <b>شمارنده:</b> <code>${currentCount + 1} از ${maxReplies} پاسخ مجاز</code>\n\n` +
                        `📩 <b>پیام مخاطب:</b>\n<blockquote>${cleanUserMsg}</blockquote>\n\n` +
                        `💬 <b>پاسخ هوش مصنوعی:</b>\n<blockquote>${cleanReply}</blockquote>\n` +
                        `━━━━━━━━━━━━━━━━━━━━\n` +
                        `💡 <i>جهت پاسخ مستقیم یا مشاهده گفتگو در حالت شبح، از دکمه‌های زیر استفاده فرمایید:</i>`;

                      const logKeyboard = {
                        inline_keyboard: [
                          [
                            { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${senderIdStr}:${safeHash}`, style: 'primary' },
                            { text: '👻 چت در حالت شبح', callback_data: `ghost_view:${senderIdStr}:${safeHash}`, style: 'success' }
                          ]
                        ]
                      };
                      sendBotTelegramMessage(bot.token, targetChatId, logText, logKeyboard).catch(() => {});
                    }
                  }
                } else {
                  console.warn(`⚠️ [${username}] AI returned null, falling back to AFK if enabled`);
                  // Fallback به AFK ثابت اگر AI جواب نداد
                  if (entry.settings.afkEnabled) {
                    const afkText = (entry.settings.afkMessage && entry.settings.afkMessage.trim()) || 'درود! در حال حاضر آفلاین هستم. به محض آنلاین شدن پاسخ خواهم داد ⏳';
                    const sent = await sendAfkReply(entry, pendingItem.lastMessage, afkText, username, senderIdStr);
                    if (sent) setBoundedMap(entry.afkCooldownMap, senderIdStr, Date.now(), 500);
                  }
                }
              }, 12000);

              entry.pendingAiReplies.set(senderIdStr, pendingItem);
            }
          } else if (currentCount >= maxReplies) {
            console.log(`🔒 [${username}] AI max replies reached for ${senderIdStr} (${currentCount}/${maxReplies})`);
          }

        // ——— ۴.C 🤖 منشی خودکار پیوی ثابت (AFK — فقط اگر AI غیرفعال باشد) ———
        } else if (entry.settings.afkEnabled) {
          const cooldownMinutes = entry.settings.afkCooldown ?? 10;
          const cooldownMs = cooldownMinutes * 60 * 1000;
          const lastReply = entry.afkCooldownMap.get(senderIdStr) || 0;
          const now = Date.now();

          if (now - lastReply >= cooldownMs) {
            const afkText = (entry.settings.afkMessage && entry.settings.afkMessage.trim()) || 'درود! در حال حاضر آفلاین هستم یا امکان پاسخگویی ندارم. به محض آنلاین شدن پاسخ شما را خواهم داد ⏳';
            console.log(`🤖 [${username}] AFK auto-replying to ${senderIdStr}`);

            const sent = await sendAfkReply(entry, message, afkText, username, senderIdStr);
            if (sent) {
              setBoundedMap(entry.afkCooldownMap, senderIdStr, now, 500);
            }
          } else {
            const remainingSec = Math.round((cooldownMs - (now - lastReply)) / 1000);
            console.log(`⏳ [${username}] AFK cooldown active for ${senderIdStr} (${remainingSec}s remaining). Skipping reply.`);
          }
        }
      }
    }
  }

  async handleRawUpdate(entry, username, update) {
    if (!update) return;

    // ۱. پایش وضعیت آنلاین کاربر و رویدادهای چت در حساب تلگرام (حتی در صورت خاموش بودن ربات دستیار)
    this.detectSelfUserStatus(entry, username, update);

    const bot = entry.settings?.bot;
    if (!bot || !bot.token) return;

    // پردازش آپدیت‌های تک یا دسته‌ای (Updates / UpdatesCombined / UpdateShort)
    if (Array.isArray(update.updates)) {
      for (const sub of update.updates) {
        await this.processSingleRawUpdate(entry, username, sub, bot);
      }
    } else if (update.update) {
      await this.processSingleRawUpdate(entry, username, update.update, bot);
    } else {
      await this.processSingleRawUpdate(entry, username, update, bot);
    }
  }

  detectSelfUserStatus(entry, username, rawUpdate) {
    if (!rawUpdate || !entry) return;

    const list = Array.isArray(rawUpdate.updates)
      ? rawUpdate.updates
      : (rawUpdate.update ? [rawUpdate.update] : [rawUpdate]);

    const myIdStr = entry.myId ? entry.myId.toString() : null;

    for (const u of list) {
      if (!u) continue;

      // ۱. بررسی آنلاین بودن اکانت (UpdateUserStatus) با فیلتر پرش لحظه‌ای (Hysteresis)
      if (u instanceof Api.UpdateUserStatus || u.className === 'UpdateUserStatus') {
        const uid = u.userId ? u.userId.toString() : null;
        if (uid && myIdStr && uid === myIdStr) {
          const st = u.status;
          const isOnline = st instanceof Api.UserStatusOnline || st?.className === 'UserStatusOnline';
          const now = Date.now();
          if (isOnline) {
            entry.isSelfOnline = true;
            entry.selfOnlineExpires = st.expires ? (st.expires * 1000) : (now + 180000);
            entry.lastSelfOnlineTime = now;
            console.log(`🟢 [${username}] Telegram status updated: ONLINE (expires in ${Math.round((entry.selfOnlineExpires - now) / 1000)}s)`);
          } else {
            const wasSec = (st instanceof Api.UserStatusOffline || st?.className === 'UserStatusOffline') ? st.wasOnline : 0;
            const wasMs = wasSec ? (wasSec * 1000) : 0;
            if (wasMs > 0) {
              entry.lastSelfOnlineTime = Math.max(entry.lastSelfOnlineTime || 0, wasMs);
            }
            // فیلتر پرش لحظه‌ای: اگر کمتر از ۵ دقیقه پیش آنلاین بوده، فوری آفلاین نکن
            if (wasMs > 0 && (now - wasMs < 5 * 60 * 1000)) {
              entry.isSelfOnline = true;
              entry.selfOnlineExpires = wasMs + 5 * 60 * 1000;
              console.log(`🟡 [${username}] Telegram status: recently online (${Math.round((now - wasMs) / 1000)}s ago), grace period active`);
            } else {
              entry.isSelfOnline = false;
              entry.selfOnlineExpires = 0;
              console.log(`⚪ [${username}] Telegram status updated: OFFLINE`);
            }
          }
        }
      }

      // ۲. بررسی ارسال پیام در چت خصوصی از کلاینت‌های دیگر (UpdateShortMessage)
      if (u instanceof Api.UpdateShortMessage || u.className === 'UpdateShortMessage') {
        const now = Date.now();
        entry.lastGlobalOutTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
        if (u.out && u.userId) {
          const partnerStr = u.userId.toString();
          if (partnerStr !== myIdStr) {
            entry.lastChatOutMap = entry.lastChatOutMap || new Map();
            setBoundedMap(entry.lastChatOutMap, partnerStr, now, 500);
            if (entry.aiReplyCountMap) entry.aiReplyCountMap.delete(partnerStr);
            if (entry.afkCooldownMap) entry.afkCooldownMap.delete(partnerStr);
            if (entry.pendingAiReplies?.has(partnerStr)) {
              clearTimeout(entry.pendingAiReplies.get(partnerStr).timeoutId);
              entry.pendingAiReplies.delete(partnerStr);
              console.log(`🚫 [${username}] Cancelled pending AI reply for ${partnerStr}: UpdateShortMessage out`);
            }
            console.log(`💬 [${username}] UpdateShortMessage: user sent message to ${partnerStr}`);
          }
        }
      }

      // ۳. بررسی ارسال پیام خروجی کامل در پیوی، گروه‌ها و کانال‌ها (UpdateNewMessage / UpdateNewChannelMessage)
      if ((u instanceof Api.UpdateNewMessage || u.className === 'UpdateNewMessage' ||
           u instanceof Api.UpdateNewChannelMessage || u.className === 'UpdateNewChannelMessage') && u.message?.out) {
        const now = Date.now();
        entry.lastGlobalOutTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
        const rawPeer = u.message.peerId?.userId || (u.message.peerId instanceof Api.PeerUser ? u.message.peerId.userId : null) || u.message.peerId?.chatId;
        const peerStr = rawPeer ? rawPeer.toString() : null;
        if (peerStr && peerStr !== myIdStr) {
          entry.lastChatOutMap = entry.lastChatOutMap || new Map();
          setBoundedMap(entry.lastChatOutMap, peerStr, now, 500);
          if (entry.aiReplyCountMap) entry.aiReplyCountMap.delete(peerStr);
          if (entry.afkCooldownMap) entry.afkCooldownMap.delete(peerStr);
          if (entry.pendingAiReplies?.has(peerStr)) {
            clearTimeout(entry.pendingAiReplies.get(peerStr).timeoutId);
            entry.pendingAiReplies.delete(peerStr);
            console.log(`🚫 [${username}] Cancelled pending AI reply for ${peerStr}: user sent message (UpdateNewMessage)`);
          }
          console.log(`💬 [${username}] UpdateNewMessage out: user sent message to ${peerStr}`);
        }
      }

      // ۴. بررسی خواندن پیام در دستگاه دیگر توسط کاربر (UpdateReadHistoryInbox)
      if (u instanceof Api.UpdateReadHistoryInbox || u.className === 'UpdateReadHistoryInbox') {
        const rawPeer = u.peer?.userId || (u.peer instanceof Api.PeerUser ? u.peer.userId : null) || u.peer?.chatId;
        const peerStr = rawPeer ? rawPeer.toString() : null;
        const now = Date.now();
        entry.lastGlobalOutTime = now;
        entry.lastGlobalReadTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
        if (peerStr && peerStr !== myIdStr) {
          entry.lastChatOutMap = entry.lastChatOutMap || new Map();
          setBoundedMap(entry.lastChatOutMap, peerStr, now, 500);
          entry.lastChatReadTimeMap = entry.lastChatReadTimeMap || new Map();
          setBoundedMap(entry.lastChatReadTimeMap, peerStr, now, 500);
          if (entry.pendingAiReplies?.has(peerStr)) {
            clearTimeout(entry.pendingAiReplies.get(peerStr).timeoutId);
            entry.pendingAiReplies.delete(peerStr);
            console.log(`🚫 [${username}] Cancelled pending AI reply for ${peerStr}: user read chat.`);
          }
          console.log(`👁️ [${username}] User read chat ${peerStr} on active device.`);
        }
      }

      // ۵. بررسی خواندن پیام‌های کانال‌ها در دستگاه دیگر (UpdateReadChannelInbox)
      if (u instanceof Api.UpdateReadChannelInbox || u.className === 'UpdateReadChannelInbox') {
        const now = Date.now();
        entry.lastGlobalReadTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
      }

      // ۶. بررسی ارسال پیام گروهی از کلاینت‌های دیگر (UpdateShortChatMessage)
      if (u instanceof Api.UpdateShortChatMessage || u.className === 'UpdateShortChatMessage') {
        const fromStr = u.fromId ? u.fromId.toString() : null;
        if (fromStr && myIdStr && fromStr === myIdStr) {
          const now = Date.now();
          entry.lastGlobalOutTime = now;
          entry.lastSelfOnlineTime = now;
          entry.isSelfOnline = true;
          entry.selfOnlineExpires = now + 5 * 60 * 1000;
          console.log(`💬 [${username}] UpdateShortChatMessage: user sent group message`);
        }
      }

      // ۷. بررسی تاییدیه ارسال پیام (UpdateShortSentMessage)
      if (u instanceof Api.UpdateShortSentMessage || u.className === 'UpdateShortSentMessage') {
        const now = Date.now();
        entry.lastGlobalOutTime = now;
        entry.lastSelfOnlineTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
      }

      // ۸. بررسی تایپ کردن کاربر (UpdateUserTyping / UpdateChatUserTyping)
      if (u instanceof Api.UpdateUserTyping || u.className === 'UpdateUserTyping' ||
          u instanceof Api.UpdateChatUserTyping || u.className === 'UpdateChatUserTyping') {
        const uid = u.userId ? u.userId.toString() : (u.fromId ? u.fromId.toString() : null);
        if (uid && myIdStr && uid === myIdStr) {
          const now = Date.now();
          entry.lastGlobalOutTime = now;
          entry.lastSelfOnlineTime = now;
          entry.isSelfOnline = true;
          entry.selfOnlineExpires = now + 5 * 60 * 1000;
        }
      }

      // ۹. بررسی ویرایش یا ذخیره پیش‌نویس (UpdateDraftMessage)
      if (u instanceof Api.UpdateDraftMessage || u.className === 'UpdateDraftMessage') {
        const now = Date.now();
        entry.lastGlobalOutTime = now;
        entry.lastSelfOnlineTime = now;
        entry.lastDraftTime = now;
        entry.isSelfOnline = true;
        entry.selfOnlineExpires = now + 5 * 60 * 1000;
        const rawPeer = u.peer?.userId || (u.peer instanceof Api.PeerUser ? u.peer.userId : null) || u.peer?.chatId;
        const peerStr = rawPeer ? rawPeer.toString() : null;
        if (peerStr && peerStr !== myIdStr) {
          entry.lastChatDraftMap = entry.lastChatDraftMap || new Map();
          setBoundedMap(entry.lastChatDraftMap, peerStr, now, 500);
          if (entry.pendingAiReplies?.has(peerStr)) {
            clearTimeout(entry.pendingAiReplies.get(peerStr).timeoutId);
            entry.pendingAiReplies.delete(peerStr);
            console.log(`🚫 [${username}] Cancelled pending AI reply for ${peerStr}: user updated draft / is typing.`);
          }
        }
      }
    }
  }

  async processSingleRawUpdate(entry, username, update, bot) {
    if (!update || !bot) return;

    const targetChatId = bot.chatId || entry.myId;
    if (!targetChatId) return;

    // ۱. بررسی رویداد حذف پیام در پیوی (Anti-Delete)
    const isDelete = update instanceof Api.UpdateDeleteMessages || 
                     update instanceof Api.UpdateDeleteChannelMessages ||
                     update.className === 'UpdateDeleteMessages' || 
                     update.className === 'UpdateDeleteChannelMessages';

    if (isDelete && Array.isArray(update.messages) && bot.antiDeleteEnabled !== false) {
      for (const rawMsgId of update.messages) {
        const msgId = Number(rawMsgId);
        // اگر این پیام توسط خود سلف‌بات حذف شده باشد (مثلاً فیلتر سکوت)، نادیده می‌گیریم
        if (entry.selfbotDeletedIds && entry.selfbotDeletedIds.has(msgId)) {
          entry.selfbotDeletedIds.delete(msgId);
          continue;
        }

        if (entry.recentMessagesCache && entry.recentMessagesCache.has(msgId)) {
          const cached = entry.recentMessagesCache.get(msgId);
          entry.recentMessagesCache.delete(msgId);

          const botTokenId = bot.token ? bot.token.split(':')[0] : null;
          if (botTokenId && cached.senderId === botTokenId) {
            continue; // استثنای قطعی پیام‌های ربات دستیار
          }
          if (cached.senderId === '777000' || cached.senderId === '42777') {
            continue; // استثنای سرویس تلگرام
          }

          const dateStr = cached.date 
            ? new Date(cached.date * 1000).toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran' }) 
            : 'لحظاتی پیش';
          const senderUserStr = cached.senderUsername ? ` (@${cached.senderUsername})` : '';

          const caption = `🗑️ <b>[سامانه ضد حذف — Anti-Delete]</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>فرستنده:</b> ${cached.senderName}${senderUserStr} (<code>${cached.senderId}</code>)\n` +
            `🕒 <b>زمان ارسال پیام:</b> <code>${dateStr}</code>\n\n` +
            `📝 <b>متن پیام حذف شده:</b>\n<blockquote>${cached.text ? cached.text : '<i>(پیام فاقد متن بود)</i>'}</blockquote>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `💡 <i>جهت پاسخ به این پیام روی دکمه‌های زیر کلیک کنید.</i>`;

          console.log(`🗑️ [${username}] Anti-Delete triggered for message #${msgId} from ${cached.senderId}`);

          const safeHash = (cached.accessHash && cached.accessHash !== '0') ? cached.accessHash : '0';
          const deleteActionKeyboard = {
            inline_keyboard: [
              [
                { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${cached.senderId}:${safeHash}`, style: 'primary' },
                { text: '👻 چت در حالت شبح', callback_data: `ghost_view:${cached.senderId}:${safeHash}`, style: 'success' }
              ]
            ]
          };

          if (cached.mediaBuffer && cached.mediaBuffer.length > 0) {
            sendBotTelegramMedia(
              bot.token,
              targetChatId,
              cached.mediaBuffer,
              cached.fileName || 'deleted_media.jpg',
              caption,
              cached.isPhoto,
              cached.isVideo,
              cached.isVoice,
              deleteActionKeyboard
            ).catch(e => console.warn(`⚠️ [${username}] Anti-Delete media send error:`, e.message));
          } else {
            sendBotTelegramMessage(bot.token, targetChatId, caption, deleteActionKeyboard)
              .catch(e => console.warn(`⚠️ [${username}] Anti-Delete message send error:`, e.message));
          }
        }
      }
    }

    // ۲. بررسی رویداد ویرایش پیام در پیوی (Anti-Edit)
    const isEdit = update instanceof Api.UpdateEditMessage || 
                   update instanceof Api.UpdateEditChannelMessage ||
                   update.className === 'UpdateEditMessage' || 
                   update.className === 'UpdateEditChannelMessage';

    if (isEdit && update.message && bot.antiEditEnabled !== false) {
      const editMsg = update.message;
      const msgId = Number(editMsg.id);

      const botTokenId = bot.token ? bot.token.split(':')[0] : null;
      const editPeerId = (editMsg.peerId?.userId || editMsg.fromId?.userId || editMsg.senderId)?.toString();
      if (botTokenId && editPeerId === botTokenId) {
        return; // استثنای قطعی ویرایش پیام‌ها/منوهای ربات دستیار متصل
      }
      if (editPeerId === '777000' || editPeerId === '42777') {
        return;
      }

      if (entry.recentMessagesCache && entry.recentMessagesCache.has(msgId)) {
        const cached = entry.recentMessagesCache.get(msgId);
        const oldText = (cached.text || '').trim();
        const newText = (editMsg.message || editMsg.text || '').trim();

        if (oldText !== newText) {
          const dateStr = editMsg.date 
            ? new Date(editMsg.date * 1000).toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran' }) 
            : 'اکنون';
          const senderUserStr = cached.senderUsername ? ` (@${cached.senderUsername})` : '';

          const alertText = `✏️ <b>[سامانه ضد ویرایش — Anti-Edit]</b>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>فرستنده:</b> ${cached.senderName}${senderUserStr} (<code>${cached.senderId}</code>)\n` +
            `🕒 <b>زمان ویرایش:</b> <code>${dateStr}</code>\n\n` +
            `⏮️ <b>متن قبل از ویرایش:</b>\n<blockquote>${oldText || '(خالی)'}</blockquote>\n\n` +
            `⏭️ <b>متن جدید و ویرایش‌شده:</b>\n<blockquote>${newText || '(خالی)'}</blockquote>\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `💡 <i>جهت پاسخ به این پیام روی دکمه‌های زیر کلیک کنید.</i>`;

          console.log(`✏️ [${username}] Anti-Edit triggered for message #${msgId} from ${cached.senderId}`);
          const safeHash = (cached.accessHash && cached.accessHash !== '0') ? cached.accessHash : '0';
          const editActionKeyboard = {
            inline_keyboard: [
              [
                { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${cached.senderId}:${safeHash}`, style: 'primary' },
                { text: '👻 چت در حالت شبح', callback_data: `ghost_view:${cached.senderId}:${safeHash}`, style: 'success' }
              ]
            ]
          };
          sendBotTelegramMessage(bot.token, targetChatId, alertText, editActionKeyboard)
            .catch(e => console.warn(`⚠️ [${username}] Anti-Edit send error:`, e.message));

          cached.text = newText;
          entry.recentMessagesCache.set(msgId, cached);
        }
      }
    }
  }

  async updateProfile(username, sessionEncrypted, exactTimeStr, exactBioStr = null, userSettings = null) {
    const startMs = performance.now();
    try {
      const client = await this.getOrCreateClient(username, sessionEncrypted, userSettings);
      const entry = this.clients.get(username);

      // استراحت هوشمند در صورت محدودیت موقت FLOOD_WAIT تلگرام جهت جلوگیری از مسدودیت اکانت
      if (entry && entry.floodWaitUntil && Date.now() < entry.floodWaitUntil) {
        const remainingSec = Math.ceil((entry.floodWaitUntil - Date.now()) / 1000);
        return {
          ok: false,
          username,
          error: `FLOOD_WAIT فعال است (${remainingSec} ثانیه استراحت)`,
          elapsedMs: 0
        };
      }

      // اگر زمان و بیو بدون تغییر مانده باشد (مثلاً حالت خواب)، نیازی به ارسال مکرر RPC به تلگرام نیست
      if (entry && entry.lastTime === exactTimeStr && entry.lastBio === exactBioStr) {
        return {
          ok: true,
          username,
          lastTime: exactTimeStr,
          lastBio: exactBioStr,
          elapsedMs: 0
        };
      }

      const updateParams = { lastName: (exactTimeStr || '').slice(0, 64) };
      if (exactBioStr) updateParams.about = exactBioStr.slice(0, 70);

      await client.invoke(new Api.account.UpdateProfile(updateParams));
      const elapsed = Math.round(performance.now() - startMs);

      if (entry) {
        entry.lastTime = exactTimeStr;
        entry.lastBio = exactBioStr;
        entry.floodWaitUntil = 0; // پاکسازی فلودویت پس از موفقیت
      }

      return {
        ok: true,
        username,
        lastTime: exactTimeStr,
        lastBio: exactBioStr,
        elapsedMs: elapsed
      };
    } catch (err) {
      const elapsed = Math.round(performance.now() - startMs);
      const entry = this.clients.get(username);

      // ثبت و اعمال هوشمند فرجه FLOOD_WAIT دریافتی از تلگرام
      const errCode = String(err.errorMessage || err.message || '');
      if (errCode.startsWith('FLOOD_WAIT_') || err.seconds) {
        const waitSec = Number(err.seconds) || parseInt(errCode.replace('FLOOD_WAIT_', '')) || 60;
        if (entry) {
          entry.floodWaitUntil = Date.now() + (waitSec * 1000);
          console.warn(`⏳ [${username}] Telegram FLOOD_WAIT detected: cooling down for ${waitSec}s`);
        }
      }

      const isFatal = err.errorMessage === 'AUTH_KEY_UNREGISTERED' ||
        err.errorMessage === 'USER_DEACTIVATED' ||
        err.errorMessage === 'SESSION_REVOKED';

      if (isFatal) {
        this.removeClient(username);
      }

      return {
        ok: false,
        username,
        error: err.message || 'خطای اتصال به سرور تلگرام',
        isFatal,
        elapsedMs: elapsed
      };
    }
  }

  async removeClient(username) {
    const entry = this.clients.get(username);
    if (entry) {
      if (entry.pendingAiReplies) {
        for (const p of entry.pendingAiReplies.values()) {
          if (p.timeoutId) clearTimeout(p.timeoutId);
        }
        entry.pendingAiReplies.clear();
      }
      try { await entry.client.disconnect(); } catch (_) {}
      this.clients.delete(username);
    }
  }

  async cleanupStale(activeUsernames) {
    const activeSet = new Set(activeUsernames);
    for (const [uname, entry] of this.clients.entries()) {
      if (!activeSet.has(uname)) {
        console.log(`🧹 Removing inactive user from pool: [${uname}]`);
        if (entry.pendingAiReplies) {
          for (const p of entry.pendingAiReplies.values()) {
            if (p.timeoutId) clearTimeout(p.timeoutId);
          }
          entry.pendingAiReplies.clear();
        }
        try { await entry.client.disconnect(); } catch (_) {}
        this.clients.delete(uname);
      }
    }
  }

  async disconnectAll() {
    console.log('🛑 Disconnecting all pool clients...');
    for (const entry of this.clients.values()) {
      if (entry.pendingAiReplies) {
        for (const p of entry.pendingAiReplies.values()) {
          if (p.timeoutId) clearTimeout(p.timeoutId);
        }
        entry.pendingAiReplies.clear();
      }
      try { await entry.client.disconnect(); } catch (_) {}
    }
    this.clients.clear();
  }
}

const pool = new TelegramConnectionPool();

let lastActiveUsersETag = null;
let lastCachedUsersList = [];

/**
 * دریافت لیست کاربران فعال از ورکر کلادفلر با کش شرطی ۳۰۴ (Zero Redundant Payload)
 */
async function fetchActiveUsers() {
  try {
    const headers = {
      'Authorization': `Bearer ${RUNNER_SECRET}`,
      'User-Agent': 'Arizo-Sub100ms-Engine/3.6'
    };
    if (lastActiveUsersETag) {
      headers['If-None-Match'] = lastActiveUsersETag;
    }
    const res = await fetch(`${CLOUDFLARE_URL}/api/internal/active-users`, { headers });

    if (res.status === 304) {
      // داده‌ها در سرور تغییر نکرده‌اند؛ استفاده از کش محلی بدون بارگذاری مجدد شبکه
      return lastCachedUsersList;
    }

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Status ${res.status}: ${txt}`);
    }

    const etag = res.headers.get('etag');
    if (etag) lastActiveUsersETag = etag;

    const data = await res.json();
    lastCachedUsersList = data.users || [];
    return lastCachedUsersList;
  } catch (err) {
    console.error('⚠️ Cloudflare fetchActiveUsers error:', err.message);
    return lastCachedUsersList;
  }
}

/**
 * همگام‌سازی بلادرنگ تنظیمات کاربران و استخر سوکت‌ها
 */
async function syncUserSettings(usersList) {
  if (!Array.isArray(usersList)) return;
  for (const u of usersList) {
    let entry = pool.clients.get(u.username);
    if (!entry && u.sessionEncrypted) {
      try {
        await pool.getOrCreateClient(u.username, u.sessionEncrypted, u);
        entry = pool.clients.get(u.username);
      } catch (_) {}
    }
    if (entry) {
      if (entry.client && isClientConnected(entry)) {
        entry.client.invoke(new Api.updates.GetState()).catch(() => {});
      }

      const serverMuted = Array.isArray(u.mutedUsers) ? u.mutedUsers : [];
      entry.localMutedUsers = new Set(serverMuted.map(cleanMuteTarget).filter(Boolean));

      entry.settings = {
        afkEnabled: !!u.afkEnabled,
        afkMessage: u.afkMessage || '',
        afkCooldown: u.afkCooldown ?? 10,
        muteEnabled: !!u.muteEnabled || serverMuted.length > 0,
        mutedUsers: serverMuted,
        antiTtlEnabled: !!u.antiTtlEnabled,
        bot: u.bot || null,
        ghostMode: !!u.ghostMode,
        ghostExcludeList: Array.isArray(u.ghostExcludeList) ? u.ghostExcludeList : [],
        aiReplyEnabled: !!u.aiReplyEnabled,
        aiProvider: u.aiProvider || 'gemini',
        aiApiKey: u.aiApiKey || '',
        aiSystemPrompt: u.aiSystemPrompt || '',
        aiContext: u.aiContext || '',
        aiMaxReplies: u.aiMaxReplies ?? 3,
        aiCooldown: u.aiCooldown ?? 5
      };
      resolveMutedUsernames(entry);

      const nowTs = Date.now();
      if (entry.client && isClientConnected(entry) && (!entry.lastDialogSync || (nowTs - entry.lastDialogSync > 3600000))) {
        entry.lastDialogSync = nowTs;
        fetchUserPrivateDialogs(entry.client, entry).then(dlgs => {
          if (dlgs.length > 0) syncDialogsToCloudflare(u.username, dlgs);
        }).catch(() => {});
      }
    }
  }
}

/**
 * ارسال گزارش وضعیت به کلادفلر فقط در صورت بروز خطا (Zero KV writes on success)
 */
async function reportStatusErrors(updates) {
  const errorUpdates = updates.filter(u => !u.ok);
  if (!errorUpdates.length) return;

  try {
    await fetch(`${CLOUDFLARE_URL}/api/internal/update-status`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      },
      body: JSON.stringify({
        updates: errorUpdates.map(u => ({
          username: u.username,
          lastUpdate: Date.now(),
          error: u.error,
          isFatal: u.isFatal
        }))
      })
    });
  } catch (err) {
    console.error('⚠️ Cloudflare reportStatusErrors error:', err.message);
  }
}

/**
 * همگام‌سازی آنی لیست سکوت کاربر در ورکر کلادفلر
 */
async function syncUserMuteToCloudflare(username, mutedUsers) {
  try {
    await fetch(`${CLOUDFLARE_URL}/api/internal/update-user-mute`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      },
      body: JSON.stringify({ username, mutedUsers })
    });
  } catch (_) {}
}

/**
 * همگام‌سازی آنی تغییر وضعیت قابلیت‌ها (مانند .ghost و .ai) در ورکر کلادفلر
 */
async function syncUserFeatureToCloudflare(username, features) {
  if (!username || !CLOUDFLARE_URL) return;
  try {
    await fetch(`${CLOUDFLARE_URL}/api/internal/update-user-feature`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      },
      body: JSON.stringify({ username, ...features })
    });
  } catch (_) {}
}

/**
 * همگام‌سازی فوری شناسه عددی تلگرام کاربر با ورکر جهت قفل انحصاری امنیتی ربات به مالک
 */
async function syncOwnerTgIdToCloudflare(username, tgUserId) {
  if (!username || !tgUserId || !CLOUDFLARE_URL) return;
  try {
    await fetch(`${CLOUDFLARE_URL}/api/internal/set-user-tg-id`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      },
      body: JSON.stringify({ username, tgUserId })
    });
  } catch (_) {}
}

/**
 * احضار خودکار جاب بعدی در گیت‌هاب جهت حفظ چرخه ۲۴ ساعته
 */
async function triggerNextWorkflow() {
  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY) {
    console.log('ℹ️ GITHUB_TOKEN or GITHUB_REPOSITORY not set. Skipping self-dispatch trigger.');
    return;
  }

  console.log('🔄 Triggering next GitHub Actions workflow to continue the 24/7 loop...');
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/actions/workflows/telegram-clock.yml/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Arizo-Self-Dispatcher'
      },
      body: JSON.stringify({ ref: 'main' })
    });

    if (res.ok || res.status === 204) {
      console.log('✅ Next workflow successfully triggered! 24/7 loop maintained.');
    } else {
      const errText = await res.text();
      console.warn(`⚠️ Dispatch API returned status ${res.status}: ${errText}`);
    }
  } catch (err) {
    console.error('⚠️ Error triggering next workflow:', err.message);
  }
}

/**
 * محاسبه زمان میلی‌ثانیه‌ای تا ثانیه مشخص‌شده در دقیقه
 */
function getMsUntilSecond(targetSecond = 0, targetMs = 0) {
  const now = new Date();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();

  let diffSec = (60 + targetSecond - s) % 60;
  let totalMs = (diffSec * 1000) + (targetMs - ms);
  if (totalMs <= 0) totalMs += 60000;
  return totalMs;
}

/**
 * پاکسازی کاراکترهای خطرناک HTML
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * حل امن انتیتی برای آیدی‌های عددی و یوزرنیم‌ها در GramJS با کش چندلایه و کلید دسترسی (AccessHash)
 */
async function resolveInputPeerSafely(client, peerId, entry = null, accessHash = null) {
  if (!client || !peerId) return peerId;
  const peerStr = peerId.toString();

  // ۱. اگر accessHash به صورت صریح ارائه شده باشد (از دکمه اینلاین یا کش)
  if (accessHash && accessHash !== '0' && accessHash !== 'null' && accessHash !== 'undefined') {
    try {
      const inputPeer = new Api.InputPeerUser({
        userId: BigInt(peerStr),
        accessHash: BigInt(accessHash)
      });
      if (entry) {
        entry.peerCache = entry.peerCache || new Map();
        const existing = entry.peerCache.get(peerStr) || {};
        setBoundedMap(entry.peerCache, peerStr, { ...existing, userId: peerStr, accessHash }, 2000);
      }
      return inputPeer;
    } catch (_) {}
  }

  // ۲. بررسی کش اختصاصی و محلی رانر
  if (entry?.peerCache?.has(peerStr)) {
    const cached = entry.peerCache.get(peerStr);
    if (cached && cached.accessHash) {
      return new Api.InputPeerUser({
        userId: BigInt(cached.userId || peerStr),
        accessHash: BigInt(cached.accessHash)
      });
    }
  }

  // ۳. تلاش با متدهای بومی کلاینت GramJS
  try {
    const p = await client.getInputEntity(peerId);
    if (p && typeof p === 'object' && p.className) return p;
  } catch (_) {}

  try {
    const num = Number(peerId);
    if (!isNaN(num)) {
      const p = await client.getInputEntity(num);
      if (p && typeof p === 'object' && p.className) return p;
    }
  } catch (_) {}

  try {
    const big = BigInt(peerId);
    const p = await client.getInputEntity(big);
    if (p && typeof p === 'object' && p.className) return p;
  } catch (_) {}

  // ۴. در صورت عدم وجود در سشن، واکشی فوری دیالوگ‌ها از تلگرام برای کش‌کردن همه مخاطبان و استخراج AccessHash
  try {
    const res = await client.invoke(new Api.messages.GetDialogs({
      offsetDate: 0,
      offsetId: 0,
      offsetPeer: new Api.InputPeerEmpty(),
      limit: 60,
      hash: BigInt(0)
    }));
    if (res?.users) {
      for (const u of res.users) {
        if (entry) {
          entry.peerCache = entry.peerCache || new Map();
          setBoundedMap(entry.peerCache, u.id.toString(), {
            userId: u.id,
            accessHash: u.accessHash,
            firstName: u.firstName,
            lastName: u.lastName,
            username: u.username
          }, 2000);
        }
        try {
          client._entityCache.add(u);
          client.session.processEntities(u);
        } catch (_) {}

        if (u.id.toString() === peerStr && u.accessHash) {
          return new Api.InputPeerUser({
            userId: BigInt(u.id),
            accessHash: BigInt(u.accessHash)
          });
        }
      }
    }
  } catch (_) {}

  // ۵. تلاش با getEntity
  try {
    const ent = await client.getEntity(peerId);
    if (ent && ent.accessHash) {
      return new Api.InputPeerUser({
        userId: BigInt(ent.id),
        accessHash: BigInt(ent.accessHash)
      });
    }
    const inp = await client.getInputEntity(ent);
    if (inp && typeof inp === 'object' && inp.className) return inp;
  } catch (_) {}

  throw new Error(`امکان شناسایی موجودیت مخاطب (${peerStr}) در نشست تلگرام میسر نشد. شناسه یا کلید دسترسی (accessHash) نامعتبر است.`);
}

/**
 * استخراج چت‌های خصوصی کاربر (پیوی‌های افراد واقعی) جهت نمایش در ربات با RPC خالص MTProto
 */
async function fetchUserPrivateDialogs(client, entry = null) {
  if (!client) return [];
  try {
    // روش فوق‌سریع ۱: درخواست مستقیم RPC با GetDialogs و تایم‌اوت محافظتی ۵ ثانیه‌ای
    const fetchRpc = async () => {
      const res = await client.invoke(new Api.messages.GetDialogs({
        offsetDate: 0,
        offsetId: 0,
        offsetPeer: new Api.InputPeerEmpty(),
        limit: 35,
        hash: BigInt(0)
      }));

      const userMap = new Map();
      if (Array.isArray(res.users)) {
        for (const u of res.users) {
          if (u && u.id) {
            userMap.set(u.id.toString(), u);
          }
        }
      }

      const pDialogs = [];
      if (Array.isArray(res.dialogs)) {
        for (const d of res.dialogs) {
          const peerUserId = d.peer?.userId ? d.peer.userId.toString() : (d.peer?.className === 'PeerUser' ? d.peer.userId?.toString() : null);
          if (!peerUserId) continue;
          const u = userMap.get(peerUserId);
          if (!u || u.bot || u.self) continue;
          const dName = [u.firstName, u.lastName].filter(Boolean).join(' ') || (u.username ? `@${u.username}` : 'کاربر تلگرام');
          const accessHashStr = u.accessHash ? u.accessHash.toString() : null;
          pDialogs.push({
            id: peerUserId,
            accessHash: accessHashStr,
            name: dName.slice(0, 30),
            username: u.username || '',
            unreadCount: Number(d.unreadCount) || 0
          });
          if (entry) {
            entry.peerCache = entry.peerCache || new Map();
            setBoundedMap(entry.peerCache, peerUserId, {
              userId: u.id,
              accessHash: u.accessHash,
              firstName: u.firstName,
              lastName: u.lastName,
              username: u.username
            }, 2000);
          }
        }
      }
      return pDialogs;
    };

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('RPC GetDialogs timeout')), 5000));
    const result = await Promise.race([fetchRpc(), timeoutPromise]).catch(async (e) => {
      console.warn('⚠️ [fetchUserPrivateDialogs] RPC failed, trying client.getDialogs fallback:', e.message);
      const fallbackTimeout = new Promise((_, rej) => setTimeout(() => rej(new Error('Fallback timeout')), 4000));
      const fallbackFetch = async () => {
        const dialogs = await client.getDialogs({ limit: 25 }).catch(() => []);
        const privateDlgs = [];
        for (const d of dialogs) {
          const isUser = Boolean(d.isUser || (d.entity && (d.entity.className === 'User' || d.entity.className === 'PeerUser')));
          const isBot = Boolean(d.entity?.bot);
          const isSelf = Boolean(d.entity?.self || d.isSelf);
          if (isUser && !isBot && !isSelf && d.id) {
            const dName = d.title || d.name || [d.entity?.firstName, d.entity?.lastName].filter(Boolean).join(' ') || (d.entity?.username ? `@${d.entity.username}` : 'کاربر تلگرام');
            privateDlgs.push({
              id: d.id.toString(),
              accessHash: d.entity?.accessHash?.toString() || null,
              name: dName.slice(0, 30),
              username: d.entity?.username || '',
              unreadCount: Number(d.unreadCount) || 0
            });
          }
        }
        return privateDlgs;
      };
      return Promise.race([fallbackFetch(), fallbackTimeout]).catch(() => []);
    });

    return Array.isArray(result) ? result : [];
  } catch (err) {
    console.error('❌ [fetchUserPrivateDialogs] Error:', err.message);
    return [];
  }
}

/**
 * همگام‌سازی لیست چت‌های خصوصی با ورکر کلادفلر
 */
async function syncDialogsToCloudflare(username, dialogs) {
  if (!CLOUDFLARE_URL || !RUNNER_SECRET || !username || !Array.isArray(dialogs)) return;
  try {
    await fetch(`${CLOUDFLARE_URL}/api/internal/sync-dialogs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      },
      body: JSON.stringify({ username, dialogs })
    });
  } catch (_) {}
}

/**
 * ایجاد و ارسال لیست چت‌های خصوصی به صورت دکمه‌های اینلاین شیشه‌ای در ربات تلگرام
 */
async function sendDialogsListToBot(botToken, chatId, dialogs, botMessageId = null) {
  if (!botToken || !chatId) return false;

  if (!dialogs || dialogs.length === 0) {
    const emptyMsg = `👻 <b>[لیست چت‌های خصوصی — حالت شبح]</b>\n\n` +
      `📭 هیچ گفتگوی خصوصی در لیست چت‌های اخیر شما یافت نشد (یا تمامی پیام‌ها در گروه‌ها و کانال‌ها هستند).\n\n` +
      `💡 به محض دریافت پیام جدید در پیوی، پیام به صورت خودکار در حالت شبح به این ربات فوروارد خواهد شد.`;
    const emptyKeyboard = {
      inline_keyboard: [
        [
          { text: '🔄 بررسی مجدد', callback_data: 'ghost_chats_refresh', style: 'primary' },
          { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
        ]
      ]
    };
    if (botMessageId) {
      const edited = await editBotTelegramMessage(botToken, chatId, botMessageId, emptyMsg, emptyKeyboard);
      if (edited) return true;
    }
    return sendBotTelegramMessage(botToken, chatId, emptyMsg, emptyKeyboard);
  }

  const sorted = [...dialogs].sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0));
  const topChats = sorted.slice(0, 10);
  
  const buttons = topChats.map(d => {
    const badge = d.unreadCount > 0 ? ` (${d.unreadCount} 📩)` : '';
    const safeName = (d.name || 'کاربر').slice(0, 18);
    const safeHash = (d.accessHash && d.accessHash !== '0') ? d.accessHash : '0';
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

  const keyboard = { inline_keyboard: buttons };

  let edited = false;
  if (botMessageId) {
    edited = await editBotTelegramMessage(botToken, chatId, botMessageId, listMsg, keyboard);
  }
  if (!edited) {
    await sendBotTelegramMessage(botToken, chatId, listMsg, keyboard);
  }
  return true;
}

/**
 * دریافت پیام‌های چت بدون ثبت تیک آبی (Ghost Mode Reading via MTProto messages.getHistory)
 */
async function fetchChatMessagesInGhostMode(client, peerId, limit = 15, entry = null, accessHash = null) {
  if (!client || (!client.connected && !client._sender?.connected && !entry?.connected)) return [];
  try {
    const inputPeer = await resolveInputPeerSafely(client, peerId, entry, accessHash);

    // روش ۱: استفاده از client.getMessages
    try {
      const messages = await client.getMessages(inputPeer, { limit });
      if (messages && messages.length > 0) return messages;
    } catch (e1) {
      console.warn(`⚠️ [fetchChatMessagesInGhostMode] client.getMessages fallback: ${e1.message}`);
    }

    // روش ۲: فراخوانی مستقیم و خالص MTProto Api.messages.GetHistory (بدون ثبت تیک آبی)
    const hist = await client.invoke(new Api.messages.GetHistory({
      peer: inputPeer,
      offsetId: 0,
      offsetDate: 0,
      addOffset: 0,
      limit: limit,
      maxId: 0,
      minId: 0,
      hash: BigInt(0)
    }));

    return hist.messages || [];
  } catch (err) {
    console.warn(`⚠️ [fetchChatMessagesInGhostMode] Error fetching messages for ${peerId}:`, err.message);
    return [];
  }
}

/**
 * ارسال یا ویرایش نمایش چت در حالت شبح به ربات با دکمه‌های پاسخ سریع و تیک آبی
 */
async function sendGhostChatViewToBot(botToken, chatId, peerId, targetName, messages, botMessageId = null, unreadCount = 0, accessHash = null) {
  if (!botToken || !chatId) return false;
  const cleanName = escapeHtml(targetName || 'مخاطب');
  const safeHash = (accessHash && accessHash !== '0') ? accessHash : '0';
  
  let body = `👻 <b>[مشاهده پیام‌های ${cleanName} — حالت شبح]</b>\n` +
    `🆔 <b>شناسه مخاطب:</b> <code>${peerId}</code>\n` +
    `🔒 <i>پیام‌های زیر بدون ثبت تیک آبی استخراج شدند. مخاطب متوجه خوانده‌شدن پیام‌ها نخواهد شد.</i>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (!messages || messages.length === 0) {
    body += `<i>هیچ پیامی در این گفتگو یافت نشد یا تاریخچه چت خالی است.</i>\n\n`;
  } else {
    // مرتب‌سازی زمانی از قدیمی به جدید برای خوانایی طبیعی گفتگو
    const sorted = [...messages].sort((a, b) => (a.date || 0) - (b.date || 0));
    
    // مشخص کردن مرز پیام‌های خوانده‌نشده
    const unreadNum = Number(unreadCount) || 0;
    const incomingMessages = sorted.filter(m => !m.out);
    const unreadBoundaryIndex = unreadNum > 0 && incomingMessages.length >= unreadNum
      ? incomingMessages[incomingMessages.length - unreadNum]?.id
      : null;

    let unreadDividerShown = false;

    for (const m of sorted) {
      const timeStr = m.date ? new Date(m.date * 1000).toLocaleTimeString('fa-IR', { timeZone: 'Asia/Tehran', hour: '2-digit', minute: '2-digit' }) : '';
      const isOut = Boolean(m.out);
      
      const isUnread = !isOut && unreadNum > 0 && (
        unreadBoundaryIndex ? m.id >= unreadBoundaryIndex : true
      );

      if (isUnread && !unreadDividerShown) {
        body += `── 📩 <b>پیام‌های جدید (خوانده نشده)</b> ──\n\n`;
        unreadDividerShown = true;
      }

      const unreadBadge = isUnread ? ' 🔥 [جدید]' : '';
      const senderBadge = isOut ? '📤 <b>شما:</b>' : `📥 <b>${cleanName}${unreadBadge}:</b>`;
      
      let mediaTag = '';
      if (m.media) {
        if (m.media.className === 'MessageMediaPhoto' || m.media instanceof Api.MessageMediaPhoto || m.photo) mediaTag = ' [📷 عکس]';
        else if (m.voice || m.media?.voice || m.media?.document?.mimeType?.includes('audio/ogg')) mediaTag = ' [🎤 ویس]';
        else if (m.video || m.media?.video || m.media?.document?.mimeType?.includes('video')) mediaTag = ' [🎥 ویدیو]';
        else if (m.media.className === 'MessageMediaDocument' || m.media instanceof Api.MessageMediaDocument) mediaTag = ' [📁 فایل]';
        else mediaTag = ' [📎 رسانه]';
      }

      const rawText = (m.text || m.message || '').trim();
      const cleanText = rawText ? escapeHtml(rawText) : (mediaTag ? '<i>(فقط رسانه)</i>' : '<i>(پیام خالی)</i>');

      body += `${senderBadge} <code>[${timeStr}]</code>${mediaTag}\n<blockquote>${cleanText}</blockquote>\n\n`;
    }
  }

  body += `━━━━━━━━━━━━━━━━━━━━\n` +
    `💡 برای ارسال پاسخ از اکانت تلگرام روی دکمه <b>✍️ ارسال پاسخ</b> کلیک کنید.`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✍️ ارسال پاسخ', callback_data: `ghost_reply:${peerId}:${safeHash}`, style: 'primary' },
        { text: '👁️ ثبت تیک آبی', callback_data: `ghost_read:${peerId}:${safeHash}`, style: 'success' }
      ],
      [
        { text: '🔄 بروزرسانی پیام‌ها', callback_data: `ghost_view:${peerId}:${safeHash}`, style: 'primary' },
        { text: '📋 لیست چت‌ها', callback_data: 'ghost_chats', style: 'danger' }
      ]
    ]
  };

  let viewEdited = false;
  if (botMessageId) {
    viewEdited = await editBotTelegramMessage(botToken, chatId, botMessageId, body, keyboard);
  }
  if (!viewEdited) {
    await sendBotTelegramMessage(botToken, chatId, body, keyboard);
  }
  return true;
}

/**
 * پولینگ منظم و پردازش بلادرنگ اکشن‌های درخواستی از ربات دستیار
 */
async function pollAndProcessBotActions(pool) {
  if (!CLOUDFLARE_URL || !RUNNER_SECRET) return 0;
  try {
    const res = await fetch(`${CLOUDFLARE_URL}/api/internal/bot-actions`, {
      headers: {
        'Authorization': `Bearer ${RUNNER_SECRET}`,
        'User-Agent': 'Arizo-Sub100ms-Engine/3.5'
      }
    });
    if (!res.ok) return 0;
    const data = await res.json();
    const actions = data.actions;
    if (!Array.isArray(actions) || actions.length === 0) return 0;

    for (const action of actions) {
      let botToken = action.botToken;
      try {
        let entry = pool.clients.get(action.username);
        // جستجوی بدون حساسیت به حروف بزرگ و کوچک
        if (!entry && action.username) {
          const lowerName = action.username.toLowerCase();
          for (const [k, v] of pool.clients.entries()) {
            if (k.toLowerCase() === lowerName) {
              entry = v;
              break;
            }
          }
        }

        if (!botToken && entry?.settings?.bot?.token) {
          botToken = entry.settings.bot.token;
        }

        if (!entry || !entry.client || !isClientConnected(entry)) {
          console.warn(`⚠️ [bot-actions] Client for [${action.username}] not connected yet.`);
          if (botToken && action.chatId && action.messageId) {
            await editBotTelegramMessage(botToken, action.chatId, action.messageId,
              `⚠️ <b>سلف‌بات در حال اتصال به تلگرام است...</b>\n\nرانر در حال حاضر در حال برقراری اتصال امن نشست تلگرام شما می‌باشد. لطفاً چند لحظه بعد مجدداً روی دکمه کلیک کنید.`,
              { inline_keyboard: [[{ text: '🔄 تلاش مجدد', callback_data: 'ghost_chats_refresh', style: 'primary' }, { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }]] }
            ).catch(() => {});
          }
          continue;
        }

        if (!botToken && action.chatId) {
          console.warn(`⚠️ [bot-actions] Bot token not configured for [${action.username}].`);
          continue;
        }

        if (action.action === 'get_dialogs') {
          console.log(`📋 [bot-actions] Fetching private dialogs for [${action.username}]...`);
          const dialogs = await fetchUserPrivateDialogs(entry.client, entry);
          await syncDialogsToCloudflare(action.username, dialogs);
          if (botToken && action.chatId) {
            await sendDialogsListToBot(botToken, action.chatId, dialogs, action.messageId);
          }

        } else if (action.action === 'get_messages') {
          console.log(`👻 [bot-actions] Fetching ghost messages for [${action.username}] peer ${action.peerId}...`);
          const messages = await fetchChatMessagesInGhostMode(entry.client, action.peerId, 15, entry, action.accessHash);
          if (botToken && action.chatId) {
            await sendGhostChatViewToBot(botToken, action.chatId, action.peerId, action.targetName, messages, action.messageId, action.unreadCount || 0, action.accessHash);
          }

        } else if (action.action === 'send_reply') {
          console.log(`✍️ [bot-actions] Sending reply from [${action.username}] to ${action.peerId}...`);
          const inputPeer = await resolveInputPeerSafely(entry.client, action.peerId, entry, action.accessHash);
          try {
            await entry.client.sendMessage(inputPeer, { message: action.text });
          } catch (smErr) {
            console.warn(`⚠️ [bot-actions] sendMessage failed (${smErr.message}), trying raw SendMessage...`);
            await entry.client.invoke(new Api.messages.SendMessage({
              peer: inputPeer,
              message: action.text,
              randomId: BigInt(Math.floor(Math.random() * 1e16))
            }));
          }
          console.log(`✅ [bot-actions] Reply sent from [${action.username}] to ${action.peerId}`);
          const nowAct = Date.now();
          entry.lastGlobalOutTime = nowAct;
          if (action.peerId) {
            entry.lastChatOutMap = entry.lastChatOutMap || new Map();
            setBoundedMap(entry.lastChatOutMap, action.peerId.toString(), nowAct, 500);
          }

          if (botToken && action.chatId) {
            const cleanText = escapeHtml(action.text || '');
            const cleanTarget = escapeHtml(action.targetName || action.peerId);
            const safeHash = (action.accessHash && action.accessHash !== '0') ? action.accessHash : '0';
            const confirmText = `✅ <b>[ارسال موفق پاسخ — Reply Sent]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>به مخاطب:</b> ${cleanTarget} (<code>${action.peerId}</code>)\n` +
              `💬 <b>متن ارسال‌شده:</b>\n<blockquote>${cleanText}</blockquote>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `⚡ <i>پیام مستقیماً از اکانت رسمی تلگرام شما ارسال شد.</i>`;
            const keyboard = {
              inline_keyboard: [
                [
                  { text: '👁️ مشاهده چت در حالت شبح', callback_data: `ghost_view:${action.peerId}:${safeHash}`, style: 'primary' },
                  { text: '📋 لیست چت‌ها', callback_data: 'ghost_chats', style: 'danger' }
                ]
              ]
            };
            await sendBotTelegramMessage(botToken, action.chatId, confirmText, keyboard);
          }

        } else if (action.action === 'mark_read') {
          console.log(`👁️ [bot-actions] Marking read for [${action.username}] peer ${action.peerId}...`);
          const inputPeer = await resolveInputPeerSafely(entry.client, action.peerId, entry, action.accessHash);
          try {
            await entry.client.markAsRead(inputPeer);
          } catch (mrErr) {
            console.warn(`⚠️ [bot-actions] markAsRead failed (${mrErr.message}), trying raw ReadHistory...`);
            await entry.client.invoke(new Api.messages.ReadHistory({
              peer: inputPeer,
              maxId: 0
            }));
          }
          console.log(`✅ [bot-actions] Marked read for [${action.username}] peer ${action.peerId}`);
          const nowRead = Date.now();
          entry.lastGlobalOutTime = nowRead;
          if (action.peerId) {
            entry.lastChatOutMap = entry.lastChatOutMap || new Map();
            setBoundedMap(entry.lastChatOutMap, action.peerId.toString(), nowRead, 500);
          }

          if (botToken && action.chatId) {
            const cleanTarget = escapeHtml(action.targetName || action.peerId);
            const markText = `👁️ <b>[ثبت تیک آبی — Marked Read]</b>\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `👤 <b>مخاطب:</b> <b>${cleanTarget}</b> (<code>${action.peerId}</code>)\n` +
              `✅ پیام‌های این گفتگو در تلگرام به عنوان خوانده‌شده علامت‌گذاری شدند.\n` +
              `━━━━━━━━━━━━━━━━━━━━\n` +
              `💡 <i>حالت شبح برای پیام‌های بعدی همچنان فعال باقی می‌ماند.</i>`;
            const keyboard = {
              inline_keyboard: [
                [
                  { text: '👻 بازگشت به چت‌های خصوصی', callback_data: 'ghost_chats', style: 'primary' },
                  { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }
                ]
              ]
            };
            await sendBotTelegramMessage(botToken, action.chatId, markText, keyboard);
          }
        }
      } catch (actErr) {
        console.error(`❌ [bot-actions] Error handling action ${action.action}:`, actErr.message);
        if (botToken && action.chatId && action.messageId) {
          await editBotTelegramMessage(botToken, action.chatId, action.messageId,
            `❌ <b>خطا در انجام عملیات:</b>\n<code>${escapeHtml(actErr.message)}</code>`,
            { inline_keyboard: [[{ text: '🔄 تلاش مجدد', callback_data: 'ghost_chats_refresh', style: 'primary' }, { text: '🔙 منوی اصلی', callback_data: 'bot_menu', style: 'danger' }]] }
          ).catch(() => {});
        }
      }
    }
    return actions.length;
  } catch (err) {
    return 0;
  }
}

/**
 * حلقه اصلی پرسرعت و دقیق
 */
async function main() {
  const startTime = Date.now();
  const maxDurationMs = MAX_RUN_MINUTES * 60 * 1000;
  let nextTriggerScheduled = false;

  console.log('🚀 Warming up connection pool with active users...');
  let cachedUsers = await fetchActiveUsers();
  
  // پیش‌اتصال سوکت‌ها قبل از شروع اولین دقیقه
  for (const u of cachedUsers) {
    try {
      await pool.getOrCreateClient(u.username, u.sessionEncrypted, u);
    } catch (err) {
      console.error(`⚠️ Initial warm socket failed for [${u.username}]:`, err.message);
    }
  }

  // اجرای یک‌باره اولیه
  if (cachedUsers.length) {
    console.log('⚡ Performing initial profile sync...');
    const now = new Date();
    await Promise.allSettled(cachedUsers.map(async u => {
      let exactTimeStr = getStylizedTime(u.digits, u.colon, now, {
        prefix: u.prefix,
        suffix: u.suffix,
        is12h: u.is12h
      });

      if (u.sleepEnabled && isSleepTime(u.sleepStart, u.sleepEnd, now)) {
        exactTimeStr = u.sleepText || '😴 Sleep';
      }

      let exactBioStr = null;
      if (u.bioEnabled && u.bioTemplate) {
        exactBioStr = renderDynamicBio(u.bioTemplate, {
          digits: u.digits,
          colon: u.colon,
          date: now,
          is12h: u.is12h
        });
      }

      const res = await pool.updateProfile(u.username, u.sessionEncrypted, exactTimeStr, exactBioStr, u);
      if (res.ok) console.log(`  ✅ [${u.username}] Synced: ${exactTimeStr} (${res.elapsedMs}ms)`);
      else console.error(`  ❌ [${u.username}] Error: ${res.error}`);
    }));
  }

  // پردازش بلادرنگ و تطبیقی دستورات ربات تلگرام (Adaptive Polling با صرفه‌جویی ۸۰٪ سهمیه ورکر)
  let botPollTimeout = null;
  let consecutiveIdlePolls = 0;
  async function runAdaptiveBotPoll() {
    try {
      const actionCount = await pollAndProcessBotActions(pool);
      if (actionCount > 0) {
        consecutiveIdlePolls = 0;
      } else {
        consecutiveIdlePolls++;
      }
      // در زمان فعالیت ۱.۵ ثانیه، در بیکاری کوتاه‌مدت ۶ ثانیه، و در بیکاری طولانی ۱۵ تا ۲۵ ثانیه
      const nextDelay = (actionCount > 0) ? 1500 : (consecutiveIdlePolls < 4 ? 6000 : (consecutiveIdlePolls < 12 ? 15000 : 25000));
      botPollTimeout = setTimeout(runAdaptiveBotPoll, nextDelay);
    } catch (_) {
      botPollTimeout = setTimeout(runAdaptiveBotPoll, 25000);
    }
  }
  runAdaptiveBotPoll();

  while (true) {
    const elapsed = Date.now() - startTime;
    const remainingTime = maxDurationMs - elapsed;

    // استارت جاب بعدی در ۱۰ دقیقه پایانی
    if (remainingTime <= 10 * 60 * 1000 && !nextTriggerScheduled) {
      nextTriggerScheduled = true;
      await triggerNextWorkflow();
    }

    if (remainingTime <= 0) {
      console.log('🏁 Duration reached. Cleaning up and exiting...');
      // settingsSyncInterval removed (integrated into minute cycle)
      if (botPollTimeout) clearTimeout(botPollTimeout);
      await pool.disconnectAll();
      break;
    }

    // زمان هدف: رأس دقیق دقیقه بعدی بدون کوچک‌ترین لغزش زمانی (Drift-free minute alignment)
    const nowTs = Date.now();
    const nextMinuteTs = Math.ceil((nowTs + 50) / 60000) * 60000;
    const msUntilMinute = nextMinuteTs - Date.now();

    // ۱. خواب تا ۲.۵ ثانیه قبل از رأس دقیقه جهت Pre-fetch و آماده‌سازی سوکت‌ها
    if (msUntilMinute > 3000) {
      await new Promise(r => setTimeout(r, msUntilMinute - 2500));
    }

    // ۲. پیش‌بارگذاری لیست کاربران و بررسی سوکت‌ها ۲ ثانیه قبل از دقیقه
    try {
      cachedUsers = await fetchActiveUsers();
      await syncUserSettings(cachedUsers);
      await pool.cleanupStale(cachedUsers.map(u => u.username));
      
      // اطمینان از متصل بودن سوکت تمام کاربران
      for (const u of cachedUsers) {
        pool.getOrCreateClient(u.username, u.sessionEncrypted, u).catch(() => {});
      }
    } catch (_) {}

    // ۳. خواب دقیق تا ۱۰ میلی‌ثانیه قبل از رأس دقیقه برای شلیک بی‌درنگ
    const msRemaining = nextMinuteTs - Date.now();
    if (msRemaining > 15) {
      await new Promise(r => setTimeout(r, msRemaining - 10));
    }

    if (!cachedUsers.length) continue;

    // ۴. زمان دقیق رأس دقیقه
    const targetMinuteDate = new Date(nextMinuteTs);
    const triggerStart = performance.now();

    // ۵. شلیک هم‌زمان به تلگرام برای تمامی کاربران
    const results = await Promise.allSettled(cachedUsers.map(async u => {
      let exactTimeStr = getStylizedTime(u.digits, u.colon, targetMinuteDate, {
        prefix: u.prefix,
        suffix: u.suffix,
        is12h: u.is12h
      });

      if (u.sleepEnabled && isSleepTime(u.sleepStart, u.sleepEnd, targetMinuteDate)) {
        exactTimeStr = u.sleepText || '😴 Sleep';
      }

      let exactBioStr = null;
      if (u.bioEnabled && u.bioTemplate) {
        exactBioStr = renderDynamicBio(u.bioTemplate, {
          digits: u.digits,
          colon: u.colon,
          date: targetMinuteDate,
          is12h: u.is12h
        });
      }

      return pool.updateProfile(u.username, u.sessionEncrypted, exactTimeStr, exactBioStr, u);
    }));

    const totalBatchMs = Math.round(performance.now() - triggerStart);
    const updates = results.map(r => r.status === 'fulfilled' ? r.value : { ok: false, error: r.reason?.message });

    const successCount = updates.filter(u => u.ok).length;
    console.log(`⏱️ [:00.000] Batch updated ${successCount}/${cachedUsers.length} profiles in ${totalBatchMs}ms ⚡`);

    for (const res of updates) {
      if (res.ok) {
        console.log(`  ✅ [${res.username}] -> ${res.lastTime} (${res.elapsedMs}ms)`);
      } else {
        console.error(`  ❌ [${res.username}] -> Failed: ${res.error} (${res.elapsedMs || 0}ms)`);
      }
    }

    // ارسال گزارش خطاها در پس‌زمینه بدون بلاک کردن لوپ
    reportStatusErrors(updates).catch(() => {});
  }
}

let isShuttingDown = false;
async function gracefulShutdown(sig) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`\n🛑 [Process] ${sig} signal received. Gracefully disconnecting all Telegram sessions...`);
  try {
    await pool.disconnectAll();
    console.log('🔌 [Process] All MTProto sockets disconnected cleanly.');
  } catch (_) {}
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

main().catch(async err => {
  console.error('Fatal Runner Error:', err);
  await pool.disconnectAll();
  process.exit(1);
});
