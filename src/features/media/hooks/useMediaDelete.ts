"use client";

import { useState } from "react";
import { deleteMediaAction } from "../actions";
import { toast } from "sonner";

export function useMediaDelete() {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteFile = async (assetId: string, onSuccess?: () => void) => {
    setIsDeleting(true);

    try {
      const result = await deleteMediaAction(assetId);

      if (result.error) {
        throw new Error(result.error);
      }

      if (onSuccess) {
        onSuccess();
      }

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to delete file";
      toast.error(message);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteFile,
    isDeleting,
  };
}
