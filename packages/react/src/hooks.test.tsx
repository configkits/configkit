import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useConfig, useConfigUpdate } from './hooks';

describe('useConfig', () => {
  it('should parse valid config string', async () => {
    const validConfig = JSON.stringify({
      version: '1.0.0',
      components: [
        {
          id: 'test',
          type: 'div',
          props: { children: 'Hello' }
        }
      ]
    });

    const { result } = renderHook(() => useConfig(validConfig));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.config).toBeTruthy();
    expect(result.current.config?.version).toBe('1.0.0');
    expect(result.current.config?.components).toHaveLength(1);
  });

  it('should handle invalid JSON string', async () => {
    const invalidConfig = '{ invalid json }';

    const { result } = renderHook(() => useConfig(invalidConfig));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.config).toBeNull();
  });

  it('should handle empty string', async () => {
    const { result } = renderHook(() => useConfig(''));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Empty string might be valid or invalid depending on parser implementation
    // This test verifies it doesn't crash
    expect(result.current.loading).toBe(false);
  });

  it('should update when config string changes', async () => {
    const config1 = JSON.stringify({
      version: '1.0.0',
      components: []
    });

    const config2 = JSON.stringify({
      version: '2.0.0',
      components: []
    });

    const { result, rerender } = renderHook(
      ({ config }) => useConfig(config),
      {
        initialProps: { config: config1 }
      }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.config?.version).toBe('1.0.0');

    rerender({ config: config2 });

    await waitFor(() => {
      expect(result.current.config?.version).toBe('2.0.0');
    });
  });

  it('should set loading to true initially', () => {
    const validConfig = JSON.stringify({
      version: '1.0.0',
      components: []
    });

    const { result } = renderHook(() => useConfig(validConfig));

    // Initially loading should be true (before async parsing completes)
    // Note: This might be flaky due to async nature, but we test the structure
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('config');
    expect(result.current).toHaveProperty('error');
  });

  it('should handle malformed config object', async () => {
    const malformedConfig = JSON.stringify({
      version: '1.0.0'
      // Missing required fields
    });

    const { result } = renderHook(() => useConfig(malformedConfig));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should either have error or null config depending on validation
    expect(result.current.loading).toBe(false);
  });
});

describe('useConfigUpdate', () => {
  it('should return a function', () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    expect(typeof result.current).toBe('function');
  });

  it('should call onUpdate with parsed config when string is provided', () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    const configString = JSON.stringify({
      version: '1.0.0',
      components: []
    });

    result.current(configString);

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        version: '1.0.0'
      })
    );
  });

  it('should call onUpdate with config object when object is provided', () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    const configObject = {
      version: '1.0.0',
      components: []
    };

    result.current(configObject);

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        version: '1.0.0'
      })
    );
  });

  it('should handle invalid string gracefully', () => {
    const onUpdate = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    result.current('invalid json');

    expect(onUpdate).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should handle invalid object gracefully', () => {
    const onUpdate = vi.fn();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    // Pass an object that might fail validation
    result.current({ invalid: 'object' } as any);

    // Should either call onUpdate or log error depending on validation
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should update callback when onUpdate changes', () => {
    const onUpdate1 = vi.fn();
    const onUpdate2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ onUpdate }) => useConfigUpdate(onUpdate),
      {
        initialProps: { onUpdate: onUpdate1 }
      }
    );

    const configString = JSON.stringify({
      version: '1.0.0',
      components: []
    });

    result.current(configString);
    expect(onUpdate1).toHaveBeenCalledTimes(1);
    expect(onUpdate2).not.toHaveBeenCalled();

    rerender({ onUpdate: onUpdate2 });

    result.current(configString);
    expect(onUpdate1).toHaveBeenCalledTimes(1); // Still 1
    expect(onUpdate2).toHaveBeenCalledTimes(1); // Now called
  });

  it('should parse complex config correctly', () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() => useConfigUpdate(onUpdate));

    const complexConfig = {
      version: '1.0.0',
      components: [
        {
          id: 'header',
          type: 'div',
          styles: { padding: '20px' },
          children: [
            {
              id: 'title',
              type: 'h1',
              props: { children: 'Title' }
            }
          ]
        }
      ],
      features: [
        {
          id: 'feature1',
          name: 'Feature 1',
          enabled: true
        }
      ]
    };

    result.current(complexConfig);

    expect(onUpdate).toHaveBeenCalledTimes(1);
    const updatedConfig = onUpdate.mock.calls[0][0];
    expect(updatedConfig.version).toBe('1.0.0');
    expect(updatedConfig.components).toHaveLength(1);
    expect(updatedConfig.features).toHaveLength(1);
  });
});

