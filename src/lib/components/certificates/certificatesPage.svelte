<script>
	import { certificates } from '../../../datas/certificates.js';
	import { ICONS } from '../../../datas/icon.js';
	import { heroPageColors } from '../../../themes/styles.js';
	import { toDriveDownloadUrl, toDriveEmbedUrl } from '../../../utils/driveLink.js';

	let { onNavigate } = $props();

	// One stable palette per tile, picked once so the gradient ring doesn't
	// reshuffle on unrelated re-renders (same approach connectPage uses).
	const tilePalettes = certificates.map(
		() => heroPageColors[Math.floor(Math.random() * heroPageColors.length)]
	);

	// Which tiles are expanded — a Set so any number can be open at once.
	// The PDF viewer only mounts for open tiles (see the {#if} below), so
	// closed certificates cost nothing extra even once this list grows.
	let openIds = $state(new Set());
	function toggle(id) {
		const next = new Set(openIds);
		next.has(id) ? next.delete(id) : next.add(id);
		openIds = next;
	}
</script>

<div class="relative z-10 min-h-dvh w-full px-4 pt-24 pb-20 text-white sm:px-6 lg:px-10">
	<div class="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
		<button
			type="button"
			class="cert-fade-in mb-6 self-start rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-xl transition-colors hover:border-white/40 hover:text-white"
			onclick={() => onNavigate?.('home')}
		>
			&larr; Back home
		</button>

		<p
			class="cert-fade-in mb-3 text-sm font-semibold tracking-[0.3em] text-white/60 uppercase"
			style:animation-delay="60ms"
		>
			Certificates
		</p>
		<h1
			class="cert-fade-in text-shadow-lg text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
			style:animation-delay="120ms"
		>
			Courses & Credentials
		</h1>
	</div>

	{#if certificates.length}
		<div class="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-4">
				{#each certificates as cert, i (cert.id)}
					{@const p = tilePalettes[i]}
					{@const isOpen = openIds.has(cert.id)}
					<div
						class="cert-tile cert-fade-in group relative isolate overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl transition-colors duration-300"
						class:cert-tile-open={isOpen}
						style:animation-delay="{280 + i * 90}ms"
						style:--c1={p.primary}
						style:--c2={p.accent}
						style:--c3={p.secondary}
					>
						<span class="cert-tile-ring pointer-events-none absolute inset-0 rounded-3xl" aria-hidden="true"
						></span>

						<button
							type="button"
							class="relative z-10 flex w-full items-start gap-4 p-6 text-left"
							onclick={() => toggle(cert.id)}
							aria-expanded={isOpen}
						>
							<span
								class="cert-icon-pulse relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10"
								style:--glow={p.accent}
							>
								<svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6 text-white">
									<path d={ICONS.certificate} />
								</svg>
							</span>

							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<h2 class="text-shadow-sm text-lg font-semibold text-white">{cert.title}</h2>
									{#if cert.category}
										<span
											class="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-white/70 uppercase"
										>
											{cert.category}
										</span>
									{/if}
								</div>
								{#if cert.company || cert.duration}
									<p class="mt-1 text-sm text-white/70">
										{cert.company}{cert.company && cert.duration ? ' · ' : ''}{cert.duration}
									</p>
								{/if}
								{#if cert.workTitle || cert.role}
									<p class="mt-0.5 text-xs text-white/50">
										{cert.workTitle}{cert.workTitle && cert.role ? ' · ' : ''}{cert.role}
									</p>
								{/if}
							</div>

							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="cert-chevron mt-1.5 h-5 w-5 shrink-0 text-white/60 transition-transform duration-300"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>

						{#if isOpen}
							<div class="cert-tile-body cert-body-in">
								<div class="flex flex-col gap-4 px-6 pb-6">
									{#if cert.description}
										<p class="border-l-2 border-white/20 pl-4 text-sm leading-7 text-white/70">
											{cert.description}
										</p>
									{/if}

									<div class="overflow-hidden rounded-2xl border border-white/15 bg-black/20">
										<iframe
											src={toDriveEmbedUrl(cert.href)}
											title={cert.title}
											class="h-[90vh] min-h-[600px] w-full"
											loading="lazy"
											allow="autoplay"
										></iframe>
									</div>

									<a
										href={toDriveDownloadUrl(cert.href)}
										download
										class="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-xl transition-all duration-200 hover:border-white/40 hover:bg-white/20 hover:text-white"
									>
										<svg viewBox="0 0 24 24" fill="currentColor" class="h-3.5 w-3.5">
											<path d={ICONS.download} />
										</svg>
										Download
									</a>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
	{:else}
		<p
			class="cert-fade-in mx-auto mt-14 max-w-3xl text-white/60"
			style:animation-delay="280ms"
		>
			No certificates added yet — check back soon.
		</p>
	{/if}
</div>

<style>
	.cert-fade-in {
		opacity: 0;
		animation: certFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes certFadeIn {
		from {
			opacity: 0;
			transform: translateX(48px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Animated gradient border: pan a linear gradient behind a masked frame
	   instead of rotating the tile, so rounded-rect corners never poke out
	   the way a transform-rotated conic-gradient would (see SlideMedia's
	   spin-ring for the circular version of this same problem). */
	.cert-tile-ring {
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
		animation: certBorderFlow 5s linear infinite;
	}

	.cert-tile:hover .cert-tile-ring,
	.cert-tile-open .cert-tile-ring {
		opacity: 1;
	}

	@keyframes certBorderFlow {
		to {
			background-position: 300% 0%;
		}
	}

	.cert-icon-pulse {
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--glow) 55%, transparent);
		animation: certIconPulse 2.6s ease-in-out infinite;
	}

	@keyframes certIconPulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--glow) 45%, transparent);
		}
		50% {
			box-shadow: 0 0 0 8px color-mix(in srgb, var(--glow) 0%, transparent);
		}
	}

	.cert-tile-open .cert-chevron {
		transform: rotate(180deg);
	}

	/* A plain {#if} (no transition: directive) mounts/unmounts this block
	   instantly and deterministically — no transition-lifecycle state to get
	   stuck in. The animation is purely decorative, playing once on mount. */
	.cert-body-in {
		animation: certBodyIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes certBodyIn {
		from {
			opacity: 0;
			transform: translateY(-12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cert-fade-in {
			animation: none;
			opacity: 1;
			transform: none;
		}
		.cert-tile-ring {
			animation: none;
		}
		.cert-body-in {
			animation: none;
		}
		.cert-icon-pulse {
			animation: none;
		}
	}
</style>
