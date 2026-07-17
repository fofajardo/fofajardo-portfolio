<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import type { NavItem } from "./lib.types";
  import type { Pathname } from "$app/types";

  let { nav, launcher }: { nav: NavItem[]; launcher: boolean } = $props();
</script>

<header class="launcher {launcher ? 'term' : ''}" aria-label="Launcher">
  <div class="center">
    {#if launcher}
      <span class="title">λ</span>
    {:else}
      <span class="title">Francis Dominic Fajardo</span>
      <span class="subtitle">Software Developer</span>
    {/if}
  </div>
</header>

<nav class="launcher-nav" aria-label="Primary navigation">
  <ul class="group-ab">
    {#each nav as { href, icon, label, limitTo, rel } (href)}
      {#if page.url.pathname != href && (!limitTo || (limitTo === "launcher" && launcher))}
        <li>
          {#if rel === "external"}
            <a {href} class="action-button" rel="external">
              <Icon class="icon" {icon} />
              <span class="text">{label}</span>
            </a>
          {:else}
            <a
              href={resolve(href as Pathname)}
              class="action-button"
              data-sveltekit-reload={launcher}
            >
              <Icon class="icon" {icon} />
              <span class="text">{label}</span>
            </a>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</nav>

<style>
  /* ::::: view transitions ::::: */
  .launcher {
    margin: 1em;
    border-radius: 24px;
    padding: 1em;
    view-transition-name: launcher;
    position: relative;
    overflow: hidden;
  }

  .launcher.term {
    color: var(--text-main);
    margin: 0.15em 0.3em;
    padding: 0.15em 0.3em;
  }

  .launcher-nav {
    display: flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    view-transition-name: launcher-nav;
  }

  /* ::::: action buttons ::::: */

  .action-button {
    display: flex;
    align-items: center;
    flex-direction: row;
    color: inherit;
    text-decoration: none;
    border-bottom-style: none;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  .action-button:hover {
    text-decoration: none;
  }

  .action-button > :global(.icon) {
    width: 24px;
    height: 24px;
    padding: 6px;
    border-radius: 12px;
    background-color: transparent;
    text-align: center;
    color: var(--text-main);
  }

  @keyframes pop {
    0% {
      transform: scale(0) rotate(90deg);
    }
    65% {
      transform: scale(1.25) rotate(0deg);
    }
    100% {
      transform: scale(1);
    }
  }

  .action-button:is(:hover, :focus, :focus-within) > :global(.icon) {
    background-color: var(--text-main);
    color: var(--bg-canvas);
    animation: 500ms pop 1 ease;
  }

  .action-button > .text {
    margin-left: 5px;
    font-weight: 500;
    color: var(--text-main);
  }

  .action-button:is(:hover, :focus, :focus-within) > .text {
    color: var(--text-main);
  }

  .launcher-nav .action-button > .text {
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 0;
    transform: translateX(-6px);
    transition:
      max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.25s ease,
      margin-left 0.35s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @media screen and (min-width: 600px) {
    .launcher-nav .action-button:is(:hover, :focus, :focus-within) > .text {
      max-width: 120px;
      opacity: 1;
      margin-left: 8px;
      transform: translateX(0);
    }
  }

  /* ::::: action button group ::::: */

  .group-ab {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 0.5em;
  }

  .group-ab > li {
    font-size: 19.2px;
  }

  @media screen and (max-width: 425px) {
    .group-ab {
      gap: 0.5em 2em;
    }
    .launcher-nav {
      margin: 0 1.5em;
      min-height: 80px;
    }
  }
</style>
