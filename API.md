# دليل API - API Documentation

## نظرة عامة / Overview

API RESTful لمنصة حراج السيارات. جميع الاستجابات بصيغة JSON.

Base URL: `http://localhost:5000/api`

## المصادقة / Authentication

يستخدم API نظام JWT للمصادقة. للوصول للمسارات المحمية:

1. سجل دخول أو أنشئ حساب
2. احصل على الـ token
3. أرسل الـ token في header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## استجابة API / API Response Format

### نجاح / Success
```json
{
  "success": true,
  "data": { ... }
}
```

### خطأ / Error
```json
{
  "success": false,
  "message": "رسالة الخطأ"
}
```

## المسارات / Endpoints

### 1. المصادقة / Authentication

#### تسجيل مستخدم جديد / Register
```
POST /api/auth/register
```

**Body:**
```json
{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "phone": "0501234567",
  "city": "الرياض"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "token": "jwt_token"
  }
}
```

#### تسجيل الدخول / Login
```
POST /api/auth/login
```

**Body:**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "token": "jwt_token"
  }
}
```

#### الحصول على بيانات المستخدم / Get Profile
```
GET /api/auth/me
```
🔒 **Requires Authentication**

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "phone": "0501234567",
    "city": "الرياض",
    "rating": 4.5,
    "totalRatings": 10
  }
}
```

#### تحديث الملف الشخصي / Update Profile
```
PUT /api/auth/profile
```
🔒 **Requires Authentication**

**Body:**
```json
{
  "name": "أحمد محمد المحدث",
  "phone": "0509876543",
  "city": "جدة"
}
```

### 2. السيارات / Cars

#### الحصول على جميع السيارات / Get All Cars
```
GET /api/cars
```

**Query Parameters:**
- `search` - بحث نصي
- `brand` - العلامة التجارية
- `model` - الموديل
- `minPrice` - الحد الأدنى للسعر
- `maxPrice` - الحد الأقصى للسعر
- `minYear` - الحد الأدنى للسنة
- `maxYear` - الحد الأقصى للسنة
- `city` - المدينة
- `transmission` - نوع القير
- `fuelType` - نوع الوقود
- `condition` - الحالة
- `sort` - الترتيب (price-asc, price-desc, newest, oldest)
- `page` - رقم الصفحة (افتراضي: 1)
- `limit` - عدد النتائج (افتراضي: 12)

**Example:**
```
GET /api/cars?brand=تويوتا&city=الرياض&minPrice=50000&maxPrice=100000&page=1
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "car_id",
      "title": "تويوتا كامري 2020",
      "price": 75000,
      "brand": "تويوتا",
      "model": "كامري",
      "year": 2020,
      "mileage": 50000,
      "city": "الرياض",
      "images": ["url1", "url2"],
      "seller": {
        "name": "أحمد محمد",
        "phone": "0501234567",
        "rating": 4.5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 100,
    "pages": 9
  }
}
```

