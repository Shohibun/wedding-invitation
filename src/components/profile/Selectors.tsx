import React from "react";

export const LanguageSelector: React.FC<{ value: string; onChange: (val: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="en">English</option>
      <option value="id">Bahasa Indonesia</option>
      <option value="es">Español</option>
    </select>
  );
};

export const TimezoneSelector: React.FC<{ value: string; onChange: (val: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="UTC">UTC (Coordinated Universal Time)</option>
      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
      <option value="America/New_York">America/New_York (EST)</option>
    </select>
  );
};

export const AppearanceSelector: React.FC<{
  value: "light" | "dark" | "system";
  onChange: (val: "light" | "dark" | "system") => void;
}> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "light" | "dark" | "system")}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="system">System Default</option>
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  );
};
