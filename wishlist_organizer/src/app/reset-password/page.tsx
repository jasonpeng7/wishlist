"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 1) {
      setError("Password must be at least 1 character long");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Invalid reset link");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
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
          <h1 className="text-3xl font-bold text-green-600">Success!</h1>
          <p className="text-white">
            Your password has been reset successfully. You will be redirected to
            the sign-in page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary_text">
      <div className="w-full max-w-md p-6 min-h-screen space-y-6 bg-[#f7f9fb] mt-20 glass-element rounded-t-3xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Reset Your Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              New Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-dark_gray"
              required
              minLength={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Confirm New Password
            </label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded bg-primary_text text-dark_gray"
              required
              minLength={1}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-midnight_blue rounded-md hover:bg-dark_gray disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
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
