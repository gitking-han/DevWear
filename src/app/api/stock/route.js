import StockEntry from "@/models/StockEntry";
import Product from "@/models/Product";
import connectToMongo from "@/lib/db";

function generateSKU(title) {

  const words = title.split(" ");
  let code = words.map(w => w.slice(0, 3).toUpperCase()).join("-");

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${code}-${randomNum}`;
}


export async function GET() {
  await connectToMongo();
  const stock = await StockEntry.find().populate("product");
  return Response.json(stock);
}




export async function POST(req) {
  await connectToMongo();
  const { productId, quantity, costPrice, note } = await req.json();

  if (!productId || !quantity)
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });


  const product = await Product.findById(productId);
  if (!product)
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });


  
  const autoSku = generateSKU(product.title);

  // Create stock entry
  const stock = await StockEntry.create({
    product: productId,
    quantity,
    costPrice,
    note,
    sku: autoSku,
  });

  // Update product stock
  await Product.findByIdAndUpdate(productId, {
    $inc: { availableQty: quantity }
  });
console.log("Created stock entry:", stock);
  return new Response(JSON.stringify({ success: true, stock, sku: autoSku }), { status: 200 });
}





