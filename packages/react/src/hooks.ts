/**
 * React hooks for ConfigKits
 */

import { useState, useEffect, useCallback } from "react";
import type { ConfigKitConfig } from "@configkits/core";
import { ConfigParser } from "@configkits/core";

export function useConfig(configString: string): {
  config: ConfigKitConfig | null;
  loading: boolean;
  error: Error | null;
} {
  const [config, setConfig] = useState<ConfigKitConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const parser = new ConfigParser();
    try {
      const parsed = parser.parseFromString(configString);
      setConfig(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setConfig(null);
    } finally {
      setLoading(false);
    }
  }, [configString]);

  return { config, loading, error };
}

export function useConfigUpdate(
  onUpdate: (config: ConfigKitConfig) => void
): (newConfig: ConfigKitConfig | string) => void {
  return useCallback((newConfig: ConfigKitConfig | string) => {
    const parser = new ConfigParser();
    try {
      const parsed = typeof newConfig === "string" 
        ? parser.parseFromString(newConfig)
        : parser.parseFromObject(newConfig);
      onUpdate(parsed);
    } catch (err) {
      console.error("Failed to update config:", err);
    }
  }, [onUpdate]);
}

