<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page, navigating } from "$app/state";

  const { data, children } = $props();
  const { nav } = $derived(data);
</script>

{#if page.url.pathname !== "/"}
  <Header {nav} launcher={false} />
{/if}

<div class:is-navigating={!!navigating.to}>
  {@render children()}
</div>

{#if page.url.pathname !== "/"}
  <Footer />
{/if}
