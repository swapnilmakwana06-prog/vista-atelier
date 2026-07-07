import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-section portfolio-section relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-24">
      <div className="portfolio-atmosphere" aria-hidden>
        <div className="portfolio-god-rays" />
        <div className="portfolio-gold-wash" />
      </div>

      <div className="not-found-stars" aria-hidden>
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="not-found-star"
            style={{
              left: `${(i * 41 + 9) % 100}%`,
              top: `${(i * 29 + 5) % 50}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="not-found-panel relative z-10 w-full max-w-2xl text-center">
        <div className="not-found-accent mx-auto mb-8 h-px w-16 bg-gradient-to-r from-cyan via-gold to-transparent" />

        <p className="hero-premium-label mb-6">Lost in Space</p>

        <p className="not-found-code font-heading" aria-hidden>
          404
        </p>

        <h1 className="portfolio-section-title mt-2 text-balance">
          This Space{" "}
          <span className="hero-gold-shimmer">Does Not Exist</span>
        </h1>

        <p className="portfolio-section-desc mx-auto mt-6 max-w-md">
          The room you are searching for has not been designed — or perhaps it
          exists in another dimension. Return to the studio to explore timeless
          interiors.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="hero-btn-gold-glow inline-flex items-center justify-center px-10 py-5 text-[10px] tracking-[0.24em] uppercase"
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="hero-btn-outline-premium inline-flex items-center justify-center px-10 py-5 text-[10px] tracking-[0.24em] uppercase"
          >
            Contact Studio
          </Link>
        </div>
      </div>
    </main>
  );
}