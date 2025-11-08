// Portfolio Domain Types
export type SkillCategory = 'language' | 'framework' | 'library' | 'tool' | 'database' | 'other';

export type ProjectStatus = 'draft' | 'published' | 'archived';

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  skills: Skill[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrls: string[];
  startDate: string;
  endDate?: string;
  featured: boolean;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  companyUrl?: string;
  location: string;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
}

// Query Response Types
export interface GetProfileResponse {
  profile: Profile | null;
}

export interface GetSkillsResponse {
  skills: Skill[];
}

export interface GetSkillResponse {
  skill: Skill | null;
}

export interface GetSkillsByCategoryResponse {
  skillsByCategory: Skill[];
}

export interface GetProjectsResponse {
  projects: Project[];
}

export interface GetProjectResponse {
  project: Project | null;
}

export interface GetProjectBySlugResponse {
  projectBySlug: Project | null;
}

export interface GetFeaturedProjectsResponse {
  featuredProjects: Project[];
}

export interface GetExperiencesResponse {
  experiences: Experience[];
}

export interface GetExperienceResponse {
  experience: Experience | null;
}

export interface GetCurrentExperiencesResponse {
  currentExperiences: Experience[];
}

export interface GetPortfolioResponse {
  getPortfolio: Portfolio;
}
