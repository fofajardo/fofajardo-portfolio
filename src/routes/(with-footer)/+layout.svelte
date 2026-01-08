<script lang="ts">
	import Footer from "$lib/footer.svelte";

 	let { children } = $props();
</script>

{@render children()}

<Footer />
