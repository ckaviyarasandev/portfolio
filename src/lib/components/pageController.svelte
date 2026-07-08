<script>
	import { goto } from '$app/navigation';
	import Navbar from './Navbar.svelte';
	import Hero from './hero.svelte';
	import NotFound from './NotFound.svelte';
	import { navbarLinks, heroPageSections } from '../../datas/content';
	import { heroPageColors, notFoundPalette } from '../../themes/styles.js';
	import { generateGradient } from '../../utils/gradientGenerator';

	const notFoundGradient = generateGradient(notFoundPalette);

	let { page } = $props();

	// Seeded with the same starting palette Hero itself starts on, so there's
	// no flash of white before Hero's first onBackgroundChange fires.
	let currentGradient = $state(generateGradient(heroPageColors[0]));

	let isKnownPage = $derived(Object.values(navbarLinks).some((link) => link.page === page));
	let isNotFound = $derived(!isKnownPage);
	let isHome = $derived(!isNotFound && page === navbarLinks.home.page);

	let activeBackground = $derived(isHome ? currentGradient : isNotFound ? notFoundGradient : null);

	function navigateTo(targetPage) {
		const path = targetPage === navbarLinks.home.page ? '/' : `/${targetPage}`;
		goto(path); // real SvelteKit navigation now — each page is a real route
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
		<div
			class="pointer-events-none absolute inset-0 opacity-[0.03]"
			style="background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px); background-size: 48px 48px;"
		></div>
	{/if}

	{#if isHome}
		<Hero
			sections={heroPageSections}
			onBackgroundChange={(gradient) => (currentGradient = gradient)}
		/>
	{:else if isNotFound}
		<NotFound />
	{/if}
</section>
