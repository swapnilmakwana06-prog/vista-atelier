"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      data-cursor="hover"
      className={cn(
        "theme-toggle-fab group",
        "fixed z-[60] flex h-10 w-10 items-center justify-center rounded-full",
        "right-5 bottom-5 touch-manipulation lg:right-6 lg:bottom-6",
        "border border-border-subtle bg-card/90 text-gold-accessible",
        "shadow-[0_4px_24px_var(--shadow-color)]",
        "backdrop-blur-md",
        "transition-all duration-[400ms] ease-out",
        "hover:scale-105 hover:border-gold/50 hover:shadow-[0_6px_32px_var(--shadow-color),0_0_20px_color-mix(in_srgb,var(--gold)_18%,transparent)]",
        "active:scale-95",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/50"
      )}
    >
      <SunIcon className="theme-toggle-icon absolute scale-75 opacity-0 transition-all duration-[400ms] ease-out dark:scale-100 dark:opacity-100" />
      <MoonIcon className="theme-toggle-icon absolute scale-100 opacity-100 transition-all duration-[400ms] ease-out dark:scale-75 dark:opacity-0" />
      <span
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan/0 transition-all duration-[400ms] ease-out group-hover:ring-cyan/25"
        aria-hidden
      />
    </button>
  );
}