import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationVI from '../public/locales/vi.json';
import translationEN from '../public/locales/en.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources = {
  vi: translationVI,
  en: translationEN,
};

export const i18n = i18next.createInstance();
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'vi',
});

export default i18n;