const i18n = require('i18next')
const XHR = require('i18next-xhr-backend')
const LanguageDetector = require('i18next-browser-languagedetector')
const Cache = require('i18next-localstorage-cache')
const debug = false

const backendOptions = {
  fallbackLng: 'en',
  load: 'languageOnly',
  ns: ['common'],
  defaultNS: 'common',
  debug: debug,
  saveMissing: true,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format) => {
      if (format === 'uppercase') {
        return value.toUpperCase()
      }
      return value
    }
  }
}

const detectionOptions = {
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
  lookupQuerystring: 'lang',
  lookupCookie: 'i18next',
  lookupSession: 'lang',
  lookupPath: 'lang',
  lookupFromPathIndex: 0,
  lookupLocalStorage: 'i18nextLng',
  cookieMinutes: 10,
  cookieDomain: '' // process.env.DOMAIN
}

const cacheOptions = {
  enabled: false,
  prefix: 'i18next_res_',
  expirationTime: 1*24*60*60*1000, // 1 day
  versions: {}
}

// for browser use xhr backend to load translations and browser lng detector
if (process.browser) {
  i18n
    .use(XHR)
    .use(Cache)
    .use(LanguageDetector)
}

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init({
    detection: detectionOptions,
    backend: backendOptions,
    cache: cacheOptions
  })
}

// a simple helper to getInitialProps passed on loaded i18n data
i18n.getInitialProps = (req, namespaces) => {
  if (!namespaces) {
    namespaces = i18n.options.defaultNS
  }

  if (typeof namespaces === 'string') {
    namespaces = [namespaces]
  }

  req.i18n.toJSON = () => null

  const initialI18nStore = {}
  req.i18n.languages.forEach((l) => {
    if (req && l !== 'dev' && l === req.i18n.language) {
      initialI18nStore[l] = {}
      namespaces.forEach((ns) => {
        initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l][ns] || {}
      })
    }
  })

  return {
    i18n: req.i18n,
    initialI18nStore,
    initialLanguage: req.i18n.language
  }
}

module.exports = i18n
