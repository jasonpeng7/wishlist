"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthScene from "../components/AuthScene";
import { inviteReturnPath, withInviteReturn } from "../../../utils/invites";

export default function SignUpPage({ searchParams }: { searchParams?: { next?: string | string[] } }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const returnTo = inviteReturnPath(searchParams?.next);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        router.push(withInviteReturn("/signin?registered=1", returnTo));
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to create your account. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScene>
      <p className="auth-eyebrow">A place for your wishes</p>
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-description">Bring your people and their wishlists together.</p>
      {returnTo && <p role="status" className="mb-4 text-sm text-[#315b47]">After creating your account, sign in to join your group.</p>}
      <form onSubmit={handleSubmit} aria-label="Create account" aria-busy={loading} aria-describedby={error ? "signup-error" : undefined}>
        <div className="auth-field">
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="you@example.com" required disabled={loading} />
        </div>
        <div className="auth-field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" placeholder="Choose a username" aria-describedby="username-help" required disabled={loading} />
        </div>
        <p id="username-help" className="auth-helper">You&apos;ll use this to sign in.</p>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <div className="auth-password">
            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" placeholder="Create a password" required disabled={loading} />
            <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} aria-controls="password" disabled={loading}>{showPassword ? "Hide" : "Show"}</button>
          </div>
        </div>
        {error && <p id="signup-error" className="auth-error" role="alert">{error}</p>}
        <button type="submit" className="auth-submit" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
      </form>
      <p className="auth-secondary">Already have an account? <Link href={withInviteReturn("/signin", returnTo)}>Sign in</Link></p>
    </AuthScene>
  );
}
