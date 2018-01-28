const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const csrf = require('lusca').csrf()
const uuid = require('uuid/v4')
const passportStrategies = require('./passport-strategies')

// @TODO Argument validation
function sendVerificationEmail({ mailserver, fromEmail, toEmail, url }) {
  const msg = {
    mailserver: mailserver,
    fromEmail: fromEmail,
    toEmail: toEmail,
    url: url
  }

  return Promise.reject(Error(`sendVerificationEmail msg: ${msg}`))

  /*nodemailer
    .createTransport(mailserver)
    .sendMail({
      to: toEmail,
      from: fromEmail,
      subject: 'Your sign-in link for PowerPiper',
      text: 'Use the link provided below to sign in to site:\n\n' + url + '\n\n'
    }, (err) => {
      // @TODO Handle errors
      if (err) {
        console.error('Error sending email to ' + toEmail, err)
      }
    })*/
}

exports.configure = ({
  nextApp = null,
  expressApp = null,
  userdb = null,
  session,
  store = null,
  secret = null,
  mailserver = null,
  fromEmail = null,
  serverUrl = null,
  userDbKey = '_id',
  maxAge = 60000 * 60 * 24 * 3,
  clientMaxAge = 60000
} = {}) => {
  if (nextApp === null) {
    throw new Error('nextApp option must be a next server instance')
  }

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }

  if (userdb === null) {
    throw new Error('userdb option must be provided')
  }

  if (store === null) {
    throw new Error('express session store not provided')
  }

  // Load body parser to handle POST requests
  expressApp.use(bodyParser.json())
  expressApp.use(bodyParser.urlencoded({ extended: true }))

  // Configure sessions
  expressApp.use(session({
    secret: secret,
    store: store,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    httpOnly: true,
    cookie: {
      maxAge: maxAge
    }
  }))

  // Add CSRF to all POST requests
  expressApp.use(csrf)

  // With sessions connfigured (& before routes) we need to configure Passport
  // and trigger passport.initialize() before we add any routes
  passportStrategies.configure({
    expressApp: expressApp,
    userdb: userdb,
    serverUrl: serverUrl,
    userDbKey: userDbKey
  })

  // Add route to get CSRF token via AJAX
  expressApp.get('/auth/csrf', (req, res) => {
    return res.json({ csrfToken: res.locals._csrf })
  })

  // Return session info
  expressApp.get('/auth/session', (req, res) => {
    session = {
      maxAge: maxAge,
      clientMaxAge: clientMaxAge,
      csrfToken: res.locals._csrf
    }

    // Add user object to session if logged in
    if (req.user) {
      session.user = {
        name: req.user.name,
        email: req.user.email
      }

      // If logged in, export the API access token details to the client
      // Note: This token is valid for the duration of this session only.
      if (req.session && req.session.api) {
        session.api = req.session.api
      }
    }

    return res.json(session)
  })

  // On post request, redirect to page with instrutions to check email for link
  expressApp.post('/auth/email/signin', (req, res) => {
    const email = req.body.email || null

    if (!email || email.trim() === '') {
      return nextApp.render(req, res, '/auth/signin', req.params)
    }

    const token = uuid()
    const verificationUrl = (serverUrl || `https://${req.headers.host}`) + `/auth/email/signin/${token}`

    /*const msg = {
      emailsigninres: req,
      email: email,
      verificationUrl: verificationUrl
    }*/
    // Create verification token save it to database
    // @TODO Improve error handling
    userdb.findOne({ email: email }, (err, user) => {
      if (err) {
        throw err
      }

      if (user) {
        user.emailAccessToken = token
        userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
          if (err) {
            throw err
          }

          sendVerificationEmail({
            mailserver: mailserver,
            fromEmail: fromEmail,
            toEmail: email,
            url: verificationUrl
          })
        })
      } else {
        userdb.insert({ email: email, emailAccessToken: token }, () => {
          if (err) {
            throw err
          }

          sendVerificationEmail({
            mailserver: mailserver,
            fromEmail: fromEmail,
            toEmail: email,
            url: verificationUrl
          })
        })
      }
    })

    return nextApp.render(req, res, '/auth/check-email', req.params)
  })

  expressApp.get('/auth/email/signin/:token', (req, res) => {
    if (!req.params.token) {
      return res.redirect('/auth/signin')
    }

    // Look up user by token
    userdb.findOne({ emailAccessToken: req.params.token }, (err, user) => {
      if (err) {
        return res.redirect('/auth/error/email')
      }
      if (user) {
        // Reset token and mark as verified
        user.emailAccessToken = null
        user.emailVerified = true
        userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
          // @TODO Improve error handling
          if (err) {
            return res.redirect('/auth/error/email')
          }
          // Having validated to the token, we log the user with Passport
          req.logIn(user, () => {
            if (err) {
              return res.redirect('/auth/error/email')
            }
            // If we end up here, login was successful
            return res.redirect('/auth/callback?action=signin&service=email')
          })
          return null
        })
      } else {
        return res.redirect('/auth/error/email')
      }
      return null
    })
    return null
  })

  expressApp.post('/auth/signout', (req, res) => {
    // Log user out by disassociating their account from the session
    req.logout()
    // Ran into issues where passport was not deleting session as it should be
    // destroying the session resolves that issue
    req.session.destroy(() => {
      res.redirect('/')
    })
  })
}
