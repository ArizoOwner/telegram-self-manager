// Draws the animated SVGs used by the READMEs (banner, live demo, commands, security, flow, ticker…).
// Pure SVG + CSS/SMIL, no scripts and no external requests, so GitHub plays them as-is.
//   npm run readme-art

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets");
mkdirSync(outDir, { recursive: true });

const SANS = "'Segoe UI','Inter',system-ui,-apple-system,Arial,sans-serif";
const MONO = "ui-monospace,'Cascadia Code',Consolas,Menlo,monospace";
const FA = "Vazirmatn,Tahoma,'Segoe UI',sans-serif";
const PURPLE = "#8b5cf6";
const VIOLET = "#a855f7";
const SKY = "#38bdf8";
const BLUE = "#0ea5e9";
const PINK = "#ec4899";
const GREEN = "#22c55e";
const RED = "#f43f5e";

let seed = 11;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

const svg = (w, h, body, label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${label}">\n${body}\n</svg>\n`;
const save = (name, content) => writeFileSync(join(outDir, name), content);

/** Normalises [t, value] keyframes so keyTimes start at 0, end at 1 and strictly increase. */
function norm(pts) {
  const p = pts.map(([t, v]) => [t, v]);
  if (p[0][0] > 0) p.unshift([0, p[0][1]]);
  if (p[p.length - 1][0] < 1) p.push([1, p[p.length - 1][1]]);
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 1e-4;
  p[p.length - 1][0] = 1;
  return p;
}
const kt = (p) => p.map(([t]) => t.toFixed(4)).join(";");
const kv = (p) => p.map(([, v]) => v).join(";");

/** SMIL <animate> from [t, value] keyframes. */
function tl(attr, dur, pts, extra = "") {
  const p = norm(pts);
  return `<animate attributeName="${attr}" dur="${dur}s" repeatCount="indefinite" keyTimes="${kt(p)}" values="${kv(p)}" ${extra}/>`;
}
/** SMIL <animateTransform> from [t, "x y"] keyframes. */
function tlT(type, dur, pts, extra = "") {
  const p = norm(pts);
  return `<animateTransform attributeName="transform" type="${type}" dur="${dur}s" repeatCount="indefinite" keyTimes="${kt(p)}" values="${kv(p)}" ${extra}/>`;
}
/** Visible between s and e (fractions of the loop), quick fades at both ends. */
const fade = (dur, s, e) => tl("opacity", dur, [[0, 0], [s, 0], [s + 0.012, 1], [e, 1], [e + 0.012, 0], [1, 0]]);
/** Slides in from (dx, dy) at s, then rests. */
const slide = (dur, s, dx, dy) => tlT("translate", dur, [[0, `${dx} ${dy}`], [s, `${dx} ${dy}`], [s + 0.035, "0 0"], [1, "0 0"]]);
/** n equal time slots; slot i is visible only during its share of the loop. */
const slots = (n, dur, render) =>
  Array.from({ length: n }, (_, i) => {
    const a = i / n, b = (i + 1) / n;
    const k = i === 0 ? [0, b, 1] : i === n - 1 ? [0, a, 1] : [0, a, b, 1];
    const v = i === 0 ? [1, 0, 0] : i === n - 1 ? [0, 1, 1] : [0, 1, 0, 0];
    return `<g opacity="${i === 0 ? 1 : 0}"><animate attributeName="opacity" dur="${dur}s" repeatCount="indefinite" calcMode="discrete" keyTimes="${k.join(";")}" values="${v.join(";")}"/>${render(i)}</g>`;
  }).join("");

const CSS = `
  text{font-family:${SANS}}
  .tw{animation:tw 4s ease-in-out infinite}
  @keyframes tw{0%,100%{opacity:.12}50%{opacity:.95}}
  .spark{transform-box:fill-box;transform-origin:center;animation:spark 3s ease-in-out infinite}
  @keyframes spark{0%,100%{transform:scale(.2) rotate(0);opacity:0}50%{transform:scale(1) rotate(45deg);opacity:1}}
  .bob{animation:bob 5s ease-in-out infinite}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
  .pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.4s ease-in-out infinite}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
`;

const stars = (n, W, H) =>
  Array.from({ length: n }, () => {
    const x = rnd() * W, y = rnd() * H, r = 0.7 + rnd() * 1.6, d = (rnd() * 4).toFixed(2);
    return `<circle class="tw" style="animation-delay:${d}s" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff"/>`;
  }).join("");

const spark = (x, y, s, delay) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path class="spark" style="animation-delay:${delay}s" d="M0-10 L2.6-2.6 10 0 2.6 2.6 0 10 -2.6 2.6 -10 0 -2.6-2.6Z" fill="#fff"/></g>`;

/** Paper plane centred on the origin, nose pointing right. */
const plane = (fill = "#fff") =>
  `<path d="M-30 -2 L34 -26 L18 26 L3 10 L-8 22 L-9 6Z" fill="${fill}"/><path d="M-9 6 L34 -26 L3 10Z" fill="#000" opacity=".16"/>`;

// small vector icons, drawn around the origin (about 24px)
const icoClock = (c = "#fff", spin = true) =>
  `<circle r="9" fill="none" stroke="${c}" stroke-width="2.2"/><path d="M0 -5 V0" stroke="${c}" stroke-width="2.2" stroke-linecap="round">${spin ? `<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>` : ""}</path><path d="M0 0 L4 2" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`;
const icoGhost = (c = "#fff") =>
  `<path d="M-9 10V-2C-9-12 9-12 9-2V10L4.5 6 0 10-4.5 6Z" fill="${c}"/><circle cx="-3.2" cy="-2" r="1.9" fill="#0b0e17"/><circle cx="3.2" cy="-2" r="1.9" fill="#0b0e17"/>`;
const icoLock = (c = "#fff") =>
  `<rect x="-8" y="-2" width="16" height="12" rx="3" fill="${c}"/><path d="M-4.6 -2V-5a4.6 4.6 0 0 1 9.2 0V-2" fill="none" stroke="${c}" stroke-width="2.4"/><circle cy="4" r="1.8" fill="#0b0e17"/>`;

// ─────────────────────────────────────────────── banner
function banner() {
  const W = 1200, H = 340, D = 12;
  const orbit = [
    [0, icoClock(SKY)],
    [120, icoGhost("#e9d5ff")],
    [240, icoLock("#86efac")],
  ]
    .map(([deg, art]) => {
      const a = (deg * Math.PI) / 180;
      return `<g transform="translate(${(112 * Math.cos(a)).toFixed(1)} ${(112 * Math.sin(a)).toFixed(1)})">
        <g><circle r="22" fill="#0b0e17" stroke="#ffffff30"/>${art}
          <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="20s" repeatCount="indefinite"/></g></g>`;
    })
    .join("");
  const taglines = [
    "Atomic clock · sub-40ms MTProto precision",
    "Ghost mode · silent read receipts",
    "Google 2FA · zero-trust honeypot",
    "Anti-delete · anti-edit · view-once saver",
  ];
  const body = `
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset=".5" stop-color="#111827"/><stop offset="1" stop-color="#181336"/></linearGradient>
  <linearGradient id="title" gradientUnits="userSpaceOnUse" x1="380" y1="0" x2="780" y2="0" spreadMethod="reflect">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#e9d5ff"/><stop offset=".75" stop-color="${VIOLET}"/><stop offset="1" stop-color="${SKY}"/>
    <animateTransform attributeName="gradientTransform" type="translate" from="-400 0" to="400 0" dur="7s" repeatCount="indefinite"/>
  </linearGradient>
  <linearGradient id="disc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PURPLE}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
  <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <clipPath id="clip"><rect width="${W}" height="${H}" rx="30"/></clipPath>
</defs>
<style>${CSS}</style>
<g clip-path="url(#clip)">
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle r="230" fill="${PURPLE}" opacity=".5" filter="url(#glow)"><animate attributeName="cx" values="150;330;150" dur="12s" repeatCount="indefinite"/><animate attributeName="cy" values="300;200;300" dur="12s" repeatCount="indefinite"/></circle>
  <circle r="220" fill="${BLUE}" opacity=".4" filter="url(#glow)"><animate attributeName="cx" values="1090;900;1090" dur="14s" repeatCount="indefinite"/><animate attributeName="cy" values="30;150;30" dur="14s" repeatCount="indefinite"/></circle>
  ${stars(40, W, H)}
  ${spark(330, 70, 1, 0)}${spark(1130, 250, 1.2, 1.2)}${spark(700, 40, .8, 2.1)}${spark(60, 40, .9, .6)}

  <!-- emblem -->
  <g transform="translate(190 172)">
    <circle r="96" fill="${PURPLE}" opacity=".35" filter="url(#soft)" class="pulse"/>
    <circle r="112" fill="none" stroke="#ffffff30" stroke-width="1.6" stroke-dasharray="3 9">
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite"/></circle>
    <circle r="82" fill="none" stroke="${SKY}" stroke-opacity=".35" stroke-width="1.4" stroke-dasharray="60 20 6 20">
      <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="22s" repeatCount="indefinite"/></circle>
    <g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite"/>${orbit}</g>
    <circle r="62" fill="url(#disc)"/>
    <circle r="62" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>
    <g class="bob"><g transform="translate(-2 0) scale(.95)">${plane()}</g></g>
  </g>

  <!-- profile clock pill -->
  <g transform="translate(850 38)">
    <rect width="290" height="42" rx="21" fill="#0b0e17" stroke="#ffffff22"/>
    <circle cx="24" cy="21" r="5" fill="${GREEN}"><animate attributeName="opacity" values="1;.25;1" dur="1.6s" repeatCount="indefinite"/></circle>
    <text x="40" y="26.5" font-size="14" font-weight="700" fill="#e5e7eb">Arizo</text>
    <g transform="translate(106 21)" fill="${SKY}">${icoClock(SKY)}</g>
    <g font-size="15" font-weight="700" font-family="${MONO}" fill="${SKY}">${slots(6, 6, (i) => `<text x="128" y="26.5">12:${41 + i}</text>`)}</g>
    <text x="206" y="26" font-size="11" fill="#7c8397" letter-spacing="1">LIVE 24/7</text>
  </g>

  <!-- titles -->
  <text x="380" y="168" font-size="82" font-weight="800" fill="url(#title)" letter-spacing="1">Arizo Self</text>
  <text x="384" y="208" font-size="22" font-weight="600" fill="#c4b5fd" letter-spacing="7">TELEGRAM SELF MANAGER</text>
  <g font-size="21" fill="#cbd5e1">${slots(taglines.length, D, (i) => `<text x="384" y="252">${taglines[i]}</text>`)}</g>
  <text x="384" y="292" font-size="19" fill="#8b86c9" style="font-family:${FA}" direction="rtl" text-anchor="end">سلف‌بات هوشمند تلگرام روی کلادفلر</text>
  <g transform="translate(384 322)">${Array.from({ length: taglines.length }, (_, i) => `<rect x="${i * 22}" width="14" height="3" rx="1.5" fill="#ffffff22"/>`).join("")}${slots(taglines.length, D, (i) => `<rect x="${i * 22}" width="14" height="3" rx="1.5" fill="${VIOLET}"/>`)}</g>
</g>
<rect width="${W}" height="${H}" rx="30" fill="none" stroke="#ffffff14"/>`;
  save("banner.svg", svg(W, H, body, "Arizo Telegram Self Manager"));
}

// ─────────────────────────────────────────────── live demo (profile clock + helper-bot log)
function demo() {
  const W = 900, H = 420, D = 14;
  const times = ["12:41", "12:42", "۱۲:۴۳", "۱۲:۴۴", "12:45", "12:46"];
  const bio = ["12:41", "12:42", "12:43", "12:44", "12:45", "12:46"];
  const toggle = (y, label, on, startFrac) => `
    <g transform="translate(58 ${y})">
      <rect x="-8" y="-17" width="226" height="34" rx="12" fill="#151a2b"/>
      <text x="6" y="5" font-size="13" fill="#d7dbea">${label}</text>
      <rect x="164" y="-10" width="42" height="22" rx="11" fill="#2a3047">
        ${on ? tl("fill", D, [[0, "#2a3047"], [startFrac, "#2a3047"], [startFrac + 0.02, GREEN], [0.93, GREEN], [0.96, "#2a3047"], [1, "#2a3047"]]) : ""}
      </rect>
      <circle cx="175" cy="1" r="8" fill="#fff">
        ${on ? tl("cx", D, [[0, 175], [startFrac, 175], [startFrac + 0.02, 195], [0.93, 195], [0.96, 175], [1, 175]]) : ""}
      </circle>
    </g>`;

  const card = (i, s, color, icon, title, line, extra = "") => {
    const y = 84 + i * 76;
    return `
    <g opacity="0">${fade(D, s, 0.945)}
      <g>${slide(D, s, 36, 0)}
        <rect x="364" y="${y}" width="480" height="66" rx="18" fill="#151a2b" stroke="${color}" stroke-opacity=".5"/>
        <rect x="364" y="${y}" width="5" height="66" rx="2.5" fill="${color}"/>
        <rect x="382" y="${y + 13}" width="40" height="40" rx="12" fill="${color}" fill-opacity=".18"/>
        <text x="402" y="${y + 40}" text-anchor="middle" font-size="20">${icon}</text>
        <text x="436" y="${y + 29}" font-size="15" font-weight="700" fill="#fff">${title}</text>
        <text x="436" y="${y + 50}" font-size="13" fill="#9aa3bd">${line}</text>
        <text x="828" y="${y + 24}" text-anchor="end" font-size="11" fill="#6b7390">12:4${i + 1}</text>
        ${extra}
      </g>
    </g>`;
  };

  const body = `
<defs>
  <linearGradient id="dbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#171233"/></linearGradient>
  <linearGradient id="av" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PURPLE}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient>
  <linearGradient id="cover" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#312e81"/><stop offset="1" stop-color="#0c4a6e"/></linearGradient>
  <clipPath id="ph"><rect x="40" y="26" width="270" height="368" rx="34"/></clipPath>
  <filter id="dg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
