import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CategoryPage.css'; 

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryMap = {
          'agd-wolnostojace': 'AGD wolnostojące',
          'agd-do-zabudowy': 'AGD do zabudowy',
          'male-agd': 'Małe AGD',
          'rtv': 'RTV',
          'elektronika': 'Elektronika',
        };

        const backendCategoryName = categoryMap[categoryName.toLowerCase()] || categoryName;

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/products/category/${encodeURIComponent(backendCategoryName)}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Błąd podczas pobierania produktów:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    };

    const checkAdmin = () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        setIsAdmin(decodedToken.role === 'admin'); 
      }
    };

    fetchProducts();
    checkAdmin();
  }, [categoryName]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('Musisz być zalogowany, aby dodać produkt do koszyka.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ productId }), 
      });

      if (response.ok) {
        alert('Produkt dodany do koszyka!');
      } else {
        const errorData = await response.json();
        console.error('Błąd podczas dodawania do koszyka:', errorData.message);
        alert('Nie udało się dodać produktu do koszyka.');
      }
    } catch (error) {
      console.error('Błąd podczas dodawania do koszyka:', error);
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('Musisz być zalogowany jako administrator, aby usunąć produkt.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      if (response.ok) {
        alert('Produkt został usunięty!');
        setProducts(products.filter((product) => product._id !== productId)); 
      } else {
        console.error('Błąd podczas usuwania produktu:', response.statusText);
        alert('Nie udało się usunąć produktu.');
      }
    } catch (error) {
      console.error('Błąd podczas usuwania produktu:', error);
    }
  };

  return (
    <div className="category-page">
      <h1>Produkty z kategorii: {categoryName}</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={
                  product.image
                    ? `${process.env.REACT_APP_API_URL}/uploads/${product.image}`
                    : '/images/placeholder.png'
                }
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.price} PLN</p>
              <p>Marka: {product.brand}</p>
              <button className="add-to-cart" onClick={() => addToCart(product._id)}>
                Dodaj do koszyka
              </button>
              {isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  Usuń aukcję
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Brak produktów w tej kategorii</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
