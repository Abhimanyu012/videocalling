import React, { useState, useEffect } from 'react'

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('light')

  // All DaisyUI themes available (matching your index.css "themes: all" config)
  const themes = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 
    'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 
    'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 
    'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
  ]

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Handle theme change
  const handleThemeChange = (e) => {
    const newTheme = e.target.value
    setCurrentTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <select 
      className="select select-ghost select-sm max-w-xs focus:outline-none bg-transparent"
      value={currentTheme}
      onChange={handleThemeChange}
    >
      {themes.map((theme) => (
        <option key={theme} value={theme}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector