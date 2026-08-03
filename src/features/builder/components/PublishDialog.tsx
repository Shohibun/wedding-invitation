"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Invitation } from "@/features/invitation/types";
import { publishInvitationAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useBuilderContext } from "../context/BuilderProvider";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invitation: Invitation;
}

export function PublishDialog({ open, onOpenChange, invitation }: PublishDialogProps) {
  const [isPublishing, setIsPublishing] = useState(false);
  const { triggerSave } = useBuilderContext();

  const handlePublish = async () => {
    setIsPublishing(true);

    // Ensure all latest changes are saved first
    await triggerSave();

    const result = await publishInvitationAction(invitation.id);
    setIsPublishing(false);

    if (result.success) {
      toast.success("Successfully published invitation!");
      onOpenChange(false);
    } else {
      toast.error(result.error || "Failed to publish invitation");
      console.error("Publish errors:", result.details);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Invitation</DialogTitle>
          <DialogDescription>
            Are you sure you want to publish this invitation? This will update the live public
            website and synchronize your draft into the live relational database.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPublishing}>
            Cancel
          </Button>
          <Button variant="default" onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
