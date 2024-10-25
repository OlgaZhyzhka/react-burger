import React, { ErrorInfo } from 'react'

import { ErrorBoundaryProps, ErrorBoundaryState } from '@/utils/interfaces'

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error!', error)
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Error!', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ups something wrong</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
