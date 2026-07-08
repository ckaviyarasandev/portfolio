<script>
	import { onMount } from 'svelte';
	import SlideShow from './GUI/slideShow.svelte';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';
	import { slideDirections } from '../../utils/const.js';

	const INTERVAL = 2000;
	const TRANSITION_MS = 500;

	/**
	 * Hero owns the whole slide concept now: index, autoplay, palette
	 * cycling, keyboard nav, and pause-on-hover all live here. The page
	 * shell (pageController) only supplies the section data and listens
	 * for background changes via onBackgroundChange — it no longer knows
	 * or cares that slides even have an index.
	 */
	let { sections = [], onBackgroundChange } = $props();

	// ===== Slide / palette state =====
	let currentIndex = $state(0);
	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isAnimating = $state(false);
	let slideDirection = $state(slideDirections.next);

	// ===== Autoplay state =====
	let timer;
	let isPaused = $state(false);
	let prefersReducedMotion = $state(false);

	// ===== Scrollable track =====
	let trackEl = $state();

	// Report the current gradient upward whenever it changes.
	$effect(() => {
		onBackgroundChange?.(currentGradient);
	});

	// Keep the scroll position in sync whenever currentIndex changes
	// (autoplay, arrow keys, or a manual scroll settling on a slide).
	$effect(() => {
		if (!trackEl) return;
		trackEl.scrollTo({ left: trackEl.clientWidth * currentIndex, behavior: 'smooth' });
	});

	function unlockAfterTransition() {
		setTimeout(() => {
			isAnimating = false;
		}, TRANSITION_MS);
	}

	function changeSlide(index) {
		if (isAnimating) return; // ignore input mid-animation
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

	// ===== Autoplay =====
	function startTimer() {
		if (isPaused || prefersReducedMotion) return;
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
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
	}

	// ===== Manual scroll → index sync =====
	let scrollTimeout;
	function handleScroll() {
		if (!trackEl) return;
		clearTimeout(scrollTimeout);
		// Debounced so we report the settled slide, not every frame mid-drag.
		scrollTimeout = setTimeout(() => {
			goToSlide(Math.round(trackEl.scrollLeft / trackEl.clientWidth));
		}, 120);
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
	bind:this={trackEl}
	onscroll={handleScroll}
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	class="glass-scroll relative z-10 flex w-full max-w-6xl snap-x snap-mandatory overflow-x-auto scroll-smooth"
>
	{#each sections as section (section.id)}
		<div class="w-full shrink-0 snap-start overflow-hidden">
			<SlideShow {section} />
		</div>
	{/each}
</div>

<style>
	/* Glassy scrollbar: frosted, translucent, matches the rest of the hero's
	   glass-panel look instead of the browser default. */
	.glass-scroll {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.45) rgba(255, 255, 255, 0.08);
	}

	.glass-scroll::-webkit-scrollbar {
		height: 10px;
	}

	.glass-scroll::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		margin-inline: 4px;
	}

	.glass-scroll::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.4);
		border-radius: 999px;
		border: 2px solid rgba(255, 255, 255, 0.08);
		background-clip: padding-box;
	}

	.glass-scroll::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.6);
		background-clip: padding-box;
	}
</style>
