/**
 * Retina + mobile sharpness audit for production.
 * Simulates browser srcset selection and validates CSS/image delivery.
 */
const BASE = "https://vista-atelier.vercel.app";
const bust = `t=${Date.now()}`;

const VIEWPORTS = [
  { name: "iPhone 15 Pro", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1", width: 390, dpr: 3 },
  { name: "iPhone SE", ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1", width: 375, dpr: 2 },
  { name: "iPad Air", ua: "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1", width: 820, dpr: 2 },
  { name: "MacBook Retina", ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15", width: 1440, dpr: 2 },
  { name: "4K Desktop", ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", width: 2560, dpr: 1 },
];

function pickSrcset(srcset, viewportPx, dpr) {
  const needed = Math.ceil(viewportPx * dpr);
  const candidates = [...srcset.replace(/&amp;/g, "&").matchAll(/(\S+) (\d+)w/g)].map((m) => ({
    url: m[1],
    w: Number(m[2]),
  }));
  if (!candidates.length) return null;

  let picked = candidates
    .filter((c) => c.w >= needed)
    .sort((a, b) => a.w - b.w)[0];
  if (!picked) picked = candidates.sort((a, b) => b.w - a.w)[0];
  return { needed, picked, candidates: candidates.length };
}

function parseImgTags(html) {
  return [...html.matchAll(/<img[^>]+>/gi)].map((m) => {
    const tag = m[0];
    const cls = tag.match(/class="([^"]*)"/i)?.[1] ?? "";
    const srcset = tag.match(/srcSet="([^"]+)"/i)?.[1] ?? "";
    const sizes = tag.match(/sizes="([^"]+)"/i)?.[1] ?? "";
    const src = tag.match(/src="([^"]+)"/i)?.[1] ?? "";
    return { cls, srcset, sizes, src, tag };
  });
}

/** Read JPEG/WebP/AVIF intrinsic width from response bytes */
function readImageWidth(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker === 0xc0 || marker === 0xc2) {
        return buf.readUInt16BE(i + 7);
      }
      i += 2 + len;
    }
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") {
      return buf.readUInt16LE(26) & 0x3fff;
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return (bits & 0x3fff) + 1;
    }
    if (chunk === "VP8X") {
      return 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    }
  }
  return null;
}

async function fetchHtml(viewport) {
  const res = await fetch(`${BASE}/?${bust}`, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      "User-Agent": viewport.ua,
    },
  });
  return { status: res.status, html: await res.text() };
}

async function fetchCssBundle(html) {
  const cssHref = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
  if (!cssHref) return "";
  const res = await fetch(`${BASE}${cssHref}`, { headers: { "Cache-Control": "no-cache" } });
  return res.ok ? await res.text() : "";
}

async function probeImage(relativeUrl) {
  const url = relativeUrl.startsWith("http") ? relativeUrl : `${BASE}${relativeUrl}`;
  const res = await fetch(url);
  const buf = Buffer.from(await res.arrayBuffer());
  const intrinsicW = readImageWidth(buf);
  const q = url.match(/[?&]q=(\d+)/)?.[1];
  const wParam = url.match(/[?&]w=(\d+)/)?.[1];
  return {
    ok: res.ok,
    bytes: buf.length,
    type: res.headers.get("content-type"),
    intrinsicW,
    q: q ? Number(q) : null,
    wParam: wParam ? Number(wParam) : null,
    url: url.slice(0, 180),
  };
}

const results = { pass: [], fail: [], warn: [] };
const pass = (m) => results.pass.push(m);
const fail = (m) => results.fail.push(m);
const warn = (m) => results.warn.push(m);

console.log("═".repeat(60));
console.log("VISTA Atelier — Retina / Mobile Sharpness Audit");
console.log(BASE);
console.log("═".repeat(60));

// ── 1. HTML + CSS structural checks (mobile UA) ──
const mobile = VIEWPORTS[0];
const { status, html } = await fetchHtml(mobile);
if (status !== 200) fail(`Homepage HTTP ${status}`);
else pass(`Homepage HTTP 200`);

if (html.includes("render-sharp")) pass("render-sharp class on <html>");
else fail("Missing render-sharp class");

if (html.includes("--font-dm-sans") || html.includes("dm_sans")) pass("DM Sans font loaded");
else fail("DM Sans font not loaded");

if (html.includes('data-perf="lite"') || html.includes("data-perf='lite'")) {
  pass("Mobile lite perf mode attribute present");
} else {
  warn("data-perf=lite not in SSR HTML (may be set client-side for mobile)");
}

