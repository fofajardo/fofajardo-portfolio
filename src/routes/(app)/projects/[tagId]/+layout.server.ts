import { tagsByCategoryMap, projectsByTagMap, projects, tags } from "$lib/dataService";

import { error } from "@sveltejs/kit";

export function load({ params }) {
  const { tagId } = params;

  const tag = tags.find((t) => t.id === tagId);
  if (!tag) {
    error(404);
  }

  const pageHeadingTitle =
    tag.id === "all"
      ? "Projects"
      : tag.category === "technology"
        ? `Projects using ${tag.name}`
        : tag.name;

  const title =
    tag.category === "technology" ? `Projects using ${tag.name}` : `${tag.name} - Projects`;

  const filteredProjects = tagId === "all" ? projects : (projectsByTagMap.get(tagId) ?? []);

  return {
    tag,
    projects: filteredProjects,
    useGrouping: false,
    title,
    pageHeadingTitle,
    description:
      "A collection of personal and academic projects showcasing my skills and experience."
  };
}
