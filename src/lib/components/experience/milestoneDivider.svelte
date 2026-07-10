<script>
	let { year = '', text = '' } = $props();
</script>

<div class="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-16 text-center sm:py-20">
	<span class="text-sm font-semibold uppercase tracking-widest text-white/40">{year}</span>
	<p class="text-lg text-white/70 sm:text-xl">{text}</p>
	<div class="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
</div>
