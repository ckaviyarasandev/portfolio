<script module>
	export const INTERVAL = 5000;
	// 100ms + 300ms + 500ms + 900ms four-phase timeline used by slideShow.svelte's keyframes
	export const TRANSITION_MS = 1800;
</script>

<script>
	let { sections = [], currentIndex = 0, onNavigate } = $props();

	function dispatchNavigate(index, direction) {
		onNavigate?.(index, direction);
	}

	export function goToSlide(index) {
		if (index === currentIndex || !sections.length) return;
		const len = sections.length;
		const forwardDist = (index - currentIndex + len) % len;
		const backwardDist = (currentIndex - index + len) % len;
		const dir = forwardDist <= backwardDist ? 1 : -1;
		dispatchNavigate(index, dir);
	}

	export function nextSlide() {
		if (!sections.length) return;
		dispatchNavigate((currentIndex + 1) % sections.length, 1);
	}

	export function prevSlide() {
		if (!sections.length) return;
		dispatchNavigate((currentIndex - 1 + sections.length) % sections.length, -1);
	}
</script>

{#if sections.length > 1}
	<button
		type="button"
		onclick={prevSlide}
		aria-label="Previous slide"
		class="absolute top-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
	>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="18 15 12 9 6 15" />
		</svg>
	</button>

	<button
		type="button"
		onclick={nextSlide}
		aria-label="Next slide"
		class="absolute bottom-4 right-4 z-20 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
	>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</button>

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