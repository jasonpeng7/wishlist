"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export type GiftAssignmentProps = {
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

export function useGiftAssignment({
  itemId, userId, creatorId, currentAssignment, onUpdate,
}: GiftAssignmentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const updating = useRef(false);
  const [error, setError] = useState("");
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

  const updateAssignment = async (claimOnly = false) => {
    if (userId === creatorId || updating.current || (claimOnly && isChecked)) {
      return;
    }

    try {
      updating.current = true;
      setIsUpdating(true);
      setError("");

      if (!isChecked) {
        const { data: existingAssignments, error: assignmentError } = await supabase
          .from("gift_assignments")
          .select("*")
          .eq("wishlist_item_id", itemId)
          .eq("status", "will_get");

        if (assignmentError) throw assignmentError;

        if (existingAssignments && existingAssignments.length > 0) {
          setError("Someone else has already claimed this gift.");
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
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["myGroupAssignments"] }),
        queryClient.invalidateQueries({ queryKey: ["groupWishlist"] }),
      ]);
      router.refresh();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating gift assignment:", error);
      setError("Your gift commitment could not be saved. Please try again.");
    } finally {
      updating.current = false;
      setIsUpdating(false);
    }
  };

  return { error, isChecked, isUpdating, updateAssignment };
}
