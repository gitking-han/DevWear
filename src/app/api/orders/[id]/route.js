import connectToMongo from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToMongo();
    const { id } = params;

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to delete order" }, { status: 500 });
  }
}
