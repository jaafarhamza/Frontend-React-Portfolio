import { useState } from 'react';
import { 
  QueryWrapper, 
  LoadingSpinner, 
  ProfileSkeleton,
  ProjectSkeleton,
  ErrorMessage,
  EmptyState 
} from '@/components/common';

export default function TestStatesPage() {
  const [currentTest, setCurrentTest] = useState<'loading' | 'error' | 'success' | 'empty'>('loading');

  const mockData = currentTest === 'success' ? { user: 'Test User', projects: ['Project 1', 'Project 2'] } : null;
  const mockError = currentTest === 'error' ? { message: 'Network connection failed' } : undefined;
  const isLoading = currentTest === 'loading';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Test Loading & Error States</h1>

        {/* Control Buttons */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setCurrentTest('loading')}
              className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Loading
            </button>
            <button
              onClick={() => setCurrentTest('error')}
              className="px-4 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Error
            </button>
            <button
              onClick={() => setCurrentTest('success')}
              className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Success
            </button>
            <button
              onClick={() => setCurrentTest('empty')}
              className="px-4 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Empty
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Current State: <span className="font-semibold">{currentTest.toUpperCase()}</span>
          </p>
        </div>

        {/* Test Area */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Result:</h2>
          
          <QueryWrapper
            loading={isLoading}
            error={mockError}
            data={mockData}
            onRetry={() => alert('Retry button clicked! In real app, this would refetch data.')}
            emptyMessage="No data available"
          >
            <div className="p-6 bg-green-50 border-2 border-green-200 rounded">
              <h3 className="text-2xl font-bold text-green-800 mb-4">✅ Success State</h3>
              <p className="text-gray-700 mb-2">Data loaded successfully!</p>
              <pre className="bg-white p-4 rounded border text-sm">
                {JSON.stringify(mockData, null, 2)}
              </pre>
            </div>
          </QueryWrapper>
        </div>

        {/* Individual Component Tests */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">Individual Component Tests</h2>

          {/* Loading Spinner */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">LoadingSpinner</h3>
            <LoadingSpinner />
          </div>

          {/* Profile Skeleton */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">ProfileSkeleton</h3>
            <ProfileSkeleton />
          </div>

          {/* Project Skeleton */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">ProjectSkeleton</h3>
            <ProjectSkeleton />
          </div>

          {/* Error Message */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">ErrorMessage</h3>
            <ErrorMessage 
              message="This is a test error message" 
              onRetry={() => alert('Retry clicked!')}
            />
          </div>

          {/* Empty State */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">EmptyState</h3>
            <EmptyState message="No items found" icon="📭" />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📖 How to Test:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click each button above to test different states</li>
            <li>Verify the correct component appears for each state</li>
            <li>Check that animations work (spinner, skeleton pulse)</li>
            <li>Click "Try Again" button in error state</li>
            <li>Scroll down to see individual components</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
