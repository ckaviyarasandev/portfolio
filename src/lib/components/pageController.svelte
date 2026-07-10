<script>
	import { goto } from '$app/navigation';
	import Navbar from './Navbar.svelte';
	import Hero from './hero.svelte';
	import NotFound from './NotFound.svelte';
	import { navbarLinks, heroPageSections } from '../../datas/content';
	import { heroPageColors, notFoundPalette } from '../../themes/styles.js';
	import { generateGradient } from '../../utils/gradientGenerator';
	import ExperiencePage from './experience/experiencePage.svelte';

	const notFoundGradient = generateGradient(notFoundPalette);

	let { page } = $props();

	let currentGradient = $state(generateGradient(heroPageColors[0]));

	let isKnownPage = $derived(Object.values(navbarLinks).some((link) => link.page === page));
	let isNotFound = $derived(!isKnownPage);
	let isHome = $derived(!isNotFound && page === navbarLinks.home.page);
	let experiencePage = $derived(page === navbarLinks.experience.page);

	let activeBackground = $derived(isHome ? currentGradient : isNotFound ? notFoundGradient : null);

	function navigateTo(targetPage) {
		const path = targetPage === navbarLinks.home.page ? '/' : `/${targetPage}`;
		goto(path);
	}

	function handleNavigate(page) {
		selectedPage = page;
	}
</script>

<Navbar selectedPage={page} onNavigate={navigateTo} />

<section
	class="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 transition-[background] duration-700 ease-in-out"
	style:background-image={activeBackground ?? 'none'}
	style:background-color={activeBackground ? 'transparent' : '#ffffff'}
	aria-label="Page content"
>
	{#if activeBackground}
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-black/20"
		></div>
		<div class="pointer-events-none absolute inset-0 overflow-hidden [perspective:600px]">
			<div class="grid-3d absolute inset-x-0 bottom-0 opacity-[0.12]"></div>
			<div
				class="pointer-events-none absolute inset-0"
				style="background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 55%);"
			></div>
		</div>
	{/if}

	{#if isHome}
		<Hero
			sections={heroPageSections}
			onBackgroundChange={(gradient) => (currentGradient = gradient)}
		/>
	{:else if experiencePage}
		<ExperiencePage
			onBackgroundChange={(gradient) => (currentGradient = gradient)}
			onNavigate={handleNavigate}
		/>
	{:else if isNotFound}
		<NotFound />
	{/if}
</section>

<style>
	.grid-3d {
		height: 220%; /* overshoot so the rotated projection still reaches the top */
		background-image:
			linear-gradient(white 1px, transparent 1px),
			linear-gradient(90deg, white 1px, transparent 1px);
		background-size: 48px 48px;
		transform-origin: 50% 100%;
		transform: rotateX(60deg) scale(1.6);
		animation: grid-drift 14s linear infinite;
		will-change: background-position;
	}

	@keyframes grid-drift {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 0 96px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.grid-3d {
			animation: none;
		}
	}
</style>
