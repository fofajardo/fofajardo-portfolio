<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import type { ProjectEntry } from "./lib.types";

  const { item } = $props();

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

  function getProjectLink(project: ProjectEntry) {
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

<a class="card card-anchor" {...getProjectLink(item)}>
  {#if item.preview}
    <div class="card-preview">
      <enhanced:img
        src={getPreviewImage(item)}
        alt="{item.title} preview image"
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
      <span class="card-title">{item.title}</span>
      <span class="card-subtitle">{item.subtitle}</span>
    </div>
    <DateRangeSpan entry={item} />
  </div>
</a>