</defs>
<style>${CSS}</style>
<rect width="${W}" height="${H}" rx="28" fill="url(#dbg)"/>
<circle cx="120" cy="380" r="110" fill="${PURPLE}" opacity=".3" filter="url(#dg)"/>
<circle cx="820" cy="40" r="110" fill="${BLUE}" opacity=".28" filter="url(#dg)"/>

<!-- phone: the profile the engine keeps updating -->
<rect x="40" y="26" width="270" height="368" rx="34" fill="#0e1220" stroke="#ffffff26" stroke-width="1.5"/>
<g clip-path="url(#ph)">
  <rect x="40" y="26" width="270" height="116" fill="url(#cover)"/>
  <circle cx="60" cy="70" r="40" fill="#fff" opacity=".07" class="pulse"/>
  <circle cx="175" cy="132" r="42" fill="#0e1220"/>
  <circle cx="175" cy="132" r="37" fill="url(#av)"/>
  <text x="175" y="146" text-anchor="middle" font-size="38" font-weight="800" fill="#fff">A</text>
  <circle cx="204" cy="158" r="8" fill="#0e1220"/><circle cx="204" cy="158" r="5.5" fill="${GREEN}"><animate attributeName="opacity" values="1;.35;1" dur="1.8s" repeatCount="indefinite"/></circle>

  <g text-anchor="middle" font-weight="700" fill="#fff" font-size="21">
    ${slots(times.length, 6, (i) => `<text x="175" y="205" style="font-family:${/[۰-۹]/.test(times[i]) ? FA : SANS}">Arizo · ${times[i]}</text>`)}
  </g>
  <text x="175" y="226" text-anchor="middle" font-size="12" fill="#6b7390">name synced at second :00</text>
  <g text-anchor="middle" font-size="13" fill="#a5b4fc">${slots(bio.length, 6, (i) => `<text x="175" y="252">Sat 11 Oct · ${bio[i]} · Online</text>`)}</g>
  <rect x="60" y="266" width="230" height="1" fill="#ffffff14"/>
