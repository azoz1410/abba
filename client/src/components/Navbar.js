import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaUser, FaSignInAlt, FaSignOutAlt, FaPlus, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <FaCar style={{ marginLeft: '10px' }} />
          حراج السيارات
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">الرئيسية</Link>
          <Link to="/cars" className="navbar-link">السيارات</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/add-car" className="navbar-link">
                <FaPlus style={{ marginLeft: '5px' }} />
                أضف إعلان
              </Link>
              <Link to="/messages" className="navbar-link">
                <FaEnvelope style={{ marginLeft: '5px' }} />
                الرسائل
              </Link>
              <Link to="/profile" className="navbar-link">
                <FaUser style={{ marginLeft: '5px' }} />
                {user?.name}
              </Link>
              <button onClick={logout} className="btn btn-danger" style={{ padding: '8px 16px' }}>
                <FaSignOutAlt style={{ marginLeft: '5px' }} />
                تسجيل خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                <FaSignInAlt style={{ marginLeft: '5px' }} />
                دخول
              </Link>
              <Link to="/register" className="btn btn-success" style={{ padding: '8px 16px' }}>
                تسجيل جديد
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
