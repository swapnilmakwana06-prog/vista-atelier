"use client";

import Image from "next/image";
import { useState } from "react";
import { fallbackProjectImage } from "@/lib/data";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { IMAGE_QUALITY } from "@/lib/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export function ProjectImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  quality,
}: ProjectImageProps) {
  const { preferLite } = usePerformanceMode();
  const resolvedQuality =
    quality ??
    (priority
      ? preferLite
        ? IMAGE_QUALITY.featuredLite
        : IMAGE_QUALITY.featured
      : preferLite
        ? IMAGE_QUALITY.defaultLite
        : IMAGE_QUALITY.default);
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && !preferLite && (
        <div className="absolute inset-0 animate-pulse bg-card" aria-hidden />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        quality={resolvedQuality}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "crisp-image object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (imgSrc !== fallbackProjectImage) {
            setImgSrc(fallbackProjectImage);
            setLoaded(false);
          }
        }}
      />
    </>
  );
}