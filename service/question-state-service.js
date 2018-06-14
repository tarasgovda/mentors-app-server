const QuestionState = require('../models/question-state');
const logger = require('../logger');

exports.all = async function() {
  return await QuestionState.find({}, function (err, data) {
    if(err) throw new Error(err);
    return data;
  })
};

exports.create = async function(req, res) {
  await new QuestionState(req.body).save(function(err, questionState) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(questionState);
  })
};

exports.update = async function(req, res) {

  await QuestionState.findByIdAndUpdate(req.body.id, req.body, {"new": true}, function (err, updatedQuestionState) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(updatedQuestionState);
  })
};

exports.delete = async function(req, res) {
  await QuestionState.findByIdAndDelete(req.params.id, function (err, deletedQuestionState) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(deletedQuestionState);
  })
};


function processErr(err, response) {
  logger.info(err);
  response.status(500);
  response.send(err.message);
}
