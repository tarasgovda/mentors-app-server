const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const axios = require('axios');
const logger = require('../logger');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  },
  function(user, password, done) {
    axios.post("http://192.168.1.239:8080/webhook/authenticate", {        //sombra space sandbox
      email: user,
      pass: password
    })
    .then(response => {
      User.findOne({'email': response.data.email}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user) {
          return done(null, user);
        } else {
           logger.info(`Received new user ${response.data.firstname} ${response.data.lastname}`);
           const userToCreate = new User();
           userToCreate.email = response.data.email;
           userToCreate.firstName = response.data.firstname;
           userToCreate.lastName = response.data.lastname;
           userToCreate.roles.push("ROLE_USER");
           userToCreate.save(function(err, user) {
             if(err) {
               return done(err);
             }
             return done(null, user);
           })
         }
      });

    })
    .catch(error => {
      if (error.response) {
        logger.error(error.response.status);
        logger.error(error.response.data.message);
        if(error.response.status == 404) {
          return done(null, false)
        }
      } else if (error.request) {
          logger.error("Request has been sent, but no response received");
          logger.error(error.request);
      } else {
          logger.error('Something happened in setting up the request that triggered an Error');
          logger.error('Error', error.message);
      }
      return done(error);
    })
  })
)
};
