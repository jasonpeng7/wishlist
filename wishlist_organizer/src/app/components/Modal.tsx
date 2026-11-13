"use client";

import { ReactNode, useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  titleClassName?: string;
  busy?: boolean;
};

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  actions,
  className = "bg-dark_gray",
  titleClassName = "text-white",
  busy = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="app-dialog"
      aria-busy={busy}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : "Dialog"}
      onCancel={(event) => { event.preventDefault(); if (!busy) onClose(); }}
      onClick={(event) => {
        if (busy || event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <div className={`relative rounded-xl ${className}`}>
        <div className={`flex items-start justify-between gap-4 px-5 pt-4 ${titleClassName}`}>
          {title && <h2 id={titleId} className="text-lg font-semibold pt-2 break-words min-w-0">{title}</h2>}
          <button type="button" onClick={onClose} disabled={busy} className="ml-auto shrink-0 p-3 rounded-lg hover:bg-black/10" aria-label="Close dialog"><X size={20} aria-hidden="true" /></button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {actions && <div className="px-5 pb-5 flex flex-wrap justify-end gap-3">{actions}</div>}
      </div>
    </dialog>
  );
}
