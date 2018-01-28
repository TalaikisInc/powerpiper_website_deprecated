const envLoc = process.env.NODE_ENV === 'production' ? '../.env' : '../.env.development'
require('dotenv').config({ path: envLoc })

module.exports = {
  'process.env.API_URL': process.env.API_URL,
  'process.env.SERVER_URL': process.env.SERVER_URL,
  'process.env.IMAGES_URL': process.env.IMAGES_URL,
  'process.env.SITE_TITLE': process.env.SITE_TITLE,
  'process.env.GA': process.env.GA,
  'process.env.DSN': process.env.DSN_PUBLIC
}
