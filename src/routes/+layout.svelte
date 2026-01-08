<script lang="ts">
	import faviconIco from "$lib/assets/favicon.ico";
	import faviconSvg from "$lib/assets/favicon.svg";
	import favicon96x96Png from "$lib/assets/favicon-96x96.png";
	import appleTouchIconPng from "$lib/assets/apple-touch-icon.png";
	import siteWebmanifest from "$lib/assets/site.webmanifest";
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
	<link rel="icon" type="image/png" href={favicon96x96Png} sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href={faviconSvg} />
	<link rel="shortcut icon" href={faviconIco} />
	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIconPng} />
	<meta name="apple-mobile-web-app-title" content="fofajardo" />
	<link rel="manifest" href={siteWebmanifest} />
	<!-- OpenGraph -->
	<meta property="og:title" content="Francis Dominic Fajardo - Software Developer">
	<meta property="og:description" content="Francis Dominic Fajardo's Portfolio, User Page on GitHub">
	<meta property="og:image" content="assets/cover.png">
	<meta name="description" content="Francis Dominic Fajardo's Portfolio, User Page on GitHub">
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-CB1CL6K9LN"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag("js", new Date());
		gtag("config", "G-CB1CL6K9LN");
	</script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
	<link rel="me" href="https://fosstodon.org/@fajardo">
	<link rel="me" href="https://social.up.edu.ph/@fofajardo">
</svelte:head>

{@render children()}
