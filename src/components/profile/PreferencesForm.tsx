import React, { useState } from "react";
import { UserPreferences } from "../../features/profile/types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LanguageSelector, TimezoneSelector, AppearanceSelector } from "./Selectors";

export const PreferencesForm: React.FC<{
  preferences: UserPreferences;
  onSave: (data: Partial<UserPreferences>) => void;
}> = ({ preferences, onSave }) => {
  const [formData, setFormData] = useState<UserPreferences>({ ...preferences });

  const handleChange = (key: keyof UserPreferences, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-medium">Account Preferences</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Appearance</Label>
          <AppearanceSelector value={formData.theme} onChange={(v) => handleChange("theme", v)} />
        </div>
        <div className="space-y-2">
          <Label>Language</Label>
          <LanguageSelector
            value={formData.language}
            onChange={(v) => handleChange("language", v)}
          />
        </div>
        <div className="space-y-2">
          <Label>Timezone</Label>
          <TimezoneSelector
            value={formData.timezone}
            onChange={(v) => handleChange("timezone", v)}
          />
        </div>
      </div>
      <Button onClick={() => onSave(formData)}>Save Preferences</Button>
    </div>
  );
};
