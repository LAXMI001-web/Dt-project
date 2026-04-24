const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  phone: { type: String },
  service: {
    type: String,
    required: true,
    enum: ['supply-chain', 'vendor-development', 'procurement', 'six-sigma', 'logistics', 'inventory', 'esg', 'general']
  },
  industry: { type: String },
  message: { type: String, required: true },
  preferredDate: { type: Date },
  preferredTime: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  consultantNotes: { type: String },
  meetingLink: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', ConsultationSchema);
