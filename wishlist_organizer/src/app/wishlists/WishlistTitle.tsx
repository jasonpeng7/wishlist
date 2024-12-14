'use client'

import { useUser } from "@clerk/nextjs"

export function WishlistTitle() {
    const { user } = useUser();

    return (
        <h2 className="text-2xl font-semibold mb-4">
            {user?.username}'s Wishlist
        </h2>
    );
}