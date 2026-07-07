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
    width: 100%;
    max-height: 400px;
    overflow: hidden;
    border-radius: 16px;
    margin: 1em 0;
  }
  .blog-preview-img {
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
  .markdown-body :global(h2),
  .markdown-body :global(h3) {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    border-bottom: 1px solid var(--palette-gray-transparent);
    padding-bottom: 0.25em;
  }
</style>
