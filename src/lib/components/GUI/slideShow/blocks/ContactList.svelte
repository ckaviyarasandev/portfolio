<script>
	import { ICONS } from '../../../../../datas/icon';
	import { MOTION, cx } from '../utils/style.js';

	let { items = [] } = $props();
</script>

{#if items?.length}
	<div class="mt-10 grid gap-4 sm:grid-cols-2">
		{#each items as method}
			<svelte:element
				this={method.href ? 'a' : 'div'}
				href={method.href}
				target={method.href ? '_blank' : undefined}
				rel={method.href ? 'noopener noreferrer' : undefined}
				class={cx(
					'flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl',
					method.href && 'hover:border-white/30 hover:bg-white/10',
					MOTION
				)}
			>
				{#if ICONS[method.icon]}
					<span
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
							<path d={ICONS[method.icon]} />
						</svg>
					</span>
				{/if}
				<span class="flex flex-col text-left">
					<span class="text-shadow-sm text-xs uppercase tracking-wide text-white/60">
						{method.title}
					</span>
					<span class="text-shadow-sm text-sm font-medium text-white">{method.value}</span>
				</span>
			</svelte:element>
		{/each}
	</div>
{/if}
