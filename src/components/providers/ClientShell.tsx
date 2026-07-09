"use client";

import dynamic from "next/dynamic";
import { PerformanceProvider } from "@/components/providers/PerformanceProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const CosmicBackground = dynamic(
  () =>
    import("@/components/effects/CosmicBackground").then(
      (m) => m.CosmicBackground
    ),
  { ssr: false }
);

const CustomCursor = dynamic(
  () =>
    import("@/components/providers/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false, loading: () => null }
);

const CinematicLoader = dynamic(
  () =>
    import("@/components/effects/CinematicLoader").then(
      (m) => m.CinematicLoader
    ),
  { ssr: false }
);

function MobileStaticBackground() {
  return (
    <div className="mobile-static-bg pointer-events-none fixed inset-0 z-0" aria-hidden />
  );
}

function DesktopEffects() {
  const { preferLite } = usePerformanceMode();
  if (preferLite) return <MobileStaticBackground />;
  return <CosmicBackground />;
}

function ShellChrome() {
  const { preferLite } = usePerformanceMode();

  return (
    <>
      <DesktopEffects />
      {!preferLite && <CustomCursor />}
      <ThemeToggle />
    </>
  );
}

function LoaderGate() {
  const { preferLite } = usePerformanceMode();
  if (preferLite) return null;
  return <CinematicLoader />;
}

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PerformanceProvider>
        <LoaderGate />
        <SmoothScroll>
          <ShellChrome />
          {children}
        </SmoothScroll>
      </PerformanceProvider>
    </ThemeProvider>
  );
}