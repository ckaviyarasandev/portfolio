<script>
	import { onMount } from 'svelte';
	import SlideShow from './GUI/slideShow.svelte';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';

	const INTERVAL = 5000;
	// Total duration of the staged slide animation. Bumped up from 300ms so the
	// three stages (quick start / fast slide / gentle ease-out) each have room
	// to actually read as distinct, rather than being over before they register.
	const TRANSITION_MS = 600;

	let { sections = [], onBackgroundChange } = $props();

	let currentIndex = $state(0);
	// The slide currently animating OUT. Null whenever nothing is transitioning.
	// This — plus `direction` — is the single source of truth for which two
	// slides move and which way. No other slide's transform is ever touched.
	let previousIndex = $state(null);
	let direction = $state(1); // 1 = forward (next), -1 = backward (prev)
	// Bumped on every transition so the {#key} block below forces Svelte to
	// recreate the animating element, which restarts the CSS keyframe cleanly
	// even when the same direction/index repeats back-to-back.
	let transitionId = $state(0);

	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isAnimating = $state(false);

	let timer;
	let isPaused = $state(false);
	let prefersReducedMotion = $state(false);

	let touchStartX = 0;
	let touchStartY = 0;

	$effect(() => {
		onBackgroundChange?.(currentGradient);
	});

	function unlockAfterTransition() {
		setTimeout(() => {
			isAnimating = false;
			previousIndex = null;
		}, TRANSITION_MS);
	}

	function changeSlide(index, dir) {
		if (isAnimating || index === currentIndex || !sections.length) return;
		isAnimating = true;
		previousIndex = currentIndex;
		direction = dir;
		currentIndex = index;
		transitionId += 1;
		currentPalette = getNextPalette(heroPageColors, currentPalette.colorName);
		currentGradient = generateGradient(currentPalette);
		resetTimer();
		unlockAfterTransition();
	}

	function goToSlide(index) {
		if (index === currentIndex || !sections.length) return;
		const len = sections.length;
		const forwardDist = (index - currentIndex + len) % len;
		const backwardDist = (currentIndex - index + len) % len;
		const dir = forwardDist <= backwardDist ? 1 : -1;
		changeSlide(index, dir);
	}
	function nextSlide() {
		changeSlide((currentIndex + 1) % sections.length, 1);
	}
	function prevSlide() {
		changeSlide((currentIndex - 1 + sections.length) % sections.length, -1);
	}

	function startTimer() {
		if (isPaused || prefersReducedMotion || sections.length < 2) return;
		timer = setInterval(nextSlide, INTERVAL);
	}
	function stopTimer() {
		if (timer) clearInterval(timer);
	}
	function resetTimer() {
		stopTimer();
		startTimer();
	}

	function handlePause() {
		isPaused = true;
		stopTimer();
	}
	function handleResume() {
		isPaused = false;
		startTimer();
	}

	function handleKeydown(e) {
		if (e.key === 'ArrowRight') nextSlide();
		if (e.key === 'ArrowLeft') prevSlide();
	}

	// Horizontal swipe only. Vertical touch is left alone so it can
	// natively scroll a slide's own content when that content is
	// taller than the stage — otherwise a "scroll to read more" swipe
	// would accidentally change slides.
	function handleTouchStart(e) {
		touchStartX = e.touches[0].clientX;
		touchStartY = e.touches[0].clientY;
	}
	function handleTouchEnd(e) {
		const dx = touchStartX - e.changedTouches[0].clientX;
		const dy = touchStartY - e.changedTouches[0].clientY;
		if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return; // not a horizontal swipe
		dx > 0 ? nextSlide() : prevSlide();
	}

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mq.matches;
		const onChange = (e) => (prefersReducedMotion = e.matches);
		mq.addEventListener('change', onChange);

		startTimer();

		return () => {
			stopTimer();
			mq.removeEventListener('change', onChange);
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />
<div
	class="relative z-10 mx-auto w-full"
	role="region"
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div
		class="relative w-full overflow-hidden h-[calc(100dvh)] px-4"
		style="--slide-duration: {TRANSITION_MS}ms;"
	>
		{#each sections as section, i (section.id)}
			{#if i === currentIndex || i === previousIndex}
				{#key `${i}-${transitionId}`}
					<div
						class="glass-scroll absolute inset-0 overflow-y-auto overscroll-contain p-6
							{i === previousIndex
								? direction === 1 ? 'slide-out-left' : 'slide-out-right'
								: previousIndex !== null
									? direction === 1 ? 'slide-in-right' : 'slide-in-left'
									: 'slide-resting'}"
						style="
							pointer-events: {i === currentIndex ? 'auto' : 'none'};
							z-index: {i === currentIndex ? 2 : 1};
							visibility: visible;
						"
						aria-hidden={i !== currentIndex}
					>
						<div class="mx-auto mt-8 flex min-h-full w-full items-center justify-center">
							<SlideShow {section} />
						</div>
					</div>
				{/key}
			{:else}
				<div
					class="glass-scroll absolute inset-0 overflow-y-auto overscroll-contain p-6 slide-parked"
					style="pointer-events: none; z-index: 0;"
					aria-hidden="true"
				>
					<div class="mx-auto mt-8 flex min-h-full w-full items-center justify-center">
						<SlideShow {section} />
					</div>
				</div>
			{/if}
		{/each}
	</div>

	{#if sections.length > 1}
		<div class="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-4">
			{#each sections as section, i (section.id)}
				<button
					type="button"
					onclick={() => goToSlide(i)}
					aria-label="Go to slide {i + 1}"
					aria-current={i === currentIndex}
					class="h-1.5 rounded-full transition-all duration-300 {i === currentIndex
						? 'w-6 bg-white'
						: 'w-1.5 bg-white/40 hover:bg-white/60'}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.glass-scroll {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.35) transparent;
	}

	.glass-scroll::-webkit-scrollbar {
		width: 8px;
	}

	.glass-scroll::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.04);
		border-radius: 999px;
		margin-block: 4px;
	}

	.glass-scroll::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.2));
		border-radius: 999px;
		border: 2px solid transparent;
		background-clip: padding-box;
		backdrop-filter: blur(6px);
		transition:
			background 0.25s ease,
			box-shadow 0.25s ease;
	}

	.glass-scroll::-webkit-scrollbar-thumb:hover {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.35));
		background-clip: padding-box;
		box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
	}

	.glass-scroll::-webkit-scrollbar-thumb:active {
		background: rgba(255, 255, 255, 0.85);
		background-clip: padding-box;
	}

	/* Slides that are not currently entering or exiting sit parked
	   off-stage, statically, with no transition/animation applied to
	   them at all — this is what stops any non-adjacent slide from
	   ever sweeping across the screen. visibility:hidden is a second,
	   independent safeguard: even if a transform value were ever
	   wrong for any reason, a parked slide still cannot paint. */
	.slide-parked {
		transform: translateX(100%);
		visibility: hidden;
	}

	.slide-resting {
		transform: translateX(0%);
		visibility: visible;
	}

	.slide-in-right {
		animation: slideInFromRight var(--slide-duration, 600ms) linear forwards;
	}
	.slide-in-left {
		animation: slideInFromLeft var(--slide-duration, 600ms) linear forwards;
	}
	.slide-out-left {
		animation: slideOutToLeft var(--slide-duration, 600ms) linear forwards;
	}
	.slide-out-right {
		animation: slideOutToRight var(--slide-duration, 600ms) linear forwards;
	}

	/* Staged, premium motion:
	   0%–10%  quick start   — covers a good chunk of the distance fast
	   10%–80% smooth slide  — the bulk of the travel, steady and brisk
	   80%–100% ease-out     — the last stretch, slow and gentle to land */
	@keyframes slideInFromRight {
		0%   { transform: translateX(100%); }
		10%  { transform: translateX(75%); }
		80%  { transform: translateX(10%); }
		100% { transform: translateX(0%); }
	}
	@keyframes slideInFromLeft {
		0%   { transform: translateX(-100%); }
		10%  { transform: translateX(-75%); }
		80%  { transform: translateX(-10%); }
		100% { transform: translateX(0%); }
	}
	@keyframes slideOutToLeft {
		0%   { transform: translateX(0%); }
		10%  { transform: translateX(-25%); }
		80%  { transform: translateX(-90%); }
		100% { transform: translateX(-100%); }
	}
	@keyframes slideOutToRight {
		0%   { transform: translateX(0%); }
		10%  { transform: translateX(25%); }
		80%  { transform: translateX(90%); }
		100% { transform: translateX(100%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.slide-in-right,
		.slide-in-left,
		.slide-out-left,
		.slide-out-right {
			animation: none !important;
			transform: translateX(0%);
		}
	}
</style>