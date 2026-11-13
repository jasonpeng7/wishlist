"use client";

import { useId } from "react";
import { useGiftAssignment, type GiftAssignmentProps } from "@/hooks/useGiftAssignment";

export default function GiftAssignment({
  itemId,
  userId,
  creatorId,
  currentAssignment,
  assignedUsername,
  onUpdate,
}: GiftAssignmentProps) {
  const checkboxId = useId();
  const { error, isChecked, isUpdating, updateAssignment } = useGiftAssignment({
    itemId, userId, creatorId, currentAssignment, onUpdate,
  });

  if (userId === creatorId) return null;

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
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onChange={() => updateAssignment()}
        disabled={isUpdating}
        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer accent-green-600"
      />
      <label
        className="text-sm font-medium cursor-pointer select-none"
        htmlFor={checkboxId}
      >
        I&apos;ll give this gift
      </label>
      {error && <p role="alert" className="rounded bg-white px-2 py-1 text-red-800 text-sm">{error}</p>}
    </div>
  );
}
