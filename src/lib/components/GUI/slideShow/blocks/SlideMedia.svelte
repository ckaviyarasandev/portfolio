<script>
	import { IMAGE_SHAPES, IMAGE_FRAMES, IMAGE_SIZES, cx, pick } from '../utils/style.js';
	import { heroPageColors } from '../../../../../themes/styles';

	let { image, palette, class: className = '' } = $props();

	const shapeClass = $derived(pick(IMAGE_SHAPES, image?.shape, 'circle'));
	const frameClass = $derived(pick(IMAGE_FRAMES, image?.frame, 'bordered'));
	const sizeClass = $derived(pick(IMAGE_SIZES, image?.size, 'large'));
	const objectFit = $derived(image?.objectFit ?? 'cover');
	const isBackground = $derived(image?.frame === 'background');

	const RADII = { circle: '9999px', rounded: '2.5rem', square: '0px' };
	const radius = $derived(pick(RADII, image?.shape, 'circle'));

	function pickRandomPalette() {
		if (!heroPageColors?.length) return null;
		const randomIndex = Math.floor(Math.random() * heroPageColors.length);
		return heroPageColors[randomIndex];
	}

	// Prefer the active slide palette passed down from hero.svelte; fall back to a
	// random palette so this component still works if no palette is supplied.
	const activePalette = $derived(palette ?? pickRandomPalette());
	const primary = $derived(activePalette?.primary ?? '#3B82F6');
	const secondary = $derived(activePalette?.secondary ?? '#172554');
	const accent = $derived(activePalette?.accent ?? primary);
	const glowColor = $derived(accent);

	// Rotating conic-gradient border sourced from the palette, used for the spin ring.
	const spinGradient = $derived(
		`conic-gradient(from 0deg, ${primary}, ${accent}, ${secondary}, ${primary})`
	);
</script>

{#if image?.src}
	<div class={cx('flex flex-1 justify-center max-w-max', className)}>
		{#if isBackground}
			<div class="relative">
				<div
					class="absolute inset-0 scale-110 rounded-full blur-3xl"
					style:background={`linear-gradient(to bottom right, ${glowColor}55, ${glowColor}10)`}
					aria-hidden="true"
				></div>
				<div class="spin-wrap relative p-[3px]" style:border-radius={radius}>
					<div
						class="spin-ring absolute inset-0"
						style:background={spinGradient}
						style:border-radius={radius}
						aria-hidden="true"
					></div>
					<img
						src={image.src}
						alt={image.alt ?? ''}
						loading="lazy"
						decoding="async"
						class={cx('relative block', sizeClass, shapeClass)}
						style:object-fit={objectFit}
						style:box-shadow={`0 8px 30px -6px ${glowColor}80, 0 0 0 4px ${glowColor}1a`}
					/>
				</div>
			</div>
		{:else}
			<div class="spin-wrap relative p-[3px]" style:border-radius={radius}>
				<div
					class="spin-ring absolute inset-0"
					style:background={spinGradient}
					style:border-radius={radius}
					aria-hidden="true"
				></div>
				<div
					class={cx('relative', shapeClass, frameClass)}
					style:border-radius={radius}
					style:box-shadow={`0 10px 25px -5px ${glowColor}70, 0 0 20px ${glowColor}30`}
				>
					<img
						src={image.src}
						alt={image.alt ?? ''}
						loading="lazy"
						decoding="async"
						class={cx('block', sizeClass, shapeClass)}
						style:object-fit={objectFit}
					/>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	.spin-wrap {
		display: inline-flex;
	}

	.spin-ring {
		z-index: 0;
		animation: spin-ring 6s linear infinite;
		will-change: transform;
	}

	.spin-wrap :global(img) {
		z-index: 1;
	}

	.spin-wrap > div:not(.spin-ring) {
		z-index: 1;
	}

	@keyframes spin-ring {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spin-ring {
			animation: none;
		}
	}
</style>
