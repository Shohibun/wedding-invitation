import { TemplatePackage } from "../core/registry";
import { darsanaManifest } from "./manifest";
import { darsanaConfig } from "./config";
import { darsanaTheme } from "./theme";
import { DarsanaLayout } from "./layout";

import { darsanaSectionRegistry } from "./section-registry";

export const DarsanaTemplate: TemplatePackage = {
  manifest: darsanaManifest,
  defaultConfig: darsanaConfig,
  theme: darsanaTheme,
  Layout: DarsanaLayout,
  sectionRegistry: darsanaSectionRegistry,
};
