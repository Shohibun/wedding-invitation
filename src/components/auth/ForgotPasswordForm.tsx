"use client";

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword({ email });
      setMessage("If an account exists, a reset link has been sent.");
    } catch (_err) {
      setMessage("Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {message && (
        <div className="p-3 text-sm text-primary bg-primary/10 border border-primary/20 rounded-md">
          {message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <Input
          id="forgot-email"
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full mt-2">
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};
