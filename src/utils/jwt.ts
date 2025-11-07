import { jwtDecode } from 'jwt-decode';

// JWT Payload interface
export interface JWTPayload {
  exp?: number;
  iat?: number;
  sub?: string;
  userId?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export class JWTService {

  static decode(token: string): JWTPayload | null {
    if (!token || typeof token !== 'string') {
      console.warn('Invalid token provided to decode');
      return null;
    }

    try {
      //jwt-decode
      const decoded = jwtDecode<JWTPayload>(token);
      return decoded;
    } catch (primaryError) {
      console.warn('jwt-decode failed, trying fallback decoder:', primaryError);
      
      // Fallback
      try {
        return this.customDecode(token);
      } catch (fallbackError) {
        console.error('Both decoders failed:', fallbackError);
        return null;
      }
    }
  }

  // Custom fallback decoder
  private static customDecode(token: string): JWTPayload | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format');
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  // Validate token format
  static isValidFormat(token: string): boolean {
    if (!token || typeof token !== 'string') return false;
    
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  }

  // Check if token is expired
  static isExpired(token: string, bufferSeconds = 0): boolean {
    if (!this.isValidFormat(token)) return true;

    const payload = this.decode(token);
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= (currentTime + bufferSeconds);
  }

  // Get token expiration time as Date object
  static getExpirationTime(token: string): Date | null {
    const payload = this.decode(token);
    if (!payload || !payload.exp) return null;

    return new Date(payload.exp * 1000);
  }

  // Get token issued time as Date object
  static getIssuedTime(token: string): Date | null {
    const payload = this.decode(token);
    if (!payload || !payload.iat) return null;

    return new Date(payload.iat * 1000);
  }

  // Check if token will expire soon
  static willExpireSoon(token: string, minutesThreshold = 5): boolean {
    const expirationTime = this.getExpirationTime(token);
    if (!expirationTime) return true;

    const now = new Date();
    const diff = expirationTime.getTime() - now.getTime();
    const minutesUntilExpiry = diff / (1000 * 60);

    return minutesUntilExpiry <= minutesThreshold;
  }

  // Get remaining time until token expires
  static getTimeUntilExpiry(token: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  } | null {
    const expirationTime = this.getExpirationTime(token);
    if (!expirationTime) return null;

    const now = new Date();
    const diff = expirationTime.getTime() - now.getTime();
    
    if (diff <= 0) return null;

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, totalSeconds };
  }

  // Get user ID from token
  static getUserId(token: string): string | null {
    const payload = this.decode(token);
    return payload?.userId || payload?.sub || null;
  }

  // Get user email from token
  static getUserEmail(token: string): string | null {
    const payload = this.decode(token);
    return payload?.email || null;
  }

  // Get user role from token
  static getUserRole(token: string): string | null {
    const payload = this.decode(token);
    return payload?.role || null;
  }

  // Check if token has specific role
  static hasRole(token: string, role: string): boolean {
    const userRole = this.getUserRole(token);
    return userRole === role;
  }

  // Get all token
  static getAllClaims(token: string): JWTPayload | null {
    return this.decode(token);
  }

  //Check if token is valid
  static isValid(token: string): boolean {
    return this.isValidFormat(token) && !this.isExpired(token);
  }

  //Get token age
  static getTokenAge(token: string): number | null {
    const issuedTime = this.getIssuedTime(token);
    if (!issuedTime) return null;

    const now = new Date();
    return Math.floor((now.getTime() - issuedTime.getTime()) / 1000);
  }
}
