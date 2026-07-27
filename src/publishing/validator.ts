import { DraftSnapshot, PublishError } from "./types";
import { TemplateRegistry } from "../templates/core/registry";
import { PresetRegistry } from "../templates/core/presets";

export class PublishValidator {
  /**
   * Performs business logic validation on a strictly typed DraftSnapshot.
   * Returns an array of PublishErrors. If empty, validation passed.
   */
  async validate(snapshot: DraftSnapshot): Promise<PublishError[]> {
    const errors: PublishError[] = [];

    // 1. Verify Template exists in the Template Engine Registry
    const templateExists = TemplateRegistry.has(snapshot.template);
    if (!templateExists) {
      errors.push({
        code: "VALIDATION_TEMPLATE_MISSING",
        message: `Template '${snapshot.template}' is not registered or unavailable.`,
      });
    }

    // 2. Verify Theme exists in the Theme Engine Registry
    const themeExists = !!PresetRegistry.get(snapshot.theme);
    if (!themeExists) {
      errors.push({
        code: "VALIDATION_THEME_MISSING",
        message: `Theme '${snapshot.theme}' is not registered or unavailable.`,
      });
    }

    // 3. Verify Required Sections
    if (snapshot.sections.length === 0) {
      errors.push({
        code: "VALIDATION_SECTIONS_EMPTY",
        message: "At least one section must be enabled to publish.",
      });
    }

    // Check if the critical "cover" section is present (business rule example)
    if (!snapshot.sections.includes("cover")) {
      errors.push({
        code: "VALIDATION_COVER_MISSING",
        message: "The 'cover' section is mandatory for all invitations.",
      });
    }

    // 4. (Future) Verify Assets Available
    // Example: Loop through snapshot.gallery and verify URLs are not broken.

    // 5. (Future) Verify Guests Valid
    // Example: Ensure guest pax is positive.

    return errors;
  }
}

export const publishValidator = new PublishValidator();
