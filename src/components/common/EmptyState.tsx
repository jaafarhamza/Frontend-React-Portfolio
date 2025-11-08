interface EmptyStateProps {
  message?: string;
  icon?: string;
}

export const EmptyState = ({ 
  message = 'No data available',
  icon = '📭'
}: EmptyStateProps) => (
  <div className="max-w-lg mx-auto p-12">
    {/* Animated Container */}
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-[200px] font-mono font-bold text-gray-600">
          {'</>'}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-400 rounded-3xl p-12 text-center">
        {/* Floating Icon */}
        <div className="relative inline-block mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gray-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          
          {/* Icon container */}
          <div className="relative">
            <div className="text-8xl animate-bounce" style={{ animationDuration: '2s' }}>
              {icon}
            </div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Nothing here yet
        </h3>
        <p className="text-gray-600 font-mono text-sm mb-6">
          {message}
        </p>

        {/* Decorative code comment */}
        <div className="inline-block bg-white/50 backdrop-blur-sm border border-gray-300 rounded-lg px-4 py-2">
          <p className="font-mono text-xs text-gray-600">
            {'// '}Start adding content to see it here
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  </div>
);
