import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      title
      description
      technologies
      imageUrl
      projectUrl
      githubUrl
      featured
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: ID!) {
    project(id: $id) {
      id
      title
      description
      technologies
      imageUrl
      projectUrl
      githubUrl
      featured
      createdAt
      updatedAt
    }
  }
`;
