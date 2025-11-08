import { useQuery } from '@apollo/client/react';
import type { QueryResult } from '@apollo/client/react';
import { GET_PROJECTS, GET_PROJECT_BY_ID, GET_PROJECT_BY_SLUG, GET_FEATURED_PROJECTS } from '@/graphql/queries';
import type { 
  GetProjectsResponse, 
  GetProjectResponse, 
  GetProjectBySlugResponse,
  GetFeaturedProjectsResponse 
} from '@/types/portfolio.types';

export const useProjects = (): QueryResult<GetProjectsResponse> => {
  return useQuery<GetProjectsResponse>(GET_PROJECTS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

export const useProject = (id: string): QueryResult<GetProjectResponse> => {
  return useQuery<GetProjectResponse>(GET_PROJECT_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useProjectBySlug = (slug: string): QueryResult<GetProjectBySlugResponse> => {
  return useQuery<GetProjectBySlugResponse>(GET_PROJECT_BY_SLUG, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useFeaturedProjects = (): QueryResult<GetFeaturedProjectsResponse> => {
  return useQuery<GetFeaturedProjectsResponse>(GET_FEATURED_PROJECTS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};
