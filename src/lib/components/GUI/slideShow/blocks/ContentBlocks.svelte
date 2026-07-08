<script>
	import IconGrid from './IconGrid.svelte';
	import StatGrid from './StatGrid.svelte';
	import SkillBars from './SkillBars.svelte';
	import Timeline from './Timeline.svelte';
	import CategoryList from './CategoryList.svelte';
	import HighlightList from './HighlightList.svelte';
	import ContactList from './ContactList.svelte';

	/**
	 * Registry of every "collection" field a slide can carry. Adding a new
	 * collection type to the data model only ever means adding one entry
	 * here — no layout file needs to change.
	 */
	const BLOCK_REGISTRY = {
		cards: { component: IconGrid, props: { variant: 'card' } },
		principles: { component: IconGrid, props: { variant: 'principle' } },
		steps: { component: IconGrid, props: { variant: 'step' } },
		technologies: { component: IconGrid, props: { variant: 'tech' } },
		stats: { component: StatGrid, props: {} },
		skills: { component: SkillBars, props: {} },
		timeline: { component: Timeline, props: {} },
		categories: { component: CategoryList, props: {} },
		highlights: { component: HighlightList, props: {} },
		contactMethods: { component: ContactList, props: {} }
	};

	// Default render order. A slide can override this via `section.blocksOrder`
	// (an array of the same keys) without touching this file.
	const DEFAULT_ORDER = Object.keys(BLOCK_REGISTRY);

	let { section, class: className = '' } = $props();

	const order = $derived(section.blocksOrder?.length ? section.blocksOrder : DEFAULT_ORDER);

	const activeBlocks = $derived(
		order
			.filter((key) => BLOCK_REGISTRY[key] && section[key]?.length)
			.map((key) => ({ key, items: section[key], ...BLOCK_REGISTRY[key] }))
	);
</script>

{#if activeBlocks.length}
	<div class="flex w-full flex-col {className}">
		{#each activeBlocks as block (block.key)}
			{@const Block = block.component}
			<Block items={block.items} {...block.props} />
		{/each}
	</div>
{/if}
