"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  const handleOpenDeleteModal = (order) => {
    setSelectedOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = async () => {
  if (!selectedOrder) return;

  try {
    const res = await fetch(`/api/orders/${selectedOrder._id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to delete order");

    // Remove from frontend state
    setOrders((prev) => prev.filter((o) => o._id !== selectedOrder._id));
    setSelectedOrder(null);
    setDeleteModal(false);

    toast.success("Order deleted successfully!");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Failed to delete order");
  }
};

  // FIXED FILTER LOGIC
  const filteredOrders = orders.filter((order) => {
    if (!searchValue.trim()) return true;

    if (searchType === "name") {
      return order.userId?.toLowerCase().includes(searchValue.toLowerCase());
    }

    if (searchType === "date") {
      return order.createdAt?.slice(0, 10) === searchValue;
    }

    if (searchType === "price") {
      return order.amount?.toString().includes(searchValue);
    }

    return true;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">Orders Summary</h1>

      {/* Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-3xl">
        <select
          className="border rounded-lg px-4 py-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Filter by Name</option>
          <option value="date">Filter by Date</option>
          <option value="price">Filter by Price</option>
        </select>

        <input
          type={
            searchType === "date"
              ? "date"
              : searchType === "price"
              ? "number"
              : "text"
          }
          className="border rounded-lg px-4 py-2 flex-1"
          placeholder={
            searchType === "name"
              ? "Search by User ID"
              : searchType === "price"
              ? "Search by Total Price"
              : ""
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-3 px-6">{idx + 1}</td>

                  <td className="py-3 px-6">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="py-3 px-6">
                    {order.products?.map((p, i) => (
                      <div key={i}>
                        {p.name} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="py-3 px-6">{order.userId}</td>

                  <td className="py-3 px-6">Rs. {order.amount.toFixed(2)}</td>

                  <td className="py-3 px-6">{order.status}</td>

                  <td className="py-3 px-6">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer"
                      onClick={() => handleOpenDeleteModal(order)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow">
            <h2 className="text-xl font-semibold mb-4">Delete Order?</h2>

            <p className="mb-6">
              Are you sure you want to delete this order?
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
                onClick={handleDeleteOrder}
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

export default Orders;
