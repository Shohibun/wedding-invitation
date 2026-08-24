"use client";

import React, { useSyncExternalStore } from "react";
import { TemplateProvider } from "@/templates/core/template-context";
import { LayoutEngine } from "@/templates/core/layout-engine";
import { darsanaSectionRegistry } from "@/templates/darsana/section-registry";
import { darsanaManifest } from "@/templates/darsana/manifest";
import { darsanaConfig, darsanaDefaultData } from "@/templates/darsana/config";

interface PublicInvitationViewProps {
  initialData?: Record<string, unknown> | null;
  invitationId?: string;
  slug: string;
}

const subscribeStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

export function PublicInvitationView({ initialData, invitationId }: PublicInvitationViewProps) {
  // Check client-side backup if available
  const localBackupStr = useSyncExternalStore(
    subscribeStorage,
    () => {
      if (!invitationId) return null;
      try {
        return localStorage.getItem(`draft_backup_${invitationId}`);
      } catch {
        return null;
      }
    },
    () => null
  );

  const localBackup = React.useMemo(() => {
    if (!localBackupStr) return null;
    try {
      return JSON.parse(localBackupStr) as Record<string, unknown>;
    } catch {
      return null;
    }
  }, [localBackupStr]);

  const allRegistrySections = Object.keys(darsanaSectionRegistry);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawForm: any = localBackup || initialData || {};

  const hiddenSections = rawForm?.sections?.hidden || [];
  const userEnabled = rawForm?.sections?.enabled || [];

  const enabledSections = Array.from(
    new Set([...userEnabled, ...darsanaConfig.sections.enabled, ...allRegistrySections])
  ).filter((id) => !hiddenSections.includes(id));

  const orderSections = Array.from(
    new Set([
      ...(rawForm?.sections?.order || []),
      ...(darsanaConfig.sections.order || []),
      ...allRegistrySections,
    ])
  );

  const mergedConfig = {
    ...darsanaDefaultData,
    ...darsanaConfig,
    ...rawForm,
    sections: {
      ...darsanaConfig.sections,
      ...(rawForm?.sections || {}),
      enabled: enabledSections,
      order: orderSections,
      hidden: hiddenSections,
      variants: rawForm?.sections?.variants || {},
    },
  };

  const templateContextValue = {
    manifest: darsanaManifest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: mergedConfig as any,
    theme: {
      name: "light",
      tokens: {
        colors: rawForm?.colors || {
          primary: "#D4AF37",
          secondary: "#1A1A1A",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      cssVariables: {},
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: mergedConfig as any,
    sectionRegistry: darsanaSectionRegistry,
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden" suppressHydrationWarning>
      <TemplateProvider value={templateContextValue}>
        <LayoutEngine />
      </TemplateProvider>
    </div>
  );
}
