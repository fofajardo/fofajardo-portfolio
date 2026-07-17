<script lang="ts">
  import Launcher from "$lib/Launcher.svelte";

  const { data } = $props();
  const { nav } = $derived(data);
</script>

<div class="full center-v">
  <Launcher {nav} launcher={true} />
</div>

<style>
  :root {
    --bg-canvas: #000000;
    --text-main: #33ff33;
  }
</style>
