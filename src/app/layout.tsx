import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import styles from './layout.module.css';

const glitten = localFont({
  src: "./fonts/GLITTEN.otf",
  variable: "--font-glitten",
});

const alaska = localFont({
  src: "./fonts/Alaska.otf",
  variable: "--font-alaska",
});

const newYork = localFont({
  src: "./fonts/NewYork.ttf",
  variable: "--font-newyork",
});

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

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
