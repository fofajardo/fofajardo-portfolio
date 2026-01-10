<script lang="ts">
    import type { EntryWithDateRangeSpan } from "$lib/lib.types";

    let { entry }: { entry: EntryWithDateRangeSpan } = $props();    
</script>

<span>
    {entry.dateStart || ""}
    {entry.dateEnd !== undefined ? (entry.dateEnd ? ` – ${entry.dateEnd}` : "") : " – Present"}
</span>
