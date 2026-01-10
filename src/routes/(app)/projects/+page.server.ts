import { projectCategories, projectsByCategoryMap } from "$lib/dataService";

export function load() {
  return {
    projectsByCategoryMap,
    projectCategories
  };
}
