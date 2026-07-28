"use client";

import React from "react";
import { useAnalyticsDashboard } from "../../hooks/useAnalyticsDashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardFilters } from "./DashboardFilters";
import { OverviewCards } from "./OverviewCards";
import { TrafficCard } from "./TrafficCard";
import { ActivityFeed } from "./ActivityFeed";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";

export const AnalyticsDashboard: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const { summary, loading, error, filter, setFilter, refresh } =
    useAnalyticsDashboard(invitationId);

  if (error) {
    return (
      <EmptyState title="Error Loading Dashboard" description={error.message} action={refresh} />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-8">
      <DashboardHeader onRefresh={refresh} />
      <DashboardFilters filter={filter} setFilter={setFilter} />

      {loading ? (
        <LoadingState />
      ) : !summary ? (
        <EmptyState
          title="No Data Found"
          description="Try selecting a different date range."
          action={refresh}
        />
      ) : (
        <>
          <OverviewCards metrics={summary.metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrafficCard charts={summary.charts} />
            <ActivityFeed activities={summary.recentActivities} />
          </div>
        </>
      )}
    </div>
  );
};
