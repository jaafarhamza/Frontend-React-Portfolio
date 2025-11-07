// Secure storage utilities
import { STORAGE_KEYS } from './constants';
import type { User } from '@/types';
import { env } from '@/config/env';

type StorageType = 'localStorage' | 'sessionStorage';

class StorageService {
  private storageType: StorageType = 'localStorage';
  private encryptionKey = env.encryptionKey;

  // Simple XOR encryption
  private encrypt(text: string): string {
    return btoa(
      text
        .split('')
        .map((char, i) => 
          String.fromCharCode(char.charCodeAt(0) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length))
        )
        .join('')
    );
  }

  private decrypt(encoded: string): string {
    try {
      const decoded = atob(encoded);
      return decoded
        .split('')
        .map((char, i) => 
          String.fromCharCode(char.charCodeAt(0) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length))
        )
        .join('');
    } catch {
      return encoded;
    }
  }

  private getStorage(): Storage {
    return this.storageType === 'sessionStorage' ? sessionStorage : localStorage;
  }

  // Set storage type
  setStorageType(type: StorageType): void {
    this.storageType = type;
  }

  // Token management
  setToken(token: string, encrypt = true): void {
    try {
      const value = encrypt ? this.encrypt(token) : token;
      this.getStorage().setItem(STORAGE_KEYS.AUTH_TOKEN, value);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  }

  getToken(decrypt = true): string | null {
    try {
      const value = this.getStorage().getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!value) return null;
      return decrypt ? this.decrypt(value) : value;
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }

  removeToken(): void {
    try {
      this.getStorage().removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  // User data management
  setUser(user: User, encrypt = true): void {
    try {
      const jsonStr = JSON.stringify(user);
      const value = encrypt ? this.encrypt(jsonStr) : jsonStr;
      this.getStorage().setItem(STORAGE_KEYS.USER_DATA, value);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  }

  getUser(decrypt = true): User | null {
    try {
      const value = this.getStorage().getItem(STORAGE_KEYS.USER_DATA);
      if (!value) return null;
      const jsonStr = decrypt ? this.decrypt(value) : value;
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  }

  removeUser(): void {
    try {
      this.getStorage().removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Failed to remove user:', error);
    }
  }

  // Clear all auth data
  clearAuth(): void {
    this.removeToken();
    this.removeUser();
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const storage = new StorageService();
