<script>
	import SlideHeading from '../blocks/SlideHeading.svelte';
	import SlideDescription from '../blocks/SlideDescription.svelte';
	import ActionGroup from '../blocks/ActionGroup.svelte';
	import ContentBlocks from '../blocks/ContentBlocks.svelte';

	let { section } = $props();
</script>

<section class="relative flex w-full flex-col items-center gap-8 overflow-hidden text-center">
	<SlideHeading
		tag={section.tag}
		title={section.title}
		subtitle={section.subtitle}
		quote={section.quote}
		align="center"
	/>
	<SlideDescription description={section.description} align="center" />
	<ActionGroup buttons={section.buttons} links={section.links} align="center" />
	<div class="mt-4 w-full max-w-5xl">
		<ContentBlocks {section} class="items-center" />
	</div>
</section>
