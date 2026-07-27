<script>
	let { items = [] } = $props();
</script>

{#if items?.length}
	<ul class="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
		{#each items as highlight}
			<li
				class="text-shadow-sm rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-xl"
			>
				{#if typeof highlight === 'string'}
					{highlight}
				{:else}
					<span class="font-semibold text-white">{highlight.value}</span>
					<span class="ml-1 text-white/60">· {highlight.title}</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}