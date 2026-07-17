<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page, navigating } from "$app/state";
  import Sidebar from "$lib/Sidebar.svelte";

  const { data, children } = $props();
  const { nav } = $derived(data);
</script>

{#if page.url.pathname !== "/"}
  <Header />
{/if}

<Sidebar {nav} />

<div class:is-navigating={!!navigating.to}>
  {@render children()}
</div>

{#if page.url.pathname !== "/"}
  <Footer />
{/if}
