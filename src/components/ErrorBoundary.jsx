import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-brand-dark flex flex-col items-center justify-center p-6 transition-colors">
          <div className="bg-white dark:bg-brand-card border border-red-200 dark:border-red-900/50 p-8 rounded-xl shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-display text-gray-900 dark:text-white mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-brand-muted mb-6">Something went wrong loading this section. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-accent text-brand-dark px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-brand-gold active:scale-95 transition-all shadow"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
