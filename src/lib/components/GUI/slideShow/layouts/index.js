import SplitLayout from './SplitLayout.svelte';
import CenteredLayout from './CenteredLayout.svelte';
import StackedLayout from './StackedLayout.svelte';

export const LAYOUTS = {
	split: SplitLayout,
	centered: CenteredLayout,
	stacked: StackedLayout
};

export const DEFAULT_LAYOUT = 'split';
