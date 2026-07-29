<script>
	import { IMAGE_SHAPES, IMAGE_FRAMES, IMAGE_SIZES, cx, pick } from '../utils/style.js';
	import { heroPageColors } from '../../../../../themes/styles';

	let { image, class: className = '' } = $props();

	const shapeClass = $derived(pick(IMAGE_SHAPES, image?.shape, 'circle'));
	const frameClass = $derived(pick(IMAGE_FRAMES, image?.frame, 'bordered'));
	const sizeClass = $derived(pick(IMAGE_SIZES, image?.size, 'large'));
	const objectFit = $derived(image?.objectFit ?? 'cover');
	const isBackground = $derived(image?.frame === 'background');

	function pickRandomPalette() {
		if (!heroPageColors?.length) return null;
		const randomIndex = Math.floor(Math.random() * heroPageColors.length);
		return heroPageColors[randomIndex];
	}

	const palette = pickRandomPalette();
	const borderColor = palette?.accent ?? palette?.primary ?? 'rgba(255,255,255,0.15)';
	const glowColor = palette?.primary ?? palette?.accent ?? 'rgba(255,255,255,0.25)';
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
				<img
					src={image.src}
					alt={image.alt ?? ''}
					loading="lazy"
					decoding="async"
					class={cx('relative border-2', sizeClass, shapeClass)}
					style:object-fit={objectFit}
					style:border-color={borderColor}
					style:box-shadow={`0 8px 30px -6px ${glowColor}80, 0 0 0 4px ${glowColor}1a`}
				/>
			</div>
		{:else}
			<div
				class={cx(shapeClass, frameClass, 'border-2')}
				style:border-color={borderColor}
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
		{/if}
	</div>
{/if}