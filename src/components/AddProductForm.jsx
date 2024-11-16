import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"; // Import Swiper components
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import "../assets/css/addProductForm.css"
// import { Pagination } from 'swiper'; // Import Pagination module

const AddProductForm = ({ onClose }) => {
  let initialState = {
    name: "",
    category: "",
    brand: "",
    image: "",
    variants: [
      {
        name: "Size",
        values: ['M', 'L']
      },
      {
        name: "Color",
        values: ['Black', 'Red']
      }
    ],
    combinations: {
      "a": {
        name: "M/Black",
        sku: "ABC12",
        quantity: 4,
        inStock: false
      },
      "b": {
        name: "L/Red",
        sku: "ABC12",
        quantity: null, inStock: true
      },
    },
    priceInr: 500,
    discount: {
      method: "pct", // pct flat
      value: 12
    }
  };

  const [newProduct, setNewProduct] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  const swiper = useSwiper();

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = (index) => {
    // Add product save logic
    if (index < 3) {
      handleBulletClick(index + 1);
    }
    console.log(newProduct)
    swiper.slideNext()
    // onClose();
  };
  const handlePrev = (index) => {
    // Add product save logic
    if (index > 0) {
      handleBulletClick(index - 1);
    } else {
      onClose();
    }
    console.log(newProduct)
    swiper.slidePrev();
    // onClose();
  };
  const handleNewProduct = (e) => {
    e.stopPropagation();
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setFilePreview(reader.result);
      };

      reader.readAsDataURL(file); // This will convert the file to a base64 string for preview
    }
    // handleNewProduct(event);
  };

  const handleBulletClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index); // Navigate to the clicked slide
    }
    setActiveIndex(index); // Update active index to the clicked bullet
  };

  const [options, setOptions] = useState([
    { name: "Size", values: ["M", "L"] },
    { name: "Color", values: ["Black", "Red"] },
  ]);

  const addOption = () => {
    setOptions([...options, { name: "", values: [] }]);
  };

  const handleOptionChange = (index, newName) => {
    const newOptions = [...options];
    newOptions[index].name = newName;
    setOptions(newOptions);
  };

  const handleValueChange = (optionIndex, valueIndex, newValue) => {
    const newOptions = [...options];
    newOptions[optionIndex].values[valueIndex] = newValue;
    setOptions(newOptions);
  };

  const addValue = (index) => {
    const newOptions = [...options];
    newOptions[index].values.push("");
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const removeValue = (optionIndex, valueIndex) => {
    const newOptions = [...options];
    newOptions[optionIndex].values = newOptions[optionIndex].values.filter(
      (_, i) => i !== valueIndex
    );
    setOptions(newOptions);
  };


  // combinations


  const [combinations, setCombinations] = useState([
    { combination: "M/Black", sku: "ABC12", inStock: false, quantity: "" },
    { combination: "M/Red", sku: "SDF3", inStock: true, quantity: 5 },
    { combination: "L/Black", sku: "HWE2", inStock: false, quantity: "" },
    { combination: "L/Red", sku: "ABC12", inStock: true, quantity: 9 },
  ]);

  const handleSKUChange = (index, value) => {
    const updatedCombinations = [...combinations];
    updatedCombinations[index].sku = value;
    setCombinations(updatedCombinations);
  };

  const handleStockToggle = (index) => {
    const updatedCombinations = [...combinations];
    updatedCombinations[index].inStock = !updatedCombinations[index].inStock;
    setCombinations(updatedCombinations);
  };

  const handleQuantityChange = (index, value) => {
    const updatedCombinations = [...combinations];
    updatedCombinations[index].quantity = value;
    setCombinations(updatedCombinations);
  };

  const isDuplicateSKU = (index, sku) => {
    return combinations.filter((item, i) => i !== index && item.sku === sku).length > 0;
  };

  const newProductParts = [
    (
      <>
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <div className="mb-4">
          <label className="block mb-2">Product name *</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={newProduct.name}
            onChange={(e) => handleNewProduct(e)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category *</label>
          <select
            className="border p-2 w-full"
            name="category"
            value={newProduct.category}
            onChange={(e) => handleNewProduct(e)}
          >
            <option>Shoes</option>
            <option>T-shirt</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Brand *</label>
          <input
            type="text"
            className="border p-2 w-full"
            name="brand"
            value={newProduct.brand}
            onChange={(e) => handleNewProduct(e)}
          />
        </div>
        <div className="flex items-center">
          {filePreview && (
            <div className="preview">
              <img src={filePreview} alt="Preview" style={{ width: '200px', height: 'auto' }} />
            </div>
          )}
          <label htmlFor="file-upload" className="cursor-pointer flex items-center px-6 py-2 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Upload Image</span>
          </label>
          <input id="file-upload" type="file" className="hidden" name="image" accept="image/*" onChange={handleFileChange} />

        </div>

      </>
    ),

    (
      <>
        <h2 className="text-xl font-bold mb-4">Variants</h2>
        {options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-start space-x-4">
            <input
              className="border p-2 w-1/4"
              placeholder="Option"
              value={option.name}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
            />
            <div className="flex flex-wrap space-x-2">
              {option.values.map((value, valueIndex) => (
                <div key={valueIndex} className="flex items-center space-x-2">
                  <input
                    className="border p-2"
                    placeholder="Value"
                    value={value}
                    onChange={(e) =>
                      handleValueChange(optionIndex, valueIndex, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeValue(optionIndex, valueIndex)}
                    className="text-red-500"
                  >
                    ✖️
                  </button>
                </div>
              ))}
              <button
                onClick={() => addValue(optionIndex)}
                className="border p-2 text-blue-500"
              >
                + Add Value
              </button>
            </div>
            <button
              onClick={() => removeOption(optionIndex)}
              className="text-red-500"
            >
              🗑️
            </button>
          </div>
        ))}
        <button
          onClick={addOption}
          className="border p-2 bg-blue-500 text-white"
        >
          + Add Option
        </button>
      </>
    ),

    (
      <>
        <h2 className="text-xl font-bold mb-4">Combinations</h2>
        {combinations.map((comb, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-1/3">{comb.combination}</div>
            <div className="flex-1">
              <input
                type="text"
                className={`border p-2 w-full ${isDuplicateSKU(index, comb.sku) ? 'border-red-500' : 'border-gray-300'}`}
                value={comb.sku}
                onChange={(e) => handleSKUChange(index, e.target.value)}
                placeholder="SKU"
              />
              {isDuplicateSKU(index, comb.sku) && (
                <span className="text-xs text-red-500">Duplicate SKU</span>
              )}
            </div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={comb.inStock}
                  onChange={() => handleStockToggle(index)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div>
              <input
                type="number"
                className="border p-2 w-16"
                value={comb.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>
        ))}

      </>
    ),

    (
      <>
        <h2 className="text-xl font-bold mb-4">Price Info</h2>
        <div className="mb-4">
          <label className="block mb-2">Price *</label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={newProduct.name}
            onChange={(e) => handleNewProduct(e)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Discount </label>
          <input
            type="text"
            name="name"
            className="border p-2 w-full"
            value={newProduct.name}
            onChange={(e) => handleNewProduct(e)}
          />
        </div>


      </>
    ),

  ];



  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-1 flex items-center justify-center">
      <div className="absolute top-5  flex flex-col w-screen">
        <h1 className="text-xl font-bold mb-2 ml-8">Add Product</h1>
        <div className="flex items-center space-x-2 mx-auto w-1/3 ">
          {["Description", "Variants", "Combinations", "Price info"].map((item, index) => (
            <React.Fragment key={item}>
              <span
                className={`px-2 py-1 text-sm cursor-pointer rounded ${index <= activeIndex ? 'text-[#1F8CD0] bg-blue-100' : 'text-gray-500'
                  }`}
                onClick={() => handleBulletClick(index)} // Handle bullet click
              >
                {item}
              </span>
              {/* Add ">" separator except for the last item */}
              {index < 3 && <span className="text-gray-400">{">"}</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Swiper Component */}
        <div className='mt-4'>


          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            ref={swiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
          >

            {newProductParts.map((item, index) => (
              <SwiperSlide className='flex justify-center ' key={item}>
                <div className="bg-white p-6 rounded shadow-lg w-1/3">
                  {item}

                  <div className="flex justify-end">
                    <button onClick={() => { handlePrev(index); }} className="bg-gray-200 px-4 text-blue-500 py-2 rounded mr-2 font-semibold">{index == 0 ? "Cancel" : "Back"}</button>
                    <button onClick={() => { handleNext(index); }} className="bg-blue-500 text-white px-4 py-2 rounded font-semibold">{index == 3 ? "Save" : "Next"}</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}




          </Swiper>

        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
