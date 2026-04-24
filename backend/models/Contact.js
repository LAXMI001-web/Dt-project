const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  source: { type: String, default: 'website' },
  status: { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);

