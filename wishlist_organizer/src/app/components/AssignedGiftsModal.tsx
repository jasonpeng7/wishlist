"use client";

import { MyAssignedGift } from "@/hooks/useMyGroupAssignments";
import { useEffect } from "react";
import Modal from "./Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  assignedGifts: MyAssignedGift[];
  onOpen?: () => void;
};

export default function AssignedGiftsModal({ isOpen, onClose, assignedGifts, onOpen }: Props) {
  useEffect(() => { if (isOpen) onOpen?.(); }, [isOpen, onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gifts I'm giving" className="bg-[#fdfbf7]" titleClassName="text-slate_gray" actions={<button type="button" onClick={onClose} className="px-5 py-3 rounded-lg bg-[#a63142] text-white">Done</button>}>
      {assignedGifts.length === 0 ? <p className="text-slate_gray">You haven&apos;t claimed any gifts yet. Browse your group&apos;s wishlists to choose one.</p> : (
        <ul className="space-y-4 text-slate_gray">
          {assignedGifts.map((gift) => <li key={gift.id} className="border-b border-bone pb-4"><h3 className="font-semibold break-words">{gift.wishlist_item.item_name}</h3><p className="mt-1">For {gift.wishlist_item.user.username}</p></li>)}
        </ul>
      )}
    </Modal>
  );
}
