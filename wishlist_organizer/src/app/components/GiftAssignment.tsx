"use client";

import { useState } from "react";
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
};

export default function GiftAssignment({
  itemId,
  userId,
  creatorId,
  currentAssignment,
  assignedUsername,
}: GiftAssignmentProps) {
  const router = useRouter();
  console.log(`Rendering GiftAssignment for item ${itemId}:`, {
    currentAssignment,
  });
  const [isChecked, setIsChecked] = useState(
    currentAssignment?.status === "will_get"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // If current user is the creator, don't show the component
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
        // Check if anyone has claimed item
        const { data: existingAssignments } = await supabase
          .from("gift_assignments")
          .select("*")
          .eq("wishlist_item_id", itemId)
          .eq("status", "will_get");

        if (existingAssignments && existingAssignments.length > 0) {
          alert("Someone else has already claimed this item!");
          return;
        }
        // Add new assignment
        const { error } = await supabase.from("gift_assignments").upsert({
          wishlist_item_id: itemId,
          assigned_to: userId,
          status: "will_get",
        });

        if (error) throw error;
      } else {
        // Remove assignment
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
    } catch (error) {
      console.error("Error updating gift assignment:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Only show who marked it if the current user marked it themselves
  if (currentAssignment?.assigned_to === userId && assignedUsername) {
    return (
      <div className="font-raleway text-sm font-medium text-green-600">
        You will get this!
      </div>
    );
  }

  // If someone else marked it, show who claimed it (but not to the creator)
  if (
    currentAssignment?.status === "will_get" &&
    currentAssignment?.assigned_to !== userId &&
    assignedUsername
  ) {
    return (
      <div className="font-raleway text-sm font-medium text-green-600">
        {assignedUsername} is getting this item!
      </div>
    );
  }

  return (
    <div className="font-raleway flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={isUpdating}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label className="text-sm font-medium text-primary_text">
        {isChecked ? "You will get this!" : "Mark as 'will get'"}
      </label>
    </div>
  );
}
