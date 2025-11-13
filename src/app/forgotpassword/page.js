"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error || "Something went wrong");
      return;
    }

    toast.success("Password reset link sent to your email!");
    setEmail("");
  } catch (err) {
    console.error(err);
    toast.error("Server error!");
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-pink-600">Forgot Password</h2>
          <p className="text-gray-600 text-center mt-2">Enter email to change passwrod.</p>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
                placeholder="you@example.com"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-all cursor-pointer"
            >
              Continue
            </button>
            {/* Divider */}
            <div className="mt-6 flex items-center justify-between">
              <span className="w-full border-b border-gray-300"></span>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <span className="w-full border-b border-gray-300"></span>
            </div>



            {/* Signup Link */}
            <p className="mt-6 text-center text-gray-600">
              Don’t want to Forget?{" "}
              <Link href="/login" className="text-pink-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>





        </div>
      </div>
      <Footer />
    </>
  );
}
