<script>
	import { IMAGE_SHAPES, IMAGE_FRAMES, IMAGE_SIZES, cx, pick } from '../utils/style.js';
	import { heroPageColors } from '../../../../../themes/styles';

	let { image, palette, class: className = '' } = $props();

	const shapeClass = $derived(pick(IMAGE_SHAPES, image?.shape, 'circle'));
	const frameClass = $derived(pick(IMAGE_FRAMES, image?.frame, 'bordered'));
	const sizeClass = $derived(pick(IMAGE_SIZES, image?.size, 'large'));
	const objectFit = $derived(image?.objectFit ?? 'cover');
	const isBackground = $derived(image?.frame === 'background');

	const FALLBACK_SRC = '/images/image_not_found.png';

	// Only render anything if the slide actually declared image data. A section
	// with no `image` field at all should show nothing — the fallback graphic is
	// reserved for when image data exists but the source fails to load (see
	// handleImgError), not for sections that never had an image to begin with.
	const hasImageData = $derived(!!image);

	// `image.src` may be a single string (existing content) or an array of up to
	// two strings/objects: [base, hoverReveal]. More than two is unsupported for
	// now, so extras are dropped rather than designing a carousel we don't need yet.
	const sources = $derived.by(() => {
		if (!image) return [];
		const raw = Array.isArray(image.src) ? image.src : image.src ? [image.src] : [];
		const entries = raw
			.map((item) => (typeof item === 'string' ? { src: item } : item))
			.filter((item) => item?.src)
			.slice(0, 2);

		return entries.length ? entries : [{ src: FALLBACK_SRC, alt: image?.alt ?? 'Image not found' }];
	});

	const primarySrc = $derived(sources[0]?.src);
	const primaryAlt = $derived(sources[0]?.alt ?? image?.alt ?? '');
	const secondarySrc = $derived(sources[1]?.src ?? null);
	const secondaryAlt = $derived(sources[1]?.alt ?? image?.alt ?? '');
	const hasHoverSwap = $derived(sources.length === 2);

	// Swap a broken/unavailable image source to the fallback graphic at runtime,
	// guarding against a loop if the fallback itself 404s.
	function handleImgError(event) {
		const img = event.currentTarget;
		if (img.src.endsWith(FALLBACK_SRC)) return;
		img.src = FALLBACK_SRC;
	}

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

<!-- No flex-1/growing here: this is a fixed-size avatar-style image, not a
     flexible column. Letting it grow used to fight the text column for width
     once both sit in a row on mobile; sizing/shrink behavior is the parent
     layout's job (see SplitLayout's `shrink-0`). -->
{#if hasImageData}
	<div class={cx('flex justify-center max-w-max', className)}>
		{#if isBackground}
			<div class="relative">
				<div
					class="absolute inset-0 scale-110 rounded-full blur-3xl"
					style:background={`linear-gradient(to bottom right, ${glowColor}55, ${glowColor}10)`}
					aria-hidden="true"
				></div>
				<div class="spin-wrap media-hover-target relative p-[3px]" style:border-radius={radius}>
					<div
						class="spin-ring absolute inset-0"
						style:border-radius={radius}
						style:--ring-primary={primary}
						style:--ring-accent={accent}
						style:--ring-secondary={secondary}
						aria-hidden="true"
					></div>
					<img
						src={primarySrc}
						alt={primaryAlt}
						loading="lazy"
						decoding="async"
						onerror={handleImgError}
						class={cx(
							'media-primary relative block',
							hasHoverSwap ? 'media-primary-swap' : 'media-primary-solo',
							sizeClass,
							shapeClass
						)}
						style:object-fit={objectFit}
						style:box-shadow={`0 8px 30px -6px ${glowColor}80, 0 0 0 4px ${glowColor}1a`}
					/>
					{#if hasHoverSwap}
						<img
							src={secondarySrc}
							alt={secondaryAlt}
							loading="lazy"
							decoding="async"
							onerror={handleImgError}
							class={cx('media-secondary relative block', sizeClass, shapeClass)}
							style:object-fit={objectFit}
							style:box-shadow={`0 8px 30px -6px ${glowColor}80, 0 0 0 4px ${glowColor}1a`}
						/>
					{/if}
				</div>
			</div>
		{:else}
			<div class="spin-wrap media-hover-target relative p-[3px]" style:border-radius={radius}>
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
						src={primarySrc}
						alt={primaryAlt}
						loading="lazy"
						decoding="async"
						onerror={handleImgError}
						class={cx(
							'media-primary block',
							hasHoverSwap ? 'media-primary-swap' : 'media-primary-solo',
							sizeClass,
							shapeClass
						)}
						style:object-fit={objectFit}
					/>
					{#if hasHoverSwap}
						<img
							src={secondarySrc}
							alt={secondaryAlt}
							loading="lazy"
							decoding="async"
							onerror={handleImgError}
							class={cx('media-secondary block', sizeClass, shapeClass)}
							style:object-fit={objectFit}
						/>
					{/if}
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

	/* Single-image case: the image itself pops on hover. */
	.media-hover-target :global(.media-primary-solo) {
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.media-hover-target:hover :global(.media-primary-solo) {
		transform: scale(1.1);
	}

	/* Two-image case: the base image fully hides on hover (not just covered)
	   while the second image pops into view in its place. */
	.media-hover-target :global(.media-primary-swap) {
		transition: opacity 0.35s ease;
	}

	.media-hover-target:hover :global(.media-primary-swap) {
		opacity: 0;
	}

	.media-hover-target :global(.media-secondary) {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0;
		transform: scale(0.85);
		pointer-events: none;
		transition:
			opacity 0.35s ease,
			transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.media-hover-target:hover :global(.media-secondary) {
		opacity: 1;
		transform: scale(1.1);
	}

	@media (prefers-reduced-motion: reduce) {
		.spin-ring {
			animation: none;
		}

		.media-hover-target :global(.media-primary-solo),
		.media-hover-target :global(.media-primary-swap),
		.media-hover-target :global(.media-secondary) {
			transition: none;
		}
	}
</style>
