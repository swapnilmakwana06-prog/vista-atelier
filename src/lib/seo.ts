export const siteConfig = {
  name: "VISTA Atelier",
  shortName: "VISTA",
  title: "VISTA Atelier — Luxury Interior Design Studio",
  tagline: "Crafting Timeless Spaces That Whisper Luxury",
  description:
    "Award-winning luxury interior design studio crafting cinematic, timeless residential, hospitality, and commercial interiors across Manhattan, Paris, Milan, and beyond.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vista-atelier.vercel.app",
  email: "studio@vistaatelier.com",
  phone: "+1-212-555-0148",
  locale: "en_US",
  twitterHandle: "@vistaatelier",
  keywords: [
    "luxury interior design",
    "interior design studio",
    "residential interior design",
    "hospitality design",
    "commercial interiors",
    "bespoke interiors",
    "New York interior designer",
    "VISTA Atelier",
    "timeless luxury spaces",
    "high-end interior architecture",
  ] as string[],
  address: {
    street: "480 Madison Avenue",
    city: "New York",
    region: "NY",
    postalCode: "10022",
    country: "US",
  },
} as const;

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}