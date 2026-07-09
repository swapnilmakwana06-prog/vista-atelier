import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://vista-atelier.vercel.app";
const outDir = path.join(process.cwd(), "scripts", "screenshots");

const targets = [
  { name: "iphone-15-pro", device: devices["iPhone 15 Pro"] },
  { name: "iphone-se", device: devices["iPhone SE"] },
  { name: "ipad-air", device: devices["iPad (gen 7)"] },
  { name: "macbook-retina", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const t of targets) {
  const context = await browser.newContext(
    t.device
      ? { ...t.device, locale: "en-US" }
      : { viewport: t.viewport, deviceScaleFactor: t.deviceScaleFactor, userAgent: devices["Desktop Chrome"].userAgent }
  );
  const page = await context.newPage();
  await page.goto(`${BASE}/?t=${Date.now()}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);

  const metrics = await page.evaluate(() => {
    const html = document.documentElement;
    const hero = document.querySelector(".hero-static-img, .hero-desktop-poster, .crisp-image");
    const heroRect = hero?.getBoundingClientRect();
    const heroImg = hero instanceof HTMLImageElement ? hero : null;
    const cs = hero ? getComputedStyle(hero) : null;
    const h1 = document.querySelector(".hero-headline, h1");
    const h1cs = h1 ? getComputedStyle(h1) : null;
    return {
      perf: html.getAttribute("data-perf"),
      renderSharp: html.classList.contains("render-sharp"),
      hero: heroImg
        ? {
            naturalW: heroImg.naturalWidth,
            naturalH: heroImg.naturalHeight,
            displayW: Math.round(heroRect?.width ?? 0),
            displayH: Math.round(heroRect?.height ?? 0),
            dpr: window.devicePixelRatio,
            transform: cs?.transform,
            filter: cs?.filter,
            imageRendering: cs?.imageRendering,
            currentSrc: heroImg.currentSrc.slice(0, 120),
          }
        : null,
      headline: h1cs
        ? {
            fontFamily: h1cs.fontFamily.slice(0, 60),
            webkitFontSmoothing: h1cs.getPropertyValue("-webkit-font-smoothing"),
            textRendering: h1cs.textRendering,
            transform: h1cs.transform,
          }
        : null,
    };
  });

  const file = path.join(outDir, `${t.name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  results.push({ name: t.name, file, metrics });
  await context.close();
}

await browser.close();

console.log(JSON.stringify(results, null, 2));