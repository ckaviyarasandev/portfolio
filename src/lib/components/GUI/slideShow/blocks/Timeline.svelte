<script>
	let { items = [] } = $props();
</script>

{#if items?.length}
	<ol class="mt-10 flex flex-col gap-8 border-l border-white/20 pl-6">
		{#each items as entry}
			<li class="relative">
				<span
					class="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border border-white/50 bg-white/80"
					aria-hidden="true"
				></span>
				<span class="text-shadow-sm text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
					{entry.year}
				</span>
				<h3 class="text-shadow mt-1 text-lg font-semibold text-white">{entry.title}</h3>
				{#if entry.description}
					<p class="mt-1 max-w-xl text-pretty text-sm leading-6 text-white/80">
						{entry.description}
					</p>
				{/if}
			</li>
		{/each}
	</ol>
{/if}
