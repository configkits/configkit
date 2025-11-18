import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { ConfigRenderer, defaultRegistry } from '@configkits/react';
import { ConfigParser } from '@configkits/core';
import type { editor } from 'monaco-editor';
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

interface ConsoleLog {
  id: number;
  type: 'log' | 'warn' | 'error' | 'info' | 'debug';
  message: string;
  timestamp: Date;
  data?: any[];
}

function App() {
  const [configJson, setConfigJson] = useState(JSON.stringify(defaultConfig, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<any>(defaultConfig);
  const [editorErrors, setEditorErrors] = useState<editor.IMarker[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const consoleLogIdRef = useRef(0);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const parser = new ConfigParser();

  // Intercept console methods
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;
    const originalDebug = console.debug;

    const addLog = (type: ConsoleLog['type'], ...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');

      setConsoleLogs(prev => [...prev, {
        id: consoleLogIdRef.current++,
        type,
        message,
        timestamp: new Date(),
        data: args,
      }]);
    };

    console.log = (...args: any[]) => {
      originalLog(...args);
      addLog('log', ...args);
    };

    console.warn = (...args: any[]) => {
      originalWarn(...args);
      addLog('warn', ...args);
    };

    console.error = (...args: any[]) => {
      originalError(...args);
      addLog('error', ...args);
    };

    console.info = (...args: any[]) => {
      originalInfo(...args);
      addLog('info', ...args);
    };

    console.debug = (...args: any[]) => {
      originalDebug(...args);
      addLog('debug', ...args);
    };

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
      console.debug = originalDebug;
    };
  }, []);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;
    
    // Configure JSON language features
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [],
      allowComments: false,
      trailingCommas: 'ignore',
      enableSchemaRequest: false,
    });

    // Listen for validation errors
    monaco.editor.onDidChangeMarkers((uris: readonly import('monaco-editor').Uri[]) => {
      const editorUri = editor.getModel()?.uri;
      if (editorUri && uris.includes(editorUri)) {
        const markers = monaco.editor.getModelMarkers({ resource: editorUri });
        setEditorErrors(markers);
        
        // Show first error in our error display
        if (markers.length > 0) {
          const firstError = markers[0];
          setError(`${firstError.message} (Line ${firstError.startLineNumber})`);
        } else {
          setError(null);
        }
      }
    });
  };

  const handleConfigChange = (value: string | undefined) => {
    if (value === undefined) return;
    
    setConfigJson(value);
    try {
      const parsed = parser.parseFromString(value);
      setConfig(parsed);
      // Clear error if validation passes
      if (editorErrors.length === 0) {
        setError(null);
      }
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

  const clearConsole = () => {
    setConsoleLogs([]);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const getLogIcon = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      case 'info': return 'ℹ️';
      case 'debug': return '🔍';
      default: return '📝';
    }
  };

  const getLogColor = (type: ConsoleLog['type']) => {
    switch (type) {
      case 'error': return '#f85149';
      case 'warn': return '#d29922';
      case 'info': return '#58a6ff';
      case 'debug': return '#8b949e';
      default: return '#c9d1d9';
    }
  };

  return (
    <div className="app">
      <div className="editor-panel">
        <h2>Configuration Editor</h2>
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="json"
            language="json"
            value={configJson}
            onChange={handleConfigChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
              suggestOnTriggerCharacters: true,
              quickSuggestions: {
                other: true,
                comments: false,
                strings: true,
              },
              suggestSelection: 'first',
              acceptSuggestionOnCommitCharacter: true,
              acceptSuggestionOnEnter: 'on',
              snippetSuggestions: 'top',
              tabCompletion: 'on',
              wordBasedSuggestions: 'matchingDocuments',
              // JSON specific
              bracketPairColorization: {
                enabled: true,
              },
              colorDecorators: true,
            }}
          />
        </div>
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
        <div className="console-viewer">
          <div className="console-header" onClick={() => setIsConsoleMinimized(!isConsoleMinimized)}>
            <div className="console-header-left">
              <span className="console-icon">🖥️</span>
              <span className="console-title">Console</span>
              {consoleLogs.length > 0 && (
                <span className="console-count">{consoleLogs.length}</span>
              )}
            </div>
            <div className="console-header-right">
              {!isConsoleMinimized && (
                <button 
                  className="console-clear-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearConsole();
                  }}
                  title="Clear console"
                >
                  Clear
                </button>
              )}
              <span className="console-toggle">
                {isConsoleMinimized ? '▼' : '▲'}
              </span>
            </div>
          </div>
          {!isConsoleMinimized && (
            <div className="console-content">
              {consoleLogs.length === 0 ? (
                <div className="console-empty">No console logs yet. Interact with the preview to see logs here.</div>
              ) : (
                <div className="console-logs">
                  {consoleLogs.map((log) => (
                    <div key={log.id} className="console-log" data-type={log.type}>
                      <span className="console-log-icon">{getLogIcon(log.type)}</span>
                      <span className="console-log-time">{formatTimestamp(log.timestamp)}</span>
                      <span 
                        className="console-log-message"
                        style={{ color: getLogColor(log.type) }}
                      >
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

