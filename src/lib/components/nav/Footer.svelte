<script>
  import { LinkAnchor } from "$comp/ui";
  import { ThemeSwitcher } from ".";

  let year = new Date().getFullYear();
</script>

<footer class="content-layout center">
  <span class="copyright">
    &copy; {year} Francis Dominic Fajardo
  </span>
  <span class="built-with">
    Built with <LinkAnchor
      link={{
        url: "https://svelte.dev",
        type: "custom",
        label: "Svelte",
        icon: "devicon-plain:svelte"
      }}
    /> | Fork me on <LinkAnchor
      link={{
        url: "https://github.com/fofajardo/fofajardo-portfolio",
        type: "github",
        label: "GitHub"
      }}
    />
  </span>
  <ThemeSwitcher variant="footer" />
  <noscript>
    Yeah, this site works without JavaScript!
    <p>
      "Simplicity is a great virtue but it requires hard work to achieve it and education to
      appreciate it. And to make matters worse: complexity sells better." <a
        href="https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD896.html">(Dijkstra, 1984)</a
      >
    </p>
  </noscript>
</footer>

<style>
  footer {
    padding-top: 3rem;
    padding-bottom: 5rem;
  }

  .copyright {
    font-size: 0.85rem;
    opacity: 0.45;
    letter-spacing: 0.02em;
  }

  noscript,
  .built-with {
    font-size: 0.75rem;
    opacity: 0.4;
    margin-top: 0.5rem;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  noscript {
    flex-direction: column;
  }

  noscript > p {
    font-family: serif;
    font-style: italic;
    max-width: 300px;
  }

  .built-with :global(a) {
    color: inherit;
  }
</style>
