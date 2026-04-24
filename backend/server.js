require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');

const app = express();
connectDB();

// Security & middleware
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: 'Too many requests' });
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/consultations', require('./routes/consultations'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/esg', require('./routes/esg'));
app.use('/api/contact', require('./routes/contact'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'Nexara API' }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Nexara API running on port ${PORT} [${process.env.NODE_ENV}]`));

module.exports = app;