const heroImgs = parseImgTags(html).filter((i) => i.cls.includes("hero-static-img") || i.cls.includes("hero-desktop-poster"));
if (heroImgs.length === 0) {
  warn("Hero image not in mobile SSR (desktop-only hero is expected on some breakpoints)");
} else {
  for (const h of heroImgs) {
    if (h.cls.includes("crisp-image")) pass("Hero has crisp-image class");
    else fail("Hero missing crisp-image");
    if (h.srcset && !h.srcset.includes("hero-poster.jpg")) pass("Hero srcset uses optimized remote source");
    else if (h.src.includes("hero-poster.jpg")) fail("Hero still serving local hero-poster.jpg");
  }
}

const css = await fetchCssBundle(html);
if (!css) {
  warn("Could not fetch CSS bundle");
} else {
  const checks = [
    { label: "No reveal rotateX in CSS", ok: !/\.reveal-(cinematic|lift|scale)[^{]*\{[^}]*rotateX/.test(css) },
    { label: "cosmic-section-inner flat (no preserve-3d)", ok: !/\.cosmic-section-inner[^}]*preserve-3d/.test(css) },
    { label: "render-sharp typography rules", ok: css.includes(".render-sharp") && css.includes("optimizeLegibility") },
    { label: "Global image-rendering on html", ok: /html\{[^}]*image-rendering/.test(css.replace(/\s+/g, "")) || css.includes("image-rendering:-webkit-optimize-contrast") || css.includes("image-rendering: -webkit-optimize-contrast") },
    { label: "crisp-image rules present", ok: css.includes(".crisp-image") },
    { label: "gpu-layer without backface hidden", ok: !/\.gpu-layer\{[^}]*backface-visibility:\s*hidden/.test(css.replace(/\s+/g, " ")) },
  ];
  for (const c of checks) (c.ok ? pass : fail)(`CSS: ${c.label}`);
}

// ── 2. Per-viewport hero srcset simulation ──
console.log("\n── Viewport srcset simulation ──\n");

for (const vp of VIEWPORTS) {
  const { html: vpHtml } = await fetchHtml(vp);
  const imgs = parseImgTags(vpHtml);
  const hero = imgs.find((i) => i.cls.includes("hero-static-img") || i.cls.includes("hero-desktop-poster") || i.cls.includes("crisp-image") && i.srcset);
  const target = hero ?? imgs.find((i) => i.srcset && i.cls.includes("crisp-image"));

  if (!target?.srcset) {
    console.log(`[${vp.name}] ${vp.width}px @${vp.dpr}x — no hero in SSR HTML (desktop video path)`);
    continue;
  }

  const { needed, picked } = pickSrcset(target.srcset, vp.width, vp.dpr);
  const probe = await probeImage(picked.url);
  const sharpEnough = probe.intrinsicW ? probe.intrinsicW >= needed * 0.85 : picked.w >= needed * 0.85;
  const highQ = probe.q === null || probe.q >= 90;

  console.log(`[${vp.name}] ${vp.width}px @${vp.dpr}x → need ~${needed}px`);
  console.log(`  picked: ${picked.w}w | q=${probe.q ?? "?"} | ${probe.bytes} bytes | intrinsic=${probe.intrinsicW ?? "?"}px`);

  if (sharpEnough && highQ) pass(`${vp.name}: ${picked.w}w ≥ ${needed}px needed, q=${probe.q}`);
  else if (!sharpEnough) fail(`${vp.name}: undersized — ${probe.intrinsicW ?? picked.w}px < ${needed}px needed`);
  else fail(`${vp.name}: low quality q=${probe.q}`);
}

// ── 3. Portfolio / project images on mobile HTML ──
const portfolioImgs = parseImgTags(html).filter((i) => i.srcset && i.cls.includes("crisp-image") && !i.cls.includes("hero"));
if (portfolioImgs.length) {
  const sample = portfolioImgs[0];
  const { needed, picked } = pickSrcset(sample.srcset, 390, 3);
  const probe = await probeImage(picked.url);
  console.log(`\n── Portfolio sample (mobile) ──`);
  console.log(`  picked: ${picked.w}w | intrinsic=${probe.intrinsicW}px | q=${probe.q} | ${probe.bytes} bytes`);
  if ((probe.intrinsicW ?? picked.w) >= needed * 0.7 && (probe.q ?? 100) >= 85) {
    pass(`Portfolio image sharp enough for mobile (${probe.intrinsicW ?? picked.w}px)`);
  } else {
    fail(`Portfolio image may be soft on mobile`);
  }
} else {
  warn("No portfolio crisp-image in mobile SSR HTML (below-fold lazy)");
}

// ── 4. Summary ──
console.log("\n" + "═".repeat(60));
console.log(`PASS: ${results.pass.length}  |  WARN: ${results.warn.length}  |  FAIL: ${results.fail.length}`);
console.log("═".repeat(60));

if (results.fail.length) {
  console.log("\nFailures:");
  results.fail.forEach((f) => console.log("  ✗", f));
}
if (results.warn.length) {
  console.log("\nWarnings:");
  results.warn.forEach((w) => console.log("  !", w));
}

process.exit(results.fail.length ? 1 : 0);