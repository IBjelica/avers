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
    <html className={styles.smoothScroll} lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${glitten.variable} ${alaska.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
