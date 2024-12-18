'use client'

import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Loader from "./SpinLoad";

export default function NavBar () {
    const pathName = usePathname();
    const [modal, setModal] = useState(false)

    const handleClick = () => {
        setModal(true)
        setTimeout(() => {
            setModal(false)
        }, 3000);
    };

    return(
    <nav className="fixed w-full flex justify-between gap-x-[25px] items-center bg-washed_gray px-[20px] h-[60px] z-50">
    <div className='flex-shrink-0'>
    <Link
    href="/dashboard"
    className="flex transition-transform transform active:scale-90"
    onClick={pathName === "/dashboard" ? undefined: handleClick}>
        <Image   
                src="/logo.svg" 
                alt="Logo"
                width={40}
                height={40}
                priority>
        </Image>
    </Link>

    </div>
    <div className='flex gap-x-[25px] items-center font-raleway font-medium'>
        <Link      
            onClick={handleClick}        
            href=
            {pathName === "/groups/create" ? "/wishlists" : 
            pathName === "/groups/join" ? "/wishlists" : 
            pathName === "/wishlists" ? "/dashboard" : 
            pathName.includes("/groups") && pathName.includes("/manage") ? "/dashboard" :
            pathName.includes("/groups") && pathName.includes("/wishlists") ? "/dashboard" :
            pathName.match(/^\/groups\/[\w-]+$/) ? "/dashboard" :
            pathName === "/groups" ? "/dashboard" : 
            "/wishlists"}             
            className="bg-bone px-4 py-2 rounded-full 
            transition-transform transform active:scale-90 
            text-xs flex items-center h-[32px]"         
            >             
            {pathName === "/groups/create" ? "All Wishlists" : 
            pathName.includes("/groups/join") ? "All Wishlists": 
            pathName.includes("/wishlists") ? "My Wishlists" : 
            pathName.includes("/groups") && pathName.includes("/manage") ? "My Wishlists" :
            pathName.includes("/groups") ? "My Wishlists" : 
            "All Wishlists"}         

        </Link>
        <Link
            onClick={handleClick}
            href={pathName === "/groups" ? "/wishlists": pathName === "/groups/create" ? "/groups" : pathName === "/groups/join" ? "/dashboard" : "/groups"}
            className='bg-bone px-4 py-2 rounded-full 
            transition-transform transform active:scale-90 
            text-xs flex items-center h-[32px]'
        >
            {pathName === "/groups" ? "All Wishlists" : 
            pathName.includes("/groups/create") ? "My Group" : 
            pathName.includes("/groups/join") ? "My Wishlists":
            pathName.includes("/groups") ? "My Group" : 
            "My Group"}
         </Link>
        {modal && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 flex justify-center items-center">
            <Loader/>
        </div>
        )}
    </div>
    <UserButton/>

</nav>
    );
}