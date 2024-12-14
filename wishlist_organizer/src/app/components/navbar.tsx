'use client'

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar () {
    const pathName = usePathname();

    return(
    <nav className="fixed w-full flex justify-between gap-x-[25px] items-center bg-washed_gray px-[20px] h-[60px] z-50">
    <div className='flex-shrink-0'>
      <Image   
              src="/logo.svg" 
              alt="Logo"
              width={40}
              height={40}
              priority>
      </Image>
    </div>
    <div className='flex gap-x-[25px] items-center font-raleway font-medium'>
        <Link              
            href=
            {pathName === "/groups/create" ? "/wishlists" : 
            pathName === "/groups/join" ? "/wishlists" : 
            pathName === "/wishlists" ? "/dashboard" : 
            pathName === "/groups" ? "/dashboard" : 
            "/wishlists"}             
            className="bg-bone px-4 py-2 rounded-full transition-colors text-xs flex items-center h-[32px]"         
            >             
            {pathName === "/groups/create" ? "All Wishlists" : 
            pathName.includes("/groups/join") ? "All Wishlists": 
            pathName.includes("/wishlists") ? "Dashboard" : 
            pathName.includes("/groups") ? "Dashboard" : 
            "All Wishlists"}         

        </Link>
        <Link
            href={pathName === "/groups" ? "/wishlists": pathName === "/groups/create" ? "/groups" : pathName === "/groups/join" ? "/dashboard" : "/groups"}
            className='bg-bone px-4 py-2 rounded-full transition-colors text-xs flex items-center h-[32px]'
        >
            {pathName === "/groups" ? "All Wishlists" : 
            pathName.includes("/groups/create") ? "Your Group" : 
            pathName.includes("/groups/join") ? "Dashboard":
            pathName.includes("/groups") ? "Your Group" : 
            "Your Group"}
         </Link>
        <UserButton/>
    </div>
</nav>
    );
}