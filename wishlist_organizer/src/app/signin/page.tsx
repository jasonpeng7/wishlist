"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      const data = await response.json();
      setError(data.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center bg-primary_text">
      <div className="w-full max-w-md p-8 space-y-6 min-h-screen bg-[#f7f9fb] mt-20 glass-element rounded-t-3xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-white text-primary_text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border rounded bg-white text-primary_text relative "
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-2 top-1/2 -translate-y-1/2 text-sm text-dark_gray hover:text-black"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-primary_text bg-bone rounded-md "
          >
            Sign In
          </button>
        </form>
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-white hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
        <p className="text-sm text-center text-primary_text">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-bone hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
