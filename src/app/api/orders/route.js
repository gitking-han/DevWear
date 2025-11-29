import Order from "@/models/Order";
import connectToMongo from "@/lib/db";

export async function GET() {
  await connectToMongo();

  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  // If no orders, return empty array instead of 404
  if (!orders || orders.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  return new Response(JSON.stringify(orders), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
