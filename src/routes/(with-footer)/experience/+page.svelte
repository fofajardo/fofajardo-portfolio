<script lang="ts">
	import Header from "$lib/header.svelte";
    import Icon from "@iconify/svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Francis Dominic Fajardo - Experience</title>
    <meta name="description" content="A collection of my professional experience, volunteering, and invited talks." />
</svelte:head>

<Header {data} />
<main>
    <section class="bg" id="experience">
        <div id="section-experience" class="content-layout">
            <h1>Experience</h1>
            <div id="cardset-experience-extracurricular" class="cardset">
                {#each data.experience as exp}
                    <div class="box-sb">
                        <div class="card-icon">
                            <Icon class="icon" icon="tabler:arrow-badge-right"></Icon>
                        </div>
                        <div class="card-detail" style="flex:1;">
                            <div class="box-sb">
                                <span style="font-size: 1.25em; font-weight: bold; max-width: 30em;">
                                    {exp.title}
                                </span>
                               <span>
                                    {exp.dateStart || ""}
                                    {exp.dateEnd !== undefined ? (exp.dateEnd ? ` – ${exp.dateEnd}` : "") : " – Present"}
                                </span>
                             </div>
                            <span>{exp.organization}</span>
                            <ul>
                                {#each exp.points as point}
                                    <li>{point}</li>
                                {/each}
                            </ul>
                            {#if exp.link}
                                <a target="_blank" href={exp.link.url}>
                                    <Icon icon="tabler:external-link"></Icon> {exp.link.label}
                                </a>
                                <br/><br/>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="bg" id="volunteering">
        <div id="section-volunteering" class="content-layout">
            <h2>Volunteering</h2>
            <div id="cardset-experience-extracurricular" class="cardset">
                {#each data.volunteering as vol}
                    <div class="box-sb">
                        <div class="card-icon">
                            <Icon class="icon" icon="tabler:arrow-badge-right"></Icon>
                        </div>
                        <div class="card-detail" style="flex:1;">
                            <div class="box-sb">
                                <span style="font-size: 1.25em; font-weight: bold;">
                                    {vol.title}
                                </span>
                                <span>
                                    {vol.dateStart || ""}
                                    {vol.dateEnd !== undefined ? (vol.dateEnd ? ` – ${vol.dateEnd}` : "") : " – Present"}
                                </span>
                            </div>
                            <span>{vol.organization}</span>
                            <ul>
                                {#each vol.points as point}
                                    <li>{point}</li>
                                {/each}
                            </ul>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <section class="bg" id="talks">
        <div id="section-talks" class="content-layout">
            <h2>Invited Talks and Presentations</h2>
            <div id="cardset-experience-extracurricular" class="cardset">
                {#each data.talks as talk}
                    <div class="box-sb">
                        <div class="card-icon">
                            <Icon class="icon" icon="tabler:arrow-badge-right"></Icon>
                        </div>
                        <div class="card-detail" style="flex:1;">
                            <div class="box-sb">
                                <span style="font-size: 1.25em; font-weight: bold;">
                                    {talk.title}
                                </span>
                                <span>
                                    {talk.dateStart || ""}
                                    {talk.dateEnd !== undefined ? (talk.dateEnd ? ` – ${talk.dateEnd}` : "") : " – Present"}
                                </span>
                            </div>
                            <span>{talk.organization}</span>
                            <p style="text-align: justify;">{talk.description}</p>
                            {#if talk.link}
                                <a target="_blank" href={talk.link.url}>
                                    <Icon icon="tabler:external-link"></Icon> {talk.link.label}
                                </a>
                                <br/><br/>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
</main>