import { EmailMessage } from "../../features/notifications/email/types";
import { EmailAddressUtil } from "./email-address";

export const EmailNormalizer = {
  normalize(message: EmailMessage): EmailMessage {
    // 1. Trim addresses
    const to = message.to.map((a) => a.trim());
    const cc = message.cc?.map((a) => a.trim()) || [];
    const bcc = message.bcc?.map((a) => a.trim()) || [];

    // 2. Remove duplicates using a Set based on the raw extracted email
    const seen = new Set<string>();

    const uniqueTo = to.filter((addr) => {
      const raw = EmailAddressUtil.extractAddress(addr).toLowerCase();
      if (seen.has(raw)) return false;
      seen.add(raw);
      return true;
    });

    const uniqueCc = cc.filter((addr) => {
      const raw = EmailAddressUtil.extractAddress(addr).toLowerCase();
      if (seen.has(raw)) return false;
      seen.add(raw);
      return true;
    });

    const uniqueBcc = bcc.filter((addr) => {
      const raw = EmailAddressUtil.extractAddress(addr).toLowerCase();
      if (seen.has(raw)) return false;
      seen.add(raw);
      return true;
    });

    return {
      ...message,
      to: uniqueTo,
      cc: uniqueCc.length > 0 ? uniqueCc : undefined,
      bcc: uniqueBcc.length > 0 ? uniqueBcc : undefined,
    };
  },
};
