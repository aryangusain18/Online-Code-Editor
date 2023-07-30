/*import React from 'react';
import Editor from './Editor';


const App = () => {
  return (
    <div>
      <Editor />
      
    </div>
  );
};

export default App;
*/

import React, { useState } from 'react';
import Editor from './Editor';
import Front from './Front';
import './index.css';
const App = () => {
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showABCComponent, setShowABCComponent] = useState(false);

  const handleCodeEditorClick = () => {
    setShowCodeEditor(true);
    setShowABCComponent(false);
  };

  const handleABCComponentClick = () => {
    setShowCodeEditor(false);
    setShowABCComponent(true);
  };

  return (
    <div>
      <h1>CodeWizard:Unlock your coding Zen</h1>
      <div>
        <button  id="b"onClick={handleCodeEditorClick}>Code Editor</button>
        <button  id ="b" onClick={handleABCComponentClick}>Frontend</button>
      </div>
      {showCodeEditor && <Editor />}
      {showABCComponent && <Front />}
    </div>
  );
};

export default App;
