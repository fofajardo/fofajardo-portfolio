import { tagsByCategoryMap, projectsByTagMap } from "$lib/dataService";

export function load() {
  return {
    projectsByTagMap,
    tagsByCategoryMap,
    useGrouping: true,
    title: "Projects",
    pageHeadingTitle: "Projects",
    description:
      "A collection of personal and academic projects showcasing my skills and experience."
  };
}
