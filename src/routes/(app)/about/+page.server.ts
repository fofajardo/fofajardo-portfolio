import { experiencesByTagMap, tagsByCategoryMap } from "$lib/dataService";

export function load() {
  return {
    experiencesByTagMap,
    tagsByCategoryMap,
    title: "About Me",
    description: "A collection of my professional experience, volunteering, and invited talks."
  };
}
