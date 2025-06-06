export interface SystemStat {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  status: 'error' | 'warning' | 'active'
}

export interface GridPatternProps {
  rows: number
  cols: number
  chars: string[]
  className?: string
}

export interface TerminalHistoryItem {
  text: string
  type: 'command' | 'response' | 'error' | 'warning' | 'success' | 'info'
}

export interface DashboardState {
  terminalInput: string
  terminalHistory: TerminalHistoryItem[]
  isGlitching: boolean
  currentTime: Date
} 