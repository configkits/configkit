/**
 * Core types for ConfigKits
 */

export interface ConfigKitConfig {
  version: string;
  metadata?: {
    name?: string;
    description?: string;
    author?: string;
  };
  components: ComponentConfig[];
  layout?: LayoutConfig;
  features?: FeatureConfig[];
  plugins?: PluginConfig[];
}

export interface ComponentConfig {
  id: string;
  type: string;
  props?: Record<string, unknown>;
  children?: ComponentConfig[];
  conditions?: ConditionConfig[];
  styles?: StylesConfig;
  events?: EventConfig[];
}

export interface LayoutConfig {
  type: "grid" | "flex" | "absolute" | "relative";
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  direction?: "row" | "column";
  alignItems?: string;
  justifyContent?: string;
  padding?: string | number;
  margin?: string | number;
}

export interface ConditionConfig {
  type: "featureFlag" | "permission" | "environment" | "custom";
  key: string;
  operator?: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "contains";
  value: unknown;
  evaluator?: string; // For custom evaluators
}

export interface StylesConfig {
  [key: string]: string | number | undefined;
}

export interface EventConfig {
  type: string;
  handler: string;
  payload?: Record<string, unknown>;
}

export interface FeatureConfig {
  id: string;
  name: string;
  enabled: boolean;
  rollout?: {
    percentage?: number;
    userIds?: string[];
    environments?: string[];
  };
  metadata?: Record<string, unknown>;
}

export interface PluginConfig {
  id: string;
  type: string;
  config?: Record<string, unknown>;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code?: string;
}

export type ConfigLifecycleHook = "onParse" | "onValidate" | "onRender" | "onUpdate";

export interface LifecycleManager {
  register(hook: ConfigLifecycleHook, callback: (...args: unknown[]) => void | Promise<void>): void;
  unregister(hook: ConfigLifecycleHook, callback: (...args: unknown[]) => void | Promise<void>): void;
  execute(hook: ConfigLifecycleHook, ...args: unknown[]): Promise<void>;
}

