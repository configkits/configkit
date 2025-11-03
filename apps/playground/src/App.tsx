import React, { useState } from 'react';
import { ConfigRenderer, defaultRegistry } from '@configkits/react';
import { ConfigParser } from '@configkits/core';
import './App.css';

// Register some basic components for demo
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
defaultRegistry.register('h2', ({ children, style, ...props }: any) => (
  <h2 style={style} {...props}>{children}</h2>
));
defaultRegistry.register('p', ({ children, style, ...props }: any) => (
  <p style={style} {...props}>{children}</p>
));

const defaultConfig = {
  version: "1.0.0",
  components: [
    {
      id: "header",
      type: "div",
      styles: {
        padding: "20px",
        backgroundColor: "#1a1a1a",
        borderRadius: "8px",
        marginBottom: "20px"
      },
      children: [
        {
          id: "title",
          type: "h1",
          props: {
            children: "Welcome to ConfigKits Playground"
          },
          styles: {
            color: "#fff",
            margin: 0
          }
        },
        {
          id: "description",
          type: "p",
          props: {
            children: "Edit the configuration JSON below to see live changes"
          },
          styles: {
            color: "#aaa",
            marginTop: "10px"
          }
        }
      ]
    },
    {
      id: "button-demo",
      type: "button",
      props: {
        children: "Click me!"
      },
      styles: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px"
      },
      events: [
        {
          type: "onClick",
          handler: "handleClick",
          payload: { message: "Button clicked!" }
        }
      ]
    }
  ]
};

function App() {
  const [configJson, setConfigJson] = useState(JSON.stringify(defaultConfig, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(defaultConfig);
  const parser = new ConfigParser();

  const handleConfigChange = (value: string) => {
    setConfigJson(value);
    try {
      const parsed = parser.parseFromString(value);
      setConfig(parsed);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid configuration');
    }
  };

  const handleEvent = (eventType: string, handler: string, payload?: unknown) => {
    console.log('Event triggered:', { eventType, handler, payload });
    if (handler === 'handleClick') {
      alert('Button clicked! Check console for details.');
    }
  };

  return (
    <div className="app">
      <div className="editor-panel">
        <h2>Configuration Editor</h2>
        <textarea
          value={configJson}
          onChange={(e) => handleConfigChange(e.target.value)}
          className="editor"
          spellCheck={false}
        />
        {error && <div className="error">{error}</div>}
      </div>
      <div className="preview-panel">
        <h2>Preview</h2>
        <div className="preview-content">
          <ConfigRenderer
            config={config.components || []}
            options={{
              onEvent: handleEvent
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

