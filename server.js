//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user-controller');
var skillController = require('./controllers/skill-controller');
var questionController = require('./controllers/question-controller');
var questionStateController = require('./controllers/question-state-controller');

var app = express();

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use( (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        next();
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userController);
app.use('/skills', skillController);
app.use('/questions', questionController);
app.use('/questions-states', questionStateController);


app.get('/', (req,res) => {
  return res.end('Api working');
});

module.exports = app;
