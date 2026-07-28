export class IdleTracker {
  private timeoutId: NodeJS.Timeout | null = null;
  private isIdle: boolean = false;
  private lastActive: number = Date.now();

  constructor(
    private timeoutMs: number,
    private onIdle: () => void,
    private onActive: () => void
  ) {}

  public handleActivity = (): void => {
    this.lastActive = Date.now();

    if (this.isIdle) {
      this.isIdle = false;
      this.onActive();
    }

    this.resetTimer();
  };

  public start(): void {
    this.resetTimer();
    this.bindEvents();
  }

  public stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.unbindEvents();
  }

  private resetTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.isIdle = true;
      this.onIdle();
    }, this.timeoutMs);
  }

  private bindEvents(): void {
    if (typeof window === "undefined") return;
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, this.handleActivity, { passive: true }));
  }

  private unbindEvents(): void {
    if (typeof window === "undefined") return;
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.removeEventListener(e, this.handleActivity));
  }
}
