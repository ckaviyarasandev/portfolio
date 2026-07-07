<script>
	import { goto } from '$app/navigation';

	import Navbar from './Navbar.svelte';
	import Hero from './hero.svelte';
	import NotFound from './NotFound.svelte';

	import { navbarLinks, heroPageSections } from '../../datas/content';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';
	import { onMount } from 'svelte';

	const INTERVAL = 5000;

	const notFoundPalette = {
		colorName: 'Error Red',
		light: '#FCA5A5',
		mid: '#DC2626',
		dark: '#7F1D1D'
	};
	const notFoundGradient = generateGradient(notFoundPalette);

	// The active page is now a prop — the actual route file decides which page this is.
	// No URL parsing, no history API management, no onMount syncing needed anymore.
	let { page } = $props();

	function navigateTo(targetPage) {
		const path = targetPage === navbarLinks.home.page ? '/' : `/${targetPage}`;
		goto(path); // real SvelteKit navigation now — each page is a real route
		currentIndex = 0;
	}

	// --- Hero slideshow + background state ---
	let currentIndex = $state(0);
	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isPaused = $state(false);
	let prefersReducedMotion = $state(false);

	let timer;

	// --- Derived page/background state, now based on the `page` prop ---
	let isKnownPage = $derived(Object.values(navbarLinks).some((link) => link.page === page));
	let isNotFound = $derived(!isKnownPage);
	let isHome = $derived(!isNotFound && page === navbarLinks.home.page);

	let currentPageLength = $derived(isHome ? heroPageSections.length : 1);
	let activeBackground = $derived(isHome ? currentGradient : isNotFound ? notFoundGradient : null);

	function advanceSlide() {
		if (!isHome) return;
		currentIndex = (currentIndex + 1) % heroPageSections.length;
		currentPalette = getNextPalette(heroPageColors, currentPalette.colorName);
		currentGradient = generateGradient(currentPalette);
	}

	function goToSlide(index) {
		if (!isHome) return;
		currentIndex = index;
		currentPalette = getNextPalette(heroPageColors, currentPalette.colorName);
		currentGradient = generateGradient(currentPalette);
		resetTimer();
	}

	function nextSlide() {
		goToSlide((currentIndex + 1) % heroPageSections.length);
	}

	function prevSlide() {
		goToSlide((currentIndex - 1 + heroPageSections.length) % heroPageSections.length);
	}

	function startTimer() {
		if (isPaused || prefersReducedMotion) return;
		timer = setInterval(advanceSlide, INTERVAL);
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
		if (!isHome) return;
		if (e.key === 'ArrowRight') nextSlide();
		if (e.key === 'ArrowLeft') prevSlide();
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

<Navbar selectedPage={page} onNavigate={navigateTo} />

<section
	class="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 transition-[background] duration-700 ease-in-out"
	style:background-image={activeBackground ?? 'none'}
	style:background-color={activeBackground ? 'transparent' : '#ffffff'}
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	aria-label="Page content"
>
	{#if activeBackground}
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/20"
		></div>
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.03]"
			style="background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px); background-size: 48px 48px;"
		></div>
	{/if}

	{#if isHome}
		<Hero
			section={heroPageSections[currentIndex]}
			slideIndex={currentIndex}
			totalSlides={heroPageSections.length}
		/>

		<button
			type="button"
			onclick={prevSlide}
			class="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-white/10 focus-visible:opacity-100 md:hover:opacity-100"
			aria-label="Previous slide"
		>
			<svg
				class="h-5 w-5 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			type="button"
			onclick={nextSlide}
			class="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-white/10 focus-visible:opacity-100 md:hover:opacity-100"
			aria-label="Next slide"
		>
			<svg
				class="h-5 w-5 text-white"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{:else if isNotFound}
		<NotFound />
	{/if}

	<div class="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
		{#each Array(currentPageLength) as _, index}
			<button
				type="button"
				onclick={() => goToSlide(index)}
				disabled={!isHome}
				class="h-2 rounded-full transition-all duration-300 {isNotFound
					? 'w-8 bg-red-500'
					: isHome
						? index === currentIndex
							? 'w-8 bg-white'
							: 'w-2 bg-white/30 hover:bg-white/50'
						: 'w-2 bg-zinc-300'}"
				aria-label="Slide {index + 1} of {currentPageLength}"
				aria-current={index === currentIndex}
			></button>
		{/each}
	</div>
</section>
