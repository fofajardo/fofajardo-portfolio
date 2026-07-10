import navData from "$lib/content/nav.json";
import tagsData from "$lib/content/tags.json";
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
  Tag
} from "./lib.types";

export const { nav } = navData as NavData;
export const { tags } = tagsData as TagsData;

// Dynamically build technologies map from tags where category is technology or custom skill group
export const technologies = tags
  .filter((t) => ["technology", "ide", "tool", "graphic-design"].includes(t.category))
  .reduce(
    (acc, t) => {
      acc[t.id] = t;
      return acc;
    },
    {} as Record<string, Tag>
  );

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
    // Also index by technologies if it's a project
    const project = item as ProjectEntry;
    if (project.technologies) {
      for (const tech of project.technologies) {
        if (!acc.has(tech)) {
          acc.set(tech, []);
        }
        acc.get(tech)!.push(item);
      }
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

export interface GroupedProjects {
  heading: string;
  items: ProjectEntry[];
}

export function getGroupedProjects(
  projectsList: ProjectEntry[],
  filter: string[],
  showAll: boolean
): GroupedProjects[] {
  const filtered = showAll
    ? projectsList
    : projectsList.filter((p: ProjectEntry) => p.tags.some((t: string) => filter.includes(t)));

  const groupsMap = new Map<string, ProjectEntry[]>();
  const ongoingList: ProjectEntry[] = [];

  for (const project of filtered) {
    if (project.dateEnd === undefined) {
      ongoingList.push(project);
    } else {
      const dateStr = project.dateEnd || project.dateStart;
      const year = dateStr ? dateStr.split("-")[0] : "Unknown";
      if (!groupsMap.has(year)) {
        groupsMap.set(year, []);
      }
      groupsMap.get(year)!.push(project);
    }
  }

  const result: GroupedProjects[] = [];
  if (ongoingList.length > 0) {
    ongoingList.sort((a, b) => (b.dateStart || "").localeCompare(a.dateStart || ""));
    result.push({ heading: "Ongoing", items: ongoingList });
  }

  const sortedYears = Array.from(groupsMap.keys()).sort((a, b) => b.localeCompare(a));
  for (const year of sortedYears) {
    const list = groupsMap.get(year)!;
    list.sort((a, b) => {
      const dateA = a.dateEnd || a.dateStart || "";
      const dateB = b.dateEnd || b.dateStart || "";
      return dateB.localeCompare(dateA);
    });
    result.push({ heading: year, items: list });
  }

  return result;
}

export function getFilteredProjects(
  projectsList: ProjectEntry[],
  filter: string[],
  showAll: boolean
): ProjectEntry[] {
  return showAll
    ? projectsList
    : projectsList.filter((p: ProjectEntry) => p.tags.some((t: string) => filter.includes(t)));
}
