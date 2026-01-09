<script lang="ts">
    import Icon from "@iconify/svelte";
    import { page } from "$app/state";
    
    let { data } = $props();
</script>

<header class="primary-header cl1o" aria-label="Site header">
    <div class="center">
        <span class="title">Francis Dominic Fajardo</span>
        <span class="subtitle">Software Developer</span>
    </div>
</header>

<nav class="primary-nav" aria-label="Primary navigation">
    <ul class="group-ab">
        {#each data.nav as { href, icon, label }}
            {#if page.url.pathname != href}
            <li>
                <a href={href} class="action-button">
                    <Icon class="icon" {icon} />
                    <span class="label visually-hidden">{label}</span>
                </a>
            </li>
            {/if}
        {/each}
    </ul>
</nav>
