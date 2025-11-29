"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { useRouter } from "next/navigation";

type GiftAssignmentProps = {
  itemId: string;
  userId: string;
  creatorId: string;
  currentAssignment?: {
    assigned_to: string;
    status: "will_get" | null;
  };
  assignedUsername?: string;
  onUpdate?: () => void;
};

export default function GiftAssignment({
  itemId,
  userId,
  creatorId,
  currentAssignment,
  assignedUsername,
  onUpdate,
}: GiftAssignmentProps) {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(
    currentAssignment?.status === "will_get" &&
      currentAssignment?.assigned_to === userId
  );
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsChecked(
      currentAssignment?.status === "will_get" &&
        currentAssignment?.assigned_to === userId
    );
  }, [currentAssignment, userId]);

  if (userId === creatorId) {
    return null;
  }

  const handleToggle = async () => {
    if (userId === creatorId) {
      return;
    }

    try {
      setIsUpdating(true);

      if (!isChecked) {
        const { data: existingAssignments } = await supabase
          .from("gift_assignments")
          .select("*")
          .eq("wishlist_item_id", itemId)
          .eq("status", "will_get");

        if (existingAssignments && existingAssignments.length > 0) {
          alert("Someone else has already claimed this item!");
          return;
        }
        const { error } = await supabase.from("gift_assignments").upsert({
          wishlist_item_id: itemId,
          assigned_to: userId,
          status: "will_get",
        });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("gift_assignments")
          .delete()
          .match({
            wishlist_item_id: itemId,
            assigned_to: userId,
            status: "will_get",
          });

        if (error) throw error;
      }

      setIsChecked(!isChecked);
      router.refresh();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating gift assignment:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (
    currentAssignment?.status === "will_get" &&
    currentAssignment?.assigned_to !== userId &&
    assignedUsername
  ) {
    return (
      <div className="font-raleway text-sm font-medium text-green-600">
        {/* {assignedUsername} is getting this item! */}
        This item has been claimed!
      </div>
    );
  }

  return (
    <div
      className={`font-raleway flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors w-fit ${
        isChecked ? "bg-green-600 text-white" : "bg-transparent"
      }`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={isUpdating}
        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer accent-green-600"
      />
      <label
        className="text-sm font-medium cursor-pointer select-none"
        onClick={() => !isUpdating && handleToggle()}
      >
        {isChecked ? "You're getting this!" : "I want to get this item!"}
      </label>
    </div>
  );
}
