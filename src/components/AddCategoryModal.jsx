import React, { useRef, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddCategoryModal = ({ onClose }) => {
  // const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    // Add category save logic
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Category Name is required'),
    }),
    onSubmit: (values) => {
      console.log('Form Data:', values);
      onClose();
    },
  });



  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 " >
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <label htmlFor="category-name">Category Name * </label>
          <input
            type="text"
            className="border p-2 w-full mb-4 outline-gray-400"
            id='category-name'
            placeholder="Category name"
            name='categoryName'
            // value={categoryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryName}
          // onChange={(e) => setCategoryName(e.target.value)}
          />
          {formik.touched.categoryName && formik.errors.categoryName ? (
            <p className="text-red-500">{formik.errors.categoryName}</p>
          ) : null}

          <div className="flex justify-end">
            <button onClick={onClose} className="bg-gray-200 text-[#1F8CD0] font-semibold px-4 py-2 rounded mr-2">Cancel</button>
            <button type='submit' className="bg-[#1F8CD0] text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
