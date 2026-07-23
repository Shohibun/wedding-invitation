"use client";

import * as React from "react";
import { TemplateProvider } from "@/templates/core/template-context";
import { TemplateRegistry } from "@/templates/core/registry";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { AlertCircle } from "lucide-react";
import { Container } from "@/components/layout/container";

interface TemplateRendererProps {
  themeId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function TemplateRenderer({ themeId, data }: TemplateRendererProps) {
  const templatePkg = TemplateRegistry.get(themeId);

  if (!templatePkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <Container className="max-w-md">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </EmptyMedia>
              <EmptyTitle>Template Not Found</EmptyTitle>
              <EmptyDescription>
                The template theme &quot;{themeId}&quot; is not registered in the system.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Container>
      </div>
    );
  }

  const contextValue = {
    manifest: templatePkg.manifest,
    config: templatePkg.defaultConfig,
    theme: templatePkg.theme,
    sectionRegistry: templatePkg.sectionRegistry,
    data: data,
  };

  const Layout = templatePkg.Layout;

  return (
    <TemplateProvider value={contextValue}>
      <Layout>
        <></>
      </Layout>
    </TemplateProvider>
  );
}
