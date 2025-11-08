import { useQuery } from '@apollo/client/react';
import type { QueryResult } from '@apollo/client/react';
import { GET_PORTFOLIO } from '@/graphql/queries';
import type { GetPortfolioResponse } from '@/types/portfolio.types';

export const usePortfolio = (): QueryResult<GetPortfolioResponse> => {
  return useQuery<GetPortfolioResponse>(GET_PORTFOLIO, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};
