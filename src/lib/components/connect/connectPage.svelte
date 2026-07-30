<script>
	import { getInTouchChannels, getInTouchLocation } from '../../../datas/getInTouch.js';
	import { ICONS } from '../../../datas/icon.js';
	import { heroPageColors } from '../../../themes/styles.js';

	let { onNavigate } = $props();

	const isExternalHref = (href) => href?.startsWith('http');

	// One stable palette per card, picked once so the gradient ring doesn't
	// reshuffle on unrelated re-renders (same approach ActionGroup uses for its
	// button gradients).
	const cardPalettes = getInTouchChannels.map(
		() => heroPageColors[Math.floor(Math.random() * heroPageColors.length)]
	);

	const cardClasses =
		'connect-card connect-fade-in group relative isolate flex flex-col items-start gap-4 overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 text-left backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.02] motion-safe:hover:border-white/30 motion-safe:hover:shadow-2xl motion-safe:hover:shadow-black/40';

	// tel:/mailto: links do nothing if the device has no dialer/mail app
	// registered for that protocol — copyValue gives those cards a fallback
	// that always works, with a quick "Copied!" pulse for feedback.
	let copiedId = $state(null);
	let copyResetTimer;

	async function copyText(text) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Clipboard API can refuse (unfocused document, insecure context, older
			// browsers) even on a real click — fall back to the legacy textarea trick.
			try {
				const ta = document.createElement('textarea');
				ta.value = text;
				ta.style.position = 'fixed';
				ta.style.opacity = '0';
				document.body.appendChild(ta);
				ta.select();
				const ok = document.execCommand('copy');
				document.body.removeChild(ta);
				return ok;
			} catch {
				return false;
			}
		}
	}

	async function handleCopy(channel) {
		const ok = await copyText(channel.copyValue);
		if (!ok) return;
		copiedId = channel.id;
		clearTimeout(copyResetTimer);
		copyResetTimer = setTimeout(() => (copiedId = null), 1600);
	}
</script>

