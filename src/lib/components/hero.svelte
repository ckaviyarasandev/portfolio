<script>
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { section, slideIndex, totalSlides } = $props();

	const TRANSITION_DURATION = 600;
</script>

<div
	class="relative z-10 flex min-h-[280px] w-full max-w-4xl flex-col items-center justify-center text-center"
>
	{#key slideIndex}
		<div
			in:fade={{ duration: TRANSITION_DURATION, delay: 150, easing: cubicOut }}
			out:fade={{ duration: TRANSITION_DURATION / 2, easing: cubicOut }}
			class="flex flex-col items-center"
		>
			<span
				class="mb-4 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur-sm"
			>
				{section.eyebrow ?? `0${slideIndex + 1} / 0${totalSlides}`}
			</span>

			<h1 class="mb-4 text-5xl font-bold leading-tight text-white md:text-6xl">
				{section.title}
			</h1>

			<p class="max-w-2xl text-lg text-white/80 md:text-xl">
				{section.description}
			</p>

			{#if section.ctaLabel}
				<a
					href={section.ctaHref ?? '#'}
					class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
				>
					{section.ctaLabel}
					<span aria-hidden="true">→</span>
				</a>
			{/if}
		</div>
	{/key}
</div>
