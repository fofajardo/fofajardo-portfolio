<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import type { ProjectEntry } from "$lib/lib.types";

  let { data } = $props();
  const { projectsByCategoryMap, projectCategories } = $derived(data);

  const imageModules = import.meta.glob(
    "$lib/content/previews/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    {
      eager: true,
      query: {
        enhanced: true
      }
    }
  ) as Record<string, { default: string }>;

  function getPreviewImage(p: ProjectEntry): string {
    if (p.preview) {
      return (
        imageModules[`/src/lib/content/previews/${p.preview}.jpg`]?.default ??
        imageModules[`/src/lib/content/previews/${p.preview}.png`]?.default
      );
    }
    return "";
  }

  function getProjectLink(categoryId: string, project: ProjectEntry) {
    if (project.directUrl) {
      return { href: project.directUrl, target: "_blank" };
    }
    return { href: `/project/${project.id}` };
  }

  function onPreviewLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    img.classList.remove("phs");
  }
</script>

<svelte:head>
  <title>Francis Dominic Fajardo - Projects</title>
  <meta
    name="description"
    content="A collection of personal and academic projects showcasing my skills and experience."
  />
  <meta property="og:title" content="Francis Dominic Fajardo - Projects" />
  <meta
    property="og:description"
    content="A collection of personal and academic projects showcasing my skills and experience."
  />
</svelte:head>

<h1>Projects</h1>
{#each projectCategories as category}
  <h2 id={category.id}>{category.name}</h2>
  <div class="cardset grid">
    {#each projectsByCategoryMap.get(category.id) ?? [] as project}
      <a
        class="card card-anchor"
        {...getProjectLink(category.id, project)}
        id="project-{project.id}"
      >
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
