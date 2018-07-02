const User = require('../models/user');
const axios = require('axios');
const logger = require('../logger');

exports.all = async function() {
  logger.info('Getting all users');
  return await User.find({}, function (err, data) {
    if(err) throw new Error(err);
    return data;
  })
};

exports.findOne = async function(req, res)  {
  await User.findById(req.params.id, function(err, user) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(user);
  })
}

exports.create = async function(req, res) {
  await new User(req.body).save(function(err, user) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(user);
  })
};

exports.update = async function(req, res) {
  await User.findByIdAndUpdate(req.body.id, req.body, {"new": true}, function (err, updatedUser) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(updatedUser);
  })
};

exports.delete = async function(req, res) {
  await User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(deletedUser);
  })
};


function processErr(err, response) {
  logger.error(err);
  response.status(500);
  response.send(err.message);
}
