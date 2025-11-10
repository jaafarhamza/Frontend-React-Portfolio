import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      fullName
      title
      bio
      email
      phone
      location
      avatarUrl
      resumeUrl
      socialLinks {
        platform
        url
      }
    }
  }
`;
