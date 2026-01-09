<script lang="ts">
    import Icon from "@iconify/svelte";
    import { page } from "$app/state";
    
    let { data, launcher } = $props();
</script>

<header class="primary-header {launcher ? 'term' : ''}" aria-label="Site header">
    <div class="center">
        {#if launcher}
        <span class="title">λ</span>
        {:else}
        <span class="title">Francis Dominic Fajardo</span>
        <span class="subtitle">Software Developer</span>
        {/if}
    </div>
</header>

<nav class="primary-nav" aria-label="Primary navigation">
    <ul class="group-ab">
        {#each data.nav as { href, icon, label, limitTo }}
            {#if page.url.pathname != href && (!limitTo || (limitTo === "launcher" && launcher))}
            <li>
                <a href={href} class="action-button" data-sveltekit-reload={launcher}>
                    <Icon class="icon" {icon} />
                    <span class="label visually-hidden">{label}</span>
                </a>
            </li>
            {/if}
        {/each}
    </ul>
</nav>
