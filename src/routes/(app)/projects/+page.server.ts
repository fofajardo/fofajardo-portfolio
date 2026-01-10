import { tagsByCategoryMap, projectsByTagMap } from "$lib/dataService";

export function load() {
  return {
    projectsByTagMap,
    tagsByCategoryMap
  };
}
