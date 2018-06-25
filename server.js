//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/user-controller');
const skillController = require('./controllers/skill-controller');
const questionController = require('./controllers/question-controller');
const questionStateController = require('./controllers/question-state-controller');

require('./config/passport')(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(session({
      secret: 'mentorsapp',
      resave: true,
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

app.use('/users', userController);
app.use('/skills', skillController);
app.use('/questions', questionController);
app.use('/questions-states', questionStateController);

app.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user) {
  console.log(err);
})(req,res, next)});


app.get('/', (req,res) => {
  return res.end('Api working');
});

module.exports = app;
