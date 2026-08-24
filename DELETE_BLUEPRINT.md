# MVP Simplification Audit - DELETE BLUEPRINT (Phase 2)

## Module: WORKSPACE
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/workspace/schema.ts`
- `src/features/workspace/repository.ts`
- `src/features/workspace/workspace.ts`
- `src/features/workspace/invitation.ts`
- `src/features/workspace/errors.ts`
- `src/features/workspace/resolver.ts`
- `src/features/workspace/types.ts`
- `src/features/workspace/member.ts`
- `src/features/workspace/constants.ts`
- `src/features/workspace/events.ts`
- `src/features/workspace/service.ts`
- `src/components/workspace/WorkspaceEmptyState.tsx`
- `src/components/workspace/WorkspaceMembers.tsx`
- `src/components/workspace/WorkspaceSwitcher.tsx`
- `src/components/workspace/WorkspaceInvitationCard.tsx`
- `src/components/workspace/WorkspaceList.tsx`
- `src/components/workspace/WorkspaceSkeleton.tsx`
- `src/components/workspace/WorkspaceInviteDialog.tsx`
- `src/components/workspace/WorkspaceCard.tsx`
- `src/hooks/useWorkspace.ts`

---

## Module: AUTHORIZATION
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/authorization/schema.ts`
- `src/features/authorization/policies.ts`
- `src/features/authorization/repository.ts`
- `src/features/authorization/errors.ts`
- `src/features/authorization/permissions.ts`
- `src/features/authorization/resolver.ts`
- `src/features/authorization/types.ts`
- `src/features/authorization/constants.ts`
- `src/features/authorization/events.ts`
- `src/features/authorization/roles.ts`
- `src/features/authorization/guards.ts`
- `src/features/authorization/service.ts`
- `src/components/authorization/AuthorizationSkeleton.tsx`
- `src/components/authorization/PermissionGuard.tsx`
- `src/components/authorization/AccessDenied.tsx`
- `src/components/authorization/RoleBadge.tsx`
- `src/hooks/useAuthorization.ts`

---

## Module: SECURITY
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/security/schema.ts`
- `src/features/security/login-history.ts`
- `src/features/security/repository.ts`
- `src/features/security/errors.ts`
- `src/features/security/resolver.ts`
- `src/features/security/types.ts`
- `src/features/security/session.ts`
- `src/features/security/constants.ts`
- `src/features/security/events.ts`
- `src/features/security/device.ts`
- `src/features/security/audit.ts`
- `src/features/security/security-status.ts`
- `src/features/security/service.ts`
- `src/components/security/DeviceCard.tsx`
- `src/components/security/SecuritySkeleton.tsx`
- `src/components/security/SecurityTimeline.tsx`
- `src/components/security/LoginHistoryTable.tsx`
- `src/components/security/ActiveSessions.tsx`
- `src/components/security/SecurityDashboard.tsx`
- `src/components/security/SecurityStatusCard.tsx`
- `src/components/security/SecurityEmptyState.tsx`
- `src/hooks/useSecurity.ts`

---

## Module: MARKETPLACE
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- No dedicated files found in standard locations.

---

## Module: ANALYTICS
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/analytics/schema.ts`
- `src/features/analytics/validation.ts`
- `src/features/analytics/repository.ts`
- `src/features/analytics/errors.ts`
- `src/features/analytics/types.ts`
- `src/features/analytics/constants.ts`
- `src/features/analytics/mapper.ts`
- `src/features/analytics/aggregation.ts`
- `src/features/analytics/service.ts`
- `src/features/analytics/analytics-events.ts`
- `src/components/analytics/AnalyticsProvider.tsx`
- `src/components/analytics/AnalyticsErrorBoundary.tsx`
- `src/components/analytics/AnalyticsBoundary.tsx`
- `src/hooks/useAnalytics.ts`

---

## Module: INSIGHTS
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/insights/schema.ts`
- `src/features/insights/repository.ts`
- `src/features/insights/errors.ts`
- `src/features/insights/insight-builder.ts`
- `src/features/insights/anomaly-detector.ts`
- `src/features/insights/types.ts`
- `src/features/insights/recommendation-engine.ts`
- `src/features/insights/trend-engine.ts`
- `src/features/insights/constants.ts`
- `src/features/insights/kpi-engine.ts`
- `src/features/insights/service.ts`
- `src/components/insights/InsightCard.tsx`
- `src/components/insights/KPICard.tsx`
- `src/components/insights/InsightsOverview.tsx`
- `src/components/insights/InsightsEmptyState.tsx`
- `src/components/insights/TrendCard.tsx`
- `src/components/insights/RecommendationCard.tsx`
- `src/components/insights/InsightsSkeleton.tsx`
- `src/hooks/useInsights.ts`

---

## Module: REPORTS
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/reports/schema.ts`
- `src/features/reports/repository.ts`
- `src/features/reports/errors.ts`
- `src/features/reports/types.ts`
- `src/features/reports/constants.ts`
- `src/features/reports/report-export.ts`
- `src/features/reports/service.ts`
- `src/features/reports/report-builder.ts`
- `src/components/reports/ReportTable.tsx`
- `src/components/reports/ReportHeader.tsx`
- `src/components/reports/ReportExportButton.tsx`
- `src/components/reports/ReportViewer.tsx`
- `src/components/reports/ReportSummary.tsx`
- `src/components/reports/ReportLoadingState.tsx`
- `src/components/reports/ReportFilters.tsx`
- `src/components/reports/ReportEmptyState.tsx`
- `src/components/reports/ReportSection.tsx`
- `src/hooks/useReports.ts`

