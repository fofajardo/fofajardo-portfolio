import navData from "$lib/content/nav.json";
import tagsData from "$lib/content/tags.json";
import technologiesData from "$lib/content/technologies.json";
import experiencesData from "$lib/content/experiences.json";
import projectsData from "$lib/content/projects.json";

import type {
  TagsData,
  Entry,
  ExperienceEntry,
  ExperiencesData,
  NavData,
  ProjectEntry,
  ProjectsData,
  TechnologiesData,
  Tag
} from "./lib.types";

export const { nav } = navData as NavData;
export const { tags } = tagsData as TagsData;
export const { technologies } = technologiesData as TechnologiesData;
export const { experiences } = experiencesData as ExperiencesData;
export const { projects } = projectsData as ProjectsData;

export const projectsMap = new Map(projects.map((project) => [project.id, project]));

function groupByTag(items: Entry[]) {
  return items.reduce((acc, item) => {
    for (const tag of item.tags) {
      if (!acc.has(tag)) {
        acc.set(tag, []);
      }
      acc.get(tag)!.push(item);
    }
    return acc;
  }, new Map<string, Entry[]>());
}

export const projectsByTagMap = new Map(groupByTag(projects)) as Map<string, ProjectEntry[]>;

export const experiencesByTagMap = new Map(groupByTag(experiences)) as Map<
  string,
  ExperienceEntry[]
>;

function groupByCategory(items: Tag[]) {
  return items.reduce((acc, item) => {
    if (!acc.has(item.category)) {
      acc.set(item.category, []);
    }
    acc.get(item.category)!.push(item);
    return acc;
  }, new Map<string, Tag[]>());
}

export const tagsByCategoryMap = new Map(groupByCategory(tags)) as Map<string, Tag[]>;
