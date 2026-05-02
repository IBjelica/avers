import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import { glitten, alaska, newYork, roboto } from "@/lib/fonts";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aversacc.com"),
  title: {
    default: "Avers Financial | Professional Financial Consulting Serbia",
    template: "%s | Avers Financial",
  },
  description:
    "Expert financial consulting and tax advisory services in Serbia. Professional business solutions with local expertise.",
  keywords:
    "financial consulting, tax advisory, Serbia business, finansijski konsalting, poresko savetovanje, poslovno savetovanje",
  alternates: {
    canonical: "https://aversacc.com",
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MZBBRFR8');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Cookie consent & Analytics */}
        <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="578a6aef-ae24-444e-8be0-090a200aaee8" async strategy="afterInteractive" />

        <Script id="gtag-session-start" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'session_start', {
              // <event_parameters>
            });
          `}
        </Script>

        <Script src="https://t.contentsquare.net/uxa/369f371adc9e3.js" async strategy="afterInteractive" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7G4HLBR6MG" strategy="afterInteractive" />
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
            "@id": "https://aversacc.com",
            url: "https://aversacc.com",
            sameAs: ["https://www.linkedin.com/company/avers-financial"],
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+381603973097",
              contactType: "customer service",
              availableLanguage: ["English", "Serbian"]
            }
          })}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18126403351" strategy="afterInteractive" />
        <Script id="google-tag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18126403351');
          `}
        </Script>
      </head>
      <body className="antialiased bg-[#53758F]" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MZBBRFR8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
