import { tagsByCategoryMap, projectsByTagMap, projects, tags } from "$lib/dataService";

import { error } from "@sveltejs/kit";

export function load({ params }) {
  const { tagId } = params;

  const tag = tags.find((t) => t.id === tagId);
  if (!tag) {
    error(404);
  }

  const showAll = tagId === "all" || tag.category === "technology";

  const title =
    tag.category === "technology" ? `Projects using ${tag.name}` : `${tag.name} - Projects`;

  const filteredProjects = showAll
    ? tagId === "all"
      ? projects
      : (projectsByTagMap.get(tagId) ?? [])
    : projects;

  return {
    tag,
    showAll,
    projects: filteredProjects,
    tagsByCategoryMap,
    projectsByTagMap,
    title,
    description:
      "A collection of personal and academic projects showcasing my skills and experience."
  };
}
