import { Credential } from "./types";
import { CredentialSchema } from "./schema";
import { AuthValidator } from "../../lib/auth/auth-validator";

export const CredentialManager = {
  createCredential(provider: string, identifier: string): Credential {
    return AuthValidator.validateSchema(CredentialSchema, {
      provider,
      identifier,
      verified: false,
    });
  },
};
