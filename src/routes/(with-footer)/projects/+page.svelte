<script lang="ts">
	import Header from "$lib/header.svelte";
    let { data } = $props();

    const imageModules = import.meta.glob(
        "$lib/assets/previews/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
        {
            eager: true,
            query: {
                enhanced: true
            }
        }
    ) as Record<string, { default: string }>;

    const TYPE_ACADEMIC = 0;
    const TYPE_PERSONAL = 1;

    interface Project {
        id: string;
        type: number;
        title: string;
        subtitle: string;
        preview?: string;
        previewImage?: string;
        dateStart?: string;
        dateEnd?: string;
        isDirect?: boolean;
        url?: string;
    }

    interface ProjectSection {
        title: string;
        type: number;
        projects: Project[];
    }

    const mapProjectWithImage = (p: Project) => ({
        ...p,
        previewImage: p.preview 
            ? imageModules[`/src/lib/assets/previews/${p.preview}.jpg`]?.default ?? imageModules[`/src/lib/assets/previews/${p.preview}.png`]?.default
            : undefined
    });

    let projectSections: ProjectSection[] = $derived([
        { 
            title: "Personal", 
            type: TYPE_PERSONAL, 
            projects: data.projects
                .filter((e: Project) => e.type === TYPE_PERSONAL)
                .map(mapProjectWithImage)
        },
        { 
            title: "Academic", 
            type: TYPE_ACADEMIC, 
            projects: data.projects
                .filter((e: Project) => e.type === TYPE_ACADEMIC)
                .map(mapProjectWithImage)
        }
    ]);

    function getProjectLink(project: Project) {
        if (project.isDirect) {
            return { href: project.url, target: "_blank" };
        }
        return { href: `/projects/${project.id}`, target: "_self" };
    }
</script>

<svelte:head>
    <title>Francis Dominic Fajardo - Projects</title>
    <meta name="description" content="A collection of personal and academic projects showcasing my skills and experience." />
</svelte:head>

<Header {data} />
<section class="bg" id="projects">
    <div id="section-projects" class="content-layout">
        <h1>Projects</h1>
        {#each projectSections as section, index}
            <h2 style={index > 0 ? "margin-top: 2em;" : ""}>{section.title}</h2>
            {#if section.projects.length === 0}
                <div class="cardset-loader">
                    <div class="card phs"></div>
                </div>
            {/if}
            <div class="cardset grid">
                {#each section.projects as project}
                    <a class="card-anchor" {...getProjectLink(project)}>
                        <div class="card" id="project-{project.id}">
                            {#if project.previewImage}
                                <div class="card-preview">
                                    <div class="card-preview-placeholder">
                                        <enhanced:img
                                            src={project.previewImage}
                                            alt="{project.title} preview image"
                                            class="img-uiv"
                                            width="200"
                                            height="200"
                                        />
                                    </div>
                                </div>
                            {/if}
                            <div class="card-detail">
                                <div class="card-header">
                                    <span class="header-link">{project.title}</span>
                                </div>
                                <div class="card-subtitle fw-bold">{project.subtitle}</div>
                                <span>
                                    {project.dateStart || ""}
                                    {project.dateEnd !== undefined ? (project.dateEnd ? ` – ${project.dateEnd}` : "") : " – Present"}
                                </span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/each}
    </div>
</section>
