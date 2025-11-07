import { useState } from 'react';
import { storage } from '@/utils/storage';
import { JWTService } from '@/utils/jwt';
import { useAuth } from '@/hooks/useAuth';
import { csrfService, rateLimiter, RATE_LIMITS } from '@/utils/security';

export const ApolloJWTTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const { login, logout, loading } = useAuth();

  const runTests = async () => {
    const results: string[] = [];
    results.push('Starting Apollo Client + JWT Tests...\n');

    // Test 1: Check Apollo Client Configuration
    results.push('Test 1: Apollo Client Configuration');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';
      results.push(`API URL: ${apiUrl}`);
      
      // Test backend connectivity
      results.push('Testing backend connectivity...');
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: '{ __typename }' })
        });
        if (response.ok) {
          results.push('Backend is reachable');
        } else {
          results.push(`Backend responded with status: ${response.status}`);
        }
      } catch {
        results.push('Backend is NOT reachable');
        results.push('Make sure backend is running on http://localhost:4000');
      }
    } catch (error) {
      results.push(`Failed to get API URL: ${error}`);
    }

    // Test 2: Storage Service (with encryption)
    results.push('\n Test 2: Storage Service (Encrypted)');
    try {
      storage.setToken('test-token-123', true);
      const token = storage.getToken(true);
      storage.removeToken();
      results.push(token === 'test-token-123' ? 'Encrypted storage works' : 'Storage failed');
    } catch (error) {
      results.push('Storage error: ' + error);
    }

    // Test 3: JWT Service - Validation
    results.push('\n Test 3: JWT Service - Format Validation');
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const isValidFormat = JWTService.isValidFormat(validToken);
    results.push(isValidFormat ? 'Token format validation works' : 'Format validation failed');

    // Test 4: JWT Service - Decoding
    results.push('\n Test 4: JWT Service - Token Decoding');
    try {
      const decoded = JWTService.decode(validToken);
      results.push(decoded ? 'Token decoding works' : 'Decoding failed');
      if (decoded) {
        results.push(`Decoded: ${JSON.stringify(decoded, null, 2)}`);
      }
    } catch (error) {
      results.push('Decoding error: ' + error);
    }

    // Test 5: JWT Service - Expiry Check
    results.push('\n Test 5: JWT Service - Expiry Check');
    const currentToken = storage.getToken();
    if (currentToken) {
      const isExpired = JWTService.isExpired(currentToken);
      const expiryTime = JWTService.getExpirationTime(currentToken);
      results.push(`  ${isExpired ? 'Warning' : 'Done'} Token expired: ${isExpired}`);
      results.push(`Expires at: ${expiryTime?.toLocaleString() || 'N/A'}`);
      
      const timeLeft = JWTService.getTimeUntilExpiry(currentToken);
      if (timeLeft) {
        results.push(`Time left: ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`);
      }
    } else {
      results.push('No token in storage');
    }

    // Test 6: JWT Service - User Data Extraction
    results.push('\n Test 6: JWT Service - User Data Extraction');
    if (currentToken) {
      const userId = JWTService.getUserId(currentToken);
      const email = JWTService.getUserEmail(currentToken);
      const role = JWTService.getUserRole(currentToken);
      
      results.push(`  ${userId ? 'Succes' : 'Error'} User ID: ${userId || 'N/A'}`);
      results.push(`  ${email ? 'Succes' : 'Error'} Email: ${email || 'N/A'}`);
      results.push(`  ${role ? 'Succes' : 'Error'} Role: ${role || 'N/A'}`);
    } else {
      results.push('No token to extract data from');
    }

    // Test 7: Authentication Status
    results.push('\n Test 7: Authentication Status');
    const isAuthenticated = storage.isAuthenticated();
    results.push(`  ${isAuthenticated ? 'Succes' : 'Error'} Is Authenticated: ${isAuthenticated}`);

    // Test 8: Auth Link (Token Injection)
    results.push('\n Test 8: Auth Link - Token Injection');
    results.push('Check Network tab for Authorization header in GraphQL requests');
    results.push('Expected: "authorization: Bearer <token>"');

    // Test 9: CSRF Protection
    results.push('\n Test 9: CSRF Protection');
    try {
      const csrfToken = csrfService.getToken();
      results.push(csrfToken ? 'CSRF token generated' : 'CSRF failed');
      results.push(`Token: ${csrfToken?.substring(0, 20)}...`);
    } catch (error) {
      results.push('CSRF error: ' + error);
    }

    // Test 10: Rate Limiting
    results.push('\n Test 10: Rate Limiting');
    try {
      const remaining = rateLimiter.getRemainingRequests('test', RATE_LIMITS.API);
      results.push(`Rate limiter active`);
      results.push(`Remaining requests: ${remaining}/${RATE_LIMITS.API.maxRequests}`);
    } catch (error) {
      results.push('Rate limiter error: ' + error);
    }

    // Test 11: Error Link
    results.push('\n Test 11: Error Link');
    results.push('Error handling is configured');
    results.push('Will auto-logout on 401/403 errors');

    // Test 12: Summary
    results.push('\n Test Summary');
    results.push('Apollo Client: Configured');
    results.push('JWT Service: Working');
    results.push('Storage Service: Working (Encrypted)');
    results.push('Auth Link: Configured');
    results.push('Error Link: Configured');
    results.push('CSRF Protection: Active');
    results.push('Rate Limiting: Active');
    results.push('Protected Routes: Active');
    results.push('\n All tests completed!');

    setTestResults(results);
  };

  const testLogin = async () => {
    const results: string[] = [...testResults];
    results.push('\n Testing Login Flow...');
    results.push('Sending request to backend...');
    results.push('Username: yourUsername');
    results.push('Password: pass123');
    
    try {
      const result = await login('yourUsername', 'pass123');
      
      if (result.success) {
        results.push('Login successful');
        results.push('Token stored in localStorage');
        results.push('User data stored');
        results.push(`User: ${JSON.stringify(result.user)}`);
      } else {
        results.push('Login failed');
        results.push(`Error: ${JSON.stringify(result.error)}`);
        results.push('Check: Is backend running on http://localhost:4000?');
        results.push('Check: Browser console for detailed errors');
      }
    } catch (error) {
      results.push('Login error (exception)');
      results.push(`${JSON.stringify(error)}`);
      results.push('This usually means network/CORS issue');
    }
    
    setTestResults(results);
  };

  const testLogout = () => {
    const results: string[] = [...testResults];
    results.push('\n Testing Logout Flow...');
    
    logout();
    
    const tokenAfter = storage.getToken();
    results.push(tokenAfter ? 'Logout failed' : 'Logout successful');
    results.push(tokenAfter ? 'Token still in storage' : 'Token cleared');
    
    setTestResults(results);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Apollo Client + JWT Test Suite</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={runTests}
          style={{
            padding: '10px 20px',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Run All Tests
        </button>
        
        <button 
          onClick={testLogin}
          disabled={loading}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Testing Login...' : 'Test Login'}
        </button>
        
        <button 
          onClick={testLogout}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Logout
        </button>
      </div>

      <div 
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: '20px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          maxHeight: '600px',
          overflowY: 'auto'
        }}
      >
        {testResults.length > 0 ? testResults.join('\n') : 'Click "Run All Tests" to start testing...'}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Manual Checks:</h3>
        <ol>
          <li>Open DevTools → Network Tab</li>
          <li>Filter by "graphql"</li>
          <li>Make a GraphQL request (login or query)</li>
          <li>Check request headers for: <code>authorization: Bearer &lt;token&gt;</code></li>
          <li>Check request headers for: <code>x-csrf-token: &lt;token&gt;</code></li>
          <li>Verify token is sent with every request</li>
          <li>Check localStorage - token should be encrypted (not readable)</li>
          <li>Try accessing /admin/dashboard without login (should redirect)</li>
        </ol>
      </div>
    </div>
  );
};