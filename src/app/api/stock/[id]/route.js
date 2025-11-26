import StockEntry from "@/models/StockEntry";
import Product from "@/models/Product";
import connectToMongo from "@/lib/db";

export async function PUT(req, { params }) {
  await connectToMongo();
  const id = params.id;
  const { quantity, costPrice, note } = await req.json();

  const old = await StockEntry.findById(id);
  if (!old) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

  const quantityDiff = quantity - old.quantity;

  const updated = await StockEntry.findByIdAndUpdate(
    id,
    { quantity, costPrice, note },
    { new: true }
  );

  await Product.findByIdAndUpdate(old.product, { $inc: { availableQty: quantityDiff } });

  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectToMongo();
  const id = params.id;

  const entry = await StockEntry.findById(id);
  if (!entry) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });

  await Product.findByIdAndUpdate(entry.product, { $inc: { availableQty: -entry.quantity } });
  await entry.deleteOne();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
