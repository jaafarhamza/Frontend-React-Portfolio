import { 
  ApolloClient, 
  InMemoryCache, 
  HttpLink, 
  from, 
  ApolloLink, 
  Observable,
  CombinedGraphQLErrors 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { env } from '@/config/env';
import { storage } from '@/utils/storage';
import { JWTService } from '@/utils/jwt';
import { ROUTES } from '@/utils/constants';
import { csrfService, rateLimiter, RATE_LIMITS } from '@/utils/security';

// HTTP Link
const httpLink = new HttpLink({
  uri: env.apiUrl,
});

// Auth Link - Adds JWT token and CSRF token to headers
const authLink = setContext((_, { headers }) => {
  const token = storage.getToken();
  
  // Check if token is expired
  if (token && JWTService.isExpired(token)) {
    console.warn('Token is expired');
    storage.clearAuth();
    return { headers };
  }

  // Get CSRF token
  const csrfToken = csrfService.getToken();

  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
      ...(csrfToken && { 'x-csrf-token': csrfToken }),
    },
  };
});

// Error Link - Handle GraphQL and network errors
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    // Handle GraphQL errors
    error.errors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );

      // Handle authentication errors
      const isAuthError =
        message.toLowerCase().includes('unauthorized') ||
        message.toLowerCase().includes('unauthenticated') ||
        extensions?.code === 'UNAUTHENTICATED';

      if (isAuthError) {
        console.warn('Authentication error detected, clearing auth data');
        storage.clearAuth();
        
        // Redirect to login only
        if (window.location.pathname !== ROUTES.ADMIN_LOGIN) {
          window.location.href = ROUTES.ADMIN_LOGIN;
        }
      }
    });
  } else {
    // Handle network errors
    console.error('[Network error]:', error);
    
    // Handle network errors (401, 403)
    if ('statusCode' in error) {
      const statusCode = (error as { statusCode: number }).statusCode;
      
      if (statusCode === 401 || statusCode === 403) {
        storage.clearAuth();
        if (window.location.pathname !== ROUTES.ADMIN_LOGIN) {
          window.location.href = ROUTES.ADMIN_LOGIN;
        }
      }
    }
  }
});

// Rate Limiting Link
const rateLimitLink = new ApolloLink((operation, forward) => {
  const operationType = operation.query.definitions[0]?.kind === 'OperationDefinition' 
    ? operation.query.definitions[0].operation 
    : 'query';
  
  const config = operationType === 'mutation' ? RATE_LIMITS.MUTATION : RATE_LIMITS.API;
  const key = `graphql_${operationType}`;
  
  if (!rateLimiter.isAllowed(key, config)) {
    return new Observable((observer) => {
      observer.error(new Error('Rate limit exceeded. Please try again later.'));
    });
  }
  
  return forward(operation);
});

// Logging Link
const loggingLink = new ApolloLink((operation, forward) => {
  if (env.isDevelopment) {
    console.log(`[GraphQL Request] ${operation.operationName}`);
  }
  
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (response) => {
        if (env.isDevelopment) {
          console.log(`[GraphQL Response] ${operation.operationName}`, response);
        }
        observer.next(response);
      },
      error: observer.error.bind(observer),
      complete: observer.complete.bind(observer),
    });
    
    return () => subscription.unsubscribe();
  });
});

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([
    loggingLink,
    rateLimitLink,
    errorLink,
    authLink,
    httpLink,
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  ...(env.isDevelopment && { connectToDevTools: true }),
});
