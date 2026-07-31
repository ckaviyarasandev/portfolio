<script>
	import { navbarLinks } from '../../datas/content';
	import { aboutMe } from '../../datas/info';

	let { selectedPage, onNavigate } = $props();
	let menuOpen = $state(false);

	$effect(() => {
		selectedPage;
		menuOpen = false;
	});

	function go(page) {
		onNavigate(page);
		menuOpen = false;
	}
</script>

<header class="fixed top-0 inset-x-0 z-40 px-4 sm:inset-x-auto sm:right-0 sm:mr-8 sm:max-w-[calc(100vw-2rem)] sm:px-0 md:mr-12">
	<nav
		class="flex max-w-full items-center justify-between gap-3 rounded-b-none md:rounded-b-4xl border border-t-0 px-4 py-2 shadow backdrop-blur-md transition-colors duration-500 motion-reduce:transition-none border-white/10 bg-white/5 sm:gap-6 sm:px-10"
	>
		<button
			type="button"
			onclick={() => go(navbarLinks.home.page)}
			class="group flex min-w-0 select-none items-baseline gap-2 rounded-4xl outline-none focus-visible:ring-2 focus-visible:ring-current"
		>
			<h1 class="truncate text-lg font-semibold tracking-tight transition-colors duration-300 text-white group-hover:text-white/80">
				{aboutMe.name}
			</h1>
			<span class="hidden sm:inline ml-4 text-white/40">
				{aboutMe.designation}
			</span>
		</button>

		<ul class="hidden items-center gap-1 sm:flex">
			{#each Object.values(navbarLinks) as link}
				<li>
					<button
						type="button"
						onclick={() => go(link.page)}
						aria-current={selectedPage === link.page ? 'page' : undefined}
						class="rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-current motion-reduce:transition-none {selectedPage ===
						link.page
							? "bg-white/10 text-white"
							: "text-white/60 hover:bg-white/10 hover:text-white"}"
					>
						{link.name}
					</button>
				</li>
			{/each}
		</ul>

		<!-- Mobile toggle -->
		<button
			type="button"
			class="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 sm:hidden text-white hover:bg-white/10"
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
			>
				{#if menuOpen}
					<path d="M4 4l10 10M14 4L4 14" />
				{:else}
					<path d="M2 5h14M2 9h14M2 13h14" />
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile menu panel -->
	{#if menuOpen}
		<ul
			id="mobile-menu"
			class="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl border p-2 backdrop-blur-md sm:hidden border-white/10 bg-white/5"
		>
			{#each Object.values(navbarLinks) as link}
				<li>
					<button
						type="button"
						onclick={() => go(link.page)}
						aria-current={selectedPage === link.page ? 'page' : undefined}
						class="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200 {selectedPage ===   
						link.page
							? "bg-white/10 text-white"
							: "text-white/60 hover:bg-white/10 hover:text-white"}"
					>
						{link.name}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</header>
