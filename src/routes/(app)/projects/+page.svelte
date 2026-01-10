<script lang="ts">
    import DateRangeSpan from "$lib/DateRangeSpan.svelte";
    import type { Project } from "$lib/lib.types";

	let { data } = $props();
    const { projectCategories, projects } = $derived(data);

    const imageModules = import.meta.glob(
        "$lib/content/previews/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
        {
            eager: true,
            query: {
                enhanced: true
            }
        }
    ) as Record<string, { default: string }>;

    function getPreviewImage(p: Project): string {
        if (p.preview) {
            return imageModules[`/src/lib/content/previews/${p.preview}.jpg`]?.default
                ?? imageModules[`/src/lib/content/previews/${p.preview}.png`]?.default;
        }
        return "";
    }

    function getProjectLink(categoryId: string, project: Project) {
        if (project.isDirect) {
            return { href: project.url, target: "_blank" };
        }
        return { href: `/projects/${categoryId}/${project.id}` };
    }

    function onPreviewLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        img.classList.remove("phs");
    }
</script>

<svelte:head>
    <title>Francis Dominic Fajardo - Projects</title>
    <meta name="description" content="A collection of personal and academic projects showcasing my skills and experience." />
</svelte:head>

<h1>Projects</h1>
{#each projectCategories as category}
    <h2>{category.name}</h2>
    <div class="cardset grid">
        {#each Object.values(projects[category.id as keyof typeof projects] || {}) as project}
            <a class="card card-anchor" {...getProjectLink(category.id, project)} id="project-{project.id}">
                {#if project.preview}
                    <div class="card-preview">
                        <enhanced:img
                            src={getPreviewImage(project)}
                            alt="{project.title} preview image"
                            class="img-uiv phs"
                            width="200"
                            height="200"
                            loading="lazy"
                            onload={onPreviewLoad}
                        />
                    </div>
                {/if}
                <div class="card-detail">
                    <div class="card-header">
                        <span class="card-title">{project.title}</span>
                        <span class="card-subtitle">{project.subtitle}</span>
                    </div>
                    <DateRangeSpan entry={project} />
                </div>
            </a>
        {/each}
    </div>
{/each}
