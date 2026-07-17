<script lang="ts" module>
  import { goto } from "$app/navigation";

  let sidebarOpen = $state(false);

  export function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }

  export function handleLinkClick(e: MouseEvent, href: string, rel?: string) {
    if (rel === "external") {
      sidebarOpen = false;
      return;
    }
    e.preventDefault();
    sidebarOpen = false;
    setTimeout(() => {
      goto(resolve(href as Pathname));
    }, 300);
  }

  export function isSidebarOpen() {
    return sidebarOpen;
  }
</script>

<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import type { NavItem } from "./lib.types";
  import type { Pathname } from "$app/types";
  import { themeStore } from "$lib/themeStore";

  let { nav }: { nav: NavItem[] } = $props();

  const sidebarNavItems = $derived(nav.filter((item) => item.limitTo !== "launcher"));

  $effect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

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
    <div class="theme-switcher">
      <button
        onclick={() => themeStore.set("device")}
        class="theme-btn theme-btn-device"
        class:active={$themeStore === "device"}
        title="Device night/day"
        aria-label="Device theme"
      ></button>
      <button
        onclick={() => themeStore.set("light")}
        class="theme-btn theme-btn-light"
        class:active={$themeStore === "light"}
        title="Light"
        aria-label="Light theme"
      ></button>
      <button
        onclick={() => themeStore.set("dark")}
        class="theme-btn theme-btn-dark"
        class:active={$themeStore === "dark"}
        title="Dark"
        aria-label="Dark theme"
      ></button>
      <button
        onclick={() => themeStore.set("green")}
        class="theme-btn theme-btn-green"
        class:active={$themeStore === "green"}
        title="Green"
        aria-label="Green theme"
      ></button>
      <button
        onclick={() => themeStore.set("amber")}
        class="theme-btn theme-btn-amber"
        class:active={$themeStore === "amber"}
        title="Amber"
        aria-label="Amber theme"
      ></button>
    </div>
    <button onclick={toggleSidebar} class="close-btn" aria-label="Close menu">
      <Icon icon="line-md:close" width="28" height="28" />
    </button>
  </div>
  <nav class="sidebar-nav">
    <ul>
      {#each sidebarNavItems as { href, icon, label, rel } (href)}
        <li>
          {#if rel === "external"}
            <a
              {href}
              onclick={(e) => handleLinkClick(e, href, rel)}
              rel="external"
              class="sidebar-link"
            >
              <Icon {icon} class="sidebar-icon" />
              <span>{label}</span>
            </a>
          {:else}
            <a
              href={resolve(href as Pathname)}
              onclick={(e) => handleLinkClick(e, href)}
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
  /* Sidebar Drawer Styles */
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
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
    max-width: 80dvw;
    height: 100dvh;
    background-color: var(--bg-canvas);
    border-left: 1px solid var(--bg-surface-hover);
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
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    border-bottom: 1px solid var(--bg-surface-hover);
  }
  .theme-switcher {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .theme-btn {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid var(--text-link);
    transition: border-color 0.2s;
    padding: 0;
  }
  .theme-btn:hover {
    border-color: var(--text-link-hover);
  }
  .theme-btn.active {
    border-color: var(--text-main);
  }
  .theme-btn-device {
    background: linear-gradient(to right, #ffffff 50%, #0f1115 50%);
  }
  .theme-btn-light {
    background: #ffffff;
  }
  .theme-btn-dark {
    background: #0f1115;
  }
  .theme-btn-green {
    background: #052e16;
  }
  .theme-btn-amber {
    background: #451a03;
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
    color: var(--text-main);
    font-size: 1.5em;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  .sidebar-link:hover {
    background-color: var(--bg-surface-hover);
  }
  .sidebar-link.active {
    background-color: var(--bg-surface);
    font-weight: bold;
  }
  :global(.sidebar-icon) {
    width: 30px;
    height: 30px;
  }
</style>
