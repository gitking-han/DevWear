import Stripe from "stripe";
import mongoose from "mongoose";
import connectToMongo from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    await connectToMongo();

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const orderId = searchParams.get("order_id");

    if (!sessionId || !orderId) {
      return Response.json(
        { success: false, message: "Missing session_id or order_id" },
        { status: 400 }
      );
    }

    // ✅ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return Response.json(
        { success: false, message: "Stripe session not found" },
        { status: 404 }
      );
    }

    // ✅ Retrieve order
    const order = await Order.findById(orderId);
    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ Prevent duplicate updates
    if (order.status === "paid") {
      return Response.json({
        success: true,
        message: "Order already marked as paid.",
        order,
      });
    }

    // ✅ Only proceed if Stripe marks payment as paid
    if (session.payment_status === "paid") {
      // Mark order as paid
      order.status = "paid";
      await order.save();

      // ✅ Update product quantities safely
    
      for (const item of order.products) {
        try {
          const product = await Product.findOne({ slug: item.productId }); // Find by slug
          if (!product) {
            console.warn(`⚠️ Product not found for slug: ${item.productId}`);
            continue;
          }

          const oldQty = product.availableQty;
          const newQty = Math.max(0, oldQty - (item.quantity || 0));

          product.availableQty = newQty;
          await product.save();

          console.log(
            `✅ Updated ${product.title}: ${oldQty} → ${newQty} (sold ${item.quantity})`
          );
        } catch (err) {
          console.error(`❌ Error updating product ${item.productId}:`, err.message);
        }
      }


      return Response.json({
        success: true,
        message: "Payment successful. Order marked as paid and stock updated.",
        order,
      });
    } else {
      return Response.json({
        success: false,
        message: "Payment not completed yet.",
      });
    }
  } catch (error) {
    console.error("❌ Verify session error:", error);
    return Response.json(
      { success: false, message: "Internal server error.", error: error.message },
      { status: 500 }
    );
  }
}
