"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  // Get query params from URL on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const sId = urlParams.get("session_id");
      const oId = urlParams.get("order_id");

      if (!sId || !oId) {
        toast.error("Missing payment details.");
        setLoading(false);
      } else {
        setSessionId(sId);
        setOrderId(oId);
      }
    }
  }, []);

  // Fetch session info once we have the IDs
  useEffect(() => {
    if (!sessionId || !orderId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(
          `/api/verify-session?session_id=${sessionId}&order_id=${orderId}`
        );
        const data = await res.json();

        if (res.ok && data.success) {
          setOrder(data.order);
          toast.success("Payment verified successfully 🎉");
        } else {
          toast.error(data.message || "Failed to verify payment session.");
        }
      } catch (err) {
        console.error("❌ Error verifying session:", err);
        toast.error("Error verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Verifying your payment...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-bold text-green-600 mb-3">
        Payment Successful ✅
      </h1>
      <p className="text-gray-700 mb-2">
        Thank you for your purchase! Your order has been placed successfully.
      </p>

      {order && (
        <div className="mt-6 bg-gray-50 border rounded-lg p-6 w-full max-w-md text-left shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            🧾 Order Summary
          </h2>
          <p className="text-gray-600">
            <strong>Order ID:</strong> {order._id}
          </p>
          <p className="text-gray-600">
            <strong>Status:</strong>{" "}
            <span className="text-green-600 capitalize">{order.status}</span>
          </p>
          <p className="text-gray-600">
            <strong>Total Amount:</strong> Rs.{order.amount}
          </p>
          <p className="text-gray-600">
            <strong>Address:</strong> {order.address}
          </p>

          {order.products && order.products.length > 0 && (
            <div className="mt-4">
              <strong className="block mb-2 text-gray-800">Products:</strong>
              <ul className="space-y-1 text-gray-700 list-disc ml-5">
                {order.products.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.quantity} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <Link
        href="/"
        className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
