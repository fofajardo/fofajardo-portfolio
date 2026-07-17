<script lang="ts">
  import { formatDate } from "$lib/utils";
  import Giscus from "@giscus/svelte";
  import DropdownButton from "$lib/DropdownButton.svelte";
  import { resetFigureCounter } from "$lib/Figure.svelte";
  import { resetTableCounter } from "$lib/Table.svelte";
  import HeroArt from "$lib/HeroArt.svelte";
  import { themeStore } from "$lib/themeStore";

  import { page } from "$app/state";

  const { data } = $props();
  const meta = $derived(data.meta);
  const Content = $derived(data.content);

  const giscusTheme = $derived.by(() => {
    if ($themeStore === "device") {
      return "preferred_color_scheme";
    }
    if ($themeStore === "light") {
      return "light";
    }
    return "transparent_dark";
  });

  // Reset counters synchronously before Svelte renders the children
  const _ = $derived.by(() => {
    meta;
    resetFigureCounter();
    resetTableCounter();
    return null;
  });

  const discussOptions = $derived(
    meta.discuss
      ? ([
          meta.discuss.reddit && {
            label: "Reddit",
            icon: "simple-icons:reddit",
            url: meta.discuss.reddit
          },
          meta.discuss.twitter && {
            label: "Twitter / X",
            icon: "simple-icons:x",
            url: meta.discuss.twitter
          },
          meta.discuss.facebook && {
            label: "Facebook",
            icon: "simple-icons:facebook",
            url: meta.discuss.facebook
          },
          meta.discuss.mastodon && {
            label: "Mastodon",
            icon: "simple-icons:mastodon",
            url: meta.discuss.mastodon
          }
        ].filter(Boolean) as Array<{ label: string; icon: string; url: string }>)
      : []
  );

  const shareOptions = $derived([
    {
      label: "Twitter / X",
      icon: "simple-icons:x",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(page.url.href)}&text=${encodeURIComponent(meta.title)}`
    },
    {
      label: "Reddit",
      icon: "simple-icons:reddit",
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(page.url.href)}&title=${encodeURIComponent(meta.title)}`
    },
    {
      label: "Facebook",
      icon: "simple-icons:facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(page.url.href)}`
    },
    {
      label: "Mastodon",
      icon: "simple-icons:mastodon",
      url: `https://share.joinmastodon.org/#text=${encodeURIComponent(meta.title + " " + page.url.href)}`
    },
    {
      label: "Copy Link",
      icon: "tabler:copy",
      onClick: () => navigator.clipboard.writeText(page.url.href)
    }
  ]);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="heading-container">
  <HeroArt type="blog" />
  <div class="heading-content">
    <div class="primary-header-wrapper">
      <h1>{meta.title}</h1>
      {#if meta.description}
        <p class="blog-subtitle">{meta.description}</p>
      {/if}
      <div class="blog-meta-row">
        {#if meta.author}
          <span class="blog-author">{meta.author}</span>
        {/if}
        <span class="blog-date">{formatDate(meta.date)}</span>
      </div>
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
          <a href="/blog/tag/{tag}" class="link">
            #{tag}
          </a>
        {/each}
      </div>
    {/if}

    <div class="blog-actions">
      {#if discussOptions.length > 0}
        <DropdownButton label="Discuss" icon="tabler:messages" options={discussOptions} />
      {/if}
      <DropdownButton label="Share" icon="tabler:share" options={shareOptions} />
    </div>
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
    theme={giscusTheme}
    lang="en"
    term=""
    loading="lazy"
  />
</section>

<style>
  .primary-header-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 1.5em;
    margin-bottom: 2em;
  }
  .primary-header-wrapper h1 {
    font-family: "Instrument Serif", Georgia, Garamond, serif;
    font-size: 5em;
    font-weight: 800;
    line-height: 1;
    margin: 0.1em 0 0.25em 0;
    color: var(--text-main);
    letter-spacing: -0.04em;
    text-transform: none;
  }
  .blog-subtitle {
    font-family: "Instrument Serif", Georgia, Garamond, serif;
    font-size: 1.55em;
    line-height: 1.35;
    margin: 0 0 1.25em 0;
    max-width: 700px;
    color: var(--text-main);
    opacity: 0.9;
  }
  @media screen and (max-width: 625px) {
    .primary-header-wrapper h1 {
      font-size: 3em;
    }
    .blog-subtitle {
      font-size: 1.25em;
    }
  }
  .blog-meta-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em;
  }
  .blog-author {
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-main);
  }
  .blog-date {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .blog-tags {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    margin-top: 2em;
    border-top: 2px solid var(--bg-surface-hover);
    padding-top: 1em;
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
    background-color: var(--bg-table-even);
  }
  .markdown-body :global(tr:hover) {
    background-color: var(--bg-surface-hover);
  }
  .markdown-body :global(:not(pre) > code) {
    background-color: var(--bg-code-inline);
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
  .markdown-body :global(pre) {
    background-color: var(--bg-code-block);
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5em 0;
    border: 1px solid var(--bg-surface-hover);
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
  .blog-actions {
    display: flex;
    gap: 12px;
    margin-top: 1em;
    margin-bottom: 1em;
    flex-wrap: wrap;
  }
</style>
