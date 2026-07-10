<script lang="ts">
  import ProjectsView from "$lib/ProjectsView.svelte";
  import Icon from "@iconify/svelte";
  import { viewModeStore } from "$lib/viewModeStore";

  let { data } = $props();

  const pageTitle = $derived(
    data.tag.id === "all"
      ? "Projects"
      : data.tag.category === "technology"
        ? `Projects using ${data.tag.name}`
        : data.tag.name
  );
</script>

<div class="heading-container">
  <div class="heading-content">
    <h1>{pageTitle}</h1>
    <div class="view-switcher" role="group" aria-label="View switcher">
      <button
        class="view-switcher-button {$viewModeStore === 'grid' ? 'active' : ''}"
        onclick={() => ($viewModeStore = "grid")}
        aria-label="Grid view"
      >
        <Icon icon="tabler:layout-grid" width="20" height="20" />
      </button>
      <button
        class="view-switcher-button {$viewModeStore === 'list' ? 'active' : ''}"
        onclick={() => ($viewModeStore = "list")}
        aria-label="List view"
      >
        <Icon icon="tabler:list" width="20" height="20" />
      </button>
    </div>
  </div>
</div>

<section class="content-layout">
  <ProjectsView {data} filter={[data.tag.id]} viewMode={$viewModeStore} />
</section>
