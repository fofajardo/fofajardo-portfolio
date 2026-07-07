<script lang="ts">
  import Icon from "@iconify/svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import type { NavItem } from "./lib.types";
  import type { Pathname } from "$app/types";

  let { logoHref, nav }: { logoHref: string; nav: NavItem[] } = $props();

  let sidebarOpen = $state(false);

  const sidebarNavItems = $derived(nav.filter((item) => item.limitTo !== "launcher"));

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<header class="compact-header" aria-label="Compact header">
  <div class="compact-header-content">
    <a href={logoHref} class="blog-logo">Francis Dominic Fajardo</a>
    <button onclick={toggleSidebar} class="hamburger-btn" aria-label="Open menu">
      <Icon icon="line-md:menu" width="24" height="24" />
    </button>
  </div>
</header>

<!-- Sidebar Overlay -->
<div
  onclick={toggleSidebar}
  class="sidebar-overlay"
  class:open={sidebarOpen}
  role="presentation"
></div>

<!-- Sidebar Drawer -->
<aside class="sidebar-drawer" class:open={sidebarOpen}>
  <div class="sidebar-header">
    <button onclick={toggleSidebar} class="close-btn" aria-label="Close menu">
      <Icon icon="line-md:close" width="28" height="28" />
    </button>
  </div>
  <nav class="sidebar-nav">
    <ul>
      {#each sidebarNavItems as { href, icon, label, rel } (href)}
        <li>
          {#if rel === "external"}
            <a {href} onclick={toggleSidebar} rel="external" class="sidebar-link">
              <Icon {icon} class="sidebar-icon" />
              <span>{label}</span>
            </a>
          {:else}
            <a
              href={resolve(href as Pathname)}
              onclick={toggleSidebar}
              class="sidebar-link"
              class:active={page.url.pathname === href}
            >
              <Icon {icon} class="sidebar-icon" />
              <span>{label}</span>
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  /* Compact Header Styles */
  .compact-header {
    width: 100%;
    margin-top: 10px;
  }
  .compact-header-content {
    max-width: var(--layout-max-width);
    margin: 0 auto;
    padding: 1em 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .blog-logo {
    font-size: 2.25em;
    font-weight: 900;
    text-decoration: none;
    color: var(--text-main);
  }
  @media screen and (max-width: 625px) {
    .blog-logo {
      font-size: 1.5em;
    }
  }
  .hamburger-btn,
  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-main);
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: background-color 0.2s;
  }
  .hamburger-btn:hover,
  .close-btn:hover {
    background-color: var(--bg-surface-hover);
  }

  /* Sidebar Drawer Styles */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
    z-index: 999;
    pointer-events: none;
    visibility: hidden;
    transition:
      background-color 0.3s ease,
      backdrop-filter 0.3s ease,
      visibility 0.3s ease;
  }
  .sidebar-overlay.open {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    pointer-events: auto;
    visibility: visible;
  }
  .sidebar-drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 380px;
    max-width: 80vw;
    height: 100vh;
    background-color: var(--palette-black);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
  }
  .sidebar-drawer.open {
    transform: translateX(0);
  }
  .sidebar-header {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
  }
  .close-btn {
    color: var(--palette-white);
  }
  @media (prefers-color-scheme: dark) {
    .close-btn {
      color: var(--palette-green);
    }
  }
  .sidebar-nav {
    flex: 1;
    overflow-y: auto;
    padding: 1em 0;
  }
  .sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.85em;
    padding: 1em 2em;
    color: var(--palette-white);
    font-size: 1.5em;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  @media (prefers-color-scheme: dark) {
    .sidebar-link {
      color: var(--palette-green);
    }
  }
  .sidebar-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  @media (prefers-color-scheme: dark) {
    .sidebar-link:hover {
      background-color: var(--bg-surface-hover);
    }
  }
  .sidebar-link.active {
    background-color: rgba(255, 255, 255, 0.15);
    font-weight: bold;
  }
  @media (prefers-color-scheme: dark) {
    .sidebar-link.active {
      background-color: var(--bg-surface);
    }
  }
  :global(.sidebar-icon) {
    width: 30px;
    height: 30px;
  }
</style>
