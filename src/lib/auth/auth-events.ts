import { AuthEvent } from "../../features/auth/events";

type EventHandler = (payload?: unknown) => void;

class AuthEventBus {
  private listeners: Map<AuthEvent, EventHandler[]> = new Map();

  subscribe(event: AuthEvent, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.listeners.get(event) || [];
      this.listeners.set(
        event,
        handlers.filter((h) => h !== handler)
      );
    };
  }

  dispatch(event: AuthEvent, payload?: unknown): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(payload));
    }
  }
}

export const authEventBus = new AuthEventBus();
