const prod = process.env.NODE_ENV || 'production'

const ENV = {
  API_URL: 'https://api.powerpiper.com',
  BASE_URL: prod === 'production' ? 'https://powerpiper.com' : 'http://127.0.0.1:3010',
  IMAGES_URL: prod === 'production' ? 'https://api.powerpiper.com' : 'http://127.0.0.1:8010',
  SITE_TITLE: 'PowerPiper',
  GA: 'UA-110116765-1'
}

export default ENV
