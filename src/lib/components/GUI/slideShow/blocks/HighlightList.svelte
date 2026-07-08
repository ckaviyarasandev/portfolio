<script>
	let { items = [] } = $props();
</script>

{#if items?.length}
	<ul class="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
		{#each items as highlight}
			<li
				class="text-shadow-sm rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-xl"
			>
				{highlight}
			</li>
		{/each}
	</ul>
{/if}
