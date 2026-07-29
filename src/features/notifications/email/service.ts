import { CreateEmailMessageDTO, EmailMessage } from "./types";
import { emailRepository } from "./repository";
import { EmailProviderFactory } from "./provider-factory";
import { EmailValidator } from "../../../lib/email/email-validator";
import { EmailNormalizer } from "../../../lib/email/email-normalizer";
import { EmailDeliveryManager } from "./delivery";

export const EmailService = {
  async sendEmail(data: CreateEmailMessageDTO, providerId?: string): Promise<EmailMessage> {
    // 1. Resolve active provider
    const provider = EmailProviderFactory.resolveProvider(providerId);

    // 2. Validate DTO basics
    EmailValidator.validateSchema(data);

    // 3. Save to database (mock)
    let message = await emailRepository.createMessage(data);

    // 4. Normalize and deep validate addresses
    message = EmailNormalizer.normalize(message);
    EmailValidator.validateAddresses(message);

    // 5. Dispatch via Delivery Manager
    await EmailDeliveryManager.dispatch(provider, message);

    return message;
  },
};
