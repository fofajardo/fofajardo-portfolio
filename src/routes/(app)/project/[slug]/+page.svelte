<script lang="ts">
  import { onMount } from "svelte";
  import SvelteMarkdown from "@humanspeak/svelte-markdown";
  import Icon from "@iconify/svelte";

  import Glide from "@glidejs/glide";
  import "@glidejs/glide/dist/css/glide.core.min.css";
  import "$lib/styles/common.glide.css";

  import Viewer from "viewerjs";
  import "viewerjs/dist/viewer.css";
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Label from "$lib/Label.svelte";

  import ProjectCard from "$lib/ProjectCard.svelte";

  import { page } from "$app/state";

  let { data } = $props();
  let project = $derived(data.project);
  let techList = $derived(data.techList);
  let otherProjects = $derived(data.otherProjects);

  const allImageModules = import.meta.glob(
    `$lib/content/previewset/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}`,
    {
      eager: true,
      query: {
        enhanced: true
      }
    }
  ) as Record<string, { default: string }>;

  const imageModules = $derived(() => {
    try {
      if (project.previewset) {
        const projectPath = `/src/lib/content/previewset/${project.id}/`;
        return Object.fromEntries(
          Object.entries(allImageModules).filter(([path]) => path.includes(projectPath))
        );
      }
    } catch (e) {
      console.error("Error loading preview set images for project:", project, e);
    }
    return {};
  });

  let previewMounted = $state(false);
  $effect(() => {
    project;
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
      new Viewer(document.getElementById("viewer-target")!, {
        inline: false,
        title: false
      });
      previewMounted = true;
    }
  });

  function onPreviewLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.remove("phs");
  }
</script>

<svelte:head>
  <title>{project.title} - Projects - Francis Dominic Fajardo</title>
  <meta name="description" content={project.subtitle} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{project.title} - Projects - Francis Dominic Fajardo" />
  <meta property="og:description" content={project.subtitle} />
  <meta property="og:url" content={page.url.href} />
  {#if project.preview && (project.preview.startsWith("/") || project.preview.startsWith("http"))}
    <meta property="og:image" content={new URL(project.preview, page.url.origin).href} />
  {/if}
</svelte:head>

<div class="heading-container">
  <div class="heading-content">
    <h1>
      {project.title}
      {#if project.directUrl}
        <Icon
          icon="line-md:external-link"
          width="24"
          height="24"
          style="margin-left: 6px; display: inline-block; vertical-align: middle;"
        />
      {/if}
    </h1>
  </div>
</div>

<section class="content-layout">
  <div class="cardset">
    <div class="card card-project-metadata">
      <Label icon="tabler:info-circle">{project.subtitle}</Label>
      <Label icon="tabler:calendar"><DateRangeSpan entry={project} /></Label>
    </div>

    {#if project.previewset}
      {#key project.id}
        <div class="card glide" data-mounted={previewMounted}>
          <div class="glide__track" data-glide-el="track">
            <ul id="viewer-target" class="glide__slides">
              {#each Object.keys(imageModules()) as preview, index (preview)}
                <li>
                  <enhanced:img
                    class="glide__slide phs"
                    src={imageModules()[preview].default}
                    alt={`Preview image ${index + 1} of project ${project.title}`}
                    onload={onPreviewLoad}
                  />
                </li>
              {/each}
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<"
              ><Icon icon="tabler:chevron-left"></Icon></button
            >
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">"
              ><Icon icon="tabler:chevron-right"></Icon></button
            >
          </div>
        </div>
      {/key}
    {/if}

    <div class="card">
      <nav class="card-actions">
        {#if project.directUrl}
          <LinkAnchor link={{ type: "external", url: project.directUrl }} isButton />
        {/if}
        {#each project.links as link, i (link.url + i)}
          <LinkAnchor {link} isButton />
        {/each}
      </nav>
    </div>

    {#if project.content}
      <div class="card card-content">
        <Label icon="tabler:article" as="h3">Overview</Label>
        <SvelteMarkdown source={project.content} />
      </div>
    {/if}

    {#if project.points && project.points.length > 0}
      <div class="card card-content">
        <Label icon="tabler:list-details" as="h3">Contributions</Label>
        <ul>
          {#each project.points as point, i (point + i)}
            <li><SvelteMarkdown source={point} isInline /></li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if project.technologies && techList.length > 0}
      <div class="card card-content">
        <Label icon="tabler:tools" as="h3">Technologies</Label>
        <div class="tech-badge-container">
          {#each techList as tech (tech.id)}
            <span class="tech-badge">
              <Icon icon={tech.icon} width="16" height="16" />
              {tech.name}
            </span>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if otherProjects && otherProjects.length > 0}
    <div class="other-projects-section">
      <h3 class="other-projects-heading">Check out my other projects</h3>
      <div class="cardset list">
        {#each otherProjects as otherItem (otherItem.id)}
          <ProjectCard item={otherItem} />
        {/each}
      </div>
    </div>
  {/if}
</section>

<style>
  .tech-badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: 0.5em;
  }

  .tech-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
    background: var(--bg-surface);
    color: var(--text-main);
    padding: 0.4em 0.9em;
    border-radius: 9999em;
    font-size: 0.9em;
    font-weight: 500;
    border: 1px solid var(--bg-surface-hover);
  }

  .other-projects-section {
    margin-top: 3em;
    border-top: 2px solid var(--bg-surface-hover);
    width: 100%;
  }

  .other-projects-heading {
    font-size: 1.5em;
    font-weight: 800;
    margin-bottom: 1.25em;
    color: var(--text-main);
  }
</style>
