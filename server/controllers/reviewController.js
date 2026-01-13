const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Get reviews for a seller
// @route   GET /api/reviews/:sellerId
// @access  Public
exports.getSellerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ seller: req.params.sellerId })
      .populate('reviewer', 'name avatar')
      .populate('car', 'title')
      .sort('-createdAt');

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { seller, car, rating, comment } = req.body;

    // Check if already reviewed
    const existingReview = await Review.findOne({
      seller,
      reviewer: req.user._id,
      car
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'لقد قمت بتقييم هذا البائع مسبقاً'
      });
    }

    // Create review
    const review = await Review.create({
      seller,
      reviewer: req.user._id,
      car,
      rating,
      comment
    });

    // Update seller rating
    const reviews = await Review.find({ seller });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / reviews.length;

    await User.findByIdAndUpdate(seller, {
      rating: avgRating.toFixed(1),
      totalRatings: reviews.length
    });

    const populatedReview = await Review.findById(review._id)
      .populate('reviewer', 'name avatar')
      .populate('car', 'title');

    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'التقييم غير موجود'
      });
    }

    // Check ownership
    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا التقييم'
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      { rating: req.body.rating, comment: req.body.comment },
      { new: true, runValidators: true }
    );

    // Update seller rating
    const reviews = await Review.find({ seller: review.seller });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = totalRating / reviews.length;

    await User.findByIdAndUpdate(review.seller, {
      rating: avgRating.toFixed(1),
      totalRatings: reviews.length
    });

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'التقييم غير موجود'
      });
    }

    // Check ownership
    if (review.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا التقييم'
      });
    }

    const sellerId = review.seller;
    await review.deleteOne();

    // Update seller rating
    const reviews = await Review.find({ seller: sellerId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const avgRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    await User.findByIdAndUpdate(sellerId, {
      rating: avgRating.toFixed(1),
      totalRatings: reviews.length
    });

    res.json({
      success: true,
      message: 'تم حذف التقييم بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
