import React, { useState } from 'react';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import './index.css';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [languageMode, setLanguageMode] = useState('javascript');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleLanguageModeChange = (e) => {
    setLanguageMode(e.target.value);
  };

  const handleCompile = () => {
    const formData = {
      language_id: getLanguageId(languageMode),
      source_code: getCode(),
      stdin: input,
    };

    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'bcf8bd3783msh81e3181cacf5a89p1283eejsn650e006ba427',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
        setOutput('Some Error');
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      headers: {
        'X-RapidAPI-Key': 'bcf8bd3783msh81e3181cacf5a89p1283eejsn650e006ba427',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        console.log(response.data);
        setOutput(response.data.stdout || response.data.stderr   );
        return;
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const getLanguageId = (language) => {
    switch (language) {
      case 'javascript':
        return 63;
      case 'cpp':
        return 50;
      case 'java':
        return 62;
      default:
        return 63;
    }
  };

  const getCode = () => {
    switch (languageMode) {
      case 'javascript':
        return code;
      case 'cpp':
        return code;
      case 'java':
        return code;
      default:
        return '';
    }
  };

  return (
    <div className="container1">
      <div className="code-editor">
        <Editor
          height="85vh"
          width="100%"
          language={languageMode || "javascript"}
          value={code}
          defaultValue="// some comment"
          onChange={handleCodeChange}
        />
      </div>
      <div className="input-output">
        
        <select value={languageMode} onChange={handleLanguageModeChange}>
          <option value="javascript">JavaScript</option>
          <option value="cpp">C</option>
          <option value="java">Java</option>
        </select>
        <h3>Input:</h3>
        <textarea value={input} onChange={handleInputChange} />
        <button onClick={handleCompile}>Compile</button>
        {output && (
          <div>
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;

