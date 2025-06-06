import { Server, WifiOff, Eye } from 'lucide-react'
import type { SystemStat } from '../types/dashboard.types'

export const SYSTEM_STATS: readonly SystemStat[] = [
  { 
    label: 'SYSTEM STATUS', 
    value: 'DEGRADED', 
    icon: Server, 
    status: 'error' 
  },
  { 
    label: 'NETWORK INTEGRITY', 
    value: '23%', 
    icon: WifiOff, 
    status: 'warning' 
  },
  { 
    label: 'SURVEILLANCE', 
    value: 'ACTIVE', 
    icon: Eye, 
    status: 'active' 
  },
] as const

export const GRID_PATTERNS = {
  DOT: {
    chars: ['•'],
    defaultClass: 'text-blue-500/10 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center'
  },
  HEX: {
    chars: ['0', '1', 'A', 'F', 'X', 'E', ' ', '9', 'C', 'D'],
    defaultClass: 'text-blue-400/15 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center'
  },
  SQUARE: {
    chars: ['□', '■', '▢', '▣', '◼', '◻'],
    defaultClass: 'text-blue-300/8 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center'
  },
  MATRIX: {
    chars: ['█', '░'],
    defaultClass: 'text-blue-400/10 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center'
  },
  PLUS: {
    chars: ['+'],
    defaultClass: 'text-blue-500/10 text-xs font-mono leading-none w-3 h-3 flex items-center justify-center'
  }
} as const

export const DASHBOARD_ARIA_LABELS = {
  MAIN_CONTAINER: 'Dashboard interface',
  STATUS_SECTION: 'System status overview',
  GRID_PATTERNS: 'Decorative background patterns',
  TERMINAL_SECTION: 'Terminal interface',
  WARNING_MESSAGE: 'Security warning'
} as const 