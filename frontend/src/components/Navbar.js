import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faPlus,
  faSignOutAlt,
  faUser,
  faSignInAlt,
  faSearch,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css'; // Import pliku CSS z folderu styles

const Navbar = () => {
  const { isAuthenticated, name, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Dodaj stan dla rozwijanego menu

  const isAdmin = name === 'Admin'; // Sprawdzenie roli admina

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Przełączanie widoczności menu
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <span className="logo-main">Electro</span>
            <span className="logo-sub">RTV/AGD</span>
          </Link>
        </div>

        {/* Wyszukiwarka */}
        <div className="navbar-center">
          <input
            type="text"
            className="search-input"
            placeholder="Szukaj produktów..."
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} /> {/* Ikona lupy */}
          </button>
        </div>

        {/* Opcje użytkownika */}
        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <span className="navbar-greeting">
                <FontAwesomeIcon icon={faUser} /> Witaj, {name || 'Użytkowniku'}!
              </span>
              <Link to="/cart" className="navbar-cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Koszyk
              </Link>

              {isAdmin && (
                <Link to="/add-product" className="navbar-link">
                  <FontAwesomeIcon icon={faPlus} /> Dodaj Produkt
                </Link>
              )}

              <button
                onClick={() => logout(navigate)}
                className="navbar-logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
              <Link to="/register" className="navbar-link">
                <FontAwesomeIcon icon={faUser} /> Register
              </Link>
            </>
          )}
          <span className="navbar-contact">+48 123 456 789</span>
        </div>

       {/* Rozwijane menu */}
<div className="navbar-menu">
  <button onClick={toggleMenu} className="menu-button" aria-label="Menu">
    <FontAwesomeIcon icon={faBars} />
  </button>
  <ul className={`dropdown-menu ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)}>
  <li><Link to="/complaint">Zgłoś Reklamację</Link></li>
  <li><Link to="/orders">Moje Zakupy</Link></li> {/* Ten link */}
  <li><Link to="/about">O Firmie</Link></li>
  <li><Link to="/contact">Kontakt</Link></li>
</ul>

</div>

      </div>
    </nav>
  );
};

export default Navbar;
