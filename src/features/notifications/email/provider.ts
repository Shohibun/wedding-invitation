import { EmailMessage, EmailProviderInfo } from "./types";

export interface IEmailProvider {
  getInfo(): EmailProviderInfo;

  // Core action
  send(message: EmailMessage): Promise<void>;

  // Validates the provider configuration/keys (not the message itself)
  validate(): Promise<boolean>;

  // Health check the connection to the provider
  healthCheck(): Promise<boolean>;

  // Capabilities queried by the Factory/Service to fallback if needed
  supportsAttachments(): boolean;
  supportsHtml(): boolean;
  supportsText(): boolean;
  supportsScheduling(): boolean;
}
