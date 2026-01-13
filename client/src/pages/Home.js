import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaSearch, FaShieldAlt, FaComments, FaStar, FaCheckCircle } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>مرحباً بك في حراج السيارات</h1>
        <p>منصة متكاملة لبيع وشراء السيارات بكل سهولة وأمان</p>
        <Link to="/cars" className="btn btn-success" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          <FaSearch style={{ marginLeft: '10px' }} />
          تصفح السيارات
        </Link>
      </div>

      <div className="container">
        {/* Features Section */}
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
          لماذا تختار منصتنا؟
        </h2>
        
        <div className="grid" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <FaSearch style={{ fontSize: '3rem', color: '#3498db', marginBottom: '1rem' }} />
            <h3>بحث متقدم</h3>
            <p>ابحث عن سيارتك المثالية بسهولة مع خيارات بحث وفلترة متقدمة</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <FaShieldAlt style={{ fontSize: '3rem', color: '#27ae60', marginBottom: '1rem' }} />
            <h3>أمان وثقة</h3>
            <p>منصة آمنة وموثوقة مع نظام تقييم شامل للبائعين</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <FaComments style={{ fontSize: '3rem', color: '#e74c3c', marginBottom: '1rem' }} />
            <h3>تواصل مباشر</h3>
            <p>تواصل مباشر مع البائع من خلال نظام المراسلات الداخلي</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <FaStar style={{ fontSize: '3rem', color: '#f39c12', marginBottom: '1rem' }} />
            <h3>تقييمات موثوقة</h3>
            <p>اطلع على تقييمات البائعين من المشترين السابقين</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <FaCar style={{ fontSize: '3rem', color: '#9b59b6', marginBottom: '1rem' }} />
            <h3>إعلانات مفصلة</h3>
            <p>إعلانات شاملة مع صور ومعلومات تفصيلية عن كل سيارة</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <FaCheckCircle style={{ fontSize: '3rem', color: '#16a085', marginBottom: '1rem' }} />
            <h3>سهولة الاستخدام</h3>
            <p>واجهة بسيطة وسهلة الاستخدام لتجربة مريحة</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h2 style={{ marginBottom: '1rem' }}>هل تريد بيع سيارتك؟</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>انضم إلى آلاف البائعين الذين يثقون بمنصتنا</p>
          <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: '#764ba2', fontSize: '1.1rem', padding: '12px 30px' }}>
            ابدأ الآن مجاناً
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid" style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#3498db', marginBottom: '0.5rem' }}>1000+</h3>
            <p>سيارة معروضة</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#27ae60', marginBottom: '0.5rem' }}>500+</h3>
            <p>بائع موثوق</p>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '2.5rem', color: '#e74c3c', marginBottom: '0.5rem' }}>2000+</h3>
            <p>عملية بيع ناجحة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
