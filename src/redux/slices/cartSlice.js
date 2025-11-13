import { createSlice } from "@reduxjs/toolkit";

// 🧠 Helper function to calculate totals
const calculateTotals = (items) => ({
  totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

// 🛒 Load saved cart from localStorage (if available)
const loadCartFromStorage = () => {
  if (typeof window === "undefined")
    return { items: [], totalQuantity: 0, totalPrice: 0 };

  try {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return {
      items: savedItems,
      ...calculateTotals(savedItems),
    };
  } catch {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; 
      // item includes { id, title, price, quantity, image, size, color }

      // 🧩 Match items not only by ID, but also by size & color
      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.color === item.color
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size || "N/A",
          color: item.color || "N/A",
        });
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      // 💾 Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (i) => !(i.id === id && i.size === size && i.color === color)
      );

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.size === size && i.color === color
      );

      if (item) item.quantity = quantity;

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
