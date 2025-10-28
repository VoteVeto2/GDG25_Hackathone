import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 GDG 2025 Hackathon</h1>
        <p className="tagline">Build Something Amazing!</p>
      </header>
      
      <main className="app-main">
        <div className="card">
          <h2>Welcome to Your Hackathon Project</h2>
          <p>This is your starting point. Let's build something great together!</p>
          
          <div className="counter-section">
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>
              Count is {count}
            </button>
            <p className="hint">
              Edit <code>src/App.jsx</code> to get started
            </p>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <h3>⚡ Fast Development</h3>
            <p>Powered by Vite for lightning-fast HMR</p>
          </div>
          <div className="feature">
            <h3>⚛️ React 18</h3>
            <p>Modern React with latest features</p>
          </div>
          <div className="feature">
            <h3>🎨 Ready to Customize</h3>
            <p>Add your own components and style</p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>GDG 2025 Hackathon Project</p>
      </footer>
    </div>
  )
}

export default App
