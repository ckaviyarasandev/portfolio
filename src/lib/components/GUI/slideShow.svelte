<script>
	import ScrollbarStyles from '../../../themes/scrollbarStyles.svelte';
	import { LAYOUTS, DEFAULT_LAYOUT } from './slideShow/layouts/index.js';

	let { section, palette, status = 'resting', direction = 1, active = true } = $props();

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
	<div class="flex min-h-full w-full items-center justify-center">
		<div
			class="slide-root w-full box-border shrink-0"
		>
			<Layout {section} {palette} />
		</div>
	</div>
</div>            

<style>
	/* The entrance animations (.stagger-item / .stagger-item-x) offset children with
	   `transform` before they settle to their resting position. Transformed geometry
	   counts toward the scrollable overflow of the nearest scrolling ancestor, so
	   without this, `.glass-scroll` (overflow-y: auto below) briefly thinks it has
	   more content than it does and shows a scrollbar/extra scroll range that then
	   disappears once the animation settles. Clipping here keeps that transient
	   offset local instead of leaking into the ancestor's scroll calculation. */
	.slide-root {
		overflow: clip;
	}

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
		animation: slideInFromRight var(--slide-duration, 800ms) linear forwards;
	}
	.slide-in-left {
		visibility: visible;
		animation: slideInFromLeft var(--slide-duration, 800ms) linear forwards;
	}
	.slide-out-left {
		visibility: visible;
		animation: slideOutToLeft var(--slide-duration, 800ms) linear forwards;
	}
	.slide-out-right {
		visibility: visible;
		animation: slideOutToRight var(--slide-duration, 800ms) linear forwards;
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

	:global(.stagger-item) {
		opacity: 0;
		transform: translateY(14px);
	}
	:global(.slide-in-right .stagger-item),
	:global(.slide-in-left .stagger-item),
	:global(.slide-resting .stagger-item) {
		animation: heroContentReveal 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--stagger-delay, 0ms);
	}
	:global(.slide-out-left .stagger-item),
	:global(.slide-out-right .stagger-item),
	:global(.slide-parked .stagger-item) {
		opacity: 1;
		transform: none;
		animation: none;
	}
	@keyframes heroContentReveal {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.stagger-item) {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}

	:global(.stagger-item-x) {
		opacity: 0;
		transform: translateX(var(--stagger-x, -28px));
	}
	:global(.slide-in-right .stagger-item-x),
	:global(.slide-in-left .stagger-item-x),
	:global(.slide-resting .stagger-item-x) {
		animation: heroContentRevealX var(--stagger-duration, 550ms) cubic-bezier(0.16, 1, 0.3, 1)
			both;
		animation-delay: var(--stagger-delay, 0ms);
	}
	:global(.slide-out-left .stagger-item-x),
	:global(.slide-out-right .stagger-item-x),
	:global(.slide-parked .stagger-item-x) {
		opacity: 1;
		transform: none;
		animation: none;
	}
	@keyframes heroContentRevealX {
		from {
			opacity: 0;
			transform: translateX(var(--stagger-x, -28px));
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.stagger-item-x) {
			opacity: 1;
			transform: none;
			animation: none;
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