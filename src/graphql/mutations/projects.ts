import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      imageUrls
      liveUrl
      repoUrl
      featured
      skills {
        id
        name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      imageUrls
      liveUrl
      repoUrl
      featured
      skills {
        id
        name
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;
