<script>
	let { description, align = 'left' } = $props();
	const alignClass = align === 'center' ? 'mx-auto text-center' : '';
</script>

{#if description}
	<p
		class="text-shadow-sm mt-6 max-w-2xl text-pretty rounded-2xl bg-gray-800/10 px-4 py-2 text-lg leading-8 text-white backdrop-blur-xl {alignClass}"
	>
		{description}
	</p>
{/if}
