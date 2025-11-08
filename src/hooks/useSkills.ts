import { useQuery } from '@apollo/client/react';
import type { QueryResult } from '@apollo/client/react';
import { GET_SKILLS, GET_SKILL_BY_ID, GET_SKILLS_BY_CATEGORY } from '@/graphql/queries';
import type { 
  GetSkillsResponse, 
  GetSkillResponse, 
  GetSkillsByCategoryResponse,
  SkillCategory 
} from '@/types/portfolio.types';

export const useSkills = (): QueryResult<GetSkillsResponse> => {
  return useQuery<GetSkillsResponse>(GET_SKILLS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useSkill = (id: string): QueryResult<GetSkillResponse> => {
  return useQuery<GetSkillResponse>(GET_SKILL_BY_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};

export const useSkillsByCategory = (category: SkillCategory): QueryResult<GetSkillsByCategoryResponse> => {
  return useQuery<GetSkillsByCategoryResponse>(GET_SKILLS_BY_CATEGORY, {
    variables: { category },
    skip: !category,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });
};
