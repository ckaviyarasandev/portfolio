// Central style tokens. Every block/layout pulls its variant classes from
// here so visual language stays consistent and new variants only need to be
// added in one place.

export const MOTION = 'motion-safe:transition-all motion-safe:duration-300';

export const IMAGE_SHAPES = {
	circle: 'rounded-full',
	rounded: 'rounded-[2.5rem]',
	square: 'rounded-none'
};

export const IMAGE_FRAMES = {
	plain: 'border-0 bg-transparent',
	bordered: 'border border-white/25 bg-white/10 backdrop-blur-xl shadow-xl shadow-black/30',
	elevated:
		'border border-white/15 bg-white/[0.07] backdrop-blur-xl shadow-2xl shadow-black/40',
	background: 'border-0 bg-transparent'
};

export const IMAGE_SIZES = {
	small: 'h-48 w-48 md:h-56 md:w-56',
	medium: 'h-64 w-64 md:h-72 md:w-72',
	large: 'h-64 w-64 md:h-80 md:w-80'
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
