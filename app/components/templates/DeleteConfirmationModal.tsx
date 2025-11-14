"use client";

import { useUserStore } from "@/store/useUserStore";
import type { User } from "@/types/user";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  user,
  onClose,
}: DeleteConfirmationModalProps) {
  const { deleteUser, loadingDeleteUser } = useUserStore();

  const handleConfirm = async () => {
    if (!user) return;
    await deleteUser(user.id);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="modal-content bg-card rounded-lg shadow-lg border border-primary max-w-md w-full">
        <div className="bg-header border-b border-primary px-6 py-4">
          <h2 className="text-xl font-bold text-primary">Confirm Delete</h2>
        </div>

        <div className="p-6 space-y-4">
          <Text className="text-primary">
            Are you sure you want to delete <strong>{user.name}</strong>?
          </Text>
          <Text className="text-secondary text-sm">
            This action cannot be undone.
          </Text>
        </div>

        <div className="flex gap-4 justify-end p-6 border-t border-primary">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loadingDeleteUser}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={loadingDeleteUser}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            {loadingDeleteUser ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
