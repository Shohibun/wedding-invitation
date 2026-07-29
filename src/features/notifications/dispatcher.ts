import { Notification } from "./types";
import { channelRegistry } from "./channel-registry";
import { DispatchError } from "./errors";

export const NotificationDispatcher = {
  async dispatch(notification: Notification): Promise<void> {
    const sender = channelRegistry.getSender(notification.channel);

    if (!sender) {
      throw new DispatchError(`No sender registered for channel: ${notification.channel}`);
    }

    if (!sender.supportsChannel(notification.channel)) {
      throw new DispatchError(`Sender does not support channel: ${notification.channel}`);
    }

    try {
      await sender.send(notification);
    } catch (error) {
      throw new DispatchError(
        `Failed to dispatch notification: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
};
