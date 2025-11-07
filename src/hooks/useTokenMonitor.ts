import { useEffect, useState, useCallback } from 'react';
import { JWTService } from '@/utils/jwt';
import { storage } from '@/utils/storage';

interface TokenStatus {
  isValid: boolean;
  isExpired: boolean;
  willExpireSoon: boolean;
  timeLeft: string;
  userRole: string | null;
}

// Custom hook to monitor JWT token status
export const useTokenMonitor = (refreshThresholdMinutes = 5) => {
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>({
    isValid: false,
    isExpired: true,
    willExpireSoon: false,
    timeLeft: 'No token',
    userRole: null,
  });

  const updateTokenStatus = useCallback(() => {
    const token = storage.getToken();

    if (!token) {
      setTokenStatus({
        isValid: false,
        isExpired: true,
        willExpireSoon: false,
        timeLeft: 'No token',
        userRole: null,
      });
      return;
    }

    const isValid = JWTService.isValid(token);
    const isExpired = JWTService.isExpired(token);
    const willExpireSoon = JWTService.willExpireSoon(token, refreshThresholdMinutes);
    const userRole = JWTService.getUserRole(token);

    // Calculate time left
    let timeLeft = 'Expired';
    if (!isExpired) {
      const time = JWTService.getTimeUntilExpiry(token);
      if (time) {
        if (time.days > 0) {
          timeLeft = `${time.days}d ${time.hours}h`;
        } else if (time.hours > 0) {
          timeLeft = `${time.hours}h ${time.minutes}m`;
        } else if (time.minutes > 0) {
          timeLeft = `${time.minutes}m ${time.seconds}s`;
        } else {
          timeLeft = `${time.seconds}s`;
        }
      }
    }

    setTokenStatus({
      isValid,
      isExpired,
      willExpireSoon,
      timeLeft,
      userRole,
    });
  }, [refreshThresholdMinutes]);

  useEffect(() => {
    // Initial update
    updateTokenStatus();

    // Update every 10 seconds
    const interval = setInterval(updateTokenStatus, 10000);

    return () => clearInterval(interval);
  }, [updateTokenStatus]);

  return tokenStatus;
};
