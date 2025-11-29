import React from "react";
import Modal from "./Modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDeleting?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDeleting = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="bg-white"
      titleClassName="text-slate_gray font-raleway font-bold"
    >
      <div className="font-raleway">
        <p className="text-slate_gray mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-slate_gray hover:bg-gray-100 transition-colors font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
