<script>
	/**
	 * Text header for a slide. Every field is optional; only what's present
	 * in the data renders.
	 */
	let { tag, title, subtitle, quote, align = 'left' } = $props();

	const alignClass = align === 'center' ? 'items-center text-center' : 'items-center md:items-start';
</script>

<div class="flex flex-col {alignClass}">
	{#if tag}
		<p
			class="text-shadow-sm mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
		>
			<span class="h-px w-6 bg-white/50" aria-hidden="true"></span>
			{tag}
		</p>
	{/if}

	{#if title}
		<h1
			class="text-shadow-lg text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
		>
			{title}
		</h1>
	{/if}

	{#if subtitle}
		<h2 class="text-shadow mt-4 text-balance text-2xl font-medium text-white/95">
			{subtitle}
		</h2>
	{/if}

	{#if quote}
		<blockquote
			class="text-shadow-sm mt-6 max-w-2xl border-l-2 border-white/40 pl-4 text-pretty text-xl italic leading-8 text-white/90"
		>
			“{quote}”
		</blockquote>
	{/if}
</div>
