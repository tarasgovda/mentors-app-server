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

module.exports = mongoose.model('User', userSchema);
