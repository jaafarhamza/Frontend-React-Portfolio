import { gql } from '@apollo/client';
import { PROFILE_FIELDS, PROJECT_FIELDS, SKILL_FIELDS, EXPERIENCE_FIELDS } from '../fragments';

export const GET_PORTFOLIO = gql`
  ${PROFILE_FIELDS}
  ${PROJECT_FIELDS}
  ${SKILL_FIELDS}
  ${EXPERIENCE_FIELDS}
  query GetPortfolio {
    getPortfolio {
      profile {
        ...ProfileFields
      }
      projects {
        ...ProjectFields
      }
      skills {
        ...SkillFields
      }
      experiences {
        ...ExperienceFields
      }
    }
  }
`;
