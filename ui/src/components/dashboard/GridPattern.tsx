import React, { useMemo } from 'react'

export interface GridPatternProps {
  rows: number
  cols: number
  chars: readonly string[]
  className?: string
}

const GridPattern = React.memo<GridPatternProps>(({ 
  rows, 
  cols, 
  chars, 
  className = "text-blue-500/10 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center" 
}) => {
  const gridItems = useMemo(() => {
    return Array.from({ length: rows }, (_, row) => 
      Array.from({ length: cols }, (_, col) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        return (
          <span 
            key={`${row}-${col}`} 
            className={className}
            aria-hidden="true"
          >
            {char}
          </span>
        )
      })
    ).map((row, index) => (
      <div key={index} className="flex font-mono" role="presentation">
        {row}
      </div>
    ))
  }, [rows, cols, chars, className])

  return <div role="presentation">{gridItems}</div>
})

GridPattern.displayName = 'GridPattern'

export default GridPattern 