export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="text-[300px] font-mono font-bold text-gray-600">
              {'</>'}
            </div>
          </div>
          
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-gray-400 via-gray-900 to-black animate-pulse">
              404
            </h1>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <div className="inline-block bg-white/50 backdrop-blur-sm border-2 border-gray-300 rounded-2xl px-8 py-6 shadow-lg">
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </p>
            <p className="font-mono text-sm text-gray-600">
              {'// '}The page you're looking for doesn't exist
            </p>
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Go Home Button */}
        <a
          href="/"
          className="group relative inline-flex items-center gap-2 overflow-hidden bg-linear-to-r from-gray-800 to-black text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Go Home</span>
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-black to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </a>

        {/* Helper Links */}
        <div className="mt-12 flex justify-center gap-6 text-sm">
          <a href="/projects" className="text-gray-600 hover:text-black transition-colors font-mono">
            {'→ '}Projects
          </a>
          <a href="/skills" className="text-gray-600 hover:text-black transition-colors font-mono">
            {'→ '}Skills
          </a>
          <a href="/experience" className="text-gray-600 hover:text-black transition-colors font-mono">
            {'→ '}Experience
          </a>
        </div>
      </div>
    </div>
  );
}
