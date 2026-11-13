"use client";

import { useFormStatus } from "react-dom";
import { ReactNode } from "react";

export default function SubmitButton({ children, pendingText, className }: { children: ReactNode; pendingText: string; className?: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} aria-busy={pending} className={className}>{pending ? pendingText : children}</button>;
}
