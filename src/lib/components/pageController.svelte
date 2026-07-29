<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from './Navbar.svelte';
	import Hero from './hero.svelte';
	import NotFound from './NotFound.svelte';
	import { navbarLinks, allDetails } from '../../datas/content';
	import { heroPageColors, notFoundPalette } from '../../themes/styles.js';
	import { generateGradient } from '../../utils/gradientGenerator';
	import { setActivePalette } from '../state/activePalette.svelte.js';
	import { SLIDE_STATUS, TRANSITION_MS as DEFAULT_TRANSITION_MS } from './GUI/slideNav.svelte';
	import ExperiencePage from './experience/experiencePage.svelte';
	import SkillsPage from './skills/skillsPage.svelte';
	import ContactPage from './contact/contactPage.svelte';

	const notFoundGradient = generateGradient(notFoundPalette);
	const pagePalettes = Object.fromEntries(
		Object.values(navbarLinks).map((link, index) => [
			link.page,
			heroPageColors[index % heroPageColors.length]
		])
	);

	let { page } = $props();

	// Generated once and reused as Hero's own initial gradient (via the initialGradient
	// prop below) instead of letting Hero call generateGradient() again independently —
	// that would produce a different random string for the same palette and read as a
	// real background change, firing an unwanted slide right after the page loads.
	const initialGradient = generateGradient(pagePalettes[navbarLinks.home.page]);
	let currentGradient = $state(initialGradient);

	let isKnownPage = $derived(Object.values(navbarLinks).some((link) => link.page === page));
	let isNotFound = $derived(!isKnownPage);
	let isHome = $derived(!isNotFound && page === navbarLinks.home.page);
	let experiencePage = $derived(page === navbarLinks.experience.page);
	let skillsPage = $derived(page === navbarLinks.skills.page);
	let contactPage = $derived(page === navbarLinks.contact.page);

	let activeBackground = $derived(isKnownPage ? currentGradient : notFoundGradient);

	let prefersReducedMotion = $state(false);

	// Status of Hero's slideshow — 'sliding' | 'view' | 'paused' — plus the real duration
	// and direction its transition is running at, all reported live from hero.svelte so
	// this component never has to hardcode a duration that could drift out of sync.
	let slideStatus = $state(SLIDE_STATUS.VIEW);
	let slideDurationMs = $state(DEFAULT_TRANSITION_MS);
	let slideDirection = $state(1);
	let bgDurationMs = $derived(prefersReducedMotion ? 0 : slideDurationMs);

	// The background layer that's actually painted right now, kept one step behind
	// activeBackground so the new value can slide in over it (same previous/current
	// pairing slideShow.svelte uses for its own slide-in/out). Seeded straight from
	// activeBackground — the real, correct color for whichever page loads first — so
	// there's no placeholder-to-real color swap; it just sits still while the content
	// (held back in hero.svelte's own lead pause) slides in on top of it.
	let displayedBackground = $state(activeBackground);
	let previousBackground = $state(null);
	let bgTransitionId = $state(0);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mq.matches;
		const onChange = (e) => (prefersReducedMotion = e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	$effect(() => {
		if (isKnownPage && !isHome && !experiencePage) {
			currentGradient = generateGradient(pagePalettes[page]);
			setActivePalette(pagePalettes[page]);
		}
	});

	$effect(() => {
		// Hero isn't mounted on other pages, so its status stops updating — reset it
		// rather than leaving a stale 'sliding'/'paused' value behind.
		if (!isHome) slideStatus = SLIDE_STATUS.VIEW;
	});

	$effect(() => {
		const next = activeBackground;
		if (next === displayedBackground) return;
		previousBackground = displayedBackground;
		displayedBackground = next;
		bgTransitionId += 1;
		const id = setTimeout(() => {
			previousBackground = null;
		}, bgDurationMs);
		return () => clearTimeout(id);
	});

	function handleSlideStateChange({ status, durationMs, direction }) {
		slideStatus = status;
		if (durationMs) slideDurationMs = durationMs;
		if (direction) slideDirection = direction;
	}

	function navigateTo(targetPage) {
		const path = targetPage === navbarLinks.home.page ? '/' : `/${targetPage}`;
		goto(path);
	}

	function handleNavigate(targetPage) {
		navigateTo(targetPage);
	}
</script>

<Navbar selectedPage={page} onNavigate={navigateTo} />

<section
	class="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white"
	aria-label="Page content"
>
	<!-- CSS can't tween between two different gradient strings (it just snaps), so instead
	     of transitioning background-image directly, the new gradient slides in over the old
	     one using the same translateX keyframes slideShow.svelte uses for its own slides,
	     with a little glitter burst at the start. -->
	{#if previousBackground}
		<div class="absolute inset-0" style:background-image={previousBackground} aria-hidden="true"></div>
	{/if}
	{#key bgTransitionId}
		<div
			class="absolute inset-0 {bgTransitionId > 0
				? `bg-slide-enter ${slideDirection === -1 ? 'bg-slide-in-left' : 'bg-slide-in-right'}`
				: ''}"
			style:background-image={displayedBackground ?? 'none'}
			style="--bg-duration: {bgDurationMs}ms;"
			aria-hidden="true"
		>
			{#if bgTransitionId > 0}
				<span class="glitter-cursor" aria-hidden="true"></span>
				<span class="glitter-burst" aria-hidden="true"></span>
			{/if}
		</div>
	{/key}

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
			sections={allDetails}
			{initialGradient}
			onBackgroundChange={(gradient) => (currentGradient = gradient)}
			onSlideStateChange={handleSlideStateChange}
		/>
	{:else if experiencePage}
		<ExperiencePage
			onBackgroundChange={(gradient) => (currentGradient = gradient)}
			onNavigate={handleNavigate}
		/>
	{:else if skillsPage}
		<SkillsPage onNavigate={handleNavigate} />
	{:else if contactPage}
		<ContactPage onNavigate={handleNavigate} />
	{:else if isNotFound}
		<NotFound />
	{/if}
</section>

<style>
	.bg-slide-enter {
		animation-duration: var(--bg-duration, 800ms);
		animation-timing-function: linear;
		animation-fill-mode: both;
	}

	.bg-slide-in-right {
		animation-name: bgSlideInFromRight;
	}

	.bg-slide-in-left {
		animation-name: bgSlideInFromLeft;
	}

	/* Same multi-step translateX curve as slideShow.svelte's slideInFromRight/Left, reused
	   here so the background pane moves with the identical easing feel as the slides. */
	@keyframes bgSlideInFromRight {
		0% {
			transform: translateX(100%);
			animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
		}
		5.56% {
			transform: translateX(90%);
			animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}
		22.22% {
			transform: translateX(75%);
			animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
		}
		50% {
			transform: translateX(5%);
			animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		}
		100% {
			transform: translateX(0%);
		}
	}
	@keyframes bgSlideInFromLeft {
		0% {
			transform: translateX(-100%);
			animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
		}
		5.56% {
			transform: translateX(-90%);
			animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}
		22.22% {
			transform: translateX(-75%);
			animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
		}
		50% {
			transform: translateX(-5%);
			animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		}
		100% {
			transform: translateX(0%);
		}
	}

	/* A quick sparkle burst that pops in as the new background arrives, then fades —
	   just for a bit of glitter at the start of the slide. */
	.glitter-burst {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0;
		background-image:
			radial-gradient(circle, #ffffff 0%, transparent 70%),
			radial-gradient(circle, #ffd76a 0%, transparent 70%),
			radial-gradient(circle, #ff6ad5 0%, transparent 70%),
			radial-gradient(circle, #6af7ff 0%, transparent 70%),
			radial-gradient(circle, #a685ff 0%, transparent 70%),
			radial-gradient(circle, #ffffff 0%, transparent 70%);
		background-repeat: no-repeat;
		background-size:
			8px 8px,
			6px 6px,
			7px 7px,
			6px 6px,
			7px 7px,
			5px 5px;
		background-position:
			14% 22%,
			30% 68%,
			52% 18%,
			68% 60%,
			82% 30%,
			90% 75%;
		animation: glitterPop calc(var(--bg-duration, 800ms) * 0.55) ease-out;
	}

	@keyframes glitterPop {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		35% {
			opacity: 1;
			transform: scale(1.15);
		}
		100% {
			opacity: 0;
			transform: scale(1.4);
		}
	}

	/* A ring that pops out from the center like a cursor click, right as the glitter
	   sparkles land — ties the sparkle scatter to a single focal point. */
	.glitter-cursor {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 64px;
		height: 64px;
		margin: -32px 0 0 -32px;
		border-radius: 9999px;
		border: 2px solid rgba(255, 255, 255, 0.85);
		box-shadow:
			0 0 12px rgba(255, 255, 255, 0.6),
			0 0 26px rgba(255, 106, 213, 0.45),
			0 0 40px rgba(106, 247, 255, 0.3);
		opacity: 0;
		pointer-events: none;
		animation: glitterCursorPulse calc(var(--bg-duration, 800ms) * 0.65) ease-out;
	}

	@keyframes glitterCursorPulse {
		0% {
			opacity: 0;
			transform: scale(0.15);
			border-width: 3px;
		}
		30% {
			opacity: 1;
			transform: scale(1);
			border-width: 2px;
		}
		100% {
			opacity: 0;
			transform: scale(2.4);
			border-width: 1px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bg-slide-enter {
			animation: none;
			transform: none;
		}
		.glitter-burst,
		.glitter-cursor {
			animation: none;
			opacity: 0;
		}
	}

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
