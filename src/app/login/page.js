"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successfull")
        router.push("/"); // redirect after login
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-pink-600">Welcome Back</h2>
        <p className="text-gray-600 text-center mt-2">Sign in to continue shopping</p>
        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
              placeholder="••••••••"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link href="/forgotpassword" className="text-sm text-pink-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <span className="w-full border-b border-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>

      

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-pink-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
