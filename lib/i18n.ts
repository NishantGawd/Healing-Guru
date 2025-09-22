import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files directly. This is a robust method.
import translationEN from '../public/locales/en/common.json';
import translationES from '../public/locales/es/common.json';
import translationFR from '../public/locales/fr/common.json';

// Define the resources for i18next
const resources = {
  en: {
    common: translationEN,
  },
  es: {
    common: translationES,
  },
  fr: {
    common: translationFR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    // Check localStorage for a saved language, otherwise default to 'en'
    lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'en' : 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already protects from xss
    },
  });

export default i18n;