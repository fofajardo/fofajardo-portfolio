<script lang="ts">
  import { formatDate } from "$lib/utils";
  import Giscus from "@giscus/svelte";
  import { resetFigureCounter } from "$lib/Figure.svelte";
  import { resetTableCounter } from "$lib/Table.svelte";

  const { data } = $props();
  const { meta, content: Content } = $derived(data);

  // Reset counters synchronously before Svelte renders the children
  const _ = $derived.by(() => {
    meta;
    resetFigureCounter();
    resetTableCounter();
    return null;
  });
</script>

<svelte:head>
  <title>{meta.title} - Francis Dominic Fajardo</title>
</svelte:head>

<div class="heading-container">
  <div class="heading-content">
    <div class="blog-header-wrapper">
      <h1>{meta.title}</h1>
      <span class="blog-date">{formatDate(meta.date)}</span>
      {#if meta.author}
        <span class="blog-author">By {meta.author}</span>
      {/if}
    </div>
  </div>
</div>

<section class="content-layout">
  <article class="blog-article">
    {#if meta.preview}
      <div class="blog-preview-container">
        <img src={meta.preview} alt={meta.title} class="blog-preview-img" />
      </div>
    {/if}
    <div class="markdown-body">
      <Content />
    </div>
    {#if meta.tags && meta.tags.length > 0}
      <div class="blog-tags">
        {#each meta.tags as tag (tag)}
          <a href="/blog/tag/{tag}" class="blog-tag">
            #{tag}
          </a>
        {/each}
      </div>
    {/if}
  </article>

  <Giscus
    id="comments"
    repo="fofajardo/fofajardo-portfolio-content"
    repoId="R_kgDOQ20DmQ"
    category="Announcements"
    categoryId="DIC_kwDOQ20Dmc4DAoxT"
    mapping="pathname"
    strict="0"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme="preferred_color_scheme"
    lang="en"
    term=""
    loading="lazy"
  />
</section>

<style>
  .blog-header-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .blog-tags {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    margin-top: 2em;
    border-top: 2px solid var(--bg-surface-hover);
    padding-top: 1em;
  }
  .blog-tag {
    font-size: 0.75em;
    padding: 2px 6px;
    border: 1px solid var(--text-main);
    border-radius: 4px;
    color: inherit;
    text-decoration: none;
  }
  .blog-tag:hover {
    background-color: var(--text-main);
    color: var(--bg-canvas);
  }
  .blog-article {
    color: var(--text-main);
    line-height: 1.6;
  }
  .blog-preview-container {
    margin: 1em 0;
  }
  .blog-preview-img,
  .markdown-body :global(p > img) {
    border-radius: 24px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .markdown-body :global(h1) {
    border-top: none;
    padding-top: 0;
  }
  .markdown-body :global(p) {
    text-align: justify;
    margin-bottom: 1em;
  }
  .markdown-body :global(ul),
  .markdown-body :global(ol) {
    margin-bottom: 1em;
    padding-left: 1.5em;
  }
  .markdown-body :global(li) {
    margin-bottom: 0.5em;
  }
  .markdown-body :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 0.85em;
  }
  .markdown-body :global(th),
  .markdown-body :global(td) {
    padding: 0.45em 0.75em;
    border-bottom: 1px solid var(--bg-surface-hover);
    width: auto;
  }
  .markdown-body :global(th) {
    background-color: var(--bg-surface);
    color: var(--text-main);
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: 0.05em;
    text-align: left;
    border-bottom: 2px solid var(--text-main);
  }
  .markdown-body :global(.table-overflow) {
    width: 100%;
    overflow-x: auto;
    margin: 1.5em 0;
  }
  .markdown-body :global(.table-overflow table) {
    display: table;
    width: 100%;
    min-width: max-content;
    margin: 0;
  }
  .markdown-body :global(.table-overflow th),
  .markdown-body :global(.table-overflow td) {
    white-space: nowrap;
  }
  .markdown-body :global(tr:last-child td) {
    border-bottom: none;
  }
  .markdown-body :global(tr:nth-child(even)) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  @media (prefers-color-scheme: dark) {
    .markdown-body :global(tr:nth-child(even)) {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
  .markdown-body :global(tr:hover) {
    background-color: var(--bg-surface-hover);
  }
  .markdown-body :global(:not(pre) > code) {
    background-color: rgba(175, 184, 193, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 6px;
    font-family:
      "Fantasque Sans Mono",
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 85%;
    margin: 0;
    word-break: break-all;
    white-space: pre-wrap;
  }
  @media (prefers-color-scheme: dark) {
    .markdown-body :global(:not(pre) > code) {
      background-color: rgba(110, 118, 129, 0.4);
    }
  }
  .markdown-body :global(pre) {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid var(--bg-surface-hover);
  }
  @media (prefers-color-scheme: dark) {
    .markdown-body :global(pre) {
      background-color: #161b22;
    }
  }
  .markdown-body :global(pre code) {
    font-family:
      "Fantasque Sans Mono",
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 85%;
    line-height: 1.45;
    background: transparent;
    padding: 0;
    border-radius: 0;
    color: inherit;
  }
  .markdown-body :global(blockquote) {
    margin: 0 0 1em 0;
    padding: 0 1.5em;
    color: var(--text-main);
    opacity: 0.7;
    border-left: 0.25em solid var(--bg-surface-hover);
  }
  .markdown-body :global(blockquote p) {
    margin: 0;
  }
</style>
