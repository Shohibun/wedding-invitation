export class PageLifecycle {
  constructor(
    private onVisible: () => void,
    private onHidden: () => void,
    private onUnload: () => void
  ) {}

  public bind(): void {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("pagehide", this.handleUnload);
    window.addEventListener("beforeunload", this.handleUnload);
  }

  public unbind(): void {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    window.removeEventListener("pagehide", this.handleUnload);
    window.removeEventListener("beforeunload", this.handleUnload);
  }

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === "visible") {
      this.onVisible();
    } else {
      this.onHidden();
    }
  };

  private handleUnload = (): void => {
    this.onUnload();
  };
}
