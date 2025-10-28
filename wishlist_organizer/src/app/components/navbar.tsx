"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const response = await fetch("/api/auth/signout", { method: "POST" });
    if (response.ok) {
      router.push("/signin");
    } else {
      alert("Sign out failed");
    }
  };

  return (
    <nav className="fixed w-full flex rounded-full z-50">
      <div className="flex-shrink-0">
        <Link
          href="/dashboard"
          className="flex transition-transform transform active:scale-90"
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            priority
          ></Image>
        </Link>
      </div>
      <div className="flex gap-x-[25px] items-center font-raleway font-medium">
        <Link
          href={pathName === "/dashboard" ? "/groups" : "/dashboard"}
          className="bg-bone px-4 py-2 rounded-full 
             transition-transform transform active:scale-90 
             text-xs flex items-center h-[32px]"
        >
          {pathName === "/dashboard" ? "My Groups & Wishlists" : "My Dashboard"}
        </Link>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded-full 
                   transition-transform transform active:scale-90 
                   text-xs flex items-center h-[32px]"
      >
        Sign Out
      </button>
    </nav>
  );
}
