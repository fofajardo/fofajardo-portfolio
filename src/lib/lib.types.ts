export type NavItem = {
  href: string;
  icon: string;
  label: string;
  limitTo?: string;
};

export interface Category {
  id: string;
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
  category: string;
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

export type Data = {
  nav: NavItem[];
  experienceCategories: Category[];
  experiences: ExperienceEntry[];
  technologies: Technologies;
  projectCategories: Category[];
  projects: ProjectEntry[];
};
