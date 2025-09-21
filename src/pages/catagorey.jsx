import React, { useState } from 'react';
import Motors from '../assets/images/6 Brushless Motor 9v-12v - 320tk.png';
import Type_C_Port  from '../assets/images/Type C Port -25tk.png';
import Accessories from '../assets/images/accessories.png';
import PowerBank from '../assets/images/20000mah PowerBank Cas ... out Battery-650tk .png';
import Head_Mist_Meker  from '../assets/images/4 Head Mist Meker -350tk .png';
import '../assets/css/category.css';

const categories = [
  { name: 'All products', image: '', id: 'all' },
  { name: 'Motors', image: Motors, id: 'motors' },
  { name: 'Type C Port', image: Type_C_Port, id: 'type_c_port' },
  { name: 'Accessories', image: Accessories, id: 'accessories' },
  { name: 'Power Banks', image: PowerBank, id: 'power_banks' },
  { name: 'Head Mist Makers', image: Head_Mist_Meker, id: 'head_mist_makers' },
];

const Category = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="category-container">
      <div className="category-list-wrapper">
        <div className="category-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-content">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                )}
                <span className="category-name">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;