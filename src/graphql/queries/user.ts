import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
      role
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      name
      title
      bio
      email
      phone
      location
      avatar
      socialLinks {
        github
        linkedin
        twitter
      }
    }
  }
`;
