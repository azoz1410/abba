# 🚗 حراج السيارات - Car Marketplace

مشروع متكامل لحراج السيارات يوفر منصة آمنة وموثوقة لبيع وشراء السيارات

A complete car marketplace platform providing a safe and reliable platform for buying and selling cars.

## 🌟 المميزات / Features

### للمستخدمين / For Users
- ✅ تسجيل حساب وتسجيل دخول آمن / Secure registration and login
- 🔍 بحث متقدم عن السيارات مع فلاتر متعددة / Advanced search with multiple filters
- 📱 واجهة سهلة الاستخدام ومتجاوبة / User-friendly responsive interface
- 💬 نظام مراسلات داخلي للتواصل مع البائعين / Internal messaging system
- ⭐ نظام تقييم ومراجعات للبائعين / Rating and review system for sellers
- 🚘 إضافة إعلانات السيارات مع صور / Add car listings with images
- 📊 لوحة تحكم لإدارة الإعلانات / Dashboard to manage listings

### التقنيات المستخدمة / Technologies Used

#### Backend
- **Node.js & Express.js** - Backend framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Multer** - File upload handling

#### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Context API** - State management

## 📁 هيكل المشروع / Project Structure

```
abba/
├── server/                 # Backend code
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   │   ├── User.js        # User model
│   │   ├── Car.js         # Car listing model
│   │   ├── Message.js     # Message model
│   │   └── Review.js      # Review model
│   ├── controllers/       # Business logic
│   │   ├── authController.js
│   │   ├── carController.js
│   │   ├── messageController.js
│   │   └── reviewController.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── cars.js
│   │   ├── messages.js
│   │   └── reviews.js
│   ├── middleware/        # Custom middleware
│   │   └── auth.js
│   └── index.js           # Server entry point
│
├── client/                # Frontend code
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/    # React components
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   └── CarCard.js
│       ├── pages/         # Page components
│       │   ├── Home.js
│       │   ├── Cars.js
│       │   ├── Login.js
│       │   └── Register.js
│       ├── context/       # React context
│       │   └── AuthContext.js
│       ├── services/      # API services
│       │   └── api.js
│       ├── App.js
│       ├── App.css
│       └── index.js
│
├── uploads/               # Uploaded files
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 التثبيت والتشغيل / Installation & Setup

### المتطلبات / Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. تثبيت المكتبات / Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. إعداد البيئة / Environment Setup

انسخ ملف `.env.example` إلى `.env` وقم بتعديل القيم:

```bash
cp .env.example .env
```

قم بتعديل الملف `.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-marketplace
JWT_SECRET=your-secret-key-change-this
CLIENT_URL=http://localhost:3000
```

### 3. تشغيل قاعدة البيانات / Start MongoDB

تأكد من تشغيل MongoDB:

```bash
# On macOS/Linux
mongod

# Or use MongoDB Atlas (cloud)
```

### 4. تشغيل التطبيق / Run the Application

#### Development Mode (تطوير)

```bash
# Terminal 1: Start backend server
npm run dev

# Terminal 2: Start frontend
npm run client
```

#### Production Mode (إنتاج)

```bash
# Build frontend
npm run client:build

# Start backend server
npm start
```

التطبيق سيعمل على:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📡 API Endpoints

### Authentication (المصادقة)
```
POST   /api/auth/register    - تسجيل مستخدم جديد
POST   /api/auth/login       - تسجيل الدخول
GET    /api/auth/me          - الحصول على بيانات المستخدم (Private)
PUT    /api/auth/profile     - تحديث الملف الشخصي (Private)
```

### Cars (السيارات)
```
GET    /api/cars             - الحصول على جميع السيارات
GET    /api/cars/:id         - الحصول على سيارة محددة
POST   /api/cars             - إضافة إعلان سيارة (Private)
PUT    /api/cars/:id         - تحديث إعلان سيارة (Private)
DELETE /api/cars/:id         - حذف إعلان سيارة (Private)
GET    /api/cars/user/:id    - الحصول على إعلانات مستخدم محدد
GET    /api/cars/my/listings - الحصول على إعلاناتي (Private)
```

### Messages (الرسائل)
```
GET    /api/messages/conversations     - الحصول على المحادثات (Private)
GET    /api/messages/unread/count      - عدد الرسائل غير المقروءة (Private)
GET    /api/messages/:carId/:userId    - الحصول على الرسائل (Private)
POST   /api/messages                   - إرسال رسالة (Private)
```

### Reviews (التقييمات)
```
GET    /api/reviews/:sellerId    - الحصول على تقييمات البائع
POST   /api/reviews              - إضافة تقييم (Private)
PUT    /api/reviews/:id          - تحديث تقييم (Private)
DELETE /api/reviews/:id          - حذف تقييم (Private)
```

## 🔐 الأمان / Security

المشروع يطبق أفضل ممارسات الأمان:
- ✅ تشفير كلمات المرور باستخدام bcrypt
- ✅ JWT للمصادقة
- ✅ Helmet للحماية من الثغرات الشائعة
- ✅ CORS لمنع الطلبات غير المصرح بها
- ✅ التحقق من صحة المدخلات
- ✅ حماية المسارات الخاصة
- ✅ Rate Limiting لمنع الإساءة والهجمات

## 🧪 الاختبار / Testing

```bash
npm test
```

## 📝 الوثائق الإضافية / Additional Documentation

### نموذج بيانات السيارة / Car Data Model
```javascript
{
  title: String,          // عنوان الإعلان
  description: String,    // وصف السيارة
  price: Number,          // السعر
  brand: String,          // العلامة التجارية
  model: String,          // الموديل
  year: Number,           // سنة الصنع
  mileage: Number,        // الكيلومترات
  color: String,          // اللون
  transmission: String,   // نوع القير (أوتوماتيك/عادي)
  fuelType: String,       // نوع الوقود
  condition: String,      // حالة السيارة
  city: String,           // المدينة
  images: [String],       // الصور
  features: [String],     // المميزات
  seller: ObjectId,       // البائع
  status: String,         // حالة الإعلان
  views: Number,          // عدد المشاهدات
  createdAt: Date,        // تاريخ الإنشاء
  updatedAt: Date         // تاريخ التحديث
}
```

### نموذج بيانات المستخدم / User Data Model
```javascript
{
  name: String,           // الاسم
  email: String,          // البريد الإلكتروني
  password: String,       // كلمة المرور (مشفرة)
  phone: String,          // رقم الجوال
  city: String,           // المدينة
  role: String,           // الدور (user/admin)
  avatar: String,         // الصورة الشخصية
  rating: Number,         // التقييم
  totalRatings: Number,   // عدد التقييمات
  isVerified: Boolean,    // حالة التوثيق
  createdAt: Date         // تاريخ التسجيل
}
```

## 🤝 المساهمة / Contributing

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء branch للميزة الجديدة
3. Commit التغييرات
4. Push إلى ال branch
5. فتح Pull Request

## 📄 الترخيص / License

MIT License

## 👨‍💻 المطور / Developer

تم تطوير هذا المشروع كمنصة متكاملة لحراج السيارات

## 📞 التواصل / Contact

لأي استفسارات أو مشاكل، يرجى فتح issue في GitHub

---

**ملاحظة:** هذا مشروع تعليمي وقابل للتطوير والتحسين.

**Note:** This is an educational project and can be further developed and improved.
