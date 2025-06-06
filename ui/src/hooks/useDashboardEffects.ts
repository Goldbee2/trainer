import { useState, useEffect, useCallback } from 'react'
import type { TerminalHistoryItem } from '../types/dashboard.types'

const INITIAL_TERMINAL_HISTORY: TerminalHistoryItem[] = [
  { text: 'SYSTEM INITIALIZED... [FAILED]', type: 'error' },
  { text: 'CONNECTING TO MAINFRAME... TIMEOUT', type: 'warning' },
  { text: 'SECURITY PROTOCOL: COMPROMISED', type: 'error' },
  { text: 'LAST LOGIN: 12/31/1999 23:59:47', type: 'info' },
  { text: 'WARNING: UNAUTHORIZED ACCESS DETECTED', type: 'warning' },
  { text: '> _', type: 'command' }
]

const TERMINAL_RESPONSES = [
  'COMMAND NOT RECOGNIZED',
  'ACCESS DENIED',
  'ERROR: PERMISSION INSUFFICIENT', 
  'TRACE INITIATED...',
  'CONNECTION UNSTABLE',
  'SYSTEM MALFUNCTION DETECTED'
] as const

export const useDashboardEffects = () => {
  const [terminalInput, setTerminalInput] = useState<string>('')
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>(INITIAL_TERMINAL_HISTORY)
  const [isGlitching, setIsGlitching] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Glitch effect with cleanup
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      const timeoutId = setTimeout(() => setIsGlitching(false), 150)
      
      // Store timeout ID for cleanup
      return () => clearTimeout(timeoutId)
    }, Math.random() * 8000 + 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  // Time update effect
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timeInterval)
  }, [])

  const handleTerminalSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (!terminalInput.trim()) return

    const response = TERMINAL_RESPONSES[Math.floor(Math.random() * TERMINAL_RESPONSES.length)]
    
    setTerminalHistory(prev => [
      ...prev,
      { text: `> ${terminalInput}`, type: 'command' },
      { text: response, type: 'response' }
    ])
    
    setTerminalInput('')
  }, [terminalInput])

  return {
    terminalInput,
    setTerminalInput,
    terminalHistory,
    isGlitching,
    currentTime,
    handleTerminalSubmit
  }
} 