import {
  projects, technologies
} from "$lib/content/data.json";

import { error } from "@sveltejs/kit";

export function load({ params }) {
    const project = projects.find((project) => project.id === params.slug);

    if (!project) {
        error(404);
    }

	let projectTechList = "";
	if (project.technologies) {
		for (let i = 0; i < project.technologies.length; i++) {
			let techName = project.technologies[i];
			let techFriendlyName = techName;
			if (techName in technologies) {
				techFriendlyName = technologies[techName as keyof typeof technologies];
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
