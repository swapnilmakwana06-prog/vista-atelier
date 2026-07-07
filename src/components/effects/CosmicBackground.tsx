"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

const CosmicStarParticles = dynamic(
  () =>
    import("@/components/effects/CosmicStarParticles").then(
      (m) => m.CosmicStarParticles
    ),
  { ssr: false }
);

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  twinkle: number;
  speed: number;
  sparkle: boolean;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const nebulaARef = useRef<HTMLDivElement>(null);
  const nebulaBRef = useRef<HTMLDivElement>(null);
  const nebulaCRef = useRef<HTMLDivElement>(null);
  const { preferLite, reduced } = usePerformanceMode();

  useEffect(() => {
    if (preferLite) return;

    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let scrollY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.min(120, Math.floor((width * height) / 22000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        r: Math.random() * 1.4 + 0.4,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.2 + 0.3,
        sparkle: Math.random() > 0.82,
      }));
    };

    const drawSparkle = (
      cx: number,
      cy: number,
      size: number,
      alpha: number
    ) => {
      ctx.strokeStyle = `rgba(220, 230, 255, ${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(cx - size, cy);
      ctx.lineTo(cx + size, cy);
      ctx.moveTo(cx, cy - size);
      ctx.lineTo(cx, cy + size);
      ctx.stroke();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle =
          0.5 + Math.sin(time * 0.001 * star.speed + star.twinkle) * 0.5;
        const parallaxY = (star.y - scrollY * star.z * 0.12) % (height + 20);
        const y = parallaxY < 0 ? parallaxY + height : parallaxY;
        const parallaxX = star.x + scrollY * star.z * 0.02;
        const x = parallaxX % width;

        const radius = star.r * star.z * (star.sparkle ? 1.3 : 1);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${twinkle * star.z * 0.9})`;
        ctx.fill();

        if (star.sparkle && twinkle > 0.75) {
          drawSparkle(x, y, radius * 3.5, twinkle * 0.5);
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        scrollY = window.scrollY;
        const base = scrollY * 0.15;
        wrap.style.transform = `translate3d(0, ${base}px, 0)`;

        if (moonRef.current) {
          moonRef.current.style.transform = `translate3d(${scrollY * 0.04}px, ${scrollY * 0.08}px, 0)`;
        }
        if (nebulaARef.current) {
          nebulaARef.current.style.transform = `translate3d(${scrollY * -0.03}px, ${scrollY * 0.06}px, 0)`;
        }
        if (nebulaBRef.current) {
          nebulaBRef.current.style.transform = `translate3d(${scrollY * 0.05}px, ${scrollY * -0.04}px, 0)`;
        }
        if (nebulaCRef.current) {
          nebulaCRef.current.style.transform = `translate3d(${scrollY * -0.02}px, ${scrollY * 0.1}px, 0)`;
        }

        ticking = false;
      });
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [preferLite, reduced]);

  return (
    <div
      ref={wrapRef}
      className="cosmic-bg pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <div ref={nebulaARef} className="cosmic-nebula cosmic-nebula-a gpu-layer" />
      <div ref={nebulaBRef} className="cosmic-nebula cosmic-nebula-b gpu-layer" />
      <div ref={nebulaCRef} className="cosmic-nebula cosmic-nebula-c gpu-layer" />

      {!preferLite && !reduced && <CosmicStarParticles />}

      {!preferLite && (
        <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />
      )}

      <div ref={moonRef} className="cosmic-moon gpu-layer" aria-hidden>
        <div className="cosmic-moon-core" />
        <div className="cosmic-moon-glow" />
        <div className="cosmic-moon-halo" />
      </div>

      <div className="cosmic-vignette absolute inset-0 z-[2]" />
    </div>
  );
}