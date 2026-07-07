"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    if (!dot) return;

    let frame = 0;

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      const size = hovering.current ? 48 : 10;
      const offset = size / 2;
      dot.style.transform = `translate3d(${pos.current.x - offset}px, ${pos.current.y - offset}px, 0)`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      frame = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const isHover = !!(e.target as HTMLElement).closest(
        "a, button, [data-cursor='hover'], .project-card"
      );
      if (isHover !== hovering.current) {
        hovering.current = isHover;
        dot.classList.toggle("cursor-hover", isHover);
      }
    };

    frame = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full border border-gold/80 bg-gold/5 will-change-transform lg:block"
      aria-hidden
    />
  );
}