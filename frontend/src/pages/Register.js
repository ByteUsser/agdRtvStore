import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Rejestracja zakończona pomyślnie!');
        setErrorMessage('');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMessage(`Błąd rejestracji: ${data.message || 'Nieznany błąd'}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      setErrorMessage('Wystąpił problem z serwerem. Spróbuj ponownie później.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Zarejestruj się</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Imię"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
