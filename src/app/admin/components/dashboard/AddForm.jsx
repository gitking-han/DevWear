"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    img: "",
    category: "",
    size: [],
    color: [],
    price: "",
    availableQty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((v) => v.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <IoMdClose size={24} />
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Row 1: Title & Slug */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="Product Slug"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
              required
            />
          </div>
        </div>

        {/* Row 2: Category & Price */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
        </div>

        {/* Row 3: Available Qty & Image URL */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Available Quantity</label>
            <input
              name="availableQty"
              type="number"
              value={formData.availableQty}
              onChange={handleChange}
              placeholder="Available Quantity"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Image URL</label>
            <input
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
        </div>

        {/* Row 4: Sizes & Colors */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Sizes (comma separated)</label>
            <input
              name="size"
              value={formData.size.join(",")}
              onChange={handleArrayChange}
              placeholder="S,M,L"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Colors (comma separated)</label>
            <input
              name="color"
              value={formData.color.join(",")}
              onChange={handleArrayChange}
              placeholder="Red,Blue,Black"
              className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>
        </div>

        {/* Row 5: Description (full width) */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description..."
            rows={3}
            className="border px-3 py-2 rounded focus:ring-2 focus:ring-pink-300 outline-none resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
