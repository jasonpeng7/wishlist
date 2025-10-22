"use client";

import { useEffect, useState } from "react";

interface User {
  username: string;
}

export function WishlistTitle() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  return (
    <h2 className="text-2xl font-semibold mb-4">
      {user ? `${user.username}'s Wishlist` : "Your Wishlist"}
    </h2>
  );
}
