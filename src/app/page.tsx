import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { LazySection } from "@/components/ui/LazySection";

const Navigation = dynamic(
  () => import("@/components/layout/Navigation").then((m) => m.Navigation),
  { loading: () => <div className="nav-header-placeholder h-[72px]" aria-hidden /> }
);

const Philosophy = dynamic(
  () => import("@/components/sections/Philosophy").then((m) => m.Philosophy),
  { loading: () => <SectionPlaceholder /> }
);
const Expertise = dynamic(
  () => import("@/components/sections/Expertise").then((m) => m.Expertise),
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
const SelectedWorks = dynamic(
  () => import("@/components/sections/SelectedWorks").then((m) => m.SelectedWorks),
  { loading: () => <SectionPlaceholder /> }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionPlaceholder /> }
);
const StudioFilm = dynamic(
  () => import("@/components/sections/StudioFilm").then((m) => m.StudioFilm),
  { loading: () => <SectionPlaceholder /> }
);
const Journal = dynamic(
  () => import("@/components/sections/Journal").then((m) => m.Journal),
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
      <main>
        <Hero />
        <LazySection minHeight="min-h-[60vh]">
          <Philosophy />
        </LazySection>
        <LazySection>
          <Expertise />
        </LazySection>
        <LazySection>
          <Projects />
        </LazySection>
        <LazySection>
          <Process />
        </LazySection>
        <LazySection>
          <SelectedWorks />
        </LazySection>
        <LazySection>
          <Testimonials />
        </LazySection>
        <LazySection>
          <StudioFilm />
        </LazySection>
        <LazySection>
          <Journal />
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