// /app/api/webhook/route.js
import Stripe from "stripe";
export const runtime = "nodejs"; // ensure node runtime for Buffer availability
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const sig = request.headers.get("stripe-signature");

  // IMPORTANT: get raw body as Buffer
  const buf = Buffer.from(await request.arrayBuffer());

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // Fulfill the purchase: mark order paid in DB, send receipt, reduce inventory
      // session.metadata or session.client_reference_id contains your order id
      console.log("Payment completed for session:", session.id, session);
      // TODO: call your order fulfillment function here
      break;
    case "payment_intent.succeeded":
      // optionally handle payment intent events
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
