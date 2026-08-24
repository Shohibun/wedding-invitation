/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
export const AuthProvider: React.FC<{
  children: React.ReactNode;
  initialSession?: any;
  initialUser?: any;
}> = ({ children }) => <>{children}</>;
export const useAuth = () => ({
  user: null as any,
  profile: null as any,
  session: null as any,
  loading: false,
  isLoading: false,
  logout: async () => {},
  refresh: async () => {},
});
export const useAuthContext = useAuth;
