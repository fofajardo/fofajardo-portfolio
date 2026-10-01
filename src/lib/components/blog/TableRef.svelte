<script lang="ts">
  import { tableRecords } from "$lib/counterStore";

  const { id } = $props<{ id: string }>();
  let num = $derived($tableRecords[id] ?? "?");
</script>

<a href="#{id}">Table {num}</a>
