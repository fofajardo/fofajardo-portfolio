<script lang="ts">
  import { onMount } from "svelte";

  const { data } = $props();

  onMount(() => {
    if (data.redirectUrl) {
      window.location.replace(data.redirectUrl);
    }
  });
</script>

<svelte:head>
  {#if data.redirectUrl}
    <meta http-equiv="refresh" content="0; url={data.redirectUrl}" />
  {/if}
</svelte:head>

<div class="redirect-container">
  <p>Redirecting to <a href={data.redirectUrl}>{data.redirectUrl}</a>…</p>
</div>

<style>
  .redirect-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-family: inherit;
    color: var(--text-main);
  }
  a {
    color: var(--text-main);
    text-decoration: underline;
  }
</style>
