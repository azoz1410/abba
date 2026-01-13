# دليل الإعداد والتثبيت - Setup Guide

## المتطلبات الأساسية / Prerequisites

قبل البدء، تأكد من تثبيت:

1. **Node.js** (الإصدار 14 أو أحدث)
   - تحميل من: https://nodejs.org/
   - للتحقق: `node --version`

2. **MongoDB**
   - خيار 1: تثبيت محلي من https://www.mongodb.com/try/download/community
   - خيار 2: استخدام MongoDB Atlas (سحابي مجاني)
   - للتحقق: `mongod --version`

3. **npm** أو **yarn**
   - يأتي مع Node.js
   - للتحقق: `npm --version`

## خطوات التثبيت / Installation Steps

### 1. استنساخ المشروع / Clone Repository

```bash
git clone <repository-url>
cd abba
```

### 2. تثبيت المكتبات / Install Dependencies

```bash
# تثبيت مكتبات الخادم / Install backend dependencies
npm install

# تثبيت مكتبات الواجهة الأمامية / Install frontend dependencies
cd client
npm install
cd ..
```

أو استخدم الأمر المختصر:
```bash
npm run install:all
```

### 3. إعداد قاعدة البيانات / Database Setup

#### استخدام MongoDB المحلي / Using Local MongoDB

```bash
# تشغيل MongoDB
mongod

# في نافذة أخرى، يمكنك استخدام MongoDB shell
mongosh
```

#### استخدام MongoDB Atlas / Using MongoDB Atlas

1. سجل في https://www.mongodb.com/cloud/atlas
2. أنشئ Cluster مجاني
3. احصل على Connection String
4. استخدمه في ملف `.env`

### 4. إعداد متغيرات البيئة / Environment Variables

انسخ الملف النموذجي:
```bash
cp .env.example .env
```

قم بتحرير `.env`:
```env
NODE_ENV=development
PORT=5000

# قاعدة البيانات المحلية
MONGODB_URI=mongodb://localhost:27017/car-marketplace

# أو استخدم MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-marketplace

# مفتاح JWT (غيّره للإنتاج!)
JWT_SECRET=your-super-secret-key-change-in-production

# رابط الواجهة الأمامية
CLIENT_URL=http://localhost:3000
```

### 5. تشغيل المشروع / Run the Project

#### وضع التطوير / Development Mode

افتح نافذتي terminal:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

#### وضع الإنتاج / Production Mode

```bash
# بناء الواجهة الأمامية
npm run client:build

# تشغيل الخادم
npm start
```

### 6. الوصول للتطبيق / Access the Application

- **الواجهة الأمامية:** http://localhost:3000
- **API الخلفية:** http://localhost:5000
- **API Documentation:** http://localhost:5000/api

## اختبار التثبيت / Testing Installation

### 1. اختبار الخادم / Test Backend

```bash
curl http://localhost:5000
```

يجب أن ترى رسالة ترحيب.

### 2. اختبار الواجهة الأمامية / Test Frontend

افتح المتصفح على http://localhost:3000

### 3. اختبار API / Test API

```bash
# تسجيل مستخدم جديد
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "0501234567",
    "city": "الرياض"
  }'
```

## حل المشاكل الشائعة / Troubleshooting

### مشكلة: MongoDB لا يعمل

**الحل:**
```bash
# تحقق من حالة MongoDB
sudo systemctl status mongod

# تشغيل MongoDB
sudo systemctl start mongod

# أو استخدم MongoDB Atlas بدلاً من المحلي
```

### مشكلة: منفذ 5000 مستخدم

**الحل:**
```bash
# غيّر المنفذ في ملف .env
PORT=5001
```

### مشكلة: خطأ في تثبيت المكتبات

**الحل:**
```bash
# حذف المجلدات والملفات المؤقتة
rm -rf node_modules client/node_modules
rm package-lock.json client/package-lock.json

# إعادة التثبيت
npm install
cd client && npm install
```

### مشكلة: CORS Error

**الحل:**
تأكد من أن `CLIENT_URL` في `.env` يطابق عنوان الواجهة الأمامية.

## الخطوات التالية / Next Steps

بعد التثبيت الناجح:

1. ✅ قم بتسجيل حساب جديد
2. ✅ أضف إعلان سيارة
3. ✅ جرّب البحث والفلترة
4. ✅ اختبر نظام الرسائل
5. ✅ أضف تقييمات

## الدعم / Support

إذا واجهت أي مشاكل:
1. تحقق من [المشاكل الشائعة](#حل-المشاكل-الشائعة--troubleshooting)
2. ابحث في Issues على GitHub
3. أنشئ Issue جديد مع تفاصيل المشكلة

## الموارد الإضافية / Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/)
