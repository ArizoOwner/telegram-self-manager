export function panelHTML(env, options = {}) {
  const autoOpenAdmin = !!(options && options.autoOpenAdmin);
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>⚡ Arizo Self | سامانه مدیریت نمایه و ابزارهای ارتباطی تلگرام</title>
  <meta name="color-scheme" content="dark light">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Vazirmatn:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3E%3Cdefs%3E%3ClinearGradient%20id='bg'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3E%3Cstop%20offset='0%25'%20stop-color='%230f172a'/%3E%3Cstop%20offset='50%25'%20stop-color='%231e1b4b'/%3E%3Cstop%20offset='100%25'%20stop-color='%23090d16'/%3E%3C/linearGradient%3E%3ClinearGradient%20id='neon'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3E%3Cstop%20offset='0%25'%20stop-color='%2338bdf8'/%3E%3Cstop%20offset='50%25'%20stop-color='%23818cf8'/%3E%3Cstop%20offset='100%25'%20stop-color='%23c084fc'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect%20width='64'%20height='64'%20rx='16'%20fill='url(%23bg)'/%3E%3Crect%20x='2'%20y='2'%20width='60'%20height='60'%20rx='14'%20fill='none'%20stroke='url(%23neon)'%20stroke-width='2'%20opacity='0.6'/%3E%3Cpath%20d='M35%208%20L18%2034%20L31%2034%20L27%2056%20L46%2028%20L33%2028%20Z'%20fill='url(%23neon)'/%3E%3C/svg%3E">
  <link rel="alternate icon" href="/favicon.ico">
  
  <script defer src="https://telegram.org/js/telegram-web-app.js"></script>
  <script>
    window.START_IN_ADMIN = ${autoOpenAdmin ? 'true' : 'false'};
    // ⚡ Anti-FOUC Theme & Language Initializer & Telegram WebApp SSO
    (function() {
      try {
        var savedTheme = localStorage.getItem('arizo_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        var savedLang = localStorage.getItem('arizo_lang') || 'fa';
        document.documentElement.setAttribute('lang', savedLang);
        document.documentElement.setAttribute('dir', savedLang === 'en' ? 'ltr' : 'rtl');

        var urlParams = new URLSearchParams(window.location.search);
        var ssoToken = urlParams.get('token');
        if (ssoToken) {
          localStorage.setItem('selfbot_token', ssoToken);
          localStorage.setItem('arizo_token', ssoToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.ready();
          window.Telegram.WebApp.expand();
        }
      } catch(e) {}
    })();
  </script>

    <style>
    /* ==========================================================================
       💎 Arizo Self Studio — Next-Gen Neo-Glass Design System & Aesthetics
       ========================================================================== */

    /* 🎨 متغیرهای جامع پالت رنگی پیشرفته (تم روز و شب) */
    :root, [data-theme="dark"] {
      --bg-dark: #070913;
      --bg-surface: rgba(14, 18, 38, 0.76);
      --bg-surface-elevated: rgba(22, 28, 58, 0.88);
      --bg-surface-hover: rgba(28, 35, 72, 0.92);
      --bg-input: rgba(6, 8, 20, 0.65);
      
      --border-subtle: rgba(255, 255, 255, 0.09);
      --border-specular: rgba(255, 255, 255, 0.2);
      --border-focus: rgba(168, 85, 247, 0.65);
      --border-glow: rgba(168, 85, 247, 0.4);
      --glow-ambient: 0 0 35px -5px rgba(139, 92, 246, 0.3);
      
      --primary: #8b5cf6;
      --primary-hover: #7c3aed;
      --primary-active: #6d28d9;
      --accent: #06b6d4;
      
      --gradient-brand: linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #3b82f6 100%);
      --gradient-brand-hover: linear-gradient(135deg, #b86bf8 0%, #7579f3 50%, #4f92f8 100%);
      --gradient-accent: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%);
      --gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
      --gradient-gold-hover: linear-gradient(135deg, #fcd34d 0%, #fbbf24 50%, #f59e0b 100%);
      --gradient-btn: linear-gradient(135deg, #9333ea 0%, #6366f1 100%);
      --gradient-admin: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
      --gradient-rose: linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #e11d48 100%);
      --gradient-green: linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%);
      --shimmer-glow: rgba(255, 255, 255, 0.38);
      
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;

      --accent-purple: #c084fc;
      --accent-purple-bg: rgba(168, 85, 247, 0.14);
      --accent-purple-border: rgba(168, 85, 247, 0.35);

      --accent-blue: #38bdf8;
      --accent-blue-bg: rgba(56, 189, 248, 0.12);
      --accent-blue-border: rgba(56, 189, 248, 0.3);

      --accent-amber: #fbbf24;
      --accent-amber-bg: rgba(245, 158, 11, 0.14);
      --accent-amber-border: rgba(245, 158, 11, 0.35);

      --accent-rose: #fb7185;
      --accent-rose-bg: rgba(244, 63, 94, 0.14);
      --accent-rose-border: rgba(244, 63, 94, 0.35);

      --accent-green: #4ade80;
      --accent-green-bg: rgba(16, 185, 129, 0.14);
      --accent-green-border: rgba(16, 185, 129, 0.35);

      --accent-indigo: #a5b4fc;
      --accent-indigo-bg: rgba(99, 102, 241, 0.14);
      --accent-indigo-border: rgba(99, 102, 241, 0.35);

      --btn-secondary-bg: rgba(255, 255, 255, 0.06);
      --btn-secondary-hover: rgba(255, 255, 255, 0.12);
      --btn-secondary-active: rgba(255, 255, 255, 0.18);
      --box-panel-bg: rgba(255, 255, 255, 0.03);
      
      --card-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.07), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
      --card-shadow-hover: 0 32px 70px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(168, 85, 247, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
      --modal-bg: rgba(12, 15, 32, 0.95);
      --table-bg: rgba(0, 0, 0, 0.32);
      --table-th-bg: rgba(0, 0, 0, 0.28);
      --table-hover-bg: rgba(255, 255, 255, 0.04);
      --segmented-bg: rgba(5, 7, 18, 0.7);
      --badge-bg: rgba(255, 255, 255, 0.06);

      --stat-card-bg: rgba(255, 255, 255, 0.035);
      --stat-card-border: rgba(255, 255, 255, 0.08);
      --telemetry-card-bg: rgba(255, 255, 255, 0.025);
      --telemetry-card-border: rgba(255, 255, 255, 0.08);
      --inspector-bg: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.16) 0%, rgba(10, 14, 28, 0.98) 75%);
      --filter-bar-bg: rgba(255, 255, 255, 0.02);
      --badge-neutral-bg: rgba(255, 255, 255, 0.06);
      --badge-neutral-color: #94a3b8;
      --badge-neutral-border: rgba(255, 255, 255, 0.1);
      --input-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.35);
      --backdrop-bg: rgba(4, 6, 16, 0.78);
      
      --clock-box-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 100%);
      --clock-digits-grad: linear-gradient(135deg, #ffffff 30%, #c4b5fd 70%, #93c5fd 100%);
      --clock-shadow: drop-shadow(0 0 28px rgba(168, 85, 247, 0.45));
      --orb-opacity: 0.38;
      
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #f43f5e;
      
      --radius-xl: 26px;
      --radius-lg: 18px;
      --radius-md: 14px;
      --radius-sm: 10px;

      --spring-physics: cubic-bezier(0.34, 1.56, 0.64, 1);
      --smooth-physics: cubic-bezier(0.16, 1, 0.3, 1);
    }

    [data-theme="light"] {
      --bg-dark: #f8fafc;
      --bg-surface: rgba(255, 255, 255, 0.95);
      --bg-surface-elevated: #ffffff;
      --bg-surface-hover: #f1f5f9;
      --bg-input: #ffffff;
      
      --border-subtle: rgba(203, 213, 225, 0.8);
      --border-specular: #ffffff;
      --border-focus: rgba(99, 102, 241, 0.65);
      --border-glow: rgba(99, 102, 241, 0.18);
      --glow-ambient: 0 0 35px -5px rgba(99, 102, 241, 0.12);
      
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-active: #4338ca;
      --accent: #0284c7;
      
      --gradient-brand: linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #2563eb 100%);
      --gradient-brand-hover: linear-gradient(135deg, #8b5cf6 0%, #7579f3 50%, #3b82f6 100%);
      --gradient-accent: linear-gradient(135deg, #0284c7 0%, #6366f1 50%, #9333ea 100%);
      --gradient-gold: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      --gradient-gold-hover: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      --gradient-btn: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      --gradient-admin: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      --gradient-rose: linear-gradient(135deg, #fb7185 0%, #e11d48 100%);
      --gradient-green: linear-gradient(135deg, #10b981 0%, #059669 100%);
      --shimmer-glow: rgba(255, 255, 255, 0.6);
      
      --text-main: #0f172a;
      --text-muted: #334155;
      --text-dim: #64748b;

      --accent-purple: #7c3aed;
      --accent-purple-bg: rgba(124, 58, 237, 0.1);
      --accent-purple-border: rgba(124, 58, 237, 0.3);

      --accent-blue: #0284c7;
      --accent-blue-bg: rgba(2, 132, 199, 0.1);
      --accent-blue-border: rgba(2, 132, 199, 0.3);

      --accent-amber: #b45309;
      --accent-amber-bg: rgba(217, 119, 6, 0.12);
      --accent-amber-border: rgba(217, 119, 6, 0.35);

      --accent-rose: #e11d48;
      --accent-rose-bg: rgba(225, 29, 72, 0.1);
      --accent-rose-border: rgba(225, 29, 72, 0.3);

      --accent-green: #059669;
      --accent-green-bg: rgba(5, 150, 105, 0.12);
      --accent-green-border: rgba(5, 150, 105, 0.35);

      --accent-indigo: #4f46e5;
      --accent-indigo-bg: rgba(79, 70, 229, 0.1);
      --accent-indigo-border: rgba(79, 70, 229, 0.3);

      --btn-secondary-bg: #ffffff;
      --btn-secondary-hover: #f1f5f9;
      --btn-secondary-active: #e2e8f0;
      --box-panel-bg: #ffffff;
      
      --card-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(203, 213, 225, 0.6);
      --card-shadow-hover: 0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(99, 102, 241, 0.3);
      --modal-bg: #ffffff;
      --table-bg: #ffffff;
      --table-th-bg: #f8fafc;
      --table-hover-bg: #f1f5f9;
      --segmented-bg: #f1f5f9;
      --badge-bg: #f1f5f9;

      --stat-card-bg: #ffffff;
      --stat-card-border: rgba(203, 213, 225, 0.8);
      --telemetry-card-bg: #f8fafc;
      --telemetry-card-border: rgba(203, 213, 225, 0.8);
      --inspector-bg: radial-gradient(circle at 50% 0%, rgba(224, 231, 255, 0.7) 0%, rgba(255, 255, 255, 0.98) 75%);
      --filter-bar-bg: #f8fafc;
      --badge-neutral-bg: #f1f5f9;
      --badge-neutral-color: #475569;
      --badge-neutral-border: rgba(203, 213, 225, 0.9);
      --input-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
      --backdrop-bg: rgba(15, 23, 42, 0.45);
      
      --clock-box-bg: linear-gradient(180deg, rgba(238, 242, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%);
      --clock-digits-grad: linear-gradient(135deg, #1e1b4b 20%, #4338ca 65%, #0284c7 100%);
      --clock-shadow: drop-shadow(0 0 18px rgba(99, 102, 241, 0.18));
      --orb-opacity: 0.12;
      
      --success: #059669;
      --warning: #d97706;
      --danger: #e11d48;
    }

    /* ⚡ ریست مدرن استاندارد */
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      scroll-behavior: smooth;
      color-scheme: dark light;
      overflow-x: hidden;
      max-width: 100vw;
    }

    html, body {
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      max-width: 100vw;
    }

    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: clamp(14px, 2.5vw, 24px) clamp(10px, 2vw, 16px) 65px clamp(10px, 2vw, 16px);
      position: relative;
      line-height: 1.6;
      transition: background-color 0.4s var(--smooth-physics), color 0.4s var(--smooth-physics);
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }

    /* 🌐 استایل‌های هماهنگ با زبان انگلیسی و چیدمان استاندارد LTR */
    html[dir="ltr"] body,
    html[lang="en"] body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      direction: ltr;
      text-align: left;
    }
    html[dir="ltr"] .modal-header,
    html[dir="ltr"] .modal-head,
    html[dir="ltr"] .section-header,
    html[dir="ltr"] .form-group,
    html[dir="ltr"] .toggle-row,
    html[dir="ltr"] .telemetry-card,
    html[dir="ltr"] .features-modal-header,
    html[dir="ltr"] .feature-card-item,
    html[dir="ltr"] th,
    html[dir="ltr"] td {
      text-align: left;
    }
    html[dir="ltr"] .modal-head .btn-close,
    html[dir="ltr"] .features-modal-header .btn-close {
      margin-left: auto;
      margin-right: 0;
    }
    html[dir="ltr"] .studio-nav-btn.prev .nav-arrow {
      transform: scaleX(-1);
    }
    html[dir="ltr"] .studio-nav-btn.next .nav-arrow {
      transform: scaleX(-1);
    }

    p, span, label, div, h1, h2, h3, h4, h5, h6 {
      overflow-wrap: break-word;
      word-break: normal;
    }

    code, pre {
      overflow-wrap: anywhere;
      word-break: break-all;
    }

    /* 🌌 بوم الگوریتمی ذرات کوانتومی */
    #algoCanvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.85;
      transition: opacity 0.5s ease;
    }

    /* 🌠 شفق‌های قطبی اتمسفریک چندوجهی */
    .aurora-container {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(140px);
      opacity: var(--orb-opacity);
      animation: floatOrb 26s var(--smooth-physics) infinite alternate;
      will-change: transform, opacity;
      transition: opacity 0.6s ease;
    }
    .orb-1 {
      width: 580px; height: 580px;
      background: radial-gradient(circle, #7c3aed 0%, rgba(124, 58, 237, 0.1) 65%, transparent 75%);
      top: -160px; left: 8%;
    }
    .orb-2 {
      width: 520px; height: 520px;
      background: radial-gradient(circle, #0284c7 0%, rgba(2, 132, 199, 0.1) 65%, transparent 75%);
      bottom: -120px; right: 6%;
      animation-duration: 30s;
      animation-delay: -5s;
    }
    .orb-3 {
      width: 420px; height: 420px;
      background: radial-gradient(circle, #db2777 0%, rgba(219, 39, 119, 0.1) 60%, transparent 75%);
      top: 35%; left: 55%;
      animation-duration: 34s;
      animation-delay: -10s;
    }

    @keyframes floatOrb {
      0% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
      33% { transform: translate3d(55px, -45px, 0) scale(1.1) rotate(45deg); }
      66% { transform: translate3d(-35px, 45px, 0) scale(0.92) rotate(90deg); }
      100% { transform: translate3d(40px, -25px, 0) scale(1.05) rotate(135deg); }
    }

    /* 📦 چیدمان و ورود متحرک کانتینر اصلی */
    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: min(94vw, 980px);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      box-sizing: border-box;
      animation: pageFadeIn 0.5s var(--smooth-physics) both;
    }

    @media (min-width: 1200px) {
      .container {
        max-width: 1040px;
        gap: 26px;
      }
    }

    @keyframes pageFadeIn {
      from { opacity: 0; transform: translateY(22px) scale(0.985); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* 💎 کارت‌های شیشه‌ای مدرن (Glassmorphism 2.0 with Specular Glow) */
    .glass-card {
      position: relative;
      background: var(--bg-surface);
      backdrop-filter: blur(34px) saturate(210%);
      -webkit-backdrop-filter: blur(34px) saturate(210%);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-xl);
      padding: clamp(20px, 3.2vw, 32px);
      box-shadow: var(--card-shadow);
      transition: transform 0.35s var(--smooth-physics),
                  box-shadow 0.35s var(--smooth-physics),
                  border-color 0.3s ease,
                  background-color 0.3s ease;
      overflow: hidden;
    }
    .glass-card:hover {
      border-color: rgba(168, 85, 247, 0.28);
      border-top-color: rgba(255, 255, 255, 0.35);
      box-shadow: var(--card-shadow-hover);
    }

    /* 🌟 نوار ناوبری فوق‌العاده مدرن (Header Navbar) */
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 22px;
      gap: 14px;
      flex-wrap: wrap;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      user-select: none;
    }
    .brand-gem {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      background: var(--gradient-brand);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 23px;
      box-shadow: 0 8px 24px -2px var(--border-glow), inset 0 1px 1px rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.35);
      position: relative;
      overflow: hidden;
      transition: transform 0.3s var(--spring-physics), box-shadow 0.3s ease;
    }
    .brand:hover .brand-gem {
      transform: translateY(-2px) scale(1.08) rotate(8deg);
      box-shadow: 0 12px 28px 0 rgba(168, 85, 247, 0.6);
    }
    .brand:active .brand-gem {
      transform: scale(0.94);
    }
    .brand-title-wrap h1 {
      font-size: 1.32rem;
      font-weight: 900;
      letter-spacing: -0.6px;
      display: flex;
      align-items: center;
      gap: 9px;
      line-height: 1.2;
    }
    .brand-title-gradient {
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'Outfit', sans-serif;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .badge-pro {
      font-size: 0.68rem;
      font-weight: 900;
      padding: 3px 9px;
      border-radius: 8px;
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      color: var(--accent-purple);
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(168, 85, 247, 0.15);
      transition: transform 0.2s ease;
    }
    .brand:hover .badge-pro {
      transform: translateY(-1px) scale(1.04);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    /* ☀️ دکمه سوئیچ تم شب و روز */
    .btn-theme-toggle {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 12px;
      padding: 9px 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--text-main);
      user-select: none;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      transition: transform 0.25s var(--spring-physics),
                  background-color 0.2s ease,
                  box-shadow 0.2s ease,
                  border-color 0.2s ease;
    }
    .btn-theme-toggle:hover {
      background: var(--btn-secondary-hover);
      border-color: rgba(168, 85, 247, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    }
    .btn-theme-toggle:active {
      transform: scale(0.94) translateY(1px);
    }
    .theme-icon-rotate {
      display: inline-block;
      font-size: 1rem;
      transition: transform 0.5s var(--spring-physics);
    }
    .btn-theme-toggle:hover .theme-icon-rotate {
      transform: rotate(35deg) scale(1.15);
    }

    /* دکمه‌های ناوبری استاندارد */
    .btn-nav-action {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 12px;
      padding: 9px 14px;
      font-size: 0.84rem;
      font-weight: 800;
      color: var(--text-muted);
      cursor: pointer;
      font-family: inherit;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      user-select: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.22s var(--spring-physics),
                  background-color 0.2s ease,
                  color 0.2s ease,
                  border-color 0.2s ease,
                  box-shadow 0.2s ease;
    }
    .btn-nav-action:hover {
      background: var(--btn-secondary-hover);
      color: var(--text-main);
      border-color: rgba(168, 85, 247, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
    }
    .btn-nav-action:active {
      transform: scale(0.94) translateY(1px);
    }

    /* 👑 دکمه طلایی و براق پنل ادمین */
    .btn-admin-highlight {
      background: var(--accent-amber-bg);
      border: 1px solid var(--accent-amber-border);
      border-top: 1px solid rgba(251, 191, 36, 0.5);
      color: var(--accent-amber);
      border-radius: 12px;
      padding: 9px 16px;
      font-size: 0.84rem;
      font-weight: 900;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.2);
      position: relative;
      overflow: hidden;
      user-select: none;
      transition: transform 0.22s var(--spring-physics),
                  box-shadow 0.22s ease,
                  background-color 0.2s ease,
                  color 0.2s ease;
    }
    .btn-admin-highlight::after {
      content: '';
      position: absolute;
      top: -50%; left: -60%;
      width: 30%; height: 200%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
      transform: rotate(25deg);
      pointer-events: none;
    }
    .btn-admin-highlight:hover::after {
      left: 140%;
      transition: left 0.75s ease-in-out;
    }
    .btn-admin-highlight:hover {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-color: #f59e0b;
      color: #ffffff;
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 10px 28px rgba(245, 158, 11, 0.45);
    }
    .btn-admin-highlight:active {
      transform: scale(0.96) translateY(1px);
    }

    /* 🏷️ هدرهای تفکیک بخش‌ها (Section Separators) */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
      flex-wrap: wrap;
      gap: 12px;
    }
    .section-title {
      font-size: 1.06rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 9px;
      flex-wrap: wrap;
      letter-spacing: -0.3px;
    }
    .section-tag {
      font-size: 0.74rem;
      font-weight: 800;
      padding: 4px 11px;
      border-radius: 20px;
      background: var(--badge-bg);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      white-space: nowrap;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: border-color 0.2s ease, color 0.2s ease;
    }
    .section-header:hover .section-tag {
      border-color: rgba(168, 85, 247, 0.3);
      color: var(--text-main);
    }

    /* 🕒 باکس ساعت زنده و تقویم خورشیدی تهران */
    .hero-clock-box {
      text-align: center;
      padding: clamp(22px, 4.5vw, 36px) clamp(14px, 3vw, 22px);
      background: var(--clock-box-bg);
      border-radius: var(--radius-lg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.25);
    }
    .hero-clock-box::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.95), transparent);
    }
    .hero-calendar-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: clamp(0.76rem, 2.2vw, 0.86rem);
      font-weight: 800;
      color: var(--accent-blue);
      background: var(--accent-blue-bg);
      border: 1px solid var(--accent-blue-border);
      padding: 7px 18px;
      border-radius: 30px;
      margin-bottom: 16px;
      max-width: 100%;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.15);
      word-break: normal;
      transition: transform 0.2s ease;
    }
    .hero-calendar-chip:hover {
      transform: translateY(-1px) scale(1.02);
    }
    .clock-display-wrap {
      display: inline-flex;
      align-items: baseline;
      justify-content: center;
      direction: ltr;
      gap: clamp(4px, 1.8vw, 10px);
      width: 100%;
      max-width: 100%;
      margin: 4px 0 12px 0;
    }
    .clock-time-digits {
      font-family: 'JetBrains Mono', 'Outfit', monospace;
      font-size: clamp(2.4rem, 8.5vw, 4.2rem);
      font-weight: 900;
      letter-spacing: clamp(1px, 1.4vw, 4px);
      background: var(--clock-digits-grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      user-select: none;
      filter: var(--clock-shadow);
      line-height: 1.1;
    }
    .clock-seconds-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(1rem, 3.4vw, 1.35rem);
      font-weight: 900;
      color: var(--accent-purple);
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      border-radius: 12px;
      padding: 4px 9px;
      animation: pulseSeconds 1.2s infinite alternate ease-in-out;
      line-height: 1.2;
      box-shadow: 0 4px 16px rgba(168, 85, 247, 0.25);
    }
    @keyframes pulseSeconds {
      0% { opacity: 0.7; transform: scale(0.96); box-shadow: 0 0 8px rgba(168, 85, 247, 0.2); }
      100% { opacity: 1; transform: scale(1.06); box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
    }
    .clock-badges-row {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 18px;
      flex-wrap: wrap;
    }
    .meta-chip {
      font-size: 0.76rem;
      padding: 6px 15px;
      border-radius: 30px;
      background: var(--badge-bg);
      color: var(--text-muted);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }
    .meta-chip:hover {
      transform: translateY(-1px);
      border-color: rgba(168, 85, 247, 0.35);
      color: var(--text-main);
    }
    .meta-chip.active {
      color: var(--success);
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.12);
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);
    }
    .dot-pulse {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 12px var(--success);
      position: relative;
    }
    .dot-pulse::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 1.5px solid var(--success);
      animation: dotPulseWave 1.8s infinite ease-out;
    }
    @keyframes dotPulseWave {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(2.2); opacity: 0; }
    }

    /* 🎨 کنترل تب‌های سگمنتد عمومی (Segmented Control) */
    .segmented-control {
      display: flex;
      background: var(--segmented-bg);
      border-radius: 18px;
      padding: 6px;
      margin-bottom: 24px;
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      gap: 6px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
    }
    .segmented-control::-webkit-scrollbar { display: none; }
    .segmented-btn {
      flex: 1;
      padding: 12px 14px;
      border-radius: 13px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-muted);
      font-size: 0.88rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      user-select: none;
      white-space: nowrap;
      letter-spacing: -0.2px;
      transition: all 0.22s var(--smooth-physics);
    }
    .segmented-btn:hover:not(.active) {
      color: var(--text-main);
      background: var(--btn-secondary-hover);
    }
    .segmented-btn:active {
      transform: scale(0.97);
    }
    .segmented-btn.active {
      background: var(--bg-surface-elevated);
      color: var(--text-main);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.08);
      border-color: var(--border-specular);
    }

    /* 📑 نوار تب‌های استودیوی سلف‌بات - کاملاً ریسپانسیو و منعطف برای موبایل، تبلت و کامپیوتر */
    .studio-tab-bar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background: var(--segmented-bg);
      border-radius: 20px;
      padding: 8px;
      margin-bottom: 24px;
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      gap: 8px;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.35);
    }
    .studio-tab-btn {
      width: 100%;
      min-height: 44px;
      padding: 10px 6px;
      border-radius: 14px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-muted);
      font-size: 0.81rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      user-select: none;
      white-space: nowrap;
      letter-spacing: -0.2px;
      transition: all 0.24s var(--smooth-physics);
      text-align: center;
    }
    .studio-tab-btn:hover:not(.active) {
      color: var(--text-main);
      background: var(--btn-secondary-hover);
      transform: translateY(-1px);
    }
    .studio-tab-btn:active {
      transform: scale(0.96);
    }
    .studio-tab-btn.active {
      background: var(--gradient-btn);
      color: #ffffff !important;
      border-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 6px 20px -2px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    @media (max-width: 920px) {
      .studio-tab-bar {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;
        padding: 6px;
        gap: 6px;
      }
      .studio-tab-bar::-webkit-scrollbar { display: none; }
      .studio-tab-btn {
        flex: 0 0 auto;
        width: auto;
        scroll-snap-align: start;
        padding: 10px 16px;
        font-size: 0.82rem;
      }
    }

    /* 🧭 نوار پیمایش هوشمند بین قابلیت‌های استودیو Pro */
    .studio-nav-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-lg);
      padding: 12px 18px;
      margin: 24px 0 16px 0;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
    }
    .studio-nav-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 12px;
      padding: 9px 14px;
      cursor: pointer;
      color: var(--text-main);
      font-family: inherit;
      transition: all 0.22s var(--smooth-physics);
      user-select: none;
      min-width: 140px;
    }
    .studio-nav-btn:hover:not(:disabled) {
      background: var(--btn-secondary-hover);
      border-color: rgba(168, 85, 247, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    }
    .studio-nav-btn:active:not(:disabled) {
      transform: scale(0.96);
    }
    .studio-nav-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    .studio-nav-btn .nav-btn-text {
      display: flex;
      flex-direction: column;
      text-align: right;
      min-width: 0;
    }
    .studio-nav-btn.prev .nav-btn-text {
      text-align: right;
    }
    .studio-nav-btn.next .nav-btn-text {
      text-align: left;
    }
    .studio-nav-btn .nav-btn-sub {
      font-size: 0.68rem;
      color: var(--text-muted);
      font-weight: 700;
    }
    .studio-nav-btn .nav-btn-title {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--accent-indigo);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 130px;
    }
    .studio-nav-btn .nav-arrow {
      font-size: 0.88rem;
      color: var(--text-muted);
      transition: transform 0.2s ease;
    }
    .studio-nav-btn:hover:not(:disabled) .nav-arrow {
      color: var(--accent-purple);
    }
    .studio-nav-btn.prev:hover:not(:disabled) .nav-arrow {
      transform: translateX(3px);
    }
    .studio-nav-btn.next:hover:not(:disabled) .nav-arrow {
      transform: translateX(-3px);
    }
    .studio-nav-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      user-select: none;
    }
    .studio-nav-counter {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--text-muted);
      direction: rtl;
    }
    .studio-nav-dots {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .studio-nav-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid var(--border-subtle);
      cursor: pointer;
      transition: all 0.25s var(--spring-physics);
      position: relative;
    }
    .studio-nav-dot:hover {
      background: rgba(168, 85, 247, 0.6);
      transform: scale(1.3);
    }
    .studio-nav-dot.active {
      width: 26px;
      border-radius: 10px;
      background: var(--gradient-brand);
      border-color: rgba(255, 255, 255, 0.35);
      box-shadow: 0 0 12px var(--border-glow);
    }
    @media (max-width: 600px) {
      .studio-nav-bar {
        flex-wrap: wrap;
        justify-content: center;
        padding: 12px;
        gap: 10px;
      }
      .studio-nav-btn {
        flex: 1 1 calc(50% - 10px);
        min-width: 110px;
        padding: 8px 10px;
      }
      .studio-nav-btn .nav-btn-title {
        max-width: 80px;
        font-size: 0.76rem;
      }
      .studio-nav-center {
        order: -1;
        width: 100%;
        margin-bottom: 4px;
      }
    }

    /* 📱 شبیه‌ساز زنده پروفایل تلگرام (Ultra-Realistic Live Mockup) */
    .tg-mockup-wrapper {
      background: var(--clock-box-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    .tg-mockup-header {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .tg-mockup-avatar-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .tg-mockup-avatar {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      font-weight: 900;
      color: #fff;
      font-family: 'Outfit', sans-serif;
      box-shadow: 0 10px 28px rgba(168, 85, 247, 0.4);
      border: 2px solid rgba(255, 255, 255, 0.4);
      user-select: none;
      transition: transform 0.3s var(--spring-physics);
    }
    .tg-mockup-wrapper:hover .tg-mockup-avatar {
      transform: scale(1.05) rotate(4deg);
    }
    .tg-online-ring {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      background: #10b981;
      border-radius: 50%;
      border: 2.5px solid var(--bg-surface);
      box-shadow: 0 0 12px #10b981;
    }
    .tg-online-ring::after {
      content: '';
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 1.5px solid #10b981;
      animation: radarWave 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
    }
    @keyframes radarWave {
      0% { transform: scale(0.9); opacity: 1; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    .tg-mockup-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
      flex: 1;
    }
    .tg-mockup-name-row {
      display: flex;
      align-items: baseline;
      gap: 9px;
      flex-wrap: wrap;
    }
    .tg-mockup-firstname {
      font-size: 1.24rem;
      font-weight: 900;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }
    .tg-mockup-lastname {
      font-size: 1.24rem;
      font-weight: 900;
      background: var(--clock-digits-grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.5px;
    }
    .tg-mockup-status {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 0.8rem;
      color: var(--accent-blue);
      font-weight: 700;
    }
    .tg-status-dot {
      width: 7px;
      height: 7px;
      background: var(--accent-blue);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-blue);
      animation: pulseDot 2s infinite ease-in-out;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.75); }
    }
    .tg-mockup-body {
      background: rgba(0, 0, 0, 0.22);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
      box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.2);
    }
    @media (min-width: 680px) {
      .tg-mockup-body {
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        align-items: center;
      }
    }
    .tg-mockup-field {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .tg-field-icon {
      font-size: 1.15rem;
      line-height: 1.4;
    }
    .tg-field-content {
      flex: 1;
      min-width: 0;
    }
    .tg-field-label {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 2px;
    }
    .tg-field-value {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text-main);
      word-break: break-word;
      line-height: 1.5;
    }
    .tg-clock-bar {
      display: flex;
      align-items: baseline;
      justify-content: center;
      direction: ltr !important;
      gap: 8px;
      padding: 12px 0;
    }
    .tg-clock-digits {
      font-family: 'JetBrains Mono', monospace;
      font-size: clamp(2.4rem, 7vw, 3.2rem);
      font-weight: 900;
      background: var(--clock-digits-grad);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: var(--clock-shadow);
      direction: ltr;
      user-select: none;
      letter-spacing: 1px;
    }

    /* 🎚️ سوئیچ‌های تاگل مدرن (iOS 18 Spring Switches) */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      background: var(--table-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      padding: clamp(14px, 2.5vw, 18px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s var(--smooth-physics);
      min-width: 0;
    }
    .toggle-row:hover {
      border-color: rgba(168, 85, 247, 0.3);
      transform: translateY(-1px);
    }
    .toggle-row > div:first-child {
      flex: 1;
      min-width: 0;
    }
    .toggle-label {
      font-size: 0.92rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 4px;
      letter-spacing: -0.2px;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .toggle-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.6;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 52px;
      height: 28px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: rgba(255, 255, 255, 0.16);
      border-radius: 34px;
      border: 1px solid var(--border-subtle);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
      transition: background-color 0.28s var(--smooth-physics), border-color 0.28s ease, box-shadow 0.28s ease;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 4px;
      bottom: 3px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
      transition: transform 0.28s var(--spring-physics);
    }
    input:checked + .slider {
      background-color: var(--primary);
      border-color: var(--primary-hover);
      box-shadow: 0 0 16px rgba(139, 92, 246, 0.45);
    }
    input:checked + .slider:before {
      transform: translateX(24px);
    }

    /* چیپ‌های متغیر بیوگرافی */
    .var-chip {
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      border-radius: 10px;
      padding: 6px 13px;
      font-size: 0.76rem;
      font-weight: 800;
      color: var(--accent-purple);
      cursor: pointer;
      font-family: inherit;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s var(--spring-physics), background-color 0.2s ease, color 0.2s ease;
      white-space: nowrap;
      user-select: none;
    }
    .var-chip:hover {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 4px 14px rgba(139, 92, 246, 0.35);
    }
    .var-chip:active {
      transform: scale(0.95);
    }
    .bio-templates-box {
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .bio-preset-pill {
      background: var(--table-bg);
      border: 1px dashed var(--border-subtle);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      direction: ltr;
      text-align: left;
      overflow-wrap: break-word;
      word-break: break-all;
      transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
    }
    .bio-preset-pill:hover {
      border-color: var(--primary);
      border-style: solid;
      color: var(--text-main);
      background: rgba(168, 85, 247, 0.1);
      transform: translateX(-4px);
    }

    /* تب‌های اختصاصی درون پنل ادمین */
    .admin-subtab-bar {
      display: flex;
      background: var(--table-bg);
      border-radius: 16px;
      padding: 5px;
      margin-bottom: 24px;
      border: 1px solid var(--border-subtle);
      gap: 6px;
      overflow-x: auto;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.25);
    }
    .admin-subtab-btn {
      flex: 1;
      min-width: 140px;
      padding: 11px 16px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--text-muted);
      font-size: 0.86rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      user-select: none;
      transition: all 0.22s var(--smooth-physics);
    }
    .admin-subtab-btn:hover:not(.active) {
      background: var(--btn-secondary-hover);
      color: var(--text-main);
    }
    .admin-subtab-btn.active {
      background: var(--primary);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 18px var(--border-glow);
    }

    /* 🏷️ فیلدهای ورودی (Inputs & Selects) */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 18px;
    }
    .form-label {
      font-size: 0.84rem;
      color: var(--text-muted);
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      align-items: center;
      letter-spacing: -0.2px;
    }
    .input-field {
      width: 100%;
      padding: 13px 18px;
      background: var(--bg-input);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      color: var(--text-main);
      font-size: 16px; /* جلوگیری اساسی از زوم ناخواسته در مرورگرهای موبایل و iOS */
      outline: none;
      font-family: inherit;
      line-height: 1.5;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.25);
      transition: border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease;
    }
    .input-field::placeholder {
      color: var(--text-dim);
      opacity: 0.75;
      font-size: 0.84rem;
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, sans-serif;
      direction: rtl;
      text-align: right;
    }
    .input-field:focus::placeholder {
      opacity: 0.35;
    }
    .input-field:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--border-glow), inset 0 1px 3px rgba(0, 0, 0, 0.3);
      background: var(--bg-surface-elevated);
    }
    select.input-field {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: left 14px center;
      padding-left: 38px;
      cursor: pointer;
    }
    .input-field.mono {
      font-family: 'JetBrains Mono', monospace;
      direction: ltr;
      text-align: left;
    }
    .input-field.mono::placeholder {
      font-family: 'Vazirmatn', sans-serif;
      font-size: 0.82rem;
      direction: rtl;
      text-align: right;
    }
    .input-field.center-text {
      text-align: center;
    }
    .input-field.center-text::placeholder {
      text-align: center;
    }
    .input-field:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* 📱 ردیف ورودی به همراه دکمه عملیاتی واکنش‌گرا (Input with Action Button) */
    .input-action-row {
      display: flex;
      gap: 12px;
      align-items: stretch;
      width: 100%;
      flex-wrap: wrap;
    }
    .input-action-row .input-field {
      flex: 1 1 200px;
      min-width: 0;
    }
    .input-action-row .btn {
      flex: 0 0 auto;
      width: auto;
      white-space: nowrap;
      padding: 12px 22px;
    }
    @media (max-width: 680px) {
      .input-action-row {
        flex-direction: column;
        gap: 10px;
      }
      .input-action-row .input-field,
      .input-action-row .btn {
        width: 100% !important;
        flex: 1 1 100%;
      }
    }

    /* 🔘 استایل فوق پیشرفته دکمه‌ها با افکت نورانی و لرزش لمسی */
    .btn {
      width: 100%;
      padding: 13px 20px;
      border-radius: var(--radius-md);
      font-size: 0.92rem;
      font-weight: 800;
      font-family: inherit;
      border: 1px solid transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      user-select: none;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      letter-spacing: -0.2px;
      text-align: center;
      transition: transform 0.22s var(--spring-physics),
                  box-shadow 0.22s ease,
                  background-color 0.2s ease,
                  border-color 0.2s ease,
                  color 0.2s ease;
      will-change: transform;
    }
    .btn-auto {
      width: auto !important;
      display: inline-flex;
    }
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    .btn:hover:not(:disabled)::before {
      opacity: 1;
    }
    .btn::after {
      content: '';
      position: absolute;
      top: -50%; left: -70%;
      width: 35%; height: 200%;
      background: linear-gradient(90deg, transparent, var(--shimmer-glow), transparent);
      transform: rotate(25deg);
      transition: none;
      pointer-events: none;
      opacity: 0;
    }
    .btn:hover:not(:disabled)::after {
      opacity: 1;
      left: 140%;
      transition: left 0.75s ease-in-out;
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-2.5px) scale(1.01);
    }
    .btn:active:not(:disabled) {
      transform: translateY(1px) scale(0.97) !important;
      transition-duration: 0.08s;
    }
    .btn-primary {
      background: var(--gradient-brand);
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 10px 25px -4px rgba(124, 58, 237, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }
    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 14px 34px -4px rgba(124, 58, 237, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    .btn-secondary {
      background: var(--btn-secondary-bg);
      color: var(--text-main);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }
    .btn-secondary:hover:not(:disabled) {
      background: var(--btn-secondary-hover);
      border-color: rgba(168, 85, 247, 0.35);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      color: var(--text-main);
    }
    .btn-gold {
      background: var(--gradient-gold);
      color: #0f172a;
      font-weight: 900;
      border: 1px solid rgba(255, 255, 255, 0.35);
      box-shadow: 0 10px 25px -4px rgba(245, 158, 11, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }
    .btn-gold:hover:not(:disabled) {
      box-shadow: 0 14px 32px -4px rgba(245, 158, 11, 0.6);
    }
    .btn-warning {
      background: var(--accent-amber-bg);
      color: var(--accent-amber);
      border: 1px solid var(--accent-amber-border);
      border-top: 1px solid rgba(251, 191, 36, 0.45);
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.15);
    }
    .btn-warning:hover:not(:disabled) {
      background: var(--accent-amber);
      color: #ffffff;
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35);
    }
    .btn-danger {
      background: var(--accent-rose-bg);
      color: var(--accent-rose);
      border: 1px solid var(--accent-rose-border);
      border-top: 1px solid rgba(251, 113, 133, 0.45);
      box-shadow: 0 4px 14px rgba(244, 63, 94, 0.15);
    }
    .btn-danger:hover:not(:disabled) {
      background: var(--accent-rose);
      color: #ffffff;
      box-shadow: 0 8px 25px rgba(244, 63, 94, 0.35);
    }
    .btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* 🎨 استودیوی پریست‌های فونت و استایل ساعت */
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }
    .preset-card {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      padding: 14px 10px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      position: relative;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      transition: transform 0.22s var(--spring-physics),
                  border-color 0.2s ease,
                  background-color 0.2s ease,
                  box-shadow 0.2s ease;
    }
    .preset-card:hover {
      background: var(--btn-secondary-hover);
      border-color: var(--border-focus);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
    }
    .preset-card:active {
      transform: scale(0.95);
    }
    .preset-card.active {
      background: var(--accent-purple-bg);
      border-color: var(--primary);
      box-shadow: 0 0 25px var(--border-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
    .preset-name {
      font-size: 0.77rem;
      color: var(--text-muted);
      margin-bottom: 6px;
      font-weight: 700;
    }
    .preset-card.active .preset-name {
      color: var(--accent-purple);
    }
    .preset-digits {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.22rem;
      font-weight: 800;
      color: var(--text-main);
      direction: ltr;
    }

    /* ⚡ جداکننده‌ها */
    .sep-scroll-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      overflow-x: auto;
      padding-bottom: 8px;
    }
    .sep-pill {
      padding: 9px 18px;
      border-radius: 12px;
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.15rem;
      font-weight: 800;
      cursor: pointer;
      min-width: 48px;
      text-align: center;
      user-select: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s var(--spring-physics), background-color 0.2s ease, border-color 0.2s ease;
    }
    .sep-pill:hover {
      background: var(--btn-secondary-hover);
      border-color: rgba(168, 85, 247, 0.35);
      transform: translateY(-2px);
    }
    .sep-pill:active {
      transform: scale(0.94);
    }
    .sep-pill.active {
      background: var(--primary);
      border-color: var(--primary);
      color: #ffffff;
      box-shadow: 0 4px 18px var(--border-glow);
      transform: translateY(-1px);
    }

    /* 📊 مانیتورینگ سلامت */
    .health-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 20px;
    }
    .health-item {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .health-item:hover {
      border-color: rgba(168, 85, 247, 0.3);
      transform: translateY(-1px);
    }
    .health-label {
      font-size: 0.76rem;
      color: var(--text-muted);
      margin-bottom: 5px;
      font-weight: 700;
    }
    .health-value {
      font-size: 0.96rem;
      font-weight: 800;
      color: var(--text-main);
    }

    /* 👑 پنل ادمین */
    .admin-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
      gap: 14px;
      margin-bottom: 26px;
    }
    .admin-kpi-card {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      padding: 16px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      transition: transform 0.22s var(--spring-physics), box-shadow 0.22s ease, border-color 0.2s ease;
    }
    .admin-kpi-card:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: rgba(168, 85, 247, 0.35);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
    }
    .admin-kpi-num {
      font-size: 1.95rem;
      font-weight: 900;
      color: var(--text-main);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: -0.5px;
    }
    .admin-kpi-title {
      font-size: 0.77rem;
      color: var(--text-muted);
      margin-top: 5px;
      font-weight: 700;
    }

    /* 📱 نگهدارنده و اسکرول نرم جدول‌های پنل ادمین */
    .table-responsive-wrapper {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 14px;
      background: var(--table-bg);
      margin-top: 10px;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    .table-responsive-wrapper::-webkit-scrollbar {
      height: 6px;
    }
    .table-responsive-wrapper::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.25);
    }
    .table-responsive-wrapper::-webkit-scrollbar-thumb {
      background: rgba(168, 85, 247, 0.4);
      border-radius: 10px;
    }

    .admin-table {
      width: 100%;
      min-width: 600px;
      border-collapse: collapse;
      font-size: 0.86rem;
    }
    .admin-table th, .admin-table td {
      padding: 13px 14px;
      text-align: right;
      border-bottom: 1px solid var(--border-subtle);
      white-space: nowrap;
    }
    .admin-table th {
      color: var(--text-muted);
      font-weight: 800;
      font-size: 0.78rem;
      background: var(--table-th-bg);
    }
    .admin-table tbody tr {
      transition: background-color 0.2s ease;
    }
    .admin-table tbody tr:hover {
      background-color: var(--table-hover-bg);
    }
    .copy-btn {
      background: var(--accent-indigo-bg);
      border: 1px solid var(--accent-indigo-border);
      border-radius: 8px;
      color: var(--accent-indigo);
      padding: 5px 12px;
      font-size: 0.76rem;
      font-weight: 800;
      cursor: pointer;
      font-family: inherit;
      transition: transform 0.18s var(--spring-physics), background-color 0.18s ease, color 0.18s ease;
    }
    .copy-btn:hover {
      background: var(--primary);
      color: #ffffff;
      transform: scale(1.05);
    }
    .copy-btn:active {
      transform: scale(0.95);
    }
    .status-badge {
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 0.74rem;
      font-weight: 800;
      display: inline-block;
    }
    .status-badge.unused { background: var(--accent-green-bg); color: var(--accent-green); border: 1px solid var(--accent-green-border); }
    .status-badge.used { background: var(--accent-rose-bg); color: var(--accent-rose); border: 1px solid var(--accent-rose-border); }

    /* ⚓ فوتر اختصاصی سایت */
    .footer-dock {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: var(--bg-surface);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-lg);
      font-size: 0.8rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 12px;
      box-shadow: var(--card-shadow);
    }
    .footer-admin-link {
      color: var(--accent-amber);
      cursor: pointer;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: transform 0.2s ease, color 0.2s ease;
    }
    .footer-admin-link:hover {
      color: var(--text-main);
      transform: translateX(-3px);
    }

    /* 🚨 توست اعلان‌ها (Floating Capsule Notification with Spring Entrance) */
    #toast {
      position: fixed;
      bottom: 28px;
      left: 50%;
      transform: translateX(-50%) translateY(120px) scale(0.92);
      padding: 16px 28px;
      border-radius: 35px;
      font-size: 0.94rem;
      font-weight: 800;
      backdrop-filter: blur(32px) saturate(200%);
      -webkit-backdrop-filter: blur(32px) saturate(200%);
      box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.15);
      z-index: 9999;
      opacity: 0;
      pointer-events: none;
      transition: transform 0.4s var(--spring-physics), opacity 0.3s ease;
      letter-spacing: -0.2px;
      white-space: normal;
      word-break: break-word;
      overflow-wrap: break-word;
      max-width: min(92vw, 440px);
      line-height: 1.5;
      text-align: center;
    }
    #toast.show {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }
    #toast.success {
      background: rgba(16, 185, 129, 0.94);
      color: #ffffff;
      border: 1px solid rgba(110, 231, 183, 0.5);
      box-shadow: 0 20px 50px -10px rgba(16, 185, 129, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2);
    }
    #toast.error {
      background: rgba(244, 63, 94, 0.94);
      color: #ffffff;
      border: 1px solid rgba(253, 164, 175, 0.5);
      box-shadow: 0 20px 50px -10px rgba(244, 63, 94, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2);
    }
    #toast.info {
      background: rgba(59, 130, 246, 0.94);
      color: #ffffff;
      border: 1px solid rgba(147, 197, 253, 0.5);
      box-shadow: 0 20px 50px -10px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2);
    }

    /* 🪟 مودال تنظیمات با انیمیشن فنری پویا */
    .modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(4, 6, 16, 0.78);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 22px;
      animation: modalFadeIn 0.3s ease both;
    }
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal-container {
      width: 100%;
      max-width: 590px;
      max-height: 90vh;
      overflow-y: auto;
      background: var(--modal-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-xl);
      padding: 30px;
      box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08);
      animation: modalPop 0.35s var(--spring-physics) both;
    }
    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.92) translateY(18px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .modal-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
    }
    .modal-heading {
      font-size: 1.2rem;
      font-weight: 900;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }
    .btn-close {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 1.4rem;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s var(--spring-physics), background-color 0.2s ease, color 0.2s ease;
    }
    .btn-close:hover {
      background: rgba(244, 63, 94, 0.15);
      border-color: rgba(244, 63, 94, 0.35);
      color: var(--accent-rose);
      transform: rotate(90deg) scale(1.1);
    }
    .btn-close:active {
      transform: scale(0.9);
    }

    .spinner {
      width: 20px; height: 20px;
      border: 2.5px solid rgba(255, 255, 255, 0.3);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.65s linear infinite;
      display: inline-block;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* 🌊 انیمیشن ورود تب‌ها و محتواهای سوییچ‌شونده */
    #studioPaneClock:not(.hidden),
    #studioPaneBio:not(.hidden),
    #studioPaneAfk:not(.hidden),
    #studioPaneMute:not(.hidden),
    #studioPaneAutomation:not(.hidden),
    #studioPaneBot:not(.hidden),
    #studioPaneGhost:not(.hidden),
    #studioPaneAI:not(.hidden),
    #studioPaneSecurity:not(.hidden),
    #adminTabContentStats:not(.hidden),
    #adminTabContentCodes:not(.hidden),
    #adminTabContentUsers:not(.hidden),
    #loginFormBox:not(.hidden),
    #registerFormBox:not(.hidden),
    #adminDashboardBox:not(.hidden) {
      animation: tabPaneFade 0.28s var(--smooth-physics) both;
    }
    @keyframes tabPaneFade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .action-buttons-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 14px;
      width: 100%;
    }
    .action-buttons-grid .btn {
      width: 100%;
      min-height: 48px;
      padding: 12px 14px;
      font-size: 0.88rem;
      white-space: normal;
      line-height: 1.35;
      text-align: center;
    }
    .digits-row {
      display: flex;
      gap: 14px;
      margin-bottom: 22px;
      flex-wrap: wrap;
    }

    /* 👤 بهینه‌سازی فرم‌های ورود، اتصال تلگرام و دکمه ذخیره در کامپیوتر و گوشی */
    #userAuthSection {
      max-width: 490px;
      margin: 0 auto;
      width: 100%;
    }
    #telegramConnectSection {
      max-width: 640px;
      margin: 0 auto;
      width: 100%;
    }
    #saveBtn {
      max-width: 500px;
      margin: 20px auto 24px auto;
      display: flex;
    }

    .hidden { display: none !important; }

    /* 📱 بهینه‌سازی دقیق واکنش‌گرایی در نمایشگرهای موبایل و تبلت */
    @media (max-width: 680px) {
      .container {
        max-width: 100%;
      }
      .admin-kpi-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }
      .action-buttons-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }

    @media (max-width: 580px) {
      body {
        padding: 12px 10px 55px 10px;
      }
      .glass-card {
        padding: 20px 16px;
        border-radius: 22px;
      }
      .navbar {
        padding: 12px 16px;
        gap: 10px;
      }
      .brand-gem {
        width: 40px;
        height: 40px;
        font-size: 19px;
        border-radius: 12px;
      }
      .brand-title-wrap h1 {
        font-size: 1.15rem;
      }
      .badge-pro {
        font-size: 0.62rem;
        padding: 2px 7px;
      }
      .btn-theme-toggle {
        padding: 7px 11px;
        font-size: 0.78rem;
      }
      .theme-text {
        display: none;
      }
      .btn-admin-highlight {
        padding: 7px 11px;
        font-size: 0.78rem;
      }
      .btn-nav-action {
        padding: 7px 11px;
        font-size: 0.78rem;
      }
      .hero-clock-box {
        padding: 24px 14px;
      }
      .hero-calendar-chip {
        font-size: 0.78rem;
        padding: 5px 14px;
      }
      .clock-badges-row {
        gap: 7px;
      }
      .meta-chip {
        font-size: 0.72rem;
        padding: 5px 11px;
      }
      .segmented-control {
        padding: 4px;
        gap: 4px;
        margin-bottom: 20px;
      }
      .segmented-btn {
        font-size: 0.8rem;
        padding: 10px 8px;
      }
      .action-buttons-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .action-buttons-grid .btn {
        font-size: 0.9rem;
        padding: 12px 18px;
      }
      .preset-grid {
        grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
        gap: 9px;
        margin-bottom: 20px;
      }
      .preset-card {
        padding: 11px 7px;
      }
      .preset-digits {
        font-size: 1.08rem;
      }
      .health-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .health-item {
        padding: 14px 16px;
      }
      .admin-subtab-bar {
        padding: 4px;
        gap: 4px;
      }
      .admin-subtab-btn {
        min-width: 115px;
        font-size: 0.78rem;
        padding: 9px 12px;
      }
      .modal-backdrop {
        padding: 14px;
      }
      .modal-container {
        padding: 22px 18px;
        border-radius: 22px;
      }
      .footer-dock {
        padding: 14px 16px;
        font-size: 0.76rem;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 8px;
      }
    }

    @media (max-width: 400px) {
      .navbar {
        flex-direction: column;
        align-items: stretch;
      }
      .brand {
        justify-content: center;
      }
      .nav-actions {
        justify-content: center;
      }
      .segmented-btn {
        font-size: 0.74rem;
        padding: 9px 5px;
      }
      .digits-row {
        flex-direction: column;
        gap: 10px;
      }
    }

    /* ==========================================================================
       💎 Arizo Self — Executive Feature Introduction Modal (SaaS Grade)
       ========================================================================== */
    .features-modal-container {
      width: 95%;
      max-width: 860px;
      padding: clamp(16px, 2.5vw, 26px);
      background: var(--modal-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 24px;
      box-shadow: var(--card-shadow);
      position: relative;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      color: var(--text-main);
      box-sizing: border-box;
      overflow: hidden;
    }
    .features-modal-header {
      flex-shrink: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
      position: relative;
      gap: 12px;
    }
    .features-header-content {
      flex: 1;
      min-width: 0;
    }
    .features-header-top-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      flex-wrap: wrap;
    }
    .features-header-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.74rem;
      font-weight: 800;
      color: var(--accent-purple);
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      padding: 3px 10px;
      border-radius: 20px;
    }
    .features-header-title {
      font-size: clamp(1.1rem, 3vw, 1.35rem);
      font-weight: 900;
      letter-spacing: -0.4px;
      color: var(--text-main);
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .features-header-desc {
      font-size: 0.82rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .features-chips-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .features-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--text-muted);
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      padding: 3px 9px;
      border-radius: 8px;
    }
    .features-chip-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-green);
      box-shadow: 0 0 6px var(--accent-green);
    }
    .features-modal-body {
      flex: 1;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4px 4px 12px 2px;
      scrollbar-width: thin;
      scrollbar-color: var(--border-subtle) transparent;
    }
    .features-modal-body::-webkit-scrollbar {
      width: 5px;
    }
    .features-modal-body::-webkit-scrollbar-thumb {
      background: var(--border-subtle);
      border-radius: 4px;
    }
    .features-cards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .feature-card-item {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 14px 15px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 0;
    }
    .feature-card-item:hover {
      background: var(--bg-surface-hover);
      border-color: rgba(168, 85, 247, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.15);
    }
    .feature-item-icon {
      width: 38px;
      height: 38px;
      border-radius: 11px;
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      color: var(--accent-purple);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
      box-shadow: 0 4px 12px var(--accent-purple-bg);
    }
    .feature-item-body {
      flex: 1;
      min-width: 0;
    }
    .feature-item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 5px;
      flex-wrap: wrap;
    }
    .feature-item-title {
      font-size: 0.9rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.35;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .feature-item-badge {
      font-size: 0.68rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
      background: var(--accent-purple-bg);
      border: 1px solid var(--accent-purple-border);
      color: var(--accent-purple);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .feature-item-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.6;
      overflow-wrap: break-word;
      word-break: normal;
    }
    .features-modal-action-bar {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 14px;
      margin-top: 14px;
      border-top: 1px solid var(--border-subtle);
      gap: 14px;
      flex-wrap: wrap;
    }
    .features-pref-toggle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.79rem;
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
    }
    .features-pref-toggle:hover {
      color: var(--text-main);
    }
    .features-pref-toggle input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: #8b5cf6;
      cursor: pointer;
    }
    .features-action-buttons {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .btn-feature-dismiss {
      background: var(--btn-secondary-bg);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 9px 18px;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .btn-feature-dismiss:hover {
      background: var(--btn-secondary-hover);
      color: var(--text-main);
      border-color: var(--border-focus);
    }
    .btn-feature-start {
      background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 9px 24px;
      border-radius: 12px;
      font-size: 0.86rem;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(124, 58, 237, 0.35);
      transition: all 0.22s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-feature-start:hover {
      background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
      box-shadow: 0 6px 24px rgba(124, 58, 237, 0.5);
      transform: translateY(-1px);
    }

    @media (max-width: 720px) {
      .features-modal-container {
        padding: 16px 14px;
        border-radius: 20px;
        max-height: 92vh;
      }
      .features-header-title {
        font-size: 1.14rem;
      }
      .features-cards-grid {
        grid-template-columns: 1fr;
        gap: 9px;
      }
      .features-modal-action-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }
      .features-action-buttons {
        flex-direction: column;
        width: 100%;
        gap: 8px;
      }
      .features-action-buttons button {
        width: 100%;
        justify-content: center;
      }
    }

    /* ==========================================================================
       🔍 Arizo Self — User Inspector & Live Telemetry Modal (Admin Suite)
       ========================================================================== */
    .admin-inspector-container {
      width: 95%;
      max-width: 860px;
      padding: clamp(16px, 2.5vw, 24px);
      background: var(--inspector-bg);
      border: 1px solid var(--border-subtle);
      border-top: 1px solid var(--border-specular);
      border-radius: 24px;
      box-shadow: var(--card-shadow);
      position: relative;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      color: var(--text-main);
      box-sizing: border-box;
      overflow: hidden;
      backdrop-filter: blur(28px) saturate(180%);
      -webkit-backdrop-filter: blur(28px) saturate(180%);
      animation: modalPop 0.35s var(--spring-physics) both;
    }
    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--border-subtle);
      gap: 12px;
      flex-shrink: 0;
    }
    .inspector-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .inspector-avatar {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: var(--gradient-brand);
      border: 1px solid var(--border-specular);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      box-shadow: 0 4px 16px var(--border-glow);
    }
    .inspector-scroll-area {
      overflow-y: auto;
      padding-top: 14px;
      padding-bottom: 8px;
      padding-right: 4px;
      flex: 1;
    }
    .telemetry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 14px;
    }
    .telemetry-card {
      background: var(--telemetry-card-bg);
      border: 1px solid var(--telemetry-card-border);
      border-radius: 16px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
    }
    .telemetry-card:hover {
      border-color: var(--border-focus);
      background: var(--bg-surface-hover);
      box-shadow: 0 6px 20px var(--border-glow);
      transform: translateY(-2px);
    }
    .telemetry-card-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 8px;
    }
    .telemetry-card-title span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .telemetry-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8rem;
      padding: 5px 0;
      border-bottom: 1px solid var(--border-subtle);
      gap: 8px;
    }
    .telemetry-item:last-child {
      border-bottom: none;
    }
    .telemetry-item-label {
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .telemetry-item-value {
      font-weight: 700;
      color: var(--text-main);
      text-align: left;
      word-break: break-all;
    }
    .telemetry-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
      padding-top: 10px;
      border-top: 1px dashed var(--border-subtle);
    }

    /* 📊 گرید و کارت‌های آمار زنده پنل کاربران و ادمین */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 10px;
      margin-bottom: 14px;
    }
    .stat-card {
      background: var(--stat-card-bg);
      border: 1px solid var(--stat-card-border);
      border-top: 1px solid var(--border-specular);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      transition: transform 0.22s var(--spring-physics), box-shadow 0.22s ease, border-color 0.2s ease;
    }
    .stat-card:hover {
      transform: translateY(-2px);
      border-color: var(--border-focus);
      box-shadow: 0 6px 20px var(--border-glow);
    }
    .stat-value {
      font-size: 1.3rem;
      font-weight: 900;
      font-family: 'JetBrains Mono', monospace;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .stat-label {
      color: var(--text-muted);
      font-size: 0.73rem;
      font-weight: 700;
    }
    .admin-filter-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      background: var(--filter-bar-bg);
      padding: 10px 14px;
      border-radius: 12px;
      border: 1px solid var(--border-subtle);
    }
    .badge-neutral {
      background: var(--badge-neutral-bg);
      color: var(--badge-neutral-color);
      border: 1px solid var(--badge-neutral-border);
      font-weight: 700;
    }

    @media (max-width: 680px) {
      .telemetry-grid {
        grid-template-columns: 1fr;
      }
      .admin-inspector-container {
        padding: 14px 12px;
      }
    }

    /* ==========================================================================
       🚀 Arizo Self — v4 Aurora Design Layer (vibrant, alive, fully responsive)
       ========================================================================== */
    :root, [data-theme="dark"] {
      --bg-dark: #05060f;
      --bg-surface: rgba(16, 18, 40, 0.62);
      --bg-surface-elevated: rgba(30, 28, 66, 0.82);
      --gradient-brand: linear-gradient(120deg, #ec4899 0%, #8b5cf6 45%, #22d3ee 100%);
      --gradient-brand-hover: linear-gradient(120deg, #f472b6 0%, #a78bfa 45%, #67e8f9 100%);
      --gradient-btn: linear-gradient(120deg, #ec4899 0%, #8b5cf6 55%, #6366f1 100%);
      --gradient-accent: linear-gradient(120deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%);
      --border-glow: rgba(139, 92, 246, 0.5);
      --edge-gradient: linear-gradient(140deg, rgba(236, 72, 153, 0.55), rgba(139, 92, 246, 0.18) 40%, rgba(34, 211, 238, 0.5));
      --card-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.8), 0 0 60px -30px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      --card-shadow-hover: 0 40px 80px -20px rgba(0, 0, 0, 0.85), 0 0 80px -25px rgba(236, 72, 153, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      --orb-opacity: 0.5;
      --safe-top: env(safe-area-inset-top, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
    }
    [data-theme="light"] {
      --bg-dark: #f8fafc;
      --bg-surface: rgba(255, 255, 255, 0.88);
      --bg-surface-elevated: #ffffff;
      --bg-surface-hover: #f1f5f9;
      --bg-input: #ffffff;
      --text-main: #0f172a;
      --text-muted: #334155;
      --text-dim: #64748b;
      --border-subtle: rgba(203, 213, 225, 0.85);
      --border-specular: #ffffff;
      --border-focus: rgba(124, 58, 237, 0.65);
      --border-glow: rgba(124, 58, 237, 0.22);
      --gradient-brand: linear-gradient(120deg, #db2777 0%, #7c3aed 50%, #0891b2 100%);
      --gradient-btn: linear-gradient(120deg, #db2777 0%, #7c3aed 60%, #4f46e5 100%);
      --edge-gradient: linear-gradient(140deg, rgba(219, 39, 119, 0.35), rgba(124, 58, 237, 0.1) 40%, rgba(8, 145, 178, 0.35));
      --card-shadow: 0 14px 40px -12px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(226, 232, 240, 0.9), inset 0 1px 0 #fff;
      --card-shadow-hover: 0 24px 50px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(124, 58, 237, 0.3), inset 0 1px 0 #fff;
      --modal-bg: #ffffff;
      --table-bg: #ffffff;
      --table-th-bg: #f8fafc;
      --table-hover-bg: #f1f5f9;
      --segmented-bg: #f1f5f9;
      --badge-bg: #f1f5f9;
      --btn-secondary-bg: #ffffff;
      --btn-secondary-hover: #f1f5f9;
      --btn-secondary-active: #e2e8f0;
      --clock-box-bg: linear-gradient(180deg, rgba(238, 242, 255, 0.85) 0%, rgba(248, 250, 252, 0.95) 100%);
      --clock-digits-grad: linear-gradient(135deg, #1e1b4b 20%, #4338ca 65%, #0284c7 100%);
      --clock-shadow: drop-shadow(0 0 14px rgba(99, 102, 241, 0.18));
      --orb-opacity: 0.2;
    }

    /* پس‌زمینهٔ مش گرادیانی + شبکهٔ ظریف */
    body {
      background-image:
        radial-gradient(60% 50% at 12% 0%, rgba(236, 72, 153, 0.16) 0%, transparent 60%),
        radial-gradient(55% 45% at 92% 8%, rgba(34, 211, 238, 0.14) 0%, transparent 60%),
        radial-gradient(60% 50% at 50% 100%, rgba(139, 92, 246, 0.18) 0%, transparent 65%);
      background-attachment: fixed;
      padding-top: calc(clamp(14px, 2.5vw, 24px) + var(--safe-top));
      padding-bottom: calc(65px + var(--safe-bottom));
    }
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 44px 44px;
      -webkit-mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
      mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
    }
    [data-theme="light"] body::before {
      background-image:
        linear-gradient(rgba(76, 29, 149, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(76, 29, 149, 0.05) 1px, transparent 1px);
    }

    /* کارت‌ها: حاشیهٔ گرادیانی نورانی + ورود پلکانی */
    .glass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: var(--edge-gradient);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      opacity: 0.75;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .glass-card:hover::before { opacity: 1; }
    .glass-card:hover { transform: translateY(-2px); }
    .container > .glass-card {
      animation: cardRise 0.65s var(--smooth-physics) both;
    }
    .container > .glass-card:nth-child(2) { animation-delay: 0.06s; }
    .container > .glass-card:nth-child(3) { animation-delay: 0.12s; }
    .container > .glass-card:nth-child(4) { animation-delay: 0.18s; }
    .container > .glass-card:nth-child(n+5) { animation-delay: 0.24s; }
    @keyframes cardRise {
      from { opacity: 0; transform: translateY(28px) scale(0.97); filter: blur(6px); }
      to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }

    /* نوبار شناور چسبان */
    .navbar {
      position: sticky;
      top: calc(8px + var(--safe-top));
      z-index: 50;
      border-radius: 22px;
    }
    .brand-gem {
      background: var(--gradient-brand);
      background-size: 200% 200%;
      animation: gemShift 6s ease-in-out infinite alternate;
      box-shadow: 0 8px 30px -4px rgba(236, 72, 153, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.5);
    }
    @keyframes gemShift {
      from { background-position: 0% 50%; }
      to { background-position: 100% 50%; }
    }
    .brand-title-gradient {
      background: var(--gradient-accent);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: textFlow 7s linear infinite;
    }
    @keyframes textFlow { to { background-position: 200% center; } }
    .badge-pro {
      background: var(--gradient-brand);
      color: #fff;
      border: none;
      box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
    }

    /* تیتر بخش‌ها با نوار رنگی */
    .section-title::before {
      content: '';
      width: 4px;
      height: 1.2em;
      border-radius: 4px;
      background: var(--gradient-brand);
      box-shadow: 0 0 14px rgba(236, 72, 153, 0.6);
      flex-shrink: 0;
    }
    .section-tag {
      background: linear-gradient(120deg, rgba(236, 72, 153, 0.14), rgba(34, 211, 238, 0.12));
      border-color: rgba(167, 139, 250, 0.35);
    }

    /* دکمه‌های اصلی با گرادیان متحرک */
    .btn-primary {
      background: var(--gradient-btn);
      background-size: 220% 100%;
      background-position: 0% 50%;
      box-shadow: 0 12px 30px -8px rgba(236, 72, 153, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.35);
      transition: transform 0.22s var(--spring-physics), box-shadow 0.22s ease, background-position 0.6s ease;
    }
    .btn-primary:hover:not(:disabled) {
      background-position: 100% 50%;
      box-shadow: 0 18px 40px -8px rgba(139, 92, 246, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.45);
    }
    .btn { min-height: 46px; }

    /* ورودی‌ها */
    .input-field:focus {
      border-color: #a78bfa;
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.22), 0 8px 24px -10px rgba(139, 92, 246, 0.6);
    }

    /* تب‌ها */
    .studio-tab-bar, .segmented-control, .admin-subtab-bar {
      background: rgba(0, 0, 0, 0.28);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    [data-theme="light"] .studio-tab-bar,
    [data-theme="light"] .segmented-control,
    [data-theme="light"] .admin-subtab-bar { background: rgba(124, 58, 237, 0.07); }
    .studio-tab-btn.active, .admin-subtab-btn.active {
      background: var(--gradient-btn);
      color: #fff !important;
      box-shadow: 0 10px 26px -6px rgba(236, 72, 153, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    }
    .segmented-btn.active {
      background: var(--gradient-btn);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 22px -6px rgba(139, 92, 246, 0.6);
    }
    .studio-tab-btn, .segmented-btn, .admin-subtab-btn { min-height: 44px; }

    /* ساعت و ماکاپ تلگرام */
    .tg-mockup-wrapper {
      background:
        radial-gradient(80% 120% at 100% 0%, rgba(34, 211, 238, 0.14), transparent 60%),
        radial-gradient(80% 120% at 0% 100%, rgba(236, 72, 153, 0.14), transparent 60%),
        var(--clock-box-bg);
      border-radius: 24px;
    }
    .tg-mockup-avatar {
      background: var(--gradient-brand);
      box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.06), 0 14px 34px -6px rgba(236, 72, 153, 0.6);
    }
    .tg-clock-digits {
      font-size: clamp(2.8rem, 11vw, 4.6rem);
      filter: drop-shadow(0 0 26px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 50px rgba(34, 211, 238, 0.25));
    }
    .tg-mockup-body { backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }

    /* ☀️ تمایز و کنتراست ۱۰۰٪ بی‌نقص تم روز و شب */
    [data-theme="light"] .tg-mockup-wrapper {
      background: linear-gradient(180deg, rgba(241, 245, 249, 0.94) 0%, rgba(255, 255, 255, 0.98) 100%);
      border-color: rgba(226, 232, 240, 0.9);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.08), inset 0 1px 0 #fff;
    }
    [data-theme="light"] .tg-mockup-body {
      background: #f8fafc;
      border-color: rgba(226, 232, 240, 0.9);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.04);
    }
    [data-theme="light"] .tg-mockup-firstname {
      color: #0f172a;
    }
    [data-theme="light"] .hero-clock-box {
      background: var(--clock-box-bg);
      border-color: rgba(226, 232, 240, 0.9);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.08), inset 0 1px 0 #fff;
    }
    [data-theme="light"] .toggle-row,
    [data-theme="light"] .preset-card,
    [data-theme="light"] .stat-card,
    [data-theme="light"] .health-item,
    [data-theme="light"] .admin-kpi-card {
      background: #ffffff;
      border-color: rgba(226, 232, 240, 0.9);
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
    }
    [data-theme="light"] .admin-table th {
      background: #f1f5f9;
      color: #334155;
    }
    [data-theme="light"] .admin-table td {
      border-bottom-color: rgba(226, 232, 240, 0.9);
      color: #0f172a;
    }
    [data-theme="light"] .admin-table tbody tr:hover {
      background-color: #f8fafc;
    }
    [data-theme="light"] .table-responsive-wrapper {
      box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.04);
    }
    [data-theme="light"] .table-responsive-wrapper::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    [data-theme="light"] select.input-field option {
      background: #ffffff;
      color: #0f172a;
    }
    [data-theme="dark"] select.input-field option {
      background: #0f172a;
      color: #f8fafc;
    }
    [data-theme="light"] .meta-chip {
      background: #f1f5f9;
      border-color: rgba(226, 232, 240, 0.9);
      color: #475569;
    }
    [data-theme="light"] .meta-chip:hover {
      color: #0f172a;
    }
    [data-theme="light"] .bio-preset-pill {
      background: #f8fafc;
      border-color: rgba(203, 213, 225, 0.9);
      color: #475569;
    }
    [data-theme="light"] .bio-preset-pill:hover {
      color: #0f172a;
      background: rgba(124, 58, 237, 0.06);
    }
    [data-theme="light"] .sep-pill {
      background: #ffffff;
      border-color: rgba(203, 213, 225, 0.9);
      color: #334155;
    }
    [data-theme="light"] .var-chip {
      background: rgba(124, 58, 237, 0.08);
      border-color: rgba(124, 58, 237, 0.25);
      color: #7c3aed;
    }
    [data-theme="light"] .navbar {
      background: rgba(255, 255, 255, 0.88);
      border-color: rgba(226, 232, 240, 0.9);
      box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.08);
    }
    [data-theme="light"] .footer-dock {
      background: rgba(255, 255, 255, 0.88);
      border-top-color: rgba(226, 232, 240, 0.9);
    }
    [data-theme="light"] .modal-container,
    [data-theme="light"] .features-modal-container,
    [data-theme="light"] .admin-inspector-container {
      background: #ffffff;
      border-color: rgba(203, 213, 225, 0.9);
      box-shadow: 0 30px 80px -15px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(226, 232, 240, 0.9);
      color: #0f172a;
    }
    [data-theme="light"] .features-modal-header {
      border-bottom-color: rgba(226, 232, 240, 0.9);
    }
    [data-theme="light"] .features-modal-action-bar {
      border-top-color: rgba(226, 232, 240, 0.9);
    }
    [data-theme="light"] .feature-card-item {
      background: #f8fafc;
      border-color: rgba(226, 232, 240, 0.9);
    }
    [data-theme="light"] .feature-card-item:hover {
      background: #ffffff;
      border-color: rgba(124, 58, 237, 0.4);
      box-shadow: 0 10px 24px -6px rgba(15, 23, 42, 0.08);
    }
    [data-theme="light"] .admin-filter-bar {
      background: #f8fafc;
      border: 1px solid rgba(226, 232, 240, 0.9);
    }
    code {
      font-family: 'JetBrains Mono', monospace;
      background: var(--accent-purple-bg);
      color: var(--accent-purple);
      border: 1px solid var(--accent-purple-border);
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.85em;
    }

    /* کارت‌های ریز: کیپی‌آی، پریست، تاگل */
    .admin-kpi-card, .stat-card, .health-item, .preset-card, .toggle-row { position: relative; overflow: hidden; }
    .admin-kpi-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 3px;
      background: var(--gradient-brand);
      opacity: 0.85;
    }
    .admin-kpi-num { background: var(--gradient-accent); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
    .preset-card.active { border-color: #ec4899; box-shadow: 0 0 0 1px rgba(236, 72, 153, 0.5), 0 14px 36px -10px rgba(236, 72, 153, 0.5); }
    .toggle-row::before {
      content: '';
      position: absolute;
      top: 14%; bottom: 14%;
      inset-inline-start: 0;
      width: 3px;
      border-radius: 3px;
      background: var(--gradient-brand);
      opacity: 0.55;
    }
    input:checked + .slider {
      background: var(--gradient-brand);
      border-color: transparent;
      box-shadow: 0 0 20px rgba(236, 72, 153, 0.55);
    }

    /* مودال‌ها و توست */
    .modal-container, .features-modal-container, .admin-inspector-container {
      box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.85), 0 0 80px -30px rgba(139, 92, 246, 0.6);
    }
    .btn-feature-start { background: var(--gradient-btn); }

    /* اسکرول‌بار */
    * { scrollbar-width: thin; scrollbar-color: rgba(139, 92, 246, 0.45) transparent; }
    ::selection { background: rgba(236, 72, 153, 0.4); color: #fff; }

    /* ریسپانسیو دقیق */
    @media (min-width: 1400px) {
      .container { max-width: 1120px; }
    }
    @media (max-width: 680px) {
      .navbar { top: calc(6px + var(--safe-top)); }
      .glass-card:hover { transform: none; }
      .tg-mockup-header { gap: 14px; }
      .tg-mockup-avatar { width: 56px; height: 56px; }
      .toggle-row { flex-wrap: wrap; }
    }
    @media (max-width: 400px) {
      .navbar { position: static; }
    }
    @media (hover: none) {
      .btn:hover:not(:disabled), .preset-card:hover, .admin-kpi-card:hover { transform: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }

    /* 🤖 نوار ابزار تعاملی و کامپوننت‌های ریسپانسیو API هوش مصنوعی */
    .ai-key-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      margin-top: 10px;
      width: 100%;
    }
    .ai-key-btn-group {
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      gap: 10px !important;
      width: 100% !important;
      flex-wrap: nowrap !important;
    }
    .ai-key-btn-group .btn {
      flex: 1 1 50% !important;
      min-width: 0 !important;
      height: 44px !important;
      min-height: 44px !important;
      padding: 8px 12px !important;
      font-size: 0.82rem !important;
      font-weight: 700 !important;
      border-radius: var(--radius-md) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 6px !important;
      white-space: nowrap !important;
      box-sizing: border-box !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }
    .ai-key-helper-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 10px;
      padding: 10px 14px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      font-size: 0.78rem;
      flex-wrap: wrap;
    }
    .ai-key-link-badge {
      color: var(--accent-blue);
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(59, 130, 246, 0.08);
      padding: 4px 10px;
      border-radius: 8px;
      border: 1px solid rgba(59, 130, 246, 0.2);
      transition: all 0.2s ease;
    }
    .ai-key-link-badge:hover {
      background: rgba(59, 130, 246, 0.16);
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }
    @media (max-width: 680px) {
      .ai-key-toolbar {
        width: 100%;
      }
      .ai-key-btn-group {
        display: flex !important;
        flex-direction: row !important;
        width: 100% !important;
        gap: 8px !important;
        flex-wrap: nowrap !important;
      }
      .ai-key-btn-group .btn {
        flex: 1 1 50% !important;
        min-width: 0 !important;
        padding: 8px 10px !important;
        font-size: 0.76rem !important;
      }
      .ai-key-helper-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }

    /* 🚫 کارت و چیپ‌های تعاملی کاربران مستثنی از هوش مصنوعی */
    .ai-ignore-manager-card {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 20px;
      margin-top: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      position: relative;
    }
    .ai-ignore-manager-card:focus-within {
      border-color: rgba(99, 102, 241, 0.45);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.12);
    }
    .ai-ignore-input-row {
      display: flex !important;
      flex-direction: row !important;
      gap: 10px !important;
      align-items: stretch !important;
      width: 100% !important;
      box-sizing: border-box !important;
      position: relative !important;
    }
    .ai-ignore-input-wrap {
      position: relative !important;
      flex: 1 1 auto !important;
      width: 100% !important;
      min-width: 0 !important;
      display: flex !important;
      align-items: center !important;
      box-sizing: border-box !important;
    }
    .ai-ignore-input-icon {
      position: absolute !important;
      right: 15px !important;
      left: auto !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      font-size: 1.15rem !important;
      color: var(--text-muted) !important;
      pointer-events: none !important;
      user-select: none !important;
      z-index: 3 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    html[dir="ltr"] .ai-ignore-input-icon {
      left: 15px !important;
      right: auto !important;
    }
    .ai-ignore-quick-input {
      width: 100% !important;
      height: 48px !important;
      min-height: 48px !important;
      padding: 10px 48px 10px 16px !important;
      background: var(--bg-input) !important;
      border: 1.5px solid var(--border-subtle) !important;
      border-radius: var(--radius-md) !important;
      color: var(--text-main) !important;
      font-size: 0.92rem !important;
      font-family: inherit !important;
      line-height: normal !important;
      box-sizing: border-box !important;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.12) !important;
      transition: all 0.22s ease !important;
      outline: none !important;
      direction: rtl !important;
      text-align: right !important;
    }
    html[dir="ltr"] .ai-ignore-quick-input {
      padding: 10px 16px 10px 48px !important;
      direction: ltr !important;
      text-align: left !important;
    }
    .ai-ignore-quick-input:focus {
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.22), inset 0 1px 3px rgba(0, 0, 0, 0.15) !important;
      background: var(--bg-surface-elevated) !important;
    }
    .ai-ignore-quick-input::placeholder {
      color: var(--text-muted) !important;
      opacity: 0.85 !important;
      font-size: 0.85rem !important;
      font-family: 'Vazirmatn', sans-serif !important;
      direction: rtl !important;
      text-align: right !important;
    }
    html[dir="ltr"] .ai-ignore-quick-input::placeholder {
      direction: ltr !important;
      text-align: left !important;
    }
    .btn-add-ai-ignore {
      width: auto !important;
      min-width: 145px !important;
      height: 48px !important;
      min-height: 48px !important;
      padding: 0 22px !important;
      font-size: 0.88rem !important;
      font-weight: 700 !important;
      border-radius: var(--radius-md) !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      white-space: nowrap !important;
      flex: 0 0 auto !important;
      flex-shrink: 0 !important;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
      color: #ffffff !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      cursor: pointer !important;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.32) !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .btn-add-ai-ignore:hover {
      transform: translateY(-1.5px) !important;
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.48) !important;
      background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%) !important;
    }
    .btn-add-ai-ignore:active {
      transform: translateY(0) !important;
      box-shadow: 0 2px 6px rgba(99, 102, 241, 0.25) !important;
    }
    @media (max-width: 580px) {
      .ai-ignore-input-row {
        flex-direction: column !important;
        align-items: stretch !important;
        gap: 10px !important;
      }
      .ai-ignore-input-wrap {
        width: 100% !important;
        flex: 1 1 100% !important;
      }
      .btn-add-ai-ignore {
        width: 100% !important;
        min-width: 100% !important;
        flex: 1 1 auto !important;
        height: 48px !important;
        min-height: 48px !important;
      }
      .ai-ignore-quick-input {
        height: 48px !important;
        min-height: 48px !important;
      }
    }
    .ai-ignore-chips-box {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      min-height: 48px;
      padding: 12px 14px;
      background: var(--bg-surface);
      border: 1px dashed var(--border-subtle);
      border-radius: var(--radius-md);
      align-items: center;
      margin-top: 12px;
      transition: all 0.2s ease;
    }
    .ai-ignore-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 12px 5px 9px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 20px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--text-main);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: default;
      user-select: none;
    }
    .ai-ignore-chip:hover {
      border-color: rgba(99, 102, 241, 0.5);
      background: var(--bg-surface);
      transform: translateY(-1px);
      box-shadow: 0 3px 8px rgba(99, 102, 241, 0.15);
    }
    .ai-ignore-chip.chip-numeric {
      border-color: rgba(59, 130, 246, 0.4);
      background: rgba(59, 130, 246, 0.06);
    }
    .ai-ignore-chip.chip-numeric:hover {
      border-color: rgba(59, 130, 246, 0.7);
      background: rgba(59, 130, 246, 0.12);
    }
    .ai-ignore-chip.chip-username {
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.06);
    }
    .ai-ignore-chip.chip-username:hover {
      border-color: rgba(16, 185, 129, 0.7);
      background: rgba(16, 185, 129, 0.12);
    }
    .ai-chip-icon {
      font-size: 0.85rem;
      line-height: 1;
      opacity: 0.9;
    }
    .ai-chip-text {
      direction: ltr;
      font-weight: 600;
      letter-spacing: 0.3px;
    }
    .ai-chip-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 19px;
      height: 19px;
      border-radius: 50%;
      background: rgba(244, 63, 94, 0.12);
      color: var(--accent-rose);
      border: none;
      cursor: pointer;
      font-size: 0.72rem;
      font-weight: bold;
      line-height: 1;
      padding: 0;
      transition: all 0.18s ease;
      margin-right: -2px;
    }
    .ai-chip-remove:hover {
      background: var(--accent-rose);
      color: #ffffff;
      transform: scale(1.15);
    }

    /* 💎 بج و بنر اختصاصی وضعیت اشتراک و اعتبار حساب کاربری در بالای سایت */
    .nav-plan-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--bg-surface-elevated);
      border: 1px solid var(--accent-indigo-border);
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      user-select: none;
    }
    .nav-plan-chip:hover {
      transform: translateY(-1px);
      border-color: var(--accent-indigo);
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.25);
    }
    .nav-plan-validity-pill {
      padding: 2px 7px;
      border-radius: 999px;
      font-size: 0.72rem;
      background: rgba(16, 185, 129, 0.15);
      color: var(--accent-green);
      border: 1px solid var(--accent-green-border);
      font-weight: 700;
      letter-spacing: -0.2px;
    }
    .nav-user-profile-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 9px;
      border-radius: 8px;
      background: var(--bg-surface-hover);
      border: 1px solid var(--border-subtle);
    }
    .nav-user-avatar {
      font-size: 0.85rem;
      line-height: 1;
    }

    /* کارت شاخص و شکیل اشتراک و اعتبار بالای داشبورد */
    .user-sub-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      flex-wrap: wrap;
      padding: 16px 20px;
      margin-bottom: 20px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.9) 100%);
      border: 1px solid var(--border-specular);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    [data-theme="light"] .user-sub-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(241, 245, 249, 0.96) 100%);
      border: 1px solid rgba(226, 232, 240, 0.9);
      box-shadow: 0 8px 24px rgba(148, 163, 184, 0.15), inset 0 1px 0 #ffffff;
    }
    .user-sub-card::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #10b981 100%);
    }
    .user-sub-main {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 220px;
      flex: 1 1 auto;
    }
    .user-sub-avatar-wrap {
      position: relative;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      font-weight: 800;
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
      flex-shrink: 0;
      border: 2px solid rgba(255, 255, 255, 0.15);
    }
    .user-sub-status-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--accent-green);
      border: 2px solid var(--bg-card);
      box-shadow: 0 0 8px var(--accent-green);
    }
    .user-sub-user-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .user-sub-greeting {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .user-sub-hello {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .user-sub-uname {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.3px;
    }
    .user-sub-role-badge {
      font-size: 0.7rem;
      padding: 1px 7px;
      border-radius: 999px;
      background: var(--bg-surface-hover);
      color: var(--text-dim);
      border: 1px solid var(--border-subtle);
      font-weight: 700;
    }
    .user-sub-plan-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .user-sub-plan-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 3px 9px;
      border-radius: 6px;
      background: rgba(99, 102, 241, 0.12);
      color: var(--accent-indigo);
      border: 1px solid var(--accent-indigo-border);
    }
    .user-sub-plan-status {
      font-size: 0.74rem;
      color: var(--text-muted);
    }
    .user-sub-meter-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 250px;
      flex: 1 1 290px;
      background: var(--bg-surface-elevated);
      padding: 10px 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-subtle);
    }
    .user-sub-validity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .user-sub-validity-title {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 800;
      font-size: 0.88rem;
      color: var(--text-main);
    }
    .user-sub-expiry-date {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .user-sub-progress-track {
      width: 100%;
      height: 7px;
      background: var(--bg-surface-hover);
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid var(--border-subtle);
    }
    .user-sub-progress-bar {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #10b981 0%, #3b82f6 100%);
      transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
    }
    .user-sub-action-wrap {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
    }
    .btn-sub-renew {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: var(--radius-md);
      font-size: 0.84rem;
      font-weight: 700;
      color: #ffffff;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-sub-renew:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    }
    @media (max-width: 640px) {
      .user-sub-card {
        padding: 14px;
        gap: 14px;
      }
      .user-sub-main {
        min-width: 100%;
      }
      .user-sub-meter-box {
        min-width: 100%;
      }
      .user-sub-action-wrap {
        width: 100%;
      }
      .btn-sub-renew {
        width: 100%;
        justify-content: center;
      }
      .nav-plan-chip .nav-plan-name {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- 🌌 بوم متحرک ذرات پس‌زمینه -->
  <canvas id="algoCanvas"></canvas>

  <!-- نورپردازی پس‌زمینه (Ambient Glow) -->
  <div class="aurora-container">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="container">

    <!-- ⚡ نوبار شناور تفکیک‌شده Arizo Self -->
    <div class="glass-card navbar">
      <div class="brand">
        <div class="brand-gem" onclick="location.reload()" title="Arizo Self Studio">⚡</div>
        <div class="brand-title-wrap">
          <h1>
            <span class="brand-title-gradient">Arizo Self</span>
            <span class="badge-pro">PRO v4.0</span>
          </h1>
        </div>
      </div>

      <div class="nav-actions">
        <!-- 🌐 دکمه سوئیچ زبان انگلیسی / فارسی -->
        <button class="btn-theme-toggle" id="langToggleBtn" onclick="toggleLanguage()" title="Switch Language / تغییر زبان" style="border-color: var(--accent-blue-border); color: var(--accent-blue); background: var(--accent-blue-bg);">
          <span id="langIcon">🌐</span>
          <span class="theme-text" id="langText" style="font-weight:700;">English</span>
        </button>

        <!-- ☀️ دکمه سوئیچ تم روز و شب -->
        <button class="btn-theme-toggle" id="themeToggleBtn" onclick="toggleTheme()" title="تغییر حالت شب و روز">
          <span class="theme-icon-rotate" id="themeIcon">☀️</span>
          <span class="theme-text" id="themeText" data-i18n="themeDay">حالت روز</span>
        </button>

        <!-- 💡 دکمه رسمی راهنمای امکانات سامانه -->
        <button class="btn-theme-toggle" id="featureTourNavBtn" onclick="openFeaturesModal()" title="راهنمای جامع امکانات و سرویس‌های سامانه Arizo Self" style="border-color: var(--accent-purple-border); color: var(--accent-purple); background: var(--accent-purple-bg);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span class="theme-text" style="font-weight:700;" data-i18n="featureTour">راهنمای امکانات</span>
        </button>

        <!-- 👑 دکمه طلایی دسترسی به پنل مدیریت (فقط برای ادمین پس از لاگین نمایان می‌شود) -->
        <button class="btn-admin-highlight hidden" id="adminPortalNavBtn" onclick="openAdminPortal()" title="ورود به پنل مدیریت ارشد و مانیتورینگ">
          <span>👑</span> <span data-i18n="adminPortal">پنل مدیریت</span>
        </button>

        <!-- نشانگر حساب کاربری کاربر متصل -->
        <div id="userHeaderBadge" class="hidden" style="display:flex; align-items:center; gap:8px;">
          <div class="nav-user-profile-wrap">
            <span class="nav-user-avatar">👤</span>
            <span style="font-size:0.85rem; font-weight:700; color:var(--text-main);" id="usernameDisplay">کاربر</span>
          </div>
          <button class="btn-nav-action" onclick="openSettingsModal()" title="تنظیمات حساب" data-i18n-title="userSettings">⚙️</button>
          <button class="btn-nav-action" onclick="logoutUser()" title="خروج" data-i18n-title="userLogout" style="color:var(--accent-rose);">🚪</button>
        </div>
      </div>
    </div>

    <!-- 👑 مدیریت سامانه و لایسنس‌ها (Super Admin Portal) -->
    <div id="adminPanelSection" class="glass-card hidden">
      <div class="section-header">
        <div class="section-title">
          <span>👑</span> <span data-i18n="adminHeaderTitle">مدیریت سامانه و لایسنس‌ها</span>
        </div>
        <button class="btn-nav-action" onclick="closeAdminPortal()" style="color:var(--accent-rose);">
          <span>✕</span> <span data-i18n="adminReturnBtn">بازگشت به پنل کاربران</span>
        </button>
      </div>

      <!-- داشبورد تفکیک‌شده ادمین با تب‌های مجزا -->
      <div id="adminDashboardBox">
        
        <!-- 📑 نوار تب‌های تفکیک‌شده ادمین -->
        <div class="admin-subtab-bar">
          <button id="adminSubtabStats" class="admin-subtab-btn active" onclick="switchAdminSubtab('stats')">
            <span>📊</span> <span data-i18n="adminTabStats">آمار و شاخص‌ها</span>
          </button>
          <button id="adminSubtabCodes" class="admin-subtab-btn" onclick="switchAdminSubtab('codes')">
            <span>🎟️</span> <span data-i18n="adminTabCodes">صدور و انبار لایسنس</span>
          </button>
          <button id="adminSubtabUsers" class="admin-subtab-btn" onclick="switchAdminSubtab('users')">
            <span>👥</span> <span data-i18n="adminTabUsers">مدیریت کاربران و ربات‌ها</span>
          </button>
        </div>

        <!-- 📊 تب ۱: آمار و کارت‌های شاخص -->
        <div id="adminTabContentStats">
          <div class="admin-kpi-grid">
            <div class="admin-kpi-card">
              <div class="admin-kpi-num" id="statUsers">۰</div>
              <div class="admin-kpi-title">👥 کل کاربران</div>
            </div>
            <div class="admin-kpi-card">
              <div class="admin-kpi-num" id="statBots" style="color:var(--accent-green);">۰</div>
              <div class="admin-kpi-title">🟢 ربات‌های فعال</div>
            </div>
            <div class="admin-kpi-card">
              <div class="admin-kpi-num" id="statAvailCodes" style="color:var(--accent-blue);">۰</div>
              <div class="admin-kpi-title">🎟️ کدهای آماده فروش</div>
            </div>
            <div class="admin-kpi-card">
              <div class="admin-kpi-num" id="statUsedCodes" style="color:var(--accent-rose);">۰</div>
              <div class="admin-kpi-title">💳 کدهای مصرف‌شده</div>
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
            <div style="font-size:0.9rem; font-weight:800; color:var(--text-main); margin-bottom:8px;">
              🌐 سلامت شبکه ابری Arizo Edge
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted); line-height: 1.6;">
              سرورهای Cloudflare Workers با توزیع جهانی در حال اجرای کرون‌جاب‌های زمان‌بندی‌شده هستند. اتصال همگام‌ساز تهران در میلی‌ثانیه صفر هر دقیقه فعال است.
            </div>
          </div>
        </div>

        <!-- 🎟️ تب ۲: تولید و انبار کدهای لایسنس برای فروش -->
        <div id="adminTabContentCodes" class="hidden">
          <!-- فرم تولید کد -->
          <div style="background: var(--accent-amber-bg); border: 1px solid var(--accent-amber-border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 22px;">
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--accent-amber); margin-bottom: 12px; display:flex; align-items:center; gap:6px;">
              <span>✨</span> صدور کدهای جدید لایسنس Arizo Self برای فروش به خریداران
            </div>
            <div style="display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap;">
              <div class="form-group" style="flex: 1; min-width: 120px; margin-bottom:0;">
                <label class="form-label">تعداد کد</label>
                <select id="codeCountSelect" class="input-field" style="background:var(--bg-input);">
                  <option value="1">۱ عدد کد</option>
                  <option value="5" selected>۵ عدد کد</option>
                  <option value="10">۱۰ عدد کد</option>
                  <option value="20">۲۰ عدد کد</option>
                </select>
              </div>
              <div class="form-group" style="flex: 2; min-width: 190px; margin-bottom:0;">
                <label class="form-label">نوع اشتراک و اعتبار</label>
                <select id="codePlanSelect" class="input-field" style="background:var(--bg-input);" onchange="onCodePlanChange()">
                  <option value="1_month" selected>اشتراک ۱ ماهه (۳۰ روز)</option>
                  <option value="3_months">اشتراک ۳ ماهه (۹۰ روز)</option>
                  <option value="6_months">اشتراک ۶ ماهه (۱۸۰ روز)</option>
                  <option value="lifetime">اشتراک دائمی و نامحدود</option>
                  <option value="custom">⭐ سفارشی (تعیین روز دلخواه توسط ادمین)</option>
                </select>
              </div>
              <div id="customDaysGroup" class="form-group hidden" style="flex: 1; min-width: 130px; margin-bottom:0;">
                <label class="form-label">تعداد روزهای اعتبار</label>
                <input type="number" id="customDaysInput" class="input-field mono" min="1" max="3650" value="15" placeholder="مثال: ۱۵ (تعداد روز اعتبار لایسنس)">
              </div>
            </div>
            <button class="btn btn-gold" id="btnGenerateCodes" onclick="doGenerateCodes()">
              <span>🎟️ تولید کدهای لایسنس جدید و اضافه به انبار</span>
            </button>
          </div>

          <!-- جدول انبار کدها -->
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 10px; display:flex; justify-content:space-between; align-items:center;">
              <span>📋 انبار کدهای لایسنس موجود (کپی مستقیم جهت ارسال به مشتری)</span>
              <button class="btn-nav-action" onclick="loadAdminData()">🔄 رفرش</button>
            </div>
            <div class="table-responsive-wrapper" style="max-height: 340px;">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>کد لایسنس</th>
                    <th>پلن و روزها</th>
                    <th>وضعیت</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody id="codesTableBody">
                  <tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:18px;">درحال بارگذاری کدها...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 👥 تب ۳: مدیریت کاربران و کنترل سلف‌بات‌ها -->
        <div id="adminTabContentUsers" class="hidden">
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center;">
            <span>👥 مانیتورینگ زنده کاربران، ربات‌های کمکی و امنیت ۲FA</span>
            <button class="btn-nav-action" onclick="loadAdminData()">🔄 رفرش سریع</button>
          </div>

          <!-- کارت‌های آمار زنده بخش کاربران -->
          <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 14px;">
            <div class="stat-card" style="padding: 10px 14px;">
              <div class="stat-value" id="adminUsersCount" style="font-size: 1.25rem; color: var(--accent-purple);">0</div>
              <div class="stat-label" style="font-size: 0.72rem;">👥 کل کاربران</div>
            </div>
            <div class="stat-card" style="padding: 10px 14px;">
              <div class="stat-value" id="adminBotUsersCount" style="font-size: 1.25rem; color: var(--accent-blue);">0</div>
              <div class="stat-label" style="font-size: 0.72rem;">🤖 دارای ربات کمکی</div>
            </div>
            <div class="stat-card" style="padding: 10px 14px;">
              <div class="stat-value" id="admin2faUsersCount" style="font-size: 1.25rem; color: var(--accent-green);">0</div>
              <div class="stat-label" style="font-size: 0.72rem;">🔐 تایید ۲FA فعال</div>
            </div>
            <div class="stat-card" style="padding: 10px 14px;">
              <div class="stat-value" id="adminSelfbotUsersCount" style="font-size: 1.25rem; color: var(--accent-amber);">0</div>
              <div class="stat-label" style="font-size: 0.72rem;">📱 سلف‌بات فعال</div>
            </div>
          </div>

          <!-- نوار جستجو و فیلتر پیشرفته -->
          <div class="admin-filter-bar">
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; flex:1; min-width:240px;">
              <input type="text" id="adminUserSearchInput" class="input-field" placeholder="🔍 جستجو بر اساس نام کاربری، شناسه تلگرام یا ربات..." style="padding:7px 12px; font-size:0.8rem; flex:1; min-width:180px;" oninput="filterAdminUsers()">
              <select id="adminUserFilterSelect" class="input-field" style="padding:7px 10px; font-size:0.8rem; width:auto; cursor:pointer;" onchange="filterAdminUsers()">
                <option value="all">🌐 همه کاربران</option>
                <option value="bot">🤖 دارای ربات کمکی اختصاصی</option>
                <option value="no_bot">⚪ فاقد ربات کمکی</option>
                <option value="2fa_on">🔐 تایید ۲FA فعال</option>
                <option value="2fa_off">🔓 تایید ۲FA خاموش</option>
                <option value="tg_active">🟢 سلف‌بات متصل و فعال</option>
                <option value="suspended">⏸️ معلق یا منقضی‌شده</option>
                <option value="admin">🛡️ مدیران ارشد سیستم</option>
              </select>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button class="btn-nav-action" onclick="doQuickPromoteAdmin()" style="color:var(--accent-purple); background:var(--accent-purple-bg); border-color:var(--accent-purple-border); font-weight:700; padding:6px 12px; font-size:0.78rem;" title="ارتقای یک کاربر به مدیر سامانه">🛡️ ارتقا به مدیر</button>
              <button class="btn-nav-action" onclick="loadAdminData()" title="تازه‌سازی لیست">🔄 بروزرسانی</button>
            </div>
          </div>

          <div class="table-responsive-wrapper" style="max-height: 420px;">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>نام کاربری</th>
                  <th>دسترسی</th>
                  <th>ربات کمکی</th>
                  <th>امنیت ۲FA</th>
                  <th>تلگرام</th>
                  <th>پلن و اعتبار</th>
                  <th>وضعیت</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody id="usersTableBody">
                <tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:18px;">درحال بارگذاری کاربران...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <button class="btn btn-secondary" onclick="closeAdminPortal()" style="margin-top: 24px; color:var(--text-main);">
          <span>↩️ بازگشت به داشبورد کاربری</span>
        </button>

      </div>
    </div>

    <!-- 👤 درگاه ورود و ساخت حساب کاربران -->
    <div id="userAuthSection" class="glass-card">
      <div class="segmented-control">
        <button id="userTabLogin" class="segmented-btn active" onclick="switchUserTab('login')">
          <span>🔑</span> <span data-i18n="authTabLogin">ورود به حساب</span>
        </button>
        <button id="userTabRegister" class="segmented-btn" onclick="switchUserTab('register')">
          <span>✨</span> <span data-i18n="authTabRegister">ساخت حساب (نیاز به لایسنس)</span>
        </button>
      </div>

      <!-- فرم ورود کاربران عادی -->
      <div id="loginFormBox">
        <div class="form-group">
          <label class="form-label" data-i18n="authUsernameLabel">نام کاربری اختصاصی</label>
          <input type="text" id="loginUsername" class="input-field mono" placeholder="نام کاربری شما (مثال: amirmaster)" autocomplete="username" data-i18n-placeholder="authUsernamePlaceholder">
        </div>

        <div class="form-group">
          <label class="form-label" data-i18n="authPasswordLabel">رمز عبور امن</label>
          <input type="password" id="loginPassword" class="input-field" placeholder="رمز عبور حساب کاربری (••••••••)" autocomplete="current-password" data-i18n-placeholder="authPasswordPlaceholder">
        </div>

        <button class="btn btn-primary" id="loginBtn" onclick="doUserLogin()">
          <span data-i18n="authLoginBtn">ورود به داشبورد Arizo Self</span>
        </button>

      </div>

      <!-- فرم ثبت‌نام کاربران با کد لایسنس -->
      <div id="registerFormBox" class="hidden">
        <div class="form-group" style="background: var(--accent-purple-bg); border: 1px dashed var(--accent-purple-border); border-radius: var(--radius-md); padding: 14px;">
          <label class="form-label" style="color: var(--accent-purple);">
            <span data-i18n="authLicenseLabel">🎟️ کد لایسنس / ردیم‌کد فعال‌سازی</span>
            <span style="font-size:0.75rem; color:var(--accent-amber);" data-i18n="authLicenseReq">الزامی جهت ساخت حساب</span>
          </label>
          <input type="text" id="regLicenseCode" class="input-field mono" placeholder="کد لایسنس فعال‌سازی (مثال: ARIZO-XXXX-XXXX-XXXX)" style="text-transform: uppercase; font-size:1.05rem; letter-spacing:1px; color:var(--accent-purple);" data-i18n-placeholder="authLicensePlaceholder">
          <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 6px; line-height: 1.5;" data-i18n="authLicenseHint">
            💳 این کد را از فروشنده دریافت کرده و در اینجا وارد کنید (برای مدیر اول در دیتابیس تازه، نیازی به لایسنس نیست).
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" data-i18n="authRegUsernameLabel">نام کاربری جدید</label>
          <input type="text" id="regUsername" class="input-field mono" placeholder="نام کاربری دلخواه (مثال: amir_vip)" data-i18n-placeholder="authRegUsernamePlaceholder">
        </div>

        <div class="form-group">
          <label class="form-label" data-i18n="authRegPassLabel">رمز عبور امن (حداقل ۸ کاراکتر)</label>
          <input type="password" id="regPassword" class="input-field" placeholder="رمز عبور امن و قوی (حداقل ۸ کاراکتر)" data-i18n-placeholder="authRegPassPlaceholder">
        </div>

        <div class="form-group">
          <label class="form-label" data-i18n="authRegPassConfirmLabel">تکرار رمز عبور</label>
          <input type="password" id="regPasswordConfirm" class="input-field" placeholder="تکرار مجدد رمز عبور جهت اطمینان" data-i18n-placeholder="authRegPassConfirmPlaceholder">
        </div>

        <button class="btn btn-primary" id="regBtn" onclick="doUserRegister()">
          <span data-i18n="authRegBtn">ایجاد حساب و فعال‌سازی اشتراک</span>
        </button>
      </div>
    </div>

    <!-- 💎 کارت شاخص و وضعیت اشتراک و اعتبار کاربر در بالای سایت -->
    <div id="userTopSubscriptionBanner" class="user-sub-card hidden">
      <div class="user-sub-main">
        <div class="user-sub-avatar-wrap">
          <div class="user-sub-avatar" id="subBannerAvatar">👤</div>
          <span class="user-sub-status-dot" id="subBannerStatusDot"></span>
        </div>
        <div class="user-sub-user-info">
          <div class="user-sub-greeting">
            <span class="user-sub-hello" data-i18n="subBannerHello">حساب کاربری:</span>
            <span class="user-sub-uname" id="subBannerUsername">کاربر</span>
            <span class="user-sub-role-badge" id="subBannerRoleBadge"></span>
          </div>
          <div class="user-sub-plan-row">
            <span class="user-sub-plan-badge" id="subBannerPlanBadge">
              <span id="subBannerPlanIcon">⭐</span>
              <span id="subBannerPlanName">اشتراک</span>
            </span>
            <span class="user-sub-plan-status" id="subBannerPlanStatus">فعال</span>
          </div>
        </div>
      </div>

      <div class="user-sub-meter-box">
        <div class="user-sub-validity-header">
          <div class="user-sub-validity-title" id="subBannerValidityTitle">
            <span class="user-sub-clock-icon">⏳</span>
            <span id="subBannerRemainingDaysText">درحال بررسی اعتبار...</span>
          </div>
          <div class="user-sub-expiry-date" id="subBannerExpiryDateText">
            تاریخ پایان: -
          </div>
        </div>
        <div class="user-sub-progress-track">
          <div class="user-sub-progress-bar" id="subBannerProgressBar" style="width: 100%;"></div>
        </div>
      </div>

      <div class="user-sub-action-wrap">
        <button type="button" class="btn-sub-renew" id="subBannerRenewBtn" onclick="openLicenseModal()">
          <span>🎟️</span>
          <span data-i18n="subBannerRenewBtn">تمدید یا ارتقای اشتراک</span>
        </button>
      </div>
    </div>

    <!-- ⚠️ هشدار و فرم تمدید اشتراک منقضی‌شده (Suspension Alert Box) -->
    <div id="suspensionAlertBox" class="glass-card hidden" style="border: 1px solid var(--accent-rose-border); background: var(--accent-rose-bg);">
      <div style="display:flex; align-items:flex-start; gap:14px; flex-wrap:wrap;">
        <div style="font-size: 2.2rem; line-height: 1;">⚠️</div>
        <div style="flex:1; min-width: 250px;">
          <div style="font-size: 1.05rem; font-weight: 800; color: var(--accent-rose); margin-bottom: 6px;" data-i18n="suspensionTitle">
            اعتبار اشتراک حساب کاربری شما به پایان رسیده است
          </div>
          <div style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 14px;" data-i18n="suspensionDesc">
            مدت زمان اشتراک شما خاتمه یافته و به‌روزرسانی پروفایل موقتاً متوقف گردیده است. جهت تمدید اعتبار و فعال‌سازی مجدد، کد لایسنس جدید خود را در کادر زیر وارد نمایید:
          </div>
          <div class="input-action-row" style="max-width: 580px;">
            <input type="text" id="quickRenewCodeInput" class="input-field mono" placeholder="کد لایسنس جدید (مثال: ARIZO-XXXX-XXXX-XXXX)" style="text-transform: uppercase; font-weight: 700; color: var(--accent-purple);" data-i18n-placeholder="suspensionPlaceholder">
            <button class="btn btn-primary" id="quickRenewBtn" onclick="doQuickRenew()" style="background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);">
              <span data-i18n="suspensionBtn">تمدید اعتبار و فعال‌سازی مجدد</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🕒 بخش ۱: پیش‌نمایش زنده نمایه تلگرام (Telegram Profile Live Mockup) -->
    <div id="clockHeroCard" class="glass-card hidden">
      <div class="section-header">
        <div class="section-title">
          <span>📱</span> <span data-i18n="mockupTitle">پیش‌نمایش زنده نمایه تلگرام</span>
        </div>
        <span class="section-tag" data-i18n="mockupTag">پیش‌نمایش لحظه‌ای</span>
      </div>

      <!-- Telegram Profile Realistic Mockup -->
      <div class="tg-mockup-wrapper">
        <div class="tg-mockup-header">
          <div class="tg-mockup-avatar-wrap">
            <div class="tg-mockup-avatar" id="mockupAvatar">AZ</div>
            <div class="tg-online-ring"></div>
          </div>
          <div class="tg-mockup-info">
            <div class="tg-mockup-name-row">
              <span class="tg-mockup-firstname" id="mockupFirstName" data-i18n="mockupDefaultUser">کاربر Arizo</span>
              <span class="tg-mockup-lastname" id="mockupLastName">۰۰:۰۰</span>
            </div>
            <div class="tg-mockup-status">
              <span class="tg-status-dot"></span>
              <span data-i18n="mockupOnline">آنلاین (همگام با زمان رسمی تهران)</span>
            </div>
          </div>
        </div>

        <div class="tg-mockup-body">
          <div class="tg-mockup-field">
            <div class="tg-field-icon">💬</div>
            <div class="tg-field-content">
              <div class="tg-field-label" data-i18n="mockupBioLabel">بخش معرفی نمایه (Bio)</div>
              <div class="tg-field-value" id="mockupBio" data-i18n="mockupBioWait">در انتظار فعال‌سازی بیوگرافی زنده...</div>
            </div>
          </div>
          <div class="tg-mockup-field">
            <div class="tg-field-icon">🗓️</div>
            <div class="tg-field-content">
              <div class="tg-field-label" data-i18n="mockupDateLabel">تقویم خورشیدی و زمان رسمی تهران</div>
              <div class="tg-field-value" id="persianDateText">درحال محاسبه تقویم خورشیدی...</div>
            </div>
          </div>
        </div>

        <!-- Clock preview bar with seconds pulse positioned to the right of minute -->
        <div class="tg-clock-bar" dir="ltr">
          <div class="tg-clock-digits" id="clockPreview" dir="ltr">𝟎𝟎:𝟎𝟎</div>
          <div class="clock-seconds-badge" id="secondsPulse" dir="ltr">:𝟎𝟎</div>
        </div>

        <div class="clock-badges-row">
          <span class="meta-chip active">
            <span class="dot-pulse"></span> <span data-i18n="mockupSyncChip">همگام‌سازی رسمی با زمان تهران</span>
          </span>
          <span class="meta-chip" id="userPlanBadge">اشتراک: استاندارد</span>
          <span class="meta-chip" id="userFontBadge">فونت: بولد لوکس</span>
        </div>
      </div>
    </div>

    <!-- 📱 بخش ۲: اتصال حساب تلگرام -->
    <div id="telegramConnectSection" class="glass-card hidden">
      <div class="section-header">
        <div class="section-title">
          <span>📱</span> <span data-i18n="tgConnectTitle">اتصال حساب تلگرام به سامانه</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button id="btnCancelTgConnect" class="btn-nav-action hidden" onclick="cancelTelegramConnect()" style="color:var(--text-muted); font-size:0.78rem;">
            <span data-i18n="tgConnectCancel">✕ انصراف و بازگشت</span>
          </button>
          <span class="section-tag" data-i18n="tgKvTag">ارتباط امن و مستقیم</span>
        </div>
      </div>

      <div class="segmented-control">
        <button id="tabTgPhone" class="segmented-btn active" onclick="switchTgTab('phone')" data-i18n="tgTabPhone">ورود با شماره تلفن</button>
        <button id="tabTgSess" class="segmented-btn" onclick="switchTgTab('session')" data-i18n="tgTabSession">اتصال با رشته سشن (StringSession)</button>
      </div>

      <!-- با شماره تلفن -->
      <div id="tgPhoneBox">
        <div class="form-group">
          <label class="form-label" data-i18n="tgPhoneLabel">شماره همراه حساب تلگرام</label>
          <input type="tel" id="tgPhone" class="input-field mono" placeholder="شماره همراه با پیش‌شماره کشور (مثال: 989123456789+)" dir="ltr" data-i18n-placeholder="tgPhonePlaceholder">
        </div>

        <div id="tgCodeGroup" class="form-group hidden">
          <label class="form-label" data-i18n="tgCodeLabel">کد تأیید ارسالی از سوی تلگرام</label>
          <input type="text" id="tgCode" class="input-field mono" placeholder="کد تأیید ارسالی تلگرام (مثال: 58291)" maxlength="8" dir="ltr" data-i18n-placeholder="tgCodePlaceholder">
        </div>

        <div id="tgPassGroup" class="form-group hidden">
          <label class="form-label" data-i18n="tgPassLabel">گذرواژه تأیید دو مرحله‌ای تلگرام (2FA)</label>
          <input type="password" id="tgPass" class="input-field" placeholder="رمز دو مرحله‌ای تلگرام (در صورت فعال بودن 2FA)" data-i18n-placeholder="tgPassPlaceholder">
        </div>

        <button class="btn btn-primary" id="tgAuthBtn" onclick="doTelegramAuth()">
          <span data-i18n="tgAuthBtn">دریافت کد ورود از تلگرام</span>
        </button>
      </div>

      <!-- با سشن مستقیم -->
      <div id="tgSessBox" class="hidden">
        <div class="form-group">
          <label class="form-label" data-i18n="tgSessionLabel">رشته سشن تلگرام (StringSession)</label>
          <textarea id="tgSessionInput" class="input-field mono" rows="4" placeholder="رشته StringSession تلگرام خود را اینجا وارد کنید (Pyrogram یا Telethon/GramJS)..." dir="ltr" data-i18n-placeholder="tgSessionPlaceholder"></textarea>
        </div>
        <button class="btn btn-primary" id="tgSessBtn" onclick="doConnectDirectSession()">
          <span data-i18n="tgSessBtn">اتصال و ذخیره‌سازی امن سشن</span>
        </button>
      </div>
    </div>

    <!-- 🎨 بخش ۳: استودیوی طراحی و امکانات پیشرفته سلف‌بات -->
    <div id="dashboardSection" class="glass-card hidden">
      <div class="section-header">
        <div class="section-title">
          <span>🎨</span> <span data-i18n="studioTitle">استودیوی شخصی‌سازی و امکانات پیشرفته</span>
        </div>
        <span class="section-tag">Arizo Studio Pro</span>
      </div>

      <!-- هشدار هوشمند خطای ارتباط تلگرام با امکان اتصال مجدد -->
      <div id="tgAlertBox" class="hidden" style="background:var(--accent-rose-bg); border:1px solid var(--accent-rose-border); border-radius:var(--radius-md); padding:14px 18px; margin-bottom:18px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="font-weight:800; color:var(--accent-rose); font-size:0.9rem; margin-bottom:4px;">⚠️ وضعیت ارتباط با تلگرام:</div>
            <div id="tgAlertMsg" style="color:var(--text-main); font-size:0.83rem;"></div>
          </div>
          <button class="btn btn-primary" onclick="showTelegramConnect()" style="padding:6px 14px; font-size:0.8rem; background:linear-gradient(135deg,#f43f5e,#e11d48);">
            <span>🔄 اتصال مجدد اکانت تلگرام</span>
          </button>
        </div>
      </div>

      <!-- 📑 نوار تب‌های استودیو - کاملاً واکنش‌گرا و ریسپانسیو برای موبایل و کامپیوتر -->
      <div class="studio-tab-bar">
        <button id="studioTabClock" class="studio-tab-btn active" onclick="switchStudioTab('clock')">
          <span>🕒</span> <span data-i18n="studioTabClock">ساعت و استایل</span>
        </button>
        <button id="studioTabBio" class="studio-tab-btn" onclick="switchStudioTab('bio')">
          <span>📝</span> <span data-i18n="studioTabBio">بیوگرافی زنده</span>
        </button>
        <button id="studioTabAfk" class="studio-tab-btn" onclick="switchStudioTab('afk')">
          <span>🤖</span> <span data-i18n="studioTabAfk">منشی خودکار</span>
        </button>
        <button id="studioTabMute" class="studio-tab-btn" onclick="switchStudioTab('mute')">
          <span>🔇</span> <span data-i18n="studioTabMute">فیلتر سکوت</span>
        </button>
        <button id="studioTabAutomation" class="studio-tab-btn" onclick="switchStudioTab('automation')">
          <span>🌙</span> <span data-i18n="studioTabAutomation">حالت خواب</span>
        </button>
        <button id="studioTabBot" class="studio-tab-btn" onclick="switchStudioTab('bot')">
          <span>⚡</span> <span data-i18n="studioTabBot">ربات و لاگر</span>
        </button>
        <button id="studioTabGhost" class="studio-tab-btn" onclick="switchStudioTab('ghost')">
          <span>👻</span> <span data-i18n="studioTabGhost">حالت شبح</span>
        </button>
        <button id="studioTabAI" class="studio-tab-btn" onclick="switchStudioTab('ai')">
          <span>🤖</span> <span data-i18n="studioTabAI">پاسخ AI</span>
        </button>
        <button id="studioTabSecurity" class="studio-tab-btn" onclick="switchStudioTab('security')">
          <span>🔐</span> <span data-i18n="studioTabSecurity">امنیت و ۲FA</span>
        </button>
      </div>

      <!-- 🕒 تب ۱: فونت و استایل ساعت -->
      <div id="studioPaneClock">
        <!-- گرید پریست‌های فونت -->
        <div class="preset-grid" id="presetBtns"></div>

        <!-- جداکننده‌ها -->
        <div class="form-group">
          <label class="form-label">انتخاب کاراکتر جداکننده ساعت و دقیقه</label>
          <div class="sep-scroll-row">
            <div class="sep-pill active" onclick="setColonChar(':')">:</div>
            <div class="sep-pill" onclick="setColonChar('•')">•</div>
            <div class="sep-pill" onclick="setColonChar('⚡')">⚡</div>
            <div class="sep-pill" onclick="setColonChar('✦')">✦</div>
            <div class="sep-pill" onclick="setColonChar('❤️')">❤️</div>
            <div class="sep-pill" onclick="setColonChar('💎')">💎</div>
            <div class="sep-pill" onclick="setColonChar('✨')">✨</div>
            <div class="sep-pill" onclick="setColonChar('◈')">◈</div>
            <div class="sep-pill" onclick="setColonChar('|')">|</div>
            <div class="sep-pill" onclick="setColonChar('~')">~</div>
          </div>
        </div>

        <!-- پیشوند و پسوند نام خانوادگی -->
        <div style="display:flex; gap:12px; margin-bottom:18px; flex-wrap:wrap;">
          <div class="form-group" style="flex:1; min-width:140px; margin-bottom:0;">
            <label class="form-label">پیشوند ساعت (قبل از ساعت)</label>
            <input type="text" id="prefixInput" class="input-field" placeholder="پیشوند ساعت (مثلاً: [ یا | یا ⚡)" maxlength="15" oninput="updateLiveClock()">
          </div>
          <div class="form-group" style="flex:1; min-width:140px; margin-bottom:0;">
            <label class="form-label">پسوند ساعت (بعد از ساعت)</label>
            <input type="text" id="suffixInput" class="input-field" placeholder="پسوند ساعت (مثلاً: ] یا ⚡ یا VIP)" maxlength="15" oninput="updateLiveClock()">
          </div>
        </div>

        <!-- حالت ۱۲ ساعته -->
        <div class="toggle-row">
          <div>
            <div class="toggle-label">حالت ۱۲ ساعته (AM / PM لوکس)</div>
            <div class="toggle-desc">نمایش ساعت به‌صورت ۱۲ ساعته همراه با نشانگر فانتزی ᴬᴹ / ᴾᴹ</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="toggle12h" onchange="updateLiveClock()">
            <span class="slider"></span>
          </label>
        </div>

        <!-- ارقام دستی -->
        <div class="digits-row" style="margin-top:16px;">
          <div class="form-group" style="flex: 3; min-width: 180px; margin-bottom: 0;">
            <label class="form-label">ارقام دلخواه دستی (۱۰ کاراکتر ۰ تا ۹)</label>
            <input type="text" id="customDigits" class="input-field mono" placeholder="۱۰ رقم دلخواه از ۰ تا ۹ به ترتیب (مثال: ۰۱۲۳۴۵۶۷۸۹)" dir="ltr">
          </div>
          <div class="form-group" style="flex: 1; min-width: 80px; margin-bottom: 0;">
            <label class="form-label">جداکننده</label>
            <input type="text" id="colonInput" class="input-field mono center-text" value=":" maxlength="4" placeholder=":" style="text-align:center;">
          </div>
        </div>
      </div>

      <!-- 📝 تب ۲: بیوگرافی هوشمند و زنده -->
      <div id="studioPaneBio" class="hidden">
        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">فعال‌سازی بیوگرافی زنده و هوشمند (Live Bio)</div>
            <div class="toggle-desc">به‌روزرسانی خودکار بیو تلگرام با ساعت، تقویم و متون پویا</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="bioEnabledToggle" onchange="updateLiveClock()">
            <span class="slider"></span>
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">قالب متن بیوگرافی تلگرام (حداکثر ۷۰ کاراکتر)</label>
          <input type="text" id="bioTemplateInput" class="input-field" placeholder="قالب بیوگرافی (مثال: ⏳ {time} | 📅 {date} | ⚡ Arizo Pro)" maxlength="70" oninput="updateLiveClock()">
          <div style="display:flex; gap:6px; margin-top:8px; flex-wrap:wrap; align-items:center;">
            <span style="font-size:0.75rem; color:var(--text-muted);">افزودن متغیر با کلیک:</span>
            <button type="button" class="var-chip" onclick="insertBioVar('{time}')">⏰ {time} (ساعت)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{date}')">🗓️ {date} (تاریخ)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{day}')">☀️ {day} (روز هفته)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{battery}')">🔋 {battery} (باتری زمان)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{zodiac}')">♈ {zodiac} (برج فلکی)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{season}')">🌸 {season} (فصل)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{mood}')">🎭 {mood} (مود زمان)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{occasion}')">🎉 {occasion} (مناسبت)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{quote}')">💬 {quote} (جمله انگیزشی)</button>
            <button type="button" class="var-chip" onclick="insertBioVar('{en_day}')">🌐 {en_day} (روز انگلیسی)</button>
          </div>
        </div>

        <!-- قالب‌های پیشنهادی آماده -->
        <div class="bio-templates-box">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-bottom:8px;">💡 قالب‌های محبوب و آماده:</div>
          <div class="bio-preset-pill" onclick="applyBioTemplate('⏳ {time} | 📅 {date} | ⚡ Arizo')">⏳ {time} | 📅 {date} | ⚡ Arizo</div>
          <div class="bio-preset-pill" onclick="applyBioTemplate('⚡ {time} • {day} • Always Online')">⚡ {time} • {day} • Always Online</div>
          <div class="bio-preset-pill" onclick="applyBioTemplate('『 {time} 』✨ {date} ✨')">『 {time} 』✨ {date} ✨</div>
          <div class="bio-preset-pill" onclick="applyBioTemplate('🕒 {time} | 🔋 {battery} | {zodiac} | {mood}')">🕒 {time} | 🔋 {battery} | {zodiac} | {mood}</div>
          <div class="bio-preset-pill" onclick="applyBioTemplate('⏳ {time} | 🌸 {season} | 💬 {quote}')">⏳ {time} | 🌸 {season} | 💬 {quote}</div>
        </div>
      </div>

      <!-- 🤖 تب ۳: منشی خودکار پیوی (AFK) -->
      <div id="studioPaneAfk" class="hidden">
        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">منشی خودکار گفتگوهای خصوصی (AFK Auto-Secretary)</div>
            <div class="toggle-desc">پاسخ‌دهی خودکار به پیام‌های خصوصی در زمان عدم حضور یا آفلاین بودن شما</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="afkEnabledToggle">
            <span class="slider"></span>
          </label>
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 18px; font-size: 0.8rem; color: var(--text-main); line-height: 1.7;">
          🛡️ <b>سیستم هوشمند تشخیص حضور:</b> منشی خودکار صرفاً در زمان عدم حضور و آفلاین بودن شما فعال می‌گردد. با بررسی وضعیت نشست‌های فعال (موبایل و دسکتاپ)، بازه اطمینان ۱۰ دقیقه‌ای مکالمات زنده و بررسی پیام‌های خوانده‌شده، از تداخل منشی با گفتگوهای فعال شما جلوگیری می‌شود.
        </div>

        <div class="form-group">
          <label class="form-label">متن پاسخ خودکار منشی به مخاطبان</label>
          <textarea id="afkMessageInput" class="input-field" rows="3" placeholder="متن پاسخ خودکار (مثال: درود، در حال حاضر امکان پاسخگویی ندارم. به محض آنلاین شدن با شما گفتگو خواهم کرد ⏳)"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">بازه زمانی ارسال مجدد به هر مخاطب (مدیریت تکرار)</label>
          <select id="afkCooldownSelect" class="input-field" style="background:var(--bg-input);">
            <option value="5">هر ۵ دقیقه یک‌بار به هر مخاطب</option>
            <option value="10" selected>هر ۱۰ دقیقه یک‌بار به هر مخاطب (پیشنهادی)</option>
            <option value="30">هر ۳۰ دقیقه یک‌بار به هر مخاطب</option>
            <option value="60">هر ۱ ساعت یک‌بار به هر مخاطب</option>
            <option value="1440">فقط یک‌بار در شبانه‌روز به هر مخاطب</option>
          </select>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:6px;">
            💡 این تنظیم از ارسال مکرر پیام منشی در صورت دریافت پیام‌های پیاپی از یک مخاطب پیشگیری می‌نماید.
          </div>
        </div>
      </div>

      <!-- 🔇 تب ۴: مدیریت سکوت و حذف خودکار پیام (Mute) -->
      <div id="studioPaneMute" class="hidden">
        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">مدیریت سکوت و حذف دوطرفه پیام‌ها (Mute Filter)</div>
            <div class="toggle-desc">پیام‌های دریافتی از کاربران مشخص‌شده بلافاصله برای هر دو طرف حذف می‌گردند</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="muteEnabledToggle">
            <span class="slider"></span>
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">شناسه‌های عددی یا نام‌های کاربری تلگرام جهت سکوت (با ویرگول جدا کنید)</label>
          <input type="text" id="mutedUsersInput" class="input-field mono" placeholder="شناسه‌های عددی یا نام‌های کاربری تلگرام (مثال: 123456789, @username, 987654321)" dir="ltr">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:6px;">
            💡 در محیط تلگرام نیز می‌توانید با پاسخ به پیام کاربر و ارسال دستور <code>.mute</code> او را اضافه نموده و با <code>.unmute</code> از لیست خارج فرمایید.
          </div>
        </div>
      </div>

      <!-- 🌙 تب ۵: حالت خواب و اتوماسیون شبانه -->
      <div id="studioPaneAutomation" class="hidden">
        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">حالت خواب و استراحت شبانه (Sleep Mode)</div>
            <div class="toggle-desc">در ساعات تعیین‌شده، به‌روزرسانی متوقف شده یا متن حالت استراحت نمایش داده می‌شود</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="sleepEnabledToggle" onchange="updateLiveClock()">
            <span class="slider"></span>
          </label>
        </div>

        <div style="display:flex; gap:12px; margin-bottom:18px; flex-wrap:wrap;">
          <div class="form-group" style="flex:1; min-width:140px; margin-bottom:0;">
            <label class="form-label">شروع ساعات استراحت</label>
            <select id="sleepStartSelect" class="input-field" style="background:var(--bg-input);" onchange="updateLiveClock()">
              <option value="22">۲۲:۰۰ (۱۰ شب)</option>
              <option value="23" selected>۲۳:۰۰ (۱۱ شب)</option>
              <option value="0">۰۰:۰۰ (نیمه‌شب)</option>
              <option value="1">۰۱:۰۰ (بامداد)</option>
              <option value="2">۰۲:۰۰ (بامداد)</option>
            </select>
          </div>
          <div class="form-group" style="flex:1; min-width:140px; margin-bottom:0;">
            <label class="form-label">پایان ساعات استراحت</label>
            <select id="sleepEndSelect" class="input-field" style="background:var(--bg-input);" onchange="updateLiveClock()">
              <option value="6">۰۶:۰۰ (صبح)</option>
              <option value="7" selected>۰۷:۰۰ (صبح)</option>
              <option value="8">۰۸:۰۰ (صبح)</option>
              <option value="9">۰۹:۰۰ (صبح)</option>
              <option value="10">۱۰:۰۰ (صبح)</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">متن نام خانوادگی در ساعات خواب</label>
          <input type="text" id="sleepTextInput" class="input-field" value="😴 Sleep" placeholder="متن نام خانوادگی در خواب (مثال: 😴 Sleep یا 🌙 در حال استراحت)" maxlength="30" oninput="updateLiveClock()">
        </div>
      </div>

      <!-- 👻 تب ۶: حالت مشاهده محرمانه و مدیریت خوانده‌شدن (Ghost Mode) -->
      <div id="studioPaneGhost" class="hidden">
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(56, 189, 248, 0.12) 100%); border: 1px solid var(--accent-blue-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>👻</span> <span>حالت مشاهده محرمانه پیام‌ها (Ghost Mode)</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.7;">
            با فعال‌سازی این قابلیت، پیام‌های دریافتی بدون ثبت وضعیت خوانده‌شده (تیک دوم) جهت مطالعه به ربات پشتیبان شما منتقل می‌شوند. در صورت تمایل می‌توانید با ارسال دستور <code>.read</code> در گفتگوی مورد نظر، وضعیت خوانده‌شدن را به صورت دستی ثبت فرمایید.
          </div>
        </div>

        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">فعال‌سازی حالت مشاهده محرمانه (Ghost Mode)</div>
            <div class="toggle-desc">مشاهده پیام‌های دریافتی بدون ثبت وضعیت خوانده‌شده با انتقال به ربات پشتیبان</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="ghostModeToggle">
            <span class="slider"></span>
          </label>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 18px;">
          <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main); margin-bottom: 10px;">دستورات کاربردی در محیط تلگرام:</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.8;">
            <code style="color: var(--accent-blue);">.read</code> — ثبت وضعیت خوانده‌شده برای گفتگوی جاری<br>
            <code style="color: var(--accent-blue);">.read all</code> — ثبت وضعیت خوانده‌شده برای تمام گفتگوها<br>
            <code style="color: var(--accent-blue);">.ghost on</code> — فعال‌سازی سریع حالت محرمانه<br>
            <code style="color: var(--accent-blue);">.ghost off</code> — غیرفعال‌سازی حالت محرمانه
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">لیست استثنا — کاربرانی که وضعیت خوانده‌شده ثبت شود (اختیاری)</label>
          <input type="text" id="ghostExcludeInput" class="input-field mono" placeholder="شناسه عددی یا نام کاربری افراد مورد نظر (با ویرگول جدا کنید)" dir="ltr">
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
            💡 برای کاربران حاضر در این فهرست، وضعیت خوانده‌شدن به صورت عادی ثبت شده و حالت محرمانه اعمال نمی‌گردد.
          </div>
        </div>

        <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid var(--accent-amber-border); border-radius: var(--radius-md); padding: 14px; margin-top: 14px;">
          <div style="font-size: 0.8rem; color: var(--accent-amber); line-height: 1.7;">
            ⚠️ <b>توجه مهم:</b> حالت محرمانه زمانی عمل می‌کند که پیام‌ها را از طریق <b>ربات پشتیبان</b> مطالعه فرمایید. در صورت گشودن گفتگو در اپلیکیشن اصلی تلگرام، وضعیت خوانده‌شده توسط خود نرم‌افزار اعمال خواهد شد.
          </div>
        </div>
      </div>

      <!-- 🤖 تب ۷: پاسخ هوشمند مبتنی بر هوش مصنوعی (AI Smart Reply) -->
      <div id="studioPaneAI" class="hidden">
        <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(244, 63, 94, 0.12) 100%); border: 1px solid var(--accent-purple-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🤖</span> <span>پاسخ هوشمند مبتنی بر هوش مصنوعی (AI Smart Reply)</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.7;">
            به جای ارسال پاسخ متنی ثابت، هوش مصنوعی متناسب با محتوای پیام مخاطب پاسخی سنجیده ارسال می‌نماید. هر کاربر کلید اختصاصی API خود را وارد نموده و تعاملات به صورت کاملاً مستقل انجام می‌پذیرد.
          </div>
        </div>

        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">فعال‌سازی پاسخ هوشمند مبتنی بر هوش مصنوعی</div>
            <div class="toggle-desc">هنگام فعال بودن، هوش مصنوعی متناسب با پیام دریافتی پاسخ‌دهی می‌نماید</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="aiReplyToggle">
            <span class="slider"></span>
          </label>
        </div>

        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 18px; font-size: 0.8rem; color: var(--text-main); line-height: 1.7;">
          🛡️ <b>سیستم پیشرفته تشخیص حضور:</b> هوش مصنوعی تنها در زمان عدم حضور و آفلاین بودن شما به پیام‌ها پاسخ می‌دهد. بررسی وضعیت نشست‌های فعال (موبایل و دسکتاپ)، وقفه مکالمات در ۱۰ دقیقه اخیر و بازه اطمینان ۱۲ ثانیه‌ای، مانع از هرگونه تداخل با گفتگوهای زنده شما می‌گردد.
        </div>

        <div class="form-group">
          <label class="form-label">ارائه‌دهنده سرویس هوش مصنوعی (AI Provider)</label>
          <select id="aiProviderSelect" class="input-field" style="background:var(--bg-input);">
            <option value="gemini" selected>Google Gemini (رایگان — پیشنهادی)</option>
            <option value="openai">OpenAI (GPT-4o / GPT-3.5)</option>
            <option value="custom">Custom API (سرویس سفارشی / DeepSeek)</option>
          </select>
        </div>

        <div class="form-group" id="aiModelGroup">
          <label class="form-label" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <span>🤖 مدل هوش مصنوعی (AI Model)</span>
            <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;" id="aiModelHint">انتخاب مدل پاسخ‌دهی</span>
          </label>
          <select id="aiModelSelect" class="input-field" style="background:var(--bg-input);">
            <option value="gemini-2.5-flash">⚡ Gemini 2.5 Flash (جدیدترین، پرسرعت و رایگان — پیشنهادی)</option>
            <option value="gemini-2.0-flash">🚀 Gemini 2.0 Flash (پایدار و هوشمند)</option>
            <option value="gemini-1.5-flash">🌟 Gemini 1.5 Flash (سریع و سبک)</option>
            <option value="gemini-1.5-pro">🧠 Gemini 1.5 Pro (قدرت تحلیل بالا)</option>
            <option value="gemini-flash-lite-latest">💨 Gemini Flash Lite (فوق سبک)</option>
            <option value="custom">✏️ مدل دستی دیگر (تایپ نام مدل دلخواه)...</option>
          </select>
          <div id="aiCustomModelWrapper" style="display:none; margin-top:8px;">
            <input type="text" id="aiCustomModelInput" class="input-field mono" placeholder="نام دقیق مدل (مثال: deepseek-chat یا gemini-2.5-flash یا gpt-4o)" dir="ltr">
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
              💡 شناسه مدل اختصاصی یا سفارشی ارائه‌دهنده را با حروف کوچک انگلیسی وارد فرمایید.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">کلید دسترسی سرویس هوش مصنوعی (API Key)</label>
          <div style="position:relative; display:flex; align-items:center;">
            <input type="password" id="aiApiKeyInput" class="input-field mono" placeholder="کلید API دریافت شده از پنل سرویس‌دهنده را اینجا وارد نمایید" dir="ltr" style="padding-left:40px;">
            <button type="button" id="btnToggleAiKeyVisibility" style="position:absolute; left:10px; background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1.1rem; padding:4px;" title="نمایش / مخفی‌سازی کلید">👁️</button>
          </div>
          <div class="ai-key-toolbar">
            <div class="ai-key-btn-group">
              <button type="button" id="btnTestAiKey" class="btn btn-sm btn-ai-test" style="display:none; background:linear-gradient(135deg, #10b981 0%, #059669 100%); color:#fff; border:none; box-shadow:0 2px 8px rgba(16, 185, 129, 0.25);">
                <span id="btnTestAiKeyIcon">⚡</span>
                <span id="btnTestAiKeyText" data-i18n="btnTestAiKeyShort">تست سلامت API</span>
              </button>
              <button type="button" id="btnDeleteAiKey" class="btn btn-secondary btn-sm btn-ai-delete" style="color:var(--accent-rose); border-color:var(--accent-rose-border); background:var(--accent-rose-bg);" title="حذف کامل کلید API و رفع تداخل">
                <span>🗑️</span>
                <span style="font-weight:700;" data-i18n="btnDeleteAiKey">حذف کلید API</span>
              </button>
            </div>
          </div>
          <div class="ai-key-helper-card">
            <div style="display:flex; align-items:center; gap:6px; color:var(--text-muted);">
              <span>💡</span>
              <span style="font-weight:600;">دریافت مستقیم کلید API:</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" class="ai-key-link-badge">
                <span>Google AI Studio</span>
                <span style="font-size:0.68rem; background:var(--accent-green); color:#fff; padding:1px 6px; border-radius:4px; font-weight:700;">رایگان</span>
              </a>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" class="ai-key-link-badge">
                <span>OpenAI Console</span>
                <span style="font-size:0.68rem; color:var(--text-muted);">↗</span>
              </a>
            </div>
          </div>
          <!-- کادر نتیجه تست سلامت و وضعیت لحظه‌ای API -->
          <div id="aiTestResultBox" style="display:none; margin-top:10px; border-radius:var(--radius-md); padding:12px 14px; font-size:0.82rem; line-height:1.6; transition:all 0.3s ease;"></div>
        </div>

        <div class="form-group">
          <label class="form-label">دستورالعمل و لحن هوش مصنوعی (System Prompt)</label>
          <textarea id="aiSystemPromptInput" class="input-field" rows="3" placeholder="تعیین شیوه پاسخ‌دهی و لحن هوش مصنوعی (مثال: محترمانه و رسمی پاسخ بده و اطلاعات تماس را ثبت نما)"></textarea>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
            💡 حداکثر ۵۰۰ کاراکتر. این متن لحن و چارچوب پاسخ‌دهی را تعیین می‌کند.
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">اطلاعات تکمیلی و ساعات کاری (Context)</label>
          <textarea id="aiContextInput" class="input-field" rows="3" placeholder="اطلاعات تکمیلی جهت آگاهی هوش مصنوعی (مثال: ساعات پاسخگویی از ۹ الی ۱۷ است)"></textarea>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px;">
            💡 هوش مصنوعی از این اطلاعات برای پاسخ‌دهی هماهنگ و متناسب استفاده می‌نماید.
          </div>
        </div>

        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <div class="form-group" style="flex:1; min-width:140px;">
            <label class="form-label">حداکثر تعداد پاسخ به هر شخص</label>
            <select id="aiMaxRepliesSelect" class="input-field" style="background:var(--bg-input);">
              <option value="1">فقط ۱ پاسخ</option>
              <option value="2">حداکثر ۲ پاسخ</option>
              <option value="3" selected>حداکثر ۳ پاسخ (پیشنهادی)</option>
              <option value="5">حداکثر ۵ پاسخ</option>
              <option value="10">حداکثر ۱۰ پاسخ</option>
              <option value="20">نامحدود (۲۰ پاسخ)</option>
            </select>
          </div>
          <div class="form-group" style="flex:1; min-width:140px;">
            <label class="form-label">فاصله زمانی بین پاسخ‌ها (کول‌داون)</label>
            <select id="aiCooldownSelect" class="input-field" style="background:var(--bg-input);">
              <option value="0">⚡ بدون محدودیت زمانی (فوری و بدون کول‌داون)</option>
              <option value="1">هر ۱ دقیقه</option>
              <option value="3">هر ۳ دقیقه</option>
              <option value="5" selected>هر ۵ دقیقه (پیشنهادی)</option>
              <option value="10">هر ۱۰ دقیقه</option>
              <option value="30">هر ۳۰ دقیقه</option>
            </select>
          </div>
        </div>

        <!-- 🚫 کاربران مستثنی از پاسخ هوش مصنوعی (لیست نادیده‌گیری و بلک‌لیست تعاملی) -->
        <div class="form-group ai-ignore-manager-card">
          <!-- عنوان و شمارنده تعداد افراد -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
            <label class="form-label" style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🚫 کاربران مستثنی از پاسخ هوش مصنوعی (لیست نادیده‌گیری)</span>
              <span id="aiIgnoredCountBadge" style="font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: rgba(16, 185, 129, 0.12); color: var(--accent-green); border: 1px solid var(--accent-green-border);">تمام مخاطبان مجاز</span>
            </label>
            <div id="aiIgnoredBulkActions" style="display: none; align-items: center; gap: 8px;">
              <button type="button" id="btnCopyAllAiIgnored" class="btn btn-sm btn-secondary" style="font-size: 0.74rem; padding: 4px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;" title="کپی همه آیدی‌ها در کلیپ‌بورد">
                <span>📋</span>
                <span>کپی همه</span>
              </button>
              <button type="button" id="btnClearAllAiIgnored" class="btn btn-sm btn-secondary" style="font-size: 0.74rem; padding: 4px 10px; border-radius: 6px; color: var(--accent-rose); border-color: var(--accent-rose-border); background: var(--accent-rose-bg); display: inline-flex; align-items: center; gap: 4px;" title="حذف تمام افراد از لیست">
                <span>🗑️</span>
                <span>پاکسازی همه</span>
              </button>
            </div>
          </div>

          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.6;">
            💡 هوش مصنوعی به پیام‌های خصوصی افرادی که در این لیست قرار دارند <b>هیچ پاسخی نخواهد داد</b>. می‌توانید آیدی عددی تلگرام یا یوزرنیم (با یا بدون @) را وارد کنید:
          </div>

          <!-- ورودی افزودن کاربر سریع (تک یا گروهی با پیست) -->
          <div class="ai-ignore-input-row">
            <div class="ai-ignore-input-wrap">
              <span class="ai-ignore-input-icon">👤</span>
              <input type="text" id="aiIgnoredQuickAddInput" class="ai-ignore-quick-input mono" placeholder="آیدی عددی (مثال: 123456789) یا یوزرنیم (@username)..." autocomplete="off" spellcheck="false" dir="auto">
            </div>
            <button type="button" id="btnAddAiIgnoredUser" class="btn btn-primary btn-add-ai-ignore">
              <span class="btn-icon">➕</span>
              <span data-i18n="addAiIgnoredBtn">افزودن به لیست</span>
            </button>
          </div>
          <div class="ai-ignore-input-hint" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; margin-top: 8px; font-size: 0.74rem; color: var(--text-dim);">
            <span style="display: inline-flex; align-items: center; gap: 5px;">
              <span>⌨️</span>
              <span data-i18n="aiIgnoreEnterHint">کلید Enter یا ویرگول (,) برای ثبت سریع چندگانه پشتیبانی می‌شود</span>
            </span>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; padding: 2px 7px; background: rgba(99, 102, 241, 0.1); color: var(--accent-indigo); border: 1px solid rgba(99, 102, 241, 0.2); border-radius: 6px;">Numeric ID / @username</span>
          </div>

          <!-- لیست چیپ‌ها / برچسب‌های تعاملی -->
          <div id="aiIgnoredChipsContainer" class="ai-ignore-chips-box" style="display: none;">
            <!-- چیپ‌ها به صورت پویا با جاوااسکریپت اینجا رندر می‌شوند -->
          </div>

          <!-- وضعیت خالی (Empty State) -->
          <div id="aiIgnoredEmptyState" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px 14px; text-align: center; color: var(--text-muted); font-size: 0.8rem; line-height: 1.6; background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle); margin-top: 12px;">
            <span style="font-size: 1.8rem; margin-bottom: 6px; opacity: 0.9;">🛡️</span>
            <span style="font-weight: 700; color: var(--text-main); font-size: 0.86rem; margin-bottom: 3px;" data-i18n="aiIgnoreEmptyTitle">تمام مخاطبان مجاز هستند</span>
            <span style="font-size: 0.76rem; max-width: 440px;" data-i18n="aiIgnoreEmptyDesc">در حال حاضر هیچ کاربری در لیست نادیده‌گیری نیست و هوش مصنوعی در پیام‌های خصوصی به همه مخاطبان پاسخ می‌دهد.</span>
          </div>

          <!-- فیلد مخفی همگام‌ساز برای حفظ ۱۰۰٪ سازگاری با پایگاه داده و فرم ذخیره -->
          <input type="hidden" id="aiIgnoredUsersInput" value="">
        </div>

        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid var(--accent-green-border); border-radius: var(--radius-md); padding: 14px; margin-top: 10px;">
          <div style="font-size: 0.8rem; color: var(--accent-green); line-height: 1.7;">
            ✅ <b>تشخیص فوق‌هوشمند آفلاین بودن:</b> سیستم به صورت چندلایه‌ای با بررسی نشست‌های متصل (گوشی و دسکتاپ)، چت فعال دوطرفه (۱۰ دقیقه)، پیش‌نویس‌ها و خواندن پیام‌ها تضمین می‌کند که منشی فقط در زمان آفلاین بودن پاسخ دهد و در حین چت فعال یا آنلاین بودن شما هرگز مزاحمتی ایجاد نکند (به همراه فرجه هوشمند ۱۲ ثانیه‌ای برای لغو خودکار).
          </div>
        </div>
      </div>

      <!-- 🤖 تب ۸: ربات دستیار و ثبت گزارش‌ها (Telegram Bot & Loggers) -->
      <div id="studioPaneBot" class="hidden">
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%); border: 1px solid var(--border-specular); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
          <div style="font-size: 0.98rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🤖</span> <span>اتصال ربات دستیار شخصی تلگرام (BotFather API)</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.7;">
            ⚠️ <b>حریم خصوصی و امنیت اطلاعات:</b> هر کاربر می‌تواند ربات اختصاصی خود را در BotFather@ ایجاد کرده و توکن آن را ثبت نماید. به جهت حفظ کامل حریم خصوصی، این ربات منحصراً به شناسه کاربری شما پاسخ داده و دسترسی سایر افراد به آن غیرمجاز و مسدود خواهد بود.
          </div>
        </div>

        <!-- کارت وارد کردن توکن ربات -->
        <div class="form-group">
          <label class="form-label" style="display:flex; justify-content:space-between; align-items:center;">
            <span>توکن ربات تلگرام (API Token از BotFather@)</span>
            <a href="https://t.me/BotFather" target="_blank" style="color:var(--accent-blue); font-size:0.75rem; text-decoration:none; font-weight:700;">
              ➕ دریافت توکن از @BotFather
            </a>
          </label>
          <div class="input-action-row">
            <input type="text" id="botTokenInput" class="input-field mono" placeholder="توکن ربات دریافتی از BotFather@ (مثال: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ)" dir="ltr">
            <button class="btn btn-primary" id="btnVerifyBot" onclick="doVerifyBotToken()">
              <span>⚡ اتصال و فعال‌سازی وب‌هوک</span>
            </button>
          </div>
        </div>

        <!-- کارت نمایش وضعیت ربات متصل -->
        <div id="botInfoCard" class="hidden" style="background: var(--bg-surface-elevated); border: 1px solid var(--accent-green-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                🤖
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);" id="botNameDisplay">ربات تلگرام</div>
                <a id="botUsernameLink" href="#" target="_blank" style="font-size: 0.8rem; color: var(--accent-green); text-decoration: none; font-weight: 700;">@bot</a>
              </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a id="botDirectBtn" href="#" target="_blank" class="btn btn-secondary" style="padding: 7px 14px; font-size: 0.8rem; border-color: var(--accent-green-border); color: var(--accent-green); width: auto;">
                <span>🚀 باز کردن ربات در تلگرام</span>
              </a>
              <button id="btnDisconnectBot" type="button" onclick="doDisconnectBotToken()" class="btn btn-secondary" style="padding: 7px 14px; font-size: 0.8rem; border-color: var(--accent-rose-border); color: var(--accent-rose); width: auto;">
                <span>🔌 قطع اتصال ربات</span>
              </button>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.78rem;">
            <div style="background: var(--bg-surface-hover); color: var(--text-main); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              🟢 <b>وضعیت ارتباط:</b> متصل و فعال
            </div>
            <div style="background: var(--bg-surface-hover); color: var(--text-main); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              🎛️ <b>ورود به پنل (Mini App):</b> دکمه منو فعال شد
            </div>
          </div>
          <div style="background: var(--accent-indigo-bg); border: 1px solid var(--accent-indigo-border); border-radius: 8px; padding: 10px 14px; margin-top: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.1rem;">🔒</span>
              <div>
                <div style="font-size:0.82rem; font-weight:700; color:var(--text-main);">امنیت انحصاری (مخصوص شما):</div>
                <div style="font-size:0.75rem; color:var(--text-muted);" id="botLockStatusText">ربات منحصراً به شناسه تلگرام شما پاسخ می‌دهد و برای سایرین مسدود است.</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <div id="botOwnerIdDisplay" style="font-family:var(--font-mono); font-size:0.8rem; background:var(--accent-indigo-bg); border: 1px solid var(--accent-indigo-border); padding:4px 10px; border-radius:6px; color:var(--accent-indigo); font-weight:700;">
                🔒 آماده قفل با اولین /start
              </div>
              <button type="button" class="btn btn-secondary" onclick="promptSetBotOwnerId()" style="padding: 4px 8px; font-size: 0.72rem; border-color: var(--border-subtle); color: var(--text-muted); width: auto;" title="تنظیم یا تغییر دستی شناسه تلگرام مجاز">
                ✏️ تنظیم شناسه
              </button>
            </div>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 10px; line-height: 1.6;">
            💡 <b>نکته:</b> پس از اتصال، یک‌بار وارد ربات تلگرام خود شده و دستور <code>/start</code> را ارسال نمایید تا ربات منحصراً به حساب کاربری شما متصل گردد.
          </div>
        </div>

        <!-- سوییچ ۱: ضد حذف پیام (Anti-Delete) -->
        <div class="toggle-row" style="margin-bottom:14px;">
          <div>
            <div class="toggle-label">🗑️ بایگانی خودکار پیام‌های حذف‌شده (Anti-Delete)</div>
            <div class="toggle-desc">در صورت حذف پیام یا رسانه توسط مخاطب، نسخه ذخیره‌شده بلافاصله جهت آگاهی به ربات پشتیبان شما ارسال می‌شود</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="botAntiDeleteToggle" checked>
            <span class="slider"></span>
          </label>
        </div>

        <!-- سوییچ ۲: ضد ویرایش پیام (Anti-Edit) -->
        <div class="toggle-row" style="margin-bottom:14px;">
          <div>
            <div class="toggle-label">✏️ ثبت تاریخچه ویرایش پیام‌ها (Anti-Edit)</div>
            <div class="toggle-desc">در صورت ویرایش پیام توسط مخاطب، متن اولیه به همراه متن جدید در ربات پشتیبان ثبت می‌گردد</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="botAntiEditToggle" checked>
            <span class="slider"></span>
          </label>
        </div>

        <!-- سوییچ ۳: نجات رسانه‌های زمان‌دار (Anti-TTL) -->
        <div class="toggle-row" style="margin-bottom:18px;">
          <div>
            <div class="toggle-label">📸 ذخیره‌سازی هوشمند رسانه‌های زمان‌دار (Anti-TTL)</div>
            <div class="toggle-desc">تصاویر، ویدیوها و پیام‌های صوتی دارای محدودیت زمانی (View-Once) مستقیماً به ربات پشتیبان شما ارسال و ذخیره می‌شوند</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="botForwardTtlToggle" checked>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <!-- 🔐 تب ۹: امنیت حساب کاربری و ورود دو مرحله‌ای -->
      <div id="studioPaneSecurity" class="hidden">
        <!-- هدر معرفی بخش امنیت -->
        <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.12) 100%); border: 1px solid var(--accent-indigo-border); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
          <div style="font-size: 0.98rem; font-weight: 800; color: var(--text-main); margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span> <span>امنیت حساب کاربری و تنظیمات ورود دو مرحله‌ای</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.7;">
            حساب کاربری شما با استانداردهای امنیتی، رمزنگاری پیشرفته داده‌ها و امکان ورود دوعاملی (TOTP) محافظت می‌شود.
          </div>
        </div>

        <!-- کارت ۱: تایید دو مرحله‌ای (2FA / Google Authenticator) -->
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.3rem;">📱</span>
              <div>
                <div style="font-weight:700; font-size:0.92rem; color:var(--text-main);">ورود دو مرحله‌ای (Google Authenticator / 2FA)</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">محافظت از حساب با کدهای ۶ رقمی زمان‌محور</div>
              </div>
            </div>
            <div id="totpStatusBadge" style="padding:4px 12px; border-radius:999px; font-size:0.78rem; font-weight:700; background:var(--accent-rose-bg); color:var(--accent-rose); border:1px solid var(--accent-rose-border);">
              غیرفعال ❌
            </div>
          </div>

          <!-- بخش فعال‌سازی اولیه ۲FA (زمانی که غیرفعال است) -->
          <div id="totpSetupInactiveBox">
            <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.7; margin-bottom:14px;">
              با فعال‌سازی ۲FA، هنگام هر بار ورود به پنل، علاوه بر رمز عبور، به کد یکبار مصرف اپلیکیشن Google Authenticator یا 2FAS نیز احتیاج خواهید داشت.
            </p>
            <button class="btn btn-primary" id="btnStartTotp" onclick="startTotpSetup()">
              <span>🔐 راه‌اندازی و فعال‌سازی ۲FA</span>
            </button>
          </div>

          <!-- بخش مراحل راه‌اندازی ۲FA (هم کیو‌آر کد و هم کلید دستی) -->
          <div id="totpSetupModalBox" class="hidden" style="margin-top:18px; padding-top:18px; border-top:1px dashed var(--border-subtle);">
            <div style="background:rgba(99, 102, 241, 0.06); border:1px solid var(--accent-indigo-border); border-radius:var(--radius-md); padding:18px; margin-bottom:18px;">
              <div style="font-weight:800; font-size:0.9rem; color:var(--accent-indigo); margin-bottom:12px; display:flex; align-items:center; gap:6px;">
                <span>📷</span> <span>گام ۱: اسکن تصویر QR یا کپی کلید دستی</span>
              </div>
              
              <!-- تصویر کیو آر کد با پس‌زمینه سفید واضح و کادر زیبا -->
              <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; margin:10px 0 16px 0;">
                <div style="background:#ffffff; padding:12px; border-radius:16px; box-shadow:0 12px 36px rgba(0,0,0,0.25); display:inline-flex; align-items:center; justify-content:center; border:2px solid rgba(255,255,255,0.8);" id="totpQrCard">
                  <div id="totpQrContainer" style="width:200px; height:200px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <span class="spinner"></span>
                  </div>
                </div>
                <div style="font-size:0.76rem; color:var(--text-muted); margin-top:10px; text-align:center;">
                  اپلیکیشن Google Authenticator یا 2FAS را باز کرده و این بارکد را اسکن کنید.
                </div>
                <div style="margin-top:8px;">
                  <a id="totpDirectAppLink" href="#" class="btn btn-secondary" style="font-size:0.76rem; padding:6px 14px; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
                    <span>📱 باز کردن مستقیم در Authenticator (ویژه موبایل)</span>
                  </a>
                </div>
              </div>

              <!-- کلید دستی برای کاربرانی که امکان اسکن ندارند -->
              <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:12px; margin-top:12px;">
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:6px;">یا کلید محرمانه ۳۲ کاراکتری را دستی وارد نمایید:</div>
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                  <input type="text" id="totpSecretDisplay" class="input-field mono" readonly style="font-weight:800; letter-spacing:2px; text-align:center; flex:1; min-width:min(100%, 180px); font-size:0.92rem; background:transparent;" title="کلید دستی">
                  <button type="button" class="btn btn-secondary" onclick="copyTotpSecret()" style="font-size:0.8rem; padding:8px 14px; white-space:nowrap; flex: 1 1 auto;">
                    <span>📋 کپی کلید دستی</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- گام ۲: وارد کردن کد تایید -->
            <div class="form-group" style="margin-bottom:14px;">
              <label class="form-label" style="font-weight:800; color:var(--accent-indigo); margin-bottom:6px;">
                <span>🔢</span> <span>گام ۲: کد ۶ رقمی تولید شده در اپلیکیشن را وارد کنید</span>
              </label>
              <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                <input type="text" id="totpVerifyCodeInput" class="input-field mono" maxlength="6" inputmode="numeric" placeholder="مثال: 123456" style="text-align:center; font-size:1.3rem; letter-spacing:6px; max-width:200px; width:100%; font-weight:800;" onkeypress="if(event.key==='Enter') confirmEnableTotp();">
                <button type="button" class="btn btn-primary" id="btnConfirmTotp" onclick="confirmEnableTotp()" style="white-space:nowrap; padding:10px 22px; flex: 1 1 auto;">
                  <span>تأیید نهایی و فعال‌سازی ۲FA</span>
                </button>
                <button type="button" class="btn btn-secondary" onclick="cancelTotpSetup()" style="font-size:0.82rem; padding:8px 14px; flex: 0 1 auto;">
                  <span>انصراف</span>
                </button>
              </div>
            </div>
          </div>

          <!-- بخش وضعیت فعال ۲FA و نمایش کدهای بازیابی اضطراری -->
          <div id="totpActiveBox" class="hidden">
            <div style="background:rgba(16, 185, 129, 0.08); border:1px solid var(--accent-green-border); border-radius:var(--radius-sm); padding:14px; margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div style="font-weight:700; font-size:0.85rem; color:var(--accent-green); display:flex; align-items:center; gap:6px;">
                  <span>✅</span> <span>احراز هویت دو مرحله‌ای (2FA) برای حساب شما فعال است.</span>
                </div>
                <button type="button" class="btn btn-secondary" onclick="promptDisableTotp()" style="color:var(--accent-rose); border-color:var(--accent-rose-border); font-size:0.78rem; padding:6px 12px;">
                  <span>❌ غیرفعال‌سازی ۲FA</span>
                </button>
              </div>
            </div>

            <!-- کدهای اضطراری بازیابی (Backup Codes) -->
            <div id="totpActiveBackupCodesBox" style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
                <div style="font-weight:700; font-size:0.82rem; color:var(--accent-amber);">
                  <span>🔑 کدهای بازیابی اضطراری (Emergency Backup Codes)</span>
                </div>
                <button type="button" class="btn btn-secondary" onclick="copyAllBackupCodes()" style="font-size:0.75rem; padding:4px 10px;">
                  <span>📋 کپی تمام کدها</span>
                </button>
              </div>
              <div style="font-size:0.74rem; color:var(--text-muted); margin-bottom:10px; line-height:1.6;">
                در صورت عدم دسترسی به گوشی یا اپ Authenticator، با هر یک از این کدهای یک‌بار مصرف می‌توانید وارد حساب شوید:
              </div>
              <div id="totpActiveBackupCodesList" style="font-family:monospace; font-size:0.88rem; display:grid; grid-template-columns:repeat(auto-fill, minmax(115px, 1fr)); gap:6px;"></div>
            </div>
          </div>
        </div>

        <!-- کارت ۲: مدیریت بکاپ رمزنگاری‌شده (Encrypted Backup Manager) -->
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px; margin-bottom: 20px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:14px;">
            <span style="font-size:1.3rem;">💾</span>
            <div>
              <div style="font-weight:700; font-size:0.92rem; color:var(--text-main);">پشتیبان‌گیری رمزنگاری شده (Encrypted Backup & Restore)</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">دانلود نسخه پشتیبان امن از تمام تنظیمات و سشن، یا بازیابی آن روی سرور</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap:16px;">
            <!-- دانلود بکاپ -->
            <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px;">
              <div style="font-weight:700; font-size:0.82rem; margin-bottom:8px; color:var(--accent-indigo);">📥 ایجاد و دریافت خروجی امن</div>
              <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.6; margin-bottom:10px;">
                تمام تنظیمات ساعت، بیوگرافی، منشی، بلاک‌لیست و سشن تلگرام شما با الگوریتم AES-GCM و رمز شما قفل شده و به شکل فایل دانلود می‌شود.
              </p>
              <div class="form-group" style="margin-bottom:10px;">
                <input type="password" id="backupExportPass" class="input-field" placeholder="رمز عبور حساب برای رمزنگاری فایل">
              </div>
              <button class="btn btn-secondary" onclick="downloadBackupFile()" style="width:100%; font-size:0.82rem;">
                <span>💾 خروجی پشتیبان (Export)</span>
              </button>
            </div>

            <!-- بازیابی بکاپ -->
            <div style="background:var(--bg-input); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px;">
              <div style="font-weight:700; font-size:0.82rem; margin-bottom:8px; color:var(--accent-purple);">📤 بازیابی فایل پشتیبان (Restore)</div>
              <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.6; margin-bottom:10px;">
                فایل بکاپ دانلود شده را انتخاب و رمزی که با آن قفل شده را وارد نمایید تا تنظیمات بازگردانی شوند:
              </p>
              <div class="form-group" style="margin-bottom:8px;">
                <input type="file" id="backupFileInput" accept=".json" class="input-field" style="padding:6px; font-size:0.78rem;">
              </div>
              <div class="form-group" style="margin-bottom:10px;">
                <input type="password" id="backupImportPass" class="input-field" placeholder="رمز عبور استفاده شده هنگام بکاپ">
              </div>
              <button class="btn btn-secondary" onclick="restoreBackupFile()" style="width:100%; font-size:0.82rem; color:var(--accent-purple); border-color:var(--accent-purple-border);">
                <span>🔄 بازیابی اطلاعات (Restore)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- کارت ۳: سیستم محافظت در برابر نفوذ و مسدودسازی خودکار -->
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.3rem;">🛡️</span>
              <div>
                <div style="font-weight:700; font-size:0.92rem; color:var(--text-main);">سیستم پایش و محافظت در برابر نفوذ</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">مسدودسازی خودکار درخواست‌های غیرمجاز و پویشگران امنیتی</div>
              </div>
            </div>
            <div style="padding:4px 12px; border-radius:999px; font-size:0.78rem; font-weight:700; background:var(--accent-green-bg); color:var(--accent-green); border:1px solid var(--accent-green-border);">
              فعال 🟢
            </div>
          </div>
          <div style="font-size:0.78rem; color:var(--text-muted); line-height:1.7;">
            درخواست‌های مشکوک و تلاش‌های غیرمجاز برای دسترسی به مسیرهای نامعتبر، بلافاصله در لبه شبکه ابری مسدود شده و گزارش آن در لاگ‌های امنیتی سامانه ثبت می‌گردد.
          </div>
        </div>
      </div>

      <!-- 🧭 نوار پیمایش بین تب‌های استودیو (Studio Feature Stepper) -->
      <div class="studio-nav-bar">
        <button type="button" class="studio-nav-btn prev" id="studioNavPrev" onclick="navigateStudioStep(-1)">
          <span class="nav-arrow">◀</span>
          <div class="nav-btn-text">
            <span class="nav-btn-sub" data-i18n="stepPrev">بخش قبلی</span>
            <span class="nav-btn-title" id="studioNavPrevTitle">ساعت و قالب نوشتاری</span>
          </div>
        </button>

        <div class="studio-nav-center">
          <div class="studio-nav-counter">
            <span id="studioNavCurrentTitle" style="color:var(--text-main); font-weight:800; font-size:0.83rem;">🕒 ساعت و قالب نوشتاری</span>
            <span style="opacity:0.6; font-size:0.75rem;"> (<span id="studioNavCurrentStep">۱</span> <span data-i18n="stepOf">از</span> ۹)</span>
          </div>
          <div class="studio-nav-dots" id="studioNavDots"></div>
        </div>

        <button type="button" class="studio-nav-btn next" id="studioNavNext" onclick="navigateStudioStep(1)">
          <div class="nav-btn-text">
            <span class="nav-btn-sub" data-i18n="stepNext">بخش بعدی</span>
            <span class="nav-btn-title" id="studioNavNextTitle">بیوگرافی زنده</span>
          </div>
          <span class="nav-arrow">▶</span>
        </button>
      </div>

      <button class="btn btn-primary" id="saveBtn" onclick="saveFonts()" style="margin-top: 10px; margin-bottom: 24px;">
        <span data-i18n="saveBtn">💾 ذخیره و اعمال تغییرات استودیو</span>
      </button>

      <!-- ⚡ بخش ۴: عملیات و مانیتورینگ سلامت -->
      <div class="section-header" style="margin-top: 14px;">
        <div class="section-title">
          <span>⚡</span> <span data-i18n="telemetrySectionTitle">وضعیت سرویس و مانیتورینگ سلامت</span>
        </div>
        <span class="section-tag">Edge Telemetry</span>
      </div>

      <div class="action-buttons-grid">
        <button class="btn btn-secondary" id="syncBtn" onclick="triggerImmediateSync()">
          <span data-i18n="syncBtn">⚡ تست به‌روزرسانی آنی</span>
        </button>
        <button class="btn btn-warning" id="toggleBotBtn" onclick="toggleBotState()">
          <span id="toggleBotText" data-i18n="pauseBtn">⏸️ توقف موقت</span>
        </button>
        <button class="btn btn-secondary" onclick="showTelegramConnect()" style="color:var(--accent-blue); border-color:var(--accent-blue-border); font-size:0.82rem;">
          <span data-i18n="switchTgBtn">📱 تعویض اکانت</span>
        </button>
      </div>

      <!-- کارت‌های مانیتورینگ سلامت -->
      <div class="health-grid">
        <div class="health-item">
          <div class="health-label" data-i18n="botStatusLabel">وضعیت سلف‌بات شما</div>
          <div class="health-value" id="botStatusBadge" style="color:var(--accent-green);">🟢 فعال و آنلاین</div>
        </div>
        <div class="health-item">
          <div class="health-label" data-i18n="lastUpdateLabel">آخرین به‌روزرسانی تلگرام</div>
          <div class="health-value" id="lastUpdateTime">درحال استعلام...</div>
        </div>
      </div>
    </div>

    <!-- ⚓ فوتر اختصاصی سایت Arizo Self -->
    <div class="footer-dock">
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="dot-pulse"></span>
        <span data-i18n="footerText">شبکه ابری Arizo Self فعال است</span>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-dim);">
        Arizo Self Cloud Platform &copy; 2026
      </div>
    </div>

  </div>

  <!-- 💎 مودال رسمی و حرفه‌ای راهنما و معرفی امکانات سامانه Arizo Self -->
  <div id="featuresIntroModal" class="modal-backdrop hidden" onclick="if(event.target === this) closeFeaturesModal();">
    <div class="features-modal-container" onclick="event.stopPropagation();">
      
      <!-- سربرگ رسمی (ثابت در بالا) -->
      <div class="features-modal-header">
        <div class="features-header-content">
          <div class="features-header-top-row">
            <span class="features-header-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>معرفی امکانات و سرویس‌های پیشرفته | Arizo Self v3.6.2 PRO</span>
            </span>
          </div>
          <div class="features-header-title">استودیوی ابری سلف‌بات هوشمند تلگرام</div>
          <div class="features-header-desc">
            پلتفرم متمرکز ابری جهت خودکارسازی و مدیریت نمایه تلگرام بر بستر سرورلس ۲۴ ساعته بدون نیاز به آنلاین بودن دستگاه یا سرور اختصاصی.
          </div>
          <!-- تراشه‌های زیرساخت ابری (مینی‌مال و فوق‌العاده شکیل) -->
          <div class="features-chips-row">
            <span class="features-chip">
              <span class="features-chip-dot"></span>
              <span>واکنش زیر ۴۰ms</span>
            </span>
            <span class="features-chip">
              <span class="features-chip-dot" style="background:var(--accent-blue); box-shadow:0 0 6px var(--accent-blue);"></span>
              <span>۱۰۰٪ ابری ۲۴/۷</span>
            </span>
            <span class="features-chip">
              <span class="features-chip-dot" style="background:var(--accent-green); box-shadow:0 0 6px var(--accent-green);"></span>
              <span>دیتابیس هیبرید D1 + KV</span>
            </span>
            <span class="features-chip">
              <span class="features-chip-dot" style="background:var(--accent-purple); box-shadow:0 0 6px var(--accent-purple);"></span>
              <span>امنیت ۲FA و هانی‌پات</span>
            </span>
          </div>
        </div>
        <button class="btn-close" onclick="closeFeaturesModal()" title="بستن پنجره">&times;</button>
      </div>

      <!-- بدنه کارت‌های امکانات (اسکرول نرم و روان در صورت نیاز) -->
      <div class="features-modal-body">
        <div class="features-cards-grid">
          <!-- ۱. ساعت زنده اتمی نام کاربری -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">ساعت زنده نام کاربری</span>
                <span class="feature-item-badge">۳۲ قلم نوشتاری</span>
              </div>
              <div class="feature-item-desc">
                به‌روزرسانی خودکار و بلادرنگ زمان تهران در نام کاربری تلگرام با ۳۲ استایل قلم فارسی و لاتین، ارقام محلی و نمایش ۱۲/۲۴ ساعته رأس ثانیه ۰۰.
              </div>
            </div>
          </div>

          <!-- ۲. بیوگرافی پویا و تقویم -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">بیوگرافی زنده و تقویم</span>
                <span class="feature-item-badge">متغیرهای هوشمند</span>
              </div>
              <div class="feature-item-desc">
                نمایش تقویم زنده هجری شمسی، روز هفته و ساعت در بخش Bio تلگرام با الگوهای مدرن و متغیرهای داینامیک.
              </div>
            </div>
          </div>

          <!-- ۳. منشی و پاسخگوی هوشمند پیوی -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">منشی خودکار پیوی (AFK)</span>
                <span class="feature-item-badge">سیستم ضد اسپم</span>
              </div>
              <div class="feature-item-desc">
                پاسخگویی هوشمند به پیام‌های شخصی هنگام آفلاین بودن، با قابلیت تعریف متن سفارشی، فاصله زمانی و استثناسازی ربات‌ها و کاربران.
              </div>
            </div>
          </div>

          <!-- ۴. دستیار و پاسخگوی هوش مصنوعی -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">دستیار هوش مصنوعی (AI)</span>
                <span class="feature-item-badge">پاسخگوی چت لبه‌ای</span>
              </div>
              <div class="feature-item-desc">
                تعامل زبانی و پاسخ‌دهی خودکار به چت‌ها با استفاده از مدل‌های پیشرفته هوش مصنوعی متصل به سامانه سرورلس ابری.
              </div>
            </div>
          </div>

          <!-- ۵. پایشگر ضد حذف تلگرام -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">پایشگر ضد حذف (Anti-Delete)</span>
                <span class="feature-item-badge">متن، عکس، ویس و فایل</span>
              </div>
              <div class="feature-item-desc">
                ضبط و فوروارد بلادرنگ پیام‌ها، فایل‌ها، تصاویر، ویس‌ها و استیکرهای پاک‌شده توسط مخاطبان در پیوی به ربات دستیار شخصی.
              </div>
            </div>
          </div>

          <!-- ۶. مانیتور و ضد ویرایش پیام -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">مانیتور ضد ویرایش (Anti-Edit)</span>
                <span class="feature-item-badge">متن قبل و بعد ادیت</span>
              </div>
              <div class="feature-item-desc">
                آشکارسازی و ارسال متن اولیه پیام‌ها قبل از ویرایش به همراه نسخه اصلاح‌شده و زمان دقیق به ربات دستیار برای ثبت تاریخچه.
              </div>
            </div>
          </div>

          <!-- ۷. نجات رسانه‌های خودتخریبی Anti-TTL -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">آرشیو رسانه‌ها (Anti-TTL)</span>
                <span class="feature-item-badge">رسانه‌های View-Once</span>
              </div>
              <div class="feature-item-desc">
                ذخیره و فوروارد فوری عکس‌ها و ویدیوهای محوشونده و تایمردار تلگرام پیش از سوختن یا ناپدید شدن با حداکثر کیفیت اصلی.
              </div>
            </div>
          </div>

          <!-- ۸. حالت نامرئی و روح -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">حالت روح و نامرئی (Ghost Mode)</span>
                <span class="feature-item-badge">مشاهده بدون تیک دوم</span>
              </div>
              <div class="feature-item-desc">
                مشاهده و مرور پیام‌های دریافتی بدون سین خوردن با امکان فعال‌سازی از پنل یا دستور تلگرامی <code>.ghost on</code> و <code>.read</code>.
              </div>
            </div>
          </div>

          <!-- ۹. مدیریت سکوت و فیلتر پیام‌ها -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">مدیریت سکوت و فیلتر (Mute)</span>
                <span class="feature-item-badge">پاکسازی دوطرفه چت</span>
              </div>
              <div class="feature-item-desc">
                مسدودسازی و حذف خودکار و آنی پیام‌های کاربران مزاحم با دستور تلگرامی <code>.mute</code> و مدیریت یکپارچه از طریق پنل.
              </div>
            </div>
          </div>

          <!-- ۱۰. حالت خواب و استراحت شبانه -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">حالت خواب شبانه (Sleep Mode)</span>
                <span class="feature-item-badge">اتوماسیون استراحت</span>
              </div>
              <div class="feature-item-desc">
                تغییر خودکار نام خانوادگی به حالت استراحت و به تعویق انداختن پیام‌ها در ساعات مشخص شبانه به صورت اتوماتیک.
              </div>
            </div>
          </div>

          <!-- ۱۱. تایید دو مرحله‌ای سخت‌گیرانه -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">تایید دومرحله‌ای (Google 2FA)</span>
                <span class="feature-item-badge">استاندارد TOTP RFC 6238</span>
              </div>
              <div class="feature-item-desc">
                محافظت نفوذناپذیر از حساب پنل کاربری با Google Authenticator، رمز موقت ۶ رقمی و ۸ کد بازیابی اضطراری.
              </div>
            </div>
          </div>

          <!-- ۱۲. سیستم پایش و مهار دسترسی‌های غیرمجاز -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">پایش امنیتی و مهار دسترسی‌های مشکوک</span>
                <span class="feature-item-badge">فایروال و مسدودسازی خودکار</span>
              </div>
              <div class="feature-item-desc">
                شناسایی خودکار درخواست‌های نامعتبر، مسدودسازی سریع آی‌پی‌های مشکوک و ارسال اعلان‌های امنیتی به حساب کاربری.
              </div>
            </div>
          </div>

          <!-- ۱۳. ویزارد گرافیکی راه‌اندازی (/setup) -->
          <div class="feature-card-item" style="border: 1px solid var(--accent-blue-border); background: var(--accent-blue-bg);">
            <div class="feature-item-icon" style="color: var(--accent-blue);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title" style="color: var(--accent-blue);">ویزارد راه‌اندازی تحت وب (/setup)</span>
                <span class="feature-item-badge" style="background:var(--accent-blue); color:#fff;">بدون کدنویسی</span>
              </div>
              <div class="feature-item-desc">
                راهنمای جامع تعاملی ۵ مرحله‌ای برای دریافت API کلیدها، ایجاد سشن تلگرام و راه‌اندازی آسان و بدون ترمینال.
              </div>
            </div>
          </div>

          <!-- ۱۴. سیستم ارتقا به مدیر و مدیریت سطوح دسترسی -->
          <div class="feature-card-item" style="border: 1px solid var(--accent-amber-border); background: var(--accent-amber-bg);">
            <div class="feature-item-icon" style="color: var(--accent-amber);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title" style="color: var(--accent-amber);">سیستم ارتقا به مدیر (Role System)</span>
                <span class="feature-item-badge" style="background:var(--accent-amber); color:#000;">ارتقا / تنزل آنی</span>
              </div>
              <div class="feature-item-desc">
                امکان ارتقای مستقیم کاربران به مدیر سیستم یا تنزل به کاربر عادی در جدول کاربران و پنل بازرس با تایید امنیتی.
              </div>
            </div>
          </div>

          <!-- ۱۵. تله‌متری و مانیتورینگ ۳۶۰ درجه (/admin) -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">داشبورد مانیتورینگ (/admin)</span>
                <span class="feature-item-badge">روت مستقل و امن</span>
              </div>
              <div class="feature-item-desc">
                مشاهده آمارهای زنده دیتابیس، نرخ رایت‌ها، سشن‌های فعال، خطاهای ثبت‌شده و وضعیت ربات‌های کمکی در صفحه مجزا.
              </div>
            </div>
          </div>

          <!-- ۱۶. موتور هیبریدی ذخیره‌سازی Zero-Write -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">موتور ذخیره‌سازی هیبرید D1 + KV</span>
                <span class="feature-item-badge">۱۰۰,۰۰۰ رایت D1 روزانه</span>
              </div>
              <div class="feature-item-desc">
                بهره‌گیری همزمان از Cloudflare D1 و KV همراه با کش رم هوشمند جهت به صفر رساندن استهلاک دیتابیس بدون مصرف اضافه.
              </div>
            </div>
          </div>

          <!-- ۱۷. انبار لایسنس و ردیم‌کدها -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">انبار لایسنس و ردیم‌کد (License Vault)</span>
                <span class="feature-item-badge">مدیریت اعتبار و تاریخ انقضا</span>
              </div>
              <div class="feature-item-desc">
                تولید، ابطال و رصد کدهای اشتراک مدت‌دار با فرمت استاندارد ARIZO-XXXX، تخصیص مستقیم به کاربران و مدیریت مالی اشتراک‌ها.
              </div>
            </div>
          </div>

          <!-- ۱۸. مینی اپلیکیشن تلگرام -->
          <div class="feature-card-item">
            <div class="feature-item-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </div>
            <div class="feature-item-body">
              <div class="feature-item-top">
                <span class="feature-item-title">مینی اپلیکیشن تلگرام (Telegram WebApp)</span>
                <span class="feature-item-badge">ورود مستقیم SSO</span>
              </div>
              <div class="feature-item-desc">
                دسترسی تمام‌عیار و مدیریت سلف‌بات مستقیماً از درون محیط تلگرام با ورود خودکار امن و هماهنگی کامل با تم تلگرام.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- نوار پایانی اکشن‌ها (همیشه ثابت در پایین و کاملاً نمایان) -->
      <div class="features-modal-action-bar">
        <label class="features-pref-toggle">
          <input type="checkbox" id="dontShowFeaturesAgain">
          <span>عدم نمایش خودکار در دفعات بعدی</span>
        </label>
        <div class="features-action-buttons">
          <a href="/setup" target="_blank" style="color: var(--accent-blue); font-weight: 700; font-size: 0.8rem; padding: 7px 14px; border: 1px solid var(--accent-blue-border); border-radius: var(--radius-sm); background: var(--accent-blue-bg); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
            <span>🚀</span> <span>ویزارد راه‌اندازی (/setup)</span>
          </a>
          <button class="btn-feature-dismiss" onclick="closeFeaturesModal()">
            <span>بستن</span>
          </button>
          <button class="btn-feature-start" onclick="closeFeaturesModal()">
            <span>ورود به استودیو</span>
            <span style="font-size: 1rem; line-height: 1;">✨</span>
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- 🪟 مودال تنظیمات حساب کاربری -->
  <div id="settingsModal" class="modal-backdrop hidden">
    <div class="modal-container">
      <div class="modal-head">
        <div class="modal-heading" data-i18n="settingsHeading">⚙️ تنظیمات و امنیت حساب کاربری</div>
        <button class="btn-close" onclick="closeSettingsModal()">&times;</button>
      </div>

      <!-- تمدید اشتراک با ردیم‌کد -->
      <div style="background: var(--accent-purple-bg); border: 1px solid var(--accent-purple-border); border-radius: 14px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size:0.88rem; font-weight:700; color:var(--accent-purple); margin-bottom:10px;" data-i18n="redeemExtendTitle">🎟️ تمدید اعتبار اشتراک با کد لایسنس</div>
        <div class="input-action-row">
          <input type="text" id="extendCodeInput" class="input-field mono" placeholder="کد لایسنس جدید (مثال: ARIZO-XXXX-XXXX-XXXX)" style="text-transform: uppercase;" data-i18n-placeholder="extendPlaceholder">
          <button class="btn btn-secondary" onclick="doRedeemExtend()" style="color:var(--accent-purple); border-color:var(--accent-purple-border); white-space:nowrap;">
            <span data-i18n="extendBtn">تمدید و افزایش اعتبار</span>
          </button>
        </div>
      </div>

      <!-- تغییر پسورد -->
      <div style="margin-bottom: 24px;">
        <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 12px; color: var(--accent-indigo);" data-i18n="changePassTitle">🔑 تغییر گذرواژه ورود</div>
        <div class="form-group">
          <label class="form-label" data-i18n="oldPassLabel">گذرواژه فعلی</label>
          <input type="password" id="oldPassInput" class="input-field" placeholder="گذرواژه فعلی حساب کاربری شما" data-i18n-placeholder="oldPassPlaceholder">
        </div>
        <div class="form-group">
          <label class="form-label" data-i18n="newPassLabel">گذرواژه جدید (حداقل ۸ کاراکتر)</label>
          <input type="password" id="newPassInput" class="input-field" placeholder="گذرواژه جدید و امن (حداقل ۸ کاراکتر)" data-i18n-placeholder="newPassPlaceholder">
        </div>
        <button class="btn btn-secondary" onclick="doChangePassword()" data-i18n="savePassBtn">ذخیره گذرواژه جدید</button>
      </div>

      <hr style="border: 0; border-top: 1px solid var(--border-subtle); margin-bottom: 20px;">

      <!-- عملیات حساس -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn btn-secondary" onclick="doDisconnectTelegram()" style="color:var(--accent-amber);">
          <span data-i18n="disconnectTgBtn">🔌 قطع ارتباط با حساب تلگرام</span>
        </button>
        <button class="btn btn-danger" onclick="doDeleteAccount()">
          <span data-i18n="deleteAccountBtn">🗑️ حذف کامل حساب کاربری و اطلاعات</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 🎟️ مودال اختصاصی تمدید و ارتقای اشتراک (License Renewal Modal) -->
  <div id="licenseRenewalModal" class="modal-backdrop hidden" onclick="if(event.target === this) closeLicenseModal();">
    <div class="modal-container" onclick="event.stopPropagation();" style="max-width: 490px;">
      <div class="modal-head">
        <div class="modal-heading" style="display:flex; align-items:center; gap:8px;">
          <span>🎟️</span>
          <span data-i18n="licenseModalTitle">تمدید و ارتقای اشتراک حساب کاربری</span>
        </div>
        <button class="btn-close" onclick="closeLicenseModal()">&times;</button>
      </div>

      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%); border: 1px solid var(--accent-indigo-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;" data-i18n="licenseModalDescTitle">
          فعال‌سازی کد اشتراک جدید
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.6;" data-i18n="licenseModalDesc">
          کد لایسنس دریافتی از پشتیبانی را در کادر زیر وارد فرمایید. پس از ثبت، مدت زمان اعتبار و امکانات مربوطه بلافاصله به حساب شما اعمال خواهد شد.
        </div>
      </div>

      <div class="form-group" style="margin-bottom: 18px;">
        <label class="form-label" data-i18n="licenseModalInputLabel">کد لایسنس اشتراک (کد فعال‌سازی)</label>
        <input type="text" id="modalRenewCodeInput" class="input-field mono" placeholder="ARIZO-XXXX-XXXX-XXXX" style="text-transform: uppercase; font-weight: 700; letter-spacing: 1px;" data-i18n-placeholder="licenseModalInputPlaceholder">
      </div>

      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button type="button" class="btn btn-secondary" onclick="closeLicenseModal()" data-i18n="licenseModalCancel">
          انصراف
        </button>
        <button type="button" class="btn btn-primary" id="btnModalRedeem" onclick="doModalRedeemLicense()">
          <span data-i18n="licenseModalSubmit">ثبت و افزایش اعتبار</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 🔍 مودال مانیتورینگ جامع و کنترل پیشرفته کاربران (User Inspector Modal) -->
  <div id="adminUserInspectorModal" class="modal-backdrop hidden" onclick="if(event.target === this) closeUserInspector();">
    <div class="admin-inspector-container" onclick="event.stopPropagation();">
      <div class="inspector-header">
        <div class="inspector-header-info">
          <div class="inspector-avatar" id="inspectorAvatar">👤</div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span id="inspectorUsername" style="font-size:1.1rem; font-weight:800; color:var(--text-main);">کاربر</span>
              <span id="inspectorRoleBadge"></span>
              <span id="inspectorPlanBadge"></span>
              <span id="inspectorSuspendBadge"></span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-top:2px;">
              <span>ثبت‌نام: </span><span id="inspectorCreatedAt">-</span>
              <span style="margin: 0 6px;">•</span>
              <span>کد لایسنس: </span><span id="inspectorLicenseCode" class="mono">-</span>
            </div>
          </div>
        </div>
        <button class="btn-close" onclick="closeUserInspector()">&times;</button>
      </div>

      <div class="inspector-scroll-area">
        <div id="inspectorQuickActions" style="margin-bottom:14px; padding:12px 14px; background:rgba(255, 255, 255, 0.03); border:1px solid var(--border-subtle); border-radius:14px;"></div>
        <div class="telemetry-grid" id="inspectorTelemetryGrid">
          <!-- کارت‌های ۴ گانه مانیتورینگ به صورت داینامیک اینجا رندر می‌شوند -->
        </div>
      </div>

      <div style="margin-top:14px; padding-top:12px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <div style="font-size:0.75rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
          <span>💡 تمامی تغییرات بلافاصله در حافظه Edge Cloudflare ذخیره و اعمال می‌گردند.</span>
        </div>
        <button class="btn btn-secondary" onclick="closeUserInspector()" style="padding:6px 14px; font-size:0.8rem;">
          <span>بستن پنجره</span>
        </button>
      </div>
    </div>
  </div>

  <div id="toast"></div>

  <!-- 🚀 منطق جاوااسکریپت و بوم الگوریتمی کلاینت -->
  <script>
    // ==========================================
    // 🌌 موتور بوم الگوریتمی (Generative Canvas Mesh)
    // ==========================================
    (function initAlgorithmicBackground() {
      var canvas = document.getElementById('algoCanvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var width, height, dpr;
      var particles = [];
      var mouse = { x: -1000, y: -1000, active: false };
      var animFrameId = null;
      var isRunning = true;

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function createParticles() {
        particles = [];
        var count = Math.min(20, Math.max(10, Math.floor((width * height) / 45000)));
        for (var i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.45,
            vy: (Math.random() - 0.5) * 0.45,
            radius: Math.random() * 1.5 + 1.0,
            baseAlpha: Math.random() * 0.25 + 0.25,
            colorShift: Math.random()
          });
        }
      }

      window.addEventListener('resize', function() {
        resize();
        createParticles();
      });
      resize();
      createParticles();

      window.addEventListener('mousemove', function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      });
      window.addEventListener('mouseleave', function() {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      });

      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          isRunning = false;
          if (animFrameId) cancelAnimationFrame(animFrameId);
        } else {
          isRunning = true;
          render();
        }
      });

      var maxDistSq = 110 * 110;
      var mouseDistSq = 120 * 120;

      function render() {
        if (!isRunning) return;
        ctx.clearRect(0, 0, width, height);

        var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        var pLen = particles.length;

        // رسم ذرات
        for (var i = 0; i < pLen; i++) {
          var p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          else if (p.x > width) { p.x = width; p.vx *= -1; }
          if (p.y < 0) { p.y = 0; p.vy *= -1; }
          else if (p.y > height) { p.y = height; p.vy *= -1; }

          if (mouse.active) {
            var dx = mouse.x - p.x;
            var dy = mouse.y - p.y;
            var d2 = dx * dx + dy * dy;
            if (d2 < mouseDistSq) {
              p.x += dx * 0.015;
              p.y += dy * 0.015;
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? (p.colorShift > 0.5 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(56, 189, 248, 0.4)')
            : (p.colorShift > 0.5 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(2, 132, 199, 0.3)');
          ctx.fill();
        }

        // رسم یکپارچه خطوط اتصال با یک بار stroke بهینه
        ctx.beginPath();
        for (var i = 0; i < pLen; i++) {
          var p1 = particles[i];
          for (var j = i + 1; j < pLen; j++) {
            var p2 = particles[j];
            var diffX = p1.x - p2.x;
            var diffY = p1.y - p2.y;
            var distSq = diffX * diffX + diffY * diffY;

            if (distSq < maxDistSq) {
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
            }
          }
        }
        ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.12)' : 'rgba(99, 102, 241, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        animFrameId = requestAnimationFrame(render);
      }

      render();
    })();

    // ==========================================
    // ☀️ سوئیچر تم شب و روز
    // ==========================================
    window.toggleTheme = function() {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('arizo_theme', next);
      updateThemeUI(next);
    };

    function updateThemeUI(theme) {
      var icon = document.getElementById('themeIcon');
      var text = document.getElementById('themeText');
      if (icon) {
        icon.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(function() { icon.style.transform = 'rotate(0deg) scale(1)'; }, 350);
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
      }
      if (text) {
        if (window.currentLang === 'en') {
          text.textContent = theme === 'dark' ? 'Day Mode' : 'Night Mode';
        } else {
          text.textContent = theme === 'dark' ? 'حالت روز' : 'حالت شب';
        }
      }
    }
    updateThemeUI(document.documentElement.getAttribute('data-theme') || 'dark');

    // ==========================================
    // 🌐 موتور چندزبانه بومی جامع ریشه‌ای (Root Dual-Language I18N Engine)
    // ==========================================
    window.currentLang = localStorage.getItem('arizo_lang') || 'fa';
    try {
      window.TRANSLATIONS_MAP = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob('eyLimqEgQXJpem8gU2VsZiB8INm+2YTYqtmB2LHZhSDYp9iz2KrZiNiv24zZiNuMINiz2YTZgeKAjNio2KfYqiDZh9mI2LTZhdmG2K8g2KrZhNqv2LHYp9mFINmIINm+2YbZhCDZhdiv24zYsduM2KoiOiLimqEgQXJpem8gU2VsZiB8IEludGVsbGlnZW50IFRlbGVncmFtIFNlbGZib3QgU3R1ZGlvICYgQ2xvdWQgTWFuYWdlbWVudCIsItit2KfZhNiqINix2YjYsiI6IkRheSBNb2RlIiwi2K3Yp9mE2Kog2LTYqCI6Ik5pZ2h0IE1vZGUiLCLYsdin2YfZhtmF2KfbjCDYp9mF2qnYp9mG2KfYqiI6IkZlYXR1cmUgVG91ciIsItm+2YbZhCDZhdiv24zYsduM2KoiOiJBZG1pbiBQb3J0YWwiLCLaqdin2LHYqNixIjoiVXNlciIsItmF2LHaqdiyINmB2LHZhdin2YbYr9mH24wg2Ygg2YHYsdmI2LTar9in2YcgQXJpem8gU2VsZiI6IkFyaXpvIFNlbGYgQ29tbWFuZCBDZW50ZXIgJiBTdG9yZSIsItmF2LHaqdiyINmB2LHZhdin2YbYr9mH24wg2Ygg2YHYsdmI2LTar9in2Ycg2KLYsduM2LLZiCDYs9mE2YEiOiJBcml6byBTZWxmIENvbW1hbmQgQ2VudGVyICYgU3RvcmUiLCLYqNin2LLar9i02Kog2KjZhyDZvtmG2YQg2qnYp9ix2KjYsdin2YYiOiJSZXR1cm4gdG8gVXNlciBEYXNoYm9hcmQiLCLYotmF2KfYsSDZiCDYtNin2K7YteKAjNmH2KciOiJTdGF0cyAmIE1ldHJpY3MiLCLYtdiv2YjYsSDZiCDYp9mG2KjYp9ixINmE2KfbjNiz2YbYsyI6IkxpY2Vuc2UgSW52ZW50b3J5Iiwi2YXYr9uM2LHbjNiqINqp2KfYsdio2LHYp9mGINmIINix2KjYp9iq4oCM2YfYpyI6IlVzZXJzICYgU2VsZmJvdHMiLCLbsCI6IjAiLCLwn5GlINqp2YQg2qnYp9ix2KjYsdin2YYiOiLwn5GlIFRvdGFsIFVzZXJzIiwi8J+foiDYsdio2KfYquKAjNmH2KfbjCDZgdi52KfZhCI6IvCfn6IgQWN0aXZlIFNlbGZib3RzIiwi8J+On++4jyDaqdiv2YfYp9uMINii2YXYp9iv2Ycg2YHYsdmI2LQiOiLwn46f77iPIEF2YWlsYWJsZSBMaWNlbnNlcyIsIvCfkrMg2qnYr9mH2KfbjCDZhdi12LHZgeKAjNi02K/ZhyI6IvCfkrMgUmVkZWVtZWQgTGljZW5zZXMiLCLwn4yQINiz2YTYp9mF2Kog2LTYqNqp2Ycg2KfYqNix24wgQXJpem8gRWRnZSI6IvCfjJAgQXJpem8gRWRnZSBDbG91ZCBOZXR3b3JrIEhlYWx0aCIsItiz2LHZiNix2YfYp9uMIENsb3VkZmxhcmUgV29ya2VycyDYqNinINiq2YjYstuM2Lkg2KzZh9in2YbbjCDYr9ixINit2KfZhCDYp9is2LHYp9uMINqp2LHZiNmG4oCM2KzYp9io4oCM2YfYp9uMINiy2YXYp9mG4oCM2KjZhtiv24zigIzYtNiv2Ycg2YfYs9iq2YbYry4g2KfYqti12KfZhCDZh9mF2q/Yp9mF4oCM2LPYp9iyINiq2YfYsdin2YYg2K/YsSDZhduM2YTbjOKAjNir2KfZhtuM2Ycg2LXZgdixINmH2LEg2K/ZgtuM2YLZhyDZgdi52KfZhCDYp9iz2KouIjoiQ2xvdWRmbGFyZSBXb3JrZXJzIGVkZ2UgbmV0d29yayBydW5uaW5nIHNjaGVkdWxlZCBjcm9uIGpvYnMgZ2xvYmFsbHkuIFRlaHJhbiBzeW5jIGFjdGl2ZSBhdCBzZWNvbmQgMDAuMDAwIG9mIGV2ZXJ5IG1pbnV0ZS4iLCLYtdiv2YjYsSDaqdiv2YfYp9uMINis2K/bjNivINmE2KfbjNiz2YbYsyBBcml6byBTZWxmINio2LHYp9uMINmB2LHZiNi0INio2Ycg2K7YsduM2K/Yp9ix2KfZhiI6Iklzc3VlIE5ldyBBcml6byBTZWxmIExpY2Vuc2VzIGZvciBDdXN0b21lcnMiLCLYqti52K/Yp9ivINqp2K8iOiJDb2RlIFF1YW50aXR5Iiwi27Eg2LnYr9ivINqp2K8iOiIxIExpY2Vuc2UgS2V5Iiwi27Ug2LnYr9ivINqp2K8iOiI1IExpY2Vuc2UgS2V5cyIsItux27Ag2LnYr9ivINqp2K8iOiIxMCBMaWNlbnNlIEtleXMiLCLbstuwINi52K/YryDaqdivIjoiMjAgTGljZW5zZSBLZXlzIiwi2YbZiNi5INin2LTYqtix2KfaqSDZiCDYp9i52KrYqNin2LEiOiJTdWJzY3JpcHRpb24gUGxhbiAmIFZhbGlkaXR5Iiwi2KfYtNiq2LHYp9qpINuxINmF2KfZh9mHICjbs9uwINix2YjYsikiOiIxIE1vbnRoICgzMCBEYXlzKSIsItin2LTYqtix2KfaqSDbsyDZhdin2YfZhyAo27nbsCDYsdmI2LIpIjoiMyBNb250aHMgKDkwIERheXMpIiwi2KfYtNiq2LHYp9qpINu2INmF2KfZh9mHICjbsdu427Ag2LHZiNiyKSI6IjYgTW9udGhzICgxODAgRGF5cykiLCLYp9i02KrYsdin2qkg2K/Yp9im2YXbjCDZiCDZhtin2YXYrdiv2YjYryI6IkxpZmV0aW1lIFVubGltaXRlZCBQbGFuIiwi4q2QINiz2YHYp9ix2LTbjCAo2KrYuduM24zZhiDYsdmI2LIg2K/ZhNiu2YjYp9mHINiq2YjYs9i3INin2K/ZhduM2YYpIjoi4q2QIEN1c3RvbSAoQWRtaW4tZGVmaW5lZCBkYXlzKSIsItiq2LnYr9in2K8g2LHZiNiy2YfYp9uMINin2LnYqtio2KfYsSI6IkR1cmF0aW9uIChEYXlzKSIsIvCfjp/vuI8g2KrZiNmE24zYryDaqdiv2YfYp9uMINmE2KfbjNiz2YbYsyDYrNiv24zYryDZiCDYp9i22KfZgdmHINio2Ycg2KfZhtio2KfYsSI6IvCfjp/vuI8gR2VuZXJhdGUgJiBBZGQgTGljZW5zZSBLZXlzIHRvIEludmVudG9yeSIsIvCfk4sg2KfZhtio2KfYsSDaqdiv2YfYp9uMINmE2KfbjNiz2YbYsyDZhdmI2KzZiNivICjaqdm+24wg2YXYs9iq2YLbjNmFINis2YfYqiDYp9ix2LPYp9mEINio2Ycg2YXYtNiq2LHbjCkiOiLwn5OLIEFjdGl2ZSBMaWNlbnNlIEludmVudG9yeSAoQ2xpY2sgdG8gY29weSBmb3IgY2xpZW50cykiLCLwn5SEINix2YHYsdi0Ijoi8J+UhCBSZWZyZXNoIiwi2qnYryDZhNin24zYs9mG2LMiOiJMaWNlbnNlIEtleSIsItm+2YTZhiDZiCDYsdmI2LLZh9inIjoiUGxhbiAmIFZhbGlkaXR5Iiwi2YjYtti524zYqiI6IlN0YXR1cyIsIti52YXZhNuM2KfYqiI6IkFjdGlvbnMiLCLYr9ix2K3Yp9mEINio2KfYsdqv2LDYp9ix24wg2qnYr9mH2KcuLi4iOiJMb2FkaW5nIGxpY2Vuc2VzLi4uIiwi8J+RpSDZhdin2YbbjNiq2YjYsduM2YbaryDYstmG2K/ZhyDaqdin2LHYqNix2KfZhtiMINix2KjYp9iq4oCM2YfYp9uMINqp2YXaqduMINmIINin2YXZhtuM2Kog27JGQSI6IvCfkaUgTGl2ZSBVc2VyIE1vbml0b3JpbmcsIEhlbHBlciBCb3RzICYgMkZBIFNlY3VyaXR5Iiwi8J+UhCDYsdmB2LHYtCDYs9ix24zYuSI6IvCflIQgUXVpY2sgUmVmcmVzaCIsIvCfpJYg2K/Yp9ix2KfbjCDYsdio2KfYqiDaqdmF2qnbjCI6IvCfpJYgSGFzIEhlbHBlciBCb3QiLCLwn5SQINiq2KfbjNuM2K8g27JGQSDZgdi52KfZhCI6IvCflJAgMkZBIEVuYWJsZWQiLCLwn5OxINiz2YTZgeKAjNio2KfYqiDZgdi52KfZhCI6IvCfk7EgU2VsZmJvdCBBY3RpdmUiLCLwn4yQINmH2YXZhyDaqdin2LHYqNix2KfZhiI6IvCfjJAgQWxsIFVzZXJzIiwi8J+kliDYr9in2LHYp9uMINix2KjYp9iqINqp2YXaqduMINin2K7Yqti12KfYtduMIjoi8J+kliBIYXMgRGVkaWNhdGVkIEJvdCIsIuKaqiDZgdin2YLYryDYsdio2KfYqiDaqdmF2qnbjCI6IuKaqiBObyBIZWxwZXIgQm90Iiwi8J+UkyDYqtin24zbjNivINuyRkEg2K7Yp9mF2YjYtCI6IvCflJMgMkZBIERpc2FibGVkIiwi8J+foiDYs9mE2YHigIzYqNin2Kog2YXYqti12YQg2Ygg2YHYudin2YQiOiLwn5+iIFNlbGZib3QgQ29ubmVjdGVkICYgQWN0aXZlIiwi4o+477iPINmF2LnZhNmCINuM2Kcg2YXZhtmC2LbbjOKAjNi02K/ZhyI6IuKPuO+4jyBTdXNwZW5kZWQgb3IgRXhwaXJlZCIsIvCfm6HvuI8g2YXYr9uM2LHYp9mGINin2LHYtNivINiz24zYs9iq2YUiOiLwn5uh77iPIFN5c3RlbSBBZG1pbmlzdHJhdG9ycyIsIvCfm6HvuI8g2KfYsdiq2YLYpyDYqNmHINmF2K/bjNixIjoi8J+boe+4jyBQcm9tb3RlIHRvIEFkbWluIiwi8J+UhCDYqNix2YjYstix2LPYp9mG24wiOiLwn5SEIFVwZGF0ZSIsItmG2KfZhSDaqdin2LHYqNix24wiOiJVc2VybmFtZSIsItiv2LPYqtix2LPbjCI6IlJvbGUiLCLYsdio2KfYqiDaqdmF2qnbjCI6IkhlbHBlciBCb3QiLCLYp9mF2YbbjNiqINuyRkEiOiIyRkEgU2VjdXJpdHkiLCLYqtmE2q/Ysdin2YUiOiJUZWxlZ3JhbSIsItm+2YTZhiDZiCDYp9i52KrYqNin2LEiOiJQbGFuICYgRXhwaXJ5Iiwi2K/Ysdit2KfZhCDYqNin2LHar9iw2KfYsduMINqp2KfYsdio2LHYp9mGLi4uIjoiTG9hZGluZyB1c2Vycy4uLiIsIuKGqe+4jyDYqNin2LLar9i02Kog2KjZhyDYr9in2LTYqNmI2LHYryDaqdin2LHYqNix24wiOiLihqnvuI8gUmV0dXJuIHRvIFVzZXIgRGFzaGJvYXJkIiwi2YjYsdmI2K8g2KjZhyDYrdiz2KfYqCI6IlNpZ24gSW4iLCLYs9in2K7YqiDYrdiz2KfYqCAo2YbbjNin2LIg2KjZhyDZhNin24zYs9mG2LMpIjoiQ3JlYXRlIEFjY291bnQgKExpY2Vuc2UgUmVxdWlyZWQpIiwi2KvYqNiq4oCM2YbYp9mFINio2Kcg2YTYp9uM2LPZhtizIjoiUmVnaXN0ZXIgd2l0aCBMaWNlbnNlIiwi2YbYp9mFINqp2KfYsdio2LHbjCDYp9iu2KrYtdin2LXbjCI6IkFjY291bnQgVXNlcm5hbWUiLCLYsdmF2LIg2LnYqNmI2LEg2KfZhdmGIjoiU2VjdXJlIFBhc3N3b3JkIiwi2YjYsdmI2K8g2KjZhyDYr9in2LTYqNmI2LHYryBBcml6byBTZWxmIjoiU2lnbiBJbiB0byBBcml6byBTZWxmIERhc2hib2FyZCIsItmI2LHZiNivINio2Ycg2K/Yp9i02KjZiNix2K8iOiJTaWduIEluIHRvIERhc2hib2FyZCIsIvCfjp/vuI8g2qnYryDZhNin24zYs9mG2LMgLyDYsdiv24zZheKAjNqp2K8g2YHYudin2YTigIzYs9in2LLbjCI6IvCfjp/vuI8gTGljZW5zZSBLZXkgLyBBY3RpdmF0aW9uIENvZGUiLCLYp9mE2LLYp9mF24wg2KzZh9iqINiz2KfYrtiqINit2LPYp9ioIjoiUmVxdWlyZWQgZm9yIGFjY291bnQgcmVnaXN0cmF0aW9uIiwiKNio2LHYp9uMINir2KjYquKAjNmG2KfZhSDYp9mE2LLYp9mF24wg2KfYs9iqKSI6IihSZXF1aXJlZCBmb3IgcmVnaXN0cmF0aW9uKSIsIvCfkrMg2KfbjNmGINqp2K8g2LHYpyDYp9iyINmB2LHZiNi02YbYr9mHINiv2LHbjNin2YHYqiDaqdix2K/ZhyDZiCDYr9ixINin24zZhtis2Kcg2YjYp9ix2K8g2qnZhtuM2K8gKNio2LHYp9uMINmF2K/bjNixINin2YjZhCDYr9ixINiv24zYqtin2KjbjNizINiq2KfYstmH2Iwg2YbbjNin2LLbjCDYqNmHINmE2KfbjNiz2YbYsyDZhtuM2LPYqikuIjoiT2J0YWluIHRoaXMgbGljZW5zZSBrZXkgZnJvbSB0aGUgdmVuZG9yIChmaXJzdCBhZG1pbmlzdHJhdG9yIHJlcXVpcmVzIG5vIGxpY2Vuc2UpLiIsItqp2K8g2YTYp9uM2LPZhtizINiq2YjYs9i3INmF2K/bjNixINuM2Kcg2YHYsdmI2LTZhtiv2Ycg2KfYsdin2KbZhyDZhduM4oCM2LTZiNivICjaqdin2LHYqNixINin2YjZhCDYs9uM2LPYqtmFINmG24zYp9iy24wg2KjZhyDaqdivINmG2K/Yp9ix2K8pIjoiTGljZW5zZSBrZXkgcHJvdmlkZWQgYnkgdmVuZG9yIChmaXJzdCBhZG1pbiBuZWVkcyBubyBsaWNlbnNlKSIsItmG2KfZhSDaqdin2LHYqNix24wg2KzYr9uM2K8iOiJOZXcgVXNlcm5hbWUiLCLYsdmF2LIg2LnYqNmI2LEg2YLZiNuMIjoiU3Ryb25nIFBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINin2YXZhiAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJTZWN1cmUgUGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsItiq2qnYsdin2LEg2LHZhdiyINi52KjZiNixIjoiQ29uZmlybSBQYXNzd29yZCIsItir2KjYquKAjNmG2KfZhSDZiCDZgdi52KfZhOKAjNiz2KfYstuMINin2LTYqtix2KfaqSBBcml6byBTZWxmIjoiUmVnaXN0ZXIgJiBBY3RpdmF0ZSBBcml6byBTZWxmIFN1YnNjcmlwdGlvbiIsItir2KjYquKAjNmG2KfZhSDZiCDZgdi52KfZhOKAjNiz2KfYstuMINin2LTYqtix2KfaqSI6IlJlZ2lzdGVyICYgQWN0aXZhdGUgU3Vic2NyaXB0aW9uIiwi2K3Ys9in2Kgg2qnYp9ix2KjYsduMINmIINiz2YTZgeKAjNio2KfYqiDYtNmF2Kcg2K/YsSDYrdin2YTYqiDYqti52YTbjNmCINmC2LHYp9ixINiv2KfYsdivIChTdXNwZW5kZWQpIjoiWW91ciBBY2NvdW50IGFuZCBTZWxmYm90IEFyZSBDdXJyZW50bHkgU3VzcGVuZGVkIiwi2K3Ys9in2Kgg2qnYp9ix2KjYsduMINi02YXYpyDZhdi52YTZgiDYtNiv2Ycg2KfYs9iqIjoiWW91ciBBY2NvdW50IEhhcyBCZWVuIFN1c3BlbmRlZCIsItmF2K/YqiDYstmF2KfZhiDYp9i02KrYsdin2qkg2LTZhdinINio2Ycg2b7Yp9uM2KfZhiDYsdiz24zYr9mHINmIINi52YXZhNqp2LHYryDYs9mE2YHigIzYqNin2Kog2LHZiNuMINiq2YTar9ix2KfZhSDZhdiq2YjZgtmBINi02K/ZhyDYp9iz2KouINis2YfYqiDZgdi52KfZhOKAjNiz2KfYstuMINmF2KzYr9ivINmIINiu2LHZiNisINii2YbbjCDYp9iyINiq2LnZhNuM2YLYjCDaqdivINmE2KfbjNiz2YbYsyDYrNiv24zYryDYrtmI2K8g2LHYpyDZiNin2LHYryDaqdmG24zYrzoiOiJZb3VyIHN1YnNjcmlwdGlvbiBoYXMgZXhwaXJlZCBhbmQgVGVsZWdyYW0gc2VsZmJvdCBvcGVyYXRpb25zIGFyZSBwYXVzZWQuIEVudGVyIGEgdmFsaWQgcmVuZXdhbCBrZXkgdG8gcmVhY3RpdmF0ZToiLCLYr9iz2KrYsdiz24wg2LTZhdinINio2Ycg2LPZhNmB4oCM2KjYp9iqINmF2YjZgtiq2KfZiyDZhdiz2K/ZiNivINi02K/ZhyDYp9iz2KouINis2YfYqiDZgdi52KfZhOKAjNiz2KfYstuMINmF2KzYr9iv2Iwg2YTYp9uM2LPZhtizINiq2YXYr9uM2K8g2YXYudiq2KjYsSDZiNin2LHYryDaqdmG24zYrzoiOiJBY2Nlc3MgdG8geW91ciBzZWxmYm90IGlzIHRlbXBvcmFyaWx5IHJlc3RyaWN0ZWQuIEVudGVyIGEgcmVuZXdhbCBsaWNlbnNlIGtleSB0byByZWFjdGl2YXRlOiIsIvCfmoAg2K7YsdmI2Kwg2KfYsiDYqti52YTbjNmCINmIINi02KfYsdqYIjoi8J+agCBSZWFjdGl2YXRlICYgUmVuZXcgU3Vic2NyaXB0aW9uIiwi2KvYqNiqINmE2KfbjNiz2YbYsyDZiCDYsdmB2Lkg2KrYudmE24zZgiI6IkFwcGx5IExpY2Vuc2UgJiBSZWFjdGl2YXRlIiwi2LTYqNuM2YfigIzYs9in2LIg2LLZhtiv2Ycg2b7YsdmI2YHYp9uM2YQg2KrZhNqv2LHYp9mFIChMaXZlIFRlbGVncmFtIE1vY2t1cCkiOiJMaXZlIFRlbGVncmFtIFByb2ZpbGUgTW9ja3VwIiwi2b7bjNi04oCM2YbZhdin24zYtCDYstmG2K/ZhyDYr9ixINiq2YTar9ix2KfZhSI6IkxpdmUgVGVsZWdyYW0gUHJldmlldyIsItm+24zYtOKAjNmG2YXYp9uM2LQg2YTYrdi42YfigIzYp9uMIjoiTGl2ZSBQcmV2aWV3Iiwi2LPbjNmG2qkg2LLZhtiv2YciOiJMaXZlIFN5bmMiLCLaqdin2LHYqNixIEFyaXpvIjoiQXJpem8gVXNlciIsItqp2KfYsdio2LEg2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gVXNlciIsItuw27A627DbsCI6IjAwOjAwIiwi2KLZhtmE2KfbjNmGICjZhNit2LjZh+KAjNin24wg2KjZhyDZiNmC2Kog2KrZh9ix2KfZhikiOiJPbmxpbmUgKFRlaHJhbiBBdG9taWMgVGltZSkiLCLYotmG2YTYp9uM2YYiOiJvbmxpbmUiLCLYqNuM2Yjar9ix2KfZgduMINiy2YbYr9mHINiq2YTar9ix2KfZhSAoQmlvIC8gQWJvdXQpIjoiTGl2ZSBUZWxlZ3JhbSBCaW8gKEFib3V0KSIsItio24zZiNqv2LHYp9mB24wg2LLZhtiv2YciOiJMaXZlIEJpbyIsItiv2LEg2KfZhtiq2LjYp9ixINmB2LnYp9mE4oCM2LPYp9iy24wg2KjbjNmI2q/Ysdin2YHbjCDZh9mI2LTZhdmG2K8uLi4iOiJBd2FpdGluZyBMaXZlIEJpbyBhY3RpdmF0aW9uLi4uIiwi2K/YsSDYrdin2YQg2K/YsduM2KfZgdiqINmI2LbYuduM2Kog2KjbjNmILi4uIjoiU3luY2luZyBiaW8gc3RhdHVzLi4uIiwi2KrZgtmI24zZhSDYrtmI2LHYtNuM2K/bjCDZiCDYstmF2KfZhiDYp9iq2YXbjCDYqtmH2LHYp9mGIjoiQ2FsZW5kYXIgJiBBdG9taWMgVGVocmFuIENsb2NrIiwi2KrZgtmI24zZhSDYrNin2LHbjDoiOiJDdXJyZW50IENhbGVuZGFyOiIsItiv2LHYrdin2YQg2YXYrdin2LPYqNmHINiq2YLZiNuM2YUg2K7ZiNix2LTbjNiv24wuLi4iOiJDYWxjdWxhdGluZyBjYWxlbmRhci4uLiIsItmH2YXar9in2YXigIzYs9in2LLbjCDZhNit2LjZh+KAjNin24wg2KrZh9ix2KfZhiI6IlRlaHJhbiBSZWFsLVRpbWUgU3luYyIsIuKaoSDZhdmI2KrZiNixINmG2YjYs9in2YbigIzYs9in2LIg2KfYqNix24wg2Ygg2qnYsdmI2YbigIzYrNin2Kgg2YHYudin2YQiOiLimqEgRWRnZSBFbmdpbmUgJiBBdG9taWMgQ3JvbiBBY3RpdmUiLCLYp9i02KrYsdin2qk6INin2LPYqtin2YbYr9in2LHYryI6IlN1YnNjcmlwdGlvbjogU3RhbmRhcmQiLCLZgdmI2YbYqjog2KjZiNmE2K8g2YTZiNqp2LMiOiJGb250OiBMdXh1cnkgQm9sZCIsItio2K7YtCDbsjog2KfYqti12KfZhCDYrdiz2KfYqCDYqtmE2q/Ysdin2YUg2KjZhyBBcml6byBTZWxmIjoiUGFydCAyOiBDb25uZWN0IFRlbGVncmFtIEFjY291bnQgdG8gQXJpem8gU2VsZiIsItin2KrYtdin2YQg2LPYtNmGINin2qnYp9mG2Kog2KrZhNqv2LHYp9mFIjoiQ29ubmVjdCBUZWxlZ3JhbSBBY2NvdW50IFNlc3Npb24iLCLinJUg2KfZhti12LHYp9mBINmIINio2KfYstqv2LTYqiI6IuKclSBDYW5jZWwgJiBSZXR1cm4iLCLYp9mG2LXYsdin2YEg2Ygg2KjYp9iy2q/YtNiqIjoiQ2FuY2VsICYgUmV0dXJuIiwi2KfbjNiy2YjZhNmHINiv2LEgQ2xvdWRmbGFyZSBLViI6Iklzb2xhdGVkIGluIENsb3VkZmxhcmUgS1YiLCLYsdmF2LLZhtqv2KfYsduMINmG2LjYp9mF24wgS1YiOiJNaWxpdGFyeSBHcmFkZSBLViBFbmNyeXB0aW9uIiwi2KfYsdiz2KfZhCDaqdivINm+24zYp9mF2qnbjCI6IlNNUyAvIFRlbGVncmFtIENvZGUiLCLZiNix2YjYryDZhdiz2KrZgtuM2YUg2KjYpyDYtNmF2KfYsdmHINiq2YTZgdmGIjoiRGlyZWN0IFBob25lIExvZ2luIiwi2LHYtNiq2YcgU3RyaW5nU2Vzc2lvbiDZhdiz2KrZgtuM2YUiOiJEaXJlY3QgU3RyaW5nU2Vzc2lvbiIsItmI2LHZiNivINio2KcgU3RyaW5nU2Vzc2lvbiDZvtuM2LTigIzYs9in2K7YqtmHIjoiU3RyaW5nU2Vzc2lvbiBMb2dpbiIsIti02YXYp9ix2Ycg2KrZhNmB2YYg2Kfaqdin2YbYqiDYqtmE2q/Ysdin2YUiOiJUZWxlZ3JhbSBBY2NvdW50IFBob25lIE51bWJlciIsIti02YXYp9ix2Ycg2KrZhNmB2YYg2KjYpyDZvtuM2LTigIzYtNmF2KfYsdmHINio24zZhuKAjNin2YTZhdmE2YTbjCI6IlBob25lIE51bWJlciAoSW50ZXJuYXRpb25hbCBmb3JtYXQpIiwi2qnYryDbtSDYsdmC2YXbjCDYp9ix2LPYp9mE24wg2KfYsiDYs9mI24wg2KrZhNqv2LHYp9mFIjoiNS1EaWdpdCBUZWxlZ3JhbSBWZXJpZmljYXRpb24gQ29kZSIsItqp2K8g2KrYp9uM24zYryDZvtuM2KfZhdqpL9iq2YTar9ix2KfZhSI6IlZlcmlmaWNhdGlvbiBDb2RlIChUZWxlZ3JhbS9TTVMpIiwi2LHZhdiyINiq2KPbjNuM2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfbjCDYp9qp2KfZhtiqICgyRkEpIjoiQWNjb3VudCBUd28tU3RlcCBWZXJpZmljYXRpb24gKDJGQSkiLCLYsdmF2LIg2LnYqNmI2LEg2K/ZiNmF2LHYrdmE2YfigIzYp9uMINiq2YTar9ix2KfZhSAo27JGQSkiOiJUd28tU3RlcCBWZXJpZmljYXRpb24gKDJGQSkgUGFzc3dvcmQiLCLYr9ix24zYp9mB2Kog2qnYryDZiNix2YjYryDYp9iyINiz2LHZiNixINiq2YTar9ix2KfZhSI6IlJlcXVlc3QgVGVsZWdyYW0gTG9naW4gQ29kZSIsItiv2LHYrtmI2KfYs9iqINmIINin2LHYs9in2YQg2qnYryDZiNix2YjYryDYqtmE2q/Ysdin2YUiOiJSZXF1ZXN0IFRlbGVncmFtIExvZ2luIENvZGUiLCLYsdi02KrZhyDYs9i02YYg2K7Yp9mFINiq2YTar9ix2KfZhSAoU3RyaW5nU2Vzc2lvbikiOiJSYXcgVGVsZWdyYW0gU3RyaW5nU2Vzc2lvbiIsItix2LTYqtmHINmF2KrZhtuMINiz2LTZhiDYqtmE2q/Ysdin2YUgKFRlbGV0aG9uIC8gR3JhbUpTIC8gUHlyb2dyYW0pIjoiVGVsZWdyYW0gU3RyaW5nU2Vzc2lvbiAoVGVsZXRob24gLyBHcmFtSlMgLyBQeXJvZ3JhbSkiLCLYp9iq2LXYp9mEINmIINix2YXYstmG2q/Yp9ix24wg2YHZiNix24wg2KjYpyBBRVMtMjU2IjoiQ29ubmVjdCAmIEVuY3J5cHQgd2l0aCBBRVMtMjU2Iiwi2LDYrtuM2LHZhyDZiCDYp9i52KrYqNin2LHYs9mG2KzbjCDYs9i02YYiOiJWYWxpZGF0ZSAmIFNhdmUgU2Vzc2lvbiIsItin2LPYqtmI2K/bjNmI24wg2LTYrti124zigIzYs9in2LLbjCDZiCDYp9mF2qnYp9mG2KfYqiDZvtuM2LTYsdmB2KrZhyI6IkN1c3RvbWl6YXRpb24gU3R1ZGlvICYgQWR2YW5jZWQgRmVhdHVyZXMiLCLYp9iz2KrZiNiv24zZiNuMINis2KfZhdi5INi02K7YtduM4oCM2LPYp9iy24wiOiJDb21wcmVoZW5zaXZlIFN0dWRpbyIsIuKaoO+4jyDZiNi22LnbjNiqINin2LHYqtio2KfYtyDYqNinINiq2YTar9ix2KfZhToiOiLimqDvuI8gVGVsZWdyYW0gQ29ubmVjdGlvbiBTdGF0dXM6Iiwi8J+UhCDYp9iq2LXYp9mEINmF2KzYr9ivINin2qnYp9mG2Kog2KrZhNqv2LHYp9mFIjoi8J+UhCBSZWNvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCIsItiz2KfYudiqINmIINin2LPYqtin24zZhCI6IkNsb2NrICYgU3R5bGUiLCLZhdmG2LTbjCDYrtmI2K/aqdin2LEiOiJBdXRvLVNlY3JldGFyeSIsItmB24zZhNiq2LEg2LPaqdmI2KoiOiJTaWxlbmNlIEZpbHRlciIsItit2KfZhNiqINiu2YjYp9ioIjoiU2xlZXAgU2NoZWR1bGUiLCLYsdio2KfYqiDZiCDZhNin2q/YsSI6IkJvdCAmIExvZ2dlciIsItit2KfZhNiqINi02KjYrSI6Ikdob3N0IE1vZGUiLCLZvtin2LPYriBBSSI6IlNtYXJ0IEFJIFJlcGx5Iiwi2b7Yp9iz2K4g2YfZiNi02YXZhtivIEFJIjoiU21hcnQgQUkgUmVwbHkiLCLYp9mF2YbbjNiqINmIINuyRkEiOiJTZWN1cml0eSAmIDJGQSIsItin2YbYqtiu2KfYqCDaqdin2LHYp9qp2KrYsSDYrNiv2KfaqdmG2YbYr9mHINiz2KfYudiqINmIINiv2YLbjNmC2YciOiJDaG9vc2UgSG91ciAmIE1pbnV0ZSBDb2xvbiBTZXBhcmF0b3IiLCLZvtuM2LTZiNmG2K8g2LPYp9i52KogKNmC2KjZhCDYp9iyINiz2KfYudiqKSI6IkNsb2NrIFByZWZpeCAoQmVmb3JlIGRpZ2l0cykiLCLZvtiz2YjZhtivINiz2KfYudiqICjYqNi52K8g2KfYsiDYs9in2LnYqikiOiJDbG9jayBTdWZmaXggKEFmdGVyIGRpZ2l0cykiLCLYrdin2YTYqiDbsduyINiz2KfYudiq2YcgKEFNIC8gUE0g2YTZiNqp2LMpIjoiMTItSG91ciBGb3JtYXQgKERlbHV4ZSBBTS9QTSkiLCLZhtmF2KfbjNi0INiz2KfYudiqINio2YfigIzYtdmI2LHYqiDbsduyINiz2KfYudiq2Ycg2YfZhdix2KfZhyDYqNinINmG2LTYp9mG2q/YsSDZgdin2YbYqtiy24wg4bSs4bS5IC8g4bS+4bS5IjoiRGlzcGxheSBpbiAxMi1ob3VyIGZvcm1hdCB3aXRoIGRlbHV4ZSDhtKzhtLkgLyDhtL7htLkgaW5kaWNhdG9yIiwi2KfYsdmC2KfZhSDYr9mE2K7ZiNin2Ycg2K/Ys9iq24wgKNux27Ag2qnYp9ix2Kfaqdiq2LEg27Ag2KrYpyDbuSkiOiJDdXN0b20gRGlnaXRzICgxMCBjaGFyYWN0ZXJzIDAgdG8gOSkiLCLYrNiv2KfaqdmG2YbYr9mHIjoiU2VwYXJhdG9yIiwi2YHYudin2YTigIzYs9in2LLbjCDYqNuM2Yjar9ix2KfZgduMINiy2YbYr9mHINmIINmH2YjYtNmF2YbYryAoTGl2ZSBCaW8pIjoiRW5hYmxlIER5bmFtaWMgTGl2ZSBCaW8iLCLYqNmH4oCM2LHZiNiy2LHYs9in2YbbjCDYrtmI2K/aqdin2LEg2KjbjNmIINiq2YTar9ix2KfZhSDYqNinINiz2KfYudiq2Iwg2KrZgtmI24zZhSDZiCDZhdiq2YjZhiDZvtmI24zYpyI6IkF1dG8tdXBkYXRlIFRlbGVncmFtIGJpbyB3aXRoIHRpbWUsIGNhbGVuZGFyIGFuZCB2YXJpYWJsZXMiLCLZgtin2YTYqCDZhdiq2YYg2KjbjNmI2q/Ysdin2YHbjCDYqtmE2q/Ysdin2YUgKNit2K/Yp9qp2KvYsSDbt9uwINqp2KfYsdin2qnYqtixKSI6IlRlbGVncmFtIEJpbyBUZW1wbGF0ZSAoTWF4IDcwIGNoYXJzKSIsItin2YHYstmI2K/ZhiDZhdiq2LrbjNixINio2Kcg2qnZhNuM2qk6IjoiQ2xpY2sgdG8gYWRkIHZhcmlhYmxlOiIsIuKPsCB7dGltZX0gKNiz2KfYudiqKSI6IuKPsCB7dGltZX0gKFRpbWUpIiwi8J+Xk++4jyB7ZGF0ZX0gKNiq2KfYsduM2K4pIjoi8J+Xk++4jyB7ZGF0ZX0gKERhdGUpIiwi4piA77iPIHtkYXl9ICjYsdmI2LIg2YfZgdiq2YcpIjoi4piA77iPIHtkYXl9IChXZWVrZGF5KSIsIvCflIsge2JhdHRlcnl9ICjYqNin2KrYsduMINiy2YXYp9mGKSI6IvCflIsge2JhdHRlcnl9IChUaW1lIEJhdHRlcnkpIiwi4pmIIHt6b2RpYWN9ICjYqNix2Kwg2YHZhNqp24wpIjoi4pmIIHt6b2RpYWN9IChab2RpYWMpIiwi8J+MuCB7c2Vhc29ufSAo2YHYtdmEKSI6IvCfjLgge3NlYXNvbn0gKFNlYXNvbikiLCLwn46tIHttb29kfSAo2YXZiNivINiy2YXYp9mGKSI6IvCfjq0ge21vb2R9IChUaW1lIE1vb2QpIiwi8J+OiSB7b2NjYXNpb259ICjZhdmG2KfYs9io2KopIjoi8J+OiSB7b2NjYXNpb259IChPY2Nhc2lvbikiLCLwn5KsIHtxdW90ZX0gKNis2YXZhNmHINin2Ybar9uM2LLYtNuMKSI6IvCfkqwge3F1b3RlfSAoUXVvdGUpIiwi8J+MkCB7ZW5fZGF5fSAo2LHZiNiyINin2Ybar9mE24zYs9uMKSI6IvCfjJAge2VuX2RheX0gKEVuZ2xpc2ggRGF5KSIsIvCfkqEg2YLYp9mE2KjigIzZh9in24wg2YXYrdio2YjYqCDZiCDYotmF2KfYr9mHOiI6IvCfkqEgUG9wdWxhciBQcmUtTWFkZSBUZW1wbGF0ZXM6Iiwi2YXZhti024wg2K7ZiNiv2qnYp9ixINm+24zZiNuMIChBRksgQXV0by1TZWNyZXRhcnkpIjoiQUZLIFByaXZhdGUgQXV0by1TZWNyZXRhcnkiLCLZh9mG2q/Yp9mF24wg2qnZhyDYotmG2YTYp9uM2YYg2YbbjNiz2KrbjNiv2Iwg2b7bjNin2YXigIzZh9in24wg2K7YtdmI2LXbjCDYqNmHINi32YjYsSDZh9mI2LTZhdmG2K8g2Ygg2K7ZiNiv2qnYp9ixINm+2KfYs9iuINiv2KfYr9mHINmF24zigIzYtNmI2YbYryI6IldoZW4geW91IGFyZSBhd2F5LCBwcml2YXRlIG1lc3NhZ2VzIGFyZSBhbnN3ZXJlZCBpbnRlbGxpZ2VudGx5Iiwi2YXYqtmGINm+2KfYs9iuINiu2YjYr9qp2KfYsSDZhdmG2LTbjCDYqNmHINmF2K7Yp9i32KjYp9mGINiv2LEg2b7bjNmI24wiOiJBdXRvLVNlY3JldGFyeSBSZXBseSBNZXNzYWdlIiwi2YHYp9i12YTZhyDYstmF2KfZhtuMINin2LHYs9in2YQg2YXYrNiv2K8g2KjYsdin24wg24zaqSDZhdiu2KfYt9ioICjaqdmI2YTigIzYr9in2YjZhiDYttivINin2LPZvtmFKSI6IkNvb2xkb3duIEludGVydmFsIHBlciBDb250YWN0Iiwi2YfYsSDbtSDYr9mC24zZgtmHINuM2qnigIzYqNin2LEg2KjZhyDZh9ixINmB2LHYryI6IkV2ZXJ5IDUgbWludXRlcyBwZXIgY29udGFjdCIsItmH2LEg27HbsCDYr9mC24zZgtmHINuM2qnigIzYqNin2LEg2KjZhyDZh9ixINmB2LHYryAo2b7bjNi02YbZh9in2K/bjCkiOiJFdmVyeSAxMCBtaW51dGVzIHBlciBjb250YWN0IChSZWNvbW1lbmRlZCkiLCLZh9ixINuz27Ag2K/ZgtuM2YLZhyDbjNqp4oCM2KjYp9ixINio2Ycg2YfYsSDZgdix2K8iOiJFdmVyeSAzMCBtaW51dGVzIHBlciBjb250YWN0Iiwi2YfYsSDbsSDYs9in2LnYqiDbjNqp4oCM2KjYp9ixINio2Ycg2YfYsSDZgdix2K8iOiJFdmVyeSAxIGhvdXIgcGVyIGNvbnRhY3QiLCLZgdmC2Lcg24zaqeKAjNio2KfYsSDYr9ixINi32YjZhCDYtNio2KfZhtmH4oCM2LHZiNiyINio2Ycg2YfYsSDZgdix2K8iOiJPbmNlIHBlciAyNCBob3VycyBwZXIgY29udGFjdCIsIvCfkqEg2KfbjNmGINmC2KfYqNmE24zYqiDZhdin2YbYuSDYp9iyINin2LPZvtmFINi02K/ZhiDahtiqINmH2Ybar9in2YXbjCDaqdmHINmF2K7Yp9i32Kgg2obZhtiv24zZhiDZvtuM2KfZhSDZhdiq2YjYp9mE24wg2YXbjOKAjNmB2LHYs9iq2K8g2YXbjOKAjNi02YjYry4iOiLwn5KhIFRoaXMgcHJldmVudHMgY2hhdCBzcGFtIHdoZW4gYSBjb250YWN0IHNlbmRzIG11bHRpcGxlIGNvbnNlY3V0aXZlIG1lc3NhZ2VzLiIsItiz2qnZiNiqINmIINit2LDZgSDYotmG24wg2b7bjNin2YXigIzZh9in24wg2KfZgdix2KfYryDZhdiy2KfYrdmFIChNdXRlIEZpbHRlcikiOiJNdXRlICYgSW5zdGFudCBQdXJnZSBGaWx0ZXIiLCLZvtuM2KfZheKAjNmH2KfbjCDYp9ix2LPYp9mE4oCM2LTYr9mHINiq2YjYs9i3INqp2KfYsdio2LHYp9mGINmF2LTYrti14oCM2LTYr9mHINio2YTYp9mB2KfYtdmE2Ycg2KjYsdin24wg2K/ZiCDYt9ix2YEg2b7Yp9qpINmF24zigIzYtNmI2YbYryI6Ik1lc3NhZ2VzIGZyb20gc3BlY2lmaWVkIHVzZXJzIGFyZSBpbW1lZGlhdGVseSBkZWxldGVkIGZvciBib3RoIHNpZGVzIiwi2YTbjNiz2Kog2KLbjNiv24zigIzZh9in24wg2LnYr9iv24wg24zYpyDbjNmI2LLYsdmG24zZheKAjNmH2KfbjCDYqtmE2q/Ysdin2YUg2KzZh9iqINiz2qnZiNiqICjYqNinINqp2KfZhdinINis2K/YpyDaqdmG24zYrykiOiJUZWxlZ3JhbSBJRHMgb3IgVXNlcm5hbWVzIHRvIE11dGUgKGNvbW1hIHNlcGFyYXRlZCkiLCLwn5KhINi02YXYpyDZh9mF2obZhtuM2YYg2K/YsSDZhdit24zYtyDYqtmE2q/Ysdin2YUg2YXbjOKAjNiq2YjYp9mG24zYryDYqNinINix24zZvtmE2KfbjCDYsdmI24wg2b7bjNin2YUg2YfYsSDYtNiu2LUg2Ygg2KfYsdiz2KfZhCI6IvCfkqEgSW4gVGVsZWdyYW0geW91IGNhbiBhbHNvIHJlcGx5IHRvIGEgbWVzc2FnZSBhbmQgc2VuZCIsItin2Ygg2LHYpyDYp9i22KfZgdmHINqp2LHYr9mHINmIINio2KciOiJ0byBtdXRlIHRoZW0sIGFuZCB1c2UiLCLYp9iyINiz2qnZiNiqINiu2KfYsdisINqp2YbbjNivLiI6InRvIHVubXV0ZS4iLCLYrdin2YTYqiDYrtmI2KfYqCDZiCDYp9iz2KrYsdin2K3YqiDYtNio2KfZhtmHIChTbGVlcCBNb2RlKSI6Ik5pZ2h0IFNsZWVwIFNjaGVkdWxlIiwi2K/YsSDYs9in2LnYp9iqINmF2LTYrti14oCM2LTYr9mH2Iwg2KjZh+KAjNix2YjYstix2LPYp9mG24wg2YXYqtmI2YLZgSDYtNiv2Ycg24zYpyDZhdiq2YYg2K7ZiNin2Kgg2YLYsdin2LEg2YXbjOKAjNqv24zYsdivIjoiRHVyaW5nIHNwZWNpZmllZCBob3VycywgdXBkYXRlcyBwYXVzZSBvciBzbGVlcCBzdGF0dXMgaXMgZGlzcGxheWVkIiwi2LTYsdmI2Lkg2K7ZiNin2KggKNiz2KfYudiqKSI6IlNsZWVwIFN0YXJ0IEhvdXIiLCLbstuyOtuw27AgKNux27Ag2LTYqCkiOiIyMjowMCAoMTAgUE0pIiwi27LbszrbsNuwICjbsduxINi02KgpIjoiMjM6MDAgKDExIFBNKSIsItuw27A627DbsCAo2YbbjNmF2YfigIzYtNioKSI6IjAwOjAwIChNaWRuaWdodCkiLCLbsNuxOtuw27AgKNio2KfZhdiv2KfYrykiOiIwMTowMCAoMSBBTSkiLCLbsNuyOtuw27AgKNio2KfZhdiv2KfYrykiOiIwMjowMCAoMiBBTSkiLCLZvtin24zYp9mGINiu2YjYp9ioICjYs9in2LnYqikiOiJTbGVlcCBXYWtldXAgSG91ciIsItuw27Y627DbsCAo2LXYqNitKSI6IjA2OjAwICg2IEFNKSIsItuw27c627DbsCAo2LXYqNitKSI6IjA3OjAwICg3IEFNKSIsItuw27g627DbsCAo2LXYqNitKSI6IjA4OjAwICg4IEFNKSIsItuw27k627DbsCAo2LXYqNitKSI6IjA5OjAwICg5IEFNKSIsItux27A627DbsCAo2LXYqNitKSI6IjEwOjAwICgxMCBBTSkiLCLZhdiq2YYg2YbYp9mFINiu2KfZhtmI2KfYr9qv24wg2K/YsSDYt9mI2YQg2LPYp9i52KfYqiDYrtmI2KfYqCI6Ikxhc3QgTmFtZSBUZXh0IER1cmluZyBTbGVlcCBIb3VycyIsItit2KfZhNiqINi02KjYrSDigJQg2K7ZiNin2YbYr9mGINio2K/ZiNmGINiq24zaqSDYotio24wgKEdob3N0IFJlYWQpIjoiR2hvc3QgTW9kZSDigJQgU3RlYWx0aCBSZWFkIiwi2YjZgtiq24wg2KfbjNmGINmC2KfYqNmE24zYqiDZgdi52KfZhCDYqNin2LTZh9iMINiq2YXYp9mFINm+24zYp9mF4oCM2YfYp9uMINiu2LXZiNi124wg2KzYr9uM2K8g2KjZhyDYtdmI2LHYqiDYrtmI2K/aqdin2LEg2KjZhyI6IldoZW4gZW5hYmxlZCwgaW5jb21pbmcgcHJpdmF0ZSBtZXNzYWdlcyBhdXRvbWF0aWNhbGx5IGZvcndhcmQgdG8geW91ciIsItix2KjYp9iqINin2K7Yqti12KfYtduMIjoiZGVkaWNhdGVkIGJvdCIsIti02YXYpyDZgdmI2LHZiNin2LHYryDZhduM4oCM2LTZhiDZiCDZhduM4oCM2KrZiNmG24zYryDYp9mI2YbYrNinINio2K7ZiNmG24zYr9i02YjZhiDYqNiv2YjZhiDYp9uM2YbaqdmHINiq24zaqSDYotio24wg2KjYrtmI2LHZhy4g2YjZgtiq24wg2KLZhdin2K/ZhyDYqNmI2K/bjNiv2Iwg2KjYpyDYr9iz2KrZiNixIjoid2hlcmUgeW91IGNhbiByZWFkIHRoZW0gd2l0aG91dCBibHVlIHRpY2tzLiBXaGVuIHJlYWR5LCB1c2UiLCLYr9ixINiq2YTar9ix2KfZhSDZhduM4oCM2KrZiNmG24zYryDYqtuM2qkg2KLYqNuMINix2Ygg2K/Ys9iq24wg2KjYstmG24zYry4iOiJpbiBUZWxlZ3JhbSB0byBtYW51YWxseSBzZW5kIHJlYWQgcmVjZWlwdHMuIiwi2YHYudin2YTigIzYs9in2LLbjCDYrdin2YTYqiDYtNio2K0gKEdob3N0IE1vZGUpIjoiRW5hYmxlIEdob3N0IE1vZGUiLCLZvtuM2KfZheKAjNmH2KfbjCDYrti12YjYtduMINix2Ygg2KjYrtmI2YbbjNivINio2K/ZiNmGINiq24zaqSDYotio24wg4oCUINmB2YjYsdmI2KfYsdivINiu2YjYr9qp2KfYsSDYqNmHINix2KjYp9iqIjoiUmVhZCBwcml2YXRlIG1lc3NhZ2VzIHNpbGVudGx5IHdpdGhvdXQgYmx1ZSBjaGVja21hcmtzIiwi2K/Ys9iq2YjYsdin2Kog2LPYsduM2Lkg2KrZhNqv2LHYp9mF24w6IjoiVGVsZWdyYW0gSW4tQ2hhdCBTaG9ydGN1dHM6Iiwi4oCUINiq24zaqSDYotio24wg2LHZiCDYqNix2KfbjCDahtiq24wg2qnZhyDYqtmI2LQg2YfYs9iq24zYryDYqNiy2YbbjNivIjoi4oCUIE1hcmsgY3VycmVudCBjaGF0IGFzIHJlYWQiLCLigJQg2KrbjNqpINii2KjbjCDYsdmIINio2LHYp9uMINmH2YXZhyDahtiq4oCM2YfYpyDbjNqp2KzYpyDYqNiy2YbbjNivIjoi4oCUIE1hcmsgYWxsIHVucmVhZCBjaGF0cyBhcyByZWFkIiwi4oCUINmB2LnYp9mE4oCM2LPYp9iy24wg2LPYsduM2Lkg2K3Yp9mE2Kog2LTYqNitIjoi4oCUIFF1aWNrIGFjdGl2YXRlIEdob3N0IE1vZGUiLCLigJQg2LrbjNix2YHYudin2YQg2qnYsdiv2YYg2K3Yp9mE2Kog2LTYqNitIjoi4oCUIFF1aWNrIGRlYWN0aXZhdGUgR2hvc3QgTW9kZSIsItmE24zYs9iqINin2LPYqtir2YbYpyDigJQg2KfZgdix2KfYr9uMINqp2Ycg2YfZhduM2LTZhyDYqtuM2qkg2KLYqNuMINio2K7ZiNix2YcgKNin2K7YqtuM2KfYsduMKSI6IldoaXRlbGlzdCDigJQgQ29udGFjdHMgd2hvIGFsd2F5cyByZWNlaXZlIHJlYWQgcmVjZWlwdHMgKE9wdGlvbmFsKSIsIvCfkqEg2KjYsdin24wg2KfbjNmGINin2YHYsdin2K/YjCDYqtuM2qkg2KLYqNuMINio2Ycg2LXZiNix2Kog2LnYp9iv24wg2qnYp9ixINmF24zigIzaqdmG2Ycg2Ygg2K3Yp9mE2Kog2LTYqNitINix2YjbjCDYp9mI2YbYpyDYp9i52YXYp9mEINmG2YXbjOKAjNi02YcuIjoi8J+SoSBGb3IgdGhlc2UgY29udGFjdHMsIHJlYWQgcmVjZWlwdHMgd29yayBub3JtYWxseSBhbmQgR2hvc3QgTW9kZSBpcyBieXBhc3NlZC4iLCLZhtqp2KrZhyDZhdmH2YU6IjoiSW1wb3J0YW50IE5vdGljZToiLCLYrdin2YTYqiDYtNio2K0g2YHZgti3INiy2YXYp9mG24wg2qnYp9ixINmF24zigIzaqdmG2Ycg2qnZhyDZvtuM2KfZheKAjNmH2Kcg2LHZiCDYp9iyINi32LHbjNmCIjoiR2hvc3QgTW9kZSBvbmx5IHN1cHByZXNzZXMgcmVhZCByZWNlaXB0cyB3aGVuIHJlYWRpbmcgdmlhIHRoZSIsItix2KjYp9iqIjoiYm90Iiwi2KjYrtmI2YbbjNivLiDYp9qv2LEg2obYqiDYsdmIINmF2LPYqtmC24zZhSDYqtmI24wg2KfZvtmE24zaqduM2LTZhiDYqtmE2q/Ysdin2YUg2KjYp9iyINqp2YbbjNiv2Iwg2KrbjNqpINii2KjbjCDYp9iyINi32LHZgSDYp9m+2YTbjNqp24zYtNmGINin2LHYs9in2YQg2YXbjOKAjNi02YcuIjoiLiBJZiB5b3Ugb3BlbiB0aGUgY2hhdCBkaXJlY3RseSBpbiBUZWxlZ3JhbSBhcHAsIHJlYWQgcmVjZWlwdHMgd2lsbCBiZSBzZW50LiIsItm+2KfYs9iuINmH2YjYtNmF2YbYryDZhdio2KrZhtuMINio2LEg2YfZiNi0INmF2LXZhtmI2LnbjCAoQUkgU21hcnQgUmVwbHkpIjoiQUkgU21hcnQgUmVwbHkgQXNzaXN0YW50Iiwi2KjZhyDYrNin24wg24zaqSDZvtuM2KfZhSDYq9in2KjYqiBBRkvYjCDZh9mI2LQg2YXYtdmG2YjYuduMIjoiSW5zdGVhZCBvZiBhIHN0YXRpYyBBRksgbm90ZSwgQUkgcmVwbGllcyBpbnRlbGxpZ2VudGx5Iiwi2YXYqtmG2KfYs9ioINio2Kcg2YXYrdiq2YjYp9uMINm+24zYp9mFIjoiYmFzZWQgb24gY29udGV4dCIsItio2Ycg2YXYrtin2LfYqNuM2YYg2b7Yp9iz2K4g2YXbjOKAjNiv2YfYry4g2YfYsSDaqdin2LHYqNixIEFQSSBLZXkg2K7ZiNiv2LQg2LHZiCDZiNin2LHYryDZhduM4oCM2qnZhtmHINmIINmH2LLbjNmG2YfigIzYp9uMINio2LHYp9uMINiz2LHZiNixINmG2K/Yp9ix2YcuIjoidG8gaW5jb21pbmcgY2hhdHMuIEVhY2ggdXNlciBicmluZ3MgdGhlaXIgb3duIEFQSSBrZXkgd2l0aCB6ZXJvIGhvc3QgY29zdC4iLCLZgdi52KfZhOKAjNiz2KfYstuMINm+2KfYs9iuINmH2YjYtNmF2YbYryBBSSAo2KzYp9uM2q/YstuM2YYgQUZLINir2KfYqNiqKSI6IkVuYWJsZSBBSSBTbWFydCBSZXBseSAoUmVwbGFjZXMgc3RhdGljIEFGSykiLCLZiNmC2KrbjCDZgdi52KfZhCDYqNin2LTZh9iMIEFJINio2Ycg2KzYp9uMINm+24zYp9mFINir2KfYqNiqINmF2YbYtNuM2Iwg2YfZiNi02YXZhtiv2KfZhtmHINm+2KfYs9iuINmF24zigIzYr9mH2K8iOiJXaGVuIGVuYWJsZWQsIEFJIHJlcGxpZXMgZHluYW1pY2FsbHkgaW5zdGVhZCBvZiBhIHN0YXRpYyBtZXNzYWdlIiwi2b7Yp9uM2LQg2YfZiNi02YXZhtivINmI2LbYuduM2Kog2KLZhtmE2KfbjNmGOiI6IlNtYXJ0IE9ubGluZSBQcmVzZW5jZSBNb25pdG9yOiIsItmH2YjYtCDZhdi12YbZiNi524wg2KrZhtmH2Kcg2K/YsSDYstmF2KfZhiI6IkFJIHJlcGxpZXMgZXhjbHVzaXZlbHkgd2hlbiB5b3UgYXJlIiwi2KLZgdmE2KfbjNmGINio2YjYr9mGIjoib2ZmbGluZSIsItio2Ycg2b7bjNmI24zigIzZh9inINm+2KfYs9iuINmF24zigIzYr9mH2K8uINio2Ycg2YXYrdi2INin24zZhtqp2Ycg2KLZhtmE2KfbjNmGINi02YjbjNiv2Iwg2b7bjNin2YXbjCDYqNiu2YjYp9mG24zYryDbjNinINiv2LEg2K3Yp9mEINqG2Kog2KjYpyDZhdiu2KfYt9io2KfZhiDYqNin2LTbjNiv2Iwg2YXZhti024wg2K7ZiNiv2qnYp9ixINmB2YjYsdin2Ysg2YXYqtmI2YLZgSDZhduM4oCM2LTZiNivLiI6Ii4gVGhlIG1vbWVudCB5b3UgY29tZSBvbmxpbmUgb3IgcmVhZCBhIG1lc3NhZ2UsIEFJIGF1dG8tcmVwbGllcyBpbW1lZGlhdGVseSBwYXVzZS4iLCLYs9ix2YjbjNiz4oCM2K/Zh9mG2K/ZhyDZh9mI2LQg2YXYtdmG2YjYuduMIChBSSBQcm92aWRlcikiOiJBSSBQcm92aWRlciIsIkdvb2dsZSBHZW1pbmkgKNix2KfbjNqv2KfZhiDigJQg2b7bjNi02YbZh9in2K/bjCkiOiJHb29nbGUgR2VtaW5pIChGcmVlIOKAlCBSZWNvbW1lbmRlZCkiLCJDdXN0b20gQVBJICjYs9ix2YjbjNizINiz2YHYp9ix2LTbjCkiOiJDdXN0b20gT3BlbkFJLWNvbXBhdGlibGUgQVBJIiwi2qnZhNuM2K8gQVBJINmH2YjYtCDZhdi12YbZiNi524wgKEFQSSBLZXkpIjoiQUkgQVBJIEtleSIsItit2LDZgSDaqdin2YXZhCDaqdmE24zYryBBUEkgKNix2YHYuSDYqtiv2KfYrtmEKSI6IkNsZWFyIEFQSSBLZXkgKFJlc2V0KSIsItin2LIiOiJGcm9tIiwi2KfbjNmG2KzYpyI6ImhlcmUiLCLYsdin24zar9in2YYg2K/YsduM2KfZgdiqINqp2YbbjNivIHwiOiJnZXQgYSBmcmVlIGtleSB8Iiwi2LTYrti124zYqiDZiCDYr9iz2KrZiNix2KfZhNi52YXZhCBBSSAoU3lzdGVtIFByb21wdCkiOiJBSSBTeXN0ZW0gUHJvbXB0ICYgSW5zdHJ1Y3Rpb25zIiwi8J+SoSDYrdiv2Kfaqdir2LEg27XbsNuwINqp2KfYsdin2qnYqtixLiDYp9uM2YYg2YXYqtmGINi02K7YtduM2KogQUkg2LHYpyDYqti524zbjNmGINmF24zigIzaqdmG2K8uIjoi8J+SoSBNYXggNTAwIGNoYXJhY3RlcnMuIERlZmluZXMgQUkgdG9uZSwgcGVyc29uYWxpdHkgYW5kIGNvbnN0cmFpbnRzLiIsItin2LfZhNin2LnYp9iqINm+2KfbjNmHINio2LHYp9uMIEFJICjYstmF24zZhtmHINmIINqp2KfZhtiq2qnYs9iqKSI6IkJhY2tncm91bmQgRmFjdHMgJiBDb250ZXh0IGZvciBBSSIsIvCfkqEgQUkg2KfYsiDYp9uM2YYg2KfYt9mE2KfYudin2Kog2KjYsdin24wg2b7Yp9iz2K4g2K/ZgtuM2YLigIzYqtixINin2LPYqtmB2KfYr9mHINmF24zigIzaqdmG2K8uIjoi8J+SoSBBSSByZWZlcmVuY2VzIHRoaXMgY29udGV4dCBmb3IgYWNjdXJhdGUgYW5zd2VycyAoZS5nLiBvZmZpY2UgaG91cnMpLiIsItit2K/Yp9qp2KvYsSDYqti52K/Yp9ivINm+2KfYs9iuINio2Ycg2YfYsSDYtNiu2LUiOiJNYXggUmVwbGllcyBwZXIgQ29udGFjdCIsItmB2YLYtyDbsSDZvtin2LPYriI6Ik9ubHkgMSByZXBseSIsItit2K/Yp9qp2KvYsSDbsiDZvtin2LPYriI6Ik1heCAyIHJlcGxpZXMiLCLYrdiv2Kfaqdir2LEg27Mg2b7Yp9iz2K4gKNm+24zYtNmG2YfYp9iv24wpIjoiTWF4IDMgcmVwbGllcyAoUmVjb21tZW5kZWQpIiwi2K3Yr9in2qnYq9ixINu1INm+2KfYs9iuIjoiTWF4IDUgcmVwbGllcyIsItit2K/Yp9qp2KvYsSDbsduwINm+2KfYs9iuIjoiTWF4IDEwIHJlcGxpZXMiLCLZhtin2YXYrdiv2YjYryAo27LbsCDZvtin2LPYrikiOiJVbmxpbWl0ZWQgKDIwIHJlcGxpZXMpIiwi2YHYp9i12YTZhyDYstmF2KfZhtuMINio24zZhiDZvtin2LPYruKAjNmH2KcgKNqp2YjZhOKAjNiv2KfZiNmGKSI6IlJlcGx5IENvb2xkb3duIEludGVydmFsIiwi4pqhINio2K/ZiNmGINmF2K3Yr9mI2K/bjNiqINiy2YXYp9mG24wgKNmB2YjYsduMINmIINio2K/ZiNmGINqp2YjZhOKAjNiv2KfZiNmGKSI6IuKaoSBJbnN0YW50IChObyBjb29sZG93bikiLCLZh9ixINuxINiv2YLbjNmC2YciOiJFdmVyeSAxIG1pbnV0ZSIsItmH2LEg27Mg2K/ZgtuM2YLZhyI6IkV2ZXJ5IDMgbWludXRlcyIsItmH2LEg27Ug2K/ZgtuM2YLZhyAo2b7bjNi02YbZh9in2K/bjCkiOiJFdmVyeSA1IG1pbnV0ZXMgKFJlY29tbWVuZGVkKSIsItmH2LEg27HbsCDYr9mC24zZgtmHIjoiRXZlcnkgMTAgbWludXRlcyIsItmH2LEg27PbsCDYr9mC24zZgtmHIjoiRXZlcnkgMzAgbWludXRlcyIsItmG2qnYqtmHOiI6Ik5vdGU6Iiwi2YjZgtiq24wg2b7Yp9iz2K4g2YfZiNi02YXZhtivIEFJINmB2LnYp9mEINio2KfYtNiv2Iwg2KfZiNmE2YjbjNiqINio2KfZhNin2KrYsduMINmG2LPYqNiqINio2Ycg2YXZhti024wg2K7ZiNiv2qnYp9ixIChBRkspINiv2KfYsdivINmIINmB2YLYtyDYr9ixINi12YjYsdiqIjoiV2hlbiBBSSBSZXBseSBpcyBhY3RpdmUsIGl0IHRha2VzIHByaW9yaXR5IG92ZXIgQUZLIGF1dG8tcmVzcG9uZGVyIGFuZCBvbmx5IHJlc3BvbmRzIHdoZW4geW91IGFyZSIsItii2YHZhNin24zZhiDYqNmI2K/ZhiDYtNmF2KciOiJvZmZsaW5lIiwi2Iwg2YXYqtmG2KfYs9ioINio2Kcg2LPZiNin2YQg2YXYrtin2LfYqCDZvtin2LPYriDZhduM4oCM2K/Zh9ivLiI6IiwgdGFpbG9yaW5nIGFuc3dlcnMgdG8gdGhlIGNvbnRhY3QncyBxdWVyeS4iLCLYp9iq2LXYp9mEINix2KjYp9iqINiv2LPYqtuM2KfYsSDYp9iu2KrYtdin2LXbjCDYqtmE2q/Ysdin2YUgKEJvdEZhdGhlciBBUEkpIjoiQ29ubmVjdCBUZWxlZ3JhbSBIZWxwZXIgQm90IChCb3RGYXRoZXIgQVBJKSIsItmC2KfZhtmI2YYg2KfZhtit2LXYp9ixINmIINin2YXZhtuM2Ko6IjoiRXhjbHVzaXZlIFNlY3VyaXR5IFBvbGljeToiLCLZh9ixINqp2KfYsdio2LEg2KjYp9uM2K8g2K/YsSI6IkVhY2ggc3Vic2NyaWJlciBtdXN0IGNyZWF0ZSBhIGRlZGljYXRlZCBib3QgaW4iLCLYsdio2KfYqiDYp9iu2KrYtdin2LXbjCDZiCDZhdis2LLYp9uMINiu2YjYryDYsdinINio2LPYp9iy2K8g2Ygg2KrZiNqp2YYg2KLZhiDYsdinINmI2KfYsdivINqp2YbYry4g2KjZhyDZhdmG2LjZiNixINit2YHYuCDaqdin2YXZhCDYrdix24zZhSDYrti12YjYtduMINmIINin2YXZhtuM2Kog2K3Ys9in2KjYjCDYp9uM2YYg2LHYqNin2Kog2YXZhtit2LXYsdin2Ysg2KjZhyDZhdin2YTaqSDYrdiz2KfYqCDZvtin2LPYriDZhduM4oCM2K/Zh9ivINmIINiv2LPYqtix2LPbjCDZh9ixINmB2LHYryDYr9uM2q/YsduMINio2Ycg2b7bjNin2YXigIzZh9inINuM2Kcg2K/Ys9iq2YjYsdin2Kog2LHYqNin2Kog2KjZhyDYt9mI2LEg2qnYp9mF2YQg2YXYs9iv2YjYryDZiCDYutuM2LHZhdis2KfYsiDYp9iz2KouIjoiYW5kIHByb3ZpZGUgaXRzIHRva2VuLiBUbyBtYWludGFpbiBhYnNvbHV0ZSBwcml2YWN5LCB0aGlzIGJvdCBleGNsdXNpdmVseSBhbnN3ZXJzIHRoZSBhY2NvdW50IG93bmVyIGFuZCBibG9ja3MgYWxsIGV4dGVybmFsIHVzZXJzLiIsItiq2YjaqdmGINix2KjYp9iqINiq2YTar9ix2KfZhSAoQVBJIFRva2VuINin2LIgQm90RmF0aGVyQCkiOiJUZWxlZ3JhbSBCb3QgQVBJIFRva2VuIChmcm9tIEBCb3RGYXRoZXIpIiwi4p6VINiv2LHbjNin2YHYqiDYqtmI2qnZhiDYp9iyIEBCb3RGYXRoZXIiOiLinpUgR2V0IFRva2VuIGZyb20gQEJvdEZhdGhlciIsIuKaoSDYp9iq2LXYp9mEINmIINmB2LnYp9mE4oCM2LPYp9iy24wg2YjYqOKAjNmH2YjaqSI6IuKaoSBDb25uZWN0ICYgRW5hYmxlIFdlYmhvb2siLCLYsdio2KfYqiDYqtmE2q/Ysdin2YUiOiJUZWxlZ3JhbSBCb3QiLCLwn5qAINio2KfYsiDaqdix2K/ZhiDYsdio2KfYqiDYr9ixINiq2YTar9ix2KfZhSI6IvCfmoAgT3BlbiBCb3QgaW4gVGVsZWdyYW0iLCLwn5SMINmC2LfYuSDYp9iq2LXYp9mEINix2KjYp9iqIjoi8J+UjCBEaXNjb25uZWN0IEJvdCIsItmI2LbYuduM2Kog2YjYqOKAjNmH2YjaqToiOiJXZWJob29rIFN0YXR1czoiLCLZhdiq2LXZhCDZiCDZgdi52KfZhCI6IkNvbm5lY3RlZCAmIEFjdGl2ZSIsItmI2LHZiNivINio2Ycg2b7ZhtmEIChNaW5pIEFwcCk6IjoiVGVsZWdyYW0gTWluaSBBcHAgTGF1bmNoOiIsItiv2qnZhdmHINmF2YbZiCDZgdi52KfZhCDYtNivIjoiTWVudSBCdXR0b24gQWN0aXZlIiwi2KfZhdmG24zYqiDYp9mG2K3Ytdin2LHbjCAo2YXYrti12YjYtSDYtNmF2KcpOiI6IkV4Y2x1c2l2ZSBTZWN1cml0eSAoT3duZXIgT25seSk6Iiwi2LHYqNin2Kog2YXZhtit2LXYsdin2Ysg2KjZhyDYtNmG2KfYs9mHINiq2YTar9ix2KfZhSDYtNmF2Kcg2b7Yp9iz2K4g2YXbjOKAjNiv2YfYryDZiCDYqNix2KfbjCDYqNmC24zZhyDZhdiz2K/ZiNivINin2LPYqi4iOiJCb3Qgc3RyaWN0bHkgYW5zd2VycyB5b3VyIFRlbGVncmFtIElEIGFuZCBpZ25vcmVzIGV2ZXJ5b25lIGVsc2UuIiwi8J+UkiDYotmF2KfYr9mHINmC2YHZhCDYqNinINin2YjZhNuM2YYgL3N0YXJ0Ijoi8J+UkiBSZWFkeSB0byBMb2NrIHVwb24gZmlyc3QgL3N0YXJ0Iiwi4pyP77iPINiq2YbYuNuM2YUg2LTZhtin2LPZhyI6IuKcj++4jyBDb25maWd1cmUgSUQiLCLZvtizINin2LIg2KfYqti12KfZhNiMINuM2qnigIzYqNin2LEg2YjYp9ix2K8g2LHYqNin2Kog2KrZhNqv2LHYp9mFINiu2YjYryDYtNiv2Ycg2Ygg2K/Ys9iq2YjYsSI6IkFmdGVyIGNvbm5lY3RpbmcsIG9wZW4geW91ciBUZWxlZ3JhbSBib3QgYW5kIHNlbmQiLCLYsdinINio2YHYsdiz2KrbjNivINiq2Kcg2LHYqNin2Kog2YXZhtit2LXYsdin2Ysg2KjZhyDYp9qp2KfZhtiqINi02YXYpyDZgtmB2YQg2LTYr9mHINmIINm+2YbZhCDar9ix2KfZgduM2qnbjCDYr9in2K7ZhCDYqtmE2q/Ysdin2YUg2YHYudin2YQg2LTZiNivLiI6InRvIGxvY2sgdGhlIGJvdCB0byB5b3VyIGFjY291bnQgYW5kIGFjdGl2YXRlIHRoZSBpbi1hcHAgTWluaSBBcHAuIiwi8J+Xke+4jyDYs9i32YQg2LLYqNin2YTZhyDZiCDYttivINit2LDZgSDZvtuM2KfZheKAjNmH2KfbjCDZvtuM2YjbjCAoQW50aS1EZWxldGUpIjoi8J+Xke+4jyBBbnRpLURlbGV0ZSBQcml2YXRlIE1lc3NhZ2UgVmF1bHQiLCLYp9qv2LEg2LTYrti124wg2K/YsSDZvtuM2YjbjCDZvtuM2KfZhduMINix2Kcg2b7Yp9qpINqp2YbYr9iMINmF2KrZhiDbjNinINix2LPYp9mG2Ycg2LDYrtuM2LHZhyDYtNiv2Ycg2YHZiNix2KfZiyDYqNmHINix2KjYp9iqINin2K7Yqti12KfYtduMINi02YXYpyDYp9ix2LPYp9mEINmF24zigIzYtNmI2K8iOiJXaGVuIGEgY29udGFjdCBkZWxldGVzIGEgbWVzc2FnZSwgdGhlIGNhY2hlZCB0ZXh0IG9yIG1lZGlhIGlzIGltbWVkaWF0ZWx5IGZvcndhcmRlZCB0byB5b3VyIGJvdCIsIuKcj++4jyDZhdin2YbbjNiq2YjYsSDZiCDYttivINmI24zYsdin24zYtCDZvtuM2KfZheKAjNmH2KfbjCDZvtuM2YjbjCAoQW50aS1FZGl0KSI6IuKcj++4jyBBbnRpLUVkaXQgUHJpdmF0ZSBNZXNzYWdlIE1vbml0b3IiLCLYp9qv2LEg2LTYrti124wg2b7bjNin2YXbjCDYsdinINiq2LrbjNuM2LEg2K/Zh9iv2Iwg2YXYqtmGINmC2KjZhCDYp9iyINmI24zYsdin24zYtCDZiCDZhdiq2YYg2KzYr9uM2K8g2K/YsSDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2KjZhyDYtNmF2Kcg2YbZhdin24zYtCDYr9in2K/ZhyDZhduM4oCM2LTZiNivIjoiV2hlbiBhIGNvbnRhY3QgZWRpdHMgYSBtZXNzYWdlLCB0aGUgcHJlLWVkaXQgdGV4dCBhbmQgZGlmZiBhcmUgZGVsaXZlcmVkIHRvIHlvdXIgYm90Iiwi8J+TuCDZhtis2KfYqiDZiCDYp9ix2LPYp9mEINix2LPYp9mG2YfigIzZh9in24wg2LLZhdin2YbigIzYr9in2LEg2KjZhyDYsdio2KfYqiAoQW50aS1UVEwpIjoi8J+TuCBBbnRpLVRUTCBWaWV3LU9uY2UgTWVkaWEgU2F2ZXIiLCLYqti12KfZiNuM2LHYjCDZgduM2YTZheKAjNmH2Kcg2Ygg2YjbjNiz4oCM2YfYp9uMINmF2K3ZiNi02YjZhtiv2YcgKFZpZXctT25jZSkg2YXYs9iq2YLbjNmF2KfZiyDYqNmHINm+24zZiNuMINix2KjYp9iqINin2K7Yqti12KfYtduMINi02YXYpyDYp9ix2LPYp9mEINmF24zigIzYtNmI2YbYryI6IkV4cGlyaW5nIHBob3RvcywgdmlkZW8gbm90ZXMgYW5kIHZvaWNlIGNsaXBzIGFyZSBzYXZlZCBhbmQgZm9yd2FyZGVkIHRvIHlvdXIgaGVscGVyIGJvdCIsItiz2b7YsSDYp9mF2YbbjNiq24wg2b7bjNi02LHZgdiq2YcgQXJpem8gU2VsZiAmIFplcm8tVHJ1c3QiOiJBcml6byBTZWxmIEFkdmFuY2VkIFNlY3VyaXR5ICYgWmVyby1UcnVzdCBTaGllbGQiLCLYrdiz2KfYqCDaqdin2LHYqNix24wg2LTZhdinINiq2K3YqiDYrdmB2KfYuNiqINmE2KfbjNmH4oCM2YfYp9uMINiv2YHYp9i524wg2obZhtiv2q/Yp9mG2Ycg2LTYp9mF2YQg2LHZhdiy2Ybar9in2LHbjCDaqdmI2KfZhtiq2YjZheKAjNin2YXZhtiMINiq2YTZh+KAjNmH2KfbjCDYr9mB2KfYuduMIEhvbmV5cG902Iwg2LPZhtiz2YjYsdmH2KfbjCDYqti02K7bjNi1INmG2YHZiNiwINmIINin2K3Ysdin2LIg2YfZiNuM2Kog2K/ZiNi52KfZhdmE24wgKFRPVFApINmC2LHYp9ixINiv2KfYsdivLiI6IllvdXIgYWNjb3VudCBpcyBndWFyZGVkIGJ5IG11bHRpLWxheWVyZWQgZGVmZW5zZXM6IEFFUy1HQ00gZW5jcnlwdGlvbiwgWmVyby1UcnVzdCBIb25leXBvdCB0cmFwcywgYW5kIFJGQyA2MjM4IDJGQS4iLCLYp9it2LHYp9iyINmH2YjbjNiqINiv2Ygg2YXYsdit2YTZh+KAjNin24wgKEdvb2dsZSBBdXRoZW50aWNhdG9yIC8gMkZBKSI6IlR3by1GYWN0b3IgQXV0aGVudGljYXRpb24gKEdvb2dsZSBBdXRoZW50aWNhdG9yIC8gMkZBKSIsItmF2K3Yp9mB2LjYqiDYp9iyINit2LPYp9ioINiv2LEg2KjYsdin2KjYsSDZhtmB2YjYsCDYqNinINqp2K/Zh9in24wg27Yg2LHZgtmF24wg2LLZhdin2YbigIzZhdit2YjYsSI6IlByb3RlY3QgeW91ciBhY2NvdW50IHdpdGggMzAtc2Vjb25kIHJvdGF0aW5nIDYtZGlnaXQgVE9UUCBjb2RlcyIsIti624zYsdmB2LnYp9mEIOKdjCI6IkRpc2FibGVkIOKdjCIsItmB2LnYp9mEINmIINin24zZhdmGIPCfn6IiOiJBY3RpdmUgJiBTZWN1cmUg8J+foiIsItio2Kcg2YHYudin2YTigIzYs9in2LLbjCDbskZB2Iwg2YfZhtqv2KfZhSDZh9ixINio2KfYsSDZiNix2YjYryDYqNmHINm+2YbZhNiMINi52YTYp9mI2Ycg2KjYsSDYsdmF2LIg2LnYqNmI2LHYjCDYqNmHINqp2K8g24zaqdio2KfYsSDZhdi12LHZgSDYp9m+2YTbjNqp24zYtNmGIEdvb2dsZSBBdXRoZW50aWNhdG9yINuM2KcgMkZBUyDZhtuM2LIg2KfYrdiq24zYp9isINiu2YjYp9mH24zYryDYr9in2LTYqi4iOiJXaGVuIDJGQSBpcyBhY3RpdmUsIGV2ZXJ5IHNpZ24taW4gcmVxdWlyZXMgYSByb3RhdGluZyBjb2RlIGZyb20gR29vZ2xlIEF1dGhlbnRpY2F0b3Igb3IgMkZBUyBhbG9uZ3NpZGUgeW91ciBwYXNzd29yZC4iLCLwn5SQINix2KfZh+KAjNin2YbYr9in2LLbjCDZiCDZgdi52KfZhOKAjNiz2KfYstuMINuyRkEiOiLwn5SQIENvbmZpZ3VyZSAmIEVuYWJsZSAyRkEiLCLar9in2YUg27E6INin2LPaqdmGINiq2LXZiNuM2LEgUVIg24zYpyDaqdm+24wg2qnZhNuM2K8g2K/Ys9iq24wiOiJTdGVwIDE6IFNjYW4gUVIgQ29kZSBvciBDb3B5IFNlY3JldCBLZXkiLCLYp9m+2YTbjNqp24zYtNmGIEdvb2dsZSBBdXRoZW50aWNhdG9yINuM2KcgMkZBUyDYsdinINio2KfYsiDaqdix2K/ZhyDZiCDYp9uM2YYg2KjYp9ix2qnYryDYsdinINin2LPaqdmGINqp2YbbjNivLiI6Ik9wZW4gR29vZ2xlIEF1dGhlbnRpY2F0b3Igb3IgMkZBUyBhbmQgc2NhbiB0aGlzIGJhcmNvZGUuIiwi8J+TsSDYqNin2LIg2qnYsdiv2YYg2YXYs9iq2YLbjNmFINiv2LEgQXV0aGVudGljYXRvciAo2YjbjNqY2Ycg2YXZiNio2KfbjNmEKSI6IvCfk7EgT3BlbiBEaXJlY3RseSBpbiBBdXRoZW50aWNhdG9yIChNb2JpbGUpIiwi24zYpyDaqdmE24zYryDZhdit2LHZhdin2YbZhyDbs9uyINqp2KfYsdin2qnYqtix24wg2LHYpyDYr9iz2KrbjCDZiNin2LHYryDZhtmF2KfbjNuM2K86IjoiT3IgbWFudWFsbHkgZW50ZXIgdGhpcyAzMi1jaGFyYWN0ZXIgQmFzZTMyIHNlY3JldCBrZXk6Iiwi8J+TiyDaqdm+24wg2qnZhNuM2K8g2K/Ys9iq24wiOiLwn5OLIENvcHkgU2VjcmV0IEtleSIsItqv2KfZhSDbsjog2qnYryDbtiDYsdmC2YXbjCDYqtmI2YTbjNivINi02K/ZhyDYr9ixINin2b7ZhNuM2qnbjNi02YYg2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlN0ZXAgMjogRW50ZXIgdGhlIDYtRGlnaXQgQ29kZSBmcm9tIFlvdXIgQXBwIiwi2KrYo9uM24zYryDZhtmH2KfbjNuMINmIINmB2LnYp9mE4oCM2LPYp9iy24wg27JGQSI6IlZlcmlmeSAmIEVuYWJsZSAyRkEiLCLYp9mG2LXYsdin2YEiOiJDYW5jZWwiLCLYp9it2LHYp9iyINmH2YjbjNiqINiv2Ygg2YXYsdit2YTZh+KAjNin24wgKDJGQSkg2KjYsdin24wg2K3Ys9in2Kgg2LTZhdinINmB2LnYp9mEINin2LPYqi4iOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uICgyRkEpIGlzIGN1cnJlbnRseSBhY3RpdmUgb24geW91ciBhY2NvdW50LiIsIuKdjCDYutuM2LHZgdi52KfZhOKAjNiz2KfYstuMINuyRkEiOiLinYwgRGlzYWJsZSAyRkEiLCLwn5SRINqp2K/Zh9in24wg2KjYp9iy24zYp9io24wg2KfYtti32LHYp9ix24wgKEVtZXJnZW5jeSBCYWNrdXAgQ29kZXMpIjoi8J+UkSBFbWVyZ2VuY3kgQmFja3VwIFJlY292ZXJ5IENvZGVzIiwi8J+TiyDaqdm+24wg2KrZhdin2YUg2qnYr9mH2KciOiLwn5OLIENvcHkgQWxsIEJhY2t1cCBDb2RlcyIsItiv2LEg2LXZiNix2Kog2LnYr9mFINiv2LPYqtix2LPbjCDYqNmHINqv2YjYtNuMINuM2Kcg2KfZviBBdXRoZW50aWNhdG9y2Iwg2KjYpyDZh9ixINuM2qkg2KfYsiDYp9uM2YYg2qnYr9mH2KfbjCDbjNqp4oCM2KjYp9ixINmF2LXYsdmBINmF24zigIzYqtmI2KfZhtuM2K8g2YjYp9ix2K8g2K3Ys9in2Kgg2LTZiNuM2K86IjoiSWYgeW91IGxvc2UgYWNjZXNzIHRvIHlvdXIgYXV0aGVudGljYXRvciBhcHAsIHVzZSBhbnkgb2YgdGhlc2Ugc2luZ2xlLXVzZSBjb2RlcyB0byBzaWduIGluOiIsItm+2LTYqtuM2KjYp9mG4oCM2q/bjNix24wg2LHZhdiy2Ybar9in2LHbjCDYtNiv2YcgKEVuY3J5cHRlZCBCYWNrdXAgJiBSZXN0b3JlKSI6IkVuY3J5cHRlZCBCYWNrdXAgJiBEaXNhc3RlciBSZWNvdmVyeSIsItiv2KfZhtmE2YjYryDZhtiz2K7ZhyDZvti02KrbjNio2KfZhiDYp9mF2YYg2KfYsiDYqtmF2KfZhSDYqtmG2LjbjNmF2KfYqiDZiCDYs9i02YbYjCDbjNinINio2KfYstuM2KfYqNuMINii2YYg2LHZiNuMINiz2LHZiNixIjoiRXhwb3J0IHNlY3VyZSBlbmNyeXB0ZWQgYmFja3VwIG9mIGFsbCBzZXR0aW5ncywgb3IgcmVzdG9yZSB0byBzZXJ2ZXIiLCLwn5OlINin24zYrNin2K8g2Ygg2K/YsduM2KfZgdiqINiu2LHZiNis24wg2KfZhdmGIjoi8J+TpSBFeHBvcnQgU2VjdXJlIEJhY2t1cCIsItiq2YXYp9mFINiq2YbYuNuM2YXYp9iqINiz2KfYudiq2Iwg2KjbjNmI2q/Ysdin2YHbjNiMINmF2YbYtNuM2Iwg2KjZhNin2qnigIzZhNuM2LPYqiDZiCDYs9i02YYg2KrZhNqv2LHYp9mFINi02YXYpyDYqNinINin2YTar9mI2LHbjNiq2YUgQUVTLUdDTSDZiCDYsdmF2LIg2LTZhdinINmC2YHZhCDYtNiv2Ycg2Ygg2KjZhyDYtNqp2YQg2YHYp9uM2YQg2K/Yp9mG2YTZiNivINmF24zigIzYtNmI2K8uIjoiQWxsIGNsb2NrLCBiaW8sIEFGSywgYmxvY2tsaXN0LCBhbmQgc2Vzc2lvbiBkYXRhIGlzIGVuY3J5cHRlZCB3aXRoIEFFUy0yNTYtR0NNIHVzaW5nIHlvdXIgcGFzc3dvcmQuIiwi8J+SviDYrtix2YjYrNuMINm+2LTYqtuM2KjYp9mGIChFeHBvcnQpIjoi8J+SviBFeHBvcnQgQmFja3VwIiwi8J+TpCDYqNin2LLbjNin2KjbjCDZgdin24zZhCDZvti02KrbjNio2KfZhiAoUmVzdG9yZSkiOiLwn5OkIFJlc3RvcmUgQmFja3VwIEZpbGUiLCLZgdin24zZhCDYqNqp2KfZviDYr9in2YbZhNmI2K8g2LTYr9mHINix2Kcg2KfZhtiq2K7Yp9ioINmIINix2YXYstuMINqp2Ycg2KjYpyDYotmGINmC2YHZhCDYtNiv2Ycg2LHYpyDZiNin2LHYryDZhtmF2KfbjNuM2K8g2KrYpyDYqtmG2LjbjNmF2KfYqiDYqNin2LLar9ix2K/Yp9mG24wg2LTZiNmG2K86IjoiU2VsZWN0IHlvdXIgZW5jcnlwdGVkIGJhY2t1cCBmaWxlIGFuZCBlbnRlciB0aGUgcGFzc3dvcmQgdXNlZCB0byBsb2NrIGl0OiIsIvCflIQg2KjYp9iy24zYp9io24wg2KfYt9mE2KfYudin2KogKFJlc3RvcmUpIjoi8J+UhCBSZXN0b3JlIEJhY2t1cCIsItiq2YTZh+KAjNmH2KfbjCDYr9mB2KfYuduMINmIINit2LPar9ixINmH2KfZhtuM4oCM2b7Yp9iqIChaZXJvLVRydXN0IEhvbmV5cG90KSI6Ilplcm8tVHJ1c3QgSG9uZXlwb3QgRGVmZW5zaXZlIFRyYXBzIiwi2YXYs9iv2YjYr9iz2KfYstuMINiu2YjYr9qp2KfYsSDYotuM4oCM2b7bjOKAjNmH2KfbjCDZhdi02qnZiNqpINmIINm+2YjbjNi02q/Ysdin2YYg2KLYs9uM2KjigIzZvtiw24zYsduMINmI2KgiOiJBdXRvbWF0aWMgSVAgYmFucyBhZ2FpbnN0IHZ1bG5lcmFiaWxpdHkgc2Nhbm5lcnMgJiBob3N0aWxlIHByb2JlcyIsItmB2LnYp9mEINmIINmH2YjYtNuM2KfYsSDwn5+iIjoiQWN0aXZlICYgVmlnaWxhbnQg8J+foiIsItiq2LHYp9mB24zaqeKAjNmH2KfbjCDYp9iz2qnZhtixINmF2KfZhtmG2K8g2KrZhNin2LQg2KjYsdin24wg2K/Ys9iq2LHYs9uMINio2Ycg2YXYs9uM2LHZh9in24wg2YHYsdi224wg2KfYr9mF24zZhtiMINqp2K/Zh9in24wg2LTZhNiMINmB2KfbjNmE4oCM2YfYp9uMINiv2KfYquKAjNin2YbigIzZiNuMINmIINio2Kfar+KAjNmH2KfbjCDYtNmG2KfYrtiq2YfigIzYtNiv2YfYjCDYqNmE2KfZgdin2LXZhNmHINiv2LEg2YTYqNmHINi02KjaqdmHIENsb3VkZmxhcmUg2YXYs9iv2YjYryDYtNiv2Ycg2Ygg2K/YsSDZhNin2q/igIzZh9in24wg2KfZhdmG24zYqtuMINir2KjYqiDZhduM4oCM2q/Ysdiv2YbYry4iOiJNYWxpY2lvdXMgc2NhbnMgcHJvYmluZyBkZWNveSBhZG1pbiBwYXRocywgc2hlbGwgZW5kcG9pbnRzLCBvciAuZW52IGZpbGVzIGFyZSBibG9ja2VkIGluc3RhbnRseSBhdCBDbG91ZGZsYXJlIGVkZ2UgYW5kIGxvZ2dlZC4iLCLZgtin2KjZhNuM2Kog2YLYqNmE24wiOiJQcmV2aW91cyIsIvCflZIg2LPYp9i52Kog2Ygg2KfYs9iq2KfbjNmEIjoi8J+VkiBDbG9jayAmIFN0eWxlIiwi27EiOiIxIiwi27kpIjoiOSkiLCLZgtin2KjZhNuM2Kog2KjYudiv24wiOiJOZXh0Iiwi2YLYqNmE24wiOiJQcmV2aW91cyIsItin2LIg27kiOiJvZiA5Iiwi2KjYudiv24wiOiJOZXh0Iiwi8J+SviDYsNiu24zYsdmHINmIINin2LnZhdin2YQg2KrYutuM24zYsdin2Kog2KfYs9iq2YjYr9uM2YgiOiLwn5K+IFNhdmUgU3R1ZGlvIENoYW5nZXMiLCLYsNiu24zYsdmHINii2YbbjCDYqti624zbjNix2KfYqiDYp9iz2KrZiNiv24zZiCI6IlNhdmUgU3R1ZGlvIENoYW5nZXMiLCLZiNi22LnbjNiqINiz2LHZiNuM2LMg2Ygg2YXYp9mG24zYqtmI2LHbjNmG2q8g2LPZhNin2YXYqiI6IlNlcnZpY2UgSGVhbHRoICYgQ2xvdWQgTW9uaXRvcmluZyIsItmI2LbYuduM2Kog2LPZhNin2YXYqiDZiCDZvtin24zZvuKAjNmE2KfbjNmGINin2KjYsduMIjoiU3lzdGVtIEhlYWx0aCAmIENsb3VkIFBpcGVsaW5lIiwi4pqhINiq2LPYqiDYqNmH4oCM2LHZiNiy2LHYs9in2YbbjCDYotmG24wiOiLimqEgSW5zdGFudCBTeW5jIFRlc3QiLCLZh9mF2q/Yp9mF4oCM2LPYp9iy24wg2YHZiNix24wiOiJTeW5jIE5vdyIsIuKPuO+4jyDYqtmI2YLZgSDZhdmI2YLYqiI6IuKPuO+4jyBQYXVzZSBTZWxmYm90Iiwi2KrZiNmC2YEg2YXZiNmC2Kog2LPZhNmB4oCM2KjYp9iqIjoiUGF1c2UgU2VsZmJvdCIsIvCfk7Eg2KrYudmI24zYtiDYp9qp2KfZhtiqIjoi8J+TsSBDaGFuZ2UgVGVsZWdyYW0gU2Vzc2lvbiIsItiq2LrbjNuM2LEg2LPYtNmGINin2qnYp9mG2Kog2KrZhNqv2LHYp9mFIjoiQ2hhbmdlIFRlbGVncmFtIFNlc3Npb24iLCLZiNi22LnbjNiqINiz2YTZgeKAjNio2KfYqiDYtNmF2KciOiJZb3VyIFNlbGZib3QgU3RhdHVzIiwi2YjYtti524zYqiDYs9mE2YHigIzYqNin2Ko6IjoiU2VsZmJvdCBTdGF0dXM6Iiwi8J+foiDZgdi52KfZhCDZiCDYotmG2YTYp9uM2YYiOiLwn5+iIEFjdGl2ZSAmIE9ubGluZSIsItii2K7YsduM2YYg2KjZh+KAjNix2YjYstix2LPYp9mG24wg2KrZhNqv2LHYp9mFIjoiTGFzdCBUZWxlZ3JhbSBTeW5jIiwi2KLYrtix24zZhiDZh9mF2q/Yp9mF4oCM2LPYp9iy24w6IjoiTGFzdCBTeW5jOiIsItiv2LHYrdin2YQg2KfYs9iq2LnZhNin2YUuLi4iOiJDaGVja2luZyB0ZWxlbWV0cnkuLi4iLCLYtNio2qnZhyDYp9io2LHbjCBBcml6byBTZWxmINmB2LnYp9mEINin2LPYqiI6IkFyaXpvIFNlbGYgQ2xvdWQgTmV0d29yayBpcyBBY3RpdmUiLCLZvtmE2KrZgdix2YUg2KfYqNix24wg2YfZiNi02YXZhtivINiz2YTZgeKAjNio2KfYqiDYqtmE2q/Ysdin2YUg2KLYsduM2LLZiCB8INi32LHYp9it24wg2LTYr9mHINio2Kcg2YXYudmF2KfYsduMIEVkZ2Ug2Ygg2KjYr9mI2YYg2LPYsdmI2LEgKFNlcnZlcmxlc3MpIjoiQXJpem8gVGVsZWdyYW0gU2VsZmJvdCBDbG91ZCBQbGF0Zm9ybSB8IEVuZ2luZWVyZWQgd2l0aCBTZXJ2ZXJsZXNzIEVkZ2UgQXJjaGl0ZWN0dXJlIiwi2YXYudix2YHbjCDYp9mF2qnYp9mG2KfYqiDZiCDYs9ix2YjbjNiz4oCM2YfYp9uMINm+24zYtNix2YHYqtmHIHwgQXJpem8gU2VsZiB2My42LjAgUFJPIjoiRmVhdHVyZSBUb3VyICYgQWR2YW5jZWQgU2VydmljZXMgfCBBcml6byBTZWxmIHYzLjYuMCBQUk8iLCLYp9iz2KrZiNiv24zZiNuMINin2KjYsduMINiz2YTZgeKAjNio2KfYqiDZh9mI2LTZhdmG2K8g2KrZhNqv2LHYp9mFIjoiSW50ZWxsaWdlbnQgVGVsZWdyYW0gU2VsZmJvdCBDbG91ZCBTdHVkaW8iLCLZvtmE2KrZgdix2YUg2YXYqtmF2LHaqdiyINin2KjYsduMINis2YfYqiDYrtmI2K/aqdin2LHYs9in2LLbjCDZiCDZhdiv24zYsduM2Kog2YbZhdin24zZhyDYqtmE2q/Ysdin2YUg2KjYsSDYqNiz2KrYsSDYs9ix2YjYsdmE2LMg27LbtCDYs9in2LnYqtmHINio2K/ZiNmGINmG24zYp9iyINio2Ycg2KLZhtmE2KfbjNmGINio2YjYr9mGINiv2LPYqtqv2KfZhyDbjNinINiz2LHZiNixINin2K7Yqti12KfYtduMLiI6IkNlbnRyYWxpemVkIDI0Lzcgc2VydmVybGVzcyBwbGF0Zm9ybSBhdXRvbWF0aW5nIFRlbGVncmFtIHByb2ZpbGVzIHdpdGhvdXQgZGVkaWNhdGVkIHNlcnZlcnMgb3Iga2VlcGluZyB5b3VyIHBob25lIG9ubGluZS4iLCLZiNin2qnZhti0INiy24zYsSDbtNuwbXMiOiJTdWItNDBtcyBMYXRlbmN5Iiwi27HbsNuw2aog2KfYqNix24wg27LbtC/btyI6IjEwMCUgMjQvNyBDbG91ZCIsItiv24zYqtin2KjbjNizINmH24zYqNix24zYryBEMSArIEtWIjoiSHlicmlkIEQxICsgS1YgRGF0YWJhc2UiLCLYp9mF2YbbjNiqINuyRkEg2Ygg2YfYp9mG24zigIzZvtin2KoiOiIyRkEgJiBIb25leXBvdCBTZWN1cml0eSIsItiz2KfYudiqINiy2YbYr9mHINmG2KfZhSDaqdin2LHYqNix24wiOiJMaXZlIFByb2ZpbGUgQ2xvY2siLCLbs9uyINmC2YTZhSDZhtmI2LTYqtin2LHbjCI6IjMyIEZvbnQgU3R5bGVzIiwi2KjZh+KAjNix2YjYstix2LPYp9mG24wg2K7ZiNiv2qnYp9ixINmIINio2YTYp9iv2LHZhtqvINiy2YXYp9mGINiq2YfYsdin2YYg2K/YsSDZhtin2YUg2qnYp9ix2KjYsduMINiq2YTar9ix2KfZhSDYqNinINuz27Ig2KfYs9iq2KfbjNmEINmC2YTZhSDZgdin2LHYs9uMINmIINmE2KfYqtuM2YbYjCDYp9ix2YLYp9mFINmF2K3ZhNuMINmIINmG2YXYp9uM2LQg27Hbsi/bstu0INiz2KfYudiq2Ycg2LHYo9izINir2KfZhtuM2Ycg27DbsC4iOiJSZWFsLXRpbWUgYXV0b21hdGVkIFRlbGVncmFtIG5hbWUgY2xvY2sgc3luY2hyb25pemF0aW9uIHdpdGggMzIgZGVzaWduZXIgcHJlc2V0cywgY3VzdG9tIGxvY2FsIGRpZ2l0cywgYW5kIDEyLzI0aCBwcmVjaXNpb24gYXQgc2Vjb25kIDAwLiIsItio24zZiNqv2LHYp9mB24wg2LLZhtiv2Ycg2Ygg2KrZgtmI24zZhSI6IkR5bmFtaWMgQmlvICYgQ2FsZW5kYXIiLCLZhdiq2LrbjNix2YfYp9uMINmH2YjYtNmF2YbYryI6IlNtYXJ0IER5bmFtaWMgVmFyaWFibGVzIiwi2YbZhdin24zYtCDYqtmC2YjbjNmFINiy2YbYr9mHINmH2KzYsduMINi02YXYs9uM2Iwg2LHZiNiyINmH2YHYqtmHINmIINiz2KfYudiqINiv2LEg2KjYrti0IEJpbyDYqtmE2q/Ysdin2YUg2KjYpyDYp9mE2q/ZiNmH2KfbjCDZhdiv2LHZhiDZiCDZhdiq2LrbjNix2YfYp9uMINiv2KfbjNmG2KfZhduM2qkuIjoiRHluYW1pYyBUZWxlZ3JhbSBiaW8gdXBkYXRlcyBkaXNwbGF5aW5nIGNhbGVuZGFyLCBkYXkgb2Ygd2VlaywgYW5kIHRpbWUgZm9ybWF0dGVkIHdpdGggbW9kZXJuIHRlbXBsYXRlcy4iLCLZhdmG2LTbjCDYrtmI2K/aqdin2LEg2b7bjNmI24wgKEFGSykiOiJBRksgUHJpdmF0ZSBBdXRvLVNlY3JldGFyeSIsItiz24zYs9iq2YUg2LbYryDYp9iz2b7ZhSI6IkFudGktU3BhbSBDb29sZG93biIsItm+2KfYs9iu2q/ZiNuM24wg2YfZiNi02YXZhtivINio2Ycg2b7bjNin2YXigIzZh9in24wg2LTYrti124wg2YfZhtqv2KfZhSDYotmB2YTYp9uM2YYg2KjZiNiv2YbYjCDYqNinINmC2KfYqNmE24zYqiDYqti52LHbjNmBINmF2KrZhiDYs9mB2KfYsdi024zYjCDZgdin2LXZhNmHINiy2YXYp9mG24wg2Ygg2KfYs9iq2KvZhtin2LPYp9iy24wg2LHYqNin2KrigIzZh9inINmIINqp2KfYsdio2LHYp9mGLiI6IlNtYXJ0IGF1dG8tcmVwbGllcyB0byBwcml2YXRlIG1lc3NhZ2VzIHdoZW4gb2ZmbGluZSwgZmVhdHVyaW5nIGN1c3RvbSB0ZW1wbGF0ZXMsIGNvb2xkb3ducywgYW5kIGJvdCB3aGl0ZWxpc3RpbmcuIiwi2K/Ys9iq24zYp9ixINmH2YjYtCDZhdi12YbZiNi524wgKEFJKSI6IkFJIENoYXQgQXNzaXN0YW50Iiwi2b7Yp9iz2K7ar9mI24wg2obYqiDZhNio2YfigIzYp9uMIjoiRWRnZSBDb250ZXh0dWFsIFJlc3BvbmRlciIsItiq2LnYp9mF2YQg2LLYqNin2YbbjCDZiCDZvtin2LPYruKAjNiv2YfbjCDYrtmI2K/aqdin2LEg2KjZhyDahtiq4oCM2YfYpyDYqNinINin2LPYqtmB2KfYr9mHINin2LIg2YXYr9mE4oCM2YfYp9uMINm+24zYtNix2YHYqtmHINmH2YjYtCDZhdi12YbZiNi524wg2YXYqti12YQg2KjZhyDYs9in2YXYp9mG2Ycg2LPYsdmI2LHZhNizINin2KjYsduMLiI6IkNvbnRleHQtYXdhcmUgY29udmVyc2F0aW9uYWwgcmVwbGllcyBwb3dlcmVkIGJ5IGFkdmFuY2VkIExMTSBpbnRlZ3JhdGlvbiBkaXJlY3RseSBvbiBzZXJ2ZXJsZXNzIGVkZ2UuIiwi2b7Yp9uM2LTar9ixINi22K8g2K3YsNmBIChBbnRpLURlbGV0ZSkiOiJBbnRpLURlbGV0ZSBNZXNzYWdlIFZhdWx0Iiwi2YXYqtmG2Iwg2Lnaqdiz2Iwg2YjbjNizINmIINmB2KfbjNmEIjoiVGV4dCwgUGhvdG9zLCBBdWRpbyAmIEZpbGVzIiwi2LbYqNi3INmIINmB2YjYsdmI2KfYsdivINio2YTYp9iv2LHZhtqvINm+24zYp9mF4oCM2YfYp9iMINmB2KfbjNmE4oCM2YfYp9iMINiq2LXYp9mI24zYsdiMINmI24zYs+KAjNmH2Kcg2Ygg2KfYs9iq24zaqdix2YfYp9uMINm+2KfaqeKAjNi02K/ZhyDYqtmI2LPYtyDZhdiu2KfYt9io2KfZhiDYr9ixINm+24zZiNuMINio2Ycg2LHYqNin2Kog2K/Ys9iq24zYp9ixINi02K7YtduMLiI6IkltbWVkaWF0ZSBjYXB0dXJlIGFuZCBmb3J3YXJkaW5nIG9mIGRlbGV0ZWQgcHJpdmF0ZSBtZXNzYWdlcywgbWVkaWEsIHN0aWNrZXJzLCBhbmQgdm9pY2Ugbm90ZXMgdG8geW91ciBoZWxwZXIgYm90LiIsItmF2KfZhtuM2KrZiNixINi22K8g2YjbjNix2KfbjNi0IChBbnRpLUVkaXQpIjoiQW50aS1FZGl0IE1lc3NhZ2UgTW9uaXRvciIsItmF2KrZhiDZgtio2YQg2Ygg2KjYudivINin2K/bjNiqIjoiUHJlLUVkaXQgJiBQb3N0LUVkaXQgRGlmZiIsItii2LTaqdin2LHYs9in2LLbjCDZiCDYp9ix2LPYp9mEINmF2KrZhiDYp9mI2YTbjNmHINm+24zYp9mF4oCM2YfYpyDZgtio2YQg2KfYsiDZiNuM2LHYp9uM2LQg2KjZhyDZh9mF2LHYp9mHINmG2LPYrtmHINin2LXZhNin2K3igIzYtNiv2Ycg2Ygg2LLZhdin2YYg2K/ZgtuM2YIg2KjZhyDYsdio2KfYqiDYr9iz2KrbjNin2LEg2KjYsdin24wg2KvYqNiqINiq2KfYsduM2K7ahtmHLiI6Ikluc3RhbnQgZGV0ZWN0aW9uIG9mIGVkaXRlZCBwcml2YXRlIG1lc3NhZ2VzLCBzZW5kaW5nIHRoZSBvcmlnaW5hbCB0ZXh0IGFuZCB1cGRhdGVkIGRpZmYgdG8geW91ciBoZWxwZXIgYm90LiIsItii2LHYtNuM2Ygg2LHYs9in2YbZh+KAjNmH2KcgKEFudGktVFRMKSI6IkFudGktVFRMIE1lZGlhIEFyY2hpdmVyIiwi2LHYs9in2YbZh+KAjNmH2KfbjCBWaWV3LU9uY2UiOiJWaWV3LU9uY2UgU2VsZi1EZXN0cnVjdGluZyBNZWRpYSIsItiw2K7bjNix2Ycg2Ygg2YHZiNix2YjYp9ix2K8g2YHZiNix24wg2Lnaqdiz4oCM2YfYpyDZiCDZiNuM2K/bjNmI2YfYp9uMINmF2K3ZiNi02YjZhtiv2Ycg2Ygg2KrYp9uM2YXYsdiv2KfYsSDYqtmE2q/Ysdin2YUg2b7bjNi0INin2LIg2LPZiNiu2KrZhiDbjNinINmG2KfZvtiv24zYryDYtNiv2YYg2KjYpyDYrdiv2Kfaqdir2LEg2qnbjNmB24zYqiDYp9i12YTbjC4iOiJEb3dubG9hZCBhbmQgYXJjaGl2ZSBkaXNhcHBlYXJpbmcgdmlldy1vbmNlIG1lZGlhIGJlZm9yZSBleHBpcmF0aW9uIGluIHVuY29tcHJlc3NlZCBvcmlnaW5hbCBxdWFsaXR5LiIsItit2KfZhNiqINix2YjYrSDZiCDZhtin2YXYsdim24wgKEdob3N0IE1vZGUpIjoiR2hvc3QgJiBTdGVhbHRoIE1vZGUiLCLZhdi02KfZh9iv2Ycg2KjYr9mI2YYg2KrbjNqpINiv2YjZhSI6IlNpbGVudCBSZWFkIFdpdGhvdXQgU2VlbiBTdGF0dXMiLCLZhdi02KfZh9iv2Ycg2Ygg2YXYsdmI2LEg2b7bjNin2YXigIzZh9in24wg2K/YsduM2KfZgdiq24wg2KjYr9mI2YYg2LPbjNmGINiu2YjYsdiv2YYg2KjYpyDYp9mF2qnYp9mGINmB2LnYp9mE4oCM2LPYp9iy24wg2KfYsiDZvtmG2YQg24zYpyDYr9iz2KrZiNixINiq2YTar9ix2KfZhduMIjoiQnJvd3NlIGluY29taW5nIHByaXZhdGUgbWVzc2FnZXMgd2l0aG91dCB0cmlnZ2VyaW5nIHNlZW4gY2hlY2ttYXJrcywgdG9nZ2xlYWJsZSB2aWEgcGFuZWwgb3IgaW4tY2hhdCBjb21tYW5kcyIsItmIIjoiYW5kIiwi2YXYr9uM2LHbjNiqINiz2qnZiNiqINmIINmB24zZhNiq2LEgKE11dGUpIjoiU2lsZW5jZSBGaWx0ZXIgJiBBdXRvLVB1cmdlIiwi2b7Yp9qp2LPYp9iy24wg2K/ZiNi32LHZgdmHINqG2KoiOiJUd28tV2F5IEluc3RhbnQgTWVzc2FnZSBQdXJnZSIsItmF2LPYr9mI2K/Ys9in2LLbjCDZiCDYrdiw2YEg2K7ZiNiv2qnYp9ixINmIINii2YbbjCDZvtuM2KfZheKAjNmH2KfbjCDaqdin2LHYqNix2KfZhiDZhdiy2KfYrdmFINio2Kcg2K/Ys9iq2YjYsSDYqtmE2q/Ysdin2YXbjCI6Ikluc3RhbnRseSBwdXJnZSBpbmNvbWluZyBtZXNzYWdlcyBmcm9tIHVud2FudGVkIHNlbmRlcnMgZm9yIGJvdGggcGFydGllcyB1c2luZyBUZWxlZ3JhbSBjb21tYW5kIiwi2Ygg2YXYr9uM2LHbjNiqINuM2qnZvtin2LHahtmHINin2LIg2LfYsduM2YIg2b7ZhtmELiI6Im9yIHRoZSB3ZWIgcGFuZWwuIiwi2K3Yp9mE2Kog2K7ZiNin2Kgg2LTYqNin2YbZhyAoU2xlZXAgTW9kZSkiOiJOaWdodCBTbGVlcCBBdXRvbWF0aW9uIiwi2KfYqtmI2YXYp9iz24zZiNmGINin2LPYqtix2KfYrdiqIjoiUmVzdCBIb3VycyBBdXRvbWF0aW9uIiwi2KrYutuM24zYsSDYrtmI2K/aqdin2LEg2YbYp9mFINiu2KfZhtmI2KfYr9qv24wg2KjZhyDYrdin2YTYqiDYp9iz2KrYsdin2K3YqiDZiCDYqNmHINiq2LnZiNuM2YIg2KfZhtiv2KfYrtiq2YYg2b7bjNin2YXigIzZh9inINiv2LEg2LPYp9i52KfYqiDZhdi02K7YtSDYtNio2KfZhtmHINio2Ycg2LXZiNix2Kog2KfYqtmI2YXYp9iq24zaqS4iOiJBdXRvbWF0aWNhbGx5IGFwcGVuZCBzbGVlcCBpbmRpY2F0b3IgdG8geW91ciBwcm9maWxlIG5hbWUgYW5kIGRlZmVyIG5vdGlmaWNhdGlvbnMgZHVyaW5nIGNvbmZpZ3VyZWQgcmVzdCBob3Vycy4iLCLYqtin24zbjNivINiv2YjZhdix2K3ZhNmH4oCM2KfbjCAoR29vZ2xlIDJGQSkiOiJUd28tRmFjdG9yIEF1dGggKEdvb2dsZSAyRkEpIiwi2KfYs9iq2KfZhtiv2KfYsdivIFRPVFAgUkZDIDYyMzgiOiJSRkMgNjIzOCBUT1RQIFN0YW5kYXJkIiwi2YXYrdin2YHYuNiqINmG2YHZiNiw2YbYp9m+2LDbjNixINin2LIg2K3Ys9in2Kgg2b7ZhtmEINqp2KfYsdio2LHbjCDYqNinIEdvb2dsZSBBdXRoZW50aWNhdG9y2Iwg2LHZhdiyINmF2YjZgtiqINu2INix2YLZhduMINmIINu4INqp2K8g2KjYp9iy24zYp9io24wg2KfYtti32LHYp9ix24wuIjoiQnVsbGV0cHJvb2YgYWNjb3VudCBwcm90ZWN0aW9uIHVzaW5nIEdvb2dsZSBBdXRoZW50aWNhdG9yLCAzMHMgcm90YXRpbmcgdG9rZW5zLCBhbmQgOCBkaXNhc3RlciByZWNvdmVyeSBiYWNrdXAgY29kZXMuIiwi2K/Zgdin2Lkg2YHYudin2YQg2YfYp9mG24zigIzZvtin2KogKEhvbmV5cG90KSI6IkFjdGl2ZSBaZXJvLVRydXN0IEhvbmV5cG90Iiwi2KrZhNmHINin2YXZhtuM2KrbjCDZiCDYqNmE2KfaqSBJUCI6IkRlY295IFRyYXBzICYgQXV0byBJUCBCYW5zIiwi2qnYtNmBINmIINmF2YfYp9ixINin2LPaqdmG2LHZh9in24wg2YXYrtix2Kgg2LHZiNuMINix2YjYquKAjNmH2KfbjCDYrdiz2KfYs9iMINmF2LPYr9mI2K/Ys9in2LLbjCDYotmG24wgSVAg2YbZgdmI2LDar9ixINmIINin2LHYs9in2YQg2q/Ystin2LHYtCDYrdmF2YTZhyDYqNmHINix2KjYp9iqINiq2YTar9ix2KfZhS4iOiJEZXRlY3QgYW5kIGJhbiB2dWxuZXJhYmlsaXR5IHNjYW5uZXJzIG9uIHNlbnNpdGl2ZSBwYXRocywgaW5zdGFudGx5IGJsYWNrbGlzdGluZyBob3N0aWxlIElQcyBhbmQgYWxhcm1pbmcgeW91ciBib3QuIiwi2YjbjNiy2KfYsdivINix2KfZh+KAjNin2YbYr9in2LLbjCDYqtit2Kog2YjYqCAoL3NldHVwKSI6IldlYiBTZXR1cCBXaXphcmQgKC9zZXR1cCkiLCLYqNiv2YjZhiDaqdiv2YbZiNuM2LPbjCI6Ilplcm8gQ29kaW5nIFJlcXVpcmVkIiwi2LHYp9mH2YbZhdin24wg2KzYp9mF2Lkg2KrYudin2YXZhNuMINu1INmF2LHYrdmE2YfigIzYp9uMINio2LHYp9uMINiv2LHbjNin2YHYqiBBUEkg2qnZhNuM2K/Zh9in2Iwg2KfbjNis2KfYryDYs9i02YYg2KrZhNqv2LHYp9mFINmIINix2KfZh+KAjNin2YbYr9in2LLbjCDYotiz2KfZhiDZiCDYqNiv2YjZhiDYqtix2YXbjNmG2KfZhC4iOiJTdGVwLWJ5LXN0ZXAgaW50ZXJhY3RpdmUgNS1zdGFnZSBsYXVuY2hlciB0byBnZW5lcmF0ZSBrZXlzLCB0ZXN0IGJvdCB0b2tlbnMsIGFuZCBkZXBsb3kgd2l0aG91dCB0ZXJtaW5hbCBza2lsbHMuIiwi2LPbjNiz2KrZhSDYp9ix2KrZgtinINio2Ycg2YXYr9uM2LEgKFJvbGUgU3lzdGVtKSI6IlJvbGUgTWFuYWdlbWVudCAmIFByb21vdGlvbiIsItin2LHYqtmC2KcgLyDYqtmG2LLZhCDYotmG24wiOiJJbnN0YW50IFByb21vdGUgLyBEZW1vdGUiLCLYp9mF2qnYp9mGINin2LHYqtmC2KfbjCDZhdiz2KrZgtuM2YUg2qnYp9ix2KjYsdin2YYg2KjZhyDZhdiv24zYsSDYs9uM2LPYqtmFINuM2Kcg2KrZhtiy2YQg2KjZhyDaqdin2LHYqNixINi52KfYr9uMINiv2LEg2KzYr9mI2YQg2qnYp9ix2KjYsdin2YYg2Ygg2b7ZhtmEINio2KfYstix2LMg2KjYpyDYqtin24zbjNivINin2YXZhtuM2KrbjC4iOiJQcm9tb3RlIHVzZXJzIHRvIEFkbWluaXN0cmF0b3Igb3IgZGVtb3RlIHRvIHN0YW5kYXJkIHN1YnNjcmliZXIgd2l0aCBpbnN0YW50IHBlcm1pc3Npb24gc3luYy4iLCLYr9in2LTYqNmI2LHYryDZhdin2YbbjNiq2YjYsduM2YbaryAoL2FkbWluKSI6IkFkbWluIENvbW1hbmQgQ2VudGVyICgvYWRtaW4pIiwi2LHZiNiqINmF2LPYqtmC2YQg2Ygg2KfZhdmGIjoiRGVkaWNhdGVkIFNlY3VyZSBSb3V0ZSIsItmF2LTYp9mH2K/ZhyDYotmF2KfYsdmH2KfbjCDYstmG2K/ZhyDYr9uM2KrYp9io24zYs9iMINmG2LHYriDYsdin24zYquKAjNmH2KfYjCDYs9i02YbigIzZh9in24wg2YHYudin2YTYjCDYrti32KfZh9in24wg2KvYqNiq4oCM2LTYr9mHINmIINmI2LbYuduM2Kog2LHYqNin2KrigIzZh9in24wg2qnZhdqp24wg2K/YsSDYtdmB2K3ZhyDZhdis2LLYpy4iOiJSZWFsLXRpbWUgZGF0YWJhc2UgYW5hbHl0aWNzLCBhY3RpdmUgc2Vzc2lvbnMsIGVycm9yIHRlbGVtZXRyeSwgYW5kIGhlbHBlciBib3Qgc3RhdHVzIG9uIGFuIGlzb2xhdGVkIGFkbWluIGRhc2hib2FyZC4iLCLZhdmI2KrZiNixINiw2K7bjNix2YfigIzYs9in2LLbjCDZh9uM2KjYsduM2K8gRDEgKyBLViI6Ikh5YnJpZCBTdG9yYWdlIEVuZ2luZSAoRDEgKyBLVikiLCLbsduw27As27DbsNuwINix2KfbjNiqIEQxINix2YjYstin2YbZhyI6IjEwMCwwMDAgRnJlZSBEYWlseSBEMSBXcml0ZXMiLCLYqNmH2LHZh+KAjNqv24zYsduMINmH2YXYstmF2KfZhiDYp9iyIENsb3VkZmxhcmUgRDEg2YggS1Yg2YfZhdix2KfZhyDYqNinINqp2LQg2LHZhSDZh9mI2LTZhdmG2K8g2KzZh9iqINio2Ycg2LXZgdixINix2LPYp9mG2K/ZhiDYp9iz2KrZh9mE2KfaqSDYr9uM2KrYp9io24zYsyDYqNiv2YjZhiDZhdi12LHZgSDYp9i22KfZgdmHLiI6IkNvbWJpbmVzIENsb3VkZmxhcmUgRDEgYW5kIEtWIHdpdGggaW50ZWxsaWdlbnQgUkFNIGNhY2hpbmcgdG8gZWxpbWluYXRlIHJlZHVuZGFudCBkYXRhYmFzZSBxdW90YSB3ZWFyLiIsItin2YbYqNin2LEg2YTYp9uM2LPZhtizINmIINix2K/bjNmF4oCM2qnYryAoTGljZW5zZSBWYXVsdCkiOiJMaWNlbnNlIEtleSBJbnZlbnRvcnkgVmF1bHQiLCLZhdiv24zYsduM2Kog2KfYudiq2KjYp9ixINmIINiq2KfYsduM2K4g2KfZhtmC2LbYpyI6IlN1YnNjcmlwdGlvbiAmIEV4cGlyeSBUcmFja2luZyIsItiq2YjZhNuM2K/YjCDYp9io2LfYp9mEINmIINix2LXYryDaqdiv2YfYp9uMINin2LTYqtix2KfaqSDZhdiv2KrigIzYr9in2LEg2KjYpyDZgdix2YXYqiDYp9iz2KrYp9mG2K/Yp9ix2K8gQVJJWk8tWFhYWNiMINiq2K7YtduM2LUg2YXYs9iq2YLbjNmFINio2Ycg2qnYp9ix2KjYsdin2YYg2Ygg2YXYr9uM2LHbjNiqINmF2KfZhNuMINin2LTYqtix2KfaqeKAjNmH2KcuIjoiR2VuZXJhdGUsIHJldm9rZSwgYW5kIHRyYWNrIHN0YW5kYXJkaXplZCBBUklaTy1YWFhYIGxpY2Vuc2Uga2V5cywgYXNzaWduaW5nIHBsYW4gdGllcnMgYW5kIG1hbmFnaW5nIHN1YnNjcmlwdGlvbnMuIiwi2YXbjNmG24wg2KfZvtmE24zaqduM2LTZhiDYqtmE2q/Ysdin2YUgKFRlbGVncmFtIFdlYkFwcCkiOiJUZWxlZ3JhbSBNaW5pIEFwcCAoV2ViQXBwKSIsItmI2LHZiNivINmF2LPYqtmC24zZhSBTU08iOiJTZWFtbGVzcyBTU08gQXV0aGVudGljYXRpb24iLCLYr9iz2KrYsdiz24wg2KrZhdin2YXigIzYuduM2KfYsSDZiCDZhdiv24zYsduM2Kog2LPZhNmB4oCM2KjYp9iqINmF2LPYqtmC24zZhdin2Ysg2KfYsiDYr9ix2YjZhiDZhdit24zYtyDYqtmE2q/Ysdin2YUg2KjYpyDZiNix2YjYryDYrtmI2K/aqdin2LEg2KfZhdmGINmIINmH2YXYp9mH2Ybar9uMINqp2KfZhdmEINio2Kcg2KrZhSDYqtmE2q/Ysdin2YUuIjoiRnVsbC1mZWF0dXJlZCBzZWxmYm90IG1hbmFnZW1lbnQgcmlnaHQgaW5zaWRlIFRlbGVncmFtIHdpdGggYXV0b21hdGljIHNpbmdsZS1zaWduLW9uIGFuZCB0aGVtZSBtYXRjaGluZy4iLCLYudiv2YUg2YbZhdin24zYtCDYrtmI2K/aqdin2LEg2K/YsSDYr9mB2LnYp9iqINio2LnYr9uMIjoiRG8gbm90IHNob3cgYXV0b21hdGljYWxseSBhZ2FpbiIsItmI24zYstin2LHYryDYsdin2YfigIzYp9mG2K/Yp9iy24wgKC9zZXR1cCkiOiJTZXR1cCBXaXphcmQgKC9zZXR1cCkiLCLYqNiz2KrZhiI6IkNsb3NlIiwi2YjYsdmI2K8g2KjZhyDYp9iz2KrZiNiv24zZiCI6IkVudGVyIFN0dWRpbyIsIuKame+4jyDYqtmG2LjbjNmF2KfYqiDZiCDYp9mF2YbbjNiqINit2LPYp9ioIEFyaXpvIFNlbGYiOiLimpnvuI8gQWNjb3VudCBTZXR0aW5ncyAmIFNlY3VyaXR5Iiwi2KrZhti424zZhdin2Kog2Ygg2YXYr9uM2LHbjNiqINit2LPYp9ioINqp2KfYsdio2LHbjCI6IkFjY291bnQgU2V0dGluZ3MgJiBNYW5hZ2VtZW50Iiwi8J+On++4jyDYqtmF2K/bjNivINin2LnYqtio2KfYsSDYqNinINix2K/bjNmF4oCM2qnYryDYrNiv24zYryBBcml6byI6IvCfjp/vuI8gRXh0ZW5kIFN1YnNjcmlwdGlvbiB3aXRoIExpY2Vuc2UgS2V5Iiwi2KrZhdiv24zYryDZiCDYp9ix2KrZgtin24wg2KfYtNiq2LHYp9qpINio2Kcg2YTYp9uM2LPZhtizIjoiRXh0ZW5kIFN1YnNjcmlwdGlvbiB3aXRoIExpY2Vuc2UiLCLYqtmF2K/bjNivINmIINi02KfYsdqYINin2LTYqtix2KfaqSI6IkFwcGx5ICYgRXh0ZW5kIFN1YnNjcmlwdGlvbiIsItir2KjYqiDZiCDYqtmF2K/bjNivINin2LTYqtix2KfaqSI6IkFwcGx5ICYgRXh0ZW5kIiwi8J+UkSDYqti624zbjNixINix2YXYsiDYudio2YjYsSDZiNix2YjYryI6IvCflJEgQ2hhbmdlIEFjY291bnQgUGFzc3dvcmQiLCLYqti624zbjNixINix2YXYsiDYudio2YjYsSDZiNix2YjYryDYqNmHINm+2YbZhCI6IkNoYW5nZSBBY2NvdW50IFBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINmB2LnZhNuMIjoiQ3VycmVudCBQYXNzd29yZCIsItix2YXYsiDYudio2YjYsSDYrNiv24zYryAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJOZXcgUGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsItix2YXYsiDYudio2YjYsSDYrNiv24zYryI6Ik5ldyBQYXNzd29yZCIsItir2KjYqiDYsdmF2LIg2LnYqNmI2LEg2KzYr9uM2K8iOiJVcGRhdGUgUGFzc3dvcmQiLCLYqNix2YjYstix2LPYp9mG24wg2LHZhdiyINi52KjZiNixIjoiVXBkYXRlIFBhc3N3b3JkIiwi8J+UjCDZgti32Lkg2KfYqti12KfZhCDYrdiz2KfYqCDYqtmE2q/Ysdin2YUiOiLwn5SMIERpc2Nvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCIsItmC2LfYuSDYp9iq2LXYp9mEINiz2LTZhiDYqtmE2q/Ysdin2YUiOiJEaXNjb25uZWN0IFRlbGVncmFtIFNlc3Npb24iLCLwn5eR77iPINit2LDZgSDaqdin2YXZhCDYrdiz2KfYqCDaqdin2LHYqNix24wg2Ygg2KrZhdin2YUg2K/Yp9iv2YfigIzZh9inIjoi8J+Xke+4jyBQZXJtYW5lbnRseSBEZWxldGUgQWNjb3VudCAmIEFsbCBEYXRhIiwi2K3YsNmBINiv2KfYptmF24wg2K3Ys9in2Kgg2qnYp9ix2KjYsduMIjoiUGVybWFuZW50bHkgRGVsZXRlIEFjY291bnQiLCLYq9io2KrigIzZhtin2YU6IjoiUmVnaXN0ZXJlZDoiLCLaqdivINmE2KfbjNiz2YbYszoiOiJMaWNlbnNlIENvZGU6Iiwi8J+SoSDYqtmF2KfZhduMINiq2LrbjNuM2LHYp9iqINio2YTYp9mB2KfYtdmE2Ycg2K/YsSDYrdin2YHYuNmHIEVkZ2UgQ2xvdWRmbGFyZSDYsNiu24zYsdmHINmIINin2LnZhdin2YQg2YXbjOKAjNqv2LHYr9mG2K8uIjoi8J+SoSBBbGwgY2hhbmdlcyBhcmUgaW1tZWRpYXRlbHkgc3RvcmVkIGFuZCBwcm9wYWdhdGVkIGFjcm9zcyBDbG91ZGZsYXJlIEVkZ2UuIiwi2KjYs9iq2YYg2b7Zhtis2LHZhyI6IkNsb3NlIFdpbmRvdyIsIlN3aXRjaCBMYW5ndWFnZSAvINiq2LrbjNuM2LEg2LLYqNin2YYiOiJTd2l0Y2ggTGFuZ3VhZ2UgLyDYqti624zbjNixINiy2KjYp9mGIiwi2KrYutuM24zYsSDYrdin2YTYqiDYtNioINmIINix2YjYsiI6IlRvZ2dsZSBEYXJrIC8gTGlnaHQgTW9kZSIsItix2KfZh9mG2YXYp9uMINis2KfZhdi5INin2YXaqdin2YbYp9iqINmIINiz2LHZiNuM2LPigIzZh9in24wg2LPYp9mF2KfZhtmHIEFyaXpvIFNlbGYiOiJBcml6byBTZWxmIENvbXBsZXRlIEZlYXR1cmUgVG91ciAmIFNlcnZpY2UgR3VpZGUiLCLZiNix2YjYryDYqNmHINm+2YbZhCDZhdiv24zYsduM2Kog2KfYsdi02K8g2Ygg2YXYp9mG24zYqtmI2LHbjNmG2q8iOiJFbnRlciBBZG1pbiBDb21tYW5kIENlbnRlciAmIE1vbml0b3JpbmciLCLYqtmG2LjbjNmF2KfYqiDYrdiz2KfYqCI6IkFjY291bnQgU2V0dGluZ3MiLCLYrtix2YjYrCI6IlNpZ24gT3V0Iiwi2K7YsdmI2Kwg2KfYsiDYrdiz2KfYqCI6IlNpZ24gT3V0Iiwi2YXYq9in2YQ6INux27UgKNiq2LnYr9in2K8g2LHZiNiyINin2LnYqtio2KfYsSDZhNin24zYs9mG2LMpIjoiZS5nLiAxNSAoVmFsaWRpdHkgZGF5cykiLCLwn5SNINis2LPYqtis2Ygg2KjYsSDYp9iz2KfYsyDZhtin2YUg2qnYp9ix2KjYsduM2Iwg2LTZhtin2LPZhyDYqtmE2q/Ysdin2YUg24zYpyDYsdio2KfYqi4uLiI6IvCflI0gU2VhcmNoIGJ5IHVzZXJuYW1lLCBUZWxlZ3JhbSBJRCBvciBib3QuLi4iLCLYp9ix2KrZgtin24wg24zaqSDaqdin2LHYqNixINio2Ycg2YXYr9uM2LEg2LPYp9mF2KfZhtmHIjoiUHJvbW90ZSBhIHVzZXIgdG8gc3lzdGVtIGFkbWluaXN0cmF0b3IiLCLYqtin2LLZh+KAjNiz2KfYstuMINmE24zYs9iqIjoiUmVmcmVzaCBEaXJlY3RvcnkiLCLZhtin2YUg2qnYp9ix2KjYsduMINi02YXYpyAo2YXYq9in2YQ6IGFtaXJtYXN0ZXIpIjoiWW91ciB1c2VybmFtZSAoZS5nLiBhbGV4X3ZpcCkiLCLZhtin2YUg2qnYp9ix2KjYsduMINi02YXYpyAo2YXYq9mE2KfZiyBhbGV4X3ZpcCkiOiJZb3VyIHVzZXJuYW1lIChlLmcuIGFsZXhfdmlwKSIsItix2YXYsiDYudio2YjYsSDYrdiz2KfYqCDaqdin2LHYqNix24wgKOKAouKAouKAouKAouKAouKAouKAouKAoikiOiJBY2NvdW50IHBhc3N3b3JkICjigKLigKLigKLigKLigKLigKLigKLigKIpIiwi2LHZhdiyINi52KjZiNixINit2LPYp9ioIjoiQWNjb3VudCBwYXNzd29yZCIsItqp2K8g2YTYp9uM2LPZhtizINmB2LnYp9mE4oCM2LPYp9iy24wgKNmF2KvYp9mEOiBBUklaTy1YWFhYLVhYWFgtWFhYWCkiOiJBY3RpdmF0aW9uIGxpY2Vuc2Uga2V5IChlLmcuIEFSSVpPLVhYWFgtWFhYWC1YWFhYKSIsItqp2K8g2YTYp9uM2LPZhtizINiu2LHbjNiv2KfYsduMINi02K/ZhyAoQVJJWk8tWFhYWC1YWFhYLVhYWFgpIjoiTGljZW5zZSBrZXkgKEFSSVpPLVhYWFgtWFhYWC1YWFhYKSIsItmG2KfZhSDaqdin2LHYqNix24wg2K/ZhNiu2YjYp9mHICjZhdir2KfZhDogYW1pcl92aXApIjoiRGVzaXJlZCB1c2VybmFtZSAoZS5nLiBhbGV4X3ZpcCkiLCLZhtin2YUg2qnYp9ix2KjYsduMINiv2YTYrtmI2KfZhyAo2K3YsdmI2YEg2KfZhtqv2YTbjNiz24wg2Ygg2KfYudiv2KfYrykiOiJDaG9vc2UgdXNlcm5hbWUgKGFscGhhbnVtZXJpYykiLCLYsdmF2LIg2LnYqNmI2LEg2KfZhdmGINmIINmC2YjbjCAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJTdHJvbmcgUGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsItit2K/Yp9mC2YQg27gg2qnYp9ix2Kfaqdiq2LEiOiJBdCBsZWFzdCA4IGNoYXJhY3RlcnMiLCLYqtqp2LHYp9ixINmF2KzYr9ivINix2YXYsiDYudio2YjYsSDYrNmH2Kog2KfYt9mF24zZhtin2YYiOiJSZS1lbnRlciB5b3VyIHBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINix2Kcg2YXYrNiv2K/Yp9mLINmI2KfYsdivINmG2YXYp9uM24zYryI6IlJlLWVudGVyIHlvdXIgcGFzc3dvcmQiLCLaqdivINmE2KfbjNiz2YbYsyDYrNiv24zYryDYrNmH2Kog2K7YsdmI2Kwg2KfYsiDYqti52YTbjNmCICjZhdir2KfZhDogQVJJWk8tWFhYWC1YWFhYLVhYWFgpIjoiUmVuZXdhbCBsaWNlbnNlIGtleSAoZS5nLiBBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLZhNin24zYs9mG2LMg2YHYudin2YTigIzYs9in2LLbjCDYrNiv24zYry4uLiI6Ik5ldyByZW5ld2FsIGxpY2Vuc2Uga2V5Li4uIiwi2LTZhdin2LHZhyDZh9mF2LHYp9mHINio2Kcg2b7bjNi04oCM2LTZhdin2LHZhyDaqdi02YjYsSAo2YXYq9in2YQ6IDk4OTEyMzQ1Njc4OSspIjoiUGhvbmUgbnVtYmVyIHdpdGggY291bnRyeSBjb2RlIChlLmcuICsxNDE1NTU1MjY3MSkiLCIrOTg5MTIzNDU2Nzg5INuM2KcgKzE0MTU1NTUyNjcxIjoiKzE0MTU1NTUyNjcxIG9yICs5ODkxMjM0NTY3ODkiLCLaqdivINu1INix2YLZhduMINin2LHYs9in2YTbjCDYp9iyINiq2YTar9ix2KfZhSAo2YXYq9in2YQ6IDU4MjkxKSI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUgKGUuZy4gNTgyOTEpIiwi2qnYryDbtSDYsdmC2YXbjCDYr9ix24zYp9mB2KrbjCI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUiLCLYsdmF2LIg2KrYo9uM24zYryDYr9mI2YXYsdit2YTZh+KAjNin24wgKNiv2LEg2LXZiNix2Kog2YHYudin2YQg2KjZiNiv2YYgMkZBKSI6IjJGQSBQYXNzd29yZCAoaWYgZW5hYmxlZCBvbiBhY2NvdW50KSIsItiv2LEg2LXZiNix2Kog2K/Yp9i02KrZhiDYsdmF2LIg2K/ZiCDZhdix2K3ZhNmH4oCM2KfbjCDZiNin2LHYryDaqdmG24zYryI6IkVudGVyIDJGQSBwYXNzd29yZCBpZiBlbmFibGVkIiwi2LHYtNiq2Ycg2LfZiNmE2KfZhtuMIFN0cmluZ1Nlc3Npb24g2KrZhNqv2LHYp9mFINiu2YjYryDYsdinINin24zZhtis2Kcg2YjYp9ix2K8g2qnZhtuM2K8gKFB5cm9ncmFtINuM2KcgVGVsZXRob24vR3JhbUpTKS4uLiI6IlBhc3RlIHlvdXIgVGVsZWdyYW0gU3RyaW5nU2Vzc2lvbiBoZXJlIChQeXJvZ3JhbSBvciBUZWxldGhvbi9HcmFtSlMpLi4uIiwiMUJKV2FwMXdCLi4uINuM2KcgMUFwV2FwLi4uIjoiMUJKV2FwMXdCLi4uIG9yIDFBcFdhcC4uLiIsItm+24zYtNmI2YbYryDYs9in2LnYqiAo2YXYq9mE2KfZizogWyDbjNinIHwg24zYpyDimqEpIjoiQ2xvY2sgcHJlZml4IChlLmcuIFsgb3IgfCBvciDimqEpIiwi2b7Ys9mI2YbYryDYs9in2LnYqiAo2YXYq9mE2KfZizogXSDbjNinIOKaoSDbjNinIFZJUCkiOiJDbG9jayBzdWZmaXggKGUuZy4gXSBvciDimqEgb3IgVklQKSIsItux27Ag2LHZgtmFINiv2YTYrtmI2KfZhyDYp9iyINuwINiq2Kcg27kg2KjZhyDYqtix2KrbjNioICjZhdir2KfZhDog27Dbsduy27PbtNu127bbt9u427kpIjoiMTAgY3VzdG9tIGRpZ2l0cyBmcm9tIDAgdG8gOSAoZS5nLiAwMTIzNDU2Nzg5KSIsItmC2KfZhNioINio24zZiNqv2LHYp9mB24wgKNmF2KvYp9mEOiDij7Mge3RpbWV9IHwg8J+ThSB7ZGF0ZX0gfCDimqEgQXJpem8gUHJvKSI6IkJpbyB0ZW1wbGF0ZSAoZS5nLiDij7Mge3RpbWV9IHwg8J+ThSB7ZGF0ZX0gfCDimqEgQXJpem8gUHJvKSIsItmF2KrZhiDZvtin2LPYriDYrtmI2K/aqdin2LEg2YXZhti024wgKNmF2KvYp9mEOiDYr9ix2YjYryEg2K/YsSDYrdin2YQg2K3Yp9i22LEg2KfZhdqp2KfZhiDZvtin2LPYrtqv2YjbjNuMINmG2K/Yp9ix2YUuINio2Ycg2YXYrdi2INii2YbZhNin24zZhiDYtNiv2YYg2b7Yp9iz2K4g2K7ZiNin2YfZhSDYr9in2K8g4o+zKSI6IkF3YXkgcmVwbHkgdGV4dCAoZS5nLiBIZWxsbyEgQ3VycmVudGx5IGF3YXksIHdpbGwgcmVwbHkgYXMgc29vbiBhcyBvbmxpbmUg4o+zKSIsItii24zYr9uM4oCM2YfYp9uMINi52K/Yr9uMINuM2Kcg24zZiNiy2LHZhtuM2YXigIzZh9in24wg2KrZhNqv2LHYp9mFINio2Kcg2qnYp9mF2KcgKNmF2KvYp9mEOiAxMjM0NTY3ODksIEB1c2VybmFtZSwgOTg3NjU0MzIxKSI6IlRlbGVncmFtIElEcyBvciB1c2VybmFtZXMgc2VwYXJhdGVkIGJ5IGNvbW1hIChlLmcuIDEyMzQ1Njc4OSwgQHVzZXIpIiwi2YXYqtmGINmG2KfZhSDYrtin2YbZiNin2K/ar9uMINiv2LEg2K7ZiNin2KggKNmF2KvYp9mEOiDwn5i0IFNsZWVwINuM2Kcg8J+MmSDYrtmI2KfYqNuM2K/ZhSkiOiJTbGVlcCBzdGF0dXMgbmFtZSB0ZXh0IChlLmcuIPCfmLQgU2xlZXApIiwi2KLbjNiv24wg2LnYr9iv24wg24zYpyDbjNmI2LLYsdmG24zZhSDYp9mB2LHYp9iv24wg2qnZhyDZhduM4oCM2K7ZiNin24zYryDYqtuM2qkg2KLYqNuMINio2LHYp9uM2LTZiNmGINmB2LnYp9mEINio2YXZiNmG2YcgKNio2Kcg2qnYp9mF2Kcg2KzYr9inINqp2YbbjNivKSI6IlRlbGVncmFtIElEcy91c2VybmFtZXMgZXhlbXB0IGZyb20gR2hvc3QgTW9kZSAoY29tbWEgc2VwYXJhdGVkKSIsItqp2YTbjNivIEFQSSDYrtmI2K8g2LHYpyDYp9iyINm+2YbZhCBHZW1pbmkg24zYpyBPcGVuQUkg2K/YsduM2KfZgdiqINmIINin24zZhtis2Kcg2YjYp9ix2K8g2qnZhtuM2K8iOiJQYXN0ZSB5b3VyIEdvb2dsZSBHZW1pbmkgb3IgT3BlbkFJIEFQSSBLZXkgaGVyZSIsItmG2YXYp9uM2LQgLyDZhdiu2YHbjOKAjNiz2KfYstuMINqp2YTbjNivIjoiU2hvdyAvIEhpZGUgS2V5Iiwi2KjZhyBBSSDYqNqv2YjbjNuM2K8g2obYt9mI2LEg2LHZgdiq2KfYsSDaqdmG2YcgKNmF2KvZhNin2Ys6INmF2KTYr9io2KfZhtmHINmIINix2LPZhduMINm+2KfYs9iuINio2K/Zh9iMINin2LIg2KfYt9mE2KfYudin2Kog2K7YtdmI2LXbjCDYtdit2KjYqiDZhtqp2YbZhykiOiJJbnN0cnVjdCBBSSBwZXJzb25hbGl0eSAoZS5nLiBSZXBseSBwb2xpdGVseSBhbmQgZm9ybWFsbHksIGtlZXAgYW5zd2VycyBjb25jaXNlKSIsItin2LfZhNin2LnYp9iq24wg2qnZhyBBSSDYp9is2KfYstmHINiv2KfYsdmHINio2q/ZhyAo2YXYq9mE2KfZizog2LPYp9i52Kog2qnYp9ix24wg2YXZhiDbuSDYqtinINu1INmH2LPYqtiMINio2LHZhtin2YXZh+KAjNmG2YjbjNizINmH2LPYqtmFKSI6IkNvbnRleHQgZmFjdHMgZm9yIEFJIChlLmcuIE15IHdvcmtpbmcgaG91cnMgYXJlIDkgdG8gNSwgSSBhbSBhIGRldmVsb3BlcikiLCLYqtmI2qnZhiDYsdio2KfYqiDYr9ix24zYp9mB2KrbjCDYp9iyIEJvdEZhdGhlckAgKNmF2KvYp9mEOiAxMjM0NTY3ODk6QUJDZGVmR2hJSktsbU5vUFFSc1RVVnd4eVopIjoiQm90IHRva2VuIGZyb20gQEJvdEZhdGhlciAoZS5nLiAxMjM0NTY3ODk6QUJDZGVmR2hJSktsbU5vUFFSc1RVVnd4eVopIiwi2KrZhti424zZhSDbjNinINiq2LrbjNuM2LEg2K/Ys9iq24wg2LTZhtin2LPZhyDYqtmE2q/Ysdin2YUg2YXYrNin2LIiOiJNYW51YWxseSBTZXQgQXV0aG9yaXplZCBUZWxlZ3JhbSBPd25lciBJRCIsItqp2YTbjNivINiv2LPYqtuMIjoiTWFudWFsIEtleSIsItmF2KvYp9mEOiAxMjM0NTYiOiJlLmcuIDEyMzQ1NiIsItix2YXYsiDYudio2YjYsSDYrdiz2KfYqCDYqNix2KfbjCDYsdmF2LLZhtqv2KfYsduMINmB2KfbjNmEIjoiQWNjb3VudCBwYXNzd29yZCB1c2VkIHRvIGVuY3J5cHQgYmFja3VwIiwi2LHZhdiyINi52KjZiNixINin2LPYqtmB2KfYr9mHINi02K/ZhyDZh9mG2q/Yp9mFINio2qnYp9m+IjoiUGFzc3dvcmQgdXNlZCB3aGVuIGJhY2t1cCB3YXMgY3JlYXRlZCIsItqp2K8g2YTYp9uM2LPZhtizINiq2YXYr9uM2K8gKNmF2KvYp9mEOiBBUklaTy1YWFhYLVhYWFgtWFhYWCkiOiJSZW5ld2FsIExpY2Vuc2UgS2V5IChBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLaqdivINmE2KfbjNiz2YbYsyDYqtmF2K/bjNivIChBUklaTy1YWFhYLVhYWFgtWFhYWCkiOiJSZW5ld2FsIExpY2Vuc2UgS2V5IChBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLYsdmF2LIg2LnYqNmI2LEg2YHYudmE24wg2K3Ys9in2Kgg2LTZhdinIjoiWW91ciBjdXJyZW50IGFjY291bnQgcGFzc3dvcmQiLCLYsdmF2LIg2LnYqNmI2LEg2YHYudmE24wg2K7ZiNivINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8iOiJFbnRlciBjdXJyZW50IHBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINis2K/bjNivINmIINin2YXZhiAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJOZXcgc2VjdXJlIHBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLwn5qAINmI24zYstin2LHYryDYsdin2YfigIzYp9mG2K/Yp9iy24wg2YfZiNi02YXZhtivINmIINqv2KfZheKAjNio2YfigIzar9in2YUgfCBBcml6byBTZWxmIHYzLjYuMCBQUk8iOiLwn5qAIEludGVyYWN0aXZlIFN0ZXAtYnktU3RlcCBTZXR1cCBXaXphcmQgfCBBcml6byBTZWxmIHYzLjYuMCBQUk8iLCLZiNuM2LLYp9ix2K8g2YfZiNi02YXZhtivINmIINiq2LnYp9mF2YTbjCDYs9iq2KfZviDYtNiu2LXbjCDYp9iyINqv24zYquKAjNmH2KfYqCI6IkludGVyYWN0aXZlIEdpdEh1YiBTZXR1cCBXaXphcmQgZm9yIFNlbGZib3QgU3R1ZGlvIiwi2KjYsdix2LPbjCDYs9mE2KfZhdiqINiz2LHZiNixIjoiQ2hlY2sgU2VydmVyIEhlYWx0aCIsItiu2LHZiNis24wg2LPaqdix2KrigIzZh9inIjoiRXhwb3J0IFNlY3JldHMiLCLwn5GRINm+2YbZhCDZhdiv24zYsduM2KoiOiLwn5GRIEFkbWluIFBvcnRhbCIsIvCfmqog2KfYs9iq2YjYr9uM2YgiOiLwn5qqIFN0dWRpbyIsItmF2LHYrdmE2Ycg27Eg2KfYsiDbtTog2q/bjNiq4oCM2YfYp9ioINmIINmG24zYp9iy2YXZhtiv24zigIzZh9inIjoiU3RlcCAxIG9mIDU6IEdpdEh1YiAmIFByZXJlcXVpc2l0ZXMiLCLbstuw2aog2KraqdmF24zZhCDYtNiv2YciOiIyMCUgQ29tcGxldGVkIiwi2q/bjNiq4oCM2YfYp9ioINmIINmB2YjYsdqpIjoiR2l0SHViICYgRm9yayIsItuyIjoiMiIsItqp2YTYp9iv2YHZhNixINmIIEQxIjoiQ2xvdWRmbGFyZSAmIEQxIiwi27MiOiIzIiwi2KrZhNqv2LHYp9mFINmIINix2KjYp9iqIjoiVGVsZWdyYW0gJiBCb3QiLCLbtCI6IjQiLCLYsdin2YbYsSBBY3Rpb25zIjoiQWN0aW9ucyBSdW5uZXIiLCLbtSI6IjUiLCLZiNix2YjYryDZiCDYqtiz2KoiOiJUZXN0ICYgTGF1bmNoIiwi8J+TpSDZhdix2K3ZhNmHINin2YjZhDog2KfZhti02LnYp9ioINm+2LHZiNqY2Ycg2K/YsSDar9uM2KrigIzZh9in2KggKEZvcmspINmIINiv2KfZhtmE2YjYryDYs9mI2LHYsyI6IvCfk6UgU3RlcCAxOiBGb3JrIFByb2plY3Qgb24gR2l0SHViICYgQ2xvbmUgU291cmNlIiwi24zaqSDZhtiz2K7ZhyDZhdiz2KrZgtmEINin2LIg2b7YsdmI2pjZhyDYsdinINiv2LEg2Kfaqdin2YbYqiDar9uM2KrigIzZh9in2Kgg2K7ZiNivINmB2YjYsdqpINqp2YbbjNivLiDYqNinINmI2KfYsdivINqp2LHYr9mGINmG2KfZhSDaqdin2LHYqNix24wg2q/bjNiq4oCM2YfYp9ioINiv2LEg2qnYp9iv2LEg2LLbjNix2Iwg2KrZhdin2YUg2KLYr9ix2LPigIzZh9inINmIINiv2LPYqtmI2LHYp9iqINio2Ycg2YbYp9mFINi02YXYpyDYtNiu2LXbjOKAjNiz2KfYstuMINiu2YjYp9mH2YbYryDYtNivISI6IkZvcmsgYW4gaW5kZXBlbmRlbnQgY29weSBvZiB0aGUgcmVwb3NpdG9yeSBpbnRvIHlvdXIgR2l0SHViIGFjY291bnQuIEVudGVyIHlvdXIgR2l0SHViIHVzZXJuYW1lIGJlbG93IHRvIHBlcnNvbmFsaXplIGFsbCBVUkxzIGFuZCBjb21tYW5kcyBhdXRvbWF0aWNhbGx5ISIsIvCfkaQg2YbYp9mFINqp2KfYsdio2LHbjCDYtNmF2Kcg2K/YsSBHaXRIdWIgKNi02K7YtduM4oCM2LPYp9iy24wg2K7ZiNiv2qnYp9ixINmH2YXZhyDZhNuM2YbaqeKAjNmH2Kcg2Ygg2K/Ys9iq2YjYsdin2KopIjoi8J+RpCBZb3VyIEdpdEh1YiBVc2VybmFtZSAoQXV0by1wZXJzb25hbGl6ZXMgYWxsIGxpbmtzICYgY29tbWFuZHMpIiwi2YfZhtmI2LIg2YjYp9ix2K8g2YbYtNiv2YciOiJOb3QgZW50ZXJlZCB5ZXQiLCLwn420INmB2YjYsdqpINmF2LPYqtmC24zZhSDYr9ixINqv24zYquKAjNmH2KfYqCI6IvCfjbQgRm9yayBEaXJlY3RseSBvbiBHaXRIdWIiLCLwn5KhINio2Kcg2YjYp9ix2K8g2qnYsdiv2YYg24zZiNiy2LHZhtuM2YXYjCDZhNuM2YbaqeKAjNmH2KfbjCDYsduM2b7Yp9iy24zYqtmI2LHbjNiMINii2K/YsdizINiq2YbYuNuM2YUg2LPaqdix2KrigIzZh9inINmIINiv2LPYqtmI2LHYp9iqINqp2YTZiNmGINio2Ycg2LfZiNixINiu2YjYr9qp2KfYsSDYqNix2YjYsiDZhduM4oCM2LTZiNmG2K8uIjoi8J+SoSBFbnRlcmluZyB5b3VyIHVzZXJuYW1lIHVwZGF0ZXMgcmVwb3NpdG9yeSBsaW5rcywgc2VjcmV0cyBzZXR0aW5ncyBVUkwsIGFuZCBjbG9uZSBjb21tYW5kcyBpbnN0YW50bHkuIiwi8J+NtCDYsduM2b7Yp9iy24zYqtmI2LHbjCDYsdiz2YXbjCDZvtix2YjamNmHIjoi8J+NtCBPZmZpY2lhbCBSZXBvc2l0b3J5Iiwi2LPZiNix2LMg2KfYtdmE24wg2LPZhNmB4oCM2KjYp9iqINix2YjbjCDar9uM2KrigIzZh9in2Kgg2YLYsdin2LEg2K/Yp9ix2K8uINio2LHYp9uMINi02LHZiNi5INix2YjbjCDYr9qp2YXZhyDYstuM2LEg2KjYstmG24zYryDZiCDYr9ixINi12YHYrdmHINqv24zYquKAjNmH2KfYqNiMINiv2qnZhdmHIjoiVGhlIHNvdXJjZSByZXBvc2l0b3J5IGlzIGhvc3RlZCBvbiBHaXRIdWIuIENsaWNrIHRoZSBidXR0b24gYmVsb3cgYW5kIG9uIHRoZSBHaXRIdWIgcGFnZSBwcmVzcyIsItix2Kcg2KjZgdi02KfYsduM2K86IjoidG8gZm9yazoiLCLwn5SXINmF2LTYp9mH2K/ZhyDYsduM2b7ZiNuMINmF2LHYrNi5INqv24zYquKAjNmH2KfYqCI6IvCflJcgVmlldyBTb3VyY2Ugb24gR2l0SHViIiwi8J+SuyDZvtuM2LTigIzZhtuM2KfYstmH2KfbjCDZhtix2YXigIzYp9mB2LLYp9ix24wg2LPYp9iv2YciOiLwn5K7IEJhc2ljIFNvZnR3YXJlIFByZXJlcXVpc2l0ZXMiLCLYqtmG2YfYpyDYp9io2LLYp9ix2YfYp9uMINmF2YjYsdivINmG24zYp9iyINio2LHYp9uMINin2LPYqtmB2KfYr9mHOiI6IlRoZSBvbmx5IHByZXJlcXVpc2l0ZXMgcmVxdWlyZWQ6Iiwi2YbYtdioINio2YjYr9mGIjoiSW5zdGFsbGVkIiwiTm9kZS5qcyAxOCDbjNinINio2KfZhNin2KrYsSI6Ik5vZGUuanMgMTggb3IgaGlnaGVyIiwi2LHZiNuMINiz24zYs9iq2YUiOiJvbiB5b3VyIGxvY2FsIHN5c3RlbSIsItuM2qkg2K3Ys9in2Kgg2qnYp9ix2KjYsduMINix2KfbjNqv2KfZhiDYr9ixIjoiQSBmcmVlIGFjY291bnQgb24iLCLbjNqpINin2qnYp9mG2Kog2LHYp9uM2q/Yp9mGINiv2LEiOiJBIGZyZWUgYWNjb3VudCBvbiIsItio2LHYp9uMINix2KfZhtixINiv2KfYptmF24wiOiJmb3IgY29udGludW91cyAyNC83IHJ1bm5lciIsIuKMqO+4jyDYr9ix24zYp9mB2Kog2LPZiNix2LMg2Ygg2YbYtdioINm+2qnbjNis4oCM2YfYpzoiOiLijKjvuI8gQ2xvbmUgU291cmNlICYgSW5zdGFsbCBEZXBlbmRlbmNpZXM6IiwiUG93ZXJTaGVsbCAo2YjbjNmG2K/ZiNiyKSI6IlBvd2VyU2hlbGwgKFdpbmRvd3MpIiwiQmFzaCAo2YXaqSDZiCDZhNuM2YbZiNqp2LMpIjoiQmFzaCAobWFjT1MgJiBMaW51eCkiLCLwn5OLINqp2b7bjCDaqdin2YXZhCDYr9iz2KrZiNixIjoi8J+TiyBDb3B5IENvbW1hbmQiLCLZhdix2K3ZhNmHINio2LnYrzog2qnZhNin2K/ZgdmE2LEg2Ygg2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIEQxIjoiTmV4dCBTdGVwOiBDbG91ZGZsYXJlICYgRDEgRGF0YWJhc2UiLCLar9in2YUg2KjYudiv24w6INiz2KfYrtiqINmI2LHaqdixINmIINiv24zYqtin2KjbjNizINqp2YTYp9iv2YHZhNixIjoiTmV4dCBTdGVwOiBDcmVhdGUgQ2xvdWRmbGFyZSBXb3JrZXIgJiBEMSBEYXRhYmFzZSIsIuKbhSDZhdix2K3ZhNmHINiv2YjZhTog2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIFNRTGl0ZSDYp9io2LHbjCAoRDEpINmIINit2KfZgdi42Ycg2qnZhNin2K/ZgdmE2LEgKEtWKSI6IuKbhSBTdGVwIDI6IFNlcnZlcmxlc3MgU1FMaXRlIERhdGFiYXNlIChEMSkgJiBLViBDYWNoZSIsItm+2LHZiNqY2YcgQXJpem8gU2VsZiDYp9iyINmF2LnZhdin2LHbjCDZvtuM2LTYsdmB2KrZhyDZh9uM2KjYsduM2K/bjCBEMSArIEtWINio2Kcg2LPZgtmBINux27DbsCzbsNuw27Ag2LHYp9uM2Kog2LHYp9uM2q/Yp9mGINiv2LEg2LHZiNiyINin2LPYqtmB2KfYr9mHINmF24zigIzaqdmG2K8uIjoiQXJpem8gU2VsZiB1dGlsaXplcyBhIGhpZ2gtZWZmaWNpZW5jeSBoeWJyaWQgRDEgKyBLViBhcmNoaXRlY3R1cmUgd2l0aCAxMDAsMDAwIGZyZWUgZGFpbHkgd3JpdGVzLiIsIvCfqoQg2KfYs9iq2K7Ysdin2Kwg2KzYp9iv2YjbjNuMINi02YbYp9iz2YfigIzZh9inINin2LIg2YTYp9qvINiq2LHZhduM2YbYp9mEICjYqNiv2YjZhiDZhtuM2KfYsiDYqNmHINm+24zYr9inINqp2LHYr9mGINiv2LPYqtuMIFVVSUQhKSI6IvCfqoQgTWFnaWMgSUQgRXh0cmFjdG9yIGZyb20gVGVybWluYWwgTG9nIChaZXJvIG1hbnVhbCBVVUlEIGh1bnRpbmcpIiwi2YjZgtiq24wg2K/Ys9iq2YjYsdin2Kog2LPYp9iu2KogRDEg24zYpyBLViDYsdinINin2KzYsdinINqp2LHYr9uM2K/YjCDaqdmEINiu2LHZiNis24wg2obYp9m+INi02K/ZhyDYr9ixINiq2LHZhduM2YbYp9mEINix2Kcg2K/YsSDaqdin2K/YsSDYstuM2LEg2b7bjNiz2Kog2qnZhtuM2K8g2KrYpyDYs9uM2LPYqtmFINi02YbYp9iz2YfigIzZh9inINix2Kcg2KjZhyDYtdmI2LHYqiDYrtmI2K/aqdin2LEg2KrYtNiu24zYtSDYr9in2K/ZhyDZiCDZgduM2YTYr9mH2Kcg2LHYpyDZvtixINqp2YbYrzoiOiJQYXN0ZSB0aGUgdGVybWluYWwgb3V0cHV0IGZyb20gRDEgb3IgS1YgY3JlYXRpb24gY29tbWFuZHMgYmVsb3c7IHRoZSB3aXphcmQgd2lsbCBhdXRvbWF0aWNhbGx5IHBhcnNlIFVVSURzIGFuZCBmaWxsIGFsbCBmaWVsZHM6Iiwi8J+XhO+4jyDbsS4g2LPYp9iu2Kog2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIEQxIjoi8J+XhO+4jyAxLiBDcmVhdGUgRDEgRGF0YWJhc2UiLCLYp9uM2YYg2K/Ys9iq2YjYsSDYsdinINiv2LEg2KrYsdmF24zZhtin2YQg2b7ZiNi02Ycg2b7YsdmI2pjZhyDYp9is2LHYpyDaqdmG24zYrzoiOiJSdW4gdGhpcyBjb21tYW5kIGluIHRoZSBwcm9qZWN0IGRpcmVjdG9yeSB0ZXJtaW5hbDoiLCLaqdm+24wiOiJDb3B5Iiwi8J+SoSDYtNmG2KfYs9mHINiq2YjZhNuM2K/YtNiv2YcgKGRhdGFiYXNlX2lkKSDYsdinINiv2LEg2YHbjNmE2K8g2LLbjNixINmI2KfYsdivINuM2Kcg2b7bjNiz2Kog2qnZhtuM2K8uIjoi8J+SoSBFbnRlciBvciBwYXN0ZSB0aGUgZ2VuZXJhdGVkIGRhdGFiYXNlX2lkIGluIHRoZSBmaWVsZCBiZWxvdy4iLCLimqEg27IuINiz2KfYrtiqINit2KfZgdi42Ycg2qnYtCBLViI6IuKaoSAyLiBDcmVhdGUgS1YgTmFtZXNwYWNlIiwi2KfbjNmGINiv2LPYqtmI2LEg2LHYpyDYr9ixINiq2LHZhduM2YbYp9mEINin2KzYsdinINqp2YbbjNivOiI6IlJ1biB0aGlzIGNvbW1hbmQgaW4geW91ciB0ZXJtaW5hbDoiLCLwn5KhINi02YbYp9iz2Ycg2KrZiNmE24zYr9i02K/ZhyAoaWQpINix2Kcg2K/YsSDZgduM2YTYryDYstuM2LEg2YjYp9ix2K8g24zYpyDZvtuM2LPYqiDaqdmG24zYry4iOiLwn5KhIEVudGVyIG9yIHBhc3RlIHRoZSBnZW5lcmF0ZWQgbmFtZXNwYWNlIElEIGluIHRoZSBmaWVsZCBiZWxvdy4iLCLimpnvuI8g2KrZiNmE24zYr9qp2YbZhtiv2Ycg2LLZhtiv2Ycg2Ygg2K/Yp9mG2YTZiNivINmF2LPYqtmC24zZhSDZgdin24zZhCI6IuKame+4jyBMaXZlIHdyYW5nbGVyLnRvbWwgR2VuZXJhdG9yICYgRGlyZWN0IERvd25sb2FkIiwi8J+TpSDYr9in2YbZhNmI2K8g2YXYs9iq2YLbjNmFINmB2KfbjNmEIHdyYW5nbGVyLnRvbWwiOiLwn5OlIERpcmVjdCBEb3dubG9hZCB3cmFuZ2xlci50b21sIiwi4pqhINiz2KfYrtiqINiu2YjYr9qp2KfYsSDYrNiv2KfZiNmEIEQxIjoi4pqhIEF1dG9tYXRpYyBEMSBTY2hlbWEgU2V0dXAiLCLYp9i32YTYp9i52KfYqiDYsdinINmI2KfYsdivINqp2YbbjNiv2Jsg2b7bjNi04oCM2YbZhdin24zYtCDYqNmHINi12YjYsdiqINio2YTYp9iv2LHZhtqvINio2LHZiNiy2LHYs9in2YbbjCDYtNiv2Ycg2Ygg2YXbjOKAjNiq2YjYp9mG24zYryDZgdin24zZhCDYotmF2KfYr9mHINix2Kcg2YXYs9iq2YLbjNmF2KfZiyDYr9in2YbZhNmI2K8g2qnZhtuM2K86IjoiRmlsbCBpbiB5b3VyIGRldGFpbHM7IHRoZSBwcmV2aWV3IHVwZGF0ZXMgaW4gcmVhbC10aW1lIGFuZCB5b3UgY2FuIGRvd25sb2FkIHRoZSByZWFkeS10by1kZXBsb3kgY29uZmlndXJhdGlvbiBkaXJlY3RseToiLCLZhtin2YUg2YjYsdqp2LEgKFdvcmtlciBOYW1lKSI6IldvcmtlciBOYW1lIiwi2LTZhtin2LPZhyBLViBOYW1lc3BhY2UgKEtWIElEKSI6IktWIE5hbWVzcGFjZSBJRCIsIti02YbYp9iz2Ycg2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIEQxIChEYXRhYmFzZSBJRCkiOiJEMSBEYXRhYmFzZSBJRCIsItix2YXYsiDYudio2YjYsSDZhdiv24zYsduM2KogKEFkbWluIE1hc3RlciBQYXNzd29yZCkiOiJBZG1pbiBQYXNzd29yZCIsIvCfjrIg2KrZiNmE24zYryDYqti12KfYr9mB24wiOiLwn46yIEdlbmVyYXRlIFJhbmRvbSIsIndyYW5nbGVyLnRvbWwgKNiu2LHZiNis24wg2KLZhdin2K/ZhyDYr9uM2b7ZhNmI24wpIjoid3JhbmdsZXIudG9tbCAoUmVhZHkgZm9yIERlcGxveSkiLCLwn5OlINiv2KfZhtmE2YjYryDZgdin24zZhCI6IvCfk6UgRG93bmxvYWQgRmlsZSIsIvCfk4sg2qnZvtuMINqp2KfZhdmEIjoi8J+TiyBDb3B5IEFsbCIsIvCfmoAg2K/Ys9iq2YjYsSDYr9uM2b7ZhNmI24wg2KjZhyDaqdmE2KfYr9mB2YTYsToiOiLwn5qAIERlcGxveSB0byBDbG91ZGZsYXJlIENvbW1hbmQ6Iiwi8J+TiyDaqdm+24wg2K/Ys9iq2YjYsSI6IvCfk4sgQ29weSBDb21tYW5kIiwi4p6h77iPINmF2LHYrdmE2Ycg2YLYqNmEIjoi4qyF77iPIFByZXZpb3VzIFN0ZXAiLCLZhdix2K3ZhNmHINio2LnYrzog2qnZhNuM2K/Zh9in24wg2KrZhNqv2LHYp9mFINmIINix2KjYp9iqINqp2YXaqduMIjoiTmV4dCBTdGVwOiBUZWxlZ3JhbSBBUEkgS2V5cyAmIEhlbHBlciBCb3QiLCLwn5OxINmF2LHYrdmE2Ycg2LPZiNmFOiDYp9iq2LXYp9mEINqp2YTYp9uM2YbYqiDYsdiz2YXbjCDYqtmE2q/Ysdin2YUg2Ygg2LPYp9iu2Kog2LHYqNin2Kog2qnZhdqp24wiOiLwn5OxIFN0ZXAgMzogQ29ubmVjdCBUZWxlZ3JhbSBBUEkgQ2xpZW50ICYgQ3JlYXRlIEhlbHBlciBCb3QiLCLYsdio2KfYqiDaqdmF2qnbjCDYp9iu2KrYtdin2LXbjCDYqNix2KfbjCDYp9ix2LPYp9mEINm+24zYp9mF4oCM2YfYp9uMINm+2KfaqeKAjNi02K/Zh9iMINm+24zYp9mF4oCM2YfYp9uMINiy2YXYp9mG4oCM2K/Yp9ixINmC2KjZhCDYp9iyINin2YbZgti22Kcg2Ygg2qnYr9mH2KfbjCDZiNix2YjYryDYqNmHINm+24zZiNuMINi02YXYpyDYp9iz2KrZgdin2K/ZhyDZhduM4oCM2LTZiNivLiI6IllvdXIgZGVkaWNhdGVkIGhlbHBlciBib3QgZm9yd2FyZHMgYW50aS1kZWxldGUgbWVzc2FnZSByZWNvdmVyeSwgYW50aS1UVEwgbWVkaWEsIGFuZCBzZWN1cml0eSBhbGVydHMgZGlyZWN0bHkgdG8geW91ciBwcml2YXRlIGNoYXQuIiwi8J+UkSDbsS4g2LTZhtin2LPZhyDZiCDZh9i0INix2LPZhduMINiq2YTar9ix2KfZhSI6IvCflJEgMS4gT2ZmaWNpYWwgVGVsZWdyYW0gQ2xpZW50IElEICYgSGFzaCIsItin24zZhiDZhdmC2KfYr9uM2LEg2LTZhtin2LPZhyDaqdmE2KfbjNmG2Kog2LHYs9mF24wg2KrZhNqv2LHYp9mFINiv2LPaqdiq2KfZviDZh9iz2KrZhtivINmIINiz24zYs9iq2YUg2KjZhyDYt9mI2LEg2b7bjNi04oCM2YHYsdi2INin2LIg2KLZhuKAjNmH2Kcg2KfYs9iq2YHYp9iv2Ycg2YXbjOKAjNqp2YbYryAo2YbbjNin2LLbjCDYqNmHINiq2LrbjNuM2LEg2YbYr9in2LHbjNivKToiOiJUaGVzZSBhcmUgb2ZmaWNpYWwgVGVsZWdyYW0gRGVza3RvcCBjcmVkZW50aWFscyB1c2VkIGJ5IGRlZmF1bHQgKG5vIGNoYW5nZSByZXF1aXJlZCk6Iiwi2K/YsSDYtdmI2LHYqiDYqtmF2KfbjNmEINio2Ycg2K/YsduM2KfZgdiqINqp2YTbjNivINi02K7YtduMINmF24zigIzYqtmI2KfZhtuM2K8g2KjZhyDYs9in24zYqiDYsdiz2YXbjCI6IklmIHlvdSBwcmVmZXIgeW91ciBvd24gcGVyc29uYWwgVGVsZWdyYW0gZGV2ZWxvcGVyIGNyZWRlbnRpYWxzLCB2aXNpdCIsItmF2LHYp9is2LnZhyDaqdmG24zYry4iOiIuIiwi8J+kliDbsi4g2KfbjNis2KfYryDYsdio2KfYqiDYr9ixIEJvdEZhdGhlciDYqtmE2q/Ysdin2YUiOiLwn6SWIDIuIENyZWF0ZSBCb3QgaW4gVGVsZWdyYW0gQEJvdEZhdGhlciIsItuM2qkg2LHYqNin2Kog2KfYrtiq2LXYp9i124wg2Ygg2LHYp9uM2q/Yp9mGINio2LHYp9uMINiu2YjYryDYqNiz2KfYstuM2K86IjoiQ3JlYXRlIGEgZGVkaWNhdGVkIGZyZWUgYm90IGZvciB5b3VyIGFjY291bnQ6Iiwi2K/YsSDYqtmE2q/Ysdin2YUg2YjYp9ix2K8g2KLbjNiv24wiOiJJbiBUZWxlZ3JhbSBvcGVuIiwi2LTZiNuM2K8uIjoiLiIsItiv2LPYqtmI2LEiOiJTZW5kIGNvbW1hbmQiLCLYsdinINio2YHYsdiz2KrbjNivLiI6Ii4iLCLbjNqpINmG2KfZhSDZiCDbjNqpINuM2YjYstix2YbbjNmFINiv2YTYrtmI2KfZhyAo2qnZhyDYqNmHIGJvdCDYrtiq2YUg2LTZiNivKSDYqNix2q/YstuM2YbbjNivLiI6IkNob29zZSBhIG5hbWUgYW5kIHVzZXJuYW1lIGVuZGluZyBpbiAnYm90Jy4iLCLYqtmI2qnZhiDYqtmE2q/Ysdin2YUg2K/Yp9iv2YfigIzYtNiv2Ycg2LHYpyDaqdm+24wg2Ygg2K/YsSDaqdin2K/YsSDYstuM2LEg2YjYp9ix2K8g2qnZhtuM2K8uIjoiQ29weSB0aGUgcHJvdmlkZWQgVGVsZWdyYW0gQm90IFRva2VuIGFuZCBwYXN0ZSBpdCBiZWxvdy4iLCLwn6SWINio2KfYsiDaqdix2K/ZhiDYsdio2KfYquKAjNmB2KfYr9ixINiv2LEg2KrZhNqv2LHYp9mFIjoi8J+kliBPcGVuIEBCb3RGYXRoZXIgaW4gVGVsZWdyYW0iLCLwn5SNINiq2LPYqtixINmIINin2LnYqtio2KfYsdiz2YbYrNuMINii2YbZhNin24zZhiDYqtmI2qnZhiDYsdio2KfYqiDYqtmE2q/Ysdin2YUiOiLwn5SNIE9ubGluZSBUZWxlZ3JhbSBCb3QgVG9rZW4gVmFsaWRhdG9yICYgUGluZyBUZXN0ZXIiLCLYqtmI2qnZhiDYsdio2KfYqiDYrtmI2K8g2LHYpyDYp9uM2YbYrNinINmI2KfYsdivINqp2YbbjNivINiq2Kcg2LPbjNiz2KrZhSDYp9iyINi32LHbjNmCINin2LHYqtio2KfYtyDZhdiz2KrZgtuM2YUg2KjYpyBBUEkg2KrZhNqv2LHYp9mFINi12K3YqiDYotmGINix2Kcg2KrYp9uM24zYryDaqdmG2K86IjoiRW50ZXIgeW91ciBib3QgdG9rZW4gYmVsb3cgdG8gdGVzdCBsaXZlIGNvbm5lY3Rpdml0eSBkaXJlY3RseSB3aXRoIFRlbGVncmFtIEFQSToiLCLwn5qAINiq2LPYqiDYotmG2YTYp9uM2YYg2KrZiNqp2YYiOiLwn5qAIFRlc3QgQm90IFRva2VuIE9ubGluZSIsIvCfkqwg2KfYsdiz2KfZhCDZvtuM2KfZhSDYqtiz2Kog2KjZhyDZvtuM2YjbjCDYtNmF2Kcg2KfYsiDYt9ix24zZgiDYp9uM2YYg2LHYqNin2Ko6Ijoi8J+SrCBTZW5kIHRlc3QgbWVzc2FnZSB0byB5b3VyIFRlbGVncmFtIGNoYXQgdmlhIHRoaXMgYm90OiIsIvCfk6kg2KfYsdiz2KfZhCDZvtuM2KfZhSDYqtiz2KoiOiLwn5OpIFNlbmQgVGVzdCBNZXNzYWdlIiwi2YXYsdit2YTZhyDYqNi52K86INix2KfZhtixINuy27Qg2LPYp9i52KrZhyBHaXRIdWIgQWN0aW9ucyI6Ik5leHQgU3RlcDogMjQvNyBHaXRIdWIgQWN0aW9ucyBSdW5uZXIiLCLimqEg2YXYsdit2YTZhyDahtmH2KfYsdmFOiDZgdi52KfZhOKAjNiz2KfYstuMINix2KfZhtixINiv2KfYptmF24wg2Ygg27LbtCDYs9in2LnYqtmHINiv2LEgR2l0SHViIEFjdGlvbnMiOiLimqEgU3RlcCA0OiBFbmFibGUgMjQvNyBQZXJzaXN0ZW50IFJ1bm5lciBpbiBHaXRIdWIgQWN0aW9ucyIsItqv24zYquKAjNmH2KfYqCDYp9qp2LTZhtiyINiz2KfYudiqINiy2YbYr9mH2Iwg2KjbjNmI2q/Ysdin2YHbjCDZh9mI2LTZhdmG2K8g2Ygg2b7Yp9uM2LQg27LbtCDYs9in2LnYqtmHINix2Kcg2KjYr9mI2YYg2YLYt9i524wg2Ygg2qnYp9mF2YTYp9mLINix2KfbjNqv2KfZhiDYsdmI24wg2LPYsdmI2LHZh9in24wg2KfYqNix24wg2q/bjNiq4oCM2YfYp9ioINix2YjYtNmGINmG2q/ZhyDZhduM4oCM2K/Yp9ix2K8uIjoiR2l0SHViIEFjdGlvbnMga2VlcHMgeW91ciBsaXZlIGF0b21pYyBjbG9jaywgc21hcnQgYmlvLCBhbmQgMjQvNyBtb25pdG9ycyBhY3RpdmUgd2l0aG91dCBpbnRlcnJ1cHRpb25zIG9yIHNlcnZlciBmZWVzLiIsIvCfm6HvuI8g2YXYs9uM2LEg2KvYqNiqINiz2qnYsdiq4oCM2YfYpyDYr9ixINqv24zYquKAjNmH2KfYqCAoUmVwb3NpdG9yeSBTZWNyZXRzKSI6IvCfm6HvuI8gUmVwb3NpdG9yeSBTZWNyZXRzIFNldHVwIFBhdGgiLCLwn5SXINix2YHYqtmGINmF2LPYqtmC24zZhSDYqNmHINi12YHYrdmHIFNlY3JldHMg2LHbjNm+2KfYstuM2KrZiNix24wg2LTZhdinIjoi8J+UlyBPcGVuIFJlcG9zaXRvcnkgU2VjcmV0cyBQYWdlIiwi2K/YsSDYsduM2b7Yp9iy24zYqtmI2LHbjCDYrtmI2K8g2YjYp9ix2K8g2YXYs9uM2LEg2LLbjNixINi02YjbjNivINmIINqG2YfYp9ixINmF2KrYutuM2LEg2LLbjNixINix2Kcg2KvYqNiqINmG2YXYp9uM24zYrzoiOiJOYXZpZ2F0ZSB0byB0aGUgZm9sbG93aW5nIHNldHRpbmdzIHBhdGggaW4geW91ciByZXBvIGFuZCBhZGQgdGhlc2UgZm91ciBzZWNyZXRzOiIsItmG2KfZhSBTZWNyZXQg2K/YsSDar9uM2KrigIzZh9in2KgiOiJTZWNyZXQgTmFtZSBpbiBHaXRIdWIiLCLZhdmC2K/Yp9ixINi02YXYpyI6IllvdXIgVmFsdWUiLCLYudmF2YTbjNin2Kog2qnZvtuMINmG2KfZhSI6IkNvcHkgTmFtZSBBY3Rpb24iLCLYudmF2YTbjNin2Kog2qnZvtuMINmF2YLYr9in2LEiOiJDb3B5IFZhbHVlIEFjdGlvbiIsItqp2b7bjCDZhtin2YUiOiJDb3B5IE5hbWUiLCLaqdm+24wg2YXZgtiv2KfYsSI6IkNvcHkgVmFsdWUiLCLilrbvuI8g2KfYs9iq2KfYsdiqINqv2LHYr9i0INqp2KfYsSDYsdin2YbYsSAoUnVuIFdvcmtmbG93KSI6IuKWtu+4jyBSdW4gV29ya2Zsb3ciLCLwn5qAINix2YHYqtmGINio2Ycg2LXZgdit2YcgQWN0aW9ucyDYsduM2b7Yp9iy24zYqtmI2LHbjCDYtNmF2KciOiLwn5qAIE9wZW4gQWN0aW9ucyBQYWdlIGluIFlvdXIgUmVwbyIsItiv2LEg2LXZgdit2Ycg2q/bjNiq4oCM2YfYp9ioINix24zZvtmI24wg2K7ZiNiv2Iwg2KjZhyDYqtioIjoiSW4geW91ciBHaXRIdWIgcmVwbyBnbyB0byB0YWIiLCLYqNix2YjbjNivIOKelCDar9ix2K/YtOKAjNqp2KfYsSI6IuKelCBTZWxlY3Qgd29ya2Zsb3ciLCLYsdinINin2YbYqtiu2KfYqCDaqdmG24zYryDinpQg2K/aqdmF2YciOiLinpQgQ2xpY2sgYnV0dG9uIiwi2LHYpyDYqNiy2YbbjNivISI6IiEiLCLwn5+iINix2KfZhtixINin2KjYsduMINmB2LnYp9mEINi02K/ZhyDZiCDZh9ixINu0INiz2KfYudiqINio2YfigIzYtdmI2LHYqiDYrtmI2K/aqdin2LEg2obYsdiu2Ycg2KfYrNix2KfbjCDYrtmI2K8g2LHYpyDYqtmF2K/bjNivINmF24zigIzaqdmG2K8uIjoi8J+foiBDbG91ZCBydW5uZXIgaXMgYWN0aXZlIGFuZCBhdXRvbWF0aWNhbGx5IGxvb3BzIGV2ZXJ5IDQgaG91cnMgd2l0aG91dCBpbnRlcnJ1cHRpb24uIiwi2YXYsdit2YTZhyDYqNi52K86INmI2LHZiNivINio2Ycg2b7ZhtmEINmIINiq2LPYqiDZhtmH2KfbjNuMIjoiTmV4dCBTdGVwOiBTaWduIEluICYgRmluYWwgTGF1bmNoIiwi8J+OiSDZhdix2K3ZhNmHINm+2YbYrNmFOiDahtqp4oCM2YTbjNiz2Kog2YbZh9in24zbjNiMINio2LHYsdiz24wg2LPZhNin2YXYqiDZiCDYp9iq2LXYp9mEINiq2YTar9ix2KfZhSI6IvCfjokgU3RlcCA1OiBGaW5hbCBSZWFkaW5lc3MgQ2hlY2tsaXN0LCBEaWFnbm9zdGljcyAmIENvbm5lY3QiLCLYqtio2LHbjNqpISDYqtmF2KfZhSDYp9is2LLYp9uMINiz24zYs9iq2YUg2b7bjNqp2LHYqNmG2K/bjCDYtNiv2YbYry4g2KfaqdmG2YjZhiDZhduM4oCM2KrZiNin2YbbjNivINiz2YTYp9mF2Kog2LPbjNiz2KrZhSDYsdinINqG2qkg2qnYsdiv2YfYjCDZhtiz2K7ZhyDZvti02KrbjNio2KfZhiDYr9in2YbZhNmI2K8g2qnZhtuM2K8g2Ygg2YjYp9ix2K8g2b7ZhtmEINi02YjbjNivLiI6IkNvbmdyYXR1bGF0aW9ucyEgQWxsIGNvbXBvbmVudHMgYXJlIGNvbmZpZ3VyZWQuIFlvdSBjYW4gbm93IHZlcmlmeSBoZWFsdGgsIGRvd25sb2FkIGJhY2t1cHMsIGFuZCBzaWduIGluIHRvIHRoZSBzdHVkaW8uIiwi8J+TiyDahtqp4oCM2YTbjNiz2Kog2KLZhdin2K/ar9uMINmG2YfYp9uM24w6Ijoi8J+TiyBGaW5hbCBSZWFkaW5lc3MgQ2hlY2tsaXN0OiIsItix2YjbjCDZh9ixINmF2YjYsdivINqp2YTbjNqpINqp2YbbjNivINiq2Kcg2KrbjNqpINio2K7ZiNix2K8iOiJDbGljayBlYWNoIGl0ZW0gdG8gY2hlY2sgb2ZmIiwi2KfZhti02LnYp9ioINm+2LHZiNqY2YcgKEZvcmspINiv2LEg2K3Ys9in2Kgg2LTYrti124wg2q/bjNiq4oCM2YfYp9ioIjoiRm9yayBwcm9qZWN0IGludG8geW91ciBwZXJzb25hbCBHaXRIdWIgYWNjb3VudCIsItm+2LHZiNqY2Ycg2K/YsSDYsduM2b7Yp9iy24zYqtmI2LHbjCDYtNiu2LXbjCDYtNmF2Kcg2qnZhNmI2YYg2Ygg2KLZhdin2K/ZhyDYtNivLiI6IlJlcG9zaXRvcnkgY2xvbmVkIGFuZCByZWFkeSBpbiB5b3VyIHBlcnNvbmFsIGFjY291bnQuIiwi2qnZhNin2K/ZgdmE2LEg2YjYsdqp2LEg2Ygg2K/bjNiq2KfYqNuM2LMgRDEg2LPYp9iu2KrZhyDZiCDZhdiz2KrZgtixINi02K8iOiJDbG91ZGZsYXJlIFdvcmtlciAmIEQxIERhdGFiYXNlIGRlcGxveWVkIiwi2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIFNRTGl0ZSDYp9io2LHbjCDYqNinINiz2YLZgSDbsduw27Ag2YfYstin2LEg2LHYp9uM2Kog2LHYp9uM2q/Yp9mGINiv2LEg2LHZiNiyINix2KfZh+KAjNin2YbYr9in2LLbjCDYtNivLiI6IlNlcnZlcmxlc3MgU1FMaXRlIGRhdGFiYXNlIGluaXRpYWxpemVkIHdpdGggMTAwLDAwMCBmcmVlIGRhaWx5IHdyaXRlcy4iLCLYsdio2KfYqiDaqdmF2qnbjCDYr9ixIEJvdEZhdGhlciDYp9uM2KzYp9ivINmIINin2LnYqtio2KfYsdiz2YbYrNuMINi02K8iOiJIZWxwZXIgQm90IGNyZWF0ZWQgYW5kIHZhbGlkYXRlZCBpbiBAQm90RmF0aGVyIiwi2KrZiNqp2YYg2LHYqNin2Kog2KrYp9uM24zYryDYtNiv2Ycg2Ygg2KLZhdin2K/ZhyDYr9ix24zYp9mB2Kog2b7bjNin2YXigIzZh9in2LPYqi4iOiJCb3QgdG9rZW4gdmVyaWZpZWQgYW5kIHJlYWR5IHRvIGZvcndhcmQgbWVzc2FnZXMuIiwi2LPaqdix2KrigIzZh9in24wg2q/bjNiq4oCM2YfYp9ioINin2qnYtNmG2LIg2LPYqiDZiCDYsdin2YbYsSDYp9iz2KrYp9ix2Kog2LTYryI6IkdpdEh1YiBTZWNyZXRzIHNldCAmIEFjdGlvbnMgcnVubmVyIHN0YXJ0ZWQiLCLYotiv2LHYsyDZiNix2qnYsSDZiCDYsdmF2LIg2LHYp9mG2LEg2K/YsSBTZWNyZXRzINir2KjYqiDYtNiv2YbYry4iOiJXb3JrZXIgVVJMIGFuZCBydW5uZXIgc2VjcmV0IGNvbmZpZ3VyZWQgaW4gcmVwbyBzZXR0aW5ncy4iLCLwn5GRINmI2LHZiNivINmF2K/bjNixINqp2YQg2KjZhyDZvtmG2YQg2YXYr9uM2LHbjNiqIjoi8J+RkSBTaWduIEluIHRvIEFkbWluIENvbW1hbmQgQ2VudGVyIiwi2YjYp9ix2K8g2LHZiNiqIjoiTmF2aWdhdGUgdG8gcm91dGUiLCLYtNiv2Ycg2Ygg2LHZhdiyINi52KjZiNix24wg2qnZhyDYr9ixIjoiYW5kIHVzZSB0aGUgcGFzc3dvcmQgZGVmaW5lZCBpbiIsItiq2YbYuNuM2YUg2qnYsdiv24zYryDYsdinINio2LLZhtuM2K8g2KrYpyDYqNmHINin2YbYqNin2LEg2YTYp9uM2LPZhtiz2Iwg2KrZhNmH4oCM2YXYqtix24wg2Ygg2KfYsdiq2YLYp9uMINqp2KfYsdio2LHYp9mGINiv2LPYqtix2LPbjCDbjNin2KjbjNivLiI6InRvIGFjY2VzcyB0aGUgbGljZW5zZSBpbnZlbnRvcnksIHRlbGVtZXRyeSwgYW5kIHVzZXIgbWFuYWdlbWVudC4iLCLZiNix2YjYryDYqNmHINm+2YbZhCDZhdiv24zYsduM2KogKC9hZG1pbikiOiJTaWduIEluIHRvIEFkbWluIFBvcnRhbCAoL2FkbWluKSIsIvCfk7Eg2KfYqti12KfZhCDYp9qp2KfZhtiqINiq2YTar9ix2KfZhSDYqNmHINiz2YTZgeKAjNio2KfYqiI6IvCfk7EgQ29ubmVjdCBUZWxlZ3JhbSBBY2NvdW50IHRvIFNlbGZib3QiLCLYr9ixINiv2KfYtNio2YjYsdivINqp2KfYsdio2LHbjNiMINix2YjbjCI6IkluIHRoZSB1c2VyIGRhc2hib2FyZCwgY2xpY2siLCLYp9iz2qnZhiBRUiDYqtmE2q/Ysdin2YUiOiJTY2FuIFRlbGVncmFtIFFSIiwi2KjYstmG24zYryDZiCDYp9iyINiq2YTar9ix2KfZhSDar9mI2LTbjCDYr9ixINmF2LPbjNixIjoiYW5kIGZyb20gVGVsZWdyYW0gYXBwIG5hdmlnYXRlIHRvIiwi2qnYryDYsdinINin2LPaqdmGINmG2YXYp9uM24zYry4iOiJ0byBzY2FuIHRoZSBRUiBjb2RlLiIsItmI2LHZiNivINio2Ycg2K/Yp9i02KjZiNix2K8g2qnYp9ix2KjYsduMINin2LPYqtmI2K/bjNmIIjoiU2lnbiBJbiB0byBTdHVkaW8gVXNlciBEYXNoYm9hcmQiLCLwn5K+INiv2KfZhtmE2YjYryDZvtqp24zYrCDZvtuM2qnYsdio2YbYr9uMIChKU09OIEJhY2t1cCkiOiLwn5K+IERvd25sb2FkIENvbmZpZ3VyYXRpb24gUGFja2FnZSAoSlNPTiBCYWNrdXApIiwi8J+puiDYuduM2KjigIzbjNin2KjbjCDZiCDYp9iz2qnZhiDYp9iq2LXYp9mE2KfYqiDZiNix2qnYsSI6IvCfqbogTGl2ZSBDbG91ZCBEaWFnbm9zdGljcyAmIENvbm5lY3Rpb24gU2NhbiIsIvCfmoAg2YjYsdmI2K8g2KjZhyDYp9iz2KrZiNiv24zZiCDZiCDZvtin24zYp9mGINix2KfZh+KAjNin2YbYr9in2LLbjCI6IvCfmoAgRW50ZXIgU3R1ZGlvICYgRmluaXNoIFNldHVwIiwi8J+puiDYuduM2KjigIzbjNin2KjbjCDYstmG2K/ZhyDYp9iq2LXYp9mE2KfYqiDZiCDZvtuM2qnYsdio2YbYr9uMINmI2LHaqdixIjoi8J+puiBMaXZlIFdvcmtlciBEaWFnbm9zdGljcyAmIEhlYWx0aCBTY2FuIiwi2K/YsSDYrdin2YQg2KfYsdiq2KjYp9i3INio2Kcg2YjYsdqp2LEg2qnZhNin2K/ZgdmE2LEg2Ygg2KfYudiq2KjYp9ix2LPZhtis24wg2KfYqti12KfZhNin2KouLi4iOiJDb25uZWN0aW5nIHRvIENsb3VkZmxhcmUgV29ya2VyIGFuZCB2YWxpZGF0aW5nIGVuZHBvaW50cy4uLiIsIvCfk6Yg2K7YsdmI2KzbjCDbjNqp2KzYp9uMINiz2qnYsdiq4oCM2YfYp9uMIEdpdEh1YiBBY3Rpb25zIjoi8J+TpiBCdWxrIEV4cG9ydCBHaXRIdWIgQWN0aW9ucyBTZWNyZXRzIiwi2KrZhdin2YXbjCDZhdiq2LrbjNix2YfYp9uMINmF2K3bjNi324wg2KjYpyDZgdix2YXYqiI6IkFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgZm9ybWF0dGVkIGFzIiwi2KLZhdin2K/ZhyDYqNix2KfbjCDaqdm+24wg24zYpyDYp9iz2KrZgdin2K/ZhyDZhdiz2KrZgtuM2YU6IjoicmVhZHkgdG8gY29weSBvciB1c2UgZGlyZWN0bHk6Iiwi8J+TiyDaqdm+24wg2qnZhCDZhdiq2YYiOiLwn5OLIENvcHkgRW50aXJlIEJsb2NrIiwi2b7bjNin2YUg2LPbjNiz2KrZhSI6IlN5c3RlbSBOb3RpZmljYXRpb24iLCLYqNix2LHYs9uMINiy2YbYr9mHINiz2YTYp9mF2Kog2K/bjNiq2KfYqNuM2LMg2Ygg2LPYsdmI24zYsyI6IkNoZWNrIExpdmUgRGF0YWJhc2UgJiBTZXJ2aWNlIEhlYWx0aCIsItiu2LHZiNis24wg24zaqdis2KfbjCDYs9qp2LHYquKAjNmH2KfbjCDYsdin2YbYsSI6IkJ1bGsgRXhwb3J0IFJ1bm5lciBTZWNyZXRzIiwi2KrYutuM24zYsSDYqtmFINix2YjYsiDZiCDYtNioIjoiVG9nZ2xlIERheSAvIE5pZ2h0IE1vZGUiLCLZiNix2YjYryDZhdiz2KrZgtuM2YUg2KjZhyDZvtmG2YQg2YXYr9uM2LHbjNiqIjoiRGlyZWN0IEVudHJ5IHRvIEFkbWluIFBvcnRhbCIsItmI2LHZiNivINio2Ycg2b7ZhtmEINin2LPYqtmI2K/bjNmIINiz2YTZgeKAjNio2KfYqiI6IkVudGVyIFNlbGZib3QgU3R1ZGlvIFBhbmVsIiwi2YXYq9in2YQ6IEFtaXJIb3NzZWluINuM2KcgeW91ci1naXRodWItdXNlcm5hbWUiOiJlLmcuIEFtaXJIb3NzZWluIG9yIHlvdXItZ2l0aHViLXVzZXJuYW1lIiwi2YXYqtmGINiu2LHZiNis24wg2KrYsdmF24zZhtin2YQg2LHYpyDYp9uM2YbYrNinIFBhc3RlINqp2YbbjNivLi4uIjoiUGFzdGUgdGVybWluYWwgb3V0cHV0IGhlcmUuLi4iLCLZhdir2KfZhDogYjU2YmFjZjMyMWE1NDczMWJhNGExZTY5YTU2MTk4OTgiOiJlLmcuIGI1NmJhY2YzMjFhNTQ3MzFiYTRhMWU2OWE1NjE5ODk4Iiwi2YXYq9in2YQ6IDRlZGVmMzhhLTk1ZDQtNDQ1OS1hOTA0LTUyNDhhODk1MjM2MyI6ImUuZy4gNGVkZWYzOGEtOTVkNC00NDU5LWE5MDQtNTI0OGE4OTUyMzYzIiwi2LTZhtin2LPZhyDYudiv2K/bjCDahtiqINi02YXYpyAoQ2hhdCBJRCDYudiv2K/bjCkiOiJZb3VyIG51bWVyaWNhbCBUZWxlZ3JhbSBDaGF0IElEIiwi27YiOiI2Iiwi27ciOiI3Iiwi27giOiI4Iiwi27kiOiI5Iiwi2KrYudiv2KfYryDaqdiv2YfYp9uMINmF2YjYsdivINmG2LjYsSI6IlF1YW50aXR5IG9mIGNvZGVzIiwi2YXYr9iqINin2LnYqtio2KfYsSDZhNin24zYs9mG2LMiOiJMaWNlbnNlIER1cmF0aW9uIiwi27Eg2YXYp9mH2YcgKNuz27Ag2LHZiNiyKSI6IjEgTW9udGggKDMwIERheXMpIiwi27Mg2YXYp9mH2YcgKNu527Ag2LHZiNiyKSI6IjMgTW9udGhzICg5MCBEYXlzKSIsItu2INmF2KfZh9mHICjbsdu427Ag2LHZiNiyKSI6IjYgTW9udGhzICgxODAgRGF5cykiLCLbsSDYs9in2YTZhyAo27Pbttu1INix2YjYsikiOiIxIFllYXIgKDM2NSBEYXlzKSIsItmF2KfYr9in2YXigIzYp9mE2LnZhdixIOKZvu+4jyAoTGlmZXRpbWUgVklQKSI6IkxpZmV0aW1lIOKZvu+4jyAoVklQKSIsItm+24zYtNmI2YbYryDbjNinINio2LHahtiz2Kgg2KfYrtiq2LXYp9i124wg2qnYr9mH2KcgKNin2K7YqtuM2KfYsduMKSI6IkN1c3RvbSBQcmVmaXggb3IgVGFnIChPcHRpb25hbCkiLCLZhdir2KfZhDogTk9XUlVaLVNBTEUg24zYpyBWSVAtVVNFUiI6ImUuZy4gU1VNTUVSLVNBTEUgb3IgVklQLVVTRVIiLCI8c3Bhbj7wn46f77iPINiq2YjZhNuM2K8g2qnYr9mH2KfbjCDZhNin24zYs9mG2LMg2KzYr9uM2K8g2Ygg2KfYttin2YHZhyDYqNmHINin2YbYqNin2LE8L3NwYW4+IjoiPHNwYW4+8J+On++4jyBHZW5lcmF0ZSBOZXcgTGljZW5zZSBDb2Rlczwvc3Bhbj4iLCLZgduM2YTYqtixINio2LEg2KfYs9in2LMg2YjYtti524zYqiDaqdiv2YfYpzoiOiJGaWx0ZXIgYnkgQ29kZSBTdGF0dXM6Iiwi2YfZhdmHINqp2K/Zh9inICjaqdmEINin2YbYqNin2LEpIjoiQWxsIENvZGVzIChUb3RhbCBJbnZlbnRvcnkpIiwi2YHZgti3INqp2K/Zh9in24wg2KLZhdin2K/ZhyDZgdix2YjYtCAoVW51c2VkKSI6IkF2YWlsYWJsZSBDb2RlcyBPbmx5IChVbnVzZWQpIiwi2YHZgti3INqp2K/Zh9in24wg2YHYudin2YTigIzYtNiv2YcgKFJlZGVlbWVkKSI6IlJlZGVlbWVkIENvZGVzIE9ubHkiLCLaqdm+24wg2YfZhdmHINqp2K/Zh9in24wg2KLZhdin2K/ZhyDZgdix2YjYtCI6IkNvcHkgQWxsIEF2YWlsYWJsZSBDb2RlcyIsItmF2K/YqiDYp9i52KrYqNin2LEiOiJEdXJhdGlvbiIsItio2LHahtiz2KggLyDbjNin2K/Yr9in2LTYqiI6IlRhZyAvIE5vdGUiLCLZhdi12LHZgeKAjNqp2YbZhtiv2YciOiJSZWRlZW1lZCBCeSIsItiq2KfYsduM2K4g2YXYtdix2YEiOiJSZWRlZW1lZCBEYXRlIiwi2K/YsSDYrdin2YQg2KjYp9ix2q/YsNin2LHbjCDZhNuM2LPYqiDaqdiv2YfYp9uMINmE2KfbjNiz2YbYsy4uLiI6IkxvYWRpbmcgbGljZW5zZSBjb2RlcyBsaXN0Li4uIiwi2YXYr9uM2LHbjNiqINuM2qnZvtin2LHahtmHINit2LPYp9io4oCM2YfYp9uMINqp2KfYsdio2LHbjNiMINio2LHYsdiz24wg2LPZhNmB4oCM2KjYp9iq4oCM2YfYpyDZiCDZhti42KfYsdiqINin2YXZhtuM2KrbjCDYqNixINmF2LTYqtix2qnbjNmGIjoiVW5pZmllZCB1c2VyIGFjY291bnRzIG1hbmFnZW1lbnQsIHNlbGZib3QgaW5zcGVjdGlvbiwgYW5kIHNlY3VyaXR5IG1vbml0b3JpbmciLCLYrNiz2KrYrNmIINio2LEg2KfYs9in2LMg2YbYp9mFINqp2KfYsdio2LHbjNiMINi02YbYp9iz2Ycg2LnYr9iv24wg24zYpyDYotuM4oCM2K/bjCDYsdio2KfYqi4uLiI6IlNlYXJjaCBieSB1c2VybmFtZSwgY2hhdCBJRCwgb3IgYm90IElELi4uIiwi2YfZhdmHINiz2LfZiNitINiv2LPYqtix2LPbjCI6IkFsbCBBY2Nlc3MgUm9sZXMiLCLZgdmC2Lcg2qnYp9ix2KjYsdin2YYg2LnYp9iv24wiOiJTdGFuZGFyZCBVc2VycyBPbmx5Iiwi2YHZgti3INmF2K/bjNix2KfZhiDYs9uM2LPYqtmFIjoiU3lzdGVtIEFkbWlucyBPbmx5Iiwi2YfZhdmHINmI2LbYuduM2KrigIzZh9in24wg2LHYqNin2KoiOiJBbGwgQm90IFN0YXRlcyIsItiv2KfYsdin24wg2LPZhNmB4oCM2KjYp9iqINmF2KrYtdmEIjoiV2l0aCBDb25uZWN0ZWQgU2VsZmJvdCIsItio2K/ZiNmGINiz2YTZgeKAjNio2KfYqiI6IldpdGhvdXQgU2VsZmJvdCIsItmG2YLYtCI6IlJvbGUiLCLZhtmI2Lkg2KfYtNiq2LHYp9qpIjoiUGxhbiBUeXBlIiwi2YjYtti524zYqiDYsdio2KfYqiI6IkJvdCBTdGF0dXMiLCLYs9i02YYg2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gU2Vzc2lvbiIsItii2K7YsduM2YYg2YfZhdqv2KfZheKAjNiz2KfYstuMIjoiTGFzdCBTeW5jZWQiLCLYr9ixINit2KfZhCDYqNin2LHar9iw2KfYsduMINin2LfZhNin2LnYp9iqINqp2KfYsdio2LHYp9mGLi4uIjoiTG9hZGluZyB1c2VyIGFjY291bnRzIGRhdGEuLi4iLCLYrdiz2KfYqCDYtNmF2Kcg2KjZhyDYudmE2Kog2b7Yp9uM2KfZhiDZhdiv2Kog2KfYudiq2KjYp9ixINin2LTYqtix2KfaqSDYqNmHINit2KfZhNiqINiq2LnZhNuM2YIg2K/Ysdii2YXYr9mHINin2LPYqi4iOiJZb3VyIGFjY291bnQgaGFzIGJlZW4gc3VzcGVuZGVkIGR1ZSB0byBleHBpcmVkIHN1YnNjcmlwdGlvbiBwbGFuLiIsItis2YfYqiDZgdi52KfZhOKAjNiz2KfYstuMINmF2KzYr9ivINiz2YTZgeKAjNio2KfYqiDZiCDYqNin2LIg2LTYr9mGINm+2YbZhCDYp9iz2KrZiNiv24zZiNiMINmE2LfZgdin2Ysg2qnYryDZhNin24zYs9mG2LMg2KzYr9uM2K8g2K7ZiNivINix2Kcg2YjYp9ix2K8g2YbZhdin24zbjNivOiI6IlRvIHJlYWN0aXZhdGUgeW91ciBzZWxmYm90IGFuZCB1bmxvY2sgdGhlIHN0dWRpbyBwYW5lbCwgcGxlYXNlIGVudGVyIHlvdXIgbmV3IGxpY2Vuc2UgY29kZToiLCLaqdivINmE2KfbjNiz2YbYsyDYrtix24zYr9in2LHbjOKAjNi02K/ZhyAo2YXYq9in2YQ6IEFSSVpPLUFCQ0QtMTIzNCkiOiJQdXJjaGFzZWQgbGljZW5zZSBjb2RlIChlLmcuIEFSSVpPLUFCQ0QtMTIzNCkiLCI8c3Bhbj7wn5qAINiu2LHZiNisINin2LIg2KrYudmE24zZgiDZiCDYtNin2LHamDwvc3Bhbj4iOiI8c3Bhbj7wn5qAIFVubG9jayAmIFJlbmV3IFN1YnNjcmlwdGlvbjwvc3Bhbj4iLCLYrtix2YjYrCDYp9iyINit2LPYp9ioINmIINmI2LHZiNivINio2Kcg2qnYp9ix2KjYsduMINiv24zar9ixIjoiTG9nIG91dCBhbmQgc3dpdGNoIGFjY291bnQiLCLZvtuM2LTigIzZhtmF2KfbjNi0IjoiUHJldmlldyIsItqp2KfYsdio2LEg2b7bjNi04oCM2YHYsdi2IjoiRGVmYXVsdCBVc2VyIiwi2KjbjNmI2q/Ysdin2YHbjCDYstmG2K/ZhyAoQmlvKSI6IkR5bmFtaWMgQmlvIChCaW8pIiwi2K/YsSDYp9mG2KrYuNin2LEg2YfZhdqv2KfZheKAjNiz2KfYstuMINio2Kcg2LPYsdmI2LEg2KrZhNqv2LHYp9mFLi4uIjoiV2FpdGluZyBmb3Igc3luYyB3aXRoIFRlbGVncmFtIHNlcnZlci4uLiIsItiq2YLZiNuM2YUg2K7ZiNix2LTbjNiv24wg2Ygg2LLZhdin2YYg2KrZh9ix2KfZhjoiOiJTb2xhciBDYWxlbmRhciAmIFRlaHJhbiBUaW1lOiIsItmH2YXar9in2YUg2KjYpyDYs9ix2YjYsSI6IlN5bmNlZCB3aXRoIFNlcnZlciIsItmI2LHZiNivINio2Ycg2b7ZhtmEINqp2KfYsdio2LHbjCI6IkxvZyBJbiB0byBBY2NvdW50Iiwi2KvYqNiq4oCM2YbYp9mFINqp2KfYsdio2LEg2KzYr9uM2K8iOiJSZWdpc3RlciBOZXcgQWNjb3VudCIsItmG2KfZhSDaqdin2LHYqNix24wg2LTZhdinOiI6IllvdXIgVXNlcm5hbWU6Iiwi2YbYp9mFINqp2KfYsdio2LHbjCDZiNix2YjYryAo2K3Yr9in2YLZhCDbsyDYrdix2YEg2KfZhtqv2YTbjNiz24wpIjoiTG9naW4gdXNlcm5hbWUgKG1pbiAzIGNoYXJzKSIsItix2YXYsiDYudio2YjYsSDYrdiz2KfYqDoiOiJBY2NvdW50IFBhc3N3b3JkOiIsItix2YXYsiDYudio2YjYsSDYp9uM2YXZhiAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJTZWN1cmUgcGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsIjxzcGFuPtmI2LHZiNivINio2Ycg2K/Yp9i02KjZiNix2K8gQXJpem8gU2VsZjwvc3Bhbj4iOiI8c3Bhbj5Mb2cgSW4gdG8gQXJpem8gU2VsZjwvc3Bhbj4iLCLaqdivINmE2KfbjNiz2YbYsyDYrtix24zYr9in2LHbjOKAjNi02K/ZhzoiOiJQdXJjaGFzZWQgTGljZW5zZSBDb2RlOiIsIijYp9mE2LLYp9mF24wpIjoiKFJlcXVpcmVkKSIsItqp2K8g2YTYp9uM2LPZhtizINiu2LHbjNivINin2LTYqtix2KfaqSAo2YXYq9in2YQ6IEFSSVpPLVhYWFgtWVlZWSkiOiJQdXJjaGFzZWQgbGljZW5zZSBjb2RlIChlLmcuIEFSSVpPLVhYWFgtWVlZWSkiLCLwn5KhINio2LHYp9uMINiv2LHbjNin2YHYqiDaqdivINin2LTYqtix2KfaqSDYqNmHINin2K/ZhduM2YYg24zYpyDYsdio2KfYqiDZgdix2YjYtCDZhdix2KfYrNi52Ycg2YbZhdin24zbjNivLiI6IvCfkqEgVG8gZ2V0IGEgbGljZW5zZSBjb2RlLCBjb250YWN0IGFkbWluIG9yIHN1cHBvcnQuIiwi2YbYp9mFINqp2KfYsdio2LHbjCDYp9mG2KrYrtin2KjbjDoiOiJEZXNpcmVkIFVzZXJuYW1lOiIsItmG2KfZhSDaqdin2LHYqNix24wg2KfZhtqv2YTbjNiz24wg2YXZhtit2LXYseKAjNio2YfigIzZgdix2K8iOiJVbmlxdWUgYWxwaGFudW1lcmljIHVzZXJuYW1lIiwi2LHZhdiyINi52KjZiNixOiI6IlBhc3N3b3JkOiIsItit2K/Yp9mC2YQg27gg2qnYp9ix2Kfaqdiq2LEg2LTYp9mF2YQg2K3YsdmI2YEg2Ygg2KfYudiv2KfYryI6IkF0IGxlYXN0IDggY2hhcmFjdGVycyB3aXRoIGxldHRlcnMgJiBudW1iZXJzIiwi2Kraqdix2KfYsSDYsdmF2LIg2LnYqNmI2LE6IjoiQ29uZmlybSBQYXNzd29yZDoiLCLYqtqp2LHYp9ixINix2YXYsiDYudio2YjYsSDYp9mG2KrYrtin2KjbjCI6IkNvbmZpcm0geW91ciBwYXNzd29yZCIsIjxzcGFuPtir2KjYquKAjNmG2KfZhSDZiCDZgdi52KfZhOKAjNiz2KfYstuMINin2LTYqtix2KfaqSBBcml6byBTZWxmPC9zcGFuPiI6IjxzcGFuPlJlZ2lzdGVyICYgQWN0aXZhdGUgU3Vic2NyaXB0aW9uPC9zcGFuPiIsItin2KrYtdin2YQg2YXYs9iq2YLbjNmFINmIINix2LPZhduMINin2qnYp9mG2Kog2KrZhNqv2LHYp9mFIjoiRGlyZWN0ICYgT2ZmaWNpYWwgVGVsZWdyYW0gQWNjb3VudCBDb25uZWN0aW9uIiwi2YjYsdmI2K8g2KjYpyDYtNmF2KfYsdmHINmF2YjYqNin24zZhCDZiCDaqdivINm+24zYp9mF2qnbjCAo2LPYsduM2LnigIzYqtix24zZhiDZiCDZhdi32YXYptmG4oCM2KrYsduM2YYg2LHZiNi0INix2LPZhduMKSI6IkxvZyBpbiB2aWEgUGhvbmUgTnVtYmVyICYgU01TIGNvZGUgKEZhc3Rlc3QgJiBNb3N0IFNlY3VyZSkiLCLZiNix2YjYryDYqNinINix2LTYqtmHINiz2LTZhiDYotmF2KfYr9mHIChQeXJvZ3JhbSAvIFRlbGV0aG9uIFN0cmluZyBTZXNzaW9uKSI6IkxvZyBpbiB2aWEgU3RyaW5nIFNlc3Npb24gKFB5cm9ncmFtIC8gVGVsZXRob24pIiwi2LTZhdin2LHZhyDZhdmI2KjYp9uM2YQg2KrZhNqv2LHYp9mFINi02YXYpyAo2KjYpyDaqdivINqp2LTZiNix2Iwg2YXYq9mE2KfZiyA5ODkxMjM0NTY3ODkrKToiOiJZb3VyIFRlbGVncmFtIFBob25lIE51bWJlciAod2l0aCBjb3VudHJ5IGNvZGUsIGUuZy4gKzEuLi4pOiIsIti02YXYp9ix2Ycg2YfZhdix2KfZhyDYqNinINmB2LHZhdiqINio24zZhuKAjNin2YTZhdmE2YTbjCI6IlBob25lIG51bWJlciB3aXRoIGludGVybmF0aW9uYWwgZm9ybWF0IiwiPHNwYW4+2K/YsduM2KfZgdiqINqp2K8g2KrYo9uM24zYryDZiNix2YjYrzwvc3Bhbj4iOiI8c3Bhbj5SZWNlaXZlIExvZ2luIENvZGU8L3NwYW4+Iiwi2qnYryDYqtij24zbjNivINu1INix2YLZhduMINin2LHYs9in2YTigIzYtNiv2Ycg2K/YsSDYqtmE2q/Ysdin2YU6IjoiNS1kaWdpdCB2ZXJpZmljYXRpb24gY29kZSBzZW50IGluIFRlbGVncmFtOiIsItqp2K8g27Ug2LHZgtmF24wg2KfYsdiz2KfZhNuMIjoiNS1kaWdpdCB2ZXJpZmljYXRpb24gY29kZSIsItix2YXYsiDYqtij24zbjNivINmH2YjbjNiqINiv2Ygg2YXYsdit2YTZh+KAjNin24wgKNiv2LEg2LXZiNix2Kog2YHYudin2YQg2KjZiNiv2YYg2K/YsSDYqtmE2q/Ysdin2YUpOiI6IlR3by1TdGVwIFZlcmlmaWNhdGlvbiBQYXNzd29yZCAoaWYgZW5hYmxlZCBvbiBUZWxlZ3JhbSk6Iiwi2LHZhdiyINi52KjZiNixINiv2Ygg2YXYsdit2YTZh+KAjNin24wgKNuyRkEpIjoiVHdvLVN0ZXAgUGFzc3dvcmQgKDJGQSkiLCI8c3Bhbj7Yqtij24zbjNivINmIINin2KrYtdin2YQg2KjZhyDYs9mE2YHigIzYqNin2Ko8L3NwYW4+IjoiPHNwYW4+VmVyaWZ5ICYgQ29ubmVjdCBTZWxmYm90PC9zcGFuPiIsItix2LTYqtmHINiz2LTZhiDaqdin2YXZhCAoU3RyaW5nIFNlc3Npb24pOiI6IkZ1bGwgU3RyaW5nIFNlc3Npb246Iiwi2LHYtNiq2Ycg2LPYtNmGINi32YjZhNin2YbbjCDYqtmE2q/Ysdin2YUgKFN0cmluZyBTZXNzaW9uKSI6IkxvbmcgVGVsZWdyYW0gU3RyaW5nIFNlc3Npb24iLCI8c3Bhbj7YqNix2LHYs9uMINmIINmB2LnYp9mE4oCM2LPYp9iy24wg2LPYtNmGPC9zcGFuPiI6IjxzcGFuPlZlcmlmeSAmIEFjdGl2YXRlIFNlc3Npb248L3NwYW4+Iiwi2KfYs9iq2YjYr9uM2YjbjCDZvtuM2qnYsdio2YbYr9uMINiz2YTZgeKAjNio2KfYqiDZh9mI2LTZhdmG2K8iOiJJbnRlbGxpZ2VudCBTZWxmYm90IENvbmZpZ3VyYXRpb24gU3R1ZGlvIiwiPHNwYW4+8J+SviDYsNiu24zYsdmHINmIINin2LnZhdin2YQg2KrYutuM24zYsdin2Kog2KfYs9iq2YjYr9uM2Yg8L3NwYW4+IjoiPHNwYW4+8J+SviBTYXZlICYgQXBwbHkgU3R1ZGlvIENoYW5nZXM8L3NwYW4+Iiwi2YXYsdqp2LIg2KrZhNmH4oCM2YXYqtix24wg2Ygg2YjYtti524zYqiDZhNit2LjZh+KAjNin24wg2LPZhNmB4oCM2KjYp9iqIjoiVGVsZW1ldHJ5IENlbnRlciAmIFJlYWwtVGltZSBCb3QgU3RhdHVzIiwi2YfZhdqv2KfZheKAjNiz2KfYstuMINii2YbbjCI6Ikluc3RhbnQgU3luYyIsItiq2YjZgtmBINmF2YjZgtiqIjoiUGF1c2UiLCLYqti52YjbjNi2INin2qnYp9mG2Kog2KrZhNqv2LHYp9mFIjoiU3dpdGNoIFRlbGVncmFtIEFjY291bnQiLCLZiNi22LnbjNiqINin2KrYtdin2YQg2LHYqNin2Ko6IjoiQm90IENvbm5lY3Rpb24gU3RhdHVzOiIsItii2K7YsduM2YYg2KfYs9iq2LnZhNin2YUg2Ygg2LnZhdmE2qnYsdivOiI6Ikxhc3QgUXVlcnkgJiBQZXJmb3JtYW5jZToiLCLYqtmI2LPYudmH4oCM24zYp9mB2KrZhyDYqNinINio2KfZhNin2KrYsduM2YYg2KfYs9iq2KfZhtiv2KfYsdiv2YfYp9uMINin2YXZhtuM2KrbjCDYp9io2LHbjCDZiCDYqtmI2LLbjNi5INmE2KjZh+KAjNin24wiOiJFbmdpbmVlcmVkIHdpdGggaGlnaGVzdCBjbG91ZCBzZWN1cml0eSBzdGFuZGFyZHMgJiBlZGdlIGRpc3RyaWJ1dGlvbiIsItiq2YbYuNuM2YXYp9iqINit2LPYp9ioINmIINin2YXZhtuM2Kog2qnYp9ix2KjYsduMIjoiQWNjb3VudCBTZXR0aW5ncyAmIFVzZXIgU2VjdXJpdHkiLCLYtNin2LHamCDZiCDYqtmF2K/bjNivINin2LTYqtix2KfaqSDYqNinINqp2K8g2YTYp9uM2LPZhtizINis2K/bjNivIjoiUmVuZXcgU3Vic2NyaXB0aW9uIHdpdGggTmV3IExpY2Vuc2UgQ29kZSIsItqp2K8g2YTYp9uM2LPZhtizINis2K/bjNivICjZhdir2KfZhDogQVJJWk8tRVhULTEyMzQpIjoiTmV3IGxpY2Vuc2UgY29kZSAoZS5nLiBBUklaTy1FWFQtMTIzNCkiLCLYp9i52YXYp9mEINqp2K8g2KrZhdiv24zYryI6IlJlZGVlbSBFeHRlbnNpb24gQ29kZSIsItiq2LrbjNuM2LEg2LHZhdiyINi52KjZiNixINit2LPYp9ioINqp2KfYsdio2LHbjCI6IkNoYW5nZSBBY2NvdW50IFBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINmB2LnZhNuMOiI6IkN1cnJlbnQgUGFzc3dvcmQ6Iiwi2LHZhdiyINi52KjZiNixINmB2LnZhNuMINit2LPYp9ioIjoiQ3VycmVudCBhY2NvdW50IHBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINis2K/bjNivOiI6Ik5ldyBQYXNzd29yZDoiLCLYsdmF2LIg2KzYr9uM2K8gKNit2K/Yp9mC2YQg27gg2qnYp9ix2Kfaqdiq2LEpIjoiTmV3IHBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLYsNiu24zYsdmHINix2YXYsiDYudio2YjYsSDYrNiv24zYryI6IlNhdmUgTmV3IFBhc3N3b3JkIiwi2YLYt9i5INin2LHYqtio2KfYtyDYp9qp2KfZhtiqINiq2YTar9ix2KfZhSDYp9iyINiz2YTZgeKAjNio2KfYqiI6IkRpc2Nvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCBmcm9tIFNlbGZib3QiLCLYrdiw2YEg2qnYp9mF2YQg2K3Ys9in2Kgg2qnYp9ix2KjYsduMINmIINiq2YXYp9mF24wg2K/Yp9iv2YfigIzZh9inIjoiUGVybWFuZW50bHkgRGVsZXRlIEFjY291bnQgJiBBbGwgRGF0YSIsItiq2YjZhNuM2K8g2qnYr9mH2KfbjCDZhNin24zYs9mG2LMg2KzYr9uM2K8iOiJHZW5lcmF0ZSBOZXcgTGljZW5zZSBDb2RlcyIsItqp2K/Zh9in24wg2KjYp9iy24zYp9io24wg2KfYtti32LHYp9ix24wiOiJFbWVyZ2VuY3kgUmVjb3ZlcnkgQ29kZXMiLCLYtNmG2KfYs9mHIEQxIjoiRDEgSUQiLCLYtNmG2KfYs9mHIEtWIjoiS1YgSUQiLCLYqNinINmF2YjZgdmC24zYqiDYp9iz2KrYrtix2KfYrCDZiCDYr9ixINmB24zZhNiv2YfYpyDYrNin24zar9iw2KfYsduMINi02K8hIjoiU3VjY2Vzc2Z1bGx5IGV4dHJhY3RlZCBhbmQgZmlsbGVkIGludG8gZmllbGRzISIsItin2LfZhNin2LnYp9iqINio2Kcg2YXZiNmB2YLbjNiqINin2LIg2K7YsdmI2KzbjCDYqtix2YXbjNmG2KfZhCDYtNmG2KfYs9in24zbjCDYtNiv2YbYryEg4pyoIjoiSW5mb3JtYXRpb24gc3VjY2Vzc2Z1bGx5IHJlY29nbml6ZWQgZnJvbSB0ZXJtaW5hbCBvdXRwdXQhIOKcqCIsItmB2KfYsdiz24wiOiJQZXJzaWFuIiwi2aog2KraqdmF24zZhCDYtNiv2YciOiIlIENvbXBsZXRlZCIsItmF2LHYrdmE2Ycg27Ig2KfYsiDbtTog2qnZhNin2K/ZgdmE2LEg2Ygg2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIEQxIjoiU3RlcCAyIG9mIDU6IENsb3VkZmxhcmUgJiBEMSBEYXRhYmFzZSIsItmF2LHYrdmE2Ycg27Mg2KfYsiDbtTog2KrZhNqv2LHYp9mFINmIINix2KjYp9iqINqp2YXaqduMIjoiU3RlcCAzIG9mIDU6IFRlbGVncmFtICYgSGVscGVyIEJvdCIsItmF2LHYrdmE2Ycg27Qg2KfYsiDbtTog2LHYp9mG2LEg27LbtCDYs9in2LnYqtmHIEdpdEh1YiBBY3Rpb25zIjoiU3RlcCA0IG9mIDU6IDI0LzcgR2l0SHViIEFjdGlvbnMgUnVubmVyIiwi2YXYsdit2YTZhyDbtSDYp9iyINu1OiDahtqp4oCM2YTbjNiz2Kog2YbZh9in24zbjNiMINiz2YTYp9mF2Kog2Ygg2KfYqti12KfZhCI6IlN0ZXAgNSBvZiA1OiBGaW5hbCBDaGVja2xpc3QsIEhlYWx0aCAmIENvbm5lY3QiLCLYsdmF2LIg2KrYtdin2K/ZgduMINin24zZhdmGINiq2YjZhNuM2K8g2LTYryDwn46yIjoiU2VjdXJlIHJhbmRvbSBwYXNzd29yZCBnZW5lcmF0ZWQg8J+OsiIsIiMg2YXYqti624zYsdmH2KfbjCDZhdit24zYt9uMINqp2YTYp9uM2YbYqiDYqtmE2q/Ysdin2YUg2Ygg2qnZhNuM2K/Zh9in24wg2YXYr9uM2LHbjNiqXFxuIjoiIyBUZWxlZ3JhbSBDbGllbnQgRW52aXJvbm1lbnQgVmFyaWFibGVzICYgQWRtaW4gS2V5c1xcbiIsIiMg2YXYqti624zYsdmH2KfbjCDZhdit24zYt9uMINqp2YTYp9uM2YbYqiDYqtmE2q/Ysdin2YUg2Ygg2qnZhNuM2K/Zh9in24wg2YXYr9uM2LHbjNiqIjoiIyBUZWxlZ3JhbSBDbGllbnQgRW52aXJvbm1lbnQgVmFyaWFibGVzICYgQWRtaW4gS2V5cyIsItmF2K3YqtmI2KfbjCDZgdin24zZhCB3cmFuZ2xlci50b21sINqp2b7bjCDYtNivISDwn5OLIjoid3JhbmdsZXIudG9tbCBjb250ZW50cyBjb3BpZWQhIPCfk4siLCLZgdin24zZhCB3cmFuZ2xlci50b21sINio2Kcg2YXZiNmB2YLbjNiqINiv2KfZhtmE2YjYryDYtNivISDwn5OlIjoid3JhbmdsZXIudG9tbCBkb3dubG9hZGVkIHN1Y2Nlc3NmdWxseSEg8J+TpSIsItm+2qnbjNisINm+2LTYqtuM2KjYp9mGINqp2KfZhtmB24zaryDYsNiu24zYsdmHINi02K8hIPCfkr4iOiJDb25maWd1cmF0aW9uIGJhY2t1cCBzYXZlZCEg8J+SviIsItii2K/YsdizINiv2KfZhdmG2Ycg2YjYsdqp2LEg2qnZvtuMINi02K8g8J+TiyI6IldvcmtlciBVUkwgY29waWVkIHRvIGNsaXBib2FyZCDwn5OLIiwi2LHZhdiyINix2KfZhtixINqp2b7bjCDYtNivIPCfk4siOiJSdW5uZXIgc2VjcmV0IGNvcGllZCB0byBjbGlwYm9hcmQg8J+TiyIsIvCfk4sg2K/YsSDYrdin2YHYuNmHINqp2b7bjCDYtNivISI6IvCfk4sgQ29waWVkIHRvIGNsaXBib2FyZCEiLCLYrti32Kcg2K/YsSDaqdm+24wg2K7ZiNiv2qnYp9ix2Jsg2YTYt9mB2KfZiyDYr9iz2KrbjCDaqdm+24wg2qnZhtuM2K8iOiJBdXRvLWNvcHkgZmFpbGVkOyBwbGVhc2UgY29weSBtYW51YWxseSIsIjxzcGFuPuKPsyDYr9ixINit2KfZhCDYs9in2K7YqiDYrNiv2KfZiNmELi4uPC9zcGFuPiI6IjxzcGFuPuKPsyBDcmVhdGluZyB0YWJsZXMuLi48L3NwYW4+Iiwi4pyFINis2K/Yp9mI2YQg2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIEQxINio2Kcg2YXZiNmB2YLbjNiqINiz2KfYrtiq2Ycg2LTYr9mG2K8hIjoi4pyFIERhdGFiYXNlIEQxIHRhYmxlcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEiLCI8c3Bhbj7inIUg2KzYr9in2YjZhCDYotmF2KfYr9mHINin2LPYqjwvc3Bhbj4iOiI8c3Bhbj7inIUgVGFibGVzIHJlYWR5PC9zcGFuPiIsItiu2LfYpyDYr9ixINin24zYrNin2K8g2KzYr9in2YjZhCBEMSI6IkVycm9yIGNyZWF0aW5nIEQxIHRhYmxlcyIsIjxzcGFuPuKaoSDYqtmE2KfYtCDZhdis2K/YryDYs9in2K7YqiDYrNiv2KfZiNmEPC9zcGFuPiI6IjxzcGFuPuKaoSBSZXRyeSBDcmVhdGluZyBUYWJsZXM8L3NwYW4+Iiwi2K7Yt9inINiv2LEg2KfYsdiq2KjYp9i3INio2Kcg2LPYsdmI2LE6IjoiU2VydmVyIGNvbm5lY3Rpb24gZXJyb3I6IiwiPHNwYW4+4pqhINiz2KfYrtiqINiu2YjYr9qp2KfYsSDYrNiv2KfZiNmEIEQxPC9zcGFuPiI6IjxzcGFuPuKaoSBBdXRvIENyZWF0ZSBEMSBUYWJsZXM8L3NwYW4+Iiwi2YTYt9mB2KfZiyDYp9io2KrYr9inINiq2YjaqdmGINix2KjYp9iqINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8hIjoiUGxlYXNlIGVudGVyIGJvdCB0b2tlbiBmaXJzdCEiLCI8c3Bhbj7ij7Mg2K/YsSDYrdin2YQg2KjYsdix2LPbjC4uLjwvc3Bhbj4iOiI8c3Bhbj7ij7MgVmVyaWZ5aW5nLi4uPC9zcGFuPiIsIj7Yr9ixINit2KfZhCDYp9ix2KrYqNin2Lcg2KjYpyBBUEkg2KrZhNqv2LHYp9mFLi4uPC9kaXY+IjoiPkNvbm5lY3RpbmcgdG8gVGVsZWdyYW0gQVBJLi4uPC9kaXY+IiwiPuKchSDYqtmI2qnZhiDYqtmE2q/Ysdin2YUg2qnYp9mF2YTYp9mLINmF2LnYqtio2LEg2Ygg2YHYudin2YQg2KfYs9iqITwvZGl2PiI6Ij7inIUgVGVsZWdyYW0gdG9rZW4gaXMgdmFsaWQgYW5kIGFjdGl2ZSE8L2Rpdj4iLCI8ZGl2PjxzdHJvbmc+2YbYp9mFINix2KjYp9iqOjwvc3Ryb25nPiI6IjxkaXY+PHN0cm9uZz5Cb3QgTmFtZTo8L3N0cm9uZz4iLCI8ZGl2PjxzdHJvbmc+24zZiNiy2LHZhtuM2YU6PC9zdHJvbmc+IEAiOiI8ZGl2PjxzdHJvbmc+VXNlcm5hbWU6PC9zdHJvbmc+IEAiLCI8ZGl2PjxzdHJvbmc+2LTZhtin2LPZhyDYudiv2K/bjCDYsdio2KfYqjo8L3N0cm9uZz4gPGNvZGU+IjoiPGRpdj48c3Ryb25nPkJvdCBOdW1lcmljYWwgSUQ6PC9zdHJvbmc+IDxjb2RlPiIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLbjNiqINiq2KfbjNuM2K8g2LTYryDwn6SWIjoiQm90IHZlcmlmaWVkIHN1Y2Nlc3NmdWxseSDwn6SWIiwiPHN0cm9uZz7inYwg2K7Yt9in24wg2KrZhNqv2LHYp9mFOjwvc3Ryb25nPiI6IjxzdHJvbmc+4p2MIFRlbGVncmFtIEVycm9yOjwvc3Ryb25nPiIsItiq2YjaqdmGINmG2KfZhdi52KrYqNixINin2LPYqi4iOiJJbnZhbGlkIGJvdCB0b2tlbi4iLCI8c3Bhbj7wn5qAINiq2LPYqiDYotmG2YTYp9uM2YYg2KrZiNqp2YY8L3NwYW4+IjoiPHNwYW4+8J+agCBUZXN0IEJvdCBUb2tlbiBPbmxpbmU8L3NwYW4+Iiwi2YTYt9mB2KfZiyDYqtmI2qnZhiDYsdio2KfYqiDZiCBDaGF0IElEINi52K/Yr9uMINiu2YjYryDYsdinINmI2KfYsdivINqp2YbbjNivISI6IlBsZWFzZSBlbnRlciBib3QgdG9rZW4gYW5kIG51bWVyaWNhbCBDaGF0IElEISIsIjxzcGFuPuKPsyDYr9ixINit2KfZhCDYp9ix2LPYp9mELi4uPC9zcGFuPiI6IjxzcGFuPuKPsyBTZW5kaW5nLi4uPC9zcGFuPiIsItiv2LEg2K3Yp9mEINin2LHYs9in2YQg2b7bjNin2YUg2KrYs9iqINio2Ycg2KrZhNqv2LHYp9mFLi4uIjoiU2VuZGluZyB0ZXN0IG1lc3NhZ2UgdG8gVGVsZWdyYW0uLi4iLCLwn46JINm+24zYp9mFINio2Kcg2YXZiNmB2YLbjNiqINiv2LEg2KrZhNqv2LHYp9mFINiv2LHbjNin2YHYqiDYtNivISDYsdio2KfYqiDYotmF2KfYr9mHINio2Ycg2qnYp9ixINin2LPYqi4iOiLwn46JIE1lc3NhZ2UgcmVjZWl2ZWQgaW4gVGVsZWdyYW0hIEJvdCBpcyByZWFkeS4iLCLZvtuM2KfZhSDYqtmE2q/Ysdin2YUg2KfYsdiz2KfZhCDYtNivISDwn5OpIjoiVGVsZWdyYW0gbWVzc2FnZSBzZW50ISDwn5OpIiwi4p2MINiu2LfYpzoiOiLinYwgRXJyb3I6Iiwi2KfYsdiz2KfZhCDZhti02K8uINin2LfZhduM2YbYp9mGINit2KfYtdmEINqp2YbbjNivINix2KjYp9iqINix2Kcg2K/YsSDYqtmE2q/Ysdin2YUg2KfYs9iq2KfYsdiqINqp2LHYr9mH4oCM2KfbjNivLiI6Ik5vdCBzZW50LiBNYWtlIHN1cmUgeW91IHN0YXJ0ZWQgdGhlIGJvdCBpbiBUZWxlZ3JhbS4iLCLYrti32Kcg2K/YsSDYp9ix2KrYqNin2Lc6IjoiQ29ubmVjdGlvbiBlcnJvcjoiLCI8c3Bhbj7wn5OpINin2LHYs9in2YQg2b7bjNin2YUg2KrYs9iqPC9zcGFuPiI6IjxzcGFuPvCfk6kgU2VuZCBUZXN0IE1lc3NhZ2U8L3NwYW4+IiwiPtiv2LEg2K3Yp9mEINiv2LHbjNin2YHYqiDZiNi22LnbjNiqINiy2YbYr9mHINin2LIg2LPYsdmI2LEuLi48L2Rpdj4iOiI+RmV0Y2hpbmcgbGl2ZSBzZXJ2ZXIgc3RhdHVzLi4uPC9kaXY+IiwiPvCfn6Ig2YXYqti12YQg2Ygg2KLZhdin2K/Zhzwvc3Bhbj4iOiI+8J+foiBDb25uZWN0ZWQgJiBSZWFkeTwvc3Bhbj4iLCI+8J+UtCDYqti52LHbjNmBINmG2LTYr9mHPC9zcGFuPiI6Ij7wn5S0IE5vdCBEZWZpbmVkPC9zcGFuPiIsIj7wn5+iINmF2KrYtdmEINmIINis2K/Yp9mI2YQg2KLZhdin2K/ZhyAo2KrYudiv2KfYryDaqdmE24zYr9mH2Kc6IjoiPvCfn6IgQ29ubmVjdGVkICYgVGFibGVzIFJlYWR5IChLZXlzIGNvdW50OiIsIj7wn5+hINiv24zYqtin2KjbjNizINmF2KrYtdmEINin2LPYqiDYp9mF2Kcg2KzYr9in2YjZhCDZh9mG2YjYsiDYs9in2K7YqtmHINmG2LTYr9mH4oCM2KfZhtivPC9zcGFuPiI6Ij7wn5+hIERhdGFiYXNlIGNvbm5lY3RlZCBidXQgdGFibGVzIG5vdCBjcmVhdGVkIHlldDwvc3Bhbj4iLCI+8J+UtCDZhdiq2LXZhCDZhtuM2LPYqjwvc3Bhbj4iOiI+8J+UtCBOb3QgQ29ubmVjdGVkPC9zcGFuPiIsIj7wn5+iINmB2LnYp9mEINmIINin2YXZhjwvc3Bhbj4iOiI+8J+foiBBY3RpdmUgJiBTZWN1cmU8L3NwYW4+IiwiPuKaoO+4jyDYqNiv2YjZhiDYsdmF2LI8L3NwYW4+IjoiPuKaoO+4jyBObyBQYXNzd29yZCBTZXQ8L3NwYW4+IiwiPuKaoSDYs9in2K7YqiDZgdmI2LHbjCDYrNiv2KfZiNmEINiv24zYqtin2KjbjNizIEQxPC9idXR0b24+IjoiPuKaoSBDcmVhdGUgRDEgRGF0YWJhc2UgVGFibGVzIEluc3RhbnRseTwvYnV0dG9uPiIsIjxzcGFuPvCfjJAg2KLYr9ix2LMg2K/Yp9mF2YbZhyDZiNix2qnYsTo8L3NwYW4+IjoiPHNwYW4+8J+MkCBXb3JrZXIgRG9tYWluIFVSTDo8L3NwYW4+IiwiPHNwYW4+4pqhINiz2LHYudiqINm+2KfYs9iuINiz2LHZiNixIChMYXRlbmN5KTo8L3NwYW4+IjoiPHNwYW4+4pqhIFNlcnZlciBMYXRlbmN5Ojwvc3Bhbj4iLCI8c3Bhbj7imqEg2K3Yp9mB2LjZhyDZvtix2LPYsdi52KogQ2xvdWRmbGFyZSBLVjo8L3NwYW4+IjoiPHNwYW4+4pqhIENsb3VkZmxhcmUgS1YgU3RvcmFnZTo8L3NwYW4+IiwiPHNwYW4+8J+XhO+4jyDZvtin24zar9in2Ycg2K/Yp9iv2YcgQ2xvdWRmbGFyZSBEMTo8L3NwYW4+IjoiPHNwYW4+8J+XhO+4jyBDbG91ZGZsYXJlIEQxIERhdGFiYXNlOjwvc3Bhbj4iLCI8c3Bhbj7wn5SRINqp2YTbjNivINmF2LPYqtixINin2K/ZhduM2YYgKEFETUlOX1BBU1NXT1JEKTo8L3NwYW4+IjoiPHNwYW4+8J+UkSBNYXN0ZXIgQWRtaW4gS2V5Ojwvc3Bhbj4iLCI8c3Bhbj7wn5OxINqp2YTYp9uM2YbYqiDYsdiz2YXbjCDYqtmE2q/Ysdin2YUgKEFQSV9JRCk6PC9zcGFuPiI6IjxzcGFuPvCfk7EgVGVsZWdyYW0gT2ZmaWNpYWwgQVBJX0lEOjwvc3Bhbj4iLCI+8J+foiDYp9iz2KrYp9mG2K/Yp9ix2K8gKDIwNDApPC9zcGFuPiI6Ij7wn5+iIFN0YW5kYXJkICgyMDQwKTwvc3Bhbj4iLCLimqog2b7bjNi04oCM2YHYsdi2Ijoi4pqqIERlZmF1bHQiLCI+2KjYs9iq2YYg2b7Zhtis2LHZhyDYuduM2KjigIzbjNin2KjbjDwvYnV0dG9uPiI6Ij5DbG9zZSBEaWFnbm9zdGljIFdpbmRvdzwvYnV0dG9uPiIsIj7Yrti32Kcg2K/YsSDYr9ix24zYp9mB2Kog2YjYtti524zYqiDYs9ix2YjYsS48L2Rpdj4iOiI+RXJyb3IgZmV0Y2hpbmcgc2VydmVyIHN0YXR1cy48L2Rpdj4iLCI+2LnYr9mFINin2YXaqdin2YYg2K/Ys9iq2LHYs9uMINio2Ycg2LPYsdmI2LE6IjoiPkNhbm5vdCBhY2Nlc3Mgc2VydmVyOiIsItiq2YXYp9mFINiz2qnYsdiq4oCM2YfYpyDYqNmHINi12YjYsdiqINuM2qnYrNinINqp2b7bjCDYtNiv2YbYryEg8J+TpiI6IkFsbCBzZWNyZXRzIGNvcGllZCB0byBjbGlwYm9hcmQhIPCfk6YiLCLZhNi32YHYp9mLINqp2K8g2YTYp9uM2LPZhtizINiq2YXYr9uM2K8g2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlBsZWFzZSBlbnRlciBleHRlbnNpb24gbGljZW5zZSBjb2RlIiwi2K3Ys9in2Kgg2LTZhdinINio2Kcg2YXZiNmB2YLbjNiqINin2LIg2K3Yp9mE2Kog2KrYudmE24zZgiDYrtin2LHYrCDZiCDYtNin2LHamCDYtNivISDwn46JIjoiWW91ciBhY2NvdW50IGhhcyBiZWVuIHVubG9ja2VkIGFuZCByZW5ld2VkISDwn46JIiwi2qnYryDZiNin2LHYryDYtNiv2Ycg2YbYp9mF2LnYqtio2LEg2KfYs9iqIjoiSW52YWxpZCBsaWNlbnNlIGNvZGUiLCLYrti32KfbjCDYp9ix2KrYqNin2Lcg2KjYpyDYs9ix2YjYsSI6IlNlcnZlciBjb25uZWN0aW9uIGVycm9yIiwi2qnYryDZhNin24zYs9mG2LMg2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlBsZWFzZSBlbnRlciBsaWNlbnNlIGNvZGUiLCLYp9i02KrYsdin2qkgQXJpem8gU2VsZiDYtNmF2Kcg2KrZhdiv24zYryDar9ix2K/bjNivISDwn46JIjoiWW91ciBBcml6byBTZWxmIHN1YnNjcmlwdGlvbiB3YXMgcmVuZXdlZCEg8J+OiSIsItqp2K8g2YbYp9mF2LnYqtio2LEg2KfYs9iqIjoiSW52YWxpZCBjb2RlIiwi2K7Yt9in24wg2LTYqNqp2YciOiJOZXR3b3JrIGVycm9yIiwi2YbYp9mFINqp2KfYsdio2LHbjCDYqNin24zYryDYrdiv2KfZgtmEINuzINqp2KfYsdin2qnYqtixINio2KfYtNivIjoiVXNlcm5hbWUgbXVzdCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMiLCLYsdmF2LIg2LnYqNmI2LEg2KjYp9uM2K8g2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSDYqNin2LTYryI6IlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIiwi2Kraqdix2KfYsSDYsdmF2LIg2LnYqNmI2LEg2KrYt9in2KjZgiDZhtiv2KfYsdivIjoiUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCIsItit2LPYp9ioIEFyaXpvIFNlbGYg2KjYpyDZhdmI2YHZgtuM2Kog2YHYudin2YQg2LTYryDinKgiOiJBcml6byBTZWxmIGFjY291bnQgYWN0aXZhdGVkIHN1Y2Nlc3NmdWxseSDinKgiLCLYrti32Kcg2K/YsSDYq9io2KrigIzZhtin2YUiOiJSZWdpc3RyYXRpb24gZXJyb3IiLCLZhtin2YUg2qnYp9ix2KjYsduMINmIINix2YXYsiDYudio2YjYsSDYsdinINmI2KfYsdivINqp2YbbjNivIjoiUGxlYXNlIGVudGVyIHVzZXJuYW1lIGFuZCBwYXNzd29yZCIsItqp2K8g2KrYp9uM24zYryDYr9mIINmF2LHYrdmE2YfigIzYp9uMINmI2KfYsdivINmG2LTYryI6IjJGQSBjb2RlIG5vdCBlbnRlcmVkIiwi2K7ZiNi0INii2YXYr9uM2K8hINmI2LHZiNivINiv2Ygg2YXYsdit2YTZh+KAjNin24wg2YXZiNmB2YLbjNiq4oCM2KLZhduM2LIg2KjZiNivIOKchSI6IldlbGNvbWUhIDJGQSBsb2dpbiBzdWNjZXNzZnVsIOKchSIsItqp2K8g27JGQSDZhtin2K/Ysdiz2Kog2KfYs9iqIjoiSW52YWxpZCAyRkEgY29kZSIsItiu2YjYtCDYotmF2K/bjNivISDZiNix2YjYryDZhdmI2YHZgtuM2KrigIzYotmF24zYsiDYqNmI2K8g4pyFIjoiV2VsY29tZSEgTG9naW4gc3VjY2Vzc2Z1bCDinIUiLCLZhtin2YUg2qnYp9ix2KjYsduMINuM2Kcg2LHZhdiyINmG2KfYr9ix2LPYqiDYp9iz2KoiOiJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkIiwi2YTYt9mB2KfZiyDZh9ixINiv2Ygg2LHZhdiyINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8iOiJQbGVhc2UgZW50ZXIgYm90aCBwYXNzd29yZHMiLCLYsdmF2LIg2KzYr9uM2K8g2KjYp9uM2K8g2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSDYqNin2LTYryI6Ik5ldyBwYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyIsItix2YXYsiDYudio2YjYsSDYqti624zbjNixINuM2KfZgdiqIPCflJIiOiJQYXNzd29yZCBjaGFuZ2VkIHN1Y2Nlc3NmdWxseSDwn5SSIiwi2K7Yt9inINiv2LEg2KrYutuM24zYsSDYsdmF2LIiOiJFcnJvciBjaGFuZ2luZyBwYXNzd29yZCIsItiz2YTZgeKAjNio2KfYqiDZgdi52KfZhCDYtNivIPCfn6IiOiJTZWxmYm90IGFjdGl2YXRlZCDwn5+iIiwi2LPZhNmB4oCM2KjYp9iqINmF2KrZiNmC2YEg2LTYryDij7jvuI8iOiJTZWxmYm90IHBhdXNlZCDij7jvuI8iLCLYrti32Kcg2K/YsSDYrdiw2YEg2K3Ys9in2KgiOiJFcnJvciBkZWxldGluZyBhY2NvdW50Iiwi2LTZhdin2LHZhyDYqtmE2YHZhiDYsdinINmI2KfYsdivINqp2YbbjNivIjoiUGxlYXNlIGVudGVyIHBob25lIG51bWJlciIsItqp2K8g27Ug2LHZgtmF24wg2KjZhyDYqtmE2q/Ysdin2YUg2KfYsdiz2KfZhCDar9ix2K/bjNivIOKchSI6IjUtZGlnaXQgY29kZSBzZW50IHRvIFRlbGVncmFtIOKchSIsItqp2K8g2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlBsZWFzZSBlbnRlciB2ZXJpZmljYXRpb24gY29kZSIsItin2qnYp9mG2Kog2K/Yp9ix2KfbjCDYqtij24zbjNivINiv2YjZhdix2K3ZhNmH4oCM2KfbjCDYp9iz2Kog8J+UkiI6IkFjY291bnQgaGFzIHR3by1zdGVwIHZlcmlmaWNhdGlvbiBlbmFibGVkIPCflJIiLCLYqtmE2q/Ysdin2YUg2KjYpyDZhdmI2YHZgtuM2Kog2YXYqti12YQg2LTYryEg8J+OiSI6IlRlbGVncmFtIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCfjokiLCLYsdmF2LIg2K/ZiNi52KfZhdmE24wg2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlBsZWFzZSBlbnRlciAyRkEgcGFzc3dvcmQiLCLYqtmE2q/Ysdin2YUg2YXYqti12YQg2Ygg2LPYtNmGINin2YXZhiDYtNivISDwn46JIjoiVGVsZWdyYW0gY29ubmVjdGVkICYgc2Vzc2lvbiBzZWN1cmVkISDwn46JIiwi2K7Yt9inOiI6IkVycm9yOiIsItiz2LTZhiDYsdinINmI2KfYsdivINqp2YbbjNivIjoiUGxlYXNlIGVudGVyIHN0cmluZyBzZXNzaW9uIiwi2LPYtNmGINmF2LPYqtmC24zZhSDZhdiq2LXZhCDYtNivISDwn5qAIjoiRGlyZWN0IHNlc3Npb24gY29ubmVjdGVkISDwn5qAIiwi2K7Yt9inINiv2LEg2KvYqNiqINiz2LTZhiI6IkVycm9yIHJlZ2lzdGVyaW5nIHNlc3Npb24iLCLZgtin2YTYqCDYqNuM2Yjar9ix2KfZgduMINin2YbYqtiu2KfYqCDZiCDYp9i52YXYp9mEINi02K8g4pyoIjoiQmlvIHRlbXBsYXRlIGFwcGxpZWQgc3VjY2Vzc2Z1bGx5IOKcqCIsItiq2YbYuNuM2YXYp9iqINin2LPYqtmI2K/bjNmIIEFyaXpvINiw2K7bjNix2Ycg2Ygg2KLZhtuMINin2LnZhdin2YQg2LTYryDinKgiOiJBcml6byBTdHVkaW8gc2V0dGluZ3Mgc2F2ZWQgJiBhcHBsaWVkIOKcqCIsItiu2LfYpyDYr9ixINiw2K7bjNix2YfigIzYs9in2LLbjCI6IkVycm9yIHNhdmluZyBzZXR0aW5ncyIsItmE2LfZgdin2Ysg2KrZiNqp2YYg2LHYqNin2Kog2K/YsduM2KfZgdiq24wg2KfYsiBCb3RGYXRoZXJAINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8iOiJQbGVhc2UgZW50ZXIgYm90IHRva2VuIGZyb20gQEJvdEZhdGhlciIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLbjNiqINmF2KrYtdmEINi02K8hIPCfjokiOiJCb3QgY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSEg8J+OiSIsItiu2LfYpyDYr9ixINin2LnYqtio2KfYsdiz2YbYrNuMINiq2YjaqdmGIjoiRXJyb3IgdmFsaWRhdGluZyB0b2tlbiIsItin2KrYtdin2YQg2LHYqNin2Kog2KjYpyDZhdmI2YHZgtuM2Kog2YLYt9i5INi02K8g2Ygg2K3Yp9mB2LjZhyDaqdmE2KfYr9mB2YTYsSDZvtin2qnYs9in2LLbjCDar9ix2K/bjNivIOKcqCI6IkJvdCBkaXNjb25uZWN0ZWQgJiBDbG91ZGZsYXJlIHN0b3JhZ2UgY2xlYW5lZCDinKgiLCLYrti32Kcg2K/YsSDZgti32Lkg2KfYqti12KfZhCDYsdio2KfYqiI6IkVycm9yIGRpc2Nvbm5lY3RpbmcgYm90Iiwi2K7Yt9in24wg2LTYqNqp2Ycg2K/YsSDYp9ix2KrYqNin2Lcg2KjYpyDYs9ix2YjYsSI6Ik5ldHdvcmsgZXJyb3IgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlciIsIti02YbYp9iz2Ycg2LnYr9iv24wg2KrZhNqv2LHYp9mFINio2KfbjNivINi02KfZhdmEINu1INiq2Kcg27HbtSDYsdmC2YUg2KjYp9i02K8iOiJOdW1lcmljYWwgVGVsZWdyYW0gSUQgbXVzdCBiZSA1IHRvIDE1IGRpZ2l0cyIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLbjNiqINix2YjbjCDYtNmG2KfYs9mHINmC2YHZhCDYtNivISDwn5SSIjoiQm90IHN1Y2Nlc3NmdWxseSBsb2NrZWQgdG8gSUQhIPCflJIiLCLYrti32Kcg2K/YsSDYq9io2Kog2LTZhtin2LPZhyDZhdin2YTaqSI6IkVycm9yIHJlZ2lzdGVyaW5nIG93bmVyIElEIiwi8J+Xke+4jyDaqdmE24zYryBBUEkg2YfZiNi0INmF2LXZhtmI2LnbjCDYqNmHINi32YjYsSDaqdin2YXZhCDZvtin2qnYs9in2LLbjCDYtNivINmIINiq2K/Yp9iu2YQg2KjYsdi32LHZgSDar9ix2K/bjNivISI6IvCfl5HvuI8gQUkgQVBJIEtleSBjbGVhcmVkIGFuZCBjb25mbGljdHMgcmVzb2x2ZWQhIiwi2LPYp9i52Kog2KrZhNqv2LHYp9mFINio2Kcg2YHZiNmG2Kog2Ygg2KrZhti424zZhdin2Kog2KzYr9uM2K8g2KLZvtiv24zYqiDYtNivISDwn5qAIjoiVGVsZWdyYW0gY2xvY2sgdXBkYXRlZCB3aXRoIG5ldyBzdHlsZSEg8J+agCIsItmG2KfYtNmG2KfYrtiq2YciOiJVbmtub3duIiwi2KfYqti12KfZhCDYqtmE2q/Ysdin2YUg2YLYt9i5INqv2LHYr9uM2K8iOiJUZWxlZ3JhbSBkaXNjb25uZWN0ZWQiLCLYrti32Kcg2K/YsSDYqNin2LHar9iw2KfYsduMINit2LPYp9ioIjoiRXJyb3IgbG9hZGluZyBhY2NvdW50Iiwi2K7Yt9inINiv2LEg2LHYp9mH4oCM2KfZhtiv2KfYstuMINuyRkEiOiJFcnJvciBzZXR0aW5nIHVwIDJGQSIsItio2KfYsdqp2K8gUVIg2Ygg2qnZhNuM2K8g2KfYrtiq2LXYp9i124wg2KjYpyDZhdmI2YHZgtuM2Kog2LPYp9iu2KrZhyDYtNivIPCfk7ciOiJRUiBjb2RlICYgc2VjcmV0IGtleSBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5IPCfk7ciLCLaqdmE24zYryDZhdit2LHZhdin2YbZhyDbskZBINqp2b7bjCDYtNivIPCfk4siOiIyRkEgU2VjcmV0IEtleSBjb3BpZWQg8J+TiyIsItiu2LfYpyDYr9ixINqp2b7bjCDaqdmE24zYryI6IkVycm9yIGNvcHlpbmcga2V5Iiwi2qnYryDYqNin2LLbjNin2KjbjCDZhdmI2KzZiNivINmG24zYs9iqIjoiTm8gcmVjb3ZlcnkgY29kZSBhdmFpbGFibGUiLCLYqtmF2KfZhduMINqp2K/Zh9in24wg2KfYtti32LHYp9ix24wg2qnZvtuMINi02K/ZhtivIPCfk4siOiJBbGwgcmVjb3ZlcnkgY29kZXMgY29waWVkIPCfk4siLCLYrti32Kcg2K/YsSDaqdm+24wg2qnYr9mH2KciOiJFcnJvciBjb3B5aW5nIGNvZGVzIiwi2YTYt9mB2KfZiyDaqdivINu2INix2YLZhduMINiq2YjZhNuM2K/YtNiv2Ycg2K/YsSDYp9m+2YTbjNqp24zYtNmGINix2Kcg2KjZhyDYr9ix2LPYqtuMINmI2KfYsdivINqp2YbbjNivIjoiUGxlYXNlIGVudGVyIHZhbGlkIDYtZGlnaXQgYXV0aGVudGljYXRvciBjb2RlIiwi2qnYryDZiNin2LHYryDYtNiv2Ycg2YbYp9iv2LHYs9iqINuM2Kcg2YXZhtmC2LbbjCDYp9iz2KouINmE2LfZgdin2Ysg2qnYryDYrNiv24zYryDYp9m+2YTbjNqp24zYtNmGINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8uIjoiQ29kZSBpbnZhbGlkIG9yIGV4cGlyZWQuIFBsZWFzZSBlbnRlciBsYXRlc3QgYXBwIGNvZGUuIiwi2KfYrdix2KfYsiDZh9mI24zYqiDYr9mIINmF2LHYrdmE2YfigIzYp9uMINio2Kcg2YXZiNmB2YLbjNiqINmB2LnYp9mEINi02K8hIPCfjokiOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uIGVuYWJsZWQhIPCfjokiLCLYrti32KfbjCDYtNio2qnZhyDYr9ixINio2LHZgtix2KfYsduMINin2LHYqtio2KfYtyI6Ik5ldHdvcmsgY29ubmVjdGlvbiBlcnJvciIsItin2K3Ysdin2LIg2YfZiNuM2Kog27JGQSDYutuM2LHZgdi52KfZhCDYtNivIjoiMkZBIEF1dGhlbnRpY2F0aW9uIGRpc2FibGVkIiwi2LHZhdiyINi52KjZiNixINuM2Kcg2qnYryDZhtin2YXYudiq2KjYsSDYp9iz2KoiOiJJbnZhbGlkIHBhc3N3b3JkIG9yIGNvZGUiLCLYrti32KfbjCDYs9ix2YjYsSI6IlNlcnZlciBlcnJvciIsItix2YXYsiDYudio2YjYsSDYrdiz2KfYqCDYqNix2KfbjCDYsdmF2LLZhtqv2KfYsduMINmB2KfbjNmEINio2qnYp9m+INin2YTYstin2YXbjCDYp9iz2KoiOiJBY2NvdW50IHBhc3N3b3JkIHJlcXVpcmVkIHRvIGVuY3J5cHQgYmFja3VwIiwi2K7Yt9inINiv2LEg2KfbjNis2KfYryDYqNqp2KfZviI6IkVycm9yIGNyZWF0aW5nIGJhY2t1cCIsItmB2KfbjNmEINm+2LTYqtuM2KjYp9mGINix2YXYstmG2q/Yp9ix24zigIzYtNiv2Ycg2K/Yp9mG2YTZiNivINi02K8g4pyFIjoiRW5jcnlwdGVkIGJhY2t1cCBkb3dubG9hZGVkIOKchSIsItiu2LfYpyDYr9ixINiv2LHbjNin2YHYqiDYqNqp2KfZviI6IkVycm9yIGRvd25sb2FkaW5nIGJhY2t1cCIsItmE2LfZgdin2Ysg2KfYqNiq2K/YpyDZgdin24zZhCDYqNqp2KfZviAoLmpzb24pINix2Kcg2KfZhtiq2K7Yp9ioINqp2YbbjNivIjoiUGxlYXNlIHNlbGVjdCBhIGJhY2t1cCBmaWxlICguanNvbikiLCLYsdmF2LIg2LnYqNmI2LEg2YHYp9uM2YQg2Kjaqdin2b4g2LHYpyDZiNin2LHYryDaqdmG24zYryI6IlBsZWFzZSBlbnRlciBiYWNrdXAgcGFzc3dvcmQiLCLYqNin2LLbjNin2KjbjCDZhtiz2K7ZhyDZvti02KrbjNio2KfZhiDYqNinINmF2YjZgdmC24zYqiDYp9mG2KzYp9mFINi02K8hIPCflIQiOiJCYWNrdXAgcmVzdG9yZWQgc3VjY2Vzc2Z1bGx5ISDwn5SEIiwi2K7Yt9inINiv2LEg2KjYp9iy24zYp9io24wgKNix2YXYsiDYp9i02KrYqNin2Ycg2KfYs9iqINuM2Kcg2YHYp9uM2YQg2K/Ys9iq2qnYp9ix24wg2LTYr9mHKSI6IlJlc3RvcmUgZXJyb3IgKGluY29ycmVjdCBwYXNzd29yZCBvciBjb3JydXB0ZWQgZmlsZSkiLCLYrti32Kcg2K/YsSDZvtix2K/Yp9iy2LQg2YHYp9uM2YQg2Kjaqdin2b4iOiJFcnJvciBwcm9jZXNzaW5nIGJhY2t1cCBmaWxlIiwi2KvYp9mG24zZhyDZvtuM2LQiOiJzZWNvbmRzIGFnbyIsItiv2YLbjNmC2Ycg2b7bjNi0IjoibWludXRlcyBhZ28iLCLYr9ixINin2YbYqti42KfYsSDZhtiu2LPYqtuM2YYg2YfZhdqv2KfZheKAjNiz2KfYstuMIjoiV2FpdGluZyBmb3IgZmlyc3Qgc3luYyIsItmB2LnYp9mEINmIINmF2K3Yp9mB2LjYquKAjNi02K/ZhyDwn5+iIjoiQWN0aXZlICYgUHJvdGVjdGVkIPCfn6IiLCLYp9i02KrYsdin2qk6INmF2LnZhNmCINmIINmF2YbZgti224wg8J+UtCI6IlN1YnNjcmlwdGlvbjogU3VzcGVuZGVkICYgRXhwaXJlZCDwn5S0Iiwi4o+477iPINio2Ycg2K3Yp9mE2Kog2KrYudmE24zZgiDYr9ix2KLZhdiv2YcgKNmF2YbZgti224wpIjoi4o+477iPIFN1c3BlbmRlZCAoRXhwaXJlZCkiLCLwn5SSINiz2YTZgeKAjNio2KfYqiDZhdi52YTZgiDYp9iz2KoiOiLwn5SSIFNlbGZib3QgaXMgU3VzcGVuZGVkIiwi2KrYudmE24zZgiDYqNmHINi52YTYqiDZvtin24zYp9mGINmF2K/YqiDYstmF2KfZhiDYp9i02KrYsdin2qkiOiJTdXNwZW5kZWQgZHVlIHRvIHN1YnNjcmlwdGlvbiBleHBpcnkiLCLYr9in2KbZhduMIOKZvu+4jyI6IkxpZmV0aW1lIOKZvu+4jyIsItix2YjYsiDYp9i52KrYqNin2LEg2KjYp9mC24zigIzZhdin2YbYr9mHIjoiZGF5cyByZW1haW5pbmciLCLYp9i02KrYsdin2qk6IjoiU3Vic2NyaXB0aW9uOiIsItix2KjYp9iqINmF2KrYtdmEIjoiQm90IENvbm5lY3RlZCIsIvCflJIg2YLZgdmEINix2YjbjCDYtNmG2KfYs9mHOiI6IvCflJIgTG9ja2VkIHRvIElEOiIsItix2KjYp9iqINio2Ycg2LXZiNix2Kog27HbsNuw2aog2KfZhtit2LXYp9ix24wg2YHZgti3INio2Ycg2KfbjNmGINi02YbYp9iz2Ycg2LnYr9iv24wg2b7Yp9iz2K4g2YXbjOKAjNiv2YfYryDZiCDYqNix2KfbjCDYs9in24zYsduM2YYg2YXYs9iv2YjYryDYp9iz2KouIjoiQm90IGV4Y2x1c2l2ZWx5IHJlc3BvbmRzIG9ubHkgdG8gdGhpcyBudW1lcmljYWwgSUQgYW5kIGlnbm9yZXMgYWxsIG90aGVycy4iLCLwn5SSINii2YXYp9iv2Ycg2YLZgdmEINiu2YjYr9qp2KfYsSDYqNinINin2YjZhNuM2YYgL3N0YXJ0Ijoi8J+UkiBSZWFkeSB0byBhdXRvLWxvY2sgb24gZmlyc3QgL3N0YXJ0Iiwi2K/Ys9iq2YjYsSDYr9in2YbZhNmI2K8g2Ygg2YbYtdioINiv2LEg2K3Yp9mB2LjZhyDaqdm+24wg2LTYryEg8J+TiyI6Ikluc3RhbGwgY29tbWFuZCBjb3BpZWQgdG8gY2xpcGJvYXJkISDwn5OLIiwi2KfYqNiq2K/Yp9uMINin2LPYqtmI2K/bjNmIIjoiU3RhcnQgb2YgU3R1ZGlvIiwi2b7Yp9uM2KfZhiDYp9iz2KrZiNiv24zZiCI6IkVuZCBvZiBTdHVkaW8iLCJMYW5ndWFnZSBzd2l0Y2hlZCB0byBFbmdsaXNoIPCfh6zwn4enIjoiTGFuZ3VhZ2Ugc3dpdGNoZWQgdG8gRW5nbGlzaCDwn4es8J+HpyIsItiy2KjYp9mGINio2Ycg2YHYp9ix2LPbjCDYqti624zbjNixINuM2KfZgdiqIPCfh67wn4e3Ijoi2LLYqNin2YYg2KjZhyDZgdin2LHYs9uMINiq2LrbjNuM2LEg24zYp9mB2Kog8J+HrvCfh7ciLCLYqti624zbjNixINiy2KjYp9mGINio2Ycg2YHYp9ix2LPbjCI6IlN3aXRjaCBMYW5ndWFnZSB0byBQZXJzaWFuIiwiU3dpdGNoIExhbmd1YWdlIHRvIEVuZ2xpc2giOiJTd2l0Y2ggTGFuZ3VhZ2UgdG8gRW5nbGlzaCIsItiq2LrbjNuM2LEg2LLYqNin2YYg2KjZhyDYp9mG2q/ZhNuM2LPbjCI6IlN3aXRjaCBMYW5ndWFnZSB0byBFbmdsaXNoIiwi2qnYr9mH2KfbjCDYqNin2LLbjNin2KjbjCDYp9i22LfYsdin2LHbjCBBcml6byBTZWxmICgyRkEgUmVjb3ZlcnkgQ29kZXMpOlxcbiI6IkFyaXpvIFNlbGYgRW1lcmdlbmN5IFJlY292ZXJ5IENvZGVzICgyRkEpOlxcbiIsItio2LHYp9uMINi624zYsdmB2LnYp9mE4oCM2LPYp9iy24wg27JGQdiMINix2YXYsiDYudio2YjYsSDYrdiz2KfYqCDaqdin2LHYqNix24wg24zYpyDaqdivINu2INix2YLZhduMIEF1dGhlbnRpY2F0b3Ig2LHYpyDZiNin2LHYryDaqdmG24zYrzoiOiJUbyBkaXNhYmxlIDJGQSwgZW50ZXIgYWNjb3VudCBwYXNzd29yZCBvciA2LWRpZ2l0IEF1dGhlbnRpY2F0b3IgY29kZToiLCLYtNmG2KfYs9mHINi52K/Yr9uMINin2qnYp9mG2Kog2KrZhNqv2LHYp9mFINiu2YjYryDYsdinINmI2KfYsdivINqp2YbbjNivICjZgdmC2Lcg2KfbjNmGINi02YbYp9iz2Ycg2KfYrNin2LLZhyDYp9ix2LPYp9mEINiv2LPYqtmI2LEg2KjZhyDYsdio2KfYqiDYsdinINiu2YjYp9mH2K8g2K/Yp9i02KopOiI6IkVudGVyIG51bWVyaWNhbCBUZWxlZ3JhbSBJRCAob25seSB0aGlzIElEIHdpbGwgYmUgYWxsb3dlZCB0byBpc3N1ZSBib3QgY29tbWFuZHMpOiIsItii24zYpyDYp9iyINmC2LfYuSDYp9iq2LXYp9mEINiz2YTZgeKAjNio2KfYqiDYp9i32YXbjNmG2KfZhiDYr9in2LHbjNiv2J8iOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzY29ubmVjdCBzZWxmYm90PyIsIjxzcGFuPtiq2KPbjNuM2K8g2qnYryDYp9ix2LPYp9mE24wg2KrZhNqv2LHYp9mFPC9zcGFuPiI6IjxzcGFuPlZlcmlmeSBUZWxlZ3JhbSBTTVMgQ29kZTwvc3Bhbj4iLCI8c3Bhbj7ZiNix2YjYryDYqNinINix2YXYsiDYr9mI2LnYp9mF2YTbjDwvc3Bhbj4iOiI8c3Bhbj5Mb2dpbiB3aXRoIDJGQSBQYXNzd29yZDwvc3Bhbj4iLCI8c3Bhbj7YqtmE2KfYtCDZhdis2K/Yrzwvc3Bhbj4iOiI8c3Bhbj5SZXRyeTwvc3Bhbj4iLCI8c3Bhbj7Yp9iq2LXYp9mEINmIINix2YXYstmG2q/Yp9ix24wg2YHZiNix24wg2KjYpyBBRVMtMjU2PC9zcGFuPiI6IjxzcGFuPkNvbm5lY3QgJiBFbmNyeXB0IHdpdGggQUVTLTI1Njwvc3Bhbj4iLCI8c3Bhbj7imqEg2KfYqti12KfZhCDZiCDZgdi52KfZhOKAjNiz2KfYstuMINmI2KjigIzZh9mI2qk8L3NwYW4+IjoiPHNwYW4+4pqhIENvbm5lY3QgJiBBY3RpdmF0ZSBXZWJob29rPC9zcGFuPiIsIjxzcGFuPvCflIwg2YLYt9i5INin2KrYtdin2YQg2LHYqNin2Ko8L3NwYW4+IjoiPHNwYW4+8J+UjCBEaXNjb25uZWN0IEJvdDwvc3Bhbj4iLCI8c3Bhbj7imqEg2KrYs9iqINio2YfigIzYsdmI2LLYsdiz2KfZhtuMINii2YbbjDwvc3Bhbj4iOiI8c3Bhbj7imqEgVGVzdCBSZWFsLXRpbWUgVXBkYXRlPC9zcGFuPiIsIjxzcGFuPvCflJAg2LHYp9mH4oCM2KfZhtiv2KfYstuMINmIINmB2LnYp9mE4oCM2LPYp9iy24wg27JGQTwvc3Bhbj4iOiI8c3Bhbj7wn5SQIFNldHVwICYgRW5hYmxlIDJGQTwvc3Bhbj4iLCI8c3Bhbj7Yqtij24zbjNivINmG2YfYp9uM24wg2Ygg2YHYudin2YTigIzYs9in2LLbjCDbskZBPC9zcGFuPiI6IjxzcGFuPkNvbmZpcm0gJiBBY3RpdmF0ZSAyRkE8L3NwYW4+Iiwi2K/YsduM2KfZgdiqINqp2K8g2KrYo9uM24zYryDZiNix2YjYryI6IlJlY2VpdmUgTG9naW4gQ29kZSIsItiq2KPbjNuM2K8g2Ygg2KfYqti12KfZhCDYqNmHINiz2YTZgeKAjNio2KfYqiI6IlZlcmlmeSAmIENvbm5lY3QgU2VsZmJvdCIsItio2LHYsdiz24wg2Ygg2YHYudin2YTigIzYs9in2LLbjCDYs9i02YYiOiJWZXJpZnkgJiBBY3RpdmF0ZSBTZXNzaW9uIiwi4o+zINiv2LEg2K3Yp9mEINiz2KfYrtiqINis2K/Yp9mI2YQuLi4iOiLij7MgQ3JlYXRpbmcgdGFibGVzLi4uIiwi4pyFINis2K/Yp9mI2YQg2KLZhdin2K/ZhyDYp9iz2KoiOiLinIUgVGFibGVzIHJlYWR5Iiwi4pqhINiq2YTYp9i0INmF2KzYr9ivINiz2KfYrtiqINis2K/Yp9mI2YQiOiLimqEgUmV0cnkgQ3JlYXRpbmcgVGFibGVzIiwi4o+zINiv2LEg2K3Yp9mEINio2LHYsdiz24wuLi4iOiLij7MgVmVyaWZ5aW5nLi4uIiwi2YbYp9mFINix2KjYp9iqOiI6IkJvdCBOYW1lOiIsIti02YbYp9iz2Ycg2LnYr9iv24wg2LHYqNin2Ko6IjoiQm90IE51bWVyaWNhbCBJRDoiLCLinYwg2K7Yt9in24wg2KrZhNqv2LHYp9mFOiI6IuKdjCBUZWxlZ3JhbSBFcnJvcjoiLCLij7Mg2K/YsSDYrdin2YQg2KfYsdiz2KfZhC4uLiI6IuKPsyBTZW5kaW5nLi4uIiwi8J+MkCDYotiv2LHYsyDYr9in2YXZhtmHINmI2LHaqdixOiI6IvCfjJAgV29ya2VyIERvbWFpbiBVUkw6Iiwi4pqhINiz2LHYudiqINm+2KfYs9iuINiz2LHZiNixIChMYXRlbmN5KToiOiLimqEgU2VydmVyIExhdGVuY3k6Iiwi4pqhINit2KfZgdi42Ycg2b7Ysdiz2LHYudiqIENsb3VkZmxhcmUgS1Y6Ijoi4pqhIENsb3VkZmxhcmUgS1YgU3RvcmFnZToiLCLwn5eE77iPINm+2KfbjNqv2KfZhyDYr9in2K/ZhyBDbG91ZGZsYXJlIEQxOiI6IvCfl4TvuI8gQ2xvdWRmbGFyZSBEMSBEYXRhYmFzZToiLCLwn5SRINqp2YTbjNivINmF2LPYqtixINin2K/ZhduM2YYgKEFETUlOX1BBU1NXT1JEKToiOiLwn5SRIE1hc3RlciBBZG1pbiBLZXk6Iiwi8J+TsSDaqdmE2KfbjNmG2Kog2LHYs9mF24wg2KrZhNqv2LHYp9mFIChBUElfSUQpOiI6IvCfk7EgVGVsZWdyYW0gT2ZmaWNpYWwgQVBJX0lEOiIsItiq2KPbjNuM2K8g2qnYryDYp9ix2LPYp9mE24wg2KrZhNqv2LHYp9mFIjoiVmVyaWZ5IFRlbGVncmFtIFNNUyBDb2RlIiwi2YjYsdmI2K8g2KjYpyDYsdmF2LIg2K/ZiNi52KfZhdmE24wiOiJMb2dpbiB3aXRoIDJGQSBQYXNzd29yZCIsItiq2YTYp9i0INmF2KzYr9ivIjoiUmV0cnkiLCLwn5eR77iPINit2LDZgSDaqdin2YXZhCDaqdin2LHYqNixIjoi8J+Xke+4jyBEZWxldGUgVXNlciBQZXJtYW5lbnRseSIsIvCflJAg2KfZhdmG24zYqtiMINiz2LfYrSDYr9iz2KrYsdiz24wg2Ygg27JGQSI6IvCflJAgU2VjdXJpdHksIEFjY2VzcyBSb2xlICYgMkZBIiwi2KfZhdmGIjoiU2VjdXJlIiwi2LPYt9itINiv2LPYqtix2LPbjCDZiCDZhtmC2LQ6IjoiQWNjZXNzIFJvbGUgJiBQZXJtaXNzaW9uczoiLCLZiNi22LnbjNiqINmI2LHZiNivINiv2Ygg2YXYsdit2YTZh+KAjNin24w6IjoiVHdvLUZhY3RvciBBdXRoIFN0YXR1czoiLCLaqdiv2YfYp9uMINm+2LTYqtuM2KjYp9mGINio2KfZgtuM4oCM2YXYp9mG2K/ZhzoiOiJSZW1haW5pbmcgQmFja3VwIENvZGVzOiIsItqp2K8g2KLZhdin2K/ZhyDZhdi12LHZgSI6ImNvZGVzIGF2YWlsYWJsZSIsItmG2K/Yp9ix2K8iOiJOb25lIiwi2LHZhdiy2Ybar9in2LHbjCDZhti02LPYquKAjNmH2Kc6IjoiU2Vzc2lvbiBFbmNyeXB0aW9uOiIsItmI2LbYuduM2Kog2K3Ys9in2Kgg2qnYp9ix2KjYsduMOiI6IkFjY291bnQgU3RhdHVzOiIsItit2LPYp9ioINmF2LnZhNmCINin2LPYqiDij7jvuI8iOiJBY2NvdW50IGlzIFN1c3BlbmRlZCDij7jvuI8iLCLYrdiz2KfYqCDZhdis2KfYsiDZiCDZgdi52KfZhCDwn5+iIjoiQWNjb3VudCBpcyBBY3RpdmUgJiBMaWNlbnNlZCDwn5+iIiwi8J+foiDZhdiq2LXZhCAo2LPYtNmGINix2YXYstmG2q/Yp9ix24zigIzYtNiv2YcpIjoi8J+foiBDb25uZWN0ZWQgKEVuY3J5cHRlZCBTZXNzaW9uKSIsIvCfn6Ig2K/Ysdit2KfZhCDYp9is2LHYpyDZiCDZvtix2K/Yp9iy2LQiOiLwn5+iIFJ1bm5pbmcgJiBQcm9jZXNzaW5nIiwi4o+477iPINmF2KrZiNmC2YHigIzYtNiv2Ycg2KrZiNiz2Lcg2qnYp9ix2KjYsSI6IuKPuO+4jyBQYXVzZWQgYnkgVXNlciIsIvCfk7Eg2YXYp9mG24zYqtmI2LHbjNmG2q8g2LPZhNmB4oCM2KjYp9iqINiq2YTar9ix2KfZhSAoTVRQcm90bykiOiLwn5OxIFRlbGVncmFtIFNlbGZib3QgTW9uaXRvcmluZyAoTVRQcm90bykiLCLYs9i02YYg2KfZhdmGIjoiU2VjdXJlIFNlc3Npb24iLCLZiNi22LnbjNiqINiz2LTZhiDYqtmE2q/Ysdin2YU6IjoiVGVsZWdyYW0gU2Vzc2lvbiBTdGF0dXM6Iiwi2YjYtti524zYqiDYp9is2LHYp9uMINiz2YTZgeKAjNio2KfYqjoiOiJTZWxmYm90IEV4ZWN1dGlvbiBTdGF0dXM6Iiwi2LTZhtin2LPZhyDYudiv2K/bjCDaqdin2LHYqNixINiv2LEg2KrZhNqv2LHYp9mFOiI6IlRlbGVncmFtIE51bWVyaWNhbCBDaGF0IElEOiIsItit2KfZhNiqINi02KjYrSDZiCDYrtmI2KfZhtiv2YYg2YXYrtmB24wgKEdob3N0KToiOiJHaG9zdCBNb2RlIChTaWxlbnQgUmVhZCk6Iiwi8J+foiDYsdmI2LTZhiI6IvCfn6IgT04iLCLZvtin2LPYriDZh9mI2LTZhdmG2K8g2YfZiNi0INmF2LXZhtmI2LnbjCAoQUkpOiI6IlNtYXJ0IEFJIFJlcGx5OiIsItiz2KfYudiqINmB2YjZhtiq24wg2Ygg2KjbjNmIINiv2KfbjNmG2KfZhduM2qk6IjoiU3R5bGl6ZWQgQ2xvY2sgJiBEeW5hbWljIEJpbzoiLCLZiNi22LnbjNiqINi52K/ZhSDYrdi22YjYsSAoQUZLKToiOiJBd2F5IEZyb20gS2V5Ym9hcmQgKEFGSyk6Iiwi8J+foiDZgdi52KfZhCI6IvCfn6IgQWN0aXZlIiwi2qnYp9ix2KjYsdin2YYg2KjbjOKAjNi12K/YpyAvINmF2LPYr9mI2K8g2LTYr9mHOiI6Ik11dGVkIC8gQmxhY2tsaXN0ZWQgVXNlcnM6Iiwi4o+477iPINmF2KrZiNmC2YHigIzYs9in2LLbjCDYs9mE2YHigIzYqNin2KoiOiLij7jvuI8gUGF1c2UgU2VsZmJvdCIsIuKWtu+4jyDZgdi52KfZhOKAjNiz2KfYstuMINiz2YTZgeKAjNio2KfYqiI6IuKWtu+4jyBSZXN1bWUgU2VsZmJvdCIsIvCflIwg2YLYt9i5INiz2LTZhiDYqtmE2q/Ysdin2YUiOiLwn5SMIFRlcm1pbmF0ZSBUZWxlZ3JhbSBTZXNzaW9uIiwi2LPbjNiz2KrZhSDaqdin2YXZhNin2Ysg2LPYp9mE2YXYjCDZvtin24zYr9in2LEg2Ygg2KjYr9mI2YYg2K7Yt9in2LPYqiDwn5+iIjoiU3lzdGVtIGlzIGhlYWx0aHksIHN0YWJsZSAmIGVycm9yLWZyZWUg8J+foiIsIvCfqbog2LnbjNio4oCM24zYp9io24wg2LPZhNin2YXYqtiMINmE2Kfar+KAjNmH2Kcg2Ygg2KfYtNiq2LHYp9qpIjoi8J+puiBIZWFsdGggRGlhZ25vc3RpY3MsIExvZ3MgJiBQbGFuIiwi2KLYrtix24zZhiDZh9mF2q/Yp9mF4oCM2LPYp9iy24wgKEhlYXJ0YmVhdCk6IjoiTGFzdCBIZWFydGJlYXQgLyBTeW5jOiIsItio2K/ZiNmGINmE2KfaryI6Ik5vIGxvZ3MgcmVjb3JkZWQiLCLZiNi22LnbjNiqINiz2YTYp9mF2Kog2Ygg2K7Yt9in2YfYpzoiOiJIZWFsdGggU3RhdHVzICYgRXJyb3JzOiIsItm+2YTZhiDYp9i02KrYsdin2qkg2YHYudmE24w6IjoiQ3VycmVudCBTdWJzY3JpcHRpb24gUGxhbjoiLCLZhdiv2Kog2KfYudiq2KjYp9ixINio2KfZgtuM4oCM2YXYp9mG2K/ZhzoiOiJSZW1haW5pbmcgVmFsaWRpdHk6Iiwi2qnYryDZhNin24zYs9mG2LMg2YXYtdix2YHigIzYtNiv2Yc6IjoiUmVkZWVtZWQgTGljZW5zZSBDb2RlOiIsIvCflIQg2b7Yp9qp2LPYp9iy24wg2K7Yt9in2YfYpyI6IvCflIQgQ2xlYXIgRXJyb3IgTG9ncyIsIuKtkCDYqti624zbjNixINuM2Kcg2KfYsdiq2YLYp9uMINin2LTYqtix2KfaqSI6IuKtkCBVcGdyYWRlIG9yIENoYW5nZSBQbGFuIiwi2KLbjNinINin2LIg2LrbjNix2YHYudin2YTigIzYs9in2LLbjCDYqtin24zbjNivINiv2Ygg2YXYsdit2YTZh+KAjNin24wgKNuyRkEpINio2LHYp9uMINqp2KfYsdio2LEiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzYWJsZSAyRkEgZm9yIHVzZXIiLCLYp9i32YXbjNmG2KfZhiDYr9in2LHbjNiv2J8g2qnYp9ix2KjYsSDZhduM4oCM2KrZiNin2YbYryDYqNiv2YjZhiDZhtuM2KfYsiDYqNmHINqp2K8gQXV0aGVudGljYXRvciDYqNinINix2YXYsiDYudio2YjYsSDYrtmI2K8g2YjYp9ix2K8g2LTZiNivLiI6IkFyZSB5b3Ugc3VyZT8gVGhlIHVzZXIgd2lsbCBiZSBhYmxlIHRvIGxvZyBpbiB3aXRoIHRoZWlyIHBhc3N3b3JkIHdpdGhvdXQgMkZBIEF1dGhlbnRpY2F0b3IuIiwi27JGQSDaqdin2LHYqNixIjoiMkZBIGZvciB1c2VyIiwi2KjYpyDZhdmI2YHZgtuM2Kog2LrbjNix2YHYudin2YQg2Ygg2LHbjNiz2Kog2LTYryDwn46JIjoic3VjY2Vzc2Z1bGx5IGRpc2FibGVkIGFuZCByZXNldCDwn46JIiwi2K7Yt9inINiv2LEg2LrbjNix2YHYudin2YTigIzYs9in2LLbjCDbskZBIjoiRXJyb3IgZGlzYWJsaW5nIDJGQSIsItii24zYpyDYp9iyINmC2LfYuSDYp9iq2LXYp9mEINqp2KfZhdmEINix2KjYp9iqINqp2YXaqduMINiq2YTar9ix2KfZhSDYqNix2KfbjCDaqdin2LHYqNixIjoiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgZGlzY29ubmVjdCB0aGUgaGVscGVyIGJvdCBmb3IgdXNlciIsItmIINit2LDZgSDZiNio4oCM2YfZiNqpINin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyI6ImFuZCBkZWxldGUgd2ViaG9vaz8iLCLYsdio2KfYqiDaqdmF2qnbjCDaqdin2LHYqNixIjoiSGVscGVyIGJvdCBmb3IgdXNlciIsItmC2LfYuSDZiCDYrdin2YHYuNmHINii2LLYp9ivINi02K8g4pyoIjoiZGlzY29ubmVjdGVkICYgbWVtb3J5IGNsZWFyZWQg4pyoIiwi2K7Yt9inINiv2LEg2YLYt9i5INix2KjYp9iqIjoiRXJyb3IgZGlzY29ubmVjdGluZyBib3QiLCLZgtin2KjZhNuM2Kog2LHYqNin2Kog2KjYpyDZhdmI2YHZgtuM2Kog2KrYutuM24zYsSDbjNin2YHYqiDinKgiOiJCb3QgZmVhdHVyZSB0b2dnbGVkIHN1Y2Nlc3NmdWxseSDinKgiLCLYrti32Kcg2K/YsSDYqti624zbjNixINmC2KfYqNmE24zYqiDYsdio2KfYqiI6IkVycm9yIGNoYW5naW5nIGJvdCBmZWF0dXJlIiwi2YLYp9io2YTbjNiqINiz2YTZgeKAjNio2KfYqiDYqti624zbjNixINuM2KfZgdiqIOKcqCI6IlNlbGZib3QgZmVhdHVyZSB0b2dnbGVkIHN1Y2Nlc3NmdWxseSDinKgiLCLYrti32Kcg2K/YsSDYqti624zbjNixINmC2KfYqNmE24zYqiI6IkVycm9yIHRvZ2dsaW5nIGZlYXR1cmUiLCLYrti32KfZh9in24wg2qnYp9ix2KjYsSI6IkVycm9ycyBmb3IgdXNlciIsItm+2Kfaqdiz2KfYstuMINi02K8g8J+nuSI6ImNsZWFyZWQg8J+nuSIsItiu2LfYpyDYr9ixINm+2Kfaqdiz2KfYstuMIjoiRXJyb3IgY2xlYXJpbmcgbG9ncyIsItqp2YTZhdmHINi52KjZiNixINis2K/bjNivINix2Kcg2KjYsdin24wg2qnYp9ix2KjYsSI6IkVudGVyIG5ldyBwYXNzd29yZCBmb3IgdXNlciIsItmI2KfYsdivINqp2YbbjNivICjYrdiv2KfZgtmEINu2INqp2KfYsdin2qnYqtixKToiOiJlbnRlciAobWluIDYgY2hhcmFjdGVycyk6Iiwi2qnZhNmF2Ycg2LnYqNmI2LEg2KjYp9uM2K8g2K3Yr9in2YLZhCDbtiDaqdin2LHYp9qp2KrYsSDYqNin2LTYryI6IlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzIiwi2LHZhdiyINi52KjZiNixINqp2KfYsdio2LEiOiJQYXNzd29yZCBmb3IgdXNlciIsItio2Kcg2YXZiNmB2YLbjNiqINio2Ycg2LHZiNiyINi02K8g8J+UkSI6InVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IPCflJEiLCLaqdivIjoiQ29kZSIsItqp2b7bjCDYtNivISDYotmF2KfYr9mHINin2LHYs9in2YQg2KjZhyDYrtix24zYr9in2LEg4pyoIjoiY29waWVkISBSZWFkeSB0byBzZW5kIHRvIGJ1eWVyIOKcqCIsItiq2YjZhNuM2K8g2qnYr9mH2KfbjCDYp9mF2YYgQXJpem8uLi4iOiJHZW5lcmF0aW5nIHNlY3VyZSBBcml6byBjb2Rlcy4uLiIsItiv2KfYptmF24wiOiJMaWZldGltZSIsItix2YjYstmHINiz2YHYp9ix2LTbjCI6IkRheXMgQ3VzdG9tIiwi2qnYryDZhNin24zYs9mG2LMg2KzYr9uM2K8gKCI6Ik5ldyBsaWNlbnNlIGNvZGUgKCIsIikg2KjYpyDZhdmI2YHZgtuM2Kog2KrZiNmE24zYryDYtNivIPCfjokiOiIpIGdlbmVyYXRlZCBzdWNjZXNzZnVsbHkg8J+OiSIsItiu2LfYpyDYr9ixINiz2KfYrtiqINqp2K8iOiJFcnJvciBnZW5lcmF0aW5nIGNvZGUiLCLYp9mG2KrYrtin2Kgg24zYpyDYqti624zbjNixINmG2YjYuSDYp9i02KrYsdin2qkg2KjYsdin24wg2qnYp9ix2KjYsSI6IlNlbGVjdCBvciBjaGFuZ2Ugc3Vic2NyaXB0aW9uIGZvciB1c2VyIiwiOlxcbjE6INuxINmF2KfZh9mHICjbs9uwINix2YjYsilcXG4yOiDbsyDZhdin2YfZhyAo27nbsCDYsdmI2LIpXFxuMzog27Yg2YXYp9mH2YcgKNux27jbsCDYsdmI2LIpXFxuNDog2K/Yp9im2YXbjCDZiCDZhtin2YXYrdiv2YjYryAoTGlmZXRpbWUpXFxu24zYpyDYqti52K/Yp9ivINix2YjYsiDYr9mE2K7ZiNin2Ycg2LHYpyDZhdiz2KrZgtuM2YXYp9mLINmI2KfYsdivINqp2YbbjNivICjZhdir2YTYp9mLIDQ1KToiOiI6XFxuMTogMSBNb250aCAoMzAgRGF5cylcXG4yOiAzIE1vbnRocyAoOTAgRGF5cylcXG4zOiA2IE1vbnRocyAoMTgwIERheXMpXFxuNDogTGlmZXRpbWUgJiBVbmxpbWl0ZWRcXG5PciBlbnRlciBjdXN0b20gZGF5cyBjb3VudCBkaXJlY3RseSAoZS5nLiA0NSk6Iiwi2q/YstuM2YbZhyDbjNinINiq2LnYr9in2K8g2LHZiNiyINmG2KfZhdi52KrYqNixINin2LPYqiI6IkludmFsaWQgb3B0aW9uIG9yIGRheXMgY291bnQiLCLYp9i02KrYsdin2qkg2qnYp9ix2KjYsSI6IlN1YnNjcmlwdGlvbiBmb3IgdXNlciIsItio2Kcg2YXZiNmB2YLbjNiqINio2YciOiJzdWNjZXNzZnVsbHkgY2hhbmdlZCB0byIsItiq2LrbjNuM2LEg24zYp9mB2KohIPCfjokiOiJ1cGRhdGVkISDwn46JIiwi2K7Yt9inINiv2LEg2KrYutuM24zYsSDYp9i02KrYsdin2qkiOiJFcnJvciB1cGRhdGluZyBzdWJzY3JpcHRpb24iLCLYotuM2Kcg2KfYsiDYrdiw2YEg2qnYryI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgY29kZSIsItin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyI6ImFyZSB5b3Ugc3VyZT8iLCLaqdivINit2LDZgSDYtNivIjoiQ29kZSBkZWxldGVkIiwi2YbYp9mFINqp2KfYsdio2LHbjCDaqdmHINmF24zigIzYrtmI2KfZh9uM2K8g2KjZhyDYs9i32K0gwqvZhdiv24zYsSDYs9in2YXYp9mG2YfCuyAoQWRtaW4pINin2LHYqtmC2Kcg24zYp9io2K8g2LHYpyDZiNin2LHYryDaqdmG24zYrzoiOiJFbnRlciB1c2VybmFtZSB0byBwcm9tb3RlIHRvIFN5c3RlbSBBZG1pbmlzdHJhdG9yIChBZG1pbik6Iiwi2KfbjNmGINqp2KfYsdio2LEg2K/YsSDYrdin2YQg2K3Yp9i22LEg2YXYr9uM2LEg24zYpyDZhdin2YTaqSDYs9in2YXYp9mG2Ycg2KfYs9iqLiI6IlRoaXMgdXNlciBpcyBhbHJlYWR5IGEgU3lzdGVtIEFkbWluIG9yIE93bmVyLiIsItit2LDZgSDaqdin2YXZhCDaqdin2LHYqNixIjoiRGVsZXRlIFVzZXIgUGVybWFuZW50bHkiLCLZgti32Lkg2KrZhNqv2LHYp9mFIjoiRGlzY29ubmVjdCBUZWxlZ3JhbSIsItiq2LrbjNuM2LEg2YjYtti524zYqiDYqti52YTbjNmCIjoiVG9nZ2xlIFN1c3BlbnNpb24iLCLYqtmG2LLZhCDYqNmHINqp2KfYsdio2LEg2LnYp9iv24wiOiJEZW1vdGUgdG8gU3RhbmRhcmQgVXNlciIsItiq2LrbjNuM2LEg2YjYtti524zYqiDYsdio2KfYqiI6IlRvZ2dsZSBCb3QgU3RhdHVzIiwi2KLbjNinINin2LIg2K3YsNmBINqp2KfZhdmEINqp2KfYsdio2LEgwqsiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHVzZXIgJyIsIsK7INin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyDYqtmF2KfZhduMINiv2KfYr9mH4oCM2YfYp9uMINin24zZhiDaqdin2LHYqNixINm+2KfaqSDYrtmI2KfZh9ivINi02K8uIjoiJz8gQWxsIGRhdGEgZm9yIHRoaXMgdXNlciB3aWxsIGJlIGVyYXNlZC4iLCLYotuM2Kcg2KfYsiDZhNi62Ygg2K/Ys9iq2LHYs9uMINmF2K/bjNix24zYqiDZiCDYqtmG2LLZhCDaqdin2LHYqNixIMKrIjoiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJldm9rZSBhZG1pbiBhY2Nlc3MgYW5kIGRlbW90ZSB1c2VyICciLCLCuyDYqNmHINqp2KfYsdio2LEg2LnYp9iv24wg2KfYt9mF24zZhtin2YYg2K/Yp9ix24zYr9ifIjoiJyB0byBzdGFuZGFyZCB1c2VyPyIsItii24zYpyDYp9iyINin2LHYqtmC2KfbjCDaqdin2LHYqNixIMKrIjoiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHByb21vdGUgdXNlciAnIiwiwrsg2KjZhyDYs9i32K0gwqvZhdiv24zYsSDYs9in2YXYp9mG2YfCuyAoQWRtaW4pINin2LfZhduM2YbYp9mGINiv2KfYsduM2K/Yn1xcbtin24zZhiDaqdin2LHYqNixINm+2LMg2KfYsiDYp9ix2KrZgtinINio2Ycg2KrZhdin2YUg2KjYrti04oCM2YfYp9uMINm+2YbZhCDZhdiv24zYsduM2Kog2K/Ys9iq2LHYs9uMINiu2YjYp9mH2K8g2K/Yp9i02KouIjoiJyB0byBTeXN0ZW0gQWRtaW5pc3RyYXRvcj9cXG5UaGlzIHVzZXIgd2lsbCBoYXZlIGZ1bGwgYWNjZXNzIHRvIGFsbCBhZG1pbiBwYW5lbCBzZWN0aW9ucy4iLCLYotuM2Kcg2KfYsiI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byIsItiu2LHZiNisINin2LIg2KrYudmE24zZgiI6IlVuc3VzcGVuZCIsItiq2LnZhNuM2YIiOiJTdXNwZW5kIiwi2qnYp9ix2KjYsSDCqyI6InVzZXIgJyIsIsK7INin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyI6Iic/Iiwiwrsg2KjYpyDZhdmI2YHZgtuM2Kog2KjZhyDZhdiv24zYsSDYs9in2YXYp9mG2Ycg2KfYsdiq2YLYpyDbjNin2YHYqiDwn5uh77iPIjoiJyBwcm9tb3RlZCB0byBTeXN0ZW0gQWRtaW5pc3RyYXRvciBzdWNjZXNzZnVsbHkg8J+boe+4jyIsItiv2LPYqtix2LPbjCDZhdiv24zYsduM2Kog2YTYutmIINmIINqp2KfYsdio2LEgwqsiOiJBZG1pbiBhY2Nlc3MgcmV2b2tlZCBhbmQgdXNlciAnIiwiwrsg2KjZhyDaqdin2LHYqNixINi52KfYr9uMINiq2KjYr9uM2YQg2LTYryDwn5GkIjoiJyBkZW1vdGVkIHRvIHN0YW5kYXJkIHVzZXIg8J+RpCIsItio2Kcg2YXZiNmB2YLbjNiqINin2YbYrNin2YUg2LTYryI6IkNvbXBsZXRlZCBzdWNjZXNzZnVsbHkiLCLYrti32Kcg2K/YsSDYp9is2LHYp9uMINi52YXZhNuM2KfYqiI6IkVycm9yIGV4ZWN1dGluZyBvcGVyYXRpb24iLCLYrti32KfbjCDYtNio2qnZhyDYr9ixINio2LHZgtix2KfYsduMINin2LHYqtio2KfYtyDYqNinINiz2LHZiNixIjoiTmV0d29yayBlcnJvciBjb21tdW5pY2F0aW5nIHdpdGggc2VydmVyIiwi2KrZhdiv24zYryDYotmG24wuLi4iOiJFeHRlbmRpbmcuLi4iLCLYp9uM2KzYp9ivINit2LPYp9ioIEFyaXpvLi4uIjoiQ3JlYXRpbmcgQXJpem8gYWNjb3VudC4uLiIsItmI2LHZiNivLi4uIjoiTG9nZ2luZyBpbi4uLiIsItit2LPYp9ioINi02YXYpyDZhdis2YfYsiDYqNmHINiq2KfbjNuM2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfbjCAoMkZBKSDYp9iz2KouINmE2LfZgdin2Ysg2qnYryDbtiDYsdmC2YXbjCBHb29nbGUgQXV0aGVudGljYXRvciDbjNinINqp2K8g2KjYp9iy24zYp9io24wg2LHYpyDZiNin2LHYryDZhtmF2KfbjNuM2K86IjoiWW91ciBhY2NvdW50IGlzIHByb3RlY3RlZCBieSAyRkEuIFBsZWFzZSBlbnRlciB5b3VyIDYtZGlnaXQgQXV0aGVudGljYXRvciBvciByZWNvdmVyeSBjb2RlOiIsItio2LHYsdiz24wg2qnYryDbskZBLi4uIjoiVmVyaWZ5aW5nIDJGQSBjb2RlLi4uIiwi4pqg77iPINmG24zYp9iy2YXZhtivINin2KrYtdin2YQg2YXYrNiv2K8g2KrZhNqv2LHYp9mFIjoi4pqg77iPIFRlbGVncmFtIFJlY29ubmVjdCBSZXF1aXJlZCIsIuKWtu+4jyDYqtmE2KfYtCDZhdis2K/YryDYs9mE2YHigIzYqNin2KoiOiLilrbvuI8gUmV0cnkgU2VsZmJvdCIsIvCfn6Ig2YHYudin2YQg2Ygg2K/YsSDYrdin2YQg2KfYrNix2KfbjCDYrtmI2K/aqdin2LEiOiLwn5+iIEFjdGl2ZSAmIFJ1bm5pbmcgMjQvNyIsIuKPuO+4jyDYqtmI2YLZgSDZhdmI2YLYqiDYs9mE2YHigIzYqNin2KoiOiLij7jvuI8gUGF1c2UgU2VsZmJvdCIsIuKPuO+4jyDZhdiq2YjZgtmB4oCM2LTYr9mHIChQYXVzZSkiOiLij7jvuI8gUGF1c2VkIiwi4pa277iPINmB2LnYp9mE4oCM2LPYp9iy24wg2YXYrNiv2K8g2LPZhNmB4oCM2KjYp9iqIjoi4pa277iPIFJlc3VtZSBTZWxmYm90Iiwi2KzZh9iqINiq2KPbjNuM2K8g2K3YsNmBINiv2KfYptmFINit2LPYp9ioIEFyaXpv2Iwg2LHZhdiyINi52KjZiNixINiu2YjYryDYsdinINmI2KfYsdivINqp2YbbjNivOiI6IlRvIGNvbmZpcm0gcGVybWFuZW50IGRlbGV0aW9uIG9mIHlvdXIgQXJpem8gYWNjb3VudCwgZW50ZXIgcGFzc3dvcmQ6Iiwi2K3Ys9in2Kgg2LTZhdinINm+2Kfaqdiz2KfYstuMINi02K8uIjoiWW91ciBhY2NvdW50IGhhcyBiZWVuIGRlbGV0ZWQuIiwi2KLbjNinINmF2KfbjNmEINio2Ycg2K7YsdmI2Kwg2KfYsiDYrdiz2KfYqCDaqdin2LHYqNix24wgQXJpem8g2YfYs9iq24zYr9ifIjoiRG8geW91IHdhbnQgdG8gbG9nIG91dCBvZiB5b3VyIEFyaXpvIGFjY291bnQ/Iiwi2KfYsdiz2KfZhCDaqdivINio2YciOiJTZW5kaW5nIGNvZGUgdG8iLCLYrti32Kcg2K/YsSDYp9ix2LPYp9mEINqp2K8iOiJFcnJvciBzZW5kaW5nIGNvZGUiLCLYqNix2LHYs9uMINqp2K8uLi4iOiJWZXJpZnlpbmcgY29kZS4uLiIsItin2LnYqtio2KfYsdiz2YbYrNuMIDJGQS4uLiI6IlZhbGlkYXRpbmcgMkZBLi4uIiwi2LHZhdiyINin2LTYqtio2KfZhyDYp9iz2KoiOiJJbmNvcnJlY3QgcGFzc3dvcmQiLCLYp9iq2LXYp9mEINio2Ycg2LPYtNmGLi4uIjoiQ29ubmVjdGluZyB0byBzZXNzaW9uLi4uIiwi2YHZiNmG2Ko6IjoiRm9udDoiLCLYqNuM2Yjar9ix2KfZgduMINiy2YbYr9mHINi624zYsdmB2LnYp9mEINin2LPYqiAo2LPYp9iv2YcgLyDZvtuM2LTigIzZgdix2LYpIjoiTGl2ZSBiaW8gZGlzYWJsZWQgKFNpbXBsZSAvIERlZmF1bHQpIiwi2LDYrtuM2LHZhyDYr9ix2K3Yp9mEINin2YbYrNin2YUuLi4iOiJTYXZpbmcgaW4gcHJvZ3Jlc3MuLi4iLCLYqNix2LHYs9uMINmIINin2KrYtdin2YQg2KjZhyDYqtmE2q/Ysdin2YUuLi4iOiJWZXJpZnlpbmcgJiBjb25uZWN0aW5nIHRvIFRlbGVncmFtLi4uIiwi2LHYqNin2KogQCI6IkJvdCBAIiwi2KjYpyDZhdmI2YHZgtuM2Kog2YXYqti12YQg2LTYryEg8J+OiSI6ImNvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCfjokiLCLYotuM2Kcg2KfYsiDZgti32Lkg2KfYqti12KfZhCDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2KfYt9mF24zZhtin2YYg2K/Yp9ix24zYr9ifINiq2YXYp9mFINmI2KjigIzZh9mI2qnigIzZh9inINmIINiv2LPYqtix2LPbjOKAjNmH2KfbjCDZhduM2YbbjOKAjNin2b4g2YTYutmIINi02K/ZhyDZiCDYrdin2YHYuNmHINqp2YTYp9iv2YHZhNixINmB2YjYsdin2Ysg2KLYstin2K8g2YXbjOKAjNqv2LHYr9ivLiI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkaXNjb25uZWN0IFRlbGVncmFtIGJvdD8gQWxsIHdlYmhvb2tzIGFuZCBNaW5pIEFwcCBhY2Nlc3Mgd2lsbCBiZSByZXZva2VkLiIsItiv2LHYrdin2YQg2YLYt9i5INin2KrYtdin2YQuLi4iOiJEaXNjb25uZWN0aW5nLi4uIiwi2YfZhdqv2KfZheKAjNiz2KfYstuMINmB2YjYsduMLi4uIjoiSW5zdGFudCBzeW5jLi4uIiwi8J+RkSDZhdiv24zYsSI6IvCfkZEgQWRtaW4iLCLYp9uM2KzYp9ivINio2KfYsdqp2K8gUVIuLi4iOiJHZW5lcmF0aW5nIFFSIENvZGUuLi4iLCLYr9ix2K3Yp9mEINin2LnYqtio2KfYsdiz2YbYrNuMLi4uIjoiVmFsaWRhdGluZy4uLiIsIvCfk50g2KjbjNmI2q/Ysdin2YHbjCDYstmG2K/ZhyI6IvCfk50gRHluYW1pYyBCaW8iLCLwn6SWINmF2YbYtNuMINiu2YjYr9qp2KfYsSI6IvCfpJYgQXV0by1TZWNyZXRhcnkiLCLwn5SHINmB24zZhNiq2LEg2LPaqdmI2KoiOiLwn5SHIFNpbGVuY2UgRmlsdGVyIiwi8J+MmSDYrdin2YTYqiDYrtmI2KfYqCI6IvCfjJkgU2xlZXAgTW9kZSIsIuKaoSDYsdio2KfYqiDZiCDZhNin2q/YsSI6IuKaoSBCb3QgJiBMb2dnZXIiLCLwn5G7INit2KfZhNiqINi02KjYrSI6IvCfkbsgR2hvc3QgTW9kZSIsIvCfpJYg2b7Yp9iz2K4g2YfZiNi02YXZhtivIEFJIjoi8J+kliBTbWFydCBBSSBSZXBseSIsIvCflJAg2KfZhdmG24zYqiDZiCDbskZBIjoi8J+UkCBTZWN1cml0eSAmIDJGQSIsItmG2KfZhSDaqdin2LHYqNix24wgKNit2K/Yp9mC2YQg27Mg2qnYp9ix2Kfaqdiq2LEpIjoiVXNlcm5hbWUgKG1pbiAzIGNoYXJzKSIsItix2YXYsiDYudio2YjYsSAo2K3Yr9in2YLZhCDbuCDaqdin2LHYp9qp2KrYsSkiOiJQYXNzd29yZCAobWluIDggY2hhcnMpIiwi2qnYryDZhNin24zYs9mG2LMg2YHYudin2YTigIzYs9in2LLbjCAoQVJJWk8tLi4uKSI6IkFjdGl2YXRpb24gTGljZW5zZSBDb2RlIChBUklaTy0uLi4pIiwi2Kraqdix2KfYsSDZhdis2K/YryDYsdmF2LIg2LnYqNmI2LEiOiJDb25maXJtIHlvdXIgcGFzc3dvcmQiLCLaqdiv2YfYp9uMINio2KfYstuM2KfYqNuMINin2LbYt9ix2KfYsduMIEFyaXpvIFNlbGYgKDJGQSBSZWNvdmVyeSBDb2Rlcyk6IjoiQXJpem8gU2VsZiBFbWVyZ2VuY3kgUmVjb3ZlcnkgQ29kZXMgKDJGQSBSZWNvdmVyeSBDb2Rlcyk6Iiwi2YXYr9iqINin2LTYqtix2KfaqSDYsdinINin2YbYqtiu2KfYqCDbjNinINmI2KfYsdivINqp2YbbjNivOiI6IlNlbGVjdCBvciBlbnRlciBzdWJzY3JpcHRpb24gZHVyYXRpb246IiwiMTog27Eg2YXYp9mH2YcgKNuz27Ag2LHZiNiyKSI6IjE6IDEgTW9udGggKDMwIGRheXMpIiwiMjog27Mg2YXYp9mH2YcgKNu527Ag2LHZiNiyKSI6IjI6IDMgTW9udGhzICg5MCBkYXlzKSIsIjM6INu2INmF2KfZh9mHICjbsdu427Ag2LHZiNiyKSI6IjM6IDYgTW9udGhzICgxODAgZGF5cykiLCI0OiDYr9in2KbZhduMINmIINmG2KfZhdit2K/ZiNivIChMaWZldGltZSkiOiI0OiBQZXJtYW5lbnQgJiBMaWZldGltZSIsItuM2Kcg2KrYudiv2KfYryDYsdmI2LIg2K/ZhNiu2YjYp9mHINix2Kcg2YXYs9iq2YLbjNmF2KfZiyDZiNin2LHYryDaqdmG24zYryAo2YXYq9mE2KfZiyA0NSk6IjoiT3IgZGlyZWN0bHkgZW50ZXIgY3VzdG9tIG51bWJlciBvZiBkYXlzIChlLmcuIDQ1KToiLCLYotuM2Kcg2KfYsiDYp9ix2KrZgtin24wg2qnYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwcm9tb3RlIHVzZXIiLCLYqNmHINiz2LfYrSDCq9mF2K/bjNixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYt9mF24zZhtin2YYg2K/Yp9ix24zYr9ifIjoidG8gXCJTeXN0ZW0gQWRtaW5cIiBsZXZlbD8iLCLYp9uM2YYg2qnYp9ix2KjYsSDZvtizINin2LIg2KfYsdiq2YLYpyDYqNmHINiq2YXYp9mFINio2K7YtOKAjNmH2KfbjCDZvtmG2YQg2YXYr9uM2LHbjNiqINiv2LPYqtix2LPbjCDYrtmI2KfZh9ivINiv2KfYtNiqLiI6IkFmdGVyIHByb21vdGlvbiwgdGhpcyB1c2VyIHdpbGwgaGF2ZSBmdWxsIGFjY2VzcyB0byBhbGwgc2VjdGlvbnMgb2YgdGhlIG1hbmFnZW1lbnQgcGFuZWwuIiwi2KjZiNmE2K8g2YTZiNqp2LMiOiJMdXh1cnkgQm9sZCIsItiz2YbYsyDZhdiv2LHZhiI6Ik1vZGVybiBTYW5zIiwi2YXZiNmG2Ygg2LHYqtix2YgiOiJSZXRybyBNb25vIiwi2K/Yp9io2YQg2KfYs9iq2LHZiNqpIjoiRG91YmxlIFN0cm9rZSIsItit2KjYp9ioINiq2YjYrtin2YTbjCI6IkhvbGxvdyBCdWJibGUiLCLYr9in24zYsdmHINmF2LTaqduMINmG2KbZiNmGIjoiTmVvbiBDaXJjbGVkIiwi2YHYp9ix2LPbjCDYp9i124zZhCI6IkNsYXNzaWMgUGVyc2lhbiIsIti52LHYqNuMINi02LHZgtuMIjoiRWFzdGVybiBBcmFiaWMiLCLYp9mG2K/bjNizINmB2KfZhtiq2LLbjCI6IkZhbmN5IFN1YnNjcmlwdCIsItio2KfZhNin2YbZiNuM2LMg2YXbjNmG24wiOiJNaW5pIFN1cGVyc2NyaXB0Iiwi2LPZhNi32YbYqtuMINio2LHYp9qp2KoiOiJSb3lhbCBCcmFja2V0Iiwi2KjYsdin2qnYqiDamNin2b7ZhtuMIjoiSmFwYW5lc2UgQnJhY2tldCIsItiq2YXYp9mF4oCM2b7Zh9mG2KcgKNiz2KfbjNio2LEpIjoiQ3liZXIgRnVsbHdpZHRoIiwi2b7Ysdin2YbYqtiyINiv2KfbjNix2YfigIzYp9uMIjoiUGFyZW50aGVzaXplZCIsItmG2YLYt9mH4oCM2K/Yp9ixINix2LPZhduMIjoiRm9ybWFsIERvdHRlZCIsItiu2Lcg2LLbjNix24zZhiDZgdin2YbYqtiy24wiOiJGYW5jeSBVbmRlcmxpbmVkIiwi2K7Yt+KAjNiu2YjYsdiv2Ycg2YXbjNmG24zZhdin2YQiOiJNaW5pbWFsIFN0cmlrZSIsItin2LPZhNi0INmF2YjYsdioIjoiT2JsaXF1ZSBTbGFzaGVkIiwi2YbYptmI2YYg2K/Ysdiu2LTYp9mGIjoiTmVvbiBHbG93Iiwi2LPZhtizINin24zYqtin2YTbjNqpIjoiU2FucyBJdGFsaWMiLCLYs9ix24zZgSDYs9mE2LfZhtiq24wiOiJSb3lhbCBTZXJpZiIsItmI2K3YtNiqINmH2KfZhNmI2YjbjNmG24wiOiJIYWxsb3dlZW4gU3Bvb2t5Iiwi2YLZhNioINi52KfYtNmC2KfZhtmHIjoiUm9tYW50aWMgSGVhcnQiLCLYs9iq2KfYsdmHINmIINiv2LHYrti02LQiOiJTdGFyICYgU3BhcmtsZSIsItii2KrYtNuM2YYg2YXYqtit2LHaqSI6IkFuaW1hdGVkIEZpcmUiLCLaqdix24zYs9iq2KfZhCDbjNiuIjoiSWNlIENyeXN0YWwiLCLYqNin2qnYsyDZhdix2KjYuduMIjoiQm94ZWQgU3F1YXJlIiwi2KLaqdmI2YTYp9ivINmB2KfZhtiq2LLbjCI6IkN1cmx5IEJyYWNlIiwi2b7bjNqp2KfZhtuMINmG2KbZiNmGIjoiTmVvbiBDaGV2cm9uIiwi2YHYp9ix2LPbjCDYqNin2YTYp9mG2YjbjNizIjoiUGVyc2lhbiBTdXBlcnNjcmlwdCIsItiz2KfYudiqINiv24zYrNuM2KrYp9mEIjoiRGlnaXRhbCA3LVNlZyIsItqp2YTYp9iz24zaqSDYp9iz2KrYp9mG2K/Yp9ix2K8iOiJDbGFzc2ljIFN0YW5kYXJkIiwi2K/Ys9iq2LHYs9uMINio2Ycg2b7ZhtmEINmF2K/bjNix24zYqiDZgdmC2Lcg2YXYrti12YjYtSDaqdin2LHYqNix2KfZhiDYr9in2LHYp9uMINmG2YLYtCDZhdiv24zYsduM2Kog2KfYs9iqIjoiTWFuYWdlbWVudCBwYW5lbCBhY2Nlc3MgaXMgcmVzdHJpY3RlZCB0byBhZG1pbmlzdHJhdG9yIGFjY291bnRzIG9ubHkiLCLwn5GRINm+2YbZhCDZhdiv24zYsduM2Kog2KfYsdi02K8g2Ygg2YXYp9mG24zYqtmI2LHbjNmG2q8gfCBBcml6byBTZWxmIjoi8J+RkSBNYXN0ZXIgTWFuYWdlbWVudCAmIE1vbml0b3JpbmcgUGFuZWwgfCBBcml6byBTZWxmIiwi2YfbjNqGINqp2K/bjCDYr9ixINiz24zYs9iq2YUg2KvYqNiqINmG2LTYr9mHINin2LPYqi4iOiJObyByZWRlZW0gY29kZXMgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgaW4gdGhlIHN5c3RlbS4iLCLZhdi12LHZgToiOiJDb25zdW1lZDoiLCLZhdi12LHZgSI6IlVzZWQiLCLZhtin2LTZhtin2LMiOiJVbmtub3duIiwi8J+foiDYotmF2KfYr9mHINmB2LHZiNi0Ijoi8J+foiBBdmFpbGFibGUgZm9yIFNhbGUiLCLYotmF2KfYr9mHINmB2LHZiNi0IjoiQXZhaWxhYmxlIiwi2K/Yp9im2YXbjCDZiCDZhtin2YXYrdiv2YjYryI6IlBlcm1hbmVudCAmIExpZmV0aW1lIiwi2LHZiNiy2YciOiJEYXlzIiwi2LHZiNiyIjoiRGF5cyIsItqp2KfYsdio2LHbjCDYqNinINin24zZhiDZhdi02K7Ytdin2Kog24zYp9mB2Kog2YbYtNivLiI6Ik5vIHVzZXIgZm91bmQgbWF0Y2hpbmcgdGhlc2Ugc3BlY2lmaWNhdGlvbnMuIiwi8J+RkSDZhdin2YTaqSI6IvCfkZEgT3duZXIiLCLwn5uh77iPINmF2K/bjNixIjoi8J+boe+4jyBBZG1pbiIsIvCfkaQg2qnYp9ix2KjYsSI6IvCfkaQgVXNlciIsIti02YbYp9iz2Ycg2LHYqNin2Ko6IjoiQm90IElEOiIsItmF2KrYtdmEIjoiQ29ubmVjdGVkIiwi4pqqINio2K/ZiNmGINix2KjYp9iqIjoi4pqqIE5vIEJvdCBDb25uZWN0ZWQiLCLYqNiv2YjZhiDYsdio2KfYqiI6Ik5vIEJvdCIsItuyRkEg2YHYudin2YQgLSI6IjJGQSBBY3RpdmUgLSIsItqp2K8g2b7YtNiq24zYqNin2YYiOiJCYWNrdXAgQ29kZSIsIvCflJAg2YHYudin2YQgKCI6IvCflJAgQWN0aXZlICgiLCLimqog2K7Yp9mF2YjYtCI6IuKaqiBPZmYiLCLij7jvuI8g2YXaqdirIjoi4o+477iPIFBhdXNlZCIsIvCflLQg2YLYt9i5Ijoi8J+UtCBEaXNjb25uZWN0ZWQiLCLYp9iz2KrYp9mG2K/Yp9ix2K8iOiJTdGFuZGFyZCIsIuKPuO+4jyDZhdi52YTZgiI6IuKPuO+4jyBTdXNwZW5kZWQiLCLwn5SNINmF2KfZhtuM2KrZiNix24zZhtqvIjoi8J+UjSBNb25pdG9yaW5nIiwi2YXYp9mG24zYqtmI2LHbjNmG2q8g2qnYp9mF2YQg27PbttuwINiv2LHYrNmHINmIINmF2K/bjNix24zYqiDaqdin2LHYqNixIjoiQ29tcGxldGUgMzYwwrAgTW9uaXRvcmluZyAmIFVzZXIgTWFuYWdlbWVudCIsItin2LfZhNin2LnYp9iqINqp2KfYsdio2LEg24zYp9mB2Kog2YbYtNivIjoiVXNlciBpbmZvcm1hdGlvbiBub3QgZm91bmQiLCLwn5GRINmF2KfZhNqpINiz2KfZhdin2YbZhyI6IvCfkZEgU3lzdGVtIE93bmVyIiwi8J+boe+4jyDZhdiv24zYsSDYs9in2YXYp9mG2YciOiLwn5uh77iPIFN5c3RlbSBBZG1pbiIsIvCfkaQg2qnYp9ix2KjYsSDYudin2K/bjCI6IvCfkaQgUmVndWxhciBVc2VyIiwi2KrZhtiy2YQg2LPYt9itINiv2LPYqtix2LPbjCDYqNmHINqp2KfYsdio2LEg2LnYp9iv24wiOiJEZW1vdGUgYWNjZXNzIGxldmVsIHRvIHJlZ3VsYXIgdXNlciIsItin2LHYqtmC2Kcg2KjZhyDZhdiv24zYsSDYs9in2YXYp9mG2YciOiJQcm9tb3RlIHRvIHN5c3RlbSBhZG1pbiIsIvCfkaQg2KrZhtiy2YQg2KjZhyDaqdin2LHYqNixINi52KfYr9uMIjoi8J+RpCBEZW1vdGUgdG8gUmVndWxhciBVc2VyIiwi2KrYutuM24zYsSDbjNinINiq2YXYr9uM2K8g2KfYtNiq2LHYp9qpIjoiQ2hhbmdlIG9yIFJlbmV3IFN1YnNjcmlwdGlvbiIsIuKcj++4jyDYqti624zbjNixIjoi4pyP77iPIENoYW5nZSIsIvCflJMg2K7YsdmI2Kwg2KfYsiDYqti52YTbjNmCIjoi8J+UkyBVbnN1c3BlbmQiLCLwn5SSINiq2LnZhNuM2YIg2K3Ys9in2KgiOiLwn5SSIFN1c3BlbmQgQWNjb3VudCIsItiu2LHZiNisINqp2KfYsdio2LEg2KfYsiDYrdin2YTYqiDYqti52YTbjNmCIjoiVW5zdXNwZW5kIHVzZXIgYWNjZXNzIiwi2KrYudmE24zZgiDZgdmI2LHbjCDYr9iz2KrYsdiz24wg2qnYp9ix2KjYsSI6IkltbWVkaWF0ZWx5IHN1c3BlbmQgdXNlciBhY2Nlc3MiLCLZhtin2YXYtNiu2LUiOiJVbnNwZWNpZmllZCIsItio2K/ZiNmGINqp2K8iOiJObyBjb2RlIiwi4o+477iPINmF2qnYqyDYs9mE2YHigIzYqNin2KoiOiLij7jvuI8gUGF1c2UgU2VsZmJvdCIsIuKtkCDYqti624zbjNixINm+2YTZhiDYp9i02KrYsdin2qkiOiLirZAgQ2hhbmdlIFN1YnNjcmlwdGlvbiBQbGFuIiwi8J+UkSDYqti624zbjNixINqp2YTZhdmHINi52KjZiNixIjoi8J+UkSBDaGFuZ2UgUGFzc3dvcmQiLCLZgti32Lkg2YbYtNiz2Kog2KrZhNqv2LHYp9mFIjoiVGVybWluYXRlIFRlbGVncmFtIFNlc3Npb24iLCLwn5uh77iPINin2LHYqtmC2Kcg2KjZhyDZhdiv24zYsSDYs9in2YXYp9mG2YciOiLwn5uh77iPIFByb21vdGUgdG8gU3lzdGVtIEFkbWluIiwi2K3YsNmBINqp2KfZhdmEINqp2KfYsdio2LEg2Ygg2KrZhdin2YUg2KfYt9mE2KfYudin2KoiOiJQZXJtYW5lbnRseSBkZWxldGUgdXNlciBhbmQgYWxsIGFzc29jaWF0ZWQgZGF0YSIsIuKaoSDYr9iz2KrYsdiz24wg2LPYsduM2Lkg2KjZhyDYudmF2YTbjNin2Kog2YXYr9uM2LHbjNiq24wg2qnYp9ix2KjYsToiOiLimqEgUXVpY2sgQWNjZXNzIHRvIFVzZXIgQWRtaW5pc3RyYXRpdmUgQWN0aW9uczoiLCLZhdiv24zYsduM2Kog2qnYp9mF2YQg2YbZgti02Iwg2YTYp9uM2LPZhtiz2Iwg2KrYudmE24zZgiDZiCDYp9is2LHYp9uMINiz2YTZgeKAjNio2KfYqiI6IkZ1bGwgbWFuYWdlbWVudCBvZiByb2xlLCBsaWNlbnNlLCBzdXNwZW5zaW9uLCBhbmQgc2VsZmJvdCBydW50aW1lIiwi8J+foiDZhdiq2LXZhCAoQCI6IvCfn6IgQ29ubmVjdGVkIChAIiwi4pqqINi624zYsdmF2KrYtdmEIjoi4pqqIERpc2Nvbm5lY3RlZCIsIvCflIwg2YLYt9i5INin2KrYtdin2YQg2LHYqNin2Kog2Ygg2b7Yp9qp2LPYp9iy24wg2YjYqOKAjNmH2YjaqSI6IvCflIwgRGlzY29ubmVjdCBCb3QgJiBDbGVhciBXZWJob29rIiwi2qnYp9ix2KjYsSDZh9mG2YjYsiDYsdio2KfYqiDaqdmF2qnbjCDYp9iu2KrYtdin2LXbjCDZhdiq2LXZhCDZhtqp2LHYr9mHINin2LPYqi4iOiJVc2VyIGhhcyBub3QgY29ubmVjdGVkIGEgZGVkaWNhdGVkIGhlbHBlciBib3QgeWV0LiIsIvCfpJYg2YXYp9mG24zYqtmI2LHbjNmG2q8g2LHYqNin2Kog2qnZhdqp24wg2KrZhNqv2LHYp9mFIjoi8J+kliBUZWxlZ3JhbSBIZWxwZXIgQm90IE1vbml0b3JpbmciLCLYp9iu2KrYtdin2LXbjCI6IkRlZGljYXRlZCIsItmI2LbYuduM2Kog2KfYqti12KfZhDoiOiJDb25uZWN0aW9uIFN0YXR1czoiLCLZhtin2YUg2qnYp9ix2KjYsduMINix2KjYp9iqOiI6IkJvdCBVc2VybmFtZToiLCLYtNmG2KfYs9mHINix2KjYp9iqINiv2LEg2KrZhNqv2LHYp9mFOiI6IkJvdCBJRCBpbiBUZWxlZ3JhbToiLCLYtNmG2KfYs9mHINin2YbYrdi12KfYsduMINmF2KfZhNqpICjZgtmB2YTigIzYtNiv2YcpOiI6Ik93bmVyIFRlbGVncmFtIElEIChMb2NrZWQpOiIsItiq2YbYuNuM2YUg2YbYtNiv2YciOiJOb3QgQ29uZmlndXJlZCIsItmF2KfamNmI2YQg2LbYryDYrdiw2YEg2b7bjNin2YU6IjoiQW50aS1EZWxldGUgTWVzc2FnZSBNb2R1bGU6Iiwi8J+UtCDYrtin2YXZiNi0Ijoi8J+UtCBPZmYiLCLZhdin2pjZiNmEINi22K8g2YjbjNix2KfbjNi0INm+24zYp9mFOiI6IkFudGktRWRpdCBNZXNzYWdlIE1vZHVsZToiLCLYp9ix2LPYp9mEINmF2K/bjNin2YfYp9uMINiq2KfbjNmF2LHYr9in2LEgKFRUTCk6IjoiU2VsZi1EZXN0cnVjdCBNZWRpYSBGb3J3YXJkaW5nIChUVEwpOiIsIvCfn6Ig2YHYudin2YQgKEdvb2dsZSBBdXRoZW50aWNhdG9yKSI6IvCfn6IgQWN0aXZlIChHb29nbGUgQXV0aGVudGljYXRvcikiLCLimqog2LrbjNix2YHYudin2YQgKNmB2YLYtyDYsdmF2LIg2LnYqNmI2LEpIjoi4pqqIEluYWN0aXZlIChQYXNzd29yZCBPbmx5KSIsIvCflJMg2LHbjNiz2Kog2Ygg2LrbjNix2YHYudin2YTigIzYs9in2LLbjCDbskZBIjoi8J+UkyBSZXNldCAmIERpc2FibGUgMkZBIiwi8J+UkSDYqti624zbjNixINqp2YTZhdmHINi52KjZiNixINqp2KfYsdio2LEiOiLwn5SRIENoYW5nZSBVc2VyIFBhc3N3b3JkIiwi8J+RkSDZhdin2YTaqSDYp9ix2LTYryDYs9in2YXYp9mG2YciOiLwn5GRIE1hc3RlciBTeXN0ZW0gT3duZXIiLCLwn5uh77iPINmF2K/bjNixINiz2KfZhdin2YbZhyAo2K/Ys9iq2LHYs9uMINqp2KfZhdmEINm+2YbZhCDZhdiv24zYsduM2KopIjoi8J+boe+4jyBTeXN0ZW0gQWRtaW4gKEZ1bGwgUGFuZWwgQWNjZXNzKSIsIvCflJIg2KrYudmE24zZgiDYrdiz2KfYqCDaqdin2LHYqNixIjoi8J+UkiBTdXNwZW5kIFVzZXIgQWNjb3VudCIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLbjNiqINix2YjbjCDYtNmG2KfYs9mHIjoiQm90IHN1Y2Nlc3NmdWxseSBsb2NrZWQgdG8gSUQiLCLZgtmB2YQg2LTYryEg8J+UkiI6ImxvY2tlZCEg8J+UkiIsItmG2KfZhSDYs9qp2LHYqiDaqdm+24wg2LTYryI6IlNlY3JldCBuYW1lIGNvcGllZCB0byBjbGlwYm9hcmQiLCLZhdmC2K/Yp9ixIDIwNDAg2qnZvtuMINi02K8iOiJWYWx1ZSAyMDQwIGNvcGllZCB0byBjbGlwYm9hcmQiLCLZhdmC2K/Yp9ixIEFQSV9IQVNIINqp2b7bjCDYtNivIjoiQVBJX0hBU0ggY29waWVkIHRvIGNsaXBib2FyZCIsItiv2LEg2K3Yp9mEINin2LHYqtio2KfYtyDYqNinIEFQSSDYqtmE2q/Ysdin2YUuLi4iOiJDb25uZWN0aW5nIHRvIFRlbGVncmFtIEFQSS4uLiIsIuKchSDYqtmI2qnZhiDYqtmE2q/Ysdin2YUg2YXYudiq2KjYsSDYp9iz2KohIjoi4pyFIFRlbGVncmFtIGJvdCB0b2tlbiBpcyB2YWxpZCEiLCLYr9ixINit2KfZhCDYr9ix24zYp9mB2Kog2YjYtti524zYqiDYstmG2K/ZhyDYp9iyINiz2LHZiNixLi4uIjoiRmV0Y2hpbmcgbGl2ZSBzZXJ2ZXIgc3RhdHVzLi4uIiwi8J+foiDZhdiq2LXZhCDZiCDYotmF2KfYr9mHIjoi8J+foiBDb25uZWN0ZWQgYW5kIFJlYWR5Iiwi8J+UtCDYqti52LHbjNmBINmG2LTYr9mHIjoi8J+UtCBOb3QgQ29uZmlndXJlZCIsIvCfn6Ig2YXYqti12YQg2Ygg2KzYr9in2YjZhCDYotmF2KfYr9mHIjoi8J+foiBDb25uZWN0ZWQgJiBUYWJsZXMgUmVhZHkiLCLwn5+hINiv24zYqtin2KjbjNizINmF2KrYtdmEINin2LPYqiDYp9mF2Kcg2KzYr9in2YjZhCDZh9mG2YjYsiDYs9in2K7YqtmHINmG2LTYr9mH4oCM2KfZhtivIjoi8J+foSBEYXRhYmFzZSBjb25uZWN0ZWQgYnV0IHRhYmxlcyBub3QgaW5pdGlhbGl6ZWQgeWV0Iiwi8J+UtCDZhdiq2LXZhCDZhtuM2LPYqiI6IvCflLQgTm90IENvbm5lY3RlZCIsIvCfn6Ig2YHYudin2YQg2Ygg2KfZhdmGIjoi8J+foiBBY3RpdmUgJiBTZWN1cmUiLCLimqDvuI8g2KjYr9mI2YYg2LHZhdiyIjoi4pqg77iPIE5vIFBhc3N3b3JkIFNldCIsIuKaoSDYs9in2K7YqiDZgdmI2LHbjCDYrNiv2KfZiNmEINiv24zYqtin2KjbjNizIEQxIjoi4pqhIEluaXRpYWxpemUgRDEgRGF0YWJhc2UgVGFibGVzIE5vdyIsIvCfn6Ig2KfYs9iq2KfZhtiv2KfYsdivICgyMDQwKSI6IvCfn6IgU3RhbmRhcmQgKDIwNDApIiwi2KjYs9iq2YYg2b7Zhtis2LHZhyDYuduM2KjigIzbjNin2KjbjCI6IkNsb3NlIERpYWdub3N0aWMgV2luZG93Iiwi2K7Yt9inINiv2LEg2K/YsduM2KfZgdiqINmI2LbYuduM2Kog2LPYsdmI2LEuIjoiRXJyb3IgcmV0cmlldmluZyBzZXJ2ZXIgc3RhdHVzLiIsIti52K/ZhSDYp9mF2qnYp9mGINiv2LPYqtix2LPbjCDYqNmHINiz2LHZiNixOiI6IlVuYWJsZSB0byBjb25uZWN0IHRvIHNlcnZlcjoiLCLYs9mI2KbbjNqGIjoiVG9nZ2xlIiwi2LPYp9i52Ko6IjoiQ2xvY2s6Iiwi2KjbjNmI2q/Ysdin2YHbjDoiOiJCaW86IiwiRm9udDoiOiJGb250OiIsItiq2YjZhNuM2K8g2qnYr9mH2KfbjCDZhNin24zYs9mG2LMg2KzYr9uM2K8g2Ygg2KfYttin2YHZhyDYqNmHINin2YbYqNin2LEiOiJHZW5lcmF0ZSBOZXcgTGljZW5zZSBLZXlzICYgQWRkIHRvIEludmVudG9yeSIsItin2YbYqNin2LEg2qnYr9mH2KfbjCDZhNin24zYs9mG2LMg2YXZiNis2YjYryAo2qnZvtuMINmF2LPYqtmC24zZhSDYrNmH2Kog2KfYsdiz2KfZhCDYqNmHINmF2LTYqtix24wpIjoiTGljZW5zZSBLZXkgSW52ZW50b3J5IChEaXJlY3QgQ29weSBmb3IgRGVsaXZlcnkpIiwi2qnYr9mH2KfbjCDYqNin2LLbjNin2KjbjCDYp9i22LfYsdin2LHbjCBBcml6byBTZWxmIjoiQXJpem8gU2VsZiBFbWVyZ2VuY3kgUmVjb3ZlcnkgQ29kZXMiLCLYr9ixINit2KfZhCDYs9in2K7YqiDYrNiv2KfZiNmELi4uIjoiQ3JlYXRpbmcgdGFibGVzLi4uIiwi2KzYr9in2YjZhCDYotmF2KfYr9mHINin2LPYqiI6IlRhYmxlcyBSZWFkeSIsItiq2YTYp9i0INmF2KzYr9ivINiz2KfYrtiqINis2K/Yp9mI2YQiOiJSZXRyeSBUYWJsZSBJbml0aWFsaXphdGlvbiIsItiz2KfYrtiqINiu2YjYr9qp2KfYsSDYrNiv2KfZiNmEIEQxIjoiSW5pdGlhbGl6ZSBEMSBUYWJsZXMiLCLYr9ixINit2KfZhCDYqNix2LHYs9uMLi4uIjoiQ2hlY2tpbmcuLi4iLCLYqtiz2Kog2KLZhtmE2KfbjNmGINiq2YjaqdmGIjoiVGVzdCBCb3QgVG9rZW4gT25saW5lIiwi2K/YsSDYrdin2YQg2KfYsdiz2KfZhC4uLiI6IlNlbmRpbmcuLi4iLCLYp9ix2LPYp9mEINm+24zYp9mFINiq2LPYqiI6IlNlbmQgVGVzdCBNZXNzYWdlIiwi2KfYsdiz2KfZhCDaqdivINio2YcgIjoiU2VuZGluZyBjb2RlIHRvICIsIvCflJIg2YLZgdmEINix2YjbjCDYtNmG2KfYs9mHOiAiOiLwn5SSIExvY2tlZCB0byBJRDogIiwi2LHYqNin2Kog2KjYpyDZhdmI2YHZgtuM2Kog2LHZiNuMINi02YbYp9iz2YcgIjoiQm90IHN1Y2Nlc3NmdWxseSBsb2NrZWQgdG8gSUQgIiwiINmC2YHZhCDYtNivISDwn5SSIjoiISDwn5SSIiwi2LPYtNmGINiq2YTar9ix2KfZhSDYqNinINmF2YjZgdmC24zYqiDZhdiq2LXZhCDYtNivISDwn46JIjoiVGVsZWdyYW0gc2Vzc2lvbiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5ISDwn46JIiwi2qnYryDYqtin24zbjNivINiq2YTar9ix2KfZhSDYp9ix2LPYp9mEINi02K8g8J+TsSI6IlRlbGVncmFtIHZlcmlmaWNhdGlvbiBjb2RlIHNlbnQg8J+TsSIsItix2YXYsiDYudio2YjYsSDYqNinINmF2YjZgdmC24zYqiDYqti624zbjNixINqp2LHYryEg8J+UkSI6IlBhc3N3b3JkIGNoYW5nZWQgc3VjY2Vzc2Z1bGx5ISDwn5SRIiwi2KfYtNiq2LHYp9qpINio2Kcg2YXZiNmB2YLbjNiqINiq2YXYr9uM2K8g2LTYryEg8J+OiSI6IlN1YnNjcmlwdGlvbiByZW5ld2VkIHN1Y2Nlc3NmdWxseSEg8J+OiSIsItix2K/bjNmF4oCM2qnYryDZhtin2YXYudiq2KjYsSDYp9iz2Kog24zYpyDZgtio2YTYp9mLINin2LPYqtmB2KfYr9mHINi02K/ZhyI6IlJlZGVlbSBjb2RlIGlzIGludmFsaWQgb3IgaGFzIGFscmVhZHkgYmVlbiB1c2VkIiwi2KrZhti424zZhdin2Kog2KjYpyDZhdmI2YHZgtuM2Kog2LDYrtuM2LHZhyDYtNivISDwn5K+IjoiU2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5ISDwn5K+Iiwi2b7Yp9iz2K4g2K/Ys9iq24wg2KfYsdiz2KfZhCDYtNivISDwn5KsIjoiTWFudWFsIHJlcGx5IHNlbnQhIPCfkqwiLCLYsdio2KfYqiDYqNinINmF2YjZgdmC24zYqiDZhdiq2LXZhCDYtNivISDwn6SWIjoiQm90IGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCfpJYiLCLYp9iq2LXYp9mEINix2KjYp9iqINio2Kcg2YXZiNmB2YLbjNiqINmC2LfYuSDYtNivISDwn5SMIjoiQm90IGRpc2Nvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCflIwiLCLbskZBINio2Kcg2YXZiNmB2YLbjNiqINmB2LnYp9mEINi02K8hIPCflJAiOiIyRkEgYWN0aXZhdGVkIHN1Y2Nlc3NmdWxseSEg8J+UkCIsItuyRkEg2KjYpyDZhdmI2YHZgtuM2Kog2LrbjNix2YHYudin2YQg2LTYryI6IjJGQSBkaXNhYmxlZCBzdWNjZXNzZnVsbHkiLCLYrdiz2KfYqCDaqdin2LHYqNix24wg2KjYpyDZhdmI2YHZgtuM2Kog2K3YsNmBINi02K8iOiJVc2VyIGFjY291bnQgZGVsZXRlZCBzdWNjZXNzZnVsbHkiLCLZhti02LPYqiDYqtmE2q/Ysdin2YUg2YLYt9i5INi02K8iOiJUZWxlZ3JhbSBzZXNzaW9uIHRlcm1pbmF0ZWQiLCLYrti32Kcg2K/YsSDYsNiu24zYsdmHINiq2YbYuNuM2YXYp9iqIjoiRXJyb3Igc2F2aW5nIHNldHRpbmdzIiwi2YTYt9mB2KfZiyDYqtmI2qnZhiDYsdio2KfYqiDYsdinINmI2KfYsdivINqp2YbbjNivIjoiUGxlYXNlIGVudGVyIGJvdCB0b2tlbiIsItmB2LHZhdiqINi02YXYp9ix2Ycg2KrZhNmB2YYg2YbYp9iv2LHYs9iqINin2LPYqiI6IkludmFsaWQgcGhvbmUgbnVtYmVyIGZvcm1hdCIsItmE2LfZgdin2Ysg2qnYryDYqtin24zbjNivINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8iOiJQbGVhc2UgZW50ZXIgdmVyaWZpY2F0aW9uIGNvZGUiLCLYsdmF2LIg2LnYqNmI2LEg2YHYudmE24wg2YbYp9iv2LHYs9iqINin2LPYqiI6IkN1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0Iiwi2Kraqdix2KfYsSDYsdmF2LIg2LnYqNmI2LEg2YXYt9in2KjZgtiqINmG2K/Yp9ix2K8iOiJQYXNzd29yZCBjb25maXJtYXRpb24gZG9lcyBub3QgbWF0Y2giLCLYrtmI2KfZhtiv2YYg2YXYrtmB24wiOiJTdGVhbHRoIFJlYWQiLCLZvtin2LPYriDZh9mI2LTZhdmG2K8iOiJTbWFydCBSZXBseSIsIti22K8g2K3YsNmBINm+24zYp9mFIjoiQW50aS1EZWxldGUiLCLYttivINmI24zYsdin24zYtCDZvtuM2KfZhSI6IkFudGktRWRpdCIsItm+2KfYs9iuINmF2YbYtNuMIChBRkspIjoiQXdheSAoQUZLKSBSZXBseSIsItm+2KfYs9iuINiu2YjYr9qp2KfYsSDYr9ixINit2KfZhNiqINi52K/ZhSDYrdi22YjYsSI6IkF1dG8tcmVwbHkgd2hlbiBhd2F5Iiwi2KjbjNmI2q/Ysdin2YHbjCDZh9mI2LTZhdmG2K8iOiJTbWFydCBEeW5hbWljIEJpbyIsItiz2KfYudiqINmB2YjZhtiq24wg2KfYs9iq2YjYr9uM2YgiOiJTdHVkaW8gU3R5bGl6ZWQgQ2xvY2siLCLYp9iq2YjZhdin2LPbjNmI2YYiOiJBdXRvbWF0aW9uIiwi2YXYr9uM2LHbjNiqINix2KjYp9iqIjoiQm90IE1hbmFnZW1lbnQiLCLYr9iz2KrbjNin2LEg2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gQXNzaXN0YW50Iiwi2YfZiNi0INmF2LXZhtmI2LnbjCI6IkFydGlmaWNpYWwgSW50ZWxsaWdlbmNlIiwi2KrZhti424zZhdin2Kog2KfZhdmG24zYqtuMIjoiU2VjdXJpdHkgU2V0dGluZ3MiLCLZiNix2YjYryDYr9mI2YXYsdit2YTZh+KAjNin24wiOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uIiwi2qnYr9mH2KfbjCDYp9i22LfYsdin2LHbjCI6IkVtZXJnZW5jeSBDb2RlcyIsItiz2KfYudiqINix2LPZhduMINiq2YfYsdin2YYiOiJUZWhyYW4gT2ZmaWNpYWwgVGltZSIsItiq2YLZiNuM2YUg2K7ZiNix2LTbjNiv24wiOiJTb2xhciBIaWpyaSBDYWxlbmRhciIsItio2Ycg2LHZiNiyINix2LPYp9mG24wiOiJVcGRhdGUiLCLYs9mB2KfYsdi024wiOiJDdXN0b20iLCLYstmF2KfZhiDYrtmI2KfYqCI6IlNsZWVwIFRpbWUiLCLYstmF2KfZhiDYqNuM2K/Yp9ix24wiOiJXYWtlIFRpbWUiLCLZhdiq2YYg2K3Yp9mE2Kog2K7ZiNin2KgiOiJTbGVlcCBTdGF0dXMgVGV4dCIsItmF2KrZhiDYqNuM2Yjar9ix2KfZgduMIjoiQmlvIFRlbXBsYXRlIiwi2b7bjNi04oCM2YbZhdin24zYtCDYstmG2K/ZhyI6IkxpdmUgUHJldmlldyIsItqp2KfYsdio2LHYp9mGINmF2LPYr9mI2K8g2LTYr9mHIjoiQmxvY2tlZCBVc2VycyIsItin2YHYstmI2K/ZhiDaqdin2LHYqNixIjoiQWRkIFVzZXIiLCLYrdiw2YEg2qnYp9ix2KjYsSI6IlJlbW92ZSBVc2VyIiwi2YTbjNiz2Kog2YXYs9iv2YjYr9uMIjoiQmxvY2tsaXN0Iiwi2YTbjNiz2Kog2LPaqdmI2KoiOiJNdXRlIExpc3QiLCLaqdin2LHYqNix2KfZhiDYqNuM4oCM2LXYr9inIjoiTXV0ZWQgVXNlcnMiLCLYsdmB2Lkg2LPaqdmI2KoiOiJVbm11dGUiLCLYqNuM4oCM2LXYr9inINqp2LHYr9mGIjoiTXV0ZSIsItiq2KfYsduM2K7ahtmHINm+24zYp9mF4oCM2YfYpyI6Ik1lc3NhZ2UgSGlzdG9yeSIsItm+24zYp9mF4oCM2YfYp9uMINit2LDZgSDYtNiv2YciOiJEZWxldGVkIE1lc3NhZ2VzIiwi2b7bjNin2YXigIzZh9in24wg2YjbjNix2KfbjNi0INi02K/ZhyI6IkVkaXRlZCBNZXNzYWdlcyIsItm+2Kfaqdiz2KfYstuMINiq2KfYsduM2K7ahtmHIjoiQ2xlYXIgSGlzdG9yeSIsItiu2LHZiNis24wg2q/YsdmB2KrZhiI6IkV4cG9ydCIsItiv2KfZhtmE2YjYryDZhNin2q8iOiJEb3dubG9hZCBMb2ciLCLZiNi22LnbjNiqINin2KrYtdin2YQg2LPYsdmI2LEiOiJTZXJ2ZXIgQ29ubmVjdGlvbiBTdGF0dXMiLCLYs9ix2LnYqiDZvtin2LPYriI6IkxhdGVuY3kiLCLYrdin2YHYuNmHINmF2YjZgtiqIjoiS1YgU3RvcmFnZSIsItiv24zYqtin2KjbjNizIjoiRDEgRGF0YWJhc2UiLCLaqdmE24zYryDZhdiz2KrYsSI6Ik1hc3RlciBLZXkiLCLaqdmE2KfbjNmG2KoiOiJUZWxlZ3JhbSBDbGllbnQiLCLZhtiz2K7ZhyI6IlZlcnNpb24iLCLZvti02KrbjNio2KfZhtuMIjoiU3VwcG9ydCIsItmF2LPYqtmG2K/Yp9iqIjoiRG9jdW1lbnRhdGlvbiIsItqv24zYquKAjNmH2KfYqCI6IkdpdEh1YiIsItqp2KfZhtin2YQg2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gQ2hhbm5lbCIsItiv2LHYqNin2LHZhyI6IkFib3V0Iiwi2YLZiNin2YbbjNmGINin2LPYqtmB2KfYr9mHIjoiVGVybXMgb2YgU2VydmljZSIsItit2LHbjNmFINiu2LXZiNi124wiOiJQcml2YWN5IFBvbGljeSIsItmB2LnYp9mEIjoiQWN0aXZlIiwi2LrbjNix2YHYudin2YQiOiJJbmFjdGl2ZSIsItqp2KfYsdio2LHYp9mGIjoiVXNlcnMiLCLaqdin2LHYqNix2KfZhiDZgdi52KfZhCI6IkFjdGl2ZSBVc2VycyIsItmF2K/bjNixIjoiQWRtaW4iLCLZhdiv24zYsdin2YYiOiJBZG1pbnMiLCLZhdin2YTaqSI6Ik93bmVyIiwi2LHYqNin2KrigIzZh9inIjoiQm90cyIsItiz2YTZgeKAjNio2KfYqiI6IlNlbGZib3QiLCLYotmB2YTYp9uM2YYiOiJPZmZsaW5lIiwi2YXYudmE2YIiOiJTdXNwZW5kZWQiLCLZhdqp2KsiOiJQYXVzZWQiLCLZgti32LkiOiJEaXNjb25uZWN0ZWQiLCLYrtin2YXZiNi0IjoiT2ZmIiwi2LHZiNi02YYiOiJPbiIsItiu2LfYpyI6IkVycm9yIiwi2YXZiNmB2YIiOiJTdWNjZXNzIiwi2K3YsNmBIjoiRGVsZXRlIiwi2YjbjNix2KfbjNi0IjoiRWRpdCIsItiq2LrbjNuM2LEiOiJDaGFuZ2UiLCLYp9ix2KrZgtinIjoiUHJvbW90ZSIsItiq2YbYstmEIjoiRGVtb3RlIiwi2KrZhti424zZhdin2KoiOiJTZXR0aW5ncyIsItin2YXZhtuM2KoiOiJTZWN1cml0eSIsItiz2KfYudiqIjoiQ2xvY2siLCLYqNuM2YgiOiJCaW8iLCLYqNuM2Yjar9ix2KfZgduMIjoiQmlvIiwi2LHZiNiy2YfYpyI6IkRheXMiLCLZhdin2YciOiJNb250aCIsItmF2KfZh9mHIjoiTW9udGhzIiwi2LPYp9mEIjoiWWVhciIsItiz2KfZhNmHIjoiWWVhcnMiLCLYr9mC24zZgtmHIjoiTWludXRlIiwi2KvYp9mG24zZhyI6IlNlY29uZCIsItix2KfbjNqv2KfZhiI6IkZyZWUiLCLZiNuM2pjZhyI6IlZJUCIsItmG2KfZhdit2K/ZiNivIjoiVW5saW1pdGVkIiwi2b7YtNiq24zYqNin2YYiOiJCYWNrdXAiLCLaqdiv2YfYpyI6IkNvZGVzIiwi2YTYp9uM2LPZhtizIjoiTGljZW5zZSIsItin2YbYqNin2LEiOiJJbnZlbnRvcnkiLCLZgdix2YjYtCI6IlNhbGUiLCLYotmF2KfYr9mHIjoiUmVhZHkiLCLZvtmE2YYiOiJQbGFuIiwi2KfYudiq2KjYp9ixIjoiVmFsaWRpdHkiLCLYqNin2YLbjOKAjNmF2KfZhtiv2YciOiJSZW1haW5pbmciLCLYqti52K/Yp9ivIjoiQ291bnQiLCLaqdmEIjoiVG90YWwiLCLZh9mF2q/Yp9mF4oCM2LPYp9iy24wiOiJTeW5jIiwi2KfYqti12KfZhCI6IkNvbm5lY3QiLCLZiNix2YjYryI6IlNpZ24gSW4iLCLYq9io2KrigIzZhtin2YUiOiJTaWduIFVwIiwi2KjYp9iy24zYp9io24wiOiJSZXN0b3JlIiwi2K7YsdmI2KzbjCI6IkV4cG9ydCIsItiq2KfbjNuM2K8iOiJDb25maXJtIiwi2LDYrtuM2LHZhyI6IlNhdmUiLCLYp9ix2LPYp9mEIjoiU2VuZCIsItiv2LHbjNin2YHYqiI6IlJlY2VpdmUiLCLYqNix2LHYs9uMIjoiQ2hlY2siLCLYqtiz2KoiOiJUZXN0Iiwi2LHZgdix2LQiOiJSZWZyZXNoIiwi2KzYs9iq2KzZiCI6IlNlYXJjaCIsItix2KfZh9mG2YXYpyI6Ikd1aWRlIiwi2KfZhdqp2KfZhtin2KoiOiJGZWF0dXJlcyIsItiv2KfYtNio2YjYsdivIjoiRGFzaGJvYXJkIiwi2KfYs9iq2YjYr9uM2YgiOiJTdHVkaW8iLCLZvtmG2YQiOiJQYW5lbCIsItmF2K/bjNix24zYqiI6Ik1hbmFnZW1lbnQiLCLYtNio2K0iOiJHaG9zdCIsItiz2qnZiNiqIjoiTXV0ZSIsItiu2YjYp9ioIjoiU2xlZXAiLCLYttivINit2LDZgSI6IkFudGktRGVsZXRlIiwi2LbYryDZiNuM2LHYp9uM2LQiOiJBbnRpLUVkaXQiLCLZhdmG2LTbjCI6IkFGSyIsItix2YXYsiDYudio2YjYsSI6IlBhc3N3b3JkIiwi2LTZhdin2LHZhyDYqtmE2YHZhiI6IlBob25lIE51bWJlciIsItqp2YTbjNivIjoiS2V5Iiwi2KrZiNqp2YYiOiJUb2tlbiIsIti02YbYp9iz2YciOiJJRCIsItiq2KfYsduM2K4iOiJEYXRlIiwi2LPZhNin2YXYqiI6IkhlYWx0aCIsItiz2LHZiNixIjoiU2VydmVyIiwi2b7Yp9uM2q/Yp9mHINiv2KfYr9mHIjoiRGF0YWJhc2UiLCLYrdin2YHYuNmHIjoiTWVtb3J5Iiwi2LTYqNqp2YciOiJOZXR3b3JrIiwi2YjYsdqp2LEiOiJXb3JrZXIiLCLaqdmE2KfYr9mB2YTYsSI6IkNsb3VkZmxhcmUiLCLYsdin2YbYsSI6IlJ1bm5lciIsItiz2qnYsdiqIjoiU2VjcmV0Iiwi2LPaqdix2KrigIzZh9inIjoiU2VjcmV0cyIsItmF2LHYrdmE2YciOiJTdGVwIiwi2q/Yp9mFIjoiU3RlcCIsItqG2qnigIzZhNuM2LPYqiI6IkNoZWNrbGlzdCIsItmG2YfYp9uM24wiOiJGaW5hbCIsItm+24zYtOKAjNmG24zYp9iy2YfYpyI6IlByZXJlcXVpc2l0ZXMiLCLZhtuM2KfYstmF2YbYr9uM4oCM2YfYpyI6IlJlcXVpcmVtZW50cyIsItiv2KfZhtmE2YjYryI6IkRvd25sb2FkIiwi2YbYtdioIjoiSW5zdGFsbCIsItin2KzYsdinIjoiUnVuIiwi2KraqdmF24zZhCI6IkNvbXBsZXRlIiwi2YXZiNmB2YLbjNiqIjoiU3VjY2VzcyIsItiq2KjYsduM2qkiOiJDb25ncmF0dWxhdGlvbnMiLCLZh9i02K/Yp9ixIjoiV2FybmluZyIsItiq2YjYrNmHIjoiTm90aWNlIiwi2Ybaqdiq2YciOiJUaXAiLCLbjNinIjoib3IiLCLYqNmHIjoidG8iLCLYr9ixIjoiaW4iLCLYqNinIjoid2l0aCIsItio2LHYp9uMIjoiZm9yIiwi2LHZiNuMIjoib24iLCLYr9iz2KrZiNix2KfYqiI6ImNvbW1hbmRzIiwi2KjbjOKAjNi12K/YpyI6Im11dGUiLCLYqNuM4oCM2LXYr9inINqp2YbbjNivIjoibXV0ZSIsItqp2YbbjNivIjoiIiwi2LTYryI6IiIsItin2LPYqiI6ImlzIiwi2YfYs9iq2YbYryI6ImFyZSIsItio2YjYryI6IndhcyIsIti02YjYryI6IiIsItmF24zigIzYtNmI2K8iOiIiLCLYtNiv2YciOiIiLCLYr9in2LHYryI6ImhhcyIsItiv2KfYsdin24wiOiJ3aXRoIiwi2YHYp9mC2K8iOiJ3aXRob3V0Iiwi24zaqSI6Im9uZSIsItmH2YXZhyI6ImFsbCIsItmH2LEiOiJldmVyeSIsItmF2KfZhtuM2KrZiNix24zZhtqvIjoiTW9uaXRvcmluZyIsItmF2qnYqyDYs9mE2YHigIzYqNin2KoiOiJQYXVzZSBTZWxmYm90Iiwi2YHYudin2YTigIzYs9in2LLbjCDYs9mE2YHigIzYqNin2KoiOiJBY3RpdmF0ZSBTZWxmYm90Iiwi2KrYutuM24zYsSDZvtmE2YYg2KfYtNiq2LHYp9qpIjoiQ2hhbmdlIFN1YnNjcmlwdGlvbiBQbGFuIiwi2KrYutuM24zYsSDaqdmE2YXZhyDYudio2YjYsSI6IkNoYW5nZSBQYXNzd29yZCIsItmC2LfYuSDYs9i02YYg2KrZhNqv2LHYp9mFIjoiRGlzY29ubmVjdCBUZWxlZ3JhbSBTZXNzaW9uIiwi2KrYudmE24zZgiDYrdiz2KfYqCI6IlN1c3BlbmQgQWNjb3VudCIsItuM2YjYstix2YbbjNmFOiI6IlVzZXJuYW1lOiIsIuKchSDYqtmI2qnZhiDYqtmE2q/Ysdin2YUg2qnYp9mF2YTYp9mLINmF2LnYqtio2LEg2Ygg2YHYudin2YQg2KfYs9iqISI6IuKchSBUZWxlZ3JhbSB0b2tlbiBpcyBjb21wbGV0ZWx5IHZhbGlkIGFuZCBhY3RpdmUhIiwi8J+foiDZhdiq2LXZhCDZiCDYrNiv2KfZiNmEINii2YXYp9iv2YcgKNiq2LnYr9in2K8g2qnZhNuM2K/Zh9inOiI6IvCfn6IgQ29ubmVjdGVkICYgVGFibGVzIFJlYWR5IChLZXlzIGNvdW50OiIsItix2KfZh9mG2YXYp9uMINiq2LnYp9mF2YTbjCDZiCDYrtmI2K/aqdin2LEg2LHYp9mH4oCM2KfZhtiv2KfYstuMINin2K7Yqti12KfYtduMINmIINix2KfbjNqv2KfZhiDYs9mE2YHigIzYqNin2Kog2KrZhNqv2LHYp9mFIEFyaXpvIFNlbGYg2LHZiNuMINqp2YTYp9iv2YHZhNixINmIINqv24zYquKAjNmH2KfYqCDYp9qp2LTZhtiyIjoiSW50ZXJhY3RpdmUgYW5kIGF1dG9tYXRlZCBzdGVwLWJ5LXN0ZXAgc2V0dXAgZ3VpZGUgZm9yIGZyZWUgZGVkaWNhdGVkIEFyaXpvIFNlbGZib3Qgb24gQ2xvdWRmbGFyZSBhbmQgR2l0SHViIEFjdGlvbnMiLCLYotuM2Kcg2KfYsiDYrdiw2YEg2qnYp9mF2YQg2qnYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjb21wbGV0ZWx5IGRlbGV0ZSB1c2VyIiwi2KrZhdin2YXbjCDYr9in2K/Zh+KAjNmH2KfbjCDYp9uM2YYg2qnYp9ix2KjYsSDZvtin2qkg2K7ZiNin2YfYryDYtNivLiI6IkFsbCBkYXRhIG9mIHRoaXMgdXNlciB3aWxsIGJlIHB1cmdlZC4iLCLYotuM2Kcg2KfYsiDYrtix2YjYrCDYp9iyINiq2LnZhNuM2YIg2qnYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bnN1c3BlbmQgdXNlciIsItii24zYpyDYp9iyINiq2LnZhNuM2YIg2qnYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdXNwZW5kIHVzZXIiLCLZhdiv2Kog2LLZhdin2YYg2KfYtNiq2LHYp9qpINis2K/bjNivINix2Kcg2KfZhtiq2K7Yp9ioINqp2YbbjNivOiI6IlNlbGVjdCBuZXcgc3Vic2NyaXB0aW9uIGR1cmF0aW9uOiIsItiv2KfYptmF24wg2Ygg2YbYp9mF2K3Yr9mI2K8gKExpZmV0aW1lKSI6IlBlcm1hbmVudCAmIExpZmV0aW1lIiwi2qnYp9ix2KjYsSDZhtin2YXYudiq2KjYsSDYp9iz2KoiOiJVc2VyIGlzIGludmFsaWQiLCLYr9in2KbZhduMINmIINmG2KfZhdit2K/ZiNivICjZhdiv24zYsSDYp9ix2LTYrykiOiJQZXJtYW5lbnQgJiBVbmxpbWl0ZWQgKFN1cGVyIEFkbWluKSIsItmF2YbZgti224zigIzYtNiv2YciOiJFeHBpcmVkIiwi2K7Yt9inINiv2LEg2LPYp9iu2Kog2KzYr9in2YjZhCBEMToiOiJFcnJvciBjcmVhdGluZyBEMSB0YWJsZXM6Iiwi2KrZiNqp2YYg2LHYqNin2Kog2KfYsdiz2KfZhCDZhti02K/ZhyDYp9iz2KouIjoiQm90IHRva2VuIHdhcyBub3QgcHJvdmlkZWQuIiwi2KrZiNqp2YYg2YjYp9ix2K8g2LTYr9mHINiq2YjYs9i3INiz2LHZiNix2YfYp9uMINiq2YTar9ix2KfZhSDYqtin24zbjNivINmG2LTYry4iOiJUaGUgdG9rZW4gd2FzIG5vdCB2ZXJpZmllZCBieSBUZWxlZ3JhbSBzZXJ2ZXJzLiIsItiu2LfYpyDYr9ixINin2LHYqtio2KfYtyDYqNinINiz2LHZiNixINiq2YTar9ix2KfZhToiOiJFcnJvciBjb25uZWN0aW5nIHRvIFRlbGVncmFtIHNlcnZlcjoiLCLYqtmI2qnZhiDYsdio2KfYqiDZiCDYtNmG2KfYs9mHINqG2KogKNi52K/Yr9uMKSDYp9mE2LLYp9mF24wg2YfYs9iq2YbYry4iOiJCb3QgdG9rZW4gYW5kIENoYXQgSUQgKG51bWVyaWMpIGFyZSByZXF1aXJlZC4iLCLZvtuM2KfZhSDYqtiz2Kog2KjYpyDZhdmI2YHZgtuM2Kog2KjZhyDahtiqINiq2YTar9ix2KfZhSDYp9ix2LPYp9mEINi02K8uIjoiVGVzdCBtZXNzYWdlIHNlbnQgc3VjY2Vzc2Z1bGx5IHRvIFRlbGVncmFtIGNoYXQuIiwi2K7Yt9inINiv2LEg2KfYsdiz2KfZhCDZvtuM2KfZhSDYqtmE2q/Ysdin2YUuIjoiRXJyb3Igc2VuZGluZyBUZWxlZ3JhbSBtZXNzYWdlLiIsItiu2LfYpyDYr9ixINin2LHYqtio2KfYtyDYqNinINiq2YTar9ix2KfZhToiOiJFcnJvciBjb21tdW5pY2F0aW5nIHdpdGggVGVsZWdyYW06Iiwi2KrZhNin2LQg2KjbjNi0INin2LIg2K3YryDYqNix2KfbjCDZiNix2YjYryDYqNmHINm+2YbZhCDZhdiv24zYsduM2KouINmE2LfZgdin2Ysg27Ug2K/ZgtuM2YLZhyDYr9uM2q/YsSDYqtmE2KfYtCDaqdmG24zYry4iOiJUb28gbWFueSBsb2dpbiBhdHRlbXB0cyB0byBBZG1pbiBQb3J0YWwuIFBsZWFzZSByZXRyeSBpbiA1IG1pbnV0ZXMuIiwi2LHZhdiyINi52KjZiNixINmF2K/bjNix24zYqiDYr9ixINiz2LHZiNixINiq2YbYuNuM2YUg2YbYtNiv2Ycg2KfYs9iqLiI6IkFkbWluIHBhc3N3b3JkIGlzIG5vdCBzZXQgb24gdGhlIHNlcnZlci4iLCLYsdmF2LIg2LnYqNmI2LEg2YXYr9uM2LHbjNiqINmG2KfYr9ix2LPYqiDYp9iz2KouIjoiQWRtaW4gcGFzc3dvcmQgaXMgaW5jb3JyZWN0LiIsItiu2LfYpyDYr9ixINin2K3Ysdin2LIg2YfZiNuM2Kog2YXYr9uM2LHbjNiqIjoiRXJyb3IgaW4gQWRtaW4gYXV0aGVudGljYXRpb24iLCLYr9iz2KrYsdiz24wg2LrbjNix2YXYrNin2LIiOiJVbmF1dGhvcml6ZWQgYWNjZXNzIiwi2K7Yt9inINiv2LEg2K/YsduM2KfZgdiqINii2YXYp9ixIjoiRXJyb3IgcmV0cmlldmluZyBzdGF0aXN0aWNzIiwi2K7Yt9inINiv2LEg2K/YsduM2KfZgdiqINmE2Kfar+KAjNmH2KfbjCDYp9mF2YbbjNiq24wiOiJFcnJvciByZXRyaWV2aW5nIHNlY3VyaXR5IGxvZ3MiLCLYrti32Kcg2K/YsSDYr9ix24zYp9mB2Kog2qnYr9mH2KciOiJFcnJvciByZXRyaWV2aW5nIGxpY2Vuc2UgY29kZXMiLCLYrti32Kcg2K/YsSDYqtmI2YTbjNivINqp2K/Zh9in24wg2LHYr9uM2YUiOiJFcnJvciBnZW5lcmF0aW5nIHJlZGVlbSBjb2RlcyIsItqp2K8g2KfZhNiy2KfZhduMINin2LPYqiI6IkNvZGUgaXMgcmVxdWlyZWQiLCLYrti32Kcg2K/YsSDYrdiw2YEg2qnYryI6IkVycm9yIGRlbGV0aW5nIGNvZGUiLCLZhdmG2YLYttuM4oCM2LTYr9mHIPCflLQiOiJFeHBpcmVkIPCflLQiLCLYrti32Kcg2K/YsSDYr9ix24zYp9mB2Kog2qnYp9ix2KjYsdin2YYiOiJFcnJvciByZXRyaWV2aW5nIHVzZXJzIiwi2qnYp9ix2KjYsSDbjNin2YHYqiDZhti02K8iOiJVc2VyIG5vdCBmb3VuZCIsItqp2KfYsdio2LEg2LHYqNin2Kog2qnZhdqp24wg2YXYqti12YQg2YbYr9in2LHYryI6IlVzZXIgaGFzIG5vIGFzc2lzdGFudCBib3QgY29ubmVjdGVkIiwi2K3Ys9in2Kgg2KrZhNqv2LHYp9mFINqp2KfYsdio2LEg2YXYqti12YQg2YbbjNiz2KoiOiJVc2VyIFRlbGVncmFtIGFjY291bnQgaXMgbm90IGNvbm5lY3RlZCIsItqp2YTZhdmHINi52KjZiNixINis2K/bjNivINio2KfbjNivINit2K/Yp9mC2YQg27Yg2qnYp9ix2Kfaqdiq2LEg2KjYp9i02K8iOiJOZXcgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMiLCLYp9i02KrYsdin2qkiOiJTdWJzY3JpcHRpb24iLCLYudmF2YTbjNin2Kog2YbYp9mF2LnYqtio2LEiOiJJbnZhbGlkIG9wZXJhdGlvbiIsItiu2LfYpyDYr9ixINin2LnZhdin2YQg2LnZhdmE24zYp9iqIjoiRXJyb3IgcGVyZm9ybWluZyBvcGVyYXRpb24iLCLYqtmE2KfYtCDYqNuM2LQg2KfYsiDYrdivINio2LHYp9uMINir2KjYquKAjNmG2KfZhS4g2YTYt9mB2KfZiyDYr9mC2KfbjNmC24wg2K/bjNqv2LEg2KfZhdiq2K3Yp9mGINqp2YbbjNivLiI6IlRvbyBtYW55IHJlZ2lzdHJhdGlvbiBhdHRlbXB0cy4gUGxlYXNlIHJldHJ5IGluIGEgZmV3IG1pbnV0ZXMuIiwi2YbYp9mFINqp2KfYsdio2LHbjCDYqNin24zYryDYqNuM2YYg27Mg2KrYpyDbstu0INqp2KfYsdin2qnYqtixINmIINmB2YLYtyDYtNin2YXZhCDYrdix2YjZgSDYp9mG2q/ZhNuM2LPbjNiMINi52K/YryDZiCBfINio2KfYtNivLiI6IlVzZXJuYW1lIG11c3QgYmUgYmV0d2VlbiAzLTI0IGNoYXJhY3RlcnMgY29udGFpbmluZyBvbmx5IEVuZ2xpc2ggbGV0dGVycywgbnVtYmVycywgYW5kIF8uIiwi2KfbjNmGINmG2KfZhSDaqdin2LHYqNix24wg2YLYqNmE2KfZiyDYq9io2Kog2LTYr9mHINin2LPYqi4g2YTYt9mB2KfZiyDZhtin2YUg2K/bjNqv2LHbjCDYqNix2q/YstuM2YbbjNivLiI6IlRoaXMgdXNlcm5hbWUgaXMgYWxyZWFkeSB0YWtlbi4gUGxlYXNlIGNob29zZSBhbm90aGVyIHVzZXJuYW1lLiIsItqp2K8g2YTYp9uM2LPZhtizINmI2KfYsdivINi02K/ZhyDZhtin2YXYudiq2KjYsSDYp9iz2Kog24zYpyDYr9ixINiz24zYs9iq2YUg2YjYrNmI2K8g2YbYr9in2LHYry4iOiJMaWNlbnNlIGNvZGUgaXMgaW52YWxpZCBvciBkb2VzIG5vdCBleGlzdC4iLCLYp9uM2YYg2qnYryDZhNin24zYs9mG2LMg2YLYqNmE2KfZiyDYqtmI2LPYtyDaqdin2LHYqNixINiv24zar9ix24wg2YXYtdix2YEg2LTYr9mHINin2LPYqi4iOiJUaGlzIGxpY2Vuc2UgY29kZSBoYXMgYWxyZWFkeSBiZWVuIHJlZGVlbWVkIGJ5IGFub3RoZXIgdXNlci4iLCLYrti32Kcg2K/YsSDYq9io2KrigIzZhtin2YUg2qnYp9ix2KjYsSI6IkVycm9yIHJlZ2lzdGVyaW5nIHVzZXIiLCLaqdivINmE2KfbjNiz2YbYsyDYp9mE2LLYp9mF24wg2KfYs9iqIjoiTGljZW5zZSBjb2RlIGlzIHJlcXVpcmVkIiwi2qnYryDZhNin24zYs9mG2LMg2YbYp9mF2LnYqtio2LEg2KfYs9iqINuM2Kcg2YLYqNmE2KfZiyDZhdi12LHZgSDYtNiv2Ycg2KfYs9iqLiI6IkxpY2Vuc2UgY29kZSBpcyBpbnZhbGlkIG9yIGFscmVhZHkgcmVkZWVtZWQuIiwi2K7Yt9inINiv2LEg2YHYudin2YTigIzYs9in2LLbjCDaqdivINmE2KfbjNiz2YbYsyI6IkVycm9yIGFjdGl2YXRpbmcgbGljZW5zZSBjb2RlIiwi2K3Ys9in2Kgg2YXZiNmC2KrYp9mLINmC2YHZhCDYtNivLiDZhNi32YHYp9mLINu1INiv2YLbjNmC2Ycg2K/bjNqv2LEg2YXYrNiv2K/Yp9mLINiq2YTYp9i0INqp2YbbjNivLiI6IkFjY291bnQgdGVtcG9yYXJpbHkgbG9ja2VkLiBQbGVhc2UgcmV0cnkgaW4gNSBtaW51dGVzLiIsItmG2KfZhSDaqdin2LHYqNix24wg24zYpyDYsdmF2LIg2LnYqNmI2LEg2KfYtNiq2KjYp9mHINin2LPYqi4iOiJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkLiIsItqp2K8g2KrYp9uM24zYryDYr9mIINmF2LHYrdmE2YfigIzYp9uMICgyRkEpINin2YTYstin2YXbjCDYp9iz2KouIjoiVHdvLWZhY3RvciBhdXRoZW50aWNhdGlvbiAoMkZBKSBjb2RlIGlzIHJlcXVpcmVkLiIsItqp2K8g2KrYp9uM24zYryDYr9mIINmF2LHYrdmE2YfigIzYp9uMICgyRkEpINuM2Kcg2qnYryDYqNin2LLbjNin2KjbjCDZhtin2K/Ysdiz2Kog2KfYs9iqLiI6IkludmFsaWQgMkZBIGNvZGUgb3IgcmVjb3ZlcnkgY29kZS4iLCLYrti32Kcg2K/YsSDZiNix2YjYryDYqNmHINit2LPYp9ioIjoiRXJyb3Igc2lnbmluZyBpbiIsItix2YXYsiDYudio2YjYsSDZgdi52YTbjCDZhtin2K/Ysdiz2Kog2KfYs9iqLiI6IkN1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0LiIsItix2YXYsiDYudio2YjYsSDYqNinINmF2YjZgdmC24zYqiDYqNmH4oCM2LHZiNiy2LHYs9in2YbbjCDYtNivLiI6IlBhc3N3b3JkIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5LiIsItiu2LfYpyDYr9ixINiq2LrbjNuM2LEg2LHZhdiyINi52KjZiNixIjoiRXJyb3IgY2hhbmdpbmcgcGFzc3dvcmQiLCLYp9qp2KfZhtiqINiq2YTar9ix2KfZhSDZhdiq2LXZhCDZhtuM2LPYqiI6IlRlbGVncmFtIGFjY291bnQgaXMgbm90IGNvbm5lY3RlZCIsItix2YXYsiDYudio2YjYsSDZiNin2LHYryDYtNiv2Ycg2YbYp9iv2LHYs9iqINin2LPYqi4iOiJFbnRlcmVkIHBhc3N3b3JkIGlzIGluY29ycmVjdC4iLCLYrti32Kcg2K/YsSDYrdiw2YEg2K3Ys9in2Kgg2qnYp9ix2KjYsduMIjoiRXJyb3IgZGVsZXRpbmcgdXNlciBhY2NvdW50Iiwi2K7Yt9inINiv2LEg2KfbjNis2KfYryDYqtmG2LjbjNmF2KfYqiAyRkEiOiJFcnJvciBzZXR0aW5nIHVwIDJGQSIsItmF2YfZhNiqINmB2LnYp9mE4oCM2LPYp9iy24wg2KjZhyDZvtin24zYp9mGINix2LPbjNiv2Ycg2KfYs9iqLiDZhdis2K/Yr9in2Ysg2KfZgtiv2KfZhSDaqdmG24zYry4iOiJBY3RpdmF0aW9uIHRpbWVvdXQgZXhwaXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4iLCLaqdivINu2INix2YLZhduMINmI2KfYsdivINi02K/ZhyDZhtin2YXYudiq2KjYsSDYp9iz2KouIjoiVGhlIDYtZGlnaXQgY29kZSBpcyBpbnZhbGlkLiIsItiu2LfYpyDYr9ixINmB2LnYp9mE4oCM2LPYp9iy24wgMkZBIjoiRXJyb3IgZW5hYmxpbmcgMkZBIiwi2KzZh9iqINi624zYsdmB2LnYp9mE4oCM2LPYp9iy24zYjCDZiNix2YjYryDYsdmF2LIg2LnYqNmI2LEg2K3Ys9in2Kgg24zYpyDaqdivINmF2LnYqtio2LEg2KfZhNiy2KfZhduMINin2LPYqi4iOiJBY2NvdW50IHBhc3N3b3JkIG9yIHZhbGlkIGNvZGUgcmVxdWlyZWQgdG8gZGlzYWJsZSAyRkEuIiwi2K7Yt9inINiv2LEg2LrbjNix2YHYudin2YTigIzYs9in2LLbjCAyRkEiOiJFcnJvciBkaXNhYmxpbmcgMkZBIiwi2LHZhdiyINi52KjZiNixINm+2LTYqtuM2KjYp9mGINio2KfbjNivINit2K/Yp9mC2YQg27gg2qnYp9ix2Kfaqdiq2LEg2KjYp9i02K8uIjoiQmFja3VwIHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzLiIsItiu2LfYpyDYr9ixINiu2LHZiNis24wg2b7YtNiq24zYqNin2YYiOiJFcnJvciBnZW5lcmF0aW5nIGJhY2t1cCBleHBvcnQiLCLZhdit2KrZiNin24wg2YHYp9uM2YQg2b7YtNiq24zYqNin2YYg2Ygg2LHZhdiyINi52KjZiNixINin2YTYstin2YXbjCDYp9iz2KouIjoiQmFja3VwIGZpbGUgY29udGVudCBhbmQgcGFzc3dvcmQgYXJlIHJlcXVpcmVkLiIsItmB2KfbjNmEINm+2LTYqtuM2KjYp9mGINmB2KfZgtivINiq2YbYuNuM2YXYp9iqINmF2LnYqtio2LEg2KfYs9iqLiI6IkJhY2t1cCBmaWxlIGRvZXMgbm90IGNvbnRhaW4gdmFsaWQgc2V0dGluZ3MuIiwi2K7Yt9inINiv2LEg2KjYp9iy2q/Ysdiv2KfZhtuMINm+2LTYqtuM2KjYp9mGIjoiRXJyb3IgcmVzdG9yaW5nIGJhY2t1cCIsItin2KjYqtiv2Kcg2YjYp9ix2K8g2K3Ys9in2Kgg2qnYp9ix2KjYsduMINiu2YjYryDYtNmI24zYryI6IlBsZWFzZSBzaWduIGluIHRvIHlvdXIgYWNjb3VudCBmaXJzdCIsItis2YfYqiDYrNmE2Yjar9uM2LHbjCDYp9iyINio2YTYp9qpINi02K/ZhiDYtNmF2KfYsdmHINiv2LEg2KrZhNqv2LHYp9mF2Iwg2YTYt9mB2KfZiyDbsduwINiv2YLbjNmC2Ycg2LXYqNixINqp2YbbjNivLiI6IlRvIHByZXZlbnQgcGhvbmUgbnVtYmVyIGJhbiBvbiBUZWxlZ3JhbSwgcGxlYXNlIHdhaXQgMTAgbWludXRlcy4iLCLYtNmF2KfYsdmHINiq2YTZgdmGINin2YTYstin2YXbjCDYp9iz2KoiOiJQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQiLCLYrti32Kcg2K/YsSDYp9ix2LPYp9mEINqp2K8g2KrYo9uM24zYryDYqtmE2q/Ysdin2YUiOiJFcnJvciBzZW5kaW5nIFRlbGVncmFtIHZlcmlmaWNhdGlvbiBjb2RlIiwi2YbYtNiz2Kog2YXZhtmC2LbbjCDYtNiv2Ycg2KfYs9iqLiDZhNi32YHYp9mLINmF2KzYr9iv2KfZiyDYtNmF2KfYsdmHINix2Kcg2YjYp9ix2K8g2qnZhtuM2K8uIjoiU2Vzc2lvbiBleHBpcmVkLiBQbGVhc2UgcmUtZW50ZXIgcGhvbmUgbnVtYmVyLiIsItqp2K8g2YjYp9ix2K8g2LTYr9mHINin2LTYqtio2KfZhyDbjNinINmF2YbZgti224wg2KfYs9iqIjoiVmVyaWZpY2F0aW9uIGNvZGUgaXMgaW5jb3JyZWN0IG9yIGV4cGlyZWQiLCLZhti02LPYqiDZhdmG2YLYttuMINi02K/ZhyDYp9iz2KouINmE2LfZgdin2Ysg2YXYrNiv2K/Yp9mLINiq2YTYp9i0INqp2YbbjNivLiI6IlNlc3Npb24gZXhwaXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4iLCLYsdmF2LIg2K/ZiNi52KfZhdmE24wg2YjYp9ix2K8g2LTYr9mHINin2LTYqtio2KfZhyDYp9iz2KoiOiIyRkEgcGFzc3dvcmQgaXMgaW5jb3JyZWN0Iiwi2LPYtNmGINiq2YTar9ix2KfZhSDYp9mE2LLYp9mF24wg2KfYs9iqIjoiVGVsZWdyYW0gc2Vzc2lvbiBzdHJpbmcgaXMgcmVxdWlyZWQiLCLYqtmE2q/Ysdin2YUg2YXYqti12YQg2YbbjNiz2KoiOiJUZWxlZ3JhbSBpcyBub3QgY29ubmVjdGVkIiwi2KfYtNiq2LHYp9qpINi02YXYpyDYqNmHINm+2KfbjNin2YYg2LHYs9uM2K/ZhyDZiCDYs9mE2YHigIzYqNin2Kog2KjZhyDYrdin2YTYqiDYqti52YTbjNmCINiv2LHYotmF2K/ZhyDYp9iz2KouIjoiWW91ciBzdWJzY3JpcHRpb24gaGFzIGVuZGVkIGFuZCB0aGUgc2VsZmJvdCBpcyBzdXNwZW5kZWQuIiwi2KrZiNqp2YYg2YbYp9mF2LnYqtio2LEg24zYpyDZhdmG2YLYttuMINin2LPYqiI6IlRva2VuIGlzIGludmFsaWQgb3IgZXhwaXJlZCIsItin2LfZhNin2LnYp9iqINiv2LHbjNin2YHYqiDYtNiv2Ycg2YXYqti52YTZgiDYqNmHINuM2qkg2LHYqNin2Kog2YXYudiq2KjYsSDZhtuM2LPYqi4iOiJSZWNlaXZlZCBkYXRhIGRvZXMgbm90IGJlbG9uZyB0byBhIHZhbGlkIGJvdC4iLCLYp9iq2LXYp9mEINix2KjYp9iqINiq2YTar9ix2KfZhSDYqNinINmF2YjZgdmC24zYqiDZgti32Lkg2q/Ysdiv24zYryDZiCDZhdmG2KfYqNi5INmIINit2KfZgdi42Ycg2qnZhNin2K/ZgdmE2LEg2KLYstin2K8g2LTYry4iOiJUZWxlZ3JhbSBib3QgZGlzY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSBhbmQgQ2xvdWRmbGFyZSBtZW1vcnkgZnJlZWQuIiwi2KfYqNiq2K/YpyDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2K7ZiNivINix2Kcg2YXYqti12YQg2qnZhtuM2K8iOiJDb25uZWN0IHlvdXIgVGVsZWdyYW0gYm90IGZpcnN0Iiwi2LTZhtin2LPZhyDYudiv2K/bjCDYqtmE2q/Ysdin2YUg2KjYp9uM2K8g2LnYr9iv24wg2KjbjNmGINu1INiq2Kcg27HbtSDYsdmC2YUg2KjYp9i02K8iOiJUZWxlZ3JhbSBudW1lcmljIElEIG11c3QgYmUgYmV0d2VlbiA1IGFuZCAxNSBkaWdpdHMiLCLYp9iq2LXYp9mEINio2LHZgtix2KfYsSDZhti02K8iOiJDb25uZWN0aW9uIGZhaWxlZCIsItiu2LfYp9uMINiz24zYs9iq2YXbjCDYsdiuINiv2KfYry4g2YTYt9mB2KfZiyDahtmG2K8g2YTYrdi42Ycg2KjYudivINmF2KzYr9iv2KfZiyDYqtmE2KfYtCDZgdix2YXYp9uM24zYry4iOiJTeXN0ZW0gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4gc2hvcnRseS4iLCLZvtin24zar9in2Ycg2K/Yp9iv2YcgQ2xvdWRmbGFyZSBEMSDYqNmHINin24zZhiDZiNix2qnYsSDZhdiq2LXZhCDZhtuM2LPYqiAoREIgYmluZGluZyDYqti52LHbjNmBINmG2LTYr9mHKS4g2YTYt9mB2KfZiyDYp9io2KrYr9inIHdyYW5nbGVyLnRvbWwg2LHYpyDZvtuM2qnYsdio2YbYr9uMINmIINiv24zZvtmE2YjbjCDaqdmG24zYry4iOiJDbG91ZGZsYXJlIEQxIERhdGFiYXNlIGlzIG5vdCBib3VuZCB0byB0aGlzIFdvcmtlciAobWlzc2luZyBEQiBiaW5kaW5nKS4gUGxlYXNlIGNvbmZpZ3VyZSB3cmFuZ2xlci50b21sIGFuZCBkZXBsb3kgZmlyc3QuIiwi4pqhINin2LPYqtmI2K/bjNmI24wg2LPZhNmB4oCM2KjYp9iqIjoi4pqhIFNlbGZib3QgU3R1ZGlvIiwi2YbZhdin24zYtCDZvtmG2YQg2KfYtdmE24wg2Ygg2LHYp9mH2YbZhdinIjoiU2hvdyBNYWluIFBhbmVsICYgR3VpZGUiLCLwn5G7INmF2LTYp9mH2K/ZhyDahtiq4oCM2YfYp9uMINiu2LXZiNi124wg2Ygg2b7bjNin2YXigIzZh9in24wg2K7ZiNin2YbYr9mH4oCM2YbYtNiv2YcgKNi02KjYrSkiOiLwn5G7IFZpZXcgR2hvc3QgQ2hhdHMgJiBVbnJlYWQgTWVzc2FnZXMiLCLwn5OpINm+24zYp9mF4oCM2YfYp9uMINiu2YjYp9mG2K/Zh+KAjNmG2LTYr9mHINiv2LEg2K3Yp9mE2Kog2LTYqNitIjoi8J+TqSBVbnJlYWQgTWVzc2FnZXMgaW4gR2hvc3QgTW9kZSIsItix2YjYtNmGIC8g2K7Yp9mF2YjYtCDaqdix2K/ZhiDYrdin2YTYqiDYtNio2K0iOiJUb2dnbGUgR2hvc3QgTW9kZSBPbiAvIE9mZiIsItix2YjYtNmGIC8g2K7Yp9mF2YjYtCDaqdix2K/ZhiDZvtin2LPYriDZh9mI2LTZhdmG2K8gQUkiOiJUb2dnbGUgU21hcnQgQUkgUmVwbHkgT24gLyBPZmYiLCLYp9iz2KrYudmE2KfZhSDZiNi22LnbjNiqINiy2YbYr9mHINiz2YTZgeKAjNio2KfYqiI6IkNoZWNrIExpdmUgU2VsZmJvdCBTdGF0dXMiLCLYqtiz2Kog2KfYsdiz2KfZhCDar9iy2KfYsdi0INi22K8g2K3YsNmBINmIINmI24zYsdin24zYtCI6IlRlc3QgQW50aS1EZWxldGUgJiBBbnRpLUVkaXQgUmVwb3J0Iiwi2LHYp9mH2YbZhdin24wg2qnYp9mF2YQg2KfYs9iq2YHYp9iv2Ycg2KfYsiDYsdio2KfYqiI6IkNvbXBsZXRlIEJvdCBVc2FnZSBHdWlkZSIsIuKaoSBBcml6byBTZWxmIHwg2b7ZhNiq2YHYsdmFINin2LPYqtmI2K/bjNmI24wg2LPZhNmBINio2KfYqiDZh9mI2LTZhdmG2K8g2KrZhNqv2LHYp9mFINmIINm+2YbZhCDZhdiv24zYsduM2KoiOiLimqEgQXJpem8gU2VsZiB8IEludGVsbGlnZW50IFRlbGVncmFtIFNlbGZib3QgU3R1ZGlvICYgQ2xvdWQgTWFuYWdlbWVudCIsIuKaoSBBcml6byBTZWxmIHwg2b7ZhNiq2YHYsdmFINin2LPYqtmI2K/ZitmI2Yog2LPZhNmB4oCM2KjYp9iqINmH2YjYtNmF2YbYryDYqtmE2q/Ysdin2YUg2Ygg2b7ZhtmEINmF2K/Zitix2YrYqiI6IuKaoSBBcml6byBTZWxmIHwgSW50ZWxsaWdlbnQgVGVsZWdyYW0gU2VsZmJvdCBTdHVkaW8gJiBDbG91ZCBNYW5hZ2VtZW50Iiwi2LHYp9mH2YbZhdin2Yog2KfZhdmD2KfZhtin2KoiOiJGZWF0dXJlIFRvdXIiLCLZvtmG2YQg2YXYr9mK2LHZitiqIjoiQWRtaW4gUG9ydGFsIiwi2YPYp9ix2KjYsSI6IlVzZXIiLCLZhdix2YPYsiDZgdix2YXYp9mG2K/Zh9mKINmIINmB2LHZiNi02q/Yp9mHIEFyaXpvIFNlbGYiOiJBcml6byBTZWxmIENvbW1hbmQgQ2VudGVyICYgU3RvcmUiLCLZhdix2YPYsiDZgdix2YXYp9mG2K/Zh9mKINmIINmB2LHZiNi02q/Yp9mHINii2LHZitiy2Ygg2LPZhNmBIjoiQXJpem8gU2VsZiBDb21tYW5kIENlbnRlciAmIFN0b3JlIiwi2KjYp9iy2q/YtNiqINio2Ycg2b7ZhtmEINmD2KfYsdio2LHYp9mGIjoiUmV0dXJuIHRvIFVzZXIgRGFzaGJvYXJkIiwi2KLZhdin2LEg2Ygg2LTYp9iu2LUg2YfYpyI6IlN0YXRzICYgTWV0cmljcyIsIti12K/ZiNixINmIINin2YbYqNin2LEg2YTYp9mK2LPZhtizIjoiTGljZW5zZSBJbnZlbnRvcnkiLCLZhdiv24zYsduM2Kog2qnYp9ix2KjYsdin2YYg2Ygg2LHYqNin2Kog2YfYpyI6IlVzZXJzICYgU2VsZmJvdHMiLCLZhdiv2YrYsdmK2Kog2YPYp9ix2KjYsdin2YYg2Ygg2LHYqNin2KrigIzZh9inIjoiVXNlcnMgJiBTZWxmYm90cyIsIvCfkaUg2YPZhCDZg9in2LHYqNix2KfZhiI6IvCfkaUgVG90YWwgVXNlcnMiLCLwn5+iINix2KjYp9iqINmH2KfbjCDZgdi52KfZhCI6IvCfn6IgQWN0aXZlIFNlbGZib3RzIiwi8J+foiDYsdio2KfYquKAjNmH2KfZiiDZgdi52KfZhCI6IvCfn6IgQWN0aXZlIFNlbGZib3RzIiwi8J+On++4jyDZg9iv2YfYp9mKINii2YXYp9iv2Ycg2YHYsdmI2LQiOiLwn46f77iPIEF2YWlsYWJsZSBMaWNlbnNlcyIsIvCfkrMg2qnYr9mH2KfbjCDZhdi12LHZgSDYtNiv2YciOiLwn5KzIFJlZGVlbWVkIExpY2Vuc2VzIiwi8J+SsyDZg9iv2YfYp9mKINmF2LXYsdmB4oCM2LTYr9mHIjoi8J+SsyBSZWRlZW1lZCBMaWNlbnNlcyIsIvCfjJAg2LPZhNin2YXYqiDYtNio2YPZhyDYp9io2LHZiiBBcml6byBFZGdlIjoi8J+MkCBBcml6byBFZGdlIENsb3VkIE5ldHdvcmsgSGVhbHRoIiwi2LPYsdmI2LHZh9in24wgQ2xvdWRmbGFyZSBXb3JrZXJzINio2Kcg2KrZiNiy24zYuSDYrNmH2KfZhtuMINiv2LEg2K3Yp9mEINin2KzYsdin24wg2qnYsdmI2YYg2KzYp9ioINmH2KfbjCDYstmF2KfZhiDYqNmG2K/bjCDYtNiv2Ycg2YfYs9iq2YbYry4g2KfYqti12KfZhCDZh9mF2q/Yp9mFINiz2KfYsiDYqtmH2LHYp9mGINiv2LEg2YXbjNmE24wg2KvYp9mG24zZhyDYtdmB2LEg2YfYsSDYr9mC24zZgtmHINmB2LnYp9mEINin2LPYqi4iOiJDbG91ZGZsYXJlIFdvcmtlcnMgZWRnZSBuZXR3b3JrIHJ1bm5pbmcgc2NoZWR1bGVkIGNyb24gam9icyBnbG9iYWxseS4gVGVocmFuIHN5bmMgYWN0aXZlIGF0IHNlY29uZCAwMC4wMDAgb2YgZXZlcnkgbWludXRlLiIsItiz2LHZiNix2YfYp9mKIENsb3VkZmxhcmUgV29ya2VycyDYqNinINiq2YjYstmK2Lkg2KzZh9in2YbZiiDYr9ixINit2KfZhCDYp9is2LHYp9mKINmD2LHZiNmG4oCM2KzYp9io4oCM2YfYp9mKINiy2YXYp9mG4oCM2KjZhtiv2YrigIzYtNiv2Ycg2YfYs9iq2YbYry4g2KfYqti12KfZhCDZh9mF2q/Yp9mF4oCM2LPYp9iyINiq2YfYsdin2YYg2K/YsSDZhdmK2YTZiuKAjNir2KfZhtmK2Ycg2LXZgdixINmH2LEg2K/ZgtmK2YLZhyDZgdi52KfZhCDYp9iz2KouIjoiQ2xvdWRmbGFyZSBXb3JrZXJzIGVkZ2UgbmV0d29yayBydW5uaW5nIHNjaGVkdWxlZCBjcm9uIGpvYnMgZ2xvYmFsbHkuIFRlaHJhbiBzeW5jIGFjdGl2ZSBhdCBzZWNvbmQgMDAuMDAwIG9mIGV2ZXJ5IG1pbnV0ZS4iLCLYtdiv2YjYsSDZg9iv2YfYp9mKINis2K/ZitivINmE2KfZitiz2YbYsyBBcml6byBTZWxmINio2LHYp9mKINmB2LHZiNi0INio2Ycg2K7YsdmK2K/Yp9ix2KfZhiI6Iklzc3VlIE5ldyBBcml6byBTZWxmIExpY2Vuc2VzIGZvciBDdXN0b21lcnMiLCLYqti52K/Yp9ivINmD2K8iOiJDb2RlIFF1YW50aXR5Iiwi27Eg2LnYr9ivINmD2K8iOiIxIExpY2Vuc2UgS2V5Iiwi27Ug2LnYr9ivINmD2K8iOiI1IExpY2Vuc2UgS2V5cyIsItux27Ag2LnYr9ivINmD2K8iOiIxMCBMaWNlbnNlIEtleXMiLCLbstuwINi52K/YryDZg9ivIjoiMjAgTGljZW5zZSBLZXlzIiwi2YbZiNi5INin2LTYqtix2KfZgyDZiCDYp9i52KrYqNin2LEiOiJTdWJzY3JpcHRpb24gUGxhbiAmIFZhbGlkaXR5Iiwi2KfYtNiq2LHYp9mDINuxINmF2KfZh9mHICjbs9uwINix2YjYsikiOiIxIE1vbnRoICgzMCBEYXlzKSIsItin2LTYqtix2KfZgyDbsyDZhdin2YfZhyAo27nbsCDYsdmI2LIpIjoiMyBNb250aHMgKDkwIERheXMpIiwi2KfYtNiq2LHYp9mDINu2INmF2KfZh9mHICjbsdu427Ag2LHZiNiyKSI6IjYgTW9udGhzICgxODAgRGF5cykiLCLYp9i02KrYsdin2YMg2K/Yp9im2YXZiiDZiCDZhtin2YXYrdiv2YjYryI6IkxpZmV0aW1lIFVubGltaXRlZCBQbGFuIiwi4q2QINiz2YHYp9ix2LTZiiAo2KrYudmK2YrZhiDYsdmI2LIg2K/ZhNiu2YjYp9mHINiq2YjYs9i3INin2K/ZhdmK2YYpIjoi4q2QIEN1c3RvbSAoQWRtaW4tZGVmaW5lZCBkYXlzKSIsItiq2LnYr9in2K8g2LHZiNiy2YfYp9mKINin2LnYqtio2KfYsSI6IkR1cmF0aW9uIChEYXlzKSIsIvCfjp/vuI8g2KrZiNmE2YrYryDZg9iv2YfYp9mKINmE2KfZitiz2YbYsyDYrNiv2YrYryDZiCDYp9i22KfZgdmHINio2Ycg2KfZhtio2KfYsSI6IvCfjp/vuI8gR2VuZXJhdGUgJiBBZGQgTGljZW5zZSBLZXlzIHRvIEludmVudG9yeSIsIvCfk4sg2KfZhtio2KfYsSDZg9iv2YfYp9mKINmE2KfZitiz2YbYsyDZhdmI2KzZiNivICjZg9m+2Yog2YXYs9iq2YLZitmFINis2YfYqiDYp9ix2LPYp9mEINio2Ycg2YXYtNiq2LHZiikiOiLwn5OLIEFjdGl2ZSBMaWNlbnNlIEludmVudG9yeSAoQ2xpY2sgdG8gY29weSBmb3IgY2xpZW50cykiLCLZg9ivINmE2KfZitiz2YbYsyI6IkxpY2Vuc2UgS2V5Iiwi2YjYtti52YrYqiI6IlN0YXR1cyIsIti52YXZhNmK2KfYqiI6IkFjdGlvbnMiLCLYr9ix2K3Yp9mEINio2KfYsdqv2LDYp9ix2Yog2YPYr9mH2KcuLi4iOiJMb2FkaW5nIGxpY2Vuc2VzLi4uIiwi8J+RpSDZhdin2YbbjNiq2YjYsduM2YbaryDYstmG2K/ZhyDaqdin2LHYqNix2KfZhtiMINix2KjYp9iqINmH2KfbjCDaqdmF2qnbjCDZiCDYp9mF2YbbjNiqINuyRkEiOiLwn5GlIExpdmUgVXNlciBNb25pdG9yaW5nLCBIZWxwZXIgQm90cyAmIDJGQSBTZWN1cml0eSIsIvCfkaUg2YXYp9mG2YrYqtmI2LHZitmG2q8g2LLZhtiv2Ycg2YPYp9ix2KjYsdin2YbYjCDYsdio2KfYquKAjNmH2KfZiiDZg9mF2YPZiiDZiCDYp9mF2YbZitiqINuyRkEiOiLwn5GlIExpdmUgVXNlciBNb25pdG9yaW5nLCBIZWxwZXIgQm90cyAmIDJGQSBTZWN1cml0eSIsIvCflIQg2LHZgdix2LQg2LPYsdmK2LkiOiLwn5SEIFF1aWNrIFJlZnJlc2giLCLwn6SWINiv2KfYsdin2Yog2LHYqNin2Kog2YPZhdmD2YoiOiLwn6SWIEhhcyBIZWxwZXIgQm90Iiwi8J+UkCDYqtin2YrZitivINuyRkEg2YHYudin2YQiOiLwn5SQIDJGQSBFbmFibGVkIiwi8J+TsSDYs9mE2YEg2KjYp9iqINmB2LnYp9mEIjoi8J+TsSBTZWxmYm90IEFjdGl2ZSIsIvCfjJAg2YfZhdmHINmD2KfYsdio2LHYp9mGIjoi8J+MkCBBbGwgVXNlcnMiLCLwn6SWINiv2KfYsdin2Yog2LHYqNin2Kog2YPZhdmD2Yog2KfYrtiq2LXYp9i12YoiOiLwn6SWIEhhcyBEZWRpY2F0ZWQgQm90Iiwi4pqqINmB2KfZgtivINix2KjYp9iqINmD2YXZg9mKIjoi4pqqIE5vIEhlbHBlciBCb3QiLCLwn5STINiq2KfZitmK2K8g27JGQSDYrtin2YXZiNi0Ijoi8J+UkyAyRkEgRGlzYWJsZWQiLCLwn5+iINiz2YTZgSDYqNin2Kog2YXYqti12YQg2Ygg2YHYudin2YQiOiLwn5+iIFNlbGZib3QgQ29ubmVjdGVkICYgQWN0aXZlIiwi4o+477iPINmF2LnZhNmCINuM2Kcg2YXZhtmC2LbbjCDYtNiv2YciOiLij7jvuI8gU3VzcGVuZGVkIG9yIEV4cGlyZWQiLCLij7jvuI8g2YXYudmE2YIg2YrYpyDZhdmG2YLYttmK4oCM2LTYr9mHIjoi4o+477iPIFN1c3BlbmRlZCBvciBFeHBpcmVkIiwi8J+boe+4jyDZhdiv2YrYsdin2YYg2KfYsdi02K8g2LPZitiz2KrZhSI6IvCfm6HvuI8gU3lzdGVtIEFkbWluaXN0cmF0b3JzIiwi8J+boe+4jyDYp9ix2KrZgtinINio2Ycg2YXYr9mK2LEiOiLwn5uh77iPIFByb21vdGUgdG8gQWRtaW4iLCLwn5SEINio2LHZiNiy2LHYs9in2YbZiiI6IvCflIQgVXBkYXRlIiwi2YbYp9mFINmD2KfYsdio2LHZiiI6IlVzZXJuYW1lIiwi2K/Ys9iq2LHYs9mKIjoiUm9sZSIsItix2KjYp9iqINmD2YXZg9mKIjoiSGVscGVyIEJvdCIsItin2YXZhtmK2Kog27JGQSI6IjJGQSBTZWN1cml0eSIsItiv2LHYrdin2YQg2KjYp9ix2q/YsNin2LHZiiDZg9in2LHYqNix2KfZhi4uLiI6IkxvYWRpbmcgdXNlcnMuLi4iLCLihqnvuI8g2KjYp9iy2q/YtNiqINio2Ycg2K/Yp9i02KjZiNix2K8g2YPYp9ix2KjYsdmKIjoi4oap77iPIFJldHVybiB0byBVc2VyIERhc2hib2FyZCIsItiz2KfYrtiqINit2LPYp9ioICjZhtmK2KfYsiDYqNmHINmE2KfZitiz2YbYsykiOiJDcmVhdGUgQWNjb3VudCAoTGljZW5zZSBSZXF1aXJlZCkiLCLYq9io2Kog2YbYp9mFINio2Kcg2YTYp9uM2LPZhtizIjoiUmVnaXN0ZXIgd2l0aCBMaWNlbnNlIiwi2KvYqNiq4oCM2YbYp9mFINio2Kcg2YTYp9mK2LPZhtizIjoiUmVnaXN0ZXIgd2l0aCBMaWNlbnNlIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYp9iu2KrYtdin2LXZiiI6IkFjY291bnQgVXNlcm5hbWUiLCLwn46f77iPINqp2K8g2YTYp9uM2LPZhtizIC8g2LHYr9uM2YUg2qnYryDZgdi52KfZhCDYs9in2LLbjCI6IvCfjp/vuI8gTGljZW5zZSBLZXkgLyBBY3RpdmF0aW9uIENvZGUiLCLwn46f77iPINmD2K8g2YTYp9mK2LPZhtizIC8g2LHYr9mK2YXigIzZg9ivINmB2LnYp9mE4oCM2LPYp9iy2YoiOiLwn46f77iPIExpY2Vuc2UgS2V5IC8gQWN0aXZhdGlvbiBDb2RlIiwi2KfZhNiy2KfZhdmKINis2YfYqiDYs9in2K7YqiDYrdiz2KfYqCI6IlJlcXVpcmVkIGZvciBhY2NvdW50IHJlZ2lzdHJhdGlvbiIsIijYqNix2KfbjCDYq9io2Kog2YbYp9mFINin2YTYstin2YXbjCDYp9iz2KopIjoiKFJlcXVpcmVkIGZvciByZWdpc3RyYXRpb24pIiwiKNio2LHYp9mKINir2KjYquKAjNmG2KfZhSDYp9mE2LLYp9mF2Yog2KfYs9iqKSI6IihSZXF1aXJlZCBmb3IgcmVnaXN0cmF0aW9uKSIsIvCfkrMg2KfZitmGINmD2K8g2LHYpyDYp9iyINmB2LHZiNi02YbYr9mHINiv2LHZitin2YHYqiDZg9ix2K/ZhyDZiCDYr9ixINin2YrZhtis2Kcg2YjYp9ix2K8g2YPZhtmK2K8gKNio2LHYp9mKINmF2K/ZitixINin2YjZhCDYr9ixINiv2YrYqtin2KjZitizINiq2KfYstmH2Iwg2YbZitin2LLZiiDYqNmHINmE2KfZitiz2YbYsyDZhtmK2LPYqikuIjoiT2J0YWluIHRoaXMgbGljZW5zZSBrZXkgZnJvbSB0aGUgdmVuZG9yIChmaXJzdCBhZG1pbmlzdHJhdG9yIHJlcXVpcmVzIG5vIGxpY2Vuc2UpLiIsItqp2K8g2YTYp9uM2LPZhtizINiq2YjYs9i3INmF2K/bjNixINuM2Kcg2YHYsdmI2LTZhtiv2Ycg2KfYsdin2KbZhyDZhduMINi02YjYryAo2qnYp9ix2KjYsSDYp9mI2YQg2LPbjNiz2KrZhSDZhtuM2KfYstuMINio2Ycg2qnYryDZhtiv2KfYsdivKSI6IkxpY2Vuc2Uga2V5IHByb3ZpZGVkIGJ5IHZlbmRvciAoZmlyc3QgYWRtaW4gbmVlZHMgbm8gbGljZW5zZSkiLCLZg9ivINmE2KfZitiz2YbYsyDYqtmI2LPYtyDZhdiv2YrYsSDZitinINmB2LHZiNi02YbYr9mHINin2LHYp9im2Ycg2YXZiuKAjNi02YjYryAo2YPYp9ix2KjYsSDYp9mI2YQg2LPZitiz2KrZhSDZhtmK2KfYstmKINio2Ycg2YPYryDZhtiv2KfYsdivKSI6IkxpY2Vuc2Uga2V5IHByb3ZpZGVkIGJ5IHZlbmRvciAoZmlyc3QgYWRtaW4gbmVlZHMgbm8gbGljZW5zZSkiLCLZhtin2YUg2YPYp9ix2KjYsdmKINis2K/ZitivIjoiTmV3IFVzZXJuYW1lIiwi2LHZhdiyINi52KjZiNixINmC2YjZiiI6IlN0cm9uZyBQYXNzd29yZCIsItix2YXYsiDYudio2YjYsSDYp9mF2YYgKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiU2VjdXJlIFBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLYqtmD2LHYp9ixINix2YXYsiDYudio2YjYsSI6IkNvbmZpcm0gUGFzc3dvcmQiLCLYq9io2Kog2YbYp9mFINmIINmB2LnYp9mEINiz2KfYstuMINin2LTYqtix2KfaqSBBcml6byBTZWxmIjoiUmVnaXN0ZXIgJiBBY3RpdmF0ZSBBcml6byBTZWxmIFN1YnNjcmlwdGlvbiIsItir2KjYquKAjNmG2KfZhSDZiCDZgdi52KfZhOKAjNiz2KfYstmKINin2LTYqtix2KfZgyBBcml6byBTZWxmIjoiUmVnaXN0ZXIgJiBBY3RpdmF0ZSBBcml6byBTZWxmIFN1YnNjcmlwdGlvbiIsItir2KjYqiDZhtin2YUg2Ygg2YHYudin2YQg2LPYp9iy24wg2KfYtNiq2LHYp9qpIjoiUmVnaXN0ZXIgJiBBY3RpdmF0ZSBTdWJzY3JpcHRpb24iLCLYq9io2KrigIzZhtin2YUg2Ygg2YHYudin2YTigIzYs9in2LLZiiDYp9i02KrYsdin2YMiOiJSZWdpc3RlciAmIEFjdGl2YXRlIFN1YnNjcmlwdGlvbiIsItit2LPYp9ioINqp2KfYsdio2LHbjCDZiCDYs9mE2YEg2KjYp9iqINi02YXYpyDYr9ixINit2KfZhNiqINiq2LnZhNuM2YIg2YLYsdin2LEg2K/Yp9ix2K8gKFN1c3BlbmRlZCkiOiJZb3VyIEFjY291bnQgYW5kIFNlbGZib3QgQXJlIEN1cnJlbnRseSBTdXNwZW5kZWQiLCLYrdiz2KfYqCDZg9in2LHYqNix2Yog2Ygg2LPZhNmB4oCM2KjYp9iqINi02YXYpyDYr9ixINit2KfZhNiqINiq2LnZhNmK2YIg2YLYsdin2LEg2K/Yp9ix2K8gKFN1c3BlbmRlZCkiOiJZb3VyIEFjY291bnQgYW5kIFNlbGZib3QgQXJlIEN1cnJlbnRseSBTdXNwZW5kZWQiLCLYrdiz2KfYqCDZg9in2LHYqNix2Yog2LTZhdinINmF2LnZhNmCINi02K/ZhyDYp9iz2KoiOiJZb3VyIEFjY291bnQgSGFzIEJlZW4gU3VzcGVuZGVkIiwi2YXYr9iqINiy2YXYp9mGINin2LTYqtix2KfaqSDYtNmF2Kcg2KjZhyDZvtin24zYp9mGINix2LPbjNiv2Ycg2Ygg2LnZhdmE2qnYsdivINiz2YTZgSDYqNin2Kog2LHZiNuMINiq2YTar9ix2KfZhSDZhdiq2YjZgtmBINi02K/ZhyDYp9iz2KouINis2YfYqiDZgdi52KfZhCDYs9in2LLbjCDZhdis2K/YryDZiCDYrtix2YjYrCDYotmG24wg2KfYsiDYqti52YTbjNmC2Iwg2qnYryDZhNin24zYs9mG2LMg2KzYr9uM2K8g2K7ZiNivINix2Kcg2YjYp9ix2K8g2qnZhtuM2K86IjoiWW91ciBzdWJzY3JpcHRpb24gaGFzIGV4cGlyZWQgYW5kIFRlbGVncmFtIHNlbGZib3Qgb3BlcmF0aW9ucyBhcmUgcGF1c2VkLiBFbnRlciBhIHZhbGlkIHJlbmV3YWwga2V5IHRvIHJlYWN0aXZhdGU6Iiwi2YXYr9iqINiy2YXYp9mGINin2LTYqtix2KfZgyDYtNmF2Kcg2KjZhyDZvtin2YrYp9mGINix2LPZitiv2Ycg2Ygg2LnZhdmE2YPYsdivINiz2YTZgeKAjNio2KfYqiDYsdmI2Yog2KrZhNqv2LHYp9mFINmF2KrZiNmC2YEg2LTYr9mHINin2LPYqi4g2KzZh9iqINmB2LnYp9mE4oCM2LPYp9iy2Yog2YXYrNiv2K8g2Ygg2K7YsdmI2Kwg2KLZhtmKINin2LIg2KrYudmE2YrZgtiMINmD2K8g2YTYp9mK2LPZhtizINis2K/ZitivINiu2YjYryDYsdinINmI2KfYsdivINmD2YbZitivOiI6IllvdXIgc3Vic2NyaXB0aW9uIGhhcyBleHBpcmVkIGFuZCBUZWxlZ3JhbSBzZWxmYm90IG9wZXJhdGlvbnMgYXJlIHBhdXNlZC4gRW50ZXIgYSB2YWxpZCByZW5ld2FsIGtleSB0byByZWFjdGl2YXRlOiIsItiv2LPYqtix2LPbjCDYtNmF2Kcg2KjZhyDYs9mE2YEg2KjYp9iqINmF2YjZgtiq2KfZiyDZhdiz2K/ZiNivINi02K/ZhyDYp9iz2KouINis2YfYqiDZgdi52KfZhCDYs9in2LLbjCDZhdis2K/Yr9iMINmE2KfbjNiz2YbYsyDYqtmF2K/bjNivINmF2LnYqtio2LEg2YjYp9ix2K8g2qnZhtuM2K86IjoiQWNjZXNzIHRvIHlvdXIgc2VsZmJvdCBpcyB0ZW1wb3JhcmlseSByZXN0cmljdGVkLiBFbnRlciBhIHJlbmV3YWwgbGljZW5zZSBrZXkgdG8gcmVhY3RpdmF0ZToiLCLYr9iz2KrYsdiz2Yog2LTZhdinINio2Ycg2LPZhNmB4oCM2KjYp9iqINmF2YjZgtiq2KfZiyDZhdiz2K/ZiNivINi02K/ZhyDYp9iz2KouINis2YfYqiDZgdi52KfZhOKAjNiz2KfYstmKINmF2KzYr9iv2Iwg2YTYp9mK2LPZhtizINiq2YXYr9mK2K8g2YXYudiq2KjYsSDZiNin2LHYryDZg9mG2YrYrzoiOiJBY2Nlc3MgdG8geW91ciBzZWxmYm90IGlzIHRlbXBvcmFyaWx5IHJlc3RyaWN0ZWQuIEVudGVyIGEgcmVuZXdhbCBsaWNlbnNlIGtleSB0byByZWFjdGl2YXRlOiIsIvCfmoAg2K7YsdmI2Kwg2KfYsiDYqti52YTZitmCINmIINi02KfYsdqYIjoi8J+agCBSZWFjdGl2YXRlICYgUmVuZXcgU3Vic2NyaXB0aW9uIiwi2KvYqNiqINmE2KfZitiz2YbYsyDZiCDYsdmB2Lkg2KrYudmE2YrZgiI6IkFwcGx5IExpY2Vuc2UgJiBSZWFjdGl2YXRlIiwi2LTYqNuM2Ycg2LPYp9iyINiy2YbYr9mHINm+2LHZiNmB2KfbjNmEINiq2YTar9ix2KfZhSAoTGl2ZSBUZWxlZ3JhbSBNb2NrdXApIjoiTGl2ZSBUZWxlZ3JhbSBQcm9maWxlIE1vY2t1cCIsIti02KjZitmH4oCM2LPYp9iyINiy2YbYr9mHINm+2LHZiNmB2KfZitmEINiq2YTar9ix2KfZhSAoTGl2ZSBUZWxlZ3JhbSBNb2NrdXApIjoiTGl2ZSBUZWxlZ3JhbSBQcm9maWxlIE1vY2t1cCIsItm+24zYtCDZhtmF2KfbjNi0INiy2YbYr9mHINiv2LEg2KrZhNqv2LHYp9mFIjoiTGl2ZSBUZWxlZ3JhbSBQcmV2aWV3Iiwi2b7Ziti04oCM2YbZhdin2YrYtCDYstmG2K/ZhyDYr9ixINiq2YTar9ix2KfZhSI6IkxpdmUgVGVsZWdyYW0gUHJldmlldyIsItm+24zYtCDZhtmF2KfbjNi0INmE2K3YuNmHINin24wiOiJMaXZlIFByZXZpZXciLCLZvtmK2LTigIzZhtmF2KfZiti0INmE2K3YuNmH4oCM2KfZiiI6IkxpdmUgUHJldmlldyIsItiz2YrZhtmDINiy2YbYr9mHIjoiTGl2ZSBTeW5jIiwi2YPYp9ix2KjYsSBBcml6byI6IkFyaXpvIFVzZXIiLCLZg9in2LHYqNixINiq2YTar9ix2KfZhSI6IlRlbGVncmFtIFVzZXIiLCLYotmG2YTYp9uM2YYgKNmE2K3YuNmHINin24wg2KjZhyDZiNmC2Kog2KrZh9ix2KfZhikiOiJPbmxpbmUgKFRlaHJhbiBBdG9taWMgVGltZSkiLCLYotmG2YTYp9mK2YYgKNmE2K3YuNmH4oCM2KfZiiDYqNmHINmI2YLYqiDYqtmH2LHYp9mGKSI6Ik9ubGluZSAoVGVocmFuIEF0b21pYyBUaW1lKSIsItii2YbZhNin2YrZhiI6Im9ubGluZSIsItio2YrZiNqv2LHYp9mB2Yog2LLZhtiv2Ycg2KrZhNqv2LHYp9mFIChCaW8gLyBBYm91dCkiOiJMaXZlIFRlbGVncmFtIEJpbyAoQWJvdXQpIiwi2KjZitmI2q/Ysdin2YHZiiDYstmG2K/ZhyI6IkxpdmUgQmlvIiwi2K/YsSDYp9mG2KrYuNin2LEg2YHYudin2YQg2LPYp9iy24wg2KjbjNmI2q/Ysdin2YHbjCDZh9mI2LTZhdmG2K8uLi4iOiJBd2FpdGluZyBMaXZlIEJpbyBhY3RpdmF0aW9uLi4uIiwi2K/YsSDYp9mG2KrYuNin2LEg2YHYudin2YTigIzYs9in2LLZiiDYqNmK2Yjar9ix2KfZgdmKINmH2YjYtNmF2YbYry4uLiI6IkF3YWl0aW5nIExpdmUgQmlvIGFjdGl2YXRpb24uLi4iLCLYr9ixINit2KfZhCDYr9ix2YrYp9mB2Kog2YjYtti52YrYqiDYqNmK2YguLi4iOiJTeW5jaW5nIGJpbyBzdGF0dXMuLi4iLCLYqtmC2YjZitmFINiu2YjYsdi02YrYr9mKINmIINiy2YXYp9mGINin2KrZhdmKINiq2YfYsdin2YYiOiJDYWxlbmRhciAmIEF0b21pYyBUZWhyYW4gQ2xvY2siLCLYqtmC2YjZitmFINis2KfYsdmKOiI6IkN1cnJlbnQgQ2FsZW5kYXI6Iiwi2K/Ysdit2KfZhCDZhdit2KfYs9io2Ycg2KrZgtmI2YrZhSDYrtmI2LHYtNmK2K/Zii4uLiI6IkNhbGN1bGF0aW5nIGNhbGVuZGFyLi4uIiwi2YfZhdqv2KfZhSDYs9in2LLbjCDZhNit2LjZhyDYp9uMINiq2YfYsdin2YYiOiJUZWhyYW4gUmVhbC1UaW1lIFN5bmMiLCLZh9mF2q/Yp9mF4oCM2LPYp9iy2Yog2YTYrdi42YfigIzYp9mKINiq2YfYsdin2YYiOiJUZWhyYW4gUmVhbC1UaW1lIFN5bmMiLCLimqEg2YXZiNiq2YjYsSDZhtmI2LPYp9mGINiz2KfYsiDYp9io2LHbjCDZiCDaqdix2YjZhiDYrNin2Kgg2YHYudin2YQiOiLimqEgRWRnZSBFbmdpbmUgJiBBdG9taWMgQ3JvbiBBY3RpdmUiLCLimqEg2YXZiNiq2YjYsSDZhtmI2LPYp9mG4oCM2LPYp9iyINin2KjYsdmKINmIINmD2LHZiNmG4oCM2KzYp9ioINmB2LnYp9mEIjoi4pqhIEVkZ2UgRW5naW5lICYgQXRvbWljIENyb24gQWN0aXZlIiwi2KfYtNiq2LHYp9mDOiDYp9iz2KrYp9mG2K/Yp9ix2K8iOiJTdWJzY3JpcHRpb246IFN0YW5kYXJkIiwi2YHZiNmG2Ko6INio2YjZhNivINmE2YjZg9izIjoiRm9udDogTHV4dXJ5IEJvbGQiLCLYp9iq2LXYp9mEINiz2LTZhiDYp9mD2KfZhtiqINiq2YTar9ix2KfZhSI6IkNvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCBTZXNzaW9uIiwi2KfZitiy2YjZhNmHINiv2LEgQ2xvdWRmbGFyZSBLViI6Iklzb2xhdGVkIGluIENsb3VkZmxhcmUgS1YiLCLYsdmF2LLZhtqv2KfYsdmKINmG2LjYp9mF2YogS1YiOiJNaWxpdGFyeSBHcmFkZSBLViBFbmNyeXB0aW9uIiwi2KfYsdiz2KfZhCDZg9ivINm+2YrYp9mF2YPZiiI6IlNNUyAvIFRlbGVncmFtIENvZGUiLCLZiNix2YjYryDZhdiz2KrZgtmK2YUg2KjYpyDYtNmF2KfYsdmHINiq2YTZgdmGIjoiRGlyZWN0IFBob25lIExvZ2luIiwi2LHYtNiq2YcgU3RyaW5nU2Vzc2lvbiDZhdiz2KrZgtmK2YUiOiJEaXJlY3QgU3RyaW5nU2Vzc2lvbiIsItmI2LHZiNivINio2KcgU3RyaW5nU2Vzc2lvbiDZvtuM2LQg2LPYp9iu2KrZhyI6IlN0cmluZ1Nlc3Npb24gTG9naW4iLCLZiNix2YjYryDYqNinIFN0cmluZ1Nlc3Npb24g2b7Ziti04oCM2LPYp9iu2KrZhyI6IlN0cmluZ1Nlc3Npb24gTG9naW4iLCLYtNmF2KfYsdmHINiq2YTZgdmGINin2YPYp9mG2Kog2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gQWNjb3VudCBQaG9uZSBOdW1iZXIiLCLYtNmF2KfYsdmHINiq2YTZgdmGINio2Kcg2b7bjNi0INi02YXYp9ix2Ycg2KjbjNmGINin2YTZhdmE2YTbjCI6IlBob25lIE51bWJlciAoSW50ZXJuYXRpb25hbCBmb3JtYXQpIiwi2LTZhdin2LHZhyDYqtmE2YHZhiDYqNinINm+2YrYtOKAjNi02YXYp9ix2Ycg2KjZitmG4oCM2KfZhNmF2YTZhNmKIjoiUGhvbmUgTnVtYmVyIChJbnRlcm5hdGlvbmFsIGZvcm1hdCkiLCLZg9ivINu1INix2YLZhdmKINin2LHYs9in2YTZiiDYp9iyINiz2YjZiiDYqtmE2q/Ysdin2YUiOiI1LURpZ2l0IFRlbGVncmFtIFZlcmlmaWNhdGlvbiBDb2RlIiwi2YPYryDYqtin2YrZitivINm+2YrYp9mF2YMv2KrZhNqv2LHYp9mFIjoiVmVyaWZpY2F0aW9uIENvZGUgKFRlbGVncmFtL1NNUykiLCLYsdmF2LIg2KrYo9uM24zYryDYr9mIINmF2LHYrdmE2Ycg2KfbjCDYp9qp2KfZhtiqICgyRkEpIjoiQWNjb3VudCBUd28tU3RlcCBWZXJpZmljYXRpb24gKDJGQSkiLCLYsdmF2LIg2KrYo9mK2YrYryDYr9mIINmF2LHYrdmE2YfigIzYp9mKINin2YPYp9mG2KogKDJGQSkiOiJBY2NvdW50IFR3by1TdGVwIFZlcmlmaWNhdGlvbiAoMkZBKSIsItix2YXYsiDYudio2YjYsSDYr9mI2YXYsdit2YTZhyDYp9uMINiq2YTar9ix2KfZhSAo27JGQSkiOiJUd28tU3RlcCBWZXJpZmljYXRpb24gKDJGQSkgUGFzc3dvcmQiLCLYsdmF2LIg2LnYqNmI2LEg2K/ZiNmF2LHYrdmE2YfigIzYp9mKINiq2YTar9ix2KfZhSAo27JGQSkiOiJUd28tU3RlcCBWZXJpZmljYXRpb24gKDJGQSkgUGFzc3dvcmQiLCLYr9ix2YrYp9mB2Kog2YPYryDZiNix2YjYryDYp9iyINiz2LHZiNixINiq2YTar9ix2KfZhSI6IlJlcXVlc3QgVGVsZWdyYW0gTG9naW4gQ29kZSIsItiv2LHYrtmI2KfYs9iqINmIINin2LHYs9in2YQg2YPYryDZiNix2YjYryDYqtmE2q/Ysdin2YUiOiJSZXF1ZXN0IFRlbGVncmFtIExvZ2luIENvZGUiLCLYsdi02KrZhyDZhdiq2YbZiiDYs9i02YYg2KrZhNqv2LHYp9mFIChUZWxldGhvbiAvIEdyYW1KUyAvIFB5cm9ncmFtKSI6IlRlbGVncmFtIFN0cmluZ1Nlc3Npb24gKFRlbGV0aG9uIC8gR3JhbUpTIC8gUHlyb2dyYW0pIiwi2KfYqti12KfZhCDZiCDYsdmF2LLZhtqv2KfYsdmKINmB2YjYsdmKINio2KcgQUVTLTI1NiI6IkNvbm5lY3QgJiBFbmNyeXB0IHdpdGggQUVTLTI1NiIsItiw2K7Zitix2Ycg2Ygg2KfYudiq2KjYp9ix2LPZhtis2Yog2LPYtNmGIjoiVmFsaWRhdGUgJiBTYXZlIFNlc3Npb24iLCLYp9iz2KrZiNiv24zZiNuMINi02K7YtduMINiz2KfYstuMINmIINin2YXaqdin2YbYp9iqINm+24zYtNix2YHYqtmHIjoiQ3VzdG9taXphdGlvbiBTdHVkaW8gJiBBZHZhbmNlZCBGZWF0dXJlcyIsItin2LPYqtmI2K/ZitmI2Yog2LTYrti12YrigIzYs9in2LLZiiDZiCDYp9mF2YPYp9mG2KfYqiDZvtmK2LTYsdmB2KrZhyI6IkN1c3RvbWl6YXRpb24gU3R1ZGlvICYgQWR2YW5jZWQgRmVhdHVyZXMiLCLYp9iz2KrZiNiv24zZiNuMINis2KfZhdi5INi02K7YtduMINiz2KfYstuMIjoiQ29tcHJlaGVuc2l2ZSBTdHVkaW8iLCLYp9iz2KrZiNiv2YrZiNmKINis2KfZhdi5INi02K7YtdmK4oCM2LPYp9iy2YoiOiJDb21wcmVoZW5zaXZlIFN0dWRpbyIsIuKaoO+4jyDZiNi22LnZitiqINin2LHYqtio2KfYtyDYqNinINiq2YTar9ix2KfZhToiOiLimqDvuI8gVGVsZWdyYW0gQ29ubmVjdGlvbiBTdGF0dXM6Iiwi8J+UhCDYp9iq2LXYp9mEINmF2KzYr9ivINin2YPYp9mG2Kog2KrZhNqv2LHYp9mFIjoi8J+UhCBSZWNvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCIsItiz2KfYudiqINmIINin2LPYqtin2YrZhCI6IkNsb2NrICYgU3R5bGUiLCLZhdmG2LTZiiDYrtmI2K/Zg9in2LEiOiJBdXRvLVNlY3JldGFyeSIsItmB2YrZhNiq2LEg2LPZg9mI2KoiOiJTaWxlbmNlIEZpbHRlciIsItin2YXZhtmK2Kog2Ygg27JGQSI6IlNlY3VyaXR5ICYgMkZBIiwi2KfZhtiq2K7Yp9ioINmD2KfYsdin2YPYqtixINis2K/Yp9mD2YbZhtiv2Ycg2LPYp9i52Kog2Ygg2K/ZgtmK2YLZhyI6IkNob29zZSBIb3VyICYgTWludXRlIENvbG9uIFNlcGFyYXRvciIsItm+2YrYtNmI2YbYryDYs9in2LnYqiAo2YLYqNmEINin2LIg2LPYp9i52KopIjoiQ2xvY2sgUHJlZml4IChCZWZvcmUgZGlnaXRzKSIsItit2KfZhNiqINux27Ig2LPYp9i52KrZhyAoQU0gLyBQTSDZhNmI2YPYsykiOiIxMi1Ib3VyIEZvcm1hdCAoRGVsdXhlIEFNL1BNKSIsItmG2YXYp9uM2LQg2LPYp9i52Kog2KjZhyDYtdmI2LHYqiDbsduyINiz2KfYudiq2Ycg2YfZhdix2KfZhyDYqNinINmG2LTYp9mG2q/YsSDZgdin2YbYqtiy24wg4bSs4bS5IC8g4bS+4bS5IjoiRGlzcGxheSBpbiAxMi1ob3VyIGZvcm1hdCB3aXRoIGRlbHV4ZSDhtKzhtLkgLyDhtL7htLkgaW5kaWNhdG9yIiwi2YbZhdin2YrYtCDYs9in2LnYqiDYqNmH4oCM2LXZiNix2Kog27HbsiDYs9in2LnYqtmHINmH2YXYsdin2Ycg2KjYpyDZhti02KfZhtqv2LEg2YHYp9mG2KrYstmKIOG0rOG0uSAvIOG0vuG0uSI6IkRpc3BsYXkgaW4gMTItaG91ciBmb3JtYXQgd2l0aCBkZWx1eGUg4bSs4bS5IC8g4bS+4bS5IGluZGljYXRvciIsItin2LHZgtin2YUg2K/ZhNiu2YjYp9mHINiv2LPYqtmKICjbsduwINmD2KfYsdin2YPYqtixINuwINiq2Kcg27kpIjoiQ3VzdG9tIERpZ2l0cyAoMTAgY2hhcmFjdGVycyAwIHRvIDkpIiwi2KzYr9in2YPZhtmG2K/ZhyI6IlNlcGFyYXRvciIsItmB2LnYp9mEINiz2KfYstuMINio24zZiNqv2LHYp9mB24wg2LLZhtiv2Ycg2Ygg2YfZiNi02YXZhtivIChMaXZlIEJpbykiOiJFbmFibGUgRHluYW1pYyBMaXZlIEJpbyIsItmB2LnYp9mE4oCM2LPYp9iy2Yog2KjZitmI2q/Ysdin2YHZiiDYstmG2K/ZhyDZiCDZh9mI2LTZhdmG2K8gKExpdmUgQmlvKSI6IkVuYWJsZSBEeW5hbWljIExpdmUgQmlvIiwi2KjZhyDYsdmI2LLYsdiz2KfZhtuMINiu2YjYr9qp2KfYsSDYqNuM2Ygg2KrZhNqv2LHYp9mFINio2Kcg2LPYp9i52KrYjCDYqtmC2YjbjNmFINmIINmF2KrZiNmGINm+2YjbjNinIjoiQXV0by11cGRhdGUgVGVsZWdyYW0gYmlvIHdpdGggdGltZSwgY2FsZW5kYXIgYW5kIHZhcmlhYmxlcyIsItio2YfigIzYsdmI2LLYsdiz2KfZhtmKINiu2YjYr9mD2KfYsSDYqNmK2Ygg2KrZhNqv2LHYp9mFINio2Kcg2LPYp9i52KrYjCDYqtmC2YjZitmFINmIINmF2KrZiNmGINm+2YjZitinIjoiQXV0by11cGRhdGUgVGVsZWdyYW0gYmlvIHdpdGggdGltZSwgY2FsZW5kYXIgYW5kIHZhcmlhYmxlcyIsItmC2KfZhNioINmF2KrZhiDYqNmK2Yjar9ix2KfZgdmKINiq2YTar9ix2KfZhSAo2K3Yr9in2YPYq9ixINu327Ag2YPYp9ix2KfZg9iq2LEpIjoiVGVsZWdyYW0gQmlvIFRlbXBsYXRlIChNYXggNzAgY2hhcnMpIiwi2KfZgdiy2YjYr9mGINmF2KrYutmK2LEg2KjYpyDZg9mE2YrZgzoiOiJDbGljayB0byBhZGQgdmFyaWFibGU6Iiwi8J+Xk++4jyB7ZGF0ZX0gKNiq2KfYsdmK2K4pIjoi8J+Xk++4jyB7ZGF0ZX0gKERhdGUpIiwi8J+UiyB7YmF0dGVyeX0gKNio2KfYqtix2Yog2LLZhdin2YYpIjoi8J+UiyB7YmF0dGVyeX0gKFRpbWUgQmF0dGVyeSkiLCLimYgge3pvZGlhY30gKNio2LHYrCDZgdmE2YPZiikiOiLimYgge3pvZGlhY30gKFpvZGlhYykiLCLwn5KsIHtxdW90ZX0gKNis2YXZhNmHINin2Ybar9mK2LLYtNmKKSI6IvCfkqwge3F1b3RlfSAoUXVvdGUpIiwi8J+MkCB7ZW5fZGF5fSAo2LHZiNiyINin2Ybar9mE2YrYs9mKKSI6IvCfjJAge2VuX2RheX0gKEVuZ2xpc2ggRGF5KSIsIvCfkqEg2YLYp9mE2Kgg2YfYp9uMINmF2K3YqNmI2Kgg2Ygg2KLZhdin2K/ZhzoiOiLwn5KhIFBvcHVsYXIgUHJlLU1hZGUgVGVtcGxhdGVzOiIsIvCfkqEg2YLYp9mE2KjigIzZh9in2Yog2YXYrdio2YjYqCDZiCDYotmF2KfYr9mHOiI6IvCfkqEgUG9wdWxhciBQcmUtTWFkZSBUZW1wbGF0ZXM6Iiwi2YXZhti02Yog2K7ZiNiv2YPYp9ixINm+2YrZiNmKIChBRksgQXV0by1TZWNyZXRhcnkpIjoiQUZLIFByaXZhdGUgQXV0by1TZWNyZXRhcnkiLCLZh9mG2q/Yp9mF24wg2qnZhyDYotmG2YTYp9uM2YYg2YbbjNiz2KrbjNiv2Iwg2b7bjNin2YUg2YfYp9uMINiu2LXZiNi124wg2KjZhyDYt9mI2LEg2YfZiNi02YXZhtivINmIINiu2YjYr9qp2KfYsSDZvtin2LPYriDYr9in2K/ZhyDZhduMINi02YjZhtivIjoiV2hlbiB5b3UgYXJlIGF3YXksIHByaXZhdGUgbWVzc2FnZXMgYXJlIGFuc3dlcmVkIGludGVsbGlnZW50bHkiLCLZh9mG2q/Yp9mF2Yog2YPZhyDYotmG2YTYp9mK2YYg2YbZitiz2KrZitiv2Iwg2b7Zitin2YXigIzZh9in2Yog2K7YtdmI2LXZiiDYqNmHINi32YjYsSDZh9mI2LTZhdmG2K8g2Ygg2K7ZiNiv2YPYp9ixINm+2KfYs9iuINiv2KfYr9mHINmF2YrigIzYtNmI2YbYryI6IldoZW4geW91IGFyZSBhd2F5LCBwcml2YXRlIG1lc3NhZ2VzIGFyZSBhbnN3ZXJlZCBpbnRlbGxpZ2VudGx5Iiwi2YXYqtmGINm+2KfYs9iuINiu2YjYr9mD2KfYsSDZhdmG2LTZiiDYqNmHINmF2K7Yp9i32KjYp9mGINiv2LEg2b7ZitmI2YoiOiJBdXRvLVNlY3JldGFyeSBSZXBseSBNZXNzYWdlIiwi2YHYp9i12YTZhyDYstmF2KfZhtuMINin2LHYs9in2YQg2YXYrNiv2K8g2KjYsdin24wg24zaqSDZhdiu2KfYt9ioICjaqdmI2YQg2K/Yp9mI2YYg2LbYryDYp9iz2b7ZhSkiOiJDb29sZG93biBJbnRlcnZhbCBwZXIgQ29udGFjdCIsItmB2KfYtdmE2Ycg2LLZhdin2YbZiiDYp9ix2LPYp9mEINmF2KzYr9ivINio2LHYp9mKINmK2YMg2YXYrtin2LfYqCAo2YPZiNmE4oCM2K/Yp9mI2YYg2LbYryDYp9iz2b7ZhSkiOiJDb29sZG93biBJbnRlcnZhbCBwZXIgQ29udGFjdCIsItmH2LEg27Ug2K/ZgtuM2YLZhyDbjNqpINio2KfYsSDYqNmHINmH2LEg2YHYsdivIjoiRXZlcnkgNSBtaW51dGVzIHBlciBjb250YWN0Iiwi2YfYsSDbtSDYr9mC2YrZgtmHINmK2YPigIzYqNin2LEg2KjZhyDZh9ixINmB2LHYryI6IkV2ZXJ5IDUgbWludXRlcyBwZXIgY29udGFjdCIsItmH2LEg27HbsCDYr9mC24zZgtmHINuM2qkg2KjYp9ixINio2Ycg2YfYsSDZgdix2K8gKNm+24zYtNmG2YfYp9iv24wpIjoiRXZlcnkgMTAgbWludXRlcyBwZXIgY29udGFjdCAoUmVjb21tZW5kZWQpIiwi2YfYsSDbsduwINiv2YLZitmC2Ycg2YrZg+KAjNio2KfYsSDYqNmHINmH2LEg2YHYsdivICjZvtmK2LTZhtmH2KfYr9mKKSI6IkV2ZXJ5IDEwIG1pbnV0ZXMgcGVyIGNvbnRhY3QgKFJlY29tbWVuZGVkKSIsItmH2LEg27PbsCDYr9mC24zZgtmHINuM2qkg2KjYp9ixINio2Ycg2YfYsSDZgdix2K8iOiJFdmVyeSAzMCBtaW51dGVzIHBlciBjb250YWN0Iiwi2YfYsSDbs9uwINiv2YLZitmC2Ycg2YrZg+KAjNio2KfYsSDYqNmHINmH2LEg2YHYsdivIjoiRXZlcnkgMzAgbWludXRlcyBwZXIgY29udGFjdCIsItmH2LEg27Eg2LPYp9i52Kog24zaqSDYqNin2LEg2KjZhyDZh9ixINmB2LHYryI6IkV2ZXJ5IDEgaG91ciBwZXIgY29udGFjdCIsItmH2LEg27Eg2LPYp9i52Kog2YrZg+KAjNio2KfYsSDYqNmHINmH2LEg2YHYsdivIjoiRXZlcnkgMSBob3VyIHBlciBjb250YWN0Iiwi2YHZgti3INuM2qkg2KjYp9ixINiv2LEg2LfZiNmEINi02KjYp9mG2Ycg2LHZiNiyINio2Ycg2YfYsSDZgdix2K8iOiJPbmNlIHBlciAyNCBob3VycyBwZXIgY29udGFjdCIsItmB2YLYtyDZitmD4oCM2KjYp9ixINiv2LEg2LfZiNmEINi02KjYp9mG2YfigIzYsdmI2LIg2KjZhyDZh9ixINmB2LHYryI6Ik9uY2UgcGVyIDI0IGhvdXJzIHBlciBjb250YWN0Iiwi8J+SoSDYp9uM2YYg2YLYp9io2YTbjNiqINmF2KfZhti5INin2LIg2KfYs9m+2YUg2LTYr9mGINqG2Kog2YfZhtqv2KfZhduMINqp2Ycg2YXYrtin2LfYqCDahtmG2K/bjNmGINm+24zYp9mFINmF2KrZiNin2YTbjCDZhduMINmB2LHYs9iq2K8g2YXbjCDYtNmI2K8uIjoi8J+SoSBUaGlzIHByZXZlbnRzIGNoYXQgc3BhbSB3aGVuIGEgY29udGFjdCBzZW5kcyBtdWx0aXBsZSBjb25zZWN1dGl2ZSBtZXNzYWdlcy4iLCLwn5KhINin2YrZhiDZgtin2KjZhNmK2Kog2YXYp9mG2Lkg2KfYsiDYp9iz2b7ZhSDYtNiv2YYg2obYqiDZh9mG2q/Yp9mF2Yog2YPZhyDZhdiu2KfYt9ioINqG2YbYr9mK2YYg2b7Zitin2YUg2YXYqtmI2KfZhNmKINmF2YrigIzZgdix2LPYqtivINmF2YrigIzYtNmI2K8uIjoi8J+SoSBUaGlzIHByZXZlbnRzIGNoYXQgc3BhbSB3aGVuIGEgY29udGFjdCBzZW5kcyBtdWx0aXBsZSBjb25zZWN1dGl2ZSBtZXNzYWdlcy4iLCLYs9qp2YjYqiDZiCDYrdiw2YEg2KLZhtuMINm+24zYp9mFINmH2KfbjCDYp9mB2LHYp9ivINmF2LLYp9it2YUgKE11dGUgRmlsdGVyKSI6Ik11dGUgJiBJbnN0YW50IFB1cmdlIEZpbHRlciIsItiz2YPZiNiqINmIINit2LDZgSDYotmG2Yog2b7Zitin2YXigIzZh9in2Yog2KfZgdix2KfYryDZhdiy2KfYrdmFIChNdXRlIEZpbHRlcikiOiJNdXRlICYgSW5zdGFudCBQdXJnZSBGaWx0ZXIiLCLZvtuM2KfZhSDZh9in24wg2KfYsdiz2KfZhCDYtNiv2Ycg2KrZiNiz2Lcg2qnYp9ix2KjYsdin2YYg2YXYtNiu2LUg2LTYr9mHINio2YTYp9mB2KfYtdmE2Ycg2KjYsdin24wg2K/ZiCDYt9ix2YEg2b7Yp9qpINmF24wg2LTZiNmG2K8iOiJNZXNzYWdlcyBmcm9tIHNwZWNpZmllZCB1c2VycyBhcmUgaW1tZWRpYXRlbHkgZGVsZXRlZCBmb3IgYm90aCBzaWRlcyIsItm+2YrYp9mF4oCM2YfYp9mKINin2LHYs9in2YTigIzYtNiv2Ycg2KrZiNiz2Lcg2YPYp9ix2KjYsdin2YYg2YXYtNiu2LXigIzYtNiv2Ycg2KjZhNin2YHYp9i12YTZhyDYqNix2KfZiiDYr9mIINi32LHZgSDZvtin2YMg2YXZiuKAjNi02YjZhtivIjoiTWVzc2FnZXMgZnJvbSBzcGVjaWZpZWQgdXNlcnMgYXJlIGltbWVkaWF0ZWx5IGRlbGV0ZWQgZm9yIGJvdGggc2lkZXMiLCLZhNuM2LPYqiDYotuM2K/bjCDZh9in24wg2LnYr9iv24wg24zYpyDbjNmI2LLYsdmG24zZhSDZh9in24wg2KrZhNqv2LHYp9mFINis2YfYqiDYs9qp2YjYqiAo2KjYpyDaqdin2YXYpyDYrNiv2Kcg2qnZhtuM2K8pIjoiVGVsZWdyYW0gSURzIG9yIFVzZXJuYW1lcyB0byBNdXRlIChjb21tYSBzZXBhcmF0ZWQpIiwi2YTZitiz2Kog2KLZitiv2YrigIzZh9in2Yog2LnYr9iv2Yog2YrYpyDZitmI2LLYsdmG2YrZheKAjNmH2KfZiiDYqtmE2q/Ysdin2YUg2KzZh9iqINiz2YPZiNiqICjYqNinINmD2KfZhdinINis2K/YpyDZg9mG2YrYrykiOiJUZWxlZ3JhbSBJRHMgb3IgVXNlcm5hbWVzIHRvIE11dGUgKGNvbW1hIHNlcGFyYXRlZCkiLCLwn5KhINi02YXYpyDZh9mF2obZhtuM2YYg2K/YsSDZhdit24zYtyDYqtmE2q/Ysdin2YUg2YXbjCDYqtmI2KfZhtuM2K8g2KjYpyDYsduM2b7ZhNin24wg2LHZiNuMINm+24zYp9mFINmH2LEg2LTYrti1INmIINin2LHYs9in2YQiOiLwn5KhIEluIFRlbGVncmFtIHlvdSBjYW4gYWxzbyByZXBseSB0byBhIG1lc3NhZ2UgYW5kIHNlbmQiLCLwn5KhINi02YXYpyDZh9mF2obZhtmK2YYg2K/YsSDZhdit2YrYtyDYqtmE2q/Ysdin2YUg2YXZiuKAjNiq2YjYp9mG2YrYryDYqNinINix2YrZvtmE2KfZiiDYsdmI2Yog2b7Zitin2YUg2YfYsSDYtNiu2LUg2Ygg2KfYsdiz2KfZhCI6IvCfkqEgSW4gVGVsZWdyYW0geW91IGNhbiBhbHNvIHJlcGx5IHRvIGEgbWVzc2FnZSBhbmQgc2VuZCIsItin2Ygg2LHYpyDYp9i22KfZgdmHINmD2LHYr9mHINmIINio2KciOiJ0byBtdXRlIHRoZW0sIGFuZCB1c2UiLCLYp9iyINiz2YPZiNiqINiu2KfYsdisINmD2YbZitivLiI6InRvIHVubXV0ZS4iLCLYr9ixINiz2KfYudin2Kog2YXYtNiu2LUg2LTYr9mH2Iwg2KjZhyDYsdmI2LLYsdiz2KfZhtuMINmF2KrZiNmC2YEg2LTYr9mHINuM2Kcg2YXYqtmGINiu2YjYp9ioINmC2LHYp9ixINmF24wg2q/bjNix2K8iOiJEdXJpbmcgc3BlY2lmaWVkIGhvdXJzLCB1cGRhdGVzIHBhdXNlIG9yIHNsZWVwIHN0YXR1cyBpcyBkaXNwbGF5ZWQiLCLYr9ixINiz2KfYudin2Kog2YXYtNiu2LXigIzYtNiv2YfYjCDYqNmH4oCM2LHZiNiy2LHYs9in2YbZiiDZhdiq2YjZgtmBINi02K/ZhyDZitinINmF2KrZhiDYrtmI2KfYqCDZgtix2KfYsSDZhdmK4oCM2q/Zitix2K8iOiJEdXJpbmcgc3BlY2lmaWVkIGhvdXJzLCB1cGRhdGVzIHBhdXNlIG9yIHNsZWVwIHN0YXR1cyBpcyBkaXNwbGF5ZWQiLCLbsNuwOtuw27AgKNmG24zZhdmHINi02KgpIjoiMDA6MDAgKE1pZG5pZ2h0KSIsItuw27A627DbsCAo2YbZitmF2YfigIzYtNioKSI6IjAwOjAwIChNaWRuaWdodCkiLCLZvtin2YrYp9mGINiu2YjYp9ioICjYs9in2LnYqikiOiJTbGVlcCBXYWtldXAgSG91ciIsItmF2KrZhiDZhtin2YUg2K7Yp9mG2YjYp9iv2q/ZiiDYr9ixINi32YjZhCDYs9in2LnYp9iqINiu2YjYp9ioIjoiTGFzdCBOYW1lIFRleHQgRHVyaW5nIFNsZWVwIEhvdXJzIiwi2K3Yp9mE2Kog2LTYqNitIOKAlCDYrtmI2KfZhtiv2YYg2KjYr9mI2YYg2KrZitmDINii2KjZiiAoR2hvc3QgUmVhZCkiOiJHaG9zdCBNb2RlIOKAlCBTdGVhbHRoIFJlYWQiLCLZiNmC2KrbjCDYp9uM2YYg2YLYp9io2YTbjNiqINmB2LnYp9mEINio2KfYtNmH2Iwg2KrZhdin2YUg2b7bjNin2YUg2YfYp9uMINiu2LXZiNi124wg2KzYr9uM2K8g2KjZhyDYtdmI2LHYqiDYrtmI2K/aqdin2LEg2KjZhyI6IldoZW4gZW5hYmxlZCwgaW5jb21pbmcgcHJpdmF0ZSBtZXNzYWdlcyBhdXRvbWF0aWNhbGx5IGZvcndhcmQgdG8geW91ciIsItmI2YLYqtmKINin2YrZhiDZgtin2KjZhNmK2Kog2YHYudin2YQg2KjYp9i02YfYjCDYqtmF2KfZhSDZvtmK2KfZheKAjNmH2KfZiiDYrti12YjYtdmKINis2K/ZitivINio2Ycg2LXZiNix2Kog2K7ZiNiv2YPYp9ixINio2YciOiJXaGVuIGVuYWJsZWQsIGluY29taW5nIHByaXZhdGUgbWVzc2FnZXMgYXV0b21hdGljYWxseSBmb3J3YXJkIHRvIHlvdXIiLCLYsdio2KfYqiDYp9iu2KrYtdin2LXZiiI6ImRlZGljYXRlZCBib3QiLCLYtNmF2Kcg2YHZiNix2YjYp9ix2K8g2YXbjCDYtNmGINmIINmF24wg2KrZiNmG24zYryDYp9mI2YbYrNinINio2K7ZiNmG24zYr9i02YjZhiDYqNiv2YjZhiDYp9uM2YbaqdmHINiq24zaqSDYotio24wg2KjYrtmI2LHZhy4g2YjZgtiq24wg2KLZhdin2K/ZhyDYqNmI2K/bjNiv2Iwg2KjYpyDYr9iz2KrZiNixIjoid2hlcmUgeW91IGNhbiByZWFkIHRoZW0gd2l0aG91dCBibHVlIHRpY2tzLiBXaGVuIHJlYWR5LCB1c2UiLCLYtNmF2Kcg2YHZiNix2YjYp9ix2K8g2YXZiuKAjNi02YYg2Ygg2YXZiuKAjNiq2YjZhtmK2K8g2KfZiNmG2KzYpyDYqNiu2YjZhtmK2K/YtNmI2YYg2KjYr9mI2YYg2KfZitmG2YPZhyDYqtmK2YMg2KLYqNmKINio2K7ZiNix2YcuINmI2YLYqtmKINii2YXYp9iv2Ycg2KjZiNiv2YrYr9iMINio2Kcg2K/Ys9iq2YjYsSI6IndoZXJlIHlvdSBjYW4gcmVhZCB0aGVtIHdpdGhvdXQgYmx1ZSB0aWNrcy4gV2hlbiByZWFkeSwgdXNlIiwi2K/YsSDYqtmE2q/Ysdin2YUg2YXbjCDYqtmI2YbbjNivINiq24zaqSDYotio24wg2LHZiCDYr9iz2KrbjCDYqNiy2YbbjNivLiI6ImluIFRlbGVncmFtIHRvIG1hbnVhbGx5IHNlbmQgcmVhZCByZWNlaXB0cy4iLCLYr9ixINiq2YTar9ix2KfZhSDZhdmK4oCM2KrZiNmG2YrYryDYqtmK2YMg2KLYqNmKINix2Ygg2K/Ys9iq2Yog2KjYstmG2YrYry4iOiJpbiBUZWxlZ3JhbSB0byBtYW51YWxseSBzZW5kIHJlYWQgcmVjZWlwdHMuIiwi2YHYudin2YQg2LPYp9iy24wg2K3Yp9mE2Kog2LTYqNitIChHaG9zdCBNb2RlKSI6IkVuYWJsZSBHaG9zdCBNb2RlIiwi2YHYudin2YTigIzYs9in2LLZiiDYrdin2YTYqiDYtNio2K0gKEdob3N0IE1vZGUpIjoiRW5hYmxlIEdob3N0IE1vZGUiLCLZvtuM2KfZhSDZh9in24wg2K7YtdmI2LXbjCDYsdmIINio2K7ZiNmG24zYryDYqNiv2YjZhiDYqtuM2qkg2KLYqNuMIOKAlCDZgdmI2LHZiNin2LHYryDYrtmI2K/aqdin2LEg2KjZhyDYsdio2KfYqiI6IlJlYWQgcHJpdmF0ZSBtZXNzYWdlcyBzaWxlbnRseSB3aXRob3V0IGJsdWUgY2hlY2ttYXJrcyIsItm+2YrYp9mF4oCM2YfYp9mKINiu2LXZiNi12Yog2LHZiCDYqNiu2YjZhtmK2K8g2KjYr9mI2YYg2KrZitmDINii2KjZiiDigJQg2YHZiNix2YjYp9ix2K8g2K7ZiNiv2YPYp9ixINio2Ycg2LHYqNin2KoiOiJSZWFkIHByaXZhdGUgbWVzc2FnZXMgc2lsZW50bHkgd2l0aG91dCBibHVlIGNoZWNrbWFya3MiLCLYr9iz2KrZiNix2KfYqiDYs9ix2YrYuSDYqtmE2q/Ysdin2YXZijoiOiJUZWxlZ3JhbSBJbi1DaGF0IFNob3J0Y3V0czoiLCLigJQg2KrZitmDINii2KjZiiDYsdmIINio2LHYp9mKINqG2KrZiiDZg9mHINiq2YjYtCDZh9iz2KrZitivINio2LLZhtmK2K8iOiLigJQgTWFyayBjdXJyZW50IGNoYXQgYXMgcmVhZCIsIuKAlCDYqtuM2qkg2KLYqNuMINix2Ygg2KjYsdin24wg2YfZhdmHINqG2Kog2YfYpyDbjNqp2KzYpyDYqNiy2YbbjNivIjoi4oCUIE1hcmsgYWxsIHVucmVhZCBjaGF0cyBhcyByZWFkIiwi4oCUINiq2YrZgyDYotio2Yog2LHZiCDYqNix2KfZiiDZh9mF2Ycg2obYquKAjNmH2Kcg2YrZg9is2Kcg2KjYstmG2YrYryI6IuKAlCBNYXJrIGFsbCB1bnJlYWQgY2hhdHMgYXMgcmVhZCIsIuKAlCDZgdi52KfZhCDYs9in2LLbjCDYs9ix24zYuSDYrdin2YTYqiDYtNio2K0iOiLigJQgUXVpY2sgYWN0aXZhdGUgR2hvc3QgTW9kZSIsIuKAlCDZgdi52KfZhOKAjNiz2KfYstmKINiz2LHZiti5INit2KfZhNiqINi02KjYrSI6IuKAlCBRdWljayBhY3RpdmF0ZSBHaG9zdCBNb2RlIiwi4oCUINi62YrYsdmB2LnYp9mEINmD2LHYr9mGINit2KfZhNiqINi02KjYrSI6IuKAlCBRdWljayBkZWFjdGl2YXRlIEdob3N0IE1vZGUiLCLZhNmK2LPYqiDYp9iz2KrYq9mG2Kcg4oCUINin2YHYsdin2K/ZiiDZg9mHINmH2YXZiti02Ycg2KrZitmDINii2KjZiiDYqNiu2YjYsdmHICjYp9iu2KrZitin2LHZiikiOiJXaGl0ZWxpc3Qg4oCUIENvbnRhY3RzIHdobyBhbHdheXMgcmVjZWl2ZSByZWFkIHJlY2VpcHRzIChPcHRpb25hbCkiLCLwn5KhINio2LHYp9uMINin24zZhiDYp9mB2LHYp9iv2Iwg2KrbjNqpINii2KjbjCDYqNmHINi12YjYsdiqINi52KfYr9uMINqp2KfYsSDZhduMINqp2YbZhyDZiCDYrdin2YTYqiDYtNio2K0g2LHZiNuMINin2YjZhtinINin2LnZhdin2YQg2YbZhduMINi02YcuIjoi8J+SoSBGb3IgdGhlc2UgY29udGFjdHMsIHJlYWQgcmVjZWlwdHMgd29yayBub3JtYWxseSBhbmQgR2hvc3QgTW9kZSBpcyBieXBhc3NlZC4iLCLwn5KhINio2LHYp9mKINin2YrZhiDYp9mB2LHYp9iv2Iwg2KrZitmDINii2KjZiiDYqNmHINi12YjYsdiqINi52KfYr9mKINmD2KfYsSDZhdmK4oCM2YPZhtmHINmIINit2KfZhNiqINi02KjYrSDYsdmI2Yog2KfZiNmG2Kcg2KfYudmF2KfZhCDZhtmF2YrigIzYtNmHLiI6IvCfkqEgRm9yIHRoZXNlIGNvbnRhY3RzLCByZWFkIHJlY2VpcHRzIHdvcmsgbm9ybWFsbHkgYW5kIEdob3N0IE1vZGUgaXMgYnlwYXNzZWQuIiwi2YbZg9iq2Ycg2YXZh9mFOiI6IkltcG9ydGFudCBOb3RpY2U6Iiwi2K3Yp9mE2Kog2LTYqNitINmB2YLYtyDYstmF2KfZhtuMINqp2KfYsSDZhduMINqp2YbZhyDaqdmHINm+24zYp9mFINmH2Kcg2LHZiCDYp9iyINi32LHbjNmCIjoiR2hvc3QgTW9kZSBvbmx5IHN1cHByZXNzZXMgcmVhZCByZWNlaXB0cyB3aGVuIHJlYWRpbmcgdmlhIHRoZSIsItit2KfZhNiqINi02KjYrSDZgdmC2Lcg2LLZhdin2YbZiiDZg9in2LEg2YXZiuKAjNmD2YbZhyDZg9mHINm+2YrYp9mF4oCM2YfYpyDYsdmIINin2LIg2LfYsdmK2YIiOiJHaG9zdCBNb2RlIG9ubHkgc3VwcHJlc3NlcyByZWFkIHJlY2VpcHRzIHdoZW4gcmVhZGluZyB2aWEgdGhlIiwi2KjYrtmI2YbbjNivLiDYp9qv2LEg2obYqiDYsdmIINmF2LPYqtmC24zZhSDYqtmI24wg2KfZvtmE24zaqduM2LTZhiDYqtmE2q/Ysdin2YUg2KjYp9iyINqp2YbbjNiv2Iwg2KrbjNqpINii2KjbjCDYp9iyINi32LHZgSDYp9m+2YTbjNqp24zYtNmGINin2LHYs9in2YQg2YXbjCDYtNmHLiI6Ii4gSWYgeW91IG9wZW4gdGhlIGNoYXQgZGlyZWN0bHkgaW4gVGVsZWdyYW0gYXBwLCByZWFkIHJlY2VpcHRzIHdpbGwgYmUgc2VudC4iLCLYqNiu2YjZhtmK2K8uINin2q/YsSDahtiqINix2Ygg2YXYs9iq2YLZitmFINiq2YjZiiDYp9m+2YTZitmD2YrYtNmGINiq2YTar9ix2KfZhSDYqNin2LIg2YPZhtmK2K/YjCDYqtmK2YMg2KLYqNmKINin2LIg2LfYsdmBINin2b7ZhNmK2YPZiti02YYg2KfYsdiz2KfZhCDZhdmK4oCM2LTZhy4iOiIuIElmIHlvdSBvcGVuIHRoZSBjaGF0IGRpcmVjdGx5IGluIFRlbGVncmFtIGFwcCwgcmVhZCByZWNlaXB0cyB3aWxsIGJlIHNlbnQuIiwi2b7Yp9iz2K4g2YfZiNi02YXZhtivINmF2KjYqtmG2Yog2KjYsSDZh9mI2LQg2YXYtdmG2YjYudmKIChBSSBTbWFydCBSZXBseSkiOiJBSSBTbWFydCBSZXBseSBBc3Npc3RhbnQiLCLYqNmHINis2KfZiiDZitmDINm+2YrYp9mFINir2KfYqNiqIEFGS9iMINmH2YjYtCDZhdi12YbZiNi52YoiOiJJbnN0ZWFkIG9mIGEgc3RhdGljIEFGSyBub3RlLCBBSSByZXBsaWVzIGludGVsbGlnZW50bHkiLCLZhdiq2YbYp9iz2Kgg2KjYpyDZhdit2KrZiNin2Yog2b7Zitin2YUiOiJiYXNlZCBvbiBjb250ZXh0Iiwi2KjZhyDZhdiu2KfYt9io24zZhiDZvtin2LPYriDZhduMINiv2YfYry4g2YfYsSDaqdin2LHYqNixIEFQSSBLZXkg2K7ZiNiv2LQg2LHZiCDZiNin2LHYryDZhduMINqp2YbZhyDZiCDZh9iy24zZhtmHINin24wg2KjYsdin24wg2LPYsdmI2LEg2YbYr9in2LHZhy4iOiJ0byBpbmNvbWluZyBjaGF0cy4gRWFjaCB1c2VyIGJyaW5ncyB0aGVpciBvd24gQVBJIGtleSB3aXRoIHplcm8gaG9zdCBjb3N0LiIsItio2Ycg2YXYrtin2LfYqNmK2YYg2b7Yp9iz2K4g2YXZiuKAjNiv2YfYry4g2YfYsSDZg9in2LHYqNixIEFQSSBLZXkg2K7ZiNiv2LQg2LHZiCDZiNin2LHYryDZhdmK4oCM2YPZhtmHINmIINmH2LLZitmG2YfigIzYp9mKINio2LHYp9mKINiz2LHZiNixINmG2K/Yp9ix2YcuIjoidG8gaW5jb21pbmcgY2hhdHMuIEVhY2ggdXNlciBicmluZ3MgdGhlaXIgb3duIEFQSSBrZXkgd2l0aCB6ZXJvIGhvc3QgY29zdC4iLCLZgdi52KfZhCDYs9in2LLbjCDZvtin2LPYriDZh9mI2LTZhdmG2K8gQUkgKNis2KfbjNqv2LLbjNmGIEFGSyDYq9in2KjYqikiOiJFbmFibGUgQUkgU21hcnQgUmVwbHkgKFJlcGxhY2VzIHN0YXRpYyBBRkspIiwi2YHYudin2YTigIzYs9in2LLZiiDZvtin2LPYriDZh9mI2LTZhdmG2K8gQUkgKNis2KfZitqv2LLZitmGIEFGSyDYq9in2KjYqikiOiJFbmFibGUgQUkgU21hcnQgUmVwbHkgKFJlcGxhY2VzIHN0YXRpYyBBRkspIiwi2YjZgtiq24wg2YHYudin2YQg2KjYp9i02YfYjCBBSSDYqNmHINis2KfbjCDZvtuM2KfZhSDYq9in2KjYqiDZhdmG2LTbjNiMINmH2YjYtNmF2YbYr9in2YbZhyDZvtin2LPYriDZhduMINiv2YfYryI6IldoZW4gZW5hYmxlZCwgQUkgcmVwbGllcyBkeW5hbWljYWxseSBpbnN0ZWFkIG9mIGEgc3RhdGljIG1lc3NhZ2UiLCLZiNmC2KrZiiDZgdi52KfZhCDYqNin2LTZh9iMIEFJINio2Ycg2KzYp9mKINm+2YrYp9mFINir2KfYqNiqINmF2YbYtNmK2Iwg2YfZiNi02YXZhtiv2KfZhtmHINm+2KfYs9iuINmF2YrigIzYr9mH2K8iOiJXaGVuIGVuYWJsZWQsIEFJIHJlcGxpZXMgZHluYW1pY2FsbHkgaW5zdGVhZCBvZiBhIHN0YXRpYyBtZXNzYWdlIiwi2b7Yp9mK2LQg2YfZiNi02YXZhtivINmI2LbYudmK2Kog2KLZhtmE2KfZitmGOiI6IlNtYXJ0IE9ubGluZSBQcmVzZW5jZSBNb25pdG9yOiIsItmH2YjYtCDZhdi12YbZiNi52Yog2KrZhtmH2Kcg2K/YsSDYstmF2KfZhiI6IkFJIHJlcGxpZXMgZXhjbHVzaXZlbHkgd2hlbiB5b3UgYXJlIiwi2KLZgdmE2KfZitmGINio2YjYr9mGIjoib2ZmbGluZSIsItio2Ycg2b7bjNmI24wg2YfYpyDZvtin2LPYriDZhduMINiv2YfYry4g2KjZhyDZhdit2LYg2KfbjNmG2qnZhyDYotmG2YTYp9uM2YYg2LTZiNuM2K/YjCDZvtuM2KfZhduMINio2K7ZiNin2YbbjNivINuM2Kcg2K/YsSDYrdin2YQg2obYqiDYqNinINmF2K7Yp9i32KjYp9mGINio2KfYtNuM2K/YjCDZhdmG2LTbjCDYrtmI2K/aqdin2LEg2YHZiNix2KfZiyDZhdiq2YjZgtmBINmF24wg2LTZiNivLiI6Ii4gVGhlIG1vbWVudCB5b3UgY29tZSBvbmxpbmUgb3IgcmVhZCBhIG1lc3NhZ2UsIEFJIGF1dG8tcmVwbGllcyBpbW1lZGlhdGVseSBwYXVzZS4iLCLYqNmHINm+2YrZiNmK4oCM2YfYpyDZvtin2LPYriDZhdmK4oCM2K/Zh9ivLiDYqNmHINmF2K3YtiDYp9mK2YbZg9mHINii2YbZhNin2YrZhiDYtNmI2YrYr9iMINm+2YrYp9mF2Yog2KjYrtmI2KfZhtmK2K8g2YrYpyDYr9ixINit2KfZhCDahtiqINio2Kcg2YXYrtin2LfYqNin2YYg2KjYp9i02YrYr9iMINmF2YbYtNmKINiu2YjYr9mD2KfYsSDZgdmI2LHYp9mLINmF2KrZiNmC2YEg2YXZiuKAjNi02YjYry4iOiIuIFRoZSBtb21lbnQgeW91IGNvbWUgb25saW5lIG9yIHJlYWQgYSBtZXNzYWdlLCBBSSBhdXRvLXJlcGxpZXMgaW1tZWRpYXRlbHkgcGF1c2UuIiwi2LPYsdmI24zYsyDYr9mH2YbYr9mHINmH2YjYtCDZhdi12YbZiNi524wgKEFJIFByb3ZpZGVyKSI6IkFJIFByb3ZpZGVyIiwi2LPYsdmI2YrYs+KAjNiv2YfZhtiv2Ycg2YfZiNi0INmF2LXZhtmI2LnZiiAoQUkgUHJvdmlkZXIpIjoiQUkgUHJvdmlkZXIiLCJHb29nbGUgR2VtaW5pICjYsdin2Yrar9in2YYg4oCUINm+2YrYtNmG2YfYp9iv2YopIjoiR29vZ2xlIEdlbWluaSAoRnJlZSDigJQgUmVjb21tZW5kZWQpIiwiQ3VzdG9tIEFQSSAo2LPYsdmI2YrYsyDYs9mB2KfYsdi02YopIjoiQ3VzdG9tIE9wZW5BSS1jb21wYXRpYmxlIEFQSSIsItmD2YTZitivIEFQSSDZh9mI2LQg2YXYtdmG2YjYudmKIChBUEkgS2V5KSI6IkFJIEFQSSBLZXkiLCLYrdiw2YEg2YPYp9mF2YQg2YPZhNmK2K8gQVBJICjYsdmB2Lkg2KrYr9in2K7ZhCkiOiJDbGVhciBBUEkgS2V5IChSZXNldCkiLCLYp9mK2YbYrNinIjoiaGVyZSIsItix2KfZitqv2KfZhiDYr9ix2YrYp9mB2Kog2YPZhtmK2K8gfCI6ImdldCBhIGZyZWUga2V5IHwiLCLYtNiu2LXZitiqINmIINiv2LPYqtmI2LHYp9mE2LnZhdmEIEFJIChTeXN0ZW0gUHJvbXB0KSI6IkFJIFN5c3RlbSBQcm9tcHQgJiBJbnN0cnVjdGlvbnMiLCLwn5KhINit2K/Yp9qp2KvYsSDbtduw27Ag2qnYp9ix2Kfaqdiq2LEuINin24zZhiDZhdiq2YYg2LTYrti124zYqiBBSSDYsdinINiq2LnbjNuM2YYg2YXbjCDaqdmG2K8uIjoi8J+SoSBNYXggNTAwIGNoYXJhY3RlcnMuIERlZmluZXMgQUkgdG9uZSwgcGVyc29uYWxpdHkgYW5kIGNvbnN0cmFpbnRzLiIsIvCfkqEg2K3Yr9in2YPYq9ixINu127DbsCDZg9in2LHYp9mD2KrYsS4g2KfZitmGINmF2KrZhiDYtNiu2LXZitiqIEFJINix2Kcg2KrYudmK2YrZhiDZhdmK4oCM2YPZhtivLiI6IvCfkqEgTWF4IDUwMCBjaGFyYWN0ZXJzLiBEZWZpbmVzIEFJIHRvbmUsIHBlcnNvbmFsaXR5IGFuZCBjb25zdHJhaW50cy4iLCLYp9i32YTYp9i52KfYqiDZvtin2YrZhyDYqNix2KfZiiBBSSAo2LLZhdmK2YbZhyDZiCDZg9in2YbYqtmD2LPYqikiOiJCYWNrZ3JvdW5kIEZhY3RzICYgQ29udGV4dCBmb3IgQUkiLCLwn5KhIEFJINin2LIg2KfbjNmGINin2LfZhNin2LnYp9iqINio2LHYp9uMINm+2KfYs9iuINiv2YLbjNmCINiq2LEg2KfYs9iq2YHYp9iv2Ycg2YXbjCDaqdmG2K8uIjoi8J+SoSBBSSByZWZlcmVuY2VzIHRoaXMgY29udGV4dCBmb3IgYWNjdXJhdGUgYW5zd2VycyAoZS5nLiBvZmZpY2UgaG91cnMpLiIsIvCfkqEgQUkg2KfYsiDYp9mK2YYg2KfYt9mE2KfYudin2Kog2KjYsdin2Yog2b7Yp9iz2K4g2K/ZgtmK2YLigIzYqtixINin2LPYqtmB2KfYr9mHINmF2YrigIzZg9mG2K8uIjoi8J+SoSBBSSByZWZlcmVuY2VzIHRoaXMgY29udGV4dCBmb3IgYWNjdXJhdGUgYW5zd2VycyAoZS5nLiBvZmZpY2UgaG91cnMpLiIsItit2K/Yp9mD2KvYsSDYqti52K/Yp9ivINm+2KfYs9iuINio2Ycg2YfYsSDYtNiu2LUiOiJNYXggUmVwbGllcyBwZXIgQ29udGFjdCIsItit2K/Yp9mD2KvYsSDbsiDZvtin2LPYriI6Ik1heCAyIHJlcGxpZXMiLCLYrdiv2KfZg9ir2LEg27Mg2b7Yp9iz2K4gKNm+2YrYtNmG2YfYp9iv2YopIjoiTWF4IDMgcmVwbGllcyAoUmVjb21tZW5kZWQpIiwi2K3Yr9in2YPYq9ixINu1INm+2KfYs9iuIjoiTWF4IDUgcmVwbGllcyIsItit2K/Yp9mD2KvYsSDbsduwINm+2KfYs9iuIjoiTWF4IDEwIHJlcGxpZXMiLCLZgdin2LXZhNmHINiy2YXYp9mG24wg2KjbjNmGINm+2KfYs9iuINmH2KcgKNqp2YjZhCDYr9in2YjZhikiOiJSZXBseSBDb29sZG93biBJbnRlcnZhbCIsItmB2KfYtdmE2Ycg2LLZhdin2YbZiiDYqNmK2YYg2b7Yp9iz2K7igIzZh9inICjZg9mI2YTigIzYr9in2YjZhikiOiJSZXBseSBDb29sZG93biBJbnRlcnZhbCIsIuKaoSDYqNiv2YjZhiDZhdit2K/ZiNiv24zYqiDYstmF2KfZhtuMICjZgdmI2LHbjCDZiCDYqNiv2YjZhiDaqdmI2YQg2K/Yp9mI2YYpIjoi4pqhIEluc3RhbnQgKE5vIGNvb2xkb3duKSIsIuKaoSDYqNiv2YjZhiDZhdit2K/ZiNiv2YrYqiDYstmF2KfZhtmKICjZgdmI2LHZiiDZiCDYqNiv2YjZhiDZg9mI2YTigIzYr9in2YjZhikiOiLimqEgSW5zdGFudCAoTm8gY29vbGRvd24pIiwi2YfYsSDbsSDYr9mC2YrZgtmHIjoiRXZlcnkgMSBtaW51dGUiLCLZh9ixINuzINiv2YLZitmC2YciOiJFdmVyeSAzIG1pbnV0ZXMiLCLZh9ixINu1INiv2YLZitmC2YcgKNm+2YrYtNmG2YfYp9iv2YopIjoiRXZlcnkgNSBtaW51dGVzIChSZWNvbW1lbmRlZCkiLCLZh9ixINux27Ag2K/ZgtmK2YLZhyI6IkV2ZXJ5IDEwIG1pbnV0ZXMiLCLZh9ixINuz27Ag2K/ZgtmK2YLZhyI6IkV2ZXJ5IDMwIG1pbnV0ZXMiLCLZhtmD2KrZhzoiOiJOb3RlOiIsItmI2YLYqtmKINm+2KfYs9iuINmH2YjYtNmF2YbYryBBSSDZgdi52KfZhCDYqNin2LTYr9iMINin2YjZhNmI2YrYqiDYqNin2YTYp9iq2LHZiiDZhtiz2KjYqiDYqNmHINmF2YbYtNmKINiu2YjYr9mD2KfYsSAoQUZLKSDYr9in2LHYryDZiCDZgdmC2Lcg2K/YsSDYtdmI2LHYqiI6IldoZW4gQUkgUmVwbHkgaXMgYWN0aXZlLCBpdCB0YWtlcyBwcmlvcml0eSBvdmVyIEFGSyBhdXRvLXJlc3BvbmRlciBhbmQgb25seSByZXNwb25kcyB3aGVuIHlvdSBhcmUiLCLYotmB2YTYp9mK2YYg2KjZiNiv2YYg2LTZhdinIjoib2ZmbGluZSIsItiMINmF2KrZhtin2LPYqCDYqNinINiz2YjYp9mEINmF2K7Yp9i32Kgg2b7Yp9iz2K4g2YXbjCDYr9mH2K8uIjoiLCB0YWlsb3JpbmcgYW5zd2VycyB0byB0aGUgY29udGFjdCdzIHF1ZXJ5LiIsItiMINmF2KrZhtin2LPYqCDYqNinINiz2YjYp9mEINmF2K7Yp9i32Kgg2b7Yp9iz2K4g2YXZiuKAjNiv2YfYry4iOiIsIHRhaWxvcmluZyBhbnN3ZXJzIHRvIHRoZSBjb250YWN0J3MgcXVlcnkuIiwi2KfYqti12KfZhCDYsdio2KfYqiDYr9iz2KrZitin2LEg2KfYrtiq2LXYp9i12Yog2KrZhNqv2LHYp9mFIChCb3RGYXRoZXIgQVBJKSI6IkNvbm5lY3QgVGVsZWdyYW0gSGVscGVyIEJvdCAoQm90RmF0aGVyIEFQSSkiLCLZgtin2YbZiNmGINin2YbYrdi12KfYsSDZiCDYp9mF2YbZitiqOiI6IkV4Y2x1c2l2ZSBTZWN1cml0eSBQb2xpY3k6Iiwi2YfYsSDZg9in2LHYqNixINio2KfZitivINiv2LEiOiJFYWNoIHN1YnNjcmliZXIgbXVzdCBjcmVhdGUgYSBkZWRpY2F0ZWQgYm90IGluIiwi2LHYqNin2Kog2KfYrtiq2LXYp9i124wg2Ygg2YXYrNiy2KfbjCDYrtmI2K8g2LHYpyDYqNiz2KfYstivINmIINiq2YjaqdmGINii2YYg2LHYpyDZiNin2LHYryDaqdmG2K8uINio2Ycg2YXZhti42YjYsSDYrdmB2Lgg2qnYp9mF2YQg2K3YsduM2YUg2K7YtdmI2LXbjCDZiCDYp9mF2YbbjNiqINit2LPYp9io2Iwg2KfbjNmGINix2KjYp9iqINmF2YbYrdi12LHYp9mLINio2Ycg2YXYp9mE2qkg2K3Ys9in2Kgg2b7Yp9iz2K4g2YXbjCDYr9mH2K8g2Ygg2K/Ys9iq2LHYs9uMINmH2LEg2YHYsdivINiv24zar9ix24wg2KjZhyDZvtuM2KfZhSDZh9inINuM2Kcg2K/Ys9iq2YjYsdin2Kog2LHYqNin2Kog2KjZhyDYt9mI2LEg2qnYp9mF2YQg2YXYs9iv2YjYryDZiCDYutuM2LHZhdis2KfYsiDYp9iz2KouIjoiYW5kIHByb3ZpZGUgaXRzIHRva2VuLiBUbyBtYWludGFpbiBhYnNvbHV0ZSBwcml2YWN5LCB0aGlzIGJvdCBleGNsdXNpdmVseSBhbnN3ZXJzIHRoZSBhY2NvdW50IG93bmVyIGFuZCBibG9ja3MgYWxsIGV4dGVybmFsIHVzZXJzLiIsItix2KjYp9iqINin2K7Yqti12KfYtdmKINmIINmF2KzYstin2Yog2K7ZiNivINix2Kcg2KjYs9in2LLYryDZiCDYqtmI2YPZhiDYotmGINix2Kcg2YjYp9ix2K8g2YPZhtivLiDYqNmHINmF2YbYuNmI2LEg2K3Zgdi4INmD2KfZhdmEINit2LHZitmFINiu2LXZiNi12Yog2Ygg2KfZhdmG2YrYqiDYrdiz2KfYqNiMINin2YrZhiDYsdio2KfYqiDZhdmG2K3Ytdix2KfZiyDYqNmHINmF2KfZhNmDINit2LPYp9ioINm+2KfYs9iuINmF2YrigIzYr9mH2K8g2Ygg2K/Ys9iq2LHYs9mKINmH2LEg2YHYsdivINiv2Yrar9ix2Yog2KjZhyDZvtmK2KfZheKAjNmH2Kcg2YrYpyDYr9iz2KrZiNix2KfYqiDYsdio2KfYqiDYqNmHINi32YjYsSDZg9in2YXZhCDZhdiz2K/ZiNivINmIINi62YrYsdmF2KzYp9iyINin2LPYqi4iOiJhbmQgcHJvdmlkZSBpdHMgdG9rZW4uIFRvIG1haW50YWluIGFic29sdXRlIHByaXZhY3ksIHRoaXMgYm90IGV4Y2x1c2l2ZWx5IGFuc3dlcnMgdGhlIGFjY291bnQgb3duZXIgYW5kIGJsb2NrcyBhbGwgZXh0ZXJuYWwgdXNlcnMuIiwi2KrZiNmD2YYg2LHYqNin2Kog2KrZhNqv2LHYp9mFIChBUEkgVG9rZW4g2KfYsiBCb3RGYXRoZXJAKSI6IlRlbGVncmFtIEJvdCBBUEkgVG9rZW4gKGZyb20gQEJvdEZhdGhlcikiLCLinpUg2K/YsdmK2KfZgdiqINiq2YjZg9mGINin2LIgQEJvdEZhdGhlciI6IuKelSBHZXQgVG9rZW4gZnJvbSBAQm90RmF0aGVyIiwi4pqhINin2KrYtdin2YQg2Ygg2YHYudin2YQg2LPYp9iy24wg2YjYqCDZh9mI2qkiOiLimqEgQ29ubmVjdCAmIEVuYWJsZSBXZWJob29rIiwi4pqhINin2KrYtdin2YQg2Ygg2YHYudin2YTigIzYs9in2LLZiiDZiNio4oCM2YfZiNmDIjoi4pqhIENvbm5lY3QgJiBFbmFibGUgV2ViaG9vayIsIvCfmoAg2KjYp9iyINmD2LHYr9mGINix2KjYp9iqINiv2LEg2KrZhNqv2LHYp9mFIjoi8J+agCBPcGVuIEJvdCBpbiBUZWxlZ3JhbSIsItmI2LbYuduM2Kog2YjYqCDZh9mI2qk6IjoiV2ViaG9vayBTdGF0dXM6Iiwi2YjYtti52YrYqiDZiNio4oCM2YfZiNmDOiI6IldlYmhvb2sgU3RhdHVzOiIsItiv2YPZhdmHINmF2YbZiCDZgdi52KfZhCDYtNivIjoiTWVudSBCdXR0b24gQWN0aXZlIiwi2KfZhdmG2YrYqiDYp9mG2K3Ytdin2LHZiiAo2YXYrti12YjYtSDYtNmF2KcpOiI6IkV4Y2x1c2l2ZSBTZWN1cml0eSAoT3duZXIgT25seSk6Iiwi2LHYqNin2Kog2YXZhtit2LXYsdin2Ysg2KjZhyDYtNmG2KfYs9mHINiq2YTar9ix2KfZhSDYtNmF2Kcg2b7Yp9iz2K4g2YXbjCDYr9mH2K8g2Ygg2KjYsdin24wg2KjZgtuM2Ycg2YXYs9iv2YjYryDYp9iz2KouIjoiQm90IHN0cmljdGx5IGFuc3dlcnMgeW91ciBUZWxlZ3JhbSBJRCBhbmQgaWdub3JlcyBldmVyeW9uZSBlbHNlLiIsItix2KjYp9iqINmF2YbYrdi12LHYp9mLINio2Ycg2LTZhtin2LPZhyDYqtmE2q/Ysdin2YUg2LTZhdinINm+2KfYs9iuINmF2YrigIzYr9mH2K8g2Ygg2KjYsdin2Yog2KjZgtmK2Ycg2YXYs9iv2YjYryDYp9iz2KouIjoiQm90IHN0cmljdGx5IGFuc3dlcnMgeW91ciBUZWxlZ3JhbSBJRCBhbmQgaWdub3JlcyBldmVyeW9uZSBlbHNlLiIsIvCflJIg2KLZhdin2K/ZhyDZgtmB2YQg2KjYpyDYp9mI2YTZitmGIC9zdGFydCI6IvCflJIgUmVhZHkgdG8gTG9jayB1cG9uIGZpcnN0IC9zdGFydCIsIuKcj++4jyDYqtmG2LjZitmFINi02YbYp9iz2YciOiLinI/vuI8gQ29uZmlndXJlIElEIiwi2b7YsyDYp9iyINin2KrYtdin2YTYjCDbjNqpINio2KfYsSDZiNin2LHYryDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2K7ZiNivINi02K/ZhyDZiCDYr9iz2KrZiNixIjoiQWZ0ZXIgY29ubmVjdGluZywgb3BlbiB5b3VyIFRlbGVncmFtIGJvdCBhbmQgc2VuZCIsItm+2LMg2KfYsiDYp9iq2LXYp9mE2Iwg2YrZg+KAjNio2KfYsSDZiNin2LHYryDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2K7ZiNivINi02K/ZhyDZiCDYr9iz2KrZiNixIjoiQWZ0ZXIgY29ubmVjdGluZywgb3BlbiB5b3VyIFRlbGVncmFtIGJvdCBhbmQgc2VuZCIsItix2Kcg2KjZgdix2LPYqtmK2K8g2KrYpyDYsdio2KfYqiDZhdmG2K3Ytdix2KfZiyDYqNmHINin2YPYp9mG2Kog2LTZhdinINmC2YHZhCDYtNiv2Ycg2Ygg2b7ZhtmEINqv2LHYp9mB2YrZg9mKINiv2KfYrtmEINiq2YTar9ix2KfZhSDZgdi52KfZhCDYtNmI2K8uIjoidG8gbG9jayB0aGUgYm90IHRvIHlvdXIgYWNjb3VudCBhbmQgYWN0aXZhdGUgdGhlIGluLWFwcCBNaW5pIEFwcC4iLCLwn5eR77iPINiz2LfZhCDYstio2KfZhNmHINmIINi22K8g2K3YsNmBINm+24zYp9mFINmH2KfbjCDZvtuM2YjbjCAoQW50aS1EZWxldGUpIjoi8J+Xke+4jyBBbnRpLURlbGV0ZSBQcml2YXRlIE1lc3NhZ2UgVmF1bHQiLCLwn5eR77iPINiz2LfZhCDYstio2KfZhNmHINmIINi22K8g2K3YsNmBINm+2YrYp9mF4oCM2YfYp9mKINm+2YrZiNmKIChBbnRpLURlbGV0ZSkiOiLwn5eR77iPIEFudGktRGVsZXRlIFByaXZhdGUgTWVzc2FnZSBWYXVsdCIsItin2q/YsSDYtNiu2LXbjCDYr9ixINm+24zZiNuMINm+24zYp9mF24wg2LHYpyDZvtin2qkg2qnZhtiv2Iwg2YXYqtmGINuM2Kcg2LHYs9in2YbZhyDYsNiu24zYsdmHINi02K/ZhyDZgdmI2LHYp9mLINio2Ycg2LHYqNin2Kog2KfYrtiq2LXYp9i124wg2LTZhdinINin2LHYs9in2YQg2YXbjCDYtNmI2K8iOiJXaGVuIGEgY29udGFjdCBkZWxldGVzIGEgbWVzc2FnZSwgdGhlIGNhY2hlZCB0ZXh0IG9yIG1lZGlhIGlzIGltbWVkaWF0ZWx5IGZvcndhcmRlZCB0byB5b3VyIGJvdCIsItin2q/YsSDYtNiu2LXZiiDYr9ixINm+2YrZiNmKINm+2YrYp9mF2Yog2LHYpyDZvtin2YMg2YPZhtiv2Iwg2YXYqtmGINmK2Kcg2LHYs9in2YbZhyDYsNiu2YrYsdmHINi02K/ZhyDZgdmI2LHYp9mLINio2Ycg2LHYqNin2Kog2KfYrtiq2LXYp9i12Yog2LTZhdinINin2LHYs9in2YQg2YXZiuKAjNi02YjYryI6IldoZW4gYSBjb250YWN0IGRlbGV0ZXMgYSBtZXNzYWdlLCB0aGUgY2FjaGVkIHRleHQgb3IgbWVkaWEgaXMgaW1tZWRpYXRlbHkgZm9yd2FyZGVkIHRvIHlvdXIgYm90Iiwi4pyP77iPINmF2KfZhtuM2KrZiNixINmIINi22K8g2YjbjNix2KfbjNi0INm+24zYp9mFINmH2KfbjCDZvtuM2YjbjCAoQW50aS1FZGl0KSI6IuKcj++4jyBBbnRpLUVkaXQgUHJpdmF0ZSBNZXNzYWdlIE1vbml0b3IiLCLinI/vuI8g2YXYp9mG2YrYqtmI2LEg2Ygg2LbYryDZiNmK2LHYp9mK2LQg2b7Zitin2YXigIzZh9in2Yog2b7ZitmI2YogKEFudGktRWRpdCkiOiLinI/vuI8gQW50aS1FZGl0IFByaXZhdGUgTWVzc2FnZSBNb25pdG9yIiwi2Kfar9ixINi02K7YtduMINm+24zYp9mF24wg2LHYpyDYqti624zbjNixINiv2YfYr9iMINmF2KrZhiDZgtio2YQg2KfYsiDZiNuM2LHYp9uM2LQg2Ygg2YXYqtmGINis2K/bjNivINiv2LEg2LHYqNin2Kog2KrZhNqv2LHYp9mFINio2Ycg2LTZhdinINmG2YXYp9uM2LQg2K/Yp9iv2Ycg2YXbjCDYtNmI2K8iOiJXaGVuIGEgY29udGFjdCBlZGl0cyBhIG1lc3NhZ2UsIHRoZSBwcmUtZWRpdCB0ZXh0IGFuZCBkaWZmIGFyZSBkZWxpdmVyZWQgdG8geW91ciBib3QiLCLYp9qv2LEg2LTYrti12Yog2b7Zitin2YXZiiDYsdinINiq2LrZitmK2LEg2K/Zh9iv2Iwg2YXYqtmGINmC2KjZhCDYp9iyINmI2YrYsdin2YrYtCDZiCDZhdiq2YYg2KzYr9mK2K8g2K/YsSDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2KjZhyDYtNmF2Kcg2YbZhdin2YrYtCDYr9in2K/ZhyDZhdmK4oCM2LTZiNivIjoiV2hlbiBhIGNvbnRhY3QgZWRpdHMgYSBtZXNzYWdlLCB0aGUgcHJlLWVkaXQgdGV4dCBhbmQgZGlmZiBhcmUgZGVsaXZlcmVkIHRvIHlvdXIgYm90Iiwi8J+TuCDZhtis2KfYqiDZiCDYp9ix2LPYp9mEINix2LPYp9mG2Ycg2YfYp9uMINiy2YXYp9mGINiv2KfYsSDYqNmHINix2KjYp9iqIChBbnRpLVRUTCkiOiLwn5O4IEFudGktVFRMIFZpZXctT25jZSBNZWRpYSBTYXZlciIsIvCfk7gg2YbYrNin2Kog2Ygg2KfYsdiz2KfZhCDYsdiz2KfZhtmH4oCM2YfYp9mKINiy2YXYp9mG4oCM2K/Yp9ixINio2Ycg2LHYqNin2KogKEFudGktVFRMKSI6IvCfk7ggQW50aS1UVEwgVmlldy1PbmNlIE1lZGlhIFNhdmVyIiwi2KrYtdin2YjbjNix2Iwg2YHbjNmE2YUg2YfYpyDZiCDZiNuM2LMg2YfYp9uMINmF2K3ZiNi02YjZhtiv2YcgKFZpZXctT25jZSkg2YXYs9iq2YLbjNmF2KfZiyDYqNmHINm+24zZiNuMINix2KjYp9iqINin2K7Yqti12KfYtduMINi02YXYpyDYp9ix2LPYp9mEINmF24wg2LTZiNmG2K8iOiJFeHBpcmluZyBwaG90b3MsIHZpZGVvIG5vdGVzIGFuZCB2b2ljZSBjbGlwcyBhcmUgc2F2ZWQgYW5kIGZvcndhcmRlZCB0byB5b3VyIGhlbHBlciBib3QiLCLYqti12KfZiNmK2LHYjCDZgdmK2YTZheKAjNmH2Kcg2Ygg2YjZitiz4oCM2YfYp9mKINmF2K3ZiNi02YjZhtiv2YcgKFZpZXctT25jZSkg2YXYs9iq2YLZitmF2KfZiyDYqNmHINm+2YrZiNmKINix2KjYp9iqINin2K7Yqti12KfYtdmKINi02YXYpyDYp9ix2LPYp9mEINmF2YrigIzYtNmI2YbYryI6IkV4cGlyaW5nIHBob3RvcywgdmlkZW8gbm90ZXMgYW5kIHZvaWNlIGNsaXBzIGFyZSBzYXZlZCBhbmQgZm9yd2FyZGVkIHRvIHlvdXIgaGVscGVyIGJvdCIsItiz2b7YsSDYp9mF2YbZitiq2Yog2b7Ziti02LHZgdiq2YcgQXJpem8gU2VsZiAmIFplcm8tVHJ1c3QiOiJBcml6byBTZWxmIEFkdmFuY2VkIFNlY3VyaXR5ICYgWmVyby1UcnVzdCBTaGllbGQiLCLYrdiz2KfYqCDaqdin2LHYqNix24wg2LTZhdinINiq2K3YqiDYrdmB2KfYuNiqINmE2KfbjNmHINmH2KfbjCDYr9mB2KfYuduMINqG2YbYr9qv2KfZhtmHINi02KfZhdmEINix2YXYstmG2q/Yp9ix24wg2qnZiNin2YbYqtmI2YUg2KfZhdmG2Iwg2KrZhNmHINmH2KfbjCDYr9mB2KfYuduMIEhvbmV5cG902Iwg2LPZhtiz2YjYsdmH2KfbjCDYqti02K7bjNi1INmG2YHZiNiwINmIINin2K3Ysdin2LIg2YfZiNuM2Kog2K/ZiNi52KfZhdmE24wgKFRPVFApINmC2LHYp9ixINiv2KfYsdivLiI6IllvdXIgYWNjb3VudCBpcyBndWFyZGVkIGJ5IG11bHRpLWxheWVyZWQgZGVmZW5zZXM6IEFFUy1HQ00gZW5jcnlwdGlvbiwgWmVyby1UcnVzdCBIb25leXBvdCB0cmFwcywgYW5kIFJGQyA2MjM4IDJGQS4iLCLYrdiz2KfYqCDZg9in2LHYqNix2Yog2LTZhdinINiq2K3YqiDYrdmB2KfYuNiqINmE2KfZitmH4oCM2YfYp9mKINiv2YHYp9i52Yog2obZhtiv2q/Yp9mG2Ycg2LTYp9mF2YQg2LHZhdiy2Ybar9in2LHZiiDZg9mI2KfZhtiq2YjZheKAjNin2YXZhtiMINiq2YTZh+KAjNmH2KfZiiDYr9mB2KfYudmKIEhvbmV5cG902Iwg2LPZhtiz2YjYsdmH2KfZiiDYqti02K7Ziti1INmG2YHZiNiwINmIINin2K3Ysdin2LIg2YfZiNmK2Kog2K/ZiNi52KfZhdmE2YogKFRPVFApINmC2LHYp9ixINiv2KfYsdivLiI6IllvdXIgYWNjb3VudCBpcyBndWFyZGVkIGJ5IG11bHRpLWxheWVyZWQgZGVmZW5zZXM6IEFFUy1HQ00gZW5jcnlwdGlvbiwgWmVyby1UcnVzdCBIb25leXBvdCB0cmFwcywgYW5kIFJGQyA2MjM4IDJGQS4iLCLYp9it2LHYp9iyINmH2YjbjNiqINiv2Ygg2YXYsdit2YTZhyDYp9uMIChHb29nbGUgQXV0aGVudGljYXRvciAvIDJGQSkiOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uIChHb29nbGUgQXV0aGVudGljYXRvciAvIDJGQSkiLCLYp9it2LHYp9iyINmH2YjZitiqINiv2Ygg2YXYsdit2YTZh+KAjNin2YogKEdvb2dsZSBBdXRoZW50aWNhdG9yIC8gMkZBKSI6IlR3by1GYWN0b3IgQXV0aGVudGljYXRpb24gKEdvb2dsZSBBdXRoZW50aWNhdG9yIC8gMkZBKSIsItmF2K3Yp9mB2LjYqiDYp9iyINit2LPYp9ioINiv2LEg2KjYsdin2KjYsSDZhtmB2YjYsCDYqNinINqp2K/Zh9in24wg27Yg2LHZgtmF24wg2LLZhdin2YYg2YXYrdmI2LEiOiJQcm90ZWN0IHlvdXIgYWNjb3VudCB3aXRoIDMwLXNlY29uZCByb3RhdGluZyA2LWRpZ2l0IFRPVFAgY29kZXMiLCLZhdit2KfZgdi42Kog2KfYsiDYrdiz2KfYqCDYr9ixINio2LHYp9io2LEg2YbZgdmI2LAg2KjYpyDZg9iv2YfYp9mKINu2INix2YLZhdmKINiy2YXYp9mG4oCM2YXYrdmI2LEiOiJQcm90ZWN0IHlvdXIgYWNjb3VudCB3aXRoIDMwLXNlY29uZCByb3RhdGluZyA2LWRpZ2l0IFRPVFAgY29kZXMiLCLYutmK2LHZgdi52KfZhCDinYwiOiJEaXNhYmxlZCDinYwiLCLZgdi52KfZhCDZiCDYp9mK2YXZhiDwn5+iIjoiQWN0aXZlICYgU2VjdXJlIPCfn6IiLCLYqNinINmB2LnYp9mEINiz2KfYstuMINuyRkHYjCDZh9mG2q/Yp9mFINmH2LEg2KjYp9ixINmI2LHZiNivINio2Ycg2b7ZhtmE2Iwg2LnZhNin2YjZhyDYqNixINix2YXYsiDYudio2YjYsdiMINio2Ycg2qnYryDbjNqp2KjYp9ixINmF2LXYsdmBINin2b7ZhNuM2qnbjNi02YYgR29vZ2xlIEF1dGhlbnRpY2F0b3Ig24zYpyAyRkFTINmG24zYsiDYp9it2KrbjNin2Kwg2K7ZiNin2YfbjNivINiv2KfYtNiqLiI6IldoZW4gMkZBIGlzIGFjdGl2ZSwgZXZlcnkgc2lnbi1pbiByZXF1aXJlcyBhIHJvdGF0aW5nIGNvZGUgZnJvbSBHb29nbGUgQXV0aGVudGljYXRvciBvciAyRkFTIGFsb25nc2lkZSB5b3VyIHBhc3N3b3JkLiIsItio2Kcg2YHYudin2YTigIzYs9in2LLZiiDbskZB2Iwg2YfZhtqv2KfZhSDZh9ixINio2KfYsSDZiNix2YjYryDYqNmHINm+2YbZhNiMINi52YTYp9mI2Ycg2KjYsSDYsdmF2LIg2LnYqNmI2LHYjCDYqNmHINmD2K8g2YrZg9io2KfYsSDZhdi12LHZgSDYp9m+2YTZitmD2YrYtNmGIEdvb2dsZSBBdXRoZW50aWNhdG9yINmK2KcgMkZBUyDZhtmK2LIg2KfYrdiq2YrYp9isINiu2YjYp9mH2YrYryDYr9in2LTYqi4iOiJXaGVuIDJGQSBpcyBhY3RpdmUsIGV2ZXJ5IHNpZ24taW4gcmVxdWlyZXMgYSByb3RhdGluZyBjb2RlIGZyb20gR29vZ2xlIEF1dGhlbnRpY2F0b3Igb3IgMkZBUyBhbG9uZ3NpZGUgeW91ciBwYXNzd29yZC4iLCLwn5SQINix2KfZhyDYp9mG2K/Yp9iy24wg2Ygg2YHYudin2YQg2LPYp9iy24wg27JGQSI6IvCflJAgQ29uZmlndXJlICYgRW5hYmxlIDJGQSIsIvCflJAg2LHYp9mH4oCM2KfZhtiv2KfYstmKINmIINmB2LnYp9mE4oCM2LPYp9iy2Yog27JGQSI6IvCflJAgQ29uZmlndXJlICYgRW5hYmxlIDJGQSIsItqv2KfZhSDbsTog2KfYs9mD2YYg2KrYtdmI2YrYsSBRUiDZitinINmD2b7ZiiDZg9mE2YrYryDYr9iz2KrZiiI6IlN0ZXAgMTogU2NhbiBRUiBDb2RlIG9yIENvcHkgU2VjcmV0IEtleSIsItin2b7ZhNmK2YPZiti02YYgR29vZ2xlIEF1dGhlbnRpY2F0b3Ig2YrYpyAyRkFTINix2Kcg2KjYp9iyINmD2LHYr9mHINmIINin2YrZhiDYqNin2LHZg9ivINix2Kcg2KfYs9mD2YYg2YPZhtmK2K8uIjoiT3BlbiBHb29nbGUgQXV0aGVudGljYXRvciBvciAyRkFTIGFuZCBzY2FuIHRoaXMgYmFyY29kZS4iLCLwn5OxINio2KfYsiDZg9ix2K/ZhiDZhdiz2KrZgtmK2YUg2K/YsSBBdXRoZW50aWNhdG9yICjZiNmK2pjZhyDZhdmI2KjYp9mK2YQpIjoi8J+TsSBPcGVuIERpcmVjdGx5IGluIEF1dGhlbnRpY2F0b3IgKE1vYmlsZSkiLCLZitinINmD2YTZitivINmF2K3YsdmF2KfZhtmHINuz27Ig2YPYp9ix2KfZg9iq2LHZiiDYsdinINiv2LPYqtmKINmI2KfYsdivINmG2YXYp9mK2YrYrzoiOiJPciBtYW51YWxseSBlbnRlciB0aGlzIDMyLWNoYXJhY3RlciBCYXNlMzIgc2VjcmV0IGtleToiLCLwn5OLINmD2b7ZiiDZg9mE2YrYryDYr9iz2KrZiiI6IvCfk4sgQ29weSBTZWNyZXQgS2V5Iiwi2q/Yp9mFINuyOiDZg9ivINu2INix2YLZhdmKINiq2YjZhNmK2K8g2LTYr9mHINiv2LEg2KfZvtmE2YrZg9mK2LTZhiDYsdinINmI2KfYsdivINmD2YbZitivIjoiU3RlcCAyOiBFbnRlciB0aGUgNi1EaWdpdCBDb2RlIGZyb20gWW91ciBBcHAiLCLYqtij24zbjNivINmG2YfYp9uM24wg2Ygg2YHYudin2YQg2LPYp9iy24wg27JGQSI6IlZlcmlmeSAmIEVuYWJsZSAyRkEiLCLYqtij2YrZitivINmG2YfYp9mK2Yog2Ygg2YHYudin2YTigIzYs9in2LLZiiDbskZBIjoiVmVyaWZ5ICYgRW5hYmxlIDJGQSIsItin2K3Ysdin2LIg2YfZiNuM2Kog2K/ZiCDZhdix2K3ZhNmHINin24wgKDJGQSkg2KjYsdin24wg2K3Ys9in2Kgg2LTZhdinINmB2LnYp9mEINin2LPYqi4iOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uICgyRkEpIGlzIGN1cnJlbnRseSBhY3RpdmUgb24geW91ciBhY2NvdW50LiIsItin2K3Ysdin2LIg2YfZiNmK2Kog2K/ZiCDZhdix2K3ZhNmH4oCM2KfZiiAoMkZBKSDYqNix2KfZiiDYrdiz2KfYqCDYtNmF2Kcg2YHYudin2YQg2KfYs9iqLiI6IlR3by1GYWN0b3IgQXV0aGVudGljYXRpb24gKDJGQSkgaXMgY3VycmVudGx5IGFjdGl2ZSBvbiB5b3VyIGFjY291bnQuIiwi4p2MINi624zYsdmB2LnYp9mEINiz2KfYstuMINuyRkEiOiLinYwgRGlzYWJsZSAyRkEiLCLinYwg2LrZitix2YHYudin2YTigIzYs9in2LLZiiDbskZBIjoi4p2MIERpc2FibGUgMkZBIiwi8J+UkSDZg9iv2YfYp9mKINio2KfYstmK2KfYqNmKINin2LbYt9ix2KfYsdmKIChFbWVyZ2VuY3kgQmFja3VwIENvZGVzKSI6IvCflJEgRW1lcmdlbmN5IEJhY2t1cCBSZWNvdmVyeSBDb2RlcyIsIvCfk4sg2YPZvtmKINiq2YXYp9mFINmD2K/Zh9inIjoi8J+TiyBDb3B5IEFsbCBCYWNrdXAgQ29kZXMiLCLYr9ixINi12YjYsdiqINi52K/ZhSDYr9iz2KrYsdiz24wg2KjZhyDar9mI2LTbjCDbjNinINin2b4gQXV0aGVudGljYXRvctiMINio2Kcg2YfYsSDbjNqpINin2LIg2KfbjNmGINqp2K/Zh9in24wg24zaqSDYqNin2LEg2YXYtdix2YEg2YXbjCDYqtmI2KfZhtuM2K8g2YjYp9ix2K8g2K3Ys9in2Kgg2LTZiNuM2K86IjoiSWYgeW91IGxvc2UgYWNjZXNzIHRvIHlvdXIgYXV0aGVudGljYXRvciBhcHAsIHVzZSBhbnkgb2YgdGhlc2Ugc2luZ2xlLXVzZSBjb2RlcyB0byBzaWduIGluOiIsItiv2LEg2LXZiNix2Kog2LnYr9mFINiv2LPYqtix2LPZiiDYqNmHINqv2YjYtNmKINmK2Kcg2KfZviBBdXRoZW50aWNhdG9y2Iwg2KjYpyDZh9ixINmK2YMg2KfYsiDYp9mK2YYg2YPYr9mH2KfZiiDZitmD4oCM2KjYp9ixINmF2LXYsdmBINmF2YrigIzYqtmI2KfZhtmK2K8g2YjYp9ix2K8g2K3Ys9in2Kgg2LTZiNmK2K86IjoiSWYgeW91IGxvc2UgYWNjZXNzIHRvIHlvdXIgYXV0aGVudGljYXRvciBhcHAsIHVzZSBhbnkgb2YgdGhlc2Ugc2luZ2xlLXVzZSBjb2RlcyB0byBzaWduIGluOiIsItm+2LTYqtuM2KjYp9mGINqv24zYsduMINix2YXYstmG2q/Yp9ix24wg2LTYr9mHIChFbmNyeXB0ZWQgQmFja3VwICYgUmVzdG9yZSkiOiJFbmNyeXB0ZWQgQmFja3VwICYgRGlzYXN0ZXIgUmVjb3ZlcnkiLCLZvti02KrZitio2KfZhuKAjNqv2YrYsdmKINix2YXYstmG2q/Yp9ix2Yog2LTYr9mHIChFbmNyeXB0ZWQgQmFja3VwICYgUmVzdG9yZSkiOiJFbmNyeXB0ZWQgQmFja3VwICYgRGlzYXN0ZXIgUmVjb3ZlcnkiLCLYr9in2YbZhNmI2K8g2YbYs9iu2Ycg2b7YtNiq2YrYqNin2YYg2KfZhdmGINin2LIg2KrZhdin2YUg2KrZhti42YrZhdin2Kog2Ygg2LPYtNmG2Iwg2YrYpyDYqNin2LLZitin2KjZiiDYotmGINix2YjZiiDYs9ix2YjYsSI6IkV4cG9ydCBzZWN1cmUgZW5jcnlwdGVkIGJhY2t1cCBvZiBhbGwgc2V0dGluZ3MsIG9yIHJlc3RvcmUgdG8gc2VydmVyIiwi8J+TpSDYp9mK2KzYp9ivINmIINiv2LHZitin2YHYqiDYrtix2YjYrNmKINin2YXZhiI6IvCfk6UgRXhwb3J0IFNlY3VyZSBCYWNrdXAiLCLYqtmF2KfZhSDYqtmG2LjbjNmF2KfYqiDYs9in2LnYqtiMINio24zZiNqv2LHYp9mB24zYjCDZhdmG2LTbjNiMINio2YTYp9qpINmE24zYs9iqINmIINiz2LTZhiDYqtmE2q/Ysdin2YUg2LTZhdinINio2Kcg2KfZhNqv2YjYsduM2KrZhSBBRVMtR0NNINmIINix2YXYsiDYtNmF2Kcg2YLZgdmEINi02K/ZhyDZiCDYqNmHINi02qnZhCDZgdin24zZhCDYr9in2YbZhNmI2K8g2YXbjCDYtNmI2K8uIjoiQWxsIGNsb2NrLCBiaW8sIEFGSywgYmxvY2tsaXN0LCBhbmQgc2Vzc2lvbiBkYXRhIGlzIGVuY3J5cHRlZCB3aXRoIEFFUy0yNTYtR0NNIHVzaW5nIHlvdXIgcGFzc3dvcmQuIiwi2KrZhdin2YUg2KrZhti42YrZhdin2Kog2LPYp9i52KrYjCDYqNmK2Yjar9ix2KfZgdmK2Iwg2YXZhti02YrYjCDYqNmE2KfZg+KAjNmE2YrYs9iqINmIINiz2LTZhiDYqtmE2q/Ysdin2YUg2LTZhdinINio2Kcg2KfZhNqv2YjYsdmK2KrZhSBBRVMtR0NNINmIINix2YXYsiDYtNmF2Kcg2YLZgdmEINi02K/ZhyDZiCDYqNmHINi02YPZhCDZgdin2YrZhCDYr9in2YbZhNmI2K8g2YXZiuKAjNi02YjYry4iOiJBbGwgY2xvY2ssIGJpbywgQUZLLCBibG9ja2xpc3QsIGFuZCBzZXNzaW9uIGRhdGEgaXMgZW5jcnlwdGVkIHdpdGggQUVTLTI1Ni1HQ00gdXNpbmcgeW91ciBwYXNzd29yZC4iLCLwn5K+INiu2LHZiNis2Yog2b7YtNiq2YrYqNin2YYgKEV4cG9ydCkiOiLwn5K+IEV4cG9ydCBCYWNrdXAiLCLwn5OkINio2KfYstmK2KfYqNmKINmB2KfZitmEINm+2LTYqtmK2KjYp9mGIChSZXN0b3JlKSI6IvCfk6QgUmVzdG9yZSBCYWNrdXAgRmlsZSIsItmB2KfZitmEINio2YPYp9m+INiv2KfZhtmE2YjYryDYtNiv2Ycg2LHYpyDYp9mG2KrYrtin2Kgg2Ygg2LHZhdiy2Yog2YPZhyDYqNinINii2YYg2YLZgdmEINi02K/ZhyDYsdinINmI2KfYsdivINmG2YXYp9mK2YrYryDYqtinINiq2YbYuNmK2YXYp9iqINio2KfYstqv2LHYr9in2YbZiiDYtNmI2YbYrzoiOiJTZWxlY3QgeW91ciBlbmNyeXB0ZWQgYmFja3VwIGZpbGUgYW5kIGVudGVyIHRoZSBwYXNzd29yZCB1c2VkIHRvIGxvY2sgaXQ6Iiwi8J+UhCDYqNin2LLZitin2KjZiiDYp9i32YTYp9i52KfYqiAoUmVzdG9yZSkiOiLwn5SEIFJlc3RvcmUgQmFja3VwIiwi2KrZhNmHINmH2KfbjCDYr9mB2KfYuduMINmIINit2LPar9ixINmH2KfZhtuMINm+2KfYqiAoWmVyby1UcnVzdCBIb25leXBvdCkiOiJaZXJvLVRydXN0IEhvbmV5cG90IERlZmVuc2l2ZSBUcmFwcyIsItiq2YTZh+KAjNmH2KfZiiDYr9mB2KfYudmKINmIINit2LPar9ixINmH2KfZhtmK4oCM2b7Yp9iqIChaZXJvLVRydXN0IEhvbmV5cG90KSI6Ilplcm8tVHJ1c3QgSG9uZXlwb3QgRGVmZW5zaXZlIFRyYXBzIiwi2YXYs9iv2YjYr9iz2KfYstuMINiu2YjYr9qp2KfYsSDYotuMINm+24wg2YfYp9uMINmF2LTaqdmI2qkg2Ygg2b7ZiNuM2LTar9ix2KfZhiDYotiz24zYqCDZvtiw24zYsduMINmI2KgiOiJBdXRvbWF0aWMgSVAgYmFucyBhZ2FpbnN0IHZ1bG5lcmFiaWxpdHkgc2Nhbm5lcnMgJiBob3N0aWxlIHByb2JlcyIsItmF2LPYr9mI2K/Ys9in2LLZiiDYrtmI2K/Zg9in2LEg2KLZiuKAjNm+2YrigIzZh9in2Yog2YXYtNmD2YjZgyDZiCDZvtmI2YrYtNqv2LHYp9mGINii2LPZitio4oCM2b7YsNmK2LHZiiDZiNioIjoiQXV0b21hdGljIElQIGJhbnMgYWdhaW5zdCB2dWxuZXJhYmlsaXR5IHNjYW5uZXJzICYgaG9zdGlsZSBwcm9iZXMiLCLZgdi52KfZhCDZiCDZh9mI2LTZitin2LEg8J+foiI6IkFjdGl2ZSAmIFZpZ2lsYW50IPCfn6IiLCLYqtix2KfZgduM2qkg2YfYp9uMINin2LPaqdmG2LEg2YXYp9mG2YbYryDYqtmE2KfYtCDYqNix2KfbjCDYr9iz2KrYsdiz24wg2KjZhyDZhdiz24zYsdmH2KfbjCDZgdix2LbbjCDYp9iv2YXbjNmG2Iwg2qnYr9mH2KfbjCDYtNmE2Iwg2YHYp9uM2YQg2YfYp9uMINiv2KfYqiDYp9mGINmI24wg2Ygg2KjYp9qvINmH2KfbjCDYtNmG2KfYrtiq2Ycg2LTYr9mH2Iwg2KjZhNin2YHYp9i12YTZhyDYr9ixINmE2KjZhyDYtNio2qnZhyBDbG91ZGZsYXJlINmF2LPYr9mI2K8g2LTYr9mHINmIINiv2LEg2YTYp9qvINmH2KfbjCDYp9mF2YbbjNiq24wg2KvYqNiqINmF24wg2q/Ysdiv2YbYry4iOiJNYWxpY2lvdXMgc2NhbnMgcHJvYmluZyBkZWNveSBhZG1pbiBwYXRocywgc2hlbGwgZW5kcG9pbnRzLCBvciAuZW52IGZpbGVzIGFyZSBibG9ja2VkIGluc3RhbnRseSBhdCBDbG91ZGZsYXJlIGVkZ2UgYW5kIGxvZ2dlZC4iLCLYqtix2KfZgdmK2YPigIzZh9in2Yog2KfYs9mD2YbYsSDZhdin2YbZhtivINiq2YTYp9i0INio2LHYp9mKINiv2LPYqtix2LPZiiDYqNmHINmF2LPZitix2YfYp9mKINmB2LHYttmKINin2K/ZhdmK2YbYjCDZg9iv2YfYp9mKINi02YTYjCDZgdin2YrZhOKAjNmH2KfZiiDYr9in2KrigIzYp9mG4oCM2YjZiiDZiCDYqNin2q/igIzZh9in2Yog2LTZhtin2K7YqtmH4oCM2LTYr9mH2Iwg2KjZhNin2YHYp9i12YTZhyDYr9ixINmE2KjZhyDYtNio2YPZhyBDbG91ZGZsYXJlINmF2LPYr9mI2K8g2LTYr9mHINmIINiv2LEg2YTYp9qv4oCM2YfYp9mKINin2YXZhtmK2KrZiiDYq9io2Kog2YXZiuKAjNqv2LHYr9mG2K8uIjoiTWFsaWNpb3VzIHNjYW5zIHByb2JpbmcgZGVjb3kgYWRtaW4gcGF0aHMsIHNoZWxsIGVuZHBvaW50cywgb3IgLmVudiBmaWxlcyBhcmUgYmxvY2tlZCBpbnN0YW50bHkgYXQgQ2xvdWRmbGFyZSBlZGdlIGFuZCBsb2dnZWQuIiwi2YLYp9io2YTZitiqINmC2KjZhNmKIjoiUHJldmlvdXMiLCLwn5WSINiz2KfYudiqINmIINin2LPYqtin2YrZhCI6IvCflZIgQ2xvY2sgJiBTdHlsZSIsItmC2KfYqNmE2YrYqiDYqNi52K/ZiiI6Ik5leHQiLCLZgtio2YTZiiI6IlByZXZpb3VzIiwi2KjYudiv2YoiOiJOZXh0Iiwi8J+SviDYsNiu2YrYsdmHINmIINin2LnZhdin2YQg2KrYutmK2YrYsdin2Kog2KfYs9iq2YjYr9mK2YgiOiLwn5K+IFNhdmUgU3R1ZGlvIENoYW5nZXMiLCLYsNiu2YrYsdmHINii2YbZiiDYqti62YrZitix2KfYqiDYp9iz2KrZiNiv2YrZiCI6IlNhdmUgU3R1ZGlvIENoYW5nZXMiLCLZiNi22LnZitiqINiz2LHZiNmK2LMg2Ygg2YXYp9mG2YrYqtmI2LHZitmG2q8g2LPZhNin2YXYqiI6IlNlcnZpY2UgSGVhbHRoICYgQ2xvdWQgTW9uaXRvcmluZyIsItmI2LbYuduM2Kog2LPZhNin2YXYqiDZiCDZvtin24zZviDZhNin24zZhiDYp9io2LHbjCI6IlN5c3RlbSBIZWFsdGggJiBDbG91ZCBQaXBlbGluZSIsItmI2LbYudmK2Kog2LPZhNin2YXYqiDZiCDZvtin2YrZvuKAjNmE2KfZitmGINin2KjYsdmKIjoiU3lzdGVtIEhlYWx0aCAmIENsb3VkIFBpcGVsaW5lIiwi4pqhINiq2LPYqiDYqNmHINix2YjYstix2LPYp9mG24wg2KLZhtuMIjoi4pqhIEluc3RhbnQgU3luYyBUZXN0Iiwi4pqhINiq2LPYqiDYqNmH4oCM2LHZiNiy2LHYs9in2YbZiiDYotmG2YoiOiLimqEgSW5zdGFudCBTeW5jIFRlc3QiLCLZh9mF2q/Yp9mFINiz2KfYstuMINmB2YjYsduMIjoiU3luYyBOb3ciLCLZh9mF2q/Yp9mF4oCM2LPYp9iy2Yog2YHZiNix2YoiOiJTeW5jIE5vdyIsItiq2YjZgtmBINmF2YjZgtiqINiz2YTZgSDYqNin2KoiOiJQYXVzZSBTZWxmYm90Iiwi8J+TsSDYqti52YjZiti2INin2YPYp9mG2KoiOiLwn5OxIENoYW5nZSBUZWxlZ3JhbSBTZXNzaW9uIiwi2KrYutmK2YrYsSDYs9i02YYg2KfZg9in2YbYqiDYqtmE2q/Ysdin2YUiOiJDaGFuZ2UgVGVsZWdyYW0gU2Vzc2lvbiIsItmI2LbYuduM2Kog2LPZhNmBINio2KfYqiDYtNmF2KciOiJZb3VyIFNlbGZib3QgU3RhdHVzIiwi2YjYtti52YrYqiDYs9mE2YHigIzYqNin2Kog2LTZhdinIjoiWW91ciBTZWxmYm90IFN0YXR1cyIsItmI2LbYuduM2Kog2LPZhNmBINio2KfYqjoiOiJTZWxmYm90IFN0YXR1czoiLCLZiNi22LnZitiqINiz2YTZgeKAjNio2KfYqjoiOiJTZWxmYm90IFN0YXR1czoiLCLwn5+iINmB2LnYp9mEINmIINii2YbZhNin2YrZhiI6IvCfn6IgQWN0aXZlICYgT25saW5lIiwi2KLYrtix24zZhiDYqNmHINix2YjYstix2LPYp9mG24wg2KrZhNqv2LHYp9mFIjoiTGFzdCBUZWxlZ3JhbSBTeW5jIiwi2KLYrtix2YrZhiDYqNmH4oCM2LHZiNiy2LHYs9in2YbZiiDYqtmE2q/Ysdin2YUiOiJMYXN0IFRlbGVncmFtIFN5bmMiLCLYotiu2LHbjNmGINmH2YXar9in2YUg2LPYp9iy24w6IjoiTGFzdCBTeW5jOiIsItii2K7YsdmK2YYg2YfZhdqv2KfZheKAjNiz2KfYstmKOiI6Ikxhc3QgU3luYzoiLCLYtNio2YPZhyDYp9io2LHZiiBBcml6byBTZWxmINmB2LnYp9mEINin2LPYqiI6IkFyaXpvIFNlbGYgQ2xvdWQgTmV0d29yayBpcyBBY3RpdmUiLCLZvtmE2KrZgdix2YUg2KfYqNix24wg2YfZiNi02YXZhtivINiz2YTZgSDYqNin2Kog2KrZhNqv2LHYp9mFINii2LHbjNiy2YggfCDYt9ix2KfYrduMINi02K/ZhyDYqNinINmF2LnZhdin2LHbjCBFZGdlINmIINio2K/ZiNmGINiz2LHZiNixIChTZXJ2ZXJsZXNzKSI6IkFyaXpvIFRlbGVncmFtIFNlbGZib3QgQ2xvdWQgUGxhdGZvcm0gfCBFbmdpbmVlcmVkIHdpdGggU2VydmVybGVzcyBFZGdlIEFyY2hpdGVjdHVyZSIsItm+2YTYqtmB2LHZhSDYp9io2LHZiiDZh9mI2LTZhdmG2K8g2LPZhNmB4oCM2KjYp9iqINiq2YTar9ix2KfZhSDYotix2YrYstmIIHwg2LfYsdin2K3ZiiDYtNiv2Ycg2KjYpyDZhdi52YXYp9ix2YogRWRnZSDZiCDYqNiv2YjZhiDYs9ix2YjYsSAoU2VydmVybGVzcykiOiJBcml6byBUZWxlZ3JhbSBTZWxmYm90IENsb3VkIFBsYXRmb3JtIHwgRW5naW5lZXJlZCB3aXRoIFNlcnZlcmxlc3MgRWRnZSBBcmNoaXRlY3R1cmUiLCLZhdi52LHZgduMINin2YXaqdin2YbYp9iqINmIINiz2LHZiNuM2LMg2YfYp9uMINm+24zYtNix2YHYqtmHIHwgQXJpem8gU2VsZiB2My42LjAgUFJPIjoiRmVhdHVyZSBUb3VyICYgQWR2YW5jZWQgU2VydmljZXMgfCBBcml6byBTZWxmIHYzLjYuMCBQUk8iLCLZhdi52LHZgdmKINin2YXZg9in2YbYp9iqINmIINiz2LHZiNmK2LPigIzZh9in2Yog2b7Ziti02LHZgdiq2YcgfCBBcml6byBTZWxmIHYzLjYuMCBQUk8iOiJGZWF0dXJlIFRvdXIgJiBBZHZhbmNlZCBTZXJ2aWNlcyB8IEFyaXpvIFNlbGYgdjMuNi4wIFBSTyIsItin2LPYqtmI2K/bjNmI24wg2KfYqNix24wg2LPZhNmBINio2KfYqiDZh9mI2LTZhdmG2K8g2KrZhNqv2LHYp9mFIjoiSW50ZWxsaWdlbnQgVGVsZWdyYW0gU2VsZmJvdCBDbG91ZCBTdHVkaW8iLCLYp9iz2KrZiNiv2YrZiNmKINin2KjYsdmKINiz2YTZgeKAjNio2KfYqiDZh9mI2LTZhdmG2K8g2KrZhNqv2LHYp9mFIjoiSW50ZWxsaWdlbnQgVGVsZWdyYW0gU2VsZmJvdCBDbG91ZCBTdHVkaW8iLCLZvtmE2KrZgdix2YUg2YXYqtmF2LHZg9iyINin2KjYsdmKINis2YfYqiDYrtmI2K/Zg9in2LHYs9in2LLZiiDZiCDZhdiv2YrYsdmK2Kog2YbZhdin2YrZhyDYqtmE2q/Ysdin2YUg2KjYsSDYqNiz2KrYsSDYs9ix2YjYsdmE2LMg27LbtCDYs9in2LnYqtmHINio2K/ZiNmGINmG2YrYp9iyINio2Ycg2KLZhtmE2KfZitmGINio2YjYr9mGINiv2LPYqtqv2KfZhyDZitinINiz2LHZiNixINin2K7Yqti12KfYtdmKLiI6IkNlbnRyYWxpemVkIDI0Lzcgc2VydmVybGVzcyBwbGF0Zm9ybSBhdXRvbWF0aW5nIFRlbGVncmFtIHByb2ZpbGVzIHdpdGhvdXQgZGVkaWNhdGVkIHNlcnZlcnMgb3Iga2VlcGluZyB5b3VyIHBob25lIG9ubGluZS4iLCLZiNin2YPZhti0INiy2YrYsSDbtNuwbXMiOiJTdWItNDBtcyBMYXRlbmN5Iiwi27HbsNuw2aog2KfYqNix2Yog27LbtC/btyI6IjEwMCUgMjQvNyBDbG91ZCIsItiv2YrYqtin2KjZitizINmH2YrYqNix2YrYryBEMSArIEtWIjoiSHlicmlkIEQxICsgS1YgRGF0YWJhc2UiLCLYp9mF2YbbjNiqINuyRkEg2Ygg2YfYp9mG24wg2b7Yp9iqIjoiMkZBICYgSG9uZXlwb3QgU2VjdXJpdHkiLCLYp9mF2YbZitiqINuyRkEg2Ygg2YfYp9mG2YrigIzZvtin2KoiOiIyRkEgJiBIb25leXBvdCBTZWN1cml0eSIsItiz2KfYudiqINiy2YbYr9mHINmG2KfZhSDZg9in2LHYqNix2YoiOiJMaXZlIFByb2ZpbGUgQ2xvY2siLCLbs9uyINmC2YTZhSDZhtmI2LTYqtin2LHZiiI6IjMyIEZvbnQgU3R5bGVzIiwi2KjZhyDYsdmI2LLYsdiz2KfZhtuMINiu2YjYr9qp2KfYsSDZiCDYqNmE2KfYr9ix2YbaryDYstmF2KfZhiDYqtmH2LHYp9mGINiv2LEg2YbYp9mFINqp2KfYsdio2LHbjCDYqtmE2q/Ysdin2YUg2KjYpyDbs9uyINin2LPYqtin24zZhCDZgtmE2YUg2YHYp9ix2LPbjCDZiCDZhNin2KrbjNmG2Iwg2KfYsdmC2KfZhSDZhdit2YTbjCDZiCDZhtmF2KfbjNi0INux27Iv27LbtCDYs9in2LnYqtmHINix2KPYsyDYq9in2YbbjNmHINuw27AuIjoiUmVhbC10aW1lIGF1dG9tYXRlZCBUZWxlZ3JhbSBuYW1lIGNsb2NrIHN5bmNocm9uaXphdGlvbiB3aXRoIDMyIGRlc2lnbmVyIHByZXNldHMsIGN1c3RvbSBsb2NhbCBkaWdpdHMsIGFuZCAxMi8yNGggcHJlY2lzaW9uIGF0IHNlY29uZCAwMC4iLCLYqNmH4oCM2LHZiNiy2LHYs9in2YbZiiDYrtmI2K/Zg9in2LEg2Ygg2KjZhNin2K/YsdmG2q8g2LLZhdin2YYg2KrZh9ix2KfZhiDYr9ixINmG2KfZhSDZg9in2LHYqNix2Yog2KrZhNqv2LHYp9mFINio2Kcg27PbsiDYp9iz2KrYp9mK2YQg2YLZhNmFINmB2KfYsdiz2Yog2Ygg2YTYp9iq2YrZhtiMINin2LHZgtin2YUg2YXYrdmE2Yog2Ygg2YbZhdin2YrYtCDbsduyL9uy27Qg2LPYp9i52KrZhyDYsdij2LMg2KvYp9mG2YrZhyDbsNuwLiI6IlJlYWwtdGltZSBhdXRvbWF0ZWQgVGVsZWdyYW0gbmFtZSBjbG9jayBzeW5jaHJvbml6YXRpb24gd2l0aCAzMiBkZXNpZ25lciBwcmVzZXRzLCBjdXN0b20gbG9jYWwgZGlnaXRzLCBhbmQgMTIvMjRoIHByZWNpc2lvbiBhdCBzZWNvbmQgMDAuIiwi2KjZitmI2q/Ysdin2YHZiiDYstmG2K/ZhyDZiCDYqtmC2YjZitmFIjoiRHluYW1pYyBCaW8gJiBDYWxlbmRhciIsItmF2KrYutmK2LHZh9in2Yog2YfZiNi02YXZhtivIjoiU21hcnQgRHluYW1pYyBWYXJpYWJsZXMiLCLZhtmF2KfZiti0INiq2YLZiNmK2YUg2LLZhtiv2Ycg2YfYrNix2Yog2LTZhdiz2YrYjCDYsdmI2LIg2YfZgdiq2Ycg2Ygg2LPYp9i52Kog2K/YsSDYqNiu2LQgQmlvINiq2YTar9ix2KfZhSDYqNinINin2YTar9mI2YfYp9mKINmF2K/YsdmGINmIINmF2KrYutmK2LHZh9in2Yog2K/Yp9mK2YbYp9mF2YrZgy4iOiJEeW5hbWljIFRlbGVncmFtIGJpbyB1cGRhdGVzIGRpc3BsYXlpbmcgY2FsZW5kYXIsIGRheSBvZiB3ZWVrLCBhbmQgdGltZSBmb3JtYXR0ZWQgd2l0aCBtb2Rlcm4gdGVtcGxhdGVzLiIsItmF2YbYtNmKINiu2YjYr9mD2KfYsSDZvtmK2YjZiiAoQUZLKSI6IkFGSyBQcml2YXRlIEF1dG8tU2VjcmV0YXJ5Iiwi2LPZitiz2KrZhSDYttivINin2LPZvtmFIjoiQW50aS1TcGFtIENvb2xkb3duIiwi2b7Yp9iz2K7ar9mI24zbjCDZh9mI2LTZhdmG2K8g2KjZhyDZvtuM2KfZhSDZh9in24wg2LTYrti124wg2YfZhtqv2KfZhSDYotmB2YTYp9uM2YYg2KjZiNiv2YbYjCDYqNinINmC2KfYqNmE24zYqiDYqti52LHbjNmBINmF2KrZhiDYs9mB2KfYsdi024zYjCDZgdin2LXZhNmHINiy2YXYp9mG24wg2Ygg2KfYs9iq2KvZhtin2LPYp9iy24wg2LHYqNin2Kog2YfYpyDZiCDaqdin2LHYqNix2KfZhi4iOiJTbWFydCBhdXRvLXJlcGxpZXMgdG8gcHJpdmF0ZSBtZXNzYWdlcyB3aGVuIG9mZmxpbmUsIGZlYXR1cmluZyBjdXN0b20gdGVtcGxhdGVzLCBjb29sZG93bnMsIGFuZCBib3Qgd2hpdGVsaXN0aW5nLiIsItm+2KfYs9iu2q/ZiNmK2Yog2YfZiNi02YXZhtivINio2Ycg2b7Zitin2YXigIzZh9in2Yog2LTYrti12Yog2YfZhtqv2KfZhSDYotmB2YTYp9mK2YYg2KjZiNiv2YbYjCDYqNinINmC2KfYqNmE2YrYqiDYqti52LHZitmBINmF2KrZhiDYs9mB2KfYsdi02YrYjCDZgdin2LXZhNmHINiy2YXYp9mG2Yog2Ygg2KfYs9iq2KvZhtin2LPYp9iy2Yog2LHYqNin2KrigIzZh9inINmIINmD2KfYsdio2LHYp9mGLiI6IlNtYXJ0IGF1dG8tcmVwbGllcyB0byBwcml2YXRlIG1lc3NhZ2VzIHdoZW4gb2ZmbGluZSwgZmVhdHVyaW5nIGN1c3RvbSB0ZW1wbGF0ZXMsIGNvb2xkb3ducywgYW5kIGJvdCB3aGl0ZWxpc3RpbmcuIiwi2K/Ys9iq2YrYp9ixINmH2YjYtCDZhdi12YbZiNi52YogKEFJKSI6IkFJIENoYXQgQXNzaXN0YW50Iiwi2b7Yp9iz2K7ar9mI24wg2obYqiDZhNio2Ycg2KfbjCI6IkVkZ2UgQ29udGV4dHVhbCBSZXNwb25kZXIiLCLZvtin2LPYrtqv2YjZiiDahtiqINmE2KjZh+KAjNin2YoiOiJFZGdlIENvbnRleHR1YWwgUmVzcG9uZGVyIiwi2KrYudin2YXZhCDYstio2KfZhtuMINmIINm+2KfYs9iuINiv2YfbjCDYrtmI2K/aqdin2LEg2KjZhyDahtiqINmH2Kcg2KjYpyDYp9iz2KrZgdin2K/ZhyDYp9iyINmF2K/ZhCDZh9in24wg2b7bjNi02LHZgdiq2Ycg2YfZiNi0INmF2LXZhtmI2LnbjCDZhdiq2LXZhCDYqNmHINiz2KfZhdin2YbZhyDYs9ix2YjYsdmE2LMg2KfYqNix24wuIjoiQ29udGV4dC1hd2FyZSBjb252ZXJzYXRpb25hbCByZXBsaWVzIHBvd2VyZWQgYnkgYWR2YW5jZWQgTExNIGludGVncmF0aW9uIGRpcmVjdGx5IG9uIHNlcnZlcmxlc3MgZWRnZS4iLCLYqti52KfZhdmEINiy2KjYp9mG2Yog2Ygg2b7Yp9iz2K7igIzYr9mH2Yog2K7ZiNiv2YPYp9ixINio2Ycg2obYquKAjNmH2Kcg2KjYpyDYp9iz2KrZgdin2K/ZhyDYp9iyINmF2K/ZhOKAjNmH2KfZiiDZvtmK2LTYsdmB2KrZhyDZh9mI2LQg2YXYtdmG2YjYudmKINmF2KrYtdmEINio2Ycg2LPYp9mF2KfZhtmHINiz2LHZiNix2YTYsyDYp9io2LHZii4iOiJDb250ZXh0LWF3YXJlIGNvbnZlcnNhdGlvbmFsIHJlcGxpZXMgcG93ZXJlZCBieSBhZHZhbmNlZCBMTE0gaW50ZWdyYXRpb24gZGlyZWN0bHkgb24gc2VydmVybGVzcyBlZGdlLiIsItm+2KfZiti02q/YsSDYttivINit2LDZgSAoQW50aS1EZWxldGUpIjoiQW50aS1EZWxldGUgTWVzc2FnZSBWYXVsdCIsItmF2KrZhtiMINi52YPYs9iMINmI2YrYsyDZiCDZgdin2YrZhCI6IlRleHQsIFBob3RvcywgQXVkaW8gJiBGaWxlcyIsIti22KjYtyDZiCDZgdmI2LHZiNin2LHYryDYqNmE2KfYr9ix2YbaryDZvtuM2KfZhSDZh9in2Iwg2YHYp9uM2YQg2YfYp9iMINiq2LXYp9mI24zYsdiMINmI24zYsyDZh9inINmIINin2LPYqtuM2qnYsdmH2KfbjCDZvtin2qkg2LTYr9mHINiq2YjYs9i3INmF2K7Yp9i32KjYp9mGINiv2LEg2b7bjNmI24wg2KjZhyDYsdio2KfYqiDYr9iz2KrbjNin2LEg2LTYrti124wuIjoiSW1tZWRpYXRlIGNhcHR1cmUgYW5kIGZvcndhcmRpbmcgb2YgZGVsZXRlZCBwcml2YXRlIG1lc3NhZ2VzLCBtZWRpYSwgc3RpY2tlcnMsIGFuZCB2b2ljZSBub3RlcyB0byB5b3VyIGhlbHBlciBib3QuIiwi2LbYqNi3INmIINmB2YjYsdmI2KfYsdivINio2YTYp9iv2LHZhtqvINm+2YrYp9mF4oCM2YfYp9iMINmB2KfZitmE4oCM2YfYp9iMINiq2LXYp9mI2YrYsdiMINmI2YrYs+KAjNmH2Kcg2Ygg2KfYs9iq2YrZg9ix2YfYp9mKINm+2KfZg+KAjNi02K/ZhyDYqtmI2LPYtyDZhdiu2KfYt9io2KfZhiDYr9ixINm+2YrZiNmKINio2Ycg2LHYqNin2Kog2K/Ys9iq2YrYp9ixINi02K7YtdmKLiI6IkltbWVkaWF0ZSBjYXB0dXJlIGFuZCBmb3J3YXJkaW5nIG9mIGRlbGV0ZWQgcHJpdmF0ZSBtZXNzYWdlcywgbWVkaWEsIHN0aWNrZXJzLCBhbmQgdm9pY2Ugbm90ZXMgdG8geW91ciBoZWxwZXIgYm90LiIsItmF2KfZhtmK2KrZiNixINi22K8g2YjZitix2KfZiti0IChBbnRpLUVkaXQpIjoiQW50aS1FZGl0IE1lc3NhZ2UgTW9uaXRvciIsItmF2KrZhiDZgtio2YQg2Ygg2KjYudivINin2K/ZitiqIjoiUHJlLUVkaXQgJiBQb3N0LUVkaXQgRGlmZiIsItii2LTaqdin2LHYs9in2LLbjCDZiCDYp9ix2LPYp9mEINmF2KrZhiDYp9mI2YTbjNmHINm+24zYp9mFINmH2Kcg2YLYqNmEINin2LIg2YjbjNix2KfbjNi0INio2Ycg2YfZhdix2KfZhyDZhtiz2K7ZhyDYp9i12YTYp9itINi02K/ZhyDZiCDYstmF2KfZhiDYr9mC24zZgiDYqNmHINix2KjYp9iqINiv2LPYqtuM2KfYsSDYqNix2KfbjCDYq9io2Kog2KrYp9ix24zYrtqG2YcuIjoiSW5zdGFudCBkZXRlY3Rpb24gb2YgZWRpdGVkIHByaXZhdGUgbWVzc2FnZXMsIHNlbmRpbmcgdGhlIG9yaWdpbmFsIHRleHQgYW5kIHVwZGF0ZWQgZGlmZiB0byB5b3VyIGhlbHBlciBib3QuIiwi2KLYtNmD2KfYsdiz2KfYstmKINmIINin2LHYs9in2YQg2YXYqtmGINin2YjZhNmK2Ycg2b7Zitin2YXigIzZh9inINmC2KjZhCDYp9iyINmI2YrYsdin2YrYtCDYqNmHINmH2YXYsdin2Ycg2YbYs9iu2Ycg2KfYtdmE2KfYreKAjNi02K/ZhyDZiCDYstmF2KfZhiDYr9mC2YrZgiDYqNmHINix2KjYp9iqINiv2LPYqtmK2KfYsSDYqNix2KfZiiDYq9io2Kog2KrYp9ix2YrYrtqG2YcuIjoiSW5zdGFudCBkZXRlY3Rpb24gb2YgZWRpdGVkIHByaXZhdGUgbWVzc2FnZXMsIHNlbmRpbmcgdGhlIG9yaWdpbmFsIHRleHQgYW5kIHVwZGF0ZWQgZGlmZiB0byB5b3VyIGhlbHBlciBib3QuIiwi2KLYsdi024zZiCDYsdiz2KfZhtmHINmH2KcgKEFudGktVFRMKSI6IkFudGktVFRMIE1lZGlhIEFyY2hpdmVyIiwi2KLYsdi02YrZiCDYsdiz2KfZhtmH4oCM2YfYpyAoQW50aS1UVEwpIjoiQW50aS1UVEwgTWVkaWEgQXJjaGl2ZXIiLCLYsdiz2KfZhtmHINmH2KfbjCBWaWV3LU9uY2UiOiJWaWV3LU9uY2UgU2VsZi1EZXN0cnVjdGluZyBNZWRpYSIsItix2LPYp9mG2YfigIzZh9in2YogVmlldy1PbmNlIjoiVmlldy1PbmNlIFNlbGYtRGVzdHJ1Y3RpbmcgTWVkaWEiLCLYsNiu24zYsdmHINmIINmB2YjYsdmI2KfYsdivINmB2YjYsduMINi52qnYsyDZh9inINmIINmI24zYr9uM2YjZh9in24wg2YXYrdmI2LTZiNmG2K/ZhyDZiCDYqtin24zZhdix2K/Yp9ixINiq2YTar9ix2KfZhSDZvtuM2LQg2KfYsiDYs9mI2K7YqtmGINuM2Kcg2YbYp9m+2K/bjNivINi02K/ZhiDYqNinINit2K/Yp9qp2KvYsSDaqduM2YHbjNiqINin2LXZhNuMLiI6IkRvd25sb2FkIGFuZCBhcmNoaXZlIGRpc2FwcGVhcmluZyB2aWV3LW9uY2UgbWVkaWEgYmVmb3JlIGV4cGlyYXRpb24gaW4gdW5jb21wcmVzc2VkIG9yaWdpbmFsIHF1YWxpdHkuIiwi2LDYrtmK2LHZhyDZiCDZgdmI2LHZiNin2LHYryDZgdmI2LHZiiDYudmD2LPigIzZh9inINmIINmI2YrYr9mK2YjZh9in2Yog2YXYrdmI2LTZiNmG2K/ZhyDZiCDYqtin2YrZhdix2K/Yp9ixINiq2YTar9ix2KfZhSDZvtmK2LQg2KfYsiDYs9mI2K7YqtmGINmK2Kcg2YbYp9m+2K/ZitivINi02K/ZhiDYqNinINit2K/Yp9mD2KvYsSDZg9mK2YHZitiqINin2LXZhNmKLiI6IkRvd25sb2FkIGFuZCBhcmNoaXZlIGRpc2FwcGVhcmluZyB2aWV3LW9uY2UgbWVkaWEgYmVmb3JlIGV4cGlyYXRpb24gaW4gdW5jb21wcmVzc2VkIG9yaWdpbmFsIHF1YWxpdHkuIiwi2K3Yp9mE2Kog2LHZiNitINmIINmG2KfZhdix2KbZiiAoR2hvc3QgTW9kZSkiOiJHaG9zdCAmIFN0ZWFsdGggTW9kZSIsItmF2LTYp9mH2K/ZhyDYqNiv2YjZhiDYqtmK2YMg2K/ZiNmFIjoiU2lsZW50IFJlYWQgV2l0aG91dCBTZWVuIFN0YXR1cyIsItmF2LTYp9mH2K/ZhyDZiCDZhdix2YjYsSDZvtuM2KfZhSDZh9in24wg2K/YsduM2KfZgdiq24wg2KjYr9mI2YYg2LPbjNmGINiu2YjYsdiv2YYg2KjYpyDYp9mF2qnYp9mGINmB2LnYp9mEINiz2KfYstuMINin2LIg2b7ZhtmEINuM2Kcg2K/Ys9iq2YjYsSDYqtmE2q/Ysdin2YXbjCI6IkJyb3dzZSBpbmNvbWluZyBwcml2YXRlIG1lc3NhZ2VzIHdpdGhvdXQgdHJpZ2dlcmluZyBzZWVuIGNoZWNrbWFya3MsIHRvZ2dsZWFibGUgdmlhIHBhbmVsIG9yIGluLWNoYXQgY29tbWFuZHMiLCLZhdi02KfZh9iv2Ycg2Ygg2YXYsdmI2LEg2b7Zitin2YXigIzZh9in2Yog2K/YsdmK2KfZgdiq2Yog2KjYr9mI2YYg2LPZitmGINiu2YjYsdiv2YYg2KjYpyDYp9mF2YPYp9mGINmB2LnYp9mE4oCM2LPYp9iy2Yog2KfYsiDZvtmG2YQg2YrYpyDYr9iz2KrZiNixINiq2YTar9ix2KfZhdmKIjoiQnJvd3NlIGluY29taW5nIHByaXZhdGUgbWVzc2FnZXMgd2l0aG91dCB0cmlnZ2VyaW5nIHNlZW4gY2hlY2ttYXJrcywgdG9nZ2xlYWJsZSB2aWEgcGFuZWwgb3IgaW4tY2hhdCBjb21tYW5kcyIsItmF2K/Zitix2YrYqiDYs9mD2YjYqiDZiCDZgdmK2YTYqtixIChNdXRlKSI6IlNpbGVuY2UgRmlsdGVyICYgQXV0by1QdXJnZSIsItm+2KfZg9iz2KfYstmKINiv2YjYt9ix2YHZhyDahtiqIjoiVHdvLVdheSBJbnN0YW50IE1lc3NhZ2UgUHVyZ2UiLCLZhdiz2K/ZiNiv2LPYp9iy24wg2Ygg2K3YsNmBINiu2YjYr9qp2KfYsSDZiCDYotmG24wg2b7bjNin2YUg2YfYp9uMINqp2KfYsdio2LHYp9mGINmF2LLYp9it2YUg2KjYpyDYr9iz2KrZiNixINiq2YTar9ix2KfZhduMIjoiSW5zdGFudGx5IHB1cmdlIGluY29taW5nIG1lc3NhZ2VzIGZyb20gdW53YW50ZWQgc2VuZGVycyBmb3IgYm90aCBwYXJ0aWVzIHVzaW5nIFRlbGVncmFtIGNvbW1hbmQiLCLZhdiz2K/ZiNiv2LPYp9iy2Yog2Ygg2K3YsNmBINiu2YjYr9mD2KfYsSDZiCDYotmG2Yog2b7Zitin2YXigIzZh9in2Yog2YPYp9ix2KjYsdin2YYg2YXYstin2K3ZhSDYqNinINiv2LPYqtmI2LEg2KrZhNqv2LHYp9mF2YoiOiJJbnN0YW50bHkgcHVyZ2UgaW5jb21pbmcgbWVzc2FnZXMgZnJvbSB1bndhbnRlZCBzZW5kZXJzIGZvciBib3RoIHBhcnRpZXMgdXNpbmcgVGVsZWdyYW0gY29tbWFuZCIsItmIINmF2K/Zitix2YrYqiDZitmD2b7Yp9ix2obZhyDYp9iyINi32LHZitmCINm+2YbZhC4iOiJvciB0aGUgd2ViIHBhbmVsLiIsItin2KrZiNmF2KfYs9mK2YjZhiDYp9iz2KrYsdin2K3YqiI6IlJlc3QgSG91cnMgQXV0b21hdGlvbiIsItiq2LrbjNuM2LEg2K7ZiNiv2qnYp9ixINmG2KfZhSDYrtin2YbZiNin2K/ar9uMINio2Ycg2K3Yp9mE2Kog2KfYs9iq2LHYp9it2Kog2Ygg2KjZhyDYqti52YjbjNmCINin2YbYr9in2K7YqtmGINm+24zYp9mFINmH2Kcg2K/YsSDYs9in2LnYp9iqINmF2LTYrti1INi02KjYp9mG2Ycg2KjZhyDYtdmI2LHYqiDYp9iq2YjZhdin2KrbjNqpLiI6IkF1dG9tYXRpY2FsbHkgYXBwZW5kIHNsZWVwIGluZGljYXRvciB0byB5b3VyIHByb2ZpbGUgbmFtZSBhbmQgZGVmZXIgbm90aWZpY2F0aW9ucyBkdXJpbmcgY29uZmlndXJlZCByZXN0IGhvdXJzLiIsItiq2LrZitmK2LEg2K7ZiNiv2YPYp9ixINmG2KfZhSDYrtin2YbZiNin2K/ar9mKINio2Ycg2K3Yp9mE2Kog2KfYs9iq2LHYp9it2Kog2Ygg2KjZhyDYqti52YjZitmCINin2YbYr9in2K7YqtmGINm+2YrYp9mF4oCM2YfYpyDYr9ixINiz2KfYudin2Kog2YXYtNiu2LUg2LTYqNin2YbZhyDYqNmHINi12YjYsdiqINin2KrZiNmF2KfYqtmK2YMuIjoiQXV0b21hdGljYWxseSBhcHBlbmQgc2xlZXAgaW5kaWNhdG9yIHRvIHlvdXIgcHJvZmlsZSBuYW1lIGFuZCBkZWZlciBub3RpZmljYXRpb25zIGR1cmluZyBjb25maWd1cmVkIHJlc3QgaG91cnMuIiwi2KrYp9uM24zYryDYr9mI2YXYsdit2YTZhyDYp9uMIChHb29nbGUgMkZBKSI6IlR3by1GYWN0b3IgQXV0aCAoR29vZ2xlIDJGQSkiLCLYqtin2YrZitivINiv2YjZhdix2K3ZhNmH4oCM2KfZiiAoR29vZ2xlIDJGQSkiOiJUd28tRmFjdG9yIEF1dGggKEdvb2dsZSAyRkEpIiwi2YXYrdin2YHYuNiqINmG2YHZiNiw2YbYp9m+2LDZitixINin2LIg2K3Ys9in2Kgg2b7ZhtmEINmD2KfYsdio2LHZiiDYqNinIEdvb2dsZSBBdXRoZW50aWNhdG9y2Iwg2LHZhdiyINmF2YjZgtiqINu2INix2YLZhdmKINmIINu4INmD2K8g2KjYp9iy2YrYp9io2Yog2KfYtti32LHYp9ix2YouIjoiQnVsbGV0cHJvb2YgYWNjb3VudCBwcm90ZWN0aW9uIHVzaW5nIEdvb2dsZSBBdXRoZW50aWNhdG9yLCAzMHMgcm90YXRpbmcgdG9rZW5zLCBhbmQgOCBkaXNhc3RlciByZWNvdmVyeSBiYWNrdXAgY29kZXMuIiwi2K/Zgdin2Lkg2YHYudin2YQg2YfYp9mG24wg2b7Yp9iqIChIb25leXBvdCkiOiJBY3RpdmUgWmVyby1UcnVzdCBIb25leXBvdCIsItiv2YHYp9i5INmB2LnYp9mEINmH2KfZhtmK4oCM2b7Yp9iqIChIb25leXBvdCkiOiJBY3RpdmUgWmVyby1UcnVzdCBIb25leXBvdCIsItiq2YTZhyDYp9mF2YbZitiq2Yog2Ygg2KjZhNin2YMgSVAiOiJEZWNveSBUcmFwcyAmIEF1dG8gSVAgQmFucyIsItqp2LTZgSDZiCDZhdmH2KfYsSDYp9iz2qnZhtix2YfYp9uMINmF2K7YsdioINix2YjbjCDYsdmI2Kog2YfYp9uMINit2LPYp9iz2Iwg2YXYs9iv2YjYr9iz2KfYstuMINii2YbbjCBJUCDZhtmB2YjYsNqv2LEg2Ygg2KfYsdiz2KfZhCDar9iy2KfYsdi0INit2YXZhNmHINio2Ycg2LHYqNin2Kog2KrZhNqv2LHYp9mFLiI6IkRldGVjdCBhbmQgYmFuIHZ1bG5lcmFiaWxpdHkgc2Nhbm5lcnMgb24gc2Vuc2l0aXZlIHBhdGhzLCBpbnN0YW50bHkgYmxhY2tsaXN0aW5nIGhvc3RpbGUgSVBzIGFuZCBhbGFybWluZyB5b3VyIGJvdC4iLCLZg9i02YEg2Ygg2YXZh9in2LEg2KfYs9mD2YbYsdmH2KfZiiDZhdiu2LHYqCDYsdmI2Yog2LHZiNiq4oCM2YfYp9mKINit2LPYp9iz2Iwg2YXYs9iv2YjYr9iz2KfYstmKINii2YbZiiBJUCDZhtmB2YjYsNqv2LEg2Ygg2KfYsdiz2KfZhCDar9iy2KfYsdi0INit2YXZhNmHINio2Ycg2LHYqNin2Kog2KrZhNqv2LHYp9mFLiI6IkRldGVjdCBhbmQgYmFuIHZ1bG5lcmFiaWxpdHkgc2Nhbm5lcnMgb24gc2Vuc2l0aXZlIHBhdGhzLCBpbnN0YW50bHkgYmxhY2tsaXN0aW5nIGhvc3RpbGUgSVBzIGFuZCBhbGFybWluZyB5b3VyIGJvdC4iLCLZiNuM2LLYp9ix2K8g2LHYp9mHINin2YbYr9in2LLbjCDYqtit2Kog2YjYqCAoL3NldHVwKSI6IldlYiBTZXR1cCBXaXphcmQgKC9zZXR1cCkiLCLZiNmK2LLYp9ix2K8g2LHYp9mH4oCM2KfZhtiv2KfYstmKINiq2K3YqiDZiNioICgvc2V0dXApIjoiV2ViIFNldHVwIFdpemFyZCAoL3NldHVwKSIsItio2K/ZiNmGINmD2K/ZhtmI2YrYs9mKIjoiWmVybyBDb2RpbmcgUmVxdWlyZWQiLCLYsdin2YfZhtmF2KfbjCDYrNin2YXYuSDYqti52KfZhdmE24wg27Ug2YXYsdit2YTZhyDYp9uMINio2LHYp9uMINiv2LHbjNin2YHYqiBBUEkg2qnZhNuM2K/Zh9in2Iwg2KfbjNis2KfYryDYs9i02YYg2KrZhNqv2LHYp9mFINmIINix2KfZhyDYp9mG2K/Yp9iy24wg2KLYs9in2YYg2Ygg2KjYr9mI2YYg2KrYsdmF24zZhtin2YQuIjoiU3RlcC1ieS1zdGVwIGludGVyYWN0aXZlIDUtc3RhZ2UgbGF1bmNoZXIgdG8gZ2VuZXJhdGUga2V5cywgdGVzdCBib3QgdG9rZW5zLCBhbmQgZGVwbG95IHdpdGhvdXQgdGVybWluYWwgc2tpbGxzLiIsItix2KfZh9mG2YXYp9mKINis2KfZhdi5INiq2LnYp9mF2YTZiiDbtSDZhdix2K3ZhNmH4oCM2KfZiiDYqNix2KfZiiDYr9ix2YrYp9mB2KogQVBJINmD2YTZitiv2YfYp9iMINin2YrYrNin2K8g2LPYtNmGINiq2YTar9ix2KfZhSDZiCDYsdin2YfigIzYp9mG2K/Yp9iy2Yog2KLYs9in2YYg2Ygg2KjYr9mI2YYg2KrYsdmF2YrZhtin2YQuIjoiU3RlcC1ieS1zdGVwIGludGVyYWN0aXZlIDUtc3RhZ2UgbGF1bmNoZXIgdG8gZ2VuZXJhdGUga2V5cywgdGVzdCBib3QgdG9rZW5zLCBhbmQgZGVwbG95IHdpdGhvdXQgdGVybWluYWwgc2tpbGxzLiIsItiz2YrYs9iq2YUg2KfYsdiq2YLYpyDYqNmHINmF2K/ZitixIChSb2xlIFN5c3RlbSkiOiJSb2xlIE1hbmFnZW1lbnQgJiBQcm9tb3Rpb24iLCLYp9ix2KrZgtinIC8g2KrZhtiy2YQg2KLZhtmKIjoiSW5zdGFudCBQcm9tb3RlIC8gRGVtb3RlIiwi2KfZhdmD2KfZhiDYp9ix2KrZgtin2Yog2YXYs9iq2YLZitmFINmD2KfYsdio2LHYp9mGINio2Ycg2YXYr9mK2LEg2LPZitiz2KrZhSDZitinINiq2YbYstmEINio2Ycg2YPYp9ix2KjYsSDYudin2K/ZiiDYr9ixINis2K/ZiNmEINmD2KfYsdio2LHYp9mGINmIINm+2YbZhCDYqNin2LLYsdizINio2Kcg2KrYp9mK2YrYryDYp9mF2YbZitiq2YouIjoiUHJvbW90ZSB1c2VycyB0byBBZG1pbmlzdHJhdG9yIG9yIGRlbW90ZSB0byBzdGFuZGFyZCBzdWJzY3JpYmVyIHdpdGggaW5zdGFudCBwZXJtaXNzaW9uIHN5bmMuIiwi2K/Yp9i02KjZiNix2K8g2YXYp9mG2YrYqtmI2LHZitmG2q8gKC9hZG1pbikiOiJBZG1pbiBDb21tYW5kIENlbnRlciAoL2FkbWluKSIsItmF2LTYp9mH2K/ZhyDYotmF2KfYsdmH2KfbjCDYstmG2K/ZhyDYr9uM2KrYp9io24zYs9iMINmG2LHYriDYsdin24zYqiDZh9in2Iwg2LPYtNmGINmH2KfbjCDZgdi52KfZhNiMINiu2LfYp9mH2KfbjCDYq9io2Kog2LTYr9mHINmIINmI2LbYuduM2Kog2LHYqNin2Kog2YfYp9uMINqp2YXaqduMINiv2LEg2LXZgdit2Ycg2YXYrNiy2KcuIjoiUmVhbC10aW1lIGRhdGFiYXNlIGFuYWx5dGljcywgYWN0aXZlIHNlc3Npb25zLCBlcnJvciB0ZWxlbWV0cnksIGFuZCBoZWxwZXIgYm90IHN0YXR1cyBvbiBhbiBpc29sYXRlZCBhZG1pbiBkYXNoYm9hcmQuIiwi2YXYtNin2YfYr9mHINii2YXYp9ix2YfYp9mKINiy2YbYr9mHINiv2YrYqtin2KjZitiz2Iwg2YbYsdiuINix2KfZitiq4oCM2YfYp9iMINiz2LTZhuKAjNmH2KfZiiDZgdi52KfZhNiMINiu2LfYp9mH2KfZiiDYq9io2KrigIzYtNiv2Ycg2Ygg2YjYtti52YrYqiDYsdio2KfYquKAjNmH2KfZiiDZg9mF2YPZiiDYr9ixINi12YHYrdmHINmF2KzYstinLiI6IlJlYWwtdGltZSBkYXRhYmFzZSBhbmFseXRpY3MsIGFjdGl2ZSBzZXNzaW9ucywgZXJyb3IgdGVsZW1ldHJ5LCBhbmQgaGVscGVyIGJvdCBzdGF0dXMgb24gYW4gaXNvbGF0ZWQgYWRtaW4gZGFzaGJvYXJkLiIsItmF2YjYqtmI2LEg2LDYrtuM2LHZhyDYs9in2LLbjCDZh9uM2KjYsduM2K8gRDEgKyBLViI6Ikh5YnJpZCBTdG9yYWdlIEVuZ2luZSAoRDEgKyBLVikiLCLZhdmI2KrZiNixINiw2K7Zitix2YfigIzYs9in2LLZiiDZh9mK2KjYsdmK2K8gRDEgKyBLViI6Ikh5YnJpZCBTdG9yYWdlIEVuZ2luZSAoRDEgKyBLVikiLCLbsduw27As27DbsNuwINix2KfZitiqIEQxINix2YjYstin2YbZhyI6IjEwMCwwMDAgRnJlZSBEYWlseSBEMSBXcml0ZXMiLCLYqNmH2LHZhyDar9uM2LHbjCDZh9mF2LLZhdin2YYg2KfYsiBDbG91ZGZsYXJlIEQxINmIIEtWINmH2YXYsdin2Ycg2KjYpyDaqdi0INix2YUg2YfZiNi02YXZhtivINis2YfYqiDYqNmHINi12YHYsSDYsdiz2KfZhtiv2YYg2KfYs9iq2YfZhNin2qkg2K/bjNiq2KfYqNuM2LMg2KjYr9mI2YYg2YXYtdix2YEg2KfYttin2YHZhy4iOiJDb21iaW5lcyBDbG91ZGZsYXJlIEQxIGFuZCBLViB3aXRoIGludGVsbGlnZW50IFJBTSBjYWNoaW5nIHRvIGVsaW1pbmF0ZSByZWR1bmRhbnQgZGF0YWJhc2UgcXVvdGEgd2Vhci4iLCLYqNmH2LHZh+KAjNqv2YrYsdmKINmH2YXYstmF2KfZhiDYp9iyIENsb3VkZmxhcmUgRDEg2YggS1Yg2YfZhdix2KfZhyDYqNinINmD2LQg2LHZhSDZh9mI2LTZhdmG2K8g2KzZh9iqINio2Ycg2LXZgdixINix2LPYp9mG2K/ZhiDYp9iz2KrZh9mE2KfZgyDYr9mK2KrYp9io2YrYsyDYqNiv2YjZhiDZhdi12LHZgSDYp9i22KfZgdmHLiI6IkNvbWJpbmVzIENsb3VkZmxhcmUgRDEgYW5kIEtWIHdpdGggaW50ZWxsaWdlbnQgUkFNIGNhY2hpbmcgdG8gZWxpbWluYXRlIHJlZHVuZGFudCBkYXRhYmFzZSBxdW90YSB3ZWFyLiIsItin2YbYqNin2LEg2YTYp9uM2LPZhtizINmIINix2K/bjNmFINqp2K8gKExpY2Vuc2UgVmF1bHQpIjoiTGljZW5zZSBLZXkgSW52ZW50b3J5IFZhdWx0Iiwi2KfZhtio2KfYsSDZhNin2YrYs9mG2LMg2Ygg2LHYr9mK2YXigIzZg9ivIChMaWNlbnNlIFZhdWx0KSI6IkxpY2Vuc2UgS2V5IEludmVudG9yeSBWYXVsdCIsItmF2K/Zitix2YrYqiDYp9i52KrYqNin2LEg2Ygg2KrYp9ix2YrYriDYp9mG2YLYttinIjoiU3Vic2NyaXB0aW9uICYgRXhwaXJ5IFRyYWNraW5nIiwi2KrZiNmE24zYr9iMINin2KjYt9in2YQg2Ygg2LHYtdivINqp2K/Zh9in24wg2KfYtNiq2LHYp9qpINmF2K/YqiDYr9in2LEg2KjYpyDZgdix2YXYqiDYp9iz2KrYp9mG2K/Yp9ix2K8gQVJJWk8tWFhYWNiMINiq2K7YtduM2LUg2YXYs9iq2YLbjNmFINio2Ycg2qnYp9ix2KjYsdin2YYg2Ygg2YXYr9uM2LHbjNiqINmF2KfZhNuMINin2LTYqtix2KfaqSDZh9inLiI6IkdlbmVyYXRlLCByZXZva2UsIGFuZCB0cmFjayBzdGFuZGFyZGl6ZWQgQVJJWk8tWFhYWCBsaWNlbnNlIGtleXMsIGFzc2lnbmluZyBwbGFuIHRpZXJzIGFuZCBtYW5hZ2luZyBzdWJzY3JpcHRpb25zLiIsItiq2YjZhNmK2K/YjCDYp9io2LfYp9mEINmIINix2LXYryDZg9iv2YfYp9mKINin2LTYqtix2KfZgyDZhdiv2KrigIzYr9in2LEg2KjYpyDZgdix2YXYqiDYp9iz2KrYp9mG2K/Yp9ix2K8gQVJJWk8tWFhYWNiMINiq2K7YtdmK2LUg2YXYs9iq2YLZitmFINio2Ycg2YPYp9ix2KjYsdin2YYg2Ygg2YXYr9mK2LHZitiqINmF2KfZhNmKINin2LTYqtix2KfZg+KAjNmH2KcuIjoiR2VuZXJhdGUsIHJldm9rZSwgYW5kIHRyYWNrIHN0YW5kYXJkaXplZCBBUklaTy1YWFhYIGxpY2Vuc2Uga2V5cywgYXNzaWduaW5nIHBsYW4gdGllcnMgYW5kIG1hbmFnaW5nIHN1YnNjcmlwdGlvbnMuIiwi2YXZitmG2Yog2KfZvtmE2YrZg9mK2LTZhiDYqtmE2q/Ysdin2YUgKFRlbGVncmFtIFdlYkFwcCkiOiJUZWxlZ3JhbSBNaW5pIEFwcCAoV2ViQXBwKSIsItmI2LHZiNivINmF2LPYqtmC2YrZhSBTU08iOiJTZWFtbGVzcyBTU08gQXV0aGVudGljYXRpb24iLCLYr9iz2KrYsdiz24wg2KrZhdin2YUg2LnbjNin2LEg2Ygg2YXYr9uM2LHbjNiqINiz2YTZgSDYqNin2Kog2YXYs9iq2YLbjNmF2KfZiyDYp9iyINiv2LHZiNmGINmF2K3bjNi3INiq2YTar9ix2KfZhSDYqNinINmI2LHZiNivINiu2YjYr9qp2KfYsSDYp9mF2YYg2Ygg2YfZhdin2YfZhtqv24wg2qnYp9mF2YQg2KjYpyDYqtmFINiq2YTar9ix2KfZhS4iOiJGdWxsLWZlYXR1cmVkIHNlbGZib3QgbWFuYWdlbWVudCByaWdodCBpbnNpZGUgVGVsZWdyYW0gd2l0aCBhdXRvbWF0aWMgc2luZ2xlLXNpZ24tb24gYW5kIHRoZW1lIG1hdGNoaW5nLiIsItiv2LPYqtix2LPZiiDYqtmF2KfZheKAjNi52YrYp9ixINmIINmF2K/Zitix2YrYqiDYs9mE2YHigIzYqNin2Kog2YXYs9iq2YLZitmF2KfZiyDYp9iyINiv2LHZiNmGINmF2K3Ziti3INiq2YTar9ix2KfZhSDYqNinINmI2LHZiNivINiu2YjYr9mD2KfYsSDYp9mF2YYg2Ygg2YfZhdin2YfZhtqv2Yog2YPYp9mF2YQg2KjYpyDYqtmFINiq2YTar9ix2KfZhS4iOiJGdWxsLWZlYXR1cmVkIHNlbGZib3QgbWFuYWdlbWVudCByaWdodCBpbnNpZGUgVGVsZWdyYW0gd2l0aCBhdXRvbWF0aWMgc2luZ2xlLXNpZ24tb24gYW5kIHRoZW1lIG1hdGNoaW5nLiIsIti52K/ZhSDZhtmF2KfZiti0INiu2YjYr9mD2KfYsSDYr9ixINiv2YHYudin2Kog2KjYudiv2YoiOiJEbyBub3Qgc2hvdyBhdXRvbWF0aWNhbGx5IGFnYWluIiwi2YjbjNiy2KfYsdivINix2KfZhyDYp9mG2K/Yp9iy24wgKC9zZXR1cCkiOiJTZXR1cCBXaXphcmQgKC9zZXR1cCkiLCLZiNmK2LLYp9ix2K8g2LHYp9mH4oCM2KfZhtiv2KfYstmKICgvc2V0dXApIjoiU2V0dXAgV2l6YXJkICgvc2V0dXApIiwi2YjYsdmI2K8g2KjZhyDYp9iz2KrZiNiv2YrZiCI6IkVudGVyIFN0dWRpbyIsIuKame+4jyDYqtmG2LjZitmF2KfYqiDZiCDYp9mF2YbZitiqINit2LPYp9ioIEFyaXpvIFNlbGYiOiLimpnvuI8gQWNjb3VudCBTZXR0aW5ncyAmIFNlY3VyaXR5Iiwi2KrZhti42YrZhdin2Kog2Ygg2YXYr9mK2LHZitiqINit2LPYp9ioINmD2KfYsdio2LHZiiI6IkFjY291bnQgU2V0dGluZ3MgJiBNYW5hZ2VtZW50Iiwi8J+On++4jyDYqtmF2K/bjNivINin2LnYqtio2KfYsSDYqNinINix2K/bjNmFINqp2K8g2KzYr9uM2K8gQXJpem8iOiLwn46f77iPIEV4dGVuZCBTdWJzY3JpcHRpb24gd2l0aCBMaWNlbnNlIEtleSIsIvCfjp/vuI8g2KrZhdiv2YrYryDYp9i52KrYqNin2LEg2KjYpyDYsdiv2YrZheKAjNmD2K8g2KzYr9mK2K8gQXJpem8iOiLwn46f77iPIEV4dGVuZCBTdWJzY3JpcHRpb24gd2l0aCBMaWNlbnNlIEtleSIsItiq2YXYr9mK2K8g2Ygg2KfYsdiq2YLYp9mKINin2LTYqtix2KfZgyDYqNinINmE2KfZitiz2YbYsyI6IkV4dGVuZCBTdWJzY3JpcHRpb24gd2l0aCBMaWNlbnNlIiwi2KrZhdiv2YrYryDZiCDYtNin2LHamCDYp9i02KrYsdin2YMiOiJBcHBseSAmIEV4dGVuZCBTdWJzY3JpcHRpb24iLCLYq9io2Kog2Ygg2KrZhdiv2YrYryDYp9i02KrYsdin2YMiOiJBcHBseSAmIEV4dGVuZCIsIvCflJEg2KrYutmK2YrYsSDYsdmF2LIg2LnYqNmI2LEg2YjYsdmI2K8iOiLwn5SRIENoYW5nZSBBY2NvdW50IFBhc3N3b3JkIiwi2KrYutmK2YrYsSDYsdmF2LIg2LnYqNmI2LEg2YjYsdmI2K8g2KjZhyDZvtmG2YQiOiJDaGFuZ2UgQWNjb3VudCBQYXNzd29yZCIsItix2YXYsiDYudio2YjYsSDZgdi52YTZiiI6IkN1cnJlbnQgUGFzc3dvcmQiLCLYsdmF2LIg2LnYqNmI2LEg2KzYr9mK2K8gKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiTmV3IFBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLYsdmF2LIg2LnYqNmI2LEg2KzYr9mK2K8iOiJOZXcgUGFzc3dvcmQiLCLYq9io2Kog2LHZhdiyINi52KjZiNixINis2K/ZitivIjoiVXBkYXRlIFBhc3N3b3JkIiwi2KjYsdmI2LLYsdiz2KfZhtmKINix2YXYsiDYudio2YjYsSI6IlVwZGF0ZSBQYXNzd29yZCIsIvCfl5HvuI8g2K3YsNmBINqp2KfZhdmEINit2LPYp9ioINqp2KfYsdio2LHbjCDZiCDYqtmF2KfZhSDYr9in2K/ZhyDZh9inIjoi8J+Xke+4jyBQZXJtYW5lbnRseSBEZWxldGUgQWNjb3VudCAmIEFsbCBEYXRhIiwi8J+Xke+4jyDYrdiw2YEg2YPYp9mF2YQg2K3Ys9in2Kgg2YPYp9ix2KjYsdmKINmIINiq2YXYp9mFINiv2KfYr9mH4oCM2YfYpyI6IvCfl5HvuI8gUGVybWFuZW50bHkgRGVsZXRlIEFjY291bnQgJiBBbGwgRGF0YSIsItit2LDZgSDYr9in2KbZhdmKINit2LPYp9ioINmD2KfYsdio2LHZiiI6IlBlcm1hbmVudGx5IERlbGV0ZSBBY2NvdW50Iiwi2KvYqNiqINmG2KfZhToiOiJSZWdpc3RlcmVkOiIsItmD2K8g2YTYp9mK2LPZhtizOiI6IkxpY2Vuc2UgQ29kZToiLCLwn5KhINiq2YXYp9mF24wg2KrYutuM24zYsdin2Kog2KjZhNin2YHYp9i12YTZhyDYr9ixINit2KfZgdi42YcgRWRnZSBDbG91ZGZsYXJlINiw2K7bjNix2Ycg2Ygg2KfYudmF2KfZhCDZhduMINqv2LHYr9mG2K8uIjoi8J+SoSBBbGwgY2hhbmdlcyBhcmUgaW1tZWRpYXRlbHkgc3RvcmVkIGFuZCBwcm9wYWdhdGVkIGFjcm9zcyBDbG91ZGZsYXJlIEVkZ2UuIiwi8J+SoSDYqtmF2KfZhdmKINiq2LrZitmK2LHYp9iqINio2YTYp9mB2KfYtdmE2Ycg2K/YsSDYrdin2YHYuNmHIEVkZ2UgQ2xvdWRmbGFyZSDYsNiu2YrYsdmHINmIINin2LnZhdin2YQg2YXZiuKAjNqv2LHYr9mG2K8uIjoi8J+SoSBBbGwgY2hhbmdlcyBhcmUgaW1tZWRpYXRlbHkgc3RvcmVkIGFuZCBwcm9wYWdhdGVkIGFjcm9zcyBDbG91ZGZsYXJlIEVkZ2UuIiwiU3dpdGNoIExhbmd1YWdlIC8g2KrYutmK2YrYsSDYstio2KfZhiI6IlN3aXRjaCBMYW5ndWFnZSAvINiq2LrbjNuM2LEg2LLYqNin2YYiLCLYqti62YrZitixINit2KfZhNiqINi02Kgg2Ygg2LHZiNiyIjoiVG9nZ2xlIERhcmsgLyBMaWdodCBNb2RlIiwi2LHYp9mH2YbZhdin24wg2KzYp9mF2Lkg2KfZhdqp2KfZhtin2Kog2Ygg2LPYsdmI24zYsyDZh9in24wg2LPYp9mF2KfZhtmHIEFyaXpvIFNlbGYiOiJBcml6byBTZWxmIENvbXBsZXRlIEZlYXR1cmUgVG91ciAmIFNlcnZpY2UgR3VpZGUiLCLYsdin2YfZhtmF2KfZiiDYrNin2YXYuSDYp9mF2YPYp9mG2KfYqiDZiCDYs9ix2YjZitiz4oCM2YfYp9mKINiz2KfZhdin2YbZhyBBcml6byBTZWxmIjoiQXJpem8gU2VsZiBDb21wbGV0ZSBGZWF0dXJlIFRvdXIgJiBTZXJ2aWNlIEd1aWRlIiwi2YjYsdmI2K8g2KjZhyDZvtmG2YQg2YXYr9mK2LHZitiqINin2LHYtNivINmIINmF2KfZhtmK2KrZiNix2YrZhtqvIjoiRW50ZXIgQWRtaW4gQ29tbWFuZCBDZW50ZXIgJiBNb25pdG9yaW5nIiwi2KrZhti42YrZhdin2Kog2K3Ys9in2KgiOiJBY2NvdW50IFNldHRpbmdzIiwi2YXYq9in2YQ6INux27UgKNiq2LnYr9in2K8g2LHZiNiyINin2LnYqtio2KfYsSDZhNin2YrYs9mG2LMpIjoiZS5nLiAxNSAoVmFsaWRpdHkgZGF5cykiLCLwn5SNINis2LPYqtis2Ygg2KjYsSDYp9iz2KfYsyDZhtin2YUg2YPYp9ix2KjYsdmK2Iwg2LTZhtin2LPZhyDYqtmE2q/Ysdin2YUg2YrYpyDYsdio2KfYqi4uLiI6IvCflI0gU2VhcmNoIGJ5IHVzZXJuYW1lLCBUZWxlZ3JhbSBJRCBvciBib3QuLi4iLCLYp9ix2KrZgtin2Yog2YrZgyDZg9in2LHYqNixINio2Ycg2YXYr9mK2LEg2LPYp9mF2KfZhtmHIjoiUHJvbW90ZSBhIHVzZXIgdG8gc3lzdGVtIGFkbWluaXN0cmF0b3IiLCLYqtin2LLZhyDYs9in2LLbjCDZhNuM2LPYqiI6IlJlZnJlc2ggRGlyZWN0b3J5Iiwi2KrYp9iy2YfigIzYs9in2LLZiiDZhNmK2LPYqiI6IlJlZnJlc2ggRGlyZWN0b3J5Iiwi2YbYp9mFINmD2KfYsdio2LHZiiDYtNmF2KcgKNmF2KvYp9mEOiBhbWlybWFzdGVyKSI6IllvdXIgdXNlcm5hbWUgKGUuZy4gYWxleF92aXApIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYtNmF2KcgKNmF2KvZhNin2YsgYWxleF92aXApIjoiWW91ciB1c2VybmFtZSAoZS5nLiBhbGV4X3ZpcCkiLCLYsdmF2LIg2LnYqNmI2LEg2K3Ys9in2Kgg2YPYp9ix2KjYsdmKICjigKLigKLigKLigKLigKLigKLigKLigKIpIjoiQWNjb3VudCBwYXNzd29yZCAo4oCi4oCi4oCi4oCi4oCi4oCi4oCi4oCiKSIsItqp2K8g2YTYp9uM2LPZhtizINmB2LnYp9mEINiz2KfYstuMICjZhdir2KfZhDogQVJJWk8tWFhYWC1YWFhYLVhYWFgpIjoiQWN0aXZhdGlvbiBsaWNlbnNlIGtleSAoZS5nLiBBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLZg9ivINmE2KfZitiz2YbYsyDZgdi52KfZhOKAjNiz2KfYstmKICjZhdir2KfZhDogQVJJWk8tWFhYWC1YWFhYLVhYWFgpIjoiQWN0aXZhdGlvbiBsaWNlbnNlIGtleSAoZS5nLiBBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLZg9ivINmE2KfZitiz2YbYsyDYrtix2YrYr9in2LHZiiDYtNiv2YcgKEFSSVpPLVhYWFgtWFhYWC1YWFhYKSI6IkxpY2Vuc2Uga2V5IChBUklaTy1YWFhYLVhYWFgtWFhYWCkiLCLZhtin2YUg2YPYp9ix2KjYsdmKINiv2YTYrtmI2KfZhyAo2YXYq9in2YQ6IGFtaXJfdmlwKSI6IkRlc2lyZWQgdXNlcm5hbWUgKGUuZy4gYWxleF92aXApIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYr9mE2K7ZiNin2YcgKNit2LHZiNmBINin2Ybar9mE2YrYs9mKINmIINin2LnYr9in2K8pIjoiQ2hvb3NlIHVzZXJuYW1lIChhbHBoYW51bWVyaWMpIiwi2LHZhdiyINi52KjZiNixINin2YXZhiDZiCDZgtmI2YogKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiU3Ryb25nIFBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLYrdiv2KfZgtmEINu4INmD2KfYsdin2YPYqtixIjoiQXQgbGVhc3QgOCBjaGFyYWN0ZXJzIiwi2KrZg9ix2KfYsSDZhdis2K/YryDYsdmF2LIg2LnYqNmI2LEg2KzZh9iqINin2LfZhdmK2YbYp9mGIjoiUmUtZW50ZXIgeW91ciBwYXNzd29yZCIsItix2YXYsiDYudio2YjYsSDYsdinINmF2KzYr9iv2KfZiyDZiNin2LHYryDZhtmF2KfZitmK2K8iOiJSZS1lbnRlciB5b3VyIHBhc3N3b3JkIiwi2YPYryDZhNin2YrYs9mG2LMg2KzYr9mK2K8g2KzZh9iqINiu2LHZiNisINin2LIg2KrYudmE2YrZgiAo2YXYq9in2YQ6IEFSSVpPLVhYWFgtWFhYWC1YWFhYKSI6IlJlbmV3YWwgbGljZW5zZSBrZXkgKGUuZy4gQVJJWk8tWFhYWC1YWFhYLVhYWFgpIiwi2YTYp9uM2LPZhtizINmB2LnYp9mEINiz2KfYstuMINis2K/bjNivLi4uIjoiTmV3IHJlbmV3YWwgbGljZW5zZSBrZXkuLi4iLCLZhNin2YrYs9mG2LMg2YHYudin2YTigIzYs9in2LLZiiDYrNiv2YrYry4uLiI6Ik5ldyByZW5ld2FsIGxpY2Vuc2Uga2V5Li4uIiwi2LTZhdin2LHZhyDZh9mF2LHYp9mHINio2Kcg2b7bjNi0INi02YXYp9ix2Ycg2qnYtNmI2LEgKNmF2KvYp9mEOiA5ODkxMjM0NTY3ODkrKSI6IlBob25lIG51bWJlciB3aXRoIGNvdW50cnkgY29kZSAoZS5nLiArMTQxNTU1NTI2NzEpIiwi2LTZhdin2LHZhyDZh9mF2LHYp9mHINio2Kcg2b7Ziti04oCM2LTZhdin2LHZhyDZg9i02YjYsSAo2YXYq9in2YQ6IDk4OTEyMzQ1Njc4OSspIjoiUGhvbmUgbnVtYmVyIHdpdGggY291bnRyeSBjb2RlIChlLmcuICsxNDE1NTU1MjY3MSkiLCIrOTg5MTIzNDU2Nzg5INmK2KcgKzE0MTU1NTUyNjcxIjoiKzE0MTU1NTUyNjcxIG9yICs5ODkxMjM0NTY3ODkiLCLZg9ivINu1INix2YLZhdmKINin2LHYs9in2YTZiiDYp9iyINiq2YTar9ix2KfZhSAo2YXYq9in2YQ6IDU4MjkxKSI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUgKGUuZy4gNTgyOTEpIiwi2YPYryDbtSDYsdmC2YXZiiDYr9ix2YrYp9mB2KrZiiI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUiLCLYsdmF2LIg2KrYo9uM24zYryDYr9mI2YXYsdit2YTZhyDYp9uMICjYr9ixINi12YjYsdiqINmB2LnYp9mEINio2YjYr9mGIDJGQSkiOiIyRkEgUGFzc3dvcmQgKGlmIGVuYWJsZWQgb24gYWNjb3VudCkiLCLYsdmF2LIg2KrYo9mK2YrYryDYr9mI2YXYsdit2YTZh+KAjNin2YogKNiv2LEg2LXZiNix2Kog2YHYudin2YQg2KjZiNiv2YYgMkZBKSI6IjJGQSBQYXNzd29yZCAoaWYgZW5hYmxlZCBvbiBhY2NvdW50KSIsItiv2LEg2LXZiNix2Kog2K/Yp9i02KrZhiDYsdmF2LIg2K/ZiCDZhdix2K3ZhNmHINin24wg2YjYp9ix2K8g2qnZhtuM2K8iOiJFbnRlciAyRkEgcGFzc3dvcmQgaWYgZW5hYmxlZCIsItiv2LEg2LXZiNix2Kog2K/Yp9i02KrZhiDYsdmF2LIg2K/ZiCDZhdix2K3ZhNmH4oCM2KfZiiDZiNin2LHYryDZg9mG2YrYryI6IkVudGVyIDJGQSBwYXNzd29yZCBpZiBlbmFibGVkIiwi2LHYtNiq2Ycg2LfZiNmE2KfZhtmKIFN0cmluZ1Nlc3Npb24g2KrZhNqv2LHYp9mFINiu2YjYryDYsdinINin2YrZhtis2Kcg2YjYp9ix2K8g2YPZhtmK2K8gKFB5cm9ncmFtINmK2KcgVGVsZXRob24vR3JhbUpTKS4uLiI6IlBhc3RlIHlvdXIgVGVsZWdyYW0gU3RyaW5nU2Vzc2lvbiBoZXJlIChQeXJvZ3JhbSBvciBUZWxldGhvbi9HcmFtSlMpLi4uIiwiMUJKV2FwMXdCLi4uINmK2KcgMUFwV2FwLi4uIjoiMUJKV2FwMXdCLi4uIG9yIDFBcFdhcC4uLiIsItm+2YrYtNmI2YbYryDYs9in2LnYqiAo2YXYq9mE2KfZizogWyDZitinIHwg2YrYpyDimqEpIjoiQ2xvY2sgcHJlZml4IChlLmcuIFsgb3IgfCBvciDimqEpIiwi2b7Ys9mI2YbYryDYs9in2LnYqiAo2YXYq9mE2KfZizogXSDZitinIOKaoSDZitinIFZJUCkiOiJDbG9jayBzdWZmaXggKGUuZy4gXSBvciDimqEgb3IgVklQKSIsItux27Ag2LHZgtmFINiv2YTYrtmI2KfZhyDYp9iyINuwINiq2Kcg27kg2KjZhyDYqtix2KrZitioICjZhdir2KfZhDog27Dbsduy27PbtNu127bbt9u427kpIjoiMTAgY3VzdG9tIGRpZ2l0cyBmcm9tIDAgdG8gOSAoZS5nLiAwMTIzNDU2Nzg5KSIsItmC2KfZhNioINio2YrZiNqv2LHYp9mB2YogKNmF2KvYp9mEOiDij7Mge3RpbWV9IHwg8J+ThSB7ZGF0ZX0gfCDimqEgQXJpem8gUHJvKSI6IkJpbyB0ZW1wbGF0ZSAoZS5nLiDij7Mge3RpbWV9IHwg8J+ThSB7ZGF0ZX0gfCDimqEgQXJpem8gUHJvKSIsItmF2KrZhiDZvtin2LPYriDYrtmI2K/Zg9in2LEg2YXZhti02YogKNmF2KvYp9mEOiDYr9ix2YjYryEg2K/YsSDYrdin2YQg2K3Yp9i22LEg2KfZhdmD2KfZhiDZvtin2LPYrtqv2YjZitmKINmG2K/Yp9ix2YUuINio2Ycg2YXYrdi2INii2YbZhNin2YrZhiDYtNiv2YYg2b7Yp9iz2K4g2K7ZiNin2YfZhSDYr9in2K8g4o+zKSI6IkF3YXkgcmVwbHkgdGV4dCAoZS5nLiBIZWxsbyEgQ3VycmVudGx5IGF3YXksIHdpbGwgcmVwbHkgYXMgc29vbiBhcyBvbmxpbmUg4o+zKSIsItii24zYr9uMINmH2KfbjCDYudiv2K/bjCDbjNinINuM2YjYstix2YbbjNmFINmH2KfbjCDYqtmE2q/Ysdin2YUg2KjYpyDaqdin2YXYpyAo2YXYq9in2YQ6IDEyMzQ1Njc4OSwgQHVzZXJuYW1lLCA5ODc2NTQzMjEpIjoiVGVsZWdyYW0gSURzIG9yIHVzZXJuYW1lcyBzZXBhcmF0ZWQgYnkgY29tbWEgKGUuZy4gMTIzNDU2Nzg5LCBAdXNlcikiLCLYotmK2K/ZiuKAjNmH2KfZiiDYudiv2K/ZiiDZitinINmK2YjYstix2YbZitmF4oCM2YfYp9mKINiq2YTar9ix2KfZhSDYqNinINmD2KfZhdinICjZhdir2KfZhDogMTIzNDU2Nzg5LCBAdXNlcm5hbWUsIDk4NzY1NDMyMSkiOiJUZWxlZ3JhbSBJRHMgb3IgdXNlcm5hbWVzIHNlcGFyYXRlZCBieSBjb21tYSAoZS5nLiAxMjM0NTY3ODksIEB1c2VyKSIsItmF2KrZhiDZhtin2YUg2K7Yp9mG2YjYp9iv2q/ZiiDYr9ixINiu2YjYp9ioICjZhdir2KfZhDog8J+YtCBTbGVlcCDZitinIPCfjJkg2K7ZiNin2KjZitiv2YUpIjoiU2xlZXAgc3RhdHVzIG5hbWUgdGV4dCAoZS5nLiDwn5i0IFNsZWVwKSIsItii24zYr9uMINi52K/Yr9uMINuM2Kcg24zZiNiy2LHZhtuM2YUg2KfZgdix2KfYr9uMINqp2Ycg2YXbjCDYrtmI2KfbjNivINiq24zaqSDYotio24wg2KjYsdin24zYtNmI2YYg2YHYudin2YQg2KjZhdmI2YbZhyAo2KjYpyDaqdin2YXYpyDYrNiv2Kcg2qnZhtuM2K8pIjoiVGVsZWdyYW0gSURzL3VzZXJuYW1lcyBleGVtcHQgZnJvbSBHaG9zdCBNb2RlIChjb21tYSBzZXBhcmF0ZWQpIiwi2KLZitiv2Yog2LnYr9iv2Yog2YrYpyDZitmI2LLYsdmG2YrZhSDYp9mB2LHYp9iv2Yog2YPZhyDZhdmK4oCM2K7ZiNin2YrYryDYqtmK2YMg2KLYqNmKINio2LHYp9mK2LTZiNmGINmB2LnYp9mEINio2YXZiNmG2YcgKNio2Kcg2YPYp9mF2Kcg2KzYr9inINmD2YbZitivKSI6IlRlbGVncmFtIElEcy91c2VybmFtZXMgZXhlbXB0IGZyb20gR2hvc3QgTW9kZSAoY29tbWEgc2VwYXJhdGVkKSIsItmD2YTZitivIEFQSSDYrtmI2K8g2LHYpyDYp9iyINm+2YbZhCBHZW1pbmkg2YrYpyBPcGVuQUkg2K/YsdmK2KfZgdiqINmIINin2YrZhtis2Kcg2YjYp9ix2K8g2YPZhtmK2K8iOiJQYXN0ZSB5b3VyIEdvb2dsZSBHZW1pbmkgb3IgT3BlbkFJIEFQSSBLZXkgaGVyZSIsItmG2YXYp9uM2LQgLyDZhdiu2YHbjCDYs9in2LLbjCDaqdmE24zYryI6IlNob3cgLyBIaWRlIEtleSIsItmG2YXYp9mK2LQgLyDZhdiu2YHZiuKAjNiz2KfYstmKINmD2YTZitivIjoiU2hvdyAvIEhpZGUgS2V5Iiwi2KjZhyBBSSDYqNqv2YjZitmK2K8g2obYt9mI2LEg2LHZgdiq2KfYsSDZg9mG2YcgKNmF2KvZhNin2Ys6INmF2KTYr9io2KfZhtmHINmIINix2LPZhdmKINm+2KfYs9iuINio2K/Zh9iMINin2LIg2KfYt9mE2KfYudin2Kog2K7YtdmI2LXZiiDYtdit2KjYqiDZhtmD2YbZhykiOiJJbnN0cnVjdCBBSSBwZXJzb25hbGl0eSAoZS5nLiBSZXBseSBwb2xpdGVseSBhbmQgZm9ybWFsbHksIGtlZXAgYW5zd2VycyBjb25jaXNlKSIsItin2LfZhNin2LnYp9iq24wg2qnZhyBBSSDYp9is2KfYstmHINiv2KfYsdmHINio2q/ZhyAo2YXYq9mE2KfZizog2LPYp9i52Kog2qnYp9ix24wg2YXZhiDbuSDYqtinINu1INmH2LPYqtiMINio2LHZhtin2YXZhyDZhtmI24zYsyDZh9iz2KrZhSkiOiJDb250ZXh0IGZhY3RzIGZvciBBSSAoZS5nLiBNeSB3b3JraW5nIGhvdXJzIGFyZSA5IHRvIDUsIEkgYW0gYSBkZXZlbG9wZXIpIiwi2KfYt9mE2KfYudin2KrZiiDZg9mHIEFJINin2KzYp9iy2Ycg2K/Yp9ix2Ycg2Kjar9mHICjZhdir2YTYp9mLOiDYs9in2LnYqiDZg9in2LHZiiDZhdmGINu5INiq2Kcg27Ug2YfYs9iq2Iwg2KjYsdmG2KfZhdmH4oCM2YbZiNmK2LMg2YfYs9iq2YUpIjoiQ29udGV4dCBmYWN0cyBmb3IgQUkgKGUuZy4gTXkgd29ya2luZyBob3VycyBhcmUgOSB0byA1LCBJIGFtIGEgZGV2ZWxvcGVyKSIsItiq2YjZg9mGINix2KjYp9iqINiv2LHZitin2YHYqtmKINin2LIgQm90RmF0aGVyQCAo2YXYq9in2YQ6IDEyMzQ1Njc4OTpBQkNkZWZHaElKS2xtTm9QUVJzVFVWd3h5WikiOiJCb3QgdG9rZW4gZnJvbSBAQm90RmF0aGVyIChlLmcuIDEyMzQ1Njc4OTpBQkNkZWZHaElKS2xtTm9QUVJzVFVWd3h5WikiLCLYqtmG2LjZitmFINmK2Kcg2KrYutmK2YrYsSDYr9iz2KrZiiDYtNmG2KfYs9mHINiq2YTar9ix2KfZhSDZhdis2KfYsiI6Ik1hbnVhbGx5IFNldCBBdXRob3JpemVkIFRlbGVncmFtIE93bmVyIElEIiwi2YPZhNmK2K8g2K/Ys9iq2YoiOiJNYW51YWwgS2V5Iiwi2LHZhdiyINi52KjZiNixINit2LPYp9ioINio2LHYp9mKINix2YXYstmG2q/Yp9ix2Yog2YHYp9mK2YQiOiJBY2NvdW50IHBhc3N3b3JkIHVzZWQgdG8gZW5jcnlwdCBiYWNrdXAiLCLYsdmF2LIg2LnYqNmI2LEg2KfYs9iq2YHYp9iv2Ycg2LTYr9mHINmH2Ybar9in2YUg2KjZg9in2b4iOiJQYXNzd29yZCB1c2VkIHdoZW4gYmFja3VwIHdhcyBjcmVhdGVkIiwi2YPYryDZhNin2YrYs9mG2LMg2KrZhdiv2YrYryAo2YXYq9in2YQ6IEFSSVpPLVhYWFgtWFhYWC1YWFhYKSI6IlJlbmV3YWwgTGljZW5zZSBLZXkgKEFSSVpPLVhYWFgtWFhYWC1YWFhYKSIsItmD2K8g2YTYp9mK2LPZhtizINiq2YXYr9mK2K8gKEFSSVpPLVhYWFgtWFhYWC1YWFhYKSI6IlJlbmV3YWwgTGljZW5zZSBLZXkgKEFSSVpPLVhYWFgtWFhYWC1YWFhYKSIsItix2YXYsiDYudio2YjYsSDZgdi52YTZiiDYrdiz2KfYqCDYtNmF2KciOiJZb3VyIGN1cnJlbnQgYWNjb3VudCBwYXNzd29yZCIsItix2YXYsiDYudio2YjYsSDZgdi52YTZiiDYrtmI2K8g2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IkVudGVyIGN1cnJlbnQgcGFzc3dvcmQiLCLYsdmF2LIg2LnYqNmI2LEg2KzYr9mK2K8g2Ygg2KfZhdmGICjYrdiv2KfZgtmEINu4INmD2KfYsdin2YPYqtixKSI6Ik5ldyBzZWN1cmUgcGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsIvCfmoAg2YjbjNiy2KfYsdivINix2KfZhyDYp9mG2K/Yp9iy24wg2YfZiNi02YXZhtivINmIINqv2KfZhSDYqNmHINqv2KfZhSB8IEFyaXpvIFNlbGYgdjMuNi4wIFBSTyI6IvCfmoAgSW50ZXJhY3RpdmUgU3RlcC1ieS1TdGVwIFNldHVwIFdpemFyZCB8IEFyaXpvIFNlbGYgdjMuNi4wIFBSTyIsIvCfmoAg2YjZitiy2KfYsdivINix2KfZh+KAjNin2YbYr9in2LLZiiDZh9mI2LTZhdmG2K8g2Ygg2q/Yp9mF4oCM2KjZh+KAjNqv2KfZhSB8IEFyaXpvIFNlbGYgdjMuNi4wIFBSTyI6IvCfmoAgSW50ZXJhY3RpdmUgU3RlcC1ieS1TdGVwIFNldHVwIFdpemFyZCB8IEFyaXpvIFNlbGYgdjMuNi4wIFBSTyIsItmI24zYstin2LHYryDZh9mI2LTZhdmG2K8g2Ygg2KrYudin2YXZhNuMINiz2KrYp9m+INi02K7YtduMINin2LIg2q/bjNiqINmH2KfYqCI6IkludGVyYWN0aXZlIEdpdEh1YiBTZXR1cCBXaXphcmQgZm9yIFNlbGZib3QgU3R1ZGlvIiwi2YjZitiy2KfYsdivINmH2YjYtNmF2YbYryDZiCDYqti52KfZhdmE2Yog2LPYqtin2b4g2LTYrti12Yog2KfYsiDar9mK2KrigIzZh9in2KgiOiJJbnRlcmFjdGl2ZSBHaXRIdWIgU2V0dXAgV2l6YXJkIGZvciBTZWxmYm90IFN0dWRpbyIsItio2LHYsdiz2Yog2LPZhNin2YXYqiDYs9ix2YjYsSI6IkNoZWNrIFNlcnZlciBIZWFsdGgiLCLYrtix2YjYrNuMINiz2qnYsdiqINmH2KciOiJFeHBvcnQgU2VjcmV0cyIsItiu2LHZiNis2Yog2LPZg9ix2KrigIzZh9inIjoiRXhwb3J0IFNlY3JldHMiLCLwn5GRINm+2YbZhCDZhdiv2YrYsdmK2KoiOiLwn5GRIEFkbWluIFBvcnRhbCIsIvCfmqog2KfYs9iq2YjYr9mK2YgiOiLwn5qqIFN0dWRpbyIsItmF2LHYrdmE2Ycg27Eg2KfYsiDbtTog2q/bjNiqINmH2KfYqCDZiCDZhtuM2KfYstmF2YbYr9uMINmH2KciOiJTdGVwIDEgb2YgNTogR2l0SHViICYgUHJlcmVxdWlzaXRlcyIsItmF2LHYrdmE2Ycg27Eg2KfYsiDbtTog2q/Zitiq4oCM2YfYp9ioINmIINmG2YrYp9iy2YXZhtiv2YrigIzZh9inIjoiU3RlcCAxIG9mIDU6IEdpdEh1YiAmIFByZXJlcXVpc2l0ZXMiLCLbstuw2aog2KrZg9mF2YrZhCDYtNiv2YciOiIyMCUgQ29tcGxldGVkIiwi2q/bjNiqINmH2KfYqCDZiCDZgdmI2LHaqSI6IkdpdEh1YiAmIEZvcmsiLCLar9mK2KrigIzZh9in2Kgg2Ygg2YHZiNix2YMiOiJHaXRIdWIgJiBGb3JrIiwi2YPZhNin2K/ZgdmE2LEg2YggRDEiOiJDbG91ZGZsYXJlICYgRDEiLCLwn5OlINmF2LHYrdmE2Ycg2KfZiNmEOiDYp9mG2LTYudin2Kgg2b7YsdmI2pjZhyDYr9ixINqv24zYqiDZh9in2KggKEZvcmspINmIINiv2KfZhtmE2YjYryDYs9mI2LHYsyI6IvCfk6UgU3RlcCAxOiBGb3JrIFByb2plY3Qgb24gR2l0SHViICYgQ2xvbmUgU291cmNlIiwi8J+TpSDZhdix2K3ZhNmHINin2YjZhDog2KfZhti02LnYp9ioINm+2LHZiNqY2Ycg2K/YsSDar9mK2KrigIzZh9in2KggKEZvcmspINmIINiv2KfZhtmE2YjYryDYs9mI2LHYsyI6IvCfk6UgU3RlcCAxOiBGb3JrIFByb2plY3Qgb24gR2l0SHViICYgQ2xvbmUgU291cmNlIiwi24zaqSDZhtiz2K7ZhyDZhdiz2KrZgtmEINin2LIg2b7YsdmI2pjZhyDYsdinINiv2LEg2Kfaqdin2YbYqiDar9uM2Kog2YfYp9ioINiu2YjYryDZgdmI2LHaqSDaqdmG24zYry4g2KjYpyDZiNin2LHYryDaqdix2K/ZhiDZhtin2YUg2qnYp9ix2KjYsduMINqv24zYqiDZh9in2Kgg2K/YsSDaqdin2K/YsSDYstuM2LHYjCDYqtmF2KfZhSDYotiv2LHYsyDZh9inINmIINiv2LPYqtmI2LHYp9iqINio2Ycg2YbYp9mFINi02YXYpyDYtNiu2LXbjCDYs9in2LLbjCDYrtmI2KfZh9mG2K8g2LTYryEiOiJGb3JrIGFuIGluZGVwZW5kZW50IGNvcHkgb2YgdGhlIHJlcG9zaXRvcnkgaW50byB5b3VyIEdpdEh1YiBhY2NvdW50LiBFbnRlciB5b3VyIEdpdEh1YiB1c2VybmFtZSBiZWxvdyB0byBwZXJzb25hbGl6ZSBhbGwgVVJMcyBhbmQgY29tbWFuZHMgYXV0b21hdGljYWxseSEiLCLZitmDINmG2LPYrtmHINmF2LPYqtmC2YQg2KfYsiDZvtix2YjamNmHINix2Kcg2K/YsSDYp9mD2KfZhtiqINqv2YrYquKAjNmH2KfYqCDYrtmI2K8g2YHZiNix2YMg2YPZhtmK2K8uINio2Kcg2YjYp9ix2K8g2YPYsdiv2YYg2YbYp9mFINmD2KfYsdio2LHZiiDar9mK2KrigIzZh9in2Kgg2K/YsSDZg9in2K/YsSDYstmK2LHYjCDYqtmF2KfZhSDYotiv2LHYs+KAjNmH2Kcg2Ygg2K/Ys9iq2YjYsdin2Kog2KjZhyDZhtin2YUg2LTZhdinINi02K7YtdmK4oCM2LPYp9iy2Yog2K7ZiNin2YfZhtivINi02K8hIjoiRm9yayBhbiBpbmRlcGVuZGVudCBjb3B5IG9mIHRoZSByZXBvc2l0b3J5IGludG8geW91ciBHaXRIdWIgYWNjb3VudC4gRW50ZXIgeW91ciBHaXRIdWIgdXNlcm5hbWUgYmVsb3cgdG8gcGVyc29uYWxpemUgYWxsIFVSTHMgYW5kIGNvbW1hbmRzIGF1dG9tYXRpY2FsbHkhIiwi8J+RpCDZhtin2YUg2qnYp9ix2KjYsduMINi02YXYpyDYr9ixIEdpdEh1YiAo2LTYrti124wg2LPYp9iy24wg2K7ZiNiv2qnYp9ixINmH2YXZhyDZhNuM2YbaqSDZh9inINmIINiv2LPYqtmI2LHYp9iqKSI6IvCfkaQgWW91ciBHaXRIdWIgVXNlcm5hbWUgKEF1dG8tcGVyc29uYWxpemVzIGFsbCBsaW5rcyAmIGNvbW1hbmRzKSIsIvCfkaQg2YbYp9mFINmD2KfYsdio2LHZiiDYtNmF2Kcg2K/YsSBHaXRIdWIgKNi02K7YtdmK4oCM2LPYp9iy2Yog2K7ZiNiv2YPYp9ixINmH2YXZhyDZhNmK2YbZg+KAjNmH2Kcg2Ygg2K/Ys9iq2YjYsdin2KopIjoi8J+RpCBZb3VyIEdpdEh1YiBVc2VybmFtZSAoQXV0by1wZXJzb25hbGl6ZXMgYWxsIGxpbmtzICYgY29tbWFuZHMpIiwi8J+NtCDZgdmI2LHaqSDZhdiz2KrZgtuM2YUg2K/YsSDar9uM2Kog2YfYp9ioIjoi8J+NtCBGb3JrIERpcmVjdGx5IG9uIEdpdEh1YiIsIvCfjbQg2YHZiNix2YMg2YXYs9iq2YLZitmFINiv2LEg2q/Zitiq4oCM2YfYp9ioIjoi8J+NtCBGb3JrIERpcmVjdGx5IG9uIEdpdEh1YiIsIvCfkqEg2KjYpyDZiNin2LHYryDaqdix2K/ZhiDbjNmI2LLYsdmG24zZhdiMINmE24zZhtqpINmH2KfbjCDYsduM2b7Yp9iy24zYqtmI2LHbjNiMINii2K/YsdizINiq2YbYuNuM2YUg2LPaqdix2Kog2YfYpyDZiCDYr9iz2KrZiNix2KfYqiDaqdmE2YjZhiDYqNmHINi32YjYsSDYrtmI2K/aqdin2LEg2KjYsdmI2LIg2YXbjCDYtNmI2YbYry4iOiLwn5KhIEVudGVyaW5nIHlvdXIgdXNlcm5hbWUgdXBkYXRlcyByZXBvc2l0b3J5IGxpbmtzLCBzZWNyZXRzIHNldHRpbmdzIFVSTCwgYW5kIGNsb25lIGNvbW1hbmRzIGluc3RhbnRseS4iLCLwn5KhINio2Kcg2YjYp9ix2K8g2YPYsdiv2YYg2YrZiNiy2LHZhtmK2YXYjCDZhNmK2YbZg+KAjNmH2KfZiiDYsdmK2b7Yp9iy2YrYqtmI2LHZitiMINii2K/YsdizINiq2YbYuNmK2YUg2LPZg9ix2KrigIzZh9inINmIINiv2LPYqtmI2LHYp9iqINmD2YTZiNmGINio2Ycg2LfZiNixINiu2YjYr9mD2KfYsSDYqNix2YjYsiDZhdmK4oCM2LTZiNmG2K8uIjoi8J+SoSBFbnRlcmluZyB5b3VyIHVzZXJuYW1lIHVwZGF0ZXMgcmVwb3NpdG9yeSBsaW5rcywgc2VjcmV0cyBzZXR0aW5ncyBVUkwsIGFuZCBjbG9uZSBjb21tYW5kcyBpbnN0YW50bHkuIiwi8J+NtCDYsdmK2b7Yp9iy2YrYqtmI2LHZiiDYsdiz2YXZiiDZvtix2YjamNmHIjoi8J+NtCBPZmZpY2lhbCBSZXBvc2l0b3J5Iiwi2LPZiNix2LMg2KfYtdmE24wg2LPZhNmBINio2KfYqiDYsdmI24wg2q/bjNiqINmH2KfYqCDZgtix2KfYsSDYr9in2LHYry4g2KjYsdin24wg2LTYsdmI2Lkg2LHZiNuMINiv2qnZhdmHINiy24zYsSDYqNiy2YbbjNivINmIINiv2LEg2LXZgdit2Ycg2q/bjNiqINmH2KfYqNiMINiv2qnZhdmHIjoiVGhlIHNvdXJjZSByZXBvc2l0b3J5IGlzIGhvc3RlZCBvbiBHaXRIdWIuIENsaWNrIHRoZSBidXR0b24gYmVsb3cgYW5kIG9uIHRoZSBHaXRIdWIgcGFnZSBwcmVzcyIsItiz2YjYsdizINin2LXZhNmKINiz2YTZgeKAjNio2KfYqiDYsdmI2Yog2q/Zitiq4oCM2YfYp9ioINmC2LHYp9ixINiv2KfYsdivLiDYqNix2KfZiiDYtNix2YjYuSDYsdmI2Yog2K/Zg9mF2Ycg2LLZitixINio2LLZhtmK2K8g2Ygg2K/YsSDYtdmB2K3ZhyDar9mK2KrigIzZh9in2KjYjCDYr9mD2YXZhyI6IlRoZSBzb3VyY2UgcmVwb3NpdG9yeSBpcyBob3N0ZWQgb24gR2l0SHViLiBDbGljayB0aGUgYnV0dG9uIGJlbG93IGFuZCBvbiB0aGUgR2l0SHViIHBhZ2UgcHJlc3MiLCLYsdinINio2YHYtNin2LHZitivOiI6InRvIGZvcms6Iiwi8J+UlyDZhdi02KfZh9iv2Ycg2LHbjNm+2YjbjCDZhdix2KzYuSDar9uM2Kog2YfYp9ioIjoi8J+UlyBWaWV3IFNvdXJjZSBvbiBHaXRIdWIiLCLwn5SXINmF2LTYp9mH2K/ZhyDYsdmK2b7ZiNmKINmF2LHYrNi5INqv2YrYquKAjNmH2KfYqCI6IvCflJcgVmlldyBTb3VyY2Ugb24gR2l0SHViIiwi8J+SuyDZvtuM2LQg2YbbjNin2LLZh9in24wg2YbYsdmFINin2YHYstin2LHbjCDYs9in2K/ZhyI6IvCfkrsgQmFzaWMgU29mdHdhcmUgUHJlcmVxdWlzaXRlcyIsIvCfkrsg2b7Ziti04oCM2YbZitin2LLZh9in2Yog2YbYsdmF4oCM2KfZgdiy2KfYsdmKINiz2KfYr9mHIjoi8J+SuyBCYXNpYyBTb2Z0d2FyZSBQcmVyZXF1aXNpdGVzIiwi2KrZhtmH2Kcg2KfYqNiy2KfYsdmH2KfZiiDZhdmI2LHYryDZhtmK2KfYsiDYqNix2KfZiiDYp9iz2KrZgdin2K/ZhzoiOiJUaGUgb25seSBwcmVyZXF1aXNpdGVzIHJlcXVpcmVkOiIsIk5vZGUuanMgMTgg2YrYpyDYqNin2YTYp9iq2LEiOiJOb2RlLmpzIDE4IG9yIGhpZ2hlciIsItix2YjZiiDYs9mK2LPYqtmFIjoib24geW91ciBsb2NhbCBzeXN0ZW0iLCLZitmDINit2LPYp9ioINmD2KfYsdio2LHZiiDYsdin2Yrar9in2YYg2K/YsSI6IkEgZnJlZSBhY2NvdW50IG9uIiwi2YrZgyDYp9mD2KfZhtiqINix2KfZitqv2KfZhiDYr9ixIjoiQSBmcmVlIGFjY291bnQgb24iLCLYqNix2KfZiiDYsdin2YbYsSDYr9in2KbZhdmKIjoiZm9yIGNvbnRpbnVvdXMgMjQvNyBydW5uZXIiLCLijKjvuI8g2K/YsduM2KfZgdiqINiz2YjYsdizINmIINmG2LXYqCDZvtqp24zYrCDZh9inOiI6IuKMqO+4jyBDbG9uZSBTb3VyY2UgJiBJbnN0YWxsIERlcGVuZGVuY2llczoiLCLijKjvuI8g2K/YsdmK2KfZgdiqINiz2YjYsdizINmIINmG2LXYqCDZvtmD2YrYrOKAjNmH2Kc6Ijoi4oyo77iPIENsb25lIFNvdXJjZSAmIEluc3RhbGwgRGVwZW5kZW5jaWVzOiIsIlBvd2VyU2hlbGwgKNmI2YrZhtiv2YjYsikiOiJQb3dlclNoZWxsIChXaW5kb3dzKSIsIkJhc2ggKNmF2YMg2Ygg2YTZitmG2YjZg9izKSI6IkJhc2ggKG1hY09TICYgTGludXgpIiwi8J+TiyDZg9m+2Yog2YPYp9mF2YQg2K/Ys9iq2YjYsSI6IvCfk4sgQ29weSBDb21tYW5kIiwi2YXYsdit2YTZhyDYqNi52K86INmD2YTYp9iv2YHZhNixINmIINm+2KfZitqv2KfZhyDYr9in2K/ZhyBEMSI6Ik5leHQgU3RlcDogQ2xvdWRmbGFyZSAmIEQxIERhdGFiYXNlIiwi2q/Yp9mFINio2LnYr9mKOiDYs9in2K7YqiDZiNix2YPYsSDZiCDYr9mK2KrYp9io2YrYsyDZg9mE2KfYr9mB2YTYsSI6Ik5leHQgU3RlcDogQ3JlYXRlIENsb3VkZmxhcmUgV29ya2VyICYgRDEgRGF0YWJhc2UiLCLim4Ug2YXYsdit2YTZhyDYr9mI2YU6INm+2KfZitqv2KfZhyDYr9in2K/ZhyBTUUxpdGUg2KfYqNix2YogKEQxKSDZiCDYrdin2YHYuNmHINmD2YTYp9iv2YHZhNixIChLVikiOiLim4UgU3RlcCAyOiBTZXJ2ZXJsZXNzIFNRTGl0ZSBEYXRhYmFzZSAoRDEpICYgS1YgQ2FjaGUiLCLZvtix2YjamNmHIEFyaXpvIFNlbGYg2KfYsiDZhdi52YXYp9ix24wg2b7bjNi02LHZgdiq2Ycg2YfbjNio2LHbjNiv24wgRDEgKyBLViDYqNinINiz2YLZgSDbsduw27As27DbsNuwINix2KfbjNiqINix2KfbjNqv2KfZhiDYr9ixINix2YjYsiDYp9iz2KrZgdin2K/ZhyDZhduMINqp2YbYry4iOiJBcml6byBTZWxmIHV0aWxpemVzIGEgaGlnaC1lZmZpY2llbmN5IGh5YnJpZCBEMSArIEtWIGFyY2hpdGVjdHVyZSB3aXRoIDEwMCwwMDAgZnJlZSBkYWlseSB3cml0ZXMuIiwi2b7YsdmI2pjZhyBBcml6byBTZWxmINin2LIg2YXYudmF2KfYsdmKINm+2YrYtNix2YHYqtmHINmH2YrYqNix2YrYr9mKIEQxICsgS1Yg2KjYpyDYs9mC2YEg27HbsNuwLNuw27DbsCDYsdin2YrYqiDYsdin2Yrar9in2YYg2K/YsSDYsdmI2LIg2KfYs9iq2YHYp9iv2Ycg2YXZiuKAjNmD2YbYry4iOiJBcml6byBTZWxmIHV0aWxpemVzIGEgaGlnaC1lZmZpY2llbmN5IGh5YnJpZCBEMSArIEtWIGFyY2hpdGVjdHVyZSB3aXRoIDEwMCwwMDAgZnJlZSBkYWlseSB3cml0ZXMuIiwi8J+qhCDYp9iz2KrYrtix2KfYrCDYrNin2K/ZiNuM24wg2LTZhtin2LPZhyDZh9inINin2LIg2YTYp9qvINiq2LHZhduM2YbYp9mEICjYqNiv2YjZhiDZhtuM2KfYsiDYqNmHINm+24zYr9inINqp2LHYr9mGINiv2LPYqtuMIFVVSUQhKSI6IvCfqoQgTWFnaWMgSUQgRXh0cmFjdG9yIGZyb20gVGVybWluYWwgTG9nIChaZXJvIG1hbnVhbCBVVUlEIGh1bnRpbmcpIiwi8J+qhCDYp9iz2KrYrtix2KfYrCDYrNin2K/ZiNmK2Yog2LTZhtin2LPZh+KAjNmH2Kcg2KfYsiDZhNin2q8g2KrYsdmF2YrZhtin2YQgKNio2K/ZiNmGINmG2YrYp9iyINio2Ycg2b7Zitiv2Kcg2YPYsdiv2YYg2K/Ys9iq2YogVVVJRCEpIjoi8J+qhCBNYWdpYyBJRCBFeHRyYWN0b3IgZnJvbSBUZXJtaW5hbCBMb2cgKFplcm8gbWFudWFsIFVVSUQgaHVudGluZykiLCLZiNmC2KrbjCDYr9iz2KrZiNix2KfYqiDYs9in2K7YqiBEMSDbjNinIEtWINix2Kcg2KfYrNix2Kcg2qnYsdiv24zYr9iMINqp2YQg2K7YsdmI2KzbjCDahtin2b4g2LTYr9mHINiv2LEg2KrYsdmF24zZhtin2YQg2LHYpyDYr9ixINqp2KfYr9ixINiy24zYsSDZvtuM2LPYqiDaqdmG24zYryDYqtinINiz24zYs9iq2YUg2LTZhtin2LPZhyDZh9inINix2Kcg2KjZhyDYtdmI2LHYqiDYrtmI2K/aqdin2LEg2KrYtNiu24zYtSDYr9in2K/ZhyDZiCDZgduM2YTYr9mH2Kcg2LHYpyDZvtixINqp2YbYrzoiOiJQYXN0ZSB0aGUgdGVybWluYWwgb3V0cHV0IGZyb20gRDEgb3IgS1YgY3JlYXRpb24gY29tbWFuZHMgYmVsb3c7IHRoZSB3aXphcmQgd2lsbCBhdXRvbWF0aWNhbGx5IHBhcnNlIFVVSURzIGFuZCBmaWxsIGFsbCBmaWVsZHM6Iiwi2YjZgtiq2Yog2K/Ys9iq2YjYsdin2Kog2LPYp9iu2KogRDEg2YrYpyBLViDYsdinINin2KzYsdinINmD2LHYr9mK2K/YjCDZg9mEINiu2LHZiNis2Yog2obYp9m+INi02K/ZhyDYr9ixINiq2LHZhdmK2YbYp9mEINix2Kcg2K/YsSDZg9in2K/YsSDYstmK2LEg2b7Zitiz2Kog2YPZhtmK2K8g2KrYpyDYs9mK2LPYqtmFINi02YbYp9iz2YfigIzZh9inINix2Kcg2KjZhyDYtdmI2LHYqiDYrtmI2K/Zg9in2LEg2KrYtNiu2YrYtSDYr9in2K/ZhyDZiCDZgdmK2YTYr9mH2Kcg2LHYpyDZvtixINmD2YbYrzoiOiJQYXN0ZSB0aGUgdGVybWluYWwgb3V0cHV0IGZyb20gRDEgb3IgS1YgY3JlYXRpb24gY29tbWFuZHMgYmVsb3c7IHRoZSB3aXphcmQgd2lsbCBhdXRvbWF0aWNhbGx5IHBhcnNlIFVVSURzIGFuZCBmaWxsIGFsbCBmaWVsZHM6Iiwi8J+XhO+4jyDbsS4g2LPYp9iu2Kog2b7Yp9mK2q/Yp9mHINiv2KfYr9mHIEQxIjoi8J+XhO+4jyAxLiBDcmVhdGUgRDEgRGF0YWJhc2UiLCLYp9mK2YYg2K/Ys9iq2YjYsSDYsdinINiv2LEg2KrYsdmF2YrZhtin2YQg2b7ZiNi02Ycg2b7YsdmI2pjZhyDYp9is2LHYpyDZg9mG2YrYrzoiOiJSdW4gdGhpcyBjb21tYW5kIGluIHRoZSBwcm9qZWN0IGRpcmVjdG9yeSB0ZXJtaW5hbDoiLCLZg9m+2YoiOiJDb3B5Iiwi8J+SoSDYtNmG2KfYs9mHINiq2YjZhNmK2K/YtNiv2YcgKGRhdGFiYXNlX2lkKSDYsdinINiv2LEg2YHZitmE2K8g2LLZitixINmI2KfYsdivINmK2Kcg2b7Zitiz2Kog2YPZhtmK2K8uIjoi8J+SoSBFbnRlciBvciBwYXN0ZSB0aGUgZ2VuZXJhdGVkIGRhdGFiYXNlX2lkIGluIHRoZSBmaWVsZCBiZWxvdy4iLCLimqEg27IuINiz2KfYrtiqINit2KfZgdi42Ycg2YPYtCBLViI6IuKaoSAyLiBDcmVhdGUgS1YgTmFtZXNwYWNlIiwi2KfZitmGINiv2LPYqtmI2LEg2LHYpyDYr9ixINiq2LHZhdmK2YbYp9mEINin2KzYsdinINmD2YbZitivOiI6IlJ1biB0aGlzIGNvbW1hbmQgaW4geW91ciB0ZXJtaW5hbDoiLCLwn5KhINi02YbYp9iz2Ycg2KrZiNmE2YrYr9i02K/ZhyAoaWQpINix2Kcg2K/YsSDZgdmK2YTYryDYstmK2LEg2YjYp9ix2K8g2YrYpyDZvtmK2LPYqiDZg9mG2YrYry4iOiLwn5KhIEVudGVyIG9yIHBhc3RlIHRoZSBnZW5lcmF0ZWQgbmFtZXNwYWNlIElEIGluIHRoZSBmaWVsZCBiZWxvdy4iLCLimpnvuI8g2KrZiNmE2YrYr9mD2YbZhtiv2Ycg2LLZhtiv2Ycg2Ygg2K/Yp9mG2YTZiNivINmF2LPYqtmC2YrZhSDZgdin2YrZhCI6IuKame+4jyBMaXZlIHdyYW5nbGVyLnRvbWwgR2VuZXJhdG9yICYgRGlyZWN0IERvd25sb2FkIiwi8J+TpSDYr9in2YbZhNmI2K8g2YXYs9iq2YLZitmFINmB2KfZitmEIHdyYW5nbGVyLnRvbWwiOiLwn5OlIERpcmVjdCBEb3dubG9hZCB3cmFuZ2xlci50b21sIiwi4pqhINiz2KfYrtiqINiu2YjYr9mD2KfYsSDYrNiv2KfZiNmEIEQxIjoi4pqhIEF1dG9tYXRpYyBEMSBTY2hlbWEgU2V0dXAiLCLYp9i32YTYp9i52KfYqiDYsdinINmI2KfYsdivINqp2YbbjNiv2Jsg2b7bjNi0INmG2YXYp9uM2LQg2KjZhyDYtdmI2LHYqiDYqNmE2KfYr9ix2YbaryDYqNix2YjYstix2LPYp9mG24wg2LTYr9mHINmIINmF24wg2KrZiNin2YbbjNivINmB2KfbjNmEINii2YXYp9iv2Ycg2LHYpyDZhdiz2KrZgtuM2YXYp9mLINiv2KfZhtmE2YjYryDaqdmG24zYrzoiOiJGaWxsIGluIHlvdXIgZGV0YWlsczsgdGhlIHByZXZpZXcgdXBkYXRlcyBpbiByZWFsLXRpbWUgYW5kIHlvdSBjYW4gZG93bmxvYWQgdGhlIHJlYWR5LXRvLWRlcGxveSBjb25maWd1cmF0aW9uIGRpcmVjdGx5OiIsItin2LfZhNin2LnYp9iqINix2Kcg2YjYp9ix2K8g2YPZhtmK2K/YmyDZvtmK2LTigIzZhtmF2KfZiti0INio2Ycg2LXZiNix2Kog2KjZhNin2K/YsdmG2q8g2KjYsdmI2LLYsdiz2KfZhtmKINi02K/ZhyDZiCDZhdmK4oCM2KrZiNin2YbZitivINmB2KfZitmEINii2YXYp9iv2Ycg2LHYpyDZhdiz2KrZgtmK2YXYp9mLINiv2KfZhtmE2YjYryDZg9mG2YrYrzoiOiJGaWxsIGluIHlvdXIgZGV0YWlsczsgdGhlIHByZXZpZXcgdXBkYXRlcyBpbiByZWFsLXRpbWUgYW5kIHlvdSBjYW4gZG93bmxvYWQgdGhlIHJlYWR5LXRvLWRlcGxveSBjb25maWd1cmF0aW9uIGRpcmVjdGx5OiIsItmG2KfZhSDZiNix2YPYsSAoV29ya2VyIE5hbWUpIjoiV29ya2VyIE5hbWUiLCLYtNmG2KfYs9mHINm+2KfZitqv2KfZhyDYr9in2K/ZhyBEMSAoRGF0YWJhc2UgSUQpIjoiRDEgRGF0YWJhc2UgSUQiLCLYsdmF2LIg2LnYqNmI2LEg2YXYr9mK2LHZitiqIChBZG1pbiBNYXN0ZXIgUGFzc3dvcmQpIjoiQWRtaW4gUGFzc3dvcmQiLCLwn46yINiq2YjZhNmK2K8g2KrYtdin2K/ZgdmKIjoi8J+OsiBHZW5lcmF0ZSBSYW5kb20iLCJ3cmFuZ2xlci50b21sICjYrtix2YjYrNmKINii2YXYp9iv2Ycg2K/Zitm+2YTZiNmKKSI6IndyYW5nbGVyLnRvbWwgKFJlYWR5IGZvciBEZXBsb3kpIiwi8J+TpSDYr9in2YbZhNmI2K8g2YHYp9mK2YQiOiLwn5OlIERvd25sb2FkIEZpbGUiLCLwn5OLINmD2b7ZiiDZg9in2YXZhCI6IvCfk4sgQ29weSBBbGwiLCLwn5qAINiv2LPYqtmI2LEg2K/Zitm+2YTZiNmKINio2Ycg2YPZhNin2K/ZgdmE2LE6Ijoi8J+agCBEZXBsb3kgdG8gQ2xvdWRmbGFyZSBDb21tYW5kOiIsIvCfk4sg2YPZvtmKINiv2LPYqtmI2LEiOiLwn5OLIENvcHkgQ29tbWFuZCIsItmF2LHYrdmE2Ycg2KjYudivOiDZg9mE2YrYr9mH2KfZiiDYqtmE2q/Ysdin2YUg2Ygg2LHYqNin2Kog2YPZhdmD2YoiOiJOZXh0IFN0ZXA6IFRlbGVncmFtIEFQSSBLZXlzICYgSGVscGVyIEJvdCIsIvCfk7Eg2YXYsdit2YTZhyDYs9mI2YU6INin2KrYtdin2YQg2YPZhNin2YrZhtiqINix2LPZhdmKINiq2YTar9ix2KfZhSDZiCDYs9in2K7YqiDYsdio2KfYqiDZg9mF2YPZiiI6IvCfk7EgU3RlcCAzOiBDb25uZWN0IFRlbGVncmFtIEFQSSBDbGllbnQgJiBDcmVhdGUgSGVscGVyIEJvdCIsItix2KjYp9iqINqp2YXaqduMINin2K7Yqti12KfYtduMINio2LHYp9uMINin2LHYs9in2YQg2b7bjNin2YUg2YfYp9uMINm+2KfaqSDYtNiv2YfYjCDZvtuM2KfZhSDZh9in24wg2LLZhdin2YYg2K/Yp9ixINmC2KjZhCDYp9iyINin2YbZgti22Kcg2Ygg2qnYr9mH2KfbjCDZiNix2YjYryDYqNmHINm+24zZiNuMINi02YXYpyDYp9iz2KrZgdin2K/ZhyDZhduMINi02YjYry4iOiJZb3VyIGRlZGljYXRlZCBoZWxwZXIgYm90IGZvcndhcmRzIGFudGktZGVsZXRlIG1lc3NhZ2UgcmVjb3ZlcnksIGFudGktVFRMIG1lZGlhLCBhbmQgc2VjdXJpdHkgYWxlcnRzIGRpcmVjdGx5IHRvIHlvdXIgcHJpdmF0ZSBjaGF0LiIsItix2KjYp9iqINmD2YXZg9mKINin2K7Yqti12KfYtdmKINio2LHYp9mKINin2LHYs9in2YQg2b7Zitin2YXigIzZh9in2Yog2b7Yp9mD4oCM2LTYr9mH2Iwg2b7Zitin2YXigIzZh9in2Yog2LLZhdin2YbigIzYr9in2LEg2YLYqNmEINin2LIg2KfZhtmC2LbYpyDZiCDZg9iv2YfYp9mKINmI2LHZiNivINio2Ycg2b7ZitmI2Yog2LTZhdinINin2LPYqtmB2KfYr9mHINmF2YrigIzYtNmI2K8uIjoiWW91ciBkZWRpY2F0ZWQgaGVscGVyIGJvdCBmb3J3YXJkcyBhbnRpLWRlbGV0ZSBtZXNzYWdlIHJlY292ZXJ5LCBhbnRpLVRUTCBtZWRpYSwgYW5kIHNlY3VyaXR5IGFsZXJ0cyBkaXJlY3RseSB0byB5b3VyIHByaXZhdGUgY2hhdC4iLCLwn5SRINuxLiDYtNmG2KfYs9mHINmIINmH2LQg2LHYs9mF2Yog2KrZhNqv2LHYp9mFIjoi8J+UkSAxLiBPZmZpY2lhbCBUZWxlZ3JhbSBDbGllbnQgSUQgJiBIYXNoIiwi2KfbjNmGINmF2YLYp9iv24zYsSDYtNmG2KfYs9mHINqp2YTYp9uM2YbYqiDYsdiz2YXbjCDYqtmE2q/Ysdin2YUg2K/Ys9qp2KrYp9m+INmH2LPYqtmG2K8g2Ygg2LPbjNiz2KrZhSDYqNmHINi32YjYsSDZvtuM2LQg2YHYsdi2INin2LIg2KLZhiDZh9inINin2LPYqtmB2KfYr9mHINmF24wg2qnZhtivICjZhtuM2KfYstuMINio2Ycg2KrYutuM24zYsSDZhtiv2KfYsduM2K8pOiI6IlRoZXNlIGFyZSBvZmZpY2lhbCBUZWxlZ3JhbSBEZXNrdG9wIGNyZWRlbnRpYWxzIHVzZWQgYnkgZGVmYXVsdCAobm8gY2hhbmdlIHJlcXVpcmVkKToiLCLYp9mK2YYg2YXZgtin2K/ZitixINi02YbYp9iz2Ycg2YPZhNin2YrZhtiqINix2LPZhdmKINiq2YTar9ix2KfZhSDYr9iz2YPYqtin2b4g2YfYs9iq2YbYryDZiCDYs9mK2LPYqtmFINio2Ycg2LfZiNixINm+2YrYtOKAjNmB2LHYtiDYp9iyINii2YbigIzZh9inINin2LPYqtmB2KfYr9mHINmF2YrigIzZg9mG2K8gKNmG2YrYp9iy2Yog2KjZhyDYqti62YrZitixINmG2K/Yp9ix2YrYryk6IjoiVGhlc2UgYXJlIG9mZmljaWFsIFRlbGVncmFtIERlc2t0b3AgY3JlZGVudGlhbHMgdXNlZCBieSBkZWZhdWx0IChubyBjaGFuZ2UgcmVxdWlyZWQpOiIsItiv2LEg2LXZiNix2Kog2KrZhdin24zZhCDYqNmHINiv2LHbjNin2YHYqiDaqdmE24zYryDYtNiu2LXbjCDZhduMINiq2YjYp9mG24zYryDYqNmHINiz2KfbjNiqINix2LPZhduMIjoiSWYgeW91IHByZWZlciB5b3VyIG93biBwZXJzb25hbCBUZWxlZ3JhbSBkZXZlbG9wZXIgY3JlZGVudGlhbHMsIHZpc2l0Iiwi2K/YsSDYtdmI2LHYqiDYqtmF2KfZitmEINio2Ycg2K/YsdmK2KfZgdiqINmD2YTZitivINi02K7YtdmKINmF2YrigIzYqtmI2KfZhtmK2K8g2KjZhyDYs9in2YrYqiDYsdiz2YXZiiI6IklmIHlvdSBwcmVmZXIgeW91ciBvd24gcGVyc29uYWwgVGVsZWdyYW0gZGV2ZWxvcGVyIGNyZWRlbnRpYWxzLCB2aXNpdCIsItmF2LHYp9is2LnZhyDZg9mG2YrYry4iOiIuIiwi8J+kliDbsi4g2KfZitis2KfYryDYsdio2KfYqiDYr9ixIEJvdEZhdGhlciDYqtmE2q/Ysdin2YUiOiLwn6SWIDIuIENyZWF0ZSBCb3QgaW4gVGVsZWdyYW0gQEJvdEZhdGhlciIsItmK2YMg2LHYqNin2Kog2KfYrtiq2LXYp9i12Yog2Ygg2LHYp9mK2q/Yp9mGINio2LHYp9mKINiu2YjYryDYqNiz2KfYstmK2K86IjoiQ3JlYXRlIGEgZGVkaWNhdGVkIGZyZWUgYm90IGZvciB5b3VyIGFjY291bnQ6Iiwi2K/YsSDYqtmE2q/Ysdin2YUg2YjYp9ix2K8g2KLZitiv2YoiOiJJbiBUZWxlZ3JhbSBvcGVuIiwi2LTZiNmK2K8uIjoiLiIsItix2Kcg2KjZgdix2LPYqtmK2K8uIjoiLiIsItmK2YMg2YbYp9mFINmIINmK2YMg2YrZiNiy2LHZhtmK2YUg2K/ZhNiu2YjYp9mHICjZg9mHINio2YcgYm90INiu2KrZhSDYtNmI2K8pINio2LHar9iy2YrZhtmK2K8uIjoiQ2hvb3NlIGEgbmFtZSBhbmQgdXNlcm5hbWUgZW5kaW5nIGluICdib3QnLiIsItiq2YjaqdmGINiq2YTar9ix2KfZhSDYr9in2K/ZhyDYtNiv2Ycg2LHYpyDaqdm+24wg2Ygg2K/YsSDaqdin2K/YsSDYstuM2LEg2YjYp9ix2K8g2qnZhtuM2K8uIjoiQ29weSB0aGUgcHJvdmlkZWQgVGVsZWdyYW0gQm90IFRva2VuIGFuZCBwYXN0ZSBpdCBiZWxvdy4iLCLYqtmI2YPZhiDYqtmE2q/Ysdin2YUg2K/Yp9iv2YfigIzYtNiv2Ycg2LHYpyDZg9m+2Yog2Ygg2K/YsSDZg9in2K/YsSDYstmK2LEg2YjYp9ix2K8g2YPZhtmK2K8uIjoiQ29weSB0aGUgcHJvdmlkZWQgVGVsZWdyYW0gQm90IFRva2VuIGFuZCBwYXN0ZSBpdCBiZWxvdy4iLCLwn6SWINio2KfYsiDaqdix2K/ZhiDYsdio2KfYqiDZgdin2K/YsSDYr9ixINiq2YTar9ix2KfZhSI6IvCfpJYgT3BlbiBAQm90RmF0aGVyIGluIFRlbGVncmFtIiwi8J+kliDYqNin2LIg2YPYsdiv2YYg2LHYqNin2KrigIzZgdin2K/YsSDYr9ixINiq2YTar9ix2KfZhSI6IvCfpJYgT3BlbiBAQm90RmF0aGVyIGluIFRlbGVncmFtIiwi8J+UjSDYqtiz2KrYsSDZiCDYp9i52KrYqNin2LHYs9mG2KzZiiDYotmG2YTYp9mK2YYg2KrZiNmD2YYg2LHYqNin2Kog2KrZhNqv2LHYp9mFIjoi8J+UjSBPbmxpbmUgVGVsZWdyYW0gQm90IFRva2VuIFZhbGlkYXRvciAmIFBpbmcgVGVzdGVyIiwi2KrZiNmD2YYg2LHYqNin2Kog2K7ZiNivINix2Kcg2KfZitmG2KzYpyDZiNin2LHYryDZg9mG2YrYryDYqtinINiz2YrYs9iq2YUg2KfYsiDYt9ix2YrZgiDYp9ix2KrYqNin2Lcg2YXYs9iq2YLZitmFINio2KcgQVBJINiq2YTar9ix2KfZhSDYtdit2Kog2KLZhiDYsdinINiq2KfZitmK2K8g2YPZhtivOiI6IkVudGVyIHlvdXIgYm90IHRva2VuIGJlbG93IHRvIHRlc3QgbGl2ZSBjb25uZWN0aXZpdHkgZGlyZWN0bHkgd2l0aCBUZWxlZ3JhbSBBUEk6Iiwi8J+agCDYqtiz2Kog2KLZhtmE2KfZitmGINiq2YjZg9mGIjoi8J+agCBUZXN0IEJvdCBUb2tlbiBPbmxpbmUiLCLwn5KsINin2LHYs9in2YQg2b7Zitin2YUg2KrYs9iqINio2Ycg2b7ZitmI2Yog2LTZhdinINin2LIg2LfYsdmK2YIg2KfZitmGINix2KjYp9iqOiI6IvCfkqwgU2VuZCB0ZXN0IG1lc3NhZ2UgdG8geW91ciBUZWxlZ3JhbSBjaGF0IHZpYSB0aGlzIGJvdDoiLCLwn5OpINin2LHYs9in2YQg2b7Zitin2YUg2KrYs9iqIjoi8J+TqSBTZW5kIFRlc3QgTWVzc2FnZSIsIuKaoSDZhdix2K3ZhNmHINqG2YfYp9ix2YU6INmB2LnYp9mEINiz2KfYstuMINix2KfZhtixINiv2KfYptmF24wg2Ygg27LbtCDYs9in2LnYqtmHINiv2LEgR2l0SHViIEFjdGlvbnMiOiLimqEgU3RlcCA0OiBFbmFibGUgMjQvNyBQZXJzaXN0ZW50IFJ1bm5lciBpbiBHaXRIdWIgQWN0aW9ucyIsIuKaoSDZhdix2K3ZhNmHINqG2YfYp9ix2YU6INmB2LnYp9mE4oCM2LPYp9iy2Yog2LHYp9mG2LEg2K/Yp9im2YXZiiDZiCDbstu0INiz2KfYudiq2Ycg2K/YsSBHaXRIdWIgQWN0aW9ucyI6IuKaoSBTdGVwIDQ6IEVuYWJsZSAyNC83IFBlcnNpc3RlbnQgUnVubmVyIGluIEdpdEh1YiBBY3Rpb25zIiwi2q/bjNiqINmH2KfYqCDYp9qp2LTZhtiyINiz2KfYudiqINiy2YbYr9mH2Iwg2KjbjNmI2q/Ysdin2YHbjCDZh9mI2LTZhdmG2K8g2Ygg2b7Yp9uM2LQg27LbtCDYs9in2LnYqtmHINix2Kcg2KjYr9mI2YYg2YLYt9i524wg2Ygg2qnYp9mF2YTYp9mLINix2KfbjNqv2KfZhiDYsdmI24wg2LPYsdmI2LHZh9in24wg2KfYqNix24wg2q/bjNiqINmH2KfYqCDYsdmI2LTZhiDZhtqv2Ycg2YXbjCDYr9in2LHYry4iOiJHaXRIdWIgQWN0aW9ucyBrZWVwcyB5b3VyIGxpdmUgYXRvbWljIGNsb2NrLCBzbWFydCBiaW8sIGFuZCAyNC83IG1vbml0b3JzIGFjdGl2ZSB3aXRob3V0IGludGVycnVwdGlvbnMgb3Igc2VydmVyIGZlZXMuIiwi2q/Zitiq4oCM2YfYp9ioINin2YPYtNmG2LIg2LPYp9i52Kog2LLZhtiv2YfYjCDYqNmK2Yjar9ix2KfZgdmKINmH2YjYtNmF2YbYryDZiCDZvtin2YrYtCDbstu0INiz2KfYudiq2Ycg2LHYpyDYqNiv2YjZhiDZgti32LnZiiDZiCDZg9in2YXZhNin2Ysg2LHYp9mK2q/Yp9mGINix2YjZiiDYs9ix2YjYsdmH2KfZiiDYp9io2LHZiiDar9mK2KrigIzZh9in2Kgg2LHZiNi02YYg2Ybar9mHINmF2YrigIzYr9in2LHYry4iOiJHaXRIdWIgQWN0aW9ucyBrZWVwcyB5b3VyIGxpdmUgYXRvbWljIGNsb2NrLCBzbWFydCBiaW8sIGFuZCAyNC83IG1vbml0b3JzIGFjdGl2ZSB3aXRob3V0IGludGVycnVwdGlvbnMgb3Igc2VydmVyIGZlZXMuIiwi8J+boe+4jyDZhdiz24zYsSDYq9io2Kog2LPaqdix2Kog2YfYpyDYr9ixINqv24zYqiDZh9in2KggKFJlcG9zaXRvcnkgU2VjcmV0cykiOiLwn5uh77iPIFJlcG9zaXRvcnkgU2VjcmV0cyBTZXR1cCBQYXRoIiwi8J+boe+4jyDZhdiz2YrYsSDYq9io2Kog2LPZg9ix2KrigIzZh9inINiv2LEg2q/Zitiq4oCM2YfYp9ioIChSZXBvc2l0b3J5IFNlY3JldHMpIjoi8J+boe+4jyBSZXBvc2l0b3J5IFNlY3JldHMgU2V0dXAgUGF0aCIsIvCflJcg2LHZgdiq2YYg2YXYs9iq2YLZitmFINio2Ycg2LXZgdit2YcgU2VjcmV0cyDYsdmK2b7Yp9iy2YrYqtmI2LHZiiDYtNmF2KciOiLwn5SXIE9wZW4gUmVwb3NpdG9yeSBTZWNyZXRzIFBhZ2UiLCLYr9ixINix2YrZvtin2LLZitiq2YjYsdmKINiu2YjYryDZiNin2LHYryDZhdiz2YrYsSDYstmK2LEg2LTZiNmK2K8g2Ygg2obZh9in2LEg2YXYqti62YrYsSDYstmK2LEg2LHYpyDYq9io2Kog2YbZhdin2YrZitivOiI6Ik5hdmlnYXRlIHRvIHRoZSBmb2xsb3dpbmcgc2V0dGluZ3MgcGF0aCBpbiB5b3VyIHJlcG8gYW5kIGFkZCB0aGVzZSBmb3VyIHNlY3JldHM6Iiwi2YbYp9mFIFNlY3JldCDYr9ixINqv24zYqiDZh9in2KgiOiJTZWNyZXQgTmFtZSBpbiBHaXRIdWIiLCLZhtin2YUgU2VjcmV0INiv2LEg2q/Zitiq4oCM2YfYp9ioIjoiU2VjcmV0IE5hbWUgaW4gR2l0SHViIiwi2LnZhdmE2YrYp9iqINmD2b7ZiiDZhtin2YUiOiJDb3B5IE5hbWUgQWN0aW9uIiwi2LnZhdmE2YrYp9iqINmD2b7ZiiDZhdmC2K/Yp9ixIjoiQ29weSBWYWx1ZSBBY3Rpb24iLCLZg9m+2Yog2YbYp9mFIjoiQ29weSBOYW1lIiwi2YPZvtmKINmF2YLYr9in2LEiOiJDb3B5IFZhbHVlIiwi4pa277iPINin2LPYqtin2LHYqiDar9ix2K/YtCDZg9in2LEg2LHYp9mG2LEgKFJ1biBXb3JrZmxvdykiOiLilrbvuI8gUnVuIFdvcmtmbG93Iiwi8J+agCDYsdmB2KrZhiDYqNmHINi12YHYrdmHIEFjdGlvbnMg2LHZitm+2KfYstmK2KrZiNix2Yog2LTZhdinIjoi8J+agCBPcGVuIEFjdGlvbnMgUGFnZSBpbiBZb3VyIFJlcG8iLCLYr9ixINi12YHYrdmHINqv24zYqiDZh9in2Kgg2LHbjNm+2YjbjCDYrtmI2K/YjCDYqNmHINiq2KgiOiJJbiB5b3VyIEdpdEh1YiByZXBvIGdvIHRvIHRhYiIsItiv2LEg2LXZgdit2Ycg2q/Zitiq4oCM2YfYp9ioINix2YrZvtmI2Yog2K7ZiNiv2Iwg2KjZhyDYqtioIjoiSW4geW91ciBHaXRIdWIgcmVwbyBnbyB0byB0YWIiLCLYqNix2YjbjNivIOKelCDar9ix2K/YtCDaqdin2LEiOiLinpQgU2VsZWN0IHdvcmtmbG93Iiwi2KjYsdmI2YrYryDinpQg2q/Ysdiv2LTigIzZg9in2LEiOiLinpQgU2VsZWN0IHdvcmtmbG93Iiwi2LHYpyDYp9mG2KrYrtin2Kgg2YPZhtmK2K8g4p6UINiv2YPZhdmHIjoi4p6UIENsaWNrIGJ1dHRvbiIsItix2Kcg2KjYstmG2YrYryEiOiIhIiwi8J+foiDYsdin2YbYsSDYp9io2LHbjCDZgdi52KfZhCDYtNiv2Ycg2Ygg2YfYsSDbtCDYs9in2LnYqiDYqNmHINi12YjYsdiqINiu2YjYr9qp2KfYsSDahtix2K7ZhyDYp9is2LHYp9uMINiu2YjYryDYsdinINiq2YXYr9uM2K8g2YXbjCDaqdmG2K8uIjoi8J+foiBDbG91ZCBydW5uZXIgaXMgYWN0aXZlIGFuZCBhdXRvbWF0aWNhbGx5IGxvb3BzIGV2ZXJ5IDQgaG91cnMgd2l0aG91dCBpbnRlcnJ1cHRpb24uIiwi8J+foiDYsdin2YbYsSDYp9io2LHZiiDZgdi52KfZhCDYtNiv2Ycg2Ygg2YfYsSDbtCDYs9in2LnYqiDYqNmH4oCM2LXZiNix2Kog2K7ZiNiv2YPYp9ixINqG2LHYrtmHINin2KzYsdin2Yog2K7ZiNivINix2Kcg2KrZhdiv2YrYryDZhdmK4oCM2YPZhtivLiI6IvCfn6IgQ2xvdWQgcnVubmVyIGlzIGFjdGl2ZSBhbmQgYXV0b21hdGljYWxseSBsb29wcyBldmVyeSA0IGhvdXJzIHdpdGhvdXQgaW50ZXJydXB0aW9uLiIsItmF2LHYrdmE2Ycg2KjYudivOiDZiNix2YjYryDYqNmHINm+2YbZhCDZiCDYqtiz2Kog2YbZh9in2YrZiiI6Ik5leHQgU3RlcDogU2lnbiBJbiAmIEZpbmFsIExhdW5jaCIsIvCfjokg2YXYsdit2YTZhyDZvtmG2KzZhTog2obaqSDZhNuM2LPYqiDZhtmH2KfbjNuM2Iwg2KjYsdix2LPbjCDYs9mE2KfZhdiqINmIINin2KrYtdin2YQg2KrZhNqv2LHYp9mFIjoi8J+OiSBTdGVwIDU6IEZpbmFsIFJlYWRpbmVzcyBDaGVja2xpc3QsIERpYWdub3N0aWNzICYgQ29ubmVjdCIsIvCfjokg2YXYsdit2YTZhyDZvtmG2KzZhTog2obZg+KAjNmE2YrYs9iqINmG2YfYp9mK2YrYjCDYqNix2LHYs9mKINiz2YTYp9mF2Kog2Ygg2KfYqti12KfZhCDYqtmE2q/Ysdin2YUiOiLwn46JIFN0ZXAgNTogRmluYWwgUmVhZGluZXNzIENoZWNrbGlzdCwgRGlhZ25vc3RpY3MgJiBDb25uZWN0Iiwi2KrYqNix24zaqSEg2KrZhdin2YUg2KfYrNiy2KfbjCDYs9uM2LPYqtmFINm+24zaqdix2KjZhtiv24wg2LTYr9mG2K8uINin2qnZhtmI2YYg2YXbjCDYqtmI2KfZhtuM2K8g2LPZhNin2YXYqiDYs9uM2LPYqtmFINix2Kcg2obaqSDaqdix2K/Zh9iMINmG2LPYrtmHINm+2LTYqtuM2KjYp9mGINiv2KfZhtmE2YjYryDaqdmG24zYryDZiCDZiNin2LHYryDZvtmG2YQg2LTZiNuM2K8uIjoiQ29uZ3JhdHVsYXRpb25zISBBbGwgY29tcG9uZW50cyBhcmUgY29uZmlndXJlZC4gWW91IGNhbiBub3cgdmVyaWZ5IGhlYWx0aCwgZG93bmxvYWQgYmFja3VwcywgYW5kIHNpZ24gaW4gdG8gdGhlIHN0dWRpby4iLCLYqtio2LHZitmDISDYqtmF2KfZhSDYp9is2LLYp9mKINiz2YrYs9iq2YUg2b7ZitmD2LHYqNmG2K/ZiiDYtNiv2YbYry4g2KfZg9mG2YjZhiDZhdmK4oCM2KrZiNin2YbZitivINiz2YTYp9mF2Kog2LPZitiz2KrZhSDYsdinINqG2YMg2YPYsdiv2YfYjCDZhtiz2K7ZhyDZvti02KrZitio2KfZhiDYr9in2YbZhNmI2K8g2YPZhtmK2K8g2Ygg2YjYp9ix2K8g2b7ZhtmEINi02YjZitivLiI6IkNvbmdyYXR1bGF0aW9ucyEgQWxsIGNvbXBvbmVudHMgYXJlIGNvbmZpZ3VyZWQuIFlvdSBjYW4gbm93IHZlcmlmeSBoZWFsdGgsIGRvd25sb2FkIGJhY2t1cHMsIGFuZCBzaWduIGluIHRvIHRoZSBzdHVkaW8uIiwi8J+TiyDahtqpINmE24zYs9iqINii2YXYp9iv2q/bjCDZhtmH2KfbjNuMOiI6IvCfk4sgRmluYWwgUmVhZGluZXNzIENoZWNrbGlzdDoiLCLwn5OLINqG2YPigIzZhNmK2LPYqiDYotmF2KfYr9qv2Yog2YbZh9in2YrZijoiOiLwn5OLIEZpbmFsIFJlYWRpbmVzcyBDaGVja2xpc3Q6Iiwi2LHZiNmKINmH2LEg2YXZiNix2K8g2YPZhNmK2YMg2YPZhtmK2K8g2KrYpyDYqtmK2YMg2KjYrtmI2LHYryI6IkNsaWNrIGVhY2ggaXRlbSB0byBjaGVjayBvZmYiLCLYp9mG2LTYudin2Kgg2b7YsdmI2pjZhyAoRm9yaykg2K/YsSDYrdiz2KfYqCDYtNiu2LXbjCDar9uM2Kog2YfYp9ioIjoiRm9yayBwcm9qZWN0IGludG8geW91ciBwZXJzb25hbCBHaXRIdWIgYWNjb3VudCIsItin2YbYtNi52KfYqCDZvtix2YjamNmHIChGb3JrKSDYr9ixINit2LPYp9ioINi02K7YtdmKINqv2YrYquKAjNmH2KfYqCI6IkZvcmsgcHJvamVjdCBpbnRvIHlvdXIgcGVyc29uYWwgR2l0SHViIGFjY291bnQiLCLZvtix2YjamNmHINiv2LEg2LHZitm+2KfYstmK2KrZiNix2Yog2LTYrti12Yog2LTZhdinINmD2YTZiNmGINmIINii2YXYp9iv2Ycg2LTYry4iOiJSZXBvc2l0b3J5IGNsb25lZCBhbmQgcmVhZHkgaW4geW91ciBwZXJzb25hbCBhY2NvdW50LiIsItmD2YTYp9iv2YHZhNixINmI2LHZg9ixINmIINiv2YrYqtin2KjZitizIEQxINiz2KfYrtiq2Ycg2Ygg2YXYs9iq2YLYsSDYtNivIjoiQ2xvdWRmbGFyZSBXb3JrZXIgJiBEMSBEYXRhYmFzZSBkZXBsb3llZCIsItm+2KfbjNqv2KfZhyDYr9in2K/ZhyBTUUxpdGUg2KfYqNix24wg2KjYpyDYs9mC2YEg27HbsNuwINmH2LLYp9ixINix2KfbjNiqINix2KfbjNqv2KfZhiDYr9ixINix2YjYsiDYsdin2Ycg2KfZhtiv2KfYstuMINi02K8uIjoiU2VydmVybGVzcyBTUUxpdGUgZGF0YWJhc2UgaW5pdGlhbGl6ZWQgd2l0aCAxMDAsMDAwIGZyZWUgZGFpbHkgd3JpdGVzLiIsItm+2KfZitqv2KfZhyDYr9in2K/ZhyBTUUxpdGUg2KfYqNix2Yog2KjYpyDYs9mC2YEg27HbsNuwINmH2LLYp9ixINix2KfZitiqINix2KfZitqv2KfZhiDYr9ixINix2YjYsiDYsdin2YfigIzYp9mG2K/Yp9iy2Yog2LTYry4iOiJTZXJ2ZXJsZXNzIFNRTGl0ZSBkYXRhYmFzZSBpbml0aWFsaXplZCB3aXRoIDEwMCwwMDAgZnJlZSBkYWlseSB3cml0ZXMuIiwi2LHYqNin2Kog2YPZhdmD2Yog2K/YsSBCb3RGYXRoZXIg2KfZitis2KfYryDZiCDYp9i52KrYqNin2LHYs9mG2KzZiiDYtNivIjoiSGVscGVyIEJvdCBjcmVhdGVkIGFuZCB2YWxpZGF0ZWQgaW4gQEJvdEZhdGhlciIsItiq2YjaqdmGINix2KjYp9iqINiq2KfbjNuM2K8g2LTYr9mHINmIINii2YXYp9iv2Ycg2K/YsduM2KfZgdiqINm+24zYp9mFINmH2KfYs9iqLiI6IkJvdCB0b2tlbiB2ZXJpZmllZCBhbmQgcmVhZHkgdG8gZm9yd2FyZCBtZXNzYWdlcy4iLCLYqtmI2YPZhiDYsdio2KfYqiDYqtin2YrZitivINi02K/ZhyDZiCDYotmF2KfYr9mHINiv2LHZitin2YHYqiDZvtmK2KfZheKAjNmH2KfYs9iqLiI6IkJvdCB0b2tlbiB2ZXJpZmllZCBhbmQgcmVhZHkgdG8gZm9yd2FyZCBtZXNzYWdlcy4iLCLYs9qp2LHYqiDZh9in24wg2q/bjNiqINmH2KfYqCDYp9qp2LTZhtiyINiz2Kog2Ygg2LHYp9mG2LEg2KfYs9iq2KfYsdiqINi02K8iOiJHaXRIdWIgU2VjcmV0cyBzZXQgJiBBY3Rpb25zIHJ1bm5lciBzdGFydGVkIiwi2LPZg9ix2KrigIzZh9in2Yog2q/Zitiq4oCM2YfYp9ioINin2YPYtNmG2LIg2LPYqiDZiCDYsdin2YbYsSDYp9iz2KrYp9ix2Kog2LTYryI6IkdpdEh1YiBTZWNyZXRzIHNldCAmIEFjdGlvbnMgcnVubmVyIHN0YXJ0ZWQiLCLYotiv2LHYsyDZiNix2YPYsSDZiCDYsdmF2LIg2LHYp9mG2LEg2K/YsSBTZWNyZXRzINir2KjYqiDYtNiv2YbYry4iOiJXb3JrZXIgVVJMIGFuZCBydW5uZXIgc2VjcmV0IGNvbmZpZ3VyZWQgaW4gcmVwbyBzZXR0aW5ncy4iLCLwn5GRINmI2LHZiNivINmF2K/ZitixINmD2YQg2KjZhyDZvtmG2YQg2YXYr9mK2LHZitiqIjoi8J+RkSBTaWduIEluIHRvIEFkbWluIENvbW1hbmQgQ2VudGVyIiwi2LTYr9mHINmIINix2YXYsiDYudio2YjYsdmKINmD2Ycg2K/YsSI6ImFuZCB1c2UgdGhlIHBhc3N3b3JkIGRlZmluZWQgaW4iLCLYqtmG2LjbjNmFINqp2LHYr9uM2K8g2LHYpyDYqNiy2YbbjNivINiq2Kcg2KjZhyDYp9mG2KjYp9ixINmE2KfbjNiz2YbYs9iMINiq2YTZhyDZhdiq2LHbjCDZiCDYp9ix2KrZgtin24wg2qnYp9ix2KjYsdin2YYg2K/Ys9iq2LHYs9uMINuM2KfYqNuM2K8uIjoidG8gYWNjZXNzIHRoZSBsaWNlbnNlIGludmVudG9yeSwgdGVsZW1ldHJ5LCBhbmQgdXNlciBtYW5hZ2VtZW50LiIsItiq2YbYuNmK2YUg2YPYsdiv2YrYryDYsdinINio2LLZhtmK2K8g2KrYpyDYqNmHINin2YbYqNin2LEg2YTYp9mK2LPZhtiz2Iwg2KrZhNmH4oCM2YXYqtix2Yog2Ygg2KfYsdiq2YLYp9mKINmD2KfYsdio2LHYp9mGINiv2LPYqtix2LPZiiDZitin2KjZitivLiI6InRvIGFjY2VzcyB0aGUgbGljZW5zZSBpbnZlbnRvcnksIHRlbGVtZXRyeSwgYW5kIHVzZXIgbWFuYWdlbWVudC4iLCLZiNix2YjYryDYqNmHINm+2YbZhCDZhdiv2YrYsdmK2KogKC9hZG1pbikiOiJTaWduIEluIHRvIEFkbWluIFBvcnRhbCAoL2FkbWluKSIsIvCfk7Eg2KfYqti12KfZhCDYp9qp2KfZhtiqINiq2YTar9ix2KfZhSDYqNmHINiz2YTZgSDYqNin2KoiOiLwn5OxIENvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCB0byBTZWxmYm90Iiwi8J+TsSDYp9iq2LXYp9mEINin2YPYp9mG2Kog2KrZhNqv2LHYp9mFINio2Ycg2LPZhNmB4oCM2KjYp9iqIjoi8J+TsSBDb25uZWN0IFRlbGVncmFtIEFjY291bnQgdG8gU2VsZmJvdCIsItiv2LEg2K/Yp9i02KjZiNix2K8g2YPYp9ix2KjYsdmK2Iwg2LHZiNmKIjoiSW4gdGhlIHVzZXIgZGFzaGJvYXJkLCBjbGljayIsItin2LPZg9mGIFFSINiq2YTar9ix2KfZhSI6IlNjYW4gVGVsZWdyYW0gUVIiLCLYqNiy2YbZitivINmIINin2LIg2KrZhNqv2LHYp9mFINqv2YjYtNmKINiv2LEg2YXYs9mK2LEiOiJhbmQgZnJvbSBUZWxlZ3JhbSBhcHAgbmF2aWdhdGUgdG8iLCLZg9ivINix2Kcg2KfYs9mD2YYg2YbZhdin2YrZitivLiI6InRvIHNjYW4gdGhlIFFSIGNvZGUuIiwi2YjYsdmI2K8g2KjZhyDYr9in2LTYqNmI2LHYryDZg9in2LHYqNix2Yog2KfYs9iq2YjYr9mK2YgiOiJTaWduIEluIHRvIFN0dWRpbyBVc2VyIERhc2hib2FyZCIsIvCfkr4g2K/Yp9mG2YTZiNivINm+2YPZitisINm+2YrZg9ix2KjZhtiv2YogKEpTT04gQmFja3VwKSI6IvCfkr4gRG93bmxvYWQgQ29uZmlndXJhdGlvbiBQYWNrYWdlIChKU09OIEJhY2t1cCkiLCLwn6m6INi524zYqCDbjNin2KjbjCDZiCDYp9iz2qnZhiDYp9iq2LXYp9mE2KfYqiDZiNix2qnYsSI6IvCfqbogTGl2ZSBDbG91ZCBEaWFnbm9zdGljcyAmIENvbm5lY3Rpb24gU2NhbiIsIvCfqbog2LnZitio4oCM2YrYp9io2Yog2Ygg2KfYs9mD2YYg2KfYqti12KfZhNin2Kog2YjYsdmD2LEiOiLwn6m6IExpdmUgQ2xvdWQgRGlhZ25vc3RpY3MgJiBDb25uZWN0aW9uIFNjYW4iLCLwn5qAINmI2LHZiNivINio2Ycg2KfYs9iq2YjYr9uM2Ygg2Ygg2b7Yp9uM2KfZhiDYsdin2Ycg2KfZhtiv2KfYstuMIjoi8J+agCBFbnRlciBTdHVkaW8gJiBGaW5pc2ggU2V0dXAiLCLwn5qAINmI2LHZiNivINio2Ycg2KfYs9iq2YjYr9mK2Ygg2Ygg2b7Yp9mK2KfZhiDYsdin2YfigIzYp9mG2K/Yp9iy2YoiOiLwn5qAIEVudGVyIFN0dWRpbyAmIEZpbmlzaCBTZXR1cCIsIvCfqbog2LnbjNioINuM2KfYqNuMINiy2YbYr9mHINin2KrYtdin2YTYp9iqINmIINm+24zaqdix2KjZhtiv24wg2YjYsdqp2LEiOiLwn6m6IExpdmUgV29ya2VyIERpYWdub3N0aWNzICYgSGVhbHRoIFNjYW4iLCLwn6m6INi52YrYqOKAjNmK2KfYqNmKINiy2YbYr9mHINin2KrYtdin2YTYp9iqINmIINm+2YrZg9ix2KjZhtiv2Yog2YjYsdmD2LEiOiLwn6m6IExpdmUgV29ya2VyIERpYWdub3N0aWNzICYgSGVhbHRoIFNjYW4iLCLYr9ixINit2KfZhCDYp9ix2KrYqNin2Lcg2KjYpyDZiNix2YPYsSDZg9mE2KfYr9mB2YTYsSDZiCDYp9i52KrYqNin2LHYs9mG2KzZiiDYp9iq2LXYp9mE2KfYqi4uLiI6IkNvbm5lY3RpbmcgdG8gQ2xvdWRmbGFyZSBXb3JrZXIgYW5kIHZhbGlkYXRpbmcgZW5kcG9pbnRzLi4uIiwi8J+TpiDYrtix2YjYrNuMINuM2qnYrNin24wg2LPaqdix2Kog2YfYp9uMIEdpdEh1YiBBY3Rpb25zIjoi8J+TpiBCdWxrIEV4cG9ydCBHaXRIdWIgQWN0aW9ucyBTZWNyZXRzIiwi8J+TpiDYrtix2YjYrNmKINmK2YPYrNin2Yog2LPZg9ix2KrigIzZh9in2YogR2l0SHViIEFjdGlvbnMiOiLwn5OmIEJ1bGsgRXhwb3J0IEdpdEh1YiBBY3Rpb25zIFNlY3JldHMiLCLYqtmF2KfZhdmKINmF2KrYutmK2LHZh9in2Yog2YXYrdmK2LfZiiDYqNinINmB2LHZhdiqIjoiQWxsIGVudmlyb25tZW50IHZhcmlhYmxlcyBmb3JtYXR0ZWQgYXMiLCLYotmF2KfYr9mHINio2LHYp9mKINmD2b7ZiiDZitinINin2LPYqtmB2KfYr9mHINmF2LPYqtmC2YrZhToiOiJyZWFkeSB0byBjb3B5IG9yIHVzZSBkaXJlY3RseToiLCLwn5OLINmD2b7ZiiDZg9mEINmF2KrZhiI6IvCfk4sgQ29weSBFbnRpcmUgQmxvY2siLCLZvtmK2KfZhSDYs9mK2LPYqtmFIjoiU3lzdGVtIE5vdGlmaWNhdGlvbiIsItio2LHYsdiz2Yog2LLZhtiv2Ycg2LPZhNin2YXYqiDYr9mK2KrYp9io2YrYsyDZiCDYs9ix2YjZitizIjoiQ2hlY2sgTGl2ZSBEYXRhYmFzZSAmIFNlcnZpY2UgSGVhbHRoIiwi2K7YsdmI2KzbjCDbjNqp2KzYp9uMINiz2qnYsdiqINmH2KfbjCDYsdin2YbYsSI6IkJ1bGsgRXhwb3J0IFJ1bm5lciBTZWNyZXRzIiwi2K7YsdmI2KzZiiDZitmD2KzYp9mKINiz2YPYsdiq4oCM2YfYp9mKINix2KfZhtixIjoiQnVsayBFeHBvcnQgUnVubmVyIFNlY3JldHMiLCLYqti62YrZitixINiq2YUg2LHZiNiyINmIINi02KgiOiJUb2dnbGUgRGF5IC8gTmlnaHQgTW9kZSIsItmI2LHZiNivINmF2LPYqtmC2YrZhSDYqNmHINm+2YbZhCDZhdiv2YrYsdmK2KoiOiJEaXJlY3QgRW50cnkgdG8gQWRtaW4gUG9ydGFsIiwi2YjYsdmI2K8g2KjZhyDZvtmG2YQg2KfYs9iq2YjYr9uM2Ygg2LPZhNmBINio2KfYqiI6IkVudGVyIFNlbGZib3QgU3R1ZGlvIFBhbmVsIiwi2YjYsdmI2K8g2KjZhyDZvtmG2YQg2KfYs9iq2YjYr9mK2Ygg2LPZhNmB4oCM2KjYp9iqIjoiRW50ZXIgU2VsZmJvdCBTdHVkaW8gUGFuZWwiLCLZhdir2KfZhDogQW1pckhvc3NlaW4g2YrYpyB5b3VyLWdpdGh1Yi11c2VybmFtZSI6ImUuZy4gQW1pckhvc3NlaW4gb3IgeW91ci1naXRodWItdXNlcm5hbWUiLCLZhdiq2YYg2K7YsdmI2KzZiiDYqtix2YXZitmG2KfZhCDYsdinINin2YrZhtis2KcgUGFzdGUg2YPZhtmK2K8uLi4iOiJQYXN0ZSB0ZXJtaW5hbCBvdXRwdXQgaGVyZS4uLiIsIti02YbYp9iz2Ycg2LnYr9iv2Yog2obYqiDYtNmF2KcgKENoYXQgSUQg2LnYr9iv2YopIjoiWW91ciBudW1lcmljYWwgVGVsZWdyYW0gQ2hhdCBJRCIsItiq2LnYr9in2K8g2YPYr9mH2KfZiiDZhdmI2LHYryDZhti42LEiOiJRdWFudGl0eSBvZiBjb2RlcyIsItmF2K/YqiDYp9i52KrYqNin2LEg2YTYp9mK2LPZhtizIjoiTGljZW5zZSBEdXJhdGlvbiIsItmF2KfYr9in2YUg2KfZhNi52YXYsSDimb7vuI8gKExpZmV0aW1lIFZJUCkiOiJMaWZldGltZSDimb7vuI8gKFZJUCkiLCLZvtmK2LTZiNmG2K8g2YrYpyDYqNix2obYs9ioINin2K7Yqti12KfYtdmKINmD2K/Zh9inICjYp9iu2KrZitin2LHZiikiOiJDdXN0b20gUHJlZml4IG9yIFRhZyAoT3B0aW9uYWwpIiwi2YXYq9in2YQ6IE5PV1JVWi1TQUxFINmK2KcgVklQLVVTRVIiOiJlLmcuIFNVTU1FUi1TQUxFIG9yIFZJUC1VU0VSIiwiPHNwYW4+8J+On++4jyDYqtmI2YTZitivINmD2K/Zh9in2Yog2YTYp9mK2LPZhtizINis2K/ZitivINmIINin2LbYp9mB2Ycg2KjZhyDYp9mG2KjYp9ixPC9zcGFuPiI6IjxzcGFuPvCfjp/vuI8gR2VuZXJhdGUgTmV3IExpY2Vuc2UgQ29kZXM8L3NwYW4+Iiwi2YHZitmE2KrYsSDYqNixINin2LPYp9izINmI2LbYudmK2Kog2YPYr9mH2Kc6IjoiRmlsdGVyIGJ5IENvZGUgU3RhdHVzOiIsItmH2YXZhyDZg9iv2YfYpyAo2YPZhCDYp9mG2KjYp9ixKSI6IkFsbCBDb2RlcyAoVG90YWwgSW52ZW50b3J5KSIsItmB2YLYtyDZg9iv2YfYp9mKINii2YXYp9iv2Ycg2YHYsdmI2LQgKFVudXNlZCkiOiJBdmFpbGFibGUgQ29kZXMgT25seSAoVW51c2VkKSIsItmB2YLYtyDaqdiv2YfYp9uMINmB2LnYp9mEINi02K/ZhyAoUmVkZWVtZWQpIjoiUmVkZWVtZWQgQ29kZXMgT25seSIsItmB2YLYtyDZg9iv2YfYp9mKINmB2LnYp9mE4oCM2LTYr9mHIChSZWRlZW1lZCkiOiJSZWRlZW1lZCBDb2RlcyBPbmx5Iiwi2YPZvtmKINmH2YXZhyDZg9iv2YfYp9mKINii2YXYp9iv2Ycg2YHYsdmI2LQiOiJDb3B5IEFsbCBBdmFpbGFibGUgQ29kZXMiLCLYqNix2obYs9ioIC8g2YrYp9iv2K/Yp9i02KoiOiJUYWcgLyBOb3RlIiwi2YXYtdix2YEg2qnZhtmG2K/ZhyI6IlJlZGVlbWVkIEJ5Iiwi2YXYtdix2YHigIzZg9mG2YbYr9mHIjoiUmVkZWVtZWQgQnkiLCLYqtin2LHZitiuINmF2LXYsdmBIjoiUmVkZWVtZWQgRGF0ZSIsItiv2LEg2K3Yp9mEINio2KfYsdqv2LDYp9ix2Yog2YTZitiz2Kog2YPYr9mH2KfZiiDZhNin2YrYs9mG2LMuLi4iOiJMb2FkaW5nIGxpY2Vuc2UgY29kZXMgbGlzdC4uLiIsItmF2K/bjNix24zYqiDbjNqp2b7Yp9ix2obZhyDYrdiz2KfYqCDZh9in24wg2qnYp9ix2KjYsduM2Iwg2KjYsdix2LPbjCDYs9mE2YEg2KjYp9iqINmH2Kcg2Ygg2YbYuNin2LHYqiDYp9mF2YbbjNiq24wg2KjYsSDZhdi02KrYsdqp24zZhiI6IlVuaWZpZWQgdXNlciBhY2NvdW50cyBtYW5hZ2VtZW50LCBzZWxmYm90IGluc3BlY3Rpb24sIGFuZCBzZWN1cml0eSBtb25pdG9yaW5nIiwi2YXYr9mK2LHZitiqINmK2YPZvtin2LHahtmHINit2LPYp9io4oCM2YfYp9mKINmD2KfYsdio2LHZitiMINio2LHYsdiz2Yog2LPZhNmB4oCM2KjYp9iq4oCM2YfYpyDZiCDZhti42KfYsdiqINin2YXZhtmK2KrZiiDYqNixINmF2LTYqtix2YPZitmGIjoiVW5pZmllZCB1c2VyIGFjY291bnRzIG1hbmFnZW1lbnQsIHNlbGZib3QgaW5zcGVjdGlvbiwgYW5kIHNlY3VyaXR5IG1vbml0b3JpbmciLCLYrNiz2KrYrNmIINio2LEg2KfYs9in2LMg2YbYp9mFINqp2KfYsdio2LHbjNiMINi02YbYp9iz2Ycg2LnYr9iv24wg24zYpyDYotuMINiv24wg2LHYqNin2KouLi4iOiJTZWFyY2ggYnkgdXNlcm5hbWUsIGNoYXQgSUQsIG9yIGJvdCBJRC4uLiIsItis2LPYqtis2Ygg2KjYsSDYp9iz2KfYsyDZhtin2YUg2YPYp9ix2KjYsdmK2Iwg2LTZhtin2LPZhyDYudiv2K/ZiiDZitinINii2YrigIzYr9mKINix2KjYp9iqLi4uIjoiU2VhcmNoIGJ5IHVzZXJuYW1lLCBjaGF0IElELCBvciBib3QgSUQuLi4iLCLZh9mF2Ycg2LPYt9mI2K0g2K/Ys9iq2LHYs9mKIjoiQWxsIEFjY2VzcyBSb2xlcyIsItmB2YLYtyDZg9in2LHYqNix2KfZhiDYudin2K/ZiiI6IlN0YW5kYXJkIFVzZXJzIE9ubHkiLCLZgdmC2Lcg2YXYr9mK2LHYp9mGINiz2YrYs9iq2YUiOiJTeXN0ZW0gQWRtaW5zIE9ubHkiLCLZh9mF2Ycg2YjYtti524zYqiDZh9in24wg2LHYqNin2KoiOiJBbGwgQm90IFN0YXRlcyIsItmH2YXZhyDZiNi22LnZitiq4oCM2YfYp9mKINix2KjYp9iqIjoiQWxsIEJvdCBTdGF0ZXMiLCLYr9in2LHYp9uMINiz2YTZgSDYqNin2Kog2YXYqti12YQiOiJXaXRoIENvbm5lY3RlZCBTZWxmYm90Iiwi2K/Yp9ix2KfZiiDYs9mE2YHigIzYqNin2Kog2YXYqti12YQiOiJXaXRoIENvbm5lY3RlZCBTZWxmYm90Iiwi2KjYr9mI2YYg2LPZhNmBINio2KfYqiI6IldpdGhvdXQgU2VsZmJvdCIsItmG2YjYuSDYp9i02KrYsdin2YMiOiJQbGFuIFR5cGUiLCLZiNi22LnZitiqINix2KjYp9iqIjoiQm90IFN0YXR1cyIsItii2K7YsduM2YYg2YfZhdqv2KfZhSDYs9in2LLbjCI6Ikxhc3QgU3luY2VkIiwi2KLYrtix2YrZhiDZh9mF2q/Yp9mF4oCM2LPYp9iy2YoiOiJMYXN0IFN5bmNlZCIsItiv2LEg2K3Yp9mEINio2KfYsdqv2LDYp9ix2Yog2KfYt9mE2KfYudin2Kog2YPYp9ix2KjYsdin2YYuLi4iOiJMb2FkaW5nIHVzZXIgYWNjb3VudHMgZGF0YS4uLiIsItit2LPYp9ioINi02YXYpyDYqNmHINi52YTYqiDZvtin2YrYp9mGINmF2K/YqiDYp9i52KrYqNin2LEg2KfYtNiq2LHYp9mDINio2Ycg2K3Yp9mE2Kog2KrYudmE2YrZgiDYr9ix2KLZhdiv2Ycg2KfYs9iqLiI6IllvdXIgYWNjb3VudCBoYXMgYmVlbiBzdXNwZW5kZWQgZHVlIHRvIGV4cGlyZWQgc3Vic2NyaXB0aW9uIHBsYW4uIiwi2KzZh9iqINmB2LnYp9mEINiz2KfYstuMINmF2KzYr9ivINiz2YTZgSDYqNin2Kog2Ygg2KjYp9iyINi02K/ZhiDZvtmG2YQg2KfYs9iq2YjYr9uM2YjYjCDZhNi32YHYp9mLINqp2K8g2YTYp9uM2LPZhtizINis2K/bjNivINiu2YjYryDYsdinINmI2KfYsdivINmG2YXYp9uM24zYrzoiOiJUbyByZWFjdGl2YXRlIHlvdXIgc2VsZmJvdCBhbmQgdW5sb2NrIHRoZSBzdHVkaW8gcGFuZWwsIHBsZWFzZSBlbnRlciB5b3VyIG5ldyBsaWNlbnNlIGNvZGU6Iiwi2KzZh9iqINmB2LnYp9mE4oCM2LPYp9iy2Yog2YXYrNiv2K8g2LPZhNmB4oCM2KjYp9iqINmIINio2KfYsiDYtNiv2YYg2b7ZhtmEINin2LPYqtmI2K/ZitmI2Iwg2YTYt9mB2KfZiyDZg9ivINmE2KfZitiz2YbYsyDYrNiv2YrYryDYrtmI2K8g2LHYpyDZiNin2LHYryDZhtmF2KfZitmK2K86IjoiVG8gcmVhY3RpdmF0ZSB5b3VyIHNlbGZib3QgYW5kIHVubG9jayB0aGUgc3R1ZGlvIHBhbmVsLCBwbGVhc2UgZW50ZXIgeW91ciBuZXcgbGljZW5zZSBjb2RlOiIsItqp2K8g2YTYp9uM2LPZhtizINiu2LHbjNiv2KfYsduMINi02K/ZhyAo2YXYq9in2YQ6IEFSSVpPLUFCQ0QtMTIzNCkiOiJQdXJjaGFzZWQgbGljZW5zZSBjb2RlIChlLmcuIEFSSVpPLUFCQ0QtMTIzNCkiLCLZg9ivINmE2KfZitiz2YbYsyDYrtix2YrYr9in2LHZiuKAjNi02K/ZhyAo2YXYq9in2YQ6IEFSSVpPLUFCQ0QtMTIzNCkiOiJQdXJjaGFzZWQgbGljZW5zZSBjb2RlIChlLmcuIEFSSVpPLUFCQ0QtMTIzNCkiLCI8c3Bhbj7wn5qAINiu2LHZiNisINin2LIg2KrYudmE2YrZgiDZiCDYtNin2LHamDwvc3Bhbj4iOiI8c3Bhbj7wn5qAIFVubG9jayAmIFJlbmV3IFN1YnNjcmlwdGlvbjwvc3Bhbj4iLCLYrtix2YjYrCDYp9iyINit2LPYp9ioINmIINmI2LHZiNivINio2Kcg2YPYp9ix2KjYsdmKINiv2Yrar9ixIjoiTG9nIG91dCBhbmQgc3dpdGNoIGFjY291bnQiLCLZvtuM2LQg2YbZhdin24zYtCI6IlByZXZpZXciLCLZvtmK2LTigIzZhtmF2KfZiti0IjoiUHJldmlldyIsItqp2KfYsdio2LEg2b7bjNi0INmB2LHYtiI6IkRlZmF1bHQgVXNlciIsItmD2KfYsdio2LEg2b7Ziti04oCM2YHYsdi2IjoiRGVmYXVsdCBVc2VyIiwi2KjZitmI2q/Ysdin2YHZiiDYstmG2K/ZhyAoQmlvKSI6IkR5bmFtaWMgQmlvIChCaW8pIiwi2K/YsSDYp9mG2KrYuNin2LEg2YfZhdqv2KfZhSDYs9in2LLbjCDYqNinINiz2LHZiNixINiq2YTar9ix2KfZhS4uLiI6IldhaXRpbmcgZm9yIHN5bmMgd2l0aCBUZWxlZ3JhbSBzZXJ2ZXIuLi4iLCLYr9ixINin2YbYqti42KfYsSDZh9mF2q/Yp9mF4oCM2LPYp9iy2Yog2KjYpyDYs9ix2YjYsSDYqtmE2q/Ysdin2YUuLi4iOiJXYWl0aW5nIGZvciBzeW5jIHdpdGggVGVsZWdyYW0gc2VydmVyLi4uIiwi2KrZgtmI2YrZhSDYrtmI2LHYtNmK2K/ZiiDZiCDYstmF2KfZhiDYqtmH2LHYp9mGOiI6IlNvbGFyIENhbGVuZGFyICYgVGVocmFuIFRpbWU6Iiwi2YjYsdmI2K8g2KjZhyDZvtmG2YQg2YPYp9ix2KjYsdmKIjoiTG9nIEluIHRvIEFjY291bnQiLCLYq9io2Kog2YbYp9mFINqp2KfYsdio2LEg2KzYr9uM2K8iOiJSZWdpc3RlciBOZXcgQWNjb3VudCIsItir2KjYquKAjNmG2KfZhSDZg9in2LHYqNixINis2K/ZitivIjoiUmVnaXN0ZXIgTmV3IEFjY291bnQiLCLZhtin2YUg2YPYp9ix2KjYsdmKINi02YXYpzoiOiJZb3VyIFVzZXJuYW1lOiIsItmG2KfZhSDZg9in2LHYqNix2Yog2YjYsdmI2K8gKNit2K/Yp9mC2YQg27Mg2K3YsdmBINin2Ybar9mE2YrYs9mKKSI6IkxvZ2luIHVzZXJuYW1lIChtaW4gMyBjaGFycykiLCLYsdmF2LIg2LnYqNmI2LEg2KfZitmF2YYgKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiU2VjdXJlIHBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLaqdivINmE2KfbjNiz2YbYsyDYrtix24zYr9in2LHbjCDYtNiv2Yc6IjoiUHVyY2hhc2VkIExpY2Vuc2UgQ29kZToiLCLZg9ivINmE2KfZitiz2YbYsyDYrtix2YrYr9in2LHZiuKAjNi02K/ZhzoiOiJQdXJjaGFzZWQgTGljZW5zZSBDb2RlOiIsIijYp9mE2LLYp9mF2YopIjoiKFJlcXVpcmVkKSIsItmD2K8g2YTYp9mK2LPZhtizINiu2LHZitivINin2LTYqtix2KfZgyAo2YXYq9in2YQ6IEFSSVpPLVhYWFgtWVlZWSkiOiJQdXJjaGFzZWQgbGljZW5zZSBjb2RlIChlLmcuIEFSSVpPLVhYWFgtWVlZWSkiLCLwn5KhINio2LHYp9mKINiv2LHZitin2YHYqiDZg9ivINin2LTYqtix2KfZgyDYqNmHINin2K/ZhdmK2YYg2YrYpyDYsdio2KfYqiDZgdix2YjYtCDZhdix2KfYrNi52Ycg2YbZhdin2YrZitivLiI6IvCfkqEgVG8gZ2V0IGEgbGljZW5zZSBjb2RlLCBjb250YWN0IGFkbWluIG9yIHN1cHBvcnQuIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYp9mG2KrYrtin2KjZijoiOiJEZXNpcmVkIFVzZXJuYW1lOiIsItmG2KfZhSDaqdin2LHYqNix24wg2KfZhtqv2YTbjNiz24wg2YXZhtit2LXYsSDYqNmHINmB2LHYryI6IlVuaXF1ZSBhbHBoYW51bWVyaWMgdXNlcm5hbWUiLCLZhtin2YUg2YPYp9ix2KjYsdmKINin2Ybar9mE2YrYs9mKINmF2YbYrdi12LHigIzYqNmH4oCM2YHYsdivIjoiVW5pcXVlIGFscGhhbnVtZXJpYyB1c2VybmFtZSIsItit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEg2LTYp9mF2YQg2K3YsdmI2YEg2Ygg2KfYudiv2KfYryI6IkF0IGxlYXN0IDggY2hhcmFjdGVycyB3aXRoIGxldHRlcnMgJiBudW1iZXJzIiwi2KrZg9ix2KfYsSDYsdmF2LIg2LnYqNmI2LE6IjoiQ29uZmlybSBQYXNzd29yZDoiLCLYqtmD2LHYp9ixINix2YXYsiDYudio2YjYsSDYp9mG2KrYrtin2KjZiiI6IkNvbmZpcm0geW91ciBwYXNzd29yZCIsIjxzcGFuPtir2KjYqiDZhtin2YUg2Ygg2YHYudin2YQg2LPYp9iy24wg2KfYtNiq2LHYp9qpIEFyaXpvIFNlbGY8L3NwYW4+IjoiPHNwYW4+UmVnaXN0ZXIgJiBBY3RpdmF0ZSBTdWJzY3JpcHRpb248L3NwYW4+IiwiPHNwYW4+2KvYqNiq4oCM2YbYp9mFINmIINmB2LnYp9mE4oCM2LPYp9iy2Yog2KfYtNiq2LHYp9mDIEFyaXpvIFNlbGY8L3NwYW4+IjoiPHNwYW4+UmVnaXN0ZXIgJiBBY3RpdmF0ZSBTdWJzY3JpcHRpb248L3NwYW4+Iiwi2KfYqti12KfZhCDZhdiz2KrZgtmK2YUg2Ygg2LHYs9mF2Yog2KfZg9in2YbYqiDYqtmE2q/Ysdin2YUiOiJEaXJlY3QgJiBPZmZpY2lhbCBUZWxlZ3JhbSBBY2NvdW50IENvbm5lY3Rpb24iLCLZiNix2YjYryDYqNinINi02YXYp9ix2Ycg2YXZiNio2KfbjNmEINmIINqp2K8g2b7bjNin2YXaqduMICjYs9ix24zYuSDYqtix24zZhiDZiCDZhdi32YXYptmGINiq2LHbjNmGINix2YjYtCDYsdiz2YXbjCkiOiJMb2cgaW4gdmlhIFBob25lIE51bWJlciAmIFNNUyBjb2RlIChGYXN0ZXN0ICYgTW9zdCBTZWN1cmUpIiwi2YjYsdmI2K8g2KjYpyDYtNmF2KfYsdmHINmF2YjYqNin2YrZhCDZiCDZg9ivINm+2YrYp9mF2YPZiiAo2LPYsdmK2LnigIzYqtix2YrZhiDZiCDZhdi32YXYptmG4oCM2KrYsdmK2YYg2LHZiNi0INix2LPZhdmKKSI6IkxvZyBpbiB2aWEgUGhvbmUgTnVtYmVyICYgU01TIGNvZGUgKEZhc3Rlc3QgJiBNb3N0IFNlY3VyZSkiLCLYtNmF2KfYsdmHINmF2YjYqNin2YrZhCDYqtmE2q/Ysdin2YUg2LTZhdinICjYqNinINmD2K8g2YPYtNmI2LHYjCDZhdir2YTYp9mLIDk4OTEyMzQ1Njc4OSspOiI6IllvdXIgVGVsZWdyYW0gUGhvbmUgTnVtYmVyICh3aXRoIGNvdW50cnkgY29kZSwgZS5nLiArMS4uLik6Iiwi2LTZhdin2LHZhyDZh9mF2LHYp9mHINio2Kcg2YHYsdmF2Kog2KjbjNmGINin2YTZhdmE2YTbjCI6IlBob25lIG51bWJlciB3aXRoIGludGVybmF0aW9uYWwgZm9ybWF0Iiwi2LTZhdin2LHZhyDZh9mF2LHYp9mHINio2Kcg2YHYsdmF2Kog2KjZitmG4oCM2KfZhNmF2YTZhNmKIjoiUGhvbmUgbnVtYmVyIHdpdGggaW50ZXJuYXRpb25hbCBmb3JtYXQiLCI8c3Bhbj7Yr9ix2YrYp9mB2Kog2YPYryDYqtij2YrZitivINmI2LHZiNivPC9zcGFuPiI6IjxzcGFuPlJlY2VpdmUgTG9naW4gQ29kZTwvc3Bhbj4iLCLaqdivINiq2KPbjNuM2K8g27Ug2LHZgtmF24wg2KfYsdiz2KfZhCDYtNiv2Ycg2K/YsSDYqtmE2q/Ysdin2YU6IjoiNS1kaWdpdCB2ZXJpZmljYXRpb24gY29kZSBzZW50IGluIFRlbGVncmFtOiIsItmD2K8g2KrYo9mK2YrYryDbtSDYsdmC2YXZiiDYp9ix2LPYp9mE4oCM2LTYr9mHINiv2LEg2KrZhNqv2LHYp9mFOiI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUgc2VudCBpbiBUZWxlZ3JhbToiLCLZg9ivINu1INix2YLZhdmKINin2LHYs9in2YTZiiI6IjUtZGlnaXQgdmVyaWZpY2F0aW9uIGNvZGUiLCLYsdmF2LIg2KrYo9uM24zYryDZh9mI24zYqiDYr9mIINmF2LHYrdmE2Ycg2KfbjCAo2K/YsSDYtdmI2LHYqiDZgdi52KfZhCDYqNmI2K/ZhiDYr9ixINiq2YTar9ix2KfZhSk6IjoiVHdvLVN0ZXAgVmVyaWZpY2F0aW9uIFBhc3N3b3JkIChpZiBlbmFibGVkIG9uIFRlbGVncmFtKToiLCLYsdmF2LIg2KrYo9mK2YrYryDZh9mI2YrYqiDYr9mIINmF2LHYrdmE2YfigIzYp9mKICjYr9ixINi12YjYsdiqINmB2LnYp9mEINio2YjYr9mGINiv2LEg2KrZhNqv2LHYp9mFKToiOiJUd28tU3RlcCBWZXJpZmljYXRpb24gUGFzc3dvcmQgKGlmIGVuYWJsZWQgb24gVGVsZWdyYW0pOiIsItix2YXYsiDYudio2YjYsSDYr9mIINmF2LHYrdmE2Ycg2KfbjCAo27JGQSkiOiJUd28tU3RlcCBQYXNzd29yZCAoMkZBKSIsItix2YXYsiDYudio2YjYsSDYr9mIINmF2LHYrdmE2YfigIzYp9mKICjbskZBKSI6IlR3by1TdGVwIFBhc3N3b3JkICgyRkEpIiwiPHNwYW4+2KrYo9uM24zYryDZiCDYp9iq2LXYp9mEINio2Ycg2LPZhNmBINio2KfYqjwvc3Bhbj4iOiI8c3Bhbj5WZXJpZnkgJiBDb25uZWN0IFNlbGZib3Q8L3NwYW4+IiwiPHNwYW4+2KrYo9mK2YrYryDZiCDYp9iq2LXYp9mEINio2Ycg2LPZhNmB4oCM2KjYp9iqPC9zcGFuPiI6IjxzcGFuPlZlcmlmeSAmIENvbm5lY3QgU2VsZmJvdDwvc3Bhbj4iLCLYsdi02KrZhyDYs9i02YYg2YPYp9mF2YQgKFN0cmluZyBTZXNzaW9uKToiOiJGdWxsIFN0cmluZyBTZXNzaW9uOiIsItix2LTYqtmHINiz2LTZhiDYt9mI2YTYp9mG2Yog2KrZhNqv2LHYp9mFIChTdHJpbmcgU2Vzc2lvbikiOiJMb25nIFRlbGVncmFtIFN0cmluZyBTZXNzaW9uIiwiPHNwYW4+2KjYsdix2LPbjCDZiCDZgdi52KfZhCDYs9in2LLbjCDYs9i02YY8L3NwYW4+IjoiPHNwYW4+VmVyaWZ5ICYgQWN0aXZhdGUgU2Vzc2lvbjwvc3Bhbj4iLCI8c3Bhbj7YqNix2LHYs9mKINmIINmB2LnYp9mE4oCM2LPYp9iy2Yog2LPYtNmGPC9zcGFuPiI6IjxzcGFuPlZlcmlmeSAmIEFjdGl2YXRlIFNlc3Npb248L3NwYW4+Iiwi2KfYs9iq2YjYr9uM2YjbjCDZvtuM2qnYsdio2YbYr9uMINiz2YTZgSDYqNin2Kog2YfZiNi02YXZhtivIjoiSW50ZWxsaWdlbnQgU2VsZmJvdCBDb25maWd1cmF0aW9uIFN0dWRpbyIsItin2LPYqtmI2K/ZitmI2Yog2b7ZitmD2LHYqNmG2K/ZiiDYs9mE2YHigIzYqNin2Kog2YfZiNi02YXZhtivIjoiSW50ZWxsaWdlbnQgU2VsZmJvdCBDb25maWd1cmF0aW9uIFN0dWRpbyIsIjxzcGFuPvCfkr4g2LDYrtmK2LHZhyDZiCDYp9i52YXYp9mEINiq2LrZitmK2LHYp9iqINin2LPYqtmI2K/ZitmIPC9zcGFuPiI6IjxzcGFuPvCfkr4gU2F2ZSAmIEFwcGx5IFN0dWRpbyBDaGFuZ2VzPC9zcGFuPiIsItmF2LHaqdiyINiq2YTZhyDZhdiq2LHbjCDZiCDZiNi22LnbjNiqINmE2K3YuNmHINin24wg2LPZhNmBINio2KfYqiI6IlRlbGVtZXRyeSBDZW50ZXIgJiBSZWFsLVRpbWUgQm90IFN0YXR1cyIsItmF2LHZg9iyINiq2YTZh+KAjNmF2KrYsdmKINmIINmI2LbYudmK2Kog2YTYrdi42YfigIzYp9mKINiz2YTZgeKAjNio2KfYqiI6IlRlbGVtZXRyeSBDZW50ZXIgJiBSZWFsLVRpbWUgQm90IFN0YXR1cyIsItmH2YXar9in2YUg2LPYp9iy24wg2KLZhtuMIjoiSW5zdGFudCBTeW5jIiwi2YfZhdqv2KfZheKAjNiz2KfYstmKINii2YbZiiI6Ikluc3RhbnQgU3luYyIsItiq2LnZiNmK2LYg2KfZg9in2YbYqiDYqtmE2q/Ysdin2YUiOiJTd2l0Y2ggVGVsZWdyYW0gQWNjb3VudCIsItmI2LbYudmK2Kog2KfYqti12KfZhCDYsdio2KfYqjoiOiJCb3QgQ29ubmVjdGlvbiBTdGF0dXM6Iiwi2KLYrtix2YrZhiDYp9iz2KrYudmE2KfZhSDZiCDYudmF2YTZg9ix2K86IjoiTGFzdCBRdWVyeSAmIFBlcmZvcm1hbmNlOiIsItiq2YjYs9i52Ycg24zYp9mB2KrZhyDYqNinINio2KfZhNin2KrYsduM2YYg2KfYs9iq2KfZhtiv2KfYsdiv2YfYp9uMINin2YXZhtuM2KrbjCDYp9io2LHbjCDZiCDYqtmI2LLbjNi5INmE2KjZhyDYp9uMIjoiRW5naW5lZXJlZCB3aXRoIGhpZ2hlc3QgY2xvdWQgc2VjdXJpdHkgc3RhbmRhcmRzICYgZWRnZSBkaXN0cmlidXRpb24iLCLYqtmI2LPYudmH4oCM2YrYp9mB2KrZhyDYqNinINio2KfZhNin2KrYsdmK2YYg2KfYs9iq2KfZhtiv2KfYsdiv2YfYp9mKINin2YXZhtmK2KrZiiDYp9io2LHZiiDZiCDYqtmI2LLZiti5INmE2KjZh+KAjNin2YoiOiJFbmdpbmVlcmVkIHdpdGggaGlnaGVzdCBjbG91ZCBzZWN1cml0eSBzdGFuZGFyZHMgJiBlZGdlIGRpc3RyaWJ1dGlvbiIsItiq2YbYuNmK2YXYp9iqINit2LPYp9ioINmIINin2YXZhtmK2Kog2YPYp9ix2KjYsdmKIjoiQWNjb3VudCBTZXR0aW5ncyAmIFVzZXIgU2VjdXJpdHkiLCLYtNin2LHamCDZiCDYqtmF2K/ZitivINin2LTYqtix2KfZgyDYqNinINmD2K8g2YTYp9mK2LPZhtizINis2K/ZitivIjoiUmVuZXcgU3Vic2NyaXB0aW9uIHdpdGggTmV3IExpY2Vuc2UgQ29kZSIsItmD2K8g2YTYp9mK2LPZhtizINis2K/ZitivICjZhdir2KfZhDogQVJJWk8tRVhULTEyMzQpIjoiTmV3IGxpY2Vuc2UgY29kZSAoZS5nLiBBUklaTy1FWFQtMTIzNCkiLCLYp9i52YXYp9mEINmD2K8g2KrZhdiv2YrYryI6IlJlZGVlbSBFeHRlbnNpb24gQ29kZSIsItiq2LrZitmK2LEg2LHZhdiyINi52KjZiNixINit2LPYp9ioINmD2KfYsdio2LHZiiI6IkNoYW5nZSBBY2NvdW50IFBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINmB2LnZhNmKOiI6IkN1cnJlbnQgUGFzc3dvcmQ6Iiwi2LHZhdiyINi52KjZiNixINmB2LnZhNmKINit2LPYp9ioIjoiQ3VycmVudCBhY2NvdW50IHBhc3N3b3JkIiwi2LHZhdiyINi52KjZiNixINis2K/ZitivOiI6Ik5ldyBQYXNzd29yZDoiLCLYsdmF2LIg2KzYr9mK2K8gKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiTmV3IHBhc3N3b3JkIChtaW4gOCBjaGFycykiLCLYsNiu2YrYsdmHINix2YXYsiDYudio2YjYsSDYrNiv2YrYryI6IlNhdmUgTmV3IFBhc3N3b3JkIiwi2YLYt9i5INin2LHYqtio2KfYtyDYp9qp2KfZhtiqINiq2YTar9ix2KfZhSDYp9iyINiz2YTZgSDYqNin2KoiOiJEaXNjb25uZWN0IFRlbGVncmFtIEFjY291bnQgZnJvbSBTZWxmYm90Iiwi2YLYt9i5INin2LHYqtio2KfYtyDYp9mD2KfZhtiqINiq2YTar9ix2KfZhSDYp9iyINiz2YTZgeKAjNio2KfYqiI6IkRpc2Nvbm5lY3QgVGVsZWdyYW0gQWNjb3VudCBmcm9tIFNlbGZib3QiLCLYrdiw2YEg2qnYp9mF2YQg2K3Ys9in2Kgg2qnYp9ix2KjYsduMINmIINiq2YXYp9mF24wg2K/Yp9iv2Ycg2YfYpyI6IlBlcm1hbmVudGx5IERlbGV0ZSBBY2NvdW50ICYgQWxsIERhdGEiLCLYrdiw2YEg2YPYp9mF2YQg2K3Ys9in2Kgg2YPYp9ix2KjYsdmKINmIINiq2YXYp9mF2Yog2K/Yp9iv2YfigIzZh9inIjoiUGVybWFuZW50bHkgRGVsZXRlIEFjY291bnQgJiBBbGwgRGF0YSIsItiq2YjZhNmK2K8g2YPYr9mH2KfZiiDZhNin2YrYs9mG2LMg2KzYr9mK2K8iOiJHZW5lcmF0ZSBOZXcgTGljZW5zZSBDb2RlcyIsItmD2K/Zh9in2Yog2KjYp9iy2YrYp9io2Yog2KfYtti32LHYp9ix2YoiOiJFbWVyZ2VuY3kgUmVjb3ZlcnkgQ29kZXMiLCLYqNinINmF2YjZgdmC2YrYqiDYp9iz2KrYrtix2KfYrCDZiCDYr9ixINmB2YrZhNiv2YfYpyDYrNin2Yrar9iw2KfYsdmKINi02K8hIjoiU3VjY2Vzc2Z1bGx5IGV4dHJhY3RlZCBhbmQgZmlsbGVkIGludG8gZmllbGRzISIsItin2LfZhNin2LnYp9iqINio2Kcg2YXZiNmB2YLZitiqINin2LIg2K7YsdmI2KzZiiDYqtix2YXZitmG2KfZhCDYtNmG2KfYs9in2YrZiiDYtNiv2YbYryEg4pyoIjoiSW5mb3JtYXRpb24gc3VjY2Vzc2Z1bGx5IHJlY29nbml6ZWQgZnJvbSB0ZXJtaW5hbCBvdXRwdXQhIOKcqCIsItmB2KfYsdiz2YoiOiJQZXJzaWFuIiwi2aog2KrZg9mF2YrZhCDYtNiv2YciOiIlIENvbXBsZXRlZCIsItmF2LHYrdmE2Ycg27Ig2KfYsiDbtTog2YPZhNin2K/ZgdmE2LEg2Ygg2b7Yp9mK2q/Yp9mHINiv2KfYr9mHIEQxIjoiU3RlcCAyIG9mIDU6IENsb3VkZmxhcmUgJiBEMSBEYXRhYmFzZSIsItmF2LHYrdmE2Ycg27Mg2KfYsiDbtTog2KrZhNqv2LHYp9mFINmIINix2KjYp9iqINmD2YXZg9mKIjoiU3RlcCAzIG9mIDU6IFRlbGVncmFtICYgSGVscGVyIEJvdCIsItmF2LHYrdmE2Ycg27Ug2KfYsiDbtTog2obaqSDZhNuM2LPYqiDZhtmH2KfbjNuM2Iwg2LPZhNin2YXYqiDZiCDYp9iq2LXYp9mEIjoiU3RlcCA1IG9mIDU6IEZpbmFsIENoZWNrbGlzdCwgSGVhbHRoICYgQ29ubmVjdCIsItmF2LHYrdmE2Ycg27Ug2KfYsiDbtTog2obZg+KAjNmE2YrYs9iqINmG2YfYp9mK2YrYjCDYs9mE2KfZhdiqINmIINin2KrYtdin2YQiOiJTdGVwIDUgb2YgNTogRmluYWwgQ2hlY2tsaXN0LCBIZWFsdGggJiBDb25uZWN0Iiwi2LHZhdiyINiq2LXYp9iv2YHZiiDYp9mK2YXZhiDYqtmI2YTZitivINi02K8g8J+OsiI6IlNlY3VyZSByYW5kb20gcGFzc3dvcmQgZ2VuZXJhdGVkIPCfjrIiLCIjINmF2KrYutmK2LHZh9in2Yog2YXYrdmK2LfZiiDZg9mE2KfZitmG2Kog2KrZhNqv2LHYp9mFINmIINmD2YTZitiv2YfYp9mKINmF2K/Zitix2YrYqlxcbiI6IiMgVGVsZWdyYW0gQ2xpZW50IEVudmlyb25tZW50IFZhcmlhYmxlcyAmIEFkbWluIEtleXNcXG4iLCIjINmF2KrYutmK2LHZh9in2Yog2YXYrdmK2LfZiiDZg9mE2KfZitmG2Kog2KrZhNqv2LHYp9mFINmIINmD2YTZitiv2YfYp9mKINmF2K/Zitix2YrYqiI6IiMgVGVsZWdyYW0gQ2xpZW50IEVudmlyb25tZW50IFZhcmlhYmxlcyAmIEFkbWluIEtleXMiLCLZhdit2KrZiNin2Yog2YHYp9mK2YQgd3JhbmdsZXIudG9tbCDZg9m+2Yog2LTYryEg8J+TiyI6IndyYW5nbGVyLnRvbWwgY29udGVudHMgY29waWVkISDwn5OLIiwi2YHYp9mK2YQgd3JhbmdsZXIudG9tbCDYqNinINmF2YjZgdmC2YrYqiDYr9in2YbZhNmI2K8g2LTYryEg8J+TpSI6IndyYW5nbGVyLnRvbWwgZG93bmxvYWRlZCBzdWNjZXNzZnVsbHkhIPCfk6UiLCLZvtmD2YrYrCDZvti02KrZitio2KfZhiDZg9in2YbZgdmK2q8g2LDYrtmK2LHZhyDYtNivISDwn5K+IjoiQ29uZmlndXJhdGlvbiBiYWNrdXAgc2F2ZWQhIPCfkr4iLCLYotiv2LHYsyDYr9in2YXZhtmHINmI2LHZg9ixINmD2b7ZiiDYtNivIPCfk4siOiJXb3JrZXIgVVJMIGNvcGllZCB0byBjbGlwYm9hcmQg8J+TiyIsItix2YXYsiDYsdin2YbYsSDZg9m+2Yog2LTYryDwn5OLIjoiUnVubmVyIHNlY3JldCBjb3BpZWQgdG8gY2xpcGJvYXJkIPCfk4siLCLwn5OLINiv2LEg2K3Yp9mB2LjZhyDZg9m+2Yog2LTYryEiOiLwn5OLIENvcGllZCB0byBjbGlwYm9hcmQhIiwi2K7Yt9inINiv2LEg2YPZvtmKINiu2YjYr9mD2KfYsdibINmE2LfZgdin2Ysg2K/Ys9iq2Yog2YPZvtmKINmD2YbZitivIjoiQXV0by1jb3B5IGZhaWxlZDsgcGxlYXNlIGNvcHkgbWFudWFsbHkiLCLinIUg2KzYr9in2YjZhCDZvtin2Yrar9in2Ycg2K/Yp9iv2YcgRDEg2KjYpyDZhdmI2YHZgtmK2Kog2LPYp9iu2KrZhyDYtNiv2YbYryEiOiLinIUgRGF0YWJhc2UgRDEgdGFibGVzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5ISIsItiu2LfYpyDYr9ixINin2YrYrNin2K8g2KzYr9in2YjZhCBEMSI6IkVycm9yIGNyZWF0aW5nIEQxIHRhYmxlcyIsIjxzcGFuPuKaoSDYs9in2K7YqiDYrtmI2K/Zg9in2LEg2KzYr9in2YjZhCBEMTwvc3Bhbj4iOiI8c3Bhbj7imqEgQXV0byBDcmVhdGUgRDEgVGFibGVzPC9zcGFuPiIsItmE2LfZgdin2Ysg2KfYqNiq2K/YpyDYqtmI2YPZhiDYsdio2KfYqiDYsdinINmI2KfYsdivINmD2YbZitivISI6IlBsZWFzZSBlbnRlciBib3QgdG9rZW4gZmlyc3QhIiwiPHNwYW4+4o+zINiv2LEg2K3Yp9mEINio2LHYsdiz2YouLi48L3NwYW4+IjoiPHNwYW4+4o+zIFZlcmlmeWluZy4uLjwvc3Bhbj4iLCI+4pyFINiq2YjZg9mGINiq2YTar9ix2KfZhSDZg9in2YXZhNin2Ysg2YXYudiq2KjYsSDZiCDZgdi52KfZhCDYp9iz2KohPC9kaXY+IjoiPuKchSBUZWxlZ3JhbSB0b2tlbiBpcyB2YWxpZCBhbmQgYWN0aXZlITwvZGl2PiIsIjxkaXY+PHN0cm9uZz7ZitmI2LLYsdmG2YrZhTo8L3N0cm9uZz4gQCI6IjxkaXY+PHN0cm9uZz5Vc2VybmFtZTo8L3N0cm9uZz4gQCIsIjxkaXY+PHN0cm9uZz7YtNmG2KfYs9mHINi52K/Yr9mKINix2KjYp9iqOjwvc3Ryb25nPiA8Y29kZT4iOiI8ZGl2PjxzdHJvbmc+Qm90IE51bWVyaWNhbCBJRDo8L3N0cm9uZz4gPGNvZGU+Iiwi2LHYqNin2Kog2KjYpyDZhdmI2YHZgtmK2Kog2KrYp9mK2YrYryDYtNivIPCfpJYiOiJCb3QgdmVyaWZpZWQgc3VjY2Vzc2Z1bGx5IPCfpJYiLCI8c3Ryb25nPuKdjCDYrti32KfZiiDYqtmE2q/Ysdin2YU6PC9zdHJvbmc+IjoiPHN0cm9uZz7inYwgVGVsZWdyYW0gRXJyb3I6PC9zdHJvbmc+Iiwi2KrZiNmD2YYg2YbYp9mF2LnYqtio2LEg2KfYs9iqLiI6IkludmFsaWQgYm90IHRva2VuLiIsIjxzcGFuPvCfmoAg2KrYs9iqINii2YbZhNin2YrZhiDYqtmI2YPZhjwvc3Bhbj4iOiI8c3Bhbj7wn5qAIFRlc3QgQm90IFRva2VuIE9ubGluZTwvc3Bhbj4iLCLZhNi32YHYp9mLINiq2YjZg9mGINix2KjYp9iqINmIIENoYXQgSUQg2LnYr9iv2Yog2K7ZiNivINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8hIjoiUGxlYXNlIGVudGVyIGJvdCB0b2tlbiBhbmQgbnVtZXJpY2FsIENoYXQgSUQhIiwi2K/YsSDYrdin2YQg2KfYsdiz2KfZhCDZvtmK2KfZhSDYqtiz2Kog2KjZhyDYqtmE2q/Ysdin2YUuLi4iOiJTZW5kaW5nIHRlc3QgbWVzc2FnZSB0byBUZWxlZ3JhbS4uLiIsIvCfjokg2b7Zitin2YUg2KjYpyDZhdmI2YHZgtmK2Kog2K/YsSDYqtmE2q/Ysdin2YUg2K/YsdmK2KfZgdiqINi02K8hINix2KjYp9iqINii2YXYp9iv2Ycg2KjZhyDZg9in2LEg2KfYs9iqLiI6IvCfjokgTWVzc2FnZSByZWNlaXZlZCBpbiBUZWxlZ3JhbSEgQm90IGlzIHJlYWR5LiIsItm+2YrYp9mFINiq2YTar9ix2KfZhSDYp9ix2LPYp9mEINi02K8hIPCfk6kiOiJUZWxlZ3JhbSBtZXNzYWdlIHNlbnQhIPCfk6kiLCLYp9ix2LPYp9mEINmG2LTYry4g2KfYt9mF24zZhtin2YYg2K3Yp9i12YQg2qnZhtuM2K8g2LHYqNin2Kog2LHYpyDYr9ixINiq2YTar9ix2KfZhSDYp9iz2KrYp9ix2Kog2qnYsdiv2Ycg2KfbjNivLiI6Ik5vdCBzZW50LiBNYWtlIHN1cmUgeW91IHN0YXJ0ZWQgdGhlIGJvdCBpbiBUZWxlZ3JhbS4iLCLYp9ix2LPYp9mEINmG2LTYry4g2KfYt9mF2YrZhtin2YYg2K3Yp9i12YQg2YPZhtmK2K8g2LHYqNin2Kog2LHYpyDYr9ixINiq2YTar9ix2KfZhSDYp9iz2KrYp9ix2Kog2YPYsdiv2YfigIzYp9mK2K8uIjoiTm90IHNlbnQuIE1ha2Ugc3VyZSB5b3Ugc3RhcnRlZCB0aGUgYm90IGluIFRlbGVncmFtLiIsIjxzcGFuPvCfk6kg2KfYsdiz2KfZhCDZvtmK2KfZhSDYqtiz2Ko8L3NwYW4+IjoiPHNwYW4+8J+TqSBTZW5kIFRlc3QgTWVzc2FnZTwvc3Bhbj4iLCI+2K/YsSDYrdin2YQg2K/YsdmK2KfZgdiqINmI2LbYudmK2Kog2LLZhtiv2Ycg2KfYsiDYs9ix2YjYsS4uLjwvZGl2PiI6Ij5GZXRjaGluZyBsaXZlIHNlcnZlciBzdGF0dXMuLi48L2Rpdj4iLCI+8J+UtCDYqti52LHZitmBINmG2LTYr9mHPC9zcGFuPiI6Ij7wn5S0IE5vdCBEZWZpbmVkPC9zcGFuPiIsIj7wn5+iINmF2KrYtdmEINmIINis2K/Yp9mI2YQg2KLZhdin2K/ZhyAo2KrYudiv2KfYryDZg9mE2YrYr9mH2Kc6IjoiPvCfn6IgQ29ubmVjdGVkICYgVGFibGVzIFJlYWR5IChLZXlzIGNvdW50OiIsIj7wn5+hINiv24zYqtin2KjbjNizINmF2KrYtdmEINin2LPYqiDYp9mF2Kcg2KzYr9in2YjZhCDZh9mG2YjYsiDYs9in2K7YqtmHINmG2LTYr9mHINin2YbYrzwvc3Bhbj4iOiI+8J+foSBEYXRhYmFzZSBjb25uZWN0ZWQgYnV0IHRhYmxlcyBub3QgY3JlYXRlZCB5ZXQ8L3NwYW4+IiwiPvCfn6Eg2K/Zitiq2KfYqNmK2LMg2YXYqti12YQg2KfYs9iqINin2YXYpyDYrNiv2KfZiNmEINmH2YbZiNiyINiz2KfYrtiq2Ycg2YbYtNiv2YfigIzYp9mG2K88L3NwYW4+IjoiPvCfn6EgRGF0YWJhc2UgY29ubmVjdGVkIGJ1dCB0YWJsZXMgbm90IGNyZWF0ZWQgeWV0PC9zcGFuPiIsIj7wn5S0INmF2KrYtdmEINmG2YrYs9iqPC9zcGFuPiI6Ij7wn5S0IE5vdCBDb25uZWN0ZWQ8L3NwYW4+IiwiPuKaoSDYs9in2K7YqiDZgdmI2LHZiiDYrNiv2KfZiNmEINiv2YrYqtin2KjZitizIEQxPC9idXR0b24+IjoiPuKaoSBDcmVhdGUgRDEgRGF0YWJhc2UgVGFibGVzIEluc3RhbnRseTwvYnV0dG9uPiIsIjxzcGFuPvCfjJAg2KLYr9ix2LMg2K/Yp9mF2YbZhyDZiNix2YPYsTo8L3NwYW4+IjoiPHNwYW4+8J+MkCBXb3JrZXIgRG9tYWluIFVSTDo8L3NwYW4+IiwiPHNwYW4+8J+XhO+4jyDZvtin2Yrar9in2Ycg2K/Yp9iv2YcgQ2xvdWRmbGFyZSBEMTo8L3NwYW4+IjoiPHNwYW4+8J+XhO+4jyBDbG91ZGZsYXJlIEQxIERhdGFiYXNlOjwvc3Bhbj4iLCI8c3Bhbj7wn5SRINmD2YTZitivINmF2LPYqtixINin2K/ZhdmK2YYgKEFETUlOX1BBU1NXT1JEKTo8L3NwYW4+IjoiPHNwYW4+8J+UkSBNYXN0ZXIgQWRtaW4gS2V5Ojwvc3Bhbj4iLCI8c3Bhbj7wn5OxINmD2YTYp9mK2YbYqiDYsdiz2YXZiiDYqtmE2q/Ysdin2YUgKEFQSV9JRCk6PC9zcGFuPiI6IjxzcGFuPvCfk7EgVGVsZWdyYW0gT2ZmaWNpYWwgQVBJX0lEOjwvc3Bhbj4iLCLimqog2b7bjNi0INmB2LHYtiI6IuKaqiBEZWZhdWx0Iiwi4pqqINm+2YrYtOKAjNmB2LHYtiI6IuKaqiBEZWZhdWx0IiwiPtio2LPYqtmGINm+2YbYrNix2Ycg2LnbjNioINuM2KfYqNuMPC9idXR0b24+IjoiPkNsb3NlIERpYWdub3N0aWMgV2luZG93PC9idXR0b24+IiwiPtio2LPYqtmGINm+2YbYrNix2Ycg2LnZitio4oCM2YrYp9io2Yo8L2J1dHRvbj4iOiI+Q2xvc2UgRGlhZ25vc3RpYyBXaW5kb3c8L2J1dHRvbj4iLCI+2K7Yt9inINiv2LEg2K/YsdmK2KfZgdiqINmI2LbYudmK2Kog2LPYsdmI2LEuPC9kaXY+IjoiPkVycm9yIGZldGNoaW5nIHNlcnZlciBzdGF0dXMuPC9kaXY+IiwiPti52K/ZhSDYp9mF2YPYp9mGINiv2LPYqtix2LPZiiDYqNmHINiz2LHZiNixOiI6Ij5DYW5ub3QgYWNjZXNzIHNlcnZlcjoiLCLYqtmF2KfZhSDYs9qp2LHYqiDZh9inINio2Ycg2LXZiNix2Kog24zaqdis2Kcg2qnZvtuMINi02K/ZhtivISDwn5OmIjoiQWxsIHNlY3JldHMgY29waWVkIHRvIGNsaXBib2FyZCEg8J+TpiIsItiq2YXYp9mFINiz2YPYsdiq4oCM2YfYpyDYqNmHINi12YjYsdiqINmK2YPYrNinINmD2b7ZiiDYtNiv2YbYryEg8J+TpiI6IkFsbCBzZWNyZXRzIGNvcGllZCB0byBjbGlwYm9hcmQhIPCfk6YiLCLZhNi32YHYp9mLINmD2K8g2YTYp9mK2LPZhtizINiq2YXYr9mK2K8g2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciBleHRlbnNpb24gbGljZW5zZSBjb2RlIiwi2K3Ys9in2Kgg2LTZhdinINio2Kcg2YXZiNmB2YLZitiqINin2LIg2K3Yp9mE2Kog2KrYudmE2YrZgiDYrtin2LHYrCDZiCDYtNin2LHamCDYtNivISDwn46JIjoiWW91ciBhY2NvdW50IGhhcyBiZWVuIHVubG9ja2VkIGFuZCByZW5ld2VkISDwn46JIiwi2YPYryDZiNin2LHYryDYtNiv2Ycg2YbYp9mF2LnYqtio2LEg2KfYs9iqIjoiSW52YWxpZCBsaWNlbnNlIGNvZGUiLCLYrti32KfZiiDYp9ix2KrYqNin2Lcg2KjYpyDYs9ix2YjYsSI6IlNlcnZlciBjb25uZWN0aW9uIGVycm9yIiwi2YPYryDZhNin2YrYs9mG2LMg2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciBsaWNlbnNlIGNvZGUiLCLYp9i02KrYsdin2YMgQXJpem8gU2VsZiDYtNmF2Kcg2KrZhdiv2YrYryDar9ix2K/ZitivISDwn46JIjoiWW91ciBBcml6byBTZWxmIHN1YnNjcmlwdGlvbiB3YXMgcmVuZXdlZCEg8J+OiSIsItmD2K8g2YbYp9mF2LnYqtio2LEg2KfYs9iqIjoiSW52YWxpZCBjb2RlIiwi2K7Yt9in2Yog2LTYqNmD2YciOiJOZXR3b3JrIGVycm9yIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYqNin2YrYryDYrdiv2KfZgtmEINuzINmD2KfYsdin2YPYqtixINio2KfYtNivIjoiVXNlcm5hbWUgbXVzdCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMiLCLYsdmF2LIg2LnYqNmI2LEg2KjYp9mK2K8g2K3Yr9in2YLZhCDbuCDZg9in2LHYp9mD2KrYsSDYqNin2LTYryI6IlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIiwi2KrZg9ix2KfYsSDYsdmF2LIg2LnYqNmI2LEg2KrYt9in2KjZgiDZhtiv2KfYsdivIjoiUGFzc3dvcmRzIGRvIG5vdCBtYXRjaCIsItit2LPYp9ioIEFyaXpvIFNlbGYg2KjYpyDZhdmI2YHZgtmK2Kog2YHYudin2YQg2LTYryDinKgiOiJBcml6byBTZWxmIGFjY291bnQgYWN0aXZhdGVkIHN1Y2Nlc3NmdWxseSDinKgiLCLYrti32Kcg2K/YsSDYq9io2Kog2YbYp9mFIjoiUmVnaXN0cmF0aW9uIGVycm9yIiwi2YbYp9mFINmD2KfYsdio2LHZiiDZiCDYsdmF2LIg2LnYqNmI2LEg2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciB1c2VybmFtZSBhbmQgcGFzc3dvcmQiLCLaqdivINiq2KfbjNuM2K8g2K/ZiCDZhdix2K3ZhNmHINin24wg2YjYp9ix2K8g2YbYtNivIjoiMkZBIGNvZGUgbm90IGVudGVyZWQiLCLZg9ivINiq2KfZitmK2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfZiiDZiNin2LHYryDZhti02K8iOiIyRkEgY29kZSBub3QgZW50ZXJlZCIsItiu2YjYtCDYotmF2K/bjNivISDZiNix2YjYryDYr9mIINmF2LHYrdmE2Ycg2KfbjCDZhdmI2YHZgtuM2Kog2KLZhduM2LIg2KjZiNivIOKchSI6IldlbGNvbWUhIDJGQSBsb2dpbiBzdWNjZXNzZnVsIOKchSIsItiu2YjYtCDYotmF2K/ZitivISDZiNix2YjYryDYr9mIINmF2LHYrdmE2YfigIzYp9mKINmF2YjZgdmC2YrYquKAjNii2YXZitiyINio2YjYryDinIUiOiJXZWxjb21lISAyRkEgbG9naW4gc3VjY2Vzc2Z1bCDinIUiLCLZg9ivINuyRkEg2YbYp9iv2LHYs9iqINin2LPYqiI6IkludmFsaWQgMkZBIGNvZGUiLCLYrtmI2LQg2KLZhdiv24zYryEg2YjYsdmI2K8g2YXZiNmB2YLbjNiqINii2YXbjNiyINio2YjYryDinIUiOiJXZWxjb21lISBMb2dpbiBzdWNjZXNzZnVsIOKchSIsItiu2YjYtCDYotmF2K/ZitivISDZiNix2YjYryDZhdmI2YHZgtmK2KrigIzYotmF2YrYsiDYqNmI2K8g4pyFIjoiV2VsY29tZSEgTG9naW4gc3VjY2Vzc2Z1bCDinIUiLCLZhtin2YUg2YPYp9ix2KjYsdmKINmK2Kcg2LHZhdiyINmG2KfYr9ix2LPYqiDYp9iz2KoiOiJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkIiwi2YTYt9mB2KfZiyDZh9ixINiv2Ygg2LHZhdiyINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8iOiJQbGVhc2UgZW50ZXIgYm90aCBwYXNzd29yZHMiLCLYsdmF2LIg2KzYr9mK2K8g2KjYp9mK2K8g2K3Yr9in2YLZhCDbuCDZg9in2LHYp9mD2KrYsSDYqNin2LTYryI6Ik5ldyBwYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyIsItix2YXYsiDYudio2YjYsSDYqti62YrZitixINmK2KfZgdiqIPCflJIiOiJQYXNzd29yZCBjaGFuZ2VkIHN1Y2Nlc3NmdWxseSDwn5SSIiwi2K7Yt9inINiv2LEg2KrYutmK2YrYsSDYsdmF2LIiOiJFcnJvciBjaGFuZ2luZyBwYXNzd29yZCIsItiz2YTZgSDYqNin2Kog2YHYudin2YQg2LTYryDwn5+iIjoiU2VsZmJvdCBhY3RpdmF0ZWQg8J+foiIsItiz2YTZgSDYqNin2Kog2YXYqtmI2YLZgSDYtNivIOKPuO+4jyI6IlNlbGZib3QgcGF1c2VkIOKPuO+4jyIsIti02YXYp9ix2Ycg2KrZhNmB2YYg2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciBwaG9uZSBudW1iZXIiLCLZg9ivINu1INix2YLZhdmKINio2Ycg2KrZhNqv2LHYp9mFINin2LHYs9in2YQg2q/Ysdiv2YrYryDinIUiOiI1LWRpZ2l0IGNvZGUgc2VudCB0byBUZWxlZ3JhbSDinIUiLCLZg9ivINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8iOiJQbGVhc2UgZW50ZXIgdmVyaWZpY2F0aW9uIGNvZGUiLCLYp9qp2KfZhtiqINiv2KfYsdin24wg2KrYo9uM24zYryDYr9mI2YXYsdit2YTZhyDYp9uMINin2LPYqiDwn5SSIjoiQWNjb3VudCBoYXMgdHdvLXN0ZXAgdmVyaWZpY2F0aW9uIGVuYWJsZWQg8J+UkiIsItin2YPYp9mG2Kog2K/Yp9ix2KfZiiDYqtij2YrZitivINiv2YjZhdix2K3ZhNmH4oCM2KfZiiDYp9iz2Kog8J+UkiI6IkFjY291bnQgaGFzIHR3by1zdGVwIHZlcmlmaWNhdGlvbiBlbmFibGVkIPCflJIiLCLYqtmE2q/Ysdin2YUg2KjYpyDZhdmI2YHZgtmK2Kog2YXYqti12YQg2LTYryEg8J+OiSI6IlRlbGVncmFtIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCfjokiLCLYsdmF2LIg2K/ZiNi52KfZhdmE2Yog2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciAyRkEgcGFzc3dvcmQiLCLYs9i02YYg2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciBzdHJpbmcgc2Vzc2lvbiIsItiz2LTZhiDZhdiz2KrZgtmK2YUg2YXYqti12YQg2LTYryEg8J+agCI6IkRpcmVjdCBzZXNzaW9uIGNvbm5lY3RlZCEg8J+agCIsItmC2KfZhNioINio2YrZiNqv2LHYp9mB2Yog2KfZhtiq2K7Yp9ioINmIINin2LnZhdin2YQg2LTYryDinKgiOiJCaW8gdGVtcGxhdGUgYXBwbGllZCBzdWNjZXNzZnVsbHkg4pyoIiwi2KrZhti42YrZhdin2Kog2KfYs9iq2YjYr9mK2YggQXJpem8g2LDYrtmK2LHZhyDZiCDYotmG2Yog2KfYudmF2KfZhCDYtNivIOKcqCI6IkFyaXpvIFN0dWRpbyBzZXR0aW5ncyBzYXZlZCAmIGFwcGxpZWQg4pyoIiwi2K7Yt9inINiv2LEg2LDYrtuM2LHZhyDYs9in2LLbjCI6IkVycm9yIHNhdmluZyBzZXR0aW5ncyIsItiu2LfYpyDYr9ixINiw2K7Zitix2YfigIzYs9in2LLZiiI6IkVycm9yIHNhdmluZyBzZXR0aW5ncyIsItmE2LfZgdin2Ysg2KrZiNmD2YYg2LHYqNin2Kog2K/YsdmK2KfZgdiq2Yog2KfYsiBCb3RGYXRoZXJAINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8iOiJQbGVhc2UgZW50ZXIgYm90IHRva2VuIGZyb20gQEJvdEZhdGhlciIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLZitiqINmF2KrYtdmEINi02K8hIPCfjokiOiJCb3QgY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSEg8J+OiSIsItiu2LfYpyDYr9ixINin2LnYqtio2KfYsdiz2YbYrNmKINiq2YjZg9mGIjoiRXJyb3IgdmFsaWRhdGluZyB0b2tlbiIsItin2KrYtdin2YQg2LHYqNin2Kog2KjYpyDZhdmI2YHZgtmK2Kog2YLYt9i5INi02K8g2Ygg2K3Yp9mB2LjZhyDZg9mE2KfYr9mB2YTYsSDZvtin2YPYs9in2LLZiiDar9ix2K/ZitivIOKcqCI6IkJvdCBkaXNjb25uZWN0ZWQgJiBDbG91ZGZsYXJlIHN0b3JhZ2UgY2xlYW5lZCDinKgiLCLYrti32KfZiiDYtNio2YPZhyDYr9ixINin2LHYqtio2KfYtyDYqNinINiz2LHZiNixIjoiTmV0d29yayBlcnJvciBjb21tdW5pY2F0aW5nIHdpdGggc2VydmVyIiwi2LTZhtin2LPZhyDYudiv2K/ZiiDYqtmE2q/Ysdin2YUg2KjYp9mK2K8g2LTYp9mF2YQg27Ug2KrYpyDbsdu1INix2YLZhSDYqNin2LTYryI6Ik51bWVyaWNhbCBUZWxlZ3JhbSBJRCBtdXN0IGJlIDUgdG8gMTUgZGlnaXRzIiwi2LHYqNin2Kog2KjYpyDZhdmI2YHZgtmK2Kog2LHZiNmKINi02YbYp9iz2Ycg2YLZgdmEINi02K8hIPCflJIiOiJCb3Qgc3VjY2Vzc2Z1bGx5IGxvY2tlZCB0byBJRCEg8J+UkiIsItiu2LfYpyDYr9ixINir2KjYqiDYtNmG2KfYs9mHINmF2KfZhNmDIjoiRXJyb3IgcmVnaXN0ZXJpbmcgb3duZXIgSUQiLCLwn5eR77iPINmD2YTZitivIEFQSSDZh9mI2LQg2YXYtdmG2YjYudmKINio2Ycg2LfZiNixINmD2KfZhdmEINm+2KfZg9iz2KfYstmKINi02K8g2Ygg2KrYr9in2K7ZhCDYqNix2LfYsdmBINqv2LHYr9mK2K8hIjoi8J+Xke+4jyBBSSBBUEkgS2V5IGNsZWFyZWQgYW5kIGNvbmZsaWN0cyByZXNvbHZlZCEiLCLYs9in2LnYqiDYqtmE2q/Ysdin2YUg2KjYpyDZgdmI2YbYqiDZiCDYqtmG2LjZitmF2KfYqiDYrNiv2YrYryDYotm+2K/ZitiqINi02K8hIPCfmoAiOiJUZWxlZ3JhbSBjbG9jayB1cGRhdGVkIHdpdGggbmV3IHN0eWxlISDwn5qAIiwi2KfYqti12KfZhCDYqtmE2q/Ysdin2YUg2YLYt9i5INqv2LHYr9mK2K8iOiJUZWxlZ3JhbSBkaXNjb25uZWN0ZWQiLCLYrti32Kcg2K/YsSDYqNin2LHar9iw2KfYsdmKINit2LPYp9ioIjoiRXJyb3IgbG9hZGluZyBhY2NvdW50Iiwi2K7Yt9inINiv2LEg2LHYp9mHINin2YbYr9in2LLbjCDbskZBIjoiRXJyb3Igc2V0dGluZyB1cCAyRkEiLCLYrti32Kcg2K/YsSDYsdin2YfigIzYp9mG2K/Yp9iy2Yog27JGQSI6IkVycm9yIHNldHRpbmcgdXAgMkZBIiwi2KjYp9ix2YPYryBRUiDZiCDZg9mE2YrYryDYp9iu2KrYtdin2LXZiiDYqNinINmF2YjZgdmC2YrYqiDYs9in2K7YqtmHINi02K8g8J+TtyI6IlFSIGNvZGUgJiBzZWNyZXQga2V5IGdlbmVyYXRlZCBzdWNjZXNzZnVsbHkg8J+TtyIsItmD2YTZitivINmF2K3YsdmF2KfZhtmHINuyRkEg2YPZvtmKINi02K8g8J+TiyI6IjJGQSBTZWNyZXQgS2V5IGNvcGllZCDwn5OLIiwi2K7Yt9inINiv2LEg2YPZvtmKINmD2YTZitivIjoiRXJyb3IgY29weWluZyBrZXkiLCLZg9ivINio2KfYstmK2KfYqNmKINmF2YjYrNmI2K8g2YbZitiz2KoiOiJObyByZWNvdmVyeSBjb2RlIGF2YWlsYWJsZSIsItiq2YXYp9mF2Yog2YPYr9mH2KfZiiDYp9i22LfYsdin2LHZiiDZg9m+2Yog2LTYr9mG2K8g8J+TiyI6IkFsbCByZWNvdmVyeSBjb2RlcyBjb3BpZWQg8J+TiyIsItiu2LfYpyDYr9ixINmD2b7ZiiDZg9iv2YfYpyI6IkVycm9yIGNvcHlpbmcgY29kZXMiLCLZhNi32YHYp9mLINmD2K8g27Yg2LHZgtmF2Yog2KrZiNmE2YrYr9i02K/ZhyDYr9ixINin2b7ZhNmK2YPZiti02YYg2LHYpyDYqNmHINiv2LHYs9iq2Yog2YjYp9ix2K8g2YPZhtmK2K8iOiJQbGVhc2UgZW50ZXIgdmFsaWQgNi1kaWdpdCBhdXRoZW50aWNhdG9yIGNvZGUiLCLZg9ivINmI2KfYsdivINi02K/ZhyDZhtin2K/Ysdiz2Kog2YrYpyDZhdmG2YLYttmKINin2LPYqi4g2YTYt9mB2KfZiyDZg9ivINis2K/ZitivINin2b7ZhNmK2YPZiti02YYg2LHYpyDZiNin2LHYryDZg9mG2YrYry4iOiJDb2RlIGludmFsaWQgb3IgZXhwaXJlZC4gUGxlYXNlIGVudGVyIGxhdGVzdCBhcHAgY29kZS4iLCLYp9it2LHYp9iyINmH2YjbjNiqINiv2Ygg2YXYsdit2YTZhyDYp9uMINio2Kcg2YXZiNmB2YLbjNiqINmB2LnYp9mEINi02K8hIPCfjokiOiJUd28tRmFjdG9yIEF1dGhlbnRpY2F0aW9uIGVuYWJsZWQhIPCfjokiLCLYp9it2LHYp9iyINmH2YjZitiqINiv2Ygg2YXYsdit2YTZh+KAjNin2Yog2KjYpyDZhdmI2YHZgtmK2Kog2YHYudin2YQg2LTYryEg8J+OiSI6IlR3by1GYWN0b3IgQXV0aGVudGljYXRpb24gZW5hYmxlZCEg8J+OiSIsItiu2LfYp9mKINi02KjZg9mHINiv2LEg2KjYsdmC2LHYp9ix2Yog2KfYsdiq2KjYp9i3IjoiTmV0d29yayBjb25uZWN0aW9uIGVycm9yIiwi2KfYrdix2KfYsiDZh9mI2YrYqiDbskZBINi62YrYsdmB2LnYp9mEINi02K8iOiIyRkEgQXV0aGVudGljYXRpb24gZGlzYWJsZWQiLCLYsdmF2LIg2LnYqNmI2LEg2YrYpyDZg9ivINmG2KfZhdi52KrYqNixINin2LPYqiI6IkludmFsaWQgcGFzc3dvcmQgb3IgY29kZSIsItiu2LfYp9mKINiz2LHZiNixIjoiU2VydmVyIGVycm9yIiwi2LHZhdiyINi52KjZiNixINit2LPYp9ioINio2LHYp9mKINix2YXYstmG2q/Yp9ix2Yog2YHYp9mK2YQg2KjZg9in2b4g2KfZhNiy2KfZhdmKINin2LPYqiI6IkFjY291bnQgcGFzc3dvcmQgcmVxdWlyZWQgdG8gZW5jcnlwdCBiYWNrdXAiLCLYrti32Kcg2K/YsSDYp9mK2KzYp9ivINio2YPYp9m+IjoiRXJyb3IgY3JlYXRpbmcgYmFja3VwIiwi2YHYp9uM2YQg2b7YtNiq24zYqNin2YYg2LHZhdiy2Ybar9in2LHbjCDYtNiv2Ycg2K/Yp9mG2YTZiNivINi02K8g4pyFIjoiRW5jcnlwdGVkIGJhY2t1cCBkb3dubG9hZGVkIOKchSIsItmB2KfZitmEINm+2LTYqtmK2KjYp9mGINix2YXYstmG2q/Yp9ix2YrigIzYtNiv2Ycg2K/Yp9mG2YTZiNivINi02K8g4pyFIjoiRW5jcnlwdGVkIGJhY2t1cCBkb3dubG9hZGVkIOKchSIsItiu2LfYpyDYr9ixINiv2LHZitin2YHYqiDYqNmD2KfZviI6IkVycm9yIGRvd25sb2FkaW5nIGJhY2t1cCIsItmE2LfZgdin2Ysg2KfYqNiq2K/YpyDZgdin2YrZhCDYqNmD2KfZviAoLmpzb24pINix2Kcg2KfZhtiq2K7Yp9ioINmD2YbZitivIjoiUGxlYXNlIHNlbGVjdCBhIGJhY2t1cCBmaWxlICguanNvbikiLCLYsdmF2LIg2LnYqNmI2LEg2YHYp9mK2YQg2KjZg9in2b4g2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciBiYWNrdXAgcGFzc3dvcmQiLCLYqNin2LLZitin2KjZiiDZhtiz2K7ZhyDZvti02KrZitio2KfZhiDYqNinINmF2YjZgdmC2YrYqiDYp9mG2KzYp9mFINi02K8hIPCflIQiOiJCYWNrdXAgcmVzdG9yZWQgc3VjY2Vzc2Z1bGx5ISDwn5SEIiwi2K7Yt9inINiv2LEg2KjYp9iy2YrYp9io2YogKNix2YXYsiDYp9i02KrYqNin2Ycg2KfYs9iqINmK2Kcg2YHYp9mK2YQg2K/Ys9iq2YPYp9ix2Yog2LTYr9mHKSI6IlJlc3RvcmUgZXJyb3IgKGluY29ycmVjdCBwYXNzd29yZCBvciBjb3JydXB0ZWQgZmlsZSkiLCLYrti32Kcg2K/YsSDZvtix2K/Yp9iy2LQg2YHYp9mK2YQg2KjZg9in2b4iOiJFcnJvciBwcm9jZXNzaW5nIGJhY2t1cCBmaWxlIiwi2KvYp9mG2YrZhyDZvtmK2LQiOiJzZWNvbmRzIGFnbyIsItiv2YLZitmC2Ycg2b7Ziti0IjoibWludXRlcyBhZ28iLCLYr9ixINin2YbYqti42KfYsSDZhtiu2LPYqtuM2YYg2YfZhdqv2KfZhSDYs9in2LLbjCI6IldhaXRpbmcgZm9yIGZpcnN0IHN5bmMiLCLYr9ixINin2YbYqti42KfYsSDZhtiu2LPYqtmK2YYg2YfZhdqv2KfZheKAjNiz2KfYstmKIjoiV2FpdGluZyBmb3IgZmlyc3Qgc3luYyIsItmB2LnYp9mEINmIINmF2K3Yp9mB2LjYqiDYtNiv2Ycg8J+foiI6IkFjdGl2ZSAmIFByb3RlY3RlZCDwn5+iIiwi2KfYtNiq2LHYp9mDOiDZhdi52YTZgiDZiCDZhdmG2YLYttmKIPCflLQiOiJTdWJzY3JpcHRpb246IFN1c3BlbmRlZCAmIEV4cGlyZWQg8J+UtCIsIuKPuO+4jyDYqNmHINit2KfZhNiqINiq2LnZhNmK2YIg2K/Ysdii2YXYr9mHICjZhdmG2YLYttmKKSI6IuKPuO+4jyBTdXNwZW5kZWQgKEV4cGlyZWQpIiwi8J+UkiDYs9mE2YEg2KjYp9iqINmF2LnZhNmCINin2LPYqiI6IvCflJIgU2VsZmJvdCBpcyBTdXNwZW5kZWQiLCLYqti52YTZitmCINio2Ycg2LnZhNiqINm+2KfZitin2YYg2YXYr9iqINiy2YXYp9mGINin2LTYqtix2KfZgyI6IlN1c3BlbmRlZCBkdWUgdG8gc3Vic2NyaXB0aW9uIGV4cGlyeSIsItiv2KfYptmF2Yog4pm+77iPIjoiTGlmZXRpbWUg4pm+77iPIiwi2LHZiNiyINin2LnYqtio2KfYsSDYqNin2YLbjCDZhdin2YbYr9mHIjoiZGF5cyByZW1haW5pbmciLCLYsdmI2LIg2KfYudiq2KjYp9ixINio2KfZgtmK4oCM2YXYp9mG2K/ZhyI6ImRheXMgcmVtYWluaW5nIiwi2KfYtNiq2LHYp9mDOiI6IlN1YnNjcmlwdGlvbjoiLCLwn5SSINmC2YHZhCDYsdmI2Yog2LTZhtin2LPZhzoiOiLwn5SSIExvY2tlZCB0byBJRDoiLCLYsdio2KfYqiDYqNmHINi12YjYsdiqINux27DbsNmqINin2YbYrdi12KfYsduMINmB2YLYtyDYqNmHINin24zZhiDYtNmG2KfYs9mHINi52K/Yr9uMINm+2KfYs9iuINmF24wg2K/Zh9ivINmIINio2LHYp9uMINiz2KfbjNix24zZhiDZhdiz2K/ZiNivINin2LPYqi4iOiJCb3QgZXhjbHVzaXZlbHkgcmVzcG9uZHMgb25seSB0byB0aGlzIG51bWVyaWNhbCBJRCBhbmQgaWdub3JlcyBhbGwgb3RoZXJzLiIsItix2KjYp9iqINio2Ycg2LXZiNix2Kog27HbsNuw2aog2KfZhtit2LXYp9ix2Yog2YHZgti3INio2Ycg2KfZitmGINi02YbYp9iz2Ycg2LnYr9iv2Yog2b7Yp9iz2K4g2YXZiuKAjNiv2YfYryDZiCDYqNix2KfZiiDYs9in2YrYsdmK2YYg2YXYs9iv2YjYryDYp9iz2KouIjoiQm90IGV4Y2x1c2l2ZWx5IHJlc3BvbmRzIG9ubHkgdG8gdGhpcyBudW1lcmljYWwgSUQgYW5kIGlnbm9yZXMgYWxsIG90aGVycy4iLCLwn5SSINii2YXYp9iv2Ycg2YLZgdmEINiu2YjYr9mD2KfYsSDYqNinINin2YjZhNmK2YYgL3N0YXJ0Ijoi8J+UkiBSZWFkeSB0byBhdXRvLWxvY2sgb24gZmlyc3QgL3N0YXJ0Iiwi2K/Ys9iq2YjYsSDYr9in2YbZhNmI2K8g2Ygg2YbYtdioINiv2LEg2K3Yp9mB2LjZhyDZg9m+2Yog2LTYryEg8J+TiyI6Ikluc3RhbGwgY29tbWFuZCBjb3BpZWQgdG8gY2xpcGJvYXJkISDwn5OLIiwi2KfYqNiq2K/Yp9mKINin2LPYqtmI2K/ZitmIIjoiU3RhcnQgb2YgU3R1ZGlvIiwi2b7Yp9mK2KfZhiDYp9iz2KrZiNiv2YrZiCI6IkVuZCBvZiBTdHVkaW8iLCLYstio2KfZhiDYqNmHINmB2KfYsdiz2Yog2KrYutmK2YrYsSDZitin2YHYqiDwn4eu8J+HtyI6Itiy2KjYp9mGINio2Ycg2YHYp9ix2LPbjCDYqti624zbjNixINuM2KfZgdiqIPCfh67wn4e3Iiwi2KrYutmK2YrYsSDYstio2KfZhiDYqNmHINmB2KfYsdiz2YoiOiJTd2l0Y2ggTGFuZ3VhZ2UgdG8gUGVyc2lhbiIsItiq2LrZitmK2LEg2LLYqNin2YYg2KjZhyDYp9mG2q/ZhNmK2LPZiiI6IlN3aXRjaCBMYW5ndWFnZSB0byBFbmdsaXNoIiwi2YPYr9mH2KfZiiDYqNin2LLZitin2KjZiiDYp9i22LfYsdin2LHZiiBBcml6byBTZWxmICgyRkEgUmVjb3ZlcnkgQ29kZXMpOlxcbiI6IkFyaXpvIFNlbGYgRW1lcmdlbmN5IFJlY292ZXJ5IENvZGVzICgyRkEpOlxcbiIsItio2LHYp9uMINi624zYsdmB2LnYp9mEINiz2KfYstuMINuyRkHYjCDYsdmF2LIg2LnYqNmI2LEg2K3Ys9in2Kgg2qnYp9ix2KjYsduMINuM2Kcg2qnYryDbtiDYsdmC2YXbjCBBdXRoZW50aWNhdG9yINix2Kcg2YjYp9ix2K8g2qnZhtuM2K86IjoiVG8gZGlzYWJsZSAyRkEsIGVudGVyIGFjY291bnQgcGFzc3dvcmQgb3IgNi1kaWdpdCBBdXRoZW50aWNhdG9yIGNvZGU6Iiwi2KjYsdin2Yog2LrZitix2YHYudin2YTigIzYs9in2LLZiiDbskZB2Iwg2LHZhdiyINi52KjZiNixINit2LPYp9ioINmD2KfYsdio2LHZiiDZitinINmD2K8g27Yg2LHZgtmF2YogQXV0aGVudGljYXRvciDYsdinINmI2KfYsdivINmD2YbZitivOiI6IlRvIGRpc2FibGUgMkZBLCBlbnRlciBhY2NvdW50IHBhc3N3b3JkIG9yIDYtZGlnaXQgQXV0aGVudGljYXRvciBjb2RlOiIsIti02YbYp9iz2Ycg2LnYr9iv2Yog2KfZg9in2YbYqiDYqtmE2q/Ysdin2YUg2K7ZiNivINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8gKNmB2YLYtyDYp9mK2YYg2LTZhtin2LPZhyDYp9is2KfYstmHINin2LHYs9in2YQg2K/Ys9iq2YjYsSDYqNmHINix2KjYp9iqINix2Kcg2K7ZiNin2YfYryDYr9in2LTYqik6IjoiRW50ZXIgbnVtZXJpY2FsIFRlbGVncmFtIElEIChvbmx5IHRoaXMgSUQgd2lsbCBiZSBhbGxvd2VkIHRvIGlzc3VlIGJvdCBjb21tYW5kcyk6Iiwi2KLbjNinINin2LIg2YLYt9i5INin2KrYtdin2YQg2LPZhNmBINio2KfYqiDYp9i32YXbjNmG2KfZhiDYr9in2LHbjNiv2J8iOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzY29ubmVjdCBzZWxmYm90PyIsItii2YrYpyDYp9iyINmC2LfYuSDYp9iq2LXYp9mEINiz2YTZgeKAjNio2KfYqiDYp9i32YXZitmG2KfZhiDYr9in2LHZitiv2J8iOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzY29ubmVjdCBzZWxmYm90PyIsIjxzcGFuPtiq2KPZitmK2K8g2YPYryDYp9ix2LPYp9mE2Yog2KrZhNqv2LHYp9mFPC9zcGFuPiI6IjxzcGFuPlZlcmlmeSBUZWxlZ3JhbSBTTVMgQ29kZTwvc3Bhbj4iLCI8c3Bhbj7ZiNix2YjYryDYqNinINix2YXYsiDYr9mI2LnYp9mF2YTZijwvc3Bhbj4iOiI8c3Bhbj5Mb2dpbiB3aXRoIDJGQSBQYXNzd29yZDwvc3Bhbj4iLCI8c3Bhbj7Yp9iq2LXYp9mEINmIINix2YXYstmG2q/Yp9ix2Yog2YHZiNix2Yog2KjYpyBBRVMtMjU2PC9zcGFuPiI6IjxzcGFuPkNvbm5lY3QgJiBFbmNyeXB0IHdpdGggQUVTLTI1Njwvc3Bhbj4iLCI8c3Bhbj7imqEg2KfYqti12KfZhCDZiCDZgdi52KfZhCDYs9in2LLbjCDZiNioINmH2YjaqTwvc3Bhbj4iOiI8c3Bhbj7imqEgQ29ubmVjdCAmIEFjdGl2YXRlIFdlYmhvb2s8L3NwYW4+IiwiPHNwYW4+4pqhINin2KrYtdin2YQg2Ygg2YHYudin2YTigIzYs9in2LLZiiDZiNio4oCM2YfZiNmDPC9zcGFuPiI6IjxzcGFuPuKaoSBDb25uZWN0ICYgQWN0aXZhdGUgV2ViaG9vazwvc3Bhbj4iLCI8c3Bhbj7imqEg2KrYs9iqINio2Ycg2LHZiNiy2LHYs9in2YbbjCDYotmG24w8L3NwYW4+IjoiPHNwYW4+4pqhIFRlc3QgUmVhbC10aW1lIFVwZGF0ZTwvc3Bhbj4iLCI8c3Bhbj7imqEg2KrYs9iqINio2YfigIzYsdmI2LLYsdiz2KfZhtmKINii2YbZijwvc3Bhbj4iOiI8c3Bhbj7imqEgVGVzdCBSZWFsLXRpbWUgVXBkYXRlPC9zcGFuPiIsIjxzcGFuPvCflJAg2LHYp9mHINin2YbYr9in2LLbjCDZiCDZgdi52KfZhCDYs9in2LLbjCDbskZBPC9zcGFuPiI6IjxzcGFuPvCflJAgU2V0dXAgJiBFbmFibGUgMkZBPC9zcGFuPiIsIjxzcGFuPvCflJAg2LHYp9mH4oCM2KfZhtiv2KfYstmKINmIINmB2LnYp9mE4oCM2LPYp9iy2Yog27JGQTwvc3Bhbj4iOiI8c3Bhbj7wn5SQIFNldHVwICYgRW5hYmxlIDJGQTwvc3Bhbj4iLCI8c3Bhbj7Yqtij24zbjNivINmG2YfYp9uM24wg2Ygg2YHYudin2YQg2LPYp9iy24wg27JGQTwvc3Bhbj4iOiI8c3Bhbj5Db25maXJtICYgQWN0aXZhdGUgMkZBPC9zcGFuPiIsIjxzcGFuPtiq2KPZitmK2K8g2YbZh9in2YrZiiDZiCDZgdi52KfZhOKAjNiz2KfYstmKINuyRkE8L3NwYW4+IjoiPHNwYW4+Q29uZmlybSAmIEFjdGl2YXRlIDJGQTwvc3Bhbj4iLCLYr9ix2YrYp9mB2Kog2YPYryDYqtij2YrZitivINmI2LHZiNivIjoiUmVjZWl2ZSBMb2dpbiBDb2RlIiwi2KrYo9uM24zYryDZiCDYp9iq2LXYp9mEINio2Ycg2LPZhNmBINio2KfYqiI6IlZlcmlmeSAmIENvbm5lY3QgU2VsZmJvdCIsItiq2KPZitmK2K8g2Ygg2KfYqti12KfZhCDYqNmHINiz2YTZgeKAjNio2KfYqiI6IlZlcmlmeSAmIENvbm5lY3QgU2VsZmJvdCIsItio2LHYsdiz24wg2Ygg2YHYudin2YQg2LPYp9iy24wg2LPYtNmGIjoiVmVyaWZ5ICYgQWN0aXZhdGUgU2Vzc2lvbiIsItio2LHYsdiz2Yog2Ygg2YHYudin2YTigIzYs9in2LLZiiDYs9i02YYiOiJWZXJpZnkgJiBBY3RpdmF0ZSBTZXNzaW9uIiwi4o+zINiv2LEg2K3Yp9mEINio2LHYsdiz2YouLi4iOiLij7MgVmVyaWZ5aW5nLi4uIiwi2LTZhtin2LPZhyDYudiv2K/ZiiDYsdio2KfYqjoiOiJCb3QgTnVtZXJpY2FsIElEOiIsIuKdjCDYrti32KfZiiDYqtmE2q/Ysdin2YU6Ijoi4p2MIFRlbGVncmFtIEVycm9yOiIsIvCfjJAg2KLYr9ix2LMg2K/Yp9mF2YbZhyDZiNix2YPYsToiOiLwn4yQIFdvcmtlciBEb21haW4gVVJMOiIsIvCfl4TvuI8g2b7Yp9mK2q/Yp9mHINiv2KfYr9mHIENsb3VkZmxhcmUgRDE6Ijoi8J+XhO+4jyBDbG91ZGZsYXJlIEQxIERhdGFiYXNlOiIsIvCflJEg2YPZhNmK2K8g2YXYs9iq2LEg2KfYr9mF2YrZhiAoQURNSU5fUEFTU1dPUkQpOiI6IvCflJEgTWFzdGVyIEFkbWluIEtleToiLCLwn5OxINmD2YTYp9mK2YbYqiDYsdiz2YXZiiDYqtmE2q/Ysdin2YUgKEFQSV9JRCk6Ijoi8J+TsSBUZWxlZ3JhbSBPZmZpY2lhbCBBUElfSUQ6Iiwi2KrYo9mK2YrYryDZg9ivINin2LHYs9in2YTZiiDYqtmE2q/Ysdin2YUiOiJWZXJpZnkgVGVsZWdyYW0gU01TIENvZGUiLCLZiNix2YjYryDYqNinINix2YXYsiDYr9mI2LnYp9mF2YTZiiI6IkxvZ2luIHdpdGggMkZBIFBhc3N3b3JkIiwi8J+Xke+4jyDYrdiw2YEg2YPYp9mF2YQg2YPYp9ix2KjYsSI6IvCfl5HvuI8gRGVsZXRlIFVzZXIgUGVybWFuZW50bHkiLCLwn5SQINin2YXZhtmK2KrYjCDYs9i32K0g2K/Ys9iq2LHYs9mKINmIINuyRkEiOiLwn5SQIFNlY3VyaXR5LCBBY2Nlc3MgUm9sZSAmIDJGQSIsItiz2LfYrSDYr9iz2KrYsdiz2Yog2Ygg2YbZgti0OiI6IkFjY2VzcyBSb2xlICYgUGVybWlzc2lvbnM6Iiwi2YjYtti524zYqiDZiNix2YjYryDYr9mIINmF2LHYrdmE2Ycg2KfbjDoiOiJUd28tRmFjdG9yIEF1dGggU3RhdHVzOiIsItmI2LbYudmK2Kog2YjYsdmI2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfZijoiOiJUd28tRmFjdG9yIEF1dGggU3RhdHVzOiIsItqp2K/Zh9in24wg2b7YtNiq24zYqNin2YYg2KjYp9mC24wg2YXYp9mG2K/ZhzoiOiJSZW1haW5pbmcgQmFja3VwIENvZGVzOiIsItmD2K/Zh9in2Yog2b7YtNiq2YrYqNin2YYg2KjYp9mC2YrigIzZhdin2YbYr9mHOiI6IlJlbWFpbmluZyBCYWNrdXAgQ29kZXM6Iiwi2YPYryDYotmF2KfYr9mHINmF2LXYsdmBIjoiY29kZXMgYXZhaWxhYmxlIiwi2LHZhdiy2Ybar9in2LHbjCDZhti02LPYqiDZh9inOiI6IlNlc3Npb24gRW5jcnlwdGlvbjoiLCLYsdmF2LLZhtqv2KfYsdmKINmG2LTYs9iq4oCM2YfYpzoiOiJTZXNzaW9uIEVuY3J5cHRpb246Iiwi2YjYtti52YrYqiDYrdiz2KfYqCDZg9in2LHYqNix2Yo6IjoiQWNjb3VudCBTdGF0dXM6Iiwi8J+foiDZhdiq2LXZhCAo2LPYtNmGINix2YXYstmG2q/Yp9ix24wg2LTYr9mHKSI6IvCfn6IgQ29ubmVjdGVkIChFbmNyeXB0ZWQgU2Vzc2lvbikiLCLwn5+iINmF2KrYtdmEICjYs9i02YYg2LHZhdiy2Ybar9in2LHZiuKAjNi02K/ZhykiOiLwn5+iIENvbm5lY3RlZCAoRW5jcnlwdGVkIFNlc3Npb24pIiwi4o+477iPINmF2KrZiNmC2YEg2LTYr9mHINiq2YjYs9i3INqp2KfYsdio2LEiOiLij7jvuI8gUGF1c2VkIGJ5IFVzZXIiLCLij7jvuI8g2YXYqtmI2YLZgeKAjNi02K/ZhyDYqtmI2LPYtyDZg9in2LHYqNixIjoi4o+477iPIFBhdXNlZCBieSBVc2VyIiwi8J+TsSDZhdin2YbbjNiq2YjYsduM2YbaryDYs9mE2YEg2KjYp9iqINiq2YTar9ix2KfZhSAoTVRQcm90bykiOiLwn5OxIFRlbGVncmFtIFNlbGZib3QgTW9uaXRvcmluZyAoTVRQcm90bykiLCLwn5OxINmF2KfZhtmK2KrZiNix2YrZhtqvINiz2YTZgeKAjNio2KfYqiDYqtmE2q/Ysdin2YUgKE1UUHJvdG8pIjoi8J+TsSBUZWxlZ3JhbSBTZWxmYm90IE1vbml0b3JpbmcgKE1UUHJvdG8pIiwi2YjYtti52YrYqiDYs9i02YYg2KrZhNqv2LHYp9mFOiI6IlRlbGVncmFtIFNlc3Npb24gU3RhdHVzOiIsItmI2LbYuduM2Kog2KfYrNix2KfbjCDYs9mE2YEg2KjYp9iqOiI6IlNlbGZib3QgRXhlY3V0aW9uIFN0YXR1czoiLCLZiNi22LnZitiqINin2KzYsdin2Yog2LPZhNmB4oCM2KjYp9iqOiI6IlNlbGZib3QgRXhlY3V0aW9uIFN0YXR1czoiLCLYtNmG2KfYs9mHINi52K/Yr9mKINmD2KfYsdio2LEg2K/YsSDYqtmE2q/Ysdin2YU6IjoiVGVsZWdyYW0gTnVtZXJpY2FsIENoYXQgSUQ6Iiwi2K3Yp9mE2Kog2LTYqNitINmIINiu2YjYp9mG2K/ZhiDZhdiu2YHZiiAoR2hvc3QpOiI6Ikdob3N0IE1vZGUgKFNpbGVudCBSZWFkKToiLCLZvtin2LPYriDZh9mI2LTZhdmG2K8g2YfZiNi0INmF2LXZhtmI2LnZiiAoQUkpOiI6IlNtYXJ0IEFJIFJlcGx5OiIsItiz2KfYudiqINmB2YjZhtiq2Yog2Ygg2KjZitmIINiv2KfZitmG2KfZhdmK2YM6IjoiU3R5bGl6ZWQgQ2xvY2sgJiBEeW5hbWljIEJpbzoiLCLZiNi22LnZitiqINi52K/ZhSDYrdi22YjYsSAoQUZLKToiOiJBd2F5IEZyb20gS2V5Ym9hcmQgKEFGSyk6Iiwi2qnYp9ix2KjYsdin2YYg2KjbjCDYtdiv2KcgLyDZhdiz2K/ZiNivINi02K/ZhzoiOiJNdXRlZCAvIEJsYWNrbGlzdGVkIFVzZXJzOiIsItmD2KfYsdio2LHYp9mGINio2YrigIzYtdiv2KcgLyDZhdiz2K/ZiNivINi02K/ZhzoiOiJNdXRlZCAvIEJsYWNrbGlzdGVkIFVzZXJzOiIsIuKPuO+4jyDZhdiq2YjZgtmBINiz2KfYstuMINiz2YTZgSDYqNin2KoiOiLij7jvuI8gUGF1c2UgU2VsZmJvdCIsIuKPuO+4jyDZhdiq2YjZgtmB4oCM2LPYp9iy2Yog2LPZhNmB4oCM2KjYp9iqIjoi4o+477iPIFBhdXNlIFNlbGZib3QiLCLilrbvuI8g2YHYudin2YQg2LPYp9iy24wg2LPZhNmBINio2KfYqiI6IuKWtu+4jyBSZXN1bWUgU2VsZmJvdCIsIuKWtu+4jyDZgdi52KfZhOKAjNiz2KfYstmKINiz2YTZgeKAjNio2KfYqiI6IuKWtu+4jyBSZXN1bWUgU2VsZmJvdCIsItiz2YrYs9iq2YUg2YPYp9mF2YTYp9mLINiz2KfZhNmF2Iwg2b7Yp9mK2K/Yp9ixINmIINio2K/ZiNmGINiu2LfYp9iz2Kog8J+foiI6IlN5c3RlbSBpcyBoZWFsdGh5LCBzdGFibGUgJiBlcnJvci1mcmVlIPCfn6IiLCLwn6m6INi524zYqCDbjNin2KjbjCDYs9mE2KfZhdiq2Iwg2YTYp9qvINmH2Kcg2Ygg2KfYtNiq2LHYp9qpIjoi8J+puiBIZWFsdGggRGlhZ25vc3RpY3MsIExvZ3MgJiBQbGFuIiwi8J+puiDYudmK2KjigIzZitin2KjZiiDYs9mE2KfZhdiq2Iwg2YTYp9qv4oCM2YfYpyDZiCDYp9i02KrYsdin2YMiOiLwn6m6IEhlYWx0aCBEaWFnbm9zdGljcywgTG9ncyAmIFBsYW4iLCLYotiu2LHbjNmGINmH2YXar9in2YUg2LPYp9iy24wgKEhlYXJ0YmVhdCk6IjoiTGFzdCBIZWFydGJlYXQgLyBTeW5jOiIsItii2K7YsdmK2YYg2YfZhdqv2KfZheKAjNiz2KfYstmKIChIZWFydGJlYXQpOiI6Ikxhc3QgSGVhcnRiZWF0IC8gU3luYzoiLCLZiNi22LnZitiqINiz2YTYp9mF2Kog2Ygg2K7Yt9in2YfYpzoiOiJIZWFsdGggU3RhdHVzICYgRXJyb3JzOiIsItm+2YTZhiDYp9i02KrYsdin2YMg2YHYudmE2Yo6IjoiQ3VycmVudCBTdWJzY3JpcHRpb24gUGxhbjoiLCLZhdiv2Kog2KfYudiq2KjYp9ixINio2KfZgtuMINmF2KfZhtiv2Yc6IjoiUmVtYWluaW5nIFZhbGlkaXR5OiIsItmF2K/YqiDYp9i52KrYqNin2LEg2KjYp9mC2YrigIzZhdin2YbYr9mHOiI6IlJlbWFpbmluZyBWYWxpZGl0eToiLCLaqdivINmE2KfbjNiz2YbYsyDZhdi12LHZgSDYtNiv2Yc6IjoiUmVkZWVtZWQgTGljZW5zZSBDb2RlOiIsItmD2K8g2YTYp9mK2LPZhtizINmF2LXYsdmB4oCM2LTYr9mHOiI6IlJlZGVlbWVkIExpY2Vuc2UgQ29kZToiLCLwn5SEINm+2KfZg9iz2KfYstmKINiu2LfYp9mH2KciOiLwn5SEIENsZWFyIEVycm9yIExvZ3MiLCLirZAg2KrYutmK2YrYsSDZitinINin2LHYqtmC2KfZiiDYp9i02KrYsdin2YMiOiLirZAgVXBncmFkZSBvciBDaGFuZ2UgUGxhbiIsItii24zYpyDYp9iyINi624zYsdmB2LnYp9mEINiz2KfYstuMINiq2KfbjNuM2K8g2K/ZiCDZhdix2K3ZhNmHINin24wgKNuyRkEpINio2LHYp9uMINqp2KfYsdio2LEiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzYWJsZSAyRkEgZm9yIHVzZXIiLCLYotmK2Kcg2KfYsiDYutmK2LHZgdi52KfZhOKAjNiz2KfYstmKINiq2KfZitmK2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfZiiAo27JGQSkg2KjYsdin2Yog2YPYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkaXNhYmxlIDJGQSBmb3IgdXNlciIsItin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyDaqdin2LHYqNixINmF24wg2KrZiNin2YbYryDYqNiv2YjZhiDZhtuM2KfYsiDYqNmHINqp2K8gQXV0aGVudGljYXRvciDYqNinINix2YXYsiDYudio2YjYsSDYrtmI2K8g2YjYp9ix2K8g2LTZiNivLiI6IkFyZSB5b3Ugc3VyZT8gVGhlIHVzZXIgd2lsbCBiZSBhYmxlIHRvIGxvZyBpbiB3aXRoIHRoZWlyIHBhc3N3b3JkIHdpdGhvdXQgMkZBIEF1dGhlbnRpY2F0b3IuIiwi2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifINmD2KfYsdio2LEg2YXZiuKAjNiq2YjYp9mG2K8g2KjYr9mI2YYg2YbZitin2LIg2KjZhyDZg9ivIEF1dGhlbnRpY2F0b3Ig2KjYpyDYsdmF2LIg2LnYqNmI2LEg2K7ZiNivINmI2KfYsdivINi02YjYry4iOiJBcmUgeW91IHN1cmU/IFRoZSB1c2VyIHdpbGwgYmUgYWJsZSB0byBsb2cgaW4gd2l0aCB0aGVpciBwYXNzd29yZCB3aXRob3V0IDJGQSBBdXRoZW50aWNhdG9yLiIsItuyRkEg2YPYp9ix2KjYsSI6IjJGQSBmb3IgdXNlciIsItio2Kcg2YXZiNmB2YLZitiqINi62YrYsdmB2LnYp9mEINmIINix2YrYs9iqINi02K8g8J+OiSI6InN1Y2Nlc3NmdWxseSBkaXNhYmxlZCBhbmQgcmVzZXQg8J+OiSIsItiu2LfYpyDYr9ixINi624zYsdmB2LnYp9mEINiz2KfYstuMINuyRkEiOiJFcnJvciBkaXNhYmxpbmcgMkZBIiwi2K7Yt9inINiv2LEg2LrZitix2YHYudin2YTigIzYs9in2LLZiiDbskZBIjoiRXJyb3IgZGlzYWJsaW5nIDJGQSIsItii2YrYpyDYp9iyINmC2LfYuSDYp9iq2LXYp9mEINmD2KfZhdmEINix2KjYp9iqINmD2YXZg9mKINiq2YTar9ix2KfZhSDYqNix2KfZiiDZg9in2LHYqNixIjoiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNvbXBsZXRlbHkgZGlzY29ubmVjdCB0aGUgaGVscGVyIGJvdCBmb3IgdXNlciIsItmIINit2LDZgSDZiNioINmH2YjaqSDYp9i32YXbjNmG2KfZhiDYr9in2LHbjNiv2J8iOiJhbmQgZGVsZXRlIHdlYmhvb2s/Iiwi2Ygg2K3YsNmBINmI2KjigIzZh9mI2YMg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifIjoiYW5kIGRlbGV0ZSB3ZWJob29rPyIsItix2KjYp9iqINmD2YXZg9mKINmD2KfYsdio2LEiOiJIZWxwZXIgYm90IGZvciB1c2VyIiwi2YLYp9io2YTZitiqINix2KjYp9iqINio2Kcg2YXZiNmB2YLZitiqINiq2LrZitmK2LEg2YrYp9mB2Kog4pyoIjoiQm90IGZlYXR1cmUgdG9nZ2xlZCBzdWNjZXNzZnVsbHkg4pyoIiwi2K7Yt9inINiv2LEg2KrYutmK2YrYsSDZgtin2KjZhNmK2Kog2LHYqNin2KoiOiJFcnJvciBjaGFuZ2luZyBib3QgZmVhdHVyZSIsItmC2KfYqNmE24zYqiDYs9mE2YEg2KjYp9iqINiq2LrbjNuM2LEg24zYp9mB2Kog4pyoIjoiU2VsZmJvdCBmZWF0dXJlIHRvZ2dsZWQgc3VjY2Vzc2Z1bGx5IOKcqCIsItmC2KfYqNmE2YrYqiDYs9mE2YHigIzYqNin2Kog2KrYutmK2YrYsSDZitin2YHYqiDinKgiOiJTZWxmYm90IGZlYXR1cmUgdG9nZ2xlZCBzdWNjZXNzZnVsbHkg4pyoIiwi2K7Yt9inINiv2LEg2KrYutmK2YrYsSDZgtin2KjZhNmK2KoiOiJFcnJvciB0b2dnbGluZyBmZWF0dXJlIiwi2K7Yt9in2YfYp9mKINmD2KfYsdio2LEiOiJFcnJvcnMgZm9yIHVzZXIiLCLZvtin2YPYs9in2LLZiiDYtNivIPCfp7kiOiJjbGVhcmVkIPCfp7kiLCLYrti32Kcg2K/YsSDZvtin2YPYs9in2LLZiiI6IkVycm9yIGNsZWFyaW5nIGxvZ3MiLCLZg9mE2YXZhyDYudio2YjYsSDYrNiv2YrYryDYsdinINio2LHYp9mKINmD2KfYsdio2LEiOiJFbnRlciBuZXcgcGFzc3dvcmQgZm9yIHVzZXIiLCLZiNin2LHYryDZg9mG2YrYryAo2K3Yr9in2YLZhCDbtiDZg9in2LHYp9mD2KrYsSk6IjoiZW50ZXIgKG1pbiA2IGNoYXJhY3RlcnMpOiIsItmD2YTZhdmHINi52KjZiNixINio2KfZitivINit2K/Yp9mC2YQg27Yg2YPYp9ix2KfZg9iq2LEg2KjYp9i02K8iOiJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycyIsItix2YXYsiDYudio2YjYsSDZg9in2LHYqNixIjoiUGFzc3dvcmQgZm9yIHVzZXIiLCLYqNinINmF2YjZgdmC2YrYqiDYqNmHINix2YjYsiDYtNivIPCflJEiOiJ1cGRhdGVkIHN1Y2Nlc3NmdWxseSDwn5SRIiwi2YPYryI6IkNvZGUiLCLZg9m+2Yog2LTYryEg2KLZhdin2K/ZhyDYp9ix2LPYp9mEINio2Ycg2K7YsdmK2K/Yp9ixIOKcqCI6ImNvcGllZCEgUmVhZHkgdG8gc2VuZCB0byBidXllciDinKgiLCLYqtmI2YTZitivINmD2K/Zh9in2Yog2KfZhdmGIEFyaXpvLi4uIjoiR2VuZXJhdGluZyBzZWN1cmUgQXJpem8gY29kZXMuLi4iLCLYr9in2KbZhdmKIjoiTGlmZXRpbWUiLCLYsdmI2LLZhyDYs9mB2KfYsdi02YoiOiJEYXlzIEN1c3RvbSIsItmD2K8g2YTYp9mK2LPZhtizINis2K/ZitivICgiOiJOZXcgbGljZW5zZSBjb2RlICgiLCIpINio2Kcg2YXZiNmB2YLZitiqINiq2YjZhNmK2K8g2LTYryDwn46JIjoiKSBnZW5lcmF0ZWQgc3VjY2Vzc2Z1bGx5IPCfjokiLCLYrti32Kcg2K/YsSDYs9in2K7YqiDZg9ivIjoiRXJyb3IgZ2VuZXJhdGluZyBjb2RlIiwi2KfZhtiq2K7Yp9ioINmK2Kcg2KrYutmK2YrYsSDZhtmI2Lkg2KfYtNiq2LHYp9mDINio2LHYp9mKINmD2KfYsdio2LEiOiJTZWxlY3Qgb3IgY2hhbmdlIHN1YnNjcmlwdGlvbiBmb3IgdXNlciIsIjpcXG4xOiDbsSDZhdin2YfZhyAo27PbsCDYsdmI2LIpXFxuMjog27Mg2YXYp9mH2YcgKNu527Ag2LHZiNiyKVxcbjM6INu2INmF2KfZh9mHICjbsdu427Ag2LHZiNiyKVxcbjQ6INiv2KfYptmF2Yog2Ygg2YbYp9mF2K3Yr9mI2K8gKExpZmV0aW1lKVxcbtmK2Kcg2KrYudiv2KfYryDYsdmI2LIg2K/ZhNiu2YjYp9mHINix2Kcg2YXYs9iq2YLZitmF2KfZiyDZiNin2LHYryDZg9mG2YrYryAo2YXYq9mE2KfZiyA0NSk6IjoiOlxcbjE6IDEgTW9udGggKDMwIERheXMpXFxuMjogMyBNb250aHMgKDkwIERheXMpXFxuMzogNiBNb250aHMgKDE4MCBEYXlzKVxcbjQ6IExpZmV0aW1lICYgVW5saW1pdGVkXFxuT3IgZW50ZXIgY3VzdG9tIGRheXMgY291bnQgZGlyZWN0bHkgKGUuZy4gNDUpOiIsItqv2LLZitmG2Ycg2YrYpyDYqti52K/Yp9ivINix2YjYsiDZhtin2YXYudiq2KjYsSDYp9iz2KoiOiJJbnZhbGlkIG9wdGlvbiBvciBkYXlzIGNvdW50Iiwi2KfYtNiq2LHYp9mDINmD2KfYsdio2LEiOiJTdWJzY3JpcHRpb24gZm9yIHVzZXIiLCLYqNinINmF2YjZgdmC2YrYqiDYqNmHIjoic3VjY2Vzc2Z1bGx5IGNoYW5nZWQgdG8iLCLYqti62YrZitixINmK2KfZgdiqISDwn46JIjoidXBkYXRlZCEg8J+OiSIsItiu2LfYpyDYr9ixINiq2LrZitmK2LEg2KfYtNiq2LHYp9mDIjoiRXJyb3IgdXBkYXRpbmcgc3Vic2NyaXB0aW9uIiwi2KLZitinINin2LIg2K3YsNmBINmD2K8iOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIGNvZGUiLCLYp9i32YXZitmG2KfZhiDYr9in2LHZitiv2J8iOiJhcmUgeW91IHN1cmU/Iiwi2YPYryDYrdiw2YEg2LTYryI6IkNvZGUgZGVsZXRlZCIsItmG2KfZhSDaqdin2LHYqNix24wg2qnZhyDZhduMINiu2YjYp9mH24zYryDYqNmHINiz2LfYrSDCq9mF2K/bjNixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYsdiq2YLYpyDbjNin2KjYryDYsdinINmI2KfYsdivINqp2YbbjNivOiI6IkVudGVyIHVzZXJuYW1lIHRvIHByb21vdGUgdG8gU3lzdGVtIEFkbWluaXN0cmF0b3IgKEFkbWluKToiLCLZhtin2YUg2YPYp9ix2KjYsdmKINmD2Ycg2YXZiuKAjNiu2YjYp9mH2YrYryDYqNmHINiz2LfYrSDCq9mF2K/ZitixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYsdiq2YLYpyDZitin2KjYryDYsdinINmI2KfYsdivINmD2YbZitivOiI6IkVudGVyIHVzZXJuYW1lIHRvIHByb21vdGUgdG8gU3lzdGVtIEFkbWluaXN0cmF0b3IgKEFkbWluKToiLCLYp9mK2YYg2YPYp9ix2KjYsSDYr9ixINit2KfZhCDYrdin2LbYsSDZhdiv2YrYsSDZitinINmF2KfZhNmDINiz2KfZhdin2YbZhyDYp9iz2KouIjoiVGhpcyB1c2VyIGlzIGFscmVhZHkgYSBTeXN0ZW0gQWRtaW4gb3IgT3duZXIuIiwi2K3YsNmBINmD2KfZhdmEINmD2KfYsdio2LEiOiJEZWxldGUgVXNlciBQZXJtYW5lbnRseSIsItiq2LrZitmK2LEg2YjYtti52YrYqiDYqti52YTZitmCIjoiVG9nZ2xlIFN1c3BlbnNpb24iLCLYqtmG2LLZhCDYqNmHINmD2KfYsdio2LEg2LnYp9iv2YoiOiJEZW1vdGUgdG8gU3RhbmRhcmQgVXNlciIsItiq2LrZitmK2LEg2YjYtti52YrYqiDYsdio2KfYqiI6IlRvZ2dsZSBCb3QgU3RhdHVzIiwi2KLZitinINin2LIg2K3YsNmBINmD2KfZhdmEINmD2KfYsdio2LEgwqsiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgZGVsZXRlIHVzZXIgJyIsIsK7INin2LfZhduM2YbYp9mGINiv2KfYsduM2K/YnyDYqtmF2KfZhduMINiv2KfYr9mHINmH2KfbjCDYp9uM2YYg2qnYp9ix2KjYsSDZvtin2qkg2K7ZiNin2YfYryDYtNivLiI6Iic/IEFsbCBkYXRhIGZvciB0aGlzIHVzZXIgd2lsbCBiZSBlcmFzZWQuIiwiwrsg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifINiq2YXYp9mF2Yog2K/Yp9iv2YfigIzZh9in2Yog2KfZitmGINmD2KfYsdio2LEg2b7Yp9mDINiu2YjYp9mH2K8g2LTYry4iOiInPyBBbGwgZGF0YSBmb3IgdGhpcyB1c2VyIHdpbGwgYmUgZXJhc2VkLiIsItii2YrYpyDYp9iyINmE2LrZiCDYr9iz2KrYsdiz2Yog2YXYr9mK2LHZitiqINmIINiq2YbYstmEINmD2KfYsdio2LEgwqsiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmV2b2tlIGFkbWluIGFjY2VzcyBhbmQgZGVtb3RlIHVzZXIgJyIsIsK7INio2Ycg2YPYp9ix2KjYsSDYudin2K/ZiiDYp9i32YXZitmG2KfZhiDYr9in2LHZitiv2J8iOiInIHRvIHN0YW5kYXJkIHVzZXI/Iiwi2KLZitinINin2LIg2KfYsdiq2YLYp9mKINmD2KfYsdio2LEgwqsiOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcHJvbW90ZSB1c2VyICciLCLCuyDYqNmHINiz2LfYrSDCq9mF2K/bjNixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYt9mF24zZhtin2YYg2K/Yp9ix24zYr9ifXFxu2KfbjNmGINqp2KfYsdio2LEg2b7YsyDYp9iyINin2LHYqtmC2Kcg2KjZhyDYqtmF2KfZhSDYqNiu2LQg2YfYp9uMINm+2YbZhCDZhdiv24zYsduM2Kog2K/Ys9iq2LHYs9uMINiu2YjYp9mH2K8g2K/Yp9i02KouIjoiJyB0byBTeXN0ZW0gQWRtaW5pc3RyYXRvcj9cXG5UaGlzIHVzZXIgd2lsbCBoYXZlIGZ1bGwgYWNjZXNzIHRvIGFsbCBhZG1pbiBwYW5lbCBzZWN0aW9ucy4iLCLCuyDYqNmHINiz2LfYrSDCq9mF2K/ZitixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifXFxu2KfZitmGINmD2KfYsdio2LEg2b7YsyDYp9iyINin2LHYqtmC2Kcg2KjZhyDYqtmF2KfZhSDYqNiu2LTigIzZh9in2Yog2b7ZhtmEINmF2K/Zitix2YrYqiDYr9iz2KrYsdiz2Yog2K7ZiNin2YfYryDYr9in2LTYqi4iOiInIHRvIFN5c3RlbSBBZG1pbmlzdHJhdG9yP1xcblRoaXMgdXNlciB3aWxsIGhhdmUgZnVsbCBhY2Nlc3MgdG8gYWxsIGFkbWluIHBhbmVsIHNlY3Rpb25zLiIsItii2YrYpyDYp9iyIjoiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIiwi2K7YsdmI2Kwg2KfYsiDYqti52YTZitmCIjoiVW5zdXNwZW5kIiwi2KrYudmE2YrZgiI6IlN1c3BlbmQiLCLZg9in2LHYqNixIMKrIjoidXNlciAnIiwiwrsg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifIjoiJz8iLCLCuyDYqNinINmF2YjZgdmC2YrYqiDYqNmHINmF2K/ZitixINiz2KfZhdin2YbZhyDYp9ix2KrZgtinINmK2KfZgdiqIPCfm6HvuI8iOiInIHByb21vdGVkIHRvIFN5c3RlbSBBZG1pbmlzdHJhdG9yIHN1Y2Nlc3NmdWxseSDwn5uh77iPIiwi2K/Ys9iq2LHYs9mKINmF2K/Zitix2YrYqiDZhNi62Ygg2Ygg2YPYp9ix2KjYsSDCqyI6IkFkbWluIGFjY2VzcyByZXZva2VkIGFuZCB1c2VyICciLCLCuyDYqNmHINmD2KfYsdio2LEg2LnYp9iv2Yog2KrYqNiv2YrZhCDYtNivIPCfkaQiOiInIGRlbW90ZWQgdG8gc3RhbmRhcmQgdXNlciDwn5GkIiwi2KjYpyDZhdmI2YHZgtmK2Kog2KfZhtis2KfZhSDYtNivIjoiQ29tcGxldGVkIHN1Y2Nlc3NmdWxseSIsItiu2LfYpyDYr9ixINin2KzYsdin2Yog2LnZhdmE2YrYp9iqIjoiRXJyb3IgZXhlY3V0aW5nIG9wZXJhdGlvbiIsItiu2LfYp9mKINi02KjZg9mHINiv2LEg2KjYsdmC2LHYp9ix2Yog2KfYsdiq2KjYp9i3INio2Kcg2LPYsdmI2LEiOiJOZXR3b3JrIGVycm9yIGNvbW11bmljYXRpbmcgd2l0aCBzZXJ2ZXIiLCLYqtmF2K/ZitivINii2YbZii4uLiI6IkV4dGVuZGluZy4uLiIsItin2YrYrNin2K8g2K3Ys9in2KggQXJpem8uLi4iOiJDcmVhdGluZyBBcml6byBhY2NvdW50Li4uIiwi2K3Ys9in2Kgg2LTZhdinINmF2KzZh9iyINio2Ycg2KrYp9uM24zYryDYr9mIINmF2LHYrdmE2Ycg2KfbjCAoMkZBKSDYp9iz2KouINmE2LfZgdin2Ysg2qnYryDbtiDYsdmC2YXbjCBHb29nbGUgQXV0aGVudGljYXRvciDbjNinINqp2K8g2KjYp9iy24zYp9io24wg2LHYpyDZiNin2LHYryDZhtmF2KfbjNuM2K86IjoiWW91ciBhY2NvdW50IGlzIHByb3RlY3RlZCBieSAyRkEuIFBsZWFzZSBlbnRlciB5b3VyIDYtZGlnaXQgQXV0aGVudGljYXRvciBvciByZWNvdmVyeSBjb2RlOiIsItit2LPYp9ioINi02YXYpyDZhdis2YfYsiDYqNmHINiq2KfZitmK2K8g2K/ZiCDZhdix2K3ZhNmH4oCM2KfZiiAoMkZBKSDYp9iz2KouINmE2LfZgdin2Ysg2YPYryDbtiDYsdmC2YXZiiBHb29nbGUgQXV0aGVudGljYXRvciDZitinINmD2K8g2KjYp9iy2YrYp9io2Yog2LHYpyDZiNin2LHYryDZhtmF2KfZitmK2K86IjoiWW91ciBhY2NvdW50IGlzIHByb3RlY3RlZCBieSAyRkEuIFBsZWFzZSBlbnRlciB5b3VyIDYtZGlnaXQgQXV0aGVudGljYXRvciBvciByZWNvdmVyeSBjb2RlOiIsItio2LHYsdiz2Yog2YPYryDbskZBLi4uIjoiVmVyaWZ5aW5nIDJGQSBjb2RlLi4uIiwi4pqg77iPINmG2YrYp9iy2YXZhtivINin2KrYtdin2YQg2YXYrNiv2K8g2KrZhNqv2LHYp9mFIjoi4pqg77iPIFRlbGVncmFtIFJlY29ubmVjdCBSZXF1aXJlZCIsIuKWtu+4jyDYqtmE2KfYtCDZhdis2K/YryDYs9mE2YEg2KjYp9iqIjoi4pa277iPIFJldHJ5IFNlbGZib3QiLCLwn5+iINmB2LnYp9mEINmIINiv2LEg2K3Yp9mEINin2KzYsdin2Yog2K7ZiNiv2YPYp9ixIjoi8J+foiBBY3RpdmUgJiBSdW5uaW5nIDI0LzciLCLij7jvuI8g2KrZiNmC2YEg2YXZiNmC2Kog2LPZhNmBINio2KfYqiI6IuKPuO+4jyBQYXVzZSBTZWxmYm90Iiwi4o+477iPINmF2KrZiNmC2YEg2LTYr9mHIChQYXVzZSkiOiLij7jvuI8gUGF1c2VkIiwi4pa277iPINmB2LnYp9mEINiz2KfYstuMINmF2KzYr9ivINiz2YTZgSDYqNin2KoiOiLilrbvuI8gUmVzdW1lIFNlbGZib3QiLCLilrbvuI8g2YHYudin2YTigIzYs9in2LLZiiDZhdis2K/YryDYs9mE2YHigIzYqNin2KoiOiLilrbvuI8gUmVzdW1lIFNlbGZib3QiLCLYrNmH2Kog2KrYo9mK2YrYryDYrdiw2YEg2K/Yp9im2YUg2K3Ys9in2KggQXJpem/YjCDYsdmF2LIg2LnYqNmI2LEg2K7ZiNivINix2Kcg2YjYp9ix2K8g2YPZhtmK2K86IjoiVG8gY29uZmlybSBwZXJtYW5lbnQgZGVsZXRpb24gb2YgeW91ciBBcml6byBhY2NvdW50LCBlbnRlciBwYXNzd29yZDoiLCLYrdiz2KfYqCDYtNmF2Kcg2b7Yp9mD2LPYp9iy2Yog2LTYry4iOiJZb3VyIGFjY291bnQgaGFzIGJlZW4gZGVsZXRlZC4iLCLYotmK2Kcg2YXYp9mK2YQg2KjZhyDYrtix2YjYrCDYp9iyINit2LPYp9ioINmD2KfYsdio2LHZiiBBcml6byDZh9iz2KrZitiv2J8iOiJEbyB5b3Ugd2FudCB0byBsb2cgb3V0IG9mIHlvdXIgQXJpem8gYWNjb3VudD8iLCLYp9ix2LPYp9mEINmD2K8g2KjZhyI6IlNlbmRpbmcgY29kZSB0byIsItiu2LfYpyDYr9ixINin2LHYs9in2YQg2YPYryI6IkVycm9yIHNlbmRpbmcgY29kZSIsItio2LHYsdiz2Yog2YPYry4uLiI6IlZlcmlmeWluZyBjb2RlLi4uIiwi2KfYudiq2KjYp9ix2LPZhtis2YogMkZBLi4uIjoiVmFsaWRhdGluZyAyRkEuLi4iLCLYqNuM2Yjar9ix2KfZgduMINiy2YbYr9mHINi624zYsdmB2LnYp9mEINin2LPYqiAo2LPYp9iv2YcgLyDZvtuM2LQg2YHYsdi2KSI6IkxpdmUgYmlvIGRpc2FibGVkIChTaW1wbGUgLyBEZWZhdWx0KSIsItio2YrZiNqv2LHYp9mB2Yog2LLZhtiv2Ycg2LrZitix2YHYudin2YQg2KfYs9iqICjYs9in2K/ZhyAvINm+2YrYtOKAjNmB2LHYtikiOiJMaXZlIGJpbyBkaXNhYmxlZCAoU2ltcGxlIC8gRGVmYXVsdCkiLCLYsNiu2YrYsdmHINiv2LHYrdin2YQg2KfZhtis2KfZhS4uLiI6IlNhdmluZyBpbiBwcm9ncmVzcy4uLiIsItio2LHYsdiz2Yog2Ygg2KfYqti12KfZhCDYqNmHINiq2YTar9ix2KfZhS4uLiI6IlZlcmlmeWluZyAmIGNvbm5lY3RpbmcgdG8gVGVsZWdyYW0uLi4iLCLYqNinINmF2YjZgdmC2YrYqiDZhdiq2LXZhCDYtNivISDwn46JIjoiY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSEg8J+OiSIsItii24zYpyDYp9iyINmC2LfYuSDYp9iq2LXYp9mEINix2KjYp9iqINiq2YTar9ix2KfZhSDYp9i32YXbjNmG2KfZhiDYr9in2LHbjNiv2J8g2KrZhdin2YUg2YjYqCDZh9mI2qkg2YfYpyDZiCDYr9iz2KrYsdiz24wg2YfYp9uMINmF24zZhtuMINin2b4g2YTYutmIINi02K/ZhyDZiCDYrdin2YHYuNmHINqp2YTYp9iv2YHZhNixINmB2YjYsdin2Ysg2KLYstin2K8g2YXbjCDar9ix2K/Yry4iOiJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGlzY29ubmVjdCBUZWxlZ3JhbSBib3Q/IEFsbCB3ZWJob29rcyBhbmQgTWluaSBBcHAgYWNjZXNzIHdpbGwgYmUgcmV2b2tlZC4iLCLYotmK2Kcg2KfYsiDZgti32Lkg2KfYqti12KfZhCDYsdio2KfYqiDYqtmE2q/Ysdin2YUg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifINiq2YXYp9mFINmI2KjigIzZh9mI2YPigIzZh9inINmIINiv2LPYqtix2LPZiuKAjNmH2KfZiiDZhdmK2YbZiuKAjNin2b4g2YTYutmIINi02K/ZhyDZiCDYrdin2YHYuNmHINmD2YTYp9iv2YHZhNixINmB2YjYsdin2Ysg2KLYstin2K8g2YXZiuKAjNqv2LHYr9ivLiI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkaXNjb25uZWN0IFRlbGVncmFtIGJvdD8gQWxsIHdlYmhvb2tzIGFuZCBNaW5pIEFwcCBhY2Nlc3Mgd2lsbCBiZSByZXZva2VkLiIsItmH2YXar9in2YUg2LPYp9iy24wg2YHZiNix24wuLi4iOiJJbnN0YW50IHN5bmMuLi4iLCLZh9mF2q/Yp9mF4oCM2LPYp9iy2Yog2YHZiNix2YouLi4iOiJJbnN0YW50IHN5bmMuLi4iLCLwn5GRINmF2K/ZitixIjoi8J+RkSBBZG1pbiIsItin2YrYrNin2K8g2KjYp9ix2YPYryBRUi4uLiI6IkdlbmVyYXRpbmcgUVIgQ29kZS4uLiIsItiv2LHYrdin2YQg2KfYudiq2KjYp9ix2LPZhtis2YouLi4iOiJWYWxpZGF0aW5nLi4uIiwi8J+TnSDYqNmK2Yjar9ix2KfZgdmKINiy2YbYr9mHIjoi8J+TnSBEeW5hbWljIEJpbyIsIvCfpJYg2YXZhti02Yog2K7ZiNiv2YPYp9ixIjoi8J+kliBBdXRvLVNlY3JldGFyeSIsIvCflIcg2YHZitmE2KrYsSDYs9mD2YjYqiI6IvCflIcgU2lsZW5jZSBGaWx0ZXIiLCLwn5SQINin2YXZhtmK2Kog2Ygg27JGQSI6IvCflJAgU2VjdXJpdHkgJiAyRkEiLCLZhtin2YUg2YPYp9ix2KjYsdmKICjYrdiv2KfZgtmEINuzINmD2KfYsdin2YPYqtixKSI6IlVzZXJuYW1lIChtaW4gMyBjaGFycykiLCLYsdmF2LIg2LnYqNmI2LEgKNit2K/Yp9mC2YQg27gg2YPYp9ix2KfZg9iq2LEpIjoiUGFzc3dvcmQgKG1pbiA4IGNoYXJzKSIsItqp2K8g2YTYp9uM2LPZhtizINmB2LnYp9mEINiz2KfYstuMIChBUklaTy0uLi4pIjoiQWN0aXZhdGlvbiBMaWNlbnNlIENvZGUgKEFSSVpPLS4uLikiLCLZg9ivINmE2KfZitiz2YbYsyDZgdi52KfZhOKAjNiz2KfYstmKIChBUklaTy0uLi4pIjoiQWN0aXZhdGlvbiBMaWNlbnNlIENvZGUgKEFSSVpPLS4uLikiLCLYqtmD2LHYp9ixINmF2KzYr9ivINix2YXYsiDYudio2YjYsSI6IkNvbmZpcm0geW91ciBwYXNzd29yZCIsItmD2K/Zh9in2Yog2KjYp9iy2YrYp9io2Yog2KfYtti32LHYp9ix2YogQXJpem8gU2VsZiAoMkZBIFJlY292ZXJ5IENvZGVzKToiOiJBcml6byBTZWxmIEVtZXJnZW5jeSBSZWNvdmVyeSBDb2RlcyAoMkZBIFJlY292ZXJ5IENvZGVzKToiLCLZhdiv2Kog2KfYtNiq2LHYp9mDINix2Kcg2KfZhtiq2K7Yp9ioINmK2Kcg2YjYp9ix2K8g2YPZhtmK2K86IjoiU2VsZWN0IG9yIGVudGVyIHN1YnNjcmlwdGlvbiBkdXJhdGlvbjoiLCI0OiDYr9in2KbZhdmKINmIINmG2KfZhdit2K/ZiNivIChMaWZldGltZSkiOiI0OiBQZXJtYW5lbnQgJiBMaWZldGltZSIsItmK2Kcg2KrYudiv2KfYryDYsdmI2LIg2K/ZhNiu2YjYp9mHINix2Kcg2YXYs9iq2YLZitmF2KfZiyDZiNin2LHYryDZg9mG2YrYryAo2YXYq9mE2KfZiyA0NSk6IjoiT3IgZGlyZWN0bHkgZW50ZXIgY3VzdG9tIG51bWJlciBvZiBkYXlzIChlLmcuIDQ1KToiLCLYotmK2Kcg2KfYsiDYp9ix2KrZgtin2Yog2YPYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwcm9tb3RlIHVzZXIiLCLYqNmHINiz2LfYrSDCq9mF2K/ZitixINiz2KfZhdin2YbZh8K7IChBZG1pbikg2KfYt9mF2YrZhtin2YYg2K/Yp9ix2YrYr9ifIjoidG8gXCJTeXN0ZW0gQWRtaW5cIiBsZXZlbD8iLCLYp9uM2YYg2qnYp9ix2KjYsSDZvtizINin2LIg2KfYsdiq2YLYpyDYqNmHINiq2YXYp9mFINio2K7YtCDZh9in24wg2b7ZhtmEINmF2K/bjNix24zYqiDYr9iz2KrYsdiz24wg2K7ZiNin2YfYryDYr9in2LTYqi4iOiJBZnRlciBwcm9tb3Rpb24sIHRoaXMgdXNlciB3aWxsIGhhdmUgZnVsbCBhY2Nlc3MgdG8gYWxsIHNlY3Rpb25zIG9mIHRoZSBtYW5hZ2VtZW50IHBhbmVsLiIsItin2YrZhiDZg9in2LHYqNixINm+2LMg2KfYsiDYp9ix2KrZgtinINio2Ycg2KrZhdin2YUg2KjYrti04oCM2YfYp9mKINm+2YbZhCDZhdiv2YrYsdmK2Kog2K/Ys9iq2LHYs9mKINiu2YjYp9mH2K8g2K/Yp9i02KouIjoiQWZ0ZXIgcHJvbW90aW9uLCB0aGlzIHVzZXIgd2lsbCBoYXZlIGZ1bGwgYWNjZXNzIHRvIGFsbCBzZWN0aW9ucyBvZiB0aGUgbWFuYWdlbWVudCBwYW5lbC4iLCLYqNmI2YTYryDZhNmI2YPYsyI6Ikx1eHVyeSBCb2xkIiwi2K/Yp9io2YQg2KfYs9iq2LHZiNmDIjoiRG91YmxlIFN0cm9rZSIsItit2KjYp9ioINiq2YjYrtin2YTZiiI6IkhvbGxvdyBCdWJibGUiLCLYr9in2YrYsdmHINmF2LTZg9mKINmG2KbZiNmGIjoiTmVvbiBDaXJjbGVkIiwi2YHYp9ix2LPZiiDYp9i12YrZhCI6IkNsYXNzaWMgUGVyc2lhbiIsIti52LHYqNmKINi02LHZgtmKIjoiRWFzdGVybiBBcmFiaWMiLCLYp9mG2K/ZitizINmB2KfZhtiq2LLZiiI6IkZhbmN5IFN1YnNjcmlwdCIsItio2KfZhNin2YbZiNmK2LMg2YXZitmG2YoiOiJNaW5pIFN1cGVyc2NyaXB0Iiwi2LPZhNi32YbYqtmKINio2LHYp9mD2KoiOiJSb3lhbCBCcmFja2V0Iiwi2KjYsdin2YPYqiDamNin2b7ZhtmKIjoiSmFwYW5lc2UgQnJhY2tldCIsItiq2YXYp9mFINm+2YfZhtinICjYs9in24zYqNixKSI6IkN5YmVyIEZ1bGx3aWR0aCIsItiq2YXYp9mF4oCM2b7Zh9mG2KcgKNiz2KfZitio2LEpIjoiQ3liZXIgRnVsbHdpZHRoIiwi2b7Ysdin2YbYqtiyINiv2KfbjNix2Ycg2KfbjCI6IlBhcmVudGhlc2l6ZWQiLCLZvtix2KfZhtiq2LIg2K/Yp9mK2LHZh+KAjNin2YoiOiJQYXJlbnRoZXNpemVkIiwi2YbZgti32Ycg2K/Yp9ixINix2LPZhduMIjoiRm9ybWFsIERvdHRlZCIsItmG2YLYt9mH4oCM2K/Yp9ixINix2LPZhdmKIjoiRm9ybWFsIERvdHRlZCIsItiu2Lcg2LLZitix2YrZhiDZgdin2YbYqtiy2YoiOiJGYW5jeSBVbmRlcmxpbmVkIiwi2K7YtyDYrtmI2LHYr9mHINmF24zZhtuM2YXYp9mEIjoiTWluaW1hbCBTdHJpa2UiLCLYrti34oCM2K7ZiNix2K/ZhyDZhdmK2YbZitmF2KfZhCI6Ik1pbmltYWwgU3RyaWtlIiwi2LPZhtizINin2YrYqtin2YTZitmDIjoiU2FucyBJdGFsaWMiLCLYs9ix2YrZgSDYs9mE2LfZhtiq2YoiOiJSb3lhbCBTZXJpZiIsItmI2K3YtNiqINmH2KfZhNmI2YjZitmG2YoiOiJIYWxsb3dlZW4gU3Bvb2t5Iiwi2KLYqti02YrZhiDZhdiq2K3YsdmDIjoiQW5pbWF0ZWQgRmlyZSIsItmD2LHZitiz2KrYp9mEINmK2K4iOiJJY2UgQ3J5c3RhbCIsItio2KfZg9izINmF2LHYqNi52YoiOiJCb3hlZCBTcXVhcmUiLCLYotmD2YjZhNin2K8g2YHYp9mG2KrYstmKIjoiQ3VybHkgQnJhY2UiLCLZvtmK2YPYp9mG2Yog2YbYptmI2YYiOiJOZW9uIENoZXZyb24iLCLZgdin2LHYs9mKINio2KfZhNin2YbZiNmK2LMiOiJQZXJzaWFuIFN1cGVyc2NyaXB0Iiwi2LPYp9i52Kog2K/Zitis2YrYqtin2YQiOiJEaWdpdGFsIDctU2VnIiwi2YPZhNin2LPZitmDINin2LPYqtin2YbYr9in2LHYryI6IkNsYXNzaWMgU3RhbmRhcmQiLCLYr9iz2KrYsdiz2Yog2KjZhyDZvtmG2YQg2YXYr9mK2LHZitiqINmB2YLYtyDZhdiu2LXZiNi1INmD2KfYsdio2LHYp9mGINiv2KfYsdin2Yog2YbZgti0INmF2K/Zitix2YrYqiDYp9iz2KoiOiJNYW5hZ2VtZW50IHBhbmVsIGFjY2VzcyBpcyByZXN0cmljdGVkIHRvIGFkbWluaXN0cmF0b3IgYWNjb3VudHMgb25seSIsIvCfkZEg2b7ZhtmEINmF2K/Zitix2YrYqiDYp9ix2LTYryDZiCDZhdin2YbZitiq2YjYsdmK2YbaryB8IEFyaXpvIFNlbGYiOiLwn5GRIE1hc3RlciBNYW5hZ2VtZW50ICYgTW9uaXRvcmluZyBQYW5lbCB8IEFyaXpvIFNlbGYiLCLZh9mK2oYg2YPYr9mKINiv2LEg2LPZitiz2KrZhSDYq9io2Kog2YbYtNiv2Ycg2KfYs9iqLiI6Ik5vIHJlZGVlbSBjb2RlcyBoYXZlIGJlZW4gcmVnaXN0ZXJlZCBpbiB0aGUgc3lzdGVtLiIsItiv2KfYptmF2Yog2Ygg2YbYp9mF2K3Yr9mI2K8iOiJQZXJtYW5lbnQgJiBMaWZldGltZSIsItmD2KfYsdio2LHZiiDYqNinINin2YrZhiDZhdi02K7Ytdin2Kog2YrYp9mB2Kog2YbYtNivLiI6Ik5vIHVzZXIgZm91bmQgbWF0Y2hpbmcgdGhlc2Ugc3BlY2lmaWNhdGlvbnMuIiwi8J+RkSDZhdin2YTZgyI6IvCfkZEgT3duZXIiLCLwn5uh77iPINmF2K/ZitixIjoi8J+boe+4jyBBZG1pbiIsIvCfkaQg2YPYp9ix2KjYsSI6IvCfkaQgVXNlciIsItmD2K8g2b7YtNiq2YrYqNin2YYiOiJCYWNrdXAgQ29kZSIsIuKPuO+4jyDZhdmD2KsiOiLij7jvuI8gUGF1c2VkIiwi8J+UjSDZhdin2YbZitiq2YjYsdmK2YbaryI6IvCflI0gTW9uaXRvcmluZyIsItmF2KfZhtmK2KrZiNix2YrZhtqvINmD2KfZhdmEINuz27bbsCDYr9ix2KzZhyDZiCDZhdiv2YrYsdmK2Kog2YPYp9ix2KjYsSI6IkNvbXBsZXRlIDM2MMKwIE1vbml0b3JpbmcgJiBVc2VyIE1hbmFnZW1lbnQiLCLYp9i32YTYp9i52KfYqiDZg9in2LHYqNixINmK2KfZgdiqINmG2LTYryI6IlVzZXIgaW5mb3JtYXRpb24gbm90IGZvdW5kIiwi8J+RkSDZhdin2YTZgyDYs9in2YXYp9mG2YciOiLwn5GRIFN5c3RlbSBPd25lciIsIvCfm6HvuI8g2YXYr9mK2LEg2LPYp9mF2KfZhtmHIjoi8J+boe+4jyBTeXN0ZW0gQWRtaW4iLCLwn5GkINmD2KfYsdio2LEg2LnYp9iv2YoiOiLwn5GkIFJlZ3VsYXIgVXNlciIsItiq2YbYstmEINiz2LfYrSDYr9iz2KrYsdiz2Yog2KjZhyDZg9in2LHYqNixINi52KfYr9mKIjoiRGVtb3RlIGFjY2VzcyBsZXZlbCB0byByZWd1bGFyIHVzZXIiLCLYp9ix2KrZgtinINio2Ycg2YXYr9mK2LEg2LPYp9mF2KfZhtmHIjoiUHJvbW90ZSB0byBzeXN0ZW0gYWRtaW4iLCLwn5GkINiq2YbYstmEINio2Ycg2YPYp9ix2KjYsSDYudin2K/ZiiI6IvCfkaQgRGVtb3RlIHRvIFJlZ3VsYXIgVXNlciIsItiq2LrZitmK2LEg2YrYpyDYqtmF2K/ZitivINin2LTYqtix2KfZgyI6IkNoYW5nZSBvciBSZW5ldyBTdWJzY3JpcHRpb24iLCLinI/vuI8g2KrYutmK2YrYsSI6IuKcj++4jyBDaGFuZ2UiLCLwn5STINiu2LHZiNisINin2LIg2KrYudmE2YrZgiI6IvCflJMgVW5zdXNwZW5kIiwi8J+UkiDYqti52YTZitmCINit2LPYp9ioIjoi8J+UkiBTdXNwZW5kIEFjY291bnQiLCLYrtix2YjYrCDZg9in2LHYqNixINin2LIg2K3Yp9mE2Kog2KrYudmE2YrZgiI6IlVuc3VzcGVuZCB1c2VyIGFjY2VzcyIsItiq2LnZhNmK2YIg2YHZiNix2Yog2K/Ys9iq2LHYs9mKINmD2KfYsdio2LEiOiJJbW1lZGlhdGVseSBzdXNwZW5kIHVzZXIgYWNjZXNzIiwi2KjYr9mI2YYg2YPYryI6Ik5vIGNvZGUiLCLij7jvuI8g2YXaqdirINiz2YTZgSDYqNin2KoiOiLij7jvuI8gUGF1c2UgU2VsZmJvdCIsIuKPuO+4jyDZhdmD2Ksg2LPZhNmB4oCM2KjYp9iqIjoi4o+477iPIFBhdXNlIFNlbGZib3QiLCLirZAg2KrYutmK2YrYsSDZvtmE2YYg2KfYtNiq2LHYp9mDIjoi4q2QIENoYW5nZSBTdWJzY3JpcHRpb24gUGxhbiIsIvCflJEg2KrYutmK2YrYsSDZg9mE2YXZhyDYudio2YjYsSI6IvCflJEgQ2hhbmdlIFBhc3N3b3JkIiwi8J+boe+4jyDYp9ix2KrZgtinINio2Ycg2YXYr9mK2LEg2LPYp9mF2KfZhtmHIjoi8J+boe+4jyBQcm9tb3RlIHRvIFN5c3RlbSBBZG1pbiIsItit2LDZgSDZg9in2YXZhCDZg9in2LHYqNixINmIINiq2YXYp9mFINin2LfZhNin2LnYp9iqIjoiUGVybWFuZW50bHkgZGVsZXRlIHVzZXIgYW5kIGFsbCBhc3NvY2lhdGVkIGRhdGEiLCLimqEg2K/Ys9iq2LHYs9mKINiz2LHZiti5INio2Ycg2LnZhdmE2YrYp9iqINmF2K/Zitix2YrYqtmKINmD2KfYsdio2LE6Ijoi4pqhIFF1aWNrIEFjY2VzcyB0byBVc2VyIEFkbWluaXN0cmF0aXZlIEFjdGlvbnM6Iiwi2YXYr9uM2LHbjNiqINqp2KfZhdmEINmG2YLYtNiMINmE2KfbjNiz2YbYs9iMINiq2LnZhNuM2YIg2Ygg2KfYrNix2KfbjCDYs9mE2YEg2KjYp9iqIjoiRnVsbCBtYW5hZ2VtZW50IG9mIHJvbGUsIGxpY2Vuc2UsIHN1c3BlbnNpb24sIGFuZCBzZWxmYm90IHJ1bnRpbWUiLCLZhdiv2YrYsdmK2Kog2YPYp9mF2YQg2YbZgti02Iwg2YTYp9mK2LPZhtiz2Iwg2KrYudmE2YrZgiDZiCDYp9is2LHYp9mKINiz2YTZgeKAjNio2KfYqiI6IkZ1bGwgbWFuYWdlbWVudCBvZiByb2xlLCBsaWNlbnNlLCBzdXNwZW5zaW9uLCBhbmQgc2VsZmJvdCBydW50aW1lIiwi4pqqINi62YrYsdmF2KrYtdmEIjoi4pqqIERpc2Nvbm5lY3RlZCIsIvCflIwg2YLYt9i5INin2KrYtdin2YQg2LHYqNin2Kog2Ygg2b7Yp9qp2LPYp9iy24wg2YjYqCDZh9mI2qkiOiLwn5SMIERpc2Nvbm5lY3QgQm90ICYgQ2xlYXIgV2ViaG9vayIsIvCflIwg2YLYt9i5INin2KrYtdin2YQg2LHYqNin2Kog2Ygg2b7Yp9mD2LPYp9iy2Yog2YjYqOKAjNmH2YjZgyI6IvCflIwgRGlzY29ubmVjdCBCb3QgJiBDbGVhciBXZWJob29rIiwi2YPYp9ix2KjYsSDZh9mG2YjYsiDYsdio2KfYqiDZg9mF2YPZiiDYp9iu2KrYtdin2LXZiiDZhdiq2LXZhCDZhtmD2LHYr9mHINin2LPYqi4iOiJVc2VyIGhhcyBub3QgY29ubmVjdGVkIGEgZGVkaWNhdGVkIGhlbHBlciBib3QgeWV0LiIsIvCfpJYg2YXYp9mG2YrYqtmI2LHZitmG2q8g2LHYqNin2Kog2YPZhdmD2Yog2KrZhNqv2LHYp9mFIjoi8J+kliBUZWxlZ3JhbSBIZWxwZXIgQm90IE1vbml0b3JpbmciLCLYp9iu2KrYtdin2LXZiiI6IkRlZGljYXRlZCIsItmI2LbYudmK2Kog2KfYqti12KfZhDoiOiJDb25uZWN0aW9uIFN0YXR1czoiLCLZhtin2YUg2YPYp9ix2KjYsdmKINix2KjYp9iqOiI6IkJvdCBVc2VybmFtZToiLCLYtNmG2KfYs9mHINin2YbYrdi12KfYsduMINmF2KfZhNqpICjZgtmB2YQg2LTYr9mHKToiOiJPd25lciBUZWxlZ3JhbSBJRCAoTG9ja2VkKToiLCLYtNmG2KfYs9mHINin2YbYrdi12KfYsdmKINmF2KfZhNmDICjZgtmB2YTigIzYtNiv2YcpOiI6Ik93bmVyIFRlbGVncmFtIElEIChMb2NrZWQpOiIsItiq2YbYuNmK2YUg2YbYtNiv2YciOiJOb3QgQ29uZmlndXJlZCIsItmF2KfamNmI2YQg2LbYryDYrdiw2YEg2b7Zitin2YU6IjoiQW50aS1EZWxldGUgTWVzc2FnZSBNb2R1bGU6Iiwi2YXYp9qY2YjZhCDYttivINmI2YrYsdin2YrYtCDZvtmK2KfZhToiOiJBbnRpLUVkaXQgTWVzc2FnZSBNb2R1bGU6Iiwi2KfYsdiz2KfZhCDZhdiv2YrYp9mH2KfZiiDYqtin2YrZhdix2K/Yp9ixIChUVEwpOiI6IlNlbGYtRGVzdHJ1Y3QgTWVkaWEgRm9yd2FyZGluZyAoVFRMKToiLCLimqog2LrZitix2YHYudin2YQgKNmB2YLYtyDYsdmF2LIg2LnYqNmI2LEpIjoi4pqqIEluYWN0aXZlIChQYXNzd29yZCBPbmx5KSIsIvCflJMg2LHbjNiz2Kog2Ygg2LrbjNix2YHYudin2YQg2LPYp9iy24wg27JGQSI6IvCflJMgUmVzZXQgJiBEaXNhYmxlIDJGQSIsIvCflJMg2LHZitiz2Kog2Ygg2LrZitix2YHYudin2YTigIzYs9in2LLZiiDbskZBIjoi8J+UkyBSZXNldCAmIERpc2FibGUgMkZBIiwi8J+UkSDYqti62YrZitixINmD2YTZhdmHINi52KjZiNixINmD2KfYsdio2LEiOiLwn5SRIENoYW5nZSBVc2VyIFBhc3N3b3JkIiwi8J+RkSDZhdin2YTZgyDYp9ix2LTYryDYs9in2YXYp9mG2YciOiLwn5GRIE1hc3RlciBTeXN0ZW0gT3duZXIiLCLwn5uh77iPINmF2K/ZitixINiz2KfZhdin2YbZhyAo2K/Ys9iq2LHYs9mKINmD2KfZhdmEINm+2YbZhCDZhdiv2YrYsdmK2KopIjoi8J+boe+4jyBTeXN0ZW0gQWRtaW4gKEZ1bGwgUGFuZWwgQWNjZXNzKSIsIvCflJIg2KrYudmE2YrZgiDYrdiz2KfYqCDZg9in2LHYqNixIjoi8J+UkiBTdXNwZW5kIFVzZXIgQWNjb3VudCIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLZitiqINix2YjZiiDYtNmG2KfYs9mHIjoiQm90IHN1Y2Nlc3NmdWxseSBsb2NrZWQgdG8gSUQiLCLZhtin2YUg2LPZg9ix2Kog2YPZvtmKINi02K8iOiJTZWNyZXQgbmFtZSBjb3BpZWQgdG8gY2xpcGJvYXJkIiwi2YXZgtiv2KfYsSAyMDQwINmD2b7ZiiDYtNivIjoiVmFsdWUgMjA0MCBjb3BpZWQgdG8gY2xpcGJvYXJkIiwi2YXZgtiv2KfYsSBBUElfSEFTSCDZg9m+2Yog2LTYryI6IkFQSV9IQVNIIGNvcGllZCB0byBjbGlwYm9hcmQiLCLinIUg2KrZiNmD2YYg2KrZhNqv2LHYp9mFINmF2LnYqtio2LEg2KfYs9iqISI6IuKchSBUZWxlZ3JhbSBib3QgdG9rZW4gaXMgdmFsaWQhIiwi2K/YsSDYrdin2YQg2K/YsdmK2KfZgdiqINmI2LbYudmK2Kog2LLZhtiv2Ycg2KfYsiDYs9ix2YjYsS4uLiI6IkZldGNoaW5nIGxpdmUgc2VydmVyIHN0YXR1cy4uLiIsIvCflLQg2KrYudix2YrZgSDZhti02K/ZhyI6IvCflLQgTm90IENvbmZpZ3VyZWQiLCLwn5+hINiv24zYqtin2KjbjNizINmF2KrYtdmEINin2LPYqiDYp9mF2Kcg2KzYr9in2YjZhCDZh9mG2YjYsiDYs9in2K7YqtmHINmG2LTYr9mHINin2YbYryI6IvCfn6EgRGF0YWJhc2UgY29ubmVjdGVkIGJ1dCB0YWJsZXMgbm90IGluaXRpYWxpemVkIHlldCIsIvCfn6Eg2K/Zitiq2KfYqNmK2LMg2YXYqti12YQg2KfYs9iqINin2YXYpyDYrNiv2KfZiNmEINmH2YbZiNiyINiz2KfYrtiq2Ycg2YbYtNiv2YfigIzYp9mG2K8iOiLwn5+hIERhdGFiYXNlIGNvbm5lY3RlZCBidXQgdGFibGVzIG5vdCBpbml0aWFsaXplZCB5ZXQiLCLwn5S0INmF2KrYtdmEINmG2YrYs9iqIjoi8J+UtCBOb3QgQ29ubmVjdGVkIiwi4pqhINiz2KfYrtiqINmB2YjYsdmKINis2K/Yp9mI2YQg2K/Zitiq2KfYqNmK2LMgRDEiOiLimqEgSW5pdGlhbGl6ZSBEMSBEYXRhYmFzZSBUYWJsZXMgTm93Iiwi2KjYs9iq2YYg2b7Zhtis2LHZhyDYuduM2Kgg24zYp9io24wiOiJDbG9zZSBEaWFnbm9zdGljIFdpbmRvdyIsItio2LPYqtmGINm+2YbYrNix2Ycg2LnZitio4oCM2YrYp9io2YoiOiJDbG9zZSBEaWFnbm9zdGljIFdpbmRvdyIsItiu2LfYpyDYr9ixINiv2LHZitin2YHYqiDZiNi22LnZitiqINiz2LHZiNixLiI6IkVycm9yIHJldHJpZXZpbmcgc2VydmVyIHN0YXR1cy4iLCLYudiv2YUg2KfZhdmD2KfZhiDYr9iz2KrYsdiz2Yog2KjZhyDYs9ix2YjYsToiOiJVbmFibGUgdG8gY29ubmVjdCB0byBzZXJ2ZXI6Iiwi2LPZiNim2YrahiI6IlRvZ2dsZSIsItio2YrZiNqv2LHYp9mB2Yo6IjoiQmlvOiIsItiq2YjZhNmK2K8g2YPYr9mH2KfZiiDZhNin2YrYs9mG2LMg2KzYr9mK2K8g2Ygg2KfYttin2YHZhyDYqNmHINin2YbYqNin2LEiOiJHZW5lcmF0ZSBOZXcgTGljZW5zZSBLZXlzICYgQWRkIHRvIEludmVudG9yeSIsItin2YbYqNin2LEg2YPYr9mH2KfZiiDZhNin2YrYs9mG2LMg2YXZiNis2YjYryAo2YPZvtmKINmF2LPYqtmC2YrZhSDYrNmH2Kog2KfYsdiz2KfZhCDYqNmHINmF2LTYqtix2YopIjoiTGljZW5zZSBLZXkgSW52ZW50b3J5IChEaXJlY3QgQ29weSBmb3IgRGVsaXZlcnkpIiwi2YPYr9mH2KfZiiDYqNin2LLZitin2KjZiiDYp9i22LfYsdin2LHZiiBBcml6byBTZWxmIjoiQXJpem8gU2VsZiBFbWVyZ2VuY3kgUmVjb3ZlcnkgQ29kZXMiLCLYs9in2K7YqiDYrtmI2K/Zg9in2LEg2KzYr9in2YjZhCBEMSI6IkluaXRpYWxpemUgRDEgVGFibGVzIiwi2K/YsSDYrdin2YQg2KjYsdix2LPZii4uLiI6IkNoZWNraW5nLi4uIiwi2KrYs9iqINii2YbZhNin2YrZhiDYqtmI2YPZhiI6IlRlc3QgQm90IFRva2VuIE9ubGluZSIsItin2LHYs9in2YQg2b7Zitin2YUg2KrYs9iqIjoiU2VuZCBUZXN0IE1lc3NhZ2UiLCLYp9ix2LPYp9mEINmD2K8g2KjZhyAiOiJTZW5kaW5nIGNvZGUgdG8gIiwi8J+UkiDZgtmB2YQg2LHZiNmKINi02YbYp9iz2Yc6ICI6IvCflJIgTG9ja2VkIHRvIElEOiAiLCLYsdio2KfYqiDYqNinINmF2YjZgdmC2YrYqiDYsdmI2Yog2LTZhtin2LPZhyAiOiJCb3Qgc3VjY2Vzc2Z1bGx5IGxvY2tlZCB0byBJRCAiLCLYs9i02YYg2KrZhNqv2LHYp9mFINio2Kcg2YXZiNmB2YLZitiqINmF2KrYtdmEINi02K8hIPCfjokiOiJUZWxlZ3JhbSBzZXNzaW9uIGNvbm5lY3RlZCBzdWNjZXNzZnVsbHkhIPCfjokiLCLZg9ivINiq2KfZitmK2K8g2KrZhNqv2LHYp9mFINin2LHYs9in2YQg2LTYryDwn5OxIjoiVGVsZWdyYW0gdmVyaWZpY2F0aW9uIGNvZGUgc2VudCDwn5OxIiwi2LHZhdiyINi52KjZiNixINio2Kcg2YXZiNmB2YLZitiqINiq2LrZitmK2LEg2YPYsdivISDwn5SRIjoiUGFzc3dvcmQgY2hhbmdlZCBzdWNjZXNzZnVsbHkhIPCflJEiLCLYp9i02KrYsdin2YMg2KjYpyDZhdmI2YHZgtmK2Kog2KrZhdiv2YrYryDYtNivISDwn46JIjoiU3Vic2NyaXB0aW9uIHJlbmV3ZWQgc3VjY2Vzc2Z1bGx5ISDwn46JIiwi2LHYr9uM2YUg2qnYryDZhtin2YXYudiq2KjYsSDYp9iz2Kog24zYpyDZgtio2YTYp9mLINin2LPYqtmB2KfYr9mHINi02K/ZhyI6IlJlZGVlbSBjb2RlIGlzIGludmFsaWQgb3IgaGFzIGFscmVhZHkgYmVlbiB1c2VkIiwi2LHYr9mK2YXigIzZg9ivINmG2KfZhdi52KrYqNixINin2LPYqiDZitinINmC2KjZhNin2Ysg2KfYs9iq2YHYp9iv2Ycg2LTYr9mHIjoiUmVkZWVtIGNvZGUgaXMgaW52YWxpZCBvciBoYXMgYWxyZWFkeSBiZWVuIHVzZWQiLCLYqtmG2LjZitmF2KfYqiDYqNinINmF2YjZgdmC2YrYqiDYsNiu2YrYsdmHINi02K8hIPCfkr4iOiJTZXR0aW5ncyBzYXZlZCBzdWNjZXNzZnVsbHkhIPCfkr4iLCLZvtin2LPYriDYr9iz2KrZiiDYp9ix2LPYp9mEINi02K8hIPCfkqwiOiJNYW51YWwgcmVwbHkgc2VudCEg8J+SrCIsItix2KjYp9iqINio2Kcg2YXZiNmB2YLZitiqINmF2KrYtdmEINi02K8hIPCfpJYiOiJCb3QgY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSEg8J+kliIsItin2KrYtdin2YQg2LHYqNin2Kog2KjYpyDZhdmI2YHZgtmK2Kog2YLYt9i5INi02K8hIPCflIwiOiJCb3QgZGlzY29ubmVjdGVkIHN1Y2Nlc3NmdWxseSEg8J+UjCIsItuyRkEg2KjYpyDZhdmI2YHZgtmK2Kog2YHYudin2YQg2LTYryEg8J+UkCI6IjJGQSBhY3RpdmF0ZWQgc3VjY2Vzc2Z1bGx5ISDwn5SQIiwi27JGQSDYqNinINmF2YjZgdmC2YrYqiDYutmK2LHZgdi52KfZhCDYtNivIjoiMkZBIGRpc2FibGVkIHN1Y2Nlc3NmdWxseSIsItit2LPYp9ioINmD2KfYsdio2LHZiiDYqNinINmF2YjZgdmC2YrYqiDYrdiw2YEg2LTYryI6IlVzZXIgYWNjb3VudCBkZWxldGVkIHN1Y2Nlc3NmdWxseSIsItiu2LfYpyDYr9ixINiw2K7Zitix2Ycg2KrZhti42YrZhdin2KoiOiJFcnJvciBzYXZpbmcgc2V0dGluZ3MiLCLZhNi32YHYp9mLINiq2YjZg9mGINix2KjYp9iqINix2Kcg2YjYp9ix2K8g2YPZhtmK2K8iOiJQbGVhc2UgZW50ZXIgYm90IHRva2VuIiwi2YTYt9mB2KfZiyDZg9ivINiq2KfZitmK2K8g2LHYpyDZiNin2LHYryDZg9mG2YrYryI6IlBsZWFzZSBlbnRlciB2ZXJpZmljYXRpb24gY29kZSIsItix2YXYsiDYudio2YjYsSDZgdi52YTZiiDZhtin2K/Ysdiz2Kog2KfYs9iqIjoiQ3VycmVudCBwYXNzd29yZCBpcyBpbmNvcnJlY3QiLCLYqtmD2LHYp9ixINix2YXYsiDYudio2YjYsSDZhdi32KfYqNmC2Kog2YbYr9in2LHYryI6IlBhc3N3b3JkIGNvbmZpcm1hdGlvbiBkb2VzIG5vdCBtYXRjaCIsItiu2YjYp9mG2K/ZhiDZhdiu2YHZiiI6IlN0ZWFsdGggUmVhZCIsIti22K8g2K3YsNmBINm+2YrYp9mFIjoiQW50aS1EZWxldGUiLCLYttivINmI2YrYsdin2YrYtCDZvtmK2KfZhSI6IkFudGktRWRpdCIsItm+2KfYs9iuINmF2YbYtNmKIChBRkspIjoiQXdheSAoQUZLKSBSZXBseSIsItm+2KfYs9iuINiu2YjYr9mD2KfYsSDYr9ixINit2KfZhNiqINi52K/ZhSDYrdi22YjYsSI6IkF1dG8tcmVwbHkgd2hlbiBhd2F5Iiwi2KjZitmI2q/Ysdin2YHZiiDZh9mI2LTZhdmG2K8iOiJTbWFydCBEeW5hbWljIEJpbyIsItiz2KfYudiqINmB2YjZhtiq2Yog2KfYs9iq2YjYr9mK2YgiOiJTdHVkaW8gU3R5bGl6ZWQgQ2xvY2siLCLYp9iq2YjZhdin2LPZitmI2YYiOiJBdXRvbWF0aW9uIiwi2YXYr9mK2LHZitiqINix2KjYp9iqIjoiQm90IE1hbmFnZW1lbnQiLCLYr9iz2KrZitin2LEg2KrZhNqv2LHYp9mFIjoiVGVsZWdyYW0gQXNzaXN0YW50Iiwi2YfZiNi0INmF2LXZhtmI2LnZiiI6IkFydGlmaWNpYWwgSW50ZWxsaWdlbmNlIiwi2KrZhti42YrZhdin2Kog2KfZhdmG2YrYqtmKIjoiU2VjdXJpdHkgU2V0dGluZ3MiLCLZiNix2YjYryDYr9mI2YXYsdit2YTZhyDYp9uMIjoiVHdvLUZhY3RvciBBdXRoZW50aWNhdGlvbiIsItmI2LHZiNivINiv2YjZhdix2K3ZhNmH4oCM2KfZiiI6IlR3by1GYWN0b3IgQXV0aGVudGljYXRpb24iLCLZg9iv2YfYp9mKINin2LbYt9ix2KfYsdmKIjoiRW1lcmdlbmN5IENvZGVzIiwi2LPYp9i52Kog2LHYs9mF2Yog2KrZh9ix2KfZhiI6IlRlaHJhbiBPZmZpY2lhbCBUaW1lIiwi2KrZgtmI2YrZhSDYrtmI2LHYtNmK2K/ZiiI6IlNvbGFyIEhpanJpIENhbGVuZGFyIiwi2KjZhyDYsdmI2LIg2LHYs9in2YbZiiI6IlVwZGF0ZSIsItiz2YHYp9ix2LTZiiI6IkN1c3RvbSIsItiy2YXYp9mGINio2YrYr9in2LHZiiI6Ildha2UgVGltZSIsItmF2KrZhiDYqNmK2Yjar9ix2KfZgdmKIjoiQmlvIFRlbXBsYXRlIiwi2b7bjNi0INmG2YXYp9uM2LQg2LLZhtiv2YciOiJMaXZlIFByZXZpZXciLCLZvtmK2LTigIzZhtmF2KfZiti0INiy2YbYr9mHIjoiTGl2ZSBQcmV2aWV3Iiwi2YPYp9ix2KjYsdin2YYg2YXYs9iv2YjYryDYtNiv2YciOiJCbG9ja2VkIFVzZXJzIiwi2KfZgdiy2YjYr9mGINmD2KfYsdio2LEiOiJBZGQgVXNlciIsItit2LDZgSDZg9in2LHYqNixIjoiUmVtb3ZlIFVzZXIiLCLZhNmK2LPYqiDZhdiz2K/ZiNiv2YoiOiJCbG9ja2xpc3QiLCLZhNmK2LPYqiDYs9mD2YjYqiI6Ik11dGUgTGlzdCIsItqp2KfYsdio2LHYp9mGINio24wg2LXYr9inIjoiTXV0ZWQgVXNlcnMiLCLZg9in2LHYqNix2KfZhiDYqNmK4oCM2LXYr9inIjoiTXV0ZWQgVXNlcnMiLCLYsdmB2Lkg2LPZg9mI2KoiOiJVbm11dGUiLCLYqNuMINi12K/YpyDaqdix2K/ZhiI6Ik11dGUiLCLYqNmK4oCM2LXYr9inINmD2LHYr9mGIjoiTXV0ZSIsItiq2KfYsduM2K7ahtmHINm+24zYp9mFINmH2KciOiJNZXNzYWdlIEhpc3RvcnkiLCLYqtin2LHZitiu2obZhyDZvtmK2KfZheKAjNmH2KciOiJNZXNzYWdlIEhpc3RvcnkiLCLZvtuM2KfZhSDZh9in24wg2K3YsNmBINi02K/ZhyI6IkRlbGV0ZWQgTWVzc2FnZXMiLCLZvtmK2KfZheKAjNmH2KfZiiDYrdiw2YEg2LTYr9mHIjoiRGVsZXRlZCBNZXNzYWdlcyIsItm+24zYp9mFINmH2KfbjCDZiNuM2LHYp9uM2LQg2LTYr9mHIjoiRWRpdGVkIE1lc3NhZ2VzIiwi2b7Zitin2YXigIzZh9in2Yog2YjZitix2KfZiti0INi02K/ZhyI6IkVkaXRlZCBNZXNzYWdlcyIsItm+2KfZg9iz2KfYstmKINiq2KfYsdmK2K7ahtmHIjoiQ2xlYXIgSGlzdG9yeSIsItiu2LHZiNis2Yog2q/YsdmB2KrZhiI6IkV4cG9ydCIsItmI2LbYudmK2Kog2KfYqti12KfZhCDYs9ix2YjYsSI6IlNlcnZlciBDb25uZWN0aW9uIFN0YXR1cyIsItiv2YrYqtin2KjZitizIjoiRDEgRGF0YWJhc2UiLCLZg9mE2YrYryDZhdiz2KrYsSI6Ik1hc3RlciBLZXkiLCLZg9mE2KfZitmG2KoiOiJUZWxlZ3JhbSBDbGllbnQiLCLZvti02KrZitio2KfZhtmKIjoiU3VwcG9ydCIsItqv24zYqiDZh9in2KgiOiJHaXRIdWIiLCLar9mK2KrigIzZh9in2KgiOiJHaXRIdWIiLCLZg9in2YbYp9mEINiq2YTar9ix2KfZhSI6IlRlbGVncmFtIENoYW5uZWwiLCLZgtmI2KfZhtmK2YYg2KfYs9iq2YHYp9iv2YciOiJUZXJtcyBvZiBTZXJ2aWNlIiwi2K3YsdmK2YUg2K7YtdmI2LXZiiI6IlByaXZhY3kgUG9saWN5Iiwi2LrZitix2YHYudin2YQiOiJJbmFjdGl2ZSIsItmD2KfYsdio2LHYp9mGIjoiVXNlcnMiLCLZg9in2LHYqNix2KfZhiDZgdi52KfZhCI6IkFjdGl2ZSBVc2VycyIsItmF2K/ZitixIjoiQWRtaW4iLCLZhdiv2YrYsdin2YYiOiJBZG1pbnMiLCLZhdin2YTZgyI6Ik93bmVyIiwi2LHYqNin2Kog2YfYpyI6IkJvdHMiLCLYs9mE2YEg2KjYp9iqIjoiU2VsZmJvdCIsItii2YHZhNin2YrZhiI6Ik9mZmxpbmUiLCLZhdmD2KsiOiJQYXVzZWQiLCLZiNmK2LHYp9mK2LQiOiJFZGl0Iiwi2KrYutmK2YrYsSI6IkNoYW5nZSIsItiq2YbYuNmK2YXYp9iqIjoiU2V0dGluZ3MiLCLYp9mF2YbZitiqIjoiU2VjdXJpdHkiLCLYqNmK2YgiOiJCaW8iLCLYqNmK2Yjar9ix2KfZgdmKIjoiQmlvIiwi2K/ZgtmK2YLZhyI6Ik1pbnV0ZSIsItir2KfZhtmK2YciOiJTZWNvbmQiLCLYsdin2Yrar9in2YYiOiJGcmVlIiwi2YjZitqY2YciOiJWSVAiLCLZvti02KrZitio2KfZhiI6IkJhY2t1cCIsItmD2K/Zh9inIjoiQ29kZXMiLCLZhNin2YrYs9mG2LMiOiJMaWNlbnNlIiwi2KjYp9mC24wg2YXYp9mG2K/ZhyI6IlJlbWFpbmluZyIsItio2KfZgtmK4oCM2YXYp9mG2K/ZhyI6IlJlbWFpbmluZyIsItmD2YQiOiJUb3RhbCIsItmH2YXar9in2YUg2LPYp9iy24wiOiJTeW5jIiwi2YfZhdqv2KfZheKAjNiz2KfYstmKIjoiU3luYyIsItir2KjYqiDZhtin2YUiOiJTaWduIFVwIiwi2KjYp9iy2YrYp9io2YoiOiJSZXN0b3JlIiwi2K7YsdmI2KzZiiI6IkV4cG9ydCIsItiq2KfZitmK2K8iOiJDb25maXJtIiwi2LDYrtmK2LHZhyI6IlNhdmUiLCLYr9ix2YrYp9mB2KoiOiJSZWNlaXZlIiwi2KjYsdix2LPZiiI6IkNoZWNrIiwi2KfZhdmD2KfZhtin2KoiOiJGZWF0dXJlcyIsItin2LPYqtmI2K/ZitmIIjoiU3R1ZGlvIiwi2YXYr9mK2LHZitiqIjoiTWFuYWdlbWVudCIsItiz2YPZiNiqIjoiTXV0ZSIsIti22K8g2YjZitix2KfZiti0IjoiQW50aS1FZGl0Iiwi2YXZhti02YoiOiJBRksiLCLZg9mE2YrYryI6IktleSIsItiq2YjZg9mGIjoiVG9rZW4iLCLYqtin2LHZitiuIjoiRGF0ZSIsItm+2KfZitqv2KfZhyDYr9in2K/ZhyI6IkRhdGFiYXNlIiwi2LTYqNmD2YciOiJOZXR3b3JrIiwi2YjYsdmD2LEiOiJXb3JrZXIiLCLZg9mE2KfYr9mB2YTYsSI6IkNsb3VkZmxhcmUiLCLYs9mD2LHYqiI6IlNlY3JldCIsItiz2qnYsdiqINmH2KciOiJTZWNyZXRzIiwi2LPZg9ix2KrigIzZh9inIjoiU2VjcmV0cyIsItqG2qkg2YTbjNiz2KoiOiJDaGVja2xpc3QiLCLahtmD4oCM2YTZitiz2KoiOiJDaGVja2xpc3QiLCLZhtmH2KfZitmKIjoiRmluYWwiLCLZvtuM2LQg2YbbjNin2LLZh9inIjoiUHJlcmVxdWlzaXRlcyIsItm+2YrYtOKAjNmG2YrYp9iy2YfYpyI6IlByZXJlcXVpc2l0ZXMiLCLZhtuM2KfYstmF2YbYr9uMINmH2KciOiJSZXF1aXJlbWVudHMiLCLZhtmK2KfYstmF2YbYr9mK4oCM2YfYpyI6IlJlcXVpcmVtZW50cyIsItiq2YPZhdmK2YQiOiJDb21wbGV0ZSIsItmF2YjZgdmC2YrYqiI6IlN1Y2Nlc3MiLCLYqtio2LHZitmDIjoiQ29uZ3JhdHVsYXRpb25zIiwi2YbZg9iq2YciOiJUaXAiLCLZitinIjoib3IiLCLYqNix2KfZiiI6ImZvciIsItix2YjZiiI6Im9uIiwi2KjbjCDYtdiv2KciOiJtdXRlIiwi2KjZiuKAjNi12K/YpyI6Im11dGUiLCLYqNuMINi12K/YpyDaqdmG24zYryI6Im11dGUiLCLYqNmK4oCM2LXYr9inINmD2YbZitivIjoibXV0ZSIsItmD2YbZitivIjoiIiwi2YXbjCDYtNmI2K8iOiIiLCLZhdmK4oCM2LTZiNivIjoiIiwi2K/Yp9ix2KfZiiI6IndpdGgiLCLZitmDIjoib25lIiwi2YXYp9mG2YrYqtmI2LHZitmG2q8iOiJNb25pdG9yaW5nIiwi2YXaqdirINiz2YTZgSDYqNin2KoiOiJQYXVzZSBTZWxmYm90Iiwi2YXZg9irINiz2YTZgeKAjNio2KfYqiI6IlBhdXNlIFNlbGZib3QiLCLZgdi52KfZhCDYs9in2LLbjCDYs9mE2YEg2KjYp9iqIjoiQWN0aXZhdGUgU2VsZmJvdCIsItmB2LnYp9mE4oCM2LPYp9iy2Yog2LPZhNmB4oCM2KjYp9iqIjoiQWN0aXZhdGUgU2VsZmJvdCIsItiq2LrZitmK2LEg2b7ZhNmGINin2LTYqtix2KfZgyI6IkNoYW5nZSBTdWJzY3JpcHRpb24gUGxhbiIsItiq2LrZitmK2LEg2YPZhNmF2Ycg2LnYqNmI2LEiOiJDaGFuZ2UgUGFzc3dvcmQiLCLYqti52YTZitmCINit2LPYp9ioIjoiU3VzcGVuZCBBY2NvdW50Iiwi2YrZiNiy2LHZhtmK2YU6IjoiVXNlcm5hbWU6Iiwi4pyFINiq2YjZg9mGINiq2YTar9ix2KfZhSDZg9in2YXZhNin2Ysg2YXYudiq2KjYsSDZiCDZgdi52KfZhCDYp9iz2KohIjoi4pyFIFRlbGVncmFtIHRva2VuIGlzIGNvbXBsZXRlbHkgdmFsaWQgYW5kIGFjdGl2ZSEiLCLwn5+iINmF2KrYtdmEINmIINis2K/Yp9mI2YQg2KLZhdin2K/ZhyAo2KrYudiv2KfYryDZg9mE2YrYr9mH2Kc6Ijoi8J+foiBDb25uZWN0ZWQgJiBUYWJsZXMgUmVhZHkgKEtleXMgY291bnQ6Iiwi2LHYp9mH2YbZhdin24wg2KrYudin2YXZhNuMINmIINiu2YjYr9qp2KfYsSDYsdin2Ycg2KfZhtiv2KfYstuMINin2K7Yqti12KfYtduMINmIINix2KfbjNqv2KfZhiDYs9mE2YEg2KjYp9iqINiq2YTar9ix2KfZhSBBcml6byBTZWxmINix2YjbjCDaqdmE2KfYr9mB2YTYsSDZiCDar9uM2Kog2YfYp9ioINin2qnYtNmG2LIiOiJJbnRlcmFjdGl2ZSBhbmQgYXV0b21hdGVkIHN0ZXAtYnktc3RlcCBzZXR1cCBndWlkZSBmb3IgZnJlZSBkZWRpY2F0ZWQgQXJpem8gU2VsZmJvdCBvbiBDbG91ZGZsYXJlIGFuZCBHaXRIdWIgQWN0aW9ucyIsItix2KfZh9mG2YXYp9mKINiq2LnYp9mF2YTZiiDZiCDYrtmI2K/Zg9in2LEg2LHYp9mH4oCM2KfZhtiv2KfYstmKINin2K7Yqti12KfYtdmKINmIINix2KfZitqv2KfZhiDYs9mE2YHigIzYqNin2Kog2KrZhNqv2LHYp9mFIEFyaXpvIFNlbGYg2LHZiNmKINmD2YTYp9iv2YHZhNixINmIINqv2YrYquKAjNmH2KfYqCDYp9mD2LTZhtiyIjoiSW50ZXJhY3RpdmUgYW5kIGF1dG9tYXRlZCBzdGVwLWJ5LXN0ZXAgc2V0dXAgZ3VpZGUgZm9yIGZyZWUgZGVkaWNhdGVkIEFyaXpvIFNlbGZib3Qgb24gQ2xvdWRmbGFyZSBhbmQgR2l0SHViIEFjdGlvbnMiLCLYotmK2Kcg2KfYsiDYrdiw2YEg2YPYp9mF2YQg2YPYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjb21wbGV0ZWx5IGRlbGV0ZSB1c2VyIiwi2KrZhdin2YXbjCDYr9in2K/ZhyDZh9in24wg2KfbjNmGINqp2KfYsdio2LEg2b7Yp9qpINiu2YjYp9mH2K8g2LTYry4iOiJBbGwgZGF0YSBvZiB0aGlzIHVzZXIgd2lsbCBiZSBwdXJnZWQuIiwi2KrZhdin2YXZiiDYr9in2K/Zh+KAjNmH2KfZiiDYp9mK2YYg2YPYp9ix2KjYsSDZvtin2YMg2K7ZiNin2YfYryDYtNivLiI6IkFsbCBkYXRhIG9mIHRoaXMgdXNlciB3aWxsIGJlIHB1cmdlZC4iLCLYotmK2Kcg2KfYsiDYrtix2YjYrCDYp9iyINiq2LnZhNmK2YIg2YPYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byB1bnN1c3BlbmQgdXNlciIsItii2YrYpyDYp9iyINiq2LnZhNmK2YIg2YPYp9ix2KjYsSI6IkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBzdXNwZW5kIHVzZXIiLCLZhdiv2Kog2LLZhdin2YYg2KfYtNiq2LHYp9mDINis2K/ZitivINix2Kcg2KfZhtiq2K7Yp9ioINmD2YbZitivOiI6IlNlbGVjdCBuZXcgc3Vic2NyaXB0aW9uIGR1cmF0aW9uOiIsItiv2KfYptmF2Yog2Ygg2YbYp9mF2K3Yr9mI2K8gKExpZmV0aW1lKSI6IlBlcm1hbmVudCAmIExpZmV0aW1lIiwi2YPYp9ix2KjYsSDZhtin2YXYudiq2KjYsSDYp9iz2KoiOiJVc2VyIGlzIGludmFsaWQiLCLYr9in2KbZhdmKINmIINmG2KfZhdit2K/ZiNivICjZhdiv2YrYsSDYp9ix2LTYrykiOiJQZXJtYW5lbnQgJiBVbmxpbWl0ZWQgKFN1cGVyIEFkbWluKSIsItmF2YbZgti224wg2LTYr9mHIjoiRXhwaXJlZCIsItmF2YbZgti22YrigIzYtNiv2YciOiJFeHBpcmVkIiwi2KrZiNmD2YYg2LHYqNin2Kog2KfYsdiz2KfZhCDZhti02K/ZhyDYp9iz2KouIjoiQm90IHRva2VuIHdhcyBub3QgcHJvdmlkZWQuIiwi2KrZiNmD2YYg2YjYp9ix2K8g2LTYr9mHINiq2YjYs9i3INiz2LHZiNix2YfYp9mKINiq2YTar9ix2KfZhSDYqtin2YrZitivINmG2LTYry4iOiJUaGUgdG9rZW4gd2FzIG5vdCB2ZXJpZmllZCBieSBUZWxlZ3JhbSBzZXJ2ZXJzLiIsItiq2YjZg9mGINix2KjYp9iqINmIINi02YbYp9iz2Ycg2obYqiAo2LnYr9iv2YopINin2YTYstin2YXZiiDZh9iz2KrZhtivLiI6IkJvdCB0b2tlbiBhbmQgQ2hhdCBJRCAobnVtZXJpYykgYXJlIHJlcXVpcmVkLiIsItm+2YrYp9mFINiq2LPYqiDYqNinINmF2YjZgdmC2YrYqiDYqNmHINqG2Kog2KrZhNqv2LHYp9mFINin2LHYs9in2YQg2LTYry4iOiJUZXN0IG1lc3NhZ2Ugc2VudCBzdWNjZXNzZnVsbHkgdG8gVGVsZWdyYW0gY2hhdC4iLCLYrti32Kcg2K/YsSDYp9ix2LPYp9mEINm+2YrYp9mFINiq2YTar9ix2KfZhS4iOiJFcnJvciBzZW5kaW5nIFRlbGVncmFtIG1lc3NhZ2UuIiwi2KrZhNin2LQg2KjZiti0INin2LIg2K3YryDYqNix2KfZiiDZiNix2YjYryDYqNmHINm+2YbZhCDZhdiv2YrYsdmK2KouINmE2LfZgdin2Ysg27Ug2K/ZgtmK2YLZhyDYr9mK2q/YsSDYqtmE2KfYtCDZg9mG2YrYry4iOiJUb28gbWFueSBsb2dpbiBhdHRlbXB0cyB0byBBZG1pbiBQb3J0YWwuIFBsZWFzZSByZXRyeSBpbiA1IG1pbnV0ZXMuIiwi2LHZhdiyINi52KjZiNixINmF2K/Zitix2YrYqiDYr9ixINiz2LHZiNixINiq2YbYuNmK2YUg2YbYtNiv2Ycg2KfYs9iqLiI6IkFkbWluIHBhc3N3b3JkIGlzIG5vdCBzZXQgb24gdGhlIHNlcnZlci4iLCLYsdmF2LIg2LnYqNmI2LEg2YXYr9mK2LHZitiqINmG2KfYr9ix2LPYqiDYp9iz2KouIjoiQWRtaW4gcGFzc3dvcmQgaXMgaW5jb3JyZWN0LiIsItiu2LfYpyDYr9ixINin2K3Ysdin2LIg2YfZiNmK2Kog2YXYr9mK2LHZitiqIjoiRXJyb3IgaW4gQWRtaW4gYXV0aGVudGljYXRpb24iLCLYr9iz2KrYsdiz2Yog2LrZitix2YXYrNin2LIiOiJVbmF1dGhvcml6ZWQgYWNjZXNzIiwi2K7Yt9inINiv2LEg2K/YsdmK2KfZgdiqINii2YXYp9ixIjoiRXJyb3IgcmV0cmlldmluZyBzdGF0aXN0aWNzIiwi2K7Yt9inINiv2LEg2K/YsduM2KfZgdiqINmE2KfaryDZh9in24wg2KfZhdmG24zYqtuMIjoiRXJyb3IgcmV0cmlldmluZyBzZWN1cml0eSBsb2dzIiwi2K7Yt9inINiv2LEg2K/YsdmK2KfZgdiqINmE2Kfar+KAjNmH2KfZiiDYp9mF2YbZitiq2YoiOiJFcnJvciByZXRyaWV2aW5nIHNlY3VyaXR5IGxvZ3MiLCLYrti32Kcg2K/YsSDYr9ix2YrYp9mB2Kog2YPYr9mH2KciOiJFcnJvciByZXRyaWV2aW5nIGxpY2Vuc2UgY29kZXMiLCLYrti32Kcg2K/YsSDYqtmI2YTZitivINmD2K/Zh9in2Yog2LHYr9mK2YUiOiJFcnJvciBnZW5lcmF0aW5nIHJlZGVlbSBjb2RlcyIsItmD2K8g2KfZhNiy2KfZhdmKINin2LPYqiI6IkNvZGUgaXMgcmVxdWlyZWQiLCLYrti32Kcg2K/YsSDYrdiw2YEg2YPYryI6IkVycm9yIGRlbGV0aW5nIGNvZGUiLCLZhdmG2YLYttuMINi02K/ZhyDwn5S0IjoiRXhwaXJlZCDwn5S0Iiwi2YXZhtmC2LbZiuKAjNi02K/ZhyDwn5S0IjoiRXhwaXJlZCDwn5S0Iiwi2K7Yt9inINiv2LEg2K/YsdmK2KfZgdiqINmD2KfYsdio2LHYp9mGIjoiRXJyb3IgcmV0cmlldmluZyB1c2VycyIsItmD2KfYsdio2LEg2YrYp9mB2Kog2YbYtNivIjoiVXNlciBub3QgZm91bmQiLCLZg9in2LHYqNixINix2KjYp9iqINmD2YXZg9mKINmF2KrYtdmEINmG2K/Yp9ix2K8iOiJVc2VyIGhhcyBubyBhc3Npc3RhbnQgYm90IGNvbm5lY3RlZCIsItit2LPYp9ioINiq2YTar9ix2KfZhSDZg9in2LHYqNixINmF2KrYtdmEINmG2YrYs9iqIjoiVXNlciBUZWxlZ3JhbSBhY2NvdW50IGlzIG5vdCBjb25uZWN0ZWQiLCLZg9mE2YXZhyDYudio2YjYsSDYrNiv2YrYryDYqNin2YrYryDYrdiv2KfZgtmEINu2INmD2KfYsdin2YPYqtixINio2KfYtNivIjoiTmV3IHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzIiwi2KfYtNiq2LHYp9mDIjoiU3Vic2NyaXB0aW9uIiwi2LnZhdmE2YrYp9iqINmG2KfZhdi52KrYqNixIjoiSW52YWxpZCBvcGVyYXRpb24iLCLYrti32Kcg2K/YsSDYp9i52YXYp9mEINi52YXZhNmK2KfYqiI6IkVycm9yIHBlcmZvcm1pbmcgb3BlcmF0aW9uIiwi2KrZhNin2LQg2KjbjNi0INin2LIg2K3YryDYqNix2KfbjCDYq9io2Kog2YbYp9mFLiDZhNi32YHYp9mLINiv2YLYp9uM2YLbjCDYr9uM2q/YsSDYp9mF2KrYrdin2YYg2qnZhtuM2K8uIjoiVG9vIG1hbnkgcmVnaXN0cmF0aW9uIGF0dGVtcHRzLiBQbGVhc2UgcmV0cnkgaW4gYSBmZXcgbWludXRlcy4iLCLYqtmE2KfYtCDYqNmK2LQg2KfYsiDYrdivINio2LHYp9mKINir2KjYquKAjNmG2KfZhS4g2YTYt9mB2KfZiyDYr9mC2KfZitmC2Yog2K/Zitqv2LEg2KfZhdiq2K3Yp9mGINmD2YbZitivLiI6IlRvbyBtYW55IHJlZ2lzdHJhdGlvbiBhdHRlbXB0cy4gUGxlYXNlIHJldHJ5IGluIGEgZmV3IG1pbnV0ZXMuIiwi2YbYp9mFINmD2KfYsdio2LHZiiDYqNin2YrYryDYqNmK2YYg27Mg2KrYpyDbstu0INmD2KfYsdin2YPYqtixINmIINmB2YLYtyDYtNin2YXZhCDYrdix2YjZgSDYp9mG2q/ZhNmK2LPZitiMINi52K/YryDZiCBfINio2KfYtNivLiI6IlVzZXJuYW1lIG11c3QgYmUgYmV0d2VlbiAzLTI0IGNoYXJhY3RlcnMgY29udGFpbmluZyBvbmx5IEVuZ2xpc2ggbGV0dGVycywgbnVtYmVycywgYW5kIF8uIiwi2KfZitmGINmG2KfZhSDZg9in2LHYqNix2Yog2YLYqNmE2KfZiyDYq9io2Kog2LTYr9mHINin2LPYqi4g2YTYt9mB2KfZiyDZhtin2YUg2K/Zitqv2LHZiiDYqNix2q/YstmK2YbZitivLiI6IlRoaXMgdXNlcm5hbWUgaXMgYWxyZWFkeSB0YWtlbi4gUGxlYXNlIGNob29zZSBhbm90aGVyIHVzZXJuYW1lLiIsItmD2K8g2YTYp9mK2LPZhtizINmI2KfYsdivINi02K/ZhyDZhtin2YXYudiq2KjYsSDYp9iz2Kog2YrYpyDYr9ixINiz2YrYs9iq2YUg2YjYrNmI2K8g2YbYr9in2LHYry4iOiJMaWNlbnNlIGNvZGUgaXMgaW52YWxpZCBvciBkb2VzIG5vdCBleGlzdC4iLCLYp9mK2YYg2YPYryDZhNin2YrYs9mG2LMg2YLYqNmE2KfZiyDYqtmI2LPYtyDZg9in2LHYqNixINiv2Yrar9ix2Yog2YXYtdix2YEg2LTYr9mHINin2LPYqi4iOiJUaGlzIGxpY2Vuc2UgY29kZSBoYXMgYWxyZWFkeSBiZWVuIHJlZGVlbWVkIGJ5IGFub3RoZXIgdXNlci4iLCLYrti32Kcg2K/YsSDYq9io2Kog2YbYp9mFINqp2KfYsdio2LEiOiJFcnJvciByZWdpc3RlcmluZyB1c2VyIiwi2K7Yt9inINiv2LEg2KvYqNiq4oCM2YbYp9mFINmD2KfYsdio2LEiOiJFcnJvciByZWdpc3RlcmluZyB1c2VyIiwi2YPYryDZhNin2YrYs9mG2LMg2KfZhNiy2KfZhdmKINin2LPYqiI6IkxpY2Vuc2UgY29kZSBpcyByZXF1aXJlZCIsItmD2K8g2YTYp9mK2LPZhtizINmG2KfZhdi52KrYqNixINin2LPYqiDZitinINmC2KjZhNin2Ysg2YXYtdix2YEg2LTYr9mHINin2LPYqi4iOiJMaWNlbnNlIGNvZGUgaXMgaW52YWxpZCBvciBhbHJlYWR5IHJlZGVlbWVkLiIsItiu2LfYpyDYr9ixINmB2LnYp9mEINiz2KfYstuMINqp2K8g2YTYp9uM2LPZhtizIjoiRXJyb3IgYWN0aXZhdGluZyBsaWNlbnNlIGNvZGUiLCLYrti32Kcg2K/YsSDZgdi52KfZhOKAjNiz2KfYstmKINmD2K8g2YTYp9mK2LPZhtizIjoiRXJyb3IgYWN0aXZhdGluZyBsaWNlbnNlIGNvZGUiLCLYrdiz2KfYqCDZhdmI2YLYqtin2Ysg2YLZgdmEINi02K8uINmE2LfZgdin2Ysg27Ug2K/ZgtmK2YLZhyDYr9mK2q/YsSDZhdis2K/Yr9in2Ysg2KrZhNin2LQg2YPZhtmK2K8uIjoiQWNjb3VudCB0ZW1wb3JhcmlseSBsb2NrZWQuIFBsZWFzZSByZXRyeSBpbiA1IG1pbnV0ZXMuIiwi2YbYp9mFINmD2KfYsdio2LHZiiDZitinINix2YXYsiDYudio2YjYsSDYp9i02KrYqNin2Ycg2KfYs9iqLiI6IkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQuIiwi2qnYryDYqtin24zbjNivINiv2Ygg2YXYsdit2YTZhyDYp9uMICgyRkEpINin2YTYstin2YXbjCDYp9iz2KouIjoiVHdvLWZhY3RvciBhdXRoZW50aWNhdGlvbiAoMkZBKSBjb2RlIGlzIHJlcXVpcmVkLiIsItmD2K8g2KrYp9mK2YrYryDYr9mIINmF2LHYrdmE2YfigIzYp9mKICgyRkEpINin2YTYstin2YXZiiDYp9iz2KouIjoiVHdvLWZhY3RvciBhdXRoZW50aWNhdGlvbiAoMkZBKSBjb2RlIGlzIHJlcXVpcmVkLiIsItqp2K8g2KrYp9uM24zYryDYr9mIINmF2LHYrdmE2Ycg2KfbjCAoMkZBKSDbjNinINqp2K8g2KjYp9iy24zYp9io24wg2YbYp9iv2LHYs9iqINin2LPYqi4iOiJJbnZhbGlkIDJGQSBjb2RlIG9yIHJlY292ZXJ5IGNvZGUuIiwi2YPYryDYqtin2YrZitivINiv2Ygg2YXYsdit2YTZh+KAjNin2YogKDJGQSkg2YrYpyDZg9ivINio2KfYstmK2KfYqNmKINmG2KfYr9ix2LPYqiDYp9iz2KouIjoiSW52YWxpZCAyRkEgY29kZSBvciByZWNvdmVyeSBjb2RlLiIsItix2YXYsiDYudio2YjYsSDZgdi52YTZiiDZhtin2K/Ysdiz2Kog2KfYs9iqLiI6IkN1cnJlbnQgcGFzc3dvcmQgaXMgaW5jb3JyZWN0LiIsItix2YXYsiDYudio2YjYsSDYqNinINmF2YjZgdmC24zYqiDYqNmHINix2YjYstix2LPYp9mG24wg2LTYry4iOiJQYXNzd29yZCB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4iLCLYsdmF2LIg2LnYqNmI2LEg2KjYpyDZhdmI2YHZgtmK2Kog2KjZh+KAjNix2YjYstix2LPYp9mG2Yog2LTYry4iOiJQYXNzd29yZCB1cGRhdGVkIHN1Y2Nlc3NmdWxseS4iLCLYrti32Kcg2K/YsSDYqti62YrZitixINix2YXYsiDYudio2YjYsSI6IkVycm9yIGNoYW5naW5nIHBhc3N3b3JkIiwi2KfZg9in2YbYqiDYqtmE2q/Ysdin2YUg2YXYqti12YQg2YbZitiz2KoiOiJUZWxlZ3JhbSBhY2NvdW50IGlzIG5vdCBjb25uZWN0ZWQiLCLYrti32Kcg2K/YsSDYrdiw2YEg2K3Ys9in2Kgg2YPYp9ix2KjYsdmKIjoiRXJyb3IgZGVsZXRpbmcgdXNlciBhY2NvdW50Iiwi2K7Yt9inINiv2LEg2KfZitis2KfYryDYqtmG2LjZitmF2KfYqiAyRkEiOiJFcnJvciBzZXR0aW5nIHVwIDJGQSIsItmF2YfZhNiqINmB2LnYp9mEINiz2KfYstuMINio2Ycg2b7Yp9uM2KfZhiDYsdiz24zYr9mHINin2LPYqi4g2YXYrNiv2K/Yp9mLINin2YLYr9in2YUg2qnZhtuM2K8uIjoiQWN0aXZhdGlvbiB0aW1lb3V0IGV4cGlyZWQuIFBsZWFzZSB0cnkgYWdhaW4uIiwi2YXZh9mE2Kog2YHYudin2YTigIzYs9in2LLZiiDYqNmHINm+2KfZitin2YYg2LHYs9mK2K/ZhyDYp9iz2KouINmF2KzYr9iv2KfZiyDYp9mC2K/Yp9mFINmD2YbZitivLiI6IkFjdGl2YXRpb24gdGltZW91dCBleHBpcmVkLiBQbGVhc2UgdHJ5IGFnYWluLiIsItmD2K8g27Yg2LHZgtmF2Yog2YjYp9ix2K8g2LTYr9mHINmG2KfZhdi52KrYqNixINin2LPYqi4iOiJUaGUgNi1kaWdpdCBjb2RlIGlzIGludmFsaWQuIiwi2K7Yt9inINiv2LEg2YHYudin2YQg2LPYp9iy24wgMkZBIjoiRXJyb3IgZW5hYmxpbmcgMkZBIiwi2K7Yt9inINiv2LEg2YHYudin2YTigIzYs9in2LLZiiAyRkEiOiJFcnJvciBlbmFibGluZyAyRkEiLCLYrNmH2Kog2LrbjNix2YHYudin2YQg2LPYp9iy24zYjCDZiNix2YjYryDYsdmF2LIg2LnYqNmI2LEg2K3Ys9in2Kgg24zYpyDaqdivINmF2LnYqtio2LEg2KfZhNiy2KfZhduMINin2LPYqi4iOiJBY2NvdW50IHBhc3N3b3JkIG9yIHZhbGlkIGNvZGUgcmVxdWlyZWQgdG8gZGlzYWJsZSAyRkEuIiwi2KzZh9iqINi62YrYsdmB2LnYp9mE4oCM2LPYp9iy2YrYjCDZiNix2YjYryDYsdmF2LIg2LnYqNmI2LEg2K3Ys9in2Kgg2YrYpyDZg9ivINmF2LnYqtio2LEg2KfZhNiy2KfZhdmKINin2LPYqi4iOiJBY2NvdW50IHBhc3N3b3JkIG9yIHZhbGlkIGNvZGUgcmVxdWlyZWQgdG8gZGlzYWJsZSAyRkEuIiwi2K7Yt9inINiv2LEg2LrbjNix2YHYudin2YQg2LPYp9iy24wgMkZBIjoiRXJyb3IgZGlzYWJsaW5nIDJGQSIsItiu2LfYpyDYr9ixINi62YrYsdmB2LnYp9mE4oCM2LPYp9iy2YogMkZBIjoiRXJyb3IgZGlzYWJsaW5nIDJGQSIsItix2YXYsiDYudio2YjYsSDZvti02KrZitio2KfZhiDYqNin2YrYryDYrdiv2KfZgtmEINu4INmD2KfYsdin2YPYqtixINio2KfYtNivLiI6IkJhY2t1cCBwYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycy4iLCLYrti32Kcg2K/YsSDYrtix2YjYrNmKINm+2LTYqtmK2KjYp9mGIjoiRXJyb3IgZ2VuZXJhdGluZyBiYWNrdXAgZXhwb3J0Iiwi2YXYrdiq2YjYp9mKINmB2KfZitmEINm+2LTYqtmK2KjYp9mGINmIINix2YXYsiDYudio2YjYsSDYp9mE2LLYp9mF2Yog2KfYs9iqLiI6IkJhY2t1cCBmaWxlIGNvbnRlbnQgYW5kIHBhc3N3b3JkIGFyZSByZXF1aXJlZC4iLCLZgdin2YrZhCDZvti02KrZitio2KfZhiDZgdin2YLYryDYqtmG2LjZitmF2KfYqiDZhdi52KrYqNixINin2LPYqi4iOiJCYWNrdXAgZmlsZSBkb2VzIG5vdCBjb250YWluIHZhbGlkIHNldHRpbmdzLiIsItiu2LfYpyDYr9ixINio2KfYstqv2LHYr9in2YbZiiDZvti02KrZitio2KfZhiI6IkVycm9yIHJlc3RvcmluZyBiYWNrdXAiLCLYp9io2KrYr9inINmI2KfYsdivINit2LPYp9ioINmD2KfYsdio2LHZiiDYrtmI2K8g2LTZiNmK2K8iOiJQbGVhc2Ugc2lnbiBpbiB0byB5b3VyIGFjY291bnQgZmlyc3QiLCLYrNmH2Kog2KzZhNmI2q/Zitix2Yog2KfYsiDYqNmE2KfZgyDYtNiv2YYg2LTZhdin2LHZhyDYr9ixINiq2YTar9ix2KfZhdiMINmE2LfZgdin2Ysg27HbsCDYr9mC2YrZgtmHINi12KjYsSDZg9mG2YrYry4iOiJUbyBwcmV2ZW50IHBob25lIG51bWJlciBiYW4gb24gVGVsZWdyYW0sIHBsZWFzZSB3YWl0IDEwIG1pbnV0ZXMuIiwi2LTZhdin2LHZhyDYqtmE2YHZhiDYp9mE2LLYp9mF2Yog2KfYs9iqIjoiUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkIiwi2K7Yt9inINiv2LEg2KfYsdiz2KfZhCDZg9ivINiq2KPZitmK2K8g2KrZhNqv2LHYp9mFIjoiRXJyb3Igc2VuZGluZyBUZWxlZ3JhbSB2ZXJpZmljYXRpb24gY29kZSIsItmG2LTYs9iqINmF2YbZgti22Yog2LTYr9mHINin2LPYqi4g2YTYt9mB2KfZiyDZhdis2K/Yr9in2Ysg2LTZhdin2LHZhyDYsdinINmI2KfYsdivINmD2YbZitivLiI6IlNlc3Npb24gZXhwaXJlZC4gUGxlYXNlIHJlLWVudGVyIHBob25lIG51bWJlci4iLCLZg9ivINmI2KfYsdivINi02K/ZhyDYp9i02KrYqNin2Ycg2YrYpyDZhdmG2YLYttmKINin2LPYqiI6IlZlcmlmaWNhdGlvbiBjb2RlIGlzIGluY29ycmVjdCBvciBleHBpcmVkIiwi2YbYtNiz2Kog2YXZhtmC2LbZiiDYtNiv2Ycg2KfYs9iqLiDZhNi32YHYp9mLINmF2KzYr9iv2KfZiyDYqtmE2KfYtCDZg9mG2YrYry4iOiJTZXNzaW9uIGV4cGlyZWQuIFBsZWFzZSB0cnkgYWdhaW4uIiwi2LHZhdiyINiv2YjYudin2YXZhNmKINmI2KfYsdivINi02K/ZhyDYp9i02KrYqNin2Ycg2KfYs9iqIjoiMkZBIHBhc3N3b3JkIGlzIGluY29ycmVjdCIsItiz2LTZhiDYqtmE2q/Ysdin2YUg2KfZhNiy2KfZhdmKINin2LPYqiI6IlRlbGVncmFtIHNlc3Npb24gc3RyaW5nIGlzIHJlcXVpcmVkIiwi2KrZhNqv2LHYp9mFINmF2KrYtdmEINmG2YrYs9iqIjoiVGVsZWdyYW0gaXMgbm90IGNvbm5lY3RlZCIsItin2LTYqtix2KfaqSDYtNmF2Kcg2KjZhyDZvtin24zYp9mGINix2LPbjNiv2Ycg2Ygg2LPZhNmBINio2KfYqiDYqNmHINit2KfZhNiqINiq2LnZhNuM2YIg2K/Ysdii2YXYr9mHINin2LPYqi4iOiJZb3VyIHN1YnNjcmlwdGlvbiBoYXMgZW5kZWQgYW5kIHRoZSBzZWxmYm90IGlzIHN1c3BlbmRlZC4iLCLYp9i02KrYsdin2YMg2LTZhdinINio2Ycg2b7Yp9mK2KfZhiDYsdiz2YrYr9mHINmIINiz2YTZgeKAjNio2KfYqiDYqNmHINit2KfZhNiqINiq2LnZhNmK2YIg2K/Ysdii2YXYr9mHINin2LPYqi4iOiJZb3VyIHN1YnNjcmlwdGlvbiBoYXMgZW5kZWQgYW5kIHRoZSBzZWxmYm90IGlzIHN1c3BlbmRlZC4iLCLYqtmI2YPZhiDZhtin2YXYudiq2KjYsSDZitinINmF2YbZgti22Yog2KfYs9iqIjoiVG9rZW4gaXMgaW52YWxpZCBvciBleHBpcmVkIiwi2KfYt9mE2KfYudin2Kog2K/YsdmK2KfZgdiqINi02K/ZhyDZhdiq2LnZhNmCINio2Ycg2YrZgyDYsdio2KfYqiDZhdi52KrYqNixINmG2YrYs9iqLiI6IlJlY2VpdmVkIGRhdGEgZG9lcyBub3QgYmVsb25nIHRvIGEgdmFsaWQgYm90LiIsItin2KrYtdin2YQg2LHYqNin2Kog2KrZhNqv2LHYp9mFINio2Kcg2YXZiNmB2YLZitiqINmC2LfYuSDar9ix2K/ZitivINmIINmF2YbYp9io2Lkg2Ygg2K3Yp9mB2LjZhyDZg9mE2KfYr9mB2YTYsSDYotiy2KfYryDYtNivLiI6IlRlbGVncmFtIGJvdCBkaXNjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IGFuZCBDbG91ZGZsYXJlIG1lbW9yeSBmcmVlZC4iLCLYp9io2KrYr9inINix2KjYp9iqINiq2YTar9ix2KfZhSDYrtmI2K8g2LHYpyDZhdiq2LXZhCDZg9mG2YrYryI6IkNvbm5lY3QgeW91ciBUZWxlZ3JhbSBib3QgZmlyc3QiLCLYtNmG2KfYs9mHINi52K/Yr9mKINiq2YTar9ix2KfZhSDYqNin2YrYryDYudiv2K/ZiiDYqNmK2YYg27Ug2KrYpyDbsdu1INix2YLZhSDYqNin2LTYryI6IlRlbGVncmFtIG51bWVyaWMgSUQgbXVzdCBiZSBiZXR3ZWVuIDUgYW5kIDE1IGRpZ2l0cyIsItiu2LfYp9mKINiz2YrYs9iq2YXZiiDYsdiuINiv2KfYry4g2YTYt9mB2KfZiyDahtmG2K8g2YTYrdi42Ycg2KjYudivINmF2KzYr9iv2KfZiyDYqtmE2KfYtCDZgdix2YXYp9mK2YrYry4iOiJTeXN0ZW0gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4gc2hvcnRseS4iLCLZvtin2Yrar9in2Ycg2K/Yp9iv2YcgQ2xvdWRmbGFyZSBEMSDYqNmHINin2YrZhiDZiNix2YPYsSDZhdiq2LXZhCDZhtmK2LPYqiAoREIgYmluZGluZyDYqti52LHZitmBINmG2LTYr9mHKS4g2YTYt9mB2KfZiyDYp9io2KrYr9inIHdyYW5nbGVyLnRvbWwg2LHYpyDZvtmK2YPYsdio2YbYr9mKINmIINiv2YrZvtmE2YjZiiDZg9mG2YrYry4iOiJDbG91ZGZsYXJlIEQxIERhdGFiYXNlIGlzIG5vdCBib3VuZCB0byB0aGlzIFdvcmtlciAobWlzc2luZyBEQiBiaW5kaW5nKS4gUGxlYXNlIGNvbmZpZ3VyZSB3cmFuZ2xlci50b21sIGFuZCBkZXBsb3kgZmlyc3QuIiwi4pqhINin2LPYqtmI2K/bjNmI24wg2LPZhNmBINio2KfYqiI6IuKaoSBTZWxmYm90IFN0dWRpbyIsIuKaoSDYp9iz2KrZiNiv2YrZiNmKINiz2YTZgeKAjNio2KfYqiI6IuKaoSBTZWxmYm90IFN0dWRpbyIsItmG2YXYp9mK2LQg2b7ZhtmEINin2LXZhNmKINmIINix2KfZh9mG2YXYpyI6IlNob3cgTWFpbiBQYW5lbCAmIEd1aWRlIiwi8J+RuyDZhdi02KfZh9iv2Ycg2obYqiDZh9in24wg2K7YtdmI2LXbjCDZiCDZvtuM2KfZhSDZh9in24wg2K7ZiNin2YbYr9mHINmG2LTYr9mHICjYtNio2K0pIjoi8J+RuyBWaWV3IEdob3N0IENoYXRzICYgVW5yZWFkIE1lc3NhZ2VzIiwi8J+RuyDZhdi02KfZh9iv2Ycg2obYquKAjNmH2KfZiiDYrti12YjYtdmKINmIINm+2YrYp9mF4oCM2YfYp9mKINiu2YjYp9mG2K/Zh+KAjNmG2LTYr9mHICjYtNio2K0pIjoi8J+RuyBWaWV3IEdob3N0IENoYXRzICYgVW5yZWFkIE1lc3NhZ2VzIiwi8J+TqSDZvtuM2KfZhSDZh9in24wg2K7ZiNin2YbYr9mHINmG2LTYr9mHINiv2LEg2K3Yp9mE2Kog2LTYqNitIjoi8J+TqSBVbnJlYWQgTWVzc2FnZXMgaW4gR2hvc3QgTW9kZSIsIvCfk6kg2b7Zitin2YXigIzZh9in2Yog2K7ZiNin2YbYr9mH4oCM2YbYtNiv2Ycg2K/YsSDYrdin2YTYqiDYtNio2K0iOiLwn5OpIFVucmVhZCBNZXNzYWdlcyBpbiBHaG9zdCBNb2RlIiwi2LHZiNi02YYgLyDYrtin2YXZiNi0INmD2LHYr9mGINit2KfZhNiqINi02KjYrSI6IlRvZ2dsZSBHaG9zdCBNb2RlIE9uIC8gT2ZmIiwi2LHZiNi02YYgLyDYrtin2YXZiNi0INmD2LHYr9mGINm+2KfYs9iuINmH2YjYtNmF2YbYryBBSSI6IlRvZ2dsZSBTbWFydCBBSSBSZXBseSBPbiAvIE9mZiIsItin2LPYqti52YTYp9mFINmI2LbYuduM2Kog2LLZhtiv2Ycg2LPZhNmBINio2KfYqiI6IkNoZWNrIExpdmUgU2VsZmJvdCBTdGF0dXMiLCLYp9iz2KrYudmE2KfZhSDZiNi22LnZitiqINiy2YbYr9mHINiz2YTZgeKAjNio2KfYqiI6IkNoZWNrIExpdmUgU2VsZmJvdCBTdGF0dXMiLCLYqtiz2Kog2KfYsdiz2KfZhCDar9iy2KfYsdi0INi22K8g2K3YsNmBINmIINmI2YrYsdin2YrYtCI6IlRlc3QgQW50aS1EZWxldGUgJiBBbnRpLUVkaXQgUmVwb3J0Iiwi2LHYp9mH2YbZhdin2Yog2YPYp9mF2YQg2KfYs9iq2YHYp9iv2Ycg2KfYsiDYsdio2KfYqiI6IkNvbXBsZXRlIEJvdCBVc2FnZSBHdWlkZSJ9'), function(c) { return c.charCodeAt(0); })));
    } catch(e) {
      window.TRANSLATIONS_MAP = {};
    }

    // =========================================================================
    // 🌐 دیکشنری الحاقی برای قابلیت‌های جدید (AI Smart Reply, Models, Ignore List, Ghost Mode, etc.)
    // =========================================================================
    var ADDITIONAL_TRANSLATIONS = {
      // 🤖 AI Smart Reply — Section Header & Description
      'پاسخ هوشمند مبتنی بر هوش مصنوعی (AI Smart Reply)': 'Intelligent AI-Powered Smart Reply (AI Smart Reply)',
      'پاسخگویی هوشمند به پیام‌های پیوی با هوش مصنوعی (AI Smart Reply)': 'Intelligent Private Chat AI Auto-Reply (AI Smart Reply)',
      'به جای یک پیام ثابت AFK، هوش مصنوعی': 'Instead of a static AFK reply, AI',
      'متناسب با محتوای پیام': 'tailors dynamic responses based on message content',
      'به مخاطبین پاسخ می‌دهد. هر کاربر API Key خودش رو وارد می‌کنه و هزینه‌ای برای سرور نداره.': 'to incoming messages. Each user provides their own API Key with zero server cost.',
      'به جای یک پیام ثابت AFK، هوش مصنوعی متناسب با محتوای پیام به مخاطبین پاسخ می‌دهد. هر کاربر API Key خودش رو وارد می‌کنه و هزینه‌ای برای سرور نداره.': 'Instead of a static AFK message, AI dynamically responds based on message content. Each user enters their own API Key with zero cost to the server.',
      'فعال‌سازی پاسخ هوشمند AI (جایگزین AFK ثابت)': 'Enable AI Smart Auto-Reply (Replaces Static AFK)',
      'وقتی فعال باشه، AI به جای پیام ثابت منشی، هوشمندانه پاسخ می‌دهد': 'When enabled, AI crafts intelligent responses instead of a static secretary message',
      'پاسخ AI': 'AI Reply',
      'پاسخ هوشمند AI': 'Smart AI Reply',

      // 🛡️ AI Sensors & Offline Detection
      'پایش پیشرفته سنسورهای آنلاین/آفلاین:': 'Advanced Online/Offline Sensor Monitoring:',
      'هوش مصنوعی تنها زمانی پاسخ می‌دهد که': 'AI replies exclusively when you are',
      'آفلاین واقعی': 'genuinely offline',
      'باشید. وضعیت نشست‌های زنده تلگرام (موبایل و کامپیوتر)، فعالیت در چت‌های ۱۰ دقیقه اخیر، و صف انتظار ۱۲ ثانیه‌ای مانع از تداخل هوش مصنوعی با گفتگوهای شما می‌شود.': '. Active Telegram sessions (mobile & desktop), chat activity in the last 10 minutes, and a 12-second grace queue prevent any AI interference with your real-time conversations.',
      'تشخیص فوق‌هوشمند آفلاین بودن:': 'Ultra-Smart Offline Detection:',
      'سیستم به صورت چندلایه‌ای با بررسی نشست‌های متصل (گوشی و دسکتاپ)، چت فعال دوطرفه (۱۰ دقیقه)، پیش‌نویس‌ها و خواندن پیام‌ها تضمین می‌کند که منشی فقط در زمان آفلاین بودن پاسخ دهد و در حین چت فعال یا آنلاین بودن شما هرگز مزاحمتی ایجاد نکند (به همراه فرجه هوشمند ۱۲ ثانیه‌ای برای لغو خودکار).': 'The multi-layered sensor system checks active devices (mobile & desktop), recent two-way chat activity (10 min), typing drafts, and read receipts to guarantee AI replies exclusively when you are offline without disturbing your live chats (including a 12-second grace cancellation period).',

      // 🤖 AI Provider & Models
      'سرویس‌دهنده هوش مصنوعی (AI Provider)': 'AI Service Provider (AI Provider)',
      'Google Gemini (رایگان — پیشنهادی)': 'Google Gemini (Free — Recommended)',
      'OpenAI (GPT-4o / GPT-3.5)': 'OpenAI (GPT-4o / GPT-3.5)',
      'Custom API (سرویس سفارشی / DeepSeek)': 'Custom API (Custom Service / DeepSeek)',
      'Custom API (سرویس سفارشی)': 'Custom API (Custom Service)',
      'مدل هوش مصنوعی (AI Model)': 'AI Model (AI Model)',
      '🤖 مدل هوش مصنوعی (AI Model)': '🤖 AI Model (AI Model)',
      'انتخاب مدل پاسخ‌دهی': 'Select response model',
      'مدل‌های پرسرعت گوگل (رایگان)': 'High-speed Google models (Free)',
      'مدل‌های OpenAI GPT': 'OpenAI GPT models',
      'مدل سفارشی / DeepSeek / کلاود': 'Custom Model / DeepSeek / Claude',
      '⚡ Gemini 2.5 Flash (جدیدترین، پرسرعت و رایگان — پیشنهادی)': '⚡ Gemini 2.5 Flash (Latest, Fast & Free — Recommended)',
      '🚀 Gemini 2.0 Flash (پایدار و هوشمند)': '🚀 Gemini 2.0 Flash (Stable & Smart)',
      '🌟 Gemini 1.5 Flash (سریع و سبک)': '🌟 Gemini 1.5 Flash (Fast & Lightweight)',
      '🧠 Gemini 1.5 Pro (قدرت تحلیل بالا)': '🧠 Gemini 1.5 Pro (High Reasoning Capability)',
      '💨 Gemini Flash Lite (فوق سبک)': '💨 Gemini Flash Lite (Ultra Lightweight)',
      '✏️ مدل دستی دیگر (تایپ نام مدل دلخواه)...': '✏️ Other Custom Model (Type model name)...',
      '⚡ GPT-4o Mini (سریع، اقتصادی و دقیق — پیشنهادی)': '⚡ GPT-4o Mini (Fast, Economic & Accurate — Recommended)',
      '🧠 GPT-4o (پرچمدار هوشمند همه‌کاره)': '🧠 GPT-4o (Flagship Multimodal Intelligence)',
      '🚀 GPT-4 Turbo': '🚀 GPT-4 Turbo',
      '💨 GPT-3.5 Turbo (اقتصادی و سبک)': '💨 GPT-3.5 Turbo (Economic & Lightweight)',
      '🐳 DeepSeek V3 (Chat)': '🐳 DeepSeek V3 (Chat)',
      '🧠 DeepSeek R1 (استدلال و تفکر)': '🧠 DeepSeek R1 (Reasoning & Thinking)',
      '🎭 Claude 3.5 Sonnet': '🎭 Claude 3.5 Sonnet',
      '✏️ تایپ مدل اختصاصی دیگر...': '✏️ Type Other Custom Model...',
      'نام دقیق مدل (مثال: deepseek-chat یا gemini-2.5-flash یا gpt-4o)': 'Exact model identifier (e.g. deepseek-chat, gemini-2.5-flash, or gpt-4o)',
      'نام شناسه مدل اختصاصی یا آزمایشی ارائه‌دهنده را با حروف کوچک انگلیسی وارد فرمایید.': 'Enter the exact model identifier from your provider in lowercase English.',
      '💡 نام شناسه مدل اختصاصی یا آزمایشی ارائه‌دهنده را با حروف کوچک انگلیسی وارد فرمایید.': '💡 Enter the exact model identifier from your provider in lowercase English.',

      // 🔑 AI API Key & Prompts
      'کلید API هوش مصنوعی (API Key)': 'AI API Key (API Key)',
      'کلید API خود را از پنل Gemini یا OpenAI دریافت و اینجا وارد کنید': 'Obtain your API key from Gemini or OpenAI and enter it here',
      'نمایش / مخفی‌سازی کلید': 'Toggle Key Visibility',
      'حذف کامل کلید API (رفع تداخل)': 'Completely Delete API Key (Reset Conflicts)',
      'شخصیت و دستورالعمل AI (System Prompt)': 'AI Persona & Instructions (System Prompt)',
      'به AI بگویید چطور رفتار کنه (مثلاً: مؤدبانه و رسمی پاسخ بده، از اطلاعات خصوصی صحبت نکنه)': 'Tell AI how to behave (e.g. reply politely, be friendly, do not disclose private info)',
      'حداکثر ۵۰۰ کاراکتر. این متن شخصیت AI را تعیین می‌کند.': 'Up to 500 characters. Defines the persona and tone of the AI.',
      '💡 حداکثر ۵۰۰ کاراکتر. این متن شخصیت AI را تعیین می‌کند.': '💡 Up to 500 characters. Defines the persona and tone of the AI.',
      'اطلاعات پایه برای AI (زمینه و کانتکست)': 'Base Context for AI (Context & Background)',
      'اطلاعاتی که AI اجازه داره بگه (مثلاً: ساعت کاری من ۹ تا ۵ هست، برنامه‌نویس هستم)': 'Info that AI is allowed to share (e.g. my working hours are 9-5, I am a developer)',
      'AI از این اطلاعات برای پاسخ دقیق‌تر استفاده می‌کند.': 'AI utilizes this context to craft accurate and customized answers.',
      '💡 AI از این اطلاعات برای پاسخ دقیق‌تر استفاده می‌کند.': '💡 AI utilizes this context to craft accurate and customized answers.',

      // 🔢 AI Limits & Cooldowns
      'حداکثر تعداد پاسخ به هر شخص': 'Max Replies per Person',
      'فقط ۱ پاسخ': 'Only 1 reply',
      'حداکثر ۲ پاسخ': 'Max 2 replies',
      'حداکثر ۳ پاسخ (پیشنهادی)': 'Max 3 replies (Recommended)',
      'حداکثر ۵ پاسخ': 'Max 5 replies',
      'حداکثر ۱۰ پاسخ': 'Max 10 replies',
      'نامحدود (۲۰ پاسخ)': 'Unlimited (20 replies)',
      'فاصله زمانی بین پاسخ‌ها (کول‌داون)': 'Cooldown Between Replies',
      '⚡ بدون محدودیت زمانی (فوری و بدون کول‌داون)': '⚡ Instant (No Cooldown)',
      'بدون محدودیت زمانی (فوری و بدون کول‌داون)': 'Instant (No Cooldown)',
      'هر ۱ دقیقه': 'Every 1 minute',
      'هر ۳ دقیقه': 'Every 3 minutes',
      'هر ۵ دقیقه (پیشنهادی)': 'Every 5 minutes (Recommended)',
      'هر ۱۰ دقیقه': 'Every 10 minutes',
      'هر ۳۰ دقیقه': 'Every 30 minutes',

      // 🚫 AI Ignore List
      '🚫 کاربران مستثنی از پاسخ هوش مصنوعی (لیست نادیده‌گیری)': '🚫 Users Excluded from AI Replies (Ignore List / Blacklist)',
      'کاربران مستثنی از پاسخ هوش مصنوعی (لیست نادیده‌گیری)': 'Users Excluded from AI Replies (Ignore List / Blacklist)',
      'کاربران مستثنی از پاسخ هوش مصنوعی': 'Users Excluded from AI Replies',
      'عدم ارسال پاسخ AI به این افراد': 'Do not send AI auto-replies to these users',
      'تمام مخاطبان مجاز': 'All Contacts Allowed',
      'تمام مخاطبان مجاز هستند': 'All Contacts Allowed',
      'در حال حاضر هیچ کاربری در لیست نادیده‌گیری نیست و هوش مصنوعی در پیوی به همه پاسخ می‌دهد.': 'Currently no users are in the ignore list and AI responds to all private messages.',
      'در حال حاضر هیچ کاربری در لیست نادیده‌گیری نیست و هوش مصنوعی در پیام‌های خصوصی به همه مخاطبان پاسخ می‌دهد.': 'Currently no users are in the ignore list, and AI responds to all private messages.',
      'کلید Enter یا ویرگول (,) برای ثبت سریع چندگانه پشتیبانی می‌شود': 'Press Enter or comma (,) to add multiple users quickly',
      'هیچ کاربری در لیست نادیده‌گیری نیست': 'No users in ignore list',
      'افزودن به لیست': 'Add to List',
      'کپی همه': 'Copy All',
      'پاکسازی همه': 'Clear All',
      'کپی همه آیدی‌ها در کلیپ‌بورد': 'Copy all IDs to clipboard',
      'حذف تمام افراد از لیست': 'Remove all users from ignore list',
      'آیدی عددی (مثال: 123456789) یا یوزرنیم (@username)...': 'Numeric ID (e.g. 123456789) or username (@username)...',
      'حذف کلید API': 'Delete API Key',
      'حذف کامل کلید API و رفع تداخل': 'Delete API Key & reset conflicts',
      'دریافت رایگان کلید API:': 'Get Free API Key:',
      'هوش مصنوعی به پیام‌های خصوصی افرادی که در این لیست قرار دارند هیچ پاسخی نخواهد داد. می‌توانید آیدی عددی تلگرام یا یوزرنیم (با یا بدون @) را وارد کنید:': 'AI will never respond to private messages from users in this list. You can enter numeric Telegram IDs or usernames (with or without @):',
      '💡 هوش مصنوعی به پیام‌های خصوصی افرادی که در این لیست قرار دارند هیچ پاسخی نخواهد داد. می‌توانید آیدی عددی تلگرام یا یوزرنیم (با یا بدون @) را وارد کنید:': '💡 AI will never respond to private messages from users in this list. You can enter numeric Telegram IDs or usernames (with or without @):',
      'شناسه عددی یا یوزرنیم افراد را با ویرگول جدا کنید (مثال: 123456789, @username, @friend)': 'Enter numerical IDs or usernames separated by commas (e.g. 123456789, @username, @friend)',
      'هوش مصنوعی به پیام‌های خصوصی این کاربران هیچ پاسخی نخواهد داد. می‌توانید شناسه عددی (Numeric ID) یا نام کاربری تلگرام (با یا بدون @) را وارد کرده و با ویرگول (,) جدا فرمایید.': 'AI will never send automatic replies to private messages from these users. You can enter Telegram numeric user IDs or usernames (with or without @) separated by commas (,).',
      'هوش مصنوعی به پیام‌های خصوصی این کاربران': 'AI to private messages from these users',
      'هیچ پاسخی نخواهد داد': 'will NEVER reply',
      '. می‌توانید شناسه عددی (Numeric ID) یا نام کاربری تلگرام (با یا بدون @) را وارد کرده و با ویرگول (,) جدا فرمایید.': '. You can enter Telegram numeric user IDs or usernames (with or without @) separated by commas (,).',

      // 👻 Ghost Mode (Tab 6)
      'حالت شبح — خواندن بدون تیک آبی (Ghost Read)': 'Ghost Mode — Read Without Blue Ticks (Ghost Read)',
      'وقتی این قابلیت فعال باشه، تمام پیام‌های خصوصی جدید به صورت خودکار به': 'When enabled, all new incoming private messages are automatically forwarded to your',
      'ربات اختصاصی': 'dedicated bot',
      'شما فوروارد می‌شن و می‌تونید اونجا بخونیدشون بدون اینکه تیک آبی بخوره. وقتی آماده بودید، با دستور .read در تلگرام می‌تونید تیک آبی رو دستی بزنید.': 'so you can read them without sending blue ticks. When ready, use the .read command in Telegram to mark them as read manually.',
      'شما فوروارد می‌شن و می‌تونید اونجا بخونیدشون بدون اینکه تیک آبی بخوره. وقتی آماده بودید، با دستور': 'so you can read them without sending blue ticks. When ready, use command',
      'در تلگرام می‌تونید تیک آبی رو دستی بزنید.': 'in Telegram to manually send read receipts.',
      'فعال‌سازی حالت شبح (Ghost Mode)': 'Enable Ghost Mode (Ghost Mode)',
      'پیام‌های خصوصی رو بخونید بدون تیک آبی — فوروارد خودکار به ربات': 'Read private messages without blue ticks — auto-forwarded to your bot',
      'دستورات سریع تلگرامی:': 'Telegram Quick Commands:',
      'تیک آبی رو برای چتی که توش هستید بزنید': 'Mark current chat as read',
      'تیک آبی رو برای همه چت‌ها یکجا بزنید': 'Mark all chats as read at once',
      'فعال‌سازی سریع حالت شبح': 'Quickly enable Ghost Mode',
      'غیرفعال کردن حالت شبح': 'Quickly disable Ghost Mode',
      'لیست استثنا — افرادی که همیشه تیک آبی بخوره (اختیاری)': 'Exclusion List — Always Mark Blue Ticks for These Users (Optional)',
      'آیدی عددی یا یوزرنیم افرادی که می‌خواید تیک آبی برایشون فعال بمونه (با کاما جدا کنید)': 'Enter numerical IDs or usernames to always mark as read (separated by commas)',
      'برای این افراد، تیک آبی به صورت عادی کار می‌کنه و حالت شبح روی اونا اعمال نمی‌شه.': 'For these users, read receipts work normally and Ghost Mode will not be applied.',
      '💡 برای این افراد، تیک آبی به صورت عادی کار می‌کنه و حالت شبح روی اونا اعمال نمی‌شه.': '💡 For these users, read receipts work normally and Ghost Mode will not be applied.',
      'نکته مهم:': 'Important Note:',
      'حالت شبح فقط زمانی کار می‌کنه که پیام‌ها رو از طریق': 'Ghost Mode only functions when you read messages through your',
      'ربات': 'bot',
      'بخونید. اگر چت رو مستقیم توی اپلیکیشن تلگرام باز کنید، تیک آبی از طرف اپلیکیشن ارسال می‌شه.': '. If you open the chat directly in the Telegram official app, blue ticks will be sent by Telegram.',
      'حالت شبح': 'Ghost Mode',

      // 🔇 Mute Filter (Tab 4)
      'سکوت و حذف آنی پیام‌های افراد مزاحم (Mute Filter)': 'Mute & Instant Delete Filter for Annoying Users (Mute Filter)',
      'پیام‌های ارسال‌شده توسط کاربران مشخص‌شده بلافاصله برای دو طرف پاک می‌شوند': 'Messages sent by specified users will be immediately deleted for both sides',
      'لیست آیدی‌های عددی یا یوزرنیم‌های تلگرام جهت سکوت (با کاما جدا کنید)': 'List of numeric IDs or Telegram usernames to mute (comma-separated)',
      'آیدی‌های عددی یا یوزرنیم‌های تلگرام با کاما (مثال: 123456789, @username, 987654321)': 'Numeric IDs or usernames with commas (e.g. 123456789, @username, 987654321)',
      'شما همچنین در محیط تلگرام می‌توانید با ریپلای روی پیام هر شخص و ارسال .mute او را اضافه کرده و با .unmute از سکوت خارج کنید.': "In Telegram, you can also reply to anyone's message and send .mute to mute them, or .unmute to lift the mute.",
      'شما همچنین در محیط تلگرام می‌توانید با ریپلای روی پیام هر شخص و ارسال': "In Telegram, you can also reply to someone's message and send",
      'او را اضافه کرده و با': 'to mute them, and use',
      'از سکوت خارج کنید.': 'to unmute them.',
      'فیلتر سکوت': 'Silence Filter',

      // 🌙 Sleep Mode (Tab 5)
      'حالت خواب و استراحت شبانه (Sleep Mode)': 'Nighttime Rest & Sleep Mode (Sleep Mode)',
      'در ساعات مشخص‌شده، به‌روزرسانی متوقف شده یا متن خواب قرار می‌گیرد': 'During designated hours, updates pause or display your custom sleep text',
      'شروع خواب (ساعت)': 'Sleep Start (Hour)',
      'پایان خواب (ساعت)': 'Sleep End (Hour)',
      'متن نام خانوادگی در طول ساعات خواب': 'Last Name Text During Sleep Hours',
      'متن نام خانوادگی در خواب (مثال: 😴 Sleep یا 🌙 خوابیدم)': 'Sleep last name text (e.g. 😴 Sleep or 🌙 Sleeping)',
      '۲۲:۰۰ (۱۰ شب)': '22:00 (10 PM)',
      '۲۳:۰۰ (۱۱ شب)': '23:00 (11 PM)',
      '۰۰:۰۰ (نیمه‌شب)': '00:00 (Midnight)',
      '۰۱:۰۰ (بامداد)': '01:00 (1 AM)',
      '۰۲:۰۰ (بامداد)': '02:00 (2 AM)',
      '۰۶:۰۰ (صبح)': '06:00 (6 AM)',
      '۰۷:۰۰ (صبح)': '07:00 (7 AM)',
      '۰۸:۰۰ (صبح)': '08:00 (8 AM)',
      '۰۹:۰۰ (صبح)': '09:00 (9 AM)',
      '۱۰:۰۰ (صبح)': '10:00 (10 AM)',
      'حالت خواب': 'Sleep Schedule',

      // 🤖 Dedicated Bot & Mini App (Tab 8)
      'اتصال ربات دستیار اختصاصی تلگرام (BotFather API)': 'Connect Dedicated Telegram Assistant Bot (BotFather API)',
      'قانون انحصار و امنیت:': 'Exclusivity & Security Rule:',
      'هر کاربر باید در': 'Each user must create a unique bot in',
      'ربات اختصاصی و مجزای خود را بسازد و توکن آن را وارد کند. به منظور حفظ کامل حریم خصوصی و امنیت حساب، این ربات منحصراً به مالک حساب پاسخ می‌دهد و دسترسی هر فرد دیگری به پیام‌ها یا دستورات ربات به طور کامل مسدود و غیرمجاز است.': 'and provide its API token. To safeguard account privacy, this bot responds exclusively to the account owner; all unauthorized access is strictly blocked.',
      'توکن ربات تلگرام (API Token از BotFather@)': 'Telegram Bot Token (API Token from @BotFather)',
      'دریافت توکن از @BotFather': 'Get Token from @BotFather',
      '➕ دریافت توکن از @BotFather': '➕ Get Token from @BotFather',
      'توکن ربات دریافتی از BotFather@ (مثال: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ)': 'Bot token from @BotFather (e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ)',
      'اتصال و فعال‌سازی وب‌هوک': 'Connect & Activate Webhook',
      '⚡ اتصال و فعال‌سازی وب‌هوک': '⚡ Connect & Activate Webhook',
      'ربات تلگرام': 'Telegram Bot',
      'باز کردن ربات در تلگرام': 'Open Bot in Telegram',
      '🚀 باز کردن ربات در تلگرام': '🚀 Open Bot in Telegram',
      'قطع اتصال ربات': 'Disconnect Bot',
      '🔌 قطع اتصال ربات': '🔌 Disconnect Bot',
      'وضعیت وب‌هوک:': 'Webhook Status:',
      'متصل و فعال': 'Connected & Active',
      'ورود به پنل (Mini App):': 'Access Panel (Mini App):',
      'دکمه منو فعال شد': 'Menu button enabled',
      'امنیت انحصاری (مخصوص شما):': 'Exclusive Security (Your Account Only):',
      'ربات منحصراً به شناسه تلگرام شما پاسخ می‌دهد و برای بقیه مسدود است.': 'Bot strictly responds to your Telegram ID and blocks everyone else.',
      'آماده قفل با اولین /start': 'Ready to lock on first /start',
      '🔒 آماده قفل با اولین /start': '🔒 Ready to lock on first /start',
      'تنظیم یا تغییر دستی شناسه تلگرام مجاز': 'Manually configure or change allowed Telegram ID',
      'تنظیم شناسه': 'Set ID',
      '✏️ تنظیم شناسه': '✏️ Set ID',
      'پس از اتصال، یک‌بار وارد ربات تلگرام خود شده و دستور': 'After connecting, open your Telegram bot once and send the',
      'را بفرستید تا ربات منحصراً به اکانت شما قفل شده و پنل گرافیکی داخل تلگرام فعال شود.': 'command to lock the bot to your account and activate the inline graphical panel.',
      'بایگانی خودکار پیام‌های حذف‌شده (Anti-Delete)': 'Automatic Archive of Deleted Messages (Anti-Delete)',
      '🗑️ بایگانی خودکار پیام‌های حذف‌شده (Anti-Delete)': '🗑️ Automatic Archive of Deleted Messages (Anti-Delete)',
      'اگر شخصی در پیوی پیامی را پاک کند، متن یا رسانه ذخیره شده فوراً به ربات اختصاصی شما ارسال می‌شود': 'If a contact deletes a private message, the saved text or media is immediately forwarded to your dedicated assistant bot',
      'ثبت تاریخچه ویرایش پیام‌ها (Anti-Edit)': 'Message Edit History & Tracker (Anti-Edit)',
      '✏️ ثبت تاریخچه ویرایش پیام‌ها (Anti-Edit)': '✏️ Message Edit History & Tracker (Anti-Edit)',
      'اگر شخصی پیامی را تغییر دهد، متن قبل از ویرایش و متن جدید در ربات تلگرام به شما نمایش داده می‌شود': 'If someone edits a message, both original and modified versions appear in your Telegram bot with precise timestamp',
      'ذخیره‌سازی هوشمند رسانه‌های زمان‌دار (Anti-TTL)': 'Secure Storage for View-Once Media (Anti-TTL)',
      '📸 ذخیره‌سازی هوشمند رسانه‌های زمان‌دار (Anti-TTL)': '📸 Secure Storage for View-Once Media (Anti-TTL)',
      'تصاویر، فیلم‌ها و ویس‌های محوشونده (View-Once) مستقیماً به پیوی ربات اختصاصی شما ارسال می‌شوند': 'Expiring photos, videos, and voice notes (View-Once) are archived directly to your bot before disappearing',
      'ربات و لاگر': 'Bot & Logger',

      // 🔐 Security & 2FA (Tab 9)
      'امنیت حساب کاربری و تنظیمات ورود دو مرحله‌ای': 'Account Security & Two-Factor Authentication (2FA)',
      'حساب کاربری شما مجهز به سیستم‌های حفاظتی چندلایه شامل رمزنگاری اطلاعات، پایش نشست‌های فعال و احراز هویت دومرحله‌ای (TOTP) جهت جلوگیری از دسترسی‌های غیرمجاز می‌باشد.': 'Your account is fortified with multi-layered defenses including credential encryption, session auditing, and Two-Factor Authentication (TOTP) to prevent unauthorized access.',
      'احراز هویت دو مرحله‌ای (Google Authenticator / 2FA)': 'Two-Factor Authentication (Google Authenticator / 2FA)',
      'محافظت از حساب در برابر نفوذ با کدهای ۶ رقمی زمان‌محور': 'Protect account from intrusion using time-based 6-digit verification codes',
      'امنیت و ۲FA': 'Security & 2FA',
      'پایش امنیتی و مهار دسترسی‌های مشکوک': 'Security Auditing & Threat Mitigation',
      'فایروال و مسدودسازی خودکار': 'Firewall & Auto-Mitigation',
      'شناسایی خودکار درخواست‌های نامعتبر، مسدودسازی سریع آی‌پی‌های مشکوک و ارسال اعلان‌های امنیتی به حساب کاربری.': 'Automatic detection of invalid requests, instant suspension of suspicious IPs, and security incident alerts.',

      // 💎 وضعیت اشتراک و تمدید لایسنس در بالای سایت (Top Subscription & Validity)
      'حساب کاربری:': 'Account:',
      'تمدید یا ارتقای اشتراک': 'Renew or Upgrade Plan',
      'تمدید و ارتقای اشتراک': 'Renew & Upgrade Plan',
      'تمدید و ارتقای اشتراک حساب کاربری': 'Renew & Upgrade Account Subscription',
      'فعال‌سازی کد اشتراک جدید': 'Activate New License Code',
      'کد لایسنس دریافتی از پشتیبانی را در کادر زیر وارد فرمایید. پس از ثبت، مدت زمان اعتبار و امکانات مربوطه بلافاصله به حساب شما اعمال خواهد شد.': 'Enter your license activation key received from support. Upon submission, the validity duration and tier privileges will be applied immediately to your account.',
      'کد لایسنس اشتراک (کد فعال‌سازی)': 'Subscription License Code (Activation Key)',
      'ثبت و افزایش اعتبار': 'Redeem & Extend Validity',
      'مشاهده وضعیت اشتراک و تمدید لایسنس': 'View Subscription Status & Renew License',
      'درحال بررسی اعتبار...': 'Verifying validity...',
      'تاریخ پایان:': 'Expiration Date:',
      'روز اعتبار باقی‌مانده': 'days remaining',
      'روز تا پایان اعتبار اشتراک': 'days remaining until expiration',
      'اشتراک دائمی و نامحدود ♾️': 'Unlimited Lifetime Access ♾️',
      'اعتبار اشتراک به اتمام رسیده است': 'Subscription validity has ended',
      'اعتبار اشتراک به پایان رسیده است': 'Subscription validity has ended',
      'کاربر رسمی': 'Official Member',
      'مدیر سیستم': 'System Administrator',
      'طرح استاندارد': 'Standard Plan',
      'فعال و معتبر 🟢': 'Active & Valid 🟢',
      'منقضی شده 🔴': 'Expired 🔴',
      'انصراف': 'Cancel',
      'تمدید اعتبار اشتراک با کد لایسنس': 'Extend Validity with License Code',
      'کد لایسنس جدید (مثال: ARIZO-XXXX-XXXX-XXXX)': 'New License Code (e.g. ARIZO-XXXX-XXXX-XXXX)',
      'تمدید و افزایش اعتبار': 'Extend & Renew Validity',
      'تغییر گذرواژه ورود': 'Change Account Password',
      'گذرواژه فعلی': 'Current Password',
      'گذرواژه فعلی حساب کاربری شما': 'Your current account password',
      'گذرواژه جدید (حداقل ۸ کاراکتر)': 'New Password (Min 8 Characters)',
      'گذرواژه جدید و امن (حداقل ۸ کاراکتر)': 'New strong password (Min 8 characters)',
      'ذخیره گذرواژه جدید': 'Save New Password',
      'قطع ارتباط با حساب تلگرام': 'Disconnect Telegram Account',
      'حذف کامل حساب کاربری و اطلاعات': 'Permanently Delete Account & Data',
      'تنظیمات و امنیت حساب کاربری': 'Account Settings & Security',

      // 🕒 AFK & General Studio Controls
      'منشی خودکار پیوی (AFK Auto-Secretary)': 'Private Chat Auto-Secretary (AFK Auto-Secretary)',
      'هنگامی که آنلاین نیستید، پیام‌های خصوصی به طور هوشمند و خودکار پاسخ داده می‌شوند': 'When offline, private incoming messages are answered intelligently and automatically',
      'سنسورهای هوشمند پایش آنلاین/آفلاین:': 'Smart Online/Offline Monitoring Sensors:',
      'منشی خودکار تنها زمانی که': 'Auto-secretary responds only when you are',
      'کاملاً آفلاین': 'completely offline',
      'باشید پاسخ می‌دهد. با پایش مستقیم نشست‌های فعال گوشی و دسکتاپ، پنجره ۱۰ دقیقه‌ای عدم تداخل در چت‌های زنده و تشخیص خوانده شدن پیام، منشی مزاحم مکالمات شما نمی‌شود.': '. By directly monitoring active mobile and desktop sessions, a 10-minute live chat non-interference window, and read receipt checks, the secretary never interferes with your conversations.',
      'متن پاسخ خودکار منشی به مخاطبان در پیوی': 'Auto-secretary reply message to private chat contacts',
      'متن پاسخ خودکار منشی (مثال: درود! در حال حاضر امکان پاسخگویی ندارم. به محض آنلاین شدن پاسخ خواهم داد ⏳)': 'Auto-secretary text (e.g. Hello! I am currently away. I will reply as soon as I am back online ⏳)',
      'فاصله زمانی ارسال مجدد برای یک مخاطب (کول‌داون ضد اسپم)': 'Cooldown Interval for Resending to Same Contact (Anti-Spam Cooldown)',
      'هر ۵ دقیقه یک‌بار به هر فرد': 'Once every 5 minutes per person',
      'هر ۱۰ دقیقه یک‌بار به هر فرد (پیشنهادی)': 'Once every 10 minutes per person (Recommended)',
      'هر ۳۰ دقیقه یک‌بار به هر فرد': 'Once every 30 minutes per person',
      'هر ۱ ساعت یک‌بار به هر فرد': 'Once every 1 hour per person',
      'فقط یک‌بار در طول شبانه‌روز به هر فرد': 'Only once every 24 hours per person',
      'این قابلیت مانع از اسپم شدن چت هنگامی که مخاطب چندین پیام متوالی می‌فرستد می‌شود.': 'This prevents chat spam when a contact sends multiple consecutive messages.',
      'منشی خودکار': 'Auto-Secretary',

      // 🧪 تست سلامت و بررسی صحت کلید API هوش مصنوعی (AI API Health Check)
      'تست سلامت API': 'Test API Health',
      'تست سلامت و درستی API': 'Test API Health & Operation',
      'در حال بررسی سلامت API...': 'Verifying API Key...',
      'اتصال هوش مصنوعی ۱۰۰٪ سالم و آماده به کار است!': 'AI API is 100% Healthy & Operational!',
      'مدل تأیید شده:': 'Model Verified:',
      'سرویس‌دهنده:': 'Provider:',
      'نمونه پاسخ دریافتی:': 'Sample Test Response:',
      'خطا در بررسی سلامت API': 'API Verification Failed',
      'در حال ارسال پرامپت تستی به سرور هوش مصنوعی و سنجش پاسخگویی...': 'Sending test prompt to AI server & measuring latency...',
      'کلید API با موفقیت تأیید شد! ۱۰۰٪ سالم و فعال است': 'API Key verified successfully! 100% operational',
      'خطای شبکه در حین آزمایش API': 'Network error during API test',
      'خطای شبکه یا عدم پاسخگویی سرور': 'Network error or server timeout',
      'لطفاً ابتدا کلید API خود را وارد فرمایید': 'Please enter an API Key first',

      // =========================================================================
      // 🌐 نگارش رسمی و واژگان تخصصی سامانه (Official SaaS Terminology)
      // =========================================================================
      "منشی خودکار صرفاً در زمان عدم حضور و آفلاین بودن شما فعال می‌گردد. با بررسی وضعیت نشست‌های فعال (موبایل و دسکتاپ)، بازه اطمینان ۱۰ دقیقه‌ای مکالمات زنده و بررسی پیام‌های خوانده‌شده، از تداخل منشی با گفتگوهای فعال شما جلوگیری می‌شود.": "The auto-secretary operates exclusively when you are away and offline. By monitoring active sessions (mobile and desktop), a 10-minute live chat buffer, and read receipts, interference with your active conversations is completely avoided.",
      "هوش مصنوعی تنها در زمان عدم حضور و آفلاین بودن شما به پیام‌ها پاسخ می‌دهد. بررسی وضعیت نشست‌های فعال (موبایل و دسکتاپ)، وقفه مکالمات در ۱۰ دقیقه اخیر و بازه اطمینان ۱۲ ثانیه‌ای، مانع از هرگونه تداخل با گفتگوهای زنده شما می‌گردد.": "AI responds to messages exclusively when you are offline. Active session monitoring (mobile and desktop), a 10-minute recent chat silence check, and a 12-second grace period prevent any interference with live conversations.",
      "هر کاربر می‌تواند ربات اختصاصی خود را در BotFather@ ایجاد کرده و توکن آن را ثبت نماید. به جهت حفظ کامل حریم خصوصی، این ربات منحصراً به شناسه کاربری شما پاسخ داده و دسترسی سایر افراد به آن غیرمجاز و مسدود خواهد بود.": "Each user can create their dedicated bot via @BotFather and register its token. To maintain absolute privacy, this bot responds exclusively to your user ID, and access for all others is strictly blocked.",
      "به جای ارسال پاسخ متنی ثابت، هوش مصنوعی متناسب با محتوای پیام مخاطب پاسخی سنجیده ارسال می‌نماید. هر کاربر کلید اختصاصی API خود را وارد نموده و تعاملات به صورت کاملاً مستقل انجام می‌پذیرد.": "Instead of sending a static text reply, AI crafts intelligent responses tailored to each message. Each user provides their dedicated API key, ensuring all interactions remain entirely independent.",
      "با فعال‌سازی این قابلیت، پیام‌های دریافتی بدون ثبت وضعیت خوانده‌شده (تیک دوم) جهت مطالعه به ربات پشتیبان شما منتقل می‌شوند. در صورت تمایل می‌توانید با ارسال دستور": "With this feature enabled, incoming messages are forwarded to your backup bot for reading without marking them as read (no second checkmark). When desired, you can send command",
      "مدت زمان اشتراک شما خاتمه یافته و به‌روزرسانی پروفایل موقتاً متوقف گردیده است. جهت تمدید اعتبار و فعال‌سازی مجدد، کد لایسنس جدید خود را در کادر زیر وارد نمایید:": "Your subscription period has ended, and profile updates are temporarily paused. To renew your license and reactivate the service, enter your new license key in the box below:",
      "درخواست‌های مشکوک و تلاش‌های غیرمجاز برای دسترسی به مسیرهای نامعتبر، بلافاصله در لبه شبکه ابری مسدود شده و گزارش آن در لاگ‌های امنیتی سامانه ثبت می‌گردد.": "Suspicious requests and unauthorized attempts to access restricted paths are immediately blocked at the cloud edge and recorded in security audit logs.",
      "تصاویر، ویدیوها و پیام‌های صوتی دارای محدودیت زمانی (View-Once) مستقیماً به ربات پشتیبان شما ارسال و ذخیره می‌شوند": "Expiring view-once photos, videos, and voice messages are immediately captured and archived directly to your backup bot",
      "مطالعه فرمایید. در صورت گشودن گفتگو در اپلیکیشن اصلی تلگرام، وضعیت خوانده‌شده توسط خود نرم‌افزار اعمال خواهد شد.": "to read. If you open the conversation within the official Telegram application, read receipts will be applied normally by the client.",
      "حساب کاربری شما با استانداردهای امنیتی، رمزنگاری پیشرفته داده‌ها و امکان ورود دوعاملی (TOTP) محافظت می‌شود.": "Your account is secured with advanced cryptographic data standards and time-based two-factor authentication (TOTP).",
      "متن پاسخ خودکار (مثال: درود، در حال حاضر امکان پاسخگویی ندارم. به محض آنلاین شدن با شما گفتگو خواهم کرد ⏳)": "Auto-reply message text (e.g. Hello, I am currently away. I will get back to you as soon as I am online ⏳)",
      "در صورت حذف پیام یا رسانه توسط مخاطب، نسخه ذخیره‌شده بلافاصله جهت آگاهی به ربات پشتیبان شما ارسال می‌شود": "If a contact deletes a message or media, the archived copy is immediately forwarded to your backup bot for your reference",
      "💡 برای کاربران حاضر در این فهرست، وضعیت خوانده‌شدن به صورت عادی ثبت شده و حالت محرمانه اعمال نمی‌گردد.": "💡 For users on this list, read receipts are marked normally and Ghost Mode is not applied.",
      "💡 این تنظیم از ارسال مکرر پیام منشی در صورت دریافت پیام‌های پیاپی از یک مخاطب پیشگیری می‌نماید.": "💡 This setting prevents repeated auto-replies when consecutive messages are received from the same contact.",
      "تعیین شیوه پاسخ‌دهی و لحن هوش مصنوعی (مثال: محترمانه و رسمی پاسخ بده و اطلاعات تماس را ثبت نما)": "Define AI persona and reply tone (e.g. Reply politely and formally, and capture contact details)",
      "در صورت ویرایش پیام توسط مخاطب، متن اولیه به همراه متن جدید در ربات پشتیبان ثبت می‌گردد": "If a message is edited by a contact, both the original and updated texts are logged in your backup bot",
      "رشته StringSession تلگرام خود را اینجا وارد کنید (Pyrogram یا Telethon/GramJS)...": "Enter your Telegram StringSession string here (Pyrogram or Telethon/GramJS)...",
      "💡 شناسه مدل اختصاصی یا سفارشی ارائه‌دهنده را با حروف کوچک انگلیسی وارد فرمایید.": "💡 Enter the provider's custom model identifier in lowercase English letters.",
      "در ساعات تعیین‌شده، به‌روزرسانی متوقف شده یا متن حالت استراحت نمایش داده می‌شود": "During configured hours, profile updates pause or the custom sleep status text is displayed",
      "شناسه‌های عددی یا نام‌های کاربری تلگرام (مثال: 123456789, @username, 987654321)": "Telegram numeric IDs or usernames (e.g. 123456789, @username, 987654321)",
      "💡 هوش مصنوعی از این اطلاعات برای پاسخ‌دهی هماهنگ و متناسب استفاده می‌نماید.": "💡 AI utilizes this context to craft consistent and accurately informed replies.",
      "مشاهده پیام‌های دریافتی بدون ثبت وضعیت خوانده‌شده با انتقال به ربات پشتیبان": "Read incoming messages without triggering blue checkmarks by forwarding them to your backup bot",
      "اطلاعات تکمیلی جهت آگاهی هوش مصنوعی (مثال: ساعات پاسخگویی از ۹ الی ۱۷ است)": "Additional reference context for AI (e.g. Business hours are 9:00 AM to 5:00 PM)",
      "پیام‌های دریافتی از کاربران مشخص‌شده بلافاصله برای هر دو طرف حذف می‌گردند": "Messages received from specified users are instantly deleted for both participants",
      "پاسخ‌دهی خودکار به پیام‌های خصوصی در زمان عدم حضور یا آفلاین بودن شما": "Automatic private chat replies when you are away or offline",
      "شناسه‌های عددی یا نام‌های کاربری تلگرام جهت سکوت (با ویرگول جدا کنید)": "Telegram numeric IDs or usernames to silence (separated by commas)",
      "💡 حداکثر ۵۰۰ کاراکتر. این متن لحن و چارچوب پاسخ‌دهی را تعیین می‌کند.": "💡 Maximum 500 characters. This prompt defines the tone and operational framework.",
      "ربات منحصراً به شناسه تلگرام شما پاسخ می‌دهد و برای سایرین مسدود است.": "The bot strictly responds to your Telegram ID and remains locked against all other users.",
      "هنگام فعال بودن، هوش مصنوعی متناسب با پیام دریافتی پاسخ‌دهی می‌نماید": "When active, AI crafts intelligent replies based on incoming message context",
      ". می‌توانید آیدی عددی تلگرام یا یوزرنیم (با یا بدون @) را وارد کنید:": ". You can enter Telegram numeric user IDs or usernames (with or without @):",
      "💡 در محیط تلگرام نیز می‌توانید با پاسخ به پیام کاربر و ارسال دستور": "💡 In Telegram, you can also reply to a user message with the command",
      "در گفتگوی مورد نظر، وضعیت خوانده‌شدن را به صورت دستی ثبت فرمایید.": "in the target chat to mark the messages as read manually.",
      "💡 هوش مصنوعی به پیام‌های خصوصی افرادی که در این لیست قرار دارند": "💡 AI will never send automatic replies to private messages from users in this list",
      "متن نام خانوادگی در خواب (مثال: 😴 Sleep یا 🌙 در حال استراحت)": "Last name sleep status (e.g. 😴 Away or 🌙 Resting)",
      "را ارسال نمایید تا ربات منحصراً به حساب کاربری شما متصل گردد.": "to bind the bot exclusively to your personal Telegram account.",
      "⚡ Arizo Self | سامانه مدیریت نمایه و ابزارهای ارتباطی تلگرام": "⚡ Arizo Self | Telegram Cloud Automation & Profile Studio",
      "لیست استثنا — کاربرانی که وضعیت خوانده‌شده ثبت شود (اختیاری)": "Exclusion List — Contacts with standard read receipts (Optional)",
      "شناسه عددی یا نام کاربری افراد مورد نظر (با ویرگول جدا کنید)": "Numeric IDs or usernames of specified users (separated by commas)",
      "کلید API دریافت شده از پنل سرویس‌دهنده را اینجا وارد نمایید": "Enter your API key obtained from the provider dashboard here",
      "معرفی امکانات و سرویس‌های پیشرفته | Arizo Self v3.6.2 PRO": "Feature Overview & System Architecture | Arizo Self v3.6.2 PRO",
      "مسدودسازی خودکار درخواست‌های غیرمجاز و پویشگران امنیتی": "Automated blocking of unauthorized probes and security scanners",
      "حالت محرمانه زمانی عمل می‌کند که پیام‌ها را از طریق": "Ghost Mode operates when incoming messages are inspected via your",
      "اعتبار اشتراک حساب کاربری شما به پایان رسیده است": "Your account subscription period has expired",
      "بازه زمانی ارسال مجدد به هر مخاطب (مدیریت تکرار)": "Reply cooldown interval per contact (Frequency Control)",
      "منشی خودکار گفتگوهای خصوصی (AFK Auto-Secretary)": "Private Chat Auto-Secretary (AFK Secretary)",
      "مدیریت سکوت و حذف دوطرفه پیام‌ها (Mute Filter)": "Silence Filter & Two-Way Message Purge (Mute Filter)",
      "رمز دو مرحله‌ای تلگرام (در صورت فعال بودن 2FA)": "Telegram Two-Step Verification Password (if 2FA is active)",
      "اتصال ربات دستیار شخصی تلگرام (BotFather API)": "Connect Dedicated Telegram Assistant Bot (BotFather API)",
      "ورود دو مرحله‌ای (Google Authenticator / 2FA)": "Two-Factor Authentication (Google Authenticator / 2FA)",
      "دستورالعمل و لحن هوش مصنوعی (System Prompt)": "AI Instructions & Tone (System Prompt)",
      "فعال‌سازی حالت مشاهده محرمانه (Ghost Mode)": "Enable Ghost Mode (Read Without Blue Ticks)",
      "ارائه‌دهنده سرویس هوش مصنوعی (AI Provider)": "AI Service Provider (AI Provider)",
      "هر ۱۰ دقیقه یک‌بار به هر مخاطب (پیشنهادی)": "Once every 10 minutes per contact (Recommended)",
      "فعال‌سازی پاسخ هوشمند مبتنی بر هوش مصنوعی": "Enable Intelligent AI-Powered Auto-Reply",
      "حالت مشاهده محرمانه پیام‌ها (Ghost Mode)": "Confidential Message Viewing (Ghost Mode)",
      "— ثبت وضعیت خوانده‌شده برای تمام گفتگوها": "— Mark all conversations as read",
      "محافظت از حساب با کدهای ۶ رقمی زمان‌محور": "Protect account access with 6-digit time-based OTPs",
      "— ثبت وضعیت خوانده‌شده برای گفتگوی جاری": "— Mark current conversation as read",
      "گذرواژه تأیید دو مرحله‌ای تلگرام (2FA)": "Telegram Two-Step Verification Password (2FA)",
      "کلید دسترسی سرویس هوش مصنوعی (API Key)": "AI Service Access Key (API Key)",
      "اطلاعات تکمیلی و ساعات کاری (Context)": "Supplementary Business Context & Guidelines (Context)",
      "در انتظار فعال‌سازی بیوگرافی زنده...": "Awaiting dynamic biography activation...",
      "🎟️ تمدید اعتبار اشتراک با کد لایسنس": "🎟️ Renew Subscription with License Key",
      "کد تأیید ارسالی تلگرام (مثال: 58291)": "Telegram verification code (e.g. 58291)",
      "فقط یک‌بار در شبانه‌روز به هر مخاطب": "Only once per 24 hours per contact",
      "🗑️ حذف کامل حساب کاربری و اطلاعات": "🗑️ Permanently Delete Account & Data",
      "آنلاین (همگام با زمان رسمی تهران)": "Online (Synced with Tehran Standard Time)",
      "اتصال با رشته سشن (StringSession)": "Connect via StringSession string",
      "سیستم پایش و محافظت در برابر نفوذ": "Edge Intrusion Detection & Protection System",
      "تقویم خورشیدی و زمان رسمی تهران": "Solar Hijri Calendar & Tehran Standard Time",
      "رشته سشن تلگرام (StringSession)": "Telegram Session String (StringSession)",
      "متن پاسخ خودکار منشی به مخاطبان": "Auto-Secretary reply text to contacts",
      "دستورات کاربردی در محیط تلگرام:": "Practical Telegram Chat Commands:",
      "هر ۳۰ دقیقه یک‌بار به هر مخاطب": "Once every 30 minutes per contact",
      "متن نام خانوادگی در ساعات خواب": "Last name text during sleep hours",
      "⚙️ تنظیمات و امنیت حساب کاربری": "⚙️ Account Security & Preferences",
      "ایجاد حساب و فعال‌سازی اشتراک": "Create Account & Activate Subscription",
      "تمدید اعتبار و فعال‌سازی مجدد": "Renew Subscription & Reactivate",
      "همگام‌سازی رسمی با زمان تهران": "Official Sync with Tehran Standard Time",
      "کد تأیید ارسالی از سوی تلگرام": "Verification Code Sent by Telegram",
      "هر ۵ دقیقه یک‌بار به هر مخاطب": "Once every 5 minutes per contact",
      "— فعال‌سازی سریع حالت محرمانه": "— Quickly activate Ghost Mode",
      "هر ۱ ساعت یک‌بار به هر مخاطب": "Once every 1 hour per contact",
      "🔌 قطع ارتباط با حساب تلگرام": "🔌 Disconnect Telegram Account",
      "پیش‌نمایش زنده نمایه تلگرام": "Live Telegram Profile Preview",
      "اتصال حساب تلگرام به سامانه": "Connect Telegram Account to Platform",
      "— غیرفعال‌سازی حالت محرمانه": "— Deactivate Ghost Mode",
      "حریم خصوصی و امنیت اطلاعات:": "Data Privacy & Platform Security:",
      "اتصال و ذخیره‌سازی امن سشن": "Secure Connection & Session Storage",
      "مدیریت سامانه و لایسنس‌ها": "System Administration & License Manager",
      "سیستم پیشرفته تشخیص حضور:": "Advanced Presence Detection System:",
      "دریافت کد ورود از تلگرام": "Request Login Code from Telegram",
      "سیستم هوشمند تشخیص حضور:": "Smart Presence Detection System:",
      "شماره همراه حساب تلگرام": "Telegram Account Phone Number",
      "دریافت مستقیم کلید API:": "Direct API Key Portals:",
      "او را اضافه نموده و با": "to add them, and use",
      "🕒 ساعت و قالب نوشتاری": "🕒 Clock & Typography Styles",
      "بخش معرفی نمایه (Bio)": "Profile Biography Section (Bio)",
      "از لیست خارج فرمایید.": "to remove them from the list.",
      "🔑 تغییر گذرواژه ورود": "🔑 Change Login Password",
      "ارتباط امن و مستقیم": "Direct & Secure Connection",
      "پایان ساعات استراحت": "Sleep Schedule End Time",
      "ساعت و قالب نوشتاری": "Clock & Typography Styles",
      "ورود با شماره تلفن": "Sign in with Phone Number",
      "شروع ساعات استراحت": "Sleep Schedule Start Time",
      "⏳ بررسی اعتبار...": "⏳ Checking validity...",
      "تاریخ پایان: -": "Expiration: -",
      "وضعیت ارتباط:": "Connection Status:",
      "ربات پشتیبان": "backup assistant bot",
      "توجه مهم:": "Important Notice:",
      "بخش قبلی": "Previous Step",
      "بخش بعدی": "Next Step",
      "فعال 🟢": "Active 🟢",
      "بخش معرفی نمایه (بیوگرافی)": "Profile Biography Section (Bio)",
      "فعال‌سازی Live Bio و هوشمند (Live Bio)": "Enable Dynamic Live Bio (Live Bio)",
      "فعال‌سازی بیوگرافی زنده و هوشمند (Live Bio)": "Enable Dynamic Live Bio (Live Bio)",
      "حالت مشاهده محرمانه پیام‌ها (حالت شبح)": "Confidential Message Viewing (Ghost Mode)",
      "فعال‌سازی حالت مشاهده محرمانه (حالت شبح)": "Enable Confidential Viewing (Ghost Mode)",
      "ارائه‌دهنده سرویس هوش مصنوعی (AI Provider)": "AI Service Provider (AI Provider)",
      "🗑️ بایگانی خودکار پیام‌های حذف‌شده (ضد حذف پیام)": "🗑️ Auto-Archive Deleted Messages (Anti-Delete)",
      "✏️ ثبت تاریخچه ویرایش پیام‌ها (Anti-Edit)": "✏️ Log Message Edit History (Anti-Edit)",
      "💾 خروجی پشتیبان (خروجی گرفتن)": "💾 Export Backup (Export)",
      "📤 بازیابی فایل پشتیبان (بازیابی)": "📤 Restore Backup File (Restore)",
      "🔄 بازیابی اطلاعات (بازیابی)": "🔄 Restore System Data (Restore)",
      "نمایش تقویم زنده هجری شمسی، روز هفته و ساعت در بخش بیوگرافی تلگرام با الگوهای مدرن و متغیرهای داینامیک.": "Live display of Solar Hijri calendar, day of week, and clock in Telegram biography with modern typography and dynamic variables.",
      "منشی خودکار پیوی (منشی)": "Private Chat Auto-Secretary (Secretary)",
      "پایشگر ضد حذف (ضد حذف پیام)": "Anti-Delete Message Monitor (Anti-Delete)",
      "مانیتور ضد ویرایش (Anti-Edit)": "Message Edit History Monitor (Anti-Edit)",
      "حالت روح و نامرئی (حالت شبح)": "Invisible Stealth Mode (Ghost Mode)",
      "مدیریت سکوت و فیلتر (بی‌صدا کردن)": "Silence Filter Management (Mute Filter)",
    };

    try {
      Object.assign(window.TRANSLATIONS_MAP, ADDITIONAL_TRANSLATIONS);
    } catch(err) {
      console.warn('Could not merge additional translations:', err);
    }

    window.NORMALIZED_TRANSLATIONS_MAP = {};
    window.REVERSE_TRANSLATIONS_MAP = {};

    var allTransKeys = Object.keys(window.TRANSLATIONS_MAP);
    for (var ti = 0; ti < allTransKeys.length; ti++) {
      var tk = allTransKeys[ti];
      var tv = window.TRANSLATIONS_MAP[tk];
      if (typeof tv !== 'string' || !tv) continue;
      var normTk = tk.replace(/\\s+/g, ' ').trim();
      var normTv = tv.replace(/\\s+/g, ' ').trim();
      window.NORMALIZED_TRANSLATIONS_MAP[normTk] = tv;
      if (normTv && normTv !== normTk) {
        if (!window.REVERSE_TRANSLATIONS_MAP[normTv] || normTk.length > window.REVERSE_TRANSLATIONS_MAP[normTv].length) {
          window.REVERSE_TRANSLATIONS_MAP[normTv] = normTk;
        }
      }
    }

    var faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    var arDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    var enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    var persianRegex = /[\\u0600-\\u06FF\\u200C]/;
    var safeLongPhrases = Object.keys(window.TRANSLATIONS_MAP)
      .filter(function(k) { return k.length >= 12 && persianRegex.test(k); })
      .sort(function(a, b) { return b.length - a.length; });

    // Universal Text Translator (Persian -> English)
    window.t = function(text) {
      if (window.currentLang !== 'en') return text;
      if (!text || typeof text !== 'string') return text;
      var trimmed = text.trim();
      if (!trimmed) return text;

      var leadingWs = text.match(/^\\s*/)[0];
      var trailingWs = text.match(/\\s*$/)[0];
      var norm = trimmed.replace(/\\s+/g, ' ');

      // ۱. تطابق مستقیم یا تطابق نرمال‌شده در دیکشنری
      if (window.TRANSLATIONS_MAP[trimmed]) return leadingWs + window.TRANSLATIONS_MAP[trimmed] + trailingWs;
      if (window.NORMALIZED_TRANSLATIONS_MAP[norm]) return leadingWs + window.NORMALIZED_TRANSLATIONS_MAP[norm] + trailingWs;

      // ۲. استخراج هسته فارسی (جلوگیری از تأثیر ایموجی‌ها، پرانتزها، و علائم در تطابق)
      if (persianRegex.test(trimmed)) {
        var first = -1, last = -1;
        for (var pi = 0; pi < trimmed.length; pi++) {
          if (persianRegex.test(trimmed.charAt(pi))) {
            if (first === -1) first = pi;
            last = pi;
          }
        }
        if (first !== -1 && last !== -1) {
          var core = trimmed.substring(first, last + 1);
          var normCore = core.replace(/\\s+/g, ' ').trim();
          var match = window.TRANSLATIONS_MAP[core] || window.NORMALIZED_TRANSLATIONS_MAP[normCore];
          if (match) {
            var lead = trimmed.substring(0, first);
            var trail = trimmed.substring(last + 1);
            return leadingWs + lead + match + trail + trailingWs;
          }
        }
      }

      // ۳. ترجمه چندخطی
      if (trimmed.indexOf('\\n') !== -1 && persianRegex.test(trimmed)) {
        var lines = text.split('\\n');
        return lines.map(function(l) { return window.t(l); }).join('\\n');
      }

      // ۴. جایگزینی ایمن عبارات بلند (حداقل ۱۲ نویسه، جلوگیری قطعی از تخریب کلمات فارسی)
      var out = trimmed;
      if (persianRegex.test(out)) {
        for (var si = 0; si < safeLongPhrases.length; si++) {
          var sk = safeLongPhrases[si];
          if (out.indexOf(sk) !== -1) {
            out = out.split(sk).join(window.TRANSLATIONS_MAP[sk]);
            if (!persianRegex.test(out)) break;
          }
        }
      }

      // ۵. تبدیل ارقام فارسی و عربی به ارقام انگلیسی
      for (var d = 0; d < 10; d++) {
        out = out.split(faDigits[d]).join(enDigits[d]);
        out = out.split(arDigits[d]).join(enDigits[d]);
      }

      return leadingWs + out + trailingWs;
    };

    // Universal Reverse Text Translator (English -> Persian)
    window.tFa = function(text) {
      if (!text || typeof text !== 'string') return text;
      var trimmed = text.trim();
      if (!trimmed) return text;
      if (!/[a-zA-Z]/.test(trimmed)) return text;

      var leadingWs = text.match(/^\\s*/)[0];
      var trailingWs = text.match(/\\s*$/)[0];
      var norm = trimmed.replace(/\\s+/g, ' ');

      if (window.REVERSE_TRANSLATIONS_MAP[trimmed]) return leadingWs + window.REVERSE_TRANSLATIONS_MAP[trimmed] + trailingWs;
      if (window.REVERSE_TRANSLATIONS_MAP[norm]) return leadingWs + window.REVERSE_TRANSLATIONS_MAP[norm] + trailingWs;

      // استخراج هسته انگلیسی
      var engRegex = /[a-zA-Z]/;
      var first = -1, last = -1;
      for (var ei = 0; ei < trimmed.length; ei++) {
        if (engRegex.test(trimmed.charAt(ei))) {
          if (first === -1) first = ei;
          last = ei;
        }
      }
      if (first !== -1 && last !== -1) {
        var core = trimmed.substring(first, last + 1);
        var normCore = core.replace(/\\s+/g, ' ').trim();
        var match = window.REVERSE_TRANSLATIONS_MAP[core] || window.REVERSE_TRANSLATIONS_MAP[normCore];
        if (match) {
          var lead = trimmed.substring(0, first);
          var trail = trimmed.substring(last + 1);
          return leadingWs + lead + match + trail + trailingWs;
        }
      }

      if (trimmed.indexOf('\\n') !== -1) {
        var lines = text.split('\\n');
        return lines.map(function(l) { return window.tFa(l); }).join('\\n');
      }

      return text;
    };

    // قلاب‌گذاری ریشه‌ای دیالوگ‌های مرورگر (Confirm, Prompt, Alert Interception)
    if (!window.__i18nDialogsHooked) {
      window.__i18nDialogsHooked = true;
      var _origConfirm = window.confirm;
      window.confirm = function(msg) {
        return _origConfirm.call(window, window.t(msg));
      };
      var _origPrompt = window.prompt;
      window.prompt = function(msg, def) {
        return _origPrompt.call(window, window.t(msg), def ? window.t(def) : def);
      };
      var _origAlert = window.alert;
      window.alert = function(msg) {
        return _origAlert.call(window, window.t(msg));
      };
    }

    // موتور ترجمه دوطرفه DOM (Bidirectional DOM Translation Engine)
    window.translateDOM = function(root, lang) {
      var isEn = (lang === 'en');
      if (!root) root = document.body;
      if (!root) return;

      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement && (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE' || node.parentElement.tagName === 'NOSCRIPT')) {
          continue;
        }
        var raw = node.nodeValue;
        if (!raw) continue;
        var trimmed = raw.trim();
        if (!trimmed) continue;

        if (node.parentElement && (node.parentElement.id === 'langToggleBtn' || node.parentElement.id === 'langText')) continue;

        if (isEn) {
          if (/[\u0600-\u06FF]/.test(raw)) {
            if (typeof node.__origFa === 'undefined') {
              node.__origFa = raw;
            }
            var enVal = window.t(node.__origFa);
            if (node.nodeValue !== enVal) {
              node.nodeValue = enVal;
            }
          }
        } else {
          // بازگشت به زبان فارسی
          if (typeof node.__origFa !== 'undefined' && /[\u0600-\u06FF]/.test(node.__origFa)) {
            if (node.nodeValue !== node.__origFa) {
              node.nodeValue = node.__origFa;
            }
          } else if (!/[؀-ۿ]/.test(raw) && /[a-zA-Z]/.test(raw)) {
            var faVal = window.tFa(raw);
            if (faVal && faVal !== raw) {
              node.__origFa = faVal;
              node.nodeValue = faVal;
            }
          }
        }
      }

      var attrSelectors = '[placeholder], [title], [aria-label], input[type="button"], input[type="submit"], [data-tooltip], [alt]';
      var elementsWithAttr = root.querySelectorAll ? root.querySelectorAll(attrSelectors) : [];
      elementsWithAttr.forEach(function(el) {
        if (el.id === 'langToggleBtn' || el.id === 'langText') return;
        ['placeholder', 'title', 'aria-label', 'value', 'data-tooltip', 'alt'].forEach(function(attr) {
          if (!el.hasAttribute(attr)) return;
          var val = el.getAttribute(attr);
          if (!val) return;
          var key = '__origFa_' + attr;

          if (isEn) {
            if (/[\u0600-\u06FF]/.test(val)) {
              if (typeof el[key] === 'undefined') {
                el[key] = val;
              }
              var enAttr = window.t(el[key]);
              if (el.getAttribute(attr) !== enAttr) {
                el.setAttribute(attr, enAttr);
              }
            }
          } else {
            if (typeof el[key] !== 'undefined' && /[\u0600-\u06FF]/.test(el[key])) {
              if (el.getAttribute(attr) !== el[key]) {
                el.setAttribute(attr, el[key]);
              }
            } else if (!/[؀-ۿ]/.test(val) && /[a-zA-Z]/.test(val)) {
              var faAttr = window.tFa(val);
              if (faAttr && faAttr !== val) {
                el[key] = faAttr;
                el.setAttribute(attr, faAttr);
              }
            }
          }
        });
      });

      var selectOptions = root.querySelectorAll ? root.querySelectorAll('option, optgroup') : [];
      selectOptions.forEach(function(opt) {
        if (opt.tagName === 'OPTION') {
          if (isEn) {
            if (typeof opt.__origFaText === 'undefined' && /[\u0600-\u06FF]/.test(opt.textContent)) {
              opt.__origFaText = opt.textContent;
            }
            if (opt.__origFaText) {
              var enOpt = window.t(opt.__origFaText);
              if (opt.textContent !== enOpt) opt.textContent = enOpt;
            }
          } else {
            if (opt.__origFaText && opt.textContent !== opt.__origFaText) {
              opt.textContent = opt.__origFaText;
            } else if (!/[؀-ۿ]/.test(opt.textContent) && /[a-zA-Z]/.test(opt.textContent)) {
              var faOpt = window.tFa(opt.textContent);
              if (faOpt && faOpt !== opt.textContent) {
                opt.__origFaText = faOpt;
                opt.textContent = faOpt;
              }
            }
          }
        } else if (opt.tagName === 'OPTGROUP') {
          if (isEn) {
            if (typeof opt.__origFaLabel === 'undefined' && opt.hasAttribute('label')) opt.__origFaLabel = opt.getAttribute('label');
            if (opt.__origFaLabel) {
              var targetGroupLabel = window.t(opt.__origFaLabel);
              if (opt.getAttribute('label') !== targetGroupLabel) opt.setAttribute('label', targetGroupLabel);
            }
          } else {
            if (opt.__origFaLabel && opt.getAttribute('label') !== opt.__origFaLabel) {
              opt.setAttribute('label', opt.__origFaLabel);
            } else if (opt.hasAttribute('label') && !/[؀-ۿ]/.test(opt.getAttribute('label')) && /[a-zA-Z]/.test(opt.getAttribute('label'))) {
              var faGroupLabel = window.tFa(opt.getAttribute('label'));
              if (faGroupLabel && faGroupLabel !== opt.getAttribute('label')) {
                opt.__origFaLabel = faGroupLabel;
                opt.setAttribute('label', faGroupLabel);
              }
            }
          }
        }
      });
    };

    var i18nObserver = null;
    function setupI18nObserver() {
      if (typeof MutationObserver === 'undefined') return;
      if (i18nObserver) i18nObserver.disconnect();

      var pending = false;
      i18nObserver = new MutationObserver(function(mutations) {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function() {
          pending = false;
          window.translateDOM(document.body, window.currentLang || 'fa');
        });
      });

      i18nObserver.observe(document.body, { childList: true, subtree: true });
    }

    window.applyLanguage = function(lang) {
      if (lang !== 'en' && lang !== 'fa') lang = 'fa';
      window.currentLang = lang;
      try { localStorage.setItem('arizo_lang', lang); } catch(_) {}

      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

      document.title = lang === 'en'
        ? '⚡ Arizo Self | Telegram Cloud Automation & Management Platform'
        : '⚡ Arizo Self | سامانه مدیریت ابری و اتوماسیون تلگرام';

      window.translateDOM(document.body, lang);

      var langBtn = document.getElementById('langToggleBtn');
      var langText = document.getElementById('langText');
      if (langText) {
        langText.textContent = lang === 'en' ? 'فارسی (FA)' : 'English (EN)';
      } else if (langBtn) {
        langBtn.textContent = lang === 'en' ? '🌐 فارسی (FA)' : '🌐 English (EN)';
      }
      if (langBtn) {
        langBtn.title = lang === 'en' ? 'تغییر زبان به فارسی / Switch to Persian' : 'Switch Language to English / تغییر زبان به انگلیسی';
      }

      if (typeof updateThemeUI === 'function') {
        updateThemeUI(document.documentElement.getAttribute('data-theme') || 'dark');
      }
      if (typeof window.renderPresetCards === 'function') {
        window.renderPresetCards();
      }
      if (typeof window.switchStudioTab === 'function' && typeof currentStudioTabIndex !== 'undefined' && typeof STUDIO_TABS !== 'undefined' && STUDIO_TABS[currentStudioTabIndex]) {
        window.switchStudioTab(STUDIO_TABS[currentStudioTabIndex].id, false);
      }
      if (typeof updateLiveClock === 'function') {
        updateLiveClock();
      }
      if (typeof window.updateAiModelOptions === 'function') {
        var provSelectEl = document.getElementById('aiProviderSelect');
        var modelSelectEl = document.getElementById('aiModelSelect');
        var curProv = provSelectEl ? provSelectEl.value : 'gemini';
        var curModel = modelSelectEl ? modelSelectEl.value : '';
        if (curModel === 'custom') {
          var customInputEl = document.getElementById('aiCustomModelInput');
          if (customInputEl && customInputEl.value) curModel = customInputEl.value;
        }
        window.updateAiModelOptions(curProv, curModel);
      }
      if (typeof window.syncAiIgnoredHiddenInput === 'function') {
        window.syncAiIgnoredHiddenInput();
      }
      if (typeof window.updateSubscriptionUI === 'function' && window.lastUserData) {
        window.updateSubscriptionUI(window.lastUserData);
      }

      setupI18nObserver();
    };

    window.toggleLanguage = function() {
      var next = window.currentLang === 'en' ? 'fa' : 'en';
      window.applyLanguage(next);
      var toastMsg = next === 'en' ? 'Language switched to English 🇬🇧' : 'زبان به فارسی تغییر یافت 🇮🇷';
      showToast(toastMsg, "success");
    };

// ==========================================
    // 🎨 پریست‌های فونت و استایل ساعت
    // ==========================================
    var presets = {
      bold:           { name: 'بولد لوکس', nameEn: 'Luxury Bold', digits: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'] },
      sansBold:       { name: 'سنس مدرن', nameEn: 'Modern Sans', digits: ['𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'] },
      mono:           { name: 'مونو رترو', nameEn: 'Retro Mono', digits: ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'] },
      double:         { name: 'دابل استروک', nameEn: 'Double Stroke', digits: ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'] },
      bubble:         { name: 'حباب توخالی', nameEn: 'Hollow Bubble', digits: ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'] },
      blackCircled:   { name: 'دایره مشکی نئون', nameEn: 'Neon Circled', digits: ['⓿', '➊', '➋', '➌', '➍', '➎', '➏', '➐', '➑', '➒'] },
      persian:        { name: 'فارسی اصیل', nameEn: 'Classic Persian', digits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] },
      arabic:         { name: 'عربی شرقی', nameEn: 'Eastern Arabic', digits: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] },
      subscript:      { name: 'اندیس فانتزی', nameEn: 'Subscript', digits: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'] },
      superscript:    { name: 'بالانویس مینی', nameEn: 'Mini Superscript', digits: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'] },
      bracket:        { name: 'سلطنتی براکت', nameEn: 'Royal Bracket', digits: ['⟦0⟧', '⟦1⟧', '⟦2⟧', '⟦3⟧', '⟦4⟧', '⟦5⟧', '⟦6⟧', '⟦7⟧', '⟦8⟧', '⟦9⟧'] },
      japaneseBracket:{ name: 'براکت ژاپنی', nameEn: 'Japanese Bracket', digits: ['【0】', '【1】', '【2】', '【3】', '【4】', '【5】', '【6】', '【7】', '【8】', '【9】'] },
      fullwidth:      { name: 'تمام‌پهنا (سایبر)', nameEn: 'Cyber Fullwidth', digits: ['０', '１', '２', '３', '۴', '۵', '۶', '۷', '۸', '۹'] },
      parenthesized:  { name: 'پرانتز دایره‌ای', nameEn: 'Parenthesized', digits: ['⑽', '⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼'] },
      dotted:         { name: 'نقطه‌دار رسمی', nameEn: 'Formal Dotted', digits: ['0.', '⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐'] },
      underlined:     { name: 'خط زیرین فانتزی', nameEn: 'Fancy Underlined', digits: ['0̲', '1̲', '2̲', '3̲', '4̲', '5̲', '6̲', '7̲', '8̲', '9̲'] },
      strike:         { name: 'خط‌خورده مینیمال', nameEn: 'Minimal Strike', digits: ['0̶', '1̶', '2̶', '3̶', '4̶', '5̶', '6̶', '7̶', '8̶', '9̶'] },
      slashed:        { name: 'اسلش مورب', nameEn: 'Oblique Slashed', digits: ['0̷', '1̷', '2̷', '3̷', '4̷', '5̷', '6̷', '7̷', '8̷', '9̷'] },
      neonGlow:       { name: 'نئون درخشان', nameEn: 'Neon Glow', digits: ['𝟢', '𝟣', '𝟤', '𝟥', '𝟦', '𝟧', '𝟨', '𝟩', '𝟪', '𝟫'] },
      sansItalic:     { name: 'سنس ایتالیک', nameEn: 'Sans Italic', digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
      serifBold:      { name: 'سریف سلطنتی', nameEn: 'Royal Serif', digits: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'] },
      spooky:         { name: 'وحشت هالووینی', nameEn: 'Halloween Spooky', digits: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'] },
      heartAdorned:   { name: 'قلب عاشقانه', nameEn: 'Romantic Heart', digits: ['0♡', '1♡', '2♡', '3♡', '4♡', '5♡', '6♡', '7♡', '8♡', '9♡'] },
      sparkle:        { name: 'ستاره و درخشش', nameEn: 'Star & Sparkle', digits: ['0✨', '1✨', '2✨', '3✨', '4✨', '5✨', '6✨', '7✨', '8✨', '9✨'] },
      fire:           { name: 'آتشین متحرک', nameEn: 'Animated Fire', digits: ['0🔥', '1🔥', '2🔥', '3🔥', '4🔥', '5🔥', '6🔥', '7🔥', '8🔥', '9🔥'] },
      crystal:        { name: 'کریستال یخ', nameEn: 'Ice Crystal', digits: ['0❄️', '1❄️', '2❄️', '3❄️', '4❄️', '5❄️', '6❄️', '7❄️', '8❄️', '9❄️'] },
      boxedSquare:    { name: 'باکس مربعی', nameEn: 'Boxed Square', digits: ['[0]', '[1]', '[2]', '[3]', '[4]', '[5]', '[6]', '[7]', '[8]', '[9]'] },
      curvedBrace:    { name: 'آکولاد فانتزی', nameEn: 'Curly Brace', digits: ['{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}'] },
      chevron:        { name: 'پیکانی نئون', nameEn: 'Neon Chevron', digits: ['«0»', '«1»', '«2»', '«3»', '«4»', '«5»', '«6»', '«7»', '«8»', '«9»'] },
      persianSup:     { name: 'فارسی بالانویس', nameEn: 'Persian Superscript', digits: ['۰', '¹', '²', '³', '⁴', '۵', '۶', '۷', '۸', '۹'] },
      digital7:       { name: 'ساعت دیجیتال', nameEn: 'Digital 7-Seg', digits: ['O', 'I', 'Z', 'E', 'h', 'S', 'b', 'L', 'B', 'q'] },
      normal:         { name: 'کلاسیک استاندارد', nameEn: 'Classic Standard', digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] }
    };

    var selectedDigits = presets.bold.digits;
    var currentPresetKey = 'bold';
    var tgStep = 'phone';
    var isBotRunning = true;
    window.isStudioDirty = false;

    function setSafeValue(id, val) {
      var el = document.getElementById(id);
      if (el && document.activeElement !== el) {
        el.value = val;
      }
    }
    function setSafeChecked(id, chk) {
      var el = document.getElementById(id);
      if (el && document.activeElement !== el) {
        el.checked = !!chk;
      }
    }

    document.addEventListener('input', function(e) {
      if (e.target && e.target.closest('#customizationStudioSection')) {
        window.isStudioDirty = true;
      }
    });
    document.addEventListener('change', function(e) {
      if (e.target && e.target.closest('#customizationStudioSection')) {
        window.isStudioDirty = true;
      }
    });

    function showToast(msg, type) {
      if (window.currentLang === 'en' && typeof window.t === 'function') {
        msg = window.t(msg);
      }
      var t = document.getElementById('toast');
      t.textContent = msg;
      t.className = 'show ' + (type || 'info');
      setTimeout(function() { t.className = ''; }, 4500);
    }

    function getAuthToken() {
      return localStorage.getItem('selfbot_token') || localStorage.getItem('arizo_token') || '';
    }
    function setAuthToken(token) {
      if (token) {
        localStorage.setItem('selfbot_token', token);
        localStorage.setItem('arizo_token', token);
      } else {
        localStorage.removeItem('selfbot_token');
        localStorage.removeItem('arizo_token');
      }
    }

    function getAdminToken() { return localStorage.getItem('admin_token') || ''; }
    function setAdminToken(token) {
      if (token) localStorage.setItem('admin_token', token);
      else localStorage.removeItem('admin_token');
    }

    function authHeaders() {
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getAuthToken()
      };
    }

    function adminHeaders() {
      var token = getAuthToken() || getAdminToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
    }

    // ==========================================
    // 👑 پنل مدیریت ادمین Arizo Self و کنترل تب‌ها
    // ==========================================
    window.openAdminPortal = function() {
      if (!window.currentUserIsAdmin) {
        showToast('دسترسی به پنل مدیریت فقط مخصوص کاربران دارای نقش مدیریت است', 'error');
        closeAdminPortal();
        return;
      }
      document.title = (window.currentLang === 'en' ? '👑 Master Admin & Monitoring Portal | Arizo Self' : '👑 پنل مدیریت ارشد و مانیتورینگ | Arizo Self');
      if (window.location.pathname !== '/admin' && window.location.pathname !== '/admin/') {
        try { window.history.pushState({ admin: true }, document.title, '/admin'); } catch (_) {}
      }
      document.getElementById('adminPanelSection').classList.remove('hidden');
      document.getElementById('userAuthSection').classList.add('hidden');
      document.getElementById('clockHeroCard').classList.add('hidden');
      document.getElementById('suspensionAlertBox')?.classList.add('hidden');
      document.getElementById('telegramConnectSection').classList.add('hidden');
      document.getElementById('dashboardSection').classList.add('hidden');

      document.getElementById('adminDashboardBox')?.classList.remove('hidden');
      switchAdminSubtab('stats');
      loadAdminData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.closeAdminPortal = function(preventHistory) {
      window.START_IN_ADMIN = false;
      document.title = (window.currentLang === 'en' ? '⚡ Arizo Self | Telegram Cloud Automation & Management Platform' : '⚡ Arizo Self | سامانه مدیریت ابری و اتوماسیون تلگرام');
      if (!preventHistory && window.location.pathname.startsWith('/admin')) {
        try { window.history.pushState({}, document.title, '/'); } catch (_) {}
      }
      document.getElementById('adminPanelSection')?.classList.add('hidden');
      document.getElementById('clockHeroCard')?.classList.remove('hidden');
      
      // بازیابی نمایش بخش‌های کاربری
      if (window.lastKnownHasTelegram) {
        document.getElementById('dashboardSection')?.classList.remove('hidden');
        document.getElementById('telegramConnectSection')?.classList.add('hidden');
      } else {
        document.getElementById('telegramConnectSection')?.classList.remove('hidden');
        document.getElementById('dashboardSection')?.classList.add('hidden');
      }
      loadUserDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', function(e) {
      if (window.location.pathname.startsWith('/admin')) {
        if (window.currentUserIsAdmin) {
          openAdminPortal();
        } else {
          closeAdminPortal(true);
        }
      } else {
        closeAdminPortal(true);
      }
    });

    // تفکیک تب‌های داخلی پنل ادمین
    window.switchAdminSubtab = function(tab) {
      var btnStats = document.getElementById('adminSubtabStats');
      var btnCodes = document.getElementById('adminSubtabCodes');
      var btnUsers = document.getElementById('adminSubtabUsers');

      var boxStats = document.getElementById('adminTabContentStats');
      var boxCodes = document.getElementById('adminTabContentCodes');
      var boxUsers = document.getElementById('adminTabContentUsers');

      btnStats.classList.toggle('active', tab === 'stats');
      btnCodes.classList.toggle('active', tab === 'codes');
      btnUsers.classList.toggle('active', tab === 'users');

      boxStats.classList.toggle('hidden', tab !== 'stats');
      boxCodes.classList.toggle('hidden', tab !== 'codes');
      boxUsers.classList.toggle('hidden', tab !== 'users');
    };

    window.logoutAdmin = function() {
      closeAdminPortal();
    };

    async function loadAdminData() {
      try {
        var sRes = await fetch('/api/admin/stats', { headers: adminHeaders() });
        var sData = await sRes.json();
        if (sData.ok) {
          document.getElementById('statUsers').textContent = sData.totalUsers;
          document.getElementById('statBots').textContent = sData.activeBots;
          document.getElementById('statAvailCodes').textContent = sData.availableCodes;
          document.getElementById('statUsedCodes').textContent = sData.usedCodes;
        }

        var cRes = await fetch('/api/admin/codes', { headers: adminHeaders() });
        var cData = await cRes.json();
        if (cData.ok) {
          renderCodesTable(cData.codes);
        }

        var uRes = await fetch('/api/admin/users', { headers: adminHeaders() });
        var uData = await uRes.json();
        if (uData.ok) {
          renderUsersTable(uData.users);
          if (window.activeInspectedUser) {
            openUserInspector(window.activeInspectedUser);
          }
        }
      } catch (e) {}
    }

    function renderCodesTable(codes) {
      var tbody = document.getElementById('codesTableBody');
      if (!codes || !codes.length) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:18px;">هیچ کدی در سیستم ثبت نشده است.</td></tr>';
        return;
      }
      var codesHtml = codes.map(function(c) {
        var statusBadge = c.isUsed 
          ? '<span class="status-badge used">مصرف: ' + (c.usedBy || 'ناشناس') + '</span>'
          : '<span class="status-badge unused">🟢 آماده فروش</span>';
        var planName = c.planName || (c.plan === 'lifetime' ? 'دائمی و نامحدود' : (c.durationDays ? (c.durationDays + ' روزه') : '۱ ماهه (۳۰ روز)'));

        return '<tr>' +
          '<td style="font-family:monospace; font-weight:bold; color:var(--accent-purple);">' + c.code + '</td>' +
          '<td><span style="font-weight:700; color:' + (c.plan === 'lifetime' ? 'var(--accent-amber)' : 'var(--accent-blue)') + ';">' + planName + '</span></td>' +
          '<td>' + statusBadge + '</td>' +
          '<td>' +
            '<button class="copy-btn" data-code="' + c.code + '" onclick="copyCodeToClipboard(this.dataset.code)">📋 کپی</button> ' +
            '<button class="btn-nav-action" data-code="' + c.code + '" onclick="doDeleteCode(this.dataset.code)" style="color:var(--accent-rose); padding:3px 6px;">🗑️</button>' +
          '</td>' +
        '</tr>';
      }).join('');
      tbody.innerHTML = codesHtml;
      window.translateDOM(tbody, window.currentLang);
    }

    function renderUsersTable(users) {
      window.cachedAdminUsers = users || [];
      filterAdminUsers();
    }

    window.filterAdminUsers = function() {
      var allUsers = window.cachedAdminUsers || [];
      var searchEl = document.getElementById('adminUserSearchInput');
      var filterEl = document.getElementById('adminUserFilterSelect');
      var search = (searchEl && searchEl.value ? searchEl.value : '').trim().toLowerCase();
      var filter = (filterEl && filterEl.value) ? filterEl.value : 'all';

      // بروزرسانی کارت‌های آمار زنده
      var countTotal = allUsers.length;
      var countBot = allUsers.filter(function(u) { return !!u.hasBot; }).length;
      var count2fa = allUsers.filter(function(u) { return !!u.has2FA; }).length;
      var countTg = allUsers.filter(function(u) { return u.hasTelegram && u.enabled && !u.isSuspended; }).length;

      var elTotal = document.getElementById('adminUsersCount');
      var elBot = document.getElementById('adminBotUsersCount');
      var el2fa = document.getElementById('admin2faUsersCount');
      var elTg = document.getElementById('adminSelfbotUsersCount');
      if (elTotal) elTotal.textContent = countTotal;
      if (elBot) elBot.textContent = countBot;
      if (el2fa) el2fa.textContent = count2fa;
      if (elTg) elTg.textContent = countTg;

      var filtered = allUsers.filter(function(u) {
        if (!u || u.exists === false) return false;

        if (search) {
          var uName = (u.username || '').toLowerCase();
          var bName = (u.botUsername || '').toLowerCase();
          var tgId = String(u.telegramUserId || '');
          if (uName.indexOf(search) === -1 && bName.indexOf(search) === -1 && tgId.indexOf(search) === -1) {
            return false;
          }
        }

        if (filter === 'bot') return !!u.hasBot;
        if (filter === 'no_bot') return !u.hasBot;
        if (filter === '2fa_on') return !!u.has2FA;
        if (filter === '2fa_off') return !u.has2FA;
        if (filter === 'tg_active') return u.hasTelegram && u.enabled && !u.isSuspended;
        if (filter === 'suspended') return !!u.isSuspended || !!u.isExpired;
        if (filter === 'admin') return !!u.isAdmin || !!u.isOwner || u.role === 'admin';

        return true;
      });

      var tbody = document.getElementById('usersTableBody');
      if (!tbody) return;
      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:24px;">کاربری با این مشخصات یافت نشد.</td></tr>';
        return;
      }

      // Translation hook
      var origHtml = filtered.map(function(u) {
        var isOwner = !!u.isOwner || u.username.toLowerCase() === 'amirmaster' || u.username.toLowerCase() === 'admin';
        var isAdm = isOwner || !!u.isAdmin || u.role === 'admin';
        var roleBadge = isOwner
          ? '<span style="color:var(--accent-amber); background:var(--accent-amber-bg); border:1px solid var(--accent-amber-border); padding:2px 7px; border-radius:6px; font-weight:800; font-size:0.72rem;">👑 مالک</span>'
          : (isAdm
            ? '<span style="color:var(--accent-purple); background:var(--accent-purple-bg); border:1px solid var(--accent-purple-border); padding:2px 7px; border-radius:6px; font-weight:800; font-size:0.72rem;">🛡️ مدیر</span>'
            : '<span class="badge-neutral" style="padding:2px 7px; border-radius:6px; font-size:0.72rem;">👤 کاربر</span>');

        // ربات کمکی
        var botBadge = u.hasBot
          ? '<span style="color:var(--accent-blue); background:var(--accent-blue-bg); border:1px solid var(--accent-blue-border); padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:700; white-space:nowrap;" title="شناسه ربات: ' + (u.botUsername ? '@' + u.botUsername : 'متصل') + '">🤖 ' + (u.botUsername ? '@' + u.botUsername : 'متصل') + '</span>'
          : '<span class="badge-neutral" style="padding:2px 8px; border-radius:999px; font-size:0.72rem;">⚪ بدون ربات</span>';

        // تایید دو مرحله‌ای ۲FA
        var totpBadge = u.has2FA
          ? '<span style="color:var(--accent-green); background:var(--accent-green-bg); border:1px solid var(--accent-green-border); padding:2px 8px; border-radius:999px; font-size:0.72rem; font-weight:700; white-space:nowrap;" title="۲FA فعال - ' + (u.backupCodesCount || 0) + ' کد پشتیبان">🔐 فعال (' + (u.backupCodesCount || 0) + ')</span>'
          : '<span class="badge-neutral" style="padding:2px 8px; border-radius:999px; font-size:0.72rem;">⚪ خاموش</span>';

        // وضعیت تلگرام سلف‌بات
        var tgStatus = u.hasTelegram 
          ? (u.enabled 
              ? '<span style="color:var(--accent-green); font-size:0.75rem; font-weight:700;">🟢 فعال' + (u.ghostMode ? ' 👻' : '') + (u.aiReplyEnabled ? ' 🤖' : '') + '</span>' 
              : '<span style="color:var(--accent-amber); font-size:0.75rem;">⏸️ مکث</span>')
          : '<span style="color:var(--text-muted); font-size:0.75rem;">🔴 قطع</span>';

        // پلن و اعتبار
        var planCol = '<div style="font-weight:700; font-size:0.8rem;">' + (u.planName || u.plan || 'استاندارد') + '</div>' +
          '<div style="font-size:0.72rem; color:' + (u.isExpired ? 'var(--danger)' : 'var(--accent-blue)') + ';">' + (u.remainingText || '') + '</div>';

        // وضعیت تعلیق
        var suspendBadge = u.isSuspended 
          ? '<span class="status-badge used" style="color:var(--accent-rose); background:var(--accent-rose-bg); border:1px solid var(--accent-rose-border); font-size:0.72rem;">⏸️ معلق</span>'
          : '<span class="status-badge unused" style="color:var(--accent-green); background:var(--accent-green-bg); border:1px solid var(--accent-green-border); font-size:0.72rem;">🟢 فعال</span>';

        // دکمه مانیتورینگ جامع در جدول (سایر عملیات و دکمه‌ها درون بخش مانیتورینگ قرار دارند)
        var actionsCol = '<button class="btn btn-secondary" data-user="' + u.username + '" onclick="openUserInspector(this.dataset.user)" style="color:var(--accent-indigo); background:var(--accent-indigo-bg); border:1px solid var(--accent-indigo-border); font-weight:700; padding:6px 14px; font-size:0.78rem; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; gap:6px; cursor:pointer; white-space:nowrap; transition:all 0.2s ease;" title="مانیتورینگ کامل ۳۶۰ درجه و مدیریت کاربر">' +
          '<span>🔍</span> <span>مانیتورینگ</span>' +
        '</button>';

        return '<tr>' +
          '<td style="font-weight:bold; font-size:0.84rem;">' + u.username + '</td>' +
          '<td>' + roleBadge + '</td>' +
          '<td>' + botBadge + '</td>' +
          '<td>' + totpBadge + '</td>' +
          '<td>' + tgStatus + '</td>' +
          '<td>' + planCol + '</td>' +
          '<td>' + suspendBadge + '</td>' +
          '<td style="text-align:center;">' + actionsCol + '</td>' +
        '</tr>';
      }).join('');
      tbody.innerHTML = origHtml;
      window.translateDOM(tbody, window.currentLang);
    };

    window.closeUserInspector = function() {
      var modal = document.getElementById('adminUserInspectorModal');
      if (modal) modal.classList.add('hidden');
      window.activeInspectedUser = null;
    };

    window.openUserInspector = function(uname) {
      var users = window.cachedAdminUsers || [];
      var u = users.find(function(x) { return x.username.toLowerCase() === String(uname).toLowerCase(); });
      if (!u) {
        showToast('اطلاعات کاربر یافت نشد', 'error');
        return;
      }
      window.activeInspectedUser = u.username;

      var isOwner = !!u.isOwner || u.username.toLowerCase() === 'amirmaster' || u.username.toLowerCase() === 'admin';
      var isAdm = isOwner || !!u.isAdmin || u.role === 'admin';

      document.getElementById('inspectorAvatar').textContent = isOwner ? '👑' : (isAdm ? '🛡️' : '👤');
      document.getElementById('inspectorUsername').textContent = u.username;

      var roleBadgeContent = isOwner
        ? '<span style="color:var(--accent-amber); background:var(--accent-amber-bg); border:1px solid var(--accent-amber-border); padding:2px 8px; border-radius:6px; font-weight:800; font-size:0.72rem;">👑 مالک سامانه</span>'
        : (isAdm
          ? '<span style="color:var(--accent-purple); background:var(--accent-purple-bg); border:1px solid var(--accent-purple-border); padding:2px 8px; border-radius:6px; font-weight:800; font-size:0.72rem;">🛡️ مدیر سامانه</span>'
          : '<span style="color:var(--text-muted); background:var(--badge-bg); border:1px solid var(--border-subtle); padding:2px 8px; border-radius:6px; font-size:0.72rem;">👤 کاربر عادی</span>');
      if (!isOwner) {
        roleBadgeContent += ' <button class="btn-nav-action" onclick="doUserAdminAction(window.activeInspectedUser, &apos;toggle_role&apos;)" style="color:' + (isAdm ? 'var(--accent-amber)' : 'var(--accent-purple)') + '; background:' + (isAdm ? 'var(--accent-amber-bg)' : 'var(--accent-purple-bg)') + '; border:1px solid ' + (isAdm ? 'var(--accent-amber-border)' : 'var(--accent-purple-border)') + '; font-size:0.72rem; padding:3px 9px; font-weight:700; border-radius:6px;" title="' + (isAdm ? 'تنزل سطح دسترسی به کاربر عادی' : 'ارتقا به مدیر سامانه') + '">' + (isAdm ? '👤 تنزل به کاربر عادی' : '🛡️ ارتقا به مدیر') + '</button>';
      }
      document.getElementById('inspectorRoleBadge').innerHTML = roleBadgeContent;

      // نشان و کنترل پلن اشتراک
      document.getElementById('inspectorPlanBadge').innerHTML = 
        '<span style="color:var(--accent-blue); background:var(--accent-blue-bg); border:1px solid var(--accent-blue-border); padding:2px 8px; border-radius:6px; font-weight:700; font-size:0.72rem;">⭐ ' + (u.planName || u.plan || 'استاندارد') + '</span> ' +
        '<button class="btn-nav-action" onclick="doChangeUserPlan(window.activeInspectedUser)" style="font-size:0.7rem; padding:2px 7px; color:var(--accent-blue); border-radius:6px;" title="تغییر یا تمدید اشتراک">✏️ تغییر</button>';

      // نشان و کنترل وضعیت تعلیق
      var suspendBadgeContent = u.isSuspended
        ? '<span style="color:var(--accent-rose); background:var(--accent-rose-bg); border:1px solid var(--accent-rose-border); padding:2px 8px; border-radius:6px; font-size:0.72rem; font-weight:700;">⏸️ معلق</span>'
        : '<span style="color:var(--accent-green); background:var(--accent-green-bg); border:1px solid var(--accent-green-border); padding:2px 8px; border-radius:6px; font-size:0.72rem; font-weight:700;">🟢 فعال</span>';
      if (!isOwner) {
        suspendBadgeContent += u.isSuspended
          ? ' <button class="btn-nav-action" onclick="doUserAdminAction(window.activeInspectedUser, &apos;toggle_suspend&apos;)" style="color:var(--accent-green); background:var(--accent-green-bg); border:1px solid var(--accent-green-border); font-size:0.7rem; padding:2px 7px; font-weight:700; border-radius:6px;" title="خروج کاربر از حالت تعلیق">🔓 خروج از تعلیق</button>'
          : ' <button class="btn-nav-action" onclick="doUserAdminAction(window.activeInspectedUser, &apos;toggle_suspend&apos;)" style="color:var(--accent-rose); background:var(--accent-rose-bg); border:1px solid var(--accent-rose-border); font-size:0.7rem; padding:2px 7px; font-weight:700; border-radius:6px;" title="تعلیق فوری دسترسی کاربر">🔒 تعلیق حساب</button>';
      }
      document.getElementById('inspectorSuspendBadge').innerHTML = suspendBadgeContent;

      document.getElementById('inspectorCreatedAt').textContent = u.createdAt ? new Date(u.createdAt).toLocaleDateString('fa-IR') : 'نامشخص';
      document.getElementById('inspectorLicenseCode').textContent = u.licenseCode || 'بدون کد';

      // نوار ابزار اختصاصی دسترسی سریع به کلیه عملیات مدیریتی کاربر
      var quickActionsEl = document.getElementById('inspectorQuickActions');
      if (quickActionsEl) {
        var pauseResumeBtn = '<button class="btn btn-secondary" data-act="toggle" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:' + (u.enabled ? 'var(--accent-amber)' : 'var(--accent-green)') + '; background:' + (u.enabled ? 'var(--accent-amber-bg)' : 'var(--accent-green-bg)') + '; border-color:' + (u.enabled ? 'var(--accent-amber-border)' : 'var(--accent-green-border)') + ';">' +
          (u.enabled ? '<span>⏸️</span> <span>مکث سلف‌بات</span>' : '<span>▶️</span> <span>فعال‌سازی سلف‌بات</span>') +
        '</button>';

        var planQuickBtn = '<button class="btn btn-secondary" onclick="doChangeUserPlan(window.activeInspectedUser)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:var(--accent-blue); background:var(--accent-blue-bg); border-color:var(--accent-blue-border);">' +
          '<span>⭐</span> <span>تغییر پلن اشتراک</span>' +
        '</button>';

        var passQuickBtn = '<button class="btn btn-secondary" onclick="adminResetUserPassword(window.activeInspectedUser)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:var(--accent-indigo); background:var(--accent-indigo-bg); border-color:var(--accent-indigo-border);">' +
          '<span>🔑</span> <span>تغییر کلمه عبور</span>' +
        '</button>';

        var suspendQuickBtn = '';
        var roleQuickBtn = '';
        var deleteQuickBtn = '';
        var disconnectTgQuickBtn = '';

        if (!isOwner) {
          if (u.hasTelegram) {
            disconnectTgQuickBtn = '<button class="btn btn-secondary" data-act="disconnect" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:var(--accent-amber); background:var(--accent-amber-bg); border-color:var(--accent-amber-border);" title="قطع نشست تلگرام">' +
              '<span>🔌</span> <span>قطع سشن تلگرام</span>' +
            '</button>';
          }

          suspendQuickBtn = '<button class="btn btn-secondary" data-act="toggle_suspend" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:' + (u.isSuspended ? 'var(--accent-green)' : 'var(--accent-rose)') + '; background:' + (u.isSuspended ? 'var(--accent-green-bg)' : 'var(--accent-rose-bg)') + '; border-color:' + (u.isSuspended ? 'var(--accent-green-border)' : 'var(--accent-rose-border)') + ';">' +
            (u.isSuspended ? '<span>🔓</span> <span>خروج از تعلیق</span>' : '<span>🔒</span> <span>تعلیق حساب</span>') +
          '</button>';

          roleQuickBtn = '<button class="btn btn-secondary" data-act="toggle_role" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:' + (isAdm ? 'var(--accent-amber)' : 'var(--accent-purple)') + '; background:' + (isAdm ? 'var(--accent-amber-bg)' : 'var(--accent-purple-bg)') + '; border-color:' + (isAdm ? 'var(--accent-amber-border)' : 'var(--accent-purple-border)') + ';">' +
            (isAdm ? '<span>👤</span> <span>تنزل به کاربر عادی</span>' : '<span>🛡️</span> <span>ارتقا به مدیر سامانه</span>') +
          '</button>';

          deleteQuickBtn = '<button class="btn btn-secondary" data-act="delete" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.76rem; padding:8px 12px; font-weight:700; display:inline-flex; align-items:center; justify-content:center; gap:6px; color:var(--accent-rose); background:var(--accent-rose-bg); border-color:var(--accent-rose-border);" title="حذف کامل کاربر و تمام اطلاعات">' +
            '<span>🗑️</span> <span>حذف کامل کاربر</span>' +
          '</button>';
        }

        quickActionsEl.innerHTML = 
          '<div style="font-size:0.8rem; font-weight:800; color:var(--text-main); margin-bottom:10px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">' +
            '<span>⚡ دسترسی سریع به عملیات مدیریتی کاربر:</span>' +
            '<span style="font-size:0.72rem; color:var(--text-dim); font-weight:400;">مدیریت کامل نقش، لایسنس، تعلیق و اجرای سلف‌بات</span>' +
          '</div>' +
          '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:8px;">' +
            pauseResumeBtn +
            planQuickBtn +
            suspendQuickBtn +
            roleQuickBtn +
            passQuickBtn +
            disconnectTgQuickBtn +
            deleteQuickBtn +
          '</div>';
      }

      var grid = document.getElementById('inspectorTelemetryGrid');

      // کارت ۱: مانیتورینگ ربات کمکی تلگرام
      var botStatusHtml = u.hasBot
        ? '<span style="color:var(--accent-green); font-weight:700;">🟢 متصل (@' + (u.botUsername || 'ربات') + ')</span>'
        : '<span style="color:var(--text-muted);">⚪ غیرمتصل</span>';

      var botActionBtns = u.hasBot
        ? '<button class="btn btn-secondary" onclick="adminDisconnectUserBot(window.activeInspectedUser)" style="color:var(--accent-rose); border-color:var(--accent-rose-border); font-size:0.75rem; padding:6px 12px; width:100%; justify-content:center;">🔌 قطع اتصال ربات و پاکسازی وب‌هوک</button>'
        : '<span style="font-size:0.74rem; color:var(--text-muted);">کاربر هنوز ربات کمکی اختصاصی متصل نکرده است.</span>';

      var botCard = 
        '<div class="telemetry-card">' +
          '<div class="telemetry-card-title">' +
            '<span>🤖 مانیتورینگ ربات کمکی تلگرام</span>' +
            (u.hasBot ? '<span style="font-size:0.7rem; color:var(--accent-blue); background:var(--accent-blue-bg); border:1px solid var(--accent-blue-border); padding:2px 6px; border-radius:4px;">اختصاصی</span>' : '') +
          '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت اتصال:</span><span class="telemetry-item-value">' + botStatusHtml + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">نام کاربری ربات:</span><span class="telemetry-item-value mono">' + (u.botUsername ? ('@' + u.botUsername) : '-') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">شناسه ربات در تلگرام:</span><span class="telemetry-item-value mono">' + (u.botId || '-') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">شناسه انحصاری مالک (قفل‌شده):</span><span class="telemetry-item-value mono">' + (u.botOwnerId || 'تنظیم نشده') + '</span></div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">ماژول ضد حذف پیام:</span>' +
            '<span class="telemetry-item-value">' + 
              (u.botAntiDelete ? '<span style="color:var(--accent-green);">🟢 فعال</span>' : '<span style="color:var(--accent-rose);">🔴 خاموش</span>') +
              (u.hasBot ? ' <button class="btn-nav-action" data-feat="antiDelete" onclick="adminToggleBotFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">ماژول ضد ویرایش پیام:</span>' +
            '<span class="telemetry-item-value">' + 
              (u.botAntiEdit ? '<span style="color:var(--accent-green);">🟢 فعال</span>' : '<span style="color:var(--accent-rose);">🔴 خاموش</span>') +
              (u.hasBot ? ' <button class="btn-nav-action" data-feat="antiEdit" onclick="adminToggleBotFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">ارسال مدیاهای تایمردار (TTL):</span>' +
            '<span class="telemetry-item-value">' + 
              (u.botForwardTtl ? '<span style="color:var(--accent-green);">🟢 فعال</span>' : '<span style="color:var(--accent-rose);">🔴 خاموش</span>') +
              (u.hasBot ? ' <button class="btn-nav-action" data-feat="forwardTtl" onclick="adminToggleBotFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-actions">' + botActionBtns + '</div>' +
        '</div>';

      // کارت ۲: امنیت، دسترسی و ۲FA
      var totpStatusHtml = u.has2FA
        ? '<span style="color:var(--accent-green); font-weight:700;">🟢 فعال (Google Authenticator)</span>'
        : '<span style="color:var(--text-muted);">⚪ غیرفعال (فقط رمز عبور)</span>';

      var totpActionBtn = u.has2FA
        ? '<button class="btn btn-secondary" onclick="adminDisableUser2FA(window.activeInspectedUser)" style="color:var(--accent-amber); border-color:var(--accent-amber-border); font-size:0.75rem; padding:6px 12px; flex:1; min-width:140px; justify-content:center;">🔓 ریست و غیرفعال‌سازی ۲FA</button>'
        : '';

      var passActionBtn = '<button class="btn btn-secondary" onclick="adminResetUserPassword(window.activeInspectedUser)" style="color:var(--accent-indigo); border-color:var(--accent-indigo-border); font-size:0.75rem; padding:6px 12px; flex:1; min-width:140px; justify-content:center;">🔑 تغییر کلمه عبور کاربر</button>';

      var roleDetailHtml = isOwner
        ? '<span style="color:var(--accent-amber); font-weight:700;">👑 مالک ارشد سامانه</span>'
        : (isAdm
          ? '<span style="color:var(--accent-purple); font-weight:700;">🛡️ مدیر سامانه (دسترسی کامل پنل مدیریت)</span>'
          : '<span style="color:var(--text-muted);">👤 کاربر عادی</span>');

      var roleActionBtn = !isOwner
        ? ('<button class="btn btn-secondary" onclick="doUserAdminAction(window.activeInspectedUser, &apos;toggle_role&apos;)" style="color:' + (isAdm ? 'var(--accent-amber)' : 'var(--accent-purple)') + '; border-color:' + (isAdm ? 'var(--accent-amber-border)' : 'var(--accent-purple-border)') + '; font-size:0.75rem; padding:6px 12px; flex:1; min-width:140px; justify-content:center; font-weight:700;">' + (isAdm ? '👤 تنزل به کاربر عادی' : '🛡️ ارتقا به مدیر سامانه') + '</button>')
        : '';

      var suspendActionBtn = !isOwner
        ? ('<button class="btn btn-secondary" onclick="doUserAdminAction(window.activeInspectedUser, &apos;toggle_suspend&apos;)" style="color:' + (u.isSuspended ? 'var(--accent-green)' : 'var(--accent-rose)') + '; border-color:' + (u.isSuspended ? 'var(--accent-green-border)' : 'var(--accent-rose-border)') + '; font-size:0.75rem; padding:6px 12px; flex:1; min-width:140px; justify-content:center; font-weight:700;">' + (u.isSuspended ? '🔓 خروج از تعلیق' : '🔒 تعلیق حساب کاربر') + '</button>')
        : '';

      var deleteActionBtn = !isOwner
        ? ('<button class="btn btn-secondary" onclick="doUserAdminAction(window.activeInspectedUser, &apos;delete&apos;)" style="color:var(--accent-rose); border-color:var(--accent-rose-border); background:var(--accent-rose-bg); font-size:0.75rem; padding:6px 12px; flex:1; min-width:140px; justify-content:center; font-weight:700;">🗑️ حذف کامل کاربر</button>')
        : '';

      var secCard = 
        '<div class="telemetry-card">' +
          '<div class="telemetry-card-title">' +
            '<span>🔐 امنیت، سطح دسترسی و ۲FA</span>' +
            (u.has2FA ? '<span style="font-size:0.7rem; color:var(--accent-green); background:var(--accent-green-bg); border:1px solid var(--accent-green-border); padding:2px 6px; border-radius:4px;">امن</span>' : '') +
          '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">سطح دسترسی و نقش:</span><span class="telemetry-item-value">' + roleDetailHtml + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت ورود دو مرحله‌ای:</span><span class="telemetry-item-value">' + totpStatusHtml + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">کدهای پشتیبان باقی‌مانده:</span><span class="telemetry-item-value mono">' + (u.has2FA ? (u.backupCodesCount + ' کد آماده مصرف') : 'ندارد') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">رمزنگاری نشست‌ها:</span><span class="telemetry-item-value" style="color:var(--accent-purple);">AES-256-GCM 🛡️</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت حساب کاربری:</span><span class="telemetry-item-value">' + (u.isSuspended ? '<span style="color:var(--accent-rose); font-weight:700;">حساب معلق است ⏸️</span>' : '<span style="color:var(--accent-green); font-weight:700;">حساب مجاز و فعال 🟢</span>') + '</span></div>' +
          '<div class="telemetry-actions">' + roleActionBtn + suspendActionBtn + passActionBtn + totpActionBtn + deleteActionBtn + '</div>' +
        '</div>';

      // کارت ۳: مانیتورینگ سلف‌بات تلگرام
      var tgStatusHtml = u.hasTelegram
        ? '<span style="color:var(--accent-green); font-weight:700;">🟢 متصل (سشن رمزنگاری‌شده)</span>'
        : '<span style="color:var(--accent-rose);">🔴 قطع</span>';

      var tgRunStatusHtml = u.enabled
        ? '<span style="color:var(--accent-green);">🟢 درحال اجرا و پردازش</span>'
        : '<span style="color:var(--accent-amber);">⏸️ متوقف‌شده توسط کاربر</span>';

      var tgCard = 
        '<div class="telemetry-card">' +
          '<div class="telemetry-card-title">' +
            '<span>📱 مانیتورینگ سلف‌بات تلگرام (MTProto)</span>' +
            '<span style="font-size:0.7rem; color:var(--accent-purple); background:var(--accent-purple-bg); border:1px solid var(--accent-purple-border); padding:2px 6px; border-radius:4px;">سشن امن</span>' +
          '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت سشن تلگرام:</span><span class="telemetry-item-value">' + tgStatusHtml + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت اجرای سلف‌بات:</span><span class="telemetry-item-value">' + tgRunStatusHtml + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">شناسه عددی کاربر در تلگرام:</span><span class="telemetry-item-value mono">' + (u.telegramUserId || 'نامشخص') + '</span></div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">حالت شبح و خواندن مخفی (Ghost):</span>' +
            '<span class="telemetry-item-value">' + 
              (u.ghostMode ? '<span style="color:var(--accent-green);">🟢 روشن</span>' : '<span style="color:var(--text-muted);">⚪ خاموش</span>') +
              (u.hasTelegram ? ' <button class="btn-nav-action" data-feat="ghostMode" onclick="adminToggleFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">پاسخ هوشمند هوش مصنوعی (AI):</span>' +
            '<span class="telemetry-item-value">' + 
              (u.aiReplyEnabled ? '<span style="color:var(--accent-green);">🟢 روشن</span>' : '<span style="color:var(--text-muted);">⚪ خاموش</span>') +
              (u.hasTelegram ? ' <button class="btn-nav-action" data-feat="aiReplyEnabled" onclick="adminToggleFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-item">' +
            '<span class="telemetry-item-label">ساعت فونتی و بیو داینامیک:</span>' +
            '<span class="telemetry-item-value">' + 
              (u.bioEnabled ? '<span style="color:var(--accent-green);">🟢 روشن</span>' : '<span style="color:var(--text-muted);">⚪ خاموش</span>') +
              (u.hasTelegram ? ' <button class="btn-nav-action" data-feat="bioEnabled" onclick="adminToggleFeature(window.activeInspectedUser, this.dataset.feat)" style="font-size:0.7rem; padding:2px 6px;">سوئیچ</button>' : '') +
            '</span>' +
          '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">وضعیت عدم حضور (AFK):</span><span class="telemetry-item-value">' + (u.afkEnabled ? ('🟢 فعال' + (u.afkReason ? ' (' + u.afkReason + ')' : '')) : '<span style="color:var(--text-muted);">⚪ خاموش</span>') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">کاربران بی‌صدا / مسدود شده:</span><span class="telemetry-item-value mono">' + (u.mutedCount || 0) + ' کاربر</span></div>' +
          '<div class="telemetry-actions">' +
            '<button class="btn btn-secondary" data-act="toggle" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="font-size:0.75rem; padding:6px 12px; flex:1; justify-content:center; color:' + (u.enabled ? 'var(--accent-amber)' : 'var(--accent-green)') + '; border-color:' + (u.enabled ? 'var(--accent-amber-border)' : 'var(--accent-green-border)') + ';">' + (u.enabled ? '⏸️ متوقف‌سازی سلف‌بات' : '▶️ فعال‌سازی سلف‌بات') + '</button>' +
            (u.hasTelegram ? '<button class="btn btn-secondary" data-act="disconnect" onclick="doUserAdminAction(window.activeInspectedUser, this.dataset.act)" style="color:var(--accent-amber); border-color:var(--accent-amber-border); font-size:0.75rem; padding:6px 12px; flex:1; justify-content:center;">🔌 قطع سشن تلگرام</button>' : '') +
          '</div>' +
        '</div>';

      // کارت ۴: عیب‌یابی سلامت و لاگ‌ها
      var healthHtml = u.error
        ? '<div style="color:var(--accent-rose); background:var(--accent-rose-bg); border:1px solid var(--accent-rose-border); border-radius:8px; padding:6px 10px; font-size:0.75rem; word-break:break-all; margin-top:4px;">⚠️ ' + u.error + '</div>'
        : '<span style="color:var(--accent-green); font-size:0.78rem;">سیستم کاملاً سالم، پایدار و بدون خطاست 🟢</span>';

      var healthCard = 
        '<div class="telemetry-card">' +
          '<div class="telemetry-card-title">' +
            '<span>🩺 عیب‌یابی سلامت، لاگ‌ها و اشتراک</span>' +
            '<span style="font-size:0.7rem; color:var(--accent-amber); background:var(--accent-amber-bg); border:1px solid var(--accent-amber-border); padding:2px 6px; border-radius:4px;">Cloudflare Edge</span>' +
          '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">آخرین همگام‌سازی (Heartbeat):</span><span class="telemetry-item-value mono">' + (u.lastUpdate ? new Date(u.lastUpdate).toLocaleString('fa-IR') : (u.lastTime || 'بدون لاگ')) + '</span></div>' +
          '<div class="telemetry-item" style="flex-direction:column; align-items:stretch; gap:4px;"><span class="telemetry-item-label">وضعیت سلامت و خطاها:</span>' + healthHtml + '</div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">پلن اشتراک فعلی:</span><span class="telemetry-item-value">' + (u.planName || u.plan || 'استاندارد') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">مدت اعتبار باقی‌مانده:</span><span class="telemetry-item-value" style="color:' + (u.isExpired ? 'var(--danger)' : 'var(--accent-blue)') + ';">' + (u.remainingText || '-') + '</span></div>' +
          '<div class="telemetry-item"><span class="telemetry-item-label">کد لایسنس مصرف‌شده:</span><span class="telemetry-item-value mono">' + (u.licenseCode || '-') + '</span></div>' +
          '<div class="telemetry-actions">' +
            '<button class="btn-nav-action" onclick="adminClearUserError(window.activeInspectedUser)" style="color:var(--accent-green); border-color:var(--accent-green-border); font-size:0.75rem; padding:6px 12px; flex:1; justify-content:center;">🔄 پاکسازی خطاها</button>' +
            '<button class="btn-nav-action" onclick="doChangeUserPlan(window.activeInspectedUser)" style="color:var(--accent-blue); border-color:var(--accent-blue-border); font-size:0.75rem; padding:6px 12px; flex:1; justify-content:center;">⭐ تغییر یا ارتقای اشتراک</button>' +
          '</div>' +
        '</div>';

      grid.innerHTML = botCard + secCard + tgCard + healthCard;

      var modal = document.getElementById('adminUserInspectorModal');
      if (modal) {
        modal.classList.remove('hidden');
        window.translateDOM(modal, window.currentLang);
      window.translateDOM(document.getElementById('inspectorTelemetryGrid'), window.currentLang);
      window.translateDOM(document.getElementById('inspectorQuickActions'), window.currentLang);
      window.translateDOM(document.getElementById('inspectorTelemetryGrid'), window.currentLang);
      window.translateDOM(document.getElementById('inspectorQuickActions'), window.currentLang);
      }
    };

    window.adminDisableUser2FA = async function(uname) {
      if (!confirm('آیا از غیرفعال‌سازی تایید دو مرحله‌ای (۲FA) برای کاربر ' + uname + ' اطمینان دارید؟ کاربر می‌تواند بدون نیاز به کد Authenticator با رمز عبور خود وارد شود.')) return;
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'disable_2fa' })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('۲FA کاربر ' + uname + ' با موفقیت غیرفعال و ریست شد 🎉', 'success');
          await loadAdminData();
          if (window.activeInspectedUser === uname) openUserInspector(uname);
        } else {
          showToast(data.error || 'خطا در غیرفعال‌سازی ۲FA', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.adminDisconnectUserBot = async function(uname) {
      if (!confirm('آیا از قطع اتصال کامل ربات کمکی تلگرام برای کاربر ' + uname + ' و حذف وب‌هوک اطمینان دارید؟')) return;
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'disconnect_bot' })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('ربات کمکی کاربر ' + uname + ' قطع و حافظه آزاد شد ✨', 'success');
          await loadAdminData();
          if (window.activeInspectedUser === uname) openUserInspector(uname);
        } else {
          showToast(data.error || 'خطا در قطع ربات', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.adminToggleBotFeature = async function(uname, feature) {
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'toggle_bot_feature', feature: feature })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('قابلیت ربات با موفقیت تغییر یافت ✨', 'success');
          await loadAdminData();
          if (window.activeInspectedUser === uname) openUserInspector(uname);
        } else {
          showToast(data.error || 'خطا در تغییر قابلیت ربات', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.adminToggleFeature = async function(uname, feature) {
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'toggle_feature', feature: feature })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('قابلیت سلف‌بات تغییر یافت ✨', 'success');
          await loadAdminData();
          if (window.activeInspectedUser === uname) openUserInspector(uname);
        } else {
          showToast(data.error || 'خطا در تغییر قابلیت', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.adminClearUserError = async function(uname) {
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'clear_error' })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('خطاهای کاربر ' + uname + ' پاکسازی شد 🧹', 'success');
          await loadAdminData();
          if (window.activeInspectedUser === uname) openUserInspector(uname);
        } else {
          showToast(data.error || 'خطا در پاکسازی', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.adminResetUserPassword = async function(uname) {
      var newPass = prompt('کلمه عبور جدید را برای کاربر ' + uname + ' وارد کنید (حداقل ۶ کاراکتر):');
      if (!newPass) return;
      if (newPass.length < 6) {
        showToast('کلمه عبور باید حداقل ۶ کاراکتر باشد', 'error');
        return;
      }
      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'reset_password', newPassword: newPass })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('رمز عبور کاربر ' + uname + ' با موفقیت به روز شد 🔑', 'success');
        } else {
          showToast(data.error || 'خطا در تغییر رمز', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.copyCodeToClipboard = function(code) {
      navigator.clipboard.writeText(code).then(function() {
        showToast('کد ' + code + ' کپی شد! آماده ارسال به خریدار ✨', 'success');
      });
    };

    window.onCodePlanChange = function() {
      var plan = document.getElementById('codePlanSelect').value;
      var grp = document.getElementById('customDaysGroup');
      if (grp) {
        grp.classList.toggle('hidden', plan !== 'custom');
      }
    };

    window.doGenerateCodes = async function() {
      var count = document.getElementById('codeCountSelect').value;
      var plan = document.getElementById('codePlanSelect').value;
      var customDaysInput = document.getElementById('customDaysInput');
      var customDays = customDaysInput ? (parseInt(customDaysInput.value, 10) || 15) : 15;
      var duration = plan === 'lifetime' ? 0 : (plan === 'custom' ? customDays : (plan === '6_months' ? 180 : (plan === '3_months' ? 90 : 30)));

      var btn = document.getElementById('btnGenerateCodes');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> تولید کدهای امن Arizo...';

      var payload = { count: count, plan: plan, durationDays: duration };
      if (plan === 'custom') {
        payload.customDays = customDays;
      }

      try {
        var res = await fetch('/api/admin/codes/create', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify(payload)
        });
        var data = await res.json();
        if (data.ok) {
          var planDesc = plan === 'lifetime' ? 'دائمی' : (plan === 'custom' ? (customDays + ' روزه سفارشی') : (duration + ' روزه'));
          showToast(count + ' کد لایسنس جدید (' + planDesc + ') با موفقیت تولید شد 🎉', 'success');
          loadAdminData();
        } else {
          showToast(data.error || 'خطا در ساخت کد', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>🎟️ تولید کدهای لایسنس جدید و اضافه به انبار</span>';
      }
    };

    window.doChangeUserPlan = async function(uname) {
      var promptMsg = 'انتخاب یا تغییر نوع اشتراک برای کاربر ' + uname + ':\\n1: ۱ ماهه (۳۰ روز)\\n2: ۳ ماهه (۹۰ روز)\\n3: ۶ ماهه (۱۸۰ روز)\\n4: دائمی و نامحدود (Lifetime)\\nیا تعداد روز دلخواه را مستقیماً وارد کنید (مثلاً 45):';
      var choice = prompt(promptMsg, '4');
      if (!choice) return;
      
      var plan = '1_month';
      var customDays = 30;
      choice = choice.trim();
      if (choice === '1') { plan = '1_month'; customDays = 30; }
      else if (choice === '2') { plan = '3_months'; customDays = 90; }
      else if (choice === '3') { plan = '6_months'; customDays = 180; }
      else if (choice === '4' || choice.toLowerCase() === 'lifetime') { plan = 'lifetime'; customDays = 0; }
      else {
        var parsed = parseInt(choice, 10);
        if (!isNaN(parsed) && parsed > 0) {
          plan = 'custom';
          customDays = parsed;
        } else {
          showToast('گزینه یا تعداد روز نامعتبر است', 'error');
          return;
        }
      }

      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: 'set_plan', plan: plan, customDays: customDays })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('اشتراک کاربر ' + uname + ' با موفقیت به ' + (data.planName || plan) + ' تغییر یافت! 🎉', 'success');
          loadAdminData();
        } else {
          showToast(data.error || 'خطا در تغییر اشتراک', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.doDeleteCode = async function(code) {
      if (!confirm('آیا از حذف کد ' + code + ' اطمینان دارید؟')) return;
      try {
        var res = await fetch('/api/admin/codes/delete', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ code: code })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('کد حذف شد', 'info');
          loadAdminData();
        }
      } catch (e) {}
    };

    window.doQuickPromoteAdmin = async function() {
      var uname = prompt('نام کاربری که می‌خواهید به سطح «مدیر سامانه» (Admin) ارتقا یابد را وارد کنید:');
      if (!uname) return;
      uname = uname.trim();
      if (!uname) return;
      var targetUser = (window.cachedAdminUsers || []).find(function(x) { return x.username.toLowerCase() === uname.toLowerCase(); });
      if (targetUser && (targetUser.isAdmin || targetUser.isOwner || targetUser.role === 'admin')) {
        showToast('این کاربر در حال حاضر مدیر یا مالک سامانه است.', 'info');
        return;
      }
      doUserAdminAction(uname, 'toggle_role');
    };

    window.doUserAdminAction = async function(uname, act) {
      var targetUser = (window.cachedAdminUsers || []).find(function(x) { return x.username.toLowerCase() === String(uname).toLowerCase(); });
      var isCurrentlyAdmin = targetUser ? (!!targetUser.isAdmin || !!targetUser.isOwner || targetUser.role === 'admin') : false;

      var actName = act === 'delete' ? 'حذف کامل کاربر' : (act === 'disconnect' ? 'قطع تلگرام' : (act === 'toggle_suspend' ? 'تغییر وضعیت تعلیق' : (act === 'toggle_role' ? (isCurrentlyAdmin ? 'تنزل به کاربر عادی' : 'ارتقا به مدیر سامانه') : 'تغییر وضعیت ربات')));

      if (act === 'delete' && !confirm('آیا از حذف کامل کاربر «' + uname + '» اطمینان دارید؟ تمامی داده‌های این کاربر پاک خواهد شد.')) return;
      if (act === 'toggle_role') {
        var roleConfirmMsg = isCurrentlyAdmin
          ? 'آیا از لغو دسترسی مدیریت و تنزل کاربر «' + uname + '» به کاربر عادی اطمینان دارید؟'
          : 'آیا از ارتقای کاربر «' + uname + '» به سطح «مدیر سامانه» (Admin) اطمینان دارید؟\\nاین کاربر پس از ارتقا به تمام بخش‌های پنل مدیریت دسترسی خواهد داشت.';
        if (!confirm(roleConfirmMsg)) return;
      }
      if (act === 'toggle_suspend' && !confirm('آیا از ' + (targetUser && targetUser.isSuspended ? 'خروج از تعلیق' : 'تعلیق') + ' کاربر «' + uname + '» اطمینان دارید؟')) return;

      try {
        var res = await fetch('/api/admin/users/action', {
          method: 'POST',
          headers: adminHeaders(),
          body: JSON.stringify({ username: uname, action: act })
        });
        var data = await res.json();
        if (data.ok) {
          var successMsg = act === 'toggle_role'
            ? (data.isAdmin ? ('کاربر «' + uname + '» با موفقیت به مدیر سامانه ارتقا یافت 🛡️') : ('دسترسی مدیریت لغو و کاربر «' + uname + '» به کاربر عادی تبدیل شد 👤'))
            : ('عملیات ' + actName + ' با موفقیت انجام شد');
          showToast(successMsg, 'success');
          if (act === 'delete' && window.activeInspectedUser === uname) {
            closeUserInspector();
          }
          await loadAdminData();
          if (window.activeInspectedUser === uname) {
            openUserInspector(uname);
          }
        } else {
          showToast(data.error || 'خطا در اجرای عملیات', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه در برقراری ارتباط با سرور', 'error');
      }
    };

    window.doQuickRenew = async function() {
      var code = document.getElementById('quickRenewCodeInput').value.trim().toUpperCase();
      if (!code) {
        showToast('لطفاً کد لایسنس تمدید را وارد کنید', 'error');
        return;
      }
      var btn = document.getElementById('quickRenewBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> تمدید آنی...';
      try {
        var res = await fetch('/api/user/redeem', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ licenseCode: code })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('حساب شما با موفقیت از حالت تعلیق خارج و شارژ شد! 🎉', 'success');
          document.getElementById('quickRenewCodeInput').value = '';
          await loadUserDashboard();
        } else {
          showToast(data.error || 'کد وارد شده نامعتبر است', 'error');
        }
      } catch (e) {
        showToast('خطای ارتباط با سرور', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>🚀 خروج از تعلیق و شارژ</span>';
      }
    };

    // ==========================================
    // 👤 احراز هویت و ورود/ثبت‌نام کاربران
    // ==========================================
    window.switchUserTab = function(tab) {
      var btnLog = document.getElementById('userTabLogin');
      var btnReg = document.getElementById('userTabRegister');

      var boxLog = document.getElementById('loginFormBox');
      var boxReg = document.getElementById('registerFormBox');

      btnLog.classList.toggle('active', tab === 'login');
      btnReg.classList.toggle('active', tab === 'register');

      boxLog.classList.toggle('hidden', tab !== 'login');
      boxReg.classList.toggle('hidden', tab !== 'register');
    };

    window.switchTgTab = function(tab) {
      var btnPh = document.getElementById('tabTgPhone');
      var btnSs = document.getElementById('tabTgSess');
      var boxPh = document.getElementById('tgPhoneBox');
      var boxSs = document.getElementById('tgSessBox');

      if (tab === 'phone') {
        btnPh.className = 'segmented-btn active';
        btnSs.className = 'segmented-btn';
        boxPh.classList.remove('hidden');
        boxSs.classList.add('hidden');
      } else {
        btnSs.className = 'segmented-btn active';
        btnPh.className = 'segmented-btn';
        boxSs.classList.remove('hidden');
        boxPh.classList.add('hidden');
      }
    };

    window.setColonChar = function(char, isQuiet) {
      document.getElementById('colonInput').value = char;
      document.querySelectorAll('.sep-pill').forEach(function(c) {
        c.classList.toggle('active', c.textContent.trim() === char);
      });
      updateLiveClock();
      if (!isQuiet) {
        window.isStudioDirty = true;
        window.saveFonts();
      }
    };

    window.openSettingsModal = function() { document.getElementById('settingsModal').classList.remove('hidden');
      window.translateDOM(document.getElementById('settingsModal'), window.currentLang); };
    window.closeSettingsModal = function() { document.getElementById('settingsModal').classList.add('hidden'); };

    window.openFeaturesModal = function() {
      var modal = document.getElementById('featuresIntroModal');
      if (modal) {
        modal.classList.remove('hidden');
        var noShowCheckbox = document.getElementById('dontShowFeaturesAgain');
        if (noShowCheckbox) {
          noShowCheckbox.checked = localStorage.getItem('arizo_features_intro_dismissed') === 'true';
        }
      }
    };

    window.closeFeaturesModal = function() {
      var modal = document.getElementById('featuresIntroModal');
      if (modal) {
        modal.classList.add('hidden');
      }
      var noShowCheckbox = document.getElementById('dontShowFeaturesAgain');
      if (noShowCheckbox) {
        if (noShowCheckbox.checked) {
          localStorage.setItem('arizo_features_intro_dismissed', 'true');
        } else {
          localStorage.removeItem('arizo_features_intro_dismissed');
        }
      }
    };

    window.doRedeemExtend = async function() {
      var code = document.getElementById('extendCodeInput').value.trim().toUpperCase();
      if (!code) {
        showToast('کد لایسنس را وارد کنید', 'error');
        return;
      }
      try {
        var res = await fetch('/api/user/redeem', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ licenseCode: code })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('اشتراک Arizo Self شما تمدید گردید! 🎉', 'success');
          document.getElementById('extendCodeInput').value = '';
          closeSettingsModal();
          loadUserDashboard();
        } else {
          showToast(data.error || 'کد نامعتبر است', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    // =========================================================================
    // 💎 مدیریت شاخص اشتراک و مودال اختصاصی تمدید لایسنس (Subscription & License Modals)
    // =========================================================================
    window.openLicenseModal = function() {
      var modal = document.getElementById('licenseRenewalModal');
      if (modal) {
        modal.classList.remove('hidden');
        if (typeof window.translateDOM === 'function') {
          window.translateDOM(modal, window.currentLang || 'fa');
        }
        var input = document.getElementById('modalRenewCodeInput');
        if (input) {
          input.value = '';
          setTimeout(function() { input.focus(); }, 120);
        }
      }
    };

    window.closeLicenseModal = function() {
      var modal = document.getElementById('licenseRenewalModal');
      if (modal) modal.classList.add('hidden');
    };

    window.doModalRedeemLicense = async function() {
      var input = document.getElementById('modalRenewCodeInput');
      var code = input ? input.value.trim().toUpperCase() : '';
      var isEn = window.currentLang === 'en';
      if (!code) {
        showToast(isEn ? 'Please enter the license code' : 'لطفاً کد لایسنس را وارد نمایید', 'error');
        return;
      }
      var btn = document.getElementById('btnModalRedeem');
      var origContent = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳ ' + (isEn ? 'Verifying & Activating...' : 'درحال بررسی و فعال‌سازی...') + '</span>';
      }
      try {
        var res = await fetch('/api/user/redeem', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ licenseCode: code })
        });
        var data = await res.json();
        if (data.ok) {
          showToast(isEn ? 'Subscription successfully renewed! 🎉' : 'اشتراک کاربری شما با موفقیت تمدید و فعال گردید 🎉', 'success');
          closeLicenseModal();
          await loadUserDashboard();
        } else {
          showToast(data.error || (isEn ? 'Invalid or expired license code' : 'کد لایسنس نامعتبر یا منقضی شده است'), 'error');
        }
      } catch (e) {
        showToast(isEn ? 'Network connection error' : 'خطای ارتباط با سرور، لطفاً مجدداً تلاش فرمایید', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origContent;
        }
      }
    };

    window.updateSubscriptionUI = function(data) {
      if (!data) return;
      window.lastUserData = data;
      var isEn = window.currentLang === 'en';

      var isSuspended = !!(data.isSuspended || data.isExpired);
      var isLifetime = !!data.isLifetime;
      var rawDays = data.remainingDays;
      var days = isLifetime ? Infinity : (typeof rawDays === 'number' ? rawDays : (parseInt(rawDays, 10) || 0));

      var planName = data.planName || data.plan || (isEn ? 'Standard' : 'استاندارد');
      var isVip = /vip|ویژه|پرمیوم|پریمیوم|الماس/i.test(planName);
      var planIcon = isLifetime ? '♾️' : (isVip ? '💎' : '⭐');

      // ۱. به‌روزرسانی چیپ بالای سایت در ناوبار (#navUserPlanChip)
      var navChip = document.getElementById('navUserPlanChip');
      var navIcon = document.getElementById('navPlanIcon');
      var navName = document.getElementById('navPlanName');
      var navVal = document.getElementById('navPlanValidity');

      if (navChip) {
        navChip.classList.remove('hidden');
        if (navIcon) navIcon.textContent = planIcon;
        if (navName) navName.textContent = planName;
        if (navVal) {
          if (isSuspended) {
            navVal.textContent = isEn ? 'Expired 🔴' : 'منقضی شده 🔴';
            navVal.style.background = 'rgba(244, 63, 94, 0.15)';
            navVal.style.color = 'var(--accent-rose)';
            navVal.style.borderColor = 'var(--accent-rose-border)';
          } else if (isLifetime) {
            navVal.textContent = isEn ? 'Lifetime ♾️' : 'دائمی ♾️';
            navVal.style.background = 'rgba(16, 185, 129, 0.15)';
            navVal.style.color = 'var(--accent-green)';
            navVal.style.borderColor = 'var(--accent-green-border)';
          } else {
            navVal.textContent = isEn ? ('⏳ ' + days + 'd') : ('⏳ ' + days + ' روز');
            if (days <= 5) {
              navVal.style.background = 'rgba(245, 158, 11, 0.15)';
              navVal.style.color = 'var(--accent-amber)';
              navVal.style.borderColor = 'var(--accent-amber-border)';
            } else {
              navVal.style.background = 'rgba(16, 185, 129, 0.15)';
              navVal.style.color = 'var(--accent-green)';
              navVal.style.borderColor = 'var(--accent-green-border)';
            }
          }
        }
      }

      // ۲. به‌روزرسانی کارت شاخص اشتراک و اعتبار بالای داشبورد (#userTopSubscriptionBanner)
      var heroBanner = document.getElementById('userTopSubscriptionBanner');
      if (heroBanner) {
        heroBanner.classList.remove('hidden');

        var avatarEl = document.getElementById('subBannerAvatar');
        if (avatarEl) {
          var initial = (data.username || 'U').charAt(0).toUpperCase();
          avatarEl.textContent = initial;
        }

        var dotEl = document.getElementById('subBannerStatusDot');
        if (dotEl) {
          if (isSuspended) {
            dotEl.style.background = 'var(--accent-rose)';
            dotEl.style.boxShadow = '0 0 8px var(--accent-rose)';
          } else if (days <= 5) {
            dotEl.style.background = 'var(--accent-amber)';
            dotEl.style.boxShadow = '0 0 8px var(--accent-amber)';
          } else {
            dotEl.style.background = 'var(--accent-green)';
            dotEl.style.boxShadow = '0 0 8px var(--accent-green)';
          }
        }

        var unameEl = document.getElementById('subBannerUsername');
        if (unameEl) unameEl.textContent = data.username || (isEn ? 'User' : 'کاربر');

        var roleEl = document.getElementById('subBannerRoleBadge');
        if (roleEl) {
          if (data.isAdmin) {
            roleEl.textContent = isEn ? '👑 System Admin' : '👑 مدیر سیستم';
            roleEl.style.color = 'var(--accent-amber)';
            roleEl.style.background = 'rgba(245, 158, 11, 0.15)';
            roleEl.style.borderColor = 'var(--accent-amber-border)';
          } else {
            roleEl.textContent = isEn ? 'Official Member' : 'کاربر رسمی';
            roleEl.style.color = 'var(--text-dim)';
            roleEl.style.background = 'var(--bg-surface-hover)';
            roleEl.style.borderColor = 'var(--border-subtle)';
          }
        }

        var planIconEl = document.getElementById('subBannerPlanIcon');
        if (planIconEl) planIconEl.textContent = planIcon;

        var planNameEl = document.getElementById('subBannerPlanName');
        if (planNameEl) planNameEl.textContent = planName;

        var planStatusEl = document.getElementById('subBannerPlanStatus');
        if (planStatusEl) {
          if (isSuspended) {
            planStatusEl.textContent = isEn ? 'Expired 🔴' : 'منقضی شده 🔴';
            planStatusEl.style.color = 'var(--accent-rose)';
            planStatusEl.style.fontWeight = '700';
          } else {
            planStatusEl.textContent = isEn ? 'Active & Valid 🟢' : 'فعال و معتبر 🟢';
            planStatusEl.style.color = 'var(--accent-green)';
            planStatusEl.style.fontWeight = '700';
          }
        }

        var remTitleEl = document.getElementById('subBannerRemainingDaysText');
        if (remTitleEl) {
          if (isSuspended) {
            remTitleEl.textContent = isEn ? 'Subscription validity has ended' : 'اعتبار اشتراک به اتمام رسیده است';
          } else if (isLifetime) {
            remTitleEl.textContent = isEn ? 'Unlimited Lifetime Access ♾️' : 'اشتراک دائمی و نامحدود ♾️';
          } else {
            remTitleEl.textContent = isEn ? (days + ' days remaining until expiration') : (days + ' روز تا پایان اعتبار اشتراک');
          }
        }

        var expDateEl = document.getElementById('subBannerExpiryDateText');
        if (expDateEl) {
          if (isLifetime) {
            expDateEl.textContent = (isEn ? 'Expiration Date: ' : 'تاریخ پایان: ') + (isEn ? 'Never (Lifetime)' : 'نامحدود (دائمی)');
          } else if (data.subscriptionUntil) {
            var expDate = new Date(data.subscriptionUntil);
            var dateStr = '';
            if (!isNaN(expDate.getTime())) {
              try {
                if (isEn) {
                  dateStr = expDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                } else {
                  dateStr = expDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
                }
              } catch (_) {
                dateStr = expDate.toISOString().slice(0, 10);
              }
            } else {
              dateStr = '-';
            }
            expDateEl.textContent = (isEn ? 'Expiration Date: ' : 'تاریخ پایان: ') + dateStr;
          } else {
            expDateEl.textContent = (isEn ? 'Expiration Date: ' : 'تاریخ پایان: ') + '-';
          }
        }

        var progBar = document.getElementById('subBannerProgressBar');
        if (progBar) {
          var pct = 0;
          var barGrad = 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)';
          if (isSuspended) {
            pct = 0;
            barGrad = 'var(--accent-rose)';
            progBar.style.boxShadow = '0 0 10px rgba(244, 63, 94, 0.4)';
          } else if (isLifetime) {
            pct = 100;
            barGrad = 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)';
            progBar.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.5)';
          } else {
            pct = Math.min(100, Math.max(5, Math.round((days / 30) * 100)));
            if (days <= 3) {
              barGrad = 'linear-gradient(90deg, #ef4444 0%, #f43f5e 100%)';
              progBar.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.4)';
            } else if (days <= 7) {
              barGrad = 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)';
              progBar.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.4)';
            } else {
              barGrad = 'linear-gradient(90deg, #10b981 0%, #6366f1 100%)';
              progBar.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.4)';
            }
          }
          progBar.style.width = pct + '%';
          progBar.style.background = barGrad;
        }
      }
    };

    window.doUserRegister = async function() {
      var code = document.getElementById('regLicenseCode').value.trim().toUpperCase();
      var uname = document.getElementById('regUsername').value.trim();
      var pass = document.getElementById('regPassword').value;
      var passConf = document.getElementById('regPasswordConfirm').value;

      if (!uname || uname.length < 3) {
        showToast('نام کاربری باید حداقل ۳ کاراکتر باشد', 'error');
        return;
      }
      if (pass.length < 8) {
        showToast('رمز عبور باید حداقل ۸ کاراکتر باشد', 'error');
        return;
      }
      if (pass !== passConf) {
        showToast('تکرار رمز عبور تطابق ندارد', 'error');
        return;
      }

      var btn = document.getElementById('regBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> ایجاد حساب Arizo...';

      try {
        var res = await fetch('/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: uname, password: pass, licenseCode: code })
        });
        var data = await res.json();
        if (data.ok && data.token) {
          setAuthToken(data.token);
          showToast('حساب Arizo Self با موفقیت فعال شد ✨', 'success');
          await loadUserDashboard();
        } else {
          showToast(data.error || 'خطا در ثبت‌نام', 'error');
        }
      } catch (e) {
        showToast('خطای ارتباط با سرور', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>ثبت‌نام و فعال‌سازی اشتراک Arizo Self</span>';
      }
    };

    window.doUserLogin = async function() {
      var uname = document.getElementById('loginUsername').value.trim();
      var pass = document.getElementById('loginPassword').value;

      if (!uname || !pass) {
        showToast('نام کاربری و رمز عبور را وارد کنید', 'error');
        return;
      }

      var btn = document.getElementById('loginBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> ورود...';

      try {
        var res = await fetch('/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: uname, password: pass })
        });
        var data = await res.json();
        if (data.requires2FA) {
          btn.disabled = false;
          btn.innerHTML = '<span>ورود به داشبورد Arizo Self</span>';
          var code = prompt('حساب شما مجهز به تایید دو مرحله‌ای (2FA) است. لطفاً کد ۶ رقمی Google Authenticator یا کد بازیابی را وارد نمایید:');
          if (!code) {
            showToast('کد تایید دو مرحله‌ای وارد نشد', 'error');
            return;
          }
          btn.disabled = true;
          btn.innerHTML = '<span class="spinner"></span> بررسی کد ۲FA...';
          var res2 = await fetch('/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: uname, password: pass, totpCode: code.trim() })
          });
          var data2 = await res2.json();
          if (data2.ok && data2.token) {
            setAuthToken(data2.token);
            window.currentUserIsAdmin = !!data2.isAdmin;
            showToast('خوش آمدید! ورود دو مرحله‌ای موفقیت‌آمیز بود ✅', 'success');
            await loadUserDashboard();
            return;
          } else {
            showToast(data2.error || 'کد ۲FA نادرست است', 'error');
            return;
          }
        }
        if (data.ok && data.token) {
          setAuthToken(data.token);
          window.currentUserIsAdmin = !!data.isAdmin;
          showToast('خوش آمدید! ورود موفقیت‌آمیز بود ✅', 'success');
          await loadUserDashboard();
        } else {
          showToast(data.error || 'نام کاربری یا رمز نادرست است', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>ورود به داشبورد Arizo Self</span>';
      }
    };

    window.doChangePassword = async function() {
      var oldPass = document.getElementById('oldPassInput').value;
      var newPass = document.getElementById('newPassInput').value;
      if (!oldPass || !newPass) {
        showToast('لطفاً هر دو رمز را وارد کنید', 'error');
        return;
      }
      if (newPass.length < 8) {
        showToast('رمز جدید باید حداقل ۸ کاراکتر باشد', 'error');
        return;
      }

      try {
        var res = await fetch('/api/user/change-password', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('رمز عبور تغییر یافت 🔒', 'success');
          document.getElementById('oldPassInput').value = '';
          document.getElementById('newPassInput').value = '';
          closeSettingsModal();
        } else {
          showToast(data.error || 'خطا در تغییر رمز', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      }
    };

    window.toggleBotState = async function() {
      var btn = document.getElementById('toggleBotBtn');
      btn.disabled = true;
      try {
        var res = await fetch('/api/user/toggle-bot', { method: 'POST', headers: authHeaders() });
        var data = await res.json();
        if (data.ok) {
          isBotRunning = data.enabled;
          updateBotStatusUI(isBotRunning);
          showToast(isBotRunning ? 'سلف‌بات فعال شد 🟢' : 'سلف‌بات متوقف شد ⏸️', 'info');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      } finally {
        btn.disabled = false;
      }
    };

    function updateBotStatusUI(enabled, hasError) {
      var badge = document.getElementById('botStatusBadge');
      var toggleText = document.getElementById('toggleBotText');
      var isEn = window.currentLang === 'en';
      if (hasError) {
        badge.textContent = isEn ? '⚠️ Telegram Reconnect Required' : '⚠️ نیازمند اتصال مجدد تلگرام';
        badge.style.color = 'var(--accent-rose)';
        toggleText.textContent = isEn ? '▶️ Retry Selfbot' : '▶️ تلاش مجدد سلف‌بات';
      } else if (enabled) {
        badge.textContent = isEn ? '🟢 Active & Running 24/7' : '🟢 فعال و در حال اجرای خودکار';
        badge.style.color = 'var(--accent-green)';
        toggleText.textContent = isEn ? '⏸️ Pause Selfbot' : '⏸️ توقف موقت سلف‌بات';
      } else {
        badge.textContent = isEn ? '⏸️ Paused' : '⏸️ متوقف‌شده (Pause)';
        badge.style.color = 'var(--accent-amber)';
        toggleText.textContent = isEn ? '▶️ Resume Selfbot' : '▶️ فعال‌سازی مجدد سلف‌بات';
      }
    }

    window.showTelegramConnect = function() {
      document.getElementById('dashboardSection').classList.add('hidden');
      document.getElementById('telegramConnectSection').classList.remove('hidden');
      var btnCancel = document.getElementById('btnCancelTgConnect');
      if (btnCancel) btnCancel.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.cancelTelegramConnect = function() {
      document.getElementById('telegramConnectSection').classList.add('hidden');
      document.getElementById('dashboardSection').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.doDeleteAccount = async function() {
      var pass = prompt('جهت تأیید حذف دائم حساب Arizo، رمز عبور خود را وارد کنید:');
      if (!pass) return;

      try {
        var res = await fetch('/api/user/delete-account', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ password: pass })
        });
        var data = await res.json();
        if (data.ok) {
          alert('حساب شما پاکسازی شد.');
          setAuthToken('');
          location.reload();
        } else {
          showToast(data.error || 'خطا در حذف حساب', 'error');
        }
      } catch (e) {}
    };

    window.logoutUser = async function() {
      if (!confirm('آیا مایل به خروج از حساب کاربری Arizo هستید؟')) return;
      try { await fetch('/api/user/logout', { method: 'POST', headers: authHeaders() }); } catch (e) {}
      window.currentUserIsAdmin = false;
      setAuthToken('');
      location.reload();
    };

    // ==========================================
    // 📱 احراز هویت تلگرام
    // ==========================================
    window.doTelegramAuth = async function() {
      var btn = document.getElementById('tgAuthBtn');
      btn.disabled = true;

      try {
        if (tgStep === 'phone') {
          var rawPhone = document.getElementById('tgPhone').value.trim();
          if (!rawPhone) {
            showToast('شماره تلفن را وارد کنید', 'error');
            btn.disabled = false;
            return;
          }
          var cleanPhone = rawPhone.replace(/[^0-9+]/g, '');
          if (cleanPhone.startsWith('09')) cleanPhone = '+98' + cleanPhone.slice(1);
          else if (!cleanPhone.startsWith('+')) cleanPhone = '+' + cleanPhone;

          btn.innerHTML = '<span class="spinner"></span> ارسال کد به ' + cleanPhone + '...';

          var res = await fetch('/api/auth/send-code', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ phone: cleanPhone })
          });
          var data = await res.json();
          if (!res.ok || !data.ok) throw new Error(data.error || 'خطا در ارسال کد');

          document.getElementById('tgCodeGroup').classList.remove('hidden');
          btn.innerHTML = '<span>تأیید کد ارسالی تلگرام</span>';
          tgStep = 'code';
          btn.disabled = false;
          showToast('کد ۵ رقمی به تلگرام ارسال گردید ✅', 'success');

        } else if (tgStep === 'code') {
          var codeVal = document.getElementById('tgCode').value.trim().replace(/[^0-9a-zA-Z]/g, '');
          if (!codeVal) {
            showToast('کد را وارد کنید', 'error');
            btn.disabled = false;
            return;
          }

          btn.innerHTML = '<span class="spinner"></span> بررسی کد...';
          var res = await fetch('/api/auth/verify-code', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
              code: codeVal,
              digits: selectedDigits,
              colon: document.getElementById('colonInput').value || ':'
            })
          });
          var data = await res.json();
          if (!res.ok || !data.ok) throw new Error(data.error || 'کد نامعتبر است');

          if (data.needs2FA) {
            document.getElementById('tgPassGroup').classList.remove('hidden');
            btn.innerHTML = '<span>ورود با رمز دوعاملی</span>';
            tgStep = 'pass';
            btn.disabled = false;
            showToast('اکانت دارای تأیید دومرحله‌ای است 🔒', 'info');
          } else {
            showToast('تلگرام با موفقیت متصل شد! 🎉', 'success');
            await loadUserDashboard();
          }

        } else if (tgStep === 'pass') {
          var passVal = document.getElementById('tgPass').value.trim();
          if (!passVal) {
            showToast('رمز دوعاملی را وارد کنید', 'error');
            btn.disabled = false;
            return;
          }

          btn.innerHTML = '<span class="spinner"></span> اعتبارسنجی 2FA...';
          var res = await fetch('/api/auth/verify-password', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
              password: passVal,
              digits: selectedDigits,
              colon: document.getElementById('colonInput').value || ':'
            })
          });
          var data = await res.json();
          if (!res.ok || !data.ok) throw new Error(data.error || 'رمز اشتباه است');

          showToast('تلگرام متصل و سشن امن شد! 🎉', 'success');
          await loadUserDashboard();
        }
      } catch (e) {
        showToast('خطا: ' + e.message, 'error');
        btn.disabled = false;
        btn.innerHTML = '<span>تلاش مجدد</span>';
      }
    };

    window.doConnectDirectSession = async function() {
      var sessVal = document.getElementById('tgSessionInput').value.trim();
      if (!sessVal) {
        showToast('سشن را وارد کنید', 'error');
        return;
      }
      var btn = document.getElementById('tgSessBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> اتصال به سشن...';

      try {
        var res = await fetch('/api/connect', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({
            session: sessVal,
            digits: selectedDigits,
            colon: document.getElementById('colonInput').value || ':'
          })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('سشن مستقیم متصل شد! 🚀', 'success');
          await loadUserDashboard();
        } else {
          showToast(data.error || 'خطا در ثبت سشن', 'error');
        }
      } catch (e) {
        showToast('خطای شبکه', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>اتصال و رمزنگاری فوری با AES-256</span>';
      }
    };

    // ==========================================
    // 🎨 راه‌اندازی گرید پریست‌های فونت
    // ==========================================
    window.renderPresetCards = function() {
      var grid = document.getElementById('presetBtns');
      if (!grid) return;
      grid.innerHTML = '';
      for (var key in presets) {
        (function(k) {
          var val = presets[k];
          var card = document.createElement('div');
          card.className = 'preset-card' + (k === currentPresetKey ? ' active' : '');
          card.id = 'preset-' + k;
          var p1 = val.digits[1] || '1';
          var p2 = val.digits[2] || '2';
          var p4 = val.digits[4] || '4';
          var p5 = val.digits[5] || '5';
          var displayName = (window.currentLang === 'en' && val.nameEn) ? val.nameEn : val.name;
          var pDigits = (window.currentLang === 'en' && (k === 'persian' || k === 'arabic' || k === 'persianSup')) ? '12:45' : (p1 + p2 + ':' + p4 + p5);
          card.innerHTML = '<div class="preset-name">' + displayName + '</div><div class="preset-digits">' + pDigits + '</div>';
          card.onclick = function() { selectPreset(k); };
          grid.appendChild(card);
        })(key);
      }
    };
    window.renderPresetCards();

    function selectPreset(key, isQuiet) {
      if (!presets[key]) return;
      currentPresetKey = key;
      selectedDigits = presets[key].digits;
      var fontBadge = document.getElementById('userFontBadge');
      var displayName = (window.currentLang === 'en' && presets[key].nameEn) ? presets[key].nameEn : presets[key].name;
      if (fontBadge) fontBadge.textContent = (window.currentLang === 'en' ? 'Font: ' : 'فونت: ') + displayName;
      document.querySelectorAll('.preset-card').forEach(function(c) { c.classList.remove('active'); });
      var activeCard = document.getElementById('preset-' + key);
      if (activeCard) activeCard.classList.add('active');
      document.getElementById('customDigits').value = '';
      updateLiveClock();

      if (!isQuiet) {
        window.isStudioDirty = true;
        // ذخیره آنی و قطعی فونت انتخاب شده جهت تضمین پایداری و عدم بازگشت به فونت قبلی
        window.saveFonts();
      }
    }

    // ==========================================
    // 🎨 کنترل تب‌های استودیوی شخصی‌سازی و ناوبری هوشمند
    // ==========================================
    var STUDIO_TABS = [
      { id: 'clock', btn: 'studioTabClock', pane: 'studioPaneClock', title: 'ساعت و استایل', titleEn: 'Clock & Style', icon: '🕒' },
      { id: 'bio', btn: 'studioTabBio', pane: 'studioPaneBio', title: 'بیوگرافی زنده', titleEn: 'Dynamic Bio', icon: '📝' },
      { id: 'afk', btn: 'studioTabAfk', pane: 'studioPaneAfk', title: 'منشی خودکار', titleEn: 'Auto-Secretary', icon: '🤖' },
      { id: 'mute', btn: 'studioTabMute', pane: 'studioPaneMute', title: 'فیلتر سکوت', titleEn: 'Silence Filter', icon: '🔇' },
      { id: 'automation', btn: 'studioTabAutomation', pane: 'studioPaneAutomation', title: 'حالت خواب', titleEn: 'Sleep Schedule', icon: '🌙' },
      { id: 'bot', btn: 'studioTabBot', pane: 'studioPaneBot', title: 'ربات و لاگر', titleEn: 'Bot & Logger', icon: '⚡' },
      { id: 'ghost', btn: 'studioTabGhost', pane: 'studioPaneGhost', title: 'حالت شبح', titleEn: 'Ghost Mode', icon: '👻' },
      { id: 'ai', btn: 'studioTabAI', pane: 'studioPaneAI', title: 'پاسخ هوشمند AI', titleEn: 'Smart AI Reply', icon: '🤖' },
      { id: 'security', btn: 'studioTabSecurity', pane: 'studioPaneSecurity', title: 'امنیت و ۲FA', titleEn: 'Security & 2FA', icon: '🔐' }
    ];

    var currentStudioTabIndex = 0;

    window.initStudioNavDots = function() {
      var container = document.getElementById('studioNavDots');
      if (!container) return;
      container.innerHTML = '';
      STUDIO_TABS.forEach(function(item, idx) {
        var dot = document.createElement('div');
        dot.className = 'studio-nav-dot' + (idx === currentStudioTabIndex ? ' active' : '');
        dot.title = item.icon + ' ' + item.title;
        dot.onclick = function() {
          window.switchStudioTab(item.id, false);
        };
        container.appendChild(dot);
      });
    };

    window.switchStudioTab = function(tab, shouldScroll) {
      var index = STUDIO_TABS.findIndex(function(t) { return t.id === tab; });
      if (index === -1) index = 0;
      currentStudioTabIndex = index;

      STUDIO_TABS.forEach(function(item, idx) {
        var btn = document.getElementById(item.btn);
        var pane = document.getElementById(item.pane);
        var isActive = idx === index;
        if (btn) {
          btn.classList.toggle('active', isActive);
          if (isActive) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
        if (pane) {
          pane.classList.toggle('hidden', !isActive);
          if (isActive) window.translateDOM(pane, window.currentLang);
        }
      });

      // به‌روزرسانی نوار پیمایش پایینی
      var prevBtn = document.getElementById('studioNavPrev');
      var nextBtn = document.getElementById('studioNavNext');
      var prevTitle = document.getElementById('studioNavPrevTitle');
      var nextTitle = document.getElementById('studioNavNextTitle');
      var currentTitle = document.getElementById('studioNavCurrentTitle');
      var currentStep = document.getElementById('studioNavCurrentStep');

      var curT = (window.currentLang === 'en' && STUDIO_TABS[index].titleEn) ? STUDIO_TABS[index].titleEn : STUDIO_TABS[index].title;
      if (currentTitle) currentTitle.textContent = STUDIO_TABS[index].icon + ' ' + curT;
      if (currentStep) currentStep.textContent = String(index + 1);

      if (prevBtn && prevTitle) {
        if (index > 0) {
          prevBtn.disabled = false;
          var prevT = (window.currentLang === 'en' && STUDIO_TABS[index - 1].titleEn) ? STUDIO_TABS[index - 1].titleEn : STUDIO_TABS[index - 1].title;
          prevTitle.textContent = prevT;
        } else {
          prevBtn.disabled = true;
          prevTitle.textContent = window.currentLang === 'en' ? 'Start of Studio' : 'ابتدای استودیو';
        }
      }

      if (nextBtn && nextTitle) {
        if (index < STUDIO_TABS.length - 1) {
          nextBtn.disabled = false;
          var nextT = (window.currentLang === 'en' && STUDIO_TABS[index + 1].titleEn) ? STUDIO_TABS[index + 1].titleEn : STUDIO_TABS[index + 1].title;
          nextTitle.textContent = nextT;
        } else {
          nextBtn.disabled = true;
          nextTitle.textContent = window.currentLang === 'en' ? 'End of Studio' : 'پایان استودیو';
        }
      }

      // هایلایت دات‌ها
      var dots = document.querySelectorAll('.studio-nav-dot');
      if (dots && dots.length > 0) {
        dots.forEach(function(dot, idx) {
          dot.classList.toggle('active', idx === index);
        });
      } else {
        window.initStudioNavDots();
      }

      if (shouldScroll) {
        var bar = document.querySelector('.studio-tab-bar');
        if (bar) {
          bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };

    window.navigateStudioStep = function(step) {
      var newIndex = currentStudioTabIndex + step;
      if (newIndex >= 0 && newIndex < STUDIO_TABS.length) {
        window.switchStudioTab(STUDIO_TABS[newIndex].id, false);
      }
    };

    window.insertBioVar = function(tag) {
      var input = document.getElementById('bioTemplateInput');
      if (!input) return;
      var val = input.value;
      var start = input.selectionStart !== undefined ? input.selectionStart : val.length;
      var end = input.selectionEnd !== undefined ? input.selectionEnd : val.length;
      input.value = val.substring(0, start) + tag + val.substring(end);
      input.focus();
      input.selectionStart = input.selectionEnd = start + tag.length;
      updateLiveClock();
    };

    window.applyBioTemplate = function(template) {
      var input = document.getElementById('bioTemplateInput');
      var toggle = document.getElementById('bioEnabledToggle');
      if (input) input.value = template;
      if (toggle) toggle.checked = true;
      updateLiveClock();
      showToast('قالب بیوگرافی انتخاب و اعمال شد ✨', 'success');
    };

    function isClientSleepTime(startHour, endHour, currentHour) {
      startHour = parseInt(startHour, 10);
      endHour = parseInt(endHour, 10);
      currentHour = parseInt(currentHour, 10);
      if (isNaN(startHour) || isNaN(endHour) || isNaN(currentHour)) return false;
      if (startHour === endHour) return false;
      if (startHour < endHour) {
        return currentHour >= startHour && currentHour < endHour;
      } else {
        return currentHour >= startHour || currentHour < endHour;
      }
    }

    var tehranPersianDateFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    var tehranPersianShortDateFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran', day: 'numeric', month: 'long'
    });
    var tehranPersianWeekdayFmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      timeZone: 'Asia/Tehran', weekday: 'long'
    });

    var tehranGregorianDateFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran', weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    var tehranGregorianShortDateFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran', month: 'short', day: 'numeric'
    });
    var tehranGregorianWeekdayFmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tehran', weekday: 'long'
    });

    function updateLiveClock() {
      try {
        var now = Date.now();
        var tehranDate = new Date(now + 12600000);
        var rawH = tehranDate.getUTCHours();
        var rawM = tehranDate.getUTCMinutes();
        var ss = String(tehranDate.getUTCSeconds()).padStart(2, '0');

        var is12h = document.getElementById('toggle12h') ? document.getElementById('toggle12h').checked : false;
        var prefix = (document.getElementById('prefixInput') && document.getElementById('prefixInput').value) || '';
        var suffix = (document.getElementById('suffixInput') && document.getElementById('suffixInput').value) || '';
        var colon = (document.getElementById('colonInput') && document.getElementById('colonInput').value) || ':';
        var sleepEnabled = document.getElementById('sleepEnabledToggle') ? document.getElementById('sleepEnabledToggle').checked : false;
        var sleepStart = document.getElementById('sleepStartSelect') ? document.getElementById('sleepStartSelect').value : 23;
        var sleepEnd = document.getElementById('sleepEndSelect') ? document.getElementById('sleepEndSelect').value : 7;
        var sleepText = (document.getElementById('sleepTextInput') && document.getElementById('sleepTextInput').value) || '😴 Sleep';

        var isSleeping = sleepEnabled && isClientSleepTime(sleepStart, sleepEnd, rawH);

        var displayH = rawH;
        var ampm = '';
        if (is12h) {
          var isPM = rawH >= 12;
          displayH = rawH % 12;
          if (displayH === 0) displayH = 12;
          ampm = isPM ? ' ᴾᴹ' : ' ᴬᴹ';
        }

        var hhStr = String(displayH).padStart(2, '0');
        var mmStr = String(rawM).padStart(2, '0');

        var d = selectedDigits || ['0','1','2','3','4','5','6','7','8','9'];
        var stylH = hhStr.split('').map(function(x) { return d[+x] || x; }).join('');
        var stylM = mmStr.split('').map(function(x) { return d[+x] || x; }).join('');
        var stylS = ss.split('').map(function(x) { return d[+x] || x; }).join('');

        var clockOnly = stylH + colon + stylM + ampm;
        var fullLastName = isSleeping ? sleepText : (prefix + clockOnly + suffix);

        var previewEl = document.getElementById('clockPreview');
        if (previewEl) previewEl.textContent = clockOnly;

        var secEl = document.getElementById('secondsPulse');
        if (secEl) secEl.textContent = ':' + stylS;

        var mockupLastNameEl = document.getElementById('mockupLastName');
        if (mockupLastNameEl) {
          mockupLastNameEl.textContent = fullLastName;
          if (isSleeping) {
            mockupLastNameEl.style.color = 'var(--accent-amber)';
            mockupLastNameEl.style.webkitTextFillColor = 'var(--accent-amber)';
          } else {
            mockupLastNameEl.style.color = '';
            mockupLastNameEl.style.webkitTextFillColor = 'transparent';
          }
        }

        var dateEl = document.getElementById('persianDateText');
        if (dateEl) {
          if (window.currentLang === 'en') {
            dateEl.textContent = tehranGregorianDateFmt.format(new Date(now)) + ' (Tehran Time)';
          } else {
            dateEl.textContent = tehranPersianDateFmt.format(new Date(now));
          }
        }

        var bioEnabled = document.getElementById('bioEnabledToggle') ? document.getElementById('bioEnabledToggle').checked : false;
        var bioTemplate = (document.getElementById('bioTemplateInput') && document.getElementById('bioTemplateInput').value) || '';
        var mockupBioEl = document.getElementById('mockupBio');
        if (mockupBioEl) {
          if (bioEnabled && bioTemplate) {
            var isEn = window.currentLang === 'en';
            var shortDate = isEn ? tehranGregorianShortDateFmt.format(new Date(now)) : tehranPersianShortDateFmt.format(new Date(now));
            var weekday = isEn ? tehranGregorianWeekdayFmt.format(new Date(now)) : tehranPersianWeekdayFmt.format(new Date(now));
            var renderedBio = bioTemplate
              .replace(/{time}/g, clockOnly)
              .replace(/{clock}/g, clockOnly)
              .replace(/{date}/g, shortDate)
              .replace(/{day}/g, weekday);
            if (renderedBio.length > 70) renderedBio = renderedBio.slice(0, 70);
            mockupBioEl.textContent = renderedBio;
            mockupBioEl.style.color = 'var(--text-main)';
          } else {
            mockupBioEl.textContent = (window.currentLang === 'en' ? 'Live Bio Disabled (Simple / Default)' : 'بیوگرافی زنده غیرفعال است (ساده / پیش‌فرض)');
            mockupBioEl.style.color = 'var(--text-muted)';
          }
        }
      } catch (err) {}
    }
    setInterval(updateLiveClock, 1000);
    updateLiveClock();

    var customDigitsDebounce = null;
    document.getElementById('customDigits').addEventListener('input', function(e) {
      var chars = Array.from(e.target.value.trim());
      if (chars.length >= 10) {
        selectedDigits = chars.slice(0, 10);
        document.querySelectorAll('.preset-card').forEach(function(c) { c.classList.remove('active'); });
        updateLiveClock();
        window.isStudioDirty = true;
        clearTimeout(customDigitsDebounce);
        customDigitsDebounce = setTimeout(function() {
          window.saveFonts();
        }, 800);
      }
    });

    document.getElementById('colonInput').addEventListener('input', function(e) {
      var val = e.target.value;
      document.querySelectorAll('.sep-pill').forEach(function(c) {
        c.classList.toggle('active', c.textContent.trim() === val);
      });
      updateLiveClock();
      window.isStudioDirty = true;
    });
    document.getElementById('colonInput').addEventListener('change', function() {
      window.saveFonts();
    });

    window.saveFonts = async function() {
      var btn = document.getElementById('saveBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> ذخیره درحال انجام...';

      var rawMutedUsers = (document.getElementById('mutedUsersInput') && document.getElementById('mutedUsersInput').value) || '';
      var hasMutedUsers = rawMutedUsers.trim().length > 0;
      var muteToggleChecked = document.getElementById('muteEnabledToggle') ? document.getElementById('muteEnabledToggle').checked : false;

      var payload = {
        digits: selectedDigits,
          colon: (document.getElementById('colonInput') && document.getElementById('colonInput').value) || ':',
          prefix: (document.getElementById('prefixInput') && document.getElementById('prefixInput').value) || '',
          suffix: (document.getElementById('suffixInput') && document.getElementById('suffixInput').value) || '',
          is12h: document.getElementById('toggle12h') ? document.getElementById('toggle12h').checked : false,
          bioEnabled: document.getElementById('bioEnabledToggle') ? document.getElementById('bioEnabledToggle').checked : false,
          bioTemplate: (document.getElementById('bioTemplateInput') && document.getElementById('bioTemplateInput').value) || '',
          sleepEnabled: document.getElementById('sleepEnabledToggle') ? document.getElementById('sleepEnabledToggle').checked : false,
          sleepStart: document.getElementById('sleepStartSelect') ? parseInt(document.getElementById('sleepStartSelect').value, 10) : 23,
          sleepEnd: document.getElementById('sleepEndSelect') ? parseInt(document.getElementById('sleepEndSelect').value, 10) : 7,
          sleepText: (document.getElementById('sleepTextInput') && document.getElementById('sleepTextInput').value) || '😴 Sleep',
          afkEnabled: document.getElementById('afkEnabledToggle') ? document.getElementById('afkEnabledToggle').checked : false,
          afkMessage: (document.getElementById('afkMessageInput') && document.getElementById('afkMessageInput').value) || '',
          afkCooldown: document.getElementById('afkCooldownSelect') ? parseInt(document.getElementById('afkCooldownSelect').value, 10) : 10,
          muteEnabled: hasMutedUsers ? true : muteToggleChecked,
          mutedUsers: rawMutedUsers,
          antiTtlEnabled: document.getElementById('botForwardTtlToggle') ? document.getElementById('botForwardTtlToggle').checked : true,
          // 👻 Ghost Mode
          ghostMode: document.getElementById('ghostModeToggle') ? document.getElementById('ghostModeToggle').checked : false,
          ghostExcludeList: (document.getElementById('ghostExcludeInput') && document.getElementById('ghostExcludeInput').value) || '',
          // 🤖 AI Smart Reply
          aiReplyEnabled: document.getElementById('aiReplyToggle') ? document.getElementById('aiReplyToggle').checked : false,
          aiProvider: document.getElementById('aiProviderSelect') ? document.getElementById('aiProviderSelect').value : 'gemini',
          aiModel: (function() {
            var sel = document.getElementById('aiModelSelect');
            var customInp = document.getElementById('aiCustomModelInput');
            if (sel && sel.value === 'custom' && customInp && customInp.value.trim()) {
              return customInp.value.trim();
            }
            if (sel && sel.value && sel.value !== 'custom') {
              return sel.value.trim();
            }
            return (customInp && customInp.value.trim()) || 'gemini-2.5-flash';
          })(),
          aiApiKey: (document.getElementById('aiApiKeyInput') && document.getElementById('aiApiKeyInput').value.trim()) || '',
          aiSystemPrompt: (document.getElementById('aiSystemPromptInput') && document.getElementById('aiSystemPromptInput').value) || '',
          aiContext: (document.getElementById('aiContextInput') && document.getElementById('aiContextInput').value) || '',
          aiMaxReplies: document.getElementById('aiMaxRepliesSelect') ? parseInt(document.getElementById('aiMaxRepliesSelect').value, 10) : 3,
          aiCooldown: document.getElementById('aiCooldownSelect') ? parseInt(document.getElementById('aiCooldownSelect').value, 10) : 5,
          aiIgnoredUsers: (document.getElementById('aiIgnoredUsersInput') && document.getElementById('aiIgnoredUsersInput').value) || '',
          bot: {
            token: (document.getElementById('botTokenInput') && document.getElementById('botTokenInput').value.trim()) || (window.currentBotToken || ''),
            antiDeleteEnabled: document.getElementById('botAntiDeleteToggle') ? document.getElementById('botAntiDeleteToggle').checked : true,
            antiEditEnabled: document.getElementById('botAntiEditToggle') ? document.getElementById('botAntiEditToggle').checked : true,
            forwardTtlToBot: document.getElementById('botForwardTtlToggle') ? document.getElementById('botForwardTtlToggle').checked : true
          }
        };

      try {
        var res = await fetch('/api/fonts', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          window.isStudioDirty = false;
          showToast('تنظیمات استودیو Arizo ذخیره و آنی اعمال شد ✨', 'success');
        } else {
          var errData = await res.json().catch(function() { return {}; });
          showToast(errData.error || 'خطا در ذخیره‌سازی', 'error');
        }
      } catch (err) {
        showToast('خطای شبکه', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>💾 ذخیره و اعمال تغییرات استودیو</span>';
        }
      }
    };

    window.doVerifyBotToken = async function() {
      var inp = document.getElementById('botTokenInput');
      var token = inp ? inp.value.trim() : '';
      if (!token) {
        showToast('لطفاً توکن ربات دریافتی از BotFather@ را وارد کنید', 'error');
        return;
      }

      var btn = document.getElementById('btnVerifyBot');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> بررسی و اتصال به تلگرام...';

      try {
        var res = await fetch('/api/telegram/verify-bot-token', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ token: token })
        });
        var data = await res.json();
        if (data.ok && data.bot) {
          if (data.bot.token) window.currentBotToken = data.bot.token;
          showToast('ربات @' + data.bot.username + ' با موفقیت متصل شد! 🎉', 'success');
          await loadUserDashboard();
        } else {
          showToast(data.error || 'خطا در اعتبارسنجی توکن', 'error');
        }
      } catch (err) {
        showToast('خطای شبکه', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>⚡ اتصال و فعال‌سازی وب‌هوک</span>';
        }
      }
    };

    window.doDisconnectBotToken = async function() {
      if (!confirm('آیا از قطع اتصال ربات تلگرام اطمینان دارید؟ تمام وب‌هوک‌ها و دسترسی‌های مینی‌اپ لغو شده و حافظه کلادفلر فوراً آزاد می‌گردد.')) {
        return;
      }

      var btn = document.getElementById('btnDisconnectBot');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> درحال قطع اتصال...';
      }

      try {
        var res = await fetch('/api/telegram/disconnect-bot', {
          method: 'POST',
          headers: authHeaders()
        });
        var data = await res.json();
        if (data.ok) {
          window.currentBotToken = '';
          showToast('اتصال ربات با موفقیت قطع شد و حافظه کلادفلر پاکسازی گردید ✨', 'success');
          var card = document.getElementById('botInfoCard');
          if (card) card.classList.add('hidden');
          var tokenInp = document.getElementById('botTokenInput');
          if (tokenInp) tokenInp.value = '';
          await loadUserDashboard();
        } else {
          showToast(data.error || 'خطا در قطع اتصال ربات', 'error');
        }
      } catch (err) {
        showToast('خطای شبکه در ارتباط با سرور', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>🔌 قطع اتصال ربات</span>';
        }
      }
    };

    window.promptSetBotOwnerId = async function() {
      var currentId = '';
      var lockEl = document.getElementById('botOwnerIdDisplay');
      if (lockEl && lockEl.textContent) {
        var m = lockEl.textContent.match(/\d{5,15}/);
        if (m) currentId = m[0];
      }
      var id = prompt('شناسه عددی اکانت تلگرام خود را وارد کنید (فقط این شناسه اجازه ارسال دستور به ربات را خواهد داشت):', currentId);
      if (id === null) return;
      var cleanId = id.trim();
      if (!cleanId || !/^\d{5,15}$/.test(cleanId)) {
        showToast('شناسه عددی تلگرام باید شامل ۵ تا ۱۵ رقم باشد', 'error');
        return;
      }
      try {
        var res = await fetch('/api/telegram/lock-owner-id', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ ownerId: cleanId })
        });
        var data = await res.json();
        if (data.ok) {
          showToast('ربات با موفقیت روی شناسه ' + cleanId + ' قفل شد! 🔒', 'success');
          await loadUserDashboard();
        } else {
          showToast(data.error || 'خطا در ثبت شناسه مالک', 'error');
        }
      } catch (err) {
        showToast('خطای شبکه در ارتباط با سرور', 'error');
      }
    };

    // ذخیره آنی و خودکار تغییر وضعیت سوئیچ‌های استودیو (نجات مدیا، منشی، سکوت، بیوگرافی، خواب و ربات)
    ['afkEnabledToggle', 'muteEnabledToggle', 'bioEnabledToggle', 'sleepEnabledToggle', 'toggle12h', 'botAntiDeleteToggle', 'botAntiEditToggle', 'botForwardTtlToggle', 'ghostModeToggle', 'aiReplyToggle'].forEach(function(toggleId) {
      var el = document.getElementById(toggleId);
      if (el) {
        el.addEventListener('change', function() {
          window.saveFonts();
        });
      }
    });

    // کنترل پویای نمایش دکمه تست سلامت بر اساس پر یا خالی بودن کادر API Key
    window.updateAiTestBtnVisibility = function() {
      var keyInp = document.getElementById('aiApiKeyInput');
      var testBtn = document.getElementById('btnTestAiKey');
      if (!keyInp || !testBtn) return;
      var hasVal = keyInp.value && keyInp.value.trim().length > 0;
      testBtn.style.display = hasVal ? 'inline-flex' : 'none';
      if (!hasVal) {
        var resBox = document.getElementById('aiTestResultBox');
        if (resBox) resBox.style.display = 'none';
      }
    };

    var keyInputEl = document.getElementById('aiApiKeyInput');
    if (keyInputEl) {
      keyInputEl.addEventListener('input', function() {
        window.isStudioDirty = true;
        window.updateAiTestBtnVisibility();
      });
      keyInputEl.addEventListener('change', function() {
        window.isStudioDirty = true;
        window.updateAiTestBtnVisibility();
      });
      keyInputEl.addEventListener('paste', function() {
        setTimeout(window.updateAiTestBtnVisibility, 50);
      });
    }

    // عملکرد دکمه تست سلامت و بررسی ۱۰۰٪ صحت کلید API
    window.doTestAiKey = async function() {
      var keyInp = document.getElementById('aiApiKeyInput');
      var testBtn = document.getElementById('btnTestAiKey');
      var btnText = document.getElementById('btnTestAiKeyText');
      var btnIcon = document.getElementById('btnTestAiKeyIcon');
      var resBox = document.getElementById('aiTestResultBox');
      var isEn = (window.currentLang === 'en');

      if (!keyInp) return;
      var key = keyInp.value.trim();
      if (!key) {
        showToast(isEn ? 'Please enter an API Key first' : 'لطفاً ابتدا کلید API خود را وارد فرمایید', 'warning');
        return;
      }

      var provEl = document.getElementById('aiProviderSelect');
      var modelEl = document.getElementById('aiModelSelect');
      var customModelEl = document.getElementById('aiCustomModelInput');

      var provider = provEl ? provEl.value : 'gemini';
      var model = '';
      if (modelEl) {
        model = (modelEl.value === 'custom' && customModelEl) ? customModelEl.value.trim() : modelEl.value;
      }

      testBtn.disabled = true;
      testBtn.style.opacity = '0.75';
      if (btnIcon) btnIcon.textContent = '⏳';
      if (btnText) btnText.textContent = isEn ? 'Testing API...' : 'در حال بررسی سلامت API...';

      if (resBox) {
        resBox.style.display = 'block';
        resBox.style.background = 'var(--bg-surface-elevated)';
        resBox.style.border = '1px solid var(--border-subtle)';
        resBox.style.color = 'var(--text-main)';
        resBox.innerHTML = '<div style="display:flex; align-items:center; gap:8px;">' +
          '<span class="dot-pulse"></span>' +
          '<span>' + (isEn ? 'Sending test prompt to AI server & measuring latency...' : 'در حال ارسال پرامپت تستی به سرور هوش مصنوعی و سنجش پاسخگویی...') + '</span>' +
          '</div>';
      }

      try {
        var hdrs = (typeof adminHeaders === 'function') ? adminHeaders() : ((typeof authHeaders === 'function') ? authHeaders() : { 'Content-Type': 'application/json' });
        var res = await fetch('/api/user/test-ai', {
          method: 'POST',
          headers: hdrs,
          body: JSON.stringify({ apiKey: key, provider: provider, model: model })
        });
        var data = await res.json().catch(function() { return {}; });

        if (res.ok && data.ok) {
          if (resBox) {
            resBox.style.background = 'rgba(16, 185, 129, 0.12)';
            resBox.style.border = '1px solid var(--accent-green-border)';
            resBox.style.color = 'var(--text-main)';
            resBox.innerHTML =
              '<div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; margin-bottom:6px;">' +
                '<div style="font-weight:800; color:var(--accent-green); display:flex; align-items:center; gap:6px;">' +
                  '<span>✅</span> <span>' + (isEn ? 'AI API is 100% Healthy & Operational!' : 'اتصال هوش مصنوعی ۱۰۰٪ سالم و آماده به کار است!') + '</span>' +
                '</div>' +
                '<span style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(16, 185, 129, 0.2); color:var(--accent-green); padding:2px 8px; border-radius:6px; font-weight:700;">' +
                  '⚡ ' + data.latency + ' ms' +
                '</span>' +
              '</div>' +
              '<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:6px;">' +
                '🤖 <b>' + (isEn ? 'Model Verified:' : 'مدل تأیید شده:') + '</b> <code>' + (data.model || model) + '</code>' +
                ' &nbsp;|&nbsp; 🌐 <b>' + (isEn ? 'Provider:' : 'سرویس‌دهنده:') + '</b> ' + (data.provider || provider).toUpperCase() +
              '</div>' +
              (data.sample ? (
                '<div style="background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:6px; padding:8px 10px; font-size:0.76rem; color:var(--text-main); margin-top:6px;">' +
                  '💬 <b>' + (isEn ? 'Sample Test Response:' : 'نمونه پاسخ دریافتی:') + '</b> ' + data.sample +
                '</div>'
              ) : '');
          }
          showToast(isEn ? 'API Key verified successfully! 100% operational' : 'کلید API با موفقیت تأیید شد! ۱۰۰٪ سالم و فعال است', 'success');
        } else {
          var errMsg = isEn ? (data.errorEn || data.error || 'API test failed') : (data.error || 'خطا در برقراری ارتباط با API');
          if (resBox) {
            resBox.style.background = 'var(--accent-rose-bg)';
            resBox.style.border = '1px solid var(--accent-rose-border)';
            resBox.style.color = 'var(--text-main)';
            resBox.innerHTML =
              '<div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; margin-bottom:6px;">' +
                '<div style="font-weight:800; color:var(--accent-rose); display:flex; align-items:center; gap:6px;">' +
                  '<span>❌</span> <span>' + (isEn ? 'API Verification Failed' : 'خطا در بررسی سلامت API') + '</span>' +
                '</div>' +
                (data.latency ? (
                  '<span style="font-family:var(--font-mono); font-size:0.75rem; background:rgba(244, 63, 94, 0.2); color:var(--accent-rose); padding:2px 8px; border-radius:6px;">' +
                    data.latency + ' ms' +
                  '</span>'
                ) : '') +
              '</div>' +
              '<div style="font-size:0.8rem; color:var(--accent-rose); line-height:1.6;">' +
                errMsg +
              '</div>' +
              (data.rawError ? (
                '<div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); margin-top:6px; word-break:break-all;">' +
                  'Details: ' + data.rawError +
                '</div>'
              ) : '');
          }
          showToast(errMsg, 'error');
        }
      } catch (e) {
        if (resBox) {
          resBox.style.background = 'var(--accent-rose-bg)';
          resBox.style.border = '1px solid var(--accent-rose-border)';
          resBox.style.color = 'var(--text-main)';
          resBox.innerHTML = '<div style="color:var(--accent-rose); font-weight:700;">❌ ' + (isEn ? 'Connection timeout or network error' : 'خطای شبکه یا عدم پاسخگویی سرور') + '</div>';
        }
        showToast(isEn ? 'Network error during API test' : 'خطای شبکه در حین آزمایش API', 'error');
      } finally {
        testBtn.disabled = false;
        testBtn.style.opacity = '1';
        if (btnIcon) btnIcon.textContent = '⚡';
        if (btnText) btnText.textContent = isEn ? 'Test API Health' : 'تست سلامت API';
      }
    };

    var btnTestEl = document.getElementById('btnTestAiKey');
    if (btnTestEl) {
      btnTestEl.addEventListener('click', window.doTestAiKey);
    }

    // دکمه حذف کامل و ریشه‌ای کلید API هوش مصنوعی
    var btnDelAi = document.getElementById('btnDeleteAiKey');
    if (btnDelAi) {
      btnDelAi.onclick = function() {
        var keyInp = document.getElementById('aiApiKeyInput');
        if (keyInp) keyInp.value = '';
        var aiTgl = document.getElementById('aiReplyToggle');
        if (aiTgl) aiTgl.checked = false;
        window.isStudioDirty = true;
        window.saveFonts();
        if (window.updateAiTestBtnVisibility) window.updateAiTestBtnVisibility();
        showToast('🗑️ کلید API هوش مصنوعی به طور کامل پاکسازی شد و تداخل برطرف گردید!', 'success');
      };
    }

    // دکمه نمایش یا مخفی‌سازی محتوای کلید API
    var btnToggleKey = document.getElementById('btnToggleAiKeyVisibility');
    if (btnToggleKey) {
      btnToggleKey.onclick = function() {
        var keyInp = document.getElementById('aiApiKeyInput');
        if (!keyInp) return;
        if (keyInp.type === 'password') {
          keyInp.type = 'text';
          btnToggleKey.textContent = '🔒';
        } else {
          keyInp.type = 'password';
          btnToggleKey.textContent = '👁️';
        }
      };
    }

    // ==========================================
    // 🚫 مدیریت تعاملی چیپ‌های کاربران مستثنی از AI (Interactive AI Ignore List)
    // ==========================================
    window.aiIgnoredList = [];

    // تجزیه مقدار رشته‌ای یا آرایه‌ای به لیست تمیز
    window.parseAiIgnoredUsers = function(raw) {
      if (!raw) return [];
      var arr = [];
      if (Array.isArray(raw)) {
        arr = raw;
      } else if (typeof raw === 'string') {
        arr = raw.split(new RegExp('[,;،\\\\s\\\\r\\\\n]+'));
      }
      var seen = {};
      var res = [];
      for (var i = 0; i < arr.length; i++) {
        var item = String(arr[i] || '').trim();
        if (!item) continue;
        // تبدیل ارقام فارسی و عربی به انگلیسی
        item = item.replace(/[۰-۹]/g, function(d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
                   .replace(/[٠-٩]/g, function(d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
        var cleanKey = item.toLowerCase();
        if (cleanKey.startsWith('@')) cleanKey = cleanKey.slice(1);
        if (!seen[cleanKey]) {
          seen[cleanKey] = true;
          if (/^\\d+$/.test(item)) {
            res.push(item);
          } else {
            res.push(item.startsWith('@') ? item : ('@' + item));
          }
        }
      }
      return res;
    };

    // به‌روزرسانی مقدار فیلد همگام‌ساز مخفی و شمارنده‌ها
    window.syncAiIgnoredHiddenInput = function() {
      var hiddenInp = document.getElementById('aiIgnoredUsersInput');
      if (hiddenInp) {
        hiddenInp.value = window.aiIgnoredList.join(', ');
      }
      var countBadge = document.getElementById('aiIgnoredCountBadge');
      var bulkBox = document.getElementById('aiIgnoredBulkActions');
      var emptyBox = document.getElementById('aiIgnoredEmptyState');
      var chipsContainer = document.getElementById('aiIgnoredChipsContainer');
      var isEn = (window.currentLang === 'en');

      var count = window.aiIgnoredList.length;
      if (countBadge) {
        if (count > 0) {
          countBadge.textContent = isEn
            ? (count + ' user' + (count === 1 ? '' : 's'))
            : (count + ' کاربر مستثنی');
          countBadge.style.background = 'rgba(244, 63, 94, 0.12)';
          countBadge.style.color = 'var(--accent-rose)';
          countBadge.style.borderColor = 'var(--accent-rose-border)';
        } else {
          countBadge.textContent = isEn ? 'All Contacts Allowed' : 'تمام مخاطبان مجاز';
          countBadge.style.background = 'rgba(16, 185, 129, 0.12)';
          countBadge.style.color = 'var(--accent-green)';
          countBadge.style.borderColor = 'var(--accent-green-border)';
        }
      }

      if (bulkBox) {
        bulkBox.style.display = count > 0 ? 'inline-flex' : 'none';
      }

      if (emptyBox) {
        emptyBox.style.display = count === 0 ? 'flex' : 'none';
      }

      if (chipsContainer) {
        chipsContainer.style.display = count > 0 ? 'flex' : 'none';
      }
    };

    // رندر چیپ‌های تصویری و تعاملی
    window.renderAiIgnoredChips = function() {
      var container = document.getElementById('aiIgnoredChipsContainer');
      if (!container) return;
      container.innerHTML = '';

      window.aiIgnoredList.forEach(function(user, idx) {
        var isNumeric = /^\\d+$/.test(user);
        var chip = document.createElement('div');
        chip.className = 'ai-ignore-chip ' + (isNumeric ? 'chip-numeric' : 'chip-username');
        chip.setAttribute('title', isNumeric ? ('شناسه عددی کاربر: ' + user) : ('نام کاربری تلگرام: ' + user));

        var iconSpan = document.createElement('span');
        iconSpan.className = 'ai-chip-icon';
        iconSpan.textContent = isNumeric ? '🆔' : '👤';

        var textSpan = document.createElement('span');
        textSpan.className = 'ai-chip-text';
        textSpan.textContent = user;

        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'ai-chip-remove';
        removeBtn.innerHTML = '✕';
        removeBtn.setAttribute('title', 'حذف ' + user + ' از لیست نادیده‌گیری');
        removeBtn.onclick = function(e) {
          e.stopPropagation();
          window.removeAiIgnoredUser(idx);
        };

        chip.appendChild(iconSpan);
        chip.appendChild(textSpan);
        chip.appendChild(removeBtn);

        chip.onclick = function() {
          try {
            navigator.clipboard.writeText(user);
            showToast('📋 ' + user + ' کپی شد!', 'success');
          } catch (_) {}
        };

        container.appendChild(chip);
      });

      window.syncAiIgnoredHiddenInput();
    };

    // افزودن یک یا چند کاربر (پشتیبانی کامل از پیست گروهی و ورودی دستی)
    window.addAiIgnoredUsers = function(rawInput) {
      if (!rawInput) return;
      var newUsers = window.parseAiIgnoredUsers(rawInput);
      if (!newUsers.length) return;

      var addedCount = 0;
      var dupCount = 0;

      newUsers.forEach(function(u) {
        var uClean = u.toLowerCase().replace(/^@/, '');
        var exists = window.aiIgnoredList.some(function(item) {
          return item.toLowerCase().replace(/^@/, '') === uClean;
        });

        if (!exists) {
          window.aiIgnoredList.push(u);
          addedCount++;
        } else {
          dupCount++;
        }
      });

      if (addedCount > 0) {
        window.isStudioDirty = true;
        window.renderAiIgnoredChips();
        var isEn = (window.currentLang === 'en');
        showToast(isEn ? (addedCount + ' user(s) added to ignore list') : (addedCount + ' مخاطب به لیست نادیده‌گیری اضافه شد ✨'), 'success');
      } else if (dupCount > 0) {
        var isEn = (window.currentLang === 'en');
        showToast(isEn ? 'User is already in the ignore list' : 'این کاربر قبلاً در لیست نادیده‌گیری ثبت شده است', 'info');
      }
    };

    // حذف یک کاربر از لیست
    window.removeAiIgnoredUser = function(idx) {
      if (idx < 0 || idx >= window.aiIgnoredList.length) return;
      var removed = window.aiIgnoredList.splice(idx, 1)[0];
      window.isStudioDirty = true;
      window.renderAiIgnoredChips();
      var isEn = (window.currentLang === 'en');
      showToast(isEn ? ('Removed ' + removed + ' from ignore list') : (removed + ' از لیست نادیده‌گیری خارج شد'), 'success');
    };

    // همگام‌سازی از مقدار اولیه موجود در اینپوت به چیپ‌ها (هنگام بارگذاری پروفایل)
    window.syncAiIgnoredChipsFromInput = function() {
      var hiddenInp = document.getElementById('aiIgnoredUsersInput');
      var val = hiddenInp ? hiddenInp.value : '';
      window.aiIgnoredList = window.parseAiIgnoredUsers(val);
      window.renderAiIgnoredChips();
    };

    // راه‌اندازی رویدادهای افزودن، کپی و پاکسازی چیپ‌ها
    var quickAddInp = document.getElementById('aiIgnoredQuickAddInput');
    var btnAddIgnore = document.getElementById('btnAddAiIgnoredUser');
    if (quickAddInp) {
      quickAddInp.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var val = quickAddInp.value.trim();
          if (val) {
            window.addAiIgnoredUsers(val);
            quickAddInp.value = '';
          }
        }
      });
      quickAddInp.addEventListener('paste', function(e) {
        var pastedText = (e.clipboardData || window.clipboardData).getData('text');
        if (pastedText && /[,;،\\r\\n\\t]/.test(pastedText)) {
          e.preventDefault();
          window.addAiIgnoredUsers(pastedText);
          quickAddInp.value = '';
        }
      });
    }

    if (btnAddIgnore) {
      btnAddIgnore.addEventListener('click', function() {
        if (!quickAddInp) return;
        var val = quickAddInp.value.trim();
        if (val) {
          window.addAiIgnoredUsers(val);
          quickAddInp.value = '';
          quickAddInp.focus();
        } else {
          var isEn = (window.currentLang === 'en');
          showToast(isEn ? 'Please enter a numeric ID or @username' : 'لطفاً شناسه عددی یا نام کاربری تلگرام را وارد کنید', 'warning');
        }
      });
    }

    var btnCopyAllIgnore = document.getElementById('btnCopyAllAiIgnored');
    if (btnCopyAllIgnore) {
      btnCopyAllIgnore.addEventListener('click', function() {
        if (!window.aiIgnoredList.length) return;
        var text = window.aiIgnoredList.join(', ');
        try {
          navigator.clipboard.writeText(text);
          showToast('📋 لیست تمام کاربران مستثنی در کلیپ‌بورد کپی شد', 'success');
        } catch (_) {
          showToast('خطا در دسترسی به کلیپ‌بورد', 'error');
        }
      });
    }

    var btnClearAllIgnore = document.getElementById('btnClearAllAiIgnored');
    if (btnClearAllIgnore) {
      btnClearAllIgnore.addEventListener('click', function() {
        if (!window.aiIgnoredList.length) return;
        window.aiIgnoredList = [];
        window.isStudioDirty = true;
        window.renderAiIgnoredChips();
        showToast('🗑️ تمام کاربران از لیست نادیده‌گیری پاکسازی شدند', 'success');
      });
    }

    // همگام‌سازی اولیه در صورت وجود مقدار پیش‌فرض
    if (typeof window.syncAiIgnoredChipsFromInput === 'function') {
      window.syncAiIgnoredChipsFromInput();
    }

    // 🤖 تعریف و مدیریت مدل‌های هوش مصنوعی (AI Models)
    var AI_PROVIDER_MODELS = {
      gemini: [
        { value: 'gemini-2.5-flash', label: '⚡ Gemini 2.5 Flash (جدیدترین، پرسرعت و رایگان — پیشنهادی)', labelEn: '⚡ Gemini 2.5 Flash (Latest, Fast & Free — Recommended)' },
        { value: 'gemini-2.0-flash', label: '🚀 Gemini 2.0 Flash (پایدار و هوشمند)', labelEn: '🚀 Gemini 2.0 Flash (Stable & Smart)' },
        { value: 'gemini-1.5-flash', label: '🌟 Gemini 1.5 Flash (سریع و سبک)', labelEn: '🌟 Gemini 1.5 Flash (Fast & Lightweight)' },
        { value: 'gemini-1.5-pro', label: '🧠 Gemini 1.5 Pro (قدرت تحلیل بالا)', labelEn: '🧠 Gemini 1.5 Pro (High Reasoning Capability)' },
        { value: 'gemini-flash-lite-latest', label: '💨 Gemini Flash Lite (فوق سبک)', labelEn: '💨 Gemini Flash Lite (Ultra Lightweight)' },
        { value: 'custom', label: '✏️ مدل دستی دیگر (تایپ نام مدل دلخواه)...', labelEn: '✏️ Other Custom Model (Type model name)...' }
      ],
      openai: [
        { value: 'gpt-4o-mini', label: '⚡ GPT-4o Mini (سریع، اقتصادی و دقیق — پیشنهادی)', labelEn: '⚡ GPT-4o Mini (Fast, Economic & Accurate — Recommended)' },
        { value: 'gpt-4o', label: '🧠 GPT-4o (پرچمدار هوشمند همه‌کاره)', labelEn: '🧠 GPT-4o (Flagship Multimodal Intelligence)' },
        { value: 'gpt-4-turbo', label: '🚀 GPT-4 Turbo', labelEn: '🚀 GPT-4 Turbo' },
        { value: 'gpt-3.5-turbo', label: '💨 GPT-3.5 Turbo (اقتصادی و سبک)', labelEn: '💨 GPT-3.5 Turbo (Economic & Lightweight)' },
        { value: 'custom', label: '✏️ مدل دستی دیگر (تایپ نام مدل دلخواه)...', labelEn: '✏️ Other Custom Model (Type model name)...' }
      ],
      custom: [
        { value: 'deepseek-chat', label: '🐳 DeepSeek V3 (Chat)', labelEn: '🐳 DeepSeek V3 (Chat)' },
        { value: 'deepseek-reasoner', label: '🧠 DeepSeek R1 (استدلال و تفکر)', labelEn: '🧠 DeepSeek R1 (Reasoning & Thinking)' },
        { value: 'claude-3-5-sonnet-20241022', label: '🎭 Claude 3.5 Sonnet', labelEn: '🎭 Claude 3.5 Sonnet' },
        { value: 'custom', label: '✏️ تایپ مدل اختصاصی دیگر...', labelEn: '✏️ Type Other Custom Model...' }
      ]
    };

    window.updateAiModelOptions = function(provider, selectedModel) {
      var select = document.getElementById('aiModelSelect');
      var customWrapper = document.getElementById('aiCustomModelWrapper');
      var customInput = document.getElementById('aiCustomModelInput');
      var hint = document.getElementById('aiModelHint');
      if (!select) return;

      var prov = provider || (document.getElementById('aiProviderSelect') ? document.getElementById('aiProviderSelect').value : 'gemini');
      var models = AI_PROVIDER_MODELS[prov] || AI_PROVIDER_MODELS.gemini;
      var isEn = (window.currentLang === 'en');

      select.innerHTML = '';
      var matched = false;
      var targetModel = selectedModel || (prov === 'openai' ? 'gpt-4o-mini' : (prov === 'custom' ? 'deepseek-chat' : 'gemini-2.5-flash'));

      models.forEach(function(m) {
        var opt = document.createElement('option');
        opt.value = m.value;
        opt.textContent = isEn ? (m.labelEn || m.label) : m.label;
        opt.__origFaText = m.label;
        if (m.value !== 'custom' && m.value === targetModel) {
          opt.selected = true;
          matched = true;
        }
        select.appendChild(opt);
      });

      if (!matched && targetModel) {
        select.value = 'custom';
        if (customInput) customInput.value = targetModel;
        if (customWrapper) customWrapper.style.display = 'block';
      } else {
        if (select.value === 'custom') {
          if (customWrapper) customWrapper.style.display = 'block';
        } else {
          if (customWrapper) customWrapper.style.display = 'none';
        }
      }

      if (hint) {
        if (prov === 'gemini') {
          hint.textContent = isEn ? 'High-speed Google models (Free)' : 'مدل‌های پرسرعت گوگل (رایگان)';
          hint.__origFa = 'مدل‌های پرسرعت گوگل (رایگان)';
        } else if (prov === 'openai') {
          hint.textContent = isEn ? 'OpenAI GPT models' : 'مدل‌های OpenAI GPT';
          hint.__origFa = 'مدل‌های OpenAI GPT';
        } else {
          hint.textContent = isEn ? 'Custom Model / DeepSeek / Claude' : 'مدل سفارشی / DeepSeek / کلاود';
          hint.__origFa = 'مدل سفارشی / DeepSeek / کلاود';
        }
      }
    };

    var provSelect = document.getElementById('aiProviderSelect');
    if (provSelect) {
      provSelect.addEventListener('change', function() {
        window.isStudioDirty = true;
        window.updateAiModelOptions(provSelect.value);
        window.saveFonts();
      });
    }

    var modelSelect = document.getElementById('aiModelSelect');
    if (modelSelect) {
      modelSelect.addEventListener('change', function() {
        var customWrapper = document.getElementById('aiCustomModelWrapper');
        if (modelSelect.value === 'custom') {
          if (customWrapper) customWrapper.style.display = 'block';
          var customInput = document.getElementById('aiCustomModelInput');
          if (customInput) customInput.focus();
        } else {
          if (customWrapper) customWrapper.style.display = 'none';
        }
        window.isStudioDirty = true;
        window.saveFonts();
      });
    }

    var customModelInput = document.getElementById('aiCustomModelInput');
    if (customModelInput) {
      customModelInput.addEventListener('input', function() {
        window.isStudioDirty = true;
      });
      customModelInput.addEventListener('change', function() {
        window.saveFonts();
      });
      customModelInput.addEventListener('blur', function() {
        if (window.isStudioDirty) window.saveFonts();
      });
    }

    // فعال‌سازی و ذخیره خودکار هنگام تایپ یا تغییر لیست کاربران سکوت
    var mutedInput = document.getElementById('mutedUsersInput');
    if (mutedInput) {
      mutedInput.addEventListener('input', function() {
        window.isStudioDirty = true;
        var toggle = document.getElementById('muteEnabledToggle');
        if (toggle && mutedInput.value.trim().length > 0) {
          toggle.checked = true;
        }
      });
      mutedInput.addEventListener('change', function() {
        window.saveFonts();
      });
      mutedInput.addEventListener('blur', function() {
        if (window.isStudioDirty) {
          window.saveFonts();
        }
      });
    }

    window.triggerImmediateSync = async function() {
      var btn = document.getElementById('syncBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner"></span> همگام‌سازی فوری...';

      try {
        if (window.isStudioDirty) {
          await window.saveFonts();
        }
        var res = await fetch('/api/sync', { method: 'POST', headers: authHeaders() });
        var data = await res.json();
        if (data.ok && !data.status?.error) {
          showToast('ساعت تلگرام با فونت و تنظیمات جدید آپدیت شد! 🚀', 'success');
          loadUserDashboard();
        } else {
          showToast('خطا: ' + (data.status?.error || 'ناشناخته'), 'error');
        }
      } catch (err) {
        showToast('خطای شبکه', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>⚡ تست به‌روزرسانی آنی</span>';
      }
    };

    window.doDisconnectTelegram = async function() {
      if (!confirm('آیا از قطع اتصال سلف‌بات اطمینان دارید؟')) return;
      try {
        await fetch('/api/disconnect', { method: 'POST', headers: authHeaders() });
        showToast('اتصال تلگرام قطع گردید', 'info');
        closeSettingsModal();
        loadUserDashboard();
      } catch (e) {}
    };

    // ==========================================
    // 🔄 بارگذاری وضعیت داشبورد
    // ==========================================
    window.loadUserDashboard = loadUserDashboard;
    async function loadUserDashboard() {
      // تضمین اعمال ترجمه‌های زبان انتخاب شده روی رابط کاربری
      if (typeof window.applyLanguage === 'function') {
        window.applyLanguage(window.currentLang || 'fa');
      }
      var token = getAuthToken();
      var adminNav = document.getElementById('adminPortalNavBtn');
      if (!token) {
        window.currentUserIsAdmin = false;
        window.lastUserData = null;
        if (adminNav) adminNav.classList.add('hidden');
        var navChipEl = document.getElementById('navUserPlanChip');
        if (navChipEl) navChipEl.classList.add('hidden');
        var topBannerEl = document.getElementById('userTopSubscriptionBanner');
        if (topBannerEl) topBannerEl.classList.add('hidden');
        document.getElementById('userHeaderBadge').classList.add('hidden');
        document.getElementById('userAuthSection').classList.remove('hidden');
        document.getElementById('clockHeroCard').classList.add('hidden');
        document.getElementById('suspensionAlertBox')?.classList.add('hidden');
        document.getElementById('telegramConnectSection').classList.add('hidden');
        document.getElementById('dashboardSection').classList.add('hidden');
        document.getElementById('adminPanelSection')?.classList.add('hidden');
        if (window.location.pathname.startsWith('/admin')) {
          try { window.history.replaceState({}, document.title, '/'); } catch (_) {}
        }
        return;
      }

      try {
        var res = await fetch('/api/user/me', { headers: authHeaders() });
        var data = await res.json();

        if (!data.ok) {
          window.currentUserIsAdmin = false;
          window.lastUserData = null;
          setAuthToken('');
          loadUserDashboard();
          return;
        }

        window.currentUserIsAdmin = !!data.isAdmin;
        window.lastKnownHasTelegram = !!data.hasTelegram;
        window.lastUserData = data;

        // 💎 به‌روزرسانی آنی المان‌های شاخص بالای سایت (چیپ ناوبار و بنر وضعیت اعتبار کاربر)
        if (typeof window.updateSubscriptionUI === 'function') {
          window.updateSubscriptionUI(data);
        }

        if (adminNav) {
          if (data.isAdmin) {
            adminNav.classList.remove('hidden');
            adminNav.style.boxShadow = '0 0 16px rgba(245, 158, 11, 0.45)';
          } else {
            adminNav.classList.add('hidden');
          }
        }

        // تنها در لود اولیه صفحه در صورت درخواست روت اختصاصی /admin
        if (window.START_IN_ADMIN) {
          window.START_IN_ADMIN = false;
          if (data.isAdmin) {
            openAdminPortal();
            return;
          } else {
            try { window.history.replaceState({}, document.title, '/'); } catch (_) {}
          }
        }

        var usernameDisplay = document.getElementById('usernameDisplay');
        if (data.isAdmin) {
          usernameDisplay.innerHTML = data.username + ' <span style="font-size:0.75rem; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; padding:2px 8px; border-radius:999px; margin-right:4px;">👑 مدیر</span>';
        } else {
          usernameDisplay.textContent = data.username;
        }
        document.getElementById('userHeaderBadge').classList.remove('hidden');
        document.getElementById('userAuthSection').classList.add('hidden');
        document.getElementById('clockHeroCard').classList.remove('hidden');

        var suspBox = document.getElementById('suspensionAlertBox');
        var planBadge = document.getElementById('userPlanBadge');
        var isEn = window.currentLang === 'en';

        // هوشمندسازی بررسی تعلیق خودکار
        if (data.isSuspended || data.isExpired) {
          if (suspBox) suspBox.classList.remove('hidden');
          if (planBadge) {
            planBadge.textContent = isEn ? 'Subscription: Suspended & Expired 🔴' : 'اشتراک: معلق و منقضی 🔴';
            planBadge.style.color = 'var(--accent-rose)';
            planBadge.style.borderColor = 'var(--accent-rose-border)';
          }

          // مخفی‌سازی یا غیرفعال‌سازی گزینه‌های اجرایی هنگام تعلیق
          document.getElementById('telegramConnectSection').classList.add('hidden');
          document.getElementById('dashboardSection').classList.remove('hidden');

          var badge = document.getElementById('botStatusBadge');
          if (badge) {
            badge.textContent = isEn ? '⏸️ Suspended (Expired)' : '⏸️ به حالت تعلیق درآمده (منقضی)';
            badge.style.color = 'var(--accent-rose)';
          }

          var toggleText = document.getElementById('toggleBotText');
          if (toggleText) {
            toggleText.textContent = isEn ? '🔒 Subscription Suspended' : '🔒 اشتراک معلق است';
          }
          var toggleBotBtn = document.getElementById('toggleBotBtn');
          if (toggleBotBtn) toggleBotBtn.disabled = true;
          var syncBtn = document.getElementById('syncBtn');
          if (syncBtn) syncBtn.disabled = true;

          var lastUpEl = document.getElementById('lastUpdateTime');
          if (lastUpEl) {
            lastUpEl.textContent = isEn ? 'Suspended due to expiration of subscription validity' : 'تعلیق به علت پایان مدت زمان اعتبار اشتراک';
            lastUpEl.style.color = 'var(--accent-rose)';
          }
          updateLiveClock();
          return;
        } else {
          if (suspBox) suspBox.classList.add('hidden');
          var toggleBtnActive = document.getElementById('toggleBotBtn');
          if (toggleBtnActive) toggleBtnActive.disabled = false;
          var syncBtnActive = document.getElementById('syncBtn');
          if (syncBtnActive) syncBtnActive.disabled = false;

          var remText = data.isLifetime ? (isEn ? 'Lifetime ♾️' : 'دائمی ♾️') : (data.remainingDays + (isEn ? ' days remaining' : ' روز اعتبار باقی‌مانده'));
          if (planBadge) {
            planBadge.textContent = (isEn ? 'Subscription: ' : 'اشتراک: ') + (data.planName || (isEn ? 'Standard' : 'استاندارد')) + ' (' + remText + ')';
            planBadge.style.color = 'var(--accent-green)';
            planBadge.style.borderColor = 'var(--accent-green-border)';
          }
        }

        if (data.hasTelegram) {
          document.getElementById('telegramConnectSection').classList.add('hidden');
          document.getElementById('dashboardSection').classList.remove('hidden');

          var hasError = !!data.status?.error;
          isBotRunning = data.enabled !== false;
          updateBotStatusUI(isBotRunning, hasError);

          var tgAlert = document.getElementById('tgAlertBox');
          var tgAlertMsg = document.getElementById('tgAlertMsg');
          if (hasError) {
            if (tgAlert) tgAlert.classList.remove('hidden');
            if (tgAlertMsg) tgAlertMsg.textContent = data.status.error;
          } else {
            if (tgAlert) tgAlert.classList.add('hidden');
          }

          if (!window.isStudioDirty) {
            if (data.digits && Array.isArray(data.digits)) {
              selectedDigits = data.digits;
              for (var k in presets) {
                if (presets[k].digits.join('') === data.digits.join('')) {
                  selectPreset(k, true);
                  break;
                }
              }
            }
            if (data.colon) {
              setColonChar(data.colon, true);
            }

            // 🕒 بارگذاری تنظیمات ساعت استودیو
            setSafeValue('prefixInput', data.prefix || '');
            setSafeValue('suffixInput', data.suffix || '');
            setSafeChecked('toggle12h', !!data.is12h);

            // 📝 بارگذاری تنظیمات بیوگرافی هوشمند
            setSafeChecked('bioEnabledToggle', !!data.bioEnabled);
            setSafeValue('bioTemplateInput', data.bioTemplate || '');

            // 🌙 بارگذاری تنظیمات حالت خواب و اتوماسیون
            setSafeChecked('sleepEnabledToggle', !!data.sleepEnabled);
            if (data.sleepStart !== undefined) setSafeValue('sleepStartSelect', String(data.sleepStart));
            if (data.sleepEnd !== undefined) setSafeValue('sleepEndSelect', String(data.sleepEnd));
            setSafeValue('sleepTextInput', data.sleepText || '😴 Sleep');

            // 🤖 بارگذاری منشی خودکار پیوی (AFK)
            setSafeChecked('afkEnabledToggle', !!data.afkEnabled);
            setSafeValue('afkMessageInput', data.afkMessage || '');
            if (data.afkCooldown !== undefined) setSafeValue('afkCooldownSelect', String(data.afkCooldown));

            // 🔇 بارگذاری سکوت و حذف پیام (Mute)
            var hasSavedMuted = Array.isArray(data.mutedUsers) ? (data.mutedUsers.length > 0) : Boolean(data.mutedUsers && data.mutedUsers.trim());
            setSafeChecked('muteEnabledToggle', !!data.muteEnabled || hasSavedMuted);
            setSafeValue('mutedUsersInput', Array.isArray(data.mutedUsers) ? data.mutedUsers.join(', ') : (data.mutedUsers || ''));

            // 👻 بارگذاری حالت شبح (Ghost Mode)
            setSafeChecked('ghostModeToggle', !!data.ghostMode);
            setSafeValue('ghostExcludeInput', Array.isArray(data.ghostExcludeList) ? data.ghostExcludeList.join(', ') : (data.ghostExcludeList || ''));

            // 🤖 بارگذاری پاسخ هوشمند AI
            setSafeChecked('aiReplyToggle', !!data.aiReplyEnabled);
            if (data.aiProvider) setSafeValue('aiProviderSelect', data.aiProvider);
            if (window.updateAiModelOptions) {
              window.updateAiModelOptions(data.aiProvider || 'gemini', data.aiModel || '');
            }
            setSafeValue('aiApiKeyInput', data.aiApiKey || '');
            if (window.updateAiTestBtnVisibility) window.updateAiTestBtnVisibility();
            setSafeValue('aiSystemPromptInput', data.aiSystemPrompt || '');
            setSafeValue('aiContextInput', data.aiContext || '');
            if (data.aiMaxReplies !== undefined) setSafeValue('aiMaxRepliesSelect', String(data.aiMaxReplies));
            if (data.aiCooldown !== undefined) setSafeValue('aiCooldownSelect', String(data.aiCooldown));
            setSafeValue('aiIgnoredUsersInput', Array.isArray(data.aiIgnoredUsers) ? data.aiIgnoredUsers.join(', ') : (data.aiIgnoredUsers || ''));
            if (window.syncAiIgnoredChipsFromInput) window.syncAiIgnoredChipsFromInput();

            // 🔐 بارگذاری وضعیت ۲FA (تنها در صورتی که کاربر وسط راه‌اندازی و اسکن ۲FA نباشد)
            if (window.updateTotpUI) {
              if (data.totpEnabled || !window.isSettingUpTotp) {
                window.updateTotpUI(!!data.totpEnabled, data.totpBackupCodes);
              }
            }

            // 🤖 بارگذاری ربات تلگرام اختصاصی و تنظیمات لاگر
            if (data.bot) {
              if (data.bot.token) {
                window.currentBotToken = data.bot.token;
              }
              setSafeValue('botTokenInput', data.bot.token || '');
              setSafeChecked('botAntiDeleteToggle', data.bot.antiDeleteEnabled !== false);
              setSafeChecked('botAntiEditToggle', data.bot.antiEditEnabled !== false);
              setSafeChecked('botForwardTtlToggle', data.bot.forwardTtlToBot !== false);

              var card = document.getElementById('botInfoCard');
              if (card) {
                if (data.bot.token) {
                  card.classList.remove('hidden');
                  var nameEl = document.getElementById('botNameDisplay');
                  if (nameEl) nameEl.textContent = data.bot.name || (data.bot.username ? ('@' + data.bot.username) : 'ربات تلگرام');
                  var userLink = document.getElementById('botUsernameLink');
                  var directBtn = document.getElementById('botDirectBtn');
                  var tgLink = data.bot.username ? ('https://t.me/' + data.bot.username) : '#';
                  if (userLink) {
                    userLink.textContent = data.bot.username ? ('@' + data.bot.username) : 'ربات متصل';
                    userLink.href = tgLink;
                  }
                  if (directBtn) directBtn.href = tgLink;

                  var lockEl = document.getElementById('botOwnerIdDisplay');
                  var lockStatusEl = document.getElementById('botLockStatusText');
                  var ownerId = data.bot.ownerId || data.userId || data.bot.chatId;
                  if (lockEl) {
                    if (ownerId) {
                      lockEl.textContent = '🔒 قفل روی شناسه: ' + ownerId;
                      lockEl.style.color = 'var(--accent-green)';
                      if (lockStatusEl) lockStatusEl.textContent = 'ربات به صورت ۱۰۰٪ انحصاری فقط به این شناسه عددی پاسخ می‌دهد و برای سایرین مسدود است.';
                    } else {
                      lockEl.textContent = '🔒 آماده قفل خودکار با اولین /start';
                      lockEl.style.color = 'var(--accent-indigo)';
                    }
                  }
                } else {
                  card.classList.add('hidden');
                }
              }
            }
          }

          // 📱 به‌روزرسانی شبیه‌ساز زنده پروفایل تلگرام
          var mockupFirstEl = document.getElementById('mockupFirstName');
          if (mockupFirstEl) {
            mockupFirstEl.textContent = data.username || 'کاربر Arizo';
          }
          var mockupAvatarEl = document.getElementById('mockupAvatar');
          if (mockupAvatarEl) {
            var initial = (data.username || 'AZ').slice(0, 2).toUpperCase();
            mockupAvatarEl.textContent = initial;
          }

          window.lastServerUpdateTime = data.status?.lastUpdate || 0;
          window.lastServerTimeStr = data.status?.lastTime || '';
          window.lastServerError = data.status?.error || null;
          renderLiveLastUpdate();
        } else {
          document.getElementById('telegramConnectSection').classList.remove('hidden');
          document.getElementById('dashboardSection').classList.add('hidden');
          var btnCancel = document.getElementById('btnCancelTgConnect');
          if (btnCancel) btnCancel.classList.add('hidden');
        }
        updateLiveClock();
      } catch (err) {
        showToast('خطا در بارگذاری حساب', 'error');
      }
    }

    function renderLiveLastUpdate() {
      var lastUpEl = document.getElementById('lastUpdateTime');
      if (!lastUpEl) return;
      if (window.lastServerUpdateTime) {
        var diffSec = Math.max(1, Math.round((Date.now() - window.lastServerUpdateTime) / 1000));
        var timeAgoStr = diffSec < 60 ? (diffSec + ' ثانیه پیش') : (Math.round(diffSec / 60) + ' دقیقه پیش');
        lastUpEl.textContent = (window.lastServerTimeStr || '') + ' (' + timeAgoStr + ')';
        lastUpEl.style.color = window.lastServerError ? 'var(--danger)' : 'var(--accent-green)';
      } else {
        lastUpEl.textContent = 'در انتظار نخستین همگام‌سازی';
        lastUpEl.style.color = 'var(--text-muted)';
      }
    }

    // به‌روزرسانی زنده شمارنده ثانیه‌های آخرین استعلام هر ۵ ثانیه
    setInterval(renderLiveLastUpdate, 5000);

    // هماهنگ‌سازی خودکار وضعیت با سرور هر ۶۰ ثانیه در تب‌های فعال و توقف کامل در پس‌زمینه (صرفه‌جویی هوشمند سهمیه)
    var lastDashboardPollTime = Date.now();
    setInterval(function() {
      if (getAuthToken() && !document.hidden) {
        lastDashboardPollTime = Date.now();
        loadUserDashboard();
      }
    }, 60000);

    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && getAuthToken()) {
        if (Date.now() - lastDashboardPollTime > 45000) {
          lastDashboardPollTime = Date.now();
          loadUserDashboard();
        }
      }
    });

    // اتصال هوشمند فیلد سکوت: فعال‌سازی خودکار سوییچ با ورود آیدی یا یوزرنیم
    var mutedInpEl = document.getElementById('mutedUsersInput');
    if (mutedInpEl) {
      mutedInpEl.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
          var toggleEl = document.getElementById('muteEnabledToggle');
          if (toggleEl && !toggleEl.checked) toggleEl.checked = true;
        }
      });
    }

    // ==========================================
    // 🔐 توابع مدیریت امنیت، ۲FA و پشتیبان‌گیری
    // ==========================================
    window.currentBackupCodes = [];
    window.isSettingUpTotp = false;

    window.updateTotpUI = function(enabled, backupCodes) {
      window.isTotpEnabled = !!enabled;
      var badge = document.getElementById('totpStatusBadge');
      var inactBox = document.getElementById('totpSetupInactiveBox');
      var modalBox = document.getElementById('totpSetupModalBox');
      var actBox = document.getElementById('totpActiveBox');
      if (badge) {
        badge.textContent = enabled ? 'فعال و محافظت‌شده 🟢' : 'غیرفعال ❌';
        badge.style.background = enabled ? 'var(--accent-green-bg)' : 'var(--accent-rose-bg)';
        badge.style.color = enabled ? 'var(--accent-green)' : 'var(--accent-rose)';
        badge.style.borderColor = enabled ? 'var(--accent-green-border)' : 'var(--accent-rose-border)';
      }
      if (enabled) {
        window.isSettingUpTotp = false;
        if (inactBox) inactBox.classList.add('hidden');
        if (modalBox) modalBox.classList.add('hidden');
        if (actBox) actBox.classList.remove('hidden');

        if (Array.isArray(backupCodes) && backupCodes.length > 0) {
          window.currentBackupCodes = backupCodes;
          var bcList = document.getElementById('totpActiveBackupCodesList');
          if (bcList) {
            bcList.innerHTML = backupCodes.map(function(c) {
              return '<span style="padding:6px 10px; background:var(--bg-surface-hover); border:1px solid var(--border-subtle); border-radius:6px; text-align:center; letter-spacing:1px; color:var(--text-main); font-weight:700;">' + c + '</span>';
            }).join('');
          }
        }
      } else {
        if (actBox) actBox.classList.add('hidden');
        // اگر کاربر در حال راه‌اندازی و اسکن کیو‌آر کد است، هرگز نباید باکس کیو‌آر بسته شود
        if (window.isSettingUpTotp) {
          if (inactBox) inactBox.classList.add('hidden');
          if (modalBox) modalBox.classList.remove('hidden');
        } else {
          if (inactBox) inactBox.classList.remove('hidden');
          if (modalBox) modalBox.classList.add('hidden');
        }
      }
    };

    window.startTotpSetup = async function() {
      var btn = document.getElementById('btnStartTotp');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> ایجاد بارکد QR...';
      }
      try {
        var res = await fetch('/api/user/2fa/setup', {
          method: 'POST',
          headers: authHeaders()
        });
        var data = await res.json();
        if (!data.ok) {
          window.isSettingUpTotp = false;
          showToast(data.error || 'خطا در راه‌اندازی ۲FA', 'error');
          return;
        }

        window.isSettingUpTotp = true;

        // ۱. درج تصویر بارکد QR اختصاصی
        var qrBox = document.getElementById('totpQrContainer');
        if (qrBox) {
          if (data.qrSvg) {
            qrBox.innerHTML = data.qrSvg;
            var svgEl = qrBox.querySelector('svg');
            if (svgEl) {
              svgEl.style.width = '100%';
              svgEl.style.height = '100%';
              svgEl.style.display = 'block';
            }
          } else if (data.otpauthUri) {
            qrBox.innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(data.otpauthUri) + '" width="200" height="200" alt="QR Code" style="display:block; border-radius:8px;">';
          }
        }

        // ۲. درج کلید دستی ۳۲ کاراکتری
        var secretInp = document.getElementById('totpSecretDisplay');
        if (secretInp) secretInp.value = data.secret || '';

        // ۳. لینک مستقیم برای باز کردن اپ Authenticator در گوشی
        var directLink = document.getElementById('totpDirectAppLink');
        if (directLink && data.otpauthUri) {
          directLink.href = data.otpauthUri;
        }

        // ۴. پاکسازی و فوکوس روی فیلد کد تایید
        var verifyInp = document.getElementById('totpVerifyCodeInput');
        if (verifyInp) {
          verifyInp.value = '';
          setTimeout(function() { verifyInp.focus(); }, 200);
        }

        var modalBox = document.getElementById('totpSetupModalBox');
        var inactBox = document.getElementById('totpSetupInactiveBox');
        if (modalBox) modalBox.classList.remove('hidden');
        if (inactBox) inactBox.classList.add('hidden');
        showToast('بارکد QR و کلید اختصاصی با موفقیت ساخته شد 📷', 'info');
      } catch (e) {
        window.isSettingUpTotp = false;
        showToast('خطای شبکه در ارتباط با سرور', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>🔐 راه‌اندازی و فعال‌سازی ۲FA</span>';
        }
      }
    };

    window.cancelTotpSetup = function() {
      window.isSettingUpTotp = false;
      var modalBox = document.getElementById('totpSetupModalBox');
      var inactBox = document.getElementById('totpSetupInactiveBox');
      if (modalBox) modalBox.classList.add('hidden');
      if (inactBox) inactBox.classList.remove('hidden');
    };

    window.copyTotpSecret = function() {
      var el = document.getElementById('totpSecretDisplay');
      if (!el || !el.value) return;
      navigator.clipboard.writeText(el.value).then(function() {
        showToast('کلید محرمانه ۲FA کپی شد 📋', 'success');
      }).catch(function() {
        showToast('خطا در کپی کلید', 'error');
      });
    };

    window.copyAllBackupCodes = function() {
      if (!window.currentBackupCodes || window.currentBackupCodes.length === 0) {
        showToast('کد بازیابی موجود نیست', 'error');
        return;
      }
      var text = "کدهای بازیابی اضطراری Arizo Self (2FA Recovery Codes):\\n" + window.currentBackupCodes.join("\\n");
      navigator.clipboard.writeText(text).then(function() {
        showToast('تمامی کدهای اضطراری کپی شدند 📋', 'success');
      }).catch(function() {
        showToast('خطا در کپی کدها', 'error');
      });
    };

    window.confirmEnableTotp = async function() {
      var rawCode = (document.getElementById('totpVerifyCodeInput') && document.getElementById('totpVerifyCodeInput').value) || '';
      var cleanCode = rawCode.replace(/\D/g, '');
      if (!cleanCode || cleanCode.length !== 6) {
        showToast('لطفاً کد ۶ رقمی تولیدشده در اپلیکیشن را به درستی وارد کنید', 'error');
        return;
      }
      var btn = document.getElementById('btnConfirmTotp');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> درحال اعتبارسنجی...';
      }
      try {
        var res = await fetch('/api/user/2fa/enable', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ code: cleanCode })
        });
        var data = await res.json();
        if (!data.ok) {
          showToast(data.error || 'کد وارد شده نادرست یا منقضی است. لطفاً کد جدید اپلیکیشن را وارد کنید.', 'error');
          return;
        }
        window.isSettingUpTotp = false;
        showToast('احراز هویت دو مرحله‌ای با موفقیت فعال شد! 🎉', 'success');
        updateTotpUI(true, data.backupCodes);
      } catch (e) {
        showToast('خطای شبکه در برقراری ارتباط', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<span>تأیید نهایی و فعال‌سازی ۲FA</span>';
        }
      }
    };

    window.promptDisableTotp = async function() {
      var pass = prompt('برای غیرفعال‌سازی ۲FA، رمز عبور حساب کاربری یا کد ۶ رقمی Authenticator را وارد کنید:');
      if (!pass || !pass.trim()) return;
      var cleanInput = pass.trim();
      var payload = cleanInput.length === 6 && /^\d{6}$/.test(cleanInput)
        ? { code: cleanInput }
        : { password: cleanInput };

      try {
        var res = await fetch('/api/user/2fa/disable', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(payload)
        });
        var data = await res.json();
        if (data.ok) {
          window.isSettingUpTotp = false;
          showToast('احراز هویت ۲FA غیرفعال شد', 'info');
          updateTotpUI(false);
        } else {
          showToast(data.error || 'رمز عبور یا کد نامعتبر است', 'error');
        }
      } catch (e) {
        showToast('خطای سرور', 'error');
      }
    };

    window.downloadBackupFile = async function() {
      var pass = document.getElementById('backupExportPass').value;
      if (!pass) {
        showToast('رمز عبور حساب برای رمزنگاری فایل بکاپ الزامی است', 'error');
        return;
      }
      try {
        var res = await fetch('/api/user/backup/export', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ password: pass })
        });
        var data = await res.json();
        if (!data.ok) {
          showToast(data.error || 'خطا در ایجاد بکاپ', 'error');
          return;
        }
        var blob = new Blob([JSON.stringify(data.backup, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = data.fileName || 'arizo-backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('فایل پشتیبان رمزنگاری‌شده دانلود شد ✅', 'success');
      } catch (e) {
        showToast('خطا در دریافت بکاپ', 'error');
      }
    };

    window.restoreBackupFile = async function() {
      var fileInput = document.getElementById('backupFileInput');
      var pass = document.getElementById('backupImportPass').value;
      if (!fileInput.files || fileInput.files.length === 0) {
        showToast('لطفاً ابتدا فایل بکاپ (.json) را انتخاب کنید', 'error');
        return;
      }
      if (!pass) {
        showToast('رمز عبور فایل بکاپ را وارد کنید', 'error');
        return;
      }
      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = async function(e) {
        try {
          var backupContent = e.target.result;
          var res = await fetch('/api/user/backup/import', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ backupData: backupContent, password: pass })
          });
          var data = await res.json();
          if (data.ok) {
            showToast('بازیابی نسخه پشتیبان با موفقیت انجام شد! 🔄', 'success');
            setTimeout(function() { location.reload(); }, 1200);
          } else {
            showToast(data.error || 'خطا در بازیابی (رمز اشتباه است یا فایل دستکاری شده)', 'error');
          }
        } catch (err) {
          showToast('خطا در پردازش فایل بکاپ', 'error');
        }
      };
      reader.readAsText(file);
    };

    initStudioNavDots();
    loadUserDashboard();

    // ورود خودکار به روت /admin در صورت احراز دسترسی ادمین در loadUserDashboard انجام می‌شود

    // پاپ‌آپ معرفی امکانات تنها در صورت کلیک کاربر روی دکمه راهنما باز می‌شود

    // ⌨️ بستن پاپ‌آپ‌ها با فشردن کلید Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        var featModal = document.getElementById('featuresIntroModal');
        if (featModal && !featModal.classList.contains('hidden')) {
          closeFeaturesModal();
        }
        var setModal = document.getElementById('settingsModal');
        if (setModal && !setModal.classList.contains('hidden')) {
          closeSettingsModal();
        }
      }
    });
  </script>
</body>
</html>`;
}
