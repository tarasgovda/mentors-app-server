const Question = require('../models/question');

exports.all = async function() {
  return await Question.find({}, function (err, data) {
    if(err) throw new Error(err);
    return data;
  })
};

exports.create = async function(req, res) {
  await new Question(req.body).save(function(err, question) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(question);
  })
};

exports.update = async function(req, res) {

  await Question.findByIdAndUpdate(req.body.id, req.body, {"new": true}, function (err, updatedQuestion) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(updatedQuestion);
  })
};

exports.delete = async function(req, res) {
  await Question.findByIdAndDelete(req.params.id, function (err, deletedQuestion) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(deletedQuestion);
  })
};


function processErr(err, response) {
  console.log(err);
  response.status(500);
  response.send(err.message);
}
