import React from "react";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  actions,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-lg bg-dark_gray shadow-xl">
        {title && (
          <div className="px-5 pt-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
        )}
        <div className="px-5 py-4 ">{children}</div>
        <div className="px-5 pb-5 flex justify-end gap-3">{actions}</div>
      </div>
    </div>
  );
}
