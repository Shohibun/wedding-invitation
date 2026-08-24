"use client";

import { useState, useCallback, useEffect } from "react";
import {
  AuthUser,
  LoginRequestDTO,
  RegisterRequestDTO,
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO,
} from "../features/auth/types";
import { AuthService } from "../features/auth/service";
import { IdentityService } from "../features/auth/identity";
import { authEventBus } from "../lib/auth/auth-events";
import { AuthEvent } from "../features/auth/events";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolveIdentity = useCallback(async () => {
    try {
      setLoading(true);
      const identity = await IdentityService.resolveCurrentIdentity();
      setUser(identity);
    } catch (_err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resolveIdentity();

    const unsubLogin = authEventBus.subscribe(AuthEvent.LOGIN_SUCCESS, () => resolveIdentity());
    const unsubLogout = authEventBus.subscribe(AuthEvent.LOGOUT, () => setUser(null));

    return () => {
      unsubLogin();
      unsubLogout();
    };
  }, [resolveIdentity]);

  const login = async (data: LoginRequestDTO) => {
    setError(null);
    const result = await AuthService.login(data);
    if (!result.success && result.message) {
      setError(result.message);
    }
    return result;
  };

  const register = async (data: RegisterRequestDTO) => {
    setError(null);
    const result = await AuthService.register(data);
    if (!result.success && result.message) {
      setError(result.message);
    }
    return result;
  };

  const logout = async () => {
    await AuthService.logout();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequestDTO) => {
    await AuthService.forgotPassword(data);
  };

  const resetPassword = async (data: ResetPasswordRequestDTO) => {
    await AuthService.resetPassword(data);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    resolveIdentity,
  };
};
