import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      {text && (
        <span className="text-gray-600 font-medium">{text}</span>
      )}
    </div>
  )
}

export default LoadingSpinner
