"use client";

import { useState } from "react";
import Link from "next/link";
import AuthScene from "../components/AuthScene";
import { inviteReturnPath, withInviteReturn } from "../../../utils/invites";

export default function ForgotPasswordPage({ searchParams }: { searchParams?: { next?: string | string[] } }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const returnTo = inviteReturnPath(searchParams?.next);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, next: returnTo || undefined }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScene>
      {success ? (
        <div className="auth-success" role="status">
          <svg className="auth-mail" viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="3" y="8" width="34" height="25" rx="5" stroke="currentColor" strokeWidth="1.5" /><path d="m5 11 15 11 15-11" stroke="currentColor" strokeWidth="1.5" /></svg>
          <p className="auth-eyebrow">One more step</p>
          <h1 className="auth-title">Check your email</h1>
          <p className="auth-description">If an account matches that email address, you&apos;ll receive a password reset link.</p>
          <p className="auth-description">Check your spam folder if you don&apos;t see it.</p>
          <Link href={withInviteReturn("/signin", returnTo)} className="auth-submit">Back to sign in</Link>
        </div>
      ) : (
        <>
          <p className="auth-eyebrow">Let&apos;s get you back in</p>
          <h1 className="auth-title">Forgot password?</h1>
          <p className="auth-description">Enter your account&apos;s email address. We&apos;ll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit} aria-label="Reset password" aria-busy={loading} aria-describedby={error ? "forgot-error" : undefined}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" autoCapitalize="none" value={email} onChange={(e) => setEmail(e.target.value)} className="auth-input" placeholder="you@example.com" required disabled={loading} />
            </div>
            {error && <p id="forgot-error" className="auth-error" role="alert">{error}</p>}
            <button type="submit" className="auth-submit" disabled={loading}>{loading ? "Sending link…" : "Send reset link"}</button>
          </form>
          <p className="auth-secondary"><Link href={withInviteReturn("/signin", returnTo)}>Back to sign in</Link></p>
        </>
      )}
    </AuthScene>
  );
}
