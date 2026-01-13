import React from 'react';
import { FaCar, FaSearch, FaShieldAlt, FaComments } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              <FaCar style={{ marginLeft: '10px' }} />
              حراج السيارات
            </h3>
            <p>منصة متكاملة لبيع وشراء السيارات بكل سهولة وأمان</p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>مميزات المنصة</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <FaSearch style={{ marginLeft: '5px' }} />
                بحث متقدم وسريع
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <FaShieldAlt style={{ marginLeft: '5px' }} />
                منصة آمنة وموثوقة
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <FaComments style={{ marginLeft: '5px' }} />
                تواصل مباشر مع البائع
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem' }}>روابط مهمة</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>عن المنصة</li>
              <li style={{ marginBottom: '0.5rem' }}>الشروط والأحكام</li>
              <li style={{ marginBottom: '0.5rem' }}>سياسة الخصوصية</li>
              <li style={{ marginBottom: '0.5rem' }}>اتصل بنا</li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', textAlign: 'center' }}>
          <p>&copy; 2024 حراج السيارات. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
