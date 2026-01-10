<script lang="ts">
  import type { Link } from "$lib/lib.types";
  import Label from "./Label.svelte";

  let { link, isButton, isInternal }: { link: Link; isButton?: boolean; isInternal?: boolean } =
    $props();

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

  let icon = $derived(link.icon ?? linkTypeIconMap[link.type] ?? linkTypeIconMap["external"]);
  let label = $derived(link.label ?? linkLabelMap[link.type] ?? linkLabelMap["external"]);
  let anchorClass = $derived(isButton ? "button" : "");
</script>

<a class={anchorClass} href={link.url} target={isInternal ? undefined : "_blank"}>
  <Label {icon}>{label}</Label>
</a>
