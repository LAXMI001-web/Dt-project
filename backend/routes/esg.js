const express = require('express');
const router = express.Router();
const { calculateESG, getAssessments } = require('../controllers/esgController');
const { protect } = require('../middleware/auth');

router.post('/calculate', calculateESG);
router.get('/my', protect, getAssessments);

module.exports = router;
