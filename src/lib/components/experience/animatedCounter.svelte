<script>
	let { value = 0, label = '', suffix = '', duration = 1200 } = $props();

	let display = $state(0);
	let el = $state();
	let hasAnimated = false;

	function animate() {
		if (hasAnimated) return;
		hasAnimated = true;
		const start = performance.now();
		function tick(now) {
			const progress = Math.min((now - start) / duration, 1);
			// ease-out cubic — fast start, gentle settle
			const eased = 1 - Math.pow(1 - progress, 3);
			display = Math.round(value * eased);
			if (progress < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	$effect(() => {
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) animate();
			},
			{ threshold: 0.4 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div bind:this={el} class="flex flex-col items-center gap-1 text-center">
	<span class="text-4xl font-bold tracking-tight sm:text-5xl">{display}{suffix}+</span>
	<span class="text-sm text-white/60">{label}</span>
</div>
