"use client";

import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: ProjectCategory[] = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
];

interface FilterTabsProps {
  active: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="portfolio-filters flex flex-wrap gap-2.5">
      {categories.map((cat) => (
        <button
          key={cat}
          data-cursor="hover"
          onClick={() => onChange(cat)}
          className={cn(
            "portfolio-filter-btn relative px-6 py-3 text-[10px] tracking-[0.24em] uppercase transition-all duration-400",
            active === cat
              ? "portfolio-filter-active text-gold-accessible"
              : "text-muted-foreground hover:text-secondary"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}