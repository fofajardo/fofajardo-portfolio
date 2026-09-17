<script lang="ts">
  import type { Link } from "$lib/lib.types";
  import Label from "./Label.svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";

  let { link, isButton, isInternal }: { link: Link; isButton?: boolean; isInternal?: boolean } =
    $props();

  let linkTypeIconMap: Record<string, string> = {
    github: "ph:github-logo-bold",
    figma: "ph:figma-logo-bold",
    site: "ph:globe-bold",
    youtube: "ph:youtube-logo-bold",
    external: "ph:arrow-square-out-bold",
    researchPaperPdf: "ph:file-pdf-bold",
    gameDemo: "ph:game-controller-bold",
    gdrive: "ph:google-drive-logo-bold",
    npm: "ph:package-bold"
  };

  let linkLabelMap: Record<string, string> = {
    github: "View on GitHub",
    figma: "View on Figma",
    youtube: "Watch on YouTube",
    site: "Visit Site",
    external: "Visit Link",
    researchPaperPdf: "View Research Paper",
    gameDemo: "Play Online Demo",
    gdrive: "Open in Drive",
    npm: "View on NPM"
  };

  let icon = $derived(link.icon ?? linkTypeIconMap[link.type] ?? linkTypeIconMap["external"]);
  let label = $derived(link.label ?? linkLabelMap[link.type] ?? linkLabelMap["external"]);
  let lead = $derived(link.lead ?? "");
  let anchorClass = $derived(isButton ? "button" : "");
</script>

{#snippet labelWithIcon(icon: string, label: string, lead: string)}
  <Label {icon} {lead}>{label}</Label>
{/snippet}

{#if isInternal}
  <a class={anchorClass} href={resolve(link.url as Pathname)}>
    {@render labelWithIcon(icon, label, lead)}
  </a>
{:else}
  <a class={anchorClass} href={link.url} target="_blank" rel="external">
    {@render labelWithIcon(icon, label, lead)}
  </a>
{/if}
