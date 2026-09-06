<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import type { ExperienceEntry } from "$lib/lib.types";
  import { CategoryType } from "$lib/lib.types.js";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Icon from "$lib/Icon.svelte";
  import TagBadge from "$lib/TagBadge.svelte";
  import HeroArt from "$lib/HeroArt.svelte";
  import {
    experiencesByTagMap,
    tagsByCategoryMap,
    tags,
    getExperienceDisplayItems
  } from "$lib/dataService";

  const langIds = tags
    .filter((t) => t.category === CategoryType.Technology && !t.hideSkill)
    .map((t) => t.id);

  const ideIds = tags.filter((t) => t.category === CategoryType.IDE).map((t) => t.id);

  const toolIds = tags.filter((t) => t.category === CategoryType.Tool).map((t) => t.id);

  const designVideoIds = tags
    .filter((t) => t.category === CategoryType.GraphicDesign)
    .map((t) => t.id);
</script>

<div class="heading-container">
  <HeroArt type="about" />
  <div class="heading-content">
    <h1>About Me</h1>
    <LinkAnchor
      link={{
        type: "custom",
        url: "/resume",
        label: "View Résumé",
        icon: "tabler:file-text"
      }}
      isButton
      isInternal
    />
  </div>
</div>

{#snippet experienceContent(exp: ExperienceEntry, isNested: boolean = false)}
  <div style="font-size: {isNested ? '1.1em' : '1.25em'}; font-weight: bold; max-width: 30em;">
    {exp.title}
  </div>
  <div>
    <DateRangeSpan entry={exp} />
  </div>
  {#if !isNested}
    <span>{exp.organization}</span>
  {/if}
  {#if exp.employmentType}
    <div>{exp.employmentType}</div>
  {/if}
  {#if exp.description}
    <p>{exp.description}</p>
  {/if}
  {#if exp.points && exp.points.length > 0}
    <ul>
      {#each exp.points as point, pointIndex (pointIndex)}
        <li>{point}</li>
      {/each}
    </ul>
  {/if}
  {#if exp.links && exp.links.length > 0}
    {#each exp.links as link, linkIndex (linkIndex)}
      <LinkAnchor {link} />
      <br /><br />
    {/each}
  {/if}
{/snippet}

<section class="content-layout">
  {#each tagsByCategoryMap.get(CategoryType.Experience) ?? [] as tag (tag.id)}
    <h2 id={tag.id}>{tag.name}</h2>
    <div class="cardset">
      {#each getExperienceDisplayItems(experiencesByTagMap.get(tag.id) ?? []) as groupEntry, groupIndex (groupIndex)}
        <div class="card card-2col">
          <div class="card-icon">
            <Icon class="icon" icon={tag.icon || "tabler:arrow-badge-right"}></Icon>
          </div>
          <div class="card-detail" style="flex:1;">
            {#if groupEntry.isGroup}
              <span style="font-size: 1.25em; font-weight: bold; max-width: 30em;">
                {groupEntry.organization}
              </span>
              {#if groupEntry.location && groupEntry.locationType}
                <div>{groupEntry.location} · {groupEntry.locationType}</div>
              {/if}

              <div class="timeline-group">
                {#each groupEntry.items as exp, expIndex (expIndex)}
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      {@render experienceContent(exp, true)}
                    </div>
                  </div>
                {/each}
              </div>
            {:else}
              {@render experienceContent(groupEntry.items[0], false)}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/each}

  <h2 id="skills">Technical Skills</h2>

  <h3 style="margin-top: 1.5em; font-size: 1.15em; font-weight: 600; color: var(--text-muted);">
    Languages & Frameworks
  </h3>
  <div class="tech-badge-container">
    {#each langIds as tagId (tagId)}
      <TagBadge {tagId} />
    {/each}
  </div>

  <h3 style="margin-top: 1.5em; font-size: 1.15em; font-weight: 600; color: var(--text-muted);">
    IDEs
  </h3>
  <div class="tech-badge-container">
    {#each ideIds as tagId (tagId)}
      <TagBadge {tagId} />
    {/each}
  </div>

  <h3 style="margin-top: 1.5em; font-size: 1.15em; font-weight: 600; color: var(--text-muted);">
    Tools
  </h3>
  <div class="tech-badge-container">
    {#each toolIds as tagId (tagId)}
      <TagBadge {tagId} />
    {/each}
  </div>

  <h3 style="margin-top: 1.5em; font-size: 1.15em; font-weight: 600; color: var(--text-muted);">
    Graphic Design & Video Production
  </h3>
  <div class="tech-badge-container">
    {#each designVideoIds as tagId (tagId)}
      <TagBadge {tagId} />
    {/each}
  </div>
</section>

<style>
  .tech-badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: 0.75em;
  }

  .timeline-group {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  }

  .timeline-item {
    position: relative;
    padding-left: 24px;
    padding-bottom: 1.5em;
  }

  .timeline-item:last-child {
    padding-bottom: 0;
  }

  .timeline-item:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 23px;
    bottom: 0;
    width: 1.5666px;
    background: var(--bg-surface-hover);
  }

  .timeline-dot {
    position: absolute;
    left: 0;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--text-main);
    box-sizing: border-box;
  }
</style>
