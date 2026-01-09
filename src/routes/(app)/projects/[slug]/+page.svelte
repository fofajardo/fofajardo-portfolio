<script lang="ts">
    import { onMount } from "svelte";
    import SvelteMarkdown from "@humanspeak/svelte-markdown";
    import Icon from "@iconify/svelte";

    import Glide from "@glidejs/glide";
    import "@glidejs/glide/dist/css/glide.core.min.css";
    import "$lib/assets/common.glide.css"

    import Viewer from "viewerjs";
    import "viewerjs/dist/viewer.css";

    let { data } = $props();
    let project = $derived(data.project);
    let projectTechList = $derived(data.projectTechList);

    const allImageModules = import.meta.glob(
        `$lib/assets/previewset/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
        {
            eager: true,
            query: {
                enhanced: true
            }
        }
    ) as Record<string, { default: string }>;

    const imageModules = $derived(() => {
        if (project.previewset) {
            const projectPath = `/src/lib/assets/previewset/${project.id}/`;
            return Object.fromEntries(
                Object.entries(allImageModules).filter(([path]) => path.includes(projectPath))
            );
        }
        return {};
    });

    let previewLoaded = $state(false);
    onMount(() => {
        if (project.previewset) {
            new Glide(".glide", {
                type: "carousel",
                autoplay: 3000,
                hoverpause: false,
                perView: 3,
                breakpoints: {
                    767: {
                        perView: 1
                    }
                }
            }).mount();
            new Viewer(
                document.getElementById("viewer-target")!,
                {
                    inline: false,
                    title: false,
                }
            );
            previewLoaded = true;
        }
    });
</script>

<svelte:head>
    <title>Francis Dominic Fajardo - Projects - {project.title}</title>
    <meta name="description" content={project.subtitle} />
</svelte:head>

<h1 class="m-0">{project.title}</h1>

<div class="cardset">
    <div class="card card-project-metadata">
        <div>{project.subtitle}</div>
        <span>
            {project.dateStart || ""}
            {project.dateEnd !== undefined ? (project.dateEnd ? ` – ${project.dateEnd}` : "") : " – Present"}
        </span>
    </div>

    {#if project.previewset}
    {#if !previewLoaded}
    <div class="cardset-loader">
        <div class="card phs">
        </div>
    </div>
    {/if}
    <div class="card glide" data-loaded={previewLoaded}>
        <div class="glide__track" data-glide-el="track">
            <ul id="viewer-target" class="glide__slides">
                {#each Object.keys(imageModules()) as preview, index}
                <li>
                    <enhanced:img
                        class="glide__slide"
                        src={imageModules()[preview].default}
                        alt={`Preview image ${index + 1} of project ${project.title}`}
                    />
                </li>
                {/each}
            </ul>
        </div>
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><Icon icon="tabler:chevron-left"></Icon></button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">"><Icon icon="tabler:chevron-right"></Icon></button>
        </div>
    </div>
    {/if}

    <div class="card">
        <nav class="card-actions">
            {#if project.url}
            <a class="button" href={project.url} target="_blank">
                <Icon icon="tabler:external-link"></Icon> Visit Project Site
            </a>
            {/if}
            {#if project["url-video-demo"]}
            <a class="button" href={project["url-video-demo"]} target="_blank">
                <Icon icon="tabler:brand-youtube"></Icon> Watch Video Demo
            </a>
            {/if}
        </nav>
    </div>

    {#if project.technologies}
    <div class="card">
        <div>
            <strong>Technologies: </strong>
            <span>{projectTechList}</span>
        </div>
    </div>
    {/if}

    {#if project.points && project.points.length > 0}
    <div class="card">
        <ul>
            {#each project.points as point}
            <li><SvelteMarkdown source={point} isInline /></li>
            {/each}
        </ul>
    </div>
    {/if}

    {#if project.content}
    <div class="card">
        <SvelteMarkdown source={project.content} />
    </div>
    {/if}
</div>
