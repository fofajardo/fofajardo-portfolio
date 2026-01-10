<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Icon from "@iconify/svelte";

  let { data } = $props();
  let { experiencesByCategoryMap, experienceCategories } = $derived(data);
</script>

<svelte:head>
  <title>Francis Dominic Fajardo - Experience</title>
  <meta
    name="description"
    content="A collection of my professional experience, volunteering, and invited talks."
  />
</svelte:head>

<section class="content-layout">
  <h1>Experience</h1>
  {#each experienceCategories as category}
    <h2 id={category.id}>{category.name}</h2>
    <div class="cardset">
      {#each experiencesByCategoryMap.get(category.id) ?? [] as exp}
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
            <ul>
              {#each exp.points as point}
                <li>{point}</li>
              {/each}
            </ul>
            {#each exp.links as link}
              <LinkAnchor {link} />
              <br /><br />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</section>
