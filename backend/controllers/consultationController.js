const Consultation = require('../models/Consultation');
const User = require('../models/User');

exports.bookConsultation = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.user) data.user = req.user.id;
    const consultation = await Consultation.create(data);
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, { $push: { consultationsBooked: consultation._id } });
    }
    res.status(201).json({ success: true, message: 'Consultation booked successfully!', consultation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user.id }).sort('-createdAt');
    res.status(200).json({ success: true, consultations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllConsultations = async (req, res) => {
  try {
    const { status, service, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (service) filter.service = service;
    const total = await Consultation.countDocuments(filter);
    const consultations = await Consultation.find(filter)
      .populate('user', 'name email company')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json({ success: true, total, consultations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateConsultationStatus = async (req, res) => {
  try {
    const { status, consultantNotes, meetingLink } = req.body;
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status, consultantNotes, meetingLink },
      { new: true }
    );
    if (!consultation) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, consultation });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
