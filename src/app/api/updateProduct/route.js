import Product from "@/models/Product";
import connectToMongo from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const body = await req.json();
    const { id, title, slug, description, img, category, size, color, price, availableQty } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "❌ Product ID is required" },
        { status: 400 }
      );
    }

    // Perform update
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        img,
        category,
        size,
        color,
        price,
        availableQty,
      },
      { new: true } // returns the updated document
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "⚠️ Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "✅ Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "❌ Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
