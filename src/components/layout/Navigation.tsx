"use client";

import { memo, useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { useNavScroll } from "@/hooks/useNavScroll";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const Navigation = memo(function Navigation() {
  const { scrolled, hidden } = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overscrollBehavior = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "nav-cinematic nav-header fixed top-0 right-0 left-0 z-50",
          scrolled && "nav-cinematic-scrolled",
          hidden && "nav-hidden"
        )}
      >
        <div className="nav-accent-line" aria-hidden />

        <nav className="nav-inner mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-12">
          <a
            href="#"
            className={cn(
              "nav-logo font-heading text-xl tracking-[0.14em] text-heading lg:text-2xl",
              scrolled && "nav-logo-scrolled"
            )}
          >
            VISTA <span className="hero-gold-shimmer">Atelier</span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button
              href="#contact"
              variant="gold"
              className="hero-btn-gold-glow px-7 py-3.5 text-[10px]"
            >
              Start Project
            </Button>
          </div>

          <button
            type="button"
            className="nav-menu-btn flex flex-col gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "nav-menu-line block h-px w-6 transition-transform duration-300",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "nav-menu-line block h-px w-6 transition-opacity duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "nav-menu-line block h-px w-6 transition-transform duration-300",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "nav-mobile-overlay fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        data-lenis-prevent
      >
        <div className="nav-mobile-glow" aria-hidden />
        <div className="nav-mobile-rays" aria-hidden />

        <nav className="relative z-10 flex flex-col items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="nav-mobile-link font-heading text-3xl text-heading"
              style={{ animationDelay: menuOpen ? `${i * 0.06}s` : "0s" }}
            >
              {link.label}
            </a>
          ))}
          <div className="nav-mobile-divider my-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <Button
            href="#contact"
            variant="gold"
            className="hero-btn-gold-glow px-10 py-5"
            onClick={() => setMenuOpen(false)}
          >
            Start Project
          </Button>
        </nav>
      </div>
    </>
  );
});