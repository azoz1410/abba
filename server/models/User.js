const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الاسم مطلوب'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    required: [true, 'رقم الجوال مطلوب']
  },
  city: {
    type: String,
    required: [true, 'المدينة مطلوبة']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
