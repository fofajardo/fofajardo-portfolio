import {
  projects, technologies
} from "$lib/data";

import { error } from "@sveltejs/kit";

export function load({ params }) {
	const { category, slug } = params;

	const categoryProjects = projects[category];
	if (!categoryProjects) {
		error(404);
	}

	const project = categoryProjects[slug];
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
        project, projectTechList
    };
}
