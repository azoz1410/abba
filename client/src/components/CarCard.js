import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaTachometerAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link to={`/cars/${car._id}`} style={{ textDecoration: 'none' }}>
      <div className="car-card">
        <img
          src={car.images && car.images[0] ? car.images[0] : 'https://via.placeholder.com/400x300?text=لا+توجد+صورة'}
          alt={car.title}
          className="car-card-image"
        />
        <div className="car-card-content">
          <h3 className="car-card-title">{car.title}</h3>
          <div className="car-card-price">{formatPrice(car.price)}</div>
          <div className="car-card-details">
            <span>
              <FaCalendar style={{ marginLeft: '5px' }} />
              {car.year}
            </span>
            <span>
              <FaTachometerAlt style={{ marginLeft: '5px' }} />
              {car.mileage.toLocaleString('ar-SA')} كم
            </span>
            <span>
              <FaMapMarkerAlt style={{ marginLeft: '5px' }} />
              {car.city}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
