<script>
	import { onMount } from 'svelte';
	import { experience } from '../../../datas/experience.js';
	import { generateGradient } from '../../../utils/gradientGenerator';
	import ExperienceHero from './experienceHero.svelte';
	import CareerTimeline from './careerTimeline.svelte';
	import MilestoneDivider from './milestoneDivider.svelte';
	import ExperienceCard from './experienceCard.svelte';
	import ExperienceSummary from './experienceSummary.svelte';

	let { onBackgroundChange, onNavigate } = $props();

	const themeColors = {
		amber: { hue: 38, colorName: 'amber' },
		sky: { hue: 199, colorName: 'sky' },
		violet: { hue: 262, colorName: 'violet' }
	};

	let cardEls = [];

	function reportGradient(theme) {
		const palette = themeColors[theme] ?? themeColors.violet;
		onBackgroundChange?.(generateGradient(palette));
	}

	onMount(() => {
		reportGradient(experience[0]?.theme);

		const observer = new IntersectionObserver(
			(entries) => {
				// Pick whichever intersecting card is most centered in view.
				const visible = entries.filter((e) => e.isIntersecting);
				if (!visible.length) return;
				const mostVisible = visible.reduce((a, b) =>
					a.intersectionRatio > b.intersectionRatio ? a : b
				);
				const jobId = mostVisible.target.dataset.jobId;
				const job = experience.find((j) => j.id === jobId);
				if (job) reportGradient(job.theme);
			},
			{ threshold: [0.3, 0.5, 0.7], rootMargin: '-15% 0px -15% 0px' }
		);

		cardEls.forEach((el) => el && observer.observe(el));

		return () => observer.disconnect();
	});

	function scrollToJob(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div
	class="relative flex w-full flex-col items-center justify-center overflow-hidden px-6"
>
	<ExperienceHero {experience} />
	<CareerTimeline {experience} onSelect={scrollToJob} />

	{#each experience as job, i (job.id)}
		<MilestoneDivider
			year={job.duration}
			text={i === 0
				? 'Started my professional journey'
				: i === experience.length - 1
					? 'Built production-scale applications'
					: 'Entered a new phase of growth'}
		/>
		<div bind:this={cardEls[i]} data-job-id={job.id}>
			<ExperienceCard {job} id={job.id} />
		</div>
	{/each}

	<ExperienceSummary {onNavigate} />
</div>
