<script lang="ts">
  import { HeroArt } from "#comp/background";
  import { LinkAnchor } from "#comp/ui";
</script>

<svelte:head>
  <!-- Mastodon -->
  <link rel="me" href="https://fosstodon.org/@fajardo" />
  <link rel="me" href="https://social.up.edu.ph/@fofajardo" />
</svelte:head>

<HeroArt type="home" />
<main class="full-nh center-v">
  <section class="content-layout">
    <enhanced:img
      src="#content/profile.png"
      class="profile-img"
      alt="Francis Dominic Fajardo's portrait"
    />
    <div class="profile-container">
      <h1 class="profile-heading">I'm Francis Dominic Fajardo.</h1>
      <div class="lead">
        <p>
          I studied Computer Science at the <LinkAnchor
            link={{
              icon: "ph:graduation-cap-bold",
              lead: "University",
              label: " of the Philippines Los Baños",
              url: "https://uplb.edu.ph/",
              type: "custom"
            }}
          /> and was a member of the <LinkAnchor
            link={{
              icon: "ph:flask-bold",
              lead: "Systems",
              label: " Research Group",
              url: "https://srg-ics-uplb.github.io/alumni.html",
              type: "custom"
            }}
          />.
        </p>
        <p>
          Got questions? Take a look at my <LinkAnchor
            link={{
              icon: "ph:file-pdf-bold",
              url: "/resume",
              lead: "résumé",
              label: "",
              type: "custom"
            }}
            isInternal
          /> or <LinkAnchor
            link={{
              icon: "ph:mailbox-bold",
              url: "/contact",
              lead: "reach",
              label: " out",
              type: "custom"
            }}
            isInternal
          />.
        </p>
        <p>
          I've contributed to a number of free and open-source software (FOSS) <LinkAnchor
            link={{
              icon: "ph:traffic-cone-bold",
              url: "/projects",
              lead: "projects",
              label: "",
              type: "custom"
            }}
            isInternal
          />. My research interests include web browser development, information security, reverse
          engineering, and game development. Outside of coding, I <LinkAnchor
            link={{
              icon: "ph:pencil-bold",
              url: "/blog",
              lead: "blog",
              label: "",
              type: "custom"
            }}
            isInternal
          />, write <LinkAnchor
            link={{
              icon: "ph:pen-nib-bold",
              url: "https://saligsig.wordpress.com/",
              lead: "Filipino",
              label: " poetry",
              type: "custom"
            }}
          />, and enjoy RPG, strategy, simulation, and retro games.
        </p>
      </div>
    </div>
  </section>
</main>

<style>
  main {
    width: 100%;
  }

  main > .content-layout {
    padding: 20px;
  }

  .profile-container {
    text-align: justify;
  }

  .profile-container > .lead {
    font-size: 1.2em;
  }

  .profile-img {
    object-fit: cover;
    width: 200px;
    height: 260px;
    float: right;
    margin: 0 0.5em 1.5em 1.15em;
    border: 5px solid var(--bg-surface);
    box-shadow: 10px 10px 0px var(--bg-surface-hover);
  }

  .profile-heading {
    text-align: left;
    border: none;
    margin-bottom: 18px;
    padding: 0;
    line-height: 0.7;
  }

  .full-nh {
    min-height: calc(100vh - 76px);
  }

  @media screen and (max-width: 625px) {
    .profile-heading {
      line-height: 1;
      font-size: xx-large;
    }

    .profile-img {
      width: 120px;
      height: 150px;
      float: none;
      margin: 0 auto 1.5em auto;
      display: block;
    }
  }
</style>
