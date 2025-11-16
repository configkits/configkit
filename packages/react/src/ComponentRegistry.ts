/**
 * Component registry for mapping component types to React components
 */

import React from "react";
import type { ComponentRegistry, ComponentFactory } from "./types";

export class DefaultComponentRegistry implements ComponentRegistry {
  private components: Map<string, React.ComponentType<any>>;
  private factories: Map<string, ComponentFactory>;

  constructor() {
    this.components = new Map();
    this.factories = new Map();
  }

  /**
   * Register a component type
   */
  register(type: string, component: React.ComponentType<any>): void {
    this.components.set(type, component);
  }

  /**
   * Register a component factory
   */
  registerFactory(type: string, factory: ComponentFactory): void {
    this.factories.set(type, factory);
  }

  /**
   * Get a component by type
   */
  get(type: string): React.ComponentType<any> | undefined {
    return this.components.get(type);
  }

  /**
   * Get a factory by type
   */
  getFactory(type: string): ComponentFactory | undefined {
    return this.factories.get(type);
  }

  /**
   * Check if a component type is registered
   */
  has(type: string): boolean {
    return this.components.has(type) || this.factories.has(type);
  }

  /**
   * Unregister a component type
   */
  unregister(type: string): void {
    this.components.delete(type);
    this.factories.delete(type);
  }

  /**
   * Clear all registered components
   */
  clear(): void {
    this.components.clear();
    this.factories.clear();
  }
}

export const defaultRegistry = new DefaultComponentRegistry();

