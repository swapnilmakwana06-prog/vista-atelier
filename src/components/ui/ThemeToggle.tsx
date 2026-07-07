"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { cn } from "@/lib/utils";

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { preferLite } = usePerformanceMode();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-cursor="hover"
      className={cn(
        "theme-toggle-fab theme-surface fixed right-5 bottom-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full touch-manipulation",
        "border border-gold/40 text-gold-accessible ring-1 ring-gold/20",
        preferLite
          ? "bg-card transition-colors duration-200 active:opacity-80"
          : "bg-card/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold/70 hover:ring-gold/40 hover:shadow-[0_0_24px_rgba(212,175,126,0.15)] active:scale-95",
        "lg:right-6 lg:bottom-6"
      )}
    >
      <span key={theme} className="animate-theme-icon">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}