</g>
<g clip-path="url(#ph)">
  ${toggle(292, "Ghost mode", true, 0.12)}
  ${toggle(332, "Auto-secretary", true, 0.3)}
  ${toggle(372, "Night schedule", false, 0)}
</g>

<!-- helper bot log -->
<rect x="340" y="26" width="520" height="368" rx="30" fill="#0e1220" stroke="#ffffff26" stroke-width="1.5"/>
<circle cx="378" cy="55" r="17" fill="url(#av)"/><g transform="translate(378 55) scale(.34)">${plane()}</g>
<text x="404" y="52" font-size="15" font-weight="700" fill="#fff">Arizo Helper Bot</text>
<text x="404" y="69" font-size="11" fill="${GREEN}">● logging live</text>
<rect x="364" y="78" width="480" height="1" fill="#ffffff12"/>

${card(0, 0.08, RED, "🗑", "Deleted message recovered", "Sara · “Are we meeting at eight?”")}
${card(1, 0.28, "#f59e0b", "✏️", "Message edited", "“Meet at 8?”  →  “Meet at 9, sorry!”")}
${card(2, 0.48, PINK, "🔥", "View-once photo saved", "Omid · 5 s timer · original quality kept")}
${card(3, 0.68, VIOLET, "🍯", "Honeypot trap triggered", "185.220.101.x probed /.env · IP banned at the edge")}

