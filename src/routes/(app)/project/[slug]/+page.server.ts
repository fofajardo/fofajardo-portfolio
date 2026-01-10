import { projectsMap, technologies } from "$lib/dataService";

import { error } from "@sveltejs/kit";

export function load({ params }) {
  const { slug } = params;

  const project = projectsMap.get(slug);
  if (!project) {
    error(404);
  }

  let projectTechList = "";
  if (project.technologies) {
    for (let i = 0; i < project.technologies.length; i++) {
      let techName = project.technologies[i];
      let techFriendlyName = techName;
      if (techName in technologies) {
        techFriendlyName = technologies[techName];
      }
      projectTechList += techFriendlyName;
      if (i < project.technologies.length - 1) {
        projectTechList += ", ";
      }
    }
  }

  return {
    project,
    projectTechList
  };
}
