<script lang="ts">
  import Header from "$lib/Header.svelte";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import HeroArt from "$lib/HeroArt.svelte";

  const { data } = $props();
  const { nav } = $derived(data);
</script>

<svelte:head>
  <!-- Mastodon -->
  <link rel="me" href="https://fosstodon.org/@fajardo" />
  <link rel="me" href="https://social.up.edu.ph/@fofajardo" />
</svelte:head>

<div class="full center-v" style="position: relative; overflow: hidden; width: 100%;">
  <HeroArt type="home" />

  <div
    style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; width: 100%;"
  >
    <Header {nav} launcher={false} />
    <main class="transparent" style="width: 100%;">
      <section class="content-layout">
        <div class="card" style="margin-top: 1em;">
          <p style="text-align: justify; margin: 0;">
            I studied Computer Science at the <LinkAnchor
              link={{
                icon: "tabler:school",
                label: "University of the Philippines Los Baños",
                url: "https://uplb.edu.ph/",
                type: "custom"
              }}
            /> and was a member of the <LinkAnchor
              link={{
                icon: "tabler:flask",
                label: "Systems Research Group",
                url: "https://srg-ics-uplb.github.io",
                type: "custom"
              }}
            />.

            <br /><br />I've contributed to a number of free and open source software (FOSS)
            projects. My research interests include web browser development, information security,
            reverse engineering, and game development. Outside of code, I am also a fan of Filipino
            writing and poetry, RPGs, strategy and simulation games, and retro gaming.
            <br /><br />
            I'm open to work. Take a look at my
            <LinkAnchor
              link={{
                icon: "tabler:file-type-pdf",
                url: "/resume",
                label: "résumé",
                type: "custom"
              }}
              isInternal
            />
            to explore my qualifications and experiences.
          </p>
        </div>
      </section>
    </main>
  </div>
</div>
