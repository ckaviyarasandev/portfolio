<script>
	import SlideHeading from '../blocks/SlideHeading.svelte';
	import SlideDescription from '../blocks/SlideDescription.svelte';
	import SlideMedia from '../blocks/SlideMedia.svelte';
	import ActionGroup from '../blocks/ActionGroup.svelte';
	import ContentBlocks from '../blocks/ContentBlocks.svelte';
	import { cx } from '../utils/style.js';

	let { section } = $props();

	const imageOnLeft = $derived(section.image?.position === 'left');
</script>

<section
	class="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden text-center md:flex-row md:justify-between md:text-left"
>
	<div class={cx('w-full flex flex-1 flex-col items-center md:items-start', imageOnLeft && 'md:order-2')}>
		<SlideHeading tag={section.tag} title={section.title} subtitle={section.subtitle} quote={section.quote} />
		<SlideDescription description={section.description} />
		<ActionGroup buttons={section.buttons} links={section.links} />
		<ContentBlocks {section} class="mt-4" />
	</div>

	<SlideMedia image={section.image} class={imageOnLeft ? 'md:order-1' : ''} />
</section>
