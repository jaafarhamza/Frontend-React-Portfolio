// CSRF Token Management
class CSRFService {
  private tokenKey = 'csrf_token';

  generateToken(): string {
    const token = crypto.randomUUID();
    sessionStorage.setItem(this.tokenKey, token);
    return token;
  }

  getToken(): string | null {
    let token = sessionStorage.getItem(this.tokenKey);
    if (!token) {
      token = this.generateToken();
    }
    return token;
  }

  validateToken(token: string): boolean {
    return token === this.getToken();
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}

// Rate Limiting
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  isAllowed(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    
    // Remove old timestamps
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < config.windowMs
    );

    if (validTimestamps.length >= config.maxRequests) {
      return false;
    }

    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }

  getRemainingRequests(key: string, config: RateLimitConfig): number {
    const now = Date.now();
    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < config.windowMs
    );
    return Math.max(0, config.maxRequests - validTimestamps.length);
  }
}

// XSS Protection
class XSSProtection {
  sanitizeInput(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
    const sanitized = {} as T;
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeInput(value) as T[Extract<keyof T, string>];
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value as Record<string, unknown>) as T[Extract<keyof T, string>];
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}

export const csrfService = new CSRFService();
export const rateLimiter = new RateLimiter();
export const xssProtection = new XSSProtection();

// Rate limit configurations
export const RATE_LIMITS = {
  LOGIN: { maxRequests: 5, windowMs: 60000 }, // 5 requests per minute
  API: { maxRequests: 100, windowMs: 60000 }, // 100 requests per minute
  MUTATION: { maxRequests: 20, windowMs: 60000 }, // 20 mutations per minute
} as const;
