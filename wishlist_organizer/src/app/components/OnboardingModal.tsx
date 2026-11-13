"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./Modal";

export default function OnboardingModal({ userId }: { userId: string }) {
  const [showModal, setShowModal] = useState(false);
  const storageKey = `onboarded:${userId}`;

  useEffect(() => {
    try {
      setShowModal(localStorage.getItem(storageKey) !== "true");
    } catch {
      setShowModal(true);
    }
  }, [storageKey]);

  const dismiss = () => {
    try { localStorage.setItem(storageKey, "true"); } catch { /* Dismiss still works when storage is unavailable. */ }
    setShowModal(false);
  };

  return (
    <Modal isOpen={showModal} onClose={dismiss} title="Welcome to Wishr" className="bg-[#fdfbf7]" titleClassName="text-slate_gray">
      <p className="text-slate_gray mb-6">Every wish belongs to a group. Create one for your people, or join a group using an invitation link.</p>
      <div className="grid gap-3">
        <Link href="/groups/create" onClick={dismiss} className="rounded-lg bg-[#a63142] text-white text-center px-4 py-3 font-semibold">Create a group</Link>
        <Link href="/groups/join" onClick={dismiss} className="rounded-lg border border-[#315b47] text-[#315b47] text-center px-4 py-3 font-semibold">Join from an invite link</Link>
        <button type="button" onClick={dismiss} className="text-slate_gray underline underline-offset-4 p-3">Explore first</button>
      </div>
    </Modal>
  );
}
