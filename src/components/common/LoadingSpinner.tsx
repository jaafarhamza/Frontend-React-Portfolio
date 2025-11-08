export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    {/* Animated Code Brackets */}
    <div className="relative w-20 h-20">
      {/* Left Bracket */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-gray-700 animate-pulse">
        {'{'}
      </div>
      {/* Center Dots */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
        <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      {/* Right Bracket */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl font-bold text-black animate-pulse">
        {'}'}
      </div>
    </div>
    {/* Loading Text */}
    <div className="mt-4 flex items-center gap-2">
      <span className="text-sm font-mono text-gray-600">Loading</span>
      <div className="flex gap-1">
        <span className="animate-pulse" style={{ animationDelay: '0ms' }}>.</span>
        <span className="animate-pulse" style={{ animationDelay: '200ms' }}>.</span>
        <span className="animate-pulse" style={{ animationDelay: '400ms' }}>.</span>
      </div>
    </div>
  </div>
);
