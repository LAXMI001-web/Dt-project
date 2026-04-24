const express = require('express');
const router = express.Router();
const { submitContact, getContacts, getDashboardStats } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', submitContact);
router.get('/', protect, authorize('admin'), getContacts);
router.get('/dashboard', protect, authorize('admin'), getDashboardStats);

module.exports = router;
