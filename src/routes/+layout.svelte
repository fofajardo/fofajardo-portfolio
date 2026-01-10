<script lang="ts">
  import "$lib/styles/common.css";

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
</script>

<svelte:head>
  <title>Francis Dominic Fajardo - Software Developer</title>
  <meta name="description" content="Francis Dominic Fajardo's Portfolio" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={page.url.href} />
  <meta property="og:title" content="Francis Dominic Fajardo - Software Developer" />
  <meta property="og:description" content="Francis Dominic Fajardo's Portfolio" />
  <link rel="canonical" href={page.url.href} />
</svelte:head>

{@render children()}
