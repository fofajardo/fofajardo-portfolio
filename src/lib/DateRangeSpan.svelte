<script lang="ts" module>
    export interface EntryWithDateRangeSpan {
        dateStart?: string;
        dateEnd?: string;
    }
</script>

<script lang="ts">
    let { entry }: { entry: EntryWithDateRangeSpan } = $props();    
</script>

<span>
    {entry.dateStart || ""}
    {entry.dateEnd !== undefined ? (entry.dateEnd ? ` – ${entry.dateEnd}` : "") : " – Present"}
</span>
