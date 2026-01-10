<script lang="ts">
  import type { Entry } from "$lib/lib.types";

  let { entry }: { entry: Entry } = $props();
</script>

<span>
  {entry.dateStart || ""}
  {entry.dateEnd !== undefined ? (entry.dateEnd ? ` – ${entry.dateEnd}` : "") : " – Present"}
</span>
