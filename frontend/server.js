const prod = process.env.NODE_ENV === 'production'
const envLoc = prod ? '../.env' : '../.env.development'
require('dotenv').config({ path: envLoc })
const express = require('express')
const smtpTransport = require('nodemailer-smtp-transport')
const directTransport = require('nodemailer-direct-transport')
const path = require('path')
const nextjs = require('next')
const app = nextjs({ dir: '.', dev: process.env.NODE_ENV !== 'production', quiet: false })
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient
const MongoStore = require('connect-mongo')(session)
const NeDB = require('nedb')
const routes = require('./routes/index')
const auth = require('./routes/auth')
const assert = require('assert')
const Raven = require('raven')

const port = process.env.FRONTEND_PORT
const sessConn = process.env.SESSION_DB_CONNECTION_STRING
const mongoUrl = process.env.MONGO_DB
const emailHost = process.env.EMAIL_SERVER
const emailUser = process.env.EMAIL_USERNAME
const emailPassword = process.env.EMAIL_PASSWORD
const emailSecure = process.env.EMAIL_SECURE
const emailPort = process.env.EMAIL_PORT
const fromEmail = process.env.FROM_EMAIL_ADDRESS
const serverUrl = process.env.SERVER_URL
const sessionSecret = process.env.SESSION_SECRET
const baseUrl = process.env.BASE_URL
const dsn = process.env.DSN_PUBLIC

assert.notEqual(null, baseUrl, 'Base URL is required!')
assert.notEqual(null, sessionSecret, 'Session secret is required!')
assert.notEqual(null, port, 'Port is required!')
assert.notEqual(null, sessConn, 'Session connection string is required!')
assert.notEqual(null, mongoUrl, 'MongoDB URL is required!')
assert.notEqual(null, emailHost, 'Email server is required!')
assert.notEqual(null, emailUser, 'Email server username is required!')
assert.notEqual(null, emailPassword, 'Email password is required!')
assert.notEqual(null, emailSecure, 'Email security string is required!')

if (prod) {
  assert.notEqual(null, dsn, 'Sentry DSN is required!')
  Raven.config(dsn, {
    autoBreadcrumbs: true,
    captureUnhandledRejections: true
  }).install()
}

const captureMessage = (req, res) => () => {
  if (res.statusCode > 400) {
    Raven.captureException(`Server Side Error: ${res.statusCode}`, {
      req,
      res
    })
  }
}

let mailserver = directTransport()
if (emailHost && emailUser && emailPassword) {
  mailserver = smtpTransport({
    host: emailHost,
    port: emailPort || 25,
    secure: (emailSecure && emailSecure.match(/true/i)) ? true : false,
    auth: {
      user: emailUser,
      pass: emailPassword
    }
  })
}

let sessionStore, userdb

const server = express()

server.use(cookieParser())

i18n.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
  preload: ['en', 'de', 'es', 'fr', 'ru', 'ko'],
  ns: ['common'],
  removeLngFromUrl: false,
  backend: {
    loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
  }
}, () => {
  app.prepare()
    .then(() => {
      return new Promise((resolve, reject) => {
        if (mongoUrl) {
          MongoClient.connect(mongoUrl, (err, client) => {
            assert.equal(null, err)
            userdb = client.db('users').collection('users')
            resolve(true)
          })
        } else {
          console.warn('Warning: No user database connection string configured (using in-memory database, user data will not be persisted)')
          userdb = new NeDB({ autoload: true })
          userdb.loadDatabase((err) => {
            if (err) {
              return reject(err)
            }
            resolve(true)
            return null
          })
        }
      })
    })
    .then(() => {
      return new Promise((resolve) => {
        if (sessConn) {
          sessionStore = new MongoStore({
            url: sessConn,
            autoRemove: 'interval',
            // in minutes
            autoRemoveInterval: 100000,
            collection: 'sessions',
            stringify: false
          })
          resolve(true)
        } else {
          console.warn('Warning: No session database connection string configured (using in-memory session store, session data will not be persisted)')
          sessionStore = new session.MemoryStore()
          resolve(true)
        }
      })
    })
    .then(() => {
      auth.configure({
        nextApp: app,
        expressApp: server,
        userdb: userdb,
        session: session,
        store: sessionStore,
        secret: sessionSecret,
        mailserver: mailserver,
        fromEmail: fromEmail,
        serverUrl: serverUrl
      })

      // Error logger
      if (prod) {
        server.use((req, res, next) => {
          res.on('close', captureMessage(req, res))
          res.on('finish', captureMessage(req, res))
          next()
        })
      }

      // i18n
      server.use(i18nextMiddleware.handle(i18n))
      server.use('/locales', express.static(path.join(__dirname, '/locales')))
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

      // Expose a route to return user profile if logged in with a session
      server.get('/dashboard/user', (req, res) => {
        if (req.user) {
          console.error('requested user')
          console.error(req.user)
          userdb.findOne({ _id: req.user.id }, (err, user) => {
            if (err || !user) {
              return res.status(500).json({ error: 'Unable to fetch profile' })
            }
            res.json({
              name: user.name,
              email: user.email,
              emailVerified: (user.emailVerified && user.emailVerified === true) ? true : false,
              linkedWithFacebook: (user.facebook && user.facebook.id) ? true : false,
              linkedWithGoogle: (user.google && user.google.id) ? true : false,
              linkedWithTwitter: (user.twitter && user.twitter.id) ? true : false,
              linkedWithLinkedin: (user.linkedin && user.linkedin.id) ? true : false
            })
            console.error('Profile not found.')
            return null
          })
        } else {
          return res.status(403).json({ error: 'Must be signed in to access profile' })
        }
        console.error('/dashboard/user failed')
        return null
      })

      // Expose a route to allow users to update their profiles (name, email)
      server.post('/dashboard/user', (req, res) => {
        if (req.user) {
          userdb.findOne({ _id: req.user.id }, (err, user) => {
            if (err || !user) {
              return res.status(500).json({ error: 'Unable to fetch profile' })
            }

            if (req.body.name) {
              user.name = req.body.name
            }

            if (req.body.email) {
              // Reset email verification field if email address has changed
              if (req.body.email && req.body.email !== user.email) {
                user.emailVerified = false
              }
              user.email = req.body.email
            }
            userdb.update({ _id: user._id }, user, {}, () => {
              if (err) {
                return res.status(500).json({ error: 'Unable save changes to profile' })
              }
              return res.status(204).redirect('/dashboard/')
            })
            console.error('/dashboard/user failed')
            return null
          })
        } else {
          return res.status(403).json({ error: 'Must be signed in to update profile' })
        }
      })

      // use next.js
      server.get('*', (req, res) => {
        const nextRequestHandler = routes.getRequestHandler(app)
        return nextRequestHandler(req, res)
      })

      server.listen(port, (err) => {
        if (err) {
          throw err
        }
        console.log(`> Ready on http://localhost:${port} [${process.env.NODE_ENV}]`)
      })
    })
    .catch(err => {
      console.error('Errro occurred at server')
      console.error(err.stack)
      process.exit(1)
    })
})
