const res = await fetch(`https://vista-atelier.vercel.app/?t=${Date.now()}`);
const html = await res.text();
const hrefs = [...html.matchAll(/href="(\/_next\/static\/[^"]+\.css)"/g)].map((m) => m[1]);
console.log("css files:", hrefs.length);

let combined = "";
for (const href of hrefs) {
  const css = await fetch(`https://vista-atelier.vercel.app${href}`).then((r) => r.text());
  combined += css;
  console.log(href.split("/").pop(), css.length);
}

console.log("\ntotal css bytes:", combined.length);
for (const term of ["render-sharp", "crisp-image", "optimizeLegibility", "image-rendering", "cosmic-section-inner", "-webkit-font-smoothing"]) {
  console.log(`${term}:`, combined.includes(term));
}