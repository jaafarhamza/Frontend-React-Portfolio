import { useQuery } from '@apollo/client/react';
import type { QueryResult } from '@apollo/client/react';
import { GET_EXPERIENCES, GET_EXPERIENCE_BY_ID, GET_CURRENT_EXPERIENCES } from '@/graphql/queries';
import type { 
  GetExperiencesResponse, 
  GetExperienceResponse, 
  GetCurrentExperiencesResponse 
} from '@/types/portfolio.types';

export const useExperiences = (): QueryResult<GetExperiencesResponse> => {
  return useQuery<GetExperiencesResponse>(GET_EXPERIENCES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

export const useExperience = (id: string): QueryResult<GetExperienceResponse> => {
  return useQuery<GetExperienceResponse>(GET_EXPERIENCE_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useCurrentExperiences = (): QueryResult<GetCurrentExperiencesResponse> => {
  return useQuery<GetCurrentExperiencesResponse>(GET_CURRENT_EXPERIENCES, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};
