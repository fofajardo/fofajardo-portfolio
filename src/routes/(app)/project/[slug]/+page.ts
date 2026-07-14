import { projectsMap, technologies, projects } from "$lib/dataService";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const project = projectsMap.get(slug);
  if (!project) {
    error(404, `Project not found: ${slug}`);
  }

  let post;
  try {
    post = await import(`$lib/content/projects/${slug}.md`);
  } catch (e) {
    error(404, `Could not load project content for ${slug}`);
  }

  const techList = (project.technologies || []).map((techName) => {
    let techFriendlyName = techName;
    let icon = "tabler:code";
    if (techName in technologies) {
      techFriendlyName = technologies[techName].name;
      icon = technologies[techName].icon ?? "";
    }
    return {
      id: techName,
      name: techFriendlyName,
      icon
    };
  });

  const otherProjects = projects
    .filter((p) => {
      return p.id !== slug;
    })
    .sort(() => {
      return Math.random() - 0.5;
    })
    .slice(0, 4);

  return {
    project,
    content: post.default,
    techList,
    otherProjects,
    title: `${project.title} - Projects`,
    description: project.subtitle,
    ogType: "website",
    ogImage: project.preview || ""
  };
};
