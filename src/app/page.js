"use client";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { ShoppingBag, Star, Truck, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Text */}
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

        {/* Right Side - Hero Image */}
        <div className="flex justify-center relative">
          <Image
            src="/hero-model.png" // replace with your image in /public
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
            { name: "Hoodies", img: "/hero-model.png" },
            { name: "Mugs", img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80" },
            { name: "Sweatwears", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" },
            { name: "T-Shirts", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80" },
          ].map((cat, i) => (
            <div
              key={i}
              className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-64 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          {[
            { name: "Code Hoodie", price: "$49", img: "/hero-model.png" },
            { name: "Bug-Free Mug", price: "$15", img: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80" },
            { name: "Dev T-Shirt", price: "$25", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" },
            { name: "Debug Sweatwear", price: "$39", img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80" },
          ].map((product, i) => (
            <div
              key={i}
              className="bg-white border border-pink-100 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              <img src={product.img} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-pink-600 font-bold mt-2">{product.price}</p>
                <Link
                  href="/checkout"
                  className="mt-auto px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          Why Choose DevWear?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto px-6 text-center">
          {[
            { icon: <Truck size={40} className="mx-auto text-pink-500" />, title: "Fast Delivery", desc: "Get your orders at your doorstep quickly." },
            { icon: <ShieldCheck size={40} className="mx-auto text-pink-500" />, title: "Secure Payments", desc: "Your transactions are safe with us." },
            { icon: <Star size={40} className="mx-auto text-pink-500" />, title: "Top Quality", desc: "Premium materials and stylish designs." },
            { icon: <Heart size={40} className="mx-auto text-pink-500" />, title: "Loved by Devs", desc: "Our products are trusted worldwide." },
          ].map((feature, i) => (
            <div key={i} className="p-6 border rounded-lg shadow hover:shadow-md transition">
              {feature.icon}
              <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-pink-50">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
          What Our Customers Say
        </h2>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alice Johnson", review: "Absolutely love the hoodie! Super comfy and stylish.", img: "https://randomuser.me/api/portraits/women/65.jpg" },
            { name: "Mark Lee", review: "The mug is my daily coding partner. Great quality!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Sophia Chen", review: "Best t-shirt for devs! Soft fabric and great fit.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <p className="italic text-gray-600">"{t.review}"</p>
              <h4 className="mt-4 font-semibold text-pink-600">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get special offers, free giveaways, and new arrivals.
        </p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-64 border border-pink-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="px-6 py-3 bg-pink-500 text-white rounded-r-md hover:bg-pink-600 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
