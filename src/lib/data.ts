import type {
  JournalArticle,
  ProcessStep,
  Project,
  Service,
  Testimonial,
} from "@/types";

const img = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=90&fm=webp&dpr=2`;

export const studioStats = [
  { value: "18+", label: "Years of Practice" },
  { value: "120+", label: "Completed Projects" },
  { value: "14", label: "Design Awards" },
];

export const contactInfo = {
  email: "studio@vistaatelier.com",
  phone: "+1 (212) 555-0148",
  address: "480 Madison Avenue, New York",
  hours: "Mon – Fri, 9am – 6pm EST",
};

export const philosophyMaterials = [
  "Calacatta Marble",
  "American Walnut",
  "Brushed Brass",
  "Bouclé Linen",
];

export const philosophyContent = {
  label: "Philosophy",
  title: "Design is not decoration. It is",
  highlight: "the architecture of feeling.",
  description:
    "At VISTA Atelier, we compose environments where negative space breathes, materials age with grace, and every silhouette is measured against emotion — not trend.",
  quote: "We do not fill rooms. We compose atmospheres.",
  pillars: [
    {
      title: "Material Honesty",
      text: "Stone, wood, and metal chosen for how they catch light — never for novelty alone.",
    },
    {
      title: "Cinematic Proportion",
      text: "Every axis calibrated to create pause, discovery, and quiet drama.",
    },
    {
      title: "Bespoke Permanence",
      text: "Spaces conceived to feel inevitable today and treasured for decades.",
    },
  ],
  primaryImage: img("photo-1600607687939-ce8a6c25118c", 1920),
  accentImage: img("photo-1618221195710-dd6b41faaea6", 1200),
} as const;

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export const navLinks = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const services: Service[] = [
  {
    id: "residential",
    title: "Residential Interiors",
    description:
      "Bespoke homes where materiality, light, and proportion converge into living art.",
    icon: "home",
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    description:
      "Brand-defining environments that elevate presence through architectural restraint.",
    icon: "building",
  },
  {
    id: "hospitality",
    title: "Hospitality Design",
    description:
      "Immersive guest experiences crafted with cinematic atmosphere and tactile luxury.",
    icon: "key",
  },
  {
    id: "consultation",
    title: "Design Consultation",
    description:
      "Strategic visioning sessions to refine your aesthetic direction and spatial narrative.",
    icon: "compass",
  },
];

export const projects: Project[] = [
  {
    id: "azure-penthouse",
    title: "Azure Penthouse",
    location: "Manhattan, New York",
    category: "Residential",
    year: "2025",
    image: img("photo-1618221195710-dd6b41faaea6"),
    images: [
      img("photo-1618221195710-dd6b41faaea6"),
      img("photo-1600585154526-990dced4db0d"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    description:
      "A sky-bound residence where floor-to-ceiling glass frames the city in golden hour warmth, anchored by walnut millwork and honed Calacatta marble.",
    aspect: "tall",
  },
  {
    id: "noir-gallery",
    title: "Noir Gallery Residence",
    location: "Paris, France",
    category: "Residential",
    year: "2024",
    image: img("photo-1600607687644-c7171b42498f"),
    images: [
      img("photo-1600607687644-c7171b42498f"),
      img("photo-1616486338812-3dadae4b4ace"),
    ],
    description:
      "Gallery-white volumes punctuated by sculptural lighting and curated art moments throughout.",
    aspect: "wide",
  },
  {
    id: "terracotta-house",
    title: "Terracotta House",
    location: "Marrakech, Morocco",
    category: "Residential",
    year: "2024",
    image: img("photo-1600566753190-17f0baa2a6c3"),
    images: [img("photo-1600566753190-17f0baa2a6c3"), img("photo-1600585154340-be6161a56a0c")],
    description:
      "Earthy textures and dappled light create an oasis of quiet sophistication in the desert.",
    aspect: "square",
  },
  {
    id: "maison-lumiere",
    title: "Maison Lumière",
    location: "Lyon, France",
    category: "Hospitality",
    year: "2025",
    image: img("photo-1616486338812-3dadae4b4ace"),
    images: [img("photo-1616486338812-3dadae4b4ace"), img("photo-1600566753190-17f0baa2a6c3")],
    description:
      "A boutique hotel where every corridor unfolds like a scene from a silent film.",
    aspect: "tall",
  },
  {
    id: "atrium-tower",
    title: "Atrium Tower Lobby",
    location: "Dubai, UAE",
    category: "Commercial",
    year: "2023",
    image: img("photo-1497366216548-37526070297c"),
    images: [img("photo-1497366216548-37526070297c"), img("photo-1497366811353-6870744d04b2")],
    description:
      "Monumental brass detailing and layered stone create an arrival experience of quiet power.",
    aspect: "wide",
  },
  {
    id: "velvet-salon",
    title: "Velvet Salon",
    location: "Milan, Italy",
    category: "Hospitality",
    year: "2024",
    image: img("photo-1600585154526-990dced4db0d"),
    images: [img("photo-1600585154526-990dced4db0d"), img("photo-1616486338812-3dadae4b4ace")],
    description:
      "Bouclé textures and warm brass accents define this intimate members-only lounge.",
    aspect: "square",
  },
  {
    id: "stone-villa",
    title: "Stone Villa",
    location: "Tuscany, Italy",
    category: "Residential",
    year: "2023",
    image: img("photo-1600585154340-be6161a56a0c"),
    images: [img("photo-1600585154340-be6161a56a0c"), img("photo-1600607687939-ce8a6c25118c")],
    description:
      "Centuries-old stone meets contemporary minimalism in this restored countryside estate.",
    aspect: "tall",
  },
  {
    id: "meridian-office",
    title: "Meridian Headquarters",
    location: "London, UK",
    category: "Commercial",
    year: "2025",
    image: img("photo-1497366811353-6870744d04b2"),
    images: [img("photo-1497366811353-6870744d04b2"), img("photo-1600607687939-ce8a6c25118c")],
    description:
      "Executive floors designed as contemplative workspaces with museum-quality material palettes.",
    aspect: "wide",
  },
];

/** Curated signature portfolio — 8 editorial projects */
export const signatureProjects = projects;

export const selectedWorks = projects.slice(0, 4);

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discovery",
    description: "We immerse in your vision, site, and lifestyle to define the spatial narrative.",
    icon: "search",
  },
  {
    id: "concept",
    number: "02",
    title: "Concept",
    description: "Mood boards, material studies, and 3D visualizations bring the story to life.",
    icon: "layers",
  },
  {
    id: "design",
    number: "03",
    title: "Design Development",
    description: "Every detail refined — from custom millwork to curated art and lighting schemes.",
    icon: "pen",
  },
  {
    id: "execute",
    number: "04",
    title: "Execution",
    description: "Master craftsmen and artisans realize the design with uncompromising precision.",
    icon: "hammer",
  },
  {
    id: "reveal",
    number: "05",
    title: "Reveal",
    description: "A staged unveiling of your completed space — a moment of quiet transformation.",
    icon: "star",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "VISTA Atelier transformed our penthouse into a sanctuary. Every material, every shadow feels intentional — like living inside a work of art.",
    author: "Elena Marchetti",
    role: "Private Client",
    location: "Manhattan",
  },
  {
    id: "2",
    quote:
      "Their ability to balance grandeur with intimacy is unmatched. Our hotel lobby now tells a story before a single word is spoken.",
    author: "James Whitfield",
    role: "Hospitality Director",
    location: "Lyon",
  },
  {
    id: "3",
    quote:
      "The process was as refined as the result. They listened, challenged, and ultimately delivered something beyond our imagination.",
    author: "Amara Okonkwo",
    role: "CEO, Meridian Group",
    location: "London",
  },
  {
    id: "4",
    quote:
      "Rarely does a studio understand restraint as a form of luxury. Our villa feels sculpted by light itself — serene, sensual, and utterly singular.",
    author: "Sofia Laurent",
    role: "Art Collector",
    location: "Geneva",
  },
  {
    id: "5",
    quote:
      "From first sketch to final reveal, the experience felt bespoke in every sense. The headquarters now embodies our brand without uttering a word.",
    author: "Marcus Chen",
    role: "Founder, Chen Capital",
    location: "Dubai",
  },
];

export const sectionCopy = {
  projects: {
    label: "Signature Projects",
    title: "Interiors That",
    highlight: "Define an Era",
    description:
      "Eight commissions across residential, hospitality, and commercial — each a study in proportion, material, and the quiet theatre of light.",
  },
  process: {
    label: "Our Process",
    title: "From Vision to",
    highlight: "Revelation",
    description:
      "Five deliberate phases guided by architectural rigor, material honesty, and the pursuit of spaces that feel inevitable.",
  },
  testimonials: {
    label: "Client Testimonials",
    title: "Voices of",
    highlight: "Distinction",
    description:
      "The trust of discerning clients across Manhattan, Paris, London, and beyond — each space a testament to quiet luxury.",
  },
  contact: {
    label: "Begin the Conversation",
    title: "Your Next",
    highlight: "Masterpiece",
    description:
      "Every extraordinary environment begins with intention. Share your vision — we will craft an atmosphere worthy of it.",
    ctaStrip:
      "Commission a space that feels inevitable. Private consultations available worldwide.",
  },
} as const;

export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    title: "The Poetry of Negative Space",
    category: "Philosophy",
    date: "March 2026",
    image: img("photo-1618221195710-dd6b41faaea6", 800),
    excerpt: "Why the spaces we leave empty speak louder than those we fill.",
  },
  {
    id: "2",
    title: "Material Stories: Calacatta & Walnut",
    category: "Materials",
    date: "February 2026",
    image: img("photo-1600607687939-ce8a6c25118c", 1600),
    excerpt: "A dialogue between stone and wood in our latest Manhattan residence.",
  },
  {
    id: "3",
    title: "Golden Hour: Designing with Light",
    category: "Process",
    date: "January 2026",
    image: img("photo-1600566753190-17f0baa2a6c3", 1600),
    excerpt: "How we choreograph natural light as the primary design element.",
  },
];

export const heroFallbackImage = img("photo-1618221195710-dd6b41faaea6", 3840);
/** High-res remote poster — local /hero-poster.jpg is too small for full-bleed hero */
export const heroPoster = heroFallbackImage;

export const heroCopy = {
  label: "Bespoke Interior Atelier",
  headlineLead: "Spaces Sculpted for",
  headlineEmphasis: "Quiet Opulence",
  subheadline:
    "We compose rarefied interiors where light, material, and proportion converge — environments that feel inevitable, intimate, and unmistakably yours.",
  credentials: "Manhattan · Paris · Milan",
  ctaPrimary: "Explore Signature Work",
  ctaSecondary: "Request Private Consultation",
  scrollHint: "Discover the Atelier",
} as const;

export const fallbackProjectImage = img("photo-1616486338812-3dadae4b4ace", 2400);
export const heroVideoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/hero-video.mp4";
export const heroVideoWebm =
  process.env.NEXT_PUBLIC_HERO_VIDEO_WEBM_URL ?? "/hero-video.webm";
/** Mobile — lightweight MP4; override via NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL */
export const heroVideoMobile =
  process.env.NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL ?? "/hero-video.mp4";

export const hasHeroVideo = true;

export const studioVideoSrc =
  process.env.NEXT_PUBLIC_STUDIO_VIDEO_URL ?? "/hero-video.mp4";
export const studioVideoWebm =
  process.env.NEXT_PUBLIC_STUDIO_VIDEO_WEBM_URL ?? "/hero-video.webm";
export const hasStudioVideo = true;