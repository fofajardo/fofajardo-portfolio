<script>
	let { children } = $props();
</script>

<main>
    <section id="details">
        <div id="section-details" class="content-layout">
			{@render children()}
		</div>
	</section>
</main>
