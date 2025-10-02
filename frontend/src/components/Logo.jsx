import React from 'react'
import { ShipWheelIcon } from 'lucide-react'

const Logo = ({ 
  size = 'medium', 
  showText = true, 
  variant = 'default',
  className = '' 
}) => {
  
  // Size configurations
  const sizeConfig = {
    small: {
      icon: 'size-6',
      text: 'text-lg',
    },
    medium: {
      icon: 'size-8',
      text: 'text-2xl',
    },
    large: {
      icon: 'size-10',
      text: 'text-3xl',
    }
  }

  // Variant configurations
  const variantConfig = {
    default: {
      icon: 'text-primary',
      text: 'text-primary font-extrabold tracking-tight',
      container: 'flex items-center gap-2 sm:gap-3'
    },
    navbar: {
      icon: 'text-primary',
      text: 'text-primary font-bold',
      container: 'flex items-center gap-2 sm:gap-3'
    },
    sidebar: {
      icon: 'text-primary',
      text: 'text-primary font-bold',
      container: 'flex items-center gap-2 sm:gap-3'
    }
  }

  const currentSize = sizeConfig[size]
  const currentVariant = variantConfig[variant]

  return (
    <div className={`${currentVariant.container} ${className}`}>
      <ShipWheelIcon className={`${currentSize.icon} ${currentVariant.icon} transition-colors`} />
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