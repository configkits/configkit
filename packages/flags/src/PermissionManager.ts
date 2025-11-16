/**
 * Permission manager for role-based access control
 */

import type { Permission, FeatureFlagContext } from "./types";
import { DefaultConditionEvaluator } from "./ConditionEvaluator";
import { FeatureFlagManager } from "./FeatureFlagManager";

export class PermissionManager {
  private permissions: Map<string, Permission>;
  private context: FeatureFlagContext;
  private conditionEvaluator: DefaultConditionEvaluator;
  private flagManager: FeatureFlagManager;

  constructor(
    context: FeatureFlagContext = {},
    flagManager?: FeatureFlagManager
  ) {
    this.permissions = new Map();
    this.context = context;
    this.flagManager = flagManager || new FeatureFlagManager(context);
    this.conditionEvaluator = new DefaultConditionEvaluator(this.flagManager);
  }

  /**
   * Register a permission
   */
  register(permission: Permission): void {
    this.permissions.set(permission.id, permission);
  }

  /**
   * Register multiple permissions
   */
  registerMany(permissions: Permission[]): void {
    permissions.forEach((permission) => this.register(permission));
  }

  /**
   * Check if user has permission
   */
  hasPermission(permissionId: string): boolean {
    const permission = this.permissions.get(permissionId);
    if (!permission) {
      return false;
    }

    // Check role-based access
    if (permission.roles && this.context.userRole) {
      if (!permission.roles.includes(this.context.userRole)) {
        return false;
      }
    }

    // Check additional conditions
    if (permission.conditions) {
      for (const condition of permission.conditions) {
        if (!this.conditionEvaluator.evaluate(condition, this.context)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Get permission configuration
   */
  getPermission(permissionId: string): Permission | undefined {
    return this.permissions.get(permissionId);
  }

  /**
   * Update context
   */
  updateContext(context: Partial<FeatureFlagContext>): void {
    this.context = { ...this.context, ...context };
    this.flagManager.updateContext(context);
  }

  /**
   * Clear all permissions
   */
  clear(): void {
    this.permissions.clear();
  }
}

