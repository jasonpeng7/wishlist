"use client";

import { useState } from "react";
import Link from "next/link";
import AuthScene from "../components/AuthScene";
import { inviteReturnPath, withInviteReturn } from "../../../utils/invites";

export default function SignInPage({ searchParams }: { searchParams?: { next?: string | string[]; registered?: string | string[] } }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = searchParams?.registered === "1";
  const returnTo = inviteReturnPath(searchParams?.next);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = returnTo || "/groups";
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to sign in. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScene>
      <p className="auth-eyebrow">Make yourself at home</p>
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-description">Your next thoughtful gift starts here.</p>
      {returnTo && !registered && <p role="status" className="mb-4 text-sm text-[#315b47]">Sign in to continue joining your group.</p>}
      {registered && <p role="status" className="mb-5 text-sm text-[#315b47]">{returnTo ? "Account created. Sign in to join your group." : "Account created. Sign in to continue."}</p>}
      <form onSubmit={handleSubmit} aria-label="Sign in" aria-busy={loading} aria-describedby={error ? "signin-error" : undefined}>
        <div className="auth-field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" placeholder="Your username" required disabled={loading} />
        </div>
        <div className="auth-label-row">
          <label htmlFor="password">Password</label>
          <Link href={withInviteReturn("/forgot-password", returnTo)} className="auth-text-link">Forgot password?</Link>
        </div>
        <div className="auth-field auth-password">
          <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" placeholder="Your password" required disabled={loading} />
          <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} aria-controls="password" disabled={loading}>{showPassword ? "Hide" : "Show"}</button>
        </div>
        {error && <p id="signin-error" className="auth-error" role="alert">{error}</p>}
        <button type="submit" className="auth-submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="auth-secondary">New to Wishr? <Link href={withInviteReturn("/signup", returnTo)}>Create an account</Link></p>
    </AuthScene>
  );
}
