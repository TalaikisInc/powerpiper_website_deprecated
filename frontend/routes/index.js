const routes = module.exports = require('next-routes')()

routes
  .add('index')
  .add('/blog/', 'blog')
  .add('/author/:username/:page/', 'author')
  .add('/category/:category/:page/', 'category')
  .add('/post/:slug/', 'post')
  .add('/privacy_policy/', 'privacy_policy')
  .add('/cookie_policy/', 'cookie_policy')
