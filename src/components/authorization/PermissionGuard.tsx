import React, { ReactNode } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import { ActionType, ResourceType } from "../../features/authorization/types";
import { AuthorizationSkeleton } from "./AuthorizationSkeleton";
import { AccessDenied } from "./AccessDenied";

interface PermissionGuardProps {
  userId?: string;
  resource: ResourceType;
  action: ActionType;
  children: ReactNode;
  fallback?: ReactNode;
  showError?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  userId,
  resource,
  action,
  children,
  fallback = null,
  showError = false,
}) => {
  const { hasPermission, loading } = useAuthorization(userId);

  if (loading) {
    return <AuthorizationSkeleton />;
  }

  const allowed = hasPermission(resource, action);

  if (!allowed) {
    if (showError) return <AccessDenied resource={resource} action={action} />;
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
