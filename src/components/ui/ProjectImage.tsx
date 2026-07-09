"use client";

import Image from "next/image";
import { useState } from "react";
import { fallbackProjectImage } from "@/lib/data";
import { IMAGE_DEFAULTS, IMAGE_QUALITY } from "@/lib/image";
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
  const resolvedQuality =
    quality ?? (priority ? IMAGE_QUALITY.featured : IMAGE_QUALITY.default);
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-card" aria-hidden />}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        quality={resolvedQuality}
        unoptimized={IMAGE_DEFAULTS.unoptimized}
        decoding={IMAGE_DEFAULTS.decoding}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "crisp-image object-cover transition-opacity duration-300",
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