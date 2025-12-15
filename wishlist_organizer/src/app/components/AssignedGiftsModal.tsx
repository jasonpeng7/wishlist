"use client";

import { X, Gift } from "lucide-react";
import { MyAssignedGift } from "@/hooks/useMyGroupAssignments";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assignedGifts: MyAssignedGift[];
  onOpen?: () => void;
};

export default function AssignedGiftsModal({
  isOpen,
  onClose,
  assignedGifts,
  onOpen,
}: Props) {
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300 border-4 border-[#d42426] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Festive Header with Light Effect */}
        <div className="relative pt-8 pb-6 bg-gradient-to-b from-yellow-50 via-white to-white flex flex-col items-center justify-center overflow-hidden shrink-0">
          {/* Light Rays Background Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] -mt-[50%] bg-[radial-gradient(circle,_rgba(252,211,77,0.3)_0%,_transparent_60%)] animate-pulse pointer-events-none" />

          {/* Bouncing Gift Icon */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="animate-[bounce_2s_infinite]">
              <Gift
                size={56}
                className="text-[#d42426] drop-shadow-md fill-red-100"
              />
            </div>
            <h2 className="mt-3 text-2xl font-bold font-raleway text-[#d42426] drop-shadow-sm flex items-center gap-2">
              Items you&apos;re getting!
            </h2>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 hover:bg-red-50 rounded-full transition-colors text-[#d42426]"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-2 flex-1 scrollbar-thin scrollbar-thumb-gray-200">
          {assignedGifts.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-raleway flex flex-col items-center">
              <p className="text-lg mb-2">
                You haven&apos;t committed to getting any gifts yet.
              </p>
              <p className="text-sm text-gray-400">
                Browse the wishlists to find the perfect gift! 🎁
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {assignedGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="bg-white rounded-xl p-4 border-2 border-green-100 shadow-sm flex items-start gap-3 hover:border-green-200 transition-colors"
                >
                  <div className="mt-1 bg-green-100 p-2 rounded-full text-green-700">
                    <Gift size={20} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-gray-800 font-raleway text-lg leading-tight">
                      {gift.wishlist_item.item_name}
                    </h3>
                    <p className="text-sm text-gray-500 font-raleway">
                      For{" "}
                      <span className="font-bold text-green-700 text-base">
                        {gift.wishlist_item.user.username}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-[#d42426] text-white font-bold py-3 rounded-xl hover:bg-[#b91c1e] transition-all transform active:scale-[0.98] font-raleway shadow-md uppercase tracking-wide"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
