import { gql } from '@apollo/client';
import { EXPERIENCE_FIELDS } from '../fragments';

export const GET_EXPERIENCES = gql`
  ${EXPERIENCE_FIELDS}
  query GetExperiences {
    experiences {
      ...ExperienceFields
    }
  }
`;

export const GET_EXPERIENCE_BY_ID = gql`
  ${EXPERIENCE_FIELDS}
  query GetExperienceById($id: ID!) {
    experience(id: $id) {
      ...ExperienceFields
    }
  }
`;

export const GET_CURRENT_EXPERIENCES = gql`
  ${EXPERIENCE_FIELDS}
  query GetCurrentExperiences {
    currentExperiences {
      ...ExperienceFields
    }
  }
`;
