import type { Metadata } from "next";
import "./globals.css";
import styles from './layout.module.css';
import { glitten, alaska, newYork, roboto } from '@/lib/fonts';

export const metadata: Metadata = {
  title: "Avers Financial",
  description: "Financial services and consulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${styles.smoothScroll} ${glitten.variable} ${alaska.variable} ${newYork.variable} ${roboto.variable}`} lang="en" suppressHydrationWarning>
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
        {/* <script
          async
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