<g opacity="0">${fade(D, 0.06, 0.945)}
  <circle cx="838" cy="55" r="4.5" fill="${RED}"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle>
  <text x="826" y="59" text-anchor="end" font-size="11" fill="#8b93ad" letter-spacing="1">4 EVENTS</text>
</g>
${spark(300, 400, .8, 0)}${spark(870, 395, .9, 1.4)}`;
  save("demo.svg", svg(W, H, body, "A live Telegram profile clock on the left and the helper bot logging deleted, edited and view-once messages on the right"));
}

// ─────────────────────────────────────────────── commands (typed in chat)
function terminal() {
  const W = 900, H = 340, D = 15;
  const cmds = [
    { cmd: ".ghost on", reply: "Ghost mode enabled · read receipts suppressed", c: "#c4b5fd" },
    { cmd: ".read all", reply: "24 chats marked as read, silently", c: SKY },
    { cmd: ".mute @spammer", reply: "Muted · 12 incoming messages purged for both sides", c: "#fca5a5" },
  ];
  const CW = 11.2;
  const blocks = cmds
    .map(({ cmd, reply, c }, i) => {
      const s = i / 3 + 0.004, e = (i + 1) / 3 - 0.01;
      const bw = cmd.length * CW + 38;
      const type0 = s + 0.02, type1 = s + 0.085;
      return `
  <g opacity="0">${fade(D, s, e)}
    <clipPath id="t${i}"><rect x="${580 - bw}" y="86" height="40"><animate attributeName="width" dur="${D}s" repeatCount="indefinite" keyTimes="${kt(norm([[0, 0], [type0, 0], [type1, 1], [1, 1]]))}" values="0;0;${bw};${bw}"/></rect></clipPath>
    <g>
      <rect x="${580 - bw}" y="86" width="${bw}" height="40" rx="14" fill="#5b3fd9"/>
      <text x="${580 - bw + 19}" y="112" font-family="${MONO}" font-size="19" fill="#fff" clip-path="url(#t${i})" textLength="${cmd.length * CW}" lengthAdjust="spacing">${cmd}</text>
      <rect y="94" width="2.4" height="24" rx="1" fill="#fff">
        ${tl("x", D, [[0, 580 - bw + 19], [type0, 580 - bw + 19], [type1, 580 - bw + 19 + cmd.length * CW], [1, 580 - bw + 19 + cmd.length * CW]])}
        ${tl("opacity", D, [[0, 0], [s, 0], [s + 0.012, 1], [type1 + 0.06, 1], [type1 + 0.07, 0], [1, 0]])}
      </rect>
    </g>
    <g opacity="0">${fade(D, type1 + 0.035, e)}
      <g>${slide(D, type1 + 0.035, -24, 0)}
        <rect x="36" y="148" width="${reply.length * 8.1 + 70}" height="52" rx="16" fill="#171c30" stroke="${c}" stroke-opacity=".55"/>
        <circle cx="62" cy="174" r="12" fill="url(#cav)"/><g transform="translate(62 174) scale(.2)">${plane()}</g>
        <text x="84" y="170" font-size="12" font-weight="700" fill="${c}">Arizo Self</text>
        <text x="84" y="188" font-size="13.5" fill="#e5e7eb">${reply}</text>
      </g>
    </g>
  </g>`;
    })
    .join("");

  // state panel values that flip as the commands run
  const flip = (x, y, a, b, flipAt, ca, cb) => `
    <text x="${x}" y="${y}" font-size="15" font-weight="800" fill="${ca}" text-anchor="end">${a}${tl("opacity", D, [[0, 1], [flipAt, 1], [flipAt + 0.012, 0], [0.99, 0], [1, 1]])}</text>
    <text x="${x}" y="${y}" font-size="15" font-weight="800" fill="${cb}" text-anchor="end" opacity="0">${b}${tl("opacity", D, [[0, 0], [flipAt, 0], [flipAt + 0.012, 1], [0.99, 1], [1, 0]])}</text>`;
  const row = (y, label) => `<rect x="640" y="${y - 22}" width="220" height="38" rx="12" fill="#151a2b"/><text x="654" y="${y + 3}" font-size="13" fill="#aab2cc">${label}</text>`;

  const body = `
