import { gql } from '@apollo/client';

export const CREATE_SKILL = gql`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      id
      name
      category
      level
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {
    updateSkill(id: $id, input: $input) {
      id
      name
      category
      level
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id)
  }
`;
