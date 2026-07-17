<script lang="ts">
  import { page } from "$app/state";
  import { toggleSidebar } from "$lib/Sidebar.svelte";
  import Icon from "$lib/Icon.svelte";
</script>

<header class="primary-header" aria-label="Site header">
  <div class="primary-header-content">
    {#if page.url.pathname !== "/"}
      <a href="/" class="site-logo">Francis Dominic Fajardo</a>
    {:else}
      <div></div>
    {/if}
    <button onclick={toggleSidebar} class="menu-btn" aria-label="Open menu">
      <div class="menu-btn-label">Menu</div>
      <Icon icon="line-md:menu" width="24" height="24" />
    </button>
  </div>
</header>

{#if page.url.pathname !== "/"}
  <style>
    @media screen and (max-width: 625px) {
      .menu-btn-label {
        display: none;
      }
    }
  </style>
{/if}

<style>
  /* ::::: new primary header ::::: */
  .primary-header {
    width: 100%;
  }

  .primary-header-content {
    max-width: var(--layout-max-width);
    margin: 0 auto;
    padding: 1em 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .site-logo {
    font-size: 2.25em;
    font-weight: 900;
    text-decoration: none;
    color: var(--text-main);
  }

  .menu-btn-label {
    font-family: var(--font-body);
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.05em;
    margin: 0 0.5em;
  }

  @media screen and (max-width: 625px) {
    .site-logo {
      font-size: 1.5em;
    }
  }
</style>
