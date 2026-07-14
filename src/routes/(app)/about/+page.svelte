<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import { CategoryType } from "$lib/lib.types.js";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Icon from "$lib/Icon.svelte";
  import TagBadge from "$lib/TagBadge.svelte";
  import { experiencesByTagMap, tagsByCategoryMap, tags } from "$lib/dataService";

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

<section class="content-layout">
  {#each tagsByCategoryMap.get(CategoryType.Experience) ?? [] as tag (tag.id)}
    <h2 id={tag.id}>{tag.name}</h2>
    <div class="cardset">
      {#each experiencesByTagMap.get(tag.id) ?? [] as exp, expIndex (expIndex)}
        <div class="card card-2col">
          <div class="card-icon">
            <Icon class="icon" icon={tag.icon || "tabler:arrow-badge-right"}></Icon>
          </div>
          <div class="card-detail" style="flex:1;">
            <div class="card-2col">
              <span style="font-size: 1.25em; font-weight: bold; max-width: 30em;">
                {exp.title}
              </span>
              <DateRangeSpan entry={exp} />
            </div>
            <span>{exp.organization}</span>
            {#if exp.description}
              <p>{exp.description}</p>
            {/if}
            <ul>
              {#each exp.points as point, pointIndex (pointIndex)}
                <li>{point}</li>
              {/each}
            </ul>
            {#each exp.links as link, linkIndex (linkIndex)}
              <LinkAnchor {link} />
              <br /><br />
            {/each}
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
</style>
