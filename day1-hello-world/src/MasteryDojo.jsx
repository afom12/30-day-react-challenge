import { useState, useEffect, useMemo, useCallback } from 'react';
import './MasteryDojo.css';

function JsxMasteryDojo() {
  const [dojoState, setDojoState] = useState({
    // Advanced state management
    masterLevel: 1,
    xp: 0,
    challenges: [],
    unlockedPowers: [],
    
    // Real-world simulation
    apiData: null,
    loadingStates: {},
    errors: {},
    
    // Advanced patterns
    renderCount: 0,
    optimizationEnabled: false,
    virtualDomDemo: []
  });

  // 🎯 ADVANCED HOOKS USAGE
  const computedStats = useMemo(() => ({
    level: Math.floor(dojoState.xp / 100) + 1,
    nextLevelXp: (Math.floor(dojoState.xp / 100) + 1) * 100,
    progress: ((dojoState.xp % 100) / 100) * 100,
    powersCount: dojoState.unlockedPowers.length,
    isMaster: dojoState.xp > 500
  }), [dojoState.xp, dojoState.unlockedPowers]);

  // 🔥 CUSTOM HOOK SIMULATION
  const useDojoPower = (powerName) => {
    const [isActive, setIsActive] = useState(false);
    
    const activate = useCallback(() => {
      setIsActive(true);
      setDojoState(prev => ({
        ...prev,
        xp: prev.xp + 10,
        unlockedPowers: [...new Set([...prev.unlockedPowers, powerName])]
      }));
    }, [powerName]);

    return [isActive, activate];
  };

  // Using our custom hook
  const [isTeleportActive, activateTeleport] = useDojoPower('teleport');
  const [isInvisible, activateInvisibility] = useDojoPower('invisibility');

  // 🚀 REAL-WORLD PATTERNS
  const simulateApiCall = useCallback(async (endpoint) => {
    setDojoState(prev => ({
      ...prev,
      loadingStates: { ...prev.loadingStates, [endpoint]: true }
    }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = {
      users: [{ id: 1, name: 'JSX Master' }, { id: 2, name: 'React Ninja' }],
      posts: [{ id: 1, title: 'Mastering JSX' }, { id: 2, title: 'React Patterns' }]
    };

    setDojoState(prev => ({
      ...prev,
      apiData: { ...prev.apiData, [endpoint]: mockData[endpoint] },
      loadingStates: { ...prev.loadingStates, [endpoint]: false }
    }));
  }, []);

  // 🎮 ADVANCED INTERACTIONS
  const completeChallenge = useCallback((challenge) => {
    setDojoState(prev => {
      const newXp = prev.xp + challenge.xpReward;
      const newLevel = Math.floor(newXp / 100) + 1;
      
      return {
        ...prev,
        xp: newXp,
        masterLevel: newLevel,
        challenges: prev.challenges.map(c => 
          c.id === challenge.id ? { ...c, completed: true } : c
        ),
        renderCount: prev.renderCount + 1
      };
    });
  }, []);

  // 📊 VIRTUAL DOM DEMO
  const addVirtualNode = useCallback(() => {
    setDojoState(prev => ({
      ...prev,
      virtualDomDemo: [
        ...prev.virtualDomDemo,
        {
          id: Date.now(),
          type: 'div',
          props: { className: `node-${prev.virtualDomDemo.length}` },
          children: [`Node ${prev.virtualDomDemo.length}`]
        }
      ]
    }));
  }, []);

  // 🎯 MASTERY CHALLENGES
  const masteryChallenges = [
    {
      id: 1,
      name: "Conditional Rendering Master",
      description: "Use 3 different conditional patterns",
      xpReward: 50,
      completed: false
    },
    {
      id: 2,
      name: "List Rendering Expert", 
      description: "Render a complex nested list",
      xpReward: 75,
      completed: false
    },
    {
      id: 3,
      name: "State Management Guru",
      description: "Manage multiple interconnected states",
      xpReward: 100,
      completed: false
    }
  ];

  // 🎨 ADVANCED STYLING PATTERNS
  const masteryStyles = useMemo(() => ({
    container: {
      background: `linear-gradient(135deg, 
        hsl(${computedStats.level * 30}, 70%, 60%) 0%,
        hsl(${computedStats.level * 30 + 60}, 70%, 40%) 100%)`,
      minHeight: '100vh',
      padding: '2rem',
      color: 'white'
    },
    xpBar: {
      width: `${computedStats.progress}%`,
      height: '10px',
      background: 'linear-gradient(90deg, #ffd700, #ff6b6b)',
      borderRadius: '5px',
      transition: 'width 0.5s ease'
    },
    powerBadge: {
      background: 'rgba(255,255,255,0.2)',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      border: '2px solid rgba(255,255,255,0.3)',
      backdropFilter: 'blur(10px)'
    }
  }), [computedStats.level, computedStats.progress]);

  return (
    <div style={masteryStyles.container}>
      {/* 🏆 MASTERY HEADER */}
      <header className="mastery-header">
        <h1>⚔️ JSX Mastery Dojo</h1>
        <div className="mastery-stats">
          <div className="level-display">
            <h2>Level {computedStats.level}</h2>
            <div className="xp-container">
              <div style={masteryStyles.xpBar}></div>
              <span>{computedStats.progress.toFixed(1)}% to Level {computedStats.level + 1}</span>
            </div>
          </div>
          <div className="powers-display">
            <h3>Unlocked Powers: {computedStats.powersCount}</h3>
            {computedStats.isMaster && <div className="master-badge">🏆 GRAND MASTER</div>}
          </div>
        </div>
      </header>

      {/* 🎯 CHALLENGE ARENA */}
      <section className="dojo-section">
        <h2>🎯 Mastery Challenges</h2>
        <div className="challenges-grid">
          {masteryChallenges.map(challenge => (
            <div key={challenge.id} className="challenge-card">
              <h3>{challenge.name}</h3>
              <p>{challenge.description}</p>
              <p>Reward: {challenge.xpReward} XP</p>
              {!challenge.completed ? (
                <button 
                  onClick={() => completeChallenge(challenge)}
                  className="challenge-btn"
                >
                  Start Challenge
                </button>
              ) : (
                <div className="completed-badge">✅ Completed</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 POWER UNLOCK SYSTEM */}
      <section className="dojo-section">
        <h2>🔥 JSX Powers</h2>
        <div className="powers-grid">
          <div className="power-card">
            <h3>Teleportation</h3>
            <p>Instant component rendering</p>
            <button 
              onClick={activateTeleport}
              disabled={isTeleportActive}
              className="power-btn"
            >
              {isTeleportActive ? '✅ Active' : '🚀 Activate'}
            </button>
          </div>
          
          <div className="power-card">
            <h3>Invisibility</h3>
            <p>Conditional rendering mastery</p>
            <button 
              onClick={activateInvisibility}
              disabled={isInvisible}
              className="power-btn"
            >
              {isInvisible ? '✅ Active' : '👻 Activate'}
            </button>
          </div>
        </div>

        {/* POWER EFFECTS */}
        {isTeleportActive && (
          <div className="power-effect teleport">
            🚀 Teleporting components across the DOM!
          </div>
        )}
        
        {isInvisible && (
          <div className="power-effect invisibility">
            👻 Components appearing and disappearing magically!
          </div>
        )}
      </section>

      {/* 🌐 REAL-WORLD SIMULATION */}
      <section className="dojo-section">
        <h2>🌐 API Integration Playground</h2>
        <div className="api-controls">
          <button 
            onClick={() => simulateApiCall('users')}
            disabled={dojoState.loadingStates.users}
            className="api-btn"
          >
            {dojoState.loadingStates.users ? '🔄 Loading...' : '👥 Fetch Users'}
          </button>
          
          <button 
            onClick={() => simulateApiCall('posts')} 
            disabled={dojoState.loadingStates.posts}
            className="api-btn"
          >
            {dojoState.loadingStates.posts ? '🔄 Loading...' : '📝 Fetch Posts'}
          </button>
        </div>

        {/* API RESULTS */}
        <div className="api-results">
          {dojoState.apiData?.users && (
            <div className="api-result">
              <h3>Users:</h3>
              {dojoState.apiData.users.map(user => (
                <div key={user.id} className="user-card">
                  {user.name}
                </div>
              ))}
            </div>
          )}
          
          {dojoState.apiData?.posts && (
            <div className="api-result">
              <h3>Posts:</h3>
              {dojoState.apiData.posts.map(post => (
                <div key={post.id} className="post-card">
                  {post.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ⚡ PERFORMANCE DEMO */}
      <section className="dojo-section">
        <h2>⚡ Virtual DOM & Performance</h2>
        <div className="performance-demo">
          <button onClick={addVirtualNode} className="node-btn">
            Add Virtual Node ({dojoState.virtualDomDemo.length})
          </button>
          
          <div className="virtual-dom-visual">
            {dojoState.virtualDomDemo.map(node => (
              <div key={node.id} className="dom-node">
                {node.children}
              </div>
            ))}
          </div>
          
          <div className="render-stats">
            <p>Render Count: {dojoState.renderCount}</p>
            <p>Nodes in Virtual DOM: {dojoState.virtualDomDemo.length}</p>
          </div>
        </div>
      </section>

      {/* 📚 LEARNING NOTES */}
      <section className="dojo-section">
        <h2>📚 Mastery Notes</h2>
        <div className="notes-grid">
          <div className="note-card">
            <h3>🎯 Key Learnings</h3>
            <ul>
              <li>JSX compiles to React.createElement calls</li>
              <li>Keys are essential for list performance</li>
              <li>Fragments reduce DOM pollution</li>
              <li>Conditional rendering has multiple patterns</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h3>🚀 Advanced Patterns</h3>
            <ul>
              <li>Custom hooks for reusable logic</li>
              <li>useMemo for expensive calculations</li>
              <li>useCallback for stable functions</li>
              <li>State normalization techniques</li>
            </ul>
          </div>
          
          <div className="note-card">
            <h3>💡 Pro Tips</h3>
            <ul>
              <li>Always use proper keys in lists</li>
              <li>Keep components small and focused</li>
              <li>Use functional state updates</li>
              <li>Profile performance regularly</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JsxMasteryDojo