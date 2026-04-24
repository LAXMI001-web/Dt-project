const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['supply-chain', 'procurement', 'six-sigma', 'esg', 'logistics', 'inventory', 'leadership', 'industry-news'],
    required: true
  },
  tags: [{ type: String }],
  author: { type: String, default: 'Nexara Team' },
  readTime: { type: Number, default: 5 },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  coverImage: { type: String },
  type: { type: String, enum: ['blog', 'whitepaper', 'case-study'], default: 'blog' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
