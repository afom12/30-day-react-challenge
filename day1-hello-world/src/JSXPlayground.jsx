import { useState } from 'react';
import './Playground.css';

function JSXPlayground() {
  const [experiments, setExperiments] = useState({
    showAdvanced: false,
    currentTime: new Date().toLocaleTimeString(),
    counter: 0
  });

  // Fun data to play with
  const playgroundData = {
    user: {
      name: "React Explorer",
      level: "JSX Master",
      achievements: ["Components", "Props", "State", "Hooks"]
    },
    numbers: [1, 2, 3, 4, 5],
    colors: ["red", "blue", "green", "purple", "orange"],
    isActive: true
  };

  // Dynamic functions
  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const toggleAdvanced = () => {
    setExperiments(prev => ({ ...prev, showAdvanced: !prev.showAdvanced }));
  };

  const incrementCounter = () => {
    setExperiments(prev => ({ ...prev, counter: prev.counter + 1 }));
  };

  return (
    <div className="playground-container">
      <h1>🔬 JSX Experimentation Lab</h1>
      <p>Welcome to your JSX playground! Let's break things and learn! 💥</p>

      {/* Experiment 1: Dynamic Styling */}
      <div className="experiment-section">
        <h2>🎨 Experiment 1: Dynamic Styling</h2>
        <div style={{
          backgroundColor: getRandomColor(),
          padding: '1rem',
          margin: '1rem 0',
          borderRadius: '10px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          My background color changes randomly!
        </div>
      </div>

      {/* Experiment 2: Complex Expressions */}
      <div className="experiment-section">
        <h2>🧮 Experiment 2: Complex JS Expressions</h2>
        <div className="expression-grid">
          <div className="expression-card">
            <h3>Math Operations</h3>
            <p>2 + 3 * 4 = {2 + 3 * 4}</p>
            <p>Random: {Math.floor(Math.random() * 100)}</p>
            <p>PI: {Math.PI.toFixed(4)}</p>
          </div>
          
          <div className="expression-card">
            <h3>String Manipulation</h3>
            <p>Reverse: {"React".split('').reverse().join('')}</p>
            <p>Uppercase: {"hello world".toUpperCase()}</p>
            <p>Length: {"JavaScript".length} characters</p>
          </div>
          
          <div className="expression-card">
            <h3>Array Operations</h3>
            <p>Sum: {[1, 2, 3, 4, 5].reduce((a, b) => a + b, 0)}</p>
            <p>Joined: {playgroundData.colors.join(' → ')}</p>
            <p>Filtered: {playgroundData.numbers.filter(n => n > 2).join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Experiment 3: Conditional Rendering Patterns */}
      <div className="experiment-section">
        <h2>🎭 Experiment 3: Conditional Rendering</h2>
        
        {/* Ternary Operator */}
        <div style={{ 
          padding: '1rem', 
          backgroundColor: playgroundData.isActive ? '#d4edda' : '#f8d7da',
          border: `2px solid ${playgroundData.isActive ? '#28a745' : '#dc3545'}`
        }}>
          Status: {playgroundData.isActive ? '🟢 Active' : '🔴 Inactive'}
        </div>

        {/* Logical AND Operator */}
        {playgroundData.isActive && (
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e7f3ff' }}>
            This only shows when isActive is true!
          </div>
        )}

        {/* Multiple Conditions */}
        <div style={{ marginTop: '1rem' }}>
          {experiments.counter === 0 && 'Start clicking! 👆'}
          {experiments.counter > 0 && experiments.counter < 5 && `You've clicked ${experiments.counter} times!`}
          {experiments.counter >= 5 && `Wow! ${experiments.counter} clicks! You're on fire! 🔥`}
        </div>
      </div>

      {/* Experiment 4: Interactive JSX */}
      <div className="experiment-section">
        <h2>🎮 Experiment 4: Interactive JSX</h2>
        <button onClick={incrementCounter} className="fun-button">
          Click me! Counter: {experiments.counter}
        </button>
        
        <button onClick={toggleAdvanced} className="fun-button">
          {experiments.showAdvanced ? 'Hide' : 'Show'} Advanced Experiments
        </button>

        {/* Show/hide based on state */}
        {experiments.showAdvanced && (
          <div className="advanced-experiments">
            <h3>🔬 Advanced JSX Magic</h3>
            
            {/* Nested Mapping */}
            <div>
              <h4>Nested Data Rendering</h4>
              {playgroundData.user.achievements.map((achievement, index) => (
                <span 
                  key={index}
                  style={{
                    backgroundColor: playgroundData.colors[index],
                    color: 'white',
                    padding: '0.5rem 1rem',
                    margin: '0.5rem',
                    borderRadius: '20px',
                    display: 'inline-block'
                  }}
                >
                  {achievement} {index + 1}️⃣
                </span>
              ))}
            </div>

            {/* Dynamic Component Creation */}
            <div style={{ marginTop: '1rem' }}>
              <h4>Dynamic Elements</h4>
              {Array.from({ length: experiments.counter }, (_, i) => (
                <div 
                  key={i}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: playgroundData.colors[i % playgroundData.colors.length],
                    display: 'inline-block',
                    margin: '5px',
                    borderRadius: '50%',
                    textAlign: 'center',
                    lineHeight: '50px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Experiment 5: JSX Fragments */}
      <div className="experiment-section">
        <h2>🧩 Experiment 5: JSX Fragments</h2>
        <>
          <p>This content is wrapped in a Fragment!</p>
          <p>No extra DOM element is created.</p>
          <p>Check the Elements tab in DevTools! 🔍</p>
        </>
      </div>

      {/* Live Time Display */}
      <div className="experiment-section">
        <h2>⏰ Bonus: Live JSX</h2>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <p>Today is: {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>
    </div>
  );
}

export default JSXPlayground;