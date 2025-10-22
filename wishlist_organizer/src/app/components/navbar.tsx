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
    <nav className="fixed w-full flex justify-between gap-x-[25px] items-center bg-washed_gray px-[20px] h-[60px] z-50">
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
          href={
            pathName === "/groups/create"
              ? "/wishlists"
              : pathName === "/groups/join"
              ? "/wishlists"
              : pathName === "/wishlists"
              ? "/dashboard"
              : pathName.includes("/groups") && pathName.includes("/manage")
              ? "/dashboard"
              : pathName.includes("/groups") && pathName.includes("/wishlists")
              ? "/dashboard"
              : pathName.match(/^\/groups\/[\w-]+$/)
              ? "/dashboard"
              : pathName === "/groups"
              ? "/dashboard"
              : "/wishlists"
          }
          className="bg-bone px-4 py-2 rounded-full 
             transition-transform transform active:scale-90 
             text-xs flex items-center h-[32px]"
        >
          {pathName === "/groups/create"
            ? "All Wishlists"
            : pathName.includes("/groups/join")
            ? "All Wishlists"
            : pathName.includes("/wishlists")
            ? "My Wishlists"
            : pathName.includes("/groups") && pathName.includes("/manage")
            ? "My Wishlists"
            : pathName.includes("/groups")
            ? "My Wishlists"
            : "All Wishlists"}
        </Link>
        <Link
          href={
            pathName === "/groups"
              ? "/wishlists"
              : pathName === "/groups/create"
              ? "/groups"
              : pathName === "/groups/join"
              ? "/dashboard"
              : "/groups"
          }
          className="bg-bone px-4 py-2 rounded-full 
             transition-transform transform active:scale-90 
             text-xs flex items-center h-[32px]"
        >
          {pathName === "/groups"
            ? "All Wishlists"
            : pathName.includes("/groups/create")
            ? "My Groups"
            : pathName.includes("/groups/join")
            ? "My Wishlists"
            : pathName.includes("/groups")
            ? "My Groups"
            : "My Groups"}
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
