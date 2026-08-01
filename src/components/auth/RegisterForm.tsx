"use client";

import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export const RegisterForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { register, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      const result = await register({ email, password, fullName });
      if (result.success) {
        setSuccessMsg(result.message || "Registration successful");
        if (onSuccess) onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">Create Account</h2>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded">
          {successMsg}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
