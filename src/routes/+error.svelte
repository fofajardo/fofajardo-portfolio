<script lang="ts">
  import { page } from "$app/state";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import Icon from "@iconify/svelte";
</script>

<div class="full center-v">
  <main>
    <section class="content-layout error-page">
      {#if page.status === 404}
        <Icon class="error-page-icon" icon="streamline-cyber:star-wars-r2" />
        <h1>Not The Droids You're Looking For</h1>
        <p>This page has vanished like Alderaan. Perhaps the archives are incomplete?</p>
      {:else}
        <Icon class="error-page-icon" icon="streamline-cyber:star-wars-darth-vader" />
        <h1>I Have a Bad Feeling About This</h1>
        <p>Something went wrong. The dark side of the Force clouded our servers.</p>
        {#if page.error?.message}
          <details>
            <summary>Technical Details</summary>
            <code>{page.status} {page.error.message}</code>
          </details>
          <br />
        {/if}
      {/if}
      <LinkAnchor
        link={{
          icon: "tabler:arrow-back",
          label: "Return to Base",
          url: "/",
          type: "custom"
        }}
        isInternal
      />
    </section>
  </main>
</div>
