import { chromium, devices } from "@playwright/test";

const BASE = "https://vista-atelier.vercel.app";

function imageWidth(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker === 0xc0 || marker === 0xc2) return buf.readUInt16BE(i + 7);
      i += 2 + len;
    }
  }
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    if (chunk === "VP8 ") return buf.readUInt16LE(26) & 0x3fff;
    if (chunk === "VP8L") return (buf.readUInt32LE(21) & 0x3fff) + 1;
  }
  return null;
}

const targets = [
  { name: "iPhone 15 Pro", device: devices["iPhone 15 Pro"] },
  { name: "iPhone SE", device: devices["iPhone SE"] },
  { name: "iPad (gen 7)", device: devices["iPad (gen 7)"] },
  { name: "MacBook Retina", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
];

const browser = await chromium.launch();
const rows = [];

for (const t of targets) {
  const context = await browser.newContext(
    t.device ? { ...t.device } : { viewport: t.viewport, deviceScaleFactor: t.deviceScaleFactor, userAgent: devices["Desktop Chrome"].userAgent }
  );
  const page = await context.newPage();

  await page.goto(`${BASE}/?t=${Date.now()}`, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);

  const data = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll(".hero-static-img, .hero-desktop-poster")];
    const img = imgs.find((node) => {
      if (!(node instanceof HTMLImageElement)) return false;
      const r = node.getBoundingClientRect();
      return r.width > 50 && r.height > 50;
    });
    if (!(img instanceof HTMLImageElement)) return null;
    const rect = img.getBoundingClientRect();
    const dpr = window.devicePixelRatio;
    const needed = Math.ceil(rect.width * dpr);
    const cs = getComputedStyle(img);
    const h1 = document.querySelector(".hero-headline, h1");
    const h1cs = h1 ? getComputedStyle(h1) : null;
    return {
      dpr,
      displayW: Math.round(rect.width),
      neededPx: needed,
      naturalW: img.naturalWidth,
      currentSrc: img.currentSrc,
      transform: cs.transform,
      filter: cs.filter,
      imageRendering: cs.imageRendering,
      headline: h1cs
        ? {
            fontFamily: h1cs.fontFamily.split(",")[0],
            webkitFontSmoothing: h1cs.getPropertyValue("-webkit-font-smoothing"),
            textRendering: h1cs.textRendering,
            transform: h1cs.transform,
          }
        : null,
      perf: document.documentElement.getAttribute("data-perf"),
      renderSharp: document.documentElement.classList.contains("render-sharp"),
    };
  });

  let fileW = null;
  let fileBytes = 0;
  if (data?.currentSrc) {
    const buf = Buffer.from(await fetch(data.currentSrc).then((r) => r.arrayBuffer()));
    fileW = imageWidth(buf);
    fileBytes = buf.length;
  }

  const sharp = fileW ? fileW >= data.neededPx * 0.85 : false;
  rows.push({ device: t.name, ...data, fileW, fileBytes, sharp });
  await context.close();
}

await browser.close();

console.log("═".repeat(70));
console.log("Retina verification — decoded file pixels vs display need");
console.log("═".repeat(70));

let fails = 0;
for (const r of rows) {
  const status = r.sharp ? "PASS" : "FAIL";
  if (!r.sharp) fails++;
  const q = r.currentSrc?.match(/[?&]q=(\d+)/)?.[1];
  const w = r.currentSrc?.match(/[?&]w=(\d+)/)?.[1];
  console.log(`\n[${status}] ${r.device}`);
  console.log(`  display: ${r.displayW}px @${r.dpr}x → needs ${r.neededPx}px`);
  console.log(`  file:    ${r.fileW}px (${r.fileBytes} bytes) from w=${w} q=${q}`);
  console.log(`  CSS: transform=${r.transform} filter=${r.filter} image-rendering=${r.imageRendering}`);
  console.log(`  text: ${r.headline?.fontFamily} | smoothing=${r.headline?.webkitFontSmoothing} | rendering=${r.headline?.textRendering}`);
  console.log(`  theme: render-sharp=${r.renderSharp} perf=${r.perf}`);
}

console.log("\n" + "═".repeat(70));
console.log(fails ? `FAILED: ${fails} device(s)` : "ALL DEVICES SHARP");
process.exit(fails ? 1 : 0);