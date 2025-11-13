"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSuccess("🎉 Account created successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
        toast.success("🎉 Account created successfully!")
      } else {
        setError(data.error || "Signup failed");
        toast.error(data.error || "Something went wrong")
      }
    } catch (err) {
      setError("Something went wrong");
      toast.error("Something went wront");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 mt-6 mb-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-pink-600">Create Account</h2>
        <p className="text-gray-600 text-center mt-2">
          Join DevWear and explore the latest in dev-inspired fashion
        </p>
        {/* Error / Success */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-sm text-green-500 text-center">{success}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
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
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-between">
          <span className="w-full border-b border-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <span className="w-full border-b border-gray-300"></span>
        </div>



        {/* Already have an account? */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
