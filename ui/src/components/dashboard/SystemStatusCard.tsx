import React from 'react'
import { clsx } from 'clsx'
import type { SystemStat } from '../../types/dashboard.types'

interface SystemStatusCardProps {
  stat: SystemStat
  index: number
}

const SystemStatusCard = React.memo<SystemStatusCardProps>(({ stat, index }) => {
  const statusConfig = {
    error: {
      containerClass: 'border-red-500/30 bg-red-500/5',
      badgeClass: 'bg-red-500/20 text-red-300',
      ariaLabel: 'Error status'
    },
    warning: {
      containerClass: 'border-yellow-500/30 bg-yellow-500/5',
      badgeClass: 'bg-yellow-500/20 text-yellow-300',
      ariaLabel: 'Warning status'
    },
    active: {
      containerClass: 'border-green-500/30 bg-green-500/5',
      badgeClass: 'bg-green-500/20 text-green-300',
      ariaLabel: 'Active status'
    }
  }

  const config = statusConfig[stat.status]
  const Icon = stat.icon

  return (
    <article 
      className={clsx(
        'bg-black/20 backdrop-blur-sm border rounded p-3',
        config.containerClass
      )}
      aria-labelledby={`status-label-${index}`}
    >
      <div className="flex items-center justify-between">
        <Icon 
          className="w-4 h-4 opacity-60" 
          aria-hidden="true"
        />
        <span
          className={clsx(
            'text-xs px-2 py-1 rounded',
            config.badgeClass
          )}
          aria-label={`${config.ariaLabel}: ${stat.value}`}
        >
          {stat.value}
        </span>
      </div>
      <div 
        id={`status-label-${index}`}
        className="text-xs text-blue-300/60 mt-1 font-mono tracking-wider"
      >
        {stat.label}
      </div>
    </article>
  )
})

SystemStatusCard.displayName = 'SystemStatusCard'

export default SystemStatusCard 