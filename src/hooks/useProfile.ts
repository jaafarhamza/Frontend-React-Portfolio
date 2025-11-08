import { useQuery } from '@apollo/client/react';
import type { QueryResult } from '@apollo/client/react';
import { GET_PROFILE } from '@/graphql/queries';
import type { GetProfileResponse } from '@/types/portfolio.types';

export const useProfile = (): QueryResult<GetProfileResponse> => {
  return useQuery<GetProfileResponse>(GET_PROFILE, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};
