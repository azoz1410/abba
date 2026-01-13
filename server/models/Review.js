const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  },
  rating: {
    type: Number,
    required: [true, 'التقييم مطلوب'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'التعليق مطلوب']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate reviews from same reviewer
reviewSchema.index({ seller: 1, reviewer: 1, car: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
