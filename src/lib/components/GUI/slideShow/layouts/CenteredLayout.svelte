<script>
	import SlideHeading from '../blocks/SlideHeading.svelte';
	import SlideDescription from '../blocks/SlideDescription.svelte';
	import SlideMedia from '../blocks/SlideMedia.svelte';
	import ActionGroup from '../blocks/ActionGroup.svelte';
	import ContentBlocks from '../blocks/ContentBlocks.svelte';

	let { section } = $props();
</script>

<section
	class="relative flex w-full flex-col items-center gap-8 overflow-hidden px-6 py-8 text-center"
>
	<SlideMedia image={section.image} />
	<SlideHeading
		tag={section.tag}
		title={section.title}
		subtitle={section.subtitle}
		quote={section.quote}
		align="center"
	/>
	<SlideDescription description={section.description} align="center" />
	<ActionGroup buttons={section.buttons} links={section.links} align="center" />
	<ContentBlocks {section} class="items-center" />
</section>
