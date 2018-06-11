const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const questionSchema = Schema ({
  text: {type: String, required : true},
  skill: {type: Schema.Types.ObjectId, ref: 'Skill'}
});

module.exports = mongoose.model('Question', questionSchema);
