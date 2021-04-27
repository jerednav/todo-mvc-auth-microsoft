const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()


router.get('/login', //handles log in request
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      
        resourceURL: config.resourceURL,    
        customState: 'my_state',            
        failureRedirect: '/' 
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('Login was called in the Sample');
    res.redirect('/todos'); //when it's done, it will send us to todos
});

router.get('/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/todos');
  });

router.post('/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,    
        failureRedirect: '/'  
      }
    )(req, res, next);
  },
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/todos');
  });


router.get('/logout', function(req, res){ //will log the session out and will exterminate it
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

module.exports = router
