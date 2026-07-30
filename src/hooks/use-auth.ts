/* eslint-disable @typescript-eslint/no-explicit-any */
export const useAuth = () => ({
  user: null as any,
  profile: null as any,
  loading: false,
  logout: async () => {},
  refresh: async () => {},
});
