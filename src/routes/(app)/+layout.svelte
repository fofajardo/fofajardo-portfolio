<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page } from "$app/state";

  const { data, children } = $props();
  const { nav } = $derived(data);
</script>

{#if page.url.pathname !== "/"}
  <Header {nav} launcher={false} />
{/if}

{@render children()}

{#if page.url.pathname !== "/"}
  <Footer />
{/if}
