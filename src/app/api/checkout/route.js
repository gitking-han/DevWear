import Stripe from "stripe";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/models/Order";
import connectToMongo from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectToMongo();

    const body = await req.json();
    const {
      items = [],
      customer = {},
      successPath = "/success",
      cancelPath = "/cancel",
      userId,
    } = body;

    // 🧩 Basic validation
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided for checkout." },
        { status: 400 }
      );
    }

    // 💱 Convert PKR → USD (You can make this dynamic later)
    const pkrToUsdRate = 0.0036; // 1 PKR ≈ $0.0036 (≈ 278 PKR = 1 USD)

    // 💳 Stripe line items — convert PKR → USD cents
    const line_items = items.map((item) => {
      const priceInUsd = item.price * pkrToUsdRate; // PKR to USD
      return {
        price_data: {
          currency: "usd", // Stripe supports this
          product_data: {
            name: item.name || item.title,
            metadata: { productId: item.id },
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(priceInUsd * 100), // convert USD → cents
        },
        quantity: item.quantity,
      };
    });

    // 🧾 Calculate total (in PKR for record)
    const totalAmountPkr = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ✅ Create order in MongoDB (store PKR value)
    const newOrder = await Order.create({
      userId: userId || "guest",
      products: items.map((i) => ({
        productId: i.id,
        name: i.name || i.title,
        image: i.image,
        price: i.price, // keep original PKR price
        quantity: i.quantity,
      })),
      address: customer.address || "Not provided",
      amount: totalAmountPkr, // PKR
      status: "pending",
    });

    // 💰 Create Stripe Checkout Session (in USD)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.YOUR_DOMAIN}${successPath}?session_id={CHECKOUT_SESSION_ID}&order_id=${newOrder._id}`,
      cancel_url: `${process.env.YOUR_DOMAIN}${cancelPath}?order_id=${newOrder._id}`,
      customer_email: customer.email,
      metadata: {
        orderId: newOrder._id.toString(),
        currency: "PKR",
        convertedToUSD: "true",
        pkrToUsdRate,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
