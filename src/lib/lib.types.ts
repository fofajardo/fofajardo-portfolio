import type { Path } from "$app/types";

export type NavItem = {
  href: Path | string;
  icon: string;
  label: string;
  limitTo?: string;
  rel?: string;
};

export type ContactItem = NavItem & {
  subtitle?: string;
  showInNav?: boolean;
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
  lead?: string;
  type: string;
  url: Path | string;
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
  group?: string;
  employmentType?: string;
  location?: string;
  locationType?: string;
  description?: string;
};

export type ExperienceGroupItem = {
  isGroup: boolean;
  group?: string;
  organization?: string;
  locationType?: string;
  location?: string;
  items: ExperienceEntry[];
};

export type Technologies = { [key: string]: Tag };
export type LinkData = { nav: NavItem[]; contacts: ContactItem[] };
export type TagsData = { tags: Tag[] };
export type ExperiencesData = { experiences: ExperienceEntry[] };

export type BlogPostMetadata = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  preview?: string;
  ogImage?: string;
  author?: string;
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

export type DropdownOption = Array<{
  label: string;
  icon: string;
  url?: string;
  onClick?: () => void;
}>;

export type PostsMap = Map<string, Map<string, Map<string, BlogPost>>>;
