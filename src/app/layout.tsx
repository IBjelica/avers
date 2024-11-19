import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const glitten = localFont({
  src: "./fonts/glitten.otf",
  variable: "--font-glitten",
});

const alaska = localFont({
  src: "./fonts/alaska.otf",
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
    <html lang="en" suppressHydrationWarning>
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
