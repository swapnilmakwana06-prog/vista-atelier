import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = path.join(process.cwd(), "scripts", "screenshots", "loader");

await mkdir(outDir, { recursive: true });

const targets = [
  { name: "iphone-15-pro", device: devices["iPhone 15 Pro"] },
  { name: "macbook-retina", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
];

const browser = await chromium.launch();

for (const t of targets) {
  const context = await browser.newContext(
    t.device
      ? { ...t.device }
      : { viewport: t.viewport, deviceScaleFactor: t.deviceScaleFactor, userAgent: devices["Desktop Chrome"].userAgent }
  );
  const page = await context.newPage();
  await page.goto(`${BASE}/?loader-test=${Date.now()}`, { waitUntil: "commit" });
  await page.waitForSelector("#vista-initial-loader, .luxury-loader", { timeout: 10000 });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(outDir, `${t.name}-loader.png`),
    fullPage: false,
  });
  const info = await page.evaluate(() => ({
    hasSsr: !!document.getElementById("vista-initial-loader"),
    hasReact: !!document.querySelector(".luxury-loader:not(#vista-initial-loader)"),
    dataLoading: document.documentElement.getAttribute("data-loading"),
    perf: document.documentElement.getAttribute("data-perf"),
  }));
  console.log(t.name, info);
  await context.close();
}

await browser.close();