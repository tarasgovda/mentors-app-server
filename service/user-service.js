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

exports.authenticate = function (req, res) {
  // axios.post("https://space.sombrainc.com", req.body)
  axios.post("192.168.1.239:8080/webhook/authenticate", req.body)
    then(response => {
      const user = response.data;
      const userFromDb = User.find({"email": user.email});
      if(userFromDb) {

      } else {

      }
    })
    .catch(error => {
      if (error.response) {
        logger.error(error.response.status);
        logger.error(error.response.data.message);
    } else if (error.request) {
        logger.error("Request was sent, but no response received");
        logger.error(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        logger.error('Something happened in setting up the request that triggered an Error');
        logger.error('Error', error.message);
    }
    })
}
