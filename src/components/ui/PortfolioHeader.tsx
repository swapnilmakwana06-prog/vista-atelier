"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PortfolioHeaderProps {
  label: string;
  title: string;
  highlight: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PortfolioHeader({
  label,
  title,
  highlight,
  description,
  children,
  className,
}: PortfolioHeaderProps) {
  return (
    <div className={cn("portfolio-header", className)}>
      <div className="portfolio-header-accent" aria-hidden />
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="hero-premium-label mb-5">{label}</p>
          <h2 className="portfolio-section-title text-balance">
            {title}{" "}
            <span className="hero-gold-shimmer">{highlight}</span>
          </h2>
          {description && (
            <p className="portfolio-section-desc mt-5 max-w-xl">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}