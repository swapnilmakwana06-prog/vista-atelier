"use client";

import { useState } from "react";
import Image from "next/image";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { heroPoster } from "@/lib/data";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

const studioVideoSrc =
  process.env.NEXT_PUBLIC_STUDIO_VIDEO_URL ?? "/studio/studio.mp4";

export function StudioFilm() {
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { preferLite } = usePerformanceMode();
  const imageQuality = preferLite
    ? IMAGE_QUALITY.featuredLite
    : IMAGE_QUALITY.featured;

  return (
    <CosmicSection className="below-fold relative overflow-hidden py-24">
      <ScrollReveal variant="cinematic" accent className="mb-12 px-6 text-center lg:px-12">
        <p className="section-label mb-4">Studio Film</p>
        <h2 className="section-title text-3xl md:text-4xl">
          A Glimpse <span className="text-gold">Within</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal variant="scale" delay={120} className="relative mx-auto aspect-[21/9] max-w-[1600px] overflow-hidden">
        {!playing || videoFailed ? (
          <>
            <Image
              src={heroPoster}
              alt="Studio film poster"
              fill
              loading="lazy"
              quality={imageQuality}
              className={cn(
                "crisp-image object-cover",
                (playing || videoFailed) && "animate-ken-burns-subtle"
              )}
              sizes={IMAGE_SIZES.full}
            />
            {(!playing || videoFailed) && (
              <div className="absolute inset-0 flex items-center justify-center bg-overlay/30">
                <button
                  data-cursor="hover"
                  onClick={() => {
                    setVideoFailed(false);
                    setPlaying(true);
                  }}
                  className="touch-target relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
                  aria-label="Play studio film"
                >
                  <span className="absolute inset-0 animate-ping rounded-full border border-gold/30" />
                  <span className="ml-1 text-gold">▶</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload={preferLite ? "none" : "metadata"}
            poster={heroPoster}
            onError={() => setVideoFailed(true)}
          >
            <source src={studioVideoSrc} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-overlay/20" />
      </ScrollReveal>
    </CosmicSection>
  );
}