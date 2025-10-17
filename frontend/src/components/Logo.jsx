import React from 'react'

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'default',
  className = '' 
}) => {
  
  // Size configurations
  const sizeConfig = {
    small: {
      icon: 'w-6 h-6',
      text: 'text-lg',
    },
    medium: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
    },
    large: {
      icon: 'w-10 h-10',
      text: 'text-3xl',
    }
  }

  // Variant configurations
  const variantConfig = {
    default: {
      container: 'flex items-center gap-2 sm:gap-3',
      text: 'text-primary font-extrabold tracking-tight'
    },
    navbar: {
      container: 'flex items-center gap-2 sm:gap-3',
      text: 'text-primary font-bold'
    },
    sidebar: {
      container: 'flex items-center gap-2 sm:gap-3',
      text: 'text-primary font-bold'
    }
  }

  const currentSize = sizeConfig[size]
  const currentVariant = variantConfig[variant]

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <img 
        src="/logo.svg" 
        alt="VideoCall Logo" 
        className={`${currentSize.icon} transition-transform hover:scale-110`}
      />
      {showText && (
        <span className={`${currentSize.text} ${currentVariant.text} transition-colors`}>
          <span className="hidden sm:inline">Let's</span>
          <span className="text-accent">MEET</span>
        </span>
      )}
    </div>
  )
}

export default Logo