---

## Module: NOTIFICATIONS
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/notifications/schema.ts`
- `src/features/notifications/repository.ts`
- `src/features/notifications/notification-builder.ts`
- `src/features/notifications/errors.ts`
- `src/features/notifications/center/schema.ts`
- `src/features/notifications/center/history.ts`
- `src/features/notifications/center/filters.ts`
- `src/features/notifications/center/repository.ts`
- `src/features/notifications/center/errors.ts`
- `src/features/notifications/center/search.ts`
- `src/features/notifications/center/types.ts`
- `src/features/notifications/center/preferences.ts`
- `src/features/notifications/center/actions.ts`
- `src/features/notifications/center/constants.ts`
- `src/features/notifications/center/grouping.ts`
- `src/features/notifications/center/service.ts`
- `src/features/notifications/channel-registry.ts`
- `src/features/notifications/types.ts`
- `src/features/notifications/constants.ts`
- `src/features/notifications/mapper.ts`
- `src/features/notifications/template-engine.ts`
- `src/features/notifications/templates/schema.ts`
- `src/features/notifications/templates/repository.ts`
- `src/features/notifications/templates/errors.ts`
- `src/features/notifications/templates/defaults.ts`
- `src/features/notifications/templates/parser.ts`
- `src/features/notifications/templates/types.ts`
- `src/features/notifications/templates/renderer.ts`
- `src/features/notifications/templates/compiler.ts`
- `src/features/notifications/templates/service.ts`
- `src/features/notifications/templates/preview.ts`
- `src/features/notifications/templates/validator.ts`
- `src/features/notifications/service.ts`
- `src/features/notifications/email/schema.ts`
- `src/features/notifications/email/mock-provider.ts`
- `src/features/notifications/email/status.ts`
- `src/features/notifications/email/repository.ts`
- `src/features/notifications/email/errors.ts`
- `src/features/notifications/email/provider-factory.ts`
- `src/features/notifications/email/types.ts`
- `src/features/notifications/email/constants.ts`
- `src/features/notifications/email/provider.ts`
- `src/features/notifications/email/provider-registry.ts`
- `src/features/notifications/email/service.ts`
- `src/features/notifications/email/delivery.ts`
- `src/features/notifications/email/sender.ts`
- `src/features/notifications/queue.ts`
- `src/features/notifications/dispatcher.ts`
- `src/components/notifications/NotificationStatusBadge.tsx`
- `src/components/notifications/center/NotificationToolbar.tsx`
- `src/components/notifications/center/NotificationCenter.tsx`
- `src/components/notifications/center/NotificationStatusBadge.tsx`
- `src/components/notifications/center/NotificationList.tsx`
- `src/components/notifications/center/NotificationDetails.tsx`
- `src/components/notifications/center/NotificationCard.tsx`
- `src/components/notifications/center/NotificationFilters.tsx`
- `src/components/notifications/center/NotificationPreferences.tsx`
- `src/components/notifications/center/NotificationPriorityBadge.tsx`
- `src/components/notifications/center/NotificationEmptyState.tsx`
- `src/components/notifications/center/NotificationSearch.tsx`
- `src/components/notifications/NotificationChannelBadge.tsx`
- `src/components/notifications/templates/VariableBrowser.tsx`
- `src/components/notifications/templates/TemplateEmptyState.tsx`
- `src/components/notifications/templates/TemplateEditor.tsx`
- `src/components/notifications/templates/TemplatePreview.tsx`
- `src/components/notifications/templates/TemplateToolbar.tsx`
- `src/components/notifications/NotificationSkeleton.tsx`
- `src/components/notifications/NotificationEmptyState.tsx`
- `src/components/notifications/email/EmailEmptyState.tsx`
- `src/components/notifications/email/EmailProviderBadge.tsx`
- `src/components/notifications/email/EmailSkeleton.tsx`
- `src/components/notifications/email/EmailPreview.tsx`
- `src/components/notifications/email/EmailStatusBadge.tsx`
- `src/hooks/useNotifications.ts`

---

## Module: ACTIVITY
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/activity/schema.ts`
- `src/features/activity/repository.ts`
- `src/features/activity/types.ts`
- `src/features/activity/components/ActivityBadge.tsx`
- `src/features/activity/components/ActivityItem.tsx`
- `src/features/activity/components/ActivityEmptyState.tsx`
- `src/features/activity/components/ActivityTimeline.tsx`
- `src/features/activity/components/index.ts`
- `src/features/activity/service.ts`

