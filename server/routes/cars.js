const express = require('express');
const router = express.Router();
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getUserCars,
  getMyCars
} = require('../controllers/carController');
const { protect } = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(getCars)
  .post(protect, createLimiter, createCar);

router.get('/my/listings', protect, getMyCars);
router.get('/user/:userId', getUserCars);

router.route('/:id')
  .get(getCar)
  .put(protect, createLimiter, updateCar)
  .delete(protect, deleteCar);

module.exports = router;
