<script>
	import SlideHeading from '../blocks/SlideHeading.svelte';
	import SlideDescription from '../blocks/SlideDescription.svelte';
	import SlideMedia from '../blocks/SlideMedia.svelte';
	import ActionGroup from '../blocks/ActionGroup.svelte';
	import ContentBlocks from '../blocks/ContentBlocks.svelte';
	import { cx } from '../utils/style.js';

	let { section, palette } = $props();

	const imageOnLeft = $derived(section.image?.position === 'left');
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
	<SlideMedia
		image={section.image}
		{palette}
		class={cx('shrink-0', imageOnLeft && 'md:order-1', !imageOnLeft && 'md:order-2')}
	/>

	<div
		id="contentSection"
		class={cx(
			'glass-scroll flex min-w-0 w-full flex-1 flex-col items-center gap-2 self-center overflow-visible md:max-h-dvh md:items-start md:overflow-y-auto',
			imageOnLeft && 'md:order-2',
			!imageOnLeft && 'md:order-1'
		)}
	>
		<SlideHeading
			tag={section.tag}
			title={section.title}
			subtitle={section.subtitle}
			quote={section.quote}
		/>
		<ContentBlocks {section} class="mt-4" />
		<SlideDescription description={section.description} />
		<ActionGroup buttons={section.buttons} links={section.links} />
	</div>
</section>
