"use client";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Truck, ShieldCheck, Star, Heart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getProducts");
      const data = await res.json();

      // Pick ONE product per category
      const categoryMap = {};
      data.forEach((p) => {
        if (!categoryMap[p.category]) {
          categoryMap[p.category] = p;
        }
      });

      setFeaturedProducts(Object.values(categoryMap));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Wear the Code
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Style meets tech culture. Premium tees & hoodies for developers who
              live and breathe code.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center relative">
            <Image
              src="/hero-model.png"
              alt="Developer Clothing"
              width={500}
              height={500}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          {[
            { name: "Hoodies", img: "/hero-model.png", href: "/productslist/hoodies" },
            { name: "Mugs", img: "https://codeswear.nyc3.cdn.digitaloceanspaces.com/mugs/your-design-here-mug-white/0.webp", href: "/productslist/mugs" },
            { name: "Sweatwears", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80", href: "/productslist/sweatwears" },
            { name: "T-Shirts", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80", href: "/productslist/tshirts" },
          ].map((cat, i) => (
            <Link href={cat.href} key={i}>
              <div className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img src={cat.img} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products (Dynamic) */}
      <section className="py-16 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Featured Products
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        <div className="flex flex-wrap -m-4 mt-4 container pl-6">
          {!loading &&
            featuredProducts.map((item) => {
              const colors = Array.isArray(item.color)
                ? item.color.map((c) => c.trim().toLowerCase())
                : [];

              return (
                <div key={item._id} className="lg:w-1/4 md:w-1/4 p-4 w-full cursor-pointer">
                  <Link href={`/product/${item.slug}`}>
                    <div className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col relative h-full">
                      {/* Badge */}
                      <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {item.availableQty > 0 ? item.category : "Out of Stock"}
                      </div>

                      {/* Image */}
                      <div className="relative h-60 w-full">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Sizes: {item.size.join(", ")}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          Qty: {item.availableQty}
                        </p>

                        {/* Colors */}
                        <div className="flex gap-2 mb-4">
                          {colors.map((color, i) => (
                            <span
                              key={i}
                              className="w-6 h-6 rounded-full border"
                              style={{ backgroundColor: color }}
                            ></span>
                          ))}
                        </div>

                        {/* Price */}
                        <span className="text-lg font-semibold text-pink-600">
                          Rs {item.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Why Choose DevWear?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 text-center">
          {[
            { icon: <Truck size={40} className="mx-auto text-pink-500" />, title: "Fast Delivery", desc: "Quick doorstep delivery." },
            { icon: <ShieldCheck size={40} className="mx-auto text-pink-500" />, title: "Secure Payments", desc: "100% safe checkout." },
            { icon: <Star size={40} className="mx-auto text-pink-500" />, title: "Top Quality", desc: "Premium material." },
            { icon: <Heart size={40} className="mx-auto text-pink-500" />, title: "Loved by Devs", desc: "Trusted worldwide." },
          ].map((feature, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              {feature.icon}
              <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
