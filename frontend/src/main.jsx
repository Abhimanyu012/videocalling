import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>Videocalling App</h1>
      <p>React frontend is ready.</p>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
