import React, { useState } from 'react';
import ProductsList from './components/ProductsList';
import AddCategoryModal from './components/AddCategoryModal';
import AddProductForm from './components/AddProductForm';

const App = () => {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <div>
          <button 
            onClick={() => setCategoryModalOpen(true)} 
            className="bg-gray-200 text-blue-500 font-semibold px-4 py-2 mr-2 rounded">
            Add Category
          </button>
          <button 
            onClick={() => setProductModalOpen(true)} 
            className="bg-blue-500 text-white px-4 py-2 font-semibold rounded">
            Add Product
          </button>
        </div>
      </header>

      <ProductsList />

      {/* Modals */}
      {isCategoryModalOpen && (
        <AddCategoryModal onClose={() => setCategoryModalOpen(false)} />
      )}
      {isProductModalOpen && (
        <AddProductForm onClose={() => setProductModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
