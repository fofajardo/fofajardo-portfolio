<script lang="ts">
    import Header from "$lib/Header.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>λ</title>
    <meta name="description" content="Francis Dominic Fajardo's Start Page">
    <meta property="og:title" content="Francis Dominic Fajardo's Start Page">
    <meta property="og:description" content="Francis Dominic Fajardo's Start Page">
</svelte:head>

<style>
    :root {
        --page-background: #000000;
        --page-text-color: #FFFFFF;
        --hero-background: #000000;
        --color-primary: #33FF33;
        --color-accent: #33FF33;
    }
</style>

<div class="full center-v">
    <Header {data} launcher={true} />
</div>
