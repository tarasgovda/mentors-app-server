const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesEnum = ['ROLE_USER', 'ROLE_MENTOR', 'ROLE_ADMIN'];
Object.freeze(RolesEnum);

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  mentor: {type: Schema.Types.ObjectId, ref: 'User'},
  email: {type: String, required: true, unique: true},
  roles: {
    type: [String],
    required: true
  }
});

userSchema.path('roles').validate(function(v) {
  return v.length > 0 && v.length <= RolesEnum.length;
}, `roles should contain at least one role and ${RolesEnum.length} roles at most`, 'Invalid roles array length');

userSchema.path('roles').validate(function(v) {
  for(role of v) {
    if(RolesEnum.indexOf(role) == -1){
      return false;
    }
  }
  return true
}, 'roles array contains invalid role string', 'Invalid role');

userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
})

userSchema.post('save', function(error, doc, next) {
  if (error && error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
