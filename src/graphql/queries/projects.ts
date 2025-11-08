import { gql } from '@apollo/client';
import { PROJECT_FIELDS, PROJECT_LIST_FIELDS } from '../fragments';

export const GET_PROJECTS = gql`
  ${PROJECT_FIELDS}
  query GetProjects {
    projects {
      ...ProjectFields
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  ${PROJECT_FIELDS}
  query GetProjectById($id: ID!) {
    project(id: $id) {
      ...ProjectFields
    }
  }
`;

export const GET_PROJECT_BY_SLUG = gql`
  ${PROJECT_FIELDS}
  query GetProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      ...ProjectFields
    }
  }
`;

export const GET_FEATURED_PROJECTS = gql`
  ${PROJECT_LIST_FIELDS}
  query GetFeaturedProjects {
    featuredProjects {
      ...ProjectListFields
    }
  }
`;
