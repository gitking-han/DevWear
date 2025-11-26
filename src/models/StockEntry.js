import mongoose from "mongoose";

const StockEntrySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    costPrice: {
      type: Number,
    },
    note: {
      type: String,
    },
    sku:{
      type:String
    }
  },
  { timestamps: true }
);

export default mongoose.models.StockEntry ||
  mongoose.model("StockEntry", StockEntrySchema);
