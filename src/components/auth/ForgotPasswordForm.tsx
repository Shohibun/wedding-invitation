"use client";

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h2>

      {message && (
        <div className="p-3 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded">
          {message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-gray-900 text-white font-medium py-2 px-4 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};
