"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CosmicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/** Section wrapper — flat rendering (no scroll 3D transforms that blur text/images). */
export function CosmicSection({ children, className, id }: CosmicSectionProps) {
  return (
    <section
      id={id}
      className={cn("cosmic-section relative z-[1] scroll-anchor", className)}
    >
      <div className="cosmic-section-inner">{children}</div>
    </section>
  );
}