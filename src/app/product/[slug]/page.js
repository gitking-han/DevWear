"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { addToCart, removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import CartSidebar from "@/app/cartSidebar/page";


export default function ProductDetailPage() {

  const { slug } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("/placeholder.png");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


 
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("/api/getProducts");
        const data = await res.json();

        // Handle both array or object formats
        const productsArray = Array.isArray(data) ? data : data.products || [];

        // Match by slug
        const found = productsArray.find((p) => p.slug === slug);

        if (found) {
          setProduct(found);
          setSelectedImage(found.img || "/placeholder.png");
          setSelectedSize(
            Array.isArray(found.size) && found.size.length > 0 ? found.size[0] : "L"
          );
          setSelectedColor(
            Array.isArray(found.color) && found.color.length > 0 ? found.color[0] : null
          );
        }
        else {
          console.warn("Product not found for slug:", slug);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);


  const isAdded = product && cartItems.some(
    (item) =>
      item.id === product.slug &&
      item.size === selectedSize &&
      item.color === selectedColor
  );



  const handleAdd = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to your cart");
      return;
    }

    if (!product) return;


    if (product.availableQty < 1) {
      toast.error("Sorry, this item is sold out");
      return;
    }

    if (isAdded) {
      dispatch(removeFromCart(product.slug));
      toast.error("Removed from cart");


    } else {
      dispatch(
        addToCart({
          id: product.slug,
          title: product.title || product.title,
          price: parseFloat(product.price),
          image: selectedImage,
          quantity: 1,
          size: selectedSize,
          color: selectedColor
        })
      );
      toast.success("Added to cart");
      setIsSidebarOpen(true);



    }
  };
  const shopNow = () => {
    if (!isLoggedIn) {
      toast.error("Please login to add items to your cart");
      return;
    }

    dispatch(clearCart());

    dispatch(addToCart({
      id: product.slug,
      title: product.title || product.title,
      price: parseFloat(product.price),
      image: selectedImage,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    }))
    router.push('/checkout');
    toast.success("Ready for shop")


  }
  // if(clearCart){
  //   toast.success("Item has been removed")
  // }

  useEffect(() => {
    if (items.length > 0) {
      setIsSidebarOpen(true);
    }
  }, [items]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
      <Navbar/>
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="text-gray-600 mt-2">
          The product you are looking for does not exist.
        </p>
      </div>
      <div className="mt-6.5">

      <Footer/>
      </div>
      
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Main Container */}
      <div className="flex justify-center bg-gray-50 py-16 px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl w-full rounded-2xl p-10">

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Images */}
            <div>
              <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={selectedImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onError={(e) => (e.target.src = "/placeholder.png")}
                />
              </div>

              {/* <div className="flex gap-4 mt-8 justify-center">
                {product.images?.map((img, index) => (
                  <div
                    key={index}
                    className={`relative w-28 sm:h-28 rounded-lg overflow-hidden border-2 cursor-pointer transition ${selectedImage === img
                      ? "border-indigo-600 scale-105"
                      : "border-gray-200 hover:border-indigo-400"
                      }`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt="Product thumbnail"
                      fill
                      className="object-cover"
                      onError={(e) => (e.target.src = "/placeholder.png")}
                    />
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:pl-10 lg:py-6 sm:mt-6">
              <h2 className="text-sm text-gray-500 tracking-widest uppercase">
                CodesWear
              </h2>
              <h1 className="text-gray-900 text-3xl font-semibold mb-4">
                {product.title}
              </h1>

              {/* // ratings */}
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description ||
                  "No description available for this product at the moment."}
              </p>

              {/* Color & Size */}
              <div className="flex flex-wrap items-center gap-6 mb-5 pb-5 border-b-2 border-gray-100">
                {/* Colors */}
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700 font-medium">Color:</span>
                  {Array.isArray(product.color) && product.color.length > 0 ? (
                    product.color.map((clr, index) => (
                      <button
                        key={index}
                        title={clr}
                        onClick={() => setSelectedColor(clr)}
                        className={`ml-1 rounded-full w-7 h-7 transition-transform border-2 ${selectedColor === clr
                          ? "border-black scale-110"
                          : "border-gray-300 hover:scale-110"
                          }`}

                        style={{
                          backgroundColor:
                            clr.toLowerCase() === "white"
                              ? "#fff"
                              : clr.toLowerCase() === "black"
                                ? "#000"
                                : clr,
                        }}
                      ></button>
                    ))
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                {/* Sizes */}
                <div className="flex items-center">
                  <span className="mr-3 text-gray-700 font-medium">Size:</span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="cursor-pointer rounded border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                  >
                    {product.size && product.size.length > 0 ? (
                      product.size.map((size, index) => (
                        <option key={index} value={size}>
                          {size.toUpperCase()}
                        </option>
                      ))
                    ) : (
                      <option disabled>No sizes available</option>
                    )}
                  </select>
                </div>
                <div>
                  Qty : {product.availableQty}
                </div>
              </div>

              {/* Price & Button */}
              <div className="sm:flex sm:gap-3 items-center justify-between border-t border-gray-100 pt-2 sm:pt-6">
                <span className="title-font font-medium text-3xl text-gray-900">
                  Rs.{product.price}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                  {/* Shop Now Button */}
                  <button
                    id="shopnow"
                    className="cursor-pointer flex items-center justify-center gap-2 text-white font-medium py-3 px-5 rounded-lg shadow-md transition-all bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
                    onClick={() => { shopNow() }}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    id="addtocart"
                    onClick={handleAdd}
                    className={`cursor-pointer flex items-center justify-center gap-2 text-white font-medium py-3 px-5 rounded-lg shadow-md transition-all w-full sm:w-auto mt-2 sm:mt-0 ${isAdded
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <Footer />
      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
