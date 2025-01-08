import React from 'react'
import type { ErrorInfo } from 'react'

import type { ErrorBoundaryProps, ErrorBoundaryState } from '@/utils/interfaces'

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error!', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Error!', error, info)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <h2>Ups something wrong</h2>
    }
    return this.props.children
  }
}

export default ErrorBoundary
