const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATES = ['Didn\'t see', 'Learned', 'To discuss'];

const questionStateSchema = new Schema({
  notes: {type: String},
  approved: {type: Boolean},
  mark: {type: Number},
  state: {type: String, enum: STATES},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  question: {type: Schema.Types.ObjectId, ref: 'Question', required: true}
});

module.exports = mongoose.model('QuestionState', questionStateSchema);
