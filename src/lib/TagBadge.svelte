<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tags } from "$lib/dataService";

  let {
    tagId,
    href = `/projects/${tagId}`,
    inline = false
  }: { tagId: string; href?: string | null; inline?: boolean } = $props();

  const tag = $derived(tags.find((t) => t.id === tagId));
  const resolvedHref = $derived(tag?.hideLink ? null : href);
</script>

{#if tag}
  {#if resolvedHref}
    <a href={resolvedHref} class="tag-badge">
      {#if tag.icon}
        <Icon icon={tag.icon} width="16" height="16" />
      {/if}
      <span>{tag.name}</span>
    </a>
  {:else}
    <span class={"tag-badge" + (inline ? " inline" : "")}>
      {#if tag.icon}
        <Icon icon={tag.icon} width="16" height="16" />
      {/if}
      <span>{tag.name}</span>
    </span>
  {/if}
{/if}

<style>
  .tag-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.2s ease;
    text-decoration: none !important;
  }
  .tag-badge:not(.inline) {
    background: var(--bg-surface);
    color: var(--text-main);
    border: 1px solid var(--bg-surface-hover);
    padding: 0.4em 0.9em;
    border-radius: 9999em;
  }
  a.tag-badge:hover {
    border-color: var(--text-link);
    color: var(--text-link-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
</style>
