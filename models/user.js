const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  mentor: {type: Schema.Types.ObjectId, ref: 'User'},
  spaceId: {type: Number, required: true, unique: true}
});

userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
})

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
