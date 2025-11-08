import { gql } from '@apollo/client';
import { PROFILE_FIELDS } from '../fragments';

export const GET_PROFILE = gql`
  ${PROFILE_FIELDS}
  query GetProfile {
    profile {
      ...ProfileFields
    }
  }
`;
