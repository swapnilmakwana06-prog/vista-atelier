"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  heroPoster,
  heroVideoSrc,
  heroVideoWebm,
  hasHeroVideo,
} from "@/lib/data";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export function VideoHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const shouldPlayVideo = hasHeroVideo && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed || !shouldPlayVideo) return;

    const play = async () => {
      try {
        video.muted = true;
        await video.play();
        setReady(true);
      } catch {
        setFailed(true);
      }
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => video.removeEventListener("canplay", play);
  }, [failed, shouldPlayVideo]);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !shouldPlayVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldPlayVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-background">
      <div className="hero-media-layer absolute inset-0">
        <Image
          src={heroPoster}
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={IMAGE_QUALITY.hero}
          sizes={IMAGE_SIZES.hero}
          className={cn(
            "crisp-image object-cover transition-opacity duration-700 ease-out",
            ready && shouldPlayVideo ? "opacity-0" : "opacity-100"
          )}
          aria-hidden
        />

        {shouldPlayVideo && (
          <video
            ref={videoRef}
            className={cn(
              "hero-video crisp-image absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
              ready ? "opacity-100" : "opacity-0"
            )}
            autoPlay
            loop
            muted
            playsInline
            preload={isMobile ? "none" : "metadata"}
            poster={heroPoster}
            onError={() => setFailed(true)}
          >
            <source src={heroVideoWebm} type="video/webm" />
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="hero-cinematic-vignette pointer-events-none absolute inset-0" />
      <div className="hero-cinematic-scrim pointer-events-none absolute inset-0" />
      <div className="hero-overlay-r pointer-events-none absolute inset-0" />
      <div className="hero-overlay-t pointer-events-none absolute inset-0" />
      <div className="hero-cinematic-bottom pointer-events-none absolute inset-0" />
    </div>
  );
}