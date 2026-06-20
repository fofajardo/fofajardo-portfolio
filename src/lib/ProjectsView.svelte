<script lang="ts">
  import { CategoryType } from "$lib/lib.types";
  import ProjectCard from "./ProjectCard.svelte";

  const { data, filter, viewMode = "grid" } = $props();
  const { projects, projectsByTagMap, tagsByCategoryMap, showAll } = $derived(data);
</script>

{#if showAll}
  <div class="cardset {viewMode}">
    {#each projects as project}
      <ProjectCard item={project} />
    {/each}
  </div>
{:else}
  {#each tagsByCategoryMap.get(CategoryType.Project) ?? [] as tag}
    {#if filter.includes(tag.id)}
      <h2 id={tag.id}>{tag.name}</h2>
      <div class="cardset {viewMode}">
        {#each projectsByTagMap.get(tag.id) ?? [] as project}
          <ProjectCard item={project} />
        {/each}
      </div>
    {/if}
  {/each}
{/if}
