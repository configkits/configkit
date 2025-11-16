/**
 * Condition evaluator for conditional rendering
 */

import type { ConditionConfig } from "@configkits/core";
import type { FeatureFlagContext, ConditionEvaluator as IConditionEvaluator } from "./types";
import { FeatureFlagManager } from "./FeatureFlagManager";

export class DefaultConditionEvaluator implements IConditionEvaluator {
  private flagManager: FeatureFlagManager;

  constructor(flagManager: FeatureFlagManager) {
    this.flagManager = flagManager;
  }

  evaluate(condition: ConditionConfig, context: FeatureFlagContext): boolean {
    const { type, key, operator = "eq", value } = condition;

    switch (type) {
      case "featureFlag": {
        return this.flagManager.isEnabled(key);
      }

      case "permission": {
        // Permission evaluation is handled by PermissionManager
        return true; // Placeholder
      }

      case "environment": {
        const env = context.environment || "production";
        return this.compare(env, operator, value as string);
      }

      case "custom": {
        // For custom evaluators, delegate to external handler
        if (condition.evaluator) {
          // In a real implementation, you would call a registered custom evaluator
          return false;
        }
        // Fallback to key-value comparison
        const customValue = context.customAttributes?.[key];
        return this.compare(customValue, operator, value);
      }

      default:
        return false;
    }
  }

  private compare(actual: unknown, operator: string, expected: unknown): boolean {
    switch (operator) {
      case "eq":
        return actual === expected;
      case "ne":
        return actual !== expected;
      case "gt":
        return (actual as number) > (expected as number);
      case "gte":
        return (actual as number) >= (expected as number);
      case "lt":
        return (actual as number) < (expected as number);
      case "lte":
        return (actual as number) <= (expected as number);
      case "in":
        return Array.isArray(expected) && expected.includes(actual);
      case "contains":
        return typeof actual === "string" && typeof expected === "string" && actual.includes(expected);
      default:
        return false;
    }
  }
}

