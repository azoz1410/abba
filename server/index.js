require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/reviews', require('./routes/reviews'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'مرحباً بك في API حراج السيارات - Welcome to Car Marketplace API',
    endpoints: {
      auth: '/api/auth',
      cars: '/api/cars',
      messages: '/api/messages',
      reviews: '/api/reviews'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'خطأ في الخادم'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'المسار غير موجود'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
