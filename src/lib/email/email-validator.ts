import { EmailAddressUtil } from "./email-address";
import { EmailMessageSchema } from "../../features/notifications/email/schema";
import { EmailMessage } from "../../features/notifications/email/types";
import { EmailValidationError, AddressError } from "../../features/notifications/email/errors";

export const EmailValidator = {
  validateSchema(payload: unknown): void {
    const result = EmailMessageSchema.safeParse(payload);
    if (!result.success) {
      throw new EmailValidationError(`Invalid email payload: ${result.error.message}`);
    }
  },

  validateAddresses(message: EmailMessage): void {
    if (!EmailAddressUtil.isValid(message.from)) {
      throw new AddressError(`Invalid sender address: ${message.from}`);
    }

    message.to.forEach((addr) => {
      if (!EmailAddressUtil.isValid(addr)) throw new AddressError(`Invalid TO address: ${addr}`);
    });

    message.cc?.forEach((addr) => {
      if (!EmailAddressUtil.isValid(addr)) throw new AddressError(`Invalid CC address: ${addr}`);
    });

    message.bcc?.forEach((addr) => {
      if (!EmailAddressUtil.isValid(addr)) throw new AddressError(`Invalid BCC address: ${addr}`);
    });
  },
};
