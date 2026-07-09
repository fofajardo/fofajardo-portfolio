<script lang="ts">
  import Header from "$lib/Header.svelte";

  const { data } = $props();
  const { nav } = $derived(data);
</script>

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
