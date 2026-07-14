import type { Pathname } from "$app/types";

export type NavItem = {
  href: Pathname | string;
  icon: string;
  label: string;
  limitTo?: string;
  rel?: string;
};

export enum CategoryType {
  Project = "project",
  Experience = "experience",
  Technology = "technology",
  IDE = "ide",
  Tool = "tool",
  GraphicDesign = "graphic-design"
}

export interface Tag {
  id: string;
  category: CategoryType;
  name: string;
  icon?: string;
  hideSkill?: boolean;
  hideLink?: boolean;
}

export type Link = {
  label?: string;
  type: string;
  url: Pathname | string;
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
  hasBody?: boolean;
};

export type ExperienceEntry = Entry & {
  organization: string;
  description?: string;
};

export type Technologies = {
  [key: string]: Tag;
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

export type BlogPostMetadata = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  preview?: string;
  ogImage?: string;
  author?: string;
  unlisted?: boolean;
  legacy?: boolean;
  discuss?: {
    reddit?: string;
    twitter?: string;
    facebook?: string;
    mastodon?: string;
  };
};

export type BlogPost = BlogPostMetadata & {
  slug: string;
  year: string;
  month: string;
};
