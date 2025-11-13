// /api/products/[slug]/route.js
import Product from "@/models/Product";
import connectToMongo from "@/lib/db";

export async function GET(req, { params }) {
  await connectToMongo();
  const product = await Product.findOne({ slug: params.slug });
  if (!product) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(JSON.stringify(product), { status: 200 });
}
