<script lang="ts">
  import { CategoryType } from "$lib/lib.types";
  import ProjectCard from "./ProjectCard.svelte";

  const { data, filter, viewMode = "grid" } = $props();
  const { projects, projectsByTagMap, tagsByCategoryMap, showAll } = $derived(data);
</script>

{#if showAll}
  <div class="cardset {viewMode}">
    {#each projects as project (project.id)}
      <ProjectCard item={project} />
    {/each}
  </div>
{:else}
  {#each tagsByCategoryMap.get(CategoryType.Project) ?? [] as tag (tag.id)}
    {#if filter.includes(tag.id)}
      {@const tagProjects = projectsByTagMap.get(tag.id) ?? []}
      {#if tagProjects.length > 0}
        <h2 id={tag.id}>{tag.name}</h2>
        <div class="cardset {viewMode}">
          {#each tagProjects as project (project.id)}
            <ProjectCard item={project} />
          {/each}
        </div>
      {/if}
    {/if}
  {/each}
{/if}
