<script lang="ts">
	import Footer from "$lib/footer.svelte";
    import Header from "$lib/header.svelte";
	import { page } from "$app/state";

 	let { data, children } = $props();
</script>

{#if page.url.pathname !== "/"}
<Header {data} launcher={false} />
{/if}

{@render children()}

{#if page.url.pathname !== "/"}
<Footer />
{/if}
