<script lang="ts">
  import { tablesStore } from "./Table.svelte";

  const { id } = $props<{ id: string }>();
  let num = $derived($tablesStore[id] ?? "?");
</script>

<a href="#{id}">Table {num}</a>
