import { projectsByTagMap, tagsByCategoryMap } from "#lib/dataService.js";

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
