<script lang="ts">
	import Footer from "$lib/footer.svelte";
    import Header from "$lib/header.svelte";

 	let { data, children } = $props();
</script>

<Header {data} launcher={false} />

{@render children()}

<Footer />
