"use client";

import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

interface CinematicImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function CinematicImageFrame({
  src,
  alt,
  className,
  priority = false,
  quality,
}: CinematicImageFrameProps) {
  const { preferLite } = usePerformanceMode();
  const resolvedQuality =
    quality ?? (preferLite ? IMAGE_QUALITY.featuredLite : IMAGE_QUALITY.featured);

  return (
    <div className={cn("about-image-frame group relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={resolvedQuality}
        sizes={IMAGE_SIZES.half}
        className="crisp-image object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="portfolio-card-scrim absolute inset-0 opacity-60" />
      <div className="portfolio-card-gold-wash absolute inset-0" />
      <div className="portfolio-card-vignette absolute inset-0" />
      <div className="about-image-corner about-image-corner-tl" aria-hidden />
      <div className="about-image-corner about-image-corner-br" aria-hidden />
    </div>
  );
}