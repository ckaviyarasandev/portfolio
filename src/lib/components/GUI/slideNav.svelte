<script module>
	export const INTERVAL = 5000;
	export const TRANSITION_MS = 600;
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