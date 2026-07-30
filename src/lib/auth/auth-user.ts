import { AuthUser } from "../../features/auth/types";

export const AuthUserUtil = {
  getDisplayName(user: AuthUser): string {
    if (user.fullName) return user.fullName;
    if (user.email) return user.email.split("@")[0];
    if (user.phone) return user.phone;
    return "Anonymous User";
  },

  isComplete(user: AuthUser): boolean {
    return !!user.email && !!user.fullName;
  },
};
