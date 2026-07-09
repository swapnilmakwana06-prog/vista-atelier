"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CosmicSection } from "@/components/ui/CosmicSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  heroPoster,
  hasStudioVideo,
  studioVideoSrc,
  studioVideoWebm,
} from "@/lib/data";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

export function StudioFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const { preferLite } = usePerformanceMode();
  const imageQuality = preferLite
    ? IMAGE_QUALITY.featuredLite
    : IMAGE_QUALITY.featured;

  const showPoster = preferLite || !playing || videoFailed || !ready;

  const handlePlay = useCallback(() => {
    if (preferLite) return;
    setVideoFailed(false);
    setReady(false);
    setPlaying(true);
  }, [preferLite]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playing || videoFailed || !hasStudioVideo || preferLite) {
      return;
    }

    const startPlayback = async () => {
      try {
        video.muted = true;
        await video.play();
        setReady(true);
      } catch {
        setVideoFailed(true);
        setPlaying(false);
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
      video.load();
    }

    return () => video.removeEventListener("canplay", startPlayback);
  }, [playing, videoFailed, preferLite]);

  return (
    <CosmicSection className="below-fold relative overflow-hidden py-24">
      <ScrollReveal variant="cinematic" accent className="mb-12 px-6 text-center lg:px-12">
        <p className="section-label mb-4">Studio Film</p>
        <h2 className="section-title text-3xl md:text-4xl">
          A Glimpse <span className="text-gold">Within</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal
        variant="scale"
        delay={120}
        className="relative mx-auto aspect-[21/9] max-w-[1600px] overflow-hidden"
      >
        <Image
          src={heroPoster}
          alt="Studio film poster"
          fill
          loading="lazy"
          quality={imageQuality}
          className={cn(
            "crisp-image object-cover",
            showPoster ? "opacity-100" : "opacity-0"
          )}
          sizes={IMAGE_SIZES.full}
        />

        {!preferLite && playing && hasStudioVideo && !videoFailed && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
              ready ? "opacity-100" : "opacity-0"
            )}
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            onError={() => {
              setVideoFailed(true);
              setPlaying(false);
              setReady(false);
            }}
          >
            <source src={studioVideoWebm} type="video/webm" />
            <source src={studioVideoSrc} type="video/mp4" />
          </video>
        )}

        {showPoster && (
          <div className="absolute inset-0 flex items-center justify-center bg-overlay/30">
            {preferLite ? (
              <div
                className="studio-film-badge flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 sm:h-20 sm:w-20"
                aria-hidden
              >
                <span className="ml-1 text-gold/80">▶</span>
              </div>
            ) : (
              <button
                data-cursor="hover"
                type="button"
                onClick={handlePlay}
                className="touch-target relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
                aria-label="Play studio film"
              >
                <span className="studio-film-ping absolute inset-0 rounded-full border border-gold/30" />
                <span className="ml-1 text-gold">▶</span>
              </button>
            )}
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-overlay/20" />
      </ScrollReveal>
    </CosmicSection>
  );
}