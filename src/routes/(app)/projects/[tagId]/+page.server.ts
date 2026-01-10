import { tagsByCategoryMap, projectsByTagMap, projects } from "$lib/dataService";
import { CategoryType } from "$lib/lib.types.js";

import { error } from "@sveltejs/kit";

export function load({ params }) {
  let { tagId } = params;

  const showAll = tagId === "all";
  if (showAll) {
    tagId = "all-projects";
  }

  const tag = tagsByCategoryMap.get(CategoryType.Project)?.find((t) => t.id === tagId);
  if (!tag) {
    error(404);
  }

  return {
    tag,
    showAll,
    projects,
    tagsByCategoryMap,
    projectsByTagMap
  };
}
