"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** @deprecated Prefer ScrollReveal — kept for backward compatibility */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <ScrollReveal className={className} delay={delay} variant="fadeUp">
      {children}
    </ScrollReveal>
  );
}