<script>
	import { navbarLinks } from '../../datas/content';
	import { aboutMe } from '../../datas/info';

	let { selectedPage, onNavigate } = $props();

	let isHome = $derived(selectedPage === navbarLinks.home.page);
</script>

<header class="fixed inset-x-0 top-4 z-50 px-4">
	<nav
		class="mx-auto flex max-w-5xl items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-md transition-all duration-500 {isHome
			? 'border-white/10 bg-white/[0.04] shadow-none'
			: 'border-zinc-200/80 bg-white/90 shadow-lg shadow-zinc-900/5'}"
	>
		<button
			type="button"
			onclick={() => onNavigate(navbarLinks.home.page)}
			class="group flex select-none items-baseline gap-2"
		>
			<h1
				class="text-sm font-semibold tracking-tight transition-colors duration-300 {isHome
					? 'text-white group-hover:text-white/80'
					: 'text-zinc-900 group-hover:text-zinc-600'}"
			>
				{aboutMe.name}
			</h1>
			<span class="hidden text-xs sm:inline {isHome ? 'text-white/40' : 'text-zinc-400'}">
				{aboutMe.designation}
			</span>
		</button>

		<ul class="flex items-center gap-1">
			{#each Object.values(navbarLinks) as link}
				<li>
					<button
						type="button"
						onclick={() => onNavigate(link.page)}
						class="rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 {selectedPage ===
						link.page
							? isHome
								? 'bg-white/10 text-white'
								: 'bg-zinc-100 text-zinc-900'
							: isHome
								? 'text-white/60 hover:bg-white/10 hover:text-white'
								: 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}"
					>
						{link.name}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
</header>
