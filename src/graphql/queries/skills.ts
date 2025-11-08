import { gql } from '@apollo/client';
import { SKILL_FIELDS } from '../fragments';

export const GET_SKILLS = gql`
  ${SKILL_FIELDS}
  query GetSkills {
    skills {
      ...SkillFields
    }
  }
`;

export const GET_SKILL_BY_ID = gql`
  ${SKILL_FIELDS}
  query GetSkillById($id: ID!) {
    skill(id: $id) {
      ...SkillFields
    }
  }
`;

export const GET_SKILLS_BY_CATEGORY = gql`
  ${SKILL_FIELDS}
  query GetSkillsByCategory($category: SkillCategory!) {
    skillsByCategory(category: $category) {
      ...SkillFields
    }
  }
`;
