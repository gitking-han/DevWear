"use client";

import React, { useState, useEffect } from "react";

const dummySales = [
    {
        _id: "1",
        date: new Date(),
        customerName: "John Doe",
        grandTotal: 1200,
        items: [
            { medicine: { brandName: "tshirt" }, quantity: 2 },
            { medicine: { brandName: "tshirt" }, quantity: 1 },
        ],
    },
    {
        _id: "2",
        date: new Date(),
        customerName: "Jane Smith",
        grandTotal: 750,
        items: [{ medicine: { brandName: "tshirt" }, quantity: 3 }],
    },
];

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [searchType, setSearchType] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    useEffect(() => {
        setSales(dummySales);
    }, []);

    const handleOpenDeleteModal = (sale) => {
        setSelectedSale(sale);
        setDeleteModal(true);
    };

    const handleDeleteSale = () => {
        setSales(sales.filter((s) => s._id !== selectedSale._id));
        setDeleteModal(false);
        setSelectedSale(null);
    };

    const filteredSales = sales.filter((sale) => {
        if (!searchValue.trim()) return true;
        if (searchType === "name") return sale.customerName?.toLowerCase().includes(searchValue.toLowerCase());
        if (searchType === "date") return new Date(sale.date).toISOString().slice(0, 10) === searchValue;
        if (searchType === "price") return sale.grandTotal.toString().includes(searchValue);
        return true;
    });

    return (
        <div className="p-6 min-h-screen bg-gray-100 rounded-2xl">
            <h1 className="text-3xl font-bold mb-6">Previous Sales</h1>

            {/* Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-3xl">
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

            <div className="overflow-x-auto">
                <div className="overflow-hidden rounded-xl shadow-lg">
                    <table className="min-w-full bg-white border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="py-3 px-6 text-left font-medium">#</th>
                                <th className="py-3 px-6 text-left font-medium">Date</th>
                                <th className="py-3 px-6 text-left font-medium">Items</th>
                                <th className="py-3 px-6 text-left font-medium">Customer</th>
                                <th className="py-3 px-6 text-left font-medium">Grand Total</th>
                                <th className="py-3 px-6 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale, idx) => (
                                    <tr key={sale._id}>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 hover:bg-gray-50 transition">
                                                {idx + 1}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 hover:bg-gray-50 transition">
                                                {new Date(sale.date).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 hover:bg-gray-50 transition">
                                                {sale.items.map((item, i) => (
                                                    <div key={i}>
                                                        {item.medicine.brandName} x {item.quantity}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 hover:bg-gray-50 transition">
                                                {sale.customerName || "-"}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 hover:bg-gray-50 transition">
                                                Rs. {sale.grandTotal.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <div className="rounded-lg p-2 flex gap-2">
                                                <button
                                                    className="px-3 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                                                    onClick={() => handleOpenDeleteModal(sale)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-4 text-center text-gray-500">
                                        No sales found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-96 p-6">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">
                            Are you sure you want to delete sale for{" "}
                            <strong>{selectedSale?.customerName}</strong>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                onClick={() => setDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={handleDeleteSale}
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

export default Sales;
