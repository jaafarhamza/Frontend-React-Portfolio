interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="max-w-md mx-auto p-8">
    {/* Animated Error Icon */}
    <div className="relative mb-6">
      {/* Pulsing background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full animate-ping opacity-20"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      {/* Error symbol with code theme */}
      <div className="relative flex items-center justify-center h-32">
        <div className="text-6xl font-mono font-bold text-gray-700 animate-bounce">
          {'<!'}
          <span className="text-black">--</span>
          {'>'}
        </div>
      </div>
    </div>

    {/* Error Card */}
    <div className="bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-400 rounded-2xl p-6 shadow-lg">
      {/* Title with icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">Oops! Something went wrong</h3>
      </div>

      {/* Error message with code styling */}
      <div className="bg-white/50 backdrop-blur-sm border border-gray-300 rounded-lg p-4 mb-4">
        <p className="font-mono text-sm text-gray-800">
          <span className="text-black font-bold">Error:</span> {message}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="w-full group relative overflow-hidden bg-linear-to-r from-gray-700 to-black text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin group-hover:animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-black to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      )}

      {/* Helper text */}
      <p className="mt-4 text-xs text-center text-gray-600 font-mono">
        // Check your connection and try again
      </p>
    </div>
  </div>
);
