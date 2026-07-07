"use client";

import Link from "next/link";
import { memo } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { IMAGE_SIZES } from "@/lib/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  index?: number;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  priority = false,
  index,
}: ProjectCardProps) {
  const aspectClass = {
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
    square: "aspect-square",
  }[project.aspect];

  return (
    <Tilt3D intensity={14}>
      <Link
        href={`/projects/${project.id}`}
        className="portfolio-card group relative mb-6 block cursor-pointer break-inside-avoid"
        data-cursor="hover"
      >
        <div
          className={cn(
            "portfolio-card-frame relative min-h-[240px] overflow-hidden",
            aspectClass
          )}
        >
          <ProjectImage
            src={project.image}
            alt={project.title}
            priority={priority}
            sizes={IMAGE_SIZES.project}
            className="portfolio-card-image transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />

          <div className="portfolio-card-scrim absolute inset-0" />
          <div className="portfolio-card-gold-wash absolute inset-0" />
          <div className="portfolio-card-vignette absolute inset-0" />
          <div className="portfolio-card-shine absolute inset-0" />

          {typeof index === "number" && (
            <span className="portfolio-card-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 p-7">
            <div className="portfolio-card-line mb-4 h-px w-12 bg-gradient-to-r from-cyan via-gold to-transparent transition-all duration-700 ease-out group-hover:w-20" />
            <p className="mb-1.5 text-[10px] tracking-[0.28em] text-cyan/90 uppercase">
              {project.category} · {project.year}
            </p>
            <h3 className="font-heading text-2xl leading-tight text-heading transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-[1.65rem]">
              {project.title}
            </h3>
            <p className="mt-1.5 text-sm text-secondary/90">{project.location}</p>
          </div>
        </div>
      </Link>
    </Tilt3D>
  );
});