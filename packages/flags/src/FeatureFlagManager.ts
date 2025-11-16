/**
 * Feature flag manager
 */

import type { FeatureConfig } from "@configkits/core";
import type { FeatureFlagContext } from "./types";

export class FeatureFlagManager {
  private features: Map<string, FeatureConfig>;
  private context: FeatureFlagContext;

  constructor(context: FeatureFlagContext = {}) {
    this.features = new Map();
    this.context = context;
  }

  /**
   * Register a feature flag
   */
  register(feature: FeatureConfig): void {
    this.features.set(feature.id, feature);
  }

  /**
   * Register multiple features
   */
  registerMany(features: FeatureConfig[]): void {
    features.forEach((feature) => this.register(feature));
  }

  /**
   * Check if a feature is enabled
   */
  isEnabled(featureId: string): boolean {
    const feature = this.features.get(featureId);
    if (!feature) {
      return false;
    }

    if (!feature.enabled) {
      return false;
    }

    // Check rollout conditions
    if (feature.rollout) {
      // Check percentage rollout
      if (feature.rollout.percentage !== undefined) {
        const hash = this.hashUser(featureId);
        if (hash > feature.rollout.percentage) {
          return false;
        }
      }

      // Check user IDs
      if (feature.rollout.userIds && this.context.userId) {
        if (!feature.rollout.userIds.includes(this.context.userId)) {
          return false;
        }
      }

      // Check environments
      if (feature.rollout.environments && this.context.environment) {
        if (!feature.rollout.environments.includes(this.context.environment)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Get feature configuration
   */
  getFeature(featureId: string): FeatureConfig | undefined {
    return this.features.get(featureId);
  }

  /**
   * Update context
   */
  updateContext(context: Partial<FeatureFlagContext>): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Hash user for consistent rollout
   */
  private hashUser(featureId: string): number {
    const str = `${featureId}-${this.context.userId || "anonymous"}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 100;
  }

  /**
   * Clear all features
   */
  clear(): void {
    this.features.clear();
  }
}

