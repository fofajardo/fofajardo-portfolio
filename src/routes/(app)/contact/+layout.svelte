<script lang="ts">
  import HeroArt from "$lib/HeroArt.svelte";
  import { page } from "$app/state";

  const { children } = $props();
</script>

<main>
  <div class="heading-container">
    <HeroArt type="contact" />
    <div class="heading-content">
      <div class="card card-project-metadata">
        <h1>{page.data.title}</h1>
        <span class="project-subtitle"
          >Find all the ways to contact me, including email, social media, and more.</span
        >
      </div>
    </div>
  </div>

  <section class="content-layout">
    {@render children()}

    <div class="disclaimer">
      <p>
        Please note that only the accounts listed above are officially mine. Any other accounts
        using my name are not affiliated with me. There are, after all, people out there with the
        exact same name as me!
      </p>
      <p>
        Some of my messages and commits are signed and can be verified using GPG to help ensure they
        have not been tampered with.
      </p>
      <div class="key">
        <p>GPG Key ID:</p>
        <pre>D8FEB7FD0D13D6FC</pre>
      </div>
      <div class="key">
        <p>Public key fingerprint:</p>
        <pre>F99B AAE8 62CB ACB4 015E 3415 C5E2 B8EE D586 CCE0</pre>
      </div>
    </div>
  </section>
</main>

<style>
  .heading-container {
    padding-bottom: 1.5em;
  }

  .disclaimer {
    margin-top: 4em;
    text-align: justify;
  }

  .key > pre {
    font-size: 2em;
    overflow: auto;
    background: var(--bg-surface);
    margin: 0;
    padding: 0.75em;
    border-radius: 24px;
  }

  .key:first-of-type {
    margin-bottom: 1em;
  }
</style>
