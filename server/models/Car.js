const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الإعلان مطلوب'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'وصف السيارة مطلوب']
  },
  price: {
    type: Number,
    required: [true, 'السعر مطلوب']
  },
  brand: {
    type: String,
    required: [true, 'العلامة التجارية مطلوبة']
  },
  model: {
    type: String,
    required: [true, 'الموديل مطلوب']
  },
  year: {
    type: Number,
    required: [true, 'سنة الصنع مطلوبة']
  },
  mileage: {
    type: Number,
    required: [true, 'الكيلومترات مطلوبة']
  },
  color: {
    type: String,
    required: [true, 'اللون مطلوب']
  },
  transmission: {
    type: String,
    enum: ['أوتوماتيك', 'عادي'],
    required: [true, 'نوع القير مطلوب']
  },
  fuelType: {
    type: String,
    enum: ['بنزين', 'ديزل', 'هايبرد', 'كهربائي'],
    required: [true, 'نوع الوقود مطلوب']
  },
  condition: {
    type: String,
    enum: ['ممتاز', 'جيد جداً', 'جيد', 'مقبول'],
    required: [true, 'حالة السيارة مطلوبة']
  },
  city: {
    type: String,
    required: [true, 'المدينة مطلوبة']
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'pending', 'deleted'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
carSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text index for search
carSchema.index({ title: 'text', description: 'text', brand: 'text', model: 'text' });

module.exports = mongoose.model('Car', carSchema);
