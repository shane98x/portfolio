import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import nl from '../locales/nl.json';

i18n
  .use(initReactI18next) 
  .init({
    compatibilityJSON: 'v3', // if not mentioned, Intl. Api environment not supported on Expo
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
