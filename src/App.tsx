import { RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { router } from './routes';
import { apolloClient } from './graphql/client';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ErrorBoundary>
  );
}

export default App;
