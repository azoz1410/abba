const Car = require('../models/Car');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
exports.getCars = async (req, res) => {
  try {
    const {
      brand,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      city,
      transmission,
      fuelType,
      condition,
      search,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query = { status: 'active' };

    if (brand) query.brand = brand;
    if (model) query.model = new RegExp(model, 'i');
    if (city) query.city = city;
    if (transmission) query.transmission = transmission;
    if (fuelType) query.fuelType = fuelType;
    if (condition) query.condition = condition;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = Number(minYear);
      if (maxYear) query.year.$lte = Number(maxYear);
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Sorting
    let sortQuery = {};
    if (sort === 'price-asc') sortQuery.price = 1;
    else if (sort === 'price-desc') sortQuery.price = -1;
    else if (sort === 'newest') sortQuery.createdAt = -1;
    else if (sort === 'oldest') sortQuery.createdAt = 1;
    else sortQuery.createdAt = -1;

    // Pagination
    const skip = (page - 1) * limit;

    const cars = await Car.find(query)
      .populate('seller', 'name phone city rating')
      .sort(sortQuery)
      .limit(Number(limit))
      .skip(skip);

    const total = await Car.countDocuments(query);

    res.json({
      success: true,
      data: cars,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate('seller', 'name phone city rating totalRatings createdAt');

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new car listing
// @route   POST /api/cars
// @access  Private
exports.createCar = async (req, res) => {
  try {
    req.body.seller = req.user._id;
    
    const car = await Car.create(req.body);

    res.status(201).json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update car listing
// @route   PUT /api/cars/:id
// @access  Private
exports.updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    // Check ownership
    if (car.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا الإعلان'
      });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete car listing
// @route   DELETE /api/cars/:id
// @access  Private
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'الإعلان غير موجود'
      });
    }

    // Check ownership
    if (car.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا الإعلان'
      });
    }

    await car.deleteOne();

    res.json({
      success: true,
      message: 'تم حذف الإعلان بنجاح'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's car listings
// @route   GET /api/cars/user/:userId
// @access  Public
exports.getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ 
      seller: req.params.userId,
      status: 'active'
    }).sort('-createdAt');

    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get my car listings
// @route   GET /api/cars/my/listings
// @access  Private
exports.getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ seller: req.user._id }).sort('-createdAt');

    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
