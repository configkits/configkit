/**
 * Types for feature flags
 */

import type { FeatureConfig, ConditionConfig } from "@configkits/core";

export interface FeatureFlagContext {
  userId?: string;
  userRole?: string;
  environment?: string;
  customAttributes?: Record<string, unknown>;
}

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100
  config?: Record<string, unknown>;
}

export interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  enabled: boolean;
}

export interface Permission {
  id: string;
  name: string;
  roles?: string[];
  conditions?: ConditionConfig[];
}

export interface ConditionEvaluator {
  evaluate(condition: ConditionConfig, context: FeatureFlagContext): boolean;
}

