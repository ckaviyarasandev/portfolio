<script>
	import { navbarLinks } from '../../datas/content';
	import { aboutMe } from '../../datas/info';
</script>

<header class="fixed inset-x-0 top-6 z-50 px-6">
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/70 px-6 py-4 shadow-lg shadow-black/20 backdrop-blur-xl"
	>
		<a href="#navHome" class="group select-none">
			<h1
				class="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-400"
			>
				{aboutMe.name}
			</h1>

			<p class="text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
				{aboutMe.designation}
			</p>
		</a>

		<ul class="flex items-center gap-2">
			{#each navbarLinks as link}
				<li>
					<a
						href={link.href}
						class="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
					>
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
