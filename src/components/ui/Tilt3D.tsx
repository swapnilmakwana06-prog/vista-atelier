"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  float?: boolean;
}

export function Tilt3D({
  children,
  className,
  intensity = 10,
  float = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { preferLite, reduced } = usePerformanceMode();
  const state = useRef({
    hovering: false,
    scrollZ: 0,
    scrollY: 0,
    tiltX: 0,
    tiltY: 0,
    phase: Math.random() * Math.PI * 2,
  });

  useEffect(() => {
    if (reduced || preferLite) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let ticking = false;

    const applyTransform = (time = 0) => {
      const s = state.current;
      const idleY = float ? Math.sin(time * 0.001 + s.phase) * 5 : 0;
      const idleZ = float ? Math.sin(time * 0.0008 + s.phase) * 4 : 0;

      if (s.hovering) return;

      el.style.transform = `perspective(900px) rotateY(${s.tiltY}deg) rotateX(${s.tiltX}deg) translateZ(${s.scrollZ + idleZ}px) translateY(${s.scrollY + idleY}px)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = rect.top + rect.height / 2;
        const progress = 1 - Math.abs(center - vh / 2) / (vh * 0.6);
        const clamped = Math.max(0, Math.min(1, progress));
        state.current.scrollZ = clamped * 16;
        state.current.scrollY = (1 - clamped) * 6;
        state.current.tiltX = 0;
        state.current.tiltY = 0;
        applyTransform(performance.now());
        ticking = false;
      });
    };

    const animate = (time: number) => {
      if (!state.current.hovering) applyTransform(time);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (float) raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, preferLite, float]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced || preferLite) return;
    const s = state.current;
    s.hovering = true;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    s.tiltY = x * intensity;
    s.tiltX = -y * intensity;
    el.style.transform = `perspective(900px) rotateY(${s.tiltY}deg) rotateX(${s.tiltX}deg) translateZ(${s.scrollZ + 20}px) scale(1.02)`;
  };

  const handleLeave = () => {
    state.current.hovering = false;
    state.current.tiltX = 0;
    state.current.tiltY = 0;
  };

  if (preferLite || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("tilt-3d gpu-layer", className)}
    >
      {children}
    </div>
  );
}