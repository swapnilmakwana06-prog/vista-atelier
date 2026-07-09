/** next/image quality tiers — hero uses max for Retina/4K clarity */
export const IMAGE_QUALITY = {
  hero: 95,
  heroLite: 90,
  featured: 88,
  featuredLite: 76,
  default: 82,
  defaultLite: 70,
} as const;

export const IMAGE_SIZES = {
  hero: "(max-width: 1023px) 100vw, (max-width: 1920px) 100vw, 2560px",
  full: "(max-width: 768px) 100vw, (max-width: 1600px) 100vw, 1600px",
  half: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw",
  project:
    "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1920px) 33vw, 640px",
  journal:
    "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, 480px",
} as const;