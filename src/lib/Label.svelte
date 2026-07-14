<script lang="ts">
  import Icon from "$lib/Icon.svelte";

  let { icon, children, as = "span" } = $props();
</script>

<svelte:element this={as} class="label">
  <Icon {icon} />
  {@render children()}
</svelte:element>
