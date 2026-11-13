"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withInviteReturn } from "../../../../utils/invites";

type Result = { status: number; data: { groupId?: string; error?: string } };

export default function JoinInvitation({ inviteId, signedIn }: { inviteId: string; signedIn: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [guest, setGuest] = useState(false);
  const request = useRef<{ key: string; promise: Promise<Result> } | null>(null);

  useEffect(() => {
    let active = true;
    const key = `${inviteId}:${attempt}`;
    if (request.current?.key !== key) {
      request.current = {
        key,
        promise: (async () => {
          // External navigation can omit the Strict cookie; a same-origin request can read it.
          if (!signedIn) {
            const session = await fetch("/api/auth/session", { cache: "no-store" });
            if (session.status === 401) return { status: 401, data: {} };
            if (!session.ok) throw new Error("Session check failed");
          }
          const response = await fetch("/api/groups/join", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inviteId }) });
          return { status: response.status, data: await response.json() };
        })(),
      };
    }
    request.current.promise.then(({ status, data }) => {
      if (!active) return;
      if (status === 401) setGuest(true);
      else if (status === 200 && data.groupId) window.location.replace(`/groups/${data.groupId}/wishlists`);
      else setError(data.error || "This group could not be joined. Please try again.");
    }).catch(() => { if (active) setError("Your connection was interrupted. Please try again."); });
    return () => { active = false; };
  }, [inviteId, attempt, signedIn]);

  if (guest) return <>
    <p className="auth-eyebrow">You&apos;re invited</p>
    <h1 className="auth-title">Join your group</h1>
    <p className="auth-description">Sign in or create an account to join. We&apos;ll keep your invitation ready while you do.</p>
    <Link href={withInviteReturn("/signin", `/join/${inviteId}`)} className="auth-submit">Sign in to join</Link>
    <p className="auth-secondary">New to Wishr? <Link href={withInviteReturn("/signup", `/join/${inviteId}`)}>Create an account</Link></p>
  </>;

  return (
    <>
      <p className="auth-eyebrow">Your invitation</p>
      <h1 className="auth-title">{error ? "Unable to join" : "Joining your group"}</h1>
      {error ? <>
        <p className="auth-description" role="alert">{error}</p>
        <button type="button" onClick={() => { setError(""); setAttempt((value) => value + 1); }} className="auth-submit">Try again</button>
        <p className="auth-secondary"><Link href="/groups">Back to groups</Link></p>
      </> : <p role="status" className="auth-description">Checking your invitation and opening the group&apos;s wishlists…</p>}
    </>
  );
}
