// Environment configuration with validation
const getEnvVar = (key: string, fallback?: string): string => {
    const value = import.meta.env[key];

    if (!value && !fallback) {
        console.warn(`Environment variable ${key} is not set`);
    }

    return value || fallback || '';
};

export const env = {
    apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:4000/graphql'),
    environment: getEnvVar('VITE_ENV', 'development'),
    isDevelopment: getEnvVar('VITE_ENV', 'development') === 'development',
    isProduction: getEnvVar('VITE_ENV', 'development') === 'production',
    encryptionKey: getEnvVar('VITE_ENCRYPTION_KEY'),
} as const;
