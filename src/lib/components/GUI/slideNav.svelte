<script module>
	export const INTERVAL = 10000;
	export const TRANSITION_MS = 800;
	export const INITIAL_LEAD_MS = 1000;

	/** @type {{ SLIDING: 'sliding', VIEW: 'view', PAUSED: 'paused' }} */
	export const SLIDE_STATUS = {
		SLIDING: 'sliding',
		VIEW: 'view',
		PAUSED: 'paused'
	};
</script>

<script>
	import { activePalette } from '../../state/activePalette.svelte.js';

	let {
		sections = [],
		currentIndex = 0,
		onNavigate,
		isPaused = false,
		onTogglePause,
		cycleId = 0
	} = $props();

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
		class="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
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

	<div class="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
		{#each sections as section, i (section.id)}
			{#if i === currentIndex}
				<!-- The active dot doubles as the pause/resume toggle — clicking the current
				     slide's own indicator was already a no-op for navigation, so this reuses
				     that space instead of a separate button elsewhere in the UI. Its fill
				     sweeps left-to-right over the same INTERVAL the autoplay timer uses, so
				     you can see exactly how close it is to advancing to the next slide. -->
				<button
					type="button"
					onclick={() => onTogglePause?.()}
					aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
					aria-pressed={isPaused}
					class="group relative flex h-4 w-16 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10 px-4 text-[9px] font-bold tracking-wider text-white shadow-sm backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
				>
					{#if !isPaused}
						{#key cycleId}
							<span
								class="nav-progress-fill pointer-events-none absolute inset-y-0 left-0"
								style:--fill-color={activePalette.accent}
								style:animation-duration="{INTERVAL}ms"
								aria-hidden="true"
							></span>
						{/key}
					{/if}
					<!-- glassy inner highlight, same trick used on buttons/cards elsewhere -->
					<span
						class="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10"
						aria-hidden="true"
					></span>
					<span class="text-shadow-sm relative z-10">{isPaused ? 'Auto' : 'Pause'}</span>
				</button>
			{:else}
				<button
					type="button"
					onclick={() => goToSlide(i)}
					aria-label="Go to slide {i + 1}"
					class="h-1.5 w-1.5 rounded-full bg-white/40 transition-all duration-300 hover:bg-white/60"
				></button>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.nav-progress-fill {
		width: 0%;
		border-radius: 9999px;
		background: var(--fill-color, #60a5fa);
		box-shadow: 0 0 6px 0 var(--fill-color, #60a5fa);
		animation-name: nav-progress-fill;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
	}

	@keyframes nav-progress-fill {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-progress-fill {
			animation: none;
		}
	}
</style>