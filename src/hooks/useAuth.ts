import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/graphql/mutations/auth";
import { storage } from "@/utils/storage";
import { ROUTES } from "@/utils/constants";
import { rateLimiter, RATE_LIMITS } from "@/utils/security";
import type { LoginResponse, LoginInput } from "@/types";

export const useAuth = () => {
  const navigate = useNavigate();

  const [loginMutation, { loading, error, data }] = useMutation<LoginResponse, LoginInput>(LOGIN);

  const login = async (username: string, password: string) => {
    // Check rate limit
    if (!rateLimiter.isAllowed('login', RATE_LIMITS.LOGIN)) {
      return { 
        success: false, 
        error: 'Too many login attempts. Please try again later.' 
      };
    }

    try {
      const result = await loginMutation({
        variables: { username, password },
      });

      if (result.data?.login) {
        const { token, user } = result.data.login;

        // Save auth data with encryption
        storage.setToken(token, true);
        storage.setUser(user, true);

        // Reset rate limiter on successful login
        rateLimiter.reset('login');

        // Redirect to dashboard
        navigate(ROUTES.ADMIN_DASHBOARD);

        return { success: true, user };
      }

      return { success: false, error: "Login failed" };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: err };
    }
  };

  const logout = () => {
    storage.clearAuth();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const isAuthenticated = () => {
    return storage.isAuthenticated();
  };

  return {
    login,
    logout,
    isAuthenticated,
    loading,
    error,
    data,
  };
};
