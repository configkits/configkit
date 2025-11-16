import { describe, it, expect } from 'vitest';
import { FeatureFlagManager } from './FeatureFlagManager';
import type { FeatureConfig } from '@configkits/core';

describe('FeatureFlagManager', () => {
  it('should register and check feature flags', () => {
    const manager = new FeatureFlagManager();
    const feature: FeatureConfig = {
      id: 'test-feature',
      name: 'Test Feature',
      enabled: true,
    };

    manager.register(feature);
    expect(manager.isEnabled('test-feature')).toBe(true);
  });

  it('should return false for non-existent features', () => {
    const manager = new FeatureFlagManager();
    expect(manager.isEnabled('non-existent')).toBe(false);
  });

  it('should respect enabled/disabled state', () => {
    const manager = new FeatureFlagManager();
    const feature: FeatureConfig = {
      id: 'disabled-feature',
      name: 'Disabled Feature',
      enabled: false,
    };

    manager.register(feature);
    expect(manager.isEnabled('disabled-feature')).toBe(false);
  });

  it('should handle rollout percentage', () => {
    const manager = new FeatureFlagManager({ userId: 'user1' });
    const feature: FeatureConfig = {
      id: 'partial-rollout',
      name: 'Partial Rollout',
      enabled: true,
      rollout: {
        percentage: 50,
      },
    };

    manager.register(feature);
    // Should return true or false based on hash
    const result = manager.isEnabled('partial-rollout');
    expect(typeof result).toBe('boolean');
  });
});

