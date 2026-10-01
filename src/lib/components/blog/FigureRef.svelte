<script lang="ts">
  import { figures } from "./Figure.svelte";

  const { id } = $props<{ id: string }>();
  let num = $derived($figures[id] ?? "?");
</script>

<a href="#{id}">Figure {num}</a>
