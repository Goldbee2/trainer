import React, { useMemo } from 'react'

// Internal imports
import { useDashboardEffects } from '../hooks/useDashboardEffects'
import GridPattern from './dashboard/GridPattern'
import SystemStatusCard from './dashboard/SystemStatusCard'
import Terminal from './dashboard/Terminal'
import { SYSTEM_STATS, GRID_PATTERNS, DASHBOARD_ARIA_LABELS } from '../constants/dashboard.constants'

const getEncodedNoise = (): string => {
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

const Dashboard: React.FC = () => {
  const {
    terminalInput,
    setTerminalInput,
    terminalHistory,
    isGlitching,
    currentTime,
    handleTerminalSubmit
  } = useDashboardEffects()

  // Memoize background noise to prevent recalculation on every render
  const noiseBackground = useMemo(() => getEncodedNoise(), [])

  return (
    <main 
      className="min-h-screen w-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-blue-300/80 p-6 !m-0 relative overflow-hidden"
      aria-label={DASHBOARD_ARIA_LABELS.MAIN_CONTAINER}
    >
      {/* Background grain effect */}
      <div 
        className="absolute inset-0 opacity-[0.95]" 
        style={{ 
          backgroundImage: `url('data:image/svg+xml,${noiseBackground}')` 
        }}
        aria-hidden="true"
      />
      
      {/* Decorative Grid Patterns */}
      <div aria-label={DASHBOARD_ARIA_LABELS.GRID_PATTERNS}>
        {/* Top-left corner dot grid */}
        <div className="absolute top-12 left-4 space-y-1">
          <GridPattern 
            rows={8} 
            cols={12} 
            chars={GRID_PATTERNS.DOT.chars}
            className={GRID_PATTERNS.DOT.defaultClass}
          />
        </div>
        
        {/* Top-right corner hex pattern */}
        <div className="absolute top-16 right-6 space-y-1">
          <GridPattern 
            rows={12} 
            cols={8} 
            chars={GRID_PATTERNS.HEX.chars}
            className={GRID_PATTERNS.HEX.defaultClass}
          />
        </div>
        
        {/* Middle-left ASCII square grid */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 space-y-0">
          <GridPattern 
            rows={10} 
            cols={6} 
            chars={GRID_PATTERNS.SQUARE.chars}
            className={GRID_PATTERNS.SQUARE.defaultClass}
          />
        </div>
        
        {/* Bottom-left character matrix */}
        <div className="absolute bottom-8 left-4 space-y-0" role="presentation">
          <div className="text-blue-400/10 text-xs font-mono leading-none">
            <div className="flex">{Array.from('[████████g████████]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
            <div className="flex">{Array.from('[████░░░░a████░░░░]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
            <div className="flex">{Array.from('[░░░░████i░░░░████]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
            <div className="flex">{Array.from('[████░░░░n████░░░░]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
            <div className="flex">{Array.from('[░░░░████z░░░░████]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
            <div className="flex">{Array.from('[████████_████████]').map((char, i) => <span key={i} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">{char}</span>)}</div>
          </div>
        </div>
        
        {/* Bottom-right coordinate grid */}
        <div className="absolute bottom-6 right-4 space-y-0" role="presentation">
          <div className="text-blue-500/10 text-xs font-mono leading-none">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex">
                {Array.from({ length: 8 }, (_, j) => (
                  <span key={j} className="w-3 h-3 flex items-center justify-center" aria-hidden="true">+</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Central background texture - diagonal lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/3 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/5 to-transparent" />
      </div>
      
      {/* Side accent lines */}
      <div className="absolute left-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-blue-500/8 to-transparent" aria-hidden="true" />
      <div className="absolute right-0 top-1/3 h-1/3 w-px bg-gradient-to-b from-transparent via-blue-500/6 to-transparent" aria-hidden="true" />
      
      {/* Atmospheric light beams */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-500/20 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" aria-hidden="true" />
      
      {/* Status bar */}
      <header className="absolute top-0 left-0 right-0 h-8 bg-black/60 backdrop-blur-sm border-b border-blue-500/10 flex items-center justify-between px-4 text-xs font-mono">
        <div className="flex items-center space-x-4">
          <span className="text-red-400">◉ COMPROMISED</span>
          <span className="text-blue-300/60">NODE_7734.SYS</span>
        </div>
        <div className="flex items-center space-x-4">
          <time className="text-blue-300/60">{currentTime.toLocaleTimeString()}</time>
          <span className="text-yellow-400 animate-pulse">◉ MONITORING</span>
        </div>
      </header>
      
      <div className="max-w-5xl mx-auto relative z-10 pt-12">
        {/* System status cards */}
        <section 
          className="grid grid-cols-3 gap-4 mb-6"
          aria-label={DASHBOARD_ARIA_LABELS.STATUS_SECTION}
        >
          {SYSTEM_STATS.map((stat, index) => (
            <SystemStatusCard
              key={index}
              stat={stat}
              index={index}
            />
          ))}
        </section>

        {/* Terminal Section */}
        <Terminal
          terminalInput={terminalInput}
          terminalHistory={terminalHistory}
          currentTime={currentTime}
          isGlitching={isGlitching}
          onInputChange={setTerminalInput}
          onSubmit={handleTerminalSubmit}
        />
        
        {/* Footer warning */}
        <footer 
          className="mt-4 text-center text-xs text-red-400/60 font-mono tracking-wider"
          aria-label={DASHBOARD_ARIA_LABELS.WARNING_MESSAGE}
        >
          ⚠ UNAUTHORIZED ACCESS IS BEING MONITORED ⚠
        </footer>
      </div>
    </main>
  )
}

export default Dashboard 