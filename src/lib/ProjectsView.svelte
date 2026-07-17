<script lang="ts">
  import ProjectCard from "./ProjectCard.svelte";
  import { getGroupedProjects, projects as allProjects } from "./dataService";

  const { data, viewMode = "grid", group = false } = $props();
  const projectsList = $derived(data.projects ?? allProjects);

  const grouped = $derived(getGroupedProjects(projectsList));
  const flatProjects = $derived(projectsList);
</script>

{#if group}
  {#each grouped as g (g.heading)}
    <h2 id={g.heading}>{g.heading}</h2>
    <div class="cardset {viewMode}">
      {#each g.items as project (project.id)}
        <ProjectCard item={project} />
      {/each}
    </div>
  {/each}
{:else}
  <div class="cardset {viewMode}">
    {#each flatProjects as project (project.id)}
      <ProjectCard item={project} />
    {/each}
  </div>
{/if}
