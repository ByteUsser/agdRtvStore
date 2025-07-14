import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct'; // Importuj stronę
import Navbar from './components/Navbar';
import './styles/App.css';
import CategoryPage from './pages/CategoryPage'; // Importuj CategoryPage
import Complaint from './pages/Complaint';
import Orders from './pages/Orders'; // Import strony Moje Zakupy
import About from './pages/About'; // Import strony O Firmie
import Contact from './pages/Contact'; // Import strony Kontakt



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Dodaj trasę */}
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
