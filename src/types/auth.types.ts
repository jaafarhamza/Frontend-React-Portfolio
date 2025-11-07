// Authentication Types
export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'VISITOR';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
