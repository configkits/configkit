/**
 * Lifecycle management for configuration processing
 */

import type { LifecycleManager, ConfigLifecycleHook } from "./types";

export class DefaultLifecycleManager implements LifecycleManager {
  private hooks: Map<ConfigLifecycleHook, Set<(...args: unknown[]) => void | Promise<void>>>;

  constructor() {
    this.hooks = new Map();
  }

  register(hook: ConfigLifecycleHook, callback: (...args: unknown[]) => void | Promise<void>): void {
    if (!this.hooks.has(hook)) {
      this.hooks.set(hook, new Set());
    }
    this.hooks.get(hook)!.add(callback);
  }

  unregister(hook: ConfigLifecycleHook, callback: (...args: unknown[]) => void | Promise<void>): void {
    const callbacks = this.hooks.get(hook);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  async execute(hook: ConfigLifecycleHook, ...args: unknown[]): Promise<void> {
    const callbacks = this.hooks.get(hook);
    if (callbacks) {
      await Promise.all(Array.from(callbacks).map((cb) => cb(...args)));
    }
  }

  /**
   * Clear all hooks for a specific lifecycle event
   */
  clear(hook: ConfigLifecycleHook): void {
    this.hooks.delete(hook);
  }

  /**
   * Clear all hooks
   */
  clearAll(): void {
    this.hooks.clear();
  }
}

export const defaultLifecycleManager = new DefaultLifecycleManager();

