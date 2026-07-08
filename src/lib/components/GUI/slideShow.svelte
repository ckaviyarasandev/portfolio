<script>
	import { LAYOUTS, DEFAULT_LAYOUT } from './slideShow/layouts/index.js';

	let { section } = $props();

	const Layout = $derived(LAYOUTS[section.layout] ?? LAYOUTS[DEFAULT_LAYOUT]);
</script>

<div class="slide-root">
	<Layout {section} />
</div>

<style>
	/* Locks this slide to exactly the width/height its parent gives it and
	   clips anything inside that would otherwise overflow — so this slide
	   can never grow wider than its slot or let its own content bleed past
	   its edges into a neighboring slide. */
	.slide-root {
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		overflow: hidden;
		box-sizing: border-box;
	}

	/* Shared text-shadow utilities used across every block. Defined once,
	   globally, here — the single component every slide always mounts. */
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
