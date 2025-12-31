import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import { glitten, alaska, newYork, roboto } from "@/lib/fonts";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://avers.rs"),
  title: {
    default: "Avers Financial | Professional Financial Consulting Serbia",
    template: "%s | Avers Financial",
  },
  description:
    "Expert financial consulting, tax advisory, and business services in Serbia. International business solutions and local market expertise. | Profesionalne finansijske i poreske usluge u Srbiji",
  keywords:
    "financial consulting, tax advisory, Serbia business, finansijski konsalting, poresko savetovanje, poslovno savetovanje",
  alternates: {
    languages: {
      en: "/en",
      sr: "/sr",
    },
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    alternateLocale: "en_US",
    title: "Avers Financial - Professional Financial Consulting Serbia",
    description: "Expert financial and tax advisory services in Serbia",
    siteName: "Avers Financial",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Avers Financial Services",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${styles.smoothScroll} ${glitten.variable} ${alaska.variable} ${newYork.variable} ${roboto.variable}`}
      lang="sr"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/assets/images/hero-bg.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/assets/icons/logo-white.svg"
          as="image"
          type="image/svg+xml"
        />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Avers Financial",
            description:
              "Professional financial and tax consulting services in Serbia",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Belgrade",
              addressCountry: "RS",
            },
            areaServed: ["RS", "Worldwide"],
            serviceType: [
              "Financial Consulting",
              "Tax Advisory",
              "Business Services",
            ],
            "@id": "https://avers.rs",
            url: "https://avers.rs",
            sameAs: ["https://www.linkedin.com/company/avers-financial"],
          })}
        </Script>
      </head>
      <body className="antialiased bg-[#53758F]" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
