import React, { useState } from 'react';
import '../styles/Complaint.css';

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    complaintDetails: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reklamacja zgłoszona:', formData);
    setMessage('Dziękujemy za zgłoszenie reklamacji. Skontaktujemy się z Tobą wkrótce.');
    setFormData({
      name: '',
      email: '',
      orderNumber: '',
      complaintDetails: '',
    });
  };

  return (
    <div className="complaint-container">
      <h2>Zgłoś Reklamację</h2>
      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label htmlFor="name">Imię:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Wpisz swoje imię"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Wpisz swój adres email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="orderNumber">Numer Zamówienia:</label>
          <input
            type="text"
            id="orderNumber"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            required
            placeholder="Wpisz numer zamówienia"
          />
        </div>

        <div className="form-group">
          <label htmlFor="complaintDetails">Szczegóły Reklamacji:</label>
          <textarea
            id="complaintDetails"
            name="complaintDetails"
            value={formData.complaintDetails}
            onChange={handleChange}
            required
            placeholder="Opisz problem"
          />
        </div>

        <button type="submit" className="submit-button">
          Wyślij Reklamację
        </button>
      </form>
      {message && <p className="thank-you-message">{message}</p>}
    </div>
  );
};

export default Complaint;

