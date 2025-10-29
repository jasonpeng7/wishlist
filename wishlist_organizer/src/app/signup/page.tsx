"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate_gray">
      <div className="w-full max-w-md p-8 space-y-6 bg-washed_gray rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-primary_text">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary_text">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-dark_gray"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary_text">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-dark_gray"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary_text">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-dark_gray"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-midnight_blue rounded-md hover:bg-dark_gray"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-primary_text">
          Already have an account?{" "}
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
