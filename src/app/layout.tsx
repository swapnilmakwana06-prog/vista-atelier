import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import { ClientShell } from "@/components/providers/ClientShell";
import { siteConfig, absoluteUrl } from "@/lib/seo";
import { themeColors, themeInitScript } from "@/lib/theme";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
  ],
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Interior Design",
  keywords: siteConfig.keywords,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — luxury interior design studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.shortName,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl("/og-image.jpg"),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  areaServed: ["New York", "London", "Dubai", "Geneva", "Miami"],
  priceRange: "$$$$",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: siteConfig.locale,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${dmSans.variable} scroll-smooth dark render-sharp`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=window.matchMedia('(max-width:1023px)'),t=window.matchMedia('(pointer:coarse)'),r=window.matchMedia('(prefers-reduced-motion:reduce)');if(m.matches||t.matches||r.matches)document.documentElement.setAttribute('data-perf','lite');if(!r.matches)document.documentElement.setAttribute('data-loading','');}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <div
          id="vista-initial-loader"
          className="luxury-loader"
          aria-live="polite"
          aria-label="Loading VISTA Atelier"
        >
          <div className="luxury-loader-bg" />
          <div className="luxury-loader-nebula luxury-loader-nebula-a" />
          <div className="luxury-loader-nebula luxury-loader-nebula-b" />
          <div className="luxury-loader-vignette" />
          <div className="luxury-loader-stage luxury-loader-stage-revealed">
            <div className="luxury-loader-logo-wrap">
              <div className="luxury-loader-logo-glow" aria-hidden />
              <p className="luxury-loader-logo font-heading">
                <span className="luxury-loader-logo-vista">VISTA</span>{" "}
                <span className="luxury-loader-logo-atelier">Atelier</span>
              </p>
            </div>
            <p className="luxury-loader-tagline luxury-loader-tagline-visible">
              Crafting Timeless Spaces
            </p>
            <div className="luxury-loader-line-wrap">
              <div className="luxury-loader-line-track">
                <div className="luxury-loader-line-fill luxury-loader-line-indeterminate" />
              </div>
              <p className="luxury-loader-progress" aria-hidden>
                0<span className="luxury-loader-progress-suffix">%</span>
              </p>
            </div>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('vista-loader-done')==='1'){var l=document.getElementById('vista-initial-loader');if(l)l.remove();document.documentElement.removeAttribute('data-loading');}}catch(e){}`,
          }}
        />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}