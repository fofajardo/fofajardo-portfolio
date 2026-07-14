import navData from "$lib/content/nav.json";
import tagsData from "$lib/content/tags.json";
import experiencesData from "$lib/content/experiences.json";

import type {
  TagsData,
  Entry,
  ExperienceEntry,
  ExperiencesData,
  NavData,
  ProjectEntry,
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

const markdownProjects = import.meta.glob("$lib/content/projects/*.md", { eager: true });

export function sortProjectsByDate(a: ProjectEntry, b: ProjectEntry): number {
  if (a.dateEnd === undefined && b.dateEnd === undefined) {
    return (b.dateStart || "").localeCompare(a.dateStart || "");
  }
  if (a.dateEnd === undefined) {
    return -1;
  }
  if (b.dateEnd === undefined) {
    return 1;
  }

  const dateA = a.dateEnd || a.dateStart || "";
  const dateB = b.dateEnd || b.dateStart || "";
  return dateB.localeCompare(dateA);
}

export const projects: ProjectEntry[] = Object.entries(markdownProjects)
  .map(([path, resolver]) => {
    const module = resolver as { metadata: Omit<ProjectEntry, "id"> };
    const id = path.split("/").pop()?.replace(/\.md$/, "") || "";
    const metadata = module.metadata || {};
    return {
      ...metadata,
      tags: metadata.tags || [],
      technologies: metadata.technologies || [],
      points: metadata.points || [],
      links: metadata.links || [],
      id
    } as ProjectEntry;
  })
  .sort(sortProjectsByDate);

export const projectsMap = new Map(projects.map((project) => [project.id, project]));

function groupByTag(items: Entry[]) {
  return items.reduce((acc, item) => {
    const itemTags = item.tags || [];
    for (const tag of itemTags) {
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
    ongoingList.sort(sortProjectsByDate);
    result.push({ heading: "Ongoing", items: ongoingList });
  }

  const sortedYears = Array.from(groupsMap.keys()).sort((a, b) => b.localeCompare(a));
  for (const year of sortedYears) {
    const list = groupsMap.get(year)!;
    list.sort(sortProjectsByDate);
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
