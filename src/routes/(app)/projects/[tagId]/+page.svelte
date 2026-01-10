<script lang="ts">
  import ProjectsView from "$lib/ProjectsView.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>{data.tag.name} - Projects - Francis Dominic Fajardo</title>
  <meta
    name="description"
    content="A collection of personal and academic projects showcasing my skills and experience."
  />
  <meta property="og:title" content="{data.tag.name} - Projects - Francis Dominic Fajardo" />
  <meta
    property="og:description"
    content="A collection of personal and academic projects showcasing my skills and experience."
  />
</svelte:head>

<h1>Projects</h1>
<ProjectsView {data} filter={[data.tag.id]} />
