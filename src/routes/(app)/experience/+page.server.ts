import { experiencesByCategoryMap, experienceCategories } from "$lib/dataService";

export function load() {
  return {
    experiencesByCategoryMap,
    experienceCategories
  };
}
