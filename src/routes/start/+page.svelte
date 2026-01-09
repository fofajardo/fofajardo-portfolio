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
        --bg-canvas: #000000;
        --text-main: #33FF33;
        --hero-background: #000000;
    }
</style>

<div class="full center-v">
    <Header {data} launcher={true} />
</div>
