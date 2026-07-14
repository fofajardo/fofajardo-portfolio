<script lang="ts">
  import Icon from "$lib/Icon.svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import type { NavItem } from "./lib.types";
  import type { Pathname } from "$app/types";
  import CompactHeader from "./CompactHeader.svelte";

  let { nav, launcher }: { nav: NavItem[]; launcher: boolean } = $props();

  const isCompactHeaderPage = $derived(page.url.pathname !== "/" && page.url.pathname !== "/start");

  const logoHref = "/";
</script>

{#if isCompactHeaderPage}
  <CompactHeader {logoHref} {nav} />
{:else}
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

  <nav class="primary-nav" aria-label="Primary navigation">
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
{/if}
