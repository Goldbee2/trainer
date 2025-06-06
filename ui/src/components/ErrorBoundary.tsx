import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

const DefaultErrorFallback: React.FC<{ error: Error; reset: () => void }> = ({ error, reset }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-red-950/20 border border-red-500/30 rounded-lg">
    <h2 className="text-xl font-semibold text-red-300 mb-2">System Error Detected</h2>
    <p className="text-red-400/80 mb-4">The dashboard encountered an unexpected error.</p>
    <details className="mb-4 text-sm text-red-300/60 max-w-md">
      <summary className="cursor-pointer font-mono">Error Details</summary>
      <pre className="mt-2 whitespace-pre-wrap text-xs text-left bg-black/30 p-2 rounded overflow-auto max-h-32">
        {error.message}
      </pre>
    </details>
    <button
      onClick={reset}
      className="px-4 py-2 bg-red-600/80 text-white rounded-md hover:bg-red-600 transition-colors font-mono text-sm"
    >
      RESTART_SYSTEM
    </button>
  </div>
)

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })

    // Log to console in development
    console.error('Error caught by boundary:', error)
    console.error('Error info:', errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} reset={this.handleReset} />
    }

    return this.props.children
  }
}

export default ErrorBoundary 