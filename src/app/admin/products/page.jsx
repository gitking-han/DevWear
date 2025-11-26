"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiEdit, FiTrash2 } from "react-icons/fi";
// import axios from "axios";
import EditForm from "@/app/admin/components/dashboard/EditForm";
import AddForm from "@/app/admin/components/dashboard/AddForm";

import { toast } from "react-hot-toast";

import ModalPortal from "../components/modalPortal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      const data = await res.json();
      setTimeout(() => {
        setProducts(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch("/api/deleteProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedProduct._id }),
      });
      setProducts(products.filter((p) => p._id !== selectedProduct._id));

      setDeleteModal(false);
      setSelectedProduct(null);
      toast.success("Product Deleted Successfully");
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();

      if (data.success) {
        setProducts([...products, ...data.data]); // append new product(s)
        setAddModal(false);
        toast.success("Product Added Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModal(true);
  };

  const saveEditProduct = async (updatedData) => {
    if (!selectedProduct?._id) return alert("Product ID missing!");

    // Ensure the id is included
    const payload = {
      id: selectedProduct._id,
      ...updatedData, // title, slug, img, category, size, color, price, availableQty
    };

    try {
      const res = await fetch("/api/updateProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        // update local products list
        setProducts(products.map(p => p._id === data.product._id ? data.product : p));
        setEditModal(false);
        setSelectedProduct(null);
        toast.success("Product Updated Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  // Filtered products based on search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container px-18 py-8 mx-auto bg-gray-100 rounded-2xl relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition cursor-pointer"
          onClick={() => setAddModal(true)}
        >
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-4xl">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Filter by Name</option>
          <option value="date">Filter by Date</option>
          <option value="price">Filter by Price</option>
        </select>

        <input
          type={searchType === "date" ? "date" : searchType === "price" ? "number" : "text"}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
          placeholder={
            searchType === "name"
              ? "Search by Name"
              : searchType === "price"
                ? "Search by Price"
                : ""
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap -m-4 mt-4">
        {filteredProducts.map((item) => {
          const colors = Array.isArray(item.color)
            ? item.color.map((c) => c.trim().toLowerCase())
            : [];

          return (
            <div key={item._id} className="lg:w-1/3 md:w-1/2 p-4 w-full">
              <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full relative">
                {/* Edit/Delete Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition  cursor-pointer"
                    onClick={() => handleEditProduct(item)}
                  >
                    <FiEdit className="text-pink-500 w-5 h-5" />
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition cursor-pointer"
                    onClick={() => handleDeleteProduct(item)}
                  >
                    <FiTrash2 className="text-red-500 w-5 h-5" />
                  </button>
                </div>

                {/* Product Image */}
                <div className="relative h-60 w-full">
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    {item.availableQty < 1 ? "Out of Stock" : item.category}
                  </span>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
                    <div className="flex gap-2">
                      <p className="text-gray-500 text-sm mb-1">
                        Sizes: {Array.isArray(item.size) ? item.size.join(", ") : item.size}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">Qty: {item.availableQty}</p>
                    </div>
                  </div>

                  {/* Color Buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        title={color}
                        className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                        style={{
                          backgroundColor:
                            color === "white" ? "#fff" : color === "black" ? "#000" : color,
                        }}
                      ></button>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-semibold text-pink-600">Rs {item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete <strong>{selectedProduct?.title}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {addModal && (
        <ModalPortal>
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 pointer-events-auto">
            <AddForm onSave={addProduct} onClose={() => setAddModal(false)} />
          </div>
        </ModalPortal>
      )}

      {/* Edit Modal */}
      {editModal && (
        <ModalPortal>
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 pointer-events-auto">
            <EditForm product={selectedProduct}
              onSave={saveEditProduct}
              onClose={() => setEditModal(false)} />
          </div>
        </ModalPortal>
      )}


      


    </div>
  );
};

export default Products;
