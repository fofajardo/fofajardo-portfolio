<script lang="ts">
  import Header from "$lib/Header.svelte";
  import LinkAnchor from "$lib/LinkAnchor.svelte";

  const { data } = $props();
  const { nav } = $derived(data);
</script>

<svelte:head>
  <!-- Mastodon -->
  <link rel="me" href="https://fosstodon.org/@fajardo" />
  <link rel="me" href="https://social.up.edu.ph/@fofajardo" />
</svelte:head>

<div class="full center-v">
  <Header {nav} launcher={false} />
  <main>
    <section class="content-layout">
      <div class="card">
        <p style="text-align: justify; margin: 0;">
          I'm a Computer Science student at the <LinkAnchor
            link={{
              icon: "tabler:school",
              label: "University of the Philippines Los Baños",
              url: "https://uplb.edu.ph/",
              type: "custom"
            }}
          />.
          <br /><br /> I've been fascinated with technology since I first used our old family
          computer as a kid. I am also a fan of Filipino writing and poetry, RPGs, strategy and
          simulation games, and retro gaming. I occasionally post about some of those topics in my
          blog,
          <LinkAnchor
            link={{
              icon: "tabler:brand-wordpress",
              label: "Saligsig",
              url: "https://saligsig.wordpress.com/",
              type: "custom"
            }}
          />.
          <br /><br />
          Take a closer look at my
          <LinkAnchor
            link={{
              icon: "tabler:file-type-pdf",
              url: "https://drive.google.com/file/d/1FkoQdk_GV_Ad2Lb7VSxhBX6uddumziwo/view?usp=drive_link",
              label: "résumé",
              type: "custom"
            }}
          />
          to explore my qualifications and experiences.
        </p>
      </div>
    </section>
  </main>
</div>
