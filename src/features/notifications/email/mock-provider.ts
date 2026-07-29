import { IEmailProvider } from "./provider";
import { EmailMessage, EmailProviderInfo } from "./types";
import { EmailProviderRegistry } from "./provider-registry";

/**
 * Mock Email Provider for Sprint 17C.
 * Implements IEmailProvider without sending real emails.
 */
export class MockEmailProvider implements IEmailProvider {
  getInfo(): EmailProviderInfo {
    return {
      id: "mock-email",
      name: "Mock Email Provider",
      version: "1.0.0",
      capabilities: {
        supportsAttachments: true,
        supportsHtml: true,
        supportsText: true,
        supportsScheduling: false,
      },
      enabled: true,
    };
  }

  async send(message: EmailMessage): Promise<void> {
    console.log(`[MockEmailProvider] Sending email to ${message.to.join(", ")}`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log(`[MockEmailProvider] Email sent successfully.`);
  }

  async validate(): Promise<boolean> {
    return true; // Always valid for mock
  }

  async healthCheck(): Promise<boolean> {
    return true; // Always healthy for mock
  }

  supportsAttachments(): boolean {
    return true;
  }
  supportsHtml(): boolean {
    return true;
  }
  supportsText(): boolean {
    return true;
  }
  supportsScheduling(): boolean {
    return false;
  }
}

// Automatically register the mock provider
EmailProviderRegistry.register("mock-email", new MockEmailProvider());
