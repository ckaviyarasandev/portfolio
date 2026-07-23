<script>
	import { skillGroups, skillHighlights } from '../../../datas/skills.js';

	let { onNavigate } = $props();

	const accentClasses = {
		sky: 'bg-sky-300',
		emerald: 'bg-emerald-300',
		amber: 'bg-amber-300'
	};
</script>

<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 text-white md:px-10">
	<header class="max-w-3xl">
		<p class="mb-4 text-sm font-semibold tracking-[0.28em] text-sky-300 uppercase">Capabilities</p>
		<h1 class="text-4xl font-bold tracking-tight md:text-6xl">Tools for thoughtful products.</h1>
		<p class="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
			A practical toolkit shaped by production work, collaboration, and a habit of refining the
			details that make software easier to use.
		</p>
	</header>

	<section class="grid gap-5 lg:grid-cols-3" aria-label="Skill groups">
		{#each skillGroups as group}
			<article class="rounded-2xl border border-white/15 bg-black/25 p-6 backdrop-blur-sm">
				<div class="mb-7 flex items-center justify-between gap-4">
					<h2 class="text-xl font-semibold">{group.title}</h2>
					<span class={`h-2.5 w-2.5 rounded-full ${accentClasses[group.accent]}`} aria-hidden="true"
					></span>
				</div>
				<div class="space-y-5">
					{#each group.skills as skill}
						<div>
							<div class="mb-2 flex justify-between gap-4 text-sm text-white/80">
								<span>{skill.name}</span>
								<span>{skill.level}%</span>
							</div>
							<div class="h-1.5 overflow-hidden rounded-full bg-white/10">
								<div class="h-full rounded-full bg-white" style:width={`${skill.level}%`}></div>
							</div>
						</div>
					{/each}
				</div>
			</article>
		{/each}
	</section>

	<section class="grid gap-8 border-t border-white/15 pt-10 md:grid-cols-[1fr_auto] md:items-end">
		<div>
			<h2 class="text-2xl font-semibold">How I work</h2>
			<ul class="mt-5 grid gap-3 text-white/70 sm:grid-cols-2">
				{#each skillHighlights as highlight}
					<li class="flex items-center gap-3">
						<span class="text-sky-300" aria-hidden="true">+</span>
						{highlight}
					</li>
				{/each}
			</ul>
		</div>
		<button
			class="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold transition hover:border-white hover:bg-white hover:text-slate-950"
			type="button"
			onclick={() => onNavigate?.('experience')}
		>
			See the experience
		</button>
	</section>
</div>
