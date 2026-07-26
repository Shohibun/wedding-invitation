import * as React from "react";
import { VariantManifest } from "./manifest";

export interface VariantPackage {
  manifest: VariantManifest;
  component: React.ComponentType<Record<string, unknown>>;
  lazy?: boolean;
}