{#snippet cardInner(channel, p)}
	<span class="connect-card-ring pointer-events-none absolute inset-0 rounded-3xl" aria-hidden="true"
	></span>
	<span
		class="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
		style:background={`radial-gradient(circle at 30% 20%, ${p.accent}33, transparent 60%)`}
		aria-hidden="true"
	></span>

	<span
		class="connect-icon-pulse pointer-events-none relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
		style:--glow={p.accent}
	>
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			class="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
		>
			<path d={ICONS[channel.icon]} />
		</svg>
	</span>

	<div class="pointer-events-none flex-1">
		<h2 class="text-shadow-sm text-lg font-semibold text-white">{channel.label}</h2>
		<p class="mt-1 text-sm text-white/60">{channel.description}</p>
		<p class="mt-3 text-sm font-medium break-words text-white/80">{channel.value}</p>
	</div>

	<span
		class="pointer-events-none relative z-10 mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90"
	>
		{channel.action}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
		>
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	</span>
{/snippet}

<div class="relative z-10 min-h-dvh w-full px-4 pt-24 pb-20 text-white sm:px-6 lg:px-10">
	<div class="mx-auto flex max-w-5xl flex-col items-center text-center">
		<button
			type="button"
			class="connect-fade-in mb-6 self-start rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-xl transition-colors hover:border-white/40 hover:text-white"
			onclick={() => onNavigate?.('home')}
		>
			&larr; Back home
		</button>

		<p
			class="connect-fade-in mb-3 text-sm font-semibold tracking-[0.3em] text-white/60 uppercase"
			style:animation-delay="60ms"
		>
			Get in Touch
		</p>
		<h1
			class="connect-fade-in text-shadow-lg text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
			style:animation-delay="120ms"
		>
			Let's build something together
		</h1>
		<p
			class="connect-fade-in mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
			style:animation-delay="200ms"
		>
			Pick whatever's easiest — every option below opens pre-filled and ready to go, but you're
			free to edit anything before you actually send it.
		</p>

		<div class="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each getInTouchChannels as channel, i (channel.id)}
				{@const p = cardPalettes[i]}
				{#if channel.copyValue}
					<!-- tel:/mailto: card: the anchor covers the whole card as the primary
					     click target, plus a copy button layered on top as a fallback for
					     devices with no registered dialer/mail app. -->
					<div
						class={cardClasses}
						style:animation-delay="{280 + i * 90}ms"
						style:--c1={p.primary}
						style:--c2={p.accent}
						style:--c3={p.secondary}
					>
						<a
							href={channel.href}
							class="absolute inset-0 z-0 rounded-3xl"
							aria-label="{channel.label}: {channel.value}"
						></a>
						{@render cardInner(channel, p)}
						<button
							type="button"
							class="absolute top-4 right-4 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80 backdrop-blur-xl transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white"
							onclick={() => handleCopy(channel)}
						>
							{#key copiedId === channel.id}
								<span class="copy-btn-pop inline-flex items-center gap-1">
									{#if copiedId === channel.id}
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
											<path d="M20 6 9 17l-5-5" />
										</svg>
										Copied!
									{:else}
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3">
											<rect x="9" y="9" width="11" height="11" rx="2" />
											<path d="M5 15V5a2 2 0 0 1 2-2h10" />
										</svg>
										Copy
									{/if}
								</span>
							{/key}
						</button>
					</div>
				{:else}
					<a
						href={channel.href}
						target={isExternalHref(channel.href) ? '_blank' : undefined}
						rel={isExternalHref(channel.href) ? 'noopener noreferrer' : undefined}
						class={cardClasses}
						style:animation-delay="{280 + i * 90}ms"
						style:--c1={p.primary}
						style:--c2={p.accent}
						style:--c3={p.secondary}
					>
						{@render cardInner(channel, p)}
					</a>
				{/if}
			{/each}
		</div>

		<a
			href={getInTouchLocation.mapsHref}
			target="_blank"
			rel="noopener noreferrer"
			class="connect-card connect-fade-in group relative mt-5 block w-full overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:border-white/30 motion-safe:hover:shadow-2xl motion-safe:hover:shadow-black/40"
			style:animation-delay="{280 + getInTouchChannels.length * 90}ms"
		>
			<div class="flex flex-col items-start justify-between gap-3 p-6 sm:flex-row sm:items-center">
				<div class="flex items-center gap-3">
					<span
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
					>
						<svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6 text-white">
							<path d={ICONS.location} />
						</svg>
					</span>
					<div>
						<h2 class="text-shadow-sm text-lg font-semibold text-white">Based in</h2>
						<p class="text-sm text-white/60">{getInTouchLocation.label}</p>
					</div>
				</div>
				<span class="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
					Open in Maps
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
					>
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</span>
			</div>
			<div class="relative h-56 w-full overflow-hidden sm:h-72">
				<iframe
					src={getInTouchLocation.embedSrc}
					title="Map showing {getInTouchLocation.label}"
					class="pointer-events-none h-full w-full grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
				></div>
			</div>
		</a>

		<p
			class="connect-fade-in mt-8 max-w-xl text-xs text-white/50"
			style:animation-delay="{280 + (getInTouchChannels.length + 1) * 90}ms"
		>
			Everything above opens in your own phone, WhatsApp or mail app with a draft already
			started — nothing sends automatically, and you can edit every word first.
		</p>
	</div>
</div>

<style>
	.connect-fade-in {
		opacity: 0;
		animation: connectFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes connectFadeIn {
		from {
			opacity: 0;
			transform: translateX(48px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Animated gradient border: pan a conic/linear gradient behind a masked frame
	   instead of rotating the card itself, so rounded-rect corners never poke out
	   the way a transform-rotated conic-gradient would (see SlideMedia's spin-ring
	   for the circular version of this same problem). */
	.connect-card-ring {
		padding: 1.5px;
		background: linear-gradient(115deg, var(--c1), var(--c2), var(--c3), var(--c1));
		background-size: 300% 300%;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		transition: opacity 0.4s ease;
		animation: connectBorderFlow 5s linear infinite;
	}

	.connect-card:hover .connect-card-ring,
	.connect-card:focus-visible .connect-card-ring {
		opacity: 1;
	}

	@keyframes connectBorderFlow {
		to {
			background-position: 300% 0%;
		}
	}

	.connect-icon-pulse {
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--glow) 55%, transparent);
		animation: connectIconPulse 2.6s ease-in-out infinite;
	}

	@keyframes connectIconPulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--glow) 45%, transparent);
		}
		50% {
			box-shadow: 0 0 0 8px color-mix(in srgb, var(--glow) 0%, transparent);
		}
	}

	.copy-btn-pop {
		animation: connectCopyPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes connectCopyPop {
		0% {
			transform: scale(0.85);
		}
		60% {
			transform: scale(1.08);
		}
		100% {
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.connect-fade-in {
			animation: none;
			opacity: 1;
			transform: none;
		}
		.connect-card-ring {
			animation: none;
		}
		.connect-icon-pulse {
			animation: none;
		}
		.copy-btn-pop {
			animation: none;
		}
	}
</style>
