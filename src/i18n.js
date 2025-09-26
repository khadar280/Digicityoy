import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fi from './locales/fi.json';

const savedLang = localStorage.getItem('lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fi: { translation: fi },
    },
    lng: savedLang,             // only set language once here
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,       // react already escapes
    },
  });

export default i18n;
