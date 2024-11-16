import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex bg-white p-4 shadow rounded mb-4">
      <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
      <div>
        <h3 className="font-bold">{product.name}</h3>
        <p>{product.price}</p>
        <span className="text-blue-600 text-sm bg-blue-100 px-2 py-1 rounded font-semibold">{product.brand}</span>
      </div>
    </div>
  );
};

export default ProductCard;
