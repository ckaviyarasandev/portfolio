<script>
	/**
	 * Text header for a slide. Every field is optional; only what's present
	 * in the data renders.
	 */
	let { tag, title, subtitle, quote, align = 'left' } = $props();

	const alignClass = align === 'center' ? 'items-center text-center' : 'items-center md:items-start';
</script>

<div class="flex w-full min-w-0 flex-col mt-10 {alignClass}">
	{#if tag}
		<p
			class="stagger-item text-shadow-sm mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
			style:--stagger-delay="0ms"
		>
			<span class="h-px w-6 bg-white/50" aria-hidden="true"></span>
			{tag}
		</p>
	{/if}

	{#if title}
		<h1
			class="stagger-item text-shadow-lg text-balance break-words text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
			style:--stagger-delay="90ms"
		>
			{title}
		</h1>
	{/if}

	{#if subtitle}
		<h2
			class="stagger-item text-shadow mt-4 text-balance break-words text-xl font-medium text-white/95 sm:text-2xl"
			style:--stagger-delay="180ms"
		>
			{subtitle}
		</h2>
	{/if}

	{#if quote}
		<blockquote
			class="stagger-item text-shadow-sm mt-6 max-w-2xl border-l-2 border-white/40 pl-4 text-pretty break-words text-lg italic leading-8 text-white/90 sm:text-xl"
			style:--stagger-delay="260ms"
		>
			“{quote}”
		</blockquote>
	{/if}
</div>
