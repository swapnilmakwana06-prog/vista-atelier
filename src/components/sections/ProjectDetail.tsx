"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CinematicImageFrame } from "@/components/ui/CinematicImageFrame";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <article className="project-detail">
      <section className="project-detail-hero relative min-h-[70dvh] overflow-hidden lg:min-h-[85dvh]">
        <div className="portfolio-atmosphere" aria-hidden>
          <div className="portfolio-god-rays" />
          <div className="portfolio-gold-wash" />
        </div>

        <div className="project-detail-hero-media absolute inset-0">
          <Image
            src={project.images[activeImage] ?? project.image}
            alt={project.title}
            fill
            priority
            quality={IMAGE_QUALITY.hero}
            sizes={IMAGE_SIZES.hero}
            className="crisp-image object-cover"
          />
          <div className="hero-cinematic-vignette absolute inset-0" />
          <div className="hero-premium-scrim absolute inset-0" />
          <div className="hero-cinematic-bottom absolute inset-0" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70dvh] max-w-[1600px] flex-col justify-end px-6 pt-32 pb-16 lg:min-h-[85dvh] lg:px-12 lg:pb-24">
          <Link
            href="/#projects"
            className="hero-premium-label project-detail-back mb-8 inline-flex items-center gap-2 transition-colors duration-300 hover:text-gold-accessible"
          >
            <span aria-hidden>←</span> Back to Portfolio
          </Link>

          <p className="hero-premium-label mb-4">
            {project.category} · {project.year}
          </p>
          <h1 className="project-detail-title text-balance">
            {project.title}
          </h1>
          <p className="project-detail-location mt-4">{project.location}</p>
        </div>
      </section>

      <section className="project-detail-body portfolio-section section-padding">
        <div className="portfolio-atmosphere portfolio-atmosphere-alt" aria-hidden>
          <div className="portfolio-gold-wash" />
        </div>

        <div className="relative z-[1] mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="project-detail-accent mb-8 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent" />
            <p className="hero-premium-label mb-4">The Project</p>
            <p className="project-detail-desc">{project.description}</p>

            <dl className="project-detail-meta mt-10 grid grid-cols-2 gap-6">
              <div>
                <dt className="hero-premium-label mb-2">Category</dt>
                <dd className="project-detail-meta-value">{project.category}</dd>
              </div>
              <div>
                <dt className="hero-premium-label mb-2">Year</dt>
                <dd className="project-detail-meta-value">{project.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="hero-premium-label mb-2">Location</dt>
                <dd className="project-detail-meta-value">{project.location}</dd>
              </div>
            </dl>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/#contact" variant="gold" className="hero-btn-gold-glow px-8 py-4">
                Start a Similar Project
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="hero-premium-label mb-6">Gallery</p>
            <div className="project-detail-gallery grid gap-4 sm:grid-cols-2">
              {project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  data-cursor="hover"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "project-detail-thumb group text-left",
                    i === 0 && "sm:col-span-2",
                    activeImage === i && "project-detail-thumb-active"
                  )}
                >
                  <CinematicImageFrame
                    src={src}
                    alt={`${project.title} — image ${i + 1}`}
                    className={cn(
                      "aspect-[4/3]",
                      i === 0 && "sm:aspect-[16/10]"
                    )}
                    priority={i === 0}
                  />
                  <span className="project-detail-thumb-index" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail-nav section-padding pt-0">
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/projects/${prev.id}`}
              data-cursor="hover"
              className="project-detail-nav-card group"
            >
              <span className="hero-premium-label">Previous</span>
              <span className="project-detail-nav-title">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.id}`}
              data-cursor="hover"
              className="project-detail-nav-card project-detail-nav-card-next group md:text-right"
            >
              <span className="hero-premium-label">Next</span>
              <span className="project-detail-nav-title">{next.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </article>
  );
}