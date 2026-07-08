<script>
	let { items = [] } = $props();
</script>

{#if items?.length}
	<div class="mt-10 flex w-full max-w-xl flex-col gap-4">
		{#each items as skill}
			<div>
				<div class="mb-1.5 flex items-center justify-between text-sm">
					<span class="text-shadow-sm font-medium text-white">{skill.name}</span>
					<span class="text-white/70">{skill.level}%</span>
				</div>
				<div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
					<div
						class="h-full rounded-full bg-linear-to-r from-white/60 to-white/90 motion-safe:transition-[width] motion-safe:duration-700"
						style:width="{Math.min(Math.max(skill.level ?? 0, 0), 100)}%"
					></div>
				</div>
			</div>
		{/each}
	</div>
{/if}
