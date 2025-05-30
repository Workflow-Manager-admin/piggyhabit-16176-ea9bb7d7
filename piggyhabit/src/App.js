import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn">Template Button</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">AI Workflow Manager Template</div>
            
            <h1 className="title">piggyhabit</h1>
            
            <div className="description">
              Start building your application.
            </div>
            
            <button className="btn btn-large">Button</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;