const express = require('express');
const router = express.Router();
const { bookConsultation, getMyConsultations, getAllConsultations, updateConsultationStatus } = require('../controllers/consultationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', bookConsultation);
router.get('/my', protect, getMyConsultations);
router.get('/all', protect, authorize('admin'), getAllConsultations);
router.put('/:id', protect, authorize('admin'), updateConsultationStatus);

module.exports = router;
