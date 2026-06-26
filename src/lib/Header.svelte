<script lang="ts">
  import Icon from "@iconify/svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import type { NavItem } from "./lib.types";
  import type { Pathname } from "$app/types";

  let { nav, launcher }: { nav: NavItem[]; launcher: boolean } = $props();
</script>

<header class="primary-header {launcher ? 'term' : ''}" aria-label="Site header">
  <div class="center">
    {#if launcher}
      <span class="title">λ</span>
    {:else}
      <span class="title">Francis Dominic Fajardo</span>
      <span class="subtitle">Software Developer</span>
    {/if}
  </div>
</header>

{#snippet iconButton(icon: string, label: string)}
  <Icon class="icon" {icon} />
  <span class="text">{label}</span>
{/snippet}

<nav class="primary-nav" aria-label="Primary navigation">
  <ul class="group-ab">
    {#each nav as { href, icon, label, limitTo, rel } (href)}
      {#if page.url.pathname != href && (!limitTo || (limitTo === "launcher" && launcher))}
        <li>
          {#if rel === "external"}
            <a {href} class="action-button" rel="external">
              {@render iconButton(icon, label)}
            </a>
          {:else}
            <a
              href={resolve(href as Pathname)}
              class="action-button"
              data-sveltekit-reload={launcher}
            >
              {@render iconButton(icon, label)}
            </a>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</nav>
