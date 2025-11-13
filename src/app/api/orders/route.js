import Order from "@/models/Order";
import connectToMongo from "@/lib/db";

export async function GET(req, { params }) {
  await connectToMongo();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  if (!orders || orders.lenght === 0) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(orders), { status: 200 });
}