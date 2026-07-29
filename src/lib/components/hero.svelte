<script>
	import { onMount } from 'svelte';
	import SlideShow from './GUI/slideShow.svelte';
	import SlideNav, { INTERVAL, TRANSITION_MS, SLIDE_STATUS } from './GUI/slideNav.svelte';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';
	import { setActivePalette } from '../state/activePalette.svelte.js';

	let { sections = [], onBackgroundChange, onSlideStateChange } = $props();

	let currentIndex = $state(0);
	let previousIndex = $state(null);
	let direction = $state(1);
	let transitionId = $state(0);

	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isAnimating = $state(false);

	let timer;
	// Autoplay only stops via the pause button now — hovering the slideshow no longer
	// pauses it, so it keeps advancing even while the user's mouse is resting over it.
	let manualPaused = $state(false);
	let isPaused = $derived(manualPaused);
	let prefersReducedMotion = $state(false);

	// Bumped every time the autoplay countdown actually (re)starts from zero — on slide
	// change and on resume-from-pause — so SlideNav knows when to restart its progress-fill
	// animation instead of just pausing/resuming it (clearInterval+setInterval always
	// restarts the full INTERVAL anyway, so the visual should always restart too).
	let cycleId = $state(0);

	let slideStatus = $derived(
		isAnimating ? SLIDE_STATUS.SLIDING : isPaused ? SLIDE_STATUS.PAUSED : SLIDE_STATUS.VIEW
	);

	let touchStartX = 0;
	let touchStartY = 0;

	let slideNav;
	let containerEl;

	let wheelLocked = false;
	let boundaryArmed = false;
	let boundaryDirection = 0;
	let wheelIdleTimer;
	const WHEEL_THRESHOLD = 12;
	const WHEEL_IDLE_MS = 150;

	$effect(() => {
		onBackgroundChange?.(currentGradient);
	});

	$effect(() => {
		// Keep the shared cursor-trail palette in sync with whichever slide is active.
		setActivePalette(currentPalette);
	});

	$effect(() => {
		// Report the current status plus how long/which way the parent should animate a
		// "sliding" transition — sourced from slideNav's own TRANSITION_MS/direction, so
		// pageController never has to hardcode/import those values itself.
		onSlideStateChange?.({ status: slideStatus, durationMs: TRANSITION_MS, direction });
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
		boundaryArmed = false;
		boundaryDirection = 0;
		clearTimeout(wheelIdleTimer);
		resetTimer();
		cycleId += 1;
		unlockAfterTransition();
	}

	function nextSlide() {
		slideNav?.nextSlide();
	}
	function prevSlide() {
		slideNav?.prevSlide();
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

	function togglePause() {
		manualPaused = !manualPaused;
		if (manualPaused) {
			stopTimer();
		} else {
			startTimer();
			cycleId += 1;
		}
	}

	function isTypingTarget(e) {
		const tag = e.target?.tagName;
		return tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
	}

	function handleKeydown(e) {
		if (isTypingTarget(e)) return;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			nextSlide();
		}
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			prevSlide();
		}
	}

	function getActiveScrollEl() {
		const activeSlide = containerEl?.querySelector('.glass-scroll[aria-hidden="false"]');
		if (!activeSlide) return null;
		return activeSlide.querySelector('#contentSection') ?? activeSlide;
	}

	function handleWheel(e) {
		if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

		const dir = e.deltaY > 0 ? 1 : -1;
		const activeEl = getActiveScrollEl();

		clearTimeout(wheelIdleTimer);

		if (activeEl) {
			const atTop = activeEl.scrollTop <= 0;
			const atBottom = activeEl.scrollTop + activeEl.clientHeight >= activeEl.scrollHeight - 1;
			const atEdge = (dir === 1 && atBottom) || (dir === -1 && atTop);

			if (!atEdge) {
				// still room to scroll in this direction — let it scroll, forget any armed state
				boundaryArmed = false;
				boundaryDirection = 0;
				return;
			}

			if (boundaryDirection !== dir) {
				// edge direction changed — needs its own pause before it can navigate
				boundaryArmed = false;
				boundaryDirection = dir;
			}

			if (!boundaryArmed) {
				// still inside the same continuous scroll/inertia that reached the edge.
				// Only arm once the wheel actually stops firing for a bit — a fresh wheel
				// event after that pause is what's allowed to navigate.
				wheelIdleTimer = setTimeout(() => {
					boundaryArmed = true;
				}, WHEEL_IDLE_MS);
				return;
			}
			// boundaryArmed: the previous scroll paused at the edge and this is a new attempt
		}

		if (wheelLocked || isAnimating) return;
		e.preventDefault();
		wheelLocked = true;
		boundaryArmed = false;
		boundaryDirection = 0;
		setTimeout(() => (wheelLocked = false), TRANSITION_MS + 200);

		dir === 1 ? nextSlide() : prevSlide();
	}

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
	bind:this={containerEl}
	class="relative z-10 w-full"
	role="region"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	onwheel={handleWheel}
>
	<div
		class="relative w-full overflow-hidden h-[calc(100dvh)]"
		style="--slide-duration: {TRANSITION_MS}ms;"
	>
		{#each sections as section, i (section.id)}
			{#if i === currentIndex || i === previousIndex}
				{#key `${i}-${transitionId}`}
					<SlideShow
						{section}
						palette={currentPalette}
						status={i === previousIndex ? 'out' : previousIndex !== null ? 'in' : 'resting'}
						{direction}
						active={i === currentIndex}
					/>
				{/key}
			{:else}
				<SlideShow {section} palette={currentPalette} status="parked" active={false} />
			{/if}
		{/each}
	</div>

	<SlideNav
		bind:this={slideNav}
		{sections}
		{currentIndex}
		onNavigate={changeSlide}
		{isPaused}
		onTogglePause={togglePause}
		{cycleId}
	/>
</div>