import React, { useState, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isOpen, setIsOpen] = useState(false)

  // All DaisyUI themes with their representative colors
  const themes = [
    { name: 'light', colors: { primary: '#570df8', secondary: '#f000b8', accent: '#37cdbe', bg: '#ffffff' } },
    { name: 'dark', colors: { primary: '#661ae6', secondary: '#d926aa', accent: '#1fb2a5', bg: '#1d232a' } },
    { name: 'cupcake', colors: { primary: '#65c3c8', secondary: '#ef9fbc', accent: '#eeaf3a', bg: '#faf7f5' } },
    { name: 'bumblebee', colors: { primary: '#e0a82e', secondary: '#f9d72f', accent: '#181830', bg: '#ffffff' } },
    { name: 'emerald', colors: { primary: '#66cc8a', secondary: '#377cfb', accent: '#ea5234', bg: '#ffffff' } },
    { name: 'corporate', colors: { primary: '#4b6bfb', secondary: '#7b92b2', accent: '#67cba0', bg: '#ffffff' } },
    { name: 'synthwave', colors: { primary: '#e779c1', secondary: '#58c7f3', accent: '#f3cc30', bg: '#1a103d' } },
    { name: 'retro', colors: { primary: '#ef9995', secondary: '#a4cbb4', accent: '#fbbf24', bg: '#ece3ca' } },
    { name: 'cyberpunk', colors: { primary: '#ff7598', secondary: '#75d1f0', accent: '#c07eec', bg: '#0e0e23' } },
    { name: 'valentine', colors: { primary: '#e96d7b', secondary: '#a991f7', accent: '#88dbdd', bg: '#f0d6e8' } },
    { name: 'halloween', colors: { primary: '#f28c18', secondary: '#6d3a9c', accent: '#51a800', bg: '#1f1a29' } },
    { name: 'garden', colors: { primary: '#5c7f67', secondary: '#ecf4e7', accent: '#9fb4a7', bg: '#ffffff' } },
    { name: 'forest', colors: { primary: '#1eb854', secondary: '#1fd65f', accent: '#1db584', bg: '#171212' } },
    { name: 'aqua', colors: { primary: '#09ecf3', secondary: '#966fb3', accent: '#ffe999', bg: '#3d4451' } },
    { name: 'lofi', colors: { primary: '#0d0d0d', secondary: '#1a1a1a', accent: '#262626', bg: '#f2f2f2' } },
    { name: 'pastel', colors: { primary: '#d1c1d7', secondary: '#f6cbd1', accent: '#b4e9d6', bg: '#ffffff' } },
    { name: 'fantasy', colors: { primary: '#6e0b75', secondary: '#007ebd', accent: '#f28c18', bg: '#f7f4f3' } },
    { name: 'wireframe', colors: { primary: '#b8b8b8', secondary: '#b8b8b8', accent: '#b8b8b8', bg: '#ffffff' } },
    { name: 'black', colors: { primary: '#343232', secondary: '#343232', accent: '#343232', bg: '#000000' } },
    { name: 'luxury', colors: { primary: '#ffffff', secondary: '#152747', accent: '#513448', bg: '#09090b' } },
    { name: 'dracula', colors: { primary: '#ff79c6', secondary: '#bd93f9', accent: '#ffb86c', bg: '#282a36' } },
    { name: 'cmyk', colors: { primary: '#45aeee', secondary: '#e8488a', accent: '#ffc31f', bg: '#ffffff' } },
    { name: 'autumn', colors: { primary: '#8c0327', secondary: '#d85251', accent: '#ffb964', bg: '#f3f4f6' } },
    { name: 'business', colors: { primary: '#1c4ed8', secondary: '#7c2d12', accent: '#dc2626', bg: '#ffffff' } },
    { name: 'acid', colors: { primary: '#ff00ff', secondary: '#ffff00', accent: '#00ffff', bg: '#000000' } },
    { name: 'lemonade', colors: { primary: '#519903', secondary: '#e9e92f', accent: '#ff9903', bg: '#ffffff' } },
    { name: 'night', colors: { primary: '#38bdf8', secondary: '#818cf8', accent: '#f471b5', bg: '#0f172a' } },
    { name: 'coffee', colors: { primary: '#db924b', secondary: '#263e3f', accent: '#10576d', bg: '#1f2937' } },
    { name: 'winter', colors: { primary: '#047aed', secondary: '#463aa2', accent: '#c148ac', bg: '#ffffff' } }
  ]

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Handle theme change
  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName)
    localStorage.setItem('theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.theme-selector-dropdown')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const currentThemeData = themes.find(theme => theme.name === currentTheme) || themes[0]

  return (
    <div className="relative theme-selector-dropdown">
      {/* Current Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 transition-colors text-sm"
      >
        {/* Theme Color Preview */}
        <div className="flex gap-1">
          <div 
            className="w-3 h-3 rounded-full border border-base-300" 
            style={{ backgroundColor: currentThemeData.colors.primary }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full border border-base-300" 
            style={{ backgroundColor: currentThemeData.colors.secondary }}
          ></div>
          <div 
            className="w-3 h-3 rounded-full border border-base-300" 
            style={{ backgroundColor: currentThemeData.colors.accent }}
          ></div>
        </div>
        <span className="hidden sm:inline capitalize">{currentTheme}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 top-full mt-2 w-64 max-h-80 overflow-y-auto bg-base-100 border border-base-300 rounded-lg shadow-xl z-[100]">
          <div className="p-2">
            <div className="text-xs font-semibold text-base-content/70 uppercase tracking-wide mb-2 px-2">
              Choose Theme
            </div>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm hover:bg-base-200 ${
                    currentTheme === theme.name ? 'bg-primary text-primary-content' : ''
                  }`}
                >
                  {/* Theme Color Preview */}
                  <div className="flex gap-1 flex-shrink-0">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: theme.colors.primary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: theme.colors.secondary }}
                    ></div>
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                      style={{ backgroundColor: theme.colors.accent }}
                    ></div>
                  </div>
                  
                  {/* Theme Name */}
                  <span className="flex-1 text-left capitalize">{theme.name}</span>
                  
                  {/* Current Theme Indicator */}
                  {currentTheme === theme.name && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSelector