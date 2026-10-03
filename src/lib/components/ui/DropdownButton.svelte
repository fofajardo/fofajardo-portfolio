<script lang="ts">
  import { Icon } from "#comp/ui";
  import { isBrowser } from "#lib/hooks/is-browser.js";
  import type { DropdownOption as DropdownOptions } from "#lib/lib.types.js";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  let {
    label,
    icon,
    options
  }: {
    label: string;
    icon: string;
    options: DropdownOptions;
  } = $props();

  let isOpen = $state(false);
  let element: HTMLElement | null = $state(null);

  function toggle() {
    isOpen = !isOpen;
  }

  onMount(() => {
    const handleCaptureClick = (e: MouseEvent) => {
      if (isOpen && element && !element.contains(e.target as Node)) {
        isOpen = false;
      }
    };

    window.addEventListener("click", handleCaptureClick, true);

    return () => {
      window.removeEventListener("click", handleCaptureClick, true);
    };
  });

  $effect(() => {
    let intervalId: number;
    if (isOpen) {
      intervalId = window.setInterval(() => {
        if (
          document.activeElement &&
          document.activeElement !== document.body &&
          document.activeElement.tagName !== "HTML" &&
          element &&
          !element.contains(document.activeElement)
        ) {
          isOpen = false;
        }
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  });
</script>

{#snippet dropdownItems(options: DropdownOptions)}
  {#each options as option (option.label)}
    {#if option.url}
      <a
        href={option.url}
        target="_blank"
        rel="noopener noreferrer"
        class="dropdown-item"
        onclick={() => (isOpen = false)}
      >
        <Icon icon={option.icon} />
        <span>{option.label}</span>
      </a>
    {:else if isBrowser && option.onClick}
      <button
        onclick={() => {
          option.onClick?.();
          isOpen = false;
        }}
        class="dropdown-item"
      >
        <Icon icon={option.icon} />
        <span>{option.label}</span>
      </button>
    {/if}
  {/each}
{/snippet}

<div class="dropdown-container" bind:this={element}>
  {#if isBrowser}
    <button class="dropdown-button button" onclick={toggle} aria-expanded={isOpen}>
      <Icon {icon} />
      <span>{label}</span>
      <Icon icon="ph:caret-down-bold" class="caret {isOpen ? 'rotated' : ''}" />
    </button>

    {#if isOpen}
      <div class="dropdown-menu" transition:scale={{ duration: 150, start: 0.95 }}>
        {@render dropdownItems(options)}
      </div>
    {/if}
  {/if}
  <noscript>
    <div class="dropdown-header">
      <Icon {icon} />
      <span>{label}</span>
    </div>
    {@render dropdownItems(options)}
  </noscript>
</div>

<style>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }
  .dropdown-button {
    cursor: pointer;
  }
  .dropdown-button :global(.caret) {
    opacity: 0.8;
    transition: transform 0.2s ease;
  }
  .dropdown-button :global(.caret.rotated) {
    transform: rotate(180deg);
  }
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 10;
    min-width: 180px;
    background: var(--bg-canvas);
    border: 2px solid var(--text-link-hover);
    border-radius: 12px;
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 8px 10px -6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 6px;
  }
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.6em 1em;
    color: var(--text-link);
    text-decoration: none !important;
    border-radius: 8px;
    transition: all 0.15s ease;
    font-weight: 500;
    text-align: left;
  }
  button.dropdown-item {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
  }
  .dropdown-item:hover {
    background-color: var(--bg-surface-hover);
    color: var(--text-link-hover);
  }
  .dropdown-header {
    padding: 0.6em 1em;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    border-bottom: 2px solid var(--text-main);
  }
</style>
