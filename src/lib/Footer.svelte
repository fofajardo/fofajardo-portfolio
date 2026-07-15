<script>
  import LinkAnchor from "$lib/LinkAnchor.svelte";
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

  .built-with :global(a) {
    color: inherit;
  }
</style>
