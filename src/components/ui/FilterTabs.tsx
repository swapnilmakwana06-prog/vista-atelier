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
    <div className="portfolio-filters flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          data-cursor="hover"
          onClick={() => onChange(cat)}
          className={cn(
            "portfolio-filter-btn relative px-5 py-2.5 text-[10px] tracking-[0.24em] uppercase",
            active === cat
              ? "portfolio-filter-active text-gold-accessible"
              : "text-muted-foreground"
          )}
        >
          <span className="portfolio-filter-text">{cat}</span>
          {active === cat && (
            <span className="portfolio-filter-indicator" aria-hidden />
          )}
        </button>
      ))}
    </div>
  );
}