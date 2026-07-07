"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

export function Lightbox({ project, onClose }: LightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (project) setIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-detail-modal fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <div className="project-detail-modal-glow" aria-hidden />

          <motion.div
            className="project-detail-modal-panel relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 gap-0 overflow-hidden lg:grid-cols-2"
            initial={{ scale: 0.96, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 28 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <div className="project-detail-modal-image relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.images[index]}
                    alt={project.title}
                    fill
                    quality={IMAGE_QUALITY.hero}
                    priority
                    className="crisp-image object-cover"
                    sizes={IMAGE_SIZES.half}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="portfolio-card-scrim absolute inset-0 opacity-70" />
              <div className="portfolio-card-vignette absolute inset-0" />
              {project.images.length > 1 && (
                <div className="absolute bottom-5 left-5 z-10 flex gap-2">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      data-cursor="hover"
                      onClick={() => setIndex(i)}
                      className={cn(
                        "h-1 transition-all duration-500",
                        i === index
                          ? "w-10 bg-gradient-to-r from-cyan to-gold"
                          : "w-5 bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-10">
              <div className="project-detail-accent mb-6 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent" />
              <p className="hero-premium-label mb-4">
                {project.category} · {project.year}
              </p>
              <h2 className="portfolio-section-title mb-3 text-3xl lg:text-4xl">
                {project.title}
              </h2>
              <p className="project-detail-location mb-6">{project.location}</p>
              <p className="project-detail-desc">{project.description}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/projects/${project.id}`}
                  onClick={onClose}
                  className="hero-btn-gold-glow inline-flex items-center justify-center px-8 py-4 text-[10px] tracking-[0.24em] uppercase"
                >
                  View Full Project
                </Link>
                <button
                  type="button"
                  data-cursor="hover"
                  onClick={onClose}
                  className="hero-btn-outline-premium px-8 py-4 text-[10px] tracking-[0.24em] uppercase"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}