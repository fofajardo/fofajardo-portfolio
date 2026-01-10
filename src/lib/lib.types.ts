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

export interface Entry {
  title: string;
  category: string;
  dateStart?: string;
  dateEnd?: string;
  points?: string[];
}

export type ProjectEntry = Entry & {
  id: string;
  subtitle: string;
  url: string;
  isDirect?: boolean;
  technologies?: string[];
  preview: string;
  previewset?: boolean;
  "url-video-demo"?: string;
  content?: string;
};

export type Link = {
  label: string;
  url: string;
};

export type ExperienceEntry = Entry & {
  organization: string;
  description?: string;
  link?: Link;
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
