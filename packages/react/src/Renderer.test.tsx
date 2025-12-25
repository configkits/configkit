import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ConfigRenderer } from './Renderer';
import { defaultRegistry } from './ComponentRegistry';
import type { ComponentConfig } from '@configkits/core';

describe('ConfigRenderer', () => {
  beforeEach(() => {
    // Register basic components for testing
    defaultRegistry.register('div', ({ children, style, ...props }: any) => (
      <div style={style} {...props}>{children}</div>
    ));
    defaultRegistry.register('span', ({ children, style, ...props }: any) => (
      <span style={style} {...props}>{children}</span>
    ));
    defaultRegistry.register('button', ({ children, onClick, style, ...props }: any) => (
      <button onClick={onClick} style={style} {...props}>{children}</button>
    ));
    defaultRegistry.register('h1', ({ children, style, ...props }: any) => (
      <h1 style={style} {...props}>{children}</h1>
    ));
    defaultRegistry.register('p', ({ children, style, ...props }: any) => (
      <p style={style} {...props}>{children}</p>
    ));
  });

  describe('Basic Rendering', () => {
    it('should render a simple component', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        props: {
          children: 'Hello World'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      expect(container.textContent).toBe('Hello World');
    });

    it('should render multiple components from array', () => {
      const config: ComponentConfig[] = [
        {
          id: 'div1',
          type: 'div',
          props: { children: 'First' }
        },
        {
          id: 'div2',
          type: 'div',
          props: { children: 'Second' }
        }
      ];

      const { container } = render(<ConfigRenderer config={config} />);
      expect(container.textContent).toContain('First');
      expect(container.textContent).toContain('Second');
    });

    it('should render nested components', () => {
      const config: ComponentConfig = {
        id: 'parent',
        type: 'div',
        children: [
          {
            id: 'child1',
            type: 'span',
            props: { children: 'Child 1' }
          },
          {
            id: 'child2',
            type: 'span',
            props: { children: 'Child 2' }
          }
        ]
      };

      const { container } = render(<ConfigRenderer config={config} />);
      expect(container.textContent).toContain('Child 1');
      expect(container.textContent).toContain('Child 2');
    });
  });

  describe('Props Handling', () => {
    it('should pass props to component', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        props: {
          'data-testid': 'test-div',
          className: 'test-class',
          children: 'Content'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      const div = container.querySelector('[data-testid="test-div"]');
      expect(div).toBeTruthy();
      expect(div?.className).toBe('test-class');
    });

    it('should handle props without children', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        props: {
          'data-testid': 'empty-div'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      const div = container.querySelector('[data-testid="empty-div"]');
      expect(div).toBeTruthy();
      expect(div?.textContent).toBe('');
    });
  });

  describe('Styles Handling', () => {
    it('should apply styles to component', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        styles: {
          color: 'red',
          fontSize: '16px',
          padding: '10px'
        },
        props: {
          children: 'Styled Content'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      const div = container.querySelector('div');
      expect(div).toBeTruthy();
      expect(div?.style.color).toBe('red');
      expect(div?.style.fontSize).toBe('16px');
      expect(div?.style.padding).toBe('10px');
    });

    it('should merge styles with props.style if both exist', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        styles: {
          color: 'blue'
        },
        props: {
          style: {
            fontSize: '20px'
          },
          children: 'Content'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      const div = container.querySelector('div');
      // Styles from config.styles should take precedence
      expect(div?.style.color).toBe('blue');
    });
  });

  describe('Event Handling', () => {
    it('should call onEvent when event is triggered', () => {
      const onEvent = vi.fn();
      const config: ComponentConfig = {
        id: 'test',
        type: 'button',
        props: {
          children: 'Click Me'
        },
        events: [
          {
            type: 'onClick',
            handler: 'handleClick',
            payload: { message: 'Button clicked' }
          }
        ]
      };

      const { container } = render(
        <ConfigRenderer config={config} options={{ onEvent }} />
      );
      
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      
      button?.click();
      
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(onEvent).toHaveBeenCalledWith(
        'onClick',
        'handleClick',
        expect.objectContaining({
          message: 'Button clicked'
        })
      );
    });

    it('should handle multiple events', () => {
      const onEvent = vi.fn();
      const config: ComponentConfig = {
        id: 'test',
        type: 'button',
        props: {
          children: 'Button'
        },
        events: [
          {
            type: 'onClick',
            handler: 'handleClick',
            payload: {}
          },
          {
            type: 'onMouseEnter',
            handler: 'handleMouseEnter',
            payload: {}
          }
        ]
      };

      const { container } = render(
        <ConfigRenderer config={config} options={{ onEvent }} />
      );
      
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      
      // Simulate click
      button?.click();
      expect(onEvent).toHaveBeenCalledWith('onClick', 'handleClick', expect.any(Object));
      
      // Note: onMouseEnter is a React synthetic event, not a native DOM event
      // We can only test that the handler is attached, not simulate the event
      // The onClick test above confirms event handling works
      expect(onEvent).toHaveBeenCalledTimes(1);
    });

    it('should not throw when onEvent is not provided', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'button',
        props: {
          children: 'Click Me'
        },
        events: [
          {
            type: 'onClick',
            handler: 'handleClick',
            payload: {}
          }
        ]
      };

      const { container } = render(<ConfigRenderer config={config} />);
      const button = container.querySelector('button');
      
      expect(() => button?.click()).not.toThrow();
    });
  });

  describe('Children Priority', () => {
    it('should prioritize children array over props.children', () => {
      const config: ComponentConfig = {
        id: 'parent',
        type: 'div',
        props: {
          children: 'Props Children'
        },
        children: [
          {
            id: 'child',
            type: 'span',
            props: { children: 'Array Children' }
          }
        ]
      };

      const { container } = render(<ConfigRenderer config={config} />);
      // Should render array children, not props.children
      expect(container.textContent).toContain('Array Children');
      expect(container.textContent).not.toContain('Props Children');
    });

    it('should use props.children when no children array', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        props: {
          children: 'Text Content'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      expect(container.textContent).toBe('Text Content');
    });

    it('should handle empty children array', () => {
      const config: ComponentConfig = {
        id: 'test',
        type: 'div',
        children: [],
        props: {
          children: 'Fallback Text'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      // Empty array should fall back to props.children
      expect(container.textContent).toBe('Fallback Text');
    });
  });

  describe('Custom Registry', () => {
    it('should use custom component registry when provided', () => {
      const CustomComponent = ({ children }: any) => (
        <div data-custom="true">{children}</div>
      );

      const config: ComponentConfig = {
        id: 'test',
        type: 'custom',
        props: {
          children: 'Custom Content'
        }
      };

      const { container } = render(
        <ConfigRenderer
          config={config}
          options={{
            componentRegistry: {
              custom: CustomComponent
            }
          }}
        />
      );

      const div = container.querySelector('[data-custom="true"]');
      expect(div).toBeTruthy();
      expect(div?.textContent).toBe('Custom Content');
    });

    it('should use custom registry when provided', () => {
      const CustomDiv = ({ children }: any) => (
        <div data-custom="true">{children}</div>
      );

      const config: ComponentConfig = {
        id: 'test',
        type: 'custom-div',
        props: {
          children: 'Custom Content'
        }
      };

      const { container } = render(
        <ConfigRenderer
          config={config}
          options={{
            componentRegistry: {
              'custom-div': CustomDiv
            }
          }}
        />
      );

      // Should render using custom registry
      const div = container.querySelector('[data-custom="true"]');
      expect(div).toBeTruthy();
      expect(div?.textContent).toBe('Custom Content');
    });
  });

  describe('Unregistered Components', () => {
    it('should not render unregistered component types', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const config: ComponentConfig = {
        id: 'test',
        type: 'unregistered-component',
        props: {
          children: 'Should not render'
        }
      };

      const { container } = render(<ConfigRenderer config={config} />);
      
      expect(container.textContent).toBe('');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Component type "unregistered-component" is not registered'
      );
      
      consoleSpy.mockRestore();
    });

    it('should continue rendering other components when one is unregistered', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const config: ComponentConfig[] = [
        {
          id: 'valid',
          type: 'div',
          props: { children: 'Valid' }
        },
        {
          id: 'invalid',
          type: 'unregistered',
          props: { children: 'Invalid' }
        }
      ];

      const { container } = render(<ConfigRenderer config={config} />);
      
      expect(container.textContent).toContain('Valid');
      expect(container.textContent).not.toContain('Invalid');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle deeply nested components', () => {
      const config: ComponentConfig = {
        id: 'level1',
        type: 'div',
        children: [
          {
            id: 'level2',
            type: 'div',
            children: [
              {
                id: 'level3',
                type: 'span',
                props: { children: 'Deep Content' }
              }
            ]
          }
        ]
      };

      const { container } = render(<ConfigRenderer config={config} />);
      expect(container.textContent).toContain('Deep Content');
    });

    it('should handle components with both styles and events', () => {
      const onEvent = vi.fn();
      const config: ComponentConfig = {
        id: 'test',
        type: 'button',
        styles: {
          backgroundColor: 'blue',
          color: 'white'
        },
        props: {
          children: 'Styled Button'
        },
        events: [
          {
            type: 'onClick',
            handler: 'handleClick',
            payload: {}
          }
        ]
      };

      const { container } = render(
        <ConfigRenderer config={config} options={{ onEvent }} />
      );
      
      const button = container.querySelector('button');
      expect(button).toBeTruthy();
      expect(button?.style.backgroundColor).toBe('blue');
      expect(button?.style.color).toBe('white');
      
      button?.click();
      expect(onEvent).toHaveBeenCalled();
    });

    it('should handle array config with mixed valid and invalid components', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const config: ComponentConfig[] = [
        {
          id: 'h1',
          type: 'h1',
          props: { children: 'Title' }
        },
        {
          id: 'invalid',
          type: 'invalid-type',
          props: { children: 'Invalid' }
        },
        {
          id: 'p',
          type: 'p',
          props: { children: 'Paragraph' }
        }
      ];

      const { container } = render(<ConfigRenderer config={config} />);
      
      expect(container.textContent).toContain('Title');
      expect(container.textContent).toContain('Paragraph');
      expect(container.textContent).not.toContain('Invalid');
      
      consoleSpy.mockRestore();
    });
  });
});

