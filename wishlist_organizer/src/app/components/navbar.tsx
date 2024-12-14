'use client'

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar () {
    const pathName = usePathname();

    return(
    <nav className="fixed w-full flex justify-between gap-x-[25px] items-center bg-washed_gray px-[20px] h-[60px]">
    <div className='flex-shrink-0'>
      <Image   
              src="/logo.svg" 
              alt="Logo"
              width={40}
              height={40}
              priority>
      </Image>
    </div>
    <div className='flex gap-x-[25px] items-center'>
        <Link 
            href={pathName === "/wishlists" ? "/dashboard" : pathName === "/groups" ? "/dashboard" : "/wishlists"}
            className="bg-primary_text px-4 py-2 rounded-full transition-colors text-xs flex items-center h-[32px]"
        >
            {pathName.includes("/wishlists") ? "Dashboard" : pathName.includes("/groups") ? "Dashboard": "All Wishlists"}
        </Link>
        <Link
            href={pathName === "/groups" ? "/wishlists": "/groups"}
            className='bg-primary_text px-4 py-2 rounded-full transition-colors text-xs flex items-center h-[32px]'
        >
            {pathName.includes("/groups") ? "All Wishlists" : "Your Group"}  
        </Link>
        <UserButton/>
    </div>
</nav>
    );
}