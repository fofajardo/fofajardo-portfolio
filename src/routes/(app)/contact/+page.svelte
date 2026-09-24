<script lang="ts">
  import Icon from "$lib/Icon.svelte";

  const { data } = $props();
  const { contacts } = $derived(data);
</script>

<div class="cardset grid">
  {#each contacts as contactLink}
    <a class="card card-anchor card-contact" href={contactLink.href}>
      <div class="card-icon">
        <Icon icon={contactLink.icon} class="icon-inner" />
      </div>
      <div class="card-detail">
        <div class="card-header">
          <span class="card-title">
            {contactLink.label}
          </span>
          <span class="card-subtitle">{@html contactLink.subtitle}</span>
        </div>
      </div>
    </a>
  {/each}
</div>

<style>
  .card-contact {
    flex-direction: row;
  }

  .card-contact > .card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-left: 1em;
  }

  .card-contact > .card-detail > .card-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .card-contact > .card-icon > :global(.icon-inner) {
    width: 64px;
    height: 64px;
  }
</style>
