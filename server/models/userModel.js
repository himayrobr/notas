const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateJwt = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
};

module.exports = mongoose.model('User', userSchema);
