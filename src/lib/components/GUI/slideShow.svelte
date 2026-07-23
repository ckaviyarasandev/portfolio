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
	<div class="p-6 mx-auto mt-8 flex min-h-full w-full items-center justify-center">
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

	.slide-in-right {
		visibility: visible;
		animation: slideInFromRight var(--slide-duration, 600ms) linear forwards;
	}
	.slide-in-left {
		visibility: visible;
		animation: slideInFromLeft var(--slide-duration, 600ms) linear forwards;
	}
	.slide-out-left {
		visibility: visible;
		animation: slideOutToLeft var(--slide-duration, 600ms) linear forwards;
	}
	.slide-out-right {
		visibility: visible;
		animation: slideOutToRight var(--slide-duration, 600ms) linear forwards;
	}

	@keyframes slideInFromRight {
		0% { transform: translateX(100%); }
		10% { transform: translateX(75%); }
		80% { transform: translateX(10%); }
		100% { transform: translateX(0%); }
	}
	@keyframes slideInFromLeft {
		0% { transform: translateX(-100%); }
		10% { transform: translateX(-75%); }
		80% { transform: translateX(-10%); }
		100% { transform: translateX(0%); }
	}
	@keyframes slideOutToLeft {
		0% { transform: translateX(0%); }
		10% { transform: translateX(-25%); }
		80% { transform: translateX(-90%); }
		100% { transform: translateX(-100%); }
	}
	@keyframes slideOutToRight {
		0% { transform: translateX(0%); }
		10% { transform: translateX(25%); }
		80% { transform: translateX(90%); }
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