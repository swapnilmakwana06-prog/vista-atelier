import { readFileSync } from "fs";

const r = JSON.parse(readFileSync("./lighthouse-mobile.json", "utf8"));
const c = r.categories;
const a = r.audits;

console.log("=== MOBILE LIGHTHOUSE — vista-atelier.vercel.app ===\n");
console.log("Category Scores");
for (const [k, v] of Object.entries(c)) {
  console.log(`  ${v.title}: ${Math.round(v.score * 100)}`);
}

console.log("\nCore Web Vitals & Metrics");
const metrics = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
  "interactive",
];
for (const id of metrics) {
  const x = a[id];
  if (x) {
    const score = x.score != null ? ` (score ${Math.round(x.score * 100)})` : "";
    console.log(`  ${x.title}: ${x.displayValue}${score}`);
  }
}

console.log("\nTop Opportunities");
const opps = r.categories.performance.auditRefs
  .filter(
    (x) =>
      x.group === "load-opportunities" &&
      a[x.id] &&
      a[x.id].score !== null &&
      a[x.id].score < 1
  )
  .slice(0, 10);
for (const x of opps) {
  console.log(`  - ${a[x.id].title}: ${a[x.id].displayValue || "see report"}`);
}

console.log("\nKey Diagnostics");
const diag = [
  "mainthread-work-breakdown",
  "bootup-time",
  "dom-size",
  "unsized-images",
  "render-blocking-resources",
  "uses-long-cache-ttl",
  "modern-image-formats",
  "total-byte-weight",
  "largest-contentful-paint-element",
  "layout-shifts",
];
for (const id of diag) {
  const x = a[id];
  if (x?.displayValue) {
    console.log(`  - ${x.title}: ${x.displayValue}`);
  }
}