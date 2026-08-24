import {
  AuthenticationResult,
  ForgotPasswordRequestDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
  VerifyEmailRequestDTO,
} from "./types";
import { authRepository } from "./repository";
import { AuthValidator } from "../../lib/auth/auth-validator";
import { authEventBus } from "../../lib/auth/auth-events";
import { AuthEvent } from "./events";
import {
  LoginRequestSchema,
  RegisterRequestSchema,
  ForgotPasswordRequestSchema,
  ResetPasswordRequestSchema,
  VerifyEmailRequestSchema,
} from "./schema";

export const AuthService = {
  async login(data: LoginRequestDTO): Promise<AuthenticationResult> {
    const validated = AuthValidator.validateSchema(LoginRequestSchema, data);
    const result = await authRepository.signIn(validated);

    if (result.success) {
      authEventBus.dispatch(AuthEvent.LOGIN_SUCCESS, result);
    } else {
      authEventBus.dispatch(AuthEvent.LOGIN_FAILED, result.message);
    }

    return result;
  },

  async register(data: RegisterRequestDTO): Promise<AuthenticationResult> {
    const validated = AuthValidator.validateSchema(RegisterRequestSchema, data);
    return authRepository.signUp(validated);
  },

  async logout(): Promise<void> {
    await authRepository.signOut();
    authEventBus.dispatch(AuthEvent.LOGOUT);
  },

  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    const validated = AuthValidator.validateSchema(ForgotPasswordRequestSchema, data);
    return authRepository.forgotPassword(validated);
  },

  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    const validated = AuthValidator.validateSchema(ResetPasswordRequestSchema, data);
    await authRepository.resetPassword(validated);
    authEventBus.dispatch(AuthEvent.PASSWORD_RESET);
  },

  async verifyEmail(data: VerifyEmailRequestDTO): Promise<void> {
    const validated = AuthValidator.validateSchema(VerifyEmailRequestSchema, data);
    await authRepository.verifyEmail(validated);
    authEventBus.dispatch(AuthEvent.EMAIL_VERIFIED);
  },
};
