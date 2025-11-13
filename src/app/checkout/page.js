"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { toast } from "react-hot-toast";

export default function Checkout() {
    const { items, totalPrice } = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "credit-card",
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Fetch profile on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) {
                    setFormData((prev) => ({
                        ...prev,
                        fullName: data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        city: data.city || "",
                        postalCode: data.postalCode || "",
                    }));
                } else {
                    console.error(data.error || "Failed to fetch profile");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async () => {
        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.postalCode
        ) {
            toast.error("Please fill all required fields!");
            return;
        }

        const payload = {
            items: items.map((i) => ({
                id: i.id,
                name: i.title,
                price: i.price,
                quantity: i.quantity,
                image: i.image,
            })),
            customer: {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
            },
            currency: "usd",
        };

        if (formData.paymentMethod === "credit-card") {
            try {
                const res = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();
                if (res.ok && data.url) {
                    window.location.href = data.url;
                } else {
                    console.error("Stripe Error:", data);
                    toast.error("Failed to start Stripe payment session.");
                }
            } catch (err) {
                console.error("Stripe Checkout Error:", err);
                toast.error("Payment initiation failed. Please try again.");
            }
            return;
        }

        if (formData.paymentMethod === "cash-on-delivery") {
            toast.success("Order placed successfully (Cash on Delivery).");
            return;
        }

        toast.error("Invalid payment method selected.");
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* LEFT: Checkout Form */}
                    <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8 border">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

                        {/* Customer Info */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                {/* 📱 Phone Number Field */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="123 Main Street"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-1">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="10001"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Payment Method
                            </h3>
                            <div className="flex flex-col gap-3">
                                {["credit-card", "payoneer", "cash-on-delivery"].map((method) => (
                                    <label
                                        key={method}
                                        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-indigo-500 transition ${
                                            formData.paymentMethod === method
                                                ? "border-indigo-600 bg-indigo-50"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <span className="capitalize text-gray-700">
                                            {method.replace("-", " ")}
                                        </span>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method}
                                            checked={formData.paymentMethod === method}
                                            onChange={handleChange}
                                            className="form-radio text-indigo-500"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition cursor-pointer"
                        >
                            Place Order
                        </button>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="bg-white shadow-lg rounded-2xl p-8 border h-fit">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                        <div className="space-y-4">
                            {items.length === 0 ? (
                                <p className="text-gray-600 text-center">Your cart is empty.</p>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={`${item.id}-${item.size}-${item.color}`}
                                        className="flex items-center justify-between border-b pb-4 last:border-none"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={60}
                                                height={60}
                                                className="rounded-lg border"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.title}</p>
                                                <p className="text-gray-600 text-sm">
                                                    Qty: {item.quantity} (
                                                    {item.size} /{" "}
                                                    {item.color ? (
                                                        <button
                                                            className="ml-1 rounded-full w-3 h-3 hover:scale-110 transition-transform border-1"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                    ) : (
                                                        "N"
                                                    )}
                                                    )
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-semibold text-gray-900">
                                            Rs.{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Total */}
                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between text-lg font-semibold text-gray-900">
                                <span>Total</span>
                                <span>Rs.{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="mt-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">
                                Promo Code
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="Enter promo code"
                                />
                                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
