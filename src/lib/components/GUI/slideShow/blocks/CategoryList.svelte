<script>
	let { items = [] } = $props();
</script>

{#if items?.length}
	<div class="mt-10 grid gap-6 sm:grid-cols-2">
		{#each items as category}
			<div class="rounded-2xl border border-white/15 bg-white/[0.05] p-5 backdrop-blur-xl">
				<h3 class="text-shadow-sm text-sm font-semibold uppercase tracking-wide text-white/85">
					{category.title}
				</h3>
				{#if category.items?.length}
					<ul class="mt-3 flex flex-wrap gap-2">
						{#each category.items as entry}
							<li
								class="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/90"
							>
								{entry}
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</div>
{/if}
