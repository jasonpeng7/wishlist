"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthScene from "../components/AuthScene";
import { inviteReturnPath, withInviteReturn } from "../../../utils/invites";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const returnTo = inviteReturnPath(searchParams.get("next"));

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.push(withInviteReturn("/signin", returnTo)), 2000);
    return () => clearTimeout(timer);
  }, [success, router, returnTo]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setError("");
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 1) { setError("Enter a new password."); return; }
    if (!token) { setError("This reset link is incomplete. Request a new link below."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      if (response.ok) setSuccess(true);
      else { const data = await response.json(); setError(data.error || "Your password could not be reset. Please try again."); }
    } catch { setError("Network error. Your entries are still here. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <AuthScene>
      {success ? <div role="status" className="auth-success">
        <h1 className="auth-title">Password reset</h1>
        <p className="auth-description">Your password has been reset. Taking you to sign in…</p>
        <Link href={withInviteReturn("/signin", returnTo)} className="auth-submit">Continue to sign in</Link>
      </div> : <>
        <p className="auth-eyebrow">A fresh start</p>
        <h1 className="auth-title">Reset your password</h1>
        <p className="auth-description">Choose a new password for your account.</p>
        <form onSubmit={handleSubmit} aria-label="Set a new password" aria-busy={loading}>
          <div className="auth-field"><label htmlFor="new-password">New password</label><input id="new-password" type={showPasswords ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="auth-input" required minLength={1} disabled={loading} /></div>
          <div className="auth-field"><label htmlFor="confirm-password">Confirm new password</label><input id="confirm-password" type={showPasswords ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="auth-input" required minLength={1} disabled={loading} /></div>
          <button type="button" onClick={() => setShowPasswords((show) => !show)} aria-pressed={showPasswords} aria-controls="new-password confirm-password" className="auth-text-link mb-5 min-h-11" disabled={loading}>{showPasswords ? "Hide passwords" : "Show passwords"}</button>
          {error && <p role="alert" className="auth-error">{error}</p>}
          <button type="submit" disabled={loading} className="auth-submit">{loading ? "Resetting password…" : "Reset password"}</button>
        </form>
        <p className="auth-secondary"><Link href={withInviteReturn("/forgot-password", returnTo)}>Request a new reset link</Link></p>
      </>}
    </AuthScene>
  );
}
