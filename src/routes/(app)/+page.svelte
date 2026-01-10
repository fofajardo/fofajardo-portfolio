<script lang="ts">
  import Icon from "@iconify/svelte";
  import Header from "$lib/Header.svelte";

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
          I'm a Computer Science student at the <a target="_blank" href="https://uplb.edu.ph/"
            ><Icon icon="tabler:school" /> University of the Philippines Los Baños</a
          >.<br /><br /> I've been fascinated with technology since I first used our old family
          computer as a kid. I am also a fan of Filipino writing and poetry, RPGs, strategy and
          simulation games, and retro gaming. I occasionally post about some of those topics in my
          blog,
          <a target="_blank" href="https://saligsig.wordpress.com/"
            ><Icon icon="tabler:brand-wordpress" /> Saligsig</a
          >.
          <br /><br />
          Take a closer look at my
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1FkoQdk_GV_Ad2Lb7VSxhBX6uddumziwo/view?usp=drive_link"
            ><Icon icon="tabler:file-type-pdf" /> résumé</a
          > to explore my qualifications and experiences.
        </p>
      </div>
    </section>
  </main>
</div>