<defs>
  <linearGradient id="tbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#151030"/></linearGradient>
  <linearGradient id="cav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${PURPLE}"/><stop offset="1" stop-color="${BLUE}"/></linearGradient>
</defs>
<style>${CSS}</style>
<rect width="${W}" height="${H}" rx="26" fill="url(#tbg)"/>
<rect x="14" y="14" width="872" height="312" rx="20" fill="#0b0e17" stroke="#ffffff1c"/>
<rect x="14" y="14" width="872" height="48" rx="20" fill="#141829"/><rect x="14" y="40" width="872" height="22" fill="#141829"/>
<circle cx="40" cy="38" r="6" fill="#ff5f57"/><circle cx="60" cy="38" r="6" fill="#febc2e"/><circle cx="80" cy="38" r="6" fill="#28c840"/>
<text x="450" y="43" text-anchor="middle" font-size="14" fill="#9aa3bd">Saved Messages · type a command, no panel needed</text>
<rect x="620" y="74" width="1" height="236" fill="#ffffff12"/>
${blocks}

<text x="640" y="88" font-size="11" fill="#6b7390" letter-spacing="2">ACCOUNT STATE</text>
${row(124, "Ghost mode")}${flip(844, 124, "OFF", "ON", 0.065, "#6b7390", GREEN)}
${row(170, "Unread chats")}${flip(844, 170, "24", "0", 0.4, "#fbbf24", GREEN)}
${row(216, "Muted users")}${flip(844, 216, "0", "1", 0.73, "#6b7390", RED)}
<rect x="640" y="248" width="220" height="48" rx="12" fill="none" stroke="#ffffff14" stroke-dasharray="4 5"/>
<text x="750" y="268" text-anchor="middle" font-size="12" fill="#6b7390">/start · /test · /status</text>
<text x="750" y="285" text-anchor="middle" font-size="11" fill="#4b5370">available in the helper bot</text>
<rect x="14" y="62" width="872" height="3" fill="none"/>
${spark(850, 100, .7, 0)}`;
  save("terminal.svg", svg(W, H, body, "Typing .ghost on, .read all and .mute in a Telegram chat and watching the account state change"));
}

// ─────────────────────────────────────────────── security (2FA ring + honeypot)
function security() {
  const W = 900, H = 330, D = 9;
  const codes = ["482 913", "095 276", "631 408"];
  const R = 46, C = 2 * Math.PI * R;
  const body = `
