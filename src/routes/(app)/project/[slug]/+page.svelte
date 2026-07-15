<script lang="ts">
  import SvelteMarkdown from "@humanspeak/svelte-markdown";
  import Icon from "$lib/Icon.svelte";

  import Glide from "@glidejs/glide";
  import "@glidejs/glide/dist/css/glide.core.min.css";
  import "$lib/styles/common.glide.css";

  import Viewer from "viewerjs";
  import "viewerjs/dist/viewer.css";
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Label from "$lib/Label.svelte";
  import HeroArt from "$lib/HeroArt.svelte";

  import ProjectCard from "$lib/ProjectCard.svelte";
  import TagBadge from "$lib/TagBadge.svelte";

  let { data } = $props();
  let project = $derived(data.project);
  let techList = $derived(data.techList);
  let otherProjects = $derived(data.otherProjects);
  let Content = $derived(data.content);

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

<div class="heading-container">
  <HeroArt type="projects" />
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
      {project.subtitle}
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

    {#if project.hasBody && Content}
      <div class="card card-content">
        <Label icon="tabler:article" as="h3">Overview</Label>
        <Content />
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

    <div class="card card-content">
      <Label icon="tabler:calendar" as="h3">Timeline</Label>
      <DateRangeSpan entry={project} />
    </div>

    {#if project.technologies && techList.length > 0}
      <div class="card card-content">
        <Label icon="tabler:tools" as="h3">Technologies</Label>
        <div class="tech-badge-container">
          {#each techList as tech (tech.id)}
            <TagBadge tagId={tech.id} />
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
  }

  .other-projects-section {
    margin-top: 2em;
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
