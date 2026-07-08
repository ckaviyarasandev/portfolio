<script>
	import { ICONS } from '../../../../../datas/icon';
	import { BUTTON_VARIANTS, MOTION, cx, pick } from '../utils/style.js';

	let { buttons = [], links = [], align = 'left' } = $props();

	const justifyClass = align === 'center' ? 'justify-center' : 'justify-center md:justify-start';

	function handleButtonClick(button, event) {
		if (button.type !== 'scroll') return;
		event.preventDefault();
		document.querySelector(button.target)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

{#if buttons?.length}
	<div class="mt-10 flex flex-wrap gap-4 {justifyClass}">
		{#each buttons as button}
			<a
				href={button.href ?? button.target ?? '#'}
				download={button.type === 'download' ? '' : undefined}
				onclick={(e) => handleButtonClick(button, e)}
				class={cx(
					'text-shadow-sm rounded-full px-6 py-3 font-semibold',
					'motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.03]',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
					MOTION,
					pick(BUTTON_VARIANTS, button.variant, 'primary')
				)}
			>
				{button.label}
			</a>
		{/each}
	</div>
{/if}

{#if links?.length}
	<div class="mt-8 flex gap-3 {justifyClass}">
		{#each links as link}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={link.label}
				class={cx(
					'flex h-11 w-11 items-center justify-center rounded-full',
					'border border-white/20 bg-white/10 backdrop-blur-xl',
					'hover:border-white/35 hover:bg-white/20',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
					MOTION
				)}
			>
				{#if ICONS[link.icon]}
					<svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 text-white/90">
						<path d={ICONS[link.icon]} />
					</svg>
				{/if}
			</a>
		{/each}
	</div>
{/if}
