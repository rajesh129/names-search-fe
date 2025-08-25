// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nextICU from 'i18next-icu'

const supported = ['en', 'ta', 'fr'] as const

i18n
  .use(new i18nextICU())
  .use(LanguageDetector)
  .use(resourcesToBackend((lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)))
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: supported,
    ns: ['common', 'validation'],
    defaultNS: 'common',
    detection: {
      // 👇 ensure the URL /:lng/... wins on hard reload
      order: ['path', 'querystring', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0, // /en/home -> 'en'
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },
    load: 'languageOnly', // 'en-US' -> 'en'
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  })

export default i18n
