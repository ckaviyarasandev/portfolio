<script>
	let { description, align = 'left' } = $props();
	const alignClass = align === 'center' ? 'mx-auto text-center' : '';
	const isArray = Array.isArray(description);
</script>

{#if description}
	{#if isArray}
		{#each description as item}
			<p
				class="text-shadow-sm mt-2 max-w-2xl text-pretty rounded-2xl bg-gray-800/10 px-4 py-2 text-base leading-8 text-white backdrop-blur-xl {alignClass}"
			>
				{item}
			</p>
		{/each}
	{:else}
		<p
			class="text-shadow-sm mt-2 max-w-2xl text-pretty rounded-2xl bg-gray-800/10 px-4 py-2 text-base leading-8 text-white backdrop-blur-xl {alignClass}"
		>
			{description}
		</p>
	{/if}
{/if}