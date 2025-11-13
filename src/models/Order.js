import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, default:"guest" },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        image: { type: String, required: true },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "pending", required: true },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError in Next.js
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
