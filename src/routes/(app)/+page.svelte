<script lang="ts">
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import HeroArt from "$lib/HeroArt.svelte";
  import Header from "$lib/Header.svelte";
</script>

<svelte:head>
  <!-- Mastodon -->
  <link rel="me" href="https://fosstodon.org/@fajardo" />
  <link rel="me" href="https://social.up.edu.ph/@fofajardo" />
</svelte:head>

<div>
  <Header />
  <HeroArt type="home" />
  <main class="transparent full-nh center-v" style="width: 100%;">
    <section class="content-layout">
      <enhanced:img src="$lib/content/profile.png" class="profile-img" />
      <div>
        <h1 class="profile-heading">I'm Francis Dominic Fajardo.</h1>
        <p style="text-align: justify; margin: 0;">
          I studied Computer Science at the <LinkAnchor
            link={{
              icon: "tabler:school",
              lead: "University",
              label: " of the Philippines Los Baños",
              url: "https://uplb.edu.ph/",
              type: "custom"
            }}
          /> and was a member of the <LinkAnchor
            link={{
              icon: "tabler:flask",
              lead: "Systems",
              label: " Research Group",
              url: "https://srg-ics-uplb.github.io",
              type: "custom"
            }}
          />.

          <br /><br />I've contributed to a number of free and open source software (FOSS) projects.
          My research interests include web browser development, information security, reverse
          engineering, and game development. Outside of code, I am also a fan of Filipino writing
          and poetry, RPGs, strategy and simulation games, and retro gaming.
          <br /><br />
          I'm open to work. Take a look at my
          <LinkAnchor
            link={{
              icon: "tabler:file-type-pdf",
              url: "/resume",
              lead: "résumé",
              label: "",
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

<style>
  .profile-img {
    object-fit: cover;
    width: 160px;
    height: 200px;
    float: right;
    margin: 0 0.5em 1.5em 1.15em;
    border: 5px solid var(--bg-surface);
    box-shadow: 10px 10px 0px var(--bg-surface-hover);
  }

  .profile-heading {
    border: none;
    margin-bottom: 18px;
    padding: 0;
    line-height: 0.7;
  }

  .full-nh {
    height: calc(100vh - 168px);
  }

  @media screen and (max-width: 625px) {
    .profile-heading {
      line-height: 1;
    }

    .profile-img {
      width: 120px;
      height: 150px;
      float: none;
      margin: 0 auto 1.5em auto;
      display: block;
    }
  }

  @media screen and (max-height: 700px) {
    .profile-img {
      width: 100px;
      height: 125px;
    }

    /* Hide the scroll hint for this page on tiny screens. */
    :global(.scroll-hint) {
      opacity: 0;
    }

    .full-nh {
      height: auto;
    }
  }
</style>
