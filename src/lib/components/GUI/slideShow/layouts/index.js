import SplitLayout from './SplitLayout.svelte';
import CenteredLayout from './CenteredLayout.svelte';
import StackedLayout from './StackedLayout.svelte';

// Add a new layout by dropping the file in this folder and registering it
// here — nothing else in the codebase needs to know it exists.
export const LAYOUTS = {
	split: SplitLayout,
	centered: CenteredLayout,
	stacked: StackedLayout
};

export const DEFAULT_LAYOUT = 'split';
