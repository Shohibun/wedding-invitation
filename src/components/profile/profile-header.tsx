"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUser } from "@/features/auth/types";

export function ProfileHeader({ user }: { user: AuthUser }) {
  const name = user.profile?.full_name || "Unknown User";
  const email = user.email || "";
  const role = user.profile?.role || "viewer";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.profile?.avatar_url || undefined} alt={name} />
        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
        <div className="flex items-center text-muted-foreground gap-2 mt-1">
          <span>{email}</span>
          <span>•</span>
          <span className="capitalize">{role}</span>
        </div>
      </div>
    </div>
  );
}
