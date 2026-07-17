<script lang="ts">
  import { page } from "$app/state";
  import { toggleSidebar } from "$lib/Sidebar.svelte";
  import Icon from "$lib/Icon.svelte";
</script>

<header class="primary-header" aria-label="Site header">
  <div class="primary-header-content">
    {#if page.url.pathname !== "/"}
      <a href="/" class="blog-logo">Francis Dominic Fajardo</a>
    {:else}
      <div></div>
    {/if}
    <button onclick={toggleSidebar} class="hamburger-btn" aria-label="Open menu">
      <Icon icon="line-md:menu" width="24" height="24" />
    </button>
  </div>
</header>
