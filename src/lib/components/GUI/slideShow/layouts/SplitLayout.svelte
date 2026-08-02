<script>
	import SlideHeading from '../blocks/SlideHeading.svelte';
	import SlideDescription from '../blocks/SlideDescription.svelte';
	import SlideMedia from '../blocks/SlideMedia.svelte';
	import ActionGroup from '../blocks/ActionGroup.svelte';
	import ContentBlocks from '../blocks/ContentBlocks.svelte';
	import { cx } from '../utils/style.js';

	let { section, palette } = $props();

	const imageOnLeft = $derived(section.image?.position === 'left');
	// Per-section escape hatch: most slides keep their buttons at the end of the
	// content column, but the hero wants them anchored under its portrait instead —
	// data-driven via content.js rather than hardcoding a check against section.id.
	const buttonsUnderMedia = $derived(!!section.buttonsUnderMedia);
</script>

<!--
	Mobile: stacked column (image centered on top, text below) — the side-by-side row
	looked too cramped once there was enough room for both the image and readable text.
	Desktop/tablet (md:) keeps the original row layout, with `md:order-*` driven by the
	slide data's imageOnLeft position, unchanged from before.
	`min-w-0` + `break-words` (in SlideHeading etc.) stay in place regardless of layout —
	they're what actually guarantee no horizontal overflow, independent of stacked vs row.
-->
<section
	class="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden text-center px-4 md:px-6 lg:px-10  sm:gap-8 md:flex-row md:justify-between md:text-left"
>
	<div
		class={cx(
			'flex shrink-0 flex-col items-center gap-6',
			imageOnLeft && 'md:order-1',
			!imageOnLeft && 'md:order-2'
		)}
	>
		<SlideMedia image={section.image} {palette} />
		{#if buttonsUnderMedia}
			<ActionGroup buttons={section.buttons} align="center" />
		{/if}
	</div>

	<div
		id="contentSection"
		class={cx(
			'glass-scroll min-w-0 w-full flex-1 self-center overflow-visible md:max-h-dvh md:overflow-y-auto',
			imageOnLeft && 'md:order-2',
			!imageOnLeft && 'md:order-1'
		)}
	>
		<!--
			Entrance animations offset SlideHeading/ContentBlocks/SlideDescription/ActionGroup
			children with `transform` before they settle. Transformed geometry counts toward
			the scrollable overflow of the nearest scrolling ancestor — #contentSection above
			is `md:overflow-y-auto` — so without a clip boundary in between, it briefly shows
			extra scroll room (both axes, since overflow-x auto-computes from overflow-y) that
			disappears once the animation settles. This wrapper contains that transient offset
			locally instead of letting it leak into #contentSection's scroll calculation.
		-->
		<div class="flex w-full flex-col items-center gap-2 overflow-clip md:items-start">
			<SlideHeading
				tag={section.tag}
				title={section.title}
				subtitle={section.subtitle}
				quote={section.quote}
			/>
			<ContentBlocks {section} class="mt-4" />
			<SlideDescription description={section.description} />
			<ActionGroup buttons={buttonsUnderMedia ? [] : section.buttons} links={section.links} />
		</div>
	</div>
</section>
