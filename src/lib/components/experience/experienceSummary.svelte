<script>
	import { experienceSummary } from '../../../datas/experience.js';
	let { onNavigate } = $props();
</script>

<section class="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
	<h2 class="text-3xl font-bold text-white sm:text-4xl">Experience Summary</h2>
	<p class="mt-4 text-lg text-white/60">
		{experienceSummary.years} years — always building better software.
	</p>

	<div class="mt-8 flex flex-wrap justify-center gap-3">
		{#each experienceSummary.highlights as h}
			<span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
				{h}
			</span>
		{/each}
	</div>

	<div class="mt-12 flex flex-wrap justify-center gap-4">
		<button
			type="button"
			onclick={() => onNavigate?.('skills')}
			class="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform hover:-translate-y-0.5"
		>
			View Skills →
		</button>
		<button
			type="button"
			onclick={() => onNavigate?.('contact')}
			class="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
		>
			Contact Me →
		</button>
	</div>
</section>
