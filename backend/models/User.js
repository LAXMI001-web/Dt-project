const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
  company: { type: String, trim: true },
  phone: { type: String },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  industry: { type: String },
  consultationsBooked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consultation' }],
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

UserSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', UserSchema);
