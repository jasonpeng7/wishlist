"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useGroupWishlist, WishlistItem } from "../../hooks/useGroupWishlist";
import GiftAssignment from "./GiftAssignment";
import Loader from "./Loader";
import Modal from "./Modal";

type Props = {
  groupId: string;
  currentUserId: string;
};

const WishlistItemRow = React.memo(
  ({
    item,
    onViewItem,
    currentUserId,
    isMyList,
  }: {
    item: WishlistItem;
    onViewItem: (item: WishlistItem) => void;
    currentUserId: string;
    isMyList: boolean;
  }) => {
    const isSelfAssigned =
      item.assignment?.status === "will_get" &&
      item.assignment?.assigned_to === currentUserId;
    const isOtherAssigned =
      !isMyList &&
      item.assignment?.status === "will_get" &&
      item.assignment?.assigned_to !== currentUserId;

    return (
      <li className="group flex items-center justify-between py-3 border-b border-slate-400/20 last:border-0 hover:bg-black/5 transition-colors px-2 rounded-sm">
        <div className="flex flex-col truncate pr-4">
          <h4
            className={`font-bold text-sm truncate font-raleway ${
              isSelfAssigned
                ? "text-green-700"
                : isOtherAssigned
                ? "line-through text-slate-400 decoration-slate-400"
                : "text-slate_gray"
            }`}
            title={item.name}
          >
            {item.name}
          </h4>
          {isOtherAssigned && item.assignedUsername && (
            <span className="text-xs text-slate-400 italic font-raleway">
              claimed by {item.assignedUsername}
            </span>
          )}
        </div>
        <button
          onClick={() => onViewItem(item)}
          className="flex-shrink-0 text-xs font-bold bg-transparent text-slate_gray border border-slate_gray px-3 py-1 rounded hover:bg-slate_gray hover:text-white transition-colors font-raleway"
        >
          View Item
        </button>
      </li>
    );
  }
);

WishlistItemRow.displayName = "WishlistItemRow";

const UserWishlistSection = React.memo(
  ({
    username,
    items,
    onViewItem,
    currentUserId,
    listOwnerId,
  }: {
    username: string;
    items: WishlistItem[];
    onViewItem: (item: WishlistItem) => void;
    currentUserId: string;
    listOwnerId: string;
  }) => {
    const isMyList = currentUserId === listOwnerId;
    return (
      <div className="filter drop-shadow-sm">
        <div className="lined-paper torn-paper rounded-t-sm p-8 pt-6">
          {/* Header with Christmas accent */}
          <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-red-800/10">
            <div>
              <div className="flex items-center justify-center gap-x-2">
                <div className="w-3 h-3 rounded-full bg-red-600/70" />
                <h3 className="text-2xl font-bold text-slate_gray font-raleway mb-1">
                  {isMyList ? "Your Wishlist" : `${username}'s Wishlist`}
                </h3>
              </div>

              <p className="text-sm font-normal text-slate_gray/60">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </p>
            </div>
          </div>

          <ul className="pl-2">
            {items.map((item) => (
              <WishlistItemRow
                key={item.id}
                item={item}
                onViewItem={onViewItem}
                currentUserId={currentUserId}
                isMyList={isMyList}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

UserWishlistSection.displayName = "UserWishlistSection";

export default function WishlistBulletPoints({
  groupId,
  currentUserId,
}: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGroupWishlist(groupId, currentUserId);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

  const handleAssignmentUpdate = () => {
    queryClient.invalidateQueries({ queryKey: ["groupWishlist", groupId] });
  };

  const handleViewItem = (item: WishlistItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center my-8">
          <p className="text-red-600">Failed to load wishlist items.</p>
        </div>
      );
    }

    if (!data || data.usersWithWishlists.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
          <p className="text-primary_text/70 font-raleway text-lg">
            No wishlists found for this group.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-y-24">
        {data.usersWithWishlists.map((user) => (
          <UserWishlistSection
            key={user.id}
            username={user.username}
            items={user.items}
            onViewItem={handleViewItem}
            currentUserId={currentUserId}
            listOwnerId={user.id}
          />
        ))}
      </div>
    );
  }, [data, isLoading, error, currentUserId]);

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 text-sm font-raleway text-slate_gray bg-[#fdfbf7]/80 py-3 px-6 rounded-full shadow-sm w-fit mx-auto border border-bone">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-700"></div>
          <span className="font-bold text-green-700">
            You&apos;re getting this
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="line-through text-slate-400 decoration-slate-400">
            Crossed out
          </span>
          <span className="text-slate-500">Claimed by others</span>
        </div>
      </div>

      {content}

      {/* Item Details Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        title={selectedItem?.name}
        className="lined-paper rounded-t-lg rounded-b-none"
        titleClassName="text-slate_gray font-raleway font-bold text-xl"
      >
        {selectedItem && (
          <div className="flex flex-col gap-4 font-raleway  p-1 pb-6">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate_gray font-bold text-xl hover:text-red-600 transition-colors z-20"
            >
              X
            </button>
            <div className="relative w-full h-64 bg-slate-50 rounded-md overflow-hidden border border-slate-100 shrink-0">
              <Image
                src={selectedItem.image_url || "/placeholder.webp"}
                alt={selectedItem.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>

            <div className="space-y-2">
              {selectedItem.description && (
                <div>
                  <h4 className="text-sm font-bold text-slate_gray">
                    Description
                  </h4>
                  <p className="text-slate_gray/80 whitespace-pre-wrap">
                    {selectedItem.description}
                  </p>
                </div>
              )}

              {selectedItem.store && (
                <div>
                  <h4 className="text-sm font-bold text-slate_gray">Store</h4>
                  <p className="text-slate_gray/80">{selectedItem.store}</p>
                </div>
              )}

              {selectedItem.link && (
                <div className="pt-2">
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-white bg-slate_gray px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Visit Store
                  </a>
                </div>
              )}
            </div>

            {data && !data.hideGiftGetters && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <GiftAssignment
                  itemId={selectedItem.id}
                  userId={currentUserId}
                  creatorId={selectedItem.user_id}
                  currentAssignment={selectedItem.assignment}
                  assignedUsername={selectedItem.assignedUsername}
                  onUpdate={handleAssignmentUpdate}
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
