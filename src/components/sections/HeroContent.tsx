import { heroCopy } from "@/lib/data";

/** Server-rendered hero copy — zero client JS on mobile */
export function HeroContent() {
  return (
    <>
      <div
        id="hero-content"
        className="hero-content-root relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-28 pb-28 sm:pt-32 sm:pb-32 lg:px-14 lg:pt-36 lg:pb-36"
      >
        <div className="hero-content-inner max-w-[52rem]">
          <div
            className="hero-label-row hero-entrance-item"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="hero-accent-rule" aria-hidden />
            <p className="hero-premium-label">{heroCopy.label}</p>
          </div>

          <h1
            className="hero-ultra-headline hero-entrance-item"
            style={{ animationDelay: "0.28s" }}
          >
            <span className="hero-headline-line">{heroCopy.headlineLead}</span>
            <span className="hero-headline-line hero-headline-emphasis">
              <span className="hero-gold-text">{heroCopy.headlineEmphasis}</span>
            </span>
          </h1>

          <p
            className="hero-premium-sub hero-sub-emotional hero-entrance-item"
            style={{ animationDelay: "0.44s" }}
          >
            {heroCopy.subheadline}
          </p>

          <p
            className="hero-credential-line hero-entrance-item"
            style={{ animationDelay: "0.56s" }}
          >
            {heroCopy.credentials}
          </p>

          <div
            className="hero-cta-row hero-entrance-item"
            style={{ animationDelay: "0.68s" }}
          >
            <a
              href="#projects"
              className="hero-cta-primary touch-target group"
            >
              <span className="hero-cta-shine" aria-hidden />
              <span className="hero-cta-label">{heroCopy.ctaPrimary}</span>
              <span className="hero-cta-arrow" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#contact"
              className="hero-cta-secondary touch-target group"
            >
              <span className="hero-cta-label">{heroCopy.ctaSecondary}</span>
            </a>
          </div>
        </div>

        <div className="hero-corner-accent hero-corner-accent-tl" aria-hidden />
        <div className="hero-corner-accent hero-corner-accent-br" aria-hidden />
      </div>

      <div
        id="hero-scroll-hint"
        className="hero-scroll-hint-wrap absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10 lg:flex"
      >
        <span className="hero-scroll-hint text-[10px] tracking-[0.35em] text-cyan/70 uppercase">
          {heroCopy.scrollHint}
        </span>
        <div className="hero-scroll-line h-12 w-px" />
      </div>
    </>
  );
}