<defs>
  <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#171233"/></linearGradient>
  <filter id="sg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="36"/></filter>
  <filter id="sb" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
<style>${CSS}</style>
<rect width="${W}" height="${H}" rx="28" fill="url(#sbg)"/>
<circle cx="140" cy="300" r="110" fill="${PURPLE}" opacity=".3" filter="url(#sg)"/>
<circle cx="790" cy="30" r="100" fill="${GREEN}" opacity=".16" filter="url(#sg)"/>

<!-- authenticator -->
<rect x="30" y="30" width="330" height="270" rx="26" fill="#0e1220" stroke="#ffffff22"/>
<g transform="translate(62 62)">${icoLock("#c4b5fd")}</g>
<text x="82" y="67" font-size="15" font-weight="700" fill="#fff">Google Authenticator</text>
<text x="82" y="85" font-size="11" fill="#6b7390">RFC 6238 · TOTP</text>
<g transform="translate(195 178)">
  <circle r="${R}" fill="none" stroke="#ffffff14" stroke-width="7"/>
  <circle r="${R}" fill="none" stroke="${VIOLET}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" transform="rotate(-90)">
    <animate attributeName="stroke-dashoffset" dur="3s" repeatCount="indefinite" from="0" to="${C.toFixed(1)}"/>
    <animate attributeName="stroke" dur="3s" repeatCount="indefinite" keyTimes="0;.7;1" values="${VIOLET};${VIOLET};${RED}"/>
  </circle>
  <g font-family="${MONO}" font-size="23" font-weight="700" fill="#fff" text-anchor="middle">${slots(3, 9, (i) => `<text y="8">${codes[i]}</text>`)}</g>
</g>
<text x="195" y="252" text-anchor="middle" font-size="12" fill="#8b93ad">new 6-digit code every 30 s</text>
<rect x="76" y="266" width="238" height="22" rx="11" fill="#151a2b"/>
<text x="195" y="281" text-anchor="middle" font-size="11" fill="#a5b4fc">8 one-time recovery codes</text>

<!-- edge -->
<rect x="390" y="30" width="480" height="270" rx="26" fill="#0e1220" stroke="#ffffff22"/>
<text x="414" y="62" font-size="12" fill="#6b7390" letter-spacing="2">CLOUDFLARE EDGE</text>
<path d="M630 78 L690 98 V160 C690 196 664 222 630 240 C596 222 570 196 570 160 V98Z" fill="#151a2b" stroke="${VIOLET}" stroke-width="2"/>
<path d="M630 78 L690 98 V160 C690 196 664 222 630 240 C596 222 570 196 570 160 V98Z" fill="none" stroke="${VIOLET}" stroke-width="2" filter="url(#sb)" opacity=".7" class="pulse"/>
<g transform="translate(630 150) scale(1.5)">${icoLock("#c4b5fd")}</g>

<!-- lane 1: the owner passes -->
<g opacity="0">${fade(D, 0.02, 0.4)}
  <g>
    ${tlT("translate", D, [[0, "0 0"], [0.02, "0 0"], [0.35, "420 0"], [1, "420 0"]])}
    <rect x="410" y="104" width="124" height="34" rx="17" fill="#052e16" stroke="${GREEN}"/>
    <text x="472" y="126" text-anchor="middle" font-size="13" font-weight="700" fill="#bbf7d0">owner · 2FA ✓</text>
  </g>
</g>
<g opacity="0">${fade(D, 0.3, 0.56)}
  <text x="760" y="126" text-anchor="middle" font-size="13" fill="${GREEN}" font-weight="700">access granted</text>
</g>

<!-- lane 2: the scanner is trapped -->
<g opacity="0">${fade(D, 0.46, 0.64)}
  <g>
    ${tlT("translate", D, [[0, "0 0"], [0.46, "0 0"], [0.58, "78 0"], [1, "78 0"]])}
    <rect x="410" y="196" width="124" height="34" rx="17" fill="#3b0a1a" stroke="${RED}"/>
    <text x="472" y="218" text-anchor="middle" font-size="13" font-weight="700" fill="#fecdd3">GET /.env</text>
  </g>
</g>
<g opacity="0">${fade(D, 0.575, 0.7)}
  <circle cx="570" cy="213" fill="none" stroke="${RED}" stroke-width="3">
    ${tl("r", D, [[0, 4], [0.575, 4], [0.68, 46], [1, 46]])}
    ${tl("stroke-opacity", D, [[0, 1], [0.575, 1], [0.7, 0], [1, 0]])}
  </circle>
