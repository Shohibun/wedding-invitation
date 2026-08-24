import {
  AuthenticationResult,
  AuthUser,
  ForgotPasswordRequestDTO,
  IAuthRepository,
  LoginRequestDTO,
  RegisterRequestDTO,
  ResetPasswordRequestDTO,
  Session,
  VerifyEmailRequestDTO,
} from "./types";
import { v4 as uuidv4 } from "uuid";

class MockAuthRepository implements IAuthRepository {
  private users: Map<string, AuthUser> = new Map();
  private sessions: Map<string, Session> = new Map();
  private currentUser: AuthUser | null = null;
  private currentSession: Session | null = null;

  async signIn(data: LoginRequestDTO): Promise<AuthenticationResult> {
    // Mock simple login
    if (data.email === "test@example.com" && data.password === "password") {
      const user: AuthUser = {
        id: uuidv4(),
        email: data.email,
        emailVerified: true,
        role: "authenticated",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const session: Session = {
        id: uuidv4(),
        accessToken: "mock.access.token",
        expiresAt: Math.floor(Date.now() / 1000) + 3600,
        lastActivity: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      this.currentUser = user;
      this.currentSession = session;
      this.users.set(user.id, user);
      this.sessions.set(session.id, session);

      return { user, session, success: true };
    }
    return { user: null, session: null, success: false, message: "Invalid credentials" };
  }

  async signUp(data: RegisterRequestDTO): Promise<AuthenticationResult> {
    const user: AuthUser = {
      id: uuidv4(),
      email: data.email,
      fullName: data.fullName,
      emailVerified: false,
      role: "authenticated",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.set(user.id, user);
    // Mock require verification
    return { user, session: null, success: true, message: "Verification email sent" };
  }

  async signOut(): Promise<void> {
    if (this.currentSession) {
      this.sessions.delete(this.currentSession.id);
    }
    this.currentUser = null;
    this.currentSession = null;
  }

  async refreshSession(): Promise<AuthenticationResult> {
    if (!this.currentUser || !this.currentSession) {
      return { user: null, session: null, success: false, message: "No active session" };
    }
    // extend token
    this.currentSession.expiresAt = Math.floor(Date.now() / 1000) + 3600;
    return { user: this.currentUser, session: this.currentSession, success: true };
  }

  async forgotPassword(data: ForgotPasswordRequestDTO): Promise<void> {
    console.log("Mock forgot password for", data.email);
  }

  async resetPassword(data: ResetPasswordRequestDTO): Promise<void> {
    console.log("Mock reset password", data.newPassword);
  }

  async verifyEmail(data: VerifyEmailRequestDTO): Promise<void> {
    console.log("Mock verify email with token", data.token);
  }

  async changePassword(newPassword: string): Promise<void> {
    console.log("Mock change password", newPassword);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return this.currentUser;
  }

  async getCurrentSession(): Promise<Session | null> {
    return this.currentSession;
  }
}

export const mockAuthRepository = new MockAuthRepository();
