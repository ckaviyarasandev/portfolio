<script>
	import { randemBackground } from '../../../../../utils/gradientGenerator';

	let { items = [] } = $props();

	// Compute once per item so colors stay stable across re-renders
	const skillBackgrounds = items.map(() => randemBackground() ?? 'none');
</script>

{#if items?.length}
	<div class="mt-10 flex w-full max-w-xl flex-col gap-3">
		{#each items as skill, i}
			<div
				class="relative isolate overflow-hidden rounded-2xl border border-white/15 px-4 py-3 shadow-md shadow-black/10 backdrop-blur-xl"
			>
				<!-- dynamic gradient layer, forced to 40% opacity, isolated from content -->
				<span
					class="pointer-events-none absolute inset-0 -z-10 opacity-40"
					style:background-image={skillBackgrounds[i]}
				></span>
				<!-- soft glass base so the 40% gradient never looks washed out on light/dark bg -->
				<span class="pointer-events-none absolute inset-0 -z-20 bg-gray-900/20"></span>

				<div class="mb-1.5 flex items-center justify-between text-sm">
					<span class="text-shadow-sm font-medium text-white">{skill.name}</span>
					<span class="text-shadow-sm font-semibold text-white/80">{skill.level}%</span>
				</div>

				<div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
					<div
						class="h-full rounded-full bg-linear-to-r from-white/60 to-white/90 shadow-[0_0_6px_rgba(255,255,255,0.5)] motion-safe:transition-[width] motion-safe:duration-700"
						style:width="{Math.min(Math.max(skill.level ?? 0, 0), 100)}%"
					></div>
				</div>
			</div>
		{/each}
	</div>
{/if}