---

## Module: VERSIONS
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/versions/schema.ts`
- `src/features/versions/snapshot.ts`
- `src/features/versions/repository.ts`
- `src/features/versions/types.ts`
- `src/features/versions/service.ts`

---

## Module: COMPARE
**Reason**: Overkill for single-admin MVP.

### Folders & Files to Delete
- `src/features/compare/diff.ts`
- `src/features/compare/types.ts`
- `src/features/compare/comparator.ts`
- `src/features/compare/service.ts`

---

## Files Requiring Import/Export/Route/Provider Cleanup

These files contain references to the deleted modules and must be refactored. (Do not delete these, only remove the dead imports/exports/routes):

- `src/app/(admin)/invitations/[id]/guests/components/guest-dashboard.tsx`
- `src/components/dashboard/ActivityFeed.tsx`
- `src/features/dashboard/repository.ts`
- `src/features/dashboard/types.ts`
- `src/features/visitor/service.ts`
- `src/hooks/useEmailProvider.ts`
- `src/hooks/useKPIs.ts`
- `src/hooks/useLoginHistory.ts`
- `src/hooks/useNotificationCenter.ts`
- `src/hooks/useNotificationPreferences.ts`
- `src/hooks/useNotificationQueue.ts`
- `src/hooks/useNotificationTemplate.ts`
- `src/hooks/usePermissions.ts`
- `src/hooks/useReportExport.ts`
- `src/hooks/useReportFilters.ts`
- `src/hooks/useScrollTracking.ts`
- `src/hooks/useSecuritySessions.ts`
- `src/hooks/useSecurityStatus.ts`
- `src/hooks/useTrackEvent.ts`
- `src/hooks/useTrends.ts`
- `src/hooks/useWorkspaceInvitations.ts`
- `src/hooks/useWorkspaceMembers.ts`
- `src/lib/analytics/analytics-context.ts`
- `src/lib/analytics/analytics-types.ts`
- `src/lib/analytics/event-batcher.ts`
- `src/lib/analytics/event-dispatcher.ts`
- `src/lib/analytics/event-normalizer.ts`
- `src/lib/analytics/event-queue.ts`
- `src/lib/auth/security-events.ts`
- `src/lib/authorization/permission-normalizer.ts`
- `src/lib/authorization/permission-resolver.ts`
- `src/lib/authorization/permission-utils.ts`
- `src/lib/dashboard/dashboard-builder.ts`
- `src/lib/dashboard/statistics.ts`
- `src/lib/email/email-builder.ts`
- `src/lib/email/email-normalizer.ts`
- `src/lib/email/email-preview.ts`
- `src/lib/email/email-validator.ts`
- `src/lib/insights/comparison.ts`
- `src/lib/insights/metrics.ts`
- `src/lib/insights/scoring.ts`
- `src/lib/insights/summary-generator.ts`
- `src/lib/insights/thresholds.ts`
- `src/lib/notifications/center/notification-filter.ts`
- `src/lib/notifications/center/notification-group.ts`
- `src/lib/notifications/center/notification-search.ts`
- `src/lib/notifications/center/notification-sort.ts`
- `src/lib/notifications/center/notification-utils.ts`
- `src/lib/notifications/formatter.ts`
- `src/lib/notifications/queue-utils.ts`
- `src/lib/notifications/sender.ts`
- `src/lib/notifications/template-parser.ts`
- `src/lib/notifications/variable-resolver.ts`
- `src/lib/reports/csv-exporter.ts`
- `src/lib/reports/excel-exporter.ts`
- `src/lib/reports/json-exporter.ts`
- `src/lib/reports/pdf-exporter.ts`
- `src/lib/reports/report-comparison.ts`
- `src/lib/reports/report-summary.ts`
- `src/lib/security/audit-utils.ts`
- `src/lib/security/device-manager.ts`
- `src/lib/security/risk-analyzer.ts`
- `src/lib/security/security-normalizer.ts`
- `src/lib/security/session-manager.ts`
- `src/lib/tracking/session-manager.ts`
- `src/lib/workspace/workspace-cache.ts`
- `src/lib/workspace/workspace-normalizer.ts`
- `src/lib/workspace/workspace-resolver.ts`
- `src/marketplace/compatibility.ts`
- `src/marketplace/components/MarketplacePage.tsx`
- `src/marketplace/components/filters/SearchBar.tsx`
- `src/marketplace/components/layout/EmptyState.tsx`
- `src/marketplace/installer.ts`
- `src/marketplace/packages/version-resolver.ts`
- `src/marketplace/repository.ts`
- `src/marketplace/service.ts`
- `src/publishing/publisher.ts`
- `src/templates/core/manifest.ts`
- `src/templates/core/registry.ts`
