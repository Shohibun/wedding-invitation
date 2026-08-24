import React, { useState } from "react";
import { AuthService } from "../../features/auth/service";

export const VerifyEmailForm: React.FC<{ token: string; onSuccess?: () => void }> = ({
  token,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const verify = async () => {
    setLoading(true);
    try {
      await AuthService.verifyEmail({ token });
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (_err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Email Verification</h2>

      {status === "idle" && (
        <>
          <p className="text-gray-600 text-sm">
            Click the button below to verify your email address.
          </p>
          <button
            onClick={verify}
            disabled={loading}
            className="mt-4 bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Now"}
          </button>
        </>
      )}

      {status === "success" && (
        <div className="p-4 text-green-700 bg-green-50 rounded-lg">
          Email successfully verified! You can now login.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 text-red-700 bg-red-50 rounded-lg">
          Verification failed or link expired.
        </div>
      )}
    </div>
  );
};
