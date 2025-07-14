import React from 'react';
import Categories from '../components/Categories';
import '../styles/Home.css';
import { categoryData } from '../constants/categories'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Witamy w sklepie!</h1>
      <div className="category-tiles">
        {categoryData.map((category) => (
          <Categories 
            key={category.category}
            category={category.category}
            image={category.image} 
            path={category.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
