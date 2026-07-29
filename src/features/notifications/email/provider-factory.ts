import { IEmailProvider } from "./provider";
import { EmailProviderRegistry } from "./provider-registry";
import { EMAIL_CONSTANTS } from "./constants";
import { ProviderError } from "./errors";
// Import mock provider to ensure it gets registered when factory is loaded
import "./mock-provider";

export const EmailProviderFactory = {
  /**
   * Resolves the active provider.
   * If a specific providerId is passed, it attempts to resolve it.
   * Otherwise it falls back to the DEFAULT_PROVIDER defined in constants.
   */
  resolveProvider(providerId?: string): IEmailProvider {
    const targetId = providerId || EMAIL_CONSTANTS.DEFAULT_PROVIDER;

    // Attempt resolving from registry
    try {
      const provider = EmailProviderRegistry.resolve(targetId);

      // Factory can run basic validations here before returning
      const info = provider.getInfo();
      if (!info.enabled) {
        throw new ProviderError(`Resolved provider ${targetId} is disabled.`);
      }

      return provider;
    } catch (error) {
      if (error instanceof ProviderError) throw error;
      throw new ProviderError(`Failed to resolve provider ${targetId}. Ensure it is registered.`);
    }
  },
};
