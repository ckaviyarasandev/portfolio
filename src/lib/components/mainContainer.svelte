<script>
	import Navbar from './Navbar.svelte';
	import Hero from './Hero.svelte';
	// import About from './About.svelte';
	// import Experience from './Experience.svelte';
	// import Skills from './Skills.svelte';
	// import Projects from './Projects.svelte';
	// import Contact from './Contact.svelte';
	// import Footer from './Footer.svelte';
	import NotFound from './NotFound.svelte';

	import { navbarLinks, heroPageSections } from '../../datas/content';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';
	import { onMount } from 'svelte';
	import { aboutMe } from '../../datas/info';

	const INTERVAL = 5000;

	// --- Page routing state ---
	let selectedPage = $state('home');

	function navigateTo(page) {
		selectedPage = page;
	}

	// --- Hero slideshow + background state ---
	let currentIndex = $state(0);
	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isPaused = $state(false);
	let prefersReducedMotion = $state(false);

	let timer;

	function advanceSlide() {
		currentIndex = (currentIndex + 1) % heroPageSections.length;
		currentPalette = getNextPalette(heroPageColors, currentPalette.colorName);
		currentGradient = generateGradient(currentPalette);
	}

	function goToSlide(index) {
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
		if (selectedPage !== 'home') return;
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

<Navbar {selectedPage} onNavigate={navigateTo} />
<section
	class="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 transition-[background] duration-700 ease-in-out"
	style:background-image={currentGradient}
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	role="region"
	aria-label="Hero showcase"
>
	<div
		class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/20"
	></div>
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px); background-size: 48px 48px;"
	></div>

	{#if selectedPage === navbarLinks.home.page}
		<Hero
			section={heroPageSections[currentIndex]}
			slideIndex={currentIndex}
			totalSlides={heroPageSections.length}
		/>

		<!-- Commented is not implemented -->
		<!-- {:else if selectedPage === navbarLinks.experience.page}
		<About {aboutMe} />
		<Projects {projects} />
	{:else if selectedPage === navbarLinks.experience.page}
		<Experience {experience} />
	{:else if selectedPage === navbarLinks.skills.page}
		<Skills {skills} />
	{:else if selectedPage === navbarLinks.contact.page}
		<Contact {contact} /> -->
	{:else}
		<NotFound />
	{/if}
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

	<div class="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
		{#each Array(heroPageSections.length) as _, index}
			<button
				type="button"
				onclick={() => goToSlide(index)}
				class="h-2 rounded-full transition-all duration-300 {index === currentIndex
					? 'w-8 bg-white'
					: 'w-2 bg-white/30 hover:bg-white/50'}"
				aria-label="Go to slide {index + 1}"
				aria-current={index === currentIndex}
			></button>
		{/each}
	</div>
</section>
