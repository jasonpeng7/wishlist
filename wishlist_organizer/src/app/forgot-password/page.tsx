"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary_text">
        <div className="w-full max-w-md p-6 min-h-screen space-y-6 bg-[#f7f9fb] mt-20 glass-element rounded-t-3xl text-center">
          <h1 className="text-3xl font-bold text-green-600">
            Check Your Email
          </h1>
          <p className="text-white">
            If an account with that email exists, a password reset link has been
            sent. Please check your email and follow the instructions to reset
            your password. If you don&apos;t see it in your inbox, please check
            your <span className="font-bold">SPAM</span> folder.
          </p>
          <Link
            href="/signin"
            className="inline-block px-4 py-2 font-medium text-primary_text bg-bone rounded-md hover:bg-dark_gray"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary_text">
      <div className="w-full max-w-md p-6 min-h-screen space-y-6 bg-[#f7f9fb] mt-20 glass-element rounded-t-3xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-center text-white">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-white"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-sm text-center text-primary_text">
          Remember your password?{" "}
          <Link
            href="/signin"
            className="font-medium text-bone hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
