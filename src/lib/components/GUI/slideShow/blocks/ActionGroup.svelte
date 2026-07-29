<script>
	import { ICONS } from '../../../../../datas/icon';
	import { randemBackground } from '../../../../../utils/gradientGenerator';
	import { BUTTON_VARIANTS, MOTION, cx, pick } from '../utils/style.js';

	let { buttons = [], links = [], align = 'left' } = $props();

	const justifyClass = align === 'center' ? 'justify-center' : 'justify-center md:justify-start';

	// Compute each gradient ONCE per button/link, not on every re-render,
	// so colors don't shift unexpectedly on unrelated state updates.
	const buttonGradients = buttons.map(() => randemBackground() ?? 'none');
	const linkGradients = links.map(() => randemBackground() ?? 'none');

	function handleButtonClick(button, event) {
		if (button.type !== 'scroll') return;
		event.preventDefault();
		document.querySelector(button.target)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

{#if buttons?.length}
	<div class="mt-10 flex flex-wrap items-center gap-4 {justifyClass}">
		{#each buttons as button, i}
			<a
				href={button.href ?? button.target ?? '#'}
				download={button.type === 'download' ? '' : undefined}
				onclick={(e) => handleButtonClick(button, e)}
				class={cx(
					'group relative isolate max-w-full overflow-hidden break-words rounded-full px-7 py-3.5',
					'text-shadow-sm text-sm font-semibold tracking-wide text-white sm:text-base',
					'border border-white/20 shadow-lg shadow-black/20 backdrop-blur-xl',
					'transition-all duration-300 ease-out',
					'motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-xl motion-safe:hover:shadow-black/30',
					'motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
					MOTION,
					pick(BUTTON_VARIANTS, button.variant, 'primary')
				)}
				style:background-image={buttonGradients[i]}
			>
				<!-- glossy top highlight -->
				<span
					class="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent"
				></span>
				<!-- subtle inner ring for depth -->
				<span
					class="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 ring-inset"
				></span>
				<!-- sheen sweep on hover -->
				<span
					class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
				></span>

				<span class="relative z-10">{button.label}</span>
			</a>
		{/each}
	</div>
{/if}

{#if links?.length}
	<div class="mt-8 flex gap-3 {justifyClass}">
		{#each links as link, i}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={link.label}
				class={cx(
					'group relative isolate flex h-12 w-12 items-center justify-center overflow-hidden rounded-full',
					'border border-white/20 shadow-lg shadow-black/20 backdrop-blur-xl',
					'transition-all duration-300 ease-out',
					'motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 motion-safe:hover:shadow-xl motion-safe:hover:shadow-black/30',
					'motion-safe:active:translate-y-0 motion-safe:active:scale-95',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40',
					MOTION
				)}
				style:background-image={linkGradients[i]}
			>
				<span
					class="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent"
				></span>
				<span
					class="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10 ring-inset"
				></span>

				{#if ICONS[link.icon]}
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
						class="relative z-10 h-5 w-5 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
					>
						<path d={ICONS[link.icon]} />
					</svg>
				{/if}
			</a>
		{/each}
	</div>
{/if}