<script lang="ts">
  import Header from "$lib/Header.svelte";

  const { data } = $props();
  const { nav } = $derived(data);
</script>

<svelte:head>
  <title>λ</title>
  <meta name="description" content="Francis Dominic Fajardo's Start Page" />
  <meta property="og:title" content="Francis Dominic Fajardo's Start Page" />
  <meta property="og:description" content="Francis Dominic Fajardo's Start Page" />
</svelte:head>

<div class="full center-v">
  <Header {nav} launcher={true} />
</div>

<style>
  :root {
    --bg-canvas: #000000;
    --text-main: #33ff33;
    --hero-background: #000000;
  }
</style>
