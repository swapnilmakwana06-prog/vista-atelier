import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { ClientShell } from "@/components/providers/ClientShell";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vistaatelier.com";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VISTA Atelier | Crafting Timeless Spaces That Whisper Luxury",
    template: "%s | VISTA Atelier",
  },
  description:
    "Award-winning luxury interior design studio crafting cinematic, timeless spaces with architectural precision and quiet sophistication.",
  keywords: [
    "luxury interior design",
    "interior design studio",
    "residential interiors",
    "hospitality design",
    "bespoke interiors",
    "VISTA Atelier",
  ],
  authors: [{ name: "VISTA Atelier" }],
  creator: "VISTA Atelier",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VISTA Atelier",
    title: "VISTA Atelier | Crafting Timeless Spaces That Whisper Luxury",
    description:
      "Award-winning luxury interior design studio crafting cinematic, timeless spaces with architectural precision and quiet sophistication.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VISTA Atelier — luxury interior design studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTA Atelier",
    description: "Crafting Timeless Spaces That Whisper Luxury",
    images: ["/og-image.jpg"],
  },
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('vista-theme');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

const perfScript = `
(function() {
  try {
    var lite = window.matchMedia('(max-width: 767px)').matches
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || (window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(max-width: 1023px)').matches);
    if (lite) {
      document.documentElement.dataset.perf = 'lite';
      document.documentElement.dataset.mobile = 'true';
    }
  } catch (e) {}
})();
`;

const loaderScript = `
(function() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.dataset.loading = 'true';
    document.body.style.overflow = 'hidden';
  } catch (e) {}
})();
`;

const loaderCriticalCss = `
#vista-initial-loader{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#020308;-webkit-transform:translateZ(0);transform:translateZ(0)}
#vista-initial-loader .vista-loader-bg{position:absolute;inset:0;background:radial-gradient(ellipse 130% 90% at 50% 20%,#0a0e18 0%,#04060f 40%,#020308 70%,#000 100%)}
#vista-initial-loader .vista-loader-stage{display:flex;flex-direction:column;align-items:center;text-align:center;padding:2rem;position:relative;z-index:2;animation:vista-loader-in 1s cubic-bezier(.16,1,.3,1) forwards}
#vista-initial-loader .vista-loader-logo{font-family:var(--font-dm-sans),system-ui,sans-serif;font-size:clamp(2.25rem,7vw,4rem);font-weight:500;letter-spacing:.16em;line-height:1.1;margin:0}
#vista-initial-loader .vista-loader-logo-vista{color:#f5f0e8;text-shadow:0 2px 0 rgba(212,175,126,.15),0 8px 32px rgba(0,0,0,.5)}
#vista-initial-loader .vista-loader-logo-atelier{background:linear-gradient(120deg,#e8c896,#d4af7e 30%,#f5e6c8 50%,#d4af7e 70%,#5eead4);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 24px rgba(212,175,126,.35))}
#vista-initial-loader .vista-loader-tagline{margin-top:1.5rem;font-size:11px;letter-spacing:.38em;text-transform:uppercase;color:rgba(245,240,232,.55);opacity:0;animation:vista-tagline-in 1.2s cubic-bezier(.16,1,.3,1) .5s forwards}
#vista-initial-loader .vista-loader-bar{margin-top:2.75rem;width:min(220px,55vw);height:1px;background:rgba(212,175,126,.12);overflow:hidden}
#vista-initial-loader .vista-loader-bar-fill{height:100%;width:40%;background:linear-gradient(to right,rgba(94,234,212,.4),#d4af7e 50%,#f5e6c8);box-shadow:0 0 16px rgba(212,175,126,.45);animation:vista-bar-pulse 1.8s ease-in-out infinite}
@keyframes vista-loader-in{from{opacity:0;transform:perspective(1400px) translate3d(0,24px,-30px) rotateX(8deg)}to{opacity:1;transform:perspective(1400px) translate3d(0,0,0) rotateX(0)}}
@keyframes vista-tagline-in{from{opacity:0;transform:translate3d(0,12px,0)}to{opacity:.85;transform:translate3d(0,0,0)}}
@keyframes vista-bar-pulse{0%,100%{transform:scaleX(.25);opacity:.6}50%{transform:scaleX(.75);opacity:1}}
@media(prefers-reduced-motion:reduce){#vista-initial-loader{display:none}}
`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: "VISTA Atelier",
  url: siteUrl,
  description:
    "Award-winning luxury interior design studio crafting cinematic, timeless spaces.",
  image: `${siteUrl}/og-image.jpg`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-poster.jpg"
          fetchPriority="high"
        />
        <style dangerouslySetInnerHTML={{ __html: loaderCriticalCss }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: perfScript }} />
        <script dangerouslySetInnerHTML={{ __html: loaderScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="theme-surface font-sans antialiased">
        <div id="vista-initial-loader" aria-live="polite" aria-label="Loading VISTA Atelier">
          <div className="vista-loader-bg" aria-hidden />
          <div className="vista-loader-stage">
            <h1 className="vista-loader-logo">
              <span className="vista-loader-logo-vista">VISTA</span>{" "}
              <span className="vista-loader-logo-atelier">Atelier</span>
            </h1>
            <p className="vista-loader-tagline">Crafting Timeless Spaces</p>
            <div className="vista-loader-bar" aria-hidden>
              <div className="vista-loader-bar-fill" />
            </div>
          </div>
        </div>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}