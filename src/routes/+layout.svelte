<script lang="ts">
	import "$lib/assets/common.css";

	let { children } = $props();

	import { onNavigate } from "$app/navigation";
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta property="og:title" content="Francis Dominic Fajardo - Software Developer">
	<meta property="og:description" content="Francis Dominic Fajardo's Portfolio">
</svelte:head>

{@render children()}
