const express = require('express');
const router = express.Router();
const {
  getSellerReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');

router.get('/:sellerId', getSellerReviews);
router.post('/', protect, createLimiter, createReview);
router.put('/:id', protect, createLimiter, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
