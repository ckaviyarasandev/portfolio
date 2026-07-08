<script>
	import { ICONS } from '../../../../../datas/icon';
	import { MOTION, cx } from '../utils/style.js';

	/**
	 * Generic grid for any "icon + name + optional description" collection.
	 * `cards`, `technologies`, `principles` and `steps` all share this shape,
	 * so one component covers all four via the `variant` prop:
	 *  - "card"      full glass card, icon + title + description
	 *  - "principle" same as card, slightly denser
	 *  - "step"      card with a numbered badge instead of / alongside an icon
	 *  - "tech"      compact pill, icon + name only, no description
	 */
	let { items = [], variant = 'card', class: className = '' } = $props();

	const isCompact = $derived(variant === 'tech');
	const isNumbered = $derived(variant === 'step');

	function label(item) {
		return item.title ?? item.name ?? '';
	}
</script>

{#if items?.length}
	<div
		class={cx(
			'mt-10 grid gap-4',
			isCompact ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'sm:grid-cols-2',
			className
		)}
	>
		{#each items as item, index}
			{#if isCompact}
				<span
					class={cx(
						'flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl',
						MOTION,
						'hover:border-white/35 hover:bg-white/20'
					)}
				>
					{#if ICONS[item.icon]}
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
							<path d={ICONS[item.icon]} />
						</svg>
					{/if}
					{label(item)}
				</span>
			{:else}
				<div
					class={cx(
						'flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-5 text-left backdrop-blur-xl',
						'shadow-lg shadow-black/20',
						MOTION,
						'hover:border-white/25 hover:bg-white/10'
					)}
				>
					<div class="flex items-center gap-3">
						{#if isNumbered}
							<span
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-semibold text-white"
							>
								{String(index + 1).padStart(2, '0')}
							</span>
						{:else if ICONS[item.icon]}
							<span
								class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white"
							>
								<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
									<path d={ICONS[item.icon]} />
								</svg>
							</span>
						{/if}
						<h3 class="text-lg font-semibold text-white">{label(item)}</h3>
					</div>
					{#if item.description}
						<p class="text-pretty text-sm leading-6 text-white/80">{item.description}</p>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
{/if}
