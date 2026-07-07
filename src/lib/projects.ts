import { projects } from "@/lib/data";
import type { Project } from "@/types";

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectNeighbors(id: string) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

export function getAllProjectIds(): string[] {
  return projects.map((p) => p.id);
}