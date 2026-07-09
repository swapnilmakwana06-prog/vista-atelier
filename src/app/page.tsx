import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { LazySection } from "@/components/ui/LazySection";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl("/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — luxury interior design studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: [absoluteUrl("/og-image.jpg")],
  },
};

const Navigation = dynamic(
  () => import("@/components/layout/Navigation").then((m) => m.Navigation),
  { loading: () => <div className="nav-header-placeholder h-[72px]" aria-hidden /> }
);

const Philosophy = dynamic(
  () => import("@/components/sections/Philosophy").then((m) => m.Philosophy),
  { loading: () => <SectionPlaceholder /> }
);
const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => m.Projects),
  { loading: () => <SectionPlaceholder /> }
);
const Process = dynamic(
  () => import("@/components/sections/Process").then((m) => m.Process),
  { loading: () => <SectionPlaceholder /> }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionPlaceholder /> }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact),
  { loading: () => <SectionPlaceholder /> }
);
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((m) => m.Footer),
  { loading: () => <SectionPlaceholder short /> }
);

function SectionPlaceholder({ short = false }: { short?: boolean }) {
  return (
    <div
      className={short ? "min-h-[24vh]" : "min-h-[50vh]"}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content" className="site-main">
        <Hero />
        <LazySection minHeight="min-h-[60vh]">
          <Philosophy />
        </LazySection>
        <LazySection>
          <Projects />
        </LazySection>
        <LazySection>
          <Process />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
        <LazySection>
          <Contact />
        </LazySection>
      </main>
      <Navigation />
      <LazySection minHeight="min-h-[30vh]" rootMargin="0px 0px">
        <Footer />
      </LazySection>
    </>
  );
}