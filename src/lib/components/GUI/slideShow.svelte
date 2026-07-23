<script>
	import ScrollbarStyles from '../../../themes/scrollbarStyles.svelte';
	import { LAYOUTS, DEFAULT_LAYOUT } from './slideShow/layouts/index.js';

	let { section, status = 'resting', direction = 1, active = true } = $props();

	const Layout = $derived(LAYOUTS[section.layout] ?? LAYOUTS[DEFAULT_LAYOUT]);

	const animationClass = $derived(
		status === 'out'
			? direction === 1
				? 'slide-out-left'
				: 'slide-out-right'
			: status === 'in'
				? direction === 1
					? 'slide-in-right'
					: 'slide-in-left'
				: status === 'parked'
					? 'slide-parked'
					: 'slide-resting'
	);
</script>

<ScrollbarStyles />

<div
	class="glass-scroll absolute inset-0 overflow-y-auto overscroll-contain {animationClass}"
	style="
		pointer-events: {active ? 'auto' : 'none'};
		z-index: {active ? 2 : status === 'parked' ? 0 : 1};
	"
	aria-hidden={!active}
>
	<div class="t-12 p-6 mx-auto flex min-h-full w-full items-center justify-center">
		<div
			class="slide-root w-full box-border shrink-0 overflow-x-hidden overflow-y-auto [-webkit-overflow-scrolling:touch]"
		>
			<Layout {section} />
		</div>
	</div>
</div>

<style>
	.slide-parked {
		transform: translateX(100%);
		visibility: hidden;
	}

	.slide-resting {
		transform: translateX(0%);
		visibility: visible;
	}

	/*
	 * Four-phase timeline (total = 100ms + 300ms + 500ms + 900ms = 1800ms, set
	 * via TRANSITION_MS in slideNav.svelte and piped in through --slide-duration):
	 *   phase 1 — first 10% of the distance, played over the first  100ms (5.56%)
	 *   phase 2 — next  15% of the distance, played over the next   300ms (22.22%)
	 *   phase 3 — next  70% of the distance, played over the next   500ms (50%)
	 *   phase 4 — final  5% of the distance, played over the final  900ms (100%)
	 * A short, gentle wind-up, a quick pickup, the fast middle rush covering
	 * most of the ground, then a long slow settle over the last sliver of
	 * distance instead of an abrupt stop.
	 */
	.slide-in-right {
		visibility: visible;
		animation: slideInFromRight var(--slide-duration, 1800ms) linear forwards;
	}
	.slide-in-left {
		visibility: visible;
		animation: slideInFromLeft var(--slide-duration, 1800ms) linear forwards;
	}
	.slide-out-left {
		visibility: visible;
		animation: slideOutToLeft var(--slide-duration, 1800ms) linear forwards;
	}
	.slide-out-right {
		visibility: visible;
		animation: slideOutToRight var(--slide-duration, 1800ms) linear forwards;
	}

	@keyframes slideInFromRight {
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
		100% { transform: translateX(0%); }
	}
	@keyframes slideInFromLeft {
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
		100% { transform: translateX(0%); }
	}
	@keyframes slideOutToLeft {
		0% {
			transform: translateX(0%);
			animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
		}
		5.56% {
			transform: translateX(-10%);
			animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}
		22.22% {
			transform: translateX(-25%);
			animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
		}
		50% {
			transform: translateX(-95%);
			animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		}
		100% { transform: translateX(-100%); }
	}
	@keyframes slideOutToRight {
		0% {
			transform: translateX(0%);
			animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
		}
		5.56% {
			transform: translateX(10%);
			animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}
		22.22% {
			transform: translateX(25%);
			animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
		}
		50% {
			transform: translateX(95%);
			animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		}
		100% { transform: translateX(100%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.slide-in-right,
		.slide-in-left,
		.slide-out-left,
		.slide-out-right {
			animation: none !important;
			transform: translateX(0%);
		}
	}

	:global(.text-shadow-sm) {
		text-shadow: 0 1px 3px rgba(243, 243, 243, 0.55);
	}

	:global(.text-shadow) {
		text-shadow:
			0 2px 8px rgba(0, 0, 0, 0.5),
			0 1px 2px rgba(0, 0, 0, 0.6);
	}

	:global(.text-shadow-lg) {
		text-shadow:
			0 4px 24px rgba(0, 0, 0, 0.55),
			0 2px 6px rgba(0, 0, 0, 0.65);
	}
</style>