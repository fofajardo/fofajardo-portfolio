<script lang="ts">
  import { navigating, page } from "$app/state";
  import { Footer, Header, Sidebar } from "#comp/nav";

  const { data, children } = $props();
  const { nav } = $derived(data);
</script>

<Header {nav} />

<Sidebar {nav} />

<div class:is-navigating={!!navigating.to}>
  {@render children()}
</div>

{#if page.url.pathname !== "/"}
  <Footer />
{/if}
