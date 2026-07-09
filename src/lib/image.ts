/** next/image quality — max clarity for Retina / 4K */
export const IMAGE_QUALITY = {
  hero: 100,
  heroLite: 98,
  featured: 95,
  featuredLite: 92,
  default: 92,
  defaultLite: 90,
} as const;

/**
 * Sizes tuned for 3× DPR mobile and 4K desktop.
 * Next.js generates srcset from deviceSizes + these hints.
 */
export const IMAGE_SIZES = {
  hero: "(max-width: 430px) 100vw, (max-width: 768px) 100vw, (max-width: 1023px) 100vw, (max-width: 1920px) 100vw, 3840px",
  full: "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, (max-width: 1920px) 100vw, 2560px",
  half: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 960px",
  project:
    "(max-width: 430px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1920px) 33vw, 1080px",
  journal:
    "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px",
} as const;

/** Explicit defaults — always use Next optimizer (never unoptimized). */
export const IMAGE_DEFAULTS = {
  unoptimized: false as const,
  decoding: "async" as const,
};