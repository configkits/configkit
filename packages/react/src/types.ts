/**
 * Types for React renderer
 */

import type { ComponentConfig } from "@configkits/core";
import type { ReactElement } from "react";

export interface ComponentRegistry {
  [type: string]: React.ComponentType<any>;
}

export interface RendererOptions {
  componentRegistry?: ComponentRegistry;
  onEvent?: (eventType: string, handler: string, payload?: unknown) => void;
  context?: Record<string, unknown>;
}

export interface ConfigRendererProps {
  config: ComponentConfig | ComponentConfig[];
  options?: RendererOptions;
}

export type ComponentFactory = (
  config: ComponentConfig,
  children: ReactElement[] | null,
  context?: Record<string, unknown>
) => ReactElement | null;

