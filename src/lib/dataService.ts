import navData from "$lib/content/nav.json";
import categoriesData from "$lib/content/categories.json";
import technologiesData from "$lib/content/technologies.json";
import experiencesData from "$lib/content/experiences.json";
import projectsData from "$lib/content/projects.json";

import type {
  CategoriesData,
  Entry,
  ExperienceEntry,
  ExperiencesData,
  NavData,
  ProjectEntry,
  ProjectsData,
  TechnologiesData
} from "./lib.types";

export const { nav } = navData as NavData;
export const { experienceCategories, projectCategories } = categoriesData as CategoriesData;
export const { technologies } = technologiesData as TechnologiesData;
export const { experiences } = experiencesData as ExperiencesData;
export const { projects } = projectsData as ProjectsData;

export const projectsMap = new Map(projects.map((project) => [project.id, project]));

function groupByCategory(items: Entry[]) {
  return items.reduce((acc, item) => {
    if (!acc.has(item.category)) {
      acc.set(item.category, []);
    }
    acc.get(item.category)!.push(item);
    return acc;
  }, new Map<string, Entry[]>());
}

export const projectsByCategoryMap = new Map(groupByCategory(projects)) as Map<
  string,
  ProjectEntry[]
>;

export const experiencesByCategoryMap = new Map(groupByCategory(experiences)) as Map<
  string,
  ExperienceEntry[]
>;
