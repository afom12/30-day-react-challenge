import { useState } from 'react'
import './App.css'

function App() {
  // Your dynamic data
  const [user] = useState({
    name: "Alex",  // Change to your name!
    age: 25,       // Your age
    favoriteColor: "blue",
    hobbies: ["coding", "reading", "gaming"],
    isDeveloper: true,
    email: "your@email.com",
    location: "Your City", 
    skills: ["JavaScript", "React", "CSS"],
    currentYear: new Date().getFullYear()
  })

  // Dynamic styling based on data
  const profileStyle = {
    backgroundColor: '#f0f8ff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '2rem auto',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }

  const colorStyle = {
    color: user.favoriteColor,
    fontWeight: 'bold'
  }

  return (
    <div style={profileStyle}>
      {/* Basic info with dynamic values */}
      <h1>Hello, I'm {user.name}! 👋</h1>
      <p>Welcome to my Day 2 React project!</p>
      
      {/* Age with conditional message */}
      <h2>About Me</h2>
      <p>I am <strong>{user.age}</strong> years old {user.age >= 18 ? '(adult)' : '(minor)'}</p>
      
      {/* Favorite color with dynamic styling */}
      <p>My favorite color is <span style={colorStyle}>{user.favoriteColor}</span></p>
      
      {/* Dynamic list rendering */}
      <h3>My Hobbies:</h3>
      <ul>
        {user.hobbies.map((hobby, index) => (
          <li key={index}>🎯 {hobby}</li>
        ))}
      </ul>
      
      {/* Conditional rendering */}
      <h3>Career</h3>
      {user.isDeveloper ? (
        <p>🚀 I am a React developer!</p>
      ) : (
        <p>💼 I work in another field</p>
      )}
      
      {/* Using JavaScript expressions */}
      <h3>Fun Facts</h3>
      <p>In {user.currentYear - user.age}, I was born! 🎂</p>
      <p>My name has {user.name.length} letters</p>
      <p>Next year I'll be {user.age + 1}</p>
      
      {/* JSX with calculations */}
      <div style={{marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f4f8'}}>
        <h4>JSX Power Demo 💪</h4>
        <p>2 + 2 = {2 + 2}</p>
        <p>Random number: {Math.random()}</p>
        <p>Uppercase name: {user.name.toUpperCase()}</p>
        <p>First hobby: {user.hobbies[0]}</p>
      </div>
    </div>
  
  )
  
}

export default App