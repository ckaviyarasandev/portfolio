export const MOTION = 'motion-safe:transition-all motion-safe:duration-300';

export const IMAGE_SHAPES = {
	circle: 'rounded-full',
	rounded: 'rounded-[2.5rem]',
	square: 'rounded-none'
};

export const IMAGE_FRAMES = {
	plain: 'border-0 bg-transparent',
	bordered: 'border-l border-t-0 border-r-2 border-b-4 border-white/25 bg-white/10 backdrop-blur-xl shadow-xl shadow-black/30',
	elevated:
		'border-l border-t-0 border-r-2 border-b-4  border-white/15 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/40',
	background: 'border-0 bg-transparent'
};

// Mobile shows the image centered on its own row above the text (see SplitLayout.svelte),
// so it doesn't need to share horizontal space with anything — sized a bit smaller than
// desktop just so it doesn't dominate a small screen. md:/lg: sizes are unchanged.
export const IMAGE_SIZES = {
	small: 'h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56',
	medium: 'h-36 w-36 sm:h-44 sm:w-44 md:h-72 md:w-72',
	large: 'h-40 w-40 sm:h-48 sm:w-48 md:h-80 md:w-80'
};

export const BUTTON_VARIANTS = {
	primary:
		'border border-white/40 bg-white/25 text-white backdrop-blur-xl shadow-lg shadow-black/20 hover:bg-white/35 hover:border-white/50',
	secondary:
		'border border-white/20 bg-white/10 text-white/90 backdrop-blur-xl hover:bg-white/15 hover:border-white/30',
	ghost:
		'border border-transparent text-white/80 backdrop-blur-xl hover:border-white/15 hover:bg-white/10 hover:text-white'
};

export const TEXT_SHADOWS = {
	sm: 'text-shadow-sm',
	md: 'text-shadow',
	lg: 'text-shadow-lg'
};

/** Join truthy class fragments, dropping falsy ones. */
export function cx(...parts) {
	return parts.filter(Boolean).join(' ');
}

/** Look up a variant in a map, falling back to a default key, then undefined. */
export function pick(map, key, fallbackKey) {
	return map[key] ?? map[fallbackKey] ?? undefined;
}
