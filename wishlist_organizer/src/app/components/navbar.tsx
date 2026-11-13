"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { List, Users, LogOut } from "lucide-react";

export default function NavBar() {
  const pathName = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setError("");
    try {
      const response = await fetch("/api/auth/signout", { method: "POST" });
      if (!response.ok) throw new Error("Sign out failed");
      router.push("/signin");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <nav className="app-nav" aria-label="Primary navigation">
      <Link href="/groups" className="app-nav-brand" aria-label="Wishr groups">
        <Image src="/logo.svg" alt="" width={36} height={36} />
      </Link>
      <Link href="/groups" aria-current={pathName.startsWith("/groups") ? "page" : undefined}>
        <Users size={22} aria-hidden="true" /><span>Groups</span>
      </Link>
      <Link href="/dashboard" aria-current={pathName === "/dashboard" ? "page" : undefined}>
        <List size={22} aria-hidden="true" /><span>My wishlist</span>
      </Link>
      <button type="button" onClick={handleSignOut} disabled={signingOut}>
        <LogOut size={22} aria-hidden="true" /><span>{signingOut ? "Signing out…" : "Sign out"}</span>
      </button>
      {error && <p className="app-nav-error" role="alert">{error}</p>}
    </nav>
  );
}
