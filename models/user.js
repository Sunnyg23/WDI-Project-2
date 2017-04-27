const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profilepic: { type: String, required: true, trim: true, default: 'http://lh4.ggpht.com/VpeucXbRtK2pmVY6At76vU45Q7YWXB6kz25Sm_JKW1tgfmJDP3gSAlDwowjGEORSM-EW=w300'},
  email: { type: String, required: true },
  password: { type: String, required: true },
  favourites: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (this.isModified('password') && this._passwordConfirmation  !== this.password)
    this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
