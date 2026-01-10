<script lang="ts">
  import DateRangeSpan from "$lib/DateRangeSpan.svelte";
  import Icon from "@iconify/svelte";

  let { data } = $props();
  let { experience, experienceCategories } = $derived(data);
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
  {#each experienceCategories as experienceCategory}
    <h2>{experienceCategory.name}</h2>
    <div class="cardset">
      {#each experience[experienceCategory.id] as exp}
        <div class="box-sb">
          <div class="card-icon">
            <Icon class="icon" icon="tabler:arrow-badge-right"></Icon>
          </div>
          <div class="card-detail" style="flex:1;">
            <div class="box-sb">
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
            {#if exp.link}
              <a target="_blank" href={exp.link.url}>
                <Icon icon="tabler:external-link"></Icon>
                {exp.link.label}
              </a>
              <br /><br />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</section>
