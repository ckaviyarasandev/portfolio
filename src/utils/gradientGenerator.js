const RADIAL_ORIGINS = [
	'circle at center',
	'circle at top left',
	'circle at top right',
	'circle at bottom left',
	'circle at bottom right',
	'circle at top',
	'circle at bottom'
];

function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function randomStops(count) {
	const middle = Array.from({ length: count - 2 }, () => Math.round(Math.random() * 60) + 20).sort(
		(a, b) => a - b
	);
	return [0, ...middle, 100];
}

export function generateGradient(palette) {
	const colors = shuffle([palette.primary, palette.secondary, palette.accent]);
	const stops = randomStops(colors.length);
	const colorStops = colors.map((c, i) => `${c} ${stops[i]}%`).join(', ');

	const type = Math.random() > 0.5 ? 'linear' : 'radial';

	if (type === 'linear') {
		const angle = Math.floor(Math.random() * 360);
		return `linear-gradient(${angle}deg, ${colorStops})`;
	}

	const origin = RADIAL_ORIGINS[Math.floor(Math.random() * RADIAL_ORIGINS.length)];
	return `radial-gradient(${origin}, ${colorStops})`;
}

export function getNextPalette(palettes, currentName) {
	const options = palettes.filter((p) => p.colorName !== currentName);
	return options[Math.floor(Math.random() * options.length)];
}
