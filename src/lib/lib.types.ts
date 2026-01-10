export type NavItem = {
  href: string;
  icon: string;
  label: string;
  limitTo?: string;
};

export enum CategoryType {
  Project = "project",
  Experience = "experience"
}

export interface Tag {
  id: string;
  category: CategoryType;
  name: string;
}

export type Link = {
  label?: string;
  type: string;
  url: string;
  icon?: string;
};

export interface Entry {
  title: string;
  tags: string[];
  dateStart?: string;
  dateEnd?: string;
  points?: string[];
  links?: Link[];
}

export type ProjectEntry = Entry & {
  id: string;
  subtitle: string;
  directUrl: string;
  technologies?: string[];
  preview: string;
  previewset?: boolean;
  content?: string;
};

export type ExperienceEntry = Entry & {
  organization: string;
  description?: string;
};

export type Technologies = {
  [key: string]: string;
};

export type NavData = {
  nav: NavItem[];
};

export type TagsData = {
  tags: Tag[];
};

export type ExperiencesData = {
  experiences: ExperienceEntry[];
};

export type ProjectsData = {
  projects: ProjectEntry[];
};

export type TechnologiesData = {
  technologies: Technologies;
};
