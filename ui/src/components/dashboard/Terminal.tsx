import React from 'react'
import { clsx } from 'clsx'
import { Terminal as TerminalIcon } from 'lucide-react'
import type { TerminalHistoryItem } from '../../types/dashboard.types'

interface TerminalProps {
  terminalInput: string
  terminalHistory: TerminalHistoryItem[]
  currentTime: Date
  isGlitching: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const getNoiseBackground = (): string => {
  const NOISE_SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
      <filter id="a" x="0" y="0">
        <feTurbulence baseFrequency=".75" stitchTiles="stitch" type="fractalNoise"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <path d="M0 0h300v300H0z" filter="url(#a)" opacity=".05"/>
    </svg>
  `
  return encodeURIComponent(NOISE_SVG)
}

const getLineTypeClasses = (type: TerminalHistoryItem['type']): string => {
  const typeClasses = {
    error: 'text-red-400/80',
    warning: 'text-yellow-400/80',
    success: 'text-green-400/80',
    info: 'text-blue-300/70',
    command: 'text-blue-300/70',
    response: 'text-blue-300/70'
  }
  
  return typeClasses[type] || 'text-blue-300/70'
}

const Terminal = React.memo<TerminalProps>(({
  terminalInput,
  terminalHistory,
  currentTime,
  isGlitching,
  onInputChange,
  onSubmit
}) => {
  return (
    <section
      className={clsx(
        'bg-black/30 backdrop-blur-sm border border-blue-500/10 rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.1)] overflow-hidden relative',
        isGlitching && 'animate-pulse'
      )}
      aria-label="Terminal interface"
    >
      {/* Glitch effect overlay */}
      {isGlitching && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-ping"
          aria-hidden="true"
        />
      )}
      
      {/* Ambient light effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-transparent to-transparent opacity-50"
        aria-hidden="true"
      />
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/30" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-blue-500/30" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-500/30" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/30" aria-hidden="true" />
      
      {/* Terminal header */}
      <header className="bg-gradient-to-r from-blue-950/40 to-indigo-950/40 px-4 py-3 flex items-center justify-between border-b border-blue-500/10">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5" role="presentation">
            <div className="w-2 h-2 rounded-full bg-red-500/50" aria-label="Close" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" aria-label="Minimize" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" aria-label="Maximize" />
          </div>
          <TerminalIcon className="w-3.5 h-3.5 text-blue-300/60" aria-hidden="true" />
          <h1 className="text-xs font-medium tracking-widest text-blue-300/60">
            TERMINAL_4224.EXE
          </h1>
        </div>
        <time 
          className="text-xs text-blue-300/40 font-mono"
          dateTime={currentTime.toISOString()}
        >
          [{currentTime.toISOString().split('T')[0]}]
        </time>
      </header>
      
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm h-[450px] overflow-y-auto relative">
        {/* Enhanced scanline effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent bg-[length:100%_16px] animate-scan"
          aria-hidden="true"
        />
        
        {/* Ambient noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url('data:image/svg+xml,${getNoiseBackground()}')` 
          }}
          aria-hidden="true"
        />
        
        {/* Terminal text */}
        <div className="space-y-1 relative z-10" role="log" aria-live="polite">
          {terminalHistory.map((line, index) => (
            <div 
              key={index} 
              className={clsx(
                'drop-shadow-[0_0_1px_rgba(59,130,246,0.3)]',
                getLineTypeClasses(line.type)
              )}
            >
              {line.text}
            </div>
          ))}
        </div>
        
        <form 
          onSubmit={onSubmit} 
          className="mt-2 flex items-center relative z-10"
          aria-label="Terminal command input"
        >
          <span className="text-blue-300/60 mr-2 animate-pulse" aria-hidden="true">
            {'>'}
          </span>
          <label htmlFor="terminal-input" className="sr-only">
            Enter terminal command
          </label>
          <input
            id="terminal-input"
            type="text"
            value={terminalInput}
            onChange={(e) => onInputChange(e.target.value)}
            className="bg-transparent border-none outline-none flex-1 font-mono text-blue-300/80 placeholder-blue-300/30"
            placeholder="enter command..."
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      
      {/* Bottom status bar */}
      <footer className="bg-black/40 px-4 py-2 border-t border-blue-500/10 flex justify-between items-center text-xs font-mono">
        <span className="text-blue-300/50">SESSION: ANONYMOUS</span>
        <span className="text-blue-300/50">
          UPTIME: {Math.floor(Date.now() / 1000) % 86400}s
        </span>
      </footer>
    </section>
  )
})

Terminal.displayName = 'Terminal'

export default Terminal 