const Skill = require('../models/skill');

exports.all = async function() {
  return await Skill.find({}, function (err, data) {
    if(err) throw new Error(err);
    return data;
  })
};

exports.create = async function(req, res) {
  await new Skill(req.body).save(function(err, skill) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(skill);
  })
};

exports.update = async function(req, res) {

  await Skill.findByIdAndUpdate(req.body.id, req.body, {"new": true}, function (err, updatedSkill) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(updatedSkill);
  })
};

exports.delete = async function(req, res) {
  await Skill.findByIdAndDelete(req.params.id, function (err, deletedSkill) {
    if(err) {
      processErr(err, res);
      return;
    }
    res.send(deletedSkill);
  })
};


function processErr(err, response) {
  console.log(err);
  response.status(500);
  response.send(err.message);
}
