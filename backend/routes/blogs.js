const express = require('express');
const router = express.Router();
const { getBlogs, getBlog, createBlog, seedBlogs } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/seed', seedBlogs);
router.get('/:slug', getBlog);
router.post('/', protect, authorize('admin'), createBlog);

module.exports = router;