#### الحصول على سيارة واحدة / Get Single Car
```
GET /api/cars/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "car_id",
    "title": "تويوتا كامري 2020",
    "description": "وصف تفصيلي للسيارة...",
    "price": 75000,
    "brand": "تويوتا",
    "model": "كامري",
    "year": 2020,
    "mileage": 50000,
    "color": "أبيض",
    "transmission": "أوتوماتيك",
    "fuelType": "بنزين",
    "condition": "ممتاز",
    "city": "الرياض",
    "images": ["url1", "url2"],
    "features": ["فتحة سقف", "شاشة لمس", "كاميرا خلفية"],
    "views": 150,
    "seller": {
      "_id": "user_id",
      "name": "أحمد محمد",
      "phone": "0501234567",
      "city": "الرياض",
      "rating": 4.5,
      "totalRatings": 10
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### إضافة إعلان سيارة / Create Car Listing
```
POST /api/cars
```
🔒 **Requires Authentication**

**Body:**
```json
{
  "title": "تويوتا كامري 2020",
  "description": "سيارة بحالة ممتازة، فحص شامل...",
  "price": 75000,
  "brand": "تويوتا",
  "model": "كامری",
  "year": 2020,
  "mileage": 50000,
  "color": "أبيض",
  "transmission": "أوتوماتيك",
  "fuelType": "بنزين",
  "condition": "ممتاز",
  "city": "الرياض",
  "images": ["url1", "url2"],
  "features": ["فتحة سقف", "شاشة لمس"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { ... }
}
```

#### تحديث إعلان سيارة / Update Car Listing
```
PUT /api/cars/:id
```
🔒 **Requires Authentication** (Owner or Admin)

#### حذف إعلان سيارة / Delete Car Listing
```
DELETE /api/cars/:id
```
🔒 **Requires Authentication** (Owner or Admin)

#### الحصول على إعلانات مستخدم / Get User's Cars
```
GET /api/cars/user/:userId
```

#### الحصول على إعلاناتي / Get My Cars
```
GET /api/cars/my/listings
```
🔒 **Requires Authentication**

### 3. الرسائل / Messages

#### الحصول على المحادثات / Get Conversations
```
GET /api/messages/conversations
```
🔒 **Requires Authentication**

#### الحصول على عدد الرسائل غير المقروءة / Get Unread Count
```
GET /api/messages/unread/count
```
🔒 **Requires Authentication**

#### الحصول على الرسائل / Get Messages
```
GET /api/messages/:carId/:userId
```
🔒 **Requires Authentication**

#### إرسال رسالة / Send Message
```
POST /api/messages
```
🔒 **Requires Authentication**

**Body:**
```json
{
  "car": "car_id",
  "receiver": "user_id",
  "content": "مرحباً، هل السيارة متاحة؟"
}
```

### 4. التقييمات / Reviews

#### الحصول على تقييمات البائع / Get Seller Reviews
```
GET /api/reviews/:sellerId
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "review_id",
      "rating": 5,
      "comment": "بائع ممتاز وصادق",
      "reviewer": {
        "name": "محمد أحمد",
        "avatar": "url"
      },
      "car": {
        "title": "تويوتا كامري 2020"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### إضافة تقييم / Create Review
```
POST /api/reviews
```
🔒 **Requires Authentication**

**Body:**
```json
{
  "seller": "user_id",
  "car": "car_id",
  "rating": 5,
  "comment": "بائع ممتاز وصادق"
}
```

#### تحديث تقييم / Update Review
```
PUT /api/reviews/:id
```
🔒 **Requires Authentication** (Owner)

#### حذف تقييم / Delete Review
```
DELETE /api/reviews/:id
```
🔒 **Requires Authentication** (Owner or Admin)

## أكواد الحالة / Status Codes

- `200` - نجاح
- `201` - تم الإنشاء بنجاح
- `400` - خطأ في البيانات المرسلة
- `401` - غير مصرح (تحتاج تسجيل دخول)
- `403` - ممنوع (لا تملك الصلاحية)
- `404` - غير موجود
- `500` - خطأ في الخادم

## أمثلة باستخدام cURL

### تسجيل مستخدم
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "phone": "0501234567",
    "city": "الرياض"
  }'
```

### الحصول على السيارات
```bash
curl http://localhost:5000/api/cars?city=الرياض&page=1
```

### إضافة سيارة (مع المصادقة)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "تويوتا كامري 2020",
    "price": 75000,
    ...
  }'
```

## معدل الطلبات / Rate Limiting

لحماية API من الإساءة، تم تطبيق حدود للطلبات:

### حدود عامة / General Limits
- **API عام:** 100 طلب كل 15 دقيقة لكل IP
- **تسجيل/دخول:** 5 محاولات كل 15 دقيقة
- **إنشاء/تعديل:** 20 عملية كل ساعة

إذا تجاوزت الحد، ستحصل على:
```json
{
  "success": false,
  "message": "تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً."
}
```

## الدعم / Support

لأي استفسارات حول API، يرجى فتح Issue على GitHub.
