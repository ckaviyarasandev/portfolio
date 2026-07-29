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
</script>

{#if image?.src}
	<!-- No flex-1/growing here: this is a fixed-size avatar-style image, not a
	     flexible column. Letting it grow used to fight the text column for width
	     once both sit in a row on mobile; sizing/shrink behavior is the parent
	     layout's job (see SplitLayout's `shrink-0`). -->
	<div class={cx('flex justify-center max-w-max', className)}>
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
						style:border-radius={radius}
						style:--ring-primary={primary}
						style:--ring-accent={accent}
						style:--ring-secondary={secondary}
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
					style:border-radius={radius}
					style:--ring-primary={primary}
					style:--ring-accent={accent}
					style:--ring-secondary={secondary}
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
	/* Registered so the browser can smoothly interpolate the angle between keyframes
	   instead of jumping straight from 0deg to 360deg. */
	@property --spin-angle {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	.spin-wrap {
		display: inline-flex;
		overflow: hidden;
	}

	.spin-ring {
		z-index: 0;
		/* Animate the gradient's own angle rather than rotating this box with a
		   transform. Rotating the box worked fine for a circle, but for square/rounded
		   shapes the box's straight corners swung past the frame edges each turn,
		   producing a visible "poking corner" glitch. Keeping the box static and
		   spinning only the color stops looks clean for every shape. */
		background: conic-gradient(
			from var(--spin-angle),
			var(--ring-primary),
			var(--ring-accent),
			var(--ring-secondary),
			var(--ring-primary)
		);
		animation: spin-ring 6s linear infinite;
	}

	.spin-wrap :global(img) {
		z-index: 1;
	}

	.spin-wrap > div:not(.spin-ring) {
		z-index: 1;
	}

	@keyframes spin-ring {
		to {
			--spin-angle: 360deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spin-ring {
			animation: none;
		}
	}
</style>
