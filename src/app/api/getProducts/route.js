import Product from "@/models/Product";
import connectToMongo from "@/lib/db";

export async function GET(req) {
  try {
    await connectToMongo();
    const products = await Product.find();

    // Object to store grouped items by title (for all categories)
    let groupedProducts = {};

    for (let item of products) {
      // ✅ Normalize color → always an array
      let colorArray = [];
      if (Array.isArray(item.color)) {
        colorArray = item.color.map((c) => c.trim());
      } else if (typeof item.color === "string") {
        colorArray = item.color
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
      }

      // ✅ Normalize size → always an array
      let sizeArray = [];
      if (Array.isArray(item.size)) {
        sizeArray = item.size.map((s) => s.trim());
      } else if (typeof item.size === "string") {
        sizeArray = item.size
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }

      if (item.title in groupedProducts) {
        // ✅ Merge available sizes & colors if item is in stock
        if (item.availableQty > 0) {
          for (let color of colorArray) {
            if (!groupedProducts[item.title].color.includes(color)) {
              groupedProducts[item.title].color.push(color);
            }
          }

          for (let size of sizeArray) {
            if (!groupedProducts[item.title].size.includes(size)) {
              groupedProducts[item.title].size.push(size);
            }
          }
        }
      } else {
        // ✅ First time seeing this product title
        groupedProducts[item.title] = JSON.parse(JSON.stringify(item));

        // ✅ Assign arrays for color and size
        if (item.availableQty > 0) {
          groupedProducts[item.title].color = colorArray;
          groupedProducts[item.title].size = sizeArray;
        } else {
          groupedProducts[item.title].color = [];
          groupedProducts[item.title].size = [];
        }
      }
    }

    // ✅ Return all products (T-shirts, Hoodies, etc.)
    return Response.json(Object.values(groupedProducts));
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
