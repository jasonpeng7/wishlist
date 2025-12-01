"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Santa from "../components/Santa";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Snow Background */}
      <div className="snow-container">
        {snowflakes.map((flake) => (
          <div
            key={flake}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 5 + 5}px`,
              height: `${Math.random() * 5 + 5}px`,
            }}
          />
        ))}
      </div>

      <Santa />

      {/* House Container */}
      <div className="house-container w-full max-w-md mt-20">
        <div className="relative mx-auto flex justify-center z-10">
          {/* Chimney */}
          <div className="chimney">
            <div className="smoke"></div>
          </div>

          {/* Roof with Lights */}
          <div className="house-roof">
            {/* Lights hanging from roof bottom */}
            <div className="lights-strand">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="light"></div>
              ))}
            </div>
          </div>
        </div>

        {/* House Body (Solid Form) */}
        <div className="house-body p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-[#4a3b2a] drop-shadow-sm">
            Sign In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4a3b2a] drop-shadow-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-1 border-2 border-[#4a3b2a] rounded bg-white text-primary_text disabled:opacity-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4a3b2a] drop-shadow-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 border-2 border-[#4a3b2a] rounded bg-white text-primary_text relative disabled:opacity-50 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-2 top-1/2 -translate-y-1/2 text-sm text-dark_gray hover:text-black disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 bg-white/80 p-1 rounded border border-red-200">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#c41e3a] hover:bg-[#a01830] rounded-md flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-colors border-2 border-[#8b1a2b]"
              disabled={loading}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-[#4a3b2a] hover:text-[#c41e3a] hover:underline font-semibold drop-shadow-sm"
            >
              Forgot your password?
            </Link>
          </div>
          <p className="text-sm text-center text-[#4a3b2a] drop-shadow-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#0b6b3a] hover:text-[#08522e] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Snow Ground */}
        <div className="absolute -bottom-4 -left-[10%] w-[120%] h-8 bg-white blur-md rounded-full z-0 opacity-80"></div>
      </div>
    </div>
  );
}
