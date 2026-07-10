<script>
	let { experience = [], onSelect } = $props();
</script>

<section class="mx-auto max-w-3xl px-4 py-20 sm:py-28">
	<h2 class="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">Career Timeline</h2>

	<div class="relative flex flex-col gap-10 pl-8">
		<!-- vertical line -->
		<div class="absolute left-[7px] top-2 bottom-2 w-px bg-white/15"></div>

		{#each experience as job, i (job.id)}
			<button type="button" onclick={() => onSelect?.(job.id)} class="group relative text-left">
				<!-- dot -->
				<span
					class="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white/40 bg-zinc-950 transition-colors group-hover:border-white group-hover:bg-white"
				></span>

				<span class="block text-xs font-semibold uppercase tracking-wider text-white/40">
					{job.duration}
				</span>
				<span
					class="mt-1 block text-lg font-semibold text-white transition-colors group-hover:text-white/80"
				>
					{job.role}
				</span>
				<span class="block text-sm text-white/50">{job.company}</span>
			</button>
		{/each}
	</div>
</section>
