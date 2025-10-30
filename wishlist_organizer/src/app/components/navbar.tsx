"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, LogOut } from "lucide-react";

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

  const isDashboard = pathName === "/dashboard";
  const isGroups = pathName.startsWith("/groups");

  return (
    <>
      <nav
        className="fixed
          w-full max-w-[1000px] z-50 bg-white/40 items-center h-16 glass
          justify-between p-6 hidden md:flex"
      >
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
        <div className="hidden sm:flex gap-x-[25px] items-center font-raleway font-medium">
          <Link
            href={pathName === "/dashboard" ? "/groups" : "/dashboard"}
            className="bg-bone px-4 py-2 rounded-full 
             transition-transform transform active:scale-90 
             text-xs flex items-center h-[32px]"
          >
            {pathName === "/dashboard"
              ? "My Groups & Wishlists"
              : "My Dashboard"}
          </Link>
        </div>
      </nav>


      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 glass sm:hidden z-50">
        <div className="flex justify-around items-center h-full">
          <Link href="/dashboard" className="flex flex-col items-center p-2">
            <div className={`relative flex flex-col items-center justify-center h-full w-20 ${isDashboard ? 'glass-nav' : ''}`}>
              <Home className={isDashboard ? "text-black/70" : "text-black/70"} />
              <span className={`text-sm font-medium ${isDashboard ? "text-black/70" : "text-black/70"}`}>
                Home
              </span>
            </div>
          </Link>
          <Link href="/groups" className="flex flex-col items-center p-2">
            <div className={`relative flex flex-col items-center justify-center h-full w-20 ${isGroups ? 'glass-nav' : ''}`}>
              <Users className={isGroups ? "text-black/70" : "text-black/70"} />
              <span className={`text-sm font-medium ${isGroups ? "text-black/70" : "text-black/70"}`}>
                Groups
              </span>
            </div>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center transition-transform transform active:scale-90 p-2"
          >
            <div className="relative flex flex-col items-center justify-center h-full w-20">
              <LogOut className="text-red-500" />
              <span className="text-sm font-medium text-red-500">Sign Out</span>
            </div>
          </button>
        </div>
      </nav>
    </>
  );
}
