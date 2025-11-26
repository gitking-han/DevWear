"use client";

import React, { useState, useEffect } from "react";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [stockEntries, setStockEntries] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [selectedEntry, setSelectedEntry] = useState(null);

  // Add Stock Modal Fields
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costPrice, setCostPrice] = useState("");

  // Update Stock Modal Fields
  const [editQuantity, setEditQuantity] = useState("");

  // Fetch products
  const loadProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      const data = await res.json();
      setTimeout(() => {
        setProducts(data);
        // setLoading(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    //   setLoading(false);
    }
  };

  // Fetch stock entries
  const loadStock = async () => {
    const res = await fetch("/api/stock");
    const data = await res.json();
    setStockEntries(data || []);
  };

  useEffect(() => {
    loadProducts();
    loadStock();
  }, []);

  // Add Stock Handler
  const handleAddStock = async () => {
    if (!selectedProduct || !quantity) return alert("Fill all fields!");

    const res = await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify({
        productId: selectedProduct,
        quantity: Number(quantity),
        costPrice: Number(costPrice),
      }),
    });

    if (res.ok) {
      setAddModal(false);
      setQuantity("");
      setCostPrice("");
      loadStock();
      loadProducts();
    }
  };

  // Delete Stock Entry
  const handleDeleteStock = async () => {
    await fetch(`/api/stock/${selectedEntry._id}`, { method: "DELETE" });
    setDeleteModal(false);
    setSelectedEntry(null);
    loadStock();
    loadProducts();
  };

  // Update Stock Entry
  const handleUpdateStock = async () => {
    await fetch(`/api/stock/${selectedEntry._id}`, {
      method: "PUT",
      body: JSON.stringify({
        quantity: Number(editQuantity),
        costPrice: selectedEntry.costPrice,
      }),
    });

    setUpdateModal(false);
    setSelectedEntry(null);
    loadStock();
    loadProducts();
  };

  const filteredStock = stockEntries.filter((entry) => {
    if (!searchValue) return true;
    const product = entry.product?.title?.toLowerCase();
    if (searchType === "name") return product.includes(searchValue.toLowerCase());
    if (searchType === "sku") return entry.sku?.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100 rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Stock</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
          onClick={() => setAddModal(true)}
        >
          Add Stock
        </button>
      </div>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-3xl">
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Filter by Name</option>
          <option value="sku">Filter by SKU</option>
        </select>

        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1"
          placeholder={searchType === "name" ? "Search by Name" : "Search by SKU"}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <div className="overflow-hidden rounded-xl shadow-lg">
          <table className="min-w-full bg-white border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left font-medium">#</th>
                <th className="py-3 px-6 text-left font-medium">Product</th>
                <th className="py-3 px-6 text-left font-medium">SKU</th>
                <th className="py-3 px-6 text-left font-medium">Quantity</th>
                <th className="py-3 px-6 text-left font-medium">Cost Price</th>
                <th className="py-3 px-6 text-left font-medium">Date</th>
                <th className="py-3 px-6 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredStock.length ? (
                filteredStock.map((entry, idx) => (
                  <tr key={entry._id}>
                    <td className="py-3 px-6">{idx + 1}</td>
                    <td className="py-3 px-6">{entry.product?.title}</td>
                    <td className="py-3 px-6">{entry.sku}</td>
                    <td className="py-3 px-6">{entry.quantity}</td>
                    <td className="py-3 px-6">Rs. {entry.costPrice || 0}</td>
                    <td className="py-3 px-6">{new Date(entry.createdAt).toLocaleDateString()}</td>

                    <td className="py-3 px-6">
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setEditQuantity(entry.quantity);
                            setUpdateModal(true);
                          }}
                        >
                          Update
                        </button>

                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-500">
                    No stock entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- ADD STOCK MODAL ----------------- */}
      {addModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Add Stock</h2>

            <select
              className="w-full border px-3 py-2 rounded mb-3"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option value={p._id} key={p._id}>
                  {p.title}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <input
              type="number"
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Cost Price (optional)"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                onClick={() => setAddModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer"
                onClick={handleAddStock}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- UPDATE STOCK MODAL ----------------- */}
      {updateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Update Stock</h2>

            <input
              type="number"
              className="w-full border px-3 py-2 rounded mb-3"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                onClick={() => setUpdateModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                onClick={handleUpdateStock}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DELETE MODAL ----------------- */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Delete Stock Entry</h2>

            <p className="mb-4">
              Are you sure you want to delete this stock entry for{" "}
              <strong>{selectedEntry?.product?.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                onClick={handleDeleteStock}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Stock;
