<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import { onMount } from 'svelte';
	import { pageTitles } from '../datas/content';
	import { aboutMe } from '../datas/info';

	const infoTitle = `${aboutMe.name} | ${aboutMe.designation}`;
	const titles = [infoTitle, ...pageTitles];
	let { children } = $props();
	let currentTitle = $state(infoTitle);

	onMount(() => {
		let previousIndex = 0;

		const interval = setInterval(() => {
			let randomIndex;

			do {
				randomIndex = Math.floor(Math.random() * titles.length);
			} while (randomIndex === previousIndex && titles.length > 1);

			previousIndex = randomIndex;
			currentTitle = titles[randomIndex];
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{currentTitle}</title>
</svelte:head>

{@render children()}
