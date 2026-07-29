import { NotificationSender } from "../../lib/notifications/sender";
import { CoreEmailSender } from "./email/sender";

// Implements a Strategy Registry pattern to route notifications to the correct external APIs
class ChannelRegistry {
  private senders: Map<string, NotificationSender> = new Map();

  register(channel: string, sender: NotificationSender): void {
    this.senders.set(channel, sender);
  }

  getSender(channel: string): NotificationSender | undefined {
    return this.senders.get(channel);
  }

  hasChannel(channel: string): boolean {
    return this.senders.has(channel);
  }
}

export const channelRegistry = new ChannelRegistry();
// Register the 17C Email Sender into the 17A Core Pipeline
channelRegistry.register("email", new CoreEmailSender());
