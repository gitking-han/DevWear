import Product from "@/models/Product";
import connectToMongo from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "❌ Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "⚠️ Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, message: "❌ Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
