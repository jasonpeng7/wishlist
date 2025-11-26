"use client";

import { useState } from "react";
import WishlistCarousel from "./WishlistCarousel";
import WishlistBulletPoints from "./WIshlistBulletPoints";
import { LayoutGrid, List } from "lucide-react";

type WishlistItem = {
  id: string;
  name: string;
  description?: string | null;
  link?: string | null;
  image_url?: string | null;
  price?: number | null;
  user_id: string;
  assignment?: {
    assigned_to: string;
    status: "will_get" | null;
  };
  assignedUsername?: string;
};

type UserWithWishlist = {
  id: string;
  username: string;
  items: WishlistItem[];
};

type Props = {
  usersWithWishlists: UserWithWishlist[];
  groupId: string;
  groupName?: string;
  currentUserId: string;
  showGiftAssignments: boolean;
};

export default function WishlistViewWrapper({
  usersWithWishlists,
  groupId,
  currentUserId,
  showGiftAssignments,
}: Props) {
  const [viewMode, setViewMode] = useState<"carousel" | "list">("list");

  return (
    <div className="flex flex-col w-full">
      {/* Header & Toggle */}
      {usersWithWishlists.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          {/* Title is handled by parent usually, but we can add controls here */}
          <div className="flex bg-white p-1 rounded-lg border border-bone shadow-sm ml-auto">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-raleway transition-all ${
                viewMode === "list"
                  ? "bg-slate_gray text-white shadow-sm"
                  : "text-primary_text hover:bg-slate-50"
              }`}
              aria-label="List View"
            >
              <List size={18} />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode("carousel")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-raleway transition-all ${
                viewMode === "carousel"
                  ? "bg-slate_gray text-white shadow-sm"
                  : "text-primary_text hover:bg-slate-50"
              }`}
              aria-label="Carousel View"
            >
              <LayoutGrid size={18} />
              <span className="hidden sm:inline">Carousel</span>
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {usersWithWishlists.length === 0 ? (
        <div className="my-12">
          <p className="text-primary_text font-raleway text-center text-lg">
            No wishlists for this group yet. Be the first to add one!
          </p>
        </div>
      ) : (
        <>
          {viewMode === "carousel" ? (
            <div className="space-y-12">
              {usersWithWishlists.map((userData) => (
                <div key={userData.id}>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold capitalize text-primary_text font-raleway break-words">
                      {userData.username}&apos;s Wishlist
                    </h3>
                  </div>
                  <WishlistCarousel
                    items={userData.items}
                    shelfTitle={`${userData.username}'s Wishlist`}
                    currentUserId={currentUserId}
                    showGiftAssignments={showGiftAssignments}
                  />
                </div>
              ))}
            </div>
          ) : (
            <WishlistBulletPoints
              groupId={groupId}
              currentUserId={currentUserId}
            />
          )}
        </>
      )}
    </div>
  );
}
