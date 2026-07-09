"use client";

import { contactInfo, navLinks, services, socialLinks } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { RevealStagger, ScrollReveal } from "@/components/ui/ScrollReveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-section luxury-section portfolio-section relative z-[1] section-padding-luxury">
      <div className="portfolio-atmosphere portfolio-atmosphere-alt" aria-hidden>
        <div className="portfolio-gold-wash" />
        <div className="footer-glow" />
      </div>

      <div className="luxury-section-rule" aria-hidden />
      <div className="footer-top-accent" aria-hidden />

      <div className="relative z-[1] pb-8 md:pb-12">
        <div className="mx-auto max-w-[1600px]">
          <ScrollReveal variant="cinematic" className="footer-cta mb-20">
            <div className="footer-cta-panel">
              <div className="footer-cta-line mb-6 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent" />
              <p className="hero-premium-label mb-4">Ready to Begin?</p>
              <h2 className="portfolio-section-title mb-5 text-balance">
                Let&apos;s Craft Something{" "}
                <span className="hero-gold-shimmer">Extraordinary</span>
              </h2>
              <p className="footer-cta-desc mb-8 max-w-lg">
                From first conversation to final installation — we guide every
                detail with cinematic precision and quiet luxury.
              </p>
              <Button href="#contact" variant="gold" className="hero-btn-gold-glow px-10 py-5">
                Start Your Project
              </Button>
            </div>
          </ScrollReveal>

          <RevealStagger className="footer-grid grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="reveal-stagger-item lg:col-span-4">
              <p className="footer-logo mb-5 font-heading text-2xl tracking-[0.12em] text-heading lg:text-3xl">
                VISTA <span className="hero-gold-shimmer">Atelier</span>
              </p>
              <p className="footer-tagline max-w-xs text-sm leading-relaxed text-secondary">
                Crafting timeless spaces that whisper luxury across the
                world&apos;s most discerning addresses.
              </p>
              <a
                href={`mailto:${contactInfo.email}`}
                data-cursor="hover"
                className="footer-email mt-6 inline-block transition-colors duration-300 hover:text-gold-accessible"
              >
                {contactInfo.email}
              </a>
            </div>

            <div className="reveal-stagger-item lg:col-span-2">
              <p className="hero-premium-label mb-5">Navigation</p>
              <ul className="footer-links space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      data-cursor="hover"
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-stagger-item lg:col-span-3">
              <p className="hero-premium-label mb-5">Services</p>
              <ul className="footer-links space-y-3">
                {services.map((s) => (
                  <li key={s.id}>
                    <span className="footer-link-static">{s.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-stagger-item lg:col-span-3">
              <p className="hero-premium-label mb-5">Connect</p>
              <ul className="footer-links space-y-3">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="footer-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="footer-address mt-8 text-sm leading-relaxed text-muted-foreground">
                {contactInfo.address}
              </p>
            </div>
          </RevealStagger>

          <div className="footer-bottom mt-16 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            <p className="footer-copyright">
              &copy; {year} VISTA Atelier. All rights reserved.
            </p>
            <p className="footer-crafted">Crafted with intention</p>
          </div>
        </div>
      </div>
    </footer>
  );
}