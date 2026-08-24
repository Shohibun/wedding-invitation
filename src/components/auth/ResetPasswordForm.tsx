"use client";

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const ResetPasswordForm: React.FC<{ token: string; onSuccess?: () => void }> = ({
  token,
  onSuccess,
}) => {
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword({ token, newPassword: password });
      if (onSuccess) onSuccess();
    } catch (_err) {
      setError("Failed to reset password. Link may be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="reset-password">New Password</Label>
        <Input
          id="reset-password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full mt-2">
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
};
