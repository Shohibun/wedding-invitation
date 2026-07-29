import React from "react";
import { useNotificationPreferences } from "../../../hooks/useNotificationPreferences";
import {
  NOTIFICATION_CHANNELS,
  NOTIFICATION_CATEGORIES,
} from "../../../features/notifications/center/constants";

export const NotificationPreferencesEditor: React.FC<{ userId: string }> = ({ userId }) => {
  const { preferences, loading, updatePreferences } = useNotificationPreferences(userId);

  if (loading) return <div className="p-4 bg-gray-50 animate-pulse h-64 rounded-lg"></div>;
  if (!preferences) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-2xl">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-600">Master Switch</label>
          <input
            type="checkbox"
            checked={preferences.enabled}
            onChange={(e) => updatePreferences({ enabled: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>
      </div>

      <div
        className={`p-6 space-y-8 ${!preferences.enabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        {/* Channels */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
            Delivery Channels
          </h4>
          <div className="space-y-2">
            {NOTIFICATION_CHANNELS.map((channel) => (
              <label key={channel} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.channels[channel] ?? false}
                  onChange={(e) =>
                    updatePreferences({
                      channels: { ...preferences.channels, [channel]: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {channel.replace("_", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="pt-6 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
            Notification Types
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {NOTIFICATION_CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.categories[cat] ?? true}
                  onChange={(e) =>
                    updatePreferences({
                      categories: { ...preferences.categories, [cat]: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700 capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
