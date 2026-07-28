"use client";

import React, { useEffect } from "react";
import { useInsights } from "../../hooks/useInsights";
import { KPICard } from "./KPICard";
import { TrendCard } from "./TrendCard";
import { RecommendationCard } from "./RecommendationCard";
import { InsightsSkeleton } from "./InsightsSkeleton";
import { InsightsEmptyState } from "./InsightsEmptyState";

export const InsightsOverview: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const { summary, loading, error, refresh } = useInsights(invitationId);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (loading) return <InsightsSkeleton />;
  if (error)
    return (
      <InsightsEmptyState
        title="Failed to load insights"
        description={error.message}
        onRetry={refresh}
      />
    );
  if (!summary) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Insights</h1>
        <p className="text-gray-500 mt-2">
          Health Score:{" "}
          <span className="font-semibold text-gray-900">{summary.healthScore}/100</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Trends & Forecasts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.trends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      </div>
    </div>
  );
};
