import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html className={`${styles.smoothScroll} ${glitten.variable} ${alaska.variable} ${newYork.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
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
