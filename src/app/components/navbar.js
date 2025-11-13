"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ShoppingCart, User } from "lucide-react";
import Checkout from "../cartSidebar/page";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    }
    return [];
  });

  // ✅ Keep cart updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateCart = () => {
        const updatedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(updatedCart);
      };
      window.addEventListener("storage", updateCart);
      window.addEventListener("cartUpdated", updateCart);
      updateCart();
      return () => {
        window.removeEventListener("storage", updateCart);
        window.removeEventListener("cartUpdated", updateCart);
      };
    }
  }, []);

  // ✅ Check login state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setIsLoggedIn(false);
      setProfileOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-pink-600">
            DevWear
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li><Link href="/" className="hover:text-pink-600 transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-pink-600 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-pink-600 transition">Contact</Link></li>

            {/* Products Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => {
                clearTimeout(window.dropdownTimer);
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                window.dropdownTimer = setTimeout(() => {
                  setDropdownOpen(false);
                }, 200);
              }}
            >
              <button className="flex items-center hover:text-pink-600 transition">
                Products <ChevronDown size={18} className="ml-1" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                  <li><Link href="/productslist/hoodies" className="block px-4 py-2 hover:bg-gray-100">Hoodies</Link></li>
                  <li><Link href="/productslist/mugs" className="block px-4 py-2 hover:bg-gray-100">Mugs</Link></li>
                  <li><Link href="/productslist/sweatwears" className="block px-4 py-2 hover:bg-gray-100">Sweatwears</Link></li>
                  <li><Link href="/productslist/tshirts" className="block px-4 py-2 hover:bg-gray-100">T-Shirts</Link></li>
                </ul>
              )}
            </li>

            <li><Link href="/order" className="hover:text-pink-600 transition">Orders</Link></li>
          </ul>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
            <button
              className="relative"
              onClick={() => setSidebarOpen(true)}
            >
              <ShoppingCart size={24} className="hover:text-pink-600 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            </button>

            {/* Profile Icon */}
            <div
              className="relative"
              onMouseEnter={() => {
                clearTimeout(window.profileTimer);
                setProfileOpen(true);
              }}

              onMouseLeave={() => {
                window.profileTimer = setTimeout(() => {
                  setProfileOpen(false);
                }, 300); 
              }}

            >
              <User size={26} className="cursor-pointer hover:text-pink-600" />
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-md shadow-lg py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/myAccount"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setProfileOpen(false)}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <ul className="flex flex-col p-4 space-y-4 font-medium">
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>

              <li>
                <details>
                  <summary className="cursor-pointer">Products</summary>
                  <ul className="ml-4 mt-2 space-y-4">
                    <li><Link href="/productslist/hoodies">Hoodies</Link></li>
                    <li><Link href="/productslist/mugs">Mugs</Link></li>
                    <li><Link href="/productslist/sweatwears">Sweatwears</Link></li>
                    <li><Link href="/productslist/tshirts">T-Shirts</Link></li>
                  </ul>
                </details>
              </li>

              <li><Link href="/order" onClick={() => setMobileMenuOpen(false)}>Orders</Link></li>

              <li>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="cursor-pointer flex items-center space-x-2"
                >
                  <ShoppingCart size={20} /> <span>Cart</span>
                </button>
              </li>

              {/* Profile section inside mobile */}
              <li className="pt-4 border-t">
                {isLoggedIn ? (
                  <>
                    <Link href="/myaccount" onClick={() => setMobileMenuOpen(false)} className="block py-2">
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="block py-2 text-left text-red-500"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2">
                      Login
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="block py-2">
                      Signup
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Checkout Sidebar */}
      <Checkout
        cartItems={cartItems}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}
