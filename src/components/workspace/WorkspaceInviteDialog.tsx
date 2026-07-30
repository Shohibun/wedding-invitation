import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceMembers } from "../../hooks/useWorkspaceMembers";
import { UserPlus } from "lucide-react";

export const WorkspaceInviteDialog: React.FC<{ workspaceId: string; currentUserId: string }> = ({
  workspaceId,
  currentUserId,
}) => {
  const { invite } = useWorkspaceMembers(workspaceId);
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleInvite = async () => {
    if (!email) return;
    await invite(currentUserId, email, "role-editor"); // default to editor for mock
    setOpen(false);
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm">
          <UserPlus className="h-4 w-4 mr-2" /> Invite Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite team member</DialogTitle>
          <DialogDescription>
            Send an invitation email to collaborate in this workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="colleague@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleInvite}>Send Invitation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
