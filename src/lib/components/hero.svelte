<script>
	import { onMount } from 'svelte';
	import SlideShow from './GUI/slideShow.svelte';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';

	const INTERVAL = 15000;
	const TRANSITION_MS = 300;

	let { sections = [], onBackgroundChange } = $props();

	let currentIndex = $state(0);
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
		}, TRANSITION_MS);
	}

	function changeSlide(index) {
		if (isAnimating || index === currentIndex || !sections.length) return;
		isAnimating = true;
		currentIndex = index;
		currentPalette = getNextPalette(heroPageColors, currentPalette.colorName);
		currentGradient = generateGradient(currentPalette);
		resetTimer();
		unlockAfterTransition();
	}

	function goToSlide(index) {
		changeSlide(index);
	}
	function nextSlide() {
		changeSlide((currentIndex + 1) % sections.length);
	}
	function prevSlide() {
		changeSlide((currentIndex - 1 + sections.length) % sections.length);
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
	class="relative z-10 mx-auto mt-2 w-full"
	role="region"
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<div
		class="relative w-full overflow-hidden
			h-[calc(100dvh-4rem)]
			sm:h-[calc(100dvh-4rem)]
			lg:h-[calc(100dvh-4rem)]"
	>
		{#each sections as section, i (section.id)}
			<div
				class="glass-scroll absolute inset-0 overflow-y-auto overscroll-contain p-4"
				style="
					opacity: {i === currentIndex ? 1 : 0};
					transform: scale({i === currentIndex ? 1 : 0.96}) translateY({i === currentIndex ? 0 : 12}px);
					transition: opacity {TRANSITION_MS}ms ease-out, transform {TRANSITION_MS}ms ease-out;
					pointer-events: {i === currentIndex ? 'auto' : 'none'};
				"
				aria-hidden={i !== currentIndex}
			>
				<div class="mx-auto flex min-h-full w-full items-center justify-center">
					<SlideShow {section} />
				</div>
			</div>
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
	/* ===== Glassy scrollbar ===== */
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
</style>
