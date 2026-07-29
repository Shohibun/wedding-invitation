import { IEmailProvider } from "./provider";
import { ProviderError } from "./errors";

class EmailProviderRegistryImpl {
  private providers: Map<string, IEmailProvider> = new Map();

  register(id: string, provider: IEmailProvider): void {
    if (this.providers.has(id)) {
      throw new ProviderError(`Provider with id ${id} is already registered.`);
    }
    this.providers.set(id, provider);
  }

  unregister(id: string): void {
    this.providers.delete(id);
  }

  resolve(id: string): IEmailProvider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new ProviderError(`Provider with id ${id} not found.`);
    }
    return provider;
  }

  list(): IEmailProvider[] {
    return Array.from(this.providers.values());
  }
}

export const EmailProviderRegistry = new EmailProviderRegistryImpl();
