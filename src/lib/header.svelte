<script lang="ts">
    import Icon from "@iconify/svelte";
    
    let { data } = $props();
</script>

<header>
    <a href="/">
        <section class="bg cl cl1 cl1o">
            <div class="center">
                <span class="title">Francis Dominic Fajardo</span>
                <span class="subtitle">Software Developer</span>
            </div>
        </section>
    </a>
    <section id="contact">
        <div class="center">
            <ul class="group-ab">
                {#each data.nav as { href, icon, label }}
                    <li>
                        <a href={href} class="action-button">
                            <Icon class="icon" {icon} />
                            <span class="label visually-hidden">{label}</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </section>
</header>

<style>
    header {
        view-transition-name: header;
    }
</style>