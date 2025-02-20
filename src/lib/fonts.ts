import localFont from "next/font/local";
import { Roboto } from 'next/font/google';

// Display fonts
export const glitten = localFont({
  src: "../app/fonts/GLITTEN.otf",
  variable: "--font-glitten",
  display: 'swap',
  preload: true,
});

export const alaska = localFont({
  src: "../app/fonts/Alaska-NormalLight.ttf",
  variable: "--font-alaska",
  display: 'swap',
  preload: true
});

export const newYork = localFont({
  src: "../app/fonts/NewYork.ttf",
  variable: "--font-newyork",
  display: 'swap',
  preload: true,
});

// Body fonts
export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

// Font usage guide by element type
export const fontGuide = {
  headings: {
    h1: {
      en: 'var(--font-glitten)',
      sr: 'var(--font-newyork)',
    },
    h2: {
      en: 'var(--font-glitten)',
      sr: 'var(--font-newyork)',
    },
    h3: {
      en: 'var(--font-alaska)',
      sr: 'var(--font-alaska)',
    },
  },
  body: {
    primary: 'var(--font-roboto)',
    secondary: 'var(--font-alaska)',
  },
  navigation: 'var(--font-alaska)',
  buttons: 'var(--font-alaska)',
  quotes: 'var(--font-alaska)',
} as const;
