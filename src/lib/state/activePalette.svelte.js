// Shared reactive palette so decorative effects elsewhere in the app (currently the
// cursor trail) can match whatever palette is actually driving the visible background,
// without threading a prop through every layer between hero.svelte/pageController.svelte
// and wherever the effect is mounted.
export const activePalette = $state({
	primary: '#3B82F6',
	secondary: '#172554',
	accent: '#60A5FA'
});

export function setActivePalette(palette) {
	if (!palette) return;
	if (palette.primary) activePalette.primary = palette.primary;
	if (palette.secondary) activePalette.secondary = palette.secondary;
	if (palette.accent) activePalette.accent = palette.accent;
}
