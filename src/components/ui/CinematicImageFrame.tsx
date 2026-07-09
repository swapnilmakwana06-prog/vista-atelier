"use client";

import Image from "next/image";
import { IMAGE_DEFAULTS, IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
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
  const resolvedQuality = quality ?? IMAGE_QUALITY.featured;

  return (
    <div className={cn("about-image-frame group relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={resolvedQuality}
        unoptimized={IMAGE_DEFAULTS.unoptimized}
        decoding={IMAGE_DEFAULTS.decoding}
        sizes={IMAGE_SIZES.half}
        className="crisp-image object-cover"
      />
      <div className="portfolio-card-scrim absolute inset-0 opacity-60" />
      <div className="portfolio-card-gold-wash absolute inset-0" />
      <div className="portfolio-card-vignette absolute inset-0" />
      <div className="about-image-corner about-image-corner-tl" aria-hidden />
      <div className="about-image-corner about-image-corner-br" aria-hidden />
    </div>
  );
}