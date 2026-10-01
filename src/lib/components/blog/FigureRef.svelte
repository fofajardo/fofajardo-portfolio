<script lang="ts">
  import { figureRecords } from "$lib/counterStore";

  const { id } = $props<{ id: string }>();
  let num = $derived($figureRecords[id] ?? "?");
</script>

<a href="#{id}">Figure {num}</a>
