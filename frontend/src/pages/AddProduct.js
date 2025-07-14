import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '../constants/categories'; 
import '../styles/AddProduct.css'; 

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: categoryData[0].category, 
    image: null,
  });
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Brak autoryzacji. Zaloguj się jako admin.');
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5001/api/products/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Produkt dodany pomyślnie!');
        setTimeout(() => navigate('/'), 2000); 
      } else {
        setError(`Błąd dodawania produktu: ${data.message}`);
      }
    } catch (error) {
      setError('Błąd podczas dodawania produktu.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <h1 className="add-product-title">Dodaj Produkt</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nazwa produktu</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Wpisz nazwę produktu"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Cena</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Wpisz cenę"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="brand">Marka</label>
          <input
            type="text"
            id="brand"
            name="brand"
            placeholder="Wpisz markę"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Kategoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categoryData.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="image">Dodaj zdjęcie</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Dodawanie...' : 'Dodaj Produkt'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
