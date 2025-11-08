import type { ReactNode } from 'react';

interface QueryWrapperProps {
  loading: boolean;
  error?: { message: string };
  data?: unknown;
  children: ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
}

export const QueryWrapper = ({
  loading,
  error,
  data,
  children,
  loadingComponent,
  errorComponent,
}: QueryWrapperProps) => {
  if (loading) {
    return loadingComponent || <div className="loading">Loading...</div>;
  }

  if (error) {
    return errorComponent || (
      <div className="error">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return <div className="no-data">No data available</div>;
  }

  return <>{children}</>;
};
