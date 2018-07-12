//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const logger = require('./logger');
const RedisStore = require('connect-redis')(session);
const userController = require('./controllers/user-controller');
const skillController = require('./controllers/skill-controller');
const questionController = require('./controllers/question-controller');
const questionStateController = require('./controllers/question-state-controller');



const props = require('./config/props');

require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(session({
      secret: props.session.secret,
      store : new RedisStore({
        url: process.env.REDIS_URL
      }),
      resave: false,
      saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

const isAuthenticated = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

app.use('/users', isAuthenticated, userController);
app.use('/skills', skillController);
app.use('/questions', questionController);
app.use('/questions-states', questionStateController);


app.post('/login', passport.authenticate('login', {successRedirect: '/'}));

app.get('/logout', (req, res) => {
  req.logout();
  res.send('Logout successful');
});


app.get('/', isAuthenticated, (req,res) => {
  return res.end('Api working');
});

module.exports = app;
