"use client";

import { ReactNode, useRef } from "react";
import { useGiftAssignment, type GiftAssignmentProps } from "@/hooks/useGiftAssignment";

type Tap = { x: number; y: number; time: number; pointerId: number };

export default function QuickClaim({
  children, className, enabled, ...assignment
}: GiftAssignmentProps & { children: ReactNode; className?: string; enabled: boolean }) {
  const { error, isChecked, isUpdating, updateAssignment } = useGiftAssignment(assignment);
  const start = useRef<Tap | null>(null);
  const lastTap = useRef<Tap | null>(null);
  const canClaim = enabled && assignment.userId !== assignment.creatorId &&
    assignment.currentAssignment?.status !== "will_get" && !isChecked && !isUpdating;
  const isClaimed = enabled && assignment.userId !== assignment.creatorId &&
    (isChecked || (assignment.currentAssignment?.status === "will_get" &&
      assignment.currentAssignment.assigned_to === assignment.userId));

  const reset = () => { start.current = null; lastTap.current = null; };

  return (
    <div
      className={className}
      style={{
        touchAction: canClaim ? "manipulation" : undefined,
        backgroundColor: isClaimed ? "#eaf3e8" : undefined,
      }}
      onPointerDown={(event) => {
        if (!canClaim || !event.isPrimary || event.button !== 0 ||
          (event.target as Element).closest("button, a, input, label, select, textarea")) {
          reset();
          return;
        }
        start.current = { x: event.clientX, y: event.clientY, time: event.timeStamp, pointerId: event.pointerId };
      }}
      onPointerMove={(event) => {
        if (start.current && Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 12) reset();
      }}
      onPointerCancel={reset}
      onPointerLeave={reset}
      onPointerUp={(event) => {
        const down = start.current;
        start.current = null;
        if (!canClaim || !down || down.pointerId !== event.pointerId ||
          event.timeStamp - down.time > 300 ||
          Math.hypot(event.clientX - down.x, event.clientY - down.y) > 12) {
          lastTap.current = null;
          return;
        }
        const previous = lastTap.current;
        if (previous && event.timeStamp - previous.time < 350 &&
          Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 24) {
          lastTap.current = null;
          void updateAssignment(true);
        } else {
          lastTap.current = { ...down, time: event.timeStamp };
        }
      }}
    >
      {children}
      {enabled && isUpdating && <div role="status" className="text-sm font-raleway text-green-800">Claiming gift…</div>}
      {error && <p role="alert" className="rounded bg-white px-2 py-1 text-sm text-red-800">{error}</p>}
    </div>
  );
}
