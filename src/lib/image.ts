/** next/image quality — max clarity for Retina / 4K */
export const IMAGE_QUALITY = {
  hero: 100,
  heroLite: 98,
  featured: 95,
  featuredLite: 92,
  default: 92,
  defaultLite: 90,
} as const;

/** Sizes tuned for 2× DPR — Next serves appropriately wide srcset */
export const IMAGE_SIZES = {
  hero: "(max-width: 640px) 100vw, (max-width: 1023px) 100vw, (max-width: 1920px) 100vw, 3840px",
  full: "(max-width: 768px) 100vw, (max-width: 1600px) 100vw, 2560px",
  half: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 960px",
  project:
    "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1920px) 33vw, 960px",
  journal:
    "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px",
} as const;