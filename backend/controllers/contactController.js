const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message received! We\'ll respond within 24 hours.', contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(Number(limit));
    res.status(200).json({ success: true, total, contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const Consultation = require('../models/Consultation');
    const User = require('../models/User');
    const Blog = require('../models/Blog');

    const [totalUsers, totalConsultations, pendingConsultations, totalContacts, totalBlogs] = await Promise.all([
      User.countDocuments(),
      Consultation.countDocuments(),
      Consultation.countDocuments({ status: 'pending' }),
      Contact.countDocuments({ status: 'new' }),
      Blog.countDocuments()
    ]);

    const recentConsultations = await Consultation.find().sort('-createdAt').limit(5).populate('user', 'name email');
    res.status(200).json({
      success: true,
      stats: { totalUsers, totalConsultations, pendingConsultations, totalContacts, totalBlogs },
      recentConsultations
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
