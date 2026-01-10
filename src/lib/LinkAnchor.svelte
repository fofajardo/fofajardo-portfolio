<script lang="ts">
  import type { Link } from "$lib/lib.types";
  import Label from "./Label.svelte";

  let { link, isButton }: { link: Link; isButton?: boolean } = $props();

  let linkTypeIconMap: Record<string, string> = {
    github: "tabler:brand-github",
    figma: "tabler:brand-figma",
    site: "tabler:world-www",
    youtube: "tabler:brand-youtube",
    external: "tabler:external-link"
  };

  let linkLabelMap: Record<string, string> = {
    github: "View on GitHub",
    figma: "View on Figma",
    youtube: "Watch on YouTube",
    site: "Visit Site",
    external: "Visit Link"
  };

  let effectiveIcon = $derived(link.icon ?? linkTypeIconMap[link.type] ?? linkTypeIconMap["external"]);
  let effectiveLabel = $derived(link.label ?? linkLabelMap[link.type] ?? linkLabelMap["external"]);
  let effectiveClass = $derived(isButton ? "button" : "");
</script>

<a class={effectiveClass} href={link.url} target="_blank">
  <Label icon={effectiveIcon}>{effectiveLabel}</Label>
</a>
