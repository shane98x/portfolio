import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import nl from '../locales/nl.json';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    lng: "en", // If you want to use language detector, you can remove this line
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
