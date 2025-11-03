import { describe, it, expect } from 'vitest';
import { ConfigParser } from './parser';
import type { ConfigKitConfig } from './types';

describe('ConfigParser', () => {
  const parser = new ConfigParser();

  it('should parse valid JSON string', () => {
    const jsonString = JSON.stringify({
      version: '1.0.0',
      components: [
        {
          id: 'test',
          type: 'div',
        },
      ],
    });

    const config = parser.parseFromString(jsonString);
    expect(config.version).toBe('1.0.0');
    expect(config.components).toHaveLength(1);
  });

  it('should throw error on invalid JSON', () => {
    const invalidJson = '{ invalid json }';
    expect(() => parser.parseFromString(invalidJson)).toThrow();
  });

  it('should parse from object', () => {
    const configObj: ConfigKitConfig = {
      version: '1.0.0',
      components: [
        {
          id: 'test',
          type: 'div',
        },
      ],
    };

    const config = parser.parseFromObject(configObj);
    expect(config).toEqual(configObj);
  });

  it('should stringify configuration', () => {
    const config: ConfigKitConfig = {
      version: '1.0.0',
      components: [],
    };

    const json = parser.stringify(config);
    expect(json).toContain('"version":"1.0.0"');
    
    const pretty = parser.stringify(config, true);
    expect(pretty).toContain('  "version"');
  });
});

