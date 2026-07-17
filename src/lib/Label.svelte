<script lang="ts">
  import Icon from "$lib/Icon.svelte";

  let { icon, lead = "", children, as = "span" } = $props();
</script>

<svelte:element this={as} class="label">
  <span class="lead"><Icon {icon} /> {lead}</span>
  {@render children()}
</svelte:element>

<style>
  .lead {
    white-space: nowrap;
  }

  .label {
    display: inline;
  }

  .label :global(svg) {
    display: inline-block;
    vertical-align: text-bottom;
    margin-bottom: 1px;
  }
</style>
