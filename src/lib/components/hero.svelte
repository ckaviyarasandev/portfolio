<script>
	import { onMount } from 'svelte';
	import SlideShow from './GUI/slideShow.svelte';
	import SlideNav, { INTERVAL, TRANSITION_MS } from './GUI/slideNav.svelte';
	import { heroPageColors } from '../../themes/styles.js';
	import { generateGradient, getNextPalette } from '../../utils/gradientGenerator';

	let { sections = [], onBackgroundChange } = $props();

	let currentIndex = $state(0);
	let previousIndex = $state(null);
	let direction = $state(1);
	let transitionId = $state(0);

	let currentPalette = $state(heroPageColors[0]);
	let currentGradient = $state(generateGradient(heroPageColors[0]));
	let isAnimating = $state(false);

	let timer;
	let isPaused = $state(false);
	let prefersReducedMotion = $state(false);

	let touchStartX = 0;
	let touchStartY = 0;

	let slideNav;
	let containerEl;

	let wheelLocked = false;
	const WHEEL_THRESHOLD = 12;

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

	function handlePause() {
		isPaused = true;
		stopTimer();
	}
	function handleResume() {
		isPaused = false;
		startTimer();
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

	function handleWheel(e) {
		if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

		// If the active slide's own content is scrollable, let it scroll until
		// it hits the edge in the scroll direction before changing slides.
		const activeEl = containerEl?.querySelector('.glass-scroll[aria-hidden="false"]');
		if (activeEl) {
			const atTop = activeEl.scrollTop <= 0;
			const atBottom = activeEl.scrollTop + activeEl.clientHeight >= activeEl.scrollHeight - 1;
			if (e.deltaY > 0 && !atBottom) return;
			if (e.deltaY < 0 && !atTop) return;
		}

		if (wheelLocked || isAnimating) return;
		e.preventDefault();
		wheelLocked = true;
		setTimeout(() => (wheelLocked = false), TRANSITION_MS + 200);

		e.deltaY > 0 ? nextSlide() : prevSlide();
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
	class="relative z-10 mx-auto w-full"
	role="region"
	onmouseenter={handlePause}
	onmouseleave={handleResume}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
	onwheel={handleWheel}
>
	<div
		class="relative w-full overflow-hidden h-[calc(100dvh)] px-4"
		style="--slide-duration: {TRANSITION_MS}ms;"
	>
		{#each sections as section, i (section.id)}
			{#if i === currentIndex || i === previousIndex}
				{#key `${i}-${transitionId}`}
					<SlideShow
						{section}
						status={i === previousIndex ? 'out' : previousIndex !== null ? 'in' : 'resting'}
						{direction}
						active={i === currentIndex}
					/>
				{/key}
			{:else}
				<SlideShow {section} status="parked" active={false} />
			{/if}
		{/each}
	</div>

	<SlideNav bind:this={slideNav} {sections} {currentIndex} onNavigate={changeSlide} />
</div>