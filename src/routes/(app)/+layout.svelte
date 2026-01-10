<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import Header from "$lib/Header.svelte";
  import { page } from "$app/state";

  let { data, children } = $props();
</script>

{#if page.url.pathname !== "/"}
  <Header {data} launcher={false} />
{/if}

{@render children()}

{#if page.url.pathname !== "/"}
  <Footer />
{/if}
