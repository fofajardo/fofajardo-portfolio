<script lang="ts">
  import type { Entry } from "$lib/lib.types";

  let { entry }: { entry: Entry } = $props();

  function formatDate(dateStr: string | undefined): string {
    if (!dateStr || dateStr.trim() === "") {
      return "";
    }
    const parts = dateStr.split("-");
    if (parts.length === 2) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]);
      return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
        new Date(year, month - 1)
      );
    }
    return dateStr;
  }
</script>

<span>
  {formatDate(entry.dateStart)}
  {entry.dateEnd !== undefined
    ? entry.dateEnd
      ? ` – ${formatDate(entry.dateEnd)}`
      : ""
    : " – Present"}
</span>
