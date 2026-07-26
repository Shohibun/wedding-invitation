import * as React from "react";
import { RegisteredSection } from "../types";

export class VariantResolver {
  /**
   * Dynamically resolves the component for a given section,
   * checking if the requested variant exists in the registry.
   * If it doesn't exist, it gracefully falls back to the default component.
   */
  static resolveComponent(
    registeredSection: RegisteredSection,
    requestedVariantId?: string
  ): React.ComponentType<Record<string, unknown>> {
    if (requestedVariantId && registeredSection.variants) {
      const variantPackage = registeredSection.variants[requestedVariantId];
      if (variantPackage && variantPackage.component) {
        return variantPackage.component;
      }
    }

    // Fallback to the default section component
    return registeredSection.component;
  }
}
