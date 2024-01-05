// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import nl from '../locales/nl.json';

const loadLanguage = async () => {
  let storedLang = await AsyncStorage.getItem('language');
  if (storedLang !== null) {
    return storedLang;
  }
  return "en"; // Default language
};

// You need to call this asynchronously before i18n.init
loadLanguage().then((language) => {
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources: {
        en: { translation: en },
        nl: { translation: nl },
      },
      lng: language,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
});

export default i18n;
