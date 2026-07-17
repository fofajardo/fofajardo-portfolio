<script lang="ts">
  import ProjectsView from "$lib/ProjectsView.svelte";
  import Icon from "$lib/Icon.svelte";
  import HeroArt from "$lib/HeroArt.svelte";
  import { viewModeStore } from "$lib/viewModeStore";
  import { page } from "$app/state";

  const { children } = $props();
</script>

<main>
  <div class="heading-container">
    <HeroArt />
    <div class="heading-content">
      <h1>{page.data.pageHeadingTitle}</h1>
      <div class="view-switcher" role="group" aria-label="View switcher">
        <button
          class="view-switcher-button {$viewModeStore === 'grid' ? 'active' : ''}"
          onclick={() => ($viewModeStore = "grid")}
          aria-label="Grid view"
        >
          <Icon icon="line-md:grid-3-filled" width="20" height="20" />
        </button>
        <button
          class="view-switcher-button {$viewModeStore === 'list' ? 'active' : ''}"
          onclick={() => ($viewModeStore = "list")}
          aria-label="List view"
        >
          <Icon icon="line-md:list-3-filled" width="20" height="20" />
        </button>
      </div>
    </div>
  </div>

  <section class="content-layout">
    <ProjectsView data={page.data} viewMode={$viewModeStore} group={page.data.useGrouping} />
    {@render children()}
  </section>
</main>

<style>
  .view-switcher {
    display: flex;
    gap: 0.25em;
    background: var(--bg-surface);
    padding: 4px;
    border-radius: 12px;
  }

  .view-switcher-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 8px;
    color: var(--text-main);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s,
      color 0.2s;
  }

  .view-switcher-button:hover {
    background: var(--bg-surface-hover);
  }

  .view-switcher-button.active {
    background: var(--text-main);
    color: var(--bg-canvas);
  }
</style>
