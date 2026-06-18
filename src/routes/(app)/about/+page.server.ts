import { experiencesByTagMap, tagsByCategoryMap } from "$lib/dataService";

export function load() {
  return {
    experiencesByTagMap,
    tagsByCategoryMap
  };
}
