/**
 * A/B testing manager
 */

import type { ABTest, ABTestVariant, FeatureFlagContext } from "./types";

export class ABTestManager {
  private tests: Map<string, ABTest>;
  private assignments: Map<string, string>; // userId -> variantId
  private context: FeatureFlagContext;

  constructor(context: FeatureFlagContext = {}) {
    this.tests = new Map();
    this.assignments = new Map();
    this.context = context;
  }

  /**
   * Register an A/B test
   */
  register(test: ABTest): void {
    this.tests.set(test.id, test);
  }

  /**
   * Get variant for a test
   */
  getVariant(testId: string): ABTestVariant | null {
    const test = this.tests.get(testId);
    if (!test || !test.enabled) {
      return null;
    }

    // Check if user is already assigned
    const userId = this.context.userId || "anonymous";
    const existingAssignment = this.assignments.get(`${testId}:${userId}`);
    if (existingAssignment) {
      const variant = test.variants.find((v) => v.id === existingAssignment);
      if (variant) {
        return variant;
      }
    }

    // Assign variant based on weights
    const variant = this.assignVariant(test);
    if (variant) {
      this.assignments.set(`${testId}:${userId}`, variant.id);
    }

    return variant;
  }

  /**
   * Assign a variant based on weights
   */
  private assignVariant(test: ABTest): ABTestVariant | null {
    if (test.variants.length === 0) {
      return null;
    }

    // Calculate total weight
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    if (totalWeight === 0) {
      return null;
    }

    // Hash user ID for consistent assignment
    const hash = this.hashUser(test.id);
    const normalizedHash = hash % totalWeight;

    let cumulativeWeight = 0;
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (normalizedHash < cumulativeWeight) {
        return variant;
      }
    }

    // Fallback to first variant
    return test.variants[0];
  }

  /**
   * Hash user for consistent assignment
   */
  private hashUser(testId: string): number {
    const str = `${testId}:${this.context.userId || "anonymous"}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Update context
   */
  updateContext(context: Partial<FeatureFlagContext>): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Clear all tests
   */
  clear(): void {
    this.tests.clear();
    this.assignments.clear();
  }
}

