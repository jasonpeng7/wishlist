"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Santa from "../components/Santa";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => i);
    setSnowflakes(flakes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      router.push("/signin");
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
            Create an Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#4a3b2a] drop-shadow-sm">
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 border-2 border-[#4a3b2a] rounded bg-white text-primary_text disabled:opacity-50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4a3b2a] drop-shadow-sm">
                Username*
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
                Password*
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 border-2 border-[#4a3b2a] rounded bg-white text-primary_text disabled:opacity-50 focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
                disabled={loading}
              />
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
                "Sign Up"
              )}
            </button>
          </form>
          <p className="text-sm text-center text-[#4a3b2a] drop-shadow-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-bold text-[#0b6b3a] hover:text-[#08522e] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Snow Ground */}
        <div className="absolute -bottom-4 -left-[10%] w-[120%] h-8 bg-white blur-md rounded-full z-0 opacity-80"></div>
      </div>
    </div>
  );
}
