<script>
	import { IMAGE_SHAPES, IMAGE_FRAMES, IMAGE_SIZES, cx, pick } from '../utils/style.js';

	/**
	 * Renders section.image. Every visual variant (shape/frame/size) is data
	 * driven so new combinations never require touching this file.
	 */
	let { image, class: className = '' } = $props();

	const shapeClass = $derived(pick(IMAGE_SHAPES, image?.shape, 'circle'));
	const frameClass = $derived(pick(IMAGE_FRAMES, image?.frame, 'bordered'));
	const sizeClass = $derived(pick(IMAGE_SIZES, image?.size, 'large'));
	const objectFit = $derived(image?.objectFit ?? 'cover');
	const isBackground = $derived(image?.frame === 'background');
</script>

{#if image?.src}
	<div class={cx('flex flex-1 justify-center', className)}>
		{#if isBackground}
			<div class="relative">
				<div
					class="absolute inset-0 scale-110 rounded-full bg-linear-to-br from-white/25 to-white/5 blur-3xl"
					aria-hidden="true"
				></div>
				<img
					src={image.src}
					alt={image.alt ?? ''}
					loading="lazy"
					decoding="async"
					class={cx('relative border border-white/15', sizeClass, shapeClass)}
					style:object-fit={objectFit}
				/>
			</div>
		{:else}
			<div class={cx(shapeClass, frameClass)}>
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
