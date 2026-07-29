<script>
	import { randemBackground } from '../../../../../utils/gradientGenerator';

	let { items = [] } = $props();

	// Compute once per item so colors stay stable across re-renders
	const highlightBackgrounds = items.map(() => randemBackground() ?? 'none');
</script>

{#if items?.length}
	<ul class="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
		{#each items as highlight, i}
			<li
				class="relative isolate max-w-full overflow-hidden break-words rounded-full border border-white/20 px-4 py-1.5 text-sm backdrop-blur-xl transition-all duration-300 motion-safe:hover:border-white/40 motion-safe:hover:shadow-lg motion-safe:hover:shadow-black/20"
			>
				<!-- dynamic gradient layer at 40% opacity -->
				<span
					class="pointer-events-none absolute inset-0 -z-10 opacity-40"
					style:background-image={highlightBackgrounds[i]}
				></span>
				<!-- glass base layer -->
				<span class="pointer-events-none absolute inset-0 -z-20 bg-white/5"></span>

				{#if typeof highlight === 'string'}
					<span class="text-shadow-sm text-white">{highlight}</span>
				{:else}
					<span class="text-shadow-sm font-semibold text-white">{highlight.value}</span>
					<span class="text-shadow-sm ml-1 text-white/70">· {highlight.title}</span>
				{/if}
			</li>
		{/each}
	</ul>
{/if}