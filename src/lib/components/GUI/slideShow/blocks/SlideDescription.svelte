<script>
	let { description, align = 'left' } = $props();
	const alignClass = align === 'center' ? 'mx-auto text-center' : '';
	const isArray = Array.isArray(description);
</script>

{#if description}
	{#if isArray}
		<div class="mt-2 my-10 md:mb-6">
			{#each description as item, i}
				<p
					class="stagger-item w-full min-w-0 rounded-2xl bg-gray-800/10 px-4 py-2 text-base leading-8 text-pretty break-words text-white backdrop-blur-xl text-shadow-sm {alignClass}"
					style:--stagger-delay="{340 + i * 60}ms"
				>
					{item}
				</p>
			{/each}
		</div>
	{:else}
		<p
			class="stagger-item mt-2 my-10 md:mb-6 rounded-2xl bg-gray-800/10 px-4 py-2 pb-12 text-base leading-8 text-pretty text-white backdrop-blur-xl text-shadow-sm {alignClass}"
			style:--stagger-delay="340ms"
		>
			{description}
		</p>
	{/if}
{/if}
