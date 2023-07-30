import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import './index.css';

const Front = () => {
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(`
        <html>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `)
    }, 250);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="container">
      <div className="code-editor">
        <div className="editor-container">
          <div className="editor-title">HTML</div>
          <Editor
            language="html"
            value={htmlCode}
            onChange={setHtmlCode}
            options={{ minimap: { enabled: false } }}
            height="200px"
          />
        </div>
        <div className="editor-container">
          <div className="editor-title">CSS</div>
          <Editor
            language="css"
            value={cssCode}
            onChange={setCssCode}
            options={{ minimap: { enabled: false } }}
            height="200px"
          />
        </div>
        <div className="editor-container">
          <div className="editor-title">JavaScript</div>
          <Editor
            language="javascript"
            value={jsCode}
            onChange={setJsCode}
            options={{ minimap: { enabled: false } }}
            height="200px"
          />
        </div>
      </div>
     
      <iframe srcDoc={output} title="Output" sandbox="allow-scripts" />
    </div>
  );
};

export default Front;
