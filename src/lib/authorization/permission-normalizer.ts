import { Permission, Role } from "../../features/authorization/types";
import { PermissionSchema, RoleSchema } from "../../features/authorization/schema";
import { AuthorizationValidator } from "./authorization-validator";

export const PermissionNormalizer = {
  normalizeRole(raw: unknown): Role {
    return AuthorizationValidator.validateSchema(RoleSchema, raw);
  },

  normalizePermission(raw: unknown): Permission {
    return AuthorizationValidator.validateSchema(PermissionSchema, raw);
  },

  normalizeRoles(rawArray: unknown[]): Role[] {
    return rawArray.map((raw) => this.normalizeRole(raw));
  },

  normalizePermissions(rawArray: unknown[]): Permission[] {
    return rawArray.map((raw) => this.normalizePermission(raw));
  },
};
