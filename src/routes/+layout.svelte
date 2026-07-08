<script lang="ts">
  import "$lib/styles/common.css";
  import MatrixBackground from "$lib/MatrixBackground.svelte";

  let { children } = $props();

  import { page } from "$app/state";
  import { onNavigate } from "$app/navigation";
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  const title = $derived(
    page.data.meta?.title
      ? `${page.data.meta.title} - Francis Dominic Fajardo`
      : page.data.project?.title
        ? `${page.data.project.title} - Projects - Francis Dominic Fajardo`
        : "Francis Dominic Fajardo - Software Developer"
  );

  const description = $derived(
    page.data.meta?.description ??
      page.data.project?.subtitle ??
      "Francis Dominic Fajardo's Portfolio"
  );

  const ogType = $derived(page.data.meta ? "article" : "website");

  const ogImage = $derived(
    page.data.meta?.ogImage &&
      (page.data.meta.ogImage.startsWith("/") || page.data.meta.ogImage.startsWith("http"))
      ? new URL(page.data.meta.ogImage, page.url.origin).href
      : page.data.meta?.preview &&
          (page.data.meta.preview.startsWith("/") || page.data.meta.preview.startsWith("http"))
        ? new URL(page.data.meta.preview, page.url.origin).href
        : page.data.project?.preview &&
            (page.data.project.preview.startsWith("/") ||
              page.data.project.preview.startsWith("http"))
          ? new URL(page.data.project.preview, page.url.origin).href
          : ""
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:site_name" content="Francis Dominic Fajardo" />
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
  {/if}
  {#if page.data.meta?.author}
    <meta property="og:article:author" content={page.data.meta.author} />
  {/if}
  {#if page.data.meta?.date}
    <meta property="og:article:published_time" content={page.data.meta.date} />
  {/if}
  <link rel="canonical" href={page.url.href} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Francis Dominic Fajardo's Blog RSS Feed"
    href="/feed.xml"
  />
  <meta name="fediverse:creator" content="@fajardo@fosstodon.org" />
</svelte:head>

<MatrixBackground />
{@render children()}
