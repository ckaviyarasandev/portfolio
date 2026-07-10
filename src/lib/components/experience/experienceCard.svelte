<script>
	import AnimatedCounter from './animatedCounter.svelte';
	import ProjectModal from './projectModal.svelte';

	let { job, id = '' } = $props();

	const themeAccent = {
		amber: 'from-amber-400/20 to-amber-600/5 text-amber-300 border-amber-400/20',
		sky: 'from-sky-400/20 to-sky-600/5 text-sky-300 border-sky-400/20',
		violet: 'from-violet-400/20 to-violet-600/5 text-violet-300 border-violet-400/20'
	};

	let accent = $derived(themeAccent[job.theme] ?? themeAccent.violet);
	let activeProject = $state(null);
</script>

<section {id} class="mx-auto max-w-5xl scroll-mt-24 px-4 py-24 sm:py-32">
	<!-- Header -->
	<div class="mb-14 border-b border-white/10 pb-8">
		<span class="inline-block rounded-full border px-3 py-1 text-xs font-medium {accent}">
			{job.employmentType}
		</span>
		<h2 class="mt-4 text-3xl font-bold text-white sm:text-4xl">{job.role}</h2>
		<p class="mt-1 text-lg text-white/60">{job.company}</p>
		<p class="mt-1 text-sm text-white/40">{job.duration} • {job.location}</p>
	</div>

	<!-- Overview -->
	<p class="mb-16 max-w-3xl text-lg leading-relaxed text-white/70">{job.overview}</p>

	<!-- Contributions -->
	<div class="mb-16">
		<h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">
			Contributions
		</h3>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each job.contributions as c}
				<div
					class="rounded-xl border border-white/10 bg-gradient-to-br p-5 transition-transform hover:-translate-y-1 {accent}"
				>
					<span class="text-2xl">{c.icon}</span>
					<p class="mt-3 text-sm font-medium text-white/80">{c.text}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Tech Stack -->
	<div class="mb-16">
		<h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">Tech Stack</h3>
		<div class="flex flex-wrap gap-3">
			{#each job.technologies as tech}
				<span
					class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white"
				>
					{tech}
				</span>
			{/each}
		</div>
	</div>

	<!-- Projects -->
	{#if job.projects?.length}
		<div class="mb-16">
			<h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">Projects</h3>
			<div class="grid gap-4 sm:grid-cols-2">
				{#each job.projects as project}
					<button
						type="button"
						onclick={() => (activeProject = project)}
						class="group rounded-xl border border-white/10 bg-white/5 p-5 text-left transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
					>
						<span class="font-semibold text-white">{project.name}</span>
						<p class="mt-1 text-sm text-white/50">{project.summary}</p>
						<span class="mt-3 inline-block text-xs text-white/40 group-hover:text-white/70">
							View details →
						</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Achievements -->
	<div class="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8">
		<h3 class="mb-8 text-sm font-semibold uppercase tracking-widest text-white/40">Achievements</h3>
		<div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
			{#each job.achievements as a}
				<AnimatedCounter value={a.value} label={a.label} />
			{/each}
		</div>
	</div>

	<!-- Skills -->
	<div class="mb-16">
		<h3 class="mb-6 text-sm font-semibold uppercase tracking-widest text-white/40">
			Skills Gained
		</h3>
		<div class="flex flex-wrap gap-2">
			{#each job.skills as skill}
				<span class="rounded-md bg-white/5 px-3 py-1.5 text-sm text-white/60">{skill}</span>
			{/each}
		</div>
	</div>

	<!-- Lessons -->
	<blockquote class="border-l-2 border-white/20 pl-6 text-lg italic leading-relaxed text-white/70">
		{job.lessons}
	</blockquote>
</section>

<ProjectModal project={activeProject} onClose={() => (activeProject = null)} />
