import { gql } from '@apollo/client';

export const CREATE_EXPERIENCE = gql`
  mutation CreateExperience($input: CreateExperienceInput!) {
    createExperience(input: $input) {
      id
      position
      company
      companyUrl
      location
      employmentType
      startDate
      endDate
      current
      description
      responsibilities
      achievements
      skills {
        id
        name
      }
    }
  }
`;

export const UPDATE_EXPERIENCE = gql`
  mutation UpdateExperience($id: ID!, $input: UpdateExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      position
      company
      companyUrl
      location
      employmentType
      startDate
      endDate
      current
      description
      responsibilities
      achievements
      skills {
        id
        name
      }
    }
  }
`;

export const DELETE_EXPERIENCE = gql`
  mutation DeleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;
