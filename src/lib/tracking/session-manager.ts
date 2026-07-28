import { VisitorSession } from "../../features/visitor/types";
import { VisitorService } from "../../features/visitor/service";
import { DeviceDetector } from "./device-detector";
import { BrowserDetector } from "./browser-detector";
import { ViewportDetector } from "./viewport-detector";
import { VisitorDetector } from "./visitor-detector";
import { SessionStorage } from "./session-storage";
import { VISITOR_CONSTANTS } from "../../features/visitor/constants";
import { SessionExpiredError } from "../../features/visitor/errors";

export class SessionManager {
  private activeSession: VisitorSession | null = null;
  private lastActivityMs: number = Date.now();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  async initialize(invitationId: string, guestId: string | null = null): Promise<VisitorSession> {
    const existingSession = SessionStorage.load();

    if (existingSession && this.isValid(existingSession)) {
      this.activeSession = existingSession;
      this.startHeartbeat();
      return existingSession;
    }

    return await this.createNewSession(invitationId, guestId);
  }

  private async createNewSession(
    invitationId: string,
    guestId: string | null
  ): Promise<VisitorSession> {
    const userAgent = VisitorDetector.getUserAgent();
    const deviceInfo = {
      device: DeviceDetector.getDeviceType(userAgent),
      browser: BrowserDetector.getBrowser(userAgent),
      os: DeviceDetector.getOS(userAgent),
      language: VisitorDetector.getLanguage(),
      timezone: VisitorDetector.getTimezone(),
    };
    const viewport = ViewportDetector.getViewport();
    const referrer = VisitorDetector.getReferrer();
    const entryPath = VisitorDetector.getCurrentPath();

    const session = await VisitorService.startTracking(
      invitationId,
      guestId,
      deviceInfo,
      viewport,
      referrer,
      entryPath
    );

    this.activeSession = session;
    this.lastActivityMs = Date.now();
    SessionStorage.save(session);
    this.startHeartbeat();

    return session;
  }

  public trackActivity(): void {
    this.lastActivityMs = Date.now();

    if (this.activeSession && !this.isValid(this.activeSession)) {
      // Session has expired in memory due to inactivity, but user is active again.
      // We throw to let the boundary catch and re-initialize.
      throw new SessionExpiredError();
    }
  }

  public async closeSession(): Promise<void> {
    this.stopHeartbeat();
    if (this.activeSession) {
      const exitPath = VisitorDetector.getCurrentPath();
      await VisitorService.stopTracking(this.activeSession, exitPath);
      SessionStorage.clear();
      this.activeSession = null;
    }
  }

  public getActiveSession(): VisitorSession | null {
    return this.activeSession;
  }

  private isValid(_session: VisitorSession): boolean {
    const now = Date.now();
    return now - this.lastActivityMs < VISITOR_CONSTANTS.INACTIVITY_TIMEOUT_MS;
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

    // Heartbeat merely updates the Session layer, it doesn't slam the DB unless needed.
    // Full implementation could throttle db updates here.
    this.heartbeatInterval = setInterval(() => {
      if (this.activeSession && this.isValid(this.activeSession)) {
        // Active
      } else if (this.activeSession) {
        // Expired
        this.closeSession().catch(console.error);
      }
    }, VISITOR_CONSTANTS.HEARTBEAT_INTERVAL_MS);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
}
