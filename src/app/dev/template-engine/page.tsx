"use client";

import * as React from "react";
import { TemplateRegistry } from "@/templates/core/registry";
import { Heading } from "@/components/typography/heading";
import { SectionTitle } from "@/components/typography/section-title";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/shared/badge";
import { Divider } from "@/components/layout/divider";
import { validateManifest, validateTheme, validateConfig } from "@/templates/core/validation";

export default function TemplateEnginePlayground() {
  const [selectedTemplateId] = React.useState("darsana");
  const template = TemplateRegistry.get(selectedTemplateId);

  if (!template) {
    return <div className="p-8 text-destructive">Template not found</div>;
  }

  // Runtime Validations
  let manifestValid = false;
  let configValid = false;
  let themeValid = false;

  try {
    manifestValid = validateManifest(template.manifest);
  } catch {}
  try {
    configValid = validateConfig(template.defaultConfig);
  } catch {}
  try {
    themeValid = validateTheme(template.theme);
  } catch {}

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 shadow-sm">
        <Heading level={4} className="max-w-7xl mx-auto">
          ⚙️ Template Engine Validation
        </Heading>
      </div>

      <Container className="pt-8 space-y-8">
        {/* Validation Status */}
        <SectionTitle title="System Health" align="left" />
        <Grid cols={3} gap="md">
          <GlassCard className="p-6">
            <Heading level={6}>Manifest</Heading>
            <Badge variant={manifestValid ? "default" : "destructive"} className="mt-2">
              {manifestValid ? "VALID" : "INVALID"}
            </Badge>
          </GlassCard>
          <GlassCard className="p-6">
            <Heading level={6}>Config</Heading>
            <Badge variant={configValid ? "default" : "destructive"} className="mt-2">
              {configValid ? "VALID (100% JSON)" : "INVALID"}
            </Badge>
          </GlassCard>
          <GlassCard className="p-6">
            <Heading level={6}>Theme Tokens</Heading>
            <Badge variant={themeValid ? "default" : "destructive"} className="mt-2">
              {themeValid ? "VALID" : "INVALID"}
            </Badge>
          </GlassCard>
        </Grid>

        <Divider />

        {/* Manifest & Config */}
        <Grid cols={2} gap="lg">
          <div>
            <Heading level={5} className="mb-4">
              Template Manifest
            </Heading>
            <pre className="bg-secondary p-4 rounded-md text-xs overflow-auto">
              {JSON.stringify(template.manifest, null, 2)}
            </pre>
          </div>
          <div>
            <Heading level={5} className="mb-4">
              Default JSON Config
            </Heading>
            <pre className="bg-secondary p-4 rounded-md text-xs overflow-auto">
              {JSON.stringify(template.defaultConfig, null, 2)}
            </pre>
          </div>
        </Grid>

        <Divider />

        {/* Section Registry */}
        <Heading level={5} className="mb-4">
          Section Registry ({template.manifest.name})
        </Heading>
        <Grid cols={3} gap="md">
          {Object.values(template.sectionRegistry).map(
            (
              section:
                | Record<
                    string,
                    unknown
                  > /* eslint-disable-line @typescript-eslint/no-explicit-any */
                | any
            ) => (
              <GlassCard key={section.id} className="p-4 flex justify-between items-center">
                <span className="font-mono text-sm">{section.id}</span>
                <div className="flex gap-2">
                  {section.lazy && <Badge variant="outline">Dynamic</Badge>}
                  <Badge variant={section.enabled ? "secondary" : "destructive"}>
                    {section.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </GlassCard>
            )
          )}
        </Grid>
      </Container>
    </div>
  );
}
