import { useState, useCallback } from "react";
import { NotificationTemplateV2, TemplatePreview } from "../features/notifications/templates/types";
import { TemplateService } from "../features/notifications/templates/service";

export const useNotificationTemplate = () => {
  const [template, setTemplate] = useState<NotificationTemplateV2 | null>(null);
  const [preview, setPreview] = useState<TemplatePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPreview = useCallback(async (templateId: string, variables: Record<string, string>) => {
    try {
      setLoading(true);
      const res = await TemplateService.previewTemplate(templateId, variables);
      setPreview(res);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to generate preview"));
    } finally {
      setLoading(false);
    }
  }, []);

  return { template, preview, loading, error, loadPreview, setTemplate };
};
