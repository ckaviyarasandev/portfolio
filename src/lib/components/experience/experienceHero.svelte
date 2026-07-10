<script>
	let { experience = [] } = $props();
	let years = '2+';
</script>

<section class="relative flex min-h-[80dvh] flex-col items-center justify-center px-4 text-center">
	<h1 class="text-4xl font-bold text-white sm:text-6xl">Experience</h1>
	<p class="mt-4 max-w-xl text-lg text-white/60 sm:text-xl">
		Building products, solving problems, and growing through every opportunity.
	</p>

	<div class="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/50">
		<span>{experience.length} Professional Roles</span>
		<span>{years} Years Experience</span>
		<span>Frontend + Backend + Low-Code</span>
	</div>
</section>
