export const LoadingSkeleton = () => (
  <div className="space-y-4 p-4">
    <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded animate-shimmer bg-size-[200%_100%]"></div>
    <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-1/2 animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '100ms' }}></div>
    <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-5/6 animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '200ms' }}></div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="space-y-6 p-6">
    {/* Avatar with gradient border */}
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 bg-linear-to-br from-gray-700 via-gray-900 to-black rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
      <div className="absolute inset-1 bg-white rounded-full"></div>
      <div className="absolute inset-2 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded-full animate-shimmer bg-size-[200%_100%]"></div>
    </div>
    {/* Name */}
    <div className="h-6 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-1/2 animate-shimmer bg-size-[200%_100%]"></div>
    {/* Title */}
    <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-3/4 animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '100ms' }}></div>
    {/* Bio */}
    <div className="space-y-2">
      <div className="h-3 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '200ms' }}></div>
      <div className="h-3 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-5/6 animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '300ms' }}></div>
    </div>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="space-y-4 p-4 border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
    {/* Image with code pattern */}
    <div className="relative h-48 bg-linear-to-br from-gray-100 via-gray-200 to-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-white to-transparent animate-shimmer bg-size-[200%_100%]"></div>
      {/* Code symbols */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <span className="text-6xl font-mono font-bold text-gray-600">{'</>'}</span>
      </div>
    </div>
    {/* Title */}
    <div className="h-6 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-3/4 animate-shimmer bg-size-[200%_100%]"></div>
    {/* Description */}
    <div className="space-y-2">
      <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '100ms' }}></div>
      <div className="h-4 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded w-5/6 animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '200ms' }}></div>
    </div>
    {/* Tags */}
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded-full animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '300ms' }}></div>
      <div className="h-6 w-20 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded-full animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '400ms' }}></div>
      <div className="h-6 w-14 bg-linear-to-br from-gray-200 via-gray-400 to-gray-200 rounded-full animate-shimmer bg-size-[200%_100%]" style={{ animationDelay: '500ms' }}></div>
    </div>
  </div>
);
