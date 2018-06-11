const User = require('../models/user');

exports.all = async function() {
  return await User.find({}, function (err, data) {
    if(err) throw new Error(err);

    return data;
  })
};

exports.create = async function(user) {

};

exports.update = async function(id) {};

exports.delete = async function(id) {};
