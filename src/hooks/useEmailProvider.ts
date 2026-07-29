import { useState, useCallback, useEffect } from "react";
import { EmailProviderFactory } from "../features/notifications/email/provider-factory";
import { EmailProviderInfo } from "../features/notifications/email/types";
import { EMAIL_CONSTANTS } from "../features/notifications/email/constants";

export const useEmailProvider = (providerId: string = EMAIL_CONSTANTS.DEFAULT_PROVIDER) => {
  const [info, setInfo] = useState<EmailProviderInfo | null>(() => {
    try {
      return EmailProviderFactory.resolveProvider(providerId).getInfo();
    } catch {
      return null;
    }
  });
  const [healthy, setHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProviderDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = EmailProviderFactory.resolveProvider(providerId);
      setInfo(provider.getInfo());

      const isHealthy = await provider.healthCheck();
      setHealthy(isHealthy);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load email provider"));
      setHealthy(false);
    } finally {
      setLoading(false);
    }
  }, [providerId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProviderDetails();
  }, [fetchProviderDetails]);

  return { info, healthy, loading, error, refetch: fetchProviderDetails };
};
