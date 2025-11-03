import { describe, it, expect } from 'vitest';
import { ConfigValidator } from './validator';
import type { ConfigKitConfig } from './types';

describe('ConfigValidator', () => {
  const validator = new ConfigValidator();

  it('should validate a correct configuration', () => {
    const config: ConfigKitConfig = {
      version: '1.0.0',
      components: [
        {
          id: 'test',
          type: 'div',
        },
      ],
    };

    const result = validator.validate(config);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject invalid configuration', () => {
    const config = {
      version: '1.0.0',
      // Missing required components array
    };

    const result = validator.validate(config);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should validate nested components', () => {
    const config: ConfigKitConfig = {
      version: '1.0.0',
      components: [
        {
          id: 'parent',
          type: 'div',
          children: [
            {
              id: 'child',
              type: 'span',
            },
          ],
        },
      ],
    };

    const result = validator.validate(config);
    expect(result.valid).toBe(true);
  });
});

