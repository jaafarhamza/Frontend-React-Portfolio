import { gql } from '@apollo/client';

// Reusable GraphQL Fragments for consistent field selection

export const SKILL_FIELDS = gql`
  fragment SkillFields on Skill {
    id
    name
    category
    level
    icon
    createdAt
    updatedAt
  }
`;

export const SKILL_BASIC_FIELDS = gql`
  fragment SkillBasicFields on Skill {
    id
    name
    category
    icon
  }
`;

export const SOCIAL_LINK_FIELDS = gql`
  fragment SocialLinkFields on SocialLink {
    platform
    url
  }
`;

export const PROFILE_FIELDS = gql`
  ${SOCIAL_LINK_FIELDS}
  fragment ProfileFields on Profile {
    id
    fullName
    title
    bio
    location
    email
    phone
    avatarUrl
    resumeUrl
    socialLinks {
      ...SocialLinkFields
    }
    createdAt
    updatedAt
  }
`;

export const PROJECT_FIELDS = gql`
  ${SKILL_BASIC_FIELDS}
  fragment ProjectFields on Project {
    id
    title
    slug
    description
    skills {
      ...SkillBasicFields
    }
    repoUrl
    liveUrl
    imageUrls
    startDate
    endDate
    featured
    status
    createdAt
    updatedAt
  }
`;

export const PROJECT_LIST_FIELDS = gql`
  fragment ProjectListFields on Project {
    id
    title
    slug
    description
    imageUrls
    featured
    status
  }
`;

export const EXPERIENCE_FIELDS = gql`
  ${SKILL_BASIC_FIELDS}
  fragment ExperienceFields on Experience {
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
      ...SkillBasicFields
    }
    createdAt
    updatedAt
  }
`;
