import Product from "@/models/Product";
import connectToMongo from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    await connectToMongo();


    const body = await req.json();


    if (!body || (Array.isArray(body) && body.length === 0)) {
      return NextResponse.json(
        { success: false, message: "No product data provided." },
        { status: 400 }
      );
    }


    const products = Array.isArray(body) ? body : [body];


    const result = await Product.insertMany(products);


    return NextResponse.json({
      success: true,
      message: `${result.length} product(s) added successfully.`,
      data: result,
    });
  } catch (error) {
    console.error("❌ Error inserting products:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
