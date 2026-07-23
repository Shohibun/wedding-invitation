"use client";

import * as React from "react";
import { DarsanaTemplate } from "@/templates/darsana";
import { mockData } from "@/templates/darsana/mock";
import { TemplateProvider } from "@/templates/core/template-context";

export default function DarsanaPreviewPage() {
  const contextValue = {
    manifest: DarsanaTemplate.manifest,
    config: DarsanaTemplate.defaultConfig,
    theme: DarsanaTemplate.theme,
    sectionRegistry: DarsanaTemplate.sectionRegistry,
    data: mockData,
  };

  const Layout = DarsanaTemplate.Layout;

  return (
    <TemplateProvider value={contextValue}>
      <Layout>
        <></>
      </Layout>
    </TemplateProvider>
  );
}
