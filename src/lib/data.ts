import data from "$lib/content/data.json";

import type { Data, Entry, ExperienceEntry, ProjectEntry } from "./lib.types";

export const projectsMap = new Map(data.projects.map((project) => [project.id, project]));

function groupByCategory(items: Entry[]) {
  return items.reduce((acc, item) => {
    if (!acc.has(item.category)) {
      acc.set(item.category, []);
    }
    acc.get(item.category)!.push(item);
    return acc;
  }, new Map<string, Entry[]>());
}

export const projectsByCategoryMap = new Map(groupByCategory(data.projects)) as Map<
  string,
  ProjectEntry[]
>;

export const experiencesByCategoryMap = new Map(groupByCategory(data.experiences)) as Map<
  string,
  ExperienceEntry[]
>;

export const { experiences, experienceCategories, nav, projectCategories, projects, technologies } =
  data as Data;
