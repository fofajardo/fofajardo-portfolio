<script lang="ts">
  import type { Link } from "$lib/lib.types";
  import Label from "./Label.svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";

  let { link, isButton, isInternal }: { link: Link; isButton?: boolean; isInternal?: boolean } =
    $props();

  let linkTypeIconMap: Record<string, string> = {
    github: "tabler:brand-github",
    figma: "tabler:brand-figma",
    site: "tabler:world-www",
    youtube: "tabler:brand-youtube",
    external: "tabler:external-link",
    researchPaperPdf: "tabler:file-type-pdf",
    gameDemo: "tabler:device-gamepad"
  };

  let linkLabelMap: Record<string, string> = {
    github: "View on GitHub",
    figma: "View on Figma",
    youtube: "Watch on YouTube",
    site: "Visit Site",
    external: "Visit Link",
    researchPaperPdf: "View Research Paper",
    gameDemo: "Play Online Demo"
  };

  let icon = $derived(link.icon ?? linkTypeIconMap[link.type] ?? linkTypeIconMap["external"]);
  let label = $derived(link.label ?? linkLabelMap[link.type] ?? linkLabelMap["external"]);
  let anchorClass = $derived(isButton ? "button" : "");
</script>

{#snippet labelWithIcon(icon: string, label: string)}
  <Label {icon}>{label}</Label>
{/snippet}

{#if isInternal}
  <a class={anchorClass} href={resolve(link.url as Pathname)}>
    {@render labelWithIcon(icon, label)}
  </a>
{:else}
  <a class={anchorClass} href={link.url} target="_blank" rel="external">
    {@render labelWithIcon(icon, label)}
  </a>
{/if}
