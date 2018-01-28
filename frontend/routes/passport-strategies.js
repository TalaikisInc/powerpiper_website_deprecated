const passport = require('passport')

exports.configure = ({
  expressApp = null,
  userdb = null,
  serverUrl = null,
  userDbKey = '_id'
} = {}) => {
  if (expressApp === null) {
    throw new Error('expressApp option must be an instance of an express server')
  }

  if (userdb === null) {
    throw new Error('userdb option must be provided')
  }

  // Tell Passport how to seralize/deseralize user accounts
  passport.serializeUser((user, next) => {
    next(null, user[userDbKey])
  })

  passport.deserializeUser((id, next) => {
    userdb.findOne({[userDbKey]: id}, (err, user) => {
      // Pass error back (if there was one) and invalidate session if user
      // could not be fetched by returning 'false'. This prevents an exception
      // in edge cases like an account being deleted while logged in.
      if (err || !user) {
        return next(err, false)
      }

      // Note: We don't save all user profile fields with the session,
      // just ones we need.
      next(err, {
        id: user[userDbKey],
        name: user.name,
        email: user.email
      })
    })
  })

  const providers = []

  if (process.env.FB_APP_ID && process.env.FB_APP_SECRET) {
    providers.push({
      providerName: 'facebook',
      providerOptions: {
        scope: ['email', 'public_profile']
      },
      Strategy: require('passport-facebook').Strategy,
      strategyOptions: {
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        profileFields: ['id', 'displayName', 'email', 'link']
      },
      getUserFromProfile(profile) {
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile._json.email
        }
      }
    })
  }

  if (process.env.GOOGLE_APP_ID && process.env.GOOGLE_APP_SECRET) {
    providers.push({
      providerName: 'google',
      providerOptions: {
        scope: ['profile', 'email']
      },
      Strategy: require('passport-google-oauth').OAuth2Strategy,
      strategyOptions: {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET
      },
      getUserFromProfile(profile) {
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value
        }
      }
    })
  }

  if (process.env.TWITTER_APP_ID && process.env.TWITTER_APP_SECRET) {
    providers.push({
      providerName: 'twitter',
      providerOptions: {
        scope: []
      },
      Strategy: require('passport-twitter').Strategy,
      strategyOptions: {
        consumerKey: process.env.TWITTER_APP_ID,
        consumerSecret: process.env.TWITTER_APP_SECRET,
        userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
      },
      getUserFromProfile(profile) {
        return {
          id: profile.id,
          name: profile.displayName,
          email: (profile.emails && profile.emails[0].value) ? profile.emails[0].value : ''
        }
      }
    })
  }

  if (process.env.LINKEDIN_APP_ID && process.env.LINKEDIN_APP_SECRET) {
    providers.push({
      providerName: 'linkedin',
      providerOptions: {
        scope: ['r_emailaddress', 'r_basicprofile']
      },
      Strategy: require('passport-linkedin-oauth2').Strategy,
      strategyOptions: {
        clientID: process.env.LINKEDIN_APP_ID,
        clientSecret: process.env.LINKEDIN_APP_SECRET
      },
      getUserFromProfile(profile) {
        return {
          id: profile.id,
          name: profile['formatted-name'],
          email: profile['email-address']
        }
      }
    })
  }

  // Define a Passport strategy for provider
  providers.forEach(({ providerName, Strategy, strategyOptions, getUserFromProfile }) => {

    strategyOptions.callbackURL = (serverUrl || '') + `/auth/oauth/${providerName}/callback`
    strategyOptions.passReqToCallback = true

    passport.use(new Strategy(strategyOptions, (req, accessToken, refreshToken, profile, next) => {
      req.session[providerName] = { accessToken: accessToken }

      try {
        // Normalise the provider specific profile into a standard user object
        profile = getUserFromProfile(profile)

        // If we didn't get an email address from the oAuth provider then
        // generate a unique one as placeholder, using Provider name and ID.
        // If you want users to specify a valid email address after signing in,
        // you can check for email addresses ending "@localhost.localdomain"
        // and prompt those users to supply a valid address.
        if (!profile.email) {
          profile.email = `${providerName}-${profile.id}@localhost.localdomain`
        }

        // See if we have this oAuth account in the database associated with a user
        userdb.findOne({ [`${providerName}id`]: profile.id }, (err, user) => {
          if (err) {
            return next(err)
          }

          if (req.user) {
            // If the current session is signed in
            // If the oAuth account is not linked to another account, link it and exit
            if (!user) {
              return userdb.findOne({ [userDbKey]: req.user.id }, () => {
                if (err) {
                  return next(err)
                }
                if (!user) {
                  return next(new Error('Could not find current user in database.'))
                }
                // If we don't have a name for the user, grab the one from oAuth
                user.name = user.name || profile.name
                // If we don't have a real email address for the user, grab the
                // one from the oAuth account they just signed in with
                if (user.email && user.email.match(/.*@localhost\.localdomain$/) &&
                    profile.email && !profile.email.match(/.*@localhost\.localdomain$/)) {
                  user.verified = false
                  user.email = profile.email
                }
                user[providerName] = {
                  id: profile.id,
                  refreshToken: refreshToken
                }

                return userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
                  // @FIXME Should check the error code to verify the error was
                  // actually caused by email already being in use here but is
                  // almost certainly the cause of any errors when saving here.
                  if (err) {
                    return next(null, false, {message: 'Please check there isn\'t an account associated with the same email address.'})
                  }
                  return next(null, user)
                })
              })
            }

            // If oAuth account already linked to the current user return okay
            if (req.user.id === user.id) {
              // @TODO Improve error handling and update query syntax here
              // If we got a refreshToken try to save it to the profile,
              // but don't worry about errors if we don't get one 
              if (refreshToken) {
                user[providerName] = {
                  id: profile.id,
                  refreshToken: refreshToken
                }
                return userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
                  return next(null, user)
                })
              } else {
                return next(null, user)
              }
            }

            // If the oAuth account is already linked to different account, exit with error
            if (req.user.id !== user.id) {
              return next(null, false, { message: 'This account is already associated with another login.' })
            }
          } else {
            // If the current session is not signed in

            // If we have the oAuth account in the db then let them sign in as that user
            if (user) {
              // @TODO Improve error handling and update query syntax here
              // If we got a refreshToken try to save it to the profile,
              // but don't worry about errors if we don't get one 
              if (refreshToken) {
                user[providerName] = {
                  id: profile.id,
                  refreshToken: refreshToken
                }
                return userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
                  return next(null, user)
                })
              } else {
                return next(null, user)
              }
            }

            // If we don't have the oAuth account in the db, check to see if an account with the
            // same email address as the one associated with their oAuth acccount exists in the db
            return userdb.findOne({ email: profile.email }, (err, user) => {
              if (err) {
                return next(err)
              }
              // If we already have an account associated with that email address in the databases, the user
              // should sign in with that account instead (to prevent them creating two accounts by mistake)
              // Note: Automatically linking them here could expose a potential security exploit allowing someone
              // to pre-register or create an account elsewhere for another users email address, so don't do that.
              // @TODO This could be handled better in the UI (such as telling them it looks like they have
              // previously signed with via a Google account and maybe they should try signing in with that).
              if (user) {
                return next(null, false, {message: 'There is already an account associated with the same email address.'})
              }

              // If account does not exist, create one for them and sign the user in
              return userdb.insert({
                name: profile.name,
                email: profile.email,
                [providerName]: {
                  id: profile.id,
                  refreshToken: refreshToken
                }
              }, () => {
                if (err) {
                  return next(err)
                }
                return next(null, user)
              })
            })
          }
        })
      } catch (err) {
        return next(err)
      }
    }))
  })

  // Initialise Passport
  expressApp.use(passport.initialize())
  expressApp.use(passport.session())

  // Add routes for each provider
  providers.forEach(({ providerName, providerOptions }) => {
    // Route to start sign in
    expressApp.get(`/auth/oauth/${providerName}`, passport.authenticate(providerName, providerOptions))
    // Route to call back to after signing in
    expressApp.get(`/auth/oauth/${providerName}/callback`,
      passport.authenticate(providerName, {
        successRedirect: `/auth/callback?action=signin&service=${providerName}`,
        failureRedirect: `/auth/error/oauth?service=${providerName}`
      })
    )
    // Route to post to unlink accounts
    expressApp.post(`/auth/oauth/${providerName}/unlink`, (req, res, next) => {
      if (!req.user) {
        return next(new Error('Not signed in'))
      }
      // Lookup user
      userdb.findOne({ [userDbKey]: req.user.id }, (err, user) => {
        if (err) {
          return next(err)
        }

        if (!user) {
          return next(new Error('Unable to look up account for current user'))
        }

        // Remove connection between user account and oauth provider
        if (user[providerName]) {
          user[providerName] = null
        }

        return userdb.update({ [userDbKey]: user[userDbKey] }, user, {}, () => {
          if (err) {
            return next(err)
          }
          return res.redirect(`/auth/callback?action=unlink&service=${providerName}`)
        })
      })
    })
    return null
  })

  // A catch all for providers that are not configured
  expressApp.get('/auth/oauth/:provider', (req, res) => {
    res.redirect('/auth/error/not_configured')
  })

  return passport
}
