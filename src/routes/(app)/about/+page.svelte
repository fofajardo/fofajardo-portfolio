<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import { CategoryType } from "$lib/lib.types.js";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Icon from "@iconify/svelte";
  import TagBadge from "$lib/TagBadge.svelte";
  import { experiencesByTagMap, tagsByCategoryMap, technologies } from "$lib/dataService";
</script>

<div class="heading-container">
  <div class="heading-content">
    <h1>About Me</h1>
  </div>
</div>

<section class="content-layout">
  {#each tagsByCategoryMap.get(CategoryType.Experience) ?? [] as tag (tag.id)}
    <h2 id={tag.id}>{tag.name}</h2>
    <div class="cardset">
      {#each experiencesByTagMap.get(tag.id) ?? [] as exp, expIndex (expIndex)}
        <div class="card card-2col">
          <div class="card-icon">
            <Icon class="icon" icon="tabler:arrow-badge-right"></Icon>
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
  <div class="tech-badge-container">
    {#each Object.keys(technologies) as tagId (tagId)}
      {#if !technologies[tagId].hideSkill}
        <TagBadge {tagId} />
      {/if}
    {/each}
  </div>
</section>

<style>
  .tech-badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-top: 1.5em;
  }
</style>
