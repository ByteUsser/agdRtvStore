import React, { useEffect, useState } from 'react';
import '../styles/CategoryPage.css'; 
import '../styles/Cart.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountInfo, setDiscountInfo] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        alert('Musisz być zalogowany, aby zobaczyć koszyk.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/cart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items || []); 
        } else {
          console.error('Błąd podczas pobierania koszyka:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania koszyka:', error);
      }
    };

    fetchCart();
  }, []);

  const updateCartQuantity = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5001/api/cart/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart.cart.items); 
      } else {
        console.error('Nie udało się zaktualizować koszyka.');
      }
    } catch (error) {
      console.error('Błąd podczas aktualizacji koszyka:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    try {
      const response = await fetch(`http://localhost:5001/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Usuń produkt z lokalnego stanu
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId && item.productId._id !== productId)
        );
      } else {
        console.error('Nie udało się usunąć produktu z koszyka.');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania z koszyka:', error);
    }
  };
  
  

  const applyDiscount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5001/api/cart/apply-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: discountCode }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscountInfo(data);
      } else {
        console.error('Kod rabatowy jest nieprawidłowy.');
      }
    } catch (error) {
      console.error('Błąd podczas stosowania kodu rabatowego:', error);
    }
  };

  const checkout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5001/api/cart/checkout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCartItems([]); 
      } else {
        console.error('Nie udało się złożyć zamówienia.');
      }
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
    }
  };

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
    if (discountInfo) {
      total -= discountInfo.discountAmount; 
    }
    return total.toFixed(2);
  };
  

  return (
    <div className="category-page">
      <h1>Twój koszyk</h1>
      <div className="products-grid">
      {cartItems.length > 0 ? (
  cartItems.map((item) => {
    if (!item.productId) {
      console.warn('Brak danych produktu:', item);
      return null; 
    }
    return (
      <div key={item.productId._id || Math.random()} className="product-card">
        <img
          src={
            item.productId.image
              ? `http://localhost:5001/uploads/${item.productId.image}`
              : '/images/placeholder.png'
          }
          alt={item.productId.name || 'Brak nazwy'}
          className="product-image"
        />
        <h3>{item.productId.name || 'Brak nazwy'}</h3>
        <p>Marka: {item.productId.brand || 'Nieznana marka'}</p>
        <p>Cena: {item.productId.price ? `${item.productId.price} PLN` : 'Brak ceny'}</p>
        <input
          type="number"
          min="1"
          value={item.quantity || 1}
          onChange={(e) =>
            updateCartQuantity(item.productId._id, parseInt(e.target.value, 10))
          }
        />
        <button onClick={() => removeFromCart(item.productId._id)}>Usuń z koszyka</button>
      </div>
    );
  })
) : (
  <p>Twój koszyk jest pusty</p>
)}

</div>

      <div className="discount-section">
        <input
          type="text"
          placeholder="Wpisz kod rabatowy"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button onClick={applyDiscount}>Zastosuj kod</button>
        {discountInfo && <p>Rabat: {discountInfo.discountAmount} PLN</p>}
      </div>
      <div className="cart-summary">
        <h3>Łączna wartość: {calculateTotal()} PLN</h3>
      </div>
      <button className="checkout-button" onClick={checkout}>
        Złóż zamówienie
      </button>
    </div>
  );
};

export default Cart;
