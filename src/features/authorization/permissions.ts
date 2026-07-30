import { Permission, ResourceType, ActionType } from "./types";

export const generatePermission = (resource: ResourceType, action: ActionType): Permission => ({
  id: `perm-${resource}-${action}`,
  name: `${action} ${resource}`,
  description: `Allows the user to ${action} ${resource} resources`,
  resource,
  action,
});

// A standard set of CRUD+ actions for any given resource
const standardActions: ActionType[] = ["create", "read", "update", "delete", "manage"];

// Generate permissions for all standard resources dynamically
const resources: ResourceType[] = [
  "invitation",
  "guest",
  "template",
  "marketplace",
  "analytics",
  "notification",
  "publishing",
  "builder",
  "profile",
  "workspace",
  "billing",
];

const generatedPermissions: Permission[] = [];
for (const resource of resources) {
  for (const action of standardActions) {
    generatedPermissions.push(generatePermission(resource, action));
  }
}

// Add special combinations that aren't strictly standard CRUD
generatedPermissions.push(
  generatePermission("publishing", "publish"),
  generatePermission("invitation", "restore"),
  generatePermission("invitation", "archive"),
  generatePermission("analytics", "export"),
  generatePermission("guest", "export"),
  generatePermission("all", "manage") // Super-admin permission
);

export const DefaultPermissions = generatedPermissions;

// Helper to quickly find permissions by resource/action
export const getPermissionByResourceAction = (
  resource: ResourceType,
  action: ActionType
): Permission | undefined => {
  return DefaultPermissions.find((p) => p.resource === resource && p.action === action);
};
