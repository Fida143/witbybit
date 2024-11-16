import React from 'react';
import ProductCard from './ProductCard';


const ProductsList = () => {
  const categories = [
    {
      name: 'Shoes', products: [
        { id: 1, name: 'Nike Air Jordan', price: '₹12,000', brand: 'Nike', image: 'src/assets/images/nikeShoe.jpg' },
        { id: 2, name: 'Nike Dunk Low', price: '₹8,000', brand: 'Nike', image: 'src/assets/images/nikeShoe.jpg' },
      ]
    },
    { name: 'T-shirt', products: [] }
  ];

  return (
    <div className="flex mt-6">
      {categories.map((category, index) => (
        <div key={index} className="w-1/4 h-[80vh] p-4 bg-gray-100 m-2 rounded overflow-auto">
          <h2 className="font-bold mb-4">{category.name}</h2>
          {category.products.length > 0 ? (
            category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
