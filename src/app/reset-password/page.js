"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Invalid or missing reset token");
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-pink-600">Reset Password</h2>
          <p className="text-gray-600 text-center mt-2">
            Enter your new password below.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mt-4 text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 text-green-700 p-3 rounded mt-4 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleReset} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-all"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
