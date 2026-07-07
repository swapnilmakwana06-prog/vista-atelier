"use client";

import Image from "next/image";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  quality?: number;
}

/** Static sharp image — parallax removed for scroll performance */
export function ParallaxImage({
  src,
  alt,
  className,
  quality = IMAGE_QUALITY.featured,
}: ParallaxImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        quality={quality}
        sizes={IMAGE_SIZES.half}
        className="crisp-image object-cover"
      />
    </div>
  );
}