"use client";
import Link from "next/link";
import { Github, Twitter, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">DevWear</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Premium coding-themed apparel & accessories for developers.  
            Wear your code with pride.
          </p>
          <div className="flex mt-4 space-x-4">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/" className="hover:text-black">Home</Link></li>
            <li><Link href="/about" className="hover:text-black">About</Link></li>
            <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link href="/order" className="hover:text-black">Orders</Link></li>
            <li><Link href="/checkout" className="hover:text-black">Checkout</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Products</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link href="/productslist/hoodies" className="hover:text-black">Hoodies</Link></li>
            <li><Link href="/productslist/mugs" className="hover:text-black">Mugs</Link></li>
            <li><Link href="/productslist/sweatwears" className="hover:text-black">Sweatwears</Link></li>
            <li><Link href="/productslist/tshirts" className="hover:text-black">T-shirts</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-pink-600 mb-3">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to get special offers, free giveaways, and latest news.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-500 text-white text-sm rounded-r-lg hover:bg-pink-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DevWear. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
