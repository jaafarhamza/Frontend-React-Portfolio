import { Navigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { JWTService } from '@/utils/jwt';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = storage.getToken();
  
  // Check if token exists and is valid
  if (!token || !JWTService.isValid(token)) {
    storage.clearAuth();
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <>{children}</>;
};
