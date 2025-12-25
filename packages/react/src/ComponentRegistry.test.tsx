import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { DefaultComponentRegistry, defaultRegistry } from './ComponentRegistry';
import type { ComponentFactory } from './types';

describe('DefaultComponentRegistry', () => {
  let registry: DefaultComponentRegistry;

  beforeEach(() => {
    registry = new DefaultComponentRegistry();
  });

  describe('register', () => {
    it('should register a component', () => {
      const TestComponent = () => <div>Test</div>;
      registry.register('test', TestComponent);
      
      expect(registry.has('test')).toBe(true);
      expect(registry.get('test')).toBe(TestComponent);
    });

    it('should overwrite existing component registration', () => {
      const Component1 = () => <div>Component 1</div>;
      const Component2 = () => <div>Component 2</div>;
      
      registry.register('test', Component1);
      registry.register('test', Component2);
      
      expect(registry.get('test')).toBe(Component2);
    });

    it('should register multiple components', () => {
      const Button = () => <button>Click</button>;
      const Input = () => <input />;
      const Label = () => <label>Label</label>;
      
      registry.register('button', Button);
      registry.register('input', Input);
      registry.register('label', Label);
      
      expect(registry.has('button')).toBe(true);
      expect(registry.has('input')).toBe(true);
      expect(registry.has('label')).toBe(true);
      expect(registry.get('button')).toBe(Button);
      expect(registry.get('input')).toBe(Input);
      expect(registry.get('label')).toBe(Label);
    });
  });

  describe('get', () => {
    it('should return undefined for unregistered component', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });

    it('should return registered component', () => {
      const TestComponent = () => <div>Test</div>;
      registry.register('test', TestComponent);
      
      expect(registry.get('test')).toBe(TestComponent);
    });
  });

  describe('has', () => {
    it('should return false for unregistered component', () => {
      expect(registry.has('nonexistent')).toBe(false);
    });

    it('should return true for registered component', () => {
      const TestComponent = () => <div>Test</div>;
      registry.register('test', TestComponent);
      
      expect(registry.has('test')).toBe(true);
    });

    it('should return true if factory is registered', () => {
      const factory: ComponentFactory = () => null;
      registry.registerFactory('test', factory);
      
      expect(registry.has('test')).toBe(true);
    });
  });

  describe('unregister', () => {
    it('should remove registered component', () => {
      const TestComponent = () => <div>Test</div>;
      registry.register('test', TestComponent);
      
      expect(registry.has('test')).toBe(true);
      
      registry.unregister('test');
      
      expect(registry.has('test')).toBe(false);
      expect(registry.get('test')).toBeUndefined();
    });

    it('should remove registered factory', () => {
      const factory: ComponentFactory = () => null;
      registry.registerFactory('test', factory);
      
      expect(registry.has('test')).toBe(true);
      
      registry.unregister('test');
      
      expect(registry.has('test')).toBe(false);
      expect(registry.getFactory('test')).toBeUndefined();
    });

    it('should handle unregistering non-existent component', () => {
      expect(() => registry.unregister('nonexistent')).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should remove all registered components', () => {
      const Component1 = () => <div>1</div>;
      const Component2 = () => <div>2</div>;
      const Component3 = () => <div>3</div>;
      
      registry.register('comp1', Component1);
      registry.register('comp2', Component2);
      registry.register('comp3', Component3);
      
      expect(registry.has('comp1')).toBe(true);
      expect(registry.has('comp2')).toBe(true);
      expect(registry.has('comp3')).toBe(true);
      
      registry.clear();
      
      expect(registry.has('comp1')).toBe(false);
      expect(registry.has('comp2')).toBe(false);
      expect(registry.has('comp3')).toBe(false);
    });

    it('should remove all registered factories', () => {
      const factory1: ComponentFactory = () => null;
      const factory2: ComponentFactory = () => null;
      
      registry.registerFactory('factory1', factory1);
      registry.registerFactory('factory2', factory2);
      
      expect(registry.has('factory1')).toBe(true);
      expect(registry.has('factory2')).toBe(true);
      
      registry.clear();
      
      expect(registry.has('factory1')).toBe(false);
      expect(registry.has('factory2')).toBe(false);
    });
  });

  describe('registerFactory', () => {
    it('should register a component factory', () => {
      const factory: ComponentFactory = () => null;
      registry.registerFactory('test', factory);
      
      expect(registry.has('test')).toBe(true);
      expect(registry.getFactory('test')).toBe(factory);
    });

    it('should allow both component and factory for same type', () => {
      const Component = () => <div>Component</div>;
      const factory: ComponentFactory = () => null;
      
      registry.register('test', Component);
      registry.registerFactory('test', factory);
      
      expect(registry.get('test')).toBe(Component);
      expect(registry.getFactory('test')).toBe(factory);
    });
  });

  describe('getFactory', () => {
    it('should return undefined for unregistered factory', () => {
      expect(registry.getFactory('nonexistent')).toBeUndefined();
    });

    it('should return registered factory', () => {
      const factory: ComponentFactory = () => null;
      registry.registerFactory('test', factory);
      
      expect(registry.getFactory('test')).toBe(factory);
    });
  });
});

describe('defaultRegistry', () => {
  it('should be an instance of DefaultComponentRegistry', () => {
    expect(defaultRegistry).toBeDefined();
    expect(defaultRegistry.register).toBeDefined();
    expect(defaultRegistry.get).toBeDefined();
    expect(defaultRegistry.has).toBeDefined();
  });

  it('should allow registering and retrieving components', () => {
    const TestComponent = () => <div>Test</div>;
    defaultRegistry.register('test', TestComponent);
    
    expect(defaultRegistry.has('test')).toBe(true);
    expect(defaultRegistry.get('test')).toBe(TestComponent);
    
    // Cleanup
    defaultRegistry.unregister('test');
  });
});

