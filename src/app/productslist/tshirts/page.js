"use client";

import Image from "next/image";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Tshirts() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);

    fetch("/api/getProducts")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = Array.isArray(data) ? data : Object.values(data);
        const tshirts = allProducts.filter(
          (p) => p.category?.toLowerCase() === "tshirts"
        );
        setTimeout(() => {
          
          setProducts(tshirts);
          setLoading(false);
        }, 2000);
        console.log("Fetched products:", data);
      })
      .catch((err) => console.error("Failed to fetch:", err))
      
  }, []);

  if (!isClient) return null; // Prevent SSR mismatch
 if (loading) {
    return (
      <>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
      <Footer/>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="bg-white min-h-screen py-16 ">
        {/* Hero Section */}

        <div className="text-center mb-16 px-6">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Premium T-Shirts Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our versatile and stylish T-Shirts. Crafted for comfort,
            designed for impact.
          </p>
        </div>

        {/* Product Grid */}
        <div className="container px-18 py-8 mx-auto ">
          <div className="flex flex-wrap -m-4">
            {products.map((item) => {
              // ✅ Use color array directly
              const colors = Array.isArray(item.color)
                ? item.color.map((c) => c.trim().toLowerCase())
                : [];

              return (


                <div key={item._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link href={`/product/${item.slug}`}>
                    <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                      {/* Product Image */}

                      <div className="relative h-60 w-full">
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                          {item.availableQty < 1 ? "Out of Stock" : item.category}

                        </span>
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {item.title}
                          </h2>
                          <div className="flex gap-2">

                          <p className="text-gray-500 text-sm mb-4">
                            Sizes: {Array.isArray(item.size) ? item.size.join(", ") : item.size}
                          </p>
                          <p className="text-gray-500 text-sm mb-4">
                            Qty: {item.availableQty} 
                          </p>
                          </div>
                        </div>

                        {/* ✅ Dynamic Color Buttons */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {colors.map((color, index) => (
                            <button
                              key={index}
                              title={color}
                              className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                              style={{
                                backgroundColor:
                                  color === "white"
                                    ? "#fff"
                                    : color === "black"
                                      ? "#000"
                                      : color,
                              }}
                            ></button>
                          ))}
                        </div>

                        {/* Price and Button */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-lg font-semibold text-pink-600">
                            Rs {item.price}
                          </span>
                          <button className="cursor-pointer px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full hover:opacity-90 transition-all duration-200">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

              );
            })}

            {/* Handle Empty State */}
            {products.length === 0 && (
              <p className="text-center w-full text-gray-500">
                No products available.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
