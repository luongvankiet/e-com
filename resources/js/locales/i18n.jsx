import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// utils
import { localStorageGetItem } from '@/utils/storage-available';
//
import { defaultLang } from './config-lang';
import { APP_URL } from '@/config-global';

// ----------------------------------------------------------------------

const lng = localStorageGetItem('i18nextLng', defaultLang.value);

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng,
    supportedLngs: ['en', 'vi'],
    fallbackLng: 'en',
    backend: {
      loadPath: `${APP_URL}/locales/{{lng}}.json`,
    },
  });

export default i18n;
