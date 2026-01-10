import { projectCategories, projectsByCategoryMap } from "$lib/data";

export function load() {
  return {
    projectsByCategoryMap,
    projectCategories
  };
}