</g>
<g opacity="0">${fade(D, 0.62, 0.94)}
  <g>${slide(D, 0.62, 0, 12)}
    <rect x="690" y="188" width="150" height="46" rx="12" fill="#3b0a1a" stroke="${RED}" transform="rotate(-4 765 211)"/>
    <text x="765" y="208" text-anchor="middle" font-size="15" font-weight="800" fill="${RED}" letter-spacing="2" transform="rotate(-4 765 211)">IP BANNED</text>
    <text x="765" y="224" text-anchor="middle" font-size="11" fill="#fda4af" transform="rotate(-4 765 211)">alert sent to your bot</text>
  </g>
</g>
<text x="630" y="282" text-anchor="middle" font-size="12" fill="#6b7390">hostile probes die at the edge · owner traffic pays zero latency</text>
${spark(380, 310, .8, .5)}${spark(880, 300, .8, 1.5)}`;
  save("security.svg", svg(W, H, body, "A rotating 2FA code and the Cloudflare edge letting the owner through while banning a scanner"));
}

// ─────────────────────────────────────────────── architecture flow
function flow() {
  const W = 1200, H = 210, D = 4;
  const node = (cx, title, sub, color, art) => `
  <g transform="translate(${cx} 105)">
    <rect x="-96" y="-58" width="192" height="116" rx="26" fill="#0e1220" stroke="${color}" stroke-opacity=".7" stroke-width="1.6"/>
    <rect x="-96" y="-58" width="192" height="116" rx="26" fill="none" stroke="${color}" stroke-width="2" class="pulse" opacity=".4"/>
    <g transform="translate(0 -20) scale(1.3)">${art}</g>
    <text y="22" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">${title}</text>
    <text y="42" text-anchor="middle" font-size="12" fill="#8b93ad">${sub}</text>
  </g>`;
  const link = (x1, x2, label, color, delay) => `
  <path id="p${x1}" d="M${x1} 105 H${x2}" stroke="${color}" stroke-opacity=".35" stroke-width="2.4" stroke-dasharray="7 9" fill="none">
    <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.2s" repeatCount="indefinite"/></path>
  ${[0, 1, 2].map((k) => `<circle r="5.5" fill="${color}"><animateMotion dur="${D}s" begin="${(k * D) / 3 + delay}s" repeatCount="indefinite" path="M${x1} 105 H${x2}"/></circle>`).join("")}
  <text x="${(x1 + x2) / 2}" y="88" text-anchor="middle" font-size="13" font-weight="700" fill="${color}">${label}</text>`;
  const cloud = `<path d="M-14 8 H12 a8 8 0 0 0 1-16 a11 11 0 0 0-21-3 a9 9 0 0 0 8 19Z" fill="#f38020"/>`;
  const bolt = `<path d="M3 -13 L-8 3 H-1 L-4 14 L9 -3 H2Z" fill="#4ade80"/>`;
  const tg = `<circle r="13" fill="#26A5E4"/><g transform="scale(.36)">${plane()}</g>`;
  const body = `
<defs><linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#151030"/></linearGradient></defs>
<style>${CSS}</style>
<rect width="${W}" height="${H}" rx="26" fill="url(#fbg)"/>
${stars(16, W, H)}
${link(296, 504, "sync · 10 s", VIOLET, 0)}
${link(696, 904, "MTProto · under 40 ms", SKY, 0.6)}
${node(200, "Cloudflare Edge", "Workers · KV · Mini App", "#f38020", cloud)}
${node(600, "24/7 Engine", "Runner · warm sockets · cache", GREEN, bolt)}
${node(1000, "Telegram", "Account · Helper bot", "#26A5E4", tg)}
<text x="600" y="196" text-anchor="middle" font-size="12" fill="#6b7390">no dedicated server · runs on GitHub Actions or any VPS</text>
<rect width="${W}" height="${H}" rx="26" fill="none" stroke="#ffffff14"/>`;
  save("flow.svg", svg(W, H, body, "Data flows from the Cloudflare edge to the engine and on to Telegram"));
}

// ─────────────────────────────────────────────── marquee
function marquee() {
  const W = 1200, H = 52, GAP = 252;
  const items = [
    "Atomic clock · sub-40ms",
    "Ghost mode",
    "Anti-delete & anti-edit",
    "View-once saver",
    "Google 2FA · RFC 6238",
    "Zero-trust honeypot",
    "AES-256-GCM backups",
    "Telegram Mini App",
    "AI smart reply",
    "Free on Cloudflare Workers",
  ];
  const row = (off) =>
    items.map((t, i) => `<circle cx="${off + i * GAP + 12}" cy="26" r="3.5" fill="${i % 2 ? SKY : VIOLET}"/><text x="${off + i * GAP + 26}" y="32" font-size="17" fill="#d6d9ec">${t}</text>`).join("");
  const total = items.length * GAP;
  const body = `
