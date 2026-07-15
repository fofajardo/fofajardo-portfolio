<script lang="ts">
  import "$lib/styles/common.css";
  import MatrixBackground from "$lib/MatrixBackground.svelte";

  let { children } = $props();

  import { page } from "$app/state";
  import { onNavigate } from "$app/navigation";
  onNavigate((navigation) => {
    if (!document.startViewTransition) {
      return;
    }

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  const baseTitle = "Francis Dominic Fajardo";
  const title = $derived(
    page.data.absoluteTitle
      ? page.data.title
      : page.data.title
        ? `${page.data.title} - ${baseTitle}`
        : `${baseTitle} - Software Developer`
  );
  const description = $derived(page.data.description ?? "Francis Dominic Fajardo's Portfolio");
  const ogType = $derived(page.data.ogType ?? "website");
  const ogImage = $derived(
    page.data.ogImage && (page.data.ogImage.startsWith("/") || page.data.ogImage.startsWith("http"))
      ? new URL(page.data.ogImage, page.url.origin).href
      : ""
  );
  const ogTitle = $derived(page.data.title ?? `${baseTitle} - Software Developer`);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:site_name" content="Francis Dominic Fajardo" />
  <meta property="og:type" content={ogType} />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  {#if ogImage}
    <meta property="og:image" content={ogImage} />
  {/if}
  {#if page.data.author}
    <meta property="og:article:author" content={page.data.author} />
  {/if}
  {#if page.data.publishedTime}
    <meta property="og:article:published_time" content={page.data.publishedTime} />
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
