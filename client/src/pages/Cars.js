import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CarCard from '../components/CarCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    city: '',
    transmission: '',
    fuelType: '',
    condition: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const params = {};
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });
      
      const response = await api.get('/cars', { params });
      setCars(response.data.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      city: '',
      transmission: '',
      fuelType: '',
      condition: ''
    });
    setTimeout(() => fetchCars(), 100);
  };

  const brands = ['تويوتا', 'هوندا', 'نيسان', 'هيونداي', 'كيا', 'مازدا', 'شيفروليه', 'فورد', 'جيب', 'مرسيدس', 'بي ام دبليو', 'اودي'];
  const cities = ['الرياض', 'جدة', 'مكة', 'المدينة', 'الدمام', 'الخبر', 'أبها', 'تبوك', 'بريدة', 'خميس مشيط'];

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>جميع السيارات المعروضة</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar" style={{ maxWidth: '100%', marginBottom: '1rem' }}>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="ابحث عن سيارة..."
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          <FaSearch style={{ marginLeft: '5px' }} />
          بحث
        </button>
        <button type="button" onClick={() => setShowFilters(!showFilters)} className="btn btn-secondary">
          <FaFilter style={{ marginLeft: '5px' }} />
          فلتر
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="filters">
          <h3 style={{ marginBottom: '1rem' }}>خيارات البحث المتقدم</h3>
          <div className="filters-grid">
            <div className="form-group">
              <label className="form-label">العلامة التجارية</label>
              <select name="brand" value={filters.brand} onChange={handleFilterChange} className="form-control">
                <option value="">الكل</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">المدينة</label>
              <select name="city" value={filters.city} onChange={handleFilterChange} className="form-control">
                <option value="">الكل</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">السعر من</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="الحد الأدنى"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">السعر إلى</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="الحد الأقصى"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">السنة من</label>
              <input
                type="number"
                name="minYear"
                value={filters.minYear}
                onChange={handleFilterChange}
                placeholder="مثال: 2015"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">السنة إلى</label>
              <input
                type="number"
                name="maxYear"
                value={filters.maxYear}
                onChange={handleFilterChange}
                placeholder="مثال: 2024"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">نوع القير</label>
              <select name="transmission" value={filters.transmission} onChange={handleFilterChange} className="form-control">
                <option value="">الكل</option>
                <option value="أوتوماتيك">أوتوماتيك</option>
                <option value="عادي">عادي</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">نوع الوقود</label>
              <select name="fuelType" value={filters.fuelType} onChange={handleFilterChange} className="form-control">
                <option value="">الكل</option>
                <option value="بنزين">بنزين</option>
                <option value="ديزل">ديزل</option>
                <option value="هايبرد">هايبرد</option>
                <option value="كهربائي">كهربائي</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">الحالة</label>
              <select name="condition" value={filters.condition} onChange={handleFilterChange} className="form-control">
                <option value="">الكل</option>
                <option value="ممتاز">ممتاز</option>
                <option value="جيد جداً">جيد جداً</option>
                <option value="جيد">جيد</option>
                <option value="مقبول">مقبول</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button onClick={handleSearch} className="btn btn-primary">تطبيق الفلاتر</button>
            <button onClick={resetFilters} className="btn btn-secondary">إعادة تعيين</button>
          </div>
        </div>
      )}

      {/* Cars Grid */}
      {loading ? (
        <div className="loading">جاري التحميل...</div>
      ) : cars.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>لا توجد سيارات متاحة</h3>
          <p>جرب تغيير معايير البحث</p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
            تم العثور على {cars.length} سيارة
          </p>
          <div className="grid">
            {cars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cars;
