<script>
	// Tailwind needs full, static class names, so column counts are mapped
	// rather than interpolated (`sm:grid-cols-${n}` would be purged).
	const COLS = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' };

	let { items = [] } = $props();

	const colsClass = $derived(COLS[Math.min(items?.length ?? 0, 4)] ?? COLS[4]);
</script>

{#if items?.length}
	<div class="mt-10 grid grid-cols-2 gap-6 {colsClass}">
		{#each items as stat}
			<div class="flex flex-col items-center text-center md:items-start md:text-left">
				<span class="text-shadow-lg text-4xl font-bold text-white md:text-5xl">{stat.value}</span>
				<span class="text-shadow-sm mt-1 text-sm uppercase tracking-wide text-white/75">
					{stat.label}
				</span>
			</div>
		{/each}
	</div>
{/if}
