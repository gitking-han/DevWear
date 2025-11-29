import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToMongo from "@/lib/db";
// import User from "@/models/User";

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

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided for checkout." },
        { status: 400 }
      );
    }

    const pkrToUsdRate = 0.0036;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name || item.title,
          metadata: { productId: item.id },
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * pkrToUsdRate * 100),
      },
      quantity: item.quantity,
    }));

    const totalAmountPkr = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // let userName = "guest";
    // if (userId) {
    //   const user = await User.findById(userId).lean();
    //   if (user) userName = user.name;
    // }

    const newOrder = await Order.create({
      userId: userId || "guest", // or store both userId + customerName
      products: items.map((i) => ({
        productId: i.id,
        name: i.name || i.title,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
      address: customer.address || "Not provided",
      amount: totalAmountPkr,
      status: "pending",
    });

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
