<script>
	// A soft glitter-sparkle trail that follows the pointer, colored from whatever
	// palette is currently driving the page/slide background (see
	// lib/state/activePalette.svelte.js) — same radial-gradient "pop and fade" look as
	// the glitter burst in pageController.svelte, just spawned along the cursor path.
	import { onMount } from 'svelte';
	import { activePalette } from '../state/activePalette.svelte.js';

	const SPAWN_INTERVAL_MS = 35;
	const PARTICLE_LIFETIME_MS = 650;
	const JITTER_PX = 16; // scatter radius around the pointer per burst

	const RIPPLE_DURATION_MS = 550;
	const SPLASH_DURATION_MS = 220;

	let particles = $state([]);
	let clickRings = $state([]);
	let clickSplashes = $state([]);
	let enabled = $state(false);

	let particleId = 0;
	let lastSpawn = 0;

	// One tiny glitter per palette color (primary, secondary, accent) so every burst
	// represents the whole theme rather than a single random pick — each gets its own
	// small random jitter/size/drift so the trio doesn't look identical or scripted.
	function spawnBurst(x, y) {
		const { primary, secondary, accent } = activePalette;
		const colors = [primary, secondary, accent].filter(Boolean);

		for (const color of colors) {
			const id = particleId++;
			const size = 3 + Math.random() * 5; // 3-8px — small
			const offsetX = (Math.random() - 0.5) * JITTER_PX * 2;
			const offsetY = (Math.random() - 0.5) * JITTER_PX * 2;
			const drift = (Math.random() - 0.5) * 34;

			particles = [...particles, { id, x: x + offsetX, y: y + offsetY, size, drift, color }];

			setTimeout(() => {
				particles = particles.filter((p) => p.id !== id);
			}, PARTICLE_LIFETIME_MS);
		}
	}

	function handlePointerMove(e) {
		const now = performance.now();
		if (now - lastSpawn < SPAWN_INTERVAL_MS) return;
		lastSpawn = now;
		spawnBurst(e.clientX, e.clientY);
	}

	// A simple water-drop effect on click: one small bright "impact" flash at the
	// point of contact, plus a single ring that spreads out and fades — tinted with
	// the palette's accent color.
	function spawnClickBurst(x, y) {
		const color = activePalette.accent ?? activePalette.primary;
		if (!color) return;

		const splashId = particleId++;
		clickSplashes = [...clickSplashes, { id: splashId, x, y, color }];
		setTimeout(() => {
			clickSplashes = clickSplashes.filter((s) => s.id !== splashId);
		}, SPLASH_DURATION_MS);

		const ringId = particleId++;
		clickRings = [...clickRings, { id: ringId, x, y, color }];
		setTimeout(() => {
			clickRings = clickRings.filter((r) => r.id !== ringId);
		}, RIPPLE_DURATION_MS);
	}

	function handleClick(e) {
		spawnClickBurst(e.clientX, e.clientY);
	}

	onMount(() => {
		const finePointer = window.matchMedia('(pointer: fine)').matches;
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// Only trail behind an actual mouse/trackpad — touch input has no hover cursor,
		// and reduced-motion users don't want sparkles chasing every move.
		enabled = finePointer && !reducedMotion;
		if (!enabled) return;

		window.addEventListener('pointermove', handlePointerMove, { passive: true });
		window.addEventListener('click', handleClick, { passive: true });
		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('click', handleClick);
		};
	});
</script>

{#if enabled}
	<div class="cursor-trail-layer" aria-hidden="true">
		{#each particles as p (p.id)}
			<span
				class="trail-glitter"
				style:left="{p.x}px"
				style:top="{p.y}px"
				style:--size="{p.size}px"
				style:--drift="{p.drift}px"
				style:--color={p.color}
			></span>
		{/each}

		{#each clickSplashes as s (s.id)}
			<span class="click-splash" style:left="{s.x}px" style:top="{s.y}px" style:--color={s.color}
			></span>
		{/each}

		{#each clickRings as r (r.id)}
			<span class="water-ripple" style:left="{r.x}px" style:top="{r.y}px" style:--color={r.color}
			></span>
		{/each}
	</div>
{/if}

<style>
	.cursor-trail-layer {
		position: fixed;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 9999;
	}

	.trail-glitter {
		position: absolute;
		width: var(--size);
		height: var(--size);
		margin: calc(var(--size) / -2) 0 0 calc(var(--size) / -2);
		border-radius: 9999px;
		background: radial-gradient(circle, var(--color) 0%, transparent 70%);
		filter: drop-shadow(0 0 4px var(--color));
		animation: trailGlitterPop 650ms ease-out forwards;
	}

	@keyframes trailGlitterPop {
		0% {
			opacity: 0;
			transform: scale(0.4);
		}
		30% {
			opacity: 1;
			transform: scale(1.1);
		}
		100% {
			opacity: 0;
			transform: translate(var(--drift), 22px) scale(1.4);
		}
	}

	/* Small bright flash right at the point of contact — like light catching the
	   moment a drop hits the surface, just before the ripple spreads. */
	.click-splash {
		position: absolute;
		width: 10px;
		height: 10px;
		margin: -5px 0 0 -5px;
		border-radius: 9999px;
		background: radial-gradient(circle, #ffffff 0%, var(--color) 45%, transparent 75%);
		opacity: 0;
		animation: clickSplashFlash 220ms ease-out forwards;
	}

	@keyframes clickSplashFlash {
		0% {
			opacity: 0;
			transform: scale(0.2);
		}
		35% {
			opacity: 0.95;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(1.4);
		}
	}

	/* One small ring that spreads out and fades, like a single ripple moving across
	   water after a drop lands — the slight vertical squash sells the "looking down
	   at a pond" feel instead of a flat circular pulse. */
	.water-ripple {
		position: absolute;
		width: 10px;
		height: 10px;
		margin: -5px 0 0 -5px;
		border-radius: 9999px;
		border: 1.5px solid var(--color);
		box-shadow:
			inset 0 0 4px rgba(255, 255, 255, 0.35),
			0 0 6px var(--color);
		opacity: 0;
		animation: waterRippleSpread 550ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
	}

	@keyframes waterRippleSpread {
		0% {
			opacity: 0;
			transform: scale(0.3) scaleY(0.85);
			border-width: 2px;
		}
		15% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
			transform: scale(4) scaleY(0.85);
			border-width: 0.5px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.click-splash,
		.water-ripple {
			animation: none;
			opacity: 0;
		}
	}
</style>
