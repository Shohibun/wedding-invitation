import React from "react";
import { Recommendation } from "../../features/insights/types";

export const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({
  recommendation,
}) => {
  let styles = "bg-gray-50 border-gray-200 text-gray-900";
  let icon = "💡";

  if (recommendation.severity === "critical") {
    styles = "bg-red-50 border-red-200 text-red-900";
    icon = "🚨";
  } else if (recommendation.severity === "warning") {
    styles = "bg-yellow-50 border-yellow-200 text-yellow-900";
    icon = "⚠️";
  } else if (recommendation.severity === "success") {
    styles = "bg-green-50 border-green-200 text-green-900";
    icon = "✅";
  }

  return (
    <div className={`p-5 rounded-2xl border ${styles} flex gap-4 items-start`}>
      <div className="text-2xl mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-sm">{recommendation.title}</h4>
        <p className="mt-1 text-xs opacity-80 leading-relaxed">{recommendation.description}</p>
      </div>
    </div>
  );
};
