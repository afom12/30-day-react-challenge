import { useState, useEffect } from 'react';
import './AdvancedLab.css';

function AdvancedJSXLab() {
  const [labState, setLabState] = useState({
    // Form experiments
    userInput: '',
    email: '',
    age: '',
    comments: '',
    isSubscribed: false,
    selectedColor: '#667eea',
    
    // Dynamic content
    dynamicItems: [],
    liveData: {},
    animationToggle: false,
    
    // Game state
    score: 0,
    gameActive: false,
    
    // Advanced experiments
    nestedData: {
      user: {
        profile: {
          personal: {
            name: "JSX Explorer",
            level: "Advanced"
          }
        }
      }
    }
  });

  // Live clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLabState(prev => ({
        ...prev,
        liveData: {
          time: new Date().toLocaleTimeString(),
          timestamp: Date.now(),
          seconds: Math.floor(Date.now() / 1000)
        }
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Event handlers
  const handleInputChange = (field, value) => {
    setLabState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addDynamicItem = () => {
    const newItem = {
      id: Date.now(),
      text: `Item ${labState.dynamicItems.length + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      size: Math.floor(Math.random() * 50) + 20
    };
    
    setLabState(prev => ({
      ...prev,
      dynamicItems: [...prev.dynamicItems, newItem]
    }));
  };

  const removeItem = (id) => {
    setLabState(prev => ({
      ...prev,
      dynamicItems: prev.dynamicItems.filter(item => item.id !== id)
    }));
  };

  const startGame = () => {
    setLabState(prev => ({ ...prev, gameActive: true, score: 0 }));
    
    const gameInterval = setInterval(() => {
      setLabState(prev => {
        if (!prev.gameActive) {
          clearInterval(gameInterval);
          return prev;
        }
        return { ...prev, score: prev.score + 1 };
      });
    }, 1000);
  };

  const stopGame = () => {
    setLabState(prev => ({ ...prev, gameActive: false }));
  };

  // Complex data transformation
  const userStats = {
    inputLength: labState.userInput.length,
    wordCount: labState.userInput.split(/\s+/).filter(word => word.length > 0).length,
    charCount: labState.userInput.replace(/\s/g, '').length,
    isLongText: labState.userInput.length > 50
  };

  // Dynamic styles based on state
  const dynamicStyles = {
    header: {
      background: `linear-gradient(135deg, ${labState.selectedColor} 0%, #764ba2 100%)`,
      color: 'white',
      padding: '2rem',
      borderRadius: '15px',
      marginBottom: '2rem',
      transform: labState.animationToggle ? 'scale(1.02)' : 'scale(1)',
      transition: 'all 0.3s ease'
    },
    scoreDisplay: {
      fontSize: `${Math.min(50 + labState.score, 100)}px`,
      color: `hsl(${labState.score * 10}, 70%, 50%)`,
      fontWeight: 'bold',
      transition: 'all 0.5s ease'
    }
  };

  return (
    <div className="advanced-lab">
      {/* Dynamic Header */}
      <header style={dynamicStyles.header}>
        <h1>⚡ Advanced JSX Laboratory</h1>
        <p>Live Time: {labState.liveData.time} | Score: <span style={dynamicStyles.scoreDisplay}>{labState.score}</span></p>
      </header>

      {/* Experiment 1: Interactive Forms with Real-time Feedback */}
      <section className="lab-section">
        <h2>📝 Experiment 1: Smart Form with Live Feedback</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Type something magical:</label>
            <input
              type="text"
              value={labState.userInput}
              onChange={(e) => handleInputChange('userInput', e.target.value)}
              placeholder="Watch the magic happen..."
              className="magic-input"
            />
            
            {/* Real-time text analysis */}
            {labState.userInput && (
              <div className="text-analysis">
                <h4>📊 Text Analysis:</h4>
                <p>Length: {userStats.inputLength} characters</p>
                <p>Words: {userStats.wordCount}</p>
                <p>Non-space: {userStats.charCount} characters</p>
                <p style={{ color: userStats.isLongText ? '#28a745' : '#dc3545' }}>
                  {userStats.isLongText ? '📖 Long text!' : '📝 Short text'}
                </p>
                
                {/* Dynamic content based on input */}
                {userStats.inputLength > 0 && (
                  <div className="input-preview">
                    <strong>Preview:</strong> 
                    <span style={{ 
                      fontSize: `${Math.min(userStats.inputLength / 2 + 14, 30)}px`,
                      color: labState.selectedColor,
                      marginLeft: '10px'
                    }}>
                      {labState.userInput}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Choose your magic color:</label>
            <input
              type="color"
              value={labState.selectedColor}
              onChange={(e) => handleInputChange('selectedColor', e.target.value)}
              className="color-picker"
            />
            <div 
              className="color-preview"
              style={{ backgroundColor: labState.selectedColor }}
            >
              {labState.selectedColor}
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={labState.isSubscribed}
                onChange={(e) => handleInputChange('isSubscribed', e.target.checked)}
              />
              Enable Magic Animations ✨
            </label>
            
            <button 
              onClick={() => setLabState(prev => ({ ...prev, animationToggle: !prev.animationToggle }))}
              className={`animation-btn ${labState.animationToggle ? 'active' : ''}`}
            >
              {labState.animationToggle ? '🌀 Animating!' : '⚡ Toggle Animation'}
            </button>
          </div>
        </div>
      </section>

      {/* Experiment 2: Dynamic Item Generator */}
      <section className="lab-section">
        <h2>🎲 Experiment 2: Dynamic Item Factory</h2>
        
        <button onClick={addDynamicItem} className="generate-btn">
          🏭 Generate Magic Item
        </button>
        
        <div className="items-grid">
          {labState.dynamicItems.map((item, index) => (
            <div 
              key={item.id}
              className="dynamic-item"
              style={{
                backgroundColor: item.color,
                width: `${item.size}px`,
                height: `${item.size}px`,
                fontSize: `${Math.max(item.size / 4, 12)}px`,
                transform: `rotate(${index * 10}deg)`,
                animation: labState.animationToggle ? 'pulse 2s infinite' : 'none'
              }}
              onClick={() => removeItem(item.id)}
            >
              {item.text}
              <span className="item-id">#{index + 1}</span>
            </div>
          ))}
        </div>
        
        {labState.dynamicItems.length === 0 && (
          <p className="empty-state">No items yet! Click the button to create some magic! ✨</p>
        )}
      </section>

      {/* Experiment 3: Interactive Game */}
      <section className="lab-section">
        <h2>🎮 Experiment 3: JSX Clicker Game</h2>
        
        <div className="game-controls">
          {!labState.gameActive ? (
            <button onClick={startGame} className="start-btn">
              🚀 Start Score Adventure!
            </button>
          ) : (
            <button onClick={stopGame} className="stop-btn">
              ⏹️ Stop Game
            </button>
          )}
        </div>
        
        <div className="game-stats">
          <div className="stat-card">
            <h3>Current Score</h3>
            <div className="score" style={dynamicStyles.scoreDisplay}>
              {labState.score}
            </div>
          </div>
          
          <div className="stat-card">
            <h3>Score Level</h3>
            <p className="level">
              {labState.score < 10 ? '🌱 Beginner' : 
               labState.score < 30 ? '🚀 Intermediate' : 
               labState.score < 60 ? '🔥 Advanced' : 
               '🏆 JSX Master!'}
            </p>
          </div>
          
          <div className="stat-card">
            <h3>Time Alive</h3>
            <p className="time-alive">{labState.score} seconds</p>
          </div>
        </div>
      </section>

      {/* Experiment 4: Nested Data Exploration */}
      <section className="lab-section">
        <h2>🏗️ Experiment 4: Deep Data Diving</h2>
        
        <div className="nested-data">
          <h3>User Profile Structure:</h3>
          <pre className="data-display">
            {JSON.stringify(labState.nestedData, null, 2)}
          </pre>
          
          {/* Accessing deeply nested data */}
          <div className="deep-access">
            <h4>Direct Access Examples:</h4>
            <p>Name: {labState.nestedData.user.profile.personal.name}</p>
            <p>Level: 
              <span style={{
                color: labState.nestedData.user.profile.personal.level === 'Advanced' ? '#28a745' : '#dc3545',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}>
                {labState.nestedData.user.profile.personal.level}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Experiment 5: Conditional Rendering Madness */}
      <section className="lab-section">
        <h2>🎭 Experiment 5: Conditional Magic Show</h2>
        
        <div className="conditional-show">
          {/* Multiple conditions */}
          {labState.score > 0 && labState.userInput.length > 0 && (
            <div className="condition-met">
              🎉 You have a score AND text input! Double achievement!
            </div>
          )}
          
          {/* Switch-like rendering */}
          <div className="score-message">
            {labState.score === 0 && 'Start the game to see messages! 🎮'}
            {labState.score > 0 && labState.score <= 10 && 'Getting started! 🌟'}
            {labState.score > 10 && labState.score <= 30 && 'Youre on fire! 🔥'}
            {labState.score > 30 && labState.score <= 50 && 'Unstoppable! 💪'}
            {labState.score > 50 && 'JSX LEGEND! 🏆'}
          </div>
          
          {/* Dynamic component based on state */}
          <div className="dynamic-component">
            {labState.dynamicItems.length > 3 ? (
              <div className="many-items">
                🏗️ Architecture Master! You built {labState.dynamicItems.length} items!
              </div>
            ) : labState.dynamicItems.length > 0 ? (
              <div className="some-items">
                🛠️ Keep building! You have {labState.dynamicItems.length} items!
              </div>
            ) : (
              <div className="no-items">
                🎨 Create your first item to see this change!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Data Stream */}
      <section className="lab-section">
        <h2>📡 Live Data Stream</h2>
        <div className="live-data-stream">
          <div className="data-item">
            <strong>Timestamp:</strong> {labState.liveData.timestamp}
          </div>
          <div className="data-item">
            <strong>Seconds since epoch:</strong> {labState.liveData.seconds}
          </div>
          <div className="data-item">
            <strong>Input Characters:</strong> {userStats.inputLength}
          </div>
          <div className="data-item">
            <strong>Dynamic Items:</strong> {labState.dynamicItems.length}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdvancedJSXLab;