<script>
	import { LAYOUTS, DEFAULT_LAYOUT } from './slideShow/layouts/index.js';

	let { section } = $props();

	const Layout = $derived(LAYOUTS[section.layout] ?? LAYOUTS[DEFAULT_LAYOUT]);
</script>

<div
	class="slide-root w-full box-border shrink-0 overflow-x-hidden overflow-y-auto [-webkit-overflow-scrolling:touch]"
>
	<Layout {section} />
</div>

<style>
	.slide-root::-webkit-scrollbar {
		width: 6px;
	}

	.slide-root::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.25);
		border-radius: 3px;
	}

	/* Shared text-shadow utilities used across every block. Defined once,
	   globally, here — the single component every slide always mounts.
	   Tailwind's core utilities have no text-shadow support, so these
	   stay as plain CSS. */
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
