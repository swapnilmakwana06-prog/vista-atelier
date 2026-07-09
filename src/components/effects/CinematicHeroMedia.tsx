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
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** Desktop-only cinematic hero — 4K poster, optimized video, luxury overlays */
export function CinematicHeroMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  const shouldPlayVideo = hasHeroVideo && !failed && !reduced;

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

  useEffect(() => {
    if (reduced) return;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const container = containerRef.current;
    if (!media || !container) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = Math.min(
          Math.max(window.scrollY / window.innerHeight, 0),
          1
        );
        const parallaxY = progress * 72;
        const scale = 1 + progress * 0.07;
        media.style.transform = `translate3d(0, ${parallaxY}px, 0) scale(${scale})`;
        if (overlay) {
          overlay.style.opacity = String(0.52 + progress * 0.42);
        }
        container.style.opacity = String(Math.max(1 - progress * 1.35, 0));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className="hero-cinematic-wrap absolute inset-0 overflow-hidden bg-[#03050c]"
    >
      <div
        ref={mediaRef}
        className="hero-media-parallax-outer gpu-layer absolute inset-0 will-change-transform"
      >
        <div className="hero-media-parallax-inner hero-media-layer absolute inset-[-8%]">
          <Image
            src={heroPoster}
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={IMAGE_QUALITY.hero}
            sizes={IMAGE_SIZES.hero}
            className={cn(
              "hero-desktop-poster crisp-image object-cover object-[center_20%] transition-opacity duration-1000 ease-out",
              ready && shouldPlayVideo ? "opacity-0" : "opacity-100"
            )}
            aria-hidden
          />

          {shouldPlayVideo && (
            <video
              ref={videoRef}
              className={cn(
                "hero-video crisp-image absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-1000 ease-out",
                ready ? "opacity-100" : "opacity-0"
              )}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroPoster}
              onError={() => setFailed(true)}
            >
              <source src={heroVideoWebm} type="video/webm" />
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div ref={overlayRef} className="hero-cinematic-overlay gpu-layer absolute inset-0">
        <div className="hero-god-rays pointer-events-none absolute inset-0" />
        <div className="hero-light-streak pointer-events-none absolute inset-0" />
        <div className="hero-cinematic-flare pointer-events-none absolute inset-0" />
        <div className="hero-cinematic-vignette pointer-events-none absolute inset-0" />
        <div className="hero-cinematic-scrim pointer-events-none absolute inset-0" />
        <div className="hero-premium-scrim pointer-events-none absolute inset-0" />
        <div className="hero-overlay-r pointer-events-none absolute inset-0" />
        <div className="hero-overlay-t pointer-events-none absolute inset-0" />
        <div className="hero-cinematic-bottom pointer-events-none absolute inset-0" />
        <div className="hero-cinematic-gold-wash pointer-events-none absolute inset-0" />
        <div className="hero-film-grain pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}