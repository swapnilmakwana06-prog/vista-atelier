const url = `https://vista-atelier.vercel.app/?t=${Date.now()}`;
const res = await fetch(url, {
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
});
const html = await res.text();

const heroTag = [...html.matchAll(/<img[^>]+hero-static-img[^>]+>/g)][0]?.[0] ?? "";
const srcsetMatch = heroTag.match(/srcSet="([^"]+)"/i);
const sizesMatch = heroTag.match(/sizes="([^"]+)"/i);

console.log("status:", res.status);
console.log("hero crisp-image:", heroTag.includes("crisp-image"));
console.log("sizes:", sizesMatch?.[1] ?? "n/a");
console.log("\nfull srcset:");
console.log((srcsetMatch?.[1] ?? "n/a").replace(/&amp;/g, "&"));

// Simulate iPhone 14 Pro (390 CSS px @ 3x DPR → browser picks ~828–1080w slot)
const srcset = (srcsetMatch?.[1] ?? "").replace(/&amp;/g, "&");
const candidates = [...srcset.matchAll(/(\/_next\/image[^ ]+) (\d+)w/g)];
const viewport = 390;
const dpr = 3;
const needed = viewport * dpr;
let picked = candidates.reduce((best, c) => {
  const w = Number(c[2]);
  if (w >= needed && (!best || w < best.w)) return { w, url: c[1] };
  return best;
}, null);
if (!picked && candidates.length) {
  const last = candidates[candidates.length - 1];
  picked = { w: Number(last[2]), url: last[1] };
}

if (picked) {
  const imgUrl = `https://vista-atelier.vercel.app${picked.url}`;
  console.log(`\nretina pick for ${viewport}px @${dpr}x (need ~${needed}px): ${picked.w}w`);
  console.log(imgUrl.slice(0, 220));

  const head = await fetch(imgUrl, { method: "HEAD" });
  console.log("content-type:", head.headers.get("content-type"));
  console.log("content-length:", head.headers.get("content-length"), "bytes");
  const q = imgUrl.match(/[?&]q=(\d+)/)?.[1];
  console.log("quality param:", q ?? "n/a");
}