<defs>
  <linearGradient id="fade" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".07" stop-color="#fff"/><stop offset=".93" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
  <mask id="m"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
</defs>
<style>text{font-family:${SANS}}</style>
<rect width="${W}" height="${H}" rx="26" fill="#0c0f1a" stroke="#ffffff14"/>
<g mask="url(#m)"><g>
  ${row(0)}${row(total)}
  <animateTransform attributeName="transform" type="translate" from="0 0" to="-${total} 0" dur="40s" repeatCount="indefinite"/>
</g></g>`;
  save("marquee.svg", svg(W, H, body, "Feature ticker"));
}

// ─────────────────────────────────────────────── divider
function divider() {
  const W = 1200, H = 28;
  const sp = `calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"`;
  const body = `
<defs>
  <linearGradient id="ln" x1="0" x2="1"><stop offset="0" stop-color="${PURPLE}" stop-opacity="0"/><stop offset=".3" stop-color="${PURPLE}"/><stop offset=".7" stop-color="${BLUE}"/><stop offset="1" stop-color="${BLUE}" stop-opacity="0"/></linearGradient>
  <filter id="g" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<rect x="60" y="13" width="1080" height="2" rx="1" fill="url(#ln)" opacity=".7"/>
<circle r="5" cy="14" fill="#fff" filter="url(#g)"><animate attributeName="cx" values="80;1120;80" dur="7s" repeatCount="indefinite" ${sp}/></circle>
<circle r="2.2" cy="14" fill="#fff"><animate attributeName="cx" values="80;1120;80" dur="7s" repeatCount="indefinite" ${sp}/></circle>
<g transform="translate(600 14)"><path d="M0-9 L9 0 0 9 -9 0Z" fill="#0b0e17" stroke="${VIOLET}" stroke-width="2"><animateTransform attributeName="transform" type="rotate" values="0;90" dur="4s" repeatCount="indefinite"/></path>
<circle r="3" fill="${SKY}"><animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/></circle></g>`;
  save("divider.svg", svg(W, H, body, ""));
}

// ─────────────────────────────────────────────── footer
function footer() {
  const W = 1200, H = 200;
  const wave = (a, b, c) => `M0 ${a} C 200 ${a - 40}, 400 ${a + 40}, 600 ${a} S 1000 ${b}, 1200 ${c} V${H} H0 Z`;
  const body = `
<defs>
  <linearGradient id="fbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0d18"/><stop offset="1" stop-color="#181336"/></linearGradient>
  <linearGradient id="w1" x1="0" x2="1"><stop offset="0" stop-color="${PURPLE}" stop-opacity=".6"/><stop offset="1" stop-color="${BLUE}" stop-opacity=".6"/></linearGradient>
  <clipPath id="fc"><rect width="${W}" height="${H}" rx="26"/></clipPath>
</defs>
<style>${CSS}</style>
<g clip-path="url(#fc)">
  <rect width="${W}" height="${H}" fill="url(#fbg)"/>
  ${stars(22, W, 120)}
  <path fill="url(#w1)" opacity=".5"><animate attributeName="d" dur="9s" repeatCount="indefinite" values="${wave(130, 168, 130)};${wave(150, 118, 160)};${wave(130, 168, 130)}"/></path>
  <path fill="url(#w1)" opacity=".35"><animate attributeName="d" dur="12s" repeatCount="indefinite" values="${wave(160, 128, 168)};${wave(140, 176, 128)};${wave(160, 128, 168)}"/></path>
  <g>
    <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" path="M-60 150 C 200 30, 400 160, 600 90 S 1000 20, 1260 110"/>
    <g transform="scale(.7)">${plane()}</g>
  </g>
  <text x="48" y="78" font-size="23" font-weight="700" fill="#fff">Made with <tspan fill="#ff7a9c">♥</tspan> by Arizo Team</text>
  <text x="48" y="108" font-size="15" fill="#9aa0b8">If this saved you time, a ⭐ on the repo helps a lot.</text>
  <text x="1152" y="78" text-anchor="end" font-size="20" font-weight="700" fill="#fff">arizo-self.arizosupport.workers.dev</text>
  <text x="1152" y="108" text-anchor="start" font-size="15" fill="#9aa0b8" direction="rtl" style="font-family:${FA}">اگر به کارتان آمد، یک ⭐ بدهید</text>
  ${spark(300, 150, .9, 0)}${spark(900, 60, 1.1, 1)}${spark(1060, 150, .7, 2)}
</g>
<rect width="${W}" height="${H}" rx="26" fill="none" stroke="#ffffff14"/>`;
  save("footer.svg", svg(W, H, body, "Made by Arizo Team"));
}

banner(); demo(); terminal(); security(); flow(); marquee(); divider(); footer();
console.log(`README art written to ${outDir}`);
