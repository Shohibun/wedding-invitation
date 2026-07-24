"use server";

import { createClient } from "@/lib/supabase/server";
import { AuthRepository } from "./repository";
import { AuthService } from "./service";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./schema";

async function getAuthService() {
  const supabase = await createClient();
  const repository = new AuthRepository(supabase);
  return new AuthService(repository);
}

export async function loginAction(payload: LoginInput) {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid form data", data: null };
  }

  const service = await getAuthService();
  return service.login(parsed.data);
}

export async function registerAction(payload: RegisterInput) {
  const parsed = registerSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid form data", data: null };
  }

  const service = await getAuthService();
  return service.register(parsed.data);
}

export async function logoutAction() {
  const service = await getAuthService();
  return service.logout();
}

export async function forgotPasswordAction(payload: ForgotPasswordInput, resetUrl: string) {
  const parsed = forgotPasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid form data", data: null };
  }

  const service = await getAuthService();
  return service.forgotPassword(parsed.data, resetUrl);
}

export async function resetPasswordAction(payload: ResetPasswordInput) {
  const parsed = resetPasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Invalid form data", data: null };
  }

  const service = await getAuthService();
  return service.resetPassword(parsed.data);
}
