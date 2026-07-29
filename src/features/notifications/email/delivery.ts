import { IEmailProvider } from "./provider";
import { EmailMessage } from "./types";
import { emailRepository } from "./repository";

export const EmailDeliveryManager = {
  async dispatch(provider: IEmailProvider, message: EmailMessage): Promise<void> {
    const providerInfo = provider.getInfo();

    const delivery = await emailRepository.createDelivery({
      messageId: message.id,
      provider: providerInfo.id,
      status: "sending",
    });

    try {
      await provider.send(message);
      await emailRepository.updateDeliveryStatus(delivery.id, "sent");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown Provider Error";
      await emailRepository.updateDeliveryStatus(delivery.id, "failed", errorMsg);
      throw error;
    }
  },
};
