import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const Categories = ({ category, image, path }) => {
  const navigate = useNavigate();

  return (
    <div className="category-tile" onClick={() => navigate(path)}>
      <div className="category-container">
        <img src={image} alt={`${category} icon`} className="category-image" />
        <h3 className="category-title">{category}</h3>
      </div>
    </div>
  );
};

export default Categories;
