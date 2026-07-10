<script>
	let { project = null, onClose } = $props();
</script>

{#if project}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
		onclick={onClose}
		role="presentation"
	>
		<div
			class="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/90 p-6 shadow-2xl backdrop-blur-xl"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				onclick={onClose}
				aria-label="Close"
				class="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
			>
				✕
			</button>
			<h3 class="text-xl font-semibold text-white">{project.name}</h3>
			<p class="mt-1 text-sm text-white/50">{project.summary}</p>
			<p class="mt-4 text-sm leading-relaxed text-white/70">{project.details}</p>
		</div>
	</div>
{/if}
