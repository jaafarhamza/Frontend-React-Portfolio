import type { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { EmptyState } from './EmptyState';

interface QueryWrapperProps {
  loading: boolean;
  error?: { message: string };
  data?: unknown;
  children: ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyMessage?: string;
  onRetry?: () => void;
}

export const QueryWrapper = ({
  loading,
  error,
  data,
  children,
  loadingComponent,
  errorComponent,
  emptyMessage,
  onRetry,
}: QueryWrapperProps) => {
  if (loading) {
    return <>{loadingComponent || <LoadingSpinner />}</>;
  }

  if (error) {
    return <>{errorComponent || <ErrorMessage message={error.message} onRetry={onRetry} />}</>;
  }

  if (!data) {
    return <EmptyState message={emptyMessage} />;
  }

  return <>{children}</>;
};
