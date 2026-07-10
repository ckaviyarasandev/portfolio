import { heroPageColors } from '../../themes/styles.js';
import { generateGradient } from '../../utils/gradientGenerator.js';

/**
 * Single source of truth for the page background gradient.
 * Any page/component can call setBackground(...) to update it;
 * pageController just reads `background.gradient` and renders it.
 * This replaces the onBackgroundChange prop that hero.svelte and
 * ExperiencePage.svelte previously had to each wire up separately.
 */
function createBackgroundState() {
	let gradient = $state(generateGradient(heroPageColors[0]));

	return {
		get gradient() {
			return gradient;
		},
		set(newGradient) {
			gradient = newGradient;
		},
		setFromPalette(palette) {
			gradient = generateGradient(palette);
		}
	};
}

export const background = createBackgroundState();
