"use client";
import React, { useCallback } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  // console.log("🧾 Received Items:", items);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleIncrease = (id, size, color, currentQty) => {
    dispatch(updateQuantity({ id, size, color, quantity: currentQty + 1 }));
    

  };

  const handleDecrease = (id, size, color, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, size, color, quantity: currentQty - 1 }));
    

    } else {


      dispatch(removeFromCart({ id, size, color }));
      toast.error("Removed from cart")
     



    }
  };


  const handleCheckout = () => {
    onClose(); // Close sidebar before redirect
    router.push("/checkout"); // Navigate to checkout page
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex items-center space-x-4 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.title} ( {item.size}/{item.color ?
                    <button
                      className="ml-1 rounded-full w-3 h-3 hover:scale-110 transition-transform border-1"
                      style={{ backgroundColor: item.color }}>
                    </button> : "N"} )
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Rs.{Number(item.price).toFixed(2)}
                  </p>


                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleDecrease(item.id, item.size, item.color, item.quantity)}
                      className="cursor-pointer p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-2 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id, item.size, item.color, item.quantity)}
                      className="cursor-pointer p-1 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col items-end">
                  <p className="font-semibold">
                    Rs.{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }), toast.error("Removed from cart"))
                    }
                    className="cursor-pointer text-red-500 hover:text-red-700 mt-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between font-medium mb-3">
              <span>Subtotal</span>
              <span>Rs.{totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="cursor-pointer w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart(),
                toast.success("Cart has been cleared")
              )}
              className="cursor-pointer w-full mt-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
