/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthUser } from "@/features/auth/types";

export function ProfileHeader({ user }: { user: AuthUser }) {
  const name = (user as any)?.fullName || "Guest";
  const email = (user as any)?.email || "";
  const role = (user as any)?.role || "viewer";

  const initials = (user as any)?.fullName
    ?.split(" ")
    .map((n: any) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center space-x-4 mb-8">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user?.avatar || ""} alt={name} />
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
