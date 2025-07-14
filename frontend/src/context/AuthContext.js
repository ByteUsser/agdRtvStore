import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Funkcja logowania
  const login = (userName, token) => {
    setIsAuthenticated(true);
    setName(userName);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('name', userName);
    localStorage.setItem('token', token); // Zapis tokenu w localStorage
  };

  // Funkcja wylogowania
  const logout = () => {
    setIsAuthenticated(false);
    setName('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate('/'); // Przekierowanie na stronę główną
  };

  // Sprawdzanie, czy użytkownik jest zalogowany i czy token jest ważny
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated') === 'true';
    const storedName = localStorage.getItem('name');
    const storedToken = localStorage.getItem('token');

    if (storedAuth && storedName && storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);

        // Sprawdzenie, czy token nie wygasł
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setName(storedName);
        } else {
          logout(); // Token wygasł
        }
      } catch (error) {
        console.error('Błąd podczas dekodowania tokenu:', error);
        logout(); // Wylogowanie w przypadku błędu
      }
    }
  }, [navigate]); // Dodaj `navigate` do zależności, ponieważ jest używane w `logout`

  return (
    <AuthContext.Provider value={{ isAuthenticated, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
