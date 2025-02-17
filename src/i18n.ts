import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import srTranslations from './locales/sr/translation.json';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'sr'] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Type for translation resources
interface TranslationResources {
  translation: {
    menu: {
      ourvalues: string;
      services: string;
      aboutus: string;
      contactus: string;
    };
    footer: {
      copyright: string;
      info: string;
    };
    // ... other translations
    [key: string]: any;
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      en: TranslationResources;
      sr: TranslationResources;
    };
    returnNull: false;
  }
}

// Get initial language from URL or localStorage, fallback to 'en'
const getInitialLanguage = (): SupportedLanguage => {
  // Default to English on server-side
  if (typeof window === 'undefined') return 'en';

  try {
    // Check URL first
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && SUPPORTED_LANGUAGES.includes(langParam as SupportedLanguage)) {
      localStorage.setItem('language', langParam);
      return langParam as SupportedLanguage;
    }
    
    // Check localStorage
    const storedLang = localStorage.getItem('language');
    if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang as SupportedLanguage)) {
      return storedLang as SupportedLanguage;
    }
  } catch (error) {
    console.warn('Error accessing localStorage or URL parameters:', error);
  }

  return 'en';
};

const resources = {
  en: {
    translation: enTranslations
  },
  sr: {
    translation: srTranslations
  }
} as const;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    react: {
      useSuspense: false // Recommended for SSR
    }
  });

export default i18n;
