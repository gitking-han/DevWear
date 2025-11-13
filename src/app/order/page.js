"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Truck, HelpCircle } from "lucide-react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!isLoggedIn) {
          setLoading(false);
          return; 
        }

        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-pink-600 text-white py-20 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Your Orders</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Stay updated with your recent purchases and easily track your
            deliveries in one place.
          </p>
        </section>

        {/* Order List */}
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-6 py-20 mx-auto">
            {loading ? (
              <div className="text-center text-gray-500 text-lg">
                Loading your orders...
              </div>
            ) : !isLoggedIn ? (
              <div className="text-center text-gray-700 text-lg">
                You are not logged in.{" "}
                <Link
                  href="/login"
                  className="text-pink-600 font-semibold hover:underline"
                >
                  Login to view your orders
                </Link>
                .
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                You have no orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="lg:w-4/5 mx-auto flex flex-wrap bg-white rounded-2xl shadow-lg p-6 mb-10 hover:shadow-xl transition duration-300"
                >
                  {/* Order Info */}
                  <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm uppercase tracking-widest text-pink-600 font-semibold">
                        DevWear.com
                      </h2>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <CheckCircle size={16} />
                        {order.status
                          ? order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)
                          : "Pending"}
                      </span>
                    </div>

                    <h1 className="text-gray-900 text-3xl font-bold mb-3">
                      Order #{order._id.toString().slice(-5).toUpperCase()}
                    </h1>

                    <p className="text-gray-600 mb-6">
                      Your order was placed on{" "}
                      <span className="font-semibold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      .
                    </p>

                    {/* Table Header */}
                    <div className="grid grid-cols-3 border-t border-gray-200 py-3 font-semibold text-gray-800 text-center">
                      <span>Item</span>
                      <span>Subtotal</span>
                      <span>Qty</span>
                    </div>

                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100 mb-6 text-gray-700">
                      {order.products?.map((p, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-3 py-3 text-center"
                        >
                          <span>{p.name || p.productId}</span>
                          <span>Rs.{p.price || order.amount}</span>
                          <span>{p.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-lg font-semibold text-gray-900">
                        Grand Total:
                      </span>
                      <span className="text-2xl font-bold text-pink-600">
                        Rs.{order.amount}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mt-8">
                      <button className="flex items-center justify-center gap-2 text-white bg-pink-600 border-0 py-2 w-full focus:outline-none hover:bg-pink-700 rounded-lg transition duration-300">
                        <Truck size={18} /> Track Order
                      </button>
                    </div>
                  </div>

                  {/* Product Images */}
                  <div className="lg:w-1/2 w-full flex flex-wrap justify-center items-center gap-4 bg-gray-100 rounded-xl p-4">
                    {order.products?.map((p, i) => (
                      <img
                        key={i}
                        src={p.image}
                        alt={p.name}
                        className="w-48 h-48 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-gray-100 py-20 px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Need Help with Your Orders?
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-10">
            Whether you want to return a product, track your delivery, or ask a
            question about your recent purchase, our support team is ready to
            assist.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-md hover:bg-pink-700 transition">
              Return & Refund Policy
            </button>
            <button className="px-6 py-3 bg-white border border-gray-300 font-semibold rounded-full shadow-md hover:bg-gray-200 transition flex items-center gap-2">
              <HelpCircle size={18} /> Contact Support
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
