//Made from the Azure directory instructions

const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const mongoose = require('mongoose')
const config = require('../config/config') //has all secret info on it
const User = require('../models/User') //hold our model that holds info for the user

module.exports = function (passport) {
  passport.use(
    new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('auth: ', profile)
        const newUser = {
          microsoftId: profile.oid, //can change newUser name, just make sure it matches the schema
          //found in models/User, const UserSchema
          displayName: profile.displayName,
        }

        try {
          let user = await User.findOne({ microsoftId: profile.oid }) //finding existing microsoft ID's

          if (user) { //finish if the user is foud
            done(null, user)
          } else {
            user = await User.create(newUser) //create a new user if no user